import { updateProfile } from "@/actions/user-actions";
import { isValidImageUrl } from "@/utils/image-validate";
import { useDisclosure } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import { Tables } from "../../../types/supabase";
import useValidImage from "./useValidImage";

const useProfileEditor = (user: Tables<"profiles">, viewerID?: string) => {
  const [userData, setUserData] = useState(user);
  const [bannerUrl, setBannerUrl] = useState(user.banner_url);
  const [isChangesSaved, setIsChangesSaved] = useState(true);
  const [isFollowed, setIsFollowed] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const isValidBannerUrl = useValidImage(bannerUrl || "");

  useEffect(() => {
    if (viewerID) {
      setIsFollowed(user.followers?.includes(viewerID) || false);
    }
  }, [user.followers, viewerID]);

  const handleBannerUrlChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setBannerUrl(e.target.value);
    },
    [],
  );

  const handleBioChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserData((prevData) => ({ ...prevData, bio: e.target.value }));
      setIsChangesSaved(false);
    },
    [],
  );

  const handleUsernameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserData((prevData) => ({ ...prevData, username: e.target.value }));
      setIsChangesSaved(false);
    },
    [],
  );

  const handleSaveChanges = useCallback(async () => {
    try {
      await updateProfile(userData);
      setIsChangesSaved(true);
    } catch (error) {
      console.error("Failed to save changes:", error);
    }
  }, [userData]);

  const handleSaveBannerUrl = useCallback(async () => {
    if (!bannerUrl) {
      alert("Banner URL cannot be empty.");
      return;
    }
    const isValid = await isValidImageUrl(bannerUrl);
    if (!isValid) {
      alert("Invalid banner URL.");
      return;
    }
    setUserData((prevData) => ({ ...prevData, banner_url: bannerUrl }));
    setIsChangesSaved(false);
  }, [bannerUrl]);

  return {
    userData,
    bannerUrl,
    isOpen,
    isChangesSaved,
    isFollowed,
    isValidBannerUrl,
    setIsChangesSaved,
    handleBannerUrlChange,
    handleBioChange,
    handleUsernameChange,
    handleSaveChanges,
    handleSaveBannerUrl,
    onOpen,
    onOpenChange,
    setIsFollowed,
  };
};

export default useProfileEditor;

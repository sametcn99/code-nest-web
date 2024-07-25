"use client";
import { followAction } from "@/actions/follow-actions";
import { updateProfile } from "@/actions/user-actions";
import { cn } from "@/utils/cn";
import { isValidBannerUrl } from "@/utils/image-validate";
import {
  Button,
  Card,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { RiUserAddLine, RiUserFollowLine } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import { toast } from "sonner";
import { Tables } from "../../types/supabase";
import ContactListModal from "./ContactListModal";
import RichTextRender from "./ui/RichTextRender";

/**
 * Props for the ProfileCard component.
 */
type ProfileCardProps = {
  /** The user profile data. */
  user: Tables<"profiles">;

  /** Indicates whether the user is authenticated. */
  auth: boolean;

  /** The viewer ID. */
  viewerID?: string;

  /** The component class name. */
  className?: React.HtmlHTMLAttributes<HTMLDivElement>["className"];
  views: number;
};

/**
 * Renders a profile card component.
 *
 * @component
 * @param {ProfileCardProps} props - The component props.
 * @returns {JSX.Element} The rendered profile card.
 */
export default function ProfileCard({
  user,
  auth,
  viewerID,
  className,
  views,
}: ProfileCardProps) {
  const [userData, setUserData] = useState(user);
  const [bannerUrl, setBannerUrl] = useState(user.banner_url);
  const [isUserNameEditing, setIsUserNameEditing] = useState(false);
  const [isBannerUrlEditing, setIsBannerUrlEditing] = useState(false);
  const [isChangesSaved, setIsChangesSaved] = useState(true);
  const [isBioEditing, setIsBioEditing] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    if (!viewerID) return;
    if (user.followers?.includes(viewerID)) setIsFollowed(true);
    else setIsFollowed(false);
  }, [user.followers, viewerID]);

  useEffect(() => {
    if (isUserNameEditing || isBannerUrlEditing || isBioEditing)
      setIsChangesSaved(false);
  }, [isUserNameEditing, isBannerUrlEditing, isBioEditing]);

  const handleBannerUrlChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setBannerUrl(e.target.value);

  const handleBioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, bio: e.target.value });
    setIsBioEditing(true);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, username: e.target.value });
    setIsUserNameEditing(true);
  };

  const handleSaveChanges = async () => {
    updateProfile(userData);
    setIsChangesSaved(true);
    setIsBioEditing(false);
    setIsUserNameEditing(false);
    setIsBannerUrlEditing(false);
  };

  const handleSaveBannerUrl = async () => {
    if (!bannerUrl) {
      setBannerUrl(bannerUrl);
      alert("Banner URL boş bırakılamaz.");
      return;
    }
    const isValid = await isValidBannerUrl(bannerUrl);
    if (!isValid) {
      setBannerUrl(bannerUrl);
      return;
    }
    setUserData({ ...userData, banner_url: bannerUrl });
    setIsBannerUrlEditing(true);
  };

  return (
    <Card
      className={cn(
        `flex flex-col justify-center gap-4 p-6 shadow-lg`,
        className,
      )}
    >
      <div className="relative z-20 h-56 w-full overflow-visible rounded-lg">
        {auth && (
          <Button
            isIconOnly
            className="absolute right-3 top-3 z-30 bg-opacity-50 backdrop-blur hover:bg-opacity-25 hover:text-red-600 hover:backdrop-blur"
            onPress={onOpen}
          >
            <TbEdit size={20} />
          </Button>
        )}
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Banner&apos;ı Düzenle
                </ModalHeader>
                <ModalBody>
                  <Textarea
                    placeholder="Banner URL"
                    value={bannerUrl || ""}
                    onChange={handleBannerUrlChange}
                    className="w-full"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Kaydetme
                  </Button>
                  <Button
                    color="primary"
                    onPress={onClose}
                    onClick={async () => {
                      await handleSaveBannerUrl();
                    }}
                  >
                    Kaydet
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        <Image
          src={userData.banner_url || "/images/default_banner.gif"}
          title={`${userData.username}'s banner`}
          alt={`${userData.username}'s banner`}
          fill
          objectFit="cover"
          unoptimized
          priority
          role="banner"
          draggable="false"
          unselectable="on"
          className="rounded-lg"
        />
        <div className="absolute bottom-0 z-50 inline-flex translate-y-3/4 place-items-center">
          <Image
            src={user.avatar_url || "/images/default_avatar.png"}
            title={`${userData.username}'s avatar`}
            alt={`${userData.username}'s avatar`}
            unoptimized
            priority
            role="banner"
            draggable="false"
            unselectable="on"
            width={100}
            height={100}
            className="h-22 w-22 rounded-full border-8 border-[#18181B]"
          />
          <div className="flex flex-col overflow-x-scroll scrollbar-hide">
            <div className="mb-[-0.625rem] inline-flex gap-2">
              {auth && isUserNameEditing ? (
                <input
                  className="h-10 w-fit bg-transparent text-2xl font-semibold hover:outline-none"
                  placeholder="Kullanıcı adı"
                  onChange={handleUsernameChange}
                  value={userData.username ?? ""}
                />
              ) : (
                <p className="inline-flex h-10 w-fit place-items-center bg-transparent text-2xl font-semibold hover:outline-none">
                  <Link className="hover:underline" href={`/user/${user.id}`}>
                    {userData.username || user.full_name || "Kullanıcı adı"}
                  </Link>
                  {auth && (
                    <Button
                      isIconOnly
                      className="bg-transparent hover:text-blue-600"
                      onClick={() => setIsUserNameEditing(true)}
                    >
                      <TbEdit size={20} />
                    </Button>
                  )}
                </p>
              )}
              {!auth && (
                <Button
                  isIconOnly
                  className="mb-auto ml-5 bg-transparent hover:text-green-500"
                  onClick={(e) => {
                    if (user && viewerID && user.id !== viewerID) {
                      console.log("Follow action:", user, viewerID, isFollowed);
                      followAction(
                        user,
                        viewerID,
                        isFollowed ? "Unfollow" : "Follow",
                      );
                      setIsFollowed(!isFollowed);
                    }
                    user.id === viewerID &&
                      toast.error("Kendinizi takip edemezsiniz.");
                    !viewerID &&
                      toast.error(
                        "Bu özelliği kullanabilmek için giriş yapmalısınız.",
                      );
                  }}
                >
                  {isFollowed ? (
                    <RiUserFollowLine size={20} />
                  ) : (
                    <RiUserAddLine size={20} />
                  )}
                </Button>
              )}
            </div>
            {user.roles && (
              <span className="text-muted">{user.roles?.join(", ")}</span>
            )}
          </div>
        </div>
      </div>
      <div className="mt-20 flex items-center gap-4">
        <div className="flex w-full flex-col gap-1">
          <div className="inline-flex gap-2">
            <ContactListModal id={user.id} />
          </div>
          <div className="flex flex-col">
            <p>
              Discord Adı:{" "}
              <Link
                href={`https://discord.com/users/${user.sub}`}
                className="inline-flex text-muted hover:underline"
              >
                {user.full_name}
              </Link>
            </p>
            <p>Profil Görüntülenme sayısı: {views}</p>
          </div>
          {auth && isBioEditing && (
            <Textarea
              value={userData.bio ?? ""}
              onChange={handleBioChange}
              className="w-full"
              placeholder="Biyografi"
            />
          )}
          {auth && !isBioEditing && (
            <Card className="min-h-24 w-full p-2 text-white">
              <div className="min-h-24 w-full p-2 text-white">
                <RichTextRender
                  content={userData.bio ?? ""}
                  linkClassName="hover:underline"
                />
              </div>
              <Button
                isIconOnly
                className="absolute right-1 top-1 mr-2 mt-2 bg-transparent hover:text-blue-600"
                onClick={() => setIsBioEditing(true)}
              >
                <TbEdit size={20} />
              </Button>
            </Card>
          )}
          {auth === false && (
            <div className="min-h-24 w-full p-2 text-white">
              <RichTextRender
                content={userData.bio ?? ""}
                linkClassName="hover:underline"
              />
            </div>
          )}
        </div>
      </div>
      {auth && (
        <div className="inline-flex flex-wrap gap-2 self-end">
          {!isChangesSaved && (
            <Button
              className="w-fit rounded-full bg-transparent pb-2 pl-6 pr-6 pt-2 text-sm transition-all duration-300 hover:bg-green-950"
              onPress={async () => await handleSaveChanges()}
            >
              Değişiklikleri kaydet
            </Button>
          )}
          <Link
            href="/api/signout"
            className="w-fit rounded-full pb-2 pl-6 pr-6 pt-2 text-sm transition-all duration-300 hover:bg-red-900"
          >
            Çıkış Yap
          </Link>
        </div>
      )}
    </Card>
  );
}

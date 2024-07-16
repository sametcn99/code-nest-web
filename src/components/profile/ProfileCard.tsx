"use client";
import {
  updateBannerUrl,
  updateBio,
  updateUserName,
} from "@/lib/utils/actions/user-actions";
import { isValidBannerUrl } from "@/lib/utils/validators/image-validate";
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
import { useEffect, useState } from "react";
import { TbEdit } from "react-icons/tb";
import { Tables } from "../../../types/supabase";
import RichTextRender from "../ui/RichTextRender";

/**
 * Props for the ProfileCard component.
 */
type ProfileCardProps = {
  /** The user profile data. */
  user: Tables<"profiles">;

  /** Indicates whether the user is authenticated. */
  auth: boolean;
};

/**
 * Renders a profile card component.
 *
 * @component
 * @param {ProfileCardProps} props - The component props.
 * @returns {JSX.Element} The rendered profile card.
 */
export default function ProfileCard({ user, auth }: ProfileCardProps) {
  const [isUserNameEditing, setIsUserNameEditing] = useState(false);
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio ?? "");
  const [bannerUrl, setBannerUrl] = useState(user.banner_url);
  const [dummyBannerUrl, setDummyBannerUrl] = useState(user.banner_url);
  const [isBannerUrlEditing, setIsBannerUrlEditing] = useState(false);
  const [isChangesSaved, setIsChangesSaved] = useState(true);
  const [isBioEditing, setIsBioEditing] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    if (isUserNameEditing || isBannerUrlEditing || isBioEditing) {
      setIsChangesSaved(false);
    }
  }, [isUserNameEditing, isBannerUrlEditing, isBioEditing]);

  const handleBannerUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDummyBannerUrl(e.target.value);
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBio(e.target.value);
    setIsBioEditing(true);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setIsUserNameEditing(true);
  };

  const handleSaveChanges = async () => {
    // Save changes to the database here.
    if (dummyBannerUrl === bannerUrl && dummyBannerUrl) {
      const res = await updateBannerUrl({
        bannerUrl: dummyBannerUrl,
        userId: user.id,
      });
      if (!res) alert("Bir şeyler ters gitti.");
    } else if (dummyBannerUrl === "") {
      alert("Banner URL boş bırakılamaz.");
    } else {
      alert("Bir şeyler ters gitti.");
    }

    if (username !== user.username && username) {
      // Save changes to the database here.
      const res = await updateUserName({ username, userId: user.id });
      if (!res) alert("something went wrong.");
    } else if (username === "") {
      alert("Kullanıcı adı kısmı boş bırakılamaz.");
    }

    if (bio !== user.bio && bio) {
      // Save changes to the database here.
      const res = await updateBio({ bio, userId: user.id });
      if (!res) alert("Bir şeyler ters gitti.");
    } else if (bio === "") {
      alert("Biyografi kısmı boş bırakılamaz.");
    }
    setIsChangesSaved(true);
    setIsBioEditing(false);
    setIsUserNameEditing(false);
    setIsBannerUrlEditing(false);
  };

  const handleSaveBannerUrl = async () => {
    if (!dummyBannerUrl) {
      setDummyBannerUrl(bannerUrl);
      alert("Banner URL boş bırakılamaz.");
      return;
    }
    const isValid = await isValidBannerUrl(dummyBannerUrl);
    if (!isValid) {
      setDummyBannerUrl(bannerUrl);
      return;
    }
    console.log("Banner URL is valid:", dummyBannerUrl);
    setBannerUrl(dummyBannerUrl);
    setIsBannerUrlEditing(true);
  };

  return (
    <Card className="flex flex-col justify-center gap-4 p-6 shadow-lg">
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
                    value={dummyBannerUrl || ""}
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
          src={bannerUrl || "/images/default_banner.gif"}
          alt="user banner"
          fill
          objectFit="cover"
          unoptimized
          className="pointer-events-none select-none rounded-lg border-b"
        />
        <div className="absolute bottom-0 z-50 inline-flex translate-y-3/4 place-items-center">
            <Image
              src={user.avatar_url || "/images/default_avatar.png"}
              width={100}
              height={100}
              alt="user avatar"
              className="h-22 w-22 pointer-events-none mr-2 select-none rounded-full border-8 border-[#18181B]"
            />
          <div className="flex flex-col">
            {auth && isUserNameEditing ? (
              <input
                className="h-10 w-60 bg-transparent text-2xl font-semibold hover:outline-none"
                placeholder="Kullanıcı adı"
                onChange={handleUsernameChange}
                value={username ?? ""}
              />
            ) : (
              <p className="inline-flex h-10 w-60 place-items-center bg-transparent text-2xl font-semibold hover:outline-none">
                <Link className="hover:underline" href={`/user/${user.sub}`}>
                  {username ?? "Kullanıcı adı"}
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
            <span className="pr-2 text-muted">{user.roles?.join(", ")}</span>
          </div>
        </div>
      </div>
      <div className="mt-20 flex items-center gap-4">
        <div className="flex w-full flex-col gap-1">
          <h2>
            Discord Adı:{" "}
            <Link
              href={`https://discord.com/users/${user.sub}`}
              className="text-muted hover:underline"
            >
              {user.full_name}
            </Link>
          </h2>
          {auth && isBioEditing ? (
            <Textarea
              value={bio ?? ""}
              onChange={handleBioChange}
              className="w-full"
              placeholder="Biyografi"
            />
          ) : (
            <></>
          )}
          {auth && !isBioEditing ? (
            <Card className="min-h-24 w-full p-2 text-white">
              <div className="min-h-24 w-full p-2 text-white">
                <RichTextRender
                  content={bio ?? ""}
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
          ) : (
            <></>
          )}
          {auth === false && (
            <div className="min-h-24 w-full p-2 text-white">
              <RichTextRender
                content={bio ?? ""}
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
            href="/signout"
            className="w-fit rounded-full pb-2 pl-6 pr-6 pt-2 text-sm transition-all duration-300 hover:bg-red-900"
          >
            Çıkış Yap
          </Link>
        </div>
      )}
    </Card>
  );
}

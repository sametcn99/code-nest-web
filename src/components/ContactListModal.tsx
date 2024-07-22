"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Tables } from "../../types/supabase";
import Image from "next/image";
import Link from "next/link";

export default function ContactListModal({ id }: { id: string }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [followers, setFollowers] = useState<string[]>([]);
  const [followings, setFollowings] = useState<string[]>([]);
  const [profiles, setProfiles] = useState<Tables<"profiles">[]>();

  useEffect(() => {
    async function fetchContacts() {
      try {
        const response = await fetch(`/api/contacts?id=${id}`);
        const data = await response.json();
        setFollowers(data.followers);
        setFollowings(data.followings);
      } catch (err) {
        console.error(err);
      }
    }
    fetchContacts();
  }, [id]);

  useEffect(() => {
    const fetchProfile = async (userId: string) => {
      const response = await fetch(`/api/user?id=${userId}`);
      return response.json();
    };

    const fetchProfiles = async (userIds: string[]) => {
      try {
        const promises = userIds.map(fetchProfile);
        const profilesData = await Promise.all(promises);
        setProfiles(profilesData);
      } catch (err) {
        console.error(err);
      }
    };

    if (followers && followers.length > 0) {
      fetchProfiles(followers);
    }

    if (followings && followings.length > 0) {
      fetchProfiles(followings);
    }
  }, [id, followers, followings]);

  return (
    <>
      {profiles && followers && followers.length > 0 && (
        <>
          <Button
            className="m-0 w-fit bg-transparent p-0 font-bold hover:underline"
            onPress={onOpen}
          >
            {`Takipçiler ${followers.length}`}
          </Button>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    {`Takipçiler ${followers.length}`}
                  </ModalHeader>
                  <ModalBody>
                    <ul className="flex flex-col gap-1">
                      {profiles &&
                        profiles.map((user, index) => (
                          <li key={index} className="text-sm">
                            <Link
                              href={`/user/${user.id}`}
                              className="inline-flex w-full gap-3 rounded-xl p-2 hover:bg-white/30"
                            >
                              <Image
                                src={
                                  user.avatar_url ||
                                  "/images/default_avatar.png"
                                }
                                alt={`${user.username || user.full_name}'s Avatar`}
                                width={60}
                                height={60}
                                draggable={false}
                                title={`${user.username || user.full_name}'s Avatar`}
                                className="rounded-xl"
                              />
                              <div className="flex flex-col text-sm">
                                <h2 className="text-2xl font-bold">
                                  {user.username || user.full_name}
                                </h2>
                                <p>{user.roles?.join(", ")}</p>
                              </div>
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      )}
      {profiles && followings && followings.length > 0 && (
        <>
          <Button
            className="m-0 w-fit bg-transparent p-0 font-bold hover:underline"
            onPress={onOpen}
          >
            {`Takip Edilenler ${followings.length}`}
          </Button>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    {`Takip Edilenler ${followings.length}`}
                  </ModalHeader>
                  <ModalBody>
                    <ul className="flex flex-col gap-1">
                      {profiles &&
                        profiles.map((user, index) => (
                          <li key={index} className="text-sm">
                            <Link
                              href={`/user/${user.id}`}
                              className="inline-flex w-full gap-3 rounded-xl p-2 hover:bg-white/30"
                            >
                              <Image
                                src={
                                  user.avatar_url ||
                                  "/images/default_avatar.png"
                                }
                                alt={`${user.username || user.full_name}'s Avatar`}
                                width={60}
                                height={60}
                                draggable={false}
                                title={`${user.username || user.full_name}'s Avatar`}
                                className="rounded-xl"
                              />
                              <div className="flex flex-col text-sm">
                                <h2 className="text-2xl font-bold">
                                  {user.username || user.full_name}
                                </h2>
                                <p>{user.roles?.join(", ")}</p>
                              </div>
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
}

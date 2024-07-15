"use client";
import { removeContent } from "@/lib/utils/actions/post-actions";
import { cn } from "@/lib/utils/cn";
import { createClient } from "@/lib/utils/supabase/client";
import { formatDate } from "@/lib/utils/utils";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { Tables } from "../../../types/supabase";

/**
 * Defines the prop types for the ContentCard component.
 */
type ContentCardProps = {
  /** Specifies the content type, using the structure of the "files" table from the database. */
  content: Tables<"files">;

  /** Indicates whether the user is authenticated. */
  auth: boolean;
  /** Optional CSS class name for styling the component. */
  className?: string;
};

/**
 * Represents a card component for displaying content.
 * @component
 */
export default function ContentCard({
  content,
  auth,
  className,
}: ContentCardProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [user, setUser] = useState<null | Tables<"profiles">>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", content.user_id)
        .single();
      if (error) {
        console.error(error);
        notFound();
      }
      setUser(data);
    };

    fetchUser();
  }, [content.user_id, supabase]);

  const onRemove = async () => {
    const res = await removeContent(content.content_id);
    if (res) {
      onOpenChange();
      location.reload();
    }
  };

  return (
    <>
      {user && (
        <Card
          className={cn(
            "relative min-h-40 w-full cursor-pointer p-2 transition-all duration-700 hover:scale-101",
            className,
          )}
        >
          <CardHeader className="flex flex-row justify-between text-2xl font-bold">
            <Link
              href={`/user/${user.username || user.sub}`}
              className="flex w-full items-center rounded-xl transition-all duration-500 hover:bg-white/20 hover:underline"
            >
              {user.avatar_url && (
                <Image
                  src={user.avatar_url}
                  width={55}
                  height={55}
                  alt="user avatar"
                  className="h-22 w-22 pointer-events-none mb-2 select-none rounded-full border-8 border-[#18181B]"
                />
              )}
              <div className="mb-2 ml-2">
                <p className="text-base font-normal">{user.username}</p>
                <p className="mr-auto text-xs font-light text-muted">
                  {formatDate(new Date(content.created_at))}
                </p>
              </div>
            </Link>
            {auth && (
              <>
                <button
                  title="Remove Content"
                  onClick={onOpen}
                  className="h-fit w-fit place-self-center bg-transparent hover:text-red-600"
                >
                  <IoCloseCircleOutline size={"18.5"} className="" />
                </button>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                  <ModalContent>
                    {(onClose) => (
                      <>
                        <ModalHeader className="flex flex-col gap-1">
                          Silmek istediğinize emin misiniz?
                        </ModalHeader>
                        <ModalBody></ModalBody>
                        <ModalFooter>
                          <Button
                            color="danger"
                            variant="light"
                            onPress={onRemove}
                          >
                            Evet
                          </Button>
                          <Button color="primary" onPress={onClose}>
                            Hayır
                          </Button>
                        </ModalFooter>
                      </>
                    )}
                  </ModalContent>
                </Modal>
              </>
            )}
          </CardHeader>
          <CardBody>
            <p className="text-lg font-semibold">{content.title}</p>
            <p className="text-sm">{content.description}</p>
          </CardBody>
          <CardFooter className="flex flex-col">
            <Link className="w-full" href={`/code/${content.content_id}`}>
              <Button className="mt-3 w-full rounded-xl bg-gradient-to-r from-indigo-800 via-blue-700 to-blue-900 px-4 py-2 text-white">
                Kodu Görüntüle
              </Button>
            </Link>
          </CardFooter>
        </Card>
      )}
    </>
  );
}

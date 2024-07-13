"use client";
import { Card } from "@nextui-org/react";
import Link from "next/link";
import { Tables } from "../../../types/supabase";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { createClient } from "@/lib/utils/supabase/client";

export default function ContentCard({
  content,
  auth,
}: {
  content: Tables<"files">;
  auth: boolean;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const supabase = createClient();

  const onRemove = async () => {
    await supabase.from("files").delete().eq("content_id", content.content_id);
    onOpenChange();
  };

  return (
    <Card className="relative min-h-40 w-full p-4 transition-all duration-700 hover:scale-101">
      <h2 className="inline-flex justify-between text-2xl font-bold">
        {content.title}
        {auth && (
          <>
            <button
              title="Remove Content"
              onClick={onOpen}
              className="absolute right-4 top-4 z-50 h-fit w-fit"
            >
              <IoCloseCircleOutline />
            </button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      Dosyayı Silmek istediğinize emin misiniz?
                    </ModalHeader>
                    <ModalBody></ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onRemove}>
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
      </h2>
      <Link href={`/code/${content.content_id}`}>
        <p className="text-muted">{content.description}</p>
        <p>{new Date(content.created_at).toISOString()}</p>
      </Link>
    </Card>
  );
}

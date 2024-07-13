"use client";
import { removeContent } from "@/lib/utils/actions/post-actions";
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
import Link from "next/link";
import { IoCloseCircleOutline } from "react-icons/io5";
import { Tables } from "../../../types/supabase";

export default function ContentCard({
  content,
  auth,
}: {
  content: Tables<"files">;
  auth: boolean;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const onRemove = async () => {
    const res = await removeContent(content.content_id);
    if (res) {
      onOpenChange();
      location.reload();
    }
  };

  return (
    <Card className="relative min-h-40 w-full p-4 transition-all duration-700 hover:scale-101">
      <CardHeader className="inline-flex justify-between text-2xl font-bold">
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
      </CardHeader>
      <CardBody>
        <p className="text-muted">{content.description}</p>
        <p>{new Date(content.created_at).toUTCString()}</p>
      </CardBody>
      <CardFooter>
        <Link className="w-full" href={`/code/${content.content_id}`}>
          <Button className="w-full">Kodu Görüntüle</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

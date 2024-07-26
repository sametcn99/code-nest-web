'use client'
import { removeContent } from '@/actions/remove-content-actions'
import { cn } from '@/utils/cn'
import { formatDate, truncateString } from '@/utils/utils'
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
  Skeleton,
  useDisclosure,
} from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'
import { IoCloseCircleOutline } from 'react-icons/io5'
import { Tables } from '../../types/supabase'

/**
 * Defines the prop types for the ContentCard component.
 */
type ContentCardProps = {
  /** Specifies the content type, using the structure of the "files" table from the database. */
  content: Tables<'files'>

  /** Specifies the user type, using the structure of the "profiles" table from the database. */
  user: Tables<'profiles'>

  /** Indicates whether the user is authenticated. */
  auth: boolean
  /** Optional CSS class name for styling the component. */
  className?: string
}

/**
 * Represents a card component for displaying content.
 * @component
 */
export default function ContentCard({
  content,
  user,
  auth,
  className,
}: ContentCardProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const onRemove = async () => {
    const res = await removeContent(content.id)
    if (res) {
      onOpenChange()
      location.reload()
    }
  }

  return (
    <>
      {user && (
        <Card
          className={cn(
            'relative min-h-40 w-full cursor-pointer p-2 transition-all duration-700 hover:scale-101',
            className
          )}
        >
          <CardHeader className="flex flex-row justify-between">
            <Link
              title={`${user.username || user.full_name || user.id}'s Profile`}
              aria-label={`${user.id}'s Profile`}
              href={`/user/${user.id}`}
              className="flex w-full items-center rounded-xl transition-all duration-500"
            >
              <Image
                src={user.avatar_url || '/images/default_avatar.png'}
                width={55}
                height={55}
                unoptimized
                alt={`${user.username || user.full_name || user.id}'s avatar`}
                className="h-22 w-22 pointer-events-none select-none rounded-full border-8 border-[#18181B]"
              />
              <div className="flex flex-col">
                <p>{user.username || user.full_name}</p>
                <p className="text-xs font-light text-muted">
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
                  <IoCloseCircleOutline size={'18.5'} className="" />
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
            <p className="text-sm text-muted">
              {truncateString(content.description || 'Açıklama eklenmemiş.')}
            </p>
          </CardBody>
          <CardFooter className="flex flex-col">
            <Link
              title={`${content.title} adlı projeyi görüntüle`}
              aria-label={`${content.title} adlı projeyi görüntüle`}
              className="w-full rounded-xl bg-gradient-to-r from-indigo-800 via-blue-700 to-blue-900 px-4 py-2 text-center text-white"
              href={`/code/${content.id}`}
            >
              Kodu Görüntüle
            </Link>
          </CardFooter>
        </Card>
      )}
    </>
  )
}

'use client'
import Loading from '@/app/Loading'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { RiQuestionnaireFill } from 'react-icons/ri'
import Markdown from 'react-markdown'
import { toast } from 'sonner'
import { Json } from '../../types/supabase'

export default function AskAI({
  content,
  isAuth,
}: {
  content: Json
  isAuth: boolean
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [data, setData] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/ai', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content: content }),
        })
        const data = await response.json()
        setData(data.response)
      } catch (error) {
        console.error('Failed to fetch data:', error)
        toast.error('Failed to fetch data. Please try again later.')
      }
    }
    if (data === '' && isOpen) {
      fetchData()
    }
  }, [content, data, isOpen])

  return (
    <>
      <Button
        title="AI'a Sor"
        className="bg-transparent hover:text-blue-600"
        onClick={async () => {
          isAuth
            ? onOpen()
            : toast.error('Bu özelliği kullanabilmek için giriş yapmalısınız.')
        }}
      >
        <RiQuestionnaireFill size={22} />
        <span className="">AI&apos;a Sor</span>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} closeButton={<></>}>
        <ModalContent className="max-h-[80%] overflow-y-scroll">
          {(onClose) => (
            <>
              <ModalHeader className="sticky top-0 flex flex-col gap-1 bg-[#18181b]">
                Gemini AI&apos;ın cevabı
              </ModalHeader>
              <ModalBody>
                {data ? (
                  <Markdown>{data}</Markdown>
                ) : (
                  <>
                    <Loading />
                    <p className="text-center text-xl">
                      Gemini&apos;dan yanıt bekleniyor...
                    </p>
                  </>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

import { createClient } from '@/utils/server'
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { FaDiscord } from 'react-icons/fa'
import { signInWithDiscord } from './actions'

export default async function LoginPage() {
  const supabase = createClient()
  const { data } = await supabase.auth.getUser()
  if (data?.user) {
    redirect('/me')
  }
  return (
    <main className="mx-auto flex flex-col space-y-6 px-4 py-8">
      <Card className="bg-transparant max-w-lg rounded-xl border-1 border-solid border-[#2E2E30] p-6 shadow-lg backdrop-blur-sm">
        <CardHeader className="mb-[-1.5rem] flex flex-col items-center space-y-4 text-center">
          <Image
            src="/icons/favicon-512x512.png"
            width={80}
            height={80}
            alt="Logo"
            className="pointer-events-none mb-5 cursor-pointer select-none duration-1000 hover:origin-center hover:rotate-45"
          />
          <span className="mb-[-1.5rem] text-2xl font-bold">
            Code Nest'e Hoş Geldiniz
          </span>
        </CardHeader>
        <CardBody className="flex flex-col items-center space-y-4">
          <p className="text-center text-lg">
            En sevdiğiniz projeleri paylaşın, kaydedin ve keşfedin.
          </p>
          <Divider className="w-full" />
          <form className="w-full">
            <button
              formAction={signInWithDiscord}
              className="flex w-full transform items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2 text-lg font-bold text-white transition-transform hover:scale-105"
            >
              <FaDiscord size={22} />
              Discord ile Giriş Yapın
            </button>
          </form>
        </CardBody>
        <CardFooter className="text-center text-sm text-gray-500">
          <p>
            Kullanıcı bilgilerinizi{' '}
            <Link
              href={'https://supabase.com/auth'}
              target="_blank"
              className="text-green-600 hover:underline"
            >
              Supabase Auth
            </Link>{' '}
            kullanarak koruyoruz.
          </p>
        </CardFooter>
      </Card>
    </main>
  )
}

import Editor from '@/components/Editor'
import { createClient } from '@/utils/server'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
  title: 'Oluştur',
  openGraph: {
    title: 'Oluştur',
  },
}

export default async function page() {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) redirect('/login')
  return <Editor />
}

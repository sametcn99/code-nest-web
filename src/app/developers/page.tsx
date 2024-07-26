import { createClient } from '@/utils/server'
import { Card, CardHeader } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'
import { FaCrown } from 'react-icons/fa6'
import { Tables } from '../../../types/supabase'

export default async function Page() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .not('roles', 'is', null)
  if (error) return <div>Veriler yüklenirken bir hata oluştu.</div>
  const users = data as Tables<'profiles'>[]

  return (
    <div className="container mx-auto flex w-full flex-col items-center justify-center gap-4 p-4">
      <div>
        <h2 className="mb-2 ml-auto mr-auto text-center text-3xl font-bold">
          Geliştiriciler
        </h2>
      </div>
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        {users && users.length > 0 ? (
          users.map((user, index) => (
            <Link href={`/user/${user.id}`} key={index}>
              <Card key={index} className="p-2 hover:scale-101">
                <CardHeader className="inline-flex gap-3">
                  <Image
                    src={user.avatar_url || '/images/default_avatar.png'}
                    alt={`${user.username || user.full_name}'s Avatar`}
                    width={100}
                    height={100}
                    draggable={false}
                    title={`${user.username || user.full_name}'s Avatar`}
                    className="rounded-xl"
                  />
                  <div className="flex flex-col text-sm">
                    <h2 className="text-2xl font-bold">
                      {user.username || user.full_name}
                    </h2>
                    <p>{user.roles?.join(', ')}</p>
                    <p>{user.bio || 'Bio eklenmemiş.'}</p>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))
        ) : (
          <FaCrown />
        )}
      </div>
    </div>
  )
}

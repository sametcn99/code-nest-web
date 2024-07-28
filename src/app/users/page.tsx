import { createClient } from '@/utils/server'
import { Card, CardHeader } from '@nextui-org/react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Tables } from '../../../types/supabase'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
	metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
	title: 'Kullanıcılar',
	openGraph: {
		title: 'Kullanıcılar',
	},
}

export default async function Page() {
	const supabase = createClient()
	const { data, error } = await supabase
		.from('profiles')
		.select('id, username, full_name, avatar_url, bio, roles')
	if (error) notFound()
	const users = data as Tables<'profiles'>[]

	return (
		<div className='container mx-auto flex w-full flex-col items-center justify-center gap-4 p-4'>
			<h2 className='text-center text-3xl font-bold'>Kullanıcılar</h2>
			<p className='text-muted'>
				Bu sayfada yer alan Kullanıcılar, platformumuz üzerinde kayıtlı olan ve
				paylaşımlarda bulunan kullanıcılardır.
			</p>
			<div className='grid w-full grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4'>
				{users &&
					users.length > 0 &&
					users.map((user, index) => (
						<Link
							href={`/user/${user.id}`}
							key={index}
						>
							<Card
								key={index}
								className='p-2 bg-transparent border border-white/30 rounded-xl cursor-pointer transition-all duration-700 hover:shadow-lg backdrop-blur-sm'
							>
								<CardHeader className='inline-flex gap-3'>
									<Image
										src={user.avatar_url || '/images/default_avatar.png'}
										alt={`${user.username || user.full_name}'s Avatar`}
										width={100}
										height={100}
										draggable={false}
										title={`${user.username || user.full_name}'s Avatar`}
										className='rounded-xl'
									/>
									<div className='flex flex-col text-sm'>
										<h2 className='text-2xl font-bold'>
											{user.username || user.full_name}
										</h2>
										<p>{user.roles?.join(', ')}</p>
										<p>{user.bio || 'Bio eklenmemiş.'}</p>
									</div>
								</CardHeader>
							</Card>
						</Link>
					))}
			</div>
		</div>
	)
}

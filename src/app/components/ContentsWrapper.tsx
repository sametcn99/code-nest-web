'use client'
import Loading from '@/app/Loading'
import ContentCard from '@/app/components/ContentCard'
import usePaginatedContents from '@/app/lib/hooks/usePaginatedContents'
import { Input } from '@nextui-org/react'

export const ContentsWrapper = ({ ID }: { ID?: string }) => {
	const { contents, userMap, loading, error, searchQuery, setSearchQuery } =
		usePaginatedContents(ID)
	if (error) return <div>Error loading files: {error}</div>

	return (
		<section className='flex w-full flex-col place-items-center gap-4'>
			<input
				placeholder='Arama Yap..'
				type='text'
				onChange={(e) => setSearchQuery(e.target.value)}
				value={searchQuery}
				className='w-full max-w-[40rem] rounded-xl border border-b-2 border-white/30 bg-transparent p-3 backdrop-blur-sm focus:outline-none'
			/>
			<main className='container grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
				{contents.length > 0 &&
					contents.map((file) => (
						<ContentCard
							key={file.id}
							content={file}
							user={userMap[file.user_id]}
							auth={false}
						/>
					))}
			</main>
			{loading && <Loading />}
		</section>
	)
}

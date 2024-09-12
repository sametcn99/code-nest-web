import { ContentsWrapper } from '@/components/ContentsWrapper'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Explore',
	description: 'Explore the contents shared by our community!',
	openGraph: {
		title: 'Explore',
		description: 'Explore the contents shared by our community!',
	},
}

export default function Page() {
	return (
		<section className='mx-auto flex flex-col place-items-center gap-5'>
			<div className='text-center'>
				<h1 className='text-4xl font-bold'>Keşfet</h1>
				<h2 className='text-xl font-bold text-muted'>
					Topluluğumuz tarafından paylaşılan içerikleri keşfedin!
				</h2>
			</div>
			<ContentsWrapper />
		</section>
	)
}

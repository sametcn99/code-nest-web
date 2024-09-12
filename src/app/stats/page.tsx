import { Card, CardBody, CardHeader } from '@nextui-org/react'

export default async function Page() {
	const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/stats`)
	const stats = await data.json()
	return (
		<main className='container mx-auto'>
			<Card className='min-h-[25rem]'>
				<CardHeader className='text-2xl font-bold'>Stats</CardHeader>
				<CardBody>
					<p>
						Total Users: <span>{stats.totalUsers}</span>
					</p>
					<p>
						Total Content: <span>{stats.totalContent}</span>
					</p>
					<p>
						Last Uploaded File: <span>{stats.lastUploadedFile[0].created_at}</span>
					</p>
				</CardBody>
			</Card>
		</main>
	)
}

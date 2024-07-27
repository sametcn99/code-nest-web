import {
	getFileExtension,
	getLangFromFileExtension,
} from '@/utils/file-extensions-by-langs'
import { createClient } from '@/utils/server'
import { NextRequest, NextResponse } from 'next/server'
import { Tables } from '../../../../types/supabase'

export async function GET(request: NextRequest) {
	const ID = request.nextUrl.searchParams.get('ID') as string | null

	if (!ID)
		return NextResponse.json(
			{ error: 'ID parameter is required' },
			{ status: 400 }
		)
	const supabase = createClient()
	try {
		const [totalContentRes, profileViewsRes] = await Promise.all([
			supabase.from('files').select('*', { count: 'exact' }).eq('user_id', ID),
			supabase
				.from('views')
				.select('*')
				.eq('_id', ID)
				.eq('table', 'profiles')
				.single(),
		])

		if (totalContentRes.error) throw new Error(totalContentRes.error.message)
		if (profileViewsRes.error) throw new Error(profileViewsRes.error.message)

		const totalContent = totalContentRes.data as Tables<'files'>[]
		const profileViews = profileViewsRes.data as Tables<'views'>

		const viewPromises = totalContent.map((content) =>
			supabase
				.from('views')
				.select('*')
				.eq('_id', content.id)
				.eq('table', 'files')
		)

		const viewsResults = await Promise.all(viewPromises)
		const views = viewsResults.flatMap((result) => {
			if (result.error) throw new Error(result.error.message)
			return result.data as Tables<'views'>[]
		})

		const totalStars = totalContent.reduce(
			(acc, content) => acc + (content.starred_by?.length || 0),
			0
		)
		const totalViews = views.reduce((acc, view) => acc + view.count, 0)

		const languageData: { [key: string]: number } = {}

		totalContent.forEach((content) => {
			if (content.content) {
				const contentArr = content.content as FileTypes[]
				contentArr.forEach((file) => {
					const extension = getFileExtension(file.filename) || ''
					const language = getLangFromFileExtension(extension)
					if (language) {
						if (!languageData[language]) {
							languageData[language] = 0
						}
						languageData[language]++
					}
				})
			}
		})

		const data = {
			ID: ID,
			profileViews: profileViews.count,
			Contents: totalContent.length,
			Stars: totalStars,
			ContentViews: totalViews,
			languageData: languageData,
		}

		return NextResponse.json(data, {
			headers: { 'Content-Type': 'application/json' },
		})
	} catch (err) {
		return NextResponse.json(
			{ error: 'An unexpected error occurred', details: err },
			{ status: 500 }
		)
	}
}

import { createClient } from '@/utils/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
	try {
		const reqURL = new URL(request.url)
		const table = reqURL.searchParams.get('table')?.toString().toLowerCase() as
			| string
			| null

		const page = reqURL.searchParams.get('page')?.toString().toLowerCase() as
			| string
			| null

		const profileID = reqURL.searchParams
			.get('profileID')
			?.toString()
			.toLowerCase() as string | null

		const searchQuery = reqURL.searchParams
			.get('q')
			?.toString()
			.toLowerCase() as string | null

		if (!searchQuery || !table)
			return NextResponse.json(
				{ error: 'Missing some query name.' },
				{ status: 400 }
			)

		const supabase = createClient()

		if (profileID) {
			const columns = 'id, title, description, created_at, user_id'
			const { data: titleData, error: e1 } = await supabase
				.from(table)
				.select(columns)
				.eq('user_id', profileID)
				.textSearch('title', searchQuery, { type: 'phrase' })

			const { data: descriptionData, error: e2 } = await supabase
				.from(table)
				.select(columns)
				.eq('user_id', profileID)
				.textSearch('description', searchQuery, { type: 'phrase' })

			if (e1 || e2)
				return NextResponse.json(
					{ error: 'An error occurred while fetching data', details: e1 || e2 },
					{ status: 500 }
				)
			const data = [...titleData, ...descriptionData]

			// Remove duplicates using Set
			const uniqueData = Array.from(new Set(data.map((a) => a.id))).map(
				(id) => {
					return data.find((a) => a.id === id)
				}
			)

			return NextResponse.json(uniqueData, {
				headers: {
					'Content-Type': 'application/json',
				},
			})
		}

		const columns = 'id, title, description, created_at, user_id'
		const { data: titleData, error: e1 } = await supabase
			.from(table)
			.select(columns)
			.textSearch('title', searchQuery, { type: 'phrase' })

		const { data: descriptionData, error: e2 } = await supabase
			.from(table)
			.select(columns)
			.textSearch('description', searchQuery, { type: 'phrase' })

		if (e1 || e2)
			return NextResponse.json(
				{ error: 'An error occurred while fetching data', details: e1 || e2 },
				{ status: 500 }
			)
		const data = [...titleData, ...descriptionData]

		// Remove duplicates using Set
		const uniqueData = Array.from(new Set(data.map((a) => a.id))).map((id) => {
			return data.find((a) => a.id === id)
		})

		return NextResponse.json(uniqueData, {
			headers: {
				'Content-Type': 'application/json',
			},
		})
	} catch (err) {
		return NextResponse.json(
			{ error: 'An unexpected error occurred', details: err },
			{ status: 500 }
		)
	}
}

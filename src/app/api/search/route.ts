import { createClient } from '@/app/utils/server'
import { NextRequest, NextResponse } from 'next/server'
import { Tables } from '../../../../types/supabase'

const COLUMNS = 'id, title, description, created_at, user_id'

async function fetchData(
	supabase: any,
	table: string,
	searchQuery: string,
	profileID: string | null = null
) {
	const query = supabase.from(table).select(COLUMNS)
	if (profileID) query.eq('user_id', profileID)
	const { data: titleData, error: titleError } = await query.textSearch(
		'title',
		searchQuery,
		{ type: 'phrase' }
	)
	const { data: descriptionData, error: descriptionError } =
		await query.textSearch('description', searchQuery, { type: 'phrase' })

	if (titleError || descriptionError)
		throw new Error(titleError?.message || descriptionError?.message)

	return [...titleData, ...descriptionData]
}

function removeDuplicates(data: Tables<'files'>[]) {
	const uniqueIds = new Set()
	return data.filter((item) => {
		if (uniqueIds.has(item.id)) return false
		uniqueIds.add(item.id)
		return true
	})
}

export async function GET(request: NextRequest) {
	try {
		const reqURL = new URL(request.url)
		const table = reqURL.searchParams.get('table')?.toLowerCase()
		const searchQuery = reqURL.searchParams.get('q')?.toLowerCase()
		const profileID = reqURL.searchParams.get('profileID')?.toLowerCase()

		if (!table || !searchQuery)
			return NextResponse.json(
				{ error: 'Missing some query name.' },
				{ status: 400 }
			)

		const supabase = createClient()
		const data = await fetchData(supabase, table, searchQuery, profileID)
		const uniqueData = removeDuplicates(data)

		return NextResponse.json(uniqueData, {
			headers: { 'Content-Type': 'application/json' },
		})
	} catch (err) {
		return NextResponse.json(
			{ error: 'An unexpected error occurred', details: err },
			{ status: 500 }
		)
	}
}

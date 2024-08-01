import { createClient } from '@/app/utils/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
	try {
		const count = request.nextUrl.searchParams.get('count') as number | null
		const page = request.nextUrl.searchParams.get('page') as number | null
		const table = request.nextUrl.searchParams.get('table') as string | null
		const columns = request.nextUrl.searchParams.get('columns') as string | null
		const sort = request.nextUrl.searchParams.get('sort') as string | null
		const order = request.nextUrl.searchParams.get('order') as string | null
		const eq = request.nextUrl.searchParams.get('eq') as string | null
		const profileID = request.nextUrl.searchParams.get('profileID') as
			| string
			| null

		// Initialize Supabase client
		const supabase = createClient()

		if (eq && table === 'profiles' && columns) {
			const { data, error } = await supabase
				.from(table)
				.select(columns)
				.eq('id', eq)
			if (error) {
				return NextResponse.json(
					{ error: 'An error occurred while fetching data', details: error },
					{ status: 500 }
				)
			}
			if (!data || data.length === 0)
				return NextResponse.json({ error: 'No data found' }, { status: 404 })

			return NextResponse.json(data, {
				headers: {
					'Content-Type': 'application/json',
				},
			})
		}

		if (count && page && table === 'files' && columns && sort && order) {
			if (profileID) {
				const { data, error } = await supabase
					.from(table)
					.select(columns)
					.eq('user_id', profileID)
					.order(order, { ascending: sort === 'asc' })
					.range((page - 1) * count, page * count - 1)

				if (error) {
					return NextResponse.json(
						{ error: 'An error occurred while fetching data', details: error },
						{ status: 500 }
					)
				}

				if (!data || data.length === 0)
					return NextResponse.json({ error: 'No data found' }, { status: 404 })

				return NextResponse.json(data, {
					headers: {
						'Content-Type': 'application/json',
					},
				})
			} else {
				// Fetch data from Supabase
				const { data, error } = await supabase
					.from(table)
					.select(columns)
					.order(order, { ascending: sort === 'asc' })
					.range((page - 1) * count, page * count - 1)

				// Handle potential errors from Supabase
				if (error) {
					return NextResponse.json(
						{ error: 'An error occurred while fetching data', details: error },
						{ status: 500 }
					)
				}

				// Handle case where no data is found
				if (!data || data.length === 0)
					return NextResponse.json({ error: 'No data found' }, { status: 404 })

				// Respond with fetched data
				return NextResponse.json(data, {
					headers: {
						'Content-Type': 'application/json',
					},
				})
			}
		}
	} catch (err) {
		return NextResponse.json(
			{ error: 'An unexpected error occurred', details: err },
			{ status: 500 }
		)
	}
}

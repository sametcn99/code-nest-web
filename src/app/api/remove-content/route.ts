import { createClient } from '@/utils/server'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Handles the POST request to remove content.
 * @param req - The NextRequest object representing the incoming request.
 * @returns A NextResponse object with the result of the operation.
 */
export async function POST(req: NextRequest) {
	try {
		const { id }: { id: string } = await req.json()
		const supabase = createClient()
		const { error: e } = await supabase.from('files').delete().eq('id', id)
		if (e) throw Error(`Error removing content: ${e}`)
		if (e) throw e
		else return NextResponse.json({ response: 'success', status: 200 })
	} catch (error) {
		return NextResponse.json({
			response: 'An unknown error occurred',
			error: error,
			status: 500,
		})
	}
}

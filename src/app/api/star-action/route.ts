import { createClient } from '@/app/utils/server'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Handles the POST request for star actions.
 *
 * @param req - The NextRequest object representing the incoming request.
 * @returns A NextResponse object representing the response to the request.
 */
export async function POST(req: NextRequest) {
	try {
		const {
			contentId,
			starredBy,
			userId,
			action,
		}: {
			starredBy: string[]
			userId: string
			action: 'Add' | 'Remove'
			contentId: string
		} = await req.json()
		const supabase = createClient()
		if (action === 'Add') starredBy.push(userId)
		else if (action === 'Remove') starredBy.splice(starredBy.indexOf(userId), 1)
		const { error: e } = await supabase
			.from('files')
			.update({ starred_by: starredBy })
			.eq('id', contentId)

		if (e) throw e
		else
			return NextResponse.json({
				response: 'success',
				status: 200,
			})
	} catch (error) {
		return NextResponse.json({
			response: 'An unknown error occurred',
			error: error,
			status: 500,
		})
	}
}

import { generateText } from '@/app/utils/ai'
import { createClient } from '@/app/utils/server'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Handles the POST request for the AI route.
 * @param request - The NextRequest object representing the incoming request.
 * @returns A NextResponse object representing the response to the request.
 */
export async function POST(request: NextRequest) {
	try {
		const content = await request.json()
		const supabase = createClient()
		const auth = await supabase.auth.getUser()
		if (auth.data.user === null)
			return NextResponse.json({
				response: 'You must be logged in to access this route.',
				status: 401,
			})
		if (!content) throw new Error('Content is required.')
		const response = await generateText(JSON.stringify(content))
		return NextResponse.json({ response, status: 200 })
	} catch (error) {
		if (error instanceof Error)
			return NextResponse.json({ error: error, status: 500 })
		else
			return NextResponse.json({
				error: error,
				status: 500,
			})
	}
}

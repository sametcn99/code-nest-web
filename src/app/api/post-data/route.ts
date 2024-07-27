import { runWebHook } from '@/utils/discord'
import { createClient } from '@/utils/server'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'

/**
 * Handles the POST request for saving components to the database.
 * @param req - The NextRequest object containing the request data.
 * @returns A NextResponse object with the response data.
 */
export async function POST(req: NextRequest) {
	try {
		const { components, title, description } = await req.json()
		const supabase = createClient()
		const auth = await supabase.auth.getUser()

		// validate the components and the title
		if (components.length === 0)
			return NextResponse.json({
				response: 'Components cannot be empty',
				status: 400,
			})

		if (title === '')
			return NextResponse.json({
				response: 'Title cannot be empty',
				status: 400,
			})

		if (
			components.some(
				(component: FileTypes) =>
					component.value === '' ||
					component.filename === '' ||
					component.filename.length > 25 ||
					component.value.length > 10000 ||
					components.length > 7
			)
		)
			return NextResponse.json({
				response: 'Invalid components',
				status: 400,
			})

		const data = {
			user_id: auth.data.user?.id,
			content: components,
			created_at: new Date(),
			title: title,
			description: description,
		}

		const {
			error,
			statusText,
			status,
			data: res,
		} = await supabase.from('files').insert(data).select('*')
		console.log(res)

		if (error)
			throw new Error('An error occurred while saving the components' + error)

		const payload: WebHookPayload = {
			embeds: [
				{
					title: `${auth.data.user?.user_metadata.full_name} Kod Paylaştı.`,
					description: `${auth.data.user?.user_metadata.full_name} \`${title}\` **başlıklı bir kod paylaştı* [İncele](${process.env.NEXT_PUBLIC_BASE_URL}/code/${res[0].id})`,
					url: `${process.env.NEXT_PUBLIC_BASE_URL}/code/${res[0].id}`,
					color: 16711884, // purple
				},
			],
		}

		await runWebHook(payload, 'share')
		return NextResponse.json({
			response: 'Components saved successfully',
			pathname: path.join('/code', res[0].id),
			statusText: statusText,
			status: status,
		})
	} catch (error) {
		return NextResponse.json({
			response: 'An unknown error occurred',
			error: error,
			status: 500,
		})
	}
}

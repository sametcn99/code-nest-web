import { runWebHook } from '@/utils/discord'
import { createClient } from '@/utils/server'
import { NextRequest, NextResponse } from 'next/server'
import { Tables } from '../../../../types/supabase'

/**
 * Handles the POST request to update a user's profile.
 * @param req - The NextRequest object representing the incoming request.
 * @returns A NextResponse object with the updated profile information or an error message.
 */
export async function POST(req: NextRequest) {
	try {
		const { user }: { user: Tables<'profiles'> } = await req.json()
		const supabase = createClient()

		const { error: e } = await supabase
			.from('profiles')
			.update(user)
			.eq('id', user.id)
		if (e) throw e

		const payload: WebHookPayload = {
			embeds: [
				{
					color: 65494,
					title: `${user.full_name} Profilini Güncelledi. <a:AteGif:1263073399811604490>`,
					description: `${user.full_name} (@${user.username}) adlı kullanıcı profil bilgileri güncellendi.`,
					url: `${process.env.NEXT_PUBLIC_BASE_URL}/user/${user.id}`,
				},
			],
		}
		await runWebHook(payload, 'edit')
		return NextResponse.json({ response: 'success', status: 200 })
	} catch (error) {
		return NextResponse.json({
			response: 'An unknown error occurred',
			error: error,
			status: 500,
		})
	}
}

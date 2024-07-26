import { createClient } from '@/utils/server'
import { NextResponse } from 'next/server'

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL

export async function GET() {
	try {
		const supabase = createClient()
		const authUser = await supabase.auth.getUser()
		const { data: user, error: userError } = await supabase
			.from('profiles')
			.select('*')
			.eq('id', authUser.data.user?.id)
			.single()

		if (userError || !user) throw Error('User not found')
		const { error: signOutError } = await supabase.auth.signOut()

		if (signOutError) throw Error('Sign out failed')

		// Prepare the payload for Discord webhook
		const payload = {
			embeds: [
				{
					description: `${user.username} **adlı kullanıcı siteden çıkış yaptı** <a:kGif:1263073433533677568>`,
					color: 0x2b2d31, // Dark color
					timestamp: new Date().toISOString(), // Add timestamp if needed
				},
			],
		}

		if (!DISCORD_WEBHOOK_URL) throw Error('Discord webhook URL is missing')

		// Send the log to Discord webhook
		await fetch(DISCORD_WEBHOOK_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		})

		return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/`)
	} catch (error) {
		console.error('Error during sign out:', error)
		return new Response('Error processing your request', { status: 500 })
	}
}

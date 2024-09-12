import { runWebHook } from '@/utils/discord'
import { createClient } from '@/utils/server'
import { NextResponse } from 'next/server'

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

		const payload: WebHookPayload = {
			embeds: [
				{
					color: 16711680, // red
					title: `${user.full_name} Çıkış Yaptı. <a:kGif:1263073433533677568>`,
					description: `\`${user.full_name}\` **adlı kullanıcı siteden çıkış yaptı.**`,
					url: `${process.env.NEXT_PUBLIC_BASE_URL}/user/${user.id}`,
				},
			],
		}

		await runWebHook(payload, 'login')
		return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/`)
	} catch (error) {
		console.error('Error during sign out:', error)
		return new Response('Error processing your request', { status: 500 })
	}
}

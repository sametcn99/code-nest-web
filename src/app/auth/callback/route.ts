import { runWebHook } from '@/utils/discord'
import { createClient } from '@/utils/server'
import { type CookieOptions, createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

/**
 * Handles the GET request for the callback route.
 * @param request - The request object.
 * @returns A NextResponse object that redirects the user to the appropriate location.
 */
export async function GET(request: Request) {
	const { searchParams, origin } = new URL(request.url)
	const code = searchParams.get('code')
	const next = searchParams.get('next') ?? '/'
	if (code) {
		const cookieStore = cookies()
		const supabase = createServerClient(
			process.env.NEXT_PUBLIC_SUPABASE_URL!,
			process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
			{
				cookies: {
					getAll: async () => {
						return cookieStore.getAll()
					},
					setAll: async (
						cookiesToSet: {
							name: string
							value: string
							options: CookieOptions
						}[]
					) => {
						cookiesToSet.forEach(({ name, value, options }) =>
							cookieStore.set(name, value, options)
						)
					},
				},
			}
		)
		const { error } = await supabase.auth.exchangeCodeForSession(code)
		console.log('error', error)
		if (!error) {
			const supabase = createClient()
			const { data } = await supabase.auth.getUser()
			if (data?.user) {
				const payload: WebHookPayload = {
					embeds: [
						{
							color: 0x00ff00,
							title: `${data.user.user_metadata.full_name} Giriş Yaptı <a:GiriGif:1263073468782477322>`,
							description: `${data.user.user_metadata.full_name} adlı kullanıcı sitede oturum açtı.`,
							url: `${origin}/user/${data.user.id}`,
						},
					],
				}
				await runWebHook(payload)
			}
			return NextResponse.redirect(`${origin}${next}`)
		}
	}
	return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}

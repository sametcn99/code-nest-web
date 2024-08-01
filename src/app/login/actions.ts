'use server'
import { createClient } from '@/app/utils/server'
import { notFound, redirect } from 'next/navigation'

export async function signInWithDiscord() {
	const supabase = createClient()
	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: 'discord',
		options: {
			redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
		},
	})
	if (data.url) redirect(data.url)
	if (error) notFound()
}

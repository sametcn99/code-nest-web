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

    return NextResponse.json({ response: 'success', status: 200 })
  } catch (error) {
    return NextResponse.json({
      response: 'An unknown error occurred',
      error: error,
      status: 500,
    })
  }
}

import { createClient } from '@/utils/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = createClient()
    const auth = await supabase.auth.getUser()

    return NextResponse.json(auth, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (err) {
    return NextResponse.json(
      { error: 'An unexpected error occurred', details: err },
      { status: 500 }
    )
  }
}

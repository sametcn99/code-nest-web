import { createClient } from '@/utils/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(Request: NextRequest) {
  try {
    const supabase = createClient()
    const reqURL = new URL(Request.url)
    const id = reqURL.searchParams.get('id')
    const table = reqURL.searchParams.get('table')
    let count = 0

    if (!id || !table)
      return NextResponse.json(
        { error: 'Please provide an id and table' },
        { status: 400 }
      )

    const { data, error } = await supabase
      .from('views')
      .select('*')
      .eq('_id', id)
      .single()

    if (error?.hint === null) {
      const { data: insertData, error: insertError } = await supabase
        .from('views')
        .insert([{ _id: id, count: 1, table: table }])
      if (insertError)
        return NextResponse.json(
          { error: 'An unexpected error occurred', details: insertError },
          { status: 500 }
        )
      count = 1
      NextResponse.json({ count: count, status: 200 })
    } else if (error) {
      return NextResponse.json(
        { error: 'An unexpected error occurred', details: error },
        { status: 500 }
      )
    }

    count = data ? data.count + 1 : 1

    const { error: updateError } = await supabase
      .from('views')
      .update({ count })
      .eq('_id', id)

    if (updateError) {
      return NextResponse.json(
        { error: 'An unexpected error occurred', details: updateError },
        { status: 500 }
      )
    }

    return NextResponse.json({ count: count, status: 200 })
  } catch (err) {
    return NextResponse.json(
      { error: 'An unexpected error occurred', details: err },
      { status: 500 }
    )
  }
}

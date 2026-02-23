import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      form_type,
      source_page,
      name,
      email,
      phone,
      company,
      iia_id,
      message,
      metadata,
    } = body

    if (!form_type || !email) {
      return NextResponse.json(
        { error: 'form_type and email are required' },
        { status: 400 }
      )
    }

    // Use internal URL for server-side requests in Docker
    const supabaseUrl = process.env.SUPABASE_INTERNAL_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const { data, error } = await supabase
      .from('leads')
      .insert({
        form_type,
        source_page,
        name,
        email,
        phone,
        company,
        iia_id,
        message,
        metadata,
      })
      .select()
      .single()

    if (error) {
      console.error('Error saving lead:', error)
      return NextResponse.json(
        { error: 'Failed to save form submission' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error processing form submission:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

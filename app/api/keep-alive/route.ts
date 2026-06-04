import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

// API to keep Supabase alive
export async function GET() {
  const supabase = createServerClient()

  const { error } = await supabase.from('heart_beat').select('id').limit(1)

  if (error) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}

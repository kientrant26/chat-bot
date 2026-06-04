import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { siteConfig } from '@/constants/siteConfig'

// API to keep Supabase alive via Vercel cron job - vercel.json
export async function GET(req: NextRequest) {
  // check the secret in production to prevent abuse
  if (!siteConfig.isDev) {
    const authHeader = req.headers.get('authorization')
    if (authHeader !== `Bearer ${siteConfig.cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  const supabase = createServerClient()

  const { error } = await supabase.from('heart_beat').select('id').limit(1)

  if (error) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}

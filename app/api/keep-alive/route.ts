import { NextRequest, NextResponse } from 'next/server'
import { keepAlive } from '@/services/heartBeat'
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

  const result = await keepAlive()

  if (!result) {
    return NextResponse.json(
      { error: 'Failed to keep Supabase alive' },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true })
}

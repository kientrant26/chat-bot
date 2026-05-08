import { PAGE_URL } from '@/constants/url'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const error = searchParams.get('error')

  // Handle the error when authentication fails, you can log it or perform other actions here
  // Redirect to the error page with the error message as a query parameter
  return NextResponse.redirect(
    new URL(
      `${PAGE_URL.Error}?error=${encodeURIComponent(error || 'Authentication failed')}`,
      request.url
    )
  )
}

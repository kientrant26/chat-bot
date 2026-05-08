'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const errorCode = searchParams.get('error')

  useEffect(() => {
    // throw error to trigger the error boundary - app/error.tsx
    throw new Error(errorCode || 'Error happened')
  }, [errorCode])

  return null
}

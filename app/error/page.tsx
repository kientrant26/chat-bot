'use client'

import { useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function AuthErrorContent() {
  const searchParams = useSearchParams()
  const errorCode = searchParams.get('error')

  useEffect(() => {
    // throw error to trigger the error boundary - app/error.tsx
    throw new Error(errorCode || 'Error happened')
  }, [errorCode])

  return null
}

export default function ErrorPage() {
  return (
    <Suspense fallback={null}>
      <AuthErrorContent />
    </Suspense>
  )
}

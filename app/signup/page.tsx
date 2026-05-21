import { Suspense } from 'react'
import SignUpContainer from '@/components/SignUpContainer'
import Loading from '@/components/Loading'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { PAGE_URL } from '@/constants/url'

async function SignUpContent() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect(PAGE_URL.HOME)
  }

  return <SignUpContainer />
}

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Suspense fallback={<Loading />}>
          <SignUpContent />
        </Suspense>
      </div>
    </div>
  )
}

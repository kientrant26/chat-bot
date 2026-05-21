import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { ReactNode, Suspense } from 'react'
import { PAGE_URL } from '@/constants/url'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import logger from '../../utils/logger'
import Loading from '../Loading'

interface WithGuardProps {
  children: ReactNode
  redirectTo?: string
  fallback?: ReactNode
}

// Internal component that performs the auth check
async function AuthCheck({
  children,
  redirectTo,
}: Omit<WithGuardProps, 'fallback'>) {
  const session = await getServerSession(authOptions)

  if (!session) {
    logger.info('Server-side: User not authenticated, redirecting to login')
    redirect(redirectTo || PAGE_URL.LOGIN)
  }

  return <>{children}</>
}

// Handles authentication guard for server components with built-in Suspense
export default function ServerGuard({
  children,
  redirectTo,
  fallback = <Loading />,
}: WithGuardProps) {
  return (
    <Suspense fallback={fallback}>
      <AuthCheck redirectTo={redirectTo}>{children}</AuthCheck>
    </Suspense>
  )
}

// Higher-order component version for server components
export function withServerGuard<P extends object>(
  Component: React.ComponentType<P>,
  options: {
    redirectTo?: string
    fallbackComponent?: ReactNode
  } = {}
) {
  return async function WithServerGuardComponent(props: P) {
    return (
      <ServerGuard {...options}>
        <Component {...props} />
      </ServerGuard>
    )
  }
}

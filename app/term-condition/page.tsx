import { Suspense } from 'react'
import { getTermContent } from '@/services/termConditionService'
import TermConditionContent from '@/components/TermConditionContent'
import Loading from '@/components/Loading'

async function TermContent() {
  const data = await getTermContent(true)
  return <TermConditionContent content={data} />
}

export default function TermAndConditionPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Suspense fallback={<Loading />}>
          <TermContent />
        </Suspense>
      </div>
    </div>
  )
}

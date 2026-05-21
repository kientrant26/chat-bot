import QuizCard from '@/components/quiz-master/QuizCard'
import { quizzes } from '@/__mock__/quizzes'
import { Suspense } from 'react'

async function QuizGrid() {
  // Could fetch from API/database here
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {quizzes.map(quiz => (
        <QuizCard key={quiz.id} quiz={quiz} />
      ))}
    </div>
  )
}

function QuizGridSkeleton() {
  return <div>Loading quizzes...</div>
}

export default function QuizzesPage() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Available Quizzes</h1>
        <p className="text-gray-600 mb-8">
          Choose a quiz to test your knowledge
        </p>

        {/* Dynamic content - wrapped in Suspense */}
        <Suspense fallback={<QuizGridSkeleton />}>
          <QuizGrid />
        </Suspense>
      </div>
    </main>
  )
}

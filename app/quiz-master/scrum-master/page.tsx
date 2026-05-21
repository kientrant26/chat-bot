import { Suspense } from 'react'
import Quiz from '@/components/quiz-master/Quiz'
import Loading from '@/components/Loading'
import { getQuestions } from '@/services/questions'

async function QuizContent() {
  const questions = await getQuestions()

  if (questions.length === 0) {
    return <p>No questions available.</p>
  }
  return <Quiz questionBank={questions} />
}

export default function ScrumMasterQuizPage() {
  return (
    <Suspense fallback={<Loading />}>
      <QuizContent />
    </Suspense>
  )
}

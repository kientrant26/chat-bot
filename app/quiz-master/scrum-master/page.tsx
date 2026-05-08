import Quiz from '@/components/quiz-master/Quiz'
import { getQuestions } from '@/services/questions'

export default async function ScrumMasterQuizPage() {
  const questions = await getQuestions()

  if (questions.length === 0) {
    return <p>No questions available.</p>
  }
  return <Quiz questionBank={questions} />
}

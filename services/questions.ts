import { createServerClient } from '@/lib/supabase'
import { DBQuestionRow, QuestionBank, QuestionTopic } from '@/types/quiz'
import logger from '@/utils/logger'

export const getQuestions = async (): Promise<QuestionBank[]> => {
  try {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .eq('topic', QuestionTopic.SCRUM_MASTER)
      .order('create_date', { ascending: true })

    if (error) {
      throw new Error(error.message)
    }

    const rows = data as DBQuestionRow[]
    logger.info(`Fetched ${rows.length} questions from the database.`)

    const questions =
      rows.map((d: DBQuestionRow) => ({
        ...d.question,
        id: d.id,
      })) || []

    logger.info(`Returning ${questions.length} questions.`)
    return questions
  } catch (error) {
    logger.error('Failed to fetch questions:', error)
    return []
  }
}

import { createServerClient } from '@/lib/supabase'
import logger from '@/utils/logger'

export const keepAlive = async (): Promise<boolean> => {
  try {
    const supabase = createServerClient()
    const { error } = await supabase.from('heart_beat').select('id').limit(1)

    if (error) {
      throw new Error(error.message)
    }

    return true
  } catch (error) {
    logger.error('Failed to keep Supabase alive:', error)
    return false
  }
}

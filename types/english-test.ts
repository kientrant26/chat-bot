export interface ListeningTask {
  id: number
  script: string
  question: string
  options: string[]
  correct: number
  explanation: string
}

export interface GrammarQuestion {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
}

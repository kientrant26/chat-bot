'use client'

import { Clock, Trophy, TrendingUp } from 'lucide-react'
import { TEST_DATA } from '@/__mock__/english-test'
import { useCallback, useEffect, useRef, useState } from 'react'
import MCQCard from './MCQCard'
import ListeningCard from './ListeningCard'
import SpeakingCard from './SpeakingCard'
import ReadingCard from './ReadingCard'

const ALL_MCQS = [...TEST_DATA.grammarQuestions, ...TEST_DATA.listeningTasks]
const TOTAL_MCQS = ALL_MCQS.length

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`
}

export default function EnglishTest() {
  const [answers, setAnswers] = useState<{ [questionId: number]: number }>({})
  const [timeLeft, setTimeLeft] = useState(TEST_DATA.meta.durationSeconds)
  const [submitted, setSubmitted] = useState(false)
  const submittedRef = useRef(false)

  const handleAnswer = useCallback((id: number, idx: number) => {
    setAnswers(prev => (prev[id] !== undefined ? prev : { ...prev, [id]: idx }))
  }, [])

  const submitTest = useCallback(() => {
    if (submittedRef.current) return
    submittedRef.current = true
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    if (submitted) return
    const interval = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(interval)
          submitTest()
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [submitted, submitTest])

  const answeredCount = Object.keys(answers).length
  const totalScore = ALL_MCQS.reduce(
    (sum, q) => sum + (answers[q.id] === q.correct ? 1 : 0),
    0
  )
  const percentage = Math.round((totalScore / TOTAL_MCQS) * 100)
  const isPass = percentage >= TEST_DATA.meta.passThreshold

  const listeningOK =
    answers[TEST_DATA.listeningTasks[0]?.id] ===
      TEST_DATA.listeningTasks[0]?.correct &&
    answers[TEST_DATA.listeningTasks[1]?.id] ===
      TEST_DATA.listeningTasks[1]?.correct

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 pb-12">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-gradient-to-br from-indigo-600 to-indigo-900 text-white py-5 shadow-md">
        <div className="max-w-3xl mx-auto px-5 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold">{TEST_DATA.meta.title}</h2>
            <p className="text-sm opacity-90">{TEST_DATA.meta.level}</p>
          </div>
          <div className="bg-white/20 px-4 py-2 rounded-full font-bold flex items-center gap-2">
            <Clock size={18} />
            <span>{formatTime(timeLeft)}</span>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-5 mt-5">
        {/* Progress */}
        <div className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-200">
          <div className="flex justify-between mb-2 font-semibold text-sm">
            <span>Progress</span>
            <span>{`${answeredCount} / ${TOTAL_MCQS} MCQs Completed`}</span>
          </div>
          <div className="bg-gray-200 h-2.5 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 transition-all duration-300"
              style={{ width: `${(answeredCount / TOTAL_MCQS) * 100}%` }}
            />
          </div>
        </div>

        {!submitted && (
          <>
            {/* Grammar */}
            <h2 className="text-xl font-bold mb-4 mt-6">
              Section I: Knowledge - Grammar
            </h2>
            {TEST_DATA.grammarQuestions.map((q, idx) => (
              <MCQCard
                key={q.id}
                id={q.id}
                badge={`I. Grammar - Q${idx + 1}/${TEST_DATA.grammarQuestions.length}`}
                question={q.question}
                options={q.options}
                correct={q.correct}
                explanation={q.explanation}
                onAnswer={handleAnswer}
                selected={answers[q.id]}
              />
            ))}

            {/* Listening */}
            <h2 className="text-xl font-bold mb-4 mt-6">
              Section II: Comprehension - Listening
            </h2>
            {TEST_DATA.listeningTasks.map((t, idx) => (
              <ListeningCard
                key={t.id}
                task={t}
                idx={idx}
                totalListening={TEST_DATA.listeningTasks.length}
                onAnswer={handleAnswer}
                selected={answers[t.id]}
              />
            ))}

            {/* Reading */}
            <h2 className="text-xl font-bold mb-4 mt-6">
              Section III: Comprehension - Reading
            </h2>
            {TEST_DATA.readingPassages.map((p, idx) => (
              <ReadingCard
                key={p.id}
                passage={p}
                idx={idx}
                totalPassages={TEST_DATA.readingPassages.length}
                onAnswer={handleAnswer}
                answers={answers}
              />
            ))}

            {/* Speaking */}
            <h2 className="text-xl font-bold mb-4 mt-6">
              Section III: Production - Speaking Scenarios
            </h2>
            {TEST_DATA.speakingScenarios.map(s => (
              <SpeakingCard key={s.id} scenario={s} />
            ))}

            <button
              onClick={submitTest}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg py-4 rounded-lg transition-colors"
            >
              Submit Test & Get Results 📊
            </button>
          </>
        )}

        {submitted && (
          <div className="bg-white rounded-xl p-8 text-center shadow-md">
            <h2 className="text-xl font-bold mb-2">Test Results Summary</h2>
            <div
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-bold text-lg my-4 ${
                isPass
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {isPass ? <Trophy size={20} /> : <TrendingUp size={20} />}
              {isPass ? 'STATUS: PASS' : 'STATUS: NEEDS IMPROVEMENT'}
            </div>
            <p className="text-xl font-bold mb-6">
              MCQ Score: {totalScore} / {TOTAL_MCQS} ({percentage}%)
            </p>
            <div className="text-left bg-gray-50 p-5 rounded-lg">
              <h3 className="font-bold mb-3">
                Performance Analysis & Feedback
              </h3>
              <p className="mb-3">
                <strong>Grammar & Vocabulary:</strong>{' '}
                {totalScore >= 6
                  ? 'Strong knowledge of workplace tenses and structures.'
                  : 'Review workplace conditional sentences, passive voice, and phrasal verbs.'}
              </p>
              <p className="mb-3">
                <strong>Listening Skills:</strong>{' '}
                {listeningOK
                  ? 'Excellent key-information retrieval in professional audio phone calls.'
                  : 'Focus on identifying specific actionable details in audio announcements.'}
              </p>
              <p>
                <strong>Speaking & Production:</strong> Compare your
                self-responses with the provided sample answers and rubrics to
                refine your professional tone, conciseness, and tactfulness.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

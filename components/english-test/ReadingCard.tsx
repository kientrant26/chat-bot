import MCQCard from './MCQCard'

interface ReadingQuestion {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
}

interface ReadingPassage {
  id: number
  title: string
  text: string
  questions: ReadingQuestion[]
}

interface ReadingCardProps {
  passage: ReadingPassage
  idx: number
  totalPassages: number
  onAnswer: (id: number, idx: number) => void
  answers: { [questionId: number]: number }
}

export default function ReadingCard({
  passage,
  idx,
  totalPassages,
  onAnswer,
  answers,
}: ReadingCardProps) {
  return (
    <div className="bg-white rounded-xl p-5 mb-4 shadow-sm border border-gray-200">
      <h4 className="text-indigo-700 font-bold mb-3">
        {`III. Reading - Passage ${idx + 1}/${totalPassages}: ${passage.title}`}
      </h4>

      <div className="bg-slate-50 border-l-4 border-slate-400 rounded-md p-4 mb-4 text-sm leading-relaxed whitespace-pre-line">
        {passage.text}
      </div>

      {passage.questions.map((q, qIdx) => (
        <MCQCard
          key={q.id}
          id={q.id}
          badge={`Q${qIdx + 1}/${passage.questions.length}`}
          question={q.question}
          options={q.options}
          correct={q.correct}
          explanation={q.explanation}
          onAnswer={onAnswer}
          selected={answers[q.id]}
        />
      ))}
    </div>
  )
}

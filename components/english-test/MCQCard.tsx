import SectionBadge from '@/components/english-test/SectionBadge'
import { ComponentProps } from '@/types/component'

interface MCQCardProps extends Omit<ComponentProps, 'id'> {
  badge: string
  question: string
  options: string[]
  correct: number
  explanation: string
  id: number
  onAnswer: (id: number, selectedOptionIndex: number) => void
  selected?: number
}

export default function MCQCard({
  badge,
  children,
  question,
  options,
  correct,
  explanation,
  id,
  onAnswer,
  selected,
}: MCQCardProps) {
  const answered = selected !== undefined

  return (
    <div className="bg-white rounded-xl p-6 mb-6 shadow-sm border border-gray-200">
      <SectionBadge>{badge}</SectionBadge>
      {children}
      <div className="font-semibold text-lg mb-4">{question}</div>
      <div className="flex flex-col gap-2.5">
        {options.map((opt, i) => {
          let extra = 'bg-gray-50 border-gray-200 hover:bg-gray-100'
          if (answered && i === correct)
            extra =
              'bg-emerald-100 border-emerald-500 text-emerald-800 font-semibold'
          else if (answered && i === selected)
            extra = 'bg-red-100 border-red-500 text-red-800'

          return (
            <button
              key={i}
              disabled={answered}
              onClick={() => onAnswer(id, i)}
              className={`w-full text-left px-4 py-3 rounded-lg border text-[15px] flex items-center transition-colors disabled:cursor-default ${extra}`}
            >
              <strong className="mr-2">{String.fromCharCode(65 + i)}.</strong>{' '}
              {opt}
            </button>
          )
        })}
      </div>
      {answered && (
        <div className="mt-4 px-4 py-3 bg-sky-50 border-l-4 border-sky-500 rounded text-sm text-sky-800">
          {explanation}
        </div>
      )}
    </div>
  )
}

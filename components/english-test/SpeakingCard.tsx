import { useState } from 'react'
import SectionBadge from './SectionBadge'

interface SpeakingCardProps {
  scenario: {
    id: number
    title: string
    prompt: string
    sample: string
    rubric: string
  }
}

export default function SpeakingCard({ scenario }: SpeakingCardProps) {
  const [showSample, setShowSample] = useState(false)
  const [text, setText] = useState('')

  return (
    <div className="bg-white rounded-xl p-6 mb-6 shadow-sm border border-gray-200">
      <SectionBadge>{`III. Speaking - Scenario ${scenario.id}`}</SectionBadge>
      <div className="font-semibold text-lg mb-2">{scenario.title}</div>
      <p className="text-gray-600 mb-3">{scenario.prompt}</p>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Type your response here for practical practice..."
        className="w-full h-24 p-3 border border-gray-200 rounded-lg resize-y text-[15px] mb-3"
      />
      <button
        onClick={() => setShowSample(v => !v)}
        className="text-indigo-600 font-semibold underline text-sm"
      >
        Show Sample Answer & Rubric 💡
      </button>
      {showSample && (
        <div className="mt-3 px-4 py-3 bg-slate-50 border border-dashed border-slate-300 rounded-lg text-sm">
          <p className="font-semibold mb-1">Sample Response:</p>
          <p className="text-slate-800 mb-2">&quot;{scenario.sample}&quot;</p>
          <p className="text-slate-600 text-[13px]">{scenario.rubric}</p>
        </div>
      )}
    </div>
  )
}

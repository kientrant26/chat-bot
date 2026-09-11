import { useState } from 'react'
import { Volume2, ChevronDown, ChevronUp } from 'lucide-react'
import SectionBadge from './SectionBadge'
import MCQBody from './MCQBody'
import { ListeningTask } from '@/types/english-test'

interface ListeningCardProps {
  totalListening: number
  task: ListeningTask
  idx: number
  onAnswer: (id: number, selected: number) => void
  selected?: number
}

export default function ListeningCard({
  totalListening,
  task,
  idx,
  onAnswer,
  selected,
}: ListeningCardProps) {
  const [showTranscript, setShowTranscript] = useState(false)

  const playAudio = () => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-Speech is not supported in your browser.')
      return
    }
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(task.script)
    utterance.lang = 'en-US'
    utterance.rate = 0.9
    window.speechSynthesis.speak(utterance)
  }

  return (
    <div className="bg-white rounded-xl p-6 mb-6 shadow-sm border border-gray-200">
      <SectionBadge>{`II. Listening - Task ${idx + 1}/${totalListening}`}</SectionBadge>
      <div className="flex items-center gap-3 mb-3">
        <button
          onClick={playAudio}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2.5 rounded-lg font-semibold flex items-center gap-2"
        >
          <Volume2 size={18} /> Play Audio Script
        </button>
        <button
          onClick={() => setShowTranscript(v => !v)}
          className="text-indigo-600 font-semibold underline text-sm flex items-center gap-1"
        >
          Show/Hide Transcript{' '}
          {showTranscript ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>
      {showTranscript && (
        <div className="mb-3 italic text-gray-600 bg-gray-100 p-3 rounded-md">
          &quot;{task.script}&quot;
        </div>
      )}
      <MCQBody
        id={task.id}
        question={task.question}
        options={task.options}
        correct={task.correct}
        explanation={task.explanation}
        onAnswer={onAnswer}
        selected={selected}
      />
    </div>
  )
}

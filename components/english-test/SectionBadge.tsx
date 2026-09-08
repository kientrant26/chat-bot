import { ComponentProps } from '@/types/component'

export default function SectionBadge({ children }: ComponentProps) {
  return (
    <span className="inline-block bg-indigo-100 text-indigo-700 font-semibold px-3 py-1 rounded-full text-xs uppercase tracking-wide mb-3">
      {children}
    </span>
  )
}

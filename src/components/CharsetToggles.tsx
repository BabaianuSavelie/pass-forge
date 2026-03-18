import type { CharsetOptions } from '../types'

interface Props {
  charset: CharsetOptions
  onToggle: (key: keyof CharsetOptions) => void
}

const TOGGLES: { key: keyof CharsetOptions; label: string; example: string }[] = [
  { key: 'uppercase', label: 'ABC', example: 'Uppercase' },
  { key: 'lowercase', label: 'abc', example: 'Lowercase' },
  { key: 'numbers',   label: '123', example: 'Numbers' },
  { key: 'symbols',   label: '!@#', example: 'Symbols' },
]

export function CharsetToggles({ charset, onToggle }: Props) {
  const activeCount = Object.values(charset).filter(Boolean).length

  return (
    <div className="space-y-2">
      <span className="text-sm text-white/70 font-medium">Character Types</span>
      <div className="grid grid-cols-2 gap-2">
        {TOGGLES.map(({ key, label, example }) => {
          const isActive = charset[key]
          const isLastActive = isActive && activeCount === 1
          return (
            <button
              key={key}
              role="switch"
              aria-checked={isActive}
              aria-label={example}
              onClick={() => onToggle(key)}
              disabled={isLastActive}
              className={`
                flex items-center gap-2.5 px-4 py-3 rounded-xl border
                text-sm font-medium
                transition-all duration-200
                cursor-pointer
                disabled:cursor-not-allowed disabled:opacity-60
                ${isActive
                  ? 'bg-gradient-to-r from-cyan-400/20 to-violet-500/20 border-cyan-400/50 text-white'
                  : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:border-white/20 hover:text-white/70'
                }
              `}
            >
              <span className="font-mono text-base w-8 text-center leading-none">
                {label}
              </span>
              <span>{example}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

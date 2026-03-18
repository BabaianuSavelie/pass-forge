import type { StrengthLevel } from '../types'

interface Props {
  strength: StrengthLevel
  crackTime?: string
  entropy?: number
}

const LEVELS: StrengthLevel[] = ['weak', 'fair', 'good', 'strong']

const COLORS: Record<StrengthLevel, { active: string; glow: string; label: string }> = {
  weak:   { active: 'bg-red-500',    glow: 'shadow-[0_0_8px_rgba(239,68,68,0.7)]',   label: 'text-red-400' },
  fair:   { active: 'bg-orange-400', glow: 'shadow-[0_0_8px_rgba(251,146,60,0.7)]',  label: 'text-orange-400' },
  good:   { active: 'bg-yellow-400', glow: 'shadow-[0_0_8px_rgba(250,204,21,0.7)]',  label: 'text-yellow-400' },
  strong: { active: 'bg-green-400',  glow: 'shadow-[0_0_8px_rgba(74,222,128,0.7)]',  label: 'text-green-400' },
}

export function StrengthIndicator({ strength, crackTime, entropy }: Props) {
  const activeIndex = LEVELS.indexOf(strength)
  const { label } = COLORS[strength]

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-white/50">Strength</span>
        <span className={`text-sm font-semibold capitalize ${label}`}>{strength}</span>
      </div>
      <div className="flex gap-1.5">
        {LEVELS.map((level, i) => {
          const isActive = i <= activeIndex
          const { active, glow } = COLORS[strength]
          return (
            <div
              key={level}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                isActive ? `${active} ${glow}` : 'bg-white/10'
              }`}
            />
          )
        })}
      </div>
      {crackTime && (
        <p className="text-xs text-white/30 text-right">
          Crack time (bcrypt): <span className="text-white/50">{crackTime}</span>
        </p>
      )}
      {entropy !== undefined && (
        <p className="text-xs text-white/30 text-right font-mono">
          Entropy:{' '}
          <span className="text-white/50">
            {entropy.toFixed(1)} bits
          </span>
        </p>
      )}
    </div>
  )
}

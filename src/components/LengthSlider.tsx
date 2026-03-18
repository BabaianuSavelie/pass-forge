interface Props {
  length: number
  onChange: (length: number) => void
}

const MIN = 4
const MAX = 64

export function LengthSlider({ length, onChange }: Props) {
  const pct = ((length - MIN) / (MAX - MIN)) * 100

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label htmlFor="length-slider" className="text-sm text-white/70 font-medium">
          Length
        </label>
        <span className="text-sm font-bold text-cyan-400 tabular-nums w-6 text-right">
          {length}
        </span>
      </div>
      <input
        id="length-slider"
        type="range"
        min={MIN}
        max={MAX}
        value={length}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-1.5 slider-thumb cursor-pointer"
        style={{ '--slider-pct': `${pct}%` } as React.CSSProperties}
      />
      <div className="flex justify-between text-xs text-white/30">
        <span>{MIN}</span>
        <span>{MAX}</span>
      </div>
    </div>
  )
}

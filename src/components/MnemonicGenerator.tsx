import type { StrengthLevel } from '../types'
import { StrengthIndicator } from './StrengthIndicator'
import { LEET_LEVEL_LABELS, type LeetLevel } from '../utils/leet'
import { WORDLIST } from '../data/wordlist'

const LEET_LEVELS: LeetLevel[] = [0, 1, 2, 3]

const LEET_EXAMPLES: Record<LeetLevel, string> = {
  0: 'no change',
  1: 'a→@ e→3 i→1 o→0',
  2: '+ s→$ t→7 b→8 g→9',
  3: '+ l→| c→( z→2 h→#',
}

/** Bits per word for display. */
const BITS_PER_WORD = Math.log2(WORDLIST.length).toFixed(2)

interface Props {
  passphrase: string
  wordCount: number
  leetLevel: LeetLevel
  password: string
  strength: StrengthLevel
  crackTime: string
  entropy: number
  copied: boolean
  regenerate: () => void
  setWordCount: (n: number) => void
  setLeetLevel: (l: LeetLevel) => void
  copyToClipboard: () => void
}

export function MnemonicGenerator({
  passphrase,
  wordCount,
  leetLevel,
  password,
  strength,
  crackTime,
  entropy,
  copied,
  regenerate,
  setWordCount,
  setLeetLevel,
  copyToClipboard,
}: Props) {

  const wordCountPct = ((wordCount - 3) / (10 - 3)) * 100
  const leetActive = leetLevel > 0

  return (
    <div className="flex flex-col gap-5">

      {/* Algorithm note */}
      <div className="flex items-start gap-2.5 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
        <svg className="mt-0.5 flex-shrink-0 text-cyan-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <p className="text-xs text-white/40 leading-relaxed">
          <span className="text-white/60 font-medium">Diceware</span> — each word is chosen by a CSPRNG
          from a {WORDLIST.length}-word list ({BITS_PER_WORD} bits/word).
          The passphrase itself is the password; Leet adds visual complexity only.
        </p>
      </div>

      {/* Passphrase display (the "dice roll" result) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-white/70 font-medium">Diceware Passphrase</span>
          <span className="text-xs text-white/30">{wordCount} words · {entropy.toFixed(1)} bits</span>
        </div>
        <div className="
          bg-white/5 border border-white/10 rounded-xl px-4 py-3
          hover:border-white/20 transition-colors
        ">
          <p className="font-mono text-sm text-cyan-300/90 tracking-wide leading-relaxed break-words select-all">
            {passphrase}
          </p>
        </div>
      </div>

      {/* Word count slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm text-white/70 font-medium">Word Count</label>
          <span className="text-sm font-bold text-cyan-400 tabular-nums">{wordCount}</span>
        </div>
        <input
          type="range"
          min={3}
          max={10}
          value={wordCount}
          onChange={e => setWordCount(Number(e.target.value))}
          className="w-full h-1.5 slider-thumb cursor-pointer"
          style={{ '--slider-pct': `${wordCountPct}%` } as React.CSSProperties}
        />
        <div className="flex justify-between text-xs text-white/30">
          <span>3 words · {(3 * Math.log2(WORDLIST.length)).toFixed(0)} bits</span>
          <span>10 words · {(10 * Math.log2(WORDLIST.length)).toFixed(0)} bits</span>
        </div>
      </div>

      {/* Leet level */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-white/70 font-medium">Leet Complexity</span>
          <span className="text-xs text-white/30">character substitutions</span>
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {LEET_LEVELS.map(level => (
            <button
              key={level}
              onClick={() => setLeetLevel(level)}
              className={`
                flex flex-col items-center gap-1 px-2 py-2.5 rounded-xl border
                text-xs font-medium transition-all duration-200 cursor-pointer
                ${leetLevel === level
                  ? 'bg-gradient-to-b from-cyan-400/20 to-violet-500/20 border-cyan-400/50 text-white'
                  : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:border-white/20 hover:text-white/70'
                }
              `}
            >
              <span className="font-bold">{LEET_LEVEL_LABELS[level]}</span>
              <span className="text-[9px] font-mono text-white/30 leading-tight text-center">
                {LEET_EXAMPLES[level]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Final password (passphrase + leet) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-white/70 font-medium">
            {leetActive ? 'Password (Leet applied)' : 'Password'}
          </span>
          <span className="text-xs text-white/30 font-mono">{password.length} chars</span>
        </div>
        <div className="
          flex items-center justify-between gap-3
          bg-white/5 border border-white/10 rounded-xl
          px-4 py-3 min-h-[52px]
          hover:border-white/20 transition-colors
        ">
          <span className="font-mono text-sm text-white/90 tracking-wide flex-1 overflow-hidden text-ellipsis whitespace-nowrap select-all">
            {password}
          </span>
          <button
            onClick={copyToClipboard}
            aria-label={copied ? 'Copied!' : 'Copy to clipboard'}
            className="
              flex-shrink-0 flex items-center gap-1.5
              px-3 py-1.5 rounded-lg text-sm font-medium
              transition-all duration-200 cursor-pointer
              bg-white/10 hover:bg-white/20 active:scale-95
            "
          >
            {copied ? (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-green-400">Copied!</span>
              </>
            ) : (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/60">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                <span className="text-white/60">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Strength */}
      <StrengthIndicator strength={strength} crackTime={crackTime} entropy={entropy} />

      {/* Re-roll button */}
      <button
        onClick={regenerate}
        className="
          w-full py-3.5 rounded-xl
          bg-gradient-to-r from-cyan-400 to-violet-500
          font-bold text-base
          shadow-[0_0_24px_rgba(34,211,238,0.3)]
          hover:shadow-[0_0_32px_rgba(34,211,238,0.5)]
          active:scale-[0.98]
          transition-all duration-200 cursor-pointer
          flex items-center justify-center gap-3
        "
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M23 4v6h-6" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
        </svg>
        Roll New Passphrase
        <kbd className="ml-1 px-1.5 py-0.5 text-xs font-mono font-normal bg-black/20 rounded opacity-70">
          Space
        </kbd>
      </button>

    </div>
  )
}

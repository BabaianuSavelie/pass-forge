import { useState } from 'react'
import zxcvbn from 'zxcvbn'
import { StrengthIndicator } from './StrengthIndicator'
import type { StrengthLevel } from '../types'

const ZXCVBN_LEVELS: StrengthLevel[] = ['weak', 'weak', 'fair', 'good', 'strong']

interface CrackTimes {
  online: string
  offlineSlow: string
  offlineFast: string
}

interface CheckResult {
  strength: StrengthLevel
  score: number
  crackTimes: CrackTimes
  tips: string[]
  stats: {
    length: number
    hasUpper: boolean
    hasLower: boolean
    hasNumbers: boolean
    hasSymbols: boolean
  }
}

function analyzePassword(password: string): CheckResult {
  const hasUpper = /[A-Z]/.test(password)
  const hasLower = /[a-z]/.test(password)
  const hasNumbers = /[0-9]/.test(password)
  const hasSymbols = /[^A-Za-z0-9]/.test(password)

  const result = zxcvbn(password)
  const strength = ZXCVBN_LEVELS[result.score]
  const d = result.crack_times_display

  const tips: string[] = []
  if (result.feedback.warning) tips.push(result.feedback.warning)
  tips.push(...result.feedback.suggestions)

  return {
    strength,
    score: result.score,
    crackTimes: {
      online: d.online_throttling_100_per_hour as string,
      offlineSlow: d.offline_slow_hashing_1e4_per_second as string,
      offlineFast: d.offline_fast_hashing_1e10_per_second as string,
    },
    tips,
    stats: { length: password.length, hasUpper, hasLower, hasNumbers, hasSymbols },
  }
}

const STAT_LABELS = [
  { key: 'hasUpper' as const, label: 'Uppercase' },
  { key: 'hasLower' as const, label: 'Lowercase' },
  { key: 'hasNumbers' as const, label: 'Numbers' },
  { key: 'hasSymbols' as const, label: 'Symbols' },
]

export function PasswordChecker() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const result = password.length > 0 ? analyzePassword(password) : null

  return (
    <div className="flex flex-col gap-6">
      {/* Input */}
      <div className="space-y-2">
        <label className="text-sm text-white/50">Paste or type your password</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter password to check…"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 text-white placeholder:text-white/20 font-mono text-sm focus:outline-none focus:border-cyan-400/50 transition-colors"
          />
          <button
            type="button"
            onClick={() => setShowPassword(v => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
            title={showPassword ? 'Hide' : 'Show'}
          >
            {showPassword ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {result ? (
        <>
          <StrengthIndicator strength={result.strength} />

          {/* Stats row */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex flex-col gap-0.5">
              <span className="text-xs text-white/40">Length</span>
              <span className="text-lg font-bold text-white">{result.stats.length}</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex flex-col gap-0.5">
              <span className="text-xs text-white/40">Score</span>
              <span className="text-lg font-bold text-white">{result.score}<span className="text-xs text-white/30">/4</span></span>
            </div>
          </div>

          {/* Crack times */}
          <div className="space-y-2">
            <p className="text-xs text-white/40 uppercase tracking-wider">Time to crack</p>
            <div className="flex flex-col gap-1.5">
              {[
                { label: 'Online (throttled)', value: result.crackTimes.online },
                { label: 'Offline — slow hash (bcrypt)', value: result.crackTimes.offlineSlow },
                { label: 'Offline — fast hash (MD5)', value: result.crackTimes.offlineFast },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between text-sm">
                  <span className="text-white/40">{label}</span>
                  <span className="text-white/80 font-mono text-xs">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Charset presence */}
          <div className="grid grid-cols-4 gap-2">
            {STAT_LABELS.map(({ key, label }) => {
              const present = result.stats[key]
              return (
                <div
                  key={key}
                  className={`rounded-xl border px-2 py-2 flex flex-col items-center gap-1 transition-colors ${
                    present
                      ? 'bg-green-500/10 border-green-500/30'
                      : 'bg-white/5 border-white/10'
                  }`}
                >
                  <span className={`text-xs font-medium ${present ? 'text-green-400' : 'text-white/30'}`}>
                    {present ? '✓' : '✗'}
                  </span>
                  <span className={`text-xs text-center leading-tight ${present ? 'text-white/70' : 'text-white/30'}`}>
                    {label}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Tips */}
          {result.tips.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs text-white/40 uppercase tracking-wider">Suggestions</p>
              <ul className="space-y-1.5">
                {result.tips.map(tip => (
                  <li key={tip} className="flex items-start gap-2 text-sm text-white/60">
                    <span className="mt-0.5 text-orange-400 shrink-0">›</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.tips.length === 0 && (
            <p className="text-sm text-green-400/80 text-center">
              Great password! No improvements needed.
            </p>
          )}
        </>
      ) : (
        <div className="flex items-center justify-center h-24 text-white/20 text-sm">
          Enter a password above to see its strength
        </div>
      )}
    </div>
  )
}

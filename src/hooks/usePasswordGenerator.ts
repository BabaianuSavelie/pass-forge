import { useState, useCallback, useEffect } from 'react'
import zxcvbn from 'zxcvbn'
import type { CharsetOptions, PasswordState, StrengthLevel } from '../types'

const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz'
const NUMBERS = '0123456789'
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?'

function cryptoRandom(max: number): number {
  const limit = Math.floor(0x100000000 / max) * max
  const buf = new Uint32Array(1)
  let n: number
  do {
    crypto.getRandomValues(buf)
    n = buf[0]
  } while (n >= limit)
  return n % max
}

function buildCharset(options: CharsetOptions): string {
  let charset = ''
  if (options.uppercase) charset += UPPERCASE
  if (options.lowercase) charset += LOWERCASE
  if (options.numbers) charset += NUMBERS
  if (options.symbols) charset += SYMBOLS
  return charset
}

function generatePassword(length: number, options: CharsetOptions): string {
  const charset = buildCharset(options)
  if (!charset) return ''

  const guaranteed: string[] = []
  if (options.uppercase) guaranteed.push(UPPERCASE[cryptoRandom(UPPERCASE.length)])
  if (options.lowercase) guaranteed.push(LOWERCASE[cryptoRandom(LOWERCASE.length)])
  if (options.numbers) guaranteed.push(NUMBERS[cryptoRandom(NUMBERS.length)])
  if (options.symbols) guaranteed.push(SYMBOLS[cryptoRandom(SYMBOLS.length)])

  const rest = Array.from({ length: length - guaranteed.length }, () =>
    charset[cryptoRandom(charset.length)]
  )

  const all = [...guaranteed, ...rest]

  // Fisher-Yates shuffle
  for (let i = all.length - 1; i > 0; i--) {
    const j = cryptoRandom(i + 1)
    ;[all[i], all[j]] = [all[j], all[i]]
  }

  return all.join('')
}

const ZXCVBN_LEVELS: StrengthLevel[] = ['weak', 'weak', 'fair', 'good', 'strong']

function calculateEntropy(length: number, options: CharsetOptions): number {
  const poolSize = buildCharset(options).length
  if (poolSize === 0) return 0
  return length * Math.log2(poolSize)
}

function analyzePassword(password: string): { strength: StrengthLevel; crackTime: string } {
  if (!password) return { strength: 'weak', crackTime: 'instantly' }
  const result = zxcvbn(password)
  return {
    strength: ZXCVBN_LEVELS[result.score],
    crackTime: result.crack_times_display.offline_slow_hashing_1e4_per_second as string,
  }
}

const DEFAULT_CHARSET: CharsetOptions = {
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: false,
}

export function usePasswordGenerator() {
  const [state, setState] = useState<PasswordState>(() => {
    const password = generatePassword(16, DEFAULT_CHARSET)
    const { strength, crackTime } = analyzePassword(password)
    return {
      password,
      length: 16,
      charset: DEFAULT_CHARSET,
      strength,
      crackTime,
      entropy: calculateEntropy(16, DEFAULT_CHARSET),
      copied: false,
    }
  })

  const regenerate = useCallback((length?: number, charset?: CharsetOptions) => {
    setState(prev => {
      const newLength = length ?? prev.length
      const newCharset = charset ?? prev.charset
      const password = generatePassword(newLength, newCharset)
      const { strength, crackTime } = analyzePassword(password)
      return {
        ...prev,
        password,
        length: newLength,
        charset: newCharset,
        strength,
        crackTime,
        entropy: calculateEntropy(newLength, newCharset),
        copied: false,
      }
    })
  }, [])

  const setLength = useCallback((length: number) => {
    regenerate(length)
  }, [regenerate])

  const toggleCharset = useCallback((key: keyof CharsetOptions) => {
    setState(prev => {
      const activeCount = Object.values(prev.charset).filter(Boolean).length
      if (prev.charset[key] && activeCount <= 1) return prev

      const newCharset = { ...prev.charset, [key]: !prev.charset[key] }
      const password = generatePassword(prev.length, newCharset)
      const { strength, crackTime } = analyzePassword(password)
      return {
        ...prev,
        password,
        charset: newCharset,
        strength,
        crackTime,
        entropy: calculateEntropy(prev.length, newCharset),
        copied: false,
      }
    })
  }, [])

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(state.password).then(() => {
      setState(prev => ({ ...prev, copied: true }))
      setTimeout(() => {
        setState(prev => ({ ...prev, copied: false }))
      }, 2000)
    })
  }, [state.password])

  // Space key shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code !== 'Space') return
      const tag = (e.target as HTMLElement).tagName.toLowerCase()
      if (tag === 'input' || tag === 'button' || tag === 'textarea') return
      e.preventDefault()
      regenerate()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [regenerate])

  return {
    ...state,
    setLength,
    toggleCharset,
    copyToClipboard,
    regenerate: () => regenerate(),
  }
}

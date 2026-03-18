import { useState, useCallback } from 'react'
import zxcvbn from 'zxcvbn'
import type { StrengthLevel } from '../types'
import type { LeetLevel } from '../utils/leet'
import { dicewarePassphrase, passwordFromPassphrase, dicewareEntropy } from '../utils/mnemonic'

const ZXCVBN_LEVELS: StrengthLevel[] = ['weak', 'weak', 'fair', 'good', 'strong']

function analyzePassword(password: string): { strength: StrengthLevel; crackTime: string } {
  if (!password) return { strength: 'weak', crackTime: 'instantly' }
  const result = zxcvbn(password)
  return {
    strength: ZXCVBN_LEVELS[result.score],
    crackTime: result.crack_times_display.offline_slow_hashing_1e4_per_second as string,
  }
}

interface MnemonicState {
  passphrase: string   // The raw Diceware words (e.g. "swift oak calm fox")
  wordCount: number
  leetLevel: LeetLevel
  password: string     // passphrase with optional Leet applied
  strength: StrengthLevel
  crackTime: string
  entropy: number
  copied: boolean
}

function buildState(
  passphrase: string,
  wordCount: number,
  leetLevel: LeetLevel,
  copied = false,
): MnemonicState {
  const password = passwordFromPassphrase(passphrase, leetLevel)
  const { strength, crackTime } = analyzePassword(password)
  return {
    passphrase,
    wordCount,
    leetLevel,
    password,
    strength,
    crackTime,
    entropy: dicewareEntropy(wordCount),
    copied,
  }
}

export function useMnemonicGenerator() {
  const [state, setState] = useState<MnemonicState>(() => {
    const passphrase = dicewarePassphrase(6)
    return buildState(passphrase, 6, 0)
  })

  /** Re-roll all words (new Diceware throw). */
  const regenerate = useCallback(() => {
    setState(prev => buildState(dicewarePassphrase(prev.wordCount), prev.wordCount, prev.leetLevel))
  }, [])

  /** Change word count → automatically re-roll. */
  const setWordCount = useCallback((wordCount: number) => {
    setState(prev => buildState(dicewarePassphrase(wordCount), wordCount, prev.leetLevel))
  }, [])

  /** Change Leet level → keep same passphrase, re-apply transformation. */
  const setLeetLevel = useCallback((leetLevel: LeetLevel) => {
    setState(prev => buildState(prev.passphrase, prev.wordCount, leetLevel))
  }, [])

  const copyToClipboard = useCallback(() => {
    if (!state.password) return
    navigator.clipboard.writeText(state.password).then(() => {
      setState(prev => ({ ...prev, copied: true }))
      setTimeout(() => setState(prev => ({ ...prev, copied: false })), 2000)
    })
  }, [state.password])

  return {
    ...state,
    regenerate,
    setWordCount,
    setLeetLevel,
    copyToClipboard,
  }
}

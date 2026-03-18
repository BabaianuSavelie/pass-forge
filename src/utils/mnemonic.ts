/**
 * Diceware password generation.
 *
 * Classic Diceware: roll 5 physical dice → 5-digit code → look up word in 7776-entry list.
 * This implementation uses the same principle but with Web Crypto API for randomness
 * and a 512-word list (log2(512) = 9 bits of entropy per word).
 *
 * Steps:
 *  1. For each of `wordCount` words, pick a cryptographically random index in [0, WORDLIST.length).
 *  2. Look up the corresponding word.
 *  3. Join words with spaces → the passphrase IS the password.
 *  4. Optionally apply Leet substitutions to individual characters.
 *
 * Reference: https://theworld.com/~reinhold/diceware.html
 */
import { WORDLIST } from '../data/wordlist'
import { applyLeet, type LeetLevel } from './leet'

/** Unbiased cryptographic random integer in [0, max). */
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

/**
 * Core Diceware step: pick `wordCount` independent random words from the wordlist.
 * Each word is selected with uniform probability using a rejection-sampling CSPRNG
 * (identical to how physical dice give uniform outcomes over the wordlist size).
 */
export function dicewarePassphrase(wordCount: number): string {
  const words: string[] = []
  for (let i = 0; i < wordCount; i++) {
    words.push(WORDLIST[cryptoRandom(WORDLIST.length)])
  }
  return words.join('-')
}

/**
 * Apply optional Leet transformations to the passphrase.
 * At level 0 the passphrase is returned unchanged (pure Diceware).
 * Higher levels substitute characters progressively.
 */
export function passwordFromPassphrase(passphrase: string, leetLevel: LeetLevel): string {
  return applyLeet(passphrase, leetLevel)
}

/**
 * True Diceware entropy: each word is chosen uniformly from WORDLIST.length words.
 * entropy = wordCount × log2(|wordlist|)  bits
 *
 * Leet transformations do NOT significantly increase entropy because the substitution
 * table is public knowledge — we report base Diceware entropy only.
 */
export function dicewareEntropy(wordCount: number): number {
  return wordCount * Math.log2(WORDLIST.length)
}

export type LeetLevel = 0 | 1 | 2 | 3

export const LEET_LEVEL_LABELS: Record<LeetLevel, string> = {
  0: 'None',
  1: 'Basic',
  2: 'Medium',
  3: 'Full',
}

// Each level is cumulative
const LEET_MAP_L1: Record<string, string> = {
  a: '@', e: '3', i: '1', o: '0',
}

const LEET_MAP_L2: Record<string, string> = {
  ...LEET_MAP_L1,
  s: '$', t: '7', b: '8', g: '9',
}

const LEET_MAP_L3: Record<string, string> = {
  ...LEET_MAP_L2,
  l: '|', c: '(', z: '2', h: '#',
}

const MAPS: Record<LeetLevel, Record<string, string>> = {
  0: {},
  1: LEET_MAP_L1,
  2: LEET_MAP_L2,
  3: LEET_MAP_L3,
}

export function applyLeet(text: string, level: LeetLevel): string {
  if (level === 0) return text
  const map = MAPS[level]
  return text
    .split('')
    .map(ch => map[ch.toLowerCase()] ?? ch)
    .join('')
}

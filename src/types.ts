export type StrengthLevel = 'weak' | 'fair' | 'good' | 'strong'

export interface CharsetOptions {
  uppercase: boolean
  lowercase: boolean
  numbers: boolean
  symbols: boolean
}

export interface PasswordState {
  password: string
  length: number
  charset: CharsetOptions
  strength: StrengthLevel
  crackTime: string
  entropy: number
  copied: boolean
}

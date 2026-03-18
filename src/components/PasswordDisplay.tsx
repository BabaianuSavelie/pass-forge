interface Props {
  password: string
  copied: boolean
  onCopy: () => void
}

export function PasswordDisplay({ password, copied, onCopy }: Props) {
  return (
    <div className="relative group">
      <div
        className="
          flex items-center justify-between gap-3
          bg-white/5 border border-white/10 rounded-xl
          px-4 py-2
          transition-all duration-200
          hover:border-white/20 hover:bg-white/8
          min-h-[56px]
        "
      >
        <span
          className="
            font-mono text-sm text-white/90 tracking-widest
            flex-1 overflow-hidden text-ellipsis whitespace-nowrap
            select-all leading-relaxed
          "
        >
          {password}
        </span>
        <button
          onClick={onCopy}
          aria-label={copied ? 'Copied!' : 'Copy to clipboard'}
          className="
            relative flex-shrink-0 flex items-center gap-1.5
            px-3 py-1.5 rounded-lg
            text-sm font-medium
            transition-all duration-200
            cursor-pointer
            bg-white/10 hover:bg-white/20 active:scale-95
          "
        >
          {copied ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/60">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              <span className="text-white/60">Copy</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}

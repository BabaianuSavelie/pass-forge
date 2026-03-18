interface Props {
  onClick: () => void
}

export function GenerateButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="
        w-full py-3.5 rounded-xl
        bg-gradient-to-r from-cyan-400 to-violet-500
        text-navy-950 font-bold text-base
        shadow-[0_0_24px_rgba(34,211,238,0.3)]
        hover:shadow-[0_0_32px_rgba(34,211,238,0.5)]
        active:scale-[0.98]
        transition-all duration-200
        cursor-pointer
        flex items-center justify-center gap-3
      "
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 4v6h-6" />
        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
      </svg>
      Generate Password
      <kbd className="
        ml-1 px-1.5 py-0.5
        text-xs font-mono font-normal
        bg-black/20 rounded
        opacity-70
      ">
        Space
      </kbd>
    </button>
  )
}

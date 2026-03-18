import { useState } from 'react'
import { usePasswordGenerator } from './hooks/usePasswordGenerator'
import { PasswordDisplay } from './components/PasswordDisplay'
import { LengthSlider } from './components/LengthSlider'
import { CharsetToggles } from './components/CharsetToggles'
import { StrengthIndicator } from './components/StrengthIndicator'
import { GenerateButton } from './components/GenerateButton'
import { PasswordChecker } from './components/PasswordChecker'

type Tab = 'generator' | 'checker'

function App() {
  const [tab, setTab] = useState<Tab>('generator')

  const {
    password,
    length,
    charset,
    strength,
    crackTime,
    entropy,
    copied,
    setLength,
    toggleCharset,
    copyToClipboard,
    regenerate,
  } = usePasswordGenerator()

  return (
    <div className="relative min-h-screen bg-[#060818] flex items-center justify-center p-4 overflow-hidden">
      {/* Ambient glow blobs */}
      <div
        className="pointer-events-none absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #22d3ee 0%, transparent 70%)' }}
      />

      {/* Card */}
      <div className="relative w-full max-w-xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl flex flex-col gap-6">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2 mb-1">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#headerGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <defs>
                <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              {tab === 'generator' ? 'Password Generator' : 'Strength Checker'}
            </h1>
          </div>
          <p className="text-sm text-white/60 max-w-xs mx-auto leading-relaxed">
            {tab === 'generator'
              ? 'Generate strong, cryptographically secure passwords to protect your accounts. Customize length and character types to meet any security requirement.'
              : 'Paste any password to instantly evaluate its strength and get actionable tips to improve it.'}
          </p>
          {tab === 'generator' && (
            <p className="text-xs text-white/30">
              Press <kbd className="px-1.5 py-0.5 text-xs bg-white/10 rounded font-mono">Space</kbd> to regenerate instantly
            </p>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white/5 rounded-xl p-1">
          {(['generator', 'checker'] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-200 ${
                tab === t
                  ? 'bg-gradient-to-r from-cyan-400/20 to-violet-500/20 text-white border border-white/10'
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              {t === 'generator' ? 'Generator' : 'Strength Checker'}
            </button>
          ))}
        </div>

        {tab === 'generator' ? (
          <>
            <PasswordDisplay password={password} copied={copied} onCopy={copyToClipboard} />
            <StrengthIndicator strength={strength} crackTime={crackTime} entropy={entropy} />
            <LengthSlider length={length} onChange={setLength} />
            <CharsetToggles charset={charset} onToggle={toggleCharset} />
            <GenerateButton onClick={regenerate} />
          </>
        ) : (
          <PasswordChecker />
        )}
      </div>
    </div>
  )
}

export default App

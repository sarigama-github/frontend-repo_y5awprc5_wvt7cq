import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CREATURES = ['🐣', '🦊', '🐱', '🐢', '🐰', '🐸', '🦄', '⭐️']

export default function GameCatchHearts({ onComplete }) {
  const [sprites, setSprites] = useState([])
  const [caught, setCaught] = useState(0)
  const target = 7

  useEffect(() => {
    const spawn = () => {
      setSprites((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).slice(2),
          x: Math.random() * 80 + 10, // percent
          size: Math.random() * 20 + 28,
          speed: Math.random() * 2 + 2,
          emoji: CREATURES[Math.floor(Math.random() * CREATURES.length)],
          dir: Math.random() > 0.5 ? 'up' : 'down',
          delay: Math.random() * 1.2,
        },
      ])
    }
    const interval = setInterval(spawn, 650)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (caught >= target) {
      const id = setTimeout(() => onComplete(), 700)
      return () => clearTimeout(id)
    }
  }, [caught, onComplete])

  const handleCatch = (id) => {
    setSprites((prev) => prev.filter((s) => s.id !== id))
    setCaught((s) => s + 1)
  }

  return (
    <div className="relative min-h-screen bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,.7),transparent_45%),radial-gradient(ellipse_at_bottom_right,rgba(255,255,255,.6),transparent_45%)] from-pink-100 to-rose-100 bg-gradient-to-b flex flex-col items-center justify-center overflow-hidden p-6">
      <div className="absolute inset-0 pointer-events-none" />

      <div className="relative z-10 w-full max-w-md text-center">
        <h2 className="text-rose-600 text-2xl font-extrabold">Catch the Pocket Creatures</h2>
        <p className="text-rose-500 mt-1">Tap to catch {target} cuties ✨</p>
        <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-rose-200/60 bg-white/60 backdrop-blur-md px-4 py-1 shadow-sm">
          <span className="text-rose-600 font-semibold">Caught</span>
          <span className="text-rose-700 font-bold text-xl">{caught}</span>
          <span className="text-rose-400">/ {target}</span>
        </div>
      </div>

      <div className="relative z-10 mt-6 h-[60vh] w-full max-w-md rounded-2xl bg-white/70 backdrop-blur-xl border border-white/60 overflow-hidden shadow-[0_20px_60px_-25px_rgba(244,63,94,0.35)]">
        <AnimatePresence>
          {sprites.map((s) => (
            <motion.button
              key={s.id}
              onClick={() => handleCatch(s.id)}
              initial={{ y: s.dir === 'up' ? '110%' : '-10%', opacity: 0 }}
              animate={{
                y: s.dir === 'up' ? ['110%', '-10%'] : ['-10%', '110%'],
                opacity: [1, 1],
                x: [`${s.x}%`, `${s.x + (Math.random() * 6 - 3)}%`, `${s.x}%`],
              }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ duration: 4 / s.speed, delay: s.delay, ease: 'easeInOut' }}
              className="absolute"
              style={{ left: `${s.x}%` }}
            >
              <span className="relative inline-block select-none" style={{ fontSize: s.size }}>
                <motion.span
                  className="absolute -inset-2 rounded-full bg-rose-400/0"
                  animate={{ boxShadow: ['0 0 0 0 rgba(244,63,94,0)', '0 0 0 12px rgba(244,63,94,0.08)', '0 0 0 0 rgba(244,63,94,0)'] }}
                  transition={{ repeat: Infinity, duration: 1.8 }}
                />
                <span role="img" aria-label="creature">{s.emoji}</span>
              </span>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      <div className="relative z-10 mt-4 text-xs text-rose-500/70">Tip: multiple creatures move at once — be quick!</div>
    </div>
  )
}

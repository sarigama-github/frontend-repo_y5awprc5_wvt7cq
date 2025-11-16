import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function GamePopBalloons({ onComplete }) {
  const target = 5
  const [orbs, setOrbs] = useState([])
  const [popped, setPopped] = useState(0)

  useEffect(() => {
    const colors = ['#fda4af', '#fbcfe8', '#fecaca', '#fed7aa', '#bfdbfe']
    const spawned = Array.from({ length: 9 }).map((_, i) => ({
      id: i + 1,
      x: Math.random() * 80 + 10,
      delay: Math.random() * 1.8,
      color: colors[i % colors.length],
      drift: (Math.random() * 6 - 3).toFixed(2),
      speed: Math.random() * 2 + 3,
    }))
    setOrbs(spawned)
  }, [])

  useEffect(() => {
    if (popped >= target) {
      const id = setTimeout(() => onComplete(), 700)
      return () => clearTimeout(id)
    }
  }, [popped, onComplete])

  const pop = (id) => {
    setOrbs((prev) => prev.filter((b) => b.id !== id))
    setPopped((p) => p + 1)
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-pink-100 to-rose-100 flex flex-col items-center justify-center overflow-hidden p-6">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.55),transparent_40%),radial-gradient(circle_at_30%_80%,rgba(255,255,255,0.55),transparent_40%)]" />

      <div className="relative z-10 w-full max-w-md text-center">
        <h2 className="text-rose-600 text-2xl font-extrabold">Pop the Energy Orbs</h2>
        <p className="text-rose-500 mt-1">Clear {target} orbs to power up ⚡</p>
        <p className="mt-1 inline-flex items-center gap-2 rounded-full border border-rose-200/60 bg-white/60 backdrop-blur-md px-4 py-1 shadow-sm text-rose-600 font-semibold">Popped: {popped}</p>
      </div>

      <div className="relative z-10 mt-6 h-[60vh] w-full max-w-md rounded-2xl bg-white/70 backdrop-blur-xl border border-white/60 overflow-hidden shadow-[0_20px_60px_-25px_rgba(244,63,94,0.35)]">
        <AnimatePresence>
          {orbs.map((b) => (
            <motion.button
              key={b.id}
              onClick={() => pop(b.id)}
              initial={{ y: '110%', opacity: 1 }}
              animate={{ y: ['110%', '-10%'], x: [`${b.x}%`, `${b.x + Number(b.drift)}%`, `${b.x}%`] }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ duration: 5 / b.speed, delay: b.delay, ease: 'easeInOut' }}
              className="absolute"
              style={{ left: `${b.x}%` }}
            >
              <span className="relative inline-block">
                <span className="block h-10 w-8 rounded-full" style={{ background: b.color }} />
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-4 w-[2px] bg-rose-300" />
              </span>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function GameCatchHearts({ onComplete }) {
  const containerRef = useRef(null)
  const [hearts, setHearts] = useState([])
  const [score, setScore] = useState(0)
  const target = 7

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).slice(2),
          x: Math.random() * 85 + 5, // percent
          size: Math.random() * 24 + 24,
          speed: Math.random() * 2 + 2,
        },
      ])
    }, 600)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (score >= target) {
      setTimeout(() => onComplete(), 600)
    }
  }, [score, onComplete])

  const handleCatch = (id) => {
    setHearts((prev) => prev.filter((h) => h.id !== id))
    setScore((s) => s + 1)
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-pink-100 to-rose-100 flex flex-col items-center justify-center overflow-hidden p-6">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.6),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.5),transparent_40%)]" />

      <div className="relative z-10 w-full max-w-md">
        <h2 className="text-center text-rose-600 text-2xl font-bold">Catch the Hearts</h2>
        <p className="text-center text-rose-500 mt-1">Tap to catch {target} hearts ♥</p>
        <div className="mt-4 flex items-center justify-center gap-3">
          <span className="text-rose-600 font-semibold">Score:</span>
          <span className="text-rose-700 font-bold text-xl">{score}</span>
        </div>
      </div>

      <div ref={containerRef} className="relative z-10 mt-6 h-[60vh] w-full max-w-md rounded-2xl bg-white/70 backdrop-blur-md border border-white/60 overflow-hidden shadow-xl">
        <AnimatePresence>
          {hearts.map((h) => (
            <motion.button
              key={h.id}
              onClick={() => handleCatch(h.id)}
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: ['-10%', '110%'], opacity: [1, 1] }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 4 / h.speed, ease: 'linear' }}
              className="absolute"
              style={{ left: `${h.x}%` }}
            >
              <span
                className="select-none"
                style={{ fontSize: h.size }}
                role="img"
                aria-label="heart"
              >
                💖
              </span>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

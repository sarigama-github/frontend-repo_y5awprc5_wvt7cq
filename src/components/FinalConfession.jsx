import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

// Simple soft music (royalty-free vibe). You can replace the URL if desired.
const MUSIC_URL = 'https://cdn.pixabay.com/audio/2022/03/15/audio_8a7b09e87a.mp3'

export default function FinalConfession() {
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      const play = () => audio.play().catch(() => {})
      const id = setTimeout(play, 400)
      return () => clearTimeout(id)
    }
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-rose-50 via-pink-50 to-rose-100 flex items-center justify-center p-6">
      {/* Falling petals */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute text-2xl select-none"
            initial={{ x: Math.random() * 100 + 'vw', y: -40, rotate: 0, opacity: 0 }}
            animate={{
              y: '110vh',
              rotate: 180,
              opacity: [0, 1, 1, 0],
            }}
            transition={{ duration: 10 + Math.random() * 6, delay: Math.random() * 2, repeat: Infinity, ease: 'linear' }}
            style={{ left: `${Math.random() * 100}%` }}
          >
            🌸
          </motion.span>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-xl w-full text-center bg-white/80 backdrop-blur-md rounded-3xl p-10 shadow-xl border border-white/60"
      >
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl sm:text-4xl font-extrabold text-rose-600"
        >
          Do you know something…?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-4 text-2xl sm:text-3xl font-semibold text-rose-500"
        >
          I like you. More than you think.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mt-8 text-rose-600"
        >
          <p className="text-lg">Thank you for being you. I hope this made you smile. 💕</p>
          <div className="mt-6 flex items-center justify-center gap-2 text-4xl">
            <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.2 }}>
              💗
            </motion.span>
            <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }}>
              💖
            </motion.span>
            <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }}>
              💘
            </motion.span>
          </div>
        </motion.div>
      </motion.div>

      <audio ref={audioRef} src={MUSIC_URL} loop preload="auto" />
    </div>
  )
}

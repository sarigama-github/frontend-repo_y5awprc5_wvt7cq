import { motion } from 'framer-motion'
import Spline from '@splinetool/react-spline'

export default function Landing({ onStart }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-rose-50 via-pink-50 to-rose-100">
      {/* Spline full cover background */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/OIGfFUmCnZ3VD8gH/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Luxe gradient veil */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-rose-200/50 via-pink-100/35 to-rose-50/70" />

      <div className="relative z-10 flex min-h-screen items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl w-full text-center bg-white/70 backdrop-blur-xl rounded-3xl px-8 py-12 shadow-[0_20px_60px_-20px_rgba(244,63,94,0.35)] border border-white/60"
        >
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full border border-rose-200/60 bg-rose-50/80 px-4 py-1 text-sm font-semibold text-rose-500 shadow-sm"
          >
            <span>Romance • Pocket‑style Adventure</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="mt-5 text-4xl sm:text-5xl font-extrabold tracking-tight text-rose-600"
          >
            A world‑class, dreamy mini‑game confession
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-4 text-rose-500/90 text-lg"
          >
            Catch cute creatures, pop energy orbs, and unlock the message made just for you.
          </motion.p>

          <motion.button
            onClick={onStart}
            className="mt-9 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white px-10 py-4 text-lg font-semibold shadow-lg shadow-rose-300/40 hover:shadow-rose-400/50 focus:outline-none focus:ring-4 focus:ring-rose-300"
            initial={{ y: 0 }}
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            Start Journey
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="mt-4 text-xs text-rose-500/70"
          >
            Optimized for mobile • Smooth animations • Pastel aesthetic
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}

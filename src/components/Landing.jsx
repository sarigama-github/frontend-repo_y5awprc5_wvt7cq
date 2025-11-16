import { motion } from 'framer-motion'
import Spline from '@splinetool/react-spline'

export default function Landing({ onStart }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-pink-50">
      {/* Spline full cover background */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/OIGfFUmCnZ3VD8gH/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Soft gradient overlay to warm up the scene (non-blocking) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-pink-100/70 via-rose-50/60 to-pink-50/80" />

      <div className="relative z-10 flex min-h-screen items-center justify-center p-6">
        <div className="max-w-xl w-full text-center bg-white/70 backdrop-blur-md rounded-3xl px-8 py-10 shadow-xl border border-white/60">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-extrabold text-rose-600"
          >
            Hi! Before we begin… let’s play a little.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-4 text-rose-500/90"
          >
            A cozy, playful journey made just for you.
          </motion.p>

          <motion.button
            onClick={onStart}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-rose-500 text-white px-8 py-3 text-lg font-semibold shadow-lg shadow-rose-300/40 hover:bg-rose-600 focus:outline-none"
            initial={{ y: 0 }}
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          >
            Start
          </motion.button>
        </div>
      </div>
    </div>
  )
}

import { motion } from 'framer-motion'

export default function Question({ title, options = [], onAnswer }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-pink-100 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/60"
      >
        <h2 className="text-2xl font-bold text-rose-600 text-center">{title}</h2>
        <div className="mt-6 grid grid-cols-1 gap-3">
          {options.map((opt, i) => (
            <motion.button
              key={i}
              whileTap={{ scale: 0.98 }}
              onClick={() => onAnswer(opt)}
              className="w-full rounded-2xl bg-rose-500/90 hover:bg-rose-500 text-white px-6 py-3 text-lg font-semibold shadow-md"
            >
              {opt}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

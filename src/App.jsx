import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Landing from './components/Landing'
import GameCatchHearts from './components/GameCatchHearts'
import Question from './components/Question'
import GamePopBalloons from './components/GamePopBalloons'
import FinalConfession from './components/FinalConfession'

const screens = {
  LANDING: 'LANDING',
  GAME1: 'GAME1',
  Q1: 'Q1',
  GAME2: 'GAME2',
  Q2: 'Q2',
  FINAL: 'FINAL',
}

const ordered = [
  screens.LANDING,
  screens.GAME1,
  screens.Q1,
  screens.GAME2,
  screens.Q2,
  screens.FINAL,
]

function App() {
  const [screen, setScreen] = useState(screens.LANDING)

  const next = (to) => () => setScreen(to)

  const progress = useMemo(() => {
    const idx = ordered.indexOf(screen)
    const total = ordered.length
    return { idx, total, pct: ((idx + 1) / total) * 100 }
  }, [screen])

  return (
    <div className="min-h-screen">
      {/* Top progress ribbon */}
      <div className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto w-full max-w-3xl px-4 pt-4">
          <div className="relative h-2 w-full rounded-full bg-white/30 backdrop-blur-md shadow-sm overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-rose-400 via-pink-400 to-rose-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress.pct}%` }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            />
          </div>
          <div className="mt-2 text-center text-xs font-medium text-rose-600/80">
            {progress.idx + 1} / {progress.total}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {screen === screens.LANDING && (
          <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Landing onStart={next(screens.GAME1)} />
          </motion.div>
        )}

        {screen === screens.GAME1 && (
          <motion.div key="game1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4 }}>
            <GameCatchHearts onComplete={next(screens.Q1)} />
          </motion.div>
        )}

        {screen === screens.Q1 && (
          <motion.div key="q1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.35 }}>
            <Question
              title="How was your day?"
              options={["Amazing ✨", "Pretty good 😊", "Okay 🫶", "Could be better 😴"]}
              onAnswer={next(screens.GAME2)}
            />
          </motion.div>
        )}

        {screen === screens.GAME2 && (
          <motion.div key="game2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4 }}>
            <GamePopBalloons onComplete={next(screens.Q2)} />
          </motion.div>
        )}

        {screen === screens.Q2 && (
          <motion.div key="q2" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.35 }}>
            <Question
              title="Do you know why I made this for you?"
              options={["Because I'm special? 🥰", "Because you like me? 😉", "Because you care 💞", "All of the above! 🌟"]}
              onAnswer={next(screens.FINAL)}
            />
          </motion.div>
        )}

        {screen === screens.FINAL && (
          <motion.div key="final" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <FinalConfession />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App

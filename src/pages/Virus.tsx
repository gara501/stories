import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { introText } from '../data/virus/data'
import { useMusicStore } from '../store/useMusicStore'
import { playButtonSelect } from '../store/useSfx'
import './Virus.css'

const lines = introText.trim().split('\n').map((l) => l.trim()).filter(Boolean)

export default function Virus() {
  const [showButton, setShowButton] = useState(false)
  const navigate = useNavigate()
  const playMusic = useMusicStore((s) => s.play)

  const handleStart = () => {
    playButtonSelect()
    playMusic()
    navigate('/virus/game')
  }

  return (
    <motion.div
      className="virus"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="virus-intro">
        {lines.map((line, i) => (
          <motion.p
            key={i}
            className="virus-line"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.8, duration: 0.8 }}
            onAnimationComplete={
              i === lines.length - 1
                ? () => setShowButton(true)
                : undefined
            }
          >
            {line}
          </motion.p>
        ))}
        <AnimatePresence>
          {showButton && (
            <motion.button
              className="virus-button"
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              onClick={handleStart}
            >
              Iniciar
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

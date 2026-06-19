import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { playButtonSelect } from '../store/useSfx'
import './DialogueBox.css'

interface Dialogue {
  character: string
  text: string
}

interface DialogueBoxProps {
  dialogues: Dialogue[]
  characterImage: string
  onComplete?: () => void
}

export default function DialogueBox({ dialogues, characterImage, onComplete }: DialogueBoxProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const current = dialogues[currentIndex]

  const handleAdvance = useCallback(() => {
    playButtonSelect()
    if (currentIndex < dialogues.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else if (onComplete) {
      onComplete()
    }
  }, [currentIndex, dialogues.length, onComplete])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter') handleAdvance()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleAdvance])

  return (
    <div className="dialogue-container" onClick={handleAdvance}>
      <div className="dialogue-character-img">
        <img src={characterImage} alt={current.character} />
      </div>
      <div className="dialogue-box">
        <div className="dialogue-name">
          <span>{current.character}</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={currentIndex}
            className="dialogue-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {current.text}
          </motion.p>
        </AnimatePresence>
        <div className="dialogue-indicator">▼</div>
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Loader.css'

import introBg from '../assets/bg/intro.png'
import hero from '../assets/hero.png'

const assets = [introBg, hero]

interface LoaderProps {
  onComplete: () => void
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let loaded = 0

    assets.forEach((src) => {
      const img = new Image()
      img.src = src
      img.onload = img.onerror = () => {
        loaded++
        setProgress(Math.round((loaded / assets.length) * 100))
        if (loaded === assets.length) {
          setTimeout(() => setDone(true), 400)
        }
      }
    })
  }, [])

  useEffect(() => {
    if (done) {
      const timer = setTimeout(onComplete, 600)
      return () => clearTimeout(timer)
    }
  }, [done, onComplete])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="loader-content">
            <p className="loader-text">Cargando...</p>
            <div className="loader-bar-container">
              <div className="loader-bar" style={{ width: `${progress}%` }} />
            </div>
            <p className="loader-percent">{progress}%</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

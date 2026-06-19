import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { siteImages } from '../assets/imageAssets'
import './Loader.css'

interface LoaderProps {
  onComplete: () => void
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(siteImages.length === 0 ? 100 : 0)
  const [done, setDone] = useState(siteImages.length === 0)

  useEffect(() => {
    if (siteImages.length === 0) {
      return
    }

    let active = true
    let loaded = 0

    const markLoaded = () => {
      if (!active) return
      loaded += 1
      setProgress(Math.round((loaded / siteImages.length) * 100))
      if (loaded === siteImages.length) {
        setTimeout(() => {
          if (active) setDone(true)
        }, 400)
      }
    }

    siteImages.forEach((src) => {
      const img = new Image()
      let counted = false
      const countImage = () => {
        if (counted) return
        counted = true
        markLoaded()
      }
      img.decoding = 'async'
      img.onload = countImage
      img.onerror = countImage
      img.src = src
      if (img.complete) countImage()
    })

    return () => {
      active = false
    }
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

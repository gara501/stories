import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Loader from '../components/Loader'
import { playButtonSelect } from '../store/useSfx'
import './Intro.css'

export default function Intro() {
  const [loaded, setLoaded] = useState(false)
  const navigate = useNavigate()

  return (
    <>
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}
      {loaded && (
        <motion.div
          className="intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <svg className="intro-distortion-filter" aria-hidden="true">
            <filter id="distortion">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.01 0.005"
                numOctaves="3"
                seed="2"
              >
                <animate
                  attributeName="seed"
                  from="0"
                  to="100"
                  dur="20s"
                  repeatCount="indefinite"
                />
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" scale="6" />
            </filter>
          </svg>
          <div className="intro-bg" />
          <div className="intro-overlay">
            <h1 className="intro-title">Kairos</h1>
            <p className="intro-subtitle">Tus decisiones tienen consecuencias</p>
            <button className="intro-button" type="button" onClick={() => { playButtonSelect(); navigate('/options') }}>
              Entrar al juego
            </button>
          </div>
        </motion.div>
      )}
    </>
  )
}

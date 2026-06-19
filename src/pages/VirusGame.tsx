import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import DialogueBox from '../components/DialogueBox'
import { useMetricsStore } from '../store/useMetricsStore'
import { useMusicStore } from '../store/useMusicStore'
import { playButtonSelect } from '../store/useSfx'
import { etica, humanidad, liderazgo, supervivencia } from '../data/virus/data'
import scene01Data from '../data/virus/scene_01.json'
import scene02Data from '../data/virus/scene_02.json'
import scene03Data from '../data/virus/scene_03.json'
import sceneFinalData from '../data/virus/scene_final.json'
import './VirusGame.css'

import bgScene01 from '../assets/bg/virus/scene_01.png'
import bgScene02 from '../assets/bg/virus/scene_02.png'
import bgScene02Experiment from '../assets/bg/virus/scene_02_experiment.png'
import bgScene02Failure from '../assets/bg/virus/scene_02_failure.png'
import bgScene03Pandemic from '../assets/bg/virus/scene_03_pandemic.png'
import bgScene03Reactor from '../assets/bg/virus/scene_03_reactor.png'
import bgScene03Pc from '../assets/bg/virus/scene_03_pc.png'
import bgScene03Prensa from '../assets/bg/virus/scene_03_prensa.png'
import bgFinal01 from '../assets/bg/virus/scene_final_01.png'
import bgFinal02 from '../assets/bg/virus/scene_final_02.png'
import bgFinal03 from '../assets/bg/virus/scene_final_03.png'
import bgFinal04 from '../assets/bg/virus/scene_final_04.png'
import bgFinal05 from '../assets/bg/virus/scene_final_05.png'
import bgFinal06 from '../assets/bg/virus/scene_final_06.png'
import bgFinal07 from '../assets/bg/virus/scene_final_07.png'
import bgFinal08 from '../assets/bg/virus/scene_final_08.png'
import bgFinal09 from '../assets/bg/virus/scene_final_09.png'
import bgFinal10 from '../assets/bg/virus/scene_final_10.png'
import bgFinal11 from '../assets/bg/virus/scene_final_11.png'
import bgFinal12 from '../assets/bg/virus/scene_final_12.png'

import charDefault from '../assets/characters/virus/virus.png'
import charSmile from '../assets/characters/virus/virus-smile.png'
import charThink from '../assets/characters/virus/virus-think.png'
import charMad from '../assets/characters/virus/virus-mad.png'
import charBiohazard from '../assets/bg/virus/biohazard.png'

const bgMap: Record<string, string> = {
  'scene_01.png': bgScene01,
  'scene_02.png': bgScene02,
  'scene_02_experiment.png': bgScene02Experiment,
  'scene_02_failure.png': bgScene02Failure,
  'scene_03_pandemic.png': bgScene03Pandemic,
  'scene_03_reactor.png': bgScene03Reactor,
  'scene_03_pc.png': bgScene03Pc,
  'scene_03_prensa.png': bgScene03Prensa,
  'scene_final_01.png': bgFinal01,
  'scene_final_02.png': bgFinal02,
  'scene_final_03.png': bgFinal03,
  'scene_final_04.png': bgFinal04,
  'scene_final_05.png': bgFinal05,
  'scene_final_06.png': bgFinal06,
  'scene_final_07.png': bgFinal07,
  'scene_final_08.png': bgFinal08,
  'scene_final_09.png': bgFinal09,
  'scene_final_10.png': bgFinal10,
  'scene_final_11.png': bgFinal11,
  'scene_final_12.png': bgFinal12,
}

const charMap: Record<string, string> = {
  'virus.png': charDefault,
  'virus-smile.png': charSmile,
  'virus-think.png': charThink,
  'virus-mad.png': charMad,
  'biohazard.png': charBiohazard,
}

type SceneData = {
  background?: string
  bg_character?: string
  dialogues: { character: string; text: string }[]
  options: {
    id: string
    buttonText: string
    nextScene: string
    metrics: Record<string, number>
  }[]
  metrics?: Record<string, number>
}

type Metrics = {
  etica: number
  supervivencia: number
  humanidad: number
  liderazgo: number
}

const PERFILES = {
  etica,
  supervivencia,
  humanidad,
  liderazgo,
}

const obtenerParrafoPerfil = (metrics: Metrics) => {
  const { etica, supervivencia, humanidad, liderazgo } = metrics
  const maxScore = Math.max(etica, supervivencia, humanidad, liderazgo)

  if (maxScore === etica) return PERFILES.etica
  if (maxScore === supervivencia) return PERFILES.supervivencia
  if (maxScore === humanidad) return PERFILES.humanidad
  return PERFILES.liderazgo
}

const allScenes: Record<string, SceneData> = {
  ...scene01Data,
  ...scene02Data,
  ...scene03Data,
  ...sceneFinalData,
} as Record<string, SceneData>

const isFinalScene = (key: string) => key.startsWith('scene_final_')

export default function VirusGame() {
  const navigate = useNavigate()
  const [sceneKey, setSceneKey] = useState('scene_01_bloque_b')
  const [dialogueFinished, setDialogueFinished] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  const updateMetrics = useMetricsStore((s) => s.updateMetrics)
  const metrics = useMetricsStore((s) => s.metrics)
  const resetMetrics = useMetricsStore((s) => s.resetMetrics)
  const playFinalMusic = useMusicStore((s) => s.playFinal)
  const playBgMusic = useMusicStore((s) => s.play)

  const scene = allScenes[sceneKey]
  const bgImage = scene?.background ? bgMap[scene.background] || bgScene01 : bgScene01
  const characterImg = scene?.bg_character ? charMap[scene.bg_character] || charDefault : charDefault

  const handleMainMenu = () => {
    playButtonSelect()
    navigate('/options')
  }

  const handleOptionClick = (option: SceneData['options'][number]) => {
    playButtonSelect()
    updateMetrics(option.metrics)

    const nextScene = allScenes[option.nextScene]
    if (nextScene) {
      if (isFinalScene(option.nextScene)) {
        playFinalMusic()
      }
      setTransitioning(true)
      setTimeout(() => {
        setSceneKey(option.nextScene)
        setDialogueFinished(false)
        setShowStats(false)
        setTransitioning(false)
      }, 600)
    }
  }

  const handleDialogueComplete = () => {
    if (isFinalScene(sceneKey)) {
      setShowStats(true)
    } else {
      setDialogueFinished(true)
    }
  }

  const handleRestart = () => {
    playButtonSelect()
    playBgMusic()
    setTransitioning(true)
    setTimeout(() => {
      resetMetrics()
      setSceneKey('scene_01_bloque_b')
      setDialogueFinished(false)
      setShowStats(false)
      setTransitioning(false)
    }, 600)
  }

  const maxAbsMetric = Math.max(
    1,
    Math.abs(metrics.etica),
    Math.abs(metrics.supervivencia),
    Math.abs(metrics.liderazgo),
    Math.abs(metrics.humanidad)
  )

  const statBars = [
    { label: 'Ética', value: metrics.etica },
    { label: 'Supervivencia', value: metrics.supervivencia },
    { label: 'Liderazgo', value: metrics.liderazgo },
    { label: 'Humanidad', value: metrics.humanidad },
  ]
  const finalProfileParagraph = obtenerParrafoPerfil(metrics)

  return (
    <div className="virus-game">
      <button className="virus-menu-button" type="button" onClick={handleMainMenu} aria-label="Volver al menú principal">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5 10v10h14V10" />
          <path d="M9 20v-6h6v6" />
        </svg>
      </button>
      <AnimatePresence mode="wait">
        <motion.div
          key={sceneKey + (showStats ? '-stats' : '')}
          className="virus-game-scene"
          style={{ backgroundImage: `url(${bgImage})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: transitioning ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <AnimatePresence mode="wait">
            {showStats ? (
              <motion.div
                key="stats"
                className="virus-stats-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="virus-stats-title">Perfil Psicológico</h2>
                <div className="virus-stats-bars">
                  {statBars.map((stat, i) => {
                    const pct = Math.round((Math.abs(stat.value) / maxAbsMetric) * 100)
                    const isPositive = stat.value >= 0
                    return (
                      <motion.div
                        key={stat.label}
                        className="virus-stat-row"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.15, duration: 0.4 }}
                      >
                        <span className="virus-stat-label">{stat.label}</span>
                        <div className="virus-stat-bar-track">
                          <motion.div
                            className={`virus-stat-bar-fill ${isPositive ? 'positive' : 'negative'}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ delay: i * 0.15 + 0.3, duration: 0.6, ease: 'easeOut' }}
                          />
                        </div>
                        <span className="virus-stat-value">{stat.value > 0 ? '+' : ''}{stat.value}</span>
                      </motion.div>
                    )
                  })}
                </div>
                <p className="virus-profile-paragraph">{finalProfileParagraph}</p>
                <div className="virus-stats-buttons">
                  <motion.button
                    className="virus-option-btn virus-restart-btn"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    onClick={handleRestart}
                  >
                    Reiniciar Historia
                  </motion.button>
                  <motion.button
                    className="virus-option-btn virus-restart-btn"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                    onClick={handleMainMenu}
                  >
                    Menú Principal
                  </motion.button>
                </div>
              </motion.div>
            ) : !dialogueFinished ? (
              <motion.div
                key={`dialogue-${sceneKey}`}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <DialogueBox
                  dialogues={scene.dialogues}
                  characterImage={characterImg}
                  onComplete={handleDialogueComplete}
                />
              </motion.div>
            ) : (
              <motion.div
                key={`options-${sceneKey}`}
                className="virus-options-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="virus-options-header">
                  <img
                    src={characterImg}
                    alt={scene.dialogues[0]?.character}
                    className="virus-options-avatar"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="virus-options-name">{scene.dialogues[0]?.character}</span>
                </div>
                <div className="virus-options-list">
                  {scene.options.map((opt, i) => (
                    <motion.button
                      key={opt.id}
                      className="virus-option-btn"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.12, duration: 0.4 }}
                      onClick={() => handleOptionClick(opt)}
                    >
                      {opt.buttonText}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

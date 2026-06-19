import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { playButtonSelect } from '../store/useSfx'
import './Options.css'

import option1Img from '../assets/bg/option1.png'
import option2Img from '../assets/bg/option2.png'
import option3Img from '../assets/bg/option3.png'

const options = [
  { id: 'virus', title: 'Virus', image: option1Img, active: true },
  { id: 'apocalipsis', title: 'Apocalipsis', image: option2Img, active: false },
  { id: 'exito', title: 'Exito', image: option3Img, active: false },
]

export default function Options() {
  const navigate = useNavigate()

  return (
    <motion.div
      className="options"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="options-title">Selecciona tu destino</h1>
      <div className="options-grid">
        {options.map((opt) => (
          <div
            key={opt.id}
            className={`option-card ${opt.active ? 'active' : 'disabled'}`}
            onClick={opt.active ? () => { playButtonSelect(); navigate('/virus') } : undefined}
          >
            <div className="option-image-wrapper">
              <img src={opt.image} alt={opt.title} className="option-image" />
            </div>
            <p className="option-title">{opt.title}</p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

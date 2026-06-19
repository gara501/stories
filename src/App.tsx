import { Routes, Route } from 'react-router-dom'
import Intro from './pages/Intro'
import Options from './pages/Options'
import Virus from './pages/Virus'
import VirusGame from './pages/VirusGame'
import MuteButton from './components/MuteButton'

function App() {
  return (
    <>
      <MuteButton />
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/options" element={<Options />} />
        <Route path="/virus" element={<Virus />} />
        <Route path="/virus/game" element={<VirusGame />} />
      </Routes>
    </>
  )
}

export default App

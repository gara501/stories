import { create } from 'zustand'
import { Howl, Howler } from 'howler'
import bgMusic from '../assets/music/bg_music.mp3'
import finalMusic from '../assets/music/final_music.mp3'

interface MusicState {
  playing: boolean
  muted: boolean
  currentTrack: 'bg' | 'final' | null
  play: () => void
  playFinal: () => void
  stop: () => void
  toggleMute: () => void
}

const FADE_DURATION = 2000
const TARGET_VOLUME = 0.4

const bgSound = new Howl({
  src: [bgMusic],
  loop: true,
  volume: 0,
})

const finalSound = new Howl({
  src: [finalMusic],
  loop: true,
  volume: 0,
})

function fadeIn(sound: Howl) {
  sound.volume(0)
  sound.play()
  sound.fade(0, TARGET_VOLUME, FADE_DURATION)
}

function fadeOut(sound: Howl) {
  sound.fade(sound.volume(), 0, FADE_DURATION)
  setTimeout(() => sound.stop(), FADE_DURATION)
}

export const useMusicStore = create<MusicState>((set, get) => ({
  playing: false,
  muted: false,
  currentTrack: null,
  play: () => {
    const { currentTrack } = get()
    if (currentTrack === 'bg') return
    if (currentTrack === 'final') fadeOut(finalSound)
    fadeIn(bgSound)
    set({ playing: true, currentTrack: 'bg' })
  },
  playFinal: () => {
    const { currentTrack } = get()
    if (currentTrack === 'final') return
    if (currentTrack === 'bg') fadeOut(bgSound)
    fadeIn(finalSound)
    set({ playing: true, currentTrack: 'final' })
  },
  stop: () => {
    const { currentTrack } = get()
    if (currentTrack === 'bg') fadeOut(bgSound)
    if (currentTrack === 'final') fadeOut(finalSound)
    set({ playing: false, currentTrack: null })
  },
  toggleMute: () => {
    const next = !get().muted
    Howler.mute(next)
    set({ muted: next })
  },
}))

import { Howl } from 'howler'
import buttonSelectSrc from '../assets/music/button_select.mp3'

const buttonSelect = new Howl({
  src: [buttonSelectSrc],
  volume: 0.6,
})

export function playButtonSelect() {
  buttonSelect.play()
}

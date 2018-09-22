// prettier-ignore
let notes = [
  'C', 'C#', 'D', 'D#', 'E', 'F',
  'F#', 'G', 'G#', 'A', 'A#', 'B'
]

function createMidiToNote() {
  let midiMap = {}

  for (let i = 0; i < 8; i++) {
    notes.forEach((note, y) => {
      let midiKey = y + i * notes.length
      midiMap[midiKey] = note + i
    })
  }

  return midiMap
}

let midiToNote = createMidiToNote()

export { midiToNote }

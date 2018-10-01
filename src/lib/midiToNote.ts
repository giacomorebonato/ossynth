// prettier-ignore
let notes = [
  'C', 'C#', 'D', 'D#', 'E', 'F',
  'F#', 'G', 'G#', 'A', 'A#', 'B'
]

function createMidiToNote() {
  const start = 12
  let midiMap = {}

  for (let i = 0; i < 8; i++) {
    notes.forEach((note, y) => {
      const midiKey = start + y + i * notes.length
      midiMap[midiKey] = note + i
    })
  }

  return midiMap
}

let midiToNote = createMidiToNote()

export { midiToNote }

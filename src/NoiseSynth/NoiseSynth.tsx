import React, { useEffect, useState } from 'react'
import Tone, { NoiseType } from 'tone'

import { Label, PlayButton, RangeInput, Select } from '../components'

let preset = {
  noise: {
    type: 'white' as NoiseType,
    playbackRate: 5
  },
  envelope: {
    attack: 3.0,
    decay: 0.3,
    sustain: 3,
    release: 1
  }
}

export function NoiseSynth({
  noiseSynth = new Tone.NoiseSynth(preset).toMaster()
}) {
  // @ts-ignore
  Tone.start()
  let [config, setConfig] = useState(preset)
  let [volume, setVolume] = useState(0)

  // @ts-ignore
  // noiseSynth.set(config)

  useEffect(() => {
    noiseSynth.volume.value = volume
  }, [volume])

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4">
        <RangeInput
          label="Volume"
          onChange={value => {
            setVolume(value)
          }}
          value={volume}
        />
        <div className="mb-4">
          <Label htmlFor="noise-type">Noise type</Label>
          <Select
            id="noise-type"
            onChange={value => {
              setConfig({
                ...config,
                noise: { ...config.noise, type: value as NoiseType }
              })
            }}
            value={config.noise.type}
          >
            <option value="brown">Brown</option>
            <option value="pink">Pink</option>
            <option value="white">White</option>
          </Select>
        </div>
        <RangeInput
          label="Attack"
          max={1}
          min={0}
          step={0.01}
          onChange={value => {
            let envelope = { ...config.envelope, attack: value }

            setConfig({ ...config, envelope })
          }}
          value={config.envelope.attack}
        />
        <RangeInput
          label="Decay"
          max={1}
          min={0.01}
          step={0.01}
          onChange={value => {
            let envelope = { ...config.envelope, decay: value }

            setConfig({ ...config, envelope })
          }}
          value={config.envelope.decay}
        />
        <RangeInput
          label="Sustain"
          max={1}
          min={0}
          step={0.01}
          onChange={value => {
            let envelope = { ...config.envelope, sustain: value }

            setConfig({ ...config, envelope })
          }}
          value={config.envelope.sustain}
        />
        <RangeInput
          label="Release"
          max={1}
          min={0}
          step={0.01}
          onChange={value => {
            let envelope = { ...config.envelope, release: value }

            setConfig({ ...config, envelope })
          }}
          value={config.envelope.release}
        />
        <PlayButton
          onMouseUp={() => {
            noiseSynth.triggerRelease()
          }}
          onMouseDown={() => {
            noiseSynth.triggerAttack('C5')
          }}
        >
          Play
        </PlayButton>
      </div>
    </div>
  )
}

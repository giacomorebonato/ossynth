import React from 'react'

import { Label } from './'

interface IRangeInputProps {
  label: string
  max?: number
  min?: number
  onChange(value: number): void
  step?: number
  value: number
}

export function RangeInput({
  label,
  max = 10,
  min = -10,
  onChange,
  step = 1,
  value
}: IRangeInputProps) {
  let floatValue = value ? value : parseFloat('0')

  if (typeof floatValue === 'string') {
    floatValue = parseFloat(floatValue)
  }

  return (
    <div className="mb-4">
      <Label>{label}</Label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="range"
        min={min}
        max={max}
        step={step}
        onChange={e => {
          onChange(parseFloat(e.target.value))
        }}
        value={floatValue}
      />
      {floatValue}
    </div>
  )
}

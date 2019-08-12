import React, { ChangeEvent } from 'react'

interface ISelectProps {
  children: any
  id: string
  onChange(value: string): void
  value: string
}

export function Select({ children, id, onChange, value }: ISelectProps) {
  return (
    <select
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id={id}
      onChange={e => {
        onChange(e.target.value)
      }}
      value={value}
    >
      {children}
    </select>
  )
}

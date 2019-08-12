import React from 'react'

interface ILabelProps {
  children: HTMLCollection | string
  htmlFor?: string
}

export function Label({ children, htmlFor }: ILabelProps) {
  return (
    <label
      className="block text-gray-700 text-sm font-bold mb-2"
      htmlFor={htmlFor}
    >
      {children}
    </label>
  )
}

import React, { MouseEvent } from 'react'

interface IPlayButtonProps {
  children: HTMLCollection | string
  onMouseDown(event: MouseEvent<HTMLButtonElement>): void
  onMouseUp(event: MouseEvent<HTMLButtonElement>): void
}

export function PlayButton({
  children,
  onMouseDown,
  onMouseUp
}: IPlayButtonProps) {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onMouseUp={onMouseUp}
      onMouseDown={onMouseDown}
    >
      {children}
    </button>
  )
}

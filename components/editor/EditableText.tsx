'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useEditor } from './EditorProvider'

interface EditableTextProps {
  id: string
  defaultText: string
  className?: string
  as?: React.ElementType
}

export const EditableText = ({ id, defaultText, className = '', as: Component = 'span' }: EditableTextProps) => {
  const { isEditMode, data, updateText } = useEditor()
  const textRef = useRef<HTMLElement>(null)
  const currentText = data.texts[id] ?? defaultText

  // Local state to handle fast typing without lag from context updates
  const [localText, setLocalText] = useState(currentText)

  useEffect(() => {
    setLocalText(currentText)
    if (textRef.current && textRef.current.innerText !== currentText) {
      textRef.current.innerText = currentText
    }
  }, [currentText])

  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    const newText = e.target.innerText
    if (newText !== currentText) {
      updateText(id, newText)
    }
  }

  const handleInput = (e: React.FormEvent<HTMLElement>) => {
    setLocalText(e.currentTarget.innerText)
  }

  return (
    <Component
      ref={textRef}
      contentEditable={isEditMode}
      suppressContentEditableWarning
      onBlur={handleBlur}
      onInput={handleInput}
      className={`transition-all ${isEditMode ? 'outline-none ring-2 ring-blue-500/50 rounded-sm cursor-text hover:bg-white/5' : ''} ${className}`}
    >
      {currentText}
    </Component>
  )
}

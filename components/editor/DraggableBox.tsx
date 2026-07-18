'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useEditor } from './EditorProvider'

interface DraggableBoxProps {
  id: string
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export const DraggableBox = ({ id, children, className = '', style = {} }: DraggableBoxProps) => {
  const { isEditMode, data, updatePosition } = useEditor()
  const position = data.positions[id] || { x: 0, y: 0 }

  return (
    <motion.div
      drag={isEditMode}
      dragMomentum={false}
      onDragEnd={(e, info) => {
        // info.offset is the delta from the start of the drag. 
        // We add it to the existing position.
        if (isEditMode) {
          updatePosition(id, position.x + info.offset.x, position.y + info.offset.y)
        }
      }}
      // We animate to the current position from the store
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
      className={`relative ${isEditMode ? 'cursor-grab active:cursor-grabbing hover:ring-2 hover:ring-emerald-500/50 rounded-sm bg-white/5' : ''} ${className}`}
      style={style}
    >
      {isEditMode && (
        <div className="absolute -top-3 -right-3 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-md">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M5 9l-3 3 3 3M9 5l3-3 3 3M19 9l3 3-3 3M9 19l3 3 3-3M2 12h20M12 2v20"/></svg>
        </div>
      )}
      {children}
    </motion.div>
  )
}

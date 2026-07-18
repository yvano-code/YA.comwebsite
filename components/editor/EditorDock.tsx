'use client'

import React from 'react'
import { useEditor } from './EditorProvider'

export const EditorDock = () => {
  const { 
    isEditMode, setIsEditMode, 
    undo, redo, canUndo, canRedo, 
    saveLocal, deploy, 
    isSaving, isDeploying 
  } = useEditor()

  // Only show in development or if forced via local storage (for testing)
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-2 px-4 py-3 bg-black/90 backdrop-blur-md rounded-full shadow-2xl border border-white/20 text-white font-sans text-sm font-medium">
      <button 
        onClick={() => setIsEditMode(!isEditMode)}
        className={`px-4 py-2 rounded-full transition-colors ${isEditMode ? 'bg-red-500 text-white' : 'bg-white/10 hover:bg-white/20'}`}
      >
        {isEditMode ? 'Exit Edit Mode' : 'Enter Edit Mode'}
      </button>

      {isEditMode && (
        <>
          <div className="w-px h-6 bg-white/20 mx-2" />
          
          <button 
            onClick={undo}
            disabled={!canUndo}
            className="p-2 rounded-full hover:bg-white/10 disabled:opacity-30 transition-colors"
            title="Undo"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7v6h6" /><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" /></svg>
          </button>
          
          <button 
            onClick={redo}
            disabled={!canRedo}
            className="p-2 rounded-full hover:bg-white/10 disabled:opacity-30 transition-colors"
            title="Redo"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 7v6h-6" /><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7" /></svg>
          </button>

          <div className="w-px h-6 bg-white/20 mx-2" />

          <button 
            onClick={saveLocal}
            disabled={isSaving}
            className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isSaving ? 'Saving...' : 'Save Local'}
          </button>

          <button 
            onClick={deploy}
            disabled={isDeploying}
            className="px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isDeploying ? 'Deploying...' : 'Push to Vercel'}
          </button>
        </>
      )}
    </div>
  )
}

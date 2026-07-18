'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'

export type ContentData = {
  texts: Record<string, string>;
  positions: Record<string, { x: number, y: number }>;
}

type EditorContextType = {
  isEditMode: boolean;
  setIsEditMode: (v: boolean) => void;
  data: ContentData;
  updateText: (id: string, text: string) => void;
  updatePosition: (id: string, x: number, y: number) => void;
  undo: () => void;
  redo: () => void;
  saveLocal: () => Promise<void>;
  deploy: () => Promise<void>;
  canUndo: boolean;
  canRedo: boolean;
  isSaving: boolean;
  isDeploying: boolean;
}

const EditorContext = createContext<EditorContextType | null>(null)

export const useEditor = () => {
  const ctx = useContext(EditorContext)
  if (!ctx) throw new Error('useEditor must be used within EditorProvider')
  return ctx
}

export const EditorProvider = ({ children, initialData }: { children: React.ReactNode, initialData: ContentData }) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [history, setHistory] = useState<ContentData[]>([initialData])
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const [isSaving, setIsSaving] = useState(false)
  const [isDeploying, setIsDeploying] = useState(false)

  const data = history[currentIndex]

  const pushState = useCallback((newState: ContentData) => {
    setHistory(prev => {
      const newHistory = prev.slice(0, currentIndex + 1)
      return [...newHistory, newState]
    })
    setCurrentIndex(prev => prev + 1)
  }, [currentIndex])

  const updateText = useCallback((id: string, text: string) => {
    if (data.texts[id] === text) return;
    pushState({
      ...data,
      texts: { ...data.texts, [id]: text }
    })
  }, [data, pushState])

  const updatePosition = useCallback((id: string, x: number, y: number) => {
    if (data.positions[id]?.x === x && data.positions[id]?.y === y) return;
    pushState({
      ...data,
      positions: { ...data.positions, [id]: { x, y } }
    })
  }, [data, pushState])

  const undo = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1)
  }

  const redo = () => {
    if (currentIndex < history.length - 1) setCurrentIndex(currentIndex + 1)
  }

  const saveLocal = async () => {
    setIsSaving(true)
    try {
      const res = await fetch('/api/editor/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (!res.ok) throw new Error('Failed to save')
      alert('Saved locally!')
    } catch (e) {
      console.error(e)
      alert('Error saving')
    } finally {
      setIsSaving(false)
    }
  }

  const deploy = async () => {
    if (!confirm('Are you sure you want to push these changes to production (Vercel)?')) return;
    
    setIsDeploying(true)
    try {
      const res = await fetch('/api/editor/deploy', { method: 'POST' })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Failed to deploy')
      }
      alert('Changes pushed to production! Vercel is building the site now.')
    } catch (e: any) {
      console.error(e)
      alert(`Error deploying: ${e.message}`)
    } finally {
      setIsDeploying(false)
    }
  }

  return (
    <EditorContext.Provider value={{
      isEditMode, setIsEditMode, data, updateText, updatePosition, undo, redo, 
      saveLocal, deploy, canUndo: currentIndex > 0, canRedo: currentIndex < history.length - 1,
      isSaving, isDeploying
    }}>
      {children}
    </EditorContext.Provider>
  )
}

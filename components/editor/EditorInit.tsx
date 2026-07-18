'use client'

import React from 'react'
import { EditorProvider, ContentData } from './EditorProvider'
import { EditorDock } from './EditorDock'

export const EditorInit = ({ children, initialData }: { children: React.ReactNode, initialData: ContentData }) => {
  return (
    <EditorProvider initialData={initialData}>
      {children}
      <EditorDock />
    </EditorProvider>
  )
}

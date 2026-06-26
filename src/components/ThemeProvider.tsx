'use client'

import React from 'react'
import './LogspotTheme.scss'

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>
}

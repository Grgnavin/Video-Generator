"use client"
import React from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes"

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
        <NextThemesProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={true}
            disableTransitionOnChange
        >
            {children}
        </NextThemesProvider>
    </div>
  )
}

export default Provider
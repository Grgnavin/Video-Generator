import React from 'react'
import DashBoardProvider from './provider'

const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
        <DashBoardProvider>
            {children}
        </DashBoardProvider>
    </div>
  )
}

export default DashBoardLayout
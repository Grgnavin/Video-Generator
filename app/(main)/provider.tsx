import AppHeader from '@/components/AppHeader'
import AppSidebar from '@/components/AppSidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'

const DashBoardProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
        <SidebarProvider>
            <AppSidebar />
            <main className='w-full'>
                <AppHeader />
                {children}
            </main>
        </SidebarProvider>
    </div>
  )
}

export default DashBoardProvider
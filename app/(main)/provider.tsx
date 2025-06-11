"use client"
import AppHeader from '@/components/AppHeader'
import AppSidebar from '@/components/AppSidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import React, { useEffect } from 'react'
import { useAuthContext } from '../Provider'
import { useRouter } from 'next/navigation'

const DashBoardProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuthContext();
    const router = useRouter();
    useEffect(() => {
        const checkUserAuthentication = () => {
            if(!user){
                router.push('/');
            }
        };
        checkUserAuthentication();
    }, [user])
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
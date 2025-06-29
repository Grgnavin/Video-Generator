"use client"
import AppHeader from '@/components/AppHeader'
import AppSidebar from '@/components/AppSidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import React, { useEffect } from 'react'
import { useAuthContext } from '../Provider'
import { useRouter } from 'next/navigation'
import LoadingScreen from '@/components/LoadingScreen'

const DashBoardProvider = ({ children }: { children: React.ReactNode }) => {
    const { user, loading } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
        router.push("/");
        }
    }, [loading, user, router]);
    if (loading) {
        return <LoadingScreen />; 
    }
  return (
    <div>
        <SidebarProvider>
            <AppSidebar />
            <main className='w-full'>
                <AppHeader />
                <div className='p-10'>
                    {children}
                </div>
            </main>
        </SidebarProvider>
    </div>
  )
}

export default DashBoardProvider
"use client"
import React from 'react'
import { SidebarTrigger } from './ui/sidebar'
import Image from 'next/image'
import { useAuthContext } from '@/app/Provider'

const AppHeader = () => {
    const { user } = useAuthContext();
    return (
    <div className='p-3 flex items-center justify-between'>
        <SidebarTrigger />
        <Image
            src={user?.pictureUrl as string}
            alt='User Avatar'
            width={40}
            height={40}
            className='rounded-full flex flex-right'
        />
    </div>
  )
}

export default AppHeader
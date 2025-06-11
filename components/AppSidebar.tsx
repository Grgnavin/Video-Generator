"use client"
import React from 'react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar'
import Image from 'next/image'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { MenuItems } from '@/lib/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Gem } from 'lucide-react'
import { useAuthContext } from '@/app/Provider'

const AppSidebar = () => {
  const path = usePathname();
  const { user } = useAuthContext();
  return (
    <Sidebar>
      <SidebarHeader>
        <div>
            <section className='flex items-center gap-2 p-3 w-full justify-center mt-2'>
                <Image 
                    src={'/logo.svg'}
                    alt='Logo'
                    width={40}
                    height={50}
                    />
                <h2 className='font-semibold text-2xl '>Video Gen</h2>
            </section>
            <h2 className='text-lg text-gray-400 text-center'>AI short video Generator</h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
            <section className='mx-5'>
                <Button className='w-full'>+ Create new Video</Button>
            </section>
            <Separator className='mt-4'/>
            <SidebarMenu>
                {
                    MenuItems.map((menu, idx) => (
                        <SidebarMenuItem key={idx} className='mt-3 mx-2'>
                            <SidebarMenuButton isActive={path === menu.url} className='p-5'>
                                <Link href={menu.url} className='flex items-center gap-4 p-3'>
                                    <menu.icon />
                                    <span>{menu.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))
                }
            </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup/>
      </SidebarContent>
      <SidebarFooter>
        <footer className='p-4 border rounded-lg mb-6 bg-gray-800'>
            <section className='flex items-center justify-between'>
                <Gem  className='text-gray-400'/>
                <h2 className='text-gray-400'><span>{user?.credits}</span> Credits left</h2>
            </section>
            <Button className='w-full mt-3'>Buy More Credits</Button>
        </footer>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
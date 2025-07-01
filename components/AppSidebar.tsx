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
  const path = usePathname()
  const { user } = useAuthContext()

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="app-sidebar-header">
          <section className="app-sidebar-logo cursor-pointer" onClick={() => window.location.href = '/dashboard'}>
            <Image src="/logo.svg" alt="Logo" width={40} height={50} />
            <h2>ShortFusion AI</h2>
          </section>
          <h2 className="app-sidebar-subtitle">AI short video Generator</h2>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <section className="app-sidebar-create-button">
            <Link href="/create-new-video">
              <Button className="w-full">+ Create new Video</Button>
            </Link>
          </section>

          <Separator className="app-sidebar-separator" />

          <SidebarMenu>
            {MenuItems.map((menu, idx) => (
              <SidebarMenuItem key={idx} className="app-sidebar-menu-item">
                <SidebarMenuButton isActive={path === menu.url} className="app-sidebar-menu-button">
                  <Link href={menu.url} className="app-sidebar-menu-link">
                    <menu.icon />
                    <span>{menu.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup />
      </SidebarContent>

      <SidebarFooter>
        <footer className="app-sidebar-footer">
          <section className="app-sidebar-credits">
            <Gem className="text-gray-400" />
            <h2 className="text-gray-400"><span>{user?.credits}</span> Credits left</h2>
          </section>
          <Button className="app-sidebar-buy-button">Buy More Credits</Button>
        </footer>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
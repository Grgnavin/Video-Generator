"use client"
import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import Auth from './Auth'
import { useAuthContext } from '@/app/Provider'
import Link from 'next/link'

const Header = () => {
  const { user } = useAuthContext()
  return (
    <header className="app-header">
      <figure className="app-header-logo">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={35}
          height={35}
        />
        <h2>Video Gen</h2>
      </figure>
      <section>
        {!user ? (
          <Auth>
            <Button className="cursor-pointer">Get Started</Button>
          </Auth>
        ) : (
          <div className="app-header-user">
            <Link href="/dashboard">
              <Button className="cursor-pointer">Go to DashBoard</Button>
            </Link>
            <Image
              src={user.pictureUrl}
              alt="user image"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
        )}
      </section>
    </header>
  )
}

export default Header

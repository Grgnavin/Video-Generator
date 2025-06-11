"use client"
import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import Auth from './Auth'
import { useAuthContext } from '@/app/Provider'
import Link from 'next/link'

const Header = () => {
  const { user } = useAuthContext();
  console.log('user in header', user?.pictureUrl);
  
  return (
    <header className='p-4 shadow-md flex items-center justify-between'>
        <figure className='flex items-center gap-3'>
            <Image
                src={'/logo.svg'}
                alt="Logo"
                width={35}
                height={35}
                />
            <h2 className='text-2xl font-bold'>Video Gen</h2>
        </figure>
        <section>
            {!user ? (<Auth>
            <Button className='cursor-pointer'>
                Get Started 
            </Button>
            </Auth>
            ) : (
                <div className='flex items-center gap-3'>
                    <Link href={`/dashboard`}>
                        <Button className='cursor-pointer' >Go to DashBoard</Button>
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
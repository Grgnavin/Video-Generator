import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import Auth from './Auth'

const Header = () => {
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
            <Auth>
            <Button className='cursor-pointer'>
                Get Started 
            </Button>
            </Auth>
        </section>
    </header>
  )
}

export default Header
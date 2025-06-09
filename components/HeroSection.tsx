import React from 'react'
import { Button } from './ui/button'

const HeroSection = () => {
  return (
    <section className='p-10 flex flex-col items-center justify-center gap-5 mt-24 md:px-2 lg:px-36 xl:px-48'>
        <h2 className='font-semibold text-6xl text-center'>AI Youtube short video generator</h2>
        <p className='mt-4 text-2xl text-center text-gray-300'>
        🤖 AI generates scripts, images, and voiceover in seconds. <br />
        🚀 Create engaging YouTube Shorts with ease using our AI-powered tool.
      </p>
      <div className='mt-7 gap-8 flex'>
        <Button size="lg" variant="secondary">View All templates</Button>
        <Button size="lg" >Explore</Button>
      </div>
    </section>
  )
}

export default HeroSection
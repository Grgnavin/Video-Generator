import React from 'react'
import { Button } from './ui/button'
import Auth from './Auth'

const HeroSection = () => {
  return (
    <section className="hero-section">
      <h2 className="hero-title">AI Youtube short video generator</h2>
      <p className="hero-subtitle">
        🤖 AI generates scripts, images, and voiceover in seconds. <br />
        🚀 Create engaging YouTube Shorts with ease using our AI-powered tool.
      </p>
      <div className="hero-buttons">
        <Button size="lg" variant="secondary" className="cursor-pointer">View All templates</Button>
        <Auth>
          <Button size="lg" className="cursor-pointer">Explore</Button>
        </Auth>
      </div>
    </section>
  )
}

export default HeroSection

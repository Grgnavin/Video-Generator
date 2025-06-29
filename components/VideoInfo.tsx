"use client";
import { VideoData } from '@/lib/constants'
import { ArrowLeft, CheckCheckIcon, Link2Icon } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { Separator } from './ui/separator'
import { Button } from './ui/button'

const VideoInfo = ({ videoData } : { videoData: VideoData }) => {
  const[copied, setCopied] = useState<boolean>(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
  }

  return (
    <section className='p-5 border rounded-xl'>
      <Link href={'/dashboard'}>
        <h2 className='flex gap-2 items-center'>
          <ArrowLeft />
          Back to Dashboard
        </h2>
        <Separator className='mt-2' />
      </Link>
      <div className='flex flex-col gap-3'>
        <h2 className='mt-5'>Project Name: {videoData?.title}</h2>
        <p className='text-gray-500'>Script: {videoData?.script}</p>
        <h2>Video Style: {videoData?.videoStyle}</h2>
        <Separator className='my-2' />
        <Button onClick={handleCopy} > 
            {
              copied ? 
              <CheckCheckIcon />
              : <Link2Icon />
            }
            Copy the Link & Share
          </Button>
      </div>
    </section>
  )
}

export default VideoInfo
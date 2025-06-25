import VideoList from '@/components/VideoList'
import React from 'react'

const DashBoard = () => {
  return (
    <section>
        <h2 className='font-bold text-3xl'>My videos</h2>
        <VideoList />
    </section>
  )
}

export default DashBoard
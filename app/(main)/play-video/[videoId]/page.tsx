"use client";
import RemotionPlayer from '@/components/RemotionPlayer'
import VideoInfo from '@/components/VideoInfo'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { VideoData } from '@/lib/constants';
import { useConvex } from 'convex/react'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'

const PlayVideo = () => {
  const { videoId } = useParams();
  const convex = useConvex();
  const[videoData, setVideoData] = React.useState<VideoData>();
  const getVideoDataById = async() => {
    const res = await convex.query(api.VideoData.getVideoById, {
      videoId: videoId as Id<'videoData'>
    });
    console.log("VideoData: ", res);
    setVideoData(res);
  };

  useEffect(() => {
    if (videoId) {
      getVideoDataById();
    }
  }, [videoId])

  return (
    <section className='grid grid-cols-1 md:grid-cols-2'>
        <div>
            {/* Remotion player */}
            <RemotionPlayer videoData={videoData!} />
        </div>
        <div>
            {/* videoInfo */}
            <VideoInfo videoData={videoData!} />
        </div>
    </section>
  )
}

export default PlayVideo
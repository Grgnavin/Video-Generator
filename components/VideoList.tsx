"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';
import Link from 'next/link';
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useAuthContext } from '@/app/Provider';
import { Id } from '@/convex/_generated/dataModel';
import { VideoList } from '@/lib/constants';
import moment from 'moment';
import { RefreshCwIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

const VideoList = () => {
    const[videoList, setVideoList] = useState<VideoList[]>([]);
    const convex = useConvex();
    const { user } = useAuthContext();

    const router = useRouter();
    const getUserVideos = async () => {
        // fetch all the user videos
        const res = await convex.query(api.VideoData.getUserVideos, {
            uid: user?._id as Id<"users">
        })
        setVideoList(res);
        const isPendingvideo = res.find(video => video.status === "pending");
        if (isPendingvideo) {
            // get the pending video status
            getPendingVideoStatus(isPendingvideo);
        }
    }

    useEffect(() => {
        if (!user) {
            router.push('/');
        }
        getUserVideos();
    }, [user]);

    const getPendingVideoStatus = async (pendingVideo: VideoList) => {
        const intervalId = setInterval(async() => {
            const res = await convex.query(api.VideoData.getVideoById, {
                videoId: pendingVideo._id as Id<"videoData">
            })
            if (res?.status === "completed") {
                clearInterval(intervalId);
                console.log("Video completed");
                getUserVideos();
            }
            console.log("Still pending...");
            
        }, 5000);
    }

  return (
    <section>
        {
            videoList?.length === 0 ? (
                <section className='flex flex-col items-center justify-center mt-28 gap-3 p-5 border border-dashed rounded-xl py-16'>
                    <Image 
                        src="/logo.svg"
                        alt='No videos found'
                        width={60}
                        height={60}
                    />
                    <h2 className='mt-2 text-gray-400 text-lg'>You don't have any videos created yet.</h2>
                    <p className=' text-gray-400 text-lg'>Create a new one...</p>
                    <Link href={'/create-new-video'}>
                        <Button className='cursor-pointer'>+ Create new Video</Button>
                    </Link>
                </section>
            ) : (
                <section className='grid grid-col-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-10'>
                    {
                        videoList.map((video, idx) => (
                            <div key={idx} onClick={() => router.push(`/play-video/${video._id}`)} className='relative'>
                                {
                                    video?.status === "completed" ? (
                                        <div>
                                            <Image 
                                                src={video?.images?.[0] || ""}
                                                alt={video?.title || "Video Thumbnail"}
                                                width={500}
                                                height={500}
                                                className='w-full object-cover rounded-xl aspect-[2/3] hover:scale-105 cursor-pointer'
                                            />
                                            <div className='absolute bottom-3 px-5 w-full'>
                                                <h2 className=''>{video?.title}</h2>
                                                <h2>{moment(video?._creationTime).fromNow()}</h2>
                                            </div>
                                        </div>
                                ) : (
                                    <div className='border border-dashed bg-gray-900 aspect-[2/3] p-5 w-full rounded-xl flex gap-2 items-center justify-center'>
                                        <RefreshCwIcon className='animate-spin'/>
                                        <h2>Generating...</h2>
                                        <div className='absolute bottom-3 px-5 w-full'>
                                                <h2 className=''>{video?.title}</h2>
                                                <h2>{moment(video?._creationTime).fromNow()}</h2>
                                        </div>
                                    </div>
                                )
                                }
                            </div>
                        ))
                    }
                </section>
            )
        }
    </section>
  )
}

export default VideoList
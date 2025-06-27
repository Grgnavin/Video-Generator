"use client";
import React from 'react'
import {Player} from '@remotion/player';
import RemotionComposition from './RemotionComposition';
import { VideoData } from '@/lib/constants';
import { useVideoConfig } from 'remotion';

const RemotionPlayer = ({ videoData }: { videoData: VideoData }) => {
    const[durationInFrames, setDurationInFrames] = React.useState(100);
  return (
    <section>
        <Player 
            component={RemotionComposition}
            durationInFrames={durationInFrames}
            compositionHeight={1280}
            compositionWidth={720}
            fps={30}
            inputProps={{
                videoData: videoData,
                setDurationInFrame: (frameValue: number) => setDurationInFrames(frameValue),
                }}
            controls
            style={{
                width: '25vw',
                height: '75vh',
            }}
        />
    </section>
  )
}

export default RemotionPlayer
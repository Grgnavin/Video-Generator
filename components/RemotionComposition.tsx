"use client";
import { VideoData } from '@/lib/constants';
import React, { useMemo } from 'react';
import { AbsoluteFill, Audio, Img, interpolate, Sequence, useCurrentFrame, useVideoConfig } from 'remotion';

const RemotionComposition = ({
  videoData,
  setDurationInFrame
}: {
  videoData: VideoData;
  setDurationInFrame: (duration: number) => void;
}) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const imageList = videoData?.images || [];

  // Parse captions once
  const captions = useMemo(() => {
    if (!videoData?.captionJson) return [];
    try {
      return JSON.parse(videoData.captionJson);
    } catch (e) {
      console.error("Invalid captionJson format", e);
      return [];
    }
  }, [videoData]);

  // Compute duration based on captions
  const totalDuration = useMemo(() => {
    if (captions.length === 0) return 0;

    const lastCaption = captions[captions.length - 1];
    if (!lastCaption?.end) return 0;

    const duration = Math.round(lastCaption.end * fps);
    setDurationInFrame(duration);
    return duration;
  }, [captions, fps, setDurationInFrame]);

  // Get current caption word
  const getCurrentCaption = () => {
    const currentTime = frame / fps;
    const currentCaption = captions.find(
      (caption: { start: number; end: number }) =>
        currentTime >= caption.start && currentTime <= caption.end
    );
    return currentCaption ? currentCaption.word : '';
  };

  return (
    <div>
      <AbsoluteFill>
        {Array.isArray(imageList) && imageList.length > 0 ? (
          imageList.map((image, idx) => {
            const startTime = Math.round((idx * totalDuration) / imageList.length);
            const duration = Math.round(totalDuration / imageList.length);

            const scale = (index: number) =>
              interpolate(
                frame,
                [startTime, startTime + duration / 2, startTime + duration],
                index % 2 === 0 ? [1, 1.8, 1] : [1.8, 1, 1.8],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
              );

            return (
              <Sequence key={idx} from={startTime} durationInFrames={duration}>
                <AbsoluteFill>
                  <Img
                    src={image}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transform: `scale(${scale(idx)})`
                    }}
                  />
                </AbsoluteFill>
              </Sequence>
            );
          })
        ) : (
          <div className="flex items-center justify-center h-full text-white">
            <p>No images available for this video.</p>
          </div>
        )}
      </AbsoluteFill>

      <AbsoluteFill>
        <h2 style={{ 
           color: 'white',
          fontSize: '3rem',
          position: 'absolute',
          bottom: 50,
          width: '100%',
          textAlign: 'center',
          margin: 0,
          }}>
          {getCurrentCaption()}
          </h2>
      </AbsoluteFill>

      {videoData?.audioUrl && (
        <Audio
          src={videoData.audioUrl}
        />
      )}
    </div>
  );
};

export default RemotionComposition;

import { VideoData } from '@/lib/constants'
import React, { useMemo } from 'react'
import { AbsoluteFill, Audio, Img, interpolate, Sequence, useCurrentFrame, useVideoConfig } from 'remotion'

const RemotionComposition = ({
  videoData,
  setDurationInFrame
}: {
  videoData: VideoData;
  setDurationInFrame: (duration: number) => void;
}) => {
  const { fps } = useVideoConfig();
  const imageList = videoData?.images || [];
  const frame = useCurrentFrame();
  // Compute duration once, memoized
  const totalDuration = useMemo(() => {
    if (!videoData?.captionJson) return 0;

    let captions: { end: number }[] = [];

    try {
      captions = JSON.parse(videoData.captionJson);
    } catch (e) {
      console.error("Invalid captionJson format", e);
      return 0;
    }

    if (captions.length === 0) return 0;

    const lastCaption = captions[captions.length - 1];

    if (!lastCaption?.end) return 0;

    const duration = Math.round(lastCaption.end * fps);
    setDurationInFrame(duration);
    return duration;
  }, [videoData, fps, setDurationInFrame]);

  return (
    <div>
      <AbsoluteFill>
        {
          Array.isArray(imageList) && imageList.length > 0 ? (
            imageList.map((image, idx) => {
              const startTime = Math.round((idx * totalDuration) / imageList.length);
              const duration = Math.round(totalDuration / imageList.length);
              const scale = (index: number) => interpolate(
                frame,
                [startTime, startTime + duration/2, startTime + duration],
                index%2==0 ? [1,1.8, 1] : [1.8,1,1.8],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
              )
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
              )
            })
          ) : (
            <div className="flex items-center justify-center h-full text-white">
              <p>No images available for this video.</p>
            </div>
          )
        }
      </AbsoluteFill>
      <Audio 
        src={videoData?.audioUrl || ''}
        
      />
    </div>
  )
};

export default RemotionComposition;

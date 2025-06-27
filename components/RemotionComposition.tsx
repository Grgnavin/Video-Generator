import { VideoData } from '@/lib/constants'
import React, { useEffect } from 'react'
import { useVideoConfig } from 'remotion'

const RemotionComposition = ({
  videoData,
  setDurationInFrame
}: {
  videoData: VideoData;
  setDurationInFrame: (duration: number) => void;
}) => {
  const { fps } = useVideoConfig();

  useEffect(() => {
    if (!videoData?.captionJson) return;

    let captions: { end: number }[] = [];

    try {
      captions = JSON.parse(videoData.captionJson);
    } catch (e) {
      console.error("Invalid captionJson format", e);
      return;
    }

    if (captions.length === 0) return;

    const lastCaption = captions[captions.length - 1];

    if (!lastCaption?.end) {
        return;
    }

    const totalDuration = Math.round(lastCaption.end * fps);

    setDurationInFrame(totalDuration);
  }, [videoData, fps, setDurationInFrame]);

  return(
    <div>
        RemoteComposition
    </div>
  )
};

export default RemotionComposition;

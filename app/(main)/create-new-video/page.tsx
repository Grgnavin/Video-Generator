"use client"
import Captions from '@/components/Captions';
import Preview from '@/components/Preview';
import Topic from '@/components/Topic'
import { Button } from '@/components/ui/button';
import VideoStyle from '@/components/VideoStyle';
import VoiceAgent from '@/components/VoiceAgent';
import { CaptionStyle, FormDataType } from '@/lib/constants';
import axios from 'axios';
import { WandSparkles } from 'lucide-react';
import React, { useState } from 'react'

const Page = () => {
    const[formData, setFormData] = useState<FormDataType>({});

    const HandleInputChange = (fieldName: string, fieldValue: string | CaptionStyle) => {
        setFormData((prevData) => {
            const newData = {
                ...prevData,
                [fieldName]: fieldValue
            };
            console.log("Updated form data:", newData);
            return newData;
        });
    }
    
    const GenerateVideo = async () => {
        if (!formData.topic || !formData.script || !formData.videoStyle || !formData.voice || !formData.caption) {
            console.log("Please fill all the fields before generating the video.");
            return;
        }
        const res = await axios.post('/api/generate-video-data', {
            ...formData
        });
        console.log("Video generation response:", res.data);
    }

  return (
    <div>
        <h2 className='text-3xl'>Create new Video</h2>
        <div className='grid sm:grid-col-1 md:grid-cols-3 mt-8 gap-7'>
            <div className='col-span-2 p-7 border rounded-xl h-[80vh] overflow-auto'>
                {/* Topic & Script */}
                    <Topic HandleInputChange={HandleInputChange} />
                {/* video image style  */}
                    <VideoStyle HandleInputChange={HandleInputChange} />
                {/* voice  */}
                    <VoiceAgent HandleInputChange={HandleInputChange}/>
                {/* captions */}
                    <Captions HandleInputChange={HandleInputChange}/>
                <Button className='w-full mt-5 ' onClick={GenerateVideo}><WandSparkles /> Generate Button</Button>
            </div>
            <div className='col-span-1'>
                <Preview formData={formData} />
            </div>
        </div>
    </div>
  )
}

export default Page
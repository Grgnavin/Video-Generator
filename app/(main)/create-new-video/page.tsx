"use client"
import Captions from '@/components/Captions';
import Preview from '@/components/Preview';
import Topic from '@/components/Topic'
import { Button } from '@/components/ui/button';
import VideoStyle from '@/components/VideoStyle';
import VoiceAgent from '@/components/VoiceAgent';
import { CaptionStyle, FormDataType } from '@/lib/constants';
import { WandSparkles } from 'lucide-react';
import React, { useState } from 'react'

const Page = () => {
    const[formData, setFormData] = useState<FormDataType>({});

    // Solution 1: Log inside the state updater
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
                <Button className='w-full mt-5 '><WandSparkles /> Generate Button</Button>
            </div>
            <div className='col-span-1'>
                <Preview formData={formData} />
            </div>
        </div>
    </div>
  )
}

export default Page
import { options } from '@/lib/constants';
import Image from 'next/image';
import React, { useState } from 'react'

const VideoStyle = ({ 
    HandleInputChange
 } : { 
  HandleInputChange: (fieldName: string, fieldValue: string) => void;
  }) => {
  const[selectedStyle, setSelectedStyle] = useState<string>("");
  return (
    <section className='mt-5'>
        <h2>Video Styles</h2>
        <p className='text-sm text-gray-400 mb-1'>Select Video type</p>
        
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-col-4 xl:grid-cols-5 gap-3'>
            {
                options.map((option, idx) => (
                    <figure 
                        key={idx} 
                        onClick={() => {
                            setSelectedStyle(option.name)
                            HandleInputChange("videoStyle", option.name)
                        }}>
                        <Image 
                            src={option.image}
                            alt='image'
                            width={500}
                            height={120}
                            className={`cursor-pointer hover:border border-gray-300 object-cover h-[100px] w-[350px] lg:h-[350px] xl:[400px] rounded-lg p-1 ${option.name === selectedStyle && "border"}`}
                        />
                        <h2 className='text-center'>{option.name}</h2>
                    </figure>
                ))
            }
        </div>
    </section>
  )
}

export default VideoStyle
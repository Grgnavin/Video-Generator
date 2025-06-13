"use client"
import Topic from '@/components/Topic'
import React, { useState } from 'react'

const Page = () => {
    const[formData, setFormData] = useState<Record<string, string>>({});

    const HandleInputChange = (fieldName: string, fieldValue: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: fieldValue
        }));
        console.log(formData);
    }
    
  return (
    <div>
        <h2 className='text-3xl'>Create new Video</h2>
        <div className='grid sm:grid-col-1 md:grid-cols-3 mt-8'>
            <div className='col-span-2 p-7 border rounded-xl'>
                {/* Topic & Script */}
                    <Topic HandleInputChange={HandleInputChange} />
                {/* video image style  */}

                {/* voice  */}

                {/* captions */}
            </div>
            <div className='col-span-1'>

            </div>
        </div>
        

    </div>
  )
}

export default Page
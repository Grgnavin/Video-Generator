import { FormDataType, options } from '@/lib/constants'
import Image from 'next/image'
import React from 'react'

const Preview = ({ formData }: { formData: FormDataType }) => {
  const selectedVideoStyle = formData && options.find((item) => item?.name === formData?.videoStyle);
    return (
    <section>
        {
            selectedVideoStyle?.image && (
                <div className='relative'>
                    <h2 className='text-center mb-3 text-2xl'>Preview</h2>
                    <Image 
                        src={selectedVideoStyle?.image && selectedVideoStyle?.image}
                        alt={selectedVideoStyle?.name && selectedVideoStyle?.name}
                        width={1000}
                        height={300}
                        className='w-full object-cover rounded-xl'
                        />
                    <h2 className={`${formData?.caption?.style} absolute bottom-7 text-center w-full`}>{formData?.caption?.name}</h2>
                </div>
            )
        }
    </section>
  )
}

export default Preview
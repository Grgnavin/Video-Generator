import { CaptionOptions } from '@/lib/constants';
import React, { useState } from 'react'

const Captions = ({
    HandleInputChange
}: {
  HandleInputChange: (fieldName: string, fieldValue: string) => void;
}) => {
  const[selectedCaption, setSelectedCaption] = useState<string>("");
  return (
    <section className='mt-5 p-1'>
        <h2>Caption Style</h2>
        <p className='text-sm text-gray-400'>Select Caption style</p>
        <div className='flex flex-wrap gap-4 mt-2'>
            {
                CaptionOptions.map((caption, idx) => (
                    <div key={idx} 
                    className={`p-2 hover:border border-gray-300 rounded-lg cursor-pointer ${selectedCaption === caption.name && "border"}`}
                    onClick={() => {
                        setSelectedCaption(caption.name);
                        HandleInputChange("caption", caption);
                    }}
                    >
                        <h2 className={caption.style}>{caption.name}</h2>
                    </div>
                ))
            }
        </div>
    </section>
  )
}

export default Captions
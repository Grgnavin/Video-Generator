import { VoiceOptions } from '@/lib/constants';
import React, { useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area';

const VoiceAgent = ({
    HandleInputChange
}: {
  HandleInputChange: (fieldName: string, fieldValue: string) => void;
}) => {
  const[selectedVoice, setSelectedVoice] = useState<string>("");
  return (
    <section className='mt-5'>
        <h2>Video voice</h2>
        <p className='text-sm text-gray-400'>Select voice for video</p>
        <ScrollArea className='h-[150px] w-full'>
        <div className='grid grid-cols-2 gap-3 mt-2'>
            {
                VoiceOptions.map((voice, idx) => (
                    <h2 className={`dark:bg-slate-900 cursor-pointer p-2 hover:border hover:border-gray-300 rounded-lg ${voice.name === selectedVoice && "border border-gray-300"}`} 
                    key={idx}
                    onClick={() => {
                        setSelectedVoice(voice.name);
                        HandleInputChange("voice", voice.value);
                    }}
                    >
                            {voice.name}
                        </h2>
                ))
            }
        </div>
            </ScrollArea>
    </section>
  )
}

export default VoiceAgent
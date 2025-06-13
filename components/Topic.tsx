"use client"
import React, { useState } from 'react'
import { Input } from './ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Suggestions } from '@/lib/constants'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { SparklesIcon } from 'lucide-react'

const Topic = ({ HandleInputChange } : { HandleInputChange: (fieldName: string, fieldValue: string) => void }) => {
    const[selectedTopic, setSelectedTopic] = useState<string>("");
    const GenerateScript = () => {
        
    }
    return (
    <section >
        <h2 className='mb-1'>Project Title</h2>
        <Input 
            placeholder='Enter your project title'
            onChange={(e) => HandleInputChange("title", e.target.value)}
        />
        <div className='mt-5'>
            <h2>Video Topics</h2>
            <p className='text-sm text-gray-600'>Select topic for your video</p>
            <Tabs defaultValue="suggestion" className="w-full mt-2">
            <TabsList>
                <TabsTrigger value="suggestion">Suggestions</TabsTrigger>
                <TabsTrigger value="your_topic">Your Topics</TabsTrigger>
            </TabsList>
            <TabsContent value="suggestion">
                <section className=''>
                    {
                        Suggestions.map((suggestion, idx) => (
                            <Button 
                                variant={"outline"} 
                                key={idx} 
                                className={`m-1 cursor-pointer ${selectedTopic === suggestion && "bg-secondary "}`} 
                                onClick={() => {
                                    setSelectedTopic(suggestion);
                                    HandleInputChange('topic', suggestion);
                                }}
                            >
                                {suggestion}
                            </Button>
                        ))
                    }
                </section>
            </TabsContent>
            <TabsContent value="your_topic">
                <section className='flex gap-2 flex-col'>
                    <h2>Enter Your Own Topic</h2>
                    <Textarea placeholder='Enter your topic'
                        onChange={(e) => HandleInputChange('topic', e.target.value)}
                    />
                </section>
            </TabsContent>
            </Tabs>
        </div>
        <Button onClick={GenerateScript} className='mt-3' size={"sm"}>
            <SparklesIcon />
            Generate Script
        </Button>
    </section>
  )
}

export default Topic
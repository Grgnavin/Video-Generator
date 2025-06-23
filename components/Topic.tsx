"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Suggestions } from "@/lib/constants";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Loader, SparklesIcon } from "lucide-react";
import axios from "axios";
import { ScriptItem } from "@/lib/types";

const Topic = ({
  HandleInputChange,
}: {
  HandleInputChange: (fieldName: string, fieldValue: string) => void;
}) => {
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const[selectedScript, setSelectedScript] = useState<string>("");
  const[scripts, setScripts] = useState<ScriptItem[]>([]);
  const[loading, setLoading] = useState<boolean>(false);

  const GenerateScript = async () => {
    setLoading(true);
    try {
        const res = await axios.post("/api/generate-script", {
          topic: selectedTopic,
        });
        setScripts(res.data?.script);
    } catch (error) {
        console.log(error);
    }finally{
        setLoading(false);
    }
  };
  
  console.log(scripts);
  
  return (
    <section>
      <h2 className="mb-1">Project Title</h2>
      <Input
        placeholder="Enter your project title"
        onChange={(e) => HandleInputChange("title", e.target.value)}
      />

      <div className="mt-5">
        <h2>Video Topics</h2>
        <p className="text-sm text-gray-600">Select topic for your video</p>
        <Tabs defaultValue="suggestion" className="w-full mt-2">
          <TabsList>
            <TabsTrigger value="suggestion">Suggestions</TabsTrigger>
            <TabsTrigger value="your_topic">Your Topics</TabsTrigger>
          </TabsList>

          <TabsContent value="suggestion">
            <section>
              {Suggestions.map((suggestion, idx) => (
                <Button
                  variant="outline"
                  key={idx}
                  className={`m-1 cursor-pointer ${
                    selectedTopic === suggestion ? "bg-gray-300" : ""
                  }`}
                  onClick={() => {
                      HandleInputChange("topic", suggestion);
                      setSelectedTopic(suggestion);
                  }}
                >
                  {suggestion}
                </Button>
              ))}
            </section>
          </TabsContent>

          <TabsContent value="your_topic">
            <section className="flex gap-2 flex-col">
              <h2>Enter Your Own Topic</h2>
              <Textarea
                placeholder="Enter your topic"
                onChange={(e) => {
                  setSelectedTopic(e.target.value);
                  HandleInputChange("topic", e.target.value);
                }}
              />
            </section>
          </TabsContent>
        </Tabs>
            {
                scripts?.length > 0 && 
                <div className="mt-3">
                    <h2 className="p-2 text-center">Select the Script</h2>
                    <div className="grid grid-cols-2 gap-5 mt-1">    
                {scripts?.map((script, idx) => (
                        <div 
                        key={idx} 
                        className={`p-2 rounded-lg border cursor-pointer ${selectedScript === script.content ? "border-white bg-secondary" : ""}`} 
                        onClick={() => {
                          setSelectedScript(script.content)
                          HandleInputChange("script", script.content);
                        }}
                        >
                            <h2 className="line-clamp-4 text-sm text-gray-300">{script.content}</h2>
                    </div>
                ))}
                </div>
                </div>
            }
      </div>
        {
            !selectedScript && 
            <Button disabled={loading} onClick={GenerateScript} className="mt-3" size="sm">
                {
                    loading ? <Loader className="animate-spin"/> : <SparklesIcon className="mr-2 h-4 w-4" />} Generate Script
            </Button>
        }
    </section>
  );
};

export default Topic;

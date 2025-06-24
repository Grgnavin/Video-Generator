import { generate, generateImageScripts } from './../configs/AIModel';
import axios from "axios";
import { inngest } from "./client";
import { createClient } from "@deepgram/sdk";

const ImagePromptScript = `Generate Image prompt of {style} style with all details for each scene for 30 second video: script: {script} 
- Just give specifying image prompt depends on the story line
-don't give camera angle image prompt
- Follow the following schema and return json data (Max 4-5 images)
-[
    {
        imageprompt: '',
        sceneContent: '<Script Contents>'
    }
]
`;

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);


const BASE_URL='https://aigurulab.tech';
export const GenerateVideoData = inngest.createFunction(
    { id: "generate-video-data" },
    { event: "generate-video-data" },
    async({ event, step }) => {
        const { script, topic, caption, videoStyle, voice, title } = event?.data; 
        //Generate Audio file mp3
        // const generateAudioFile = await step.run(
        //     "generateAudioFile",
        //     async () => {
        //             const result = await axios.post(BASE_URL+'/api/text-to-speech',
        //                 {
        //                     input: script,
        //                     voice: voice
        //                 },
        //                 {
        //                     headers: {
        //                         'x-api-key': process.env.NEXT_PUBLIC_AIGURULAB_API_KEY, // Your API Key
        //                         'Content-Type': 'application/json', // Content Type
        //                     },
        //                 })
        //         console.log(result.data.audio) //Output Result: Audio Mp3 Url
        //         return result.data.audio;
        //     }
        // );
        //Generate Captions
        // const generateCaptions = await step.run(
        //     "generateCaptions",
        //     async () => {
        //         const deepgram = createClient(process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY!);
        //         const{ result, error } = await deepgram.listen.prerecorded.transcribeUrl(
        //             {
        //                 url: generateAudioFile!
        //             },
        //             {
        //                 model: "nova-3",
        //             }
        //         );
        //         if (error) {
        //             console.error("Error generating captions:", error);
        //         }
        //         return result?.results?.channels[0]?.alternatives[0]?.words;
        //     }    
        // );
        //Generate Image prompts from script
        const generateImagePrompts = await step.run(
            "generateImagePrompts",
            async () => {
                const res = await generateImageScripts(script, videoStyle);
                console.log("Generated Image Prompts:", res);
                return res;
            }
        )
        //Generate images using ai model
        //save all data to db
        return generateImagePrompts;
    }
)

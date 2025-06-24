// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import {
  GoogleGenAI,
} from '@google/genai';

export const generateScript = async(topic: string) => {
  const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  });
  const config = {
    responseMimeType: 'application/json',
  };
  const model = 'gemini-2.0-flash';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: `Generate exactly two different 30-second video scripts on the topic: "${topic}". 
⚠️ STRICT FORMAT REQUIRED. Output must be pure JSON with no commentary or formatting.

Rules:
- DO NOT include scene descriptions, narrator lines, or character names.
- DO NOT use fields like "Scene:", "Narrator:", "LILA:", "PIP:", etc.
- Each script must be 1 short paragraph of content.
- The response must be ONLY valid JSON in this format (no explanation, no markdown):

{
  "script": [
    { "content": "..." },
    { "content": "..." }
  ]
}
]
}
`,
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: `**Generating Video Concepts**

I've outlined the framework for crafting two distinct 30-second video scripts suitable for a children's story. The focus is on ensuring these scripts are engaging and easily understood by the target audience. My current goal is to ensure the content conforms to the specified JSON format.


**Crafting Storyboard Details**

I've got the narrative structure down for both scripts, detailing the characters and settings. My recent focus has been on fleshing out the specific visual elements for each scene within the 30-second timeframe. I'm now working to ensure the provided JSON format accurately reflects the video content.


**Finalizing JSON Scripts**

I've developed two distinct 30-second scripts: "The Lost Star" featuring Flicker the firefly and "The Magical Mud Puddle" with Leo and Mia. I've now structured these scripts to meet the exact JSON format requested, ensuring all visual and audio details are included for clarity. Each scene is crafted with a specific time frame, guaranteeing the 30-second duration is accurately adhered to. My confidence in the scripts' suitability is at its peak.


**Refining the JSON Structure**

I've structured the two scripts into the requested JSON format, ensuring clear visual and audio cues are included. I've focused on using simple language to match the children's story style. Each scene is timed within the 30-second window, and my confidence in the suitability of these scripts remains high. I'm now checking the structure to make certain everything is compliant, ready for delivery.


**Creating Final JSON Scripts**

I've crafted two distinct 30-second scripts: "The Lost Star" and "The Magical Mud Puddle," complete with visual and audio cues. These are now formatted into the specific JSON structure requested, ensuring clear and concise content for the children's story. I'm satisfied with the clarity and completeness of the scripts, ready for delivery.


`,
        },
        {
          text: `\`\`\`json
{
"script": [
{
"content": "(Scene: A moonlit, animated forest. A small, fluffy bunny named PIP is looking sad.)\\n\\nNARRATOR (Warm, friendly voice): Pip the bunny lost his favorite bouncy ball. It was his best friend!\\n\\n(A wise old owl with big glasses flies down and lands on a branch next to Pip.)\\n\\nOWL: Hoot-hoot! Don't you worry, little one.\\n\\n(The owl points a wing towards a glowing hollow in a tree. Pip hops over and peeks inside.)\\n\\nNARRATOR: Sometimes, what you're looking for is closer than you think.\\n\\n(Pip pulls out his red bouncy ball and hugs it, smiling brightly.)\\n\\nNARRATOR: And a little help from a friend makes all the difference!"
},
{
"content": "(Scene: A bright, sunny kitchen. Two children, a girl named LILA and a boy named SAM, are wearing chef hats.)\\n\\nNARRATOR (Upbeat, fun voice): Lila and Sam wanted to bake the world's most magical cookies!\\n\\n(Lila adds sparkling sprinkles to a bowl of cookie dough. Sam stirs with a giant wooden spoon.)\\n\\nLILA: We need a secret ingredient!\\n\\n(They both giggle and pretend to whisper a secret into the bowl. *POOF!* A cloud of colorful, edible glitter appears.)\\n\\nNARRATOR: They added a pinch of giggles and a spoonful of fun!\\n\\n(Final shot: Lila and Sam are holding up rainbow-colored cookies, taking a big bite and smiling at the camera.)\\n\\nNARRATOR: The yummiest magic is the kind you make together!"
}
]
}
\`\`\``,
        },
      ],
    },
    {
      role: 'user',
      parts: [
        {
          text: `INSERT_INPUT_HERE`,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });
  let fullText= "";
  for await (const chunk of response) {
    if(!chunk?.text){
      throw new Error("No message in response");
    }
    fullText += chunk?.text;
  }
  // Remove code block formatting (like ```json ... ```)
  fullText = fullText.replace(/```json|```/g, "").trim();

  try {
    const parsed = JSON.parse(fullText);
    return parsed;
  } catch (e) {
    console.error("Failed to parse AI response as JSON:", e);
    throw new Error("AI response is not valid JSON");
  }
}

export const generateImageScripts = async(script: string, videoStyle: string) => {
  const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  });
  const config = {
    responseMimeType: 'application/json',
  };
  const model = 'gemini-2.0-flash';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: `Generate Image prompt of ${videoStyle} style with all details for each scene for 30 second video: script: ${script}

- Just give specifying image prompt depends on the story line
-don't give camera angle image prompt
- Follow the following schema and return json data (Max 4-5 images)
-[
    {
        imageprompt: '',
        sceneContent: '<Script Contents>'
    }
]`,
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: `**Formulating Visual Prompts**

I'm currently focused on constructing detailed image prompts for a 30-second video trailer. My primary objective is to capture the dramatic and suspenseful essence of the script through cinematic imagery. I'm meticulously crafting prompts that will elicit specific visuals to match the required tone.


**Defining Image Styles**

I've refined the approach to generating image prompts for the trailer. Initially, I focused on visual fidelity, but now I'm prioritizing the cinematic atmosphere. I'm building each prompt with specific style parameters for each scene. For the first scene, I'm aiming for a vintage, grainy black-and-white look reminiscent of a found photograph. I'm focusing on the subtle details of the suburban house to create an unsettling, yet alluring image.


**Refining Prompt Construction**

I'm now focusing on distilling the essence of each scene into precise image prompts. For the opening scene, I've expanded on the initial idea. The goal is now a captivating "grainy, black and white photograph" of a classic suburban house. I'm prioritizing the feeling of an old, found photograph with elements of eerie mystery. I am working on scene two by building a collage of newspaper clippings.


**Formulating Image Ideas**

I'm now fully immersed in developing detailed image prompts for each scene of the trailer. For the initial scene, I've honed in on creating that vintage, unsettling photograph of the suburban home. Now, I'm defining the prompts for subsequent scenes, specifically aiming to create a cinematic collage of newspaper headlines for scene two, and a voyeuristic, suspenseful shot of a neighbor observing the police activity for scene three.


**Constructing Cinematic Scenes**

I'm now fully immersed in developing detailed image prompts for each scene of the trailer. I've built the foundational prompts and am now expanding them with rich details. For the opening scene, I'm focusing on that vintage, unsettling photograph of the suburban home. I am defining the prompts for subsequent scenes, aiming to create a cinematic collage of newspaper headlines, and a suspenseful shot of a neighbor observing police activity. Finally, I will wrap up with a final "title card" style image.


**Refining Scene Visuals**

I've crafted detailed image prompts for each of the four scenes, aiming for a consistent cinematic style. The opening scene now focuses on an unsettling black and white photograph of the suburban house. For the second scene, I'm constructing a gritty, investigative collage of newspaper headlines. The third image will show a voyeuristic neighbor, while the final shot is a dramatic crime scene. All keywords and details are refined and in place.


`,
        },
        {
          text: `\`\`\`json
[
    {
        "imageprompt": "A highly detailed, grainy, black and white 1980s photograph of a classic two-story suburban house. The house appears deceptively normal with a neat lawn, but long, ominous shadows stretch across the yard. A single light is on in an upstairs window, creating a focal point of mystery. The overall mood is unsettling and eerie, cinematic film grain, photorealistic.",
        "sceneContent": "Dramatic music. A grainy, black and white photo of a seemingly normal house. Text overlay: 'Suburban Nightmare')."
    },
    {
        "imageprompt": "Cinematic, dark, and gritty shot of a messy wooden desk. Scattered, yellowed newspaper clippings are spread across the surface under the harsh light of a desk lamp. The headlines 'Missing Woman' and 'Husband Questioned' are in sharp, clear focus. Other articles are blurred in the background. True crime, investigative aesthetic, high contrast, photorealistic.",
        "sceneContent": "Cut to: Newspaper headlines flashing across the screen: 'Missing Woman', 'Husband Questioned')."
    },
    {
        "imageprompt": "A suspenseful, cinematic scene from the perspective of a worried neighbor. The focus is on a woman's fearful eyes as she peers through a gap in her vintage lace curtains. In the out-of-focus background, the flashing red and blue lights of a police car reflect off the windows of the house across the street, now surrounded by yellow crime scene tape. Moody, high-contrast lighting, photorealistic.",
        "sceneContent": "Quick cuts: A police car pulling up to the house. Yellow tape. Close-up of a worried neighbor peering through curtains."
    },
    {
        "imageprompt": "Dramatic, cinematic wide shot of the suburban house at night, now an active crime scene. The house is dark, but cold, sterile blue and white forensic lights glow intensely from within the windows. Yellow police tape is stretched across the front lawn, glistening under a streetlamp. The atmosphere is foreboding and chilling, like a thriller movie poster. Hyper-realistic, 8k.",
        "sceneContent": "This is the story of...The Willow Creek Conspiracy. Streaming now only on [Your Streaming Service Name]."
    }
]
\`\`\``,
        },
      ],
    },
    {
      role: 'user',
      parts: [
        {
          text: `INSERT_INPUT_HERE`,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });
  let fullText= "";
  for await (const chunk of response) {
    if(!chunk?.text){
      throw new Error("No message in response");
    }
    fullText += chunk?.text;
  }
  // Remove code block formatting (like ```json ... ```)
  fullText = fullText.replace(/```json|```/g, "").trim();

  try {
    const parsed = JSON.parse(fullText);
    return parsed;
  } catch (e) {
    console.error("Failed to parse AI response as JSON:", e);
    throw new Error("AI response is not valid JSON");
  }
}
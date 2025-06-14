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

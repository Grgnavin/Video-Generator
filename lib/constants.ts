import { HomeIcon, LucideFileVideo, Search, WalletCards } from "lucide-react";

export const MenuItems = [
    {
        title: 'Home',
        url: '/dashboard',
        icon: HomeIcon
    },
    {
        title: "Create new video",
        url: '/create-new-video',
        icon: LucideFileVideo
    },
    {
        title: "Explore",
        url: '/explore',
        icon: Search
    },
    {
        title: "billing",
        url: '/billing',
        icon: WalletCards
    },
]

export const Suggestions = [
    "Historic Story",
    "Kids Story",
    "Movie Stories",
    "AI Innovations",
    "Horror Stories",
    "True Crime Stories",
    "Fantasy Adventures",
    "Motivational Stories",
    "Science Fiction",
    "Romantic Stories",
    "Mystery Thrillers",
]

export const options = [
    {
        name: "3D Render",
        image: "/3dRender.png"
    },
    {
        name: "Cinematic",
        image: "/Cinematic.png"
    },
    {
        name: "Anime",
        image: "/Anime.png"
    },
    {
        name: "Realistic",
        image: "/3dRender.png"
    },
    {
        name: "GTA",
        image: "/GTA.png"
    },
    {
        name: "Fantasy",
        image: "/Fantasy.png"
    },
]

export const VoiceOptions = [
    {
        "value": "af_sarah",
        "name": " Sarah (female)"
    },
    {
        "value": "af_sky",
        "name": " Sky (female)"
    },
    {
        "value": "am_adam",
        "name": " Adam (Male)"
    },
    {
        "value": "hf_alpha",
        "name": " Alpha (Male)"
    },
    {
        "value": "hf_beta",
        "name": " Beta (Male)"
    },
    {
        "value": "am_fenrir",
        "name": " Fenrir (Male)"
    },
    {
        "value": "am_liam",
        "name": " Liam (Male)"
    },
    {
        "value": "am_michael",
        "name": " Michael (Male)"
    },
    {
        "value": "am_onyx",
        "name": " Onyx (Male)"
    }
]

export const CaptionOptions = [
  {
    name: "Youtuber",
    style: "text-red-600 text-3xl font-bold uppercase tracking-wide"
  },
  {
    name: "Supreme",
    style: "text-white text-4xl font-black px-2 uppercase tracking-widest"
  },
  {
    name: "Neon",
    style: "text-green-400 text-3xl font-semibold drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]"
  },
  {
    name: "Glitch",
    style: "text-pink-500 text-3xl font-bold tracking-wider relative after:content-[''] after:absolute after:left-0 after:top-0 after:text-blue-500 after:translate-x-1 after:blur-sm"
  },
  {
    name: "Fire",
    style: "text-orange-500 text-3xl font-extrabold animate-pulse drop-shadow-[0_0_8px_rgba(255,115,0,0.7)]"
  },
  {
    name: "Futuristic",
    style: "text-cyan-400 text-3xl font-medium tracking-wide uppercase drop-shadow-[0_0_6px_rgba(34,211,238,0.7)]"
  }
];

export type CaptionStyle = {
  name: string;
  style: string;
};

export type FormDataType = {
  title?: string;
  topic?: string;
  videoStyle?: string;
  voice?: string;
  caption?: CaptionStyle
  script?: string;
};

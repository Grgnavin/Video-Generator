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
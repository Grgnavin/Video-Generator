import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from "./ConvexProvider";

export const metadata: Metadata = {
  title: "ShortFusion AI",
  description: "AI-powered YouTube Shorts generator",
  icons: {
    icon: "/logo.svg",
  }
};


const outfit = Outfit({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${outfit.className}`}
      > 
        <ConvexClientProvider>
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
}

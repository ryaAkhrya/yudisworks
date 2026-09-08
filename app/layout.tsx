import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

// Inter: body copy — display:swap prevents FOUT, preload:true reduces LCP penalty
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

// Bebas Neue: the big P5 display headings
const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-bebas",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://yudisworks.id"),
  title: "Yudisworks | Multidisciplinary Creative",
  description: "Multidisciplinary creative portfolio of Yudistira, featuring web development, visual design, music, and selected creative work.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Yudisworks | Multidisciplinary Creative",
    description: "Multidisciplinary creative portfolio of Yudistira, featuring web development, visual design, music, and selected creative work.",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://yudisworks.id",
    siteName: "Yudisworks",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yudisworks | Multidisciplinary Creative",
    description: "Multidisciplinary creative portfolio of Yudistira, featuring web development, visual design, music, and selected creative work.",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased selection:bg-p5-red selection:text-p5-paper overflow-x-hidden ${inter.variable} ${bebasNeue.variable}`}
    >
      <body className="min-h-full flex flex-col font-sans overflow-x-hidden bg-[#F5F5F5] text-p5-black">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}


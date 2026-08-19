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
  title: "Phantom Freelancer",
  description: "I'll Steal Your Deadlines.",
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


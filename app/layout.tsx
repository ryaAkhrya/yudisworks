import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

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
    <html lang="en" className="h-full antialiased selection:bg-p5-red selection:text-p5-paper">
      <body className="min-h-full flex flex-col font-sans overflow-x-hidden p5-paper bg-[#F5F5F5] text-p5-black">
        <CustomCursor />
        {/* Anti-Slop Layout Constraint: No standard navbars. Aggressive, chaotic background */}
        {children}
      </body>
    </html>
  );
}

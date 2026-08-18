import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yudisworks | The Phantom Freelancer",
  description: "Web Dev, Academic Papers, and Presentations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased selection:bg-p5-red selection:text-p5-paper">
      <body className="min-h-full flex flex-col font-sans overflow-x-hidden p5-paper bg-[#F5F5F5] text-p5-black">
        {/* Anti-Slop Layout Constraint: No standard navbars. Aggressive, chaotic background */}
        {children}
      </body>
    </html>
  );
}

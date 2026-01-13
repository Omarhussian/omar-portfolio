import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Omar Hussain | Senior Front-End Engineer",
  description:
    "Bridging the gap between complex engineering and fluid UI. Specializing in Fintech, Travel solutions, and AI-integrated dashboards.",
  keywords: [
    "Front-End Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "Fintech",
    "UI/UX",
  ],
  authors: [{ name: "Omar Hussain" }],
  openGraph: {
    title: "Omar Hussain | Senior Front-End Engineer",
    description:
      "Bridging the gap between complex engineering and fluid UI. Specializing in Fintech, Travel solutions, and AI-integrated dashboards.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-zinc-50`}
      >
        {children}
      </body>
    </html>
  );
}

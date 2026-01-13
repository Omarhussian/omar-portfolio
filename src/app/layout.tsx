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

const siteUrl = process.env.NEXT_PUBLIC_URL || "https://omarhussain.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Omar Hussain | Senior Front-End Engineer",
    template: "%s | Omar Hussain",
  },
  description:
    "Senior Front-End Engineer specializing in High-Scale Fintech & Travel UI. Expert in React, Next.js, and TypeScript. Based in Cairo.",
  keywords: [
    "React",
    "Next.js",
    "Front-End Engineer",
    "Fintech",
    "Dashboard",
    "TypeScript",
    "Cairo",
    "Senior Developer",
    "UI/UX",
    "Web Development",
    "JavaScript",
    "Portfolio",
  ],
  authors: [{ name: "Omar Hussain", url: siteUrl }],
  creator: "Omar Hussain",
  publisher: "Omar Hussain",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Omar Hussain Portfolio",
    title: "Omar Hussain - Senior Front-End Engineer",
    description:
      "View my portfolio featuring high-performance React/Next.js projects in Fintech and AI.",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Omar Hussain - Senior Front-End Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Omar Hussain - Senior Front-End Engineer",
    description:
      "View my portfolio featuring high-performance React/Next.js projects in Fintech and AI.",
    images: [`${siteUrl}/og-image.png`],
    creator: "@omarhussain",
  },
  verification: {
    google: "", // Add your Google Search Console verification code
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
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

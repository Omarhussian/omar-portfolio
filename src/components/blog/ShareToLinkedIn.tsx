"use client";

import { Linkedin } from "lucide-react";

interface ShareToLinkedInProps {
  url: string;
  title: string;
}

export default function ShareToLinkedIn({ url, title }: ShareToLinkedInProps) {
  const handleShare = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url
    )}`;
    window.open(linkedInUrl, "_blank", "width=600,height=600");
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#0A66C2] hover:bg-[#004182] text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105"
    >
      <Linkedin className="w-5 h-5" />
      <span>Share on LinkedIn</span>
    </button>
  );
}

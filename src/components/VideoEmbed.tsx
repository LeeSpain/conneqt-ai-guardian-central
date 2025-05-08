
import React, { useState } from 'react';
import { X } from 'lucide-react';

interface VideoEmbedProps {
  videoId: string;
  width?: number;
  height?: number;
}

const VideoEmbed = ({
  videoId,
  width = 320,
  height = 180
}: VideoEmbedProps) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 right-4 z-50 shadow-lg rounded-lg overflow-hidden border border-conneqt-blue">
      <div className="bg-conneqt-navy p-1 flex justify-between items-center">
        <span className="text-xs text-white font-medium px-2">Conneqt Video</span>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-white hover:text-gray-300 p-1 transition-colors"
          aria-label="Close video"
        >
          <X size={14} />
        </button>
      </div>
      <iframe
        width={width}
        height={height}
        src={`https://www.youtube.com/embed/${videoId}`}
        title="Conneqt Video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoEmbed;

"use client";

import React, { useState } from 'react';

const WhatsappBubble = () => {
  const [showBubble, setShowBubble] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 flex items-end gap-2 z-[999]">
      {showBubble && (
        <div className="bg-white text-gray-800 px-4 py-2 rounded-lg shadow-md relative max-w-xs">
          <div className="absolute -right-2 bottom-3 w-4 h-4 bg-white transform rotate-45"></div>
          🤖 Chat With Our AI Assistant <br className="my-1" /> On WhatsApp
          <button
            onClick={() => setShowBubble(false)}
            className="absolute -top-2 -right-2 bg-gray-200 rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-gray-300"
          >
            ×
          </button>
        </div>
      )}
      <a
        href="https://wa.me/17159146778"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 rounded-full p-4 shadow-lg hover:bg-green-600 transition-colors duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      </a>
    </div>
  );
};

export default WhatsappBubble;

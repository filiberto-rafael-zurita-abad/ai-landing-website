'use client';

import { useState } from 'react';

interface MessageInputProps {
  onMessageSubmit: (message: string) => void;
  isLoading: boolean;
}

export default function MessageInput({ onMessageSubmit, isLoading }: MessageInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onMessageSubmit(message);
      setMessage('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="text-lg font-semibold mb-3">Customer Message</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Paste the customer's message here..."
            rows={3}
            maxLength={500}
            disabled={isLoading}
          />
          <div className="absolute bottom-2 right-2 text-xs text-gray-500">
            {message.length}/500
          </div>
        </div>
        <button
          type="submit"
          disabled={!message.trim() || isLoading}
          className={`w-full py-2 px-4 rounded-md transition-colors ${
            !message.trim() || isLoading
              ? 'bg-gray-300 cursor-not-allowed text-gray-500'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {isLoading ? 'Processing...' : 'Generate Response'}
        </button>
      </form>
    </div>
  );
}

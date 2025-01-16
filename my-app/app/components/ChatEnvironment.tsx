"use client";
import React, { useState } from 'react';

const ChatEnvironment = () => {
  const [messages, setMessages] = useState<Array<{ text: string; sender: string }>>([]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim() !== '') {
      setMessages([...messages, { text: input, sender: 'user' }]);
      // Here will be the Gemini API call
      fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      })
      .then(response => response.json())
      .then(data => {
        setMessages([...messages, { text: input, sender: 'user' }, { text: data.response, sender: 'bot' }]);
      })
      .catch(error => {
        console.error('Error calling Gemini API:', error);
      });
      setInput('');
    }
  };

  return (
    <div className="flex h-full flex-col md:flex-row">
      <div className="flex-1 p-4">
        <div className="h-[60vh] overflow-y-auto border rounded p-2 flex flex-col">
          <div className="flex-1">
            {messages.map((message, index) => (
              <div key={index} className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block p-2 rounded ${message.sender === 'user' ? 'bg-blue-200' : 'bg-gray-200'}`}>
                  {message.text}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-2 relative">
            <div className="flex items-center rounded-full border p-1 pl-12 pr-16">
              <button 
                className="absolute left-3 p-2 text-gray-500 hover:text-gray-700"
                onClick={() => document.getElementById('file-input')?.click()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                <input 
                  type="file" 
                  id="file-input" 
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      // Handle file upload
                    }
                  }}
                />
              </button>
              <input
                type="text"
                className="flex-1 bg-transparent outline-none px-2"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
              />
              <div className="absolute right-3 flex space-x-2">
                <button 
                  className="p-2 text-gray-500 hover:text-gray-700"
                  onClick={handleSendMessage}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
                <button 
                  className="p-2 text-gray-500 hover:text-gray-700"
                  onClick={() => {
                    // Handle microphone click
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/4 p-4 border-l">
        <h3 className="text-lg font-semibold mb-4">Personality Tweaks</h3>
        {/* Add personality tweak controls here */}
      </div>
    </div>
  );
};

export default ChatEnvironment;

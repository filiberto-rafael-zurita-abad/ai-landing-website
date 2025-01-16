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
          <div className="mt-2 flex">
            <input
              type="text"
              className="flex-1 border rounded p-2 mr-2"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="bg-blue-500 text-white rounded p-2" onClick={handleSendMessage}>Send</button>
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

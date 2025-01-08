'use client';

import { useState } from 'react';

export default function MessagePrettifier() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [style, setStyle] = useState('professional');

  const prettifyText = () => {
    let prettified = inputText;
    
    switch (style) {
      case 'professional':
        // Add professional formatting
        prettified = prettified.replace(/^\w/, c => c.toUpperCase()); // Capitalize first letter
        prettified = prettified.replace(/\bi\b/g, 'I'); // Capitalize 'i'
        prettified = prettified.replace(/([.!?]\s+)(\w)/g, (_, p1, p2) => p1 + p2.toUpperCase()); // Capitalize after periods
        break;
      case 'casual':
        // Add casual formatting
        prettified = prettified.toLowerCase();
        prettified = prettified.replace(/\b\w/, c => c.toUpperCase()); // Only capitalize first word
        break;
      case 'formal':
        // Add formal formatting
        prettified = prettified.replace(/^\w|\.\s+\w/g, letter => letter.toUpperCase());
        prettified = prettified.replace(/\bi\b/g, 'I');
        prettified = prettified + (prettified.endsWith('.') ? '' : '.');
        break;
    }

    setOutputText(prettified);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Message Prettifier</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Style
          </label>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="professional">Professional</option>
            <option value="casual">Casual</option>
            <option value="formal">Formal</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Input Text
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            rows={4}
            placeholder="Enter your text here..."
          />
        </div>

        <button
          onClick={prettifyText}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Prettify Message
        </button>

        {outputText && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prettified Text
            </label>
            <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
              {outputText}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

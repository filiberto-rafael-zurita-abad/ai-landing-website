'use client';

import { useState, useEffect } from 'react';

interface CustomPromptEditorProps {
  prompt: string;
  onPromptChange: (prompt: string) => void;
  onSave: (prompt: string) => void;
  isLoading?: boolean;
}

export default function CustomPromptEditor({ 
  prompt, 
  onPromptChange,
  onSave,
  isLoading = false 
}: CustomPromptEditorProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localPrompt, setLocalPrompt] = useState(prompt);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setLocalPrompt(prompt);
    setIsDirty(false);
  }, [prompt]);

  const handlePromptChange = (newPrompt: string) => {
    setLocalPrompt(newPrompt);
    setIsDirty(newPrompt !== prompt);
  };

  const handleSave = () => {
    onPromptChange(localPrompt);
    onSave(localPrompt);
    setIsDirty(false);
  };

  const handleReset = () => {
    const defaultPrompt = `You are an AI sales assistant helping with customer inquiries. Your responses should be:
- Professional and courteous
- Clear and concise
- Focused on addressing the customer's needs
- Aimed at moving the conversation forward
- Natural and conversational in tone`;
    
    setLocalPrompt(defaultPrompt);
    setIsDirty(defaultPrompt !== prompt);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">AI Assistant Prompt</h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          {isExpanded ? 'Collapse' : 'Expand'}
        </button>
      </div>

      {isExpanded ? (
        <>
          <textarea
            value={localPrompt}
            onChange={(e) => handlePromptChange(e.target.value)}
            placeholder="Enter custom instructions for the AI assistant..."
            className="w-full h-48 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            disabled={isLoading}
          />
          <div className="mt-3 flex justify-between items-center">
            <div className="flex space-x-4">
              <button
                onClick={handleReset}
                className="text-sm text-gray-600 hover:text-gray-800"
                disabled={isLoading}
              >
                Reset to Default
              </button>
              <button
                onClick={handleSave}
                disabled={!isDirty || isLoading}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  isDirty && !isLoading
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                Save Changes
              </button>
            </div>
            <span className="text-sm text-gray-500">
              {localPrompt.length} characters
            </span>
          </div>
        </>
      ) : (
        <p className="text-sm text-gray-600">
          Customize how the AI assistant understands and responds to customer messages.
          {isDirty && (
            <span className="ml-2 text-yellow-600">
              (Unsaved changes)
            </span>
          )}
        </p>
      )}
    </div>
  );
}

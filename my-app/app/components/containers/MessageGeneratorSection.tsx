'use client';

import { useState } from 'react';
import MessageInput from '../MessageInput';
import ResponseSettings from '../ResponseSettings';
import GeneratedResponse from '../GeneratedResponse';
import CustomPromptEditor from '../CustomPromptEditor';

interface ResponseSettings {
  salesTopic: string;
  tone: 'professional' | 'friendly' | 'casual';
  objective: 'inform' | 'persuade' | 'close';
}

const initialSettings: ResponseSettings = {
  salesTopic: '',
  tone: 'professional',
  objective: 'inform'
};

const defaultPrompt = `You are an AI sales assistant helping with customer inquiries. Your responses should be:
- Professional and courteous
- Clear and concise
- Focused on addressing the customer's needs
- Aimed at moving the conversation forward
- Natural and conversational in tone`;

export default function MessageGeneratorSection() {
  const [settings, setSettings] = useState<ResponseSettings>(initialSettings);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResponse, setGeneratedResponse] = useState('');
  const [customPrompt, setCustomPrompt] = useState(defaultPrompt);
  const [savedPrompt, setSavedPrompt] = useState(defaultPrompt);

  const handleMessageSubmit = async (message: string) => {
    if (!settings.salesTopic) {
      alert('Please enter a sales topic');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          settings,
          prompt: savedPrompt,
        }),
        credentials: 'include', // Important for auth
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate response');
      }

      const data = await response.json();
      setGeneratedResponse(data.response);
    } catch (error: any) {
      console.error('Error:', error);
      alert(error.message || 'Failed to generate response. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerate = () => {
    handleMessageSubmit(generatedResponse);
  };

  const handleSavePrompt = (prompt: string) => {
    setSavedPrompt(prompt);
    // Here you might want to save the prompt to a database or localStorage
  };

  return (
    <div className="space-y-6">
      {/* Message Generator Section */}
      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Message Generator</h2>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column - Input and Settings */}
            <div className="lg:col-span-5 space-y-6">
              <MessageInput 
                onMessageSubmit={handleMessageSubmit}
                isLoading={isGenerating}
              />
              <ResponseSettings
                settings={settings}
                onSettingsChange={setSettings}
                isLoading={isGenerating}
              />
            </div>

            {/* Right Column - Response Display */}
            <div className="lg:col-span-7">
              <div className="sticky top-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h2 className="text-lg font-semibold mb-4">Response Preview</h2>
                  {!generatedResponse && !isGenerating ? (
                    <div className="text-center text-gray-500 py-8">
                      <p>Your AI-generated response will appear here</p>
                      <p className="text-sm mt-2">Enter a customer message and settings to get started</p>
                    </div>
                  ) : (
                    <GeneratedResponse
                      response={generatedResponse}
                      onRegenerateClick={handleRegenerate}
                      isLoading={isGenerating}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Prompt Editor Section */}
      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">AI Assistant Configuration</h2>
          <CustomPromptEditor
            prompt={customPrompt}
            onPromptChange={setCustomPrompt}
            onSave={handleSavePrompt}
            isLoading={isGenerating}
          />
        </div>
      </div>
    </div>
  );
}

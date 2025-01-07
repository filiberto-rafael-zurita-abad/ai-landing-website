'use client';

import { useState } from 'react';
import MessageInput from '../MessageInput';
import ResponseSettings from '../ResponseSettings';
import GeneratedResponse from '../GeneratedResponse';

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

export default function MessageGeneratorSection() {
  const [settings, setSettings] = useState<ResponseSettings>(initialSettings);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResponse, setGeneratedResponse] = useState('');

  const handleMessageSubmit = async (message: string) => {
    if (!settings.salesTopic) {
      alert('Please enter a sales topic');
      return;
    }

    setIsGenerating(true);
    // API call will be implemented later
    // Simulating AI response for now
    setTimeout(() => {
      setGeneratedResponse("Hi! Thanks for your interest. Our basic plan starts at $29/mo and includes all core features. Would you like me to set up a quick demo call?");
      setIsGenerating(false);
    }, 1000);
  };

  const handleRegenerate = () => {
    handleMessageSubmit(generatedResponse);
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="p-6">
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
  );
}

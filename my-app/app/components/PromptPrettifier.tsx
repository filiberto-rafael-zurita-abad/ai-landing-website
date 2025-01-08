'use client';

import { useState } from 'react';

type PromptTemplate = {
  name: string;
  template: string;
  description: string;
};

const defaultTemplates: PromptTemplate[] = [
  {
    name: 'SMART Goals',
    template: 'Create a SMART goal for: {input}\n\nSpecific: \nMeasurable: \nAchievable: \nRelevant: \nTime-bound: ',
    description: 'Transform your goal into a SMART format'
  },
  {
    name: 'Creative Writing',
    template: 'Write a creative story about {input} considering:\n\nSetting:\nCharacters:\nConflict:\nResolution:',
    description: 'Structure a creative writing prompt'
  },
  {
    name: 'Problem Solving',
    template: 'Analyze this problem: {input}\n\nContext:\nRoot Cause:\nPossible Solutions:\nRecommended Action:',
    description: 'Break down a problem into analyzable components'
  },
  {
    name: 'Product Description',
    template: 'Create a product description for {input}:\n\nKey Features:\nBenefits:\nTarget Audience:\nValue Proposition:',
    description: 'Structure a product description'
  }
];

export default function PromptPrettifier() {
  const [input, setInput] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate>(defaultTemplates[0]);
  const [output, setOutput] = useState('');
  const [customTemplate, setCustomTemplate] = useState('');
  const [isCustom, setIsCustom] = useState(false);

  const formatPrompt = () => {
    const templateToUse = isCustom ? customTemplate : selectedTemplate.template;
    const formatted = templateToUse.replace('{input}', input);
    setOutput(formatted);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Prompt Prettifier</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Template Type
          </label>
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setIsCustom(false)}
              className={`px-4 py-2 rounded-md ${
                !isCustom 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              Use Preset
            </button>
            <button
              onClick={() => setIsCustom(true)}
              className={`px-4 py-2 rounded-md ${
                isCustom 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              Custom Template
            </button>
          </div>
        </div>

        {!isCustom && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Template
            </label>
            <select
              value={selectedTemplate.name}
              onChange={(e) => {
                const template = defaultTemplates.find(t => t.name === e.target.value);
                if (template) setSelectedTemplate(template);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {defaultTemplates.map(template => (
                <option key={template.name} value={template.name}>
                  {template.name} - {template.description}
                </option>
              ))}
            </select>
          </div>
        )}

        {isCustom && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Custom Template (use {'{input}'} for placeholder)
            </label>
            <textarea
              value={customTemplate}
              onChange={(e) => setCustomTemplate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              placeholder="Enter your custom template here. Use {input} where you want your input to appear."
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Input
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            rows={4}
            placeholder="Enter your text here..."
          />
        </div>

        <button
          onClick={formatPrompt}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Format Prompt
        </button>

        {output && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Formatted Prompt
            </label>
            <div className="relative">
              <textarea
                value={output}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                rows={8}
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(output);
                  alert('Copied to clipboard!');
                }}
                className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700"
                title="Copy to clipboard"
              >
                📋
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

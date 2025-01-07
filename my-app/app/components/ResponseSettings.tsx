'use client';

interface ResponseSettings {
  salesTopic: string;
  tone: 'professional' | 'friendly' | 'casual';
  objective: 'inform' | 'persuade' | 'close';
}

interface ResponseSettingsProps {
  settings: ResponseSettings;
  onSettingsChange: (settings: ResponseSettings) => void;
  isLoading: boolean;
}

export default function ResponseSettings({ settings, onSettingsChange, isLoading }: ResponseSettingsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="text-lg font-semibold mb-3">Response Settings</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sales Topic
          </label>
          <input
            type="text"
            value={settings.salesTopic}
            onChange={(e) => onSettingsChange({ ...settings, salesTopic: e.target.value })}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Product Demo, Pricing, Support"
            disabled={isLoading}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tone
            </label>
            <select
              value={settings.tone}
              onChange={(e) => onSettingsChange({ ...settings, tone: e.target.value as ResponseSettings['tone'] })}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              disabled={isLoading}
            >
              <option value="professional">Professional</option>
              <option value="friendly">Friendly</option>
              <option value="casual">Casual</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Objective
            </label>
            <select
              value={settings.objective}
              onChange={(e) => onSettingsChange({ ...settings, objective: e.target.value as ResponseSettings['objective'] })}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              disabled={isLoading}
            >
              <option value="inform">Inform</option>
              <option value="persuade">Persuade</option>
              <option value="close">Close Sale</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

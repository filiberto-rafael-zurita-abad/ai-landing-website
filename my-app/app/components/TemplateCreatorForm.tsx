'use client';

import { useState, useEffect } from 'react';
import { useTemplates, Template } from '../contexts/TemplateContext';

interface TemplateData {
  title: string;
  message: string;
}

interface TemplateCreatorFormProps {
  editingTemplate: Template | null;
  onFinishEdit: () => void;
}

export default function TemplateCreatorForm({ editingTemplate, onFinishEdit }: TemplateCreatorFormProps) {
  const { addTemplate, updateTemplate } = useTemplates();
  const [templateData, setTemplateData] = useState<TemplateData>({
    title: '',
    message: ''
  });

  useEffect(() => {
    if (editingTemplate) {
      setTemplateData({
        title: editingTemplate.title,
        message: editingTemplate.message
      });
    } else {
      setTemplateData({
        title: '',
        message: ''
      });
    }
  }, [editingTemplate]);

  const handleSubmit = async () => {
    if (!templateData.title || !templateData.message) {
      alert('Please fill in both title and message');
      return;
    }

    if (editingTemplate) {
      await updateTemplate({
        ...editingTemplate,
        title: templateData.title,
        message: templateData.message
      });
      onFinishEdit();
    } else {
      await addTemplate(templateData.title, templateData.message);
    }
    
    setTemplateData({ title: '', message: '' });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          value={templateData.title}
          onChange={(e) => setTemplateData({ ...templateData, title: e.target.value })}
          className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter template title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Message
        </label>
        <textarea
          value={templateData.message}
          onChange={(e) => setTemplateData({ ...templateData, message: e.target.value })}
          className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 min-h-[100px] resize-y"
          placeholder="Enter your message"
        />
      </div>

      <div className="flex gap-2">
        <button
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          onClick={handleSubmit}
        >
          {editingTemplate ? 'Save Changes' : 'Create'}
        </button>
        {editingTemplate && (
          <button
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            onClick={() => {
              setTemplateData({ title: '', message: '' });
              onFinishEdit();
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

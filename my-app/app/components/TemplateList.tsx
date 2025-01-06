'use client';

import { useTemplates, Template } from '../contexts/TemplateContext';

interface TemplateListProps {
  onEdit: (template: Template) => void;
}

export default function TemplateList({ onEdit }: TemplateListProps) {
  const { templates, deleteTemplate, loading } = useTemplates();

  if (loading) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Available Templates</h2>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border rounded-lg p-4">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Available Templates</h2>
      <div className="space-y-4">
        {templates.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No templates available</p>
        ) : (
          templates.map((template) => (
            <div
              key={template.id}
              className="border rounded-lg p-4 hover:border-blue-500 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-900">{template.title}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(template)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit template"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => deleteTemplate(template.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete template"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
              <p className="text-gray-600 text-sm">{template.message}</p>
              <div className="mt-2 text-xs text-gray-500">
                Created: {new Date(template.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface Template {
  id: string;
  title: string;
  message: string;
  createdAt: string;
}

interface TemplateContextType {
  templates: Template[];
  addTemplate: (title: string, message: string) => Promise<void>;
  deleteTemplate: (id: string) => Promise<void>;
  updateTemplate: (template: Template) => Promise<void>;
  loading: boolean;
}

const TemplateContext = createContext<TemplateContextType | undefined>(undefined);

export function TemplateProvider({ children }: { children: ReactNode }) {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await fetch('/api/templates');
      const data = await response.json();
      setTemplates(data.templates);
    } catch (error) {
      console.error('Error fetching templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTemplate = async (title: string, message: string) => {
    try {
      const response = await fetch('/api/templates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, message }),
      });
      const newTemplate = await response.json();
      setTemplates([...templates, newTemplate]);
    } catch (error) {
      console.error('Error adding template:', error);
    }
  };

  const deleteTemplate = async (id: string) => {
    try {
      await fetch('/api/templates', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      setTemplates(templates.filter(template => template.id !== id));
    } catch (error) {
      console.error('Error deleting template:', error);
    }
  };

  const updateTemplate = async (template: Template) => {
    try {
      const response = await fetch('/api/templates', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(template),
      });
      const updatedTemplate = await response.json();
      setTemplates(templates.map(t => t.id === template.id ? updatedTemplate : t));
    } catch (error) {
      console.error('Error updating template:', error);
    }
  };

  return (
    <TemplateContext.Provider value={{ templates, addTemplate, deleteTemplate, updateTemplate, loading }}>
      {children}
    </TemplateContext.Provider>
  );
}

export function useTemplates() {
  const context = useContext(TemplateContext);
  if (context === undefined) {
    throw new Error('useTemplates must be used within a TemplateProvider');
  }
  return context;
}

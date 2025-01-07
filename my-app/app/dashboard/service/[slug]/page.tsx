'use client';
// this is the page i am looking for... 
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { services } from '../../../components/ServiceGrid';
import EmailForm from '../../../components/EmailForm';
import ReminderForm from '../../../components/ReminderForm';
import ReminderList from '../../../components/ReminderList';
import { ReminderProvider } from '../../../contexts/ReminderContext';
import TemplateCreatorForm from '../../../components/TemplateCreatorForm';
import TemplateList from '../../../components/TemplateList';
import { TemplateProvider, Template } from '../../../contexts/TemplateContext';
import { useState } from 'react';
import MessageGeneratorSection from '../../../components/containers/MessageGeneratorSection';

export default function ServicePage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  // Find the service that matches the slug
  const service = services.find(s => s.slug === slug);

  if (!service) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-900">Service not found</h1>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <button
          onClick={() => router.back()}
          className="mb-6 text-blue-600 hover:text-blue-800 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Dashboard
        </button>
        
        <h1 className="text-2xl font-semibold text-gray-900">{service.title}</h1>
      </div>
      
      {slug === 'reminder-tool' && (
        <ReminderProvider>
          <div className="container mx-auto px-8">
            <div className="grid grid-cols-1 gap-8">
              <ReminderForm />
              <ReminderList />
            </div>
          </div>
        </ReminderProvider>
      )}

      {slug === 'template-sender' && (
        <TemplateProvider>
          <TemplateSection />
        </TemplateProvider>
      )}

      {slug === 'message-generator' && (
        <MessageGeneratorSection />
      )}
    </div>
  );
}

function TemplateSection() {
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Email Sender</h2>
          <EmailForm />
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingTemplate ? 'Edit Template' : 'Template Creator'}
          </h2>
          <TemplateCreatorForm
            editingTemplate={editingTemplate}
            onFinishEdit={() => setEditingTemplate(null)}
          />
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <TemplateList onEdit={setEditingTemplate} />
      </div>
    </div>
  );
}

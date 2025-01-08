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
import MessagePrettifier from '../../../components/MessagePrettifier';
import SymptomsAnalyzer from '../../../components/SymptomsAnalyzer';
import WebsitesMarketplace from '../../../components/WebsitesMarketplace';
import PromptPrettifier from '../../../components/PromptPrettifier';
import EmailFormContainer from '../../../components/containers/EmailFormContainer';
import TemplateCreatorContainer from '../../../components/containers/TemplateCreatorContainer';
import TemplateListContainer from '../../../components/containers/TemplateListContainer';
import TemplateSenderSection from '../../../components/containers/TemplateSenderSection';

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ReminderList />
              <ReminderForm />
            </div>
          </div>
        </ReminderProvider>
      )}

      {slug === 'template-sender' && (
        <TemplateProvider>
          <TemplateSenderSection />
        </TemplateProvider>
      )}

      {slug === 'message-generator' && (
        <MessageGeneratorSection />
      )}

      {slug === 'message-prettifier' && (
        <MessagePrettifier />
      )}

      {slug === 'symptoms-analyzer' && (
        <SymptomsAnalyzer />
      )}

      {slug === 'websites-marketplace' && (
        <WebsitesMarketplace />
      )}

      {slug === 'prompt-prettifier' && (
        <PromptPrettifier />
      )}
    </div>
  );
}

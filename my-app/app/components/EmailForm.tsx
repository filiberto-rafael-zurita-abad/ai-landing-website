'use client';

import { useState, useRef } from 'react';
import { useTemplates } from '../contexts/TemplateContext';
import { useUser } from '@clerk/nextjs';

interface EmailFormData {
  recipientEmail: string;
  subject: string;
  templateType: string;
  date: string;
  time: string;
}

const formatDate = (date: string) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const formatTime = (time: string) => {
  if (!time) return '';
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
};

const initialFormData: EmailFormData = {
  recipientEmail: '',
  subject: '',
  templateType: '',
  date: '',
  time: ''
};

export default function EmailForm() {
  const dateInputRef = useRef<HTMLInputElement>(null);
  const timeInputRef = useRef<HTMLInputElement>(null);
  const { templates } = useTemplates();
  const { user } = useUser();
  const [emailData, setEmailData] = useState<EmailFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid = () => {
    return (
      emailData.recipientEmail.trim() !== '' &&
      emailData.templateType !== '' &&
      emailData.date !== '' &&
      emailData.time !== ''
    );
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      alert('Please fill in all required fields');
      return;
    }

    if (!user?.emailAddresses?.[0]?.emailAddress) {
      alert('User email not found. Please make sure you are logged in.');
      return;
    }

    setIsSubmitting(true);
    try {
      const selectedTemplate = templates.find(t => t.id === emailData.templateType);
      if (!selectedTemplate) {
        throw new Error('Template not found');
      }

      const scheduleData = {
        ...emailData,
        templateMessage: selectedTemplate.message,
        userEmail: user.emailAddresses[0].emailAddress
      };

      console.log('Sending schedule data:', scheduleData);

      const response = await fetch('/api/schedules', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(scheduleData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server response:', errorData);
        throw new Error(errorData.error || 'Failed to schedule email');
      }

      const result = await response.json();
      console.log('Success response:', result);

      setEmailData(initialFormData);
      alert('Email scheduled successfully!');
    } catch (error) {
      console.error('Error scheduling email:', error);
      alert('Failed to schedule email. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Recipient Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          value={emailData.recipientEmail}
          onChange={(e) => setEmailData({ ...emailData, recipientEmail: e.target.value })}
          className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter recipient's email"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Subject
        </label>
        <input
          type="text"
          value={emailData.subject}
          onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
          className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter email subject"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Template Type <span className="text-red-500">*</span>
        </label>
        <select
          value={emailData.templateType}
          onChange={(e) => setEmailData({ ...emailData, templateType: e.target.value })}
          className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
          required
        >
          <option value="" disabled>-Select a Template-</option>
          {templates.map((template) => (
            <option key={template.id} value={template.id}>
              {template.title}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date <span className="text-red-500">*</span>
          </label>
          <div 
            className="relative"
            onClick={() => dateInputRef.current?.showPicker()}
          >
            <input
              ref={dateInputRef}
              type="date"
              value={emailData.date}
              onChange={(e) => setEmailData({ ...emailData, date: e.target.value })}
              className="sr-only"
              required
            />
            <div className="w-full px-3 py-2 text-sm border rounded-md shadow-sm cursor-pointer hover:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white flex items-center justify-between">
              <span className="text-gray-700">
                {emailData.date ? formatDate(emailData.date) : 'Select date'}
              </span>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Time <span className="text-red-500">*</span>
          </label>
          <div 
            className="relative"
            onClick={() => timeInputRef.current?.showPicker()}
          >
            <input
              ref={timeInputRef}
              type="time"
              value={emailData.time}
              onChange={(e) => setEmailData({ ...emailData, time: e.target.value })}
              className="sr-only"
              required
            />
            <div className="w-full px-3 py-2 text-sm border rounded-md shadow-sm cursor-pointer hover:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white flex items-center justify-between">
              <span className="text-gray-700">
                {emailData.time ? formatTime(emailData.time) : 'Select time'}
              </span>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <button
        className={`w-full py-2 px-4 rounded-md transition-colors ${
          isFormValid() && !isSubmitting
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
        onClick={handleSubmit}
        disabled={!isFormValid() || isSubmitting}
      >
        {isSubmitting ? 'Scheduling...' : 'Schedule Email'}
      </button>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useTemplates } from '../contexts/TemplateContext';
import { useUser } from '@clerk/nextjs';

interface EmailFormData {
  recipientEmail: string;
  subject: string;
  templateType: string;
}

const initialFormData: EmailFormData = {
  recipientEmail: '',
  subject: '',
  templateType: ''
};

export default function EmailForm() {
  const { templates } = useTemplates();
  const { user } = useUser();
  const [emailData, setEmailData] = useState<EmailFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid = () => {
    return (
      emailData.recipientEmail.trim() !== '' &&
      emailData.templateType !== ''
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

      // Send the email
      const emailResponse = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipientEmail: emailData.recipientEmail,
          subject: emailData.subject || 'New Message',
          templateMessage: selectedTemplate.message,
        }),
      });

      if (!emailResponse.ok) {
        const error = await emailResponse.json();
        throw new Error(error.message || 'Failed to send email');
      }

      setEmailData(initialFormData);
      alert('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email. Please try again.');
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

      <button
        className={`w-full py-2 px-4 rounded-md transition-colors ${
          isFormValid() && !isSubmitting
            ? 'bg-blue-500 hover:bg-blue-600 text-white'
            : 'bg-gray-300 cursor-not-allowed text-gray-500'
        }`}
        onClick={handleSubmit}
        disabled={!isFormValid() || isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Send Email'}
      </button>
    </div>
  );
}

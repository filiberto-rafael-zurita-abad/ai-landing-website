'use client';

import { useState, useRef } from 'react';
import { useReminders } from '../contexts/ReminderContext';

interface FormData {
  date: string;
  time: string;
  note: string;
  repeat: boolean;
  repeatDays: boolean[];
  attachments: File[];
}

const initialFormState: FormData = {
  date: '',
  time: '',
  note: '',
  repeat: false,
  repeatDays: Array(7).fill(false),
  attachments: []
};

const DAYS = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'];

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

export default function ReminderForm() {
  const [formData, setFormData] = useState<FormData>(initialFormState);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const timeInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addReminder } = useReminders();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.date || !formData.time) {
      alert('Please select both date and time');
      return;
    }

    await addReminder({
      date: formData.date,
      time: formData.time,
      note: formData.note,
      repeat: formData.repeat,
      repeatDays: formData.repeat ? formData.repeatDays : undefined,
      attachments: formData.attachments.length > 0 ? formData.attachments : undefined
    });

    setFormData(initialFormState);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (formData.attachments.length + files.length > 2) {
      alert('Maximum 2 attachments allowed');
      return;
    }
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files].slice(0, 2)
    }));
  };

  const removeAttachment = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const toggleDay = (index: number) => {
    const newRepeatDays = [...formData.repeatDays];
    newRepeatDays[index] = !newRepeatDays[index];
    setFormData(prev => ({
      ...prev,
      repeatDays: newRepeatDays
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 w-full">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Add New Reminder</h3>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <div 
              className="mt-1 relative"
              onClick={() => dateInputRef.current?.showPicker()}
            >
              <input
                ref={dateInputRef}
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="sr-only"
              />
              <div className="w-full px-3 py-2 text-sm border rounded-md shadow-sm cursor-pointer hover:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white flex items-center justify-between">
                <span className="text-gray-700">
                  {formData.date ? formatDate(formData.date) : 'Select date'}
                </span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Time
            </label>
            <div 
              className="mt-1 relative"
              onClick={() => timeInputRef.current?.showPicker()}
            >
              <input
                ref={timeInputRef}
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="sr-only"
              />
              <div className="w-full px-3 py-2 text-sm border rounded-md shadow-sm cursor-pointer hover:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white flex items-center justify-between">
                <span className="text-gray-700">
                  {formData.time ? formatTime(formData.time) : 'Select time'}
                </span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="repeat"
                checked={formData.repeat}
                onChange={(e) => setFormData({ ...formData, repeat: e.target.checked })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="repeat" className="ml-2 text-sm text-gray-700">
                Repeat
              </label>
            </div>
            {formData.repeat && (
              <span className="text-xs text-gray-500">repeat on</span>
            )}
          </div>
          
          {formData.repeat && (
            <div className="flex justify-between gap-1">
              {DAYS.map((day, index) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(index)}
                  className={`px-2 py-1 text-xs font-medium rounded-md ${
                    formData.repeatDays[index]
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="note" className="block text-sm font-medium text-gray-700">
            Note
          </label>
          <textarea
            id="note"
            rows={3}
            value={formData.note}
            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
            placeholder="Enter your notes here..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Attachments ({formData.attachments.length}/2)
          </label>
          <div className="mt-1 space-y-2">
            {formData.attachments.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md">
                <div className="flex items-center space-x-2">
                  {file.type.startsWith('image/') ? (
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                    </svg>
                  )}
                  <span className="text-sm text-gray-600">{file.name}</span>
                </div>
                <button
                  type="button"
                  onClick={() => removeAttachment(index)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
            {formData.attachments.length < 2 && (
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*,.pdf,.doc,.docx"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg className="w-5 h-5 mr-2 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add attachment
                </button>
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full max-w-xs mx-auto block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Reminder
        </button>
      </form>
    </div>
  );
}

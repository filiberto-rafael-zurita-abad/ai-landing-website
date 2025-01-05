'use client';

import { useState, useRef } from 'react';
import { useReminders } from '../contexts/ReminderContext';

const DAYS = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'];

const initialFormState = {
  date: '',
  time: '',
  note: '',
  attachment: null as File | null,
  repeat: false,
  repeatDays: new Array(7).fill(false)
};

export default function SummaryForm() {
  const [formData, setFormData] = useState(initialFormState);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const timeInputRef = useRef<HTMLInputElement>(null);
  const { addReminder } = useReminders();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.date || !formData.time) {
      alert('Please select both date and time');
      return;
    }

    const reminder = {
      date: formData.date,
      time: formData.time,
      note: formData.note,
      repeat: formData.repeat,
      repeatDays: formData.repeat ? formData.repeatDays : undefined,
    };

    addReminder(reminder);
    setFormData(initialFormState);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, attachment: e.target.files[0] });
    }
  };

  const toggleDay = (index: number) => {
    const newRepeatDays = [...formData.repeatDays];
    newRepeatDays[index] = !newRepeatDays[index];
    setFormData({ ...formData, repeatDays: newRepeatDays });
  };

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

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 max-w-md mx-auto">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Add New Summary</h3>
      </div>
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
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
          <label htmlFor="attachment" className="block text-sm font-medium text-gray-700">
            Attachment
          </label>
          <input
            type="file"
            id="attachment"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-1.5 file:px-3
              file:rounded-md file:border-0
              file:text-sm file:font-medium
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Summary
          </button>
        </div>
      </form>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useReminders } from '../contexts/ReminderContext';
import DatePicker from 'react-datepicker';
import { Transition, Switch } from '@headlessui/react';
import toast from 'react-hot-toast';
import "react-datepicker/dist/react-datepicker.css";

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
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
  const { addReminder } = useReminders();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDateTime) {
      toast.error('Please select both date and time');
      return;
    }

    try {
      await addReminder({
        date: selectedDateTime.toISOString().split('T')[0],
        time: selectedDateTime.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
        note: formData.note,
        repeat: formData.repeat,
        repeatDays: formData.repeatDays,
        attachments: formData.attachments
      });

      toast.success('Reminder saved successfully!');
      setFormData(initialFormState);
      setSelectedDateTime(null);
    } catch (error) {
      toast.error('Failed to save reminder. Please try again.');
      console.error('Error saving reminder:', error);
    }
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
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 w-full">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">Add New Reminder</h3>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date & Time
            </label>
            <DatePicker
              selected={selectedDateTime}
              onChange={(date) => setSelectedDateTime(date)}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
              timeFormat="HH:mm"
              timeIntervals={15}
              placeholderText="Select date and time"
              className="w-full px-4 py-2.5 text-sm border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              calendarClassName="shadow-xl border-0"
              minDate={new Date()}
              minTime={
                selectedDateTime?.toDateString() === new Date().toDateString() 
                  ? new Date() 
                  : new Date(0, 0, 0, 0, 0)
              }
              maxTime={new Date(0, 0, 0, 23, 59)}

            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Switch.Group>
                <div className="flex items-center">
                  <Switch
                    checked={formData.repeat}
                    onChange={(checked) => setFormData({ ...formData, repeat: checked })}
                    className={`${
                      formData.repeat ? 'bg-blue-600' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                  >
                    <span
                      className={`${
                        formData.repeat ? 'translate-x-6' : 'translate-x-1'
                      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    />
                  </Switch>
                  <Switch.Label className="ml-3 text-sm text-gray-700">Repeat</Switch.Label>
                </div>
              </Switch.Group>
              {formData.repeat && (
                <span className="text-xs text-gray-500">repeat on</span>
              )}
            </div>
            
            <Transition
              show={formData.repeat}
              enter="transition-opacity duration-150"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="flex justify-between gap-1">
                {DAYS.map((day, index) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleDay(index)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                      formData.repeatDays[index]
                        ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-500 ring-opacity-50'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </Transition>
          </div>

          <div>
            <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-2">
              Note
            </label>
            <textarea
              id="note"
              rows={3}
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm resize-none"
              placeholder="Enter your notes here..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Attachments ({formData.attachments.length}/2)
            </label>
            <div className="space-y-3">
              {formData.attachments.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {file.type.startsWith('image/') ? (
                      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 4a2 2 0 012-2h4.586a2 2 0 011.707 1.707L6.414 9H9a2 2 0 018.485 1.4L14.5 6.646a2 2 0 01.303 1.646z" />
                      </svg>
                    )}
                    <span className="text-sm text-gray-600 font-medium">{file.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeAttachment(index)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
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
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                    accept="image/*,.pdf,.doc,.docx"
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-flex items-center px-4 py-2.5 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add attachment
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Add Reminder
        </button>
      </form>
    </div>
  );
}

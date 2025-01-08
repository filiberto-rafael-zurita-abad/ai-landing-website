'use client';

import Image from 'next/image';
import { useReminders } from '../contexts/ReminderContext';
import { toast } from 'react-hot-toast';

const DAYS = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'];

interface Reminder {
  id: string;
  date: string;
  time: string;
  note: string;
  repeat?: boolean;
  repeatDays?: boolean[];
  attachments?: {
    name: string;
    type: 'image' | 'pdf' | 'other';
    url: string;
  }[];
  createdAt: string;
  userEmail: string;
}

export default function ReminderList() {
  const { reminders, deleteReminder } = useReminders();

  const handleDelete = async (id: string) => {
    try {
      await deleteReminder(id);
      toast.success('Reminder deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete reminder. Please try again.');
      console.error('Error deleting reminder:', error);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatCreatedAt = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };

  if (reminders.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 w-full">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Your Reminders</h3>
        <p className="text-gray-500 text-sm">No reminders created yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 w-full">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Your Reminders</h3>
      </div>
      <div className="h-[400px] overflow-y-auto">
        <ul className="divide-y divide-gray-200">
          {reminders.map((reminder) => (
            <li key={reminder.id} className="p-4 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">
                      {formatDate(reminder.date)}
                    </span>
                    <span className="text-sm text-gray-500">
                      {reminder.time}
                    </span>
                    {reminder.repeat && (
                      <span className="text-xs text-gray-400">
                        (Repeats: {reminder.repeatDays?.map((day, i) => day ? DAYS[i] : '').filter(Boolean).join(', ')})
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{reminder.note}</p>
                  <div className="mt-1 text-xs text-gray-400">
                    <p>Created: {formatCreatedAt(reminder.createdAt)}</p>
                    <p>By: {reminder.userEmail}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(reminder.id)}
                  className="ml-4 text-red-600 hover:text-red-800"
                >
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

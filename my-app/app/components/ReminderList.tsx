'use client';

import Image from 'next/image';
import { useReminders } from '../contexts/ReminderContext';

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
}

export default function ReminderList() {
  const { reminders, deleteReminder } = useReminders();

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
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
                        repeat on
                      </span>
                    )}
                  </div>
                  {reminder.repeat && reminder.repeatDays && (
                    <div className="flex gap-1 mt-1">
                      {DAYS.map((day, index) => (
                        <span
                          key={day}
                          className={`text-xs px-1.5 py-0.5 rounded ${
                            reminder.repeatDays![index]
                              ? 'bg-blue-100 text-blue-700'
                              : 'text-gray-400'
                          }`}
                        >
                          {day}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="mt-1 text-sm text-gray-600 break-words whitespace-pre-wrap">{reminder.note}</p>
                  {reminder.attachments && reminder.attachments.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {reminder.attachments.map((attachment, index) => (
                        <div key={index} className="flex items-center space-x-1">
                          {attachment.type === 'image' ? (
                            <div className="relative w-8 h-8">
                              <Image
                                src={attachment.url}
                                alt="Attachment preview"
                                fill
                                className="object-cover rounded"
                              />
                            </div>
                          ) : (
                            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                            </svg>
                          )}
                          <span className="text-xs text-gray-500">{attachment.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => deleteReminder(reminder.id)}
                  className="ml-4 text-gray-400 hover:text-red-500 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-full p-1"
                >
                  <svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                    />
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

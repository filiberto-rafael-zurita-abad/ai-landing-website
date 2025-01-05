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
    path: string;
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
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Your Reminders</h3>
        <p className="text-gray-500 text-sm">No reminders created yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Your Reminders</h3>
      </div>
      <ul className="divide-y divide-gray-200">
        {reminders.map((reminder) => (
          <li key={reminder.id} className="p-4 hover:bg-gray-50">
            <div className="flex justify-between items-start">
              <div className="flex-1">
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
                <p className="mt-1 text-sm text-gray-600">{reminder.note}</p>
                {reminder.attachments && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {reminder.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center space-x-1">
                        {attachment.type === 'image' ? (
                          <div className="relative w-8 h-8">
                            <Image
                              src={attachment.path}
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
                className="ml-4 text-gray-400 hover:text-gray-500"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

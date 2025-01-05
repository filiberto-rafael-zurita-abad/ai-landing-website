'use client';

import React, { createContext, useContext, useState } from 'react';

export interface Reminder {
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

interface ReminderContextType {
  reminders: Reminder[];
  addReminder: (reminder: Omit<Reminder, 'id'>) => void;
  deleteReminder: (id: string) => void;
}

const ReminderContext = createContext<ReminderContextType | undefined>(undefined);

export function ReminderProvider({ children }: { children: React.ReactNode }) {
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      date: '2025-01-05',
      time: '09:30',
      note: 'Review quarterly sales report',
      repeat: true,
      repeatDays: [true, true, false, true, false, true, false],
      attachments: [
        {
          name: 'image_example1.png',
          type: 'image',
          path: '/image_example1.png'
        },
        {
          name: 'attachment_example.pdf',
          type: 'pdf',
          path: '/attachment_example.pdf'
        }
      ]
    },
    {
      id: '2',
      date: '2025-01-06',
      time: '14:00',
      note: 'Team meeting - Project updates',
      repeat: false,
      repeatDays: [false, false, false, false, false, false, false],
    }
  ]);

  const addReminder = (reminder: Omit<Reminder, 'id'>) => {
    const newReminder = {
      ...reminder,
      id: Date.now().toString(),
    };
    setReminders(prev => [...prev, newReminder]);
  };

  const deleteReminder = (id: string) => {
    setReminders(prev => prev.filter(reminder => reminder.id !== id));
  };

  return (
    <ReminderContext.Provider value={{ reminders, addReminder, deleteReminder }}>
      {children}
    </ReminderContext.Provider>
  );
}

export function useReminders() {
  const context = useContext(ReminderContext);
  if (context === undefined) {
    throw new Error('useReminders must be used within a ReminderProvider');
  }
  return context;
}

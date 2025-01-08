'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { getStoredReminders, storeReminders, StoredReminder } from '../utils/reminderStorage';

export interface Attachment {
  name: string;
  type: string;
  url: string;
}

export interface Reminder {
  id: string;
  date: string;
  time: string;
  note: string;
  repeat?: boolean;
  repeatDays?: boolean[];
  attachments?: Attachment[];
}

interface ReminderInput {
  date: string;
  time: string;
  note: string;
  repeat?: boolean;
  repeatDays?: boolean[];
  attachments?: File[];
}

interface ReminderContextType {
  reminders: Reminder[];
  addReminder: (reminder: ReminderInput) => void;
  deleteReminder: (id: string) => void;
}

const defaultReminders: Reminder[] = [
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
        url: '/image_example1.png'
      },
      {
        name: 'attachment_example.pdf',
        type: 'file',
        url: '/attachment_example.pdf'
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
];

const ReminderContext = createContext<ReminderContextType | undefined>(undefined);

export function ReminderProvider({ children }: { children: React.ReactNode }) {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize reminders from localStorage or defaults
  useEffect(() => {
    const storedReminders = getStoredReminders();
    if (storedReminders.length > 0) {
      setReminders(storedReminders);
    } else {
      setReminders(defaultReminders);
      storeReminders(defaultReminders);
    }
    setIsInitialized(true);
  }, []);

  // Update localStorage whenever reminders change
  useEffect(() => {
    if (isInitialized) {
      storeReminders(reminders);
    }
  }, [reminders, isInitialized]);

  const addReminder = async (reminderData: ReminderInput) => {
    const { attachments: files, ...rest } = reminderData;
    let attachments: Attachment[] | undefined;

    if (files && files.length > 0) {
      attachments = files.map(file => ({
        name: file.name,
        type: file.type.startsWith('image/') ? 'image' : 'file',
        url: URL.createObjectURL(file)
      }));
    }

    const newReminder: Reminder = {
      ...rest,
      id: Date.now().toString(),
      attachments
    };

    setReminders(prev => [...prev, newReminder]);
  };

  const deleteReminder = (id: string) => {
    setReminders(prev => {
      const reminder = prev.find(r => r.id === id);
      // Cleanup any object URLs when deleting the reminder
      if (reminder?.attachments) {
        reminder.attachments.forEach(attachment => {
          if (attachment.url.startsWith('blob:')) {
            URL.revokeObjectURL(attachment.url);
          }
        });
      }
      return prev.filter(reminder => reminder.id !== id);
    });
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

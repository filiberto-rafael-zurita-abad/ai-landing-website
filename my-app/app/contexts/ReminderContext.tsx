'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { getReminders, saveReminder, deleteReminder as deleteReminderFromFile, ReminderData } from '../utils/reminderUtils';
import { useUser } from '@clerk/nextjs';
import { v4 as uuidv4 } from 'uuid';

export interface Attachment {
  name: string;
  type: 'image' | 'pdf' | 'other';
  url: string;
}

export interface Reminder extends ReminderData {}

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
  addReminder: (reminder: ReminderInput) => Promise<void>;
  deleteReminder: (id: string) => Promise<void>;
}

const ReminderContext = createContext<ReminderContextType | undefined>(undefined);

export function ReminderProvider({ children }: { children: React.ReactNode }) {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const { user } = useUser();

  useEffect(() => {
    const loadReminders = async () => {
      const allReminders = await getReminders();
      // Filter reminders for the current user
      const userReminders = allReminders.filter(r => r.userEmail === user?.emailAddresses[0]?.emailAddress);
      setReminders(userReminders);
    };
    
    if (user?.emailAddresses[0]?.emailAddress) {
      loadReminders();
    }
  }, [user?.emailAddresses]);

  const addReminder = async (reminderInput: ReminderInput) => {
    if (!user?.emailAddresses[0]?.emailAddress) {
      throw new Error('User must be logged in to add reminders');
    }

    const attachments: Attachment[] = reminderInput.attachments 
      ? reminderInput.attachments.map(file => ({
          name: file.name,
          type: file.type.startsWith('image/') ? 'image' : 'other',
          url: URL.createObjectURL(file)
        }))
      : [];

    const newReminder: ReminderData = {
      id: uuidv4(),
      date: reminderInput.date,
      time: reminderInput.time,
      note: reminderInput.note,
      repeat: reminderInput.repeat,
      repeatDays: reminderInput.repeatDays,
      attachments,
      userEmail: user.emailAddresses[0].emailAddress,
      createdAt: new Date().toISOString()
    };

    const success = await saveReminder(newReminder);
    if (success) {
      setReminders(prev => [...prev, newReminder]);
    }
  };

  const deleteReminder = async (id: string) => {
    const success = await deleteReminderFromFile(id);
    if (success) {
      setReminders(prev => prev.filter(reminder => reminder.id !== id));
    }
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

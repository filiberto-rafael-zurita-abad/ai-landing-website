'use client';

export interface StoredReminder {
  id: string;
  date: string;
  time: string;
  note: string;
  repeat?: boolean;
  repeatDays?: boolean[];
  attachments?: {
    name: string;
    type: string;
    url: string;
  }[];
}

const STORAGE_KEY = 'app_reminders';

export const getStoredReminders = (): StoredReminder[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    console.error('Error reading reminders:', error);
    return [];
  }
};

export const storeReminders = (reminders: StoredReminder[]): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));
  } catch (error) {
    console.error('Error storing reminders:', error);
  }
};

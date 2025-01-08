export interface ReminderData {
  id: string;
  date: string;
  time: string;
  note: string;
  userEmail: string;
  createdAt: string;
  repeat?: boolean;
  repeatDays?: boolean[];
  attachments?: {
    name: string;
    type: 'image' | 'pdf' | 'other';
    url: string;
  }[];
}

export const getReminders = async (): Promise<ReminderData[]> => {
  try {
    const response = await fetch('/api/reminders');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error reading reminders:', error);
    return [];
  }
};

export const saveReminder = async (reminder: ReminderData): Promise<boolean> => {
  try {
    const response = await fetch('/api/reminders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reminder),
    });
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Error saving reminder:', error);
    return false;
  }
};

export const deleteReminder = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`/api/reminders/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Error deleting reminder:', error);
    return false;
  }
};

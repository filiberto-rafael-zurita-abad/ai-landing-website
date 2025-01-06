import fs from 'fs';
import path from 'path';

const schedulesPath = path.join(process.cwd(), 'app/data/schedules.json');

export interface EmailSchedule {
  id: string;
  userEmail: string;
  recipientEmail: string;
  subject: string;
  templateId: string;
  templateMessage: string;
  date: string;
  time: string;
  createdAt: string;
}

export interface SchedulesData {
  schedules: EmailSchedule[];
}

export const readSchedulesFile = (): SchedulesData => {
  try {
    const fileContents = fs.readFileSync(schedulesPath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error reading schedules file:', error);
    return { schedules: [] };
  }
};

export const writeSchedulesFile = (data: SchedulesData): void => {
  try {
    fs.writeFileSync(schedulesPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing schedules file:', error);
  }
};

import { NextResponse } from 'next/server';
import { readSchedulesFile, writeSchedulesFile, EmailSchedule } from '../../utils/scheduleOperations';

export async function POST(request: Request) {
  try {
    let requestData;
    try {
      requestData = await request.json();
    } catch (e) {
      console.error('Error parsing request body:', e);
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    const { templateType, templateMessage, recipientEmail, subject, date, time, userEmail } = requestData;
    if (!templateType || !recipientEmail || !date || !time || !userEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const data = readSchedulesFile();

    const newSchedule: EmailSchedule = {
      id: `schedule${Date.now()}`,
      userEmail,
      recipientEmail,
      templateId: templateType,
      templateMessage: templateMessage || '',
      subject,
      date,
      time,
      createdAt: new Date().toISOString()
    };

    try {
      data.schedules.push(newSchedule);
      writeSchedulesFile(data);
    } catch (e) {
      console.error('Error writing to schedules file:', e);
      return NextResponse.json(
        { error: 'Failed to save schedule' },
        { status: 500 }
      );
    }

    return NextResponse.json(newSchedule);
  } catch (error) {
    console.error('Error in POST /api/schedules:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

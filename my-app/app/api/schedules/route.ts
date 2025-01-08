import { NextResponse } from 'next/server';
import { db } from '../../lib/db';
import { schedules } from '../../../db/schema';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  try {
    const allSchedules = await db.select().from(schedules);
    return NextResponse.json(allSchedules);
  } catch (error) {
    console.error('Error fetching schedules:', error);
    return NextResponse.json({ error: 'Failed to fetch schedules' }, { status: 500 });
  }
}

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

    const newSchedule = {
      id: uuidv4(),
      userEmail,
      recipientEmail,
      templateId: templateType,
      templateMessage: templateMessage || '',
      subject: subject || '',
      date,
      time,
      createdAt: new Date()
    };

    const [createdSchedule] = await db.insert(schedules).values(newSchedule).returning();
    return NextResponse.json(createdSchedule);
  } catch (error) {
    console.error('Error creating schedule:', error);
    return NextResponse.json({ error: 'Failed to create schedule' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const [deletedSchedule] = await db
      .delete(schedules)
      .where(eq(schedules.id, id))
      .returning();

    if (!deletedSchedule) {
      return NextResponse.json({ error: 'Schedule not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting schedule:', error);
    return NextResponse.json({ error: 'Failed to delete schedule' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const schedule = await request.json();
    const [updatedSchedule] = await db
      .update(schedules)
      .set({
        recipientEmail: schedule.recipientEmail,
        templateId: schedule.templateId,
        templateMessage: schedule.templateMessage,
        subject: schedule.subject,
        date: schedule.date,
        time: schedule.time,
      })
      .where(eq(schedules.id, schedule.id))
      .returning();

    if (!updatedSchedule) {
      return NextResponse.json({ error: 'Schedule not found' }, { status: 404 });
    }

    return NextResponse.json(updatedSchedule);
  } catch (error) {
    console.error('Error updating schedule:', error);
    return NextResponse.json({ error: 'Failed to update schedule' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { db } from '../../lib/db';
import { reminders } from '../../../db/schema';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  try {
    const allReminders = await db.select().from(reminders);
    return NextResponse.json(allReminders);
  } catch (error) {
    console.error('Error fetching reminders:', error);
    return NextResponse.json({ error: 'Failed to fetch reminders' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const reminder = await request.json();
    const newReminder = {
      id: uuidv4(),
      date: reminder.date,
      time: reminder.time,
      note: reminder.note,
      repeat: reminder.repeat || false,
      repeatDays: reminder.repeatDays || [false, false, false, false, false, false, false],
      attachments: reminder.attachments || [],
      userEmail: reminder.userEmail,
      createdAt: new Date()
    };

    const [createdReminder] = await db.insert(reminders).values(newReminder).returning();
    return NextResponse.json(createdReminder);
  } catch (error) {
    console.error('Error creating reminder:', error);
    return NextResponse.json({ error: 'Failed to create reminder' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const [deletedReminder] = await db
      .delete(reminders)
      .where(eq(reminders.id, id))
      .returning();

    if (!deletedReminder) {
      return NextResponse.json({ error: 'Reminder not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting reminder:', error);
    return NextResponse.json({ error: 'Failed to delete reminder' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const reminder = await request.json();
    const [updatedReminder] = await db
      .update(reminders)
      .set({
        date: reminder.date,
        time: reminder.time,
        note: reminder.note,
        repeat: reminder.repeat,
        repeatDays: reminder.repeatDays,
        attachments: reminder.attachments,
      })
      .where(eq(reminders.id, reminder.id))
      .returning();

    if (!updatedReminder) {
      return NextResponse.json({ error: 'Reminder not found' }, { status: 404 });
    }

    return NextResponse.json(updatedReminder);
  } catch (error) {
    console.error('Error updating reminder:', error);
    return NextResponse.json({ error: 'Failed to update reminder' }, { status: 500 });
  }
}

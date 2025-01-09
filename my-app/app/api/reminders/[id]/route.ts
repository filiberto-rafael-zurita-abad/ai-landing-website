import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const REMINDERS_FILE = path.join(process.cwd(), 'app/data/reminders.json');

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const data = await fs.readFile(REMINDERS_FILE, 'utf8');
    const reminders = JSON.parse(data);
    const updatedReminders = reminders.filter((reminder: any) => reminder.id !== params.id);
    await fs.writeFile(REMINDERS_FILE, JSON.stringify(updatedReminders, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting reminder:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

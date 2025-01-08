import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const REMINDERS_FILE = path.join(process.cwd(), 'app/data/reminders.json');

export async function GET() {
  try {
    const data = await fs.readFile(REMINDERS_FILE, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading reminders:', error);
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  try {
    const reminder = await request.json();
    const data = await fs.readFile(REMINDERS_FILE, 'utf8');
    const reminders = JSON.parse(data);
    reminders.push(reminder);
    await fs.writeFile(REMINDERS_FILE, JSON.stringify(reminders, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving reminder:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { message } = await req.json();

  // Placeholder for Gemini API call
  const response = `Response from Gemini: ${message}`;

  return NextResponse.json({ response });
}

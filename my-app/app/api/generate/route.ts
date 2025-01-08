import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';

// Initialize the Gemini AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const { userId } = getAuth(req);
    
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { message, settings, prompt } = await req.json();
    
    // Get the generative model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Construct the full prompt
    const fullPrompt = `${prompt}\n\nContext:
- Sales Topic: ${settings.salesTopic}
- Tone: ${settings.tone}
- Objective: ${settings.objective}

Customer Message: ${message}

Please provide a response:`;

    // Generate content
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ response: text });
  } catch (error: any) {
    console.error('Error generating response:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate response' },
      { status: 500 }
    );
  }
}

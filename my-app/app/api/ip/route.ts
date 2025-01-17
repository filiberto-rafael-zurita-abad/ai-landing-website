import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip')
    return NextResponse.json({ ip })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to get IP address' },
      { status: 500 }
    )
  }
}

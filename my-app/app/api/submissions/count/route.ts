import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'submissions', 'submissions.json')
    const data = await fs.readFile(filePath, 'utf-8')
    const submissions = JSON.parse(data)
    return NextResponse.json({ count: submissions.length })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to get submission count' },
      { status: 500 }
    )
  }
}

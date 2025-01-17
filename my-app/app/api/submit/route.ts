import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const submissionsDir = path.join(process.cwd(), 'data/submissions')
const submissionsFile = path.join(submissionsDir, 'submissions.json')

export interface Submission {
  id: number
  nickname: string
  email: string
  description: string
  github?: string
  youtube?: string
  submissionNumber: number
  ipAddress?: string
  userAgent?: string
  timestamp: string
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Create submissions directory if it doesn't exist
    if (!fs.existsSync(submissionsDir)) {
      fs.mkdirSync(submissionsDir, { recursive: true })
    }

    // Get existing submissions
    let submissions: Submission[] = []
    if (fs.existsSync(submissionsFile)) {
      const fileData = fs.readFileSync(submissionsFile, 'utf8')
      submissions = JSON.parse(fileData)
    }

    // Calculate next ID
    const nextId = submissions.length > 0 ? 
      Math.max(...submissions.map(s => s.id)) + 1 : 1

    // Add new submission
    const newSubmission: Submission = {
      id: nextId,
      ...data,
      timestamp: new Date().toISOString()
    }
    submissions.push(newSubmission)

    // Save updated submissions
    fs.writeFileSync(submissionsFile, JSON.stringify(submissions, null, 2))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving submission:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to save submission' },
      { status: 500 }
    )
  }
}

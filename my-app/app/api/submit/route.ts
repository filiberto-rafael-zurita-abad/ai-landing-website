import { NextResponse, NextRequest } from 'next/server'
import { query, createSubmissionsTable, createVisitorsTable } from '@/lib/db'

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
    
    // Create tables if they don't exist
    await createSubmissionsTable()
    await createVisitorsTable()

    // Insert new submission into database
    const result = await query(
      `INSERT INTO submissions (nickname, email, description, github, youtube, submissionNumber, ipAddress, userAgent, timestamp)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING id`,
      [
        data.nickname,
        data.email,
        data.description,
        data.github,
        data.youtube,
        data.submissionNumber,
        data.ipAddress,
        data.userAgent,
        new Date().toISOString()
      ]
    )

    return NextResponse.json({ success: true, id: result.rows[0].id })
  } catch (error) {
    console.error('Error saving submission:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to save submission' },
      { status: 500 }
    )
  }
}

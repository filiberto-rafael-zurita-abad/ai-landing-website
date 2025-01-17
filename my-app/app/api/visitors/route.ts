import { NextResponse, NextRequest } from 'next/server'
import { query } from '@/lib/db'

export interface Visitor {
  id: number
  ipAddress: string
  country?: string
  userAgent?: string
  timestamp: string
  visitCount: number
  lastVisit: string
}

export async function GET(request: NextRequest) {
  try {
    // Get visitor info
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip')
    const userAgent = request.headers.get('user-agent')
    
    // Get country from IP (using freegeoip.app)
    let country = 'Unknown'
    if (ip) {
      try {
        const geoResponse = await fetch(`https://freegeoip.app/json/${ip}`)
        const geoData = await geoResponse.json()
        country = geoData.country_name || 'Unknown'
      } catch (error) {
        console.error('Error getting country:', error)
      }
    }

    // Check if visitor exists
    const existingVisitor = await query(
      'SELECT * FROM visitors WHERE ipAddress = $1',
      [ip]
    )

    if (existingVisitor.rows.length > 0) {
      // Update existing visitor
      await query(
        'UPDATE visitors SET visitCount = visitCount + 1, lastVisit = $1 WHERE ipAddress = $2',
        [new Date().toISOString(), ip]
      )
    } else {
      // Add new visitor
      await query(
        `INSERT INTO visitors (ipAddress, country, userAgent, timestamp, visitCount, lastVisit)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          ip || 'Unknown',
          country,
          userAgent || 'Unknown',
          new Date().toISOString(),
          1,
          new Date().toISOString()
        ]
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error tracking visitor:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to track visitor' },
      { status: 500 }
    )
  }
}

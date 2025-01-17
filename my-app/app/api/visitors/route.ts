import { NextResponse, NextRequest } from 'next/server'
import fs from 'fs'
import path from 'path'

const visitorsDir = path.join(process.cwd(), 'data/visitors')
const visitorsFile = path.join(visitorsDir, 'visitors.json')

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
    // Create visitors directory if it doesn't exist
    if (!fs.existsSync(visitorsDir)) {
      fs.mkdirSync(visitorsDir, { recursive: true })
    }

    // Get existing visitors
    let visitors: Visitor[] = []
    if (fs.existsSync(visitorsFile)) {
      const fileData = fs.readFileSync(visitorsFile, 'utf8')
      visitors = JSON.parse(fileData)
    }

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

    // Calculate next ID
    const nextId = visitors.length > 0 ? 
      Math.max(...visitors.map(v => v.id)) + 1 : 1

    // Check if visitor exists
    const existingVisitor = visitors.find(v => v.ipAddress === ip)
    
    if (existingVisitor) {
      // Update existing visitor
      existingVisitor.visitCount += 1
      existingVisitor.lastVisit = new Date().toISOString()
    } else {
      // Add new visitor
      const newVisitor: Visitor = {
        id: nextId,
        ipAddress: ip || 'Unknown',
        country,
        userAgent: userAgent || 'Unknown',
        timestamp: new Date().toISOString(),
        visitCount: 1,
        lastVisit: new Date().toISOString()
      }
      visitors.push(newVisitor)
    }

    // Save updated visitors
    fs.writeFileSync(visitorsFile, JSON.stringify(visitors, null, 2))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error tracking visitor:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to track visitor' },
      { status: 500 }
    )
  }
}

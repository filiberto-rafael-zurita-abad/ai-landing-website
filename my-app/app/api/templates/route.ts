import { NextResponse } from 'next/server';
import { db } from '../../lib/db';
import { templates } from '../../../db/schema';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';
import { getAuth } from '@clerk/nextjs/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const auth = await getAuth(request);
    if (!auth.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const allTemplates = await db.select().from(templates);
    return NextResponse.json({ templates: allTemplates });
  } catch (error) {
    console.error('Error fetching templates:', error);
    return NextResponse.json({ error: 'Failed to fetch templates' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await getAuth(request);
    if (!auth.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, message } = await request.json();

    const template = {
      id: uuidv4(),
      userId: auth.userId,
      userEmail: auth.sessionClaims?.email as string,
      title,
      message,
      category: 'default',
      tags: [],
      metadata: {
        language: 'en',
        version: 1,
        isActive: true
      },
      usage: {
        timesUsed: 0,
        lastUsed: new Date().toISOString()
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: auth.sessionClaims?.email as string,
      lastModifiedBy: auth.sessionClaims?.email as string
    };

    const [newTemplate] = await db.insert(templates).values(template).returning();
    return NextResponse.json(newTemplate);
  } catch (error) {
    console.error('Error creating template:', error);
    return NextResponse.json({ error: 'Failed to create template' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const auth = await getAuth(request);
    if (!auth.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const template = await request.json();
    const userEmail = auth.sessionClaims?.email as string;

    const [updatedTemplate] = await db
      .update(templates)
      .set({
        title: template.title,
        message: template.message,
        updatedAt: new Date(),
        lastModifiedBy: userEmail,
      })
      .where(eq(templates.id, template.id))
      .returning();

    if (!updatedTemplate) {
      return NextResponse.json({ error: 'Template not found' }, { status: 404 });
    }

    return NextResponse.json(updatedTemplate);
  } catch (error) {
    console.error('Error updating template:', error);
    return NextResponse.json({ error: 'Failed to update template' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const auth = await getAuth(request);
    if (!auth.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await request.json();
    const [deletedTemplate] = await db
      .delete(templates)
      .where(eq(templates.id, id))
      .returning();

    if (!deletedTemplate) {
      return NextResponse.json({ error: 'Template not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting template:', error);
    return NextResponse.json({ error: 'Failed to delete template' }, { status: 500 });
  }
}

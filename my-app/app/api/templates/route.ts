import { NextResponse } from 'next/server';
import { readTemplatesFile, writeTemplatesFile, Template } from '../../utils/fileOperations';

export async function GET() {
  const data = readTemplatesFile();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const data = readTemplatesFile();
  const newTemplate: Partial<Template> = await request.json();

  const template = {
    id: `template${Date.now()}`,
    title: newTemplate.title || '',
    message: newTemplate.message || '',
    createdAt: new Date().toISOString()
  };

  data.templates.push(template);
  writeTemplatesFile(data);

  return NextResponse.json(template);
}

export async function PUT(request: Request) {
  const template: Template = await request.json();
  const data = readTemplatesFile();
  
  const index = data.templates.findIndex(t => t.id === template.id);
  if (index !== -1) {
    data.templates[index] = {
      ...template,
      createdAt: data.templates[index].createdAt // Preserve original creation date
    };
    writeTemplatesFile(data);
    return NextResponse.json(data.templates[index]);
  }
  
  return NextResponse.json({ error: 'Template not found' }, { status: 404 });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  const data = readTemplatesFile();
  
  data.templates = data.templates.filter(template => template.id !== id);
  writeTemplatesFile(data);

  return NextResponse.json({ success: true });
}

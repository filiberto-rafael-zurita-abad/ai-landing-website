import fs from 'fs';
import path from 'path';

const templatesPath = path.join(process.cwd(), 'app/data/templates.json');

export interface Template {
  id: string;
  title: string;
  message: string;
  createdAt: string;
}

export interface TemplatesData {
  templates: Template[];
}

export const readTemplatesFile = (): TemplatesData => {
  try {
    const fileContents = fs.readFileSync(templatesPath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error reading templates file:', error);
    return { templates: [] };
  }
};

export const writeTemplatesFile = (data: TemplatesData): void => {
  try {
    fs.writeFileSync(templatesPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing templates file:', error);
  }
};

import { pgTable, text, timestamp, boolean, jsonb, uuid } from 'drizzle-orm/pg-core';

// Reminders table
export const reminders = pgTable('reminders', {
  id: uuid('id').primaryKey().defaultRandom(),
  date: text('date').notNull(),
  time: text('time').notNull(),
  note: text('note').notNull(),
  repeat: boolean('repeat').default(false),
  repeatDays: jsonb('repeat_days').$type<boolean[]>().notNull(),
  attachments: jsonb('attachments').$type<{ name: string; type: string; url: string }[]>().default([]),
  userEmail: text('user_email').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

// Templates table
export const templates = pgTable('templates', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('user_id').notNull(),
  userEmail: text('user_email').notNull(),
  title: text('title').notNull(),
  message: text('message').notNull(),
  category: text('category').notNull(),
  tags: jsonb('tags').$type<string[]>().default([]),
  metadata: jsonb('metadata').$type<{
    language: string;
    version: number;
    isActive: boolean;
  }>().notNull(),
  usage: jsonb('usage').$type<{
    timesUsed: number;
    lastUsed: string;
  }>().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  createdBy: text('created_by').notNull(),
  lastModifiedBy: text('last_modified_by').notNull()
});

// Schedules table
export const schedules = pgTable('schedules', {
  id: uuid('id').primaryKey().defaultRandom(),
  userEmail: text('user_email').notNull(),
  recipientEmail: text('recipient_email').notNull(),
  templateId: text('template_id').notNull(),
  templateMessage: text('template_message').notNull(),
  subject: text('subject'),
  date: text('date').notNull(),
  time: text('time').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

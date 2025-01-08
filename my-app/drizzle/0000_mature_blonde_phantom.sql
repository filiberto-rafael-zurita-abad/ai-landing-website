CREATE TABLE "reminders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"date" text NOT NULL,
	"time" text NOT NULL,
	"note" text NOT NULL,
	"repeat" boolean DEFAULT false,
	"repeat_days" jsonb NOT NULL,
	"attachments" jsonb DEFAULT '[]'::jsonb,
	"user_email" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "schedules" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_email" text NOT NULL,
	"recipient_email" text NOT NULL,
	"template_id" text NOT NULL,
	"template_message" text NOT NULL,
	"subject" text,
	"date" text NOT NULL,
	"time" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "templates" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"user_email" text NOT NULL,
	"title" text NOT NULL,
	"message" text NOT NULL,
	"category" text NOT NULL,
	"tags" jsonb DEFAULT '[]'::jsonb,
	"metadata" jsonb NOT NULL,
	"usage" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_by" text NOT NULL,
	"last_modified_by" text NOT NULL
);

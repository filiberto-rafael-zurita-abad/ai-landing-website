import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Schedulify - Smart Scheduling Made Simple",
  description: "Schedule meetings effortlessly with Schedulify's smart scheduling platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const inter = `${geistSans.variable} ${geistMono.variable} antialiased`;
  
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter}>{children}</body>
      </html>
    </ClerkProvider>
  );
}

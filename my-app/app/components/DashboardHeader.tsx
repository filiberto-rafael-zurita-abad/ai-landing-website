"use client";

import { UserButton } from "@clerk/nextjs";

interface DashboardHeaderProps {
  title: string;
}

export default function DashboardHeader({ title }: DashboardHeaderProps) {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        <UserButton />
      </div>
    </header>
  );
}

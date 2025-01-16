"use client";
import { UserButton } from "@clerk/nextjs";
import Sidebar from "../components/Sidebar";
import ChatEnvironment from "../components/ChatEnvironment";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar  />
      
      <div className="flex-1">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <UserButton afterSignOutUrl="/" />
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <ChatEnvironment />
        </main>
      </div>
    </div>
  );
}

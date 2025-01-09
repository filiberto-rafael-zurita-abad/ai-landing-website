import { UserButton } from "@clerk/nextjs";
import Sidebar from "../components/Sidebar";
import ServiceGrid from "../components/ServiceGrid";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h2 className="text-lg font-medium text-gray-900">Welcome to your dashboard!</h2>
            <p className="mt-2 text-gray-600">
              This is a protected page. You can only see this if you're signed in.
            </p>
          </div>

          <ServiceGrid />
        </main>
      </div>
    </div>
  );
}

import Sidebar from '../../../components/Sidebar';
import DashboardHeader from '@/app/components/DashboardHeader';

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1">
        <DashboardHeader title="Course Details" />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {children}
        </main>
      </div>
    </div>
  );
}

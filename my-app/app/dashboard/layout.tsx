"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Footer from "@/app/components/Footer";
import DashboardHeader from "@/app/components/DashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push('/');
    }
  }, [userId, isLoaded, router]);

  if (!isLoaded) {
    return null;
  }

  if (!userId) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <DashboardHeader title="Dashboard" />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

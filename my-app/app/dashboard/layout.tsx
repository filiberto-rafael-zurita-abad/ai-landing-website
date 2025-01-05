"use client";

import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Footer from "@/app/components/Footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = useAuth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {children}
      <Footer />
    </div>
  );
}

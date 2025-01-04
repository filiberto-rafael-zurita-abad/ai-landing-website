"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ScrollLink } from '../components/ScrollLink';
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export const Navigation = () => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">Schedulify</Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {isHomePage ? (
              <>
                <ScrollLink href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</ScrollLink>
                <ScrollLink href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">Pricing</ScrollLink>
                <ScrollLink href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">About</ScrollLink>
              </>
            ) : (
              <>
                <Link href="/#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</Link>
                <Link href="/#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">Pricing</Link>
                <Link href="/#about" className="text-gray-600 hover:text-blue-600 transition-colors">About</Link>
              </>
            )}
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <Link href="/sign-in" className="text-gray-600 hover:text-blue-600 transition-colors">
                Sign In
              </Link>
              <Link href="/sign-up" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Get Started
              </Link>
            </SignedOut>
          </div>
        </div>
      </div>
    </nav>
  );
};

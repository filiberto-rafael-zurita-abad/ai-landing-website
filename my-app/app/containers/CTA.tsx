"use client";

import Link from 'next/link';

export const CTA = () => {
  return (
    <div className="bg-blue-600 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to streamline your scheduling?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals who've simplified their scheduling process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/sign-up" 
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Get Started for Free
            </Link>
            <Link 
              href="#features" 
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

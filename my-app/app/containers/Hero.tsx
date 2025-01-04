"use client";

import Link from 'next/link';

export const Hero = () => {
  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Schedule Meetings <span className="text-blue-600">Effortlessly</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Streamline your scheduling process and eliminate the back-and-forth emails. 
            Share your availability with one click and let others book time with you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
              Start for Free
            </Link>
            <Link href="#features" className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

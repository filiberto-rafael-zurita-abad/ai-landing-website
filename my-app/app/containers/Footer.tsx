"use client";

import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Product</h4>
            <ul className="space-y-2">
              <li><Link href="/features" className="text-gray-600 hover:text-blue-600">Features</Link></li>
              <li><Link href="/pricing" className="text-gray-600 hover:text-blue-600">Pricing</Link></li>
              <li><Link href="/integrations" className="text-gray-600 hover:text-blue-600">Integrations</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-600 hover:text-blue-600">About</Link></li>
              <li><Link href="/careers" className="text-gray-600 hover:text-blue-600">Careers</Link></li>
              <li><Link href="/blog" className="text-gray-600 hover:text-blue-600">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="/help" className="text-gray-600 hover:text-blue-600">Help Center</Link></li>
              <li><Link href="/guides" className="text-gray-600 hover:text-blue-600">Guides</Link></li>
              <li><Link href="/api" className="text-gray-600 hover:text-blue-600">API Docs</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-gray-600 hover:text-blue-600">Privacy</Link></li>
              <li><Link href="/terms" className="text-gray-600 hover:text-blue-600">Terms</Link></li>
              <li><Link href="/security" className="text-gray-600 hover:text-blue-600">Security</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-600">© 2025 Schedulify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

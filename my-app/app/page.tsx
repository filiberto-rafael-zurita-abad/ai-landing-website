'use client';

import { Navigation } from './containers/Navigation';
import { Hero } from './containers/Hero';
import { Competition } from './containers/Competition';
import { Features } from './containers/Features';
import { About } from './containers/About';
import { SubmissionForm } from './containers/SubmissionForm';
import { FAQ } from './containers/FAQ';
import { Footer } from './containers/Footer';
import WhatsappBubble from './components/WhatsappBubble';
import { useEffect } from 'react';

export default function Home() {
  // Track visitor on page load
  useEffect(() => {
    fetch('/api/visitors')
      .catch(error => console.error('Visitor tracking failed:', error))
  }, [])
  return (
    <div className="min-h-screen relative">
      <WhatsappBubble />
      <Navigation />
      <main>
        <Hero />
        <div className="bg-white">
          <Features />
        </div>
        <div className="bg-gray-50">
          <About />
        </div>
        <div className="bg-white">
          <Competition />
        </div>
        <div className="bg-gray-50">
          <SubmissionForm />
        </div>
        <div className="bg-white">
          <FAQ />
        </div>
      </main>
      <Footer />
    </div>
  );
}

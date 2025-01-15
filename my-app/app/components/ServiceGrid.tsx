'use client';

import { useState, useEffect } from 'react';
import ServiceCard from './ServiceCard';

// Sample service data with Lorem Ipsum
export const services = [
  {
    title: 'Text Summarization',
    organization: 'AI Tools',
    image: '/course1.jpg',
    level: 'Free',
    type: 'Tool',
    organizationLogo: '/google-logo.png',
    slug: 'text-summarization'
  },
  {
    title: 'Code Generator',
    organization: 'Dev Tools',
    image: '/course2.jpg',
    level: 'Premium',
    type: 'Tool',
    organizationLogo: '/umich-logo.png',
    slug: 'code-generator'
  },
  {
    title: 'Image Recognition',
    organization: 'Vision AI',
    image: '/course3.jpg',
    level: 'Free',
    type: 'API',
    organizationLogo: '/vanderbilt-logo.png',
    slug: 'image-recognition'
  },
  {
    title: 'Language Translation',
    organization: 'Language AI',
    image: '/course1.jpg',
    level: 'Free',
    type: 'API',
    organizationLogo: '/google-logo.png',
    slug: 'language-translation'
  },
  {
    title: 'Data Analysis',
    organization: 'Analytics Tools',
    image: '/course2.jpg',
    level: 'Premium',
    type: 'Tool',
    organizationLogo: '/umich-logo.png',
    slug: 'data-analysis'
  },
] as const;

export default function ServiceGrid() {
  const [displayCount, setDisplayCount] = useState(3);
  const [containerWidth, setContainerWidth] = useState(0);
  const [cardsPerRow, setCardsPerRow] = useState(3);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const updateWidth = () => {
        const container = document.getElementById('service-grid');
        if (container) {
          setContainerWidth(container.offsetWidth);
          // Calculate cards per row based on container width
          // Assuming each card is ~320px wide with margins
          const possibleCards = Math.floor(container.offsetWidth / 320);
          setCardsPerRow(Math.max(1, possibleCards));
        }
      };

      updateWidth();
      window.addEventListener('resize', updateWidth);
      return () => window.removeEventListener('resize', updateWidth);
    }
  }, []);

  const showMoreCount = Math.max(0, services.length - displayCount);
  const shouldShowButton = displayCount < services.length;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Popular Tools</h2>
      <div
        id="service-grid"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {services.slice(0, displayCount).map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
      
      {shouldShowButton && (
        <div className="flex justify-center">
          <button
            onClick={() => setDisplayCount(services.length)}
            className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
          >
            Show {showMoreCount} more
          </button>
        </div>
      )}
    </div>
  );
}

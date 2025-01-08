'use client';

import { useState, useEffect } from 'react';
import ServiceCard from './ServiceCard';

// Sample service data with Lorem Ipsum
export const services = [
  {
    title: 'Reminder Tool',
    organization: 'AI Tools',
    image: '/ready.jpg',
    level: 'Free',
    type: 'Tool',
    organizationLogo: '/google-logo.png',
    slug: 'reminder-tool'
  },
  {
    title: 'Template Sender',
    organization: 'Vision AI',
    image: '/ready.jpg',
    level: 'Free',
    type: 'Tool',
    organizationLogo: '/vanderbilt-logo.png',
    slug: 'template-sender'
  },
  {
    title: 'Message Generator',
    organization: 'Dev Tools',
    image: '/ready.jpg',
    level: 'Premium',
    type: 'Tool',
    organizationLogo: '/umich-logo.png',
    slug: 'message-generator'
  },
  {
    title: 'Message Prettifier',
    organization: 'Language AI',
    image: '/soon.png',
    level: 'Free',
    type: 'Tool',
    organizationLogo: '/google-logo.png',
    slug: 'message-prettifier'
  },
  {
    title: 'Symptoms Analyzer',
    organization: 'Health AI',
    image: '/soon.png',
    level: 'Premium',
    type: 'Tool',
    organizationLogo: '/google-logo.png',
    slug: 'symptoms-analyzer'
  },
  {
    title: 'Websites Marketplace',
    organization: 'Web AI',
    image: '/soon.png',
    level: 'Premium',
    type: 'Tool',
    organizationLogo: '/vanderbilt-logo.png',
    slug: 'websites-marketplace'
  },
  {
    title: 'Prompt Prettifier',
    organization: 'Language AI',
    image: '/soon.png',
    level: 'Free',
    type: 'Tool',
    organizationLogo: '/google-logo.png',
    slug: 'prompt-prettifier'
  }
] as const;

export default function ServiceGrid() {
  const [displayCount, setDisplayCount] = useState(3);
  const [isExpanded, setIsExpanded] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [cardsPerRow, setCardsPerRow] = useState(3);

  useEffect(() => {
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
  }, []);

  const handleToggleDisplay = () => {
    if (isExpanded) {
      setDisplayCount(3);
      setIsExpanded(false);
    } else {
      setDisplayCount(services.length);
      setIsExpanded(true);
    }
  };

  const showMoreCount = Math.max(0, services.length - displayCount);
  const shouldShowButton = displayCount !== services.length || isExpanded;

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
            onClick={handleToggleDisplay}
            className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 flex items-center gap-2"
          >
            {isExpanded ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Show Less
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Show {showMoreCount} more
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

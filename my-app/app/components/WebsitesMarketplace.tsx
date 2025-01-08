'use client';

import { useState } from 'react';

type Website = {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  technologies: string[];
};

const sampleWebsites: Website[] = [
  {
    id: '1',
    title: 'E-commerce Starter',
    description: 'A modern e-commerce website template with shopping cart and payment integration.',
    price: 299,
    category: 'E-commerce',
    technologies: ['React', 'Next.js', 'Stripe', 'Tailwind CSS']
  },
  {
    id: '2',
    title: 'Portfolio Pro',
    description: 'Professional portfolio website template for creatives and developers.',
    price: 149,
    category: 'Portfolio',
    technologies: ['React', 'Tailwind CSS', 'Framer Motion']
  },
  {
    id: '3',
    title: 'Blog Master',
    description: 'Full-featured blog website with CMS integration.',
    price: 199,
    category: 'Blog',
    technologies: ['Next.js', 'MDX', 'Tailwind CSS']
  },
  {
    id: '4',
    title: 'Restaurant Site',
    description: 'Beautiful restaurant website with menu management and reservation system.',
    price: 249,
    category: 'Business',
    technologies: ['React', 'Node.js', 'MongoDB']
  }
];

export default function WebsitesMarketplace() {
  const [websites] = useState<Website[]>(sampleWebsites);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWebsite, setSelectedWebsite] = useState<Website | null>(null);

  const categories = ['all', ...new Set(websites.map(site => site.category))];

  const filteredWebsites = websites.filter(website => {
    const matchesCategory = selectedCategory === 'all' || website.category === selectedCategory;
    const matchesSearch = website.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         website.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Websites Marketplace</h2>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search websites..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex-shrink-0">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWebsites.map(website => (
          <div
            key={website.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedWebsite(website)}
          >
            <h3 className="text-xl font-semibold mb-2">{website.title}</h3>
            <p className="text-gray-600 mb-4">{website.description}</p>
            <div className="flex justify-between items-center mb-4">
              <span className="text-blue-600 font-semibold">${website.price}</span>
              <span className="bg-gray-100 px-2 py-1 rounded-full text-sm">{website.category}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {website.technologies.map(tech => (
                <span
                  key={tech}
                  className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedWebsite && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-semibold">{selectedWebsite.title}</h3>
              <button
                onClick={() => setSelectedWebsite(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <p className="text-gray-600 mb-4">{selectedWebsite.description}</p>
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Technologies:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedWebsite.technologies.map(tech => (
                  <span
                    key={tech}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-blue-600">
                ${selectedWebsite.price}
              </span>
              <button
                onClick={() => {
                  // Here you would typically integrate with a payment system
                  alert('Purchase functionality would be integrated here!');
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Purchase Template
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

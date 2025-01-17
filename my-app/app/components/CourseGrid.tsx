'use client';

import { useState } from 'react';
import CourseCard from './CourseCard';

// Sample course data with Lorem Ipsum
export const courses = [
  {
    title: 'Lorem Ipsum Fundamentals',
    organization: 'Dolor Sit Corp',
    image: '/course1.jpg',
    level: 'Beginner',
    type: 'Course',
    organizationLogo: '/google-logo.png',
    slug: 'lorem-ipsum-fundamentals'
  },
  {
    title: 'Consectetur Adipiscing Elite',
    organization: 'Amet University',
    image: '/course2.jpg',
    level: 'Intermediate',
    type: 'Specialization',
    organizationLogo: '/umich-logo.png',
    slug: 'consectetur-adipiscing'
  },
  {
    title: 'Sed Do Eiusmod Tempor',
    organization: 'Incididunt Institute',
    image: '/course3.jpg',
    level: 'Advanced',
    type: 'Specialization',
    organizationLogo: '/vanderbilt-logo.png',
    slug: 'sed-do-eiusmod'
  },
  {
    title: 'Ut Labore et Dolore',
    organization: 'Magna Corp',
    image: '/course1.jpg',
    level: 'Beginner',
    type: 'Course',
    organizationLogo: '/google-logo.png',
    slug: 'ut-labore-dolore'
  },
  {
    title: 'Aliqua Training Program',
    organization: 'Enim Institute',
    image: '/course2.jpg',
    level: 'Intermediate',
    type: 'Course',
    organizationLogo: '/umich-logo.png',
    slug: 'aliqua-training'
  },
] as const;

export default function CourseGrid() {
  const [displayCount, setDisplayCount] = useState(3);

  const showMoreCount = Math.max(0, courses.length - displayCount);
  const shouldShowButton = displayCount < courses.length;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Popular Tools</h2>
      <div
        id="course-grid"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {courses.slice(0, displayCount).map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </div>
      
      {shouldShowButton && (
        <div className="flex justify-center">
          <button
            onClick={() => setDisplayCount(courses.length)}
            className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
          >
            Show {showMoreCount} more
          </button>
        </div>
      )}
    </div>
  );
}

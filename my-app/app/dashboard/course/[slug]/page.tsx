'use client';

import { useParams, useRouter } from 'next/navigation';
import { courses } from '../../../components/CourseGrid';

export default function CoursePage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  // Find the course that matches the slug
  const course = courses.find(c => c.slug === slug);

  if (!course) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-900">Course not found</h1>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white shadow rounded-lg p-6">
        <button
          onClick={() => router.back()}
          className="mb-6 text-blue-600 hover:text-blue-800 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Dashboard
        </button>

        <div className="space-y-6">
          <div className="flex items-center">
            <img
              src={course.organizationLogo}
              alt={course.organization}
              className="w-8 h-8 mr-3"
            />
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">{course.title}</h1>
              <p className="text-gray-600">{course.organization}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {course.level}
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              {course.type}
            </span>
          </div>

          <img
            src={course.image}
            alt={course.title}
            className="w-full h-64 object-cover rounded-lg"
          />

          <div className="prose max-w-none">
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

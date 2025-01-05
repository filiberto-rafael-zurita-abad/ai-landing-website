'use client';

import { useRouter } from 'next/navigation';

interface CourseCardProps {
  title: string;
  organization: string;
  image: string;
  level: string;
  type: string;
  organizationLogo: string;
  slug: string;
}

export default function CourseCard({
  title,
  organization,
  image,
  level,
  type,
  organizationLogo,
  slug,
}: CourseCardProps) {
  const router = useRouter();

  return (
    <div 
      onClick={() => router.push(`/dashboard/course/${slug}`)}
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="relative h-48 w-full">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center mb-4">
          <img
            src={organizationLogo}
            alt={organization}
            className="w-6 h-6 mr-2"
          />
          <span className="text-sm text-gray-600">{organization}</span>
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <div className="flex items-center text-sm text-gray-500">
          <span>{level}</span>
          <span className="mx-2">•</span>
          <span>{type}</span>
        </div>
      </div>
    </div>
  );
}

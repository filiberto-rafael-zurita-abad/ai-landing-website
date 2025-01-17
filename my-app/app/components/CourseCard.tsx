'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

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
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center mb-4">
          <Image
            src={organizationLogo}
            alt={organization}
            width={24}
            height={24}
            className="mr-2"
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

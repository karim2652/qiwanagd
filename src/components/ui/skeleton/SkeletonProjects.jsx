import React from 'react';
import SkeletonBase from './SkeletonBase';

const SkeletonProjects = () => {
  return (
    <div className='min-h-screen'>
      {/* Hero Section Skeleton */}
      <div className='relative h-64 mb-8'>
        <SkeletonBase width='w-full' height='h-full' rounded='rounded-lg' className='m-4' />
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='text-center space-y-4'>
            <SkeletonBase width='w-64' height='h-10' className='mx-auto' />
            <SkeletonBase width='w-48' height='h-6' className='mx-auto' />
          </div>
        </div>
      </div>

      {/* Filter Tabs Skeleton */}
      <div className='container mx-auto px-4 mb-8'>
        <div className='flex justify-center space-x-4'>
          {[...Array(3)].map((_, index) => (
            <SkeletonBase key={index} width='w-32' height='h-10' rounded='rounded-full' />
          ))}
        </div>
      </div>

      {/* Projects Grid Skeleton */}
      <div className='container mx-auto px-4 py-8'>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {[...Array(12)].map((_, index) => (
            <div
              key={index}
              className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'
            >
              {/* Project Image */}
              <SkeletonBase width='w-full' height='h-48' rounded='rounded-none' />

              {/* Project Content */}
              <div className='p-4'>
                {/* Title */}
                <SkeletonBase width='w-full' height='h-5' className='mb-2' />

                {/* Category */}
                <SkeletonBase width='w-3/4' height='h-4' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonProjects;

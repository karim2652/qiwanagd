import React from 'react';
import SkeletonBase from './SkeletonBase';
import SkeletonCard from './SkeletonCard';

const SkeletonServices = () => {
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

      {/* Services Grid Skeleton */}
      <div className='container mx-auto px-4 py-8'>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {[...Array(6)].map((_, index) => (
            <SkeletonCard
              key={index}
              showImage={true}
              showButton={true}
              className='hover:shadow-lg transition-shadow'
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonServices;

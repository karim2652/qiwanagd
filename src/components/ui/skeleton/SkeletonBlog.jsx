import React from 'react';
import SkeletonBase from './SkeletonBase';

const SkeletonBlog = () => {
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

      {/* Blog Posts Grid Skeleton */}
      <div className='container mx-auto px-4 py-8'>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {[...Array(9)].map((_, index) => (
            <div
              key={index}
              className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'
            >
              {/* Blog Image */}
              <SkeletonBase width='w-full' height='h-48' rounded='rounded-none' />

              {/* Blog Content */}
              <div className='p-6'>
                {/* Date */}
                <SkeletonBase width='w-24' height='h-4' className='mb-3' />

                {/* Title */}
                <SkeletonBase width='w-full' height='h-6' className='mb-3' />

                {/* Description */}
                <div className='space-y-2 mb-4'>
                  <SkeletonBase width='w-full' height='h-4' />
                  <SkeletonBase width='w-4/5' height='h-4' />
                  <SkeletonBase width='w-3/5' height='h-4' />
                </div>

                {/* Read More Button */}
                <SkeletonBase width='w-28' height='h-10' rounded='rounded-full' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonBlog;

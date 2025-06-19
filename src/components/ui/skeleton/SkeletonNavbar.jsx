import React from 'react';
import SkeletonBase from './SkeletonBase';

const SkeletonNavbar = () => {
  return (
    <div className='bg-[#f5f9f9] h-20 sticky top-0 z-50 shadow-sm'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex h-20 justify-between items-center'>
          {/* Logo Skeleton */}
          <SkeletonBase width='w-[120px]' height='h-14' rounded='rounded-lg' />

          {/* Navigation Links Skeleton - Hidden on mobile */}
          <div className='hidden lg:flex gap-6'>
            {[...Array(5)].map((_, index) => (
              <SkeletonBase key={index} width='w-16' height='h-6' rounded='rounded-md' />
            ))}
          </div>

          {/* Actions Skeleton - Hidden on mobile */}
          <div className='hidden lg:flex items-center gap-4'>
            {/* Phone Skeleton */}
            <div className='flex items-center gap-2'>
              <SkeletonBase width='w-8' height='h-8' rounded='rounded-full' />
              <SkeletonBase width='w-32' height='h-4' rounded='rounded-sm' />
            </div>

            {/* Quote Button Skeleton */}
            <SkeletonBase width='w-32' height='h-8' rounded='rounded-full' />

            {/* Language Switcher Skeleton */}
            <SkeletonBase width='w-24' height='h-10' rounded='rounded-full' />
          </div>

          {/* Mobile Menu Button Skeleton */}
          <div className='lg:hidden'>
            <SkeletonBase width='w-7' height='h-7' rounded='rounded-lg' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonNavbar;

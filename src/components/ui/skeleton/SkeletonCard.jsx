import React from 'react';
import SkeletonBase from './SkeletonBase';

const SkeletonCard = ({ showImage = true, showButton = true, className = '' }) => {
  return (
    <div className={`p-6 border border-gray-200 rounded-lg shadow-sm ${className}`}>
      {/* Image Skeleton */}
      {showImage && (
        <SkeletonBase width='w-full' height='h-48' rounded='rounded-lg' className='mb-4' />
      )}

      {/* Title Skeleton */}
      <SkeletonBase width='w-3/4' height='h-6' className='mb-3' />

      {/* Description Lines */}
      <div className='space-y-2 mb-4'>
        <SkeletonBase width='w-full' height='h-4' />
        <SkeletonBase width='w-5/6' height='h-4' />
        <SkeletonBase width='w-4/6' height='h-4' />
      </div>

      {/* Button Skeleton */}
      {showButton && <SkeletonBase width='w-32' height='h-10' rounded='rounded-full' />}
    </div>
  );
};

export default SkeletonCard;

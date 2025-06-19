import React from 'react';
import SkeletonBase from './SkeletonBase';
import SkeletonCard from './SkeletonCard';

const SkeletonHome = () => {
  return (
    <div className='min-h-screen'>
      {/* Hero Section Skeleton */}
      <div className='relative h-screen'>
        <SkeletonBase
          width='w-full'
          height='h-full'
          rounded='rounded-none'
          className='absolute inset-0'
        />
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='text-center space-y-4'>
            <SkeletonBase width='w-96' height='h-12' className='mx-auto' />
            <SkeletonBase width='w-80' height='h-6' className='mx-auto' />
            <SkeletonBase width='w-40' height='h-12' rounded='rounded-full' className='mx-auto' />
          </div>
        </div>
      </div>

      {/* About Section Skeleton */}
      <div className='container mx-auto px-4 py-16'>
        <SkeletonBase width='w-64' height='h-8' className='mx-auto mb-8' />
        <div className='grid md:grid-cols-2 gap-8 items-center'>
          <div className='space-y-4'>
            <SkeletonBase width='w-full' height='h-6' />
            <SkeletonBase width='w-11/12' height='h-4' />
            <SkeletonBase width='w-full' height='h-4' />
            <SkeletonBase width='w-3/4' height='h-4' />
          </div>
          <SkeletonBase width='w-full' height='h-80' rounded='rounded-lg' />
        </div>
      </div>

      {/* Services Section Skeleton */}
      <div className='container mx-auto px-4 py-16'>
        <SkeletonBase width='w-48' height='h-8' className='mx-auto mb-12' />
        <div className='grid md:grid-cols-3 gap-6'>
          {[...Array(6)].map((_, index) => (
            <SkeletonCard key={index} showImage={true} showButton={true} />
          ))}
        </div>
      </div>

      {/* Projects Section Skeleton */}
      <div className='container mx-auto px-4 py-16'>
        <SkeletonBase width='w-56' height='h-8' className='mx-auto mb-12' />
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {[...Array(6)].map((_, index) => (
            <SkeletonCard key={index} showImage={true} showButton={false} />
          ))}
        </div>
      </div>

      {/* Partners Section Skeleton */}
      <div className='container mx-auto px-4 py-16'>
        <SkeletonBase width='w-40' height='h-8' className='mx-auto mb-12' />
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6'>
          {[...Array(12)].map((_, index) => (
            <SkeletonBase key={index} width='w-full' height='h-20' rounded='rounded-lg' />
          ))}
        </div>
      </div>

      {/* Contact Section Skeleton */}
      <div className='container mx-auto px-4 py-16'>
        <div className='grid md:grid-cols-2 gap-8'>
          <SkeletonBase width='w-full' height='h-80' rounded='rounded-lg' />
          <div className='space-y-4'>
            <SkeletonBase width='w-full' height='h-12' />
            <SkeletonBase width='w-full' height='h-12' />
            <SkeletonBase width='w-full' height='h-32' />
            <SkeletonBase width='w-32' height='h-12' rounded='rounded-full' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonHome;

import React from 'react';
import { useLocation } from 'react-router-dom';
import { SkeletonHome, SkeletonBlog, SkeletonServices, SkeletonProjects, SkeletonBase } from './';

const SkeletonRouter = () => {
  const location = useLocation();
  const path = location.pathname;

  // اختيار skeleton المناسب حسب المسار
  const renderSkeleton = () => {
    switch (true) {
      case path === '/' || path === '/home':
        return <SkeletonHome />;

      case path.startsWith('/blog'):
        return <SkeletonBlog />;

      case path.startsWith('/services'):
        return <SkeletonServices />;

      case path.startsWith('/projects'):
        return <SkeletonProjects />;

      case path.startsWith('/partners'):
        return (
          <div className='min-h-screen'>
            <div className='relative h-64 mb-8'>
              <SkeletonBase width='w-full' height='h-full' rounded='rounded-lg' className='m-4' />
            </div>
            <div className='container mx-auto px-4 py-8'>
              <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6'>
                {[...Array(24)].map((_, index) => (
                  <SkeletonBase key={index} width='w-full' height='h-20' rounded='rounded-lg' />
                ))}
              </div>
            </div>
          </div>
        );

      case path.startsWith('/contact'):
        return (
          <div className='min-h-screen'>
            <div className='container mx-auto px-4 py-8'>
              <div className='grid md:grid-cols-2 gap-8'>
                <SkeletonBase width='w-full' height='h-96' rounded='rounded-lg' />
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

      case path.startsWith('/quote'):
        return (
          <div className='min-h-screen'>
            <div className='container mx-auto px-4 py-8 max-w-2xl'>
              <SkeletonBase width='w-64' height='h-8' className='mx-auto mb-8' />
              <div className='space-y-6'>
                <SkeletonBase width='w-full' height='h-12' />
                <SkeletonBase width='w-full' height='h-12' />
                <SkeletonBase width='w-full' height='h-32' />
                <SkeletonBase width='w-full' height='h-12' />
                <SkeletonBase
                  width='w-40'
                  height='h-12'
                  rounded='rounded-full'
                  className='mx-auto'
                />
              </div>
            </div>
          </div>
        );

      // Default skeleton للصفحات غير المحددة
      default:
        return (
          <div className='min-h-screen'>
            <div className='container mx-auto px-4 py-8'>
              <SkeletonBase width='w-64' height='h-8' className='mx-auto mb-8' />
              <div className='grid gap-6'>
                {[...Array(6)].map((_, index) => (
                  <div key={index} className='space-y-4'>
                    <SkeletonBase width='w-full' height='h-4' />
                    <SkeletonBase width='w-5/6' height='h-4' />
                    <SkeletonBase width='w-4/6' height='h-4' />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return renderSkeleton();
};

export default SkeletonRouter;

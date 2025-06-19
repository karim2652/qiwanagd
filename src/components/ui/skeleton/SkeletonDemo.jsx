import React, { useState } from 'react';
import { 
  SkeletonBase, 
  SkeletonCard, 
  SkeletonHome, 
  SkeletonBlog, 
  SkeletonServices, 
  SkeletonProjects,
  SkeletonNavbar 
} from './';

const SkeletonDemo = () => {
  const [activeDemo, setActiveDemo] = useState('base');

  const demos = [
    { id: 'base', label: 'Base Skeleton', component: <SkeletonBase width="w-full" height="h-4" /> },
    { id: 'card', label: 'Card Skeleton', component: <SkeletonCard /> },
    { id: 'navbar', label: 'Navbar Skeleton', component: <SkeletonNavbar /> },
    { id: 'home', label: 'Home Page Skeleton', component: <SkeletonHome /> },
    { id: 'blog', label: 'Blog Page Skeleton', component: <SkeletonBlog /> },
    { id: 'services', label: 'Services Page Skeleton', component: <SkeletonServices /> },
    { id: 'projects', label: 'Projects Page Skeleton', component: <SkeletonProjects /> },
  ];

  return (
    <div className="p-8 max-w-full mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Skeleton Loading Demo</h1>
      
      {/* Demo Navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {demos.map(demo => (
          <button
            key={demo.id}
            onClick={() => setActiveDemo(demo.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeDemo === demo.id
                ? 'bg-[#F03E2F] text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {demo.label}
          </button>
        ))}
      </div>

      {/* Demo Content */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
          <h2 className="text-lg font-semibold">
            {demos.find(demo => demo.id === activeDemo)?.label}
          </h2>
        </div>
        
        <div className="bg-white">
          {demos.find(demo => demo.id === activeDemo)?.component}
        </div>
      </div>

      {/* Multiple Elements Demo */}
      {activeDemo === 'base' && (
        <div className="mt-8 p-6 bg-white rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">مكونات Skeleton مختلفة:</h3>
          
          <div className="space-y-6">
            {/* Text Skeletons */}
            <div>
              <h4 className="font-medium mb-2">Text Skeletons:</h4>
              <div className="space-y-2">
                <SkeletonBase width="w-64" height="h-6" />
                <SkeletonBase width="w-48" height="h-4" />
                <SkeletonBase width="w-32" height="h-4" />
              </div>
            </div>

            {/* Button Skeletons */}
            <div>
              <h4 className="font-medium mb-2">Button Skeletons:</h4>
              <div className="flex gap-4">
                <SkeletonBase width="w-24" height="h-10" rounded="rounded-full" />
                <SkeletonBase width="w-32" height="h-10" rounded="rounded-lg" />
                <SkeletonBase width="w-20" height="h-8" rounded="rounded-md" />
              </div>
            </div>

            {/* Image Skeletons */}
            <div>
              <h4 className="font-medium mb-2">Image Skeletons:</h4>
              <div className="grid grid-cols-3 gap-4">
                <SkeletonBase width="w-full" height="h-32" rounded="rounded-lg" />
                <SkeletonBase width="w-full" height="h-24" rounded="rounded-full" />
                <SkeletonBase width="w-full" height="h-40" rounded="rounded-xl" />
              </div>
            </div>

            {/* Card Layout Skeletons */}
            <div>
              <h4 className="font-medium mb-2">Card Layout Skeletons:</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <SkeletonCard showImage={true} showButton={true} />
                <SkeletonCard showImage={false} showButton={true} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkeletonDemo; 
import React from 'react';

const SkeletonBase = ({
  className = '',
  width = 'w-full',
  height = 'h-4',
  rounded = 'rounded-md',
  animate = true,
}) => {
  return (
    <div
      className={`
        ${width} 
        ${height} 
        ${rounded} 
        bg-gradient-to-r from-gray-200 to-gray-300 
        ${animate ? 'animate-pulse' : ''} 
        ${className}
      `}
      role='status'
      aria-label='Loading'
    >
      <span className='sr-only'>Loading...</span>
    </div>
  );
};

export default SkeletonBase;

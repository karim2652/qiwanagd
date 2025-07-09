import React, { Suspense, memo } from 'react';
import LoadingSpinner from './LoadingSpinner';

// Generic loading fallback
const LoadingFallback = ({ text = 'جارٍ التحميل...', className = '' }) => (
  <div className={`flex items-center justify-center p-8 ${className}`}>
    <div className="text-center">
      <LoadingSpinner size="md" />
      <p className="mt-4 text-gray-600">{text}</p>
    </div>
  </div>
);

// Skeleton loader for different content types
const SkeletonLoader = memo(({ type = 'default', count = 1 }) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return (
          <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
          </div>
        );
      case 'image':
        return (
          <div className="bg-gray-200 rounded-lg animate-pulse aspect-video"></div>
        );
      case 'text':
        return (
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        );
      case 'blog':
        return (
          <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-6">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        );
      default:
        return (
          <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
        );
    }
  };

  return (
    <div className="space-y-4">
      {Array.from({ length: count }, (_, index) => (
        <div key={index}>{renderSkeleton()}</div>
      ))}
    </div>
  );
});

// Component loader with error boundary
const ComponentLoader = memo(({ 
  children, 
  fallback = null, 
  errorFallback = null,
  loadingText = 'جارٍ التحميل...',
  skeletonType = 'default',
  skeletonCount = 1,
  className = ''
}) => {
  const defaultFallback = fallback || (
    <SkeletonLoader type={skeletonType} count={skeletonCount} />
  );

  const defaultErrorFallback = errorFallback || (
    <div className={`text-center p-8 ${className}`}>
      <div className="text-red-500 mb-4">
        <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">خطأ في التحميل</h3>
      <p className="text-gray-600 mb-4">عذراً، حدث خطأ أثناء تحميل المحتوى</p>
      <button 
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        إعادة المحاولة
      </button>
    </div>
  );

  return (
    <ErrorBoundary fallback={defaultErrorFallback}>
      <Suspense fallback={defaultFallback}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
});

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Component loading error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

ComponentLoader.displayName = 'ComponentLoader';
SkeletonLoader.displayName = 'SkeletonLoader';

export default ComponentLoader;
export { SkeletonLoader, LoadingFallback }; 
import { createBrowserRouter, Navigate, Link } from 'react-router-dom';
import { Suspense, lazy, useEffect, createElement, memo } from 'react';
import MasterLayout from './../../Layout/MasterLayout';
import { SkeletonRouter } from '../ui/skeleton';

// تحسين مكون تتبع التنقل باستخدام memo
const NavigationTracker = memo(({ children }) => {
  useEffect(() => {
    // تحسين أداء التنقل من خلال تعيين حالة التنقل بطريقة مُحَسَّنة
    sessionStorage.setItem('isNavigating', 'true');

    // استخدام عناصر الأداء للتتبع
    if (window.performance && window.performance.mark) {
      window.performance.mark('navigation-start');
    }

    return () => {
      // تنظيف عند إلغاء التحميل
      sessionStorage.removeItem('isNavigating');

      // قياس أداء التنقل
      if (window.performance && window.performance.mark) {
        window.performance.mark('navigation-end');
        window.performance.measure('navigation-duration', 'navigation-start', 'navigation-end');
      }
    };
  }, []);

  return children;
});

NavigationTracker.displayName = 'NavigationTracker';

// محسن لتغليف المسارات كسولة التحميل
const LazyRoute = memo(({ component: Component }) => (
  <NavigationTracker>
    <Suspense fallback={<SkeletonRouter />}>
      <Component />
    </Suspense>
  </NavigationTracker>
));

LazyRoute.displayName = 'LazyRoute';

// مكون الخطأ
const ErrorPage = memo(() => (
  <div className='min-h-screen flex items-center justify-center bg-gray-100'>
    <div className='text-center p-8 bg-white rounded-lg shadow-lg max-w-md'>
      <h1 className='text-6xl font-bold text-[#F03E2F] mb-4'>404</h1>
      <p className='text-gray-700 text-xl mb-4'>الصفحة غير موجودة</p>
      <Link
        to='/'
        className='inline-block mt-2 px-6 py-2 bg-[#F03E2F] text-white rounded-lg hover:bg-red-600 transition-colors'
      >
        العودة للصفحة الرئيسية
      </Link>
    </div>
  </div>
));

ErrorPage.displayName = 'ErrorPage';

// تحميل الصفحات لاحقًا للحصول على أداء أفضل
const Home = lazy(() => import('../../pages/Home'));
const Blog = lazy(() => import('../../pages/Blog'));
const BlogDetails = lazy(() => import('../../pages/components/Blog/BlogDetails'));
const Services = lazy(() => import('../../pages/Services'));
const ServiceDetails = lazy(() => import('../../pages/components/Services/ServiceDetails'));
const Projects = lazy(() => import('../../pages/Projects'));
const Contact = lazy(() => import('../../pages/Contact'));
const Quote = lazy(() => import('../../pages/Quote'));
const Partners = lazy(() => import('../../pages/Partners'));

// تكوين الموجه بأداء فائق
const router = createBrowserRouter([
  {
    path: '/',
    element: <MasterLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LazyRoute component={Home} />,
      },
      {
        path: 'blog',
        element: <LazyRoute component={Blog} />,
      },
      {
        path: 'blog/:title',
        element: <LazyRoute component={BlogDetails} />,
      },
      {
        path: 'services',
        element: <LazyRoute component={Services} />,
      },
      {
        path: 'services/:title',
        element: <LazyRoute component={ServiceDetails} />,
      },
      {
        path: 'projects',
        element: <LazyRoute component={Projects} />,
      },
      {
        path: 'contact',
        element: <LazyRoute component={Contact} />,
      },
      {
        path: 'quote',
        element: <LazyRoute component={Quote} />,
      },
      {
        path: 'partners',
        element: <LazyRoute component={Partners} />,
      },
      { path: '*', element: <Navigate to='/' replace /> },
    ],
  },
]);

export default router;

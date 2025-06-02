import './App.css';
import { lazy, Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import router from './components/routing/routes';
import { ErrorBoundary } from 'react-error-boundary';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

// استدعاء Lazy Components بكفاءة عالية باستخدام preload
const FloatingButtonsLazy = lazy(() => import('./shared/FloatingButtons'));

// تحميل المكونات والمسارات المشتركة مسبقًا
const preloadRoutes = () => {
  // استعلامات المزاميرية للتحميل المسبق
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: no-preference)');

  // تحميل المكونات مسبقًا فقط إذا كان المستخدم لا يفضل تقليل الحركة
  if (mediaQuery.matches) {
    // نستخدم requestIdleCallback لتحميل المسارات عندما يكون المتصفح غير مشغول
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        // تحميل مسبق للمسارات الأكثر استخدامًا
        import('./pages/Home');
        import('./pages/Services');

        // تحميل المكونات الديناميكية المشتركة
        import('./shared/FloatingButtons');
      });
    }
  }
};

function App() {
  return (
    <div>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
      <HelmetProvider>
        <Suspense
          fallback={
            <div className='flex items-center justify-center min-h-screen'>
              <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary'></div>
            </div>
          }
        >
          <ErrorBoundary
            FallbackComponent={({ error, resetErrorBoundary }) => (
              <div className='flex flex-col items-center justify-center min-h-screen p-4 text-center'>
                <h2 className='text-xl font-semibold mb-2'>عذراً، حدث خطأ ما</h2>
                <p className='text-gray-600 mb-4'>يرجى تحديث الصفحة أو المحاولة مرة أخرى لاحقاً</p>
                <button
                  onClick={resetErrorBoundary}
                  className='px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors'
                >
                  تحديث الصفحة
                </button>
              </div>
            )}
          >
            <RouterProvider
              router={router}
              future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
              }}
            />
            <FloatingButtonsLazy />
          </ErrorBoundary>
        </Suspense>
      </HelmetProvider>
    </div>
  );
}

export default App;

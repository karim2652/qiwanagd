import React, { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from 'react-error-boundary';
import './i18n'; // Import i18n configuration
import App from './App.jsx';
import './index.css';
import GTMProvider from './components/GTMProvider';
import ContentProtection from './components/ContentProtection';

// Error fallback component
const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div role='alert' className='error-boundary'>
      <h2>Something went wrong:</h2>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

// Loading fallback component
const LoadingFallback = () => {
  return (
    <div className='loading-fallback'>
      <div className='loading-spinner'></div>
      <p>Loading...</p>
    </div>
  );
};

const root = createRoot(document.getElementById('root'));

// Register service worker for PWA
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
      });
      console.log('ServiceWorker registration successful with scope:', registration.scope);
    } catch (err) {
      console.error('ServiceWorker registration failed:', err);
    }
  });
}

root.render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
      <HelmetProvider>
        <GTMProvider>
          <ContentProtection>
            <Suspense fallback={<LoadingFallback />}>
              <App />
            </Suspense>
          </ContentProtection>
        </GTMProvider>
      </HelmetProvider>
    </ErrorBoundary>
  </StrictMode>
);

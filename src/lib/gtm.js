import TagManager from 'react-gtm-module';

const GTM_ID = 'GTM-MCR72RRL';

// Cache for GTM instance
let gtmInitialized = false;
let initializationAttempts = 0;
const MAX_INITIALIZATION_ATTEMPTS = 3;

// Development mode detection
const isDevelopment = import.meta.env?.DEV || process.env.NODE_ENV === 'development';

// Default dataLayer configuration
const defaultDataLayer = {
  pageType: 'home',
  environment: process.env.NODE_ENV,
  timestamp: new Date().toISOString(),
  userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : null,
};

// Initialize GTM with retry mechanism
export const initializeGTM = () => {
  if (gtmInitialized) return;
  if (typeof window === 'undefined') return;
  if (initializationAttempts >= MAX_INITIALIZATION_ATTEMPTS) return;

  // Skip initialization in development unless explicitly enabled
  if (isDevelopment && !import.meta.env.VITE_ENABLE_GTM_DEV) {
    console.log('GTM skipped in development mode');
    return;
  }

  initializationAttempts++;

  try {
    // Initialize TagManager with error handling
    TagManager.initialize({
      gtmId: GTM_ID,
      dataLayer: defaultDataLayer,
      events: {
        pageView: 'page_view',
        userInteraction: 'user_interaction',
      },
    });

    // Add GTM script with better error handling
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;

    script.onload = () => {
      gtmInitialized = true;
      console.log('GTM initialized successfully');

      // Send initial page view with error handling
      try {
        sendGTMEvent('page_view', {
          page_path: window.location.pathname,
          page_title: document.title,
          initialization_attempt: initializationAttempts,
        });
      } catch (error) {
        console.warn('Failed to send initial page view:', error);
      }
    };

    script.onerror = (error) => {
      gtmInitialized = false;
      console.warn('GTM script failed to load:', error);

      // Retry initialization after delay
      if (initializationAttempts < MAX_INITIALIZATION_ATTEMPTS) {
        setTimeout(() => {
          initializeGTM();
        }, 2000 * initializationAttempts);
      }
    };

    // Add noscript fallback
    const noscript = document.createElement('noscript');
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.googletagmanager.com/ns.html?id=${GTM_ID}`;
    iframe.height = '0';
    iframe.width = '0';
    iframe.style.display = 'none';
    iframe.style.visibility = 'hidden';
    noscript.appendChild(iframe);
    document.body.insertBefore(noscript, document.body.firstChild);

    // Append script to document
    document.head.appendChild(script);
  } catch (error) {
    gtmInitialized = false;
    console.warn('GTM initialization error:', error);
  }
};

// Enhanced event tracking with performance monitoring
export const sendGTMEvent = (eventName, eventData = {}) => {
  // Skip in development unless explicitly enabled
  if (isDevelopment && !import.meta.env.VITE_ENABLE_GTM_DEV) {
    console.log(`GTM Event (dev): ${eventName}`, eventData);
    return;
  }

  if (!gtmInitialized) {
    console.warn('GTM not initialized, event skipped:', eventName);
    return;
  }

  try {
    const startTime = performance.now();

    // Add network retry logic
    const sendWithRetry = (retries = 2) => {
      try {
        TagManager.dataLayer({
          dataLayer: {
            event: eventName,
            event_timestamp: new Date().toISOString(),
            event_duration: 0,
            ...eventData,
          },
        });
      } catch (error) {
        if (retries > 0) {
          console.warn(`GTM event retry (${retries} left):`, error);
          setTimeout(() => sendWithRetry(retries - 1), 1000);
        } else {
          console.warn('GTM event failed after retries:', error);
        }
      }
    };

    sendWithRetry();

    // Track event performance silently
    const duration = performance.now() - startTime;
    if (duration > 100) {
      // Silently track slow events without console output
      trackPerformance({
        name: 'slow_event',
        value: duration,
        delta: duration,
        id: eventName,
      });
    }
  } catch (error) {
    console.warn('GTM event error:', error);
  }
};

// Enhanced dataLayer management with validation
export const updateDataLayer = (data) => {
  // Skip in development unless explicitly enabled
  if (isDevelopment && !import.meta.env.VITE_ENABLE_GTM_DEV) {
    console.log('GTM DataLayer (dev):', data);
    return;
  }

  if (!gtmInitialized) {
    console.warn('GTM not initialized, dataLayer update skipped');
    return;
  }

  try {
    // Validate data before sending
    const sanitizedData = Object.entries(data).reduce((acc, [key, value]) => {
      if (value != null) {
        acc[key] = value;
      }
      return acc;
    }, {});

    TagManager.dataLayer({
      dataLayer: {
        ...sanitizedData,
        last_updated: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.warn('GTM dataLayer update error:', error);
  }
};

// SPA Page View Tracking
export const trackPageView = (path, title) => {
  if (!gtmInitialized && !isDevelopment) return;

  sendGTMEvent('page_view', {
    page_path: path,
    page_title: title,
    page_location: window.location.href,
    page_referrer: document.referrer,
  });
};

// User Interaction Tracking
export const trackUserInteraction = (interactionType, details = {}) => {
  if (!gtmInitialized && !isDevelopment) return;

  sendGTMEvent('user_interaction', {
    interaction_type: interactionType,
    ...details,
    timestamp: new Date().toISOString(),
  });
};

// Performance Monitoring
export const trackPerformance = (metric) => {
  if (!gtmInitialized && !isDevelopment) return;

  sendGTMEvent('performance_metric', {
    metric_name: metric.name,
    metric_value: metric.value,
    metric_delta: metric.delta,
    metric_id: metric.id,
  });
};

// GTM Status Check Function
export const checkGTMStatus = () => {
  const status = {
    isInitialized: gtmInitialized,
    hasGTMScript: !!document.querySelector('script[src*="googletagmanager.com/gtm.js"]'),
    hasDataLayer: typeof window !== 'undefined' && typeof window.dataLayer !== 'undefined',
    timestamp: new Date().toISOString(),
    isDevelopment,
    initializationAttempts,
  };

  // Send status to GTM for verification (only if initialized)
  if (status.isInitialized) {
    try {
      sendGTMEvent('gtm_status_check', status);
    } catch (error) {
      console.warn('GTM status check error:', error);
    }
  }

  return status;
};

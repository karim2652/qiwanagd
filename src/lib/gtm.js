import TagManager from 'react-gtm-module';

const GTM_ID = 'GTM-MCR72RRL';

// Cache for GTM instance
let gtmInitialized = false;
let initializationAttempts = 0;
const MAX_INITIALIZATION_ATTEMPTS = 3;

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

  initializationAttempts++;

  try {
    // Initialize TagManager
    TagManager.initialize({
      gtmId: GTM_ID,
      dataLayer: defaultDataLayer,
      events: {
        pageView: 'page_view',
        userInteraction: 'user_interaction',
      },
    });

    // Add GTM script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;

    script.onload = () => {
      gtmInitialized = true;
      // Send initial page view
      sendGTMEvent('page_view', {
        page_path: window.location.pathname,
        page_title: document.title,
        initialization_attempt: initializationAttempts,
      });
    };

    script.onerror = () => {
      gtmInitialized = false;
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
  }
};

// Enhanced event tracking with performance monitoring
export const sendGTMEvent = (eventName, eventData = {}) => {
  if (!gtmInitialized) return;

  try {
    const startTime = performance.now();

    TagManager.dataLayer({
      dataLayer: {
        event: eventName,
        event_timestamp: new Date().toISOString(),
        event_duration: 0,
        ...eventData,
      },
    });

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
    // Silently handle errors
  }
};

// Enhanced dataLayer management with validation
export const updateDataLayer = (data) => {
  if (!gtmInitialized) return;

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
    // Silently handle errors
  }
};

// SPA Page View Tracking
export const trackPageView = (path, title) => {
  if (!gtmInitialized) return;

  sendGTMEvent('page_view', {
    page_path: path,
    page_title: title,
    page_location: window.location.href,
    page_referrer: document.referrer,
  });
};

// User Interaction Tracking
export const trackUserInteraction = (interactionType, details = {}) => {
  if (!gtmInitialized) return;

  sendGTMEvent('user_interaction', {
    interaction_type: interactionType,
    ...details,
    timestamp: new Date().toISOString(),
  });
};

// Performance Monitoring
export const trackPerformance = (metric) => {
  if (!gtmInitialized) return;

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
    hasDataLayer: typeof window.dataLayer !== 'undefined',
    timestamp: new Date().toISOString(),
  };

  // Send status to GTM for verification
  if (status.isInitialized) {
    try {
      sendGTMEvent('gtm_status_check', status);
    } catch (error) {
      // Silently handle errors
    }
  }

  return status;
};

import { sendGTMEvent } from '../gtm';
import {
  EVENT_CATEGORIES,
  EVENT_ACTIONS,
  EVENT_LABELS,
  CUSTOM_DIMENSIONS,
  CUSTOM_METRICS,
  buildEvent,
  getCommonParams,
} from './events';

// Performance Tracking
let performanceObserver;
let scrollDepthObserver;
let timeOnPageStart;

// Initialize performance tracking
export const initPerformanceTracking = () => {
  // Track Web Vitals
  if ('PerformanceObserver' in window) {
    performanceObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        trackPerformanceMetric(entry);
      }
    });

    performanceObserver.observe({
      entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'],
    });
  }

  // Track scroll depth
  initScrollDepthTracking();

  // Track time on page
  initTimeOnPageTracking();
};

// Track performance metrics
const trackPerformanceMetric = (metric) => {
  const event = buildEvent(
    EVENT_CATEGORIES.PERFORMANCE,
    EVENT_ACTIONS.PERFORMANCE_METRIC,
    metric.name,
    metric.value,
    {
      metric_id: metric.id,
      metric_delta: metric.delta,
      metric_rating: metric.rating,
      ...getCommonParams(),
    }
  );
  sendGTMEvent('performance_metric', event);
};

// Track scroll depth
const initScrollDepthTracking = () => {
  let maxScroll = 0;
  const scrollThresholds = [25, 50, 75, 90];

  window.addEventListener('scroll', () => {
    const scrollPercent = Math.round(
      ((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight) * 100
    );

    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;
      scrollThresholds.forEach((threshold) => {
        if (scrollPercent >= threshold && maxScroll < threshold + 25) {
          trackScrollDepth(threshold);
        }
      });
    }
  });
};

const trackScrollDepth = (depth) => {
  const event = buildEvent(
    EVENT_CATEGORIES.ENGAGEMENT,
    EVENT_ACTIONS.SCROLL,
    `scroll_depth_${depth}`,
    depth,
    {
      ...getCommonParams(),
      [CUSTOM_METRICS.SCROLL_DEPTH]: depth,
    }
  );
  sendGTMEvent('scroll_depth', event);
};

// Track time on page
const initTimeOnPageTracking = () => {
  timeOnPageStart = Date.now();
  const timeThresholds = [30, 60, 120, 300]; // seconds

  timeThresholds.forEach((threshold) => {
    setTimeout(() => {
      trackTimeOnPage(threshold);
    }, threshold * 1000);
  });

  // Track time on page before unload
  window.addEventListener('beforeunload', () => {
    const timeSpent = Math.round((Date.now() - timeOnPageStart) / 1000);
    trackTimeOnPage(timeSpent);
  });
};

const trackTimeOnPage = (seconds) => {
  const event = buildEvent(
    EVENT_CATEGORIES.ENGAGEMENT,
    'time_on_page',
    `time_spent_${seconds}s`,
    seconds,
    {
      ...getCommonParams(),
      [CUSTOM_METRICS.TIME_ON_PAGE]: seconds,
    }
  );
  sendGTMEvent('time_on_page', event);
};

// Track user interactions
export const trackUserInteraction = (element, action, label = null, value = null) => {
  const event = buildEvent(EVENT_CATEGORIES.ENGAGEMENT, action, label, value, {
    element_id: element.id,
    element_class: element.className,
    element_type: element.tagName.toLowerCase(),
    element_text: element.textContent?.trim().substring(0, 100),
    ...getCommonParams(),
  });
  sendGTMEvent('user_interaction', event);
};

// Track form interactions
export const trackFormInteraction = (form, action, label = null, value = null) => {
  const formData = new FormData(form);
  const formValues = {};
  formData.forEach((value, key) => {
    formValues[key] = value;
  });

  const event = buildEvent(EVENT_CATEGORIES.FORM, action, label, value, {
    form_id: form.id,
    form_name: form.name,
    form_action: form.action,
    form_method: form.method,
    form_values: formValues,
    ...getCommonParams(),
  });
  sendGTMEvent('form_interaction', event);
};

// Track content views
export const trackContentView = (content, type = EVENT_LABELS.ARTICLE) => {
  const event = buildEvent(EVENT_CATEGORIES.CONTENT, EVENT_ACTIONS.CONTENT_VIEW, type, null, {
    content_id: content.id,
    content_title: content.title,
    content_type: type,
    content_url: content.url,
    ...getCommonParams(),
  });
  sendGTMEvent('content_view', event);
};

// Track errors
export const trackError = (error, type = EVENT_LABELS.API_ERROR) => {
  const event = buildEvent(EVENT_CATEGORIES.ERROR, EVENT_ACTIONS.ERROR_OCCURRED, type, null, {
    error_message: error.message,
    error_stack: error.stack,
    error_type: type,
    ...getCommonParams(),
  });
  sendGTMEvent('error', event);
};

// Track page views with enhanced data
export const trackPageView = (path, title) => {
  const event = buildEvent(EVENT_CATEGORIES.NAVIGATION, EVENT_ACTIONS.PAGE_VIEW, path, null, {
    page_type: getPageType(path),
    previous_page: document.referrer,
    ...getCommonParams(),
  });
  sendGTMEvent('page_view', event);
};

// Helper function to determine page type
const getPageType = (path) => {
  if (path === '/') return EVENT_LABELS.HOME;
  if (path.startsWith('/blog')) return EVENT_LABELS.BLOG;
  if (path.startsWith('/services')) return EVENT_LABELS.SERVICES;
  if (path.startsWith('/contact')) return EVENT_LABELS.CONTACT;
  return 'other';
};

// Cleanup function
export const cleanupTracking = () => {
  if (performanceObserver) {
    performanceObserver.disconnect();
  }
  timeOnPageStart = null;
};

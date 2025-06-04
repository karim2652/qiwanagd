// Event Categories
export const EVENT_CATEGORIES = {
  ENGAGEMENT: 'engagement',
  NAVIGATION: 'navigation',
  PERFORMANCE: 'performance',
  ERROR: 'error',
  FORM: 'form',
  CONTENT: 'content',
  USER: 'user',
  ECOMMERCE: 'ecommerce',
};

// Event Actions
export const EVENT_ACTIONS = {
  // Engagement
  CLICK: 'click',
  SCROLL: 'scroll',
  VIEW: 'view',
  HOVER: 'hover',
  SEARCH: 'search',

  // Navigation
  PAGE_VIEW: 'page_view',
  ROUTE_CHANGE: 'route_change',
  MENU_CLICK: 'menu_click',

  // Form
  FORM_START: 'form_start',
  FORM_COMPLETE: 'form_complete',
  FORM_ERROR: 'form_error',

  // Content
  CONTENT_VIEW: 'content_view',
  CONTENT_CLICK: 'content_click',
  CONTENT_SHARE: 'content_share',

  // User
  USER_LOGIN: 'user_login',
  USER_SIGNUP: 'user_signup',
  USER_LOGOUT: 'user_logout',

  // Error
  ERROR_OCCURRED: 'error_occurred',

  // Performance
  PERFORMANCE_METRIC: 'performance_metric',
};

// Event Labels
export const EVENT_LABELS = {
  // Navigation
  HOME: 'home',
  ABOUT: 'about',
  CONTACT: 'contact',
  SERVICES: 'services',
  BLOG: 'blog',

  // Content Types
  ARTICLE: 'article',
  VIDEO: 'video',
  IMAGE: 'image',
  DOCUMENT: 'document',

  // Form Types
  CONTACT_FORM: 'contact_form',
  SUBSCRIPTION_FORM: 'subscription_form',
  FEEDBACK_FORM: 'feedback_form',

  // Error Types
  API_ERROR: 'api_error',
  VALIDATION_ERROR: 'validation_error',
  NETWORK_ERROR: 'network_error',
};

// Custom Dimensions
export const CUSTOM_DIMENSIONS = {
  USER_TYPE: 'user_type',
  USER_ROLE: 'user_role',
  CONTENT_TYPE: 'content_type',
  PAGE_TYPE: 'page_type',
  DEVICE_TYPE: 'device_type',
  BROWSER: 'browser',
  LANGUAGE: 'language',
};

// Custom Metrics
export const CUSTOM_METRICS = {
  SCROLL_DEPTH: 'scroll_depth',
  TIME_ON_PAGE: 'time_on_page',
  INTERACTION_COUNT: 'interaction_count',
  ERROR_COUNT: 'error_count',
};

// Event Builder
export const buildEvent = (category, action, label = null, value = null, customParams = {}) => ({
  event_category: category,
  event_action: action,
  event_label: label,
  event_value: value,
  timestamp: new Date().toISOString(),
  ...customParams,
});

// Common Event Parameters
export const getCommonParams = () => ({
  page_url: window.location.href,
  page_path: window.location.pathname,
  page_title: document.title,
  referrer: document.referrer,
  user_agent: navigator.userAgent,
  language: navigator.language,
  screen_resolution: `${window.screen.width}x${window.screen.height}`,
  viewport_size: `${window.innerWidth}x${window.innerHeight}`,
  device_type: /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile/.test(navigator.userAgent)
    ? 'mobile'
    : 'desktop',
  environment: import.meta.env.MODE,
});

import React, { useEffect, useRef } from 'react';
import { initializeGTM, trackPageView, checkGTMStatus } from '../lib/gtm';
import {
  initPerformanceTracking,
  trackUserInteraction,
  trackFormInteraction,
  trackContentView,
  trackError,
  cleanupTracking,
} from '../lib/analytics/tracking';

const GTMProvider = ({ children }) => {
  const initialized = useRef(false);

  useEffect(() => {
    // Prevent double initialization in development mode
    if (initialized.current) return;
    initialized.current = true;

    // Check if we're in development mode
    const isDevelopment = import.meta.env.DEV || process.env.NODE_ENV === 'development';

    // Skip GTM initialization if in development and not explicitly enabled
    if (isDevelopment && !import.meta.env.VITE_ENABLE_GTM_DEV) {
      console.log('GTM disabled in development mode. Set VITE_ENABLE_GTM_DEV=true to enable.');
      return;
    }

    // Initialize GTM with error handling
    try {
      initializeGTM();
    } catch (error) {
      console.warn('GTM initialization failed:', error);
      return;
    }

    // Initialize performance tracking with error handling
    try {
      initPerformanceTracking();
    } catch (error) {
      console.warn('Performance tracking initialization failed:', error);
    }

    // Add global event listeners for enhanced tracking
    const setupGlobalTracking = () => {
      try {
        // Track all button clicks
        document.addEventListener('click', (e) => {
          try {
            const target = e.target.closest('button, a, [role="button"]');
            if (target) {
              trackUserInteraction(target, 'click', target.textContent?.trim());
            }
          } catch (error) {
            // Silently ignore tracking errors
          }
        });

        // Track all form submissions
        document.addEventListener('submit', (e) => {
          try {
            if (e.target.tagName === 'FORM') {
              trackFormInteraction(e.target, 'submit', e.target.id || 'form');
            }
          } catch (error) {
            // Silently ignore tracking errors
          }
        });

        // Track all form field interactions
        document.addEventListener(
          'focus',
          (e) => {
            try {
              if (
                e.target.tagName === 'INPUT' ||
                e.target.tagName === 'TEXTAREA' ||
                e.target.tagName === 'SELECT'
              ) {
                trackFormInteraction(e.target.form, 'field_focus', e.target.name || 'field');
              }
            } catch (error) {
              // Silently ignore tracking errors
            }
          },
          true
        );

        // Track all content views
        if ('IntersectionObserver' in window) {
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                try {
                  if (entry.isIntersecting) {
                    const element = entry.target;
                    if (element.dataset.trackContent) {
                      trackContentView(
                        {
                          id: element.id,
                          title: element.dataset.contentTitle,
                          url: element.dataset.contentUrl,
                        },
                        element.dataset.contentType
                      );
                    }
                  }
                } catch (error) {
                  // Silently ignore tracking errors
                }
              });
            },
            { threshold: 0.5 }
          );

          // Observe all elements with data-track-content attribute
          document.querySelectorAll('[data-track-content]').forEach((element) => {
            observer.observe(element);
          });
        }

        // Track global errors (only in production or when explicitly enabled)
        if (!isDevelopment || import.meta.env.VITE_ENABLE_ERROR_TRACKING) {
          window.addEventListener('error', (e) => {
            try {
              trackError(e.error || new Error(e.message), 'runtime_error');
            } catch (error) {
              // Silently ignore tracking errors
            }
          });

          window.addEventListener('unhandledrejection', (e) => {
            try {
              trackError(e.reason, 'promise_error');
            } catch (error) {
              // Silently ignore tracking errors
            }
          });
        }
      } catch (error) {
        console.warn('Failed to setup global tracking:', error);
      }
    };

    // Setup global tracking after GTM initialization
    setTimeout(setupGlobalTracking, 1000);

    // Verify GTM status after initialization (only in production)
    if (!isDevelopment) {
      const verifyGTM = () => {
        try {
          const status = checkGTMStatus();
          if (!status.isInitialized) {
            setTimeout(() => {
              initializeGTM();
            }, 2000);
          }
        } catch (error) {
          console.warn('GTM status verification failed:', error);
        }
      };

      // Initial verification with delay to ensure script is loaded
      setTimeout(verifyGTM, 1000);
    }

    // Track route changes for SPA
    const handleRouteChange = () => {
      try {
        trackPageView(window.location.pathname, document.title);
      } catch (error) {
        // Silently ignore tracking errors
      }
    };

    window.addEventListener('popstate', handleRouteChange);

    // Cleanup function
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      try {
        cleanupTracking();
      } catch (error) {
        // Silently ignore cleanup errors
      }
    };
  }, []); // Empty dependency array means this runs once on mount

  return children;
};

export default GTMProvider;

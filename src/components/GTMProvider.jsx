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

    // Initialize GTM
    initializeGTM();

    // Initialize performance tracking
    initPerformanceTracking();

    // Add global event listeners for enhanced tracking
    const setupGlobalTracking = () => {
      // Track all button clicks
      document.addEventListener('click', (e) => {
        const target = e.target.closest('button, a, [role="button"]');
        if (target) {
          trackUserInteraction(target, 'click', target.textContent?.trim());
        }
      });

      // Track all form submissions
      document.addEventListener('submit', (e) => {
        if (e.target.tagName === 'FORM') {
          trackFormInteraction(e.target, 'submit', e.target.id || 'form');
        }
      });

      // Track all form field interactions
      document.addEventListener(
        'focus',
        (e) => {
          if (
            e.target.tagName === 'INPUT' ||
            e.target.tagName === 'TEXTAREA' ||
            e.target.tagName === 'SELECT'
          ) {
            trackFormInteraction(e.target.form, 'field_focus', e.target.name || 'field');
          }
        },
        true
      );

      // Track all content views
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
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
          });
        },
        { threshold: 0.5 }
      );

      // Observe all elements with data-track-content attribute
      document.querySelectorAll('[data-track-content]').forEach((element) => {
        observer.observe(element);
      });

      // Track global errors
      window.addEventListener('error', (e) => {
        trackError(e.error || new Error(e.message), 'runtime_error');
      });

      window.addEventListener('unhandledrejection', (e) => {
        trackError(e.reason, 'promise_error');
      });
    };

    // Setup global tracking after GTM initialization
    setTimeout(setupGlobalTracking, 1000);

    // Verify GTM status after initialization
    const verifyGTM = () => {
      const status = checkGTMStatus();
      if (!status.isInitialized) {
        setTimeout(() => {
          initializeGTM();
        }, 2000);
      }
    };

    // Initial verification with delay to ensure script is loaded
    setTimeout(verifyGTM, 1000);

    // Track route changes for SPA
    const handleRouteChange = () => {
      trackPageView(window.location.pathname, document.title);
    };

    window.addEventListener('popstate', handleRouteChange);

    // Cleanup function
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      cleanupTracking();
    };
  }, []); // Empty dependency array means this runs once on mount

  return children;
};

export default GTMProvider;

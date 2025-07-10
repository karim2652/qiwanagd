import { useEffect, useCallback } from 'react';

const PerformanceOptimizer = () => {
  // تحسين التحميل المسبق للموارد المهمة
  const preloadCriticalResources = useCallback(() => {
    // تحميل مسبق للخطوط المهمة
    const fontLinks = [
      'https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700;800;900&display=swap',
      'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap'
    ];

    fontLinks.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = href;
      link.onload = () => {
        link.rel = 'stylesheet';
      };
      document.head.appendChild(link);
    });

    // تحميل مسبق للصور المهمة
    const criticalImages = [
      '/assets/images/logo/Capture.webp',
      '/assets/images/home/1.webp'
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }, []);

  // تحسين أداء التمرير
  const optimizeScrollPerformance = useCallback(() => {
    let ticking = false;

    const updateScroll = () => {
      // تحسين أداء التمرير
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', requestTick, { passive: true });

    return () => {
      window.removeEventListener('scroll', requestTick);
      window.removeEventListener('resize', requestTick);
    };
  }, []);

  // تحسين أداء الذاكرة
  const optimizeMemoryUsage = useCallback(() => {
    // تنظيف الذاكرة عند تغيير الصفحة
    const cleanup = () => {
      if ('memory' in performance) {
        const memory = performance.memory;
        if (memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.8) {
          // تحذير من استهلاك الذاكرة العالي
          console.warn('High memory usage detected');
        }
      }
    };

    window.addEventListener('beforeunload', cleanup);
    return () => window.removeEventListener('beforeunload', cleanup);
  }, []);

  // تحسين أداء الشبكة
  const optimizeNetworkPerformance = useCallback(() => {
    // إضافة headers للتحسين
    if ('connection' in navigator) {
      const connection = navigator.connection;
      if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
        // تحسين للاتصالات البطيئة
        document.documentElement.classList.add('slow-connection');
      }
    }
  }, []);

  useEffect(() => {
    // تطبيق التحسينات عند تحميل الصفحة
    preloadCriticalResources();
    const scrollCleanup = optimizeScrollPerformance();
    const memoryCleanup = optimizeMemoryUsage();
    optimizeNetworkPerformance();

    return () => {
      scrollCleanup();
      memoryCleanup();
    };
  }, [preloadCriticalResources, optimizeScrollPerformance, optimizeMemoryUsage, optimizeNetworkPerformance]);

  // تحسين أداء التحميل المسبق للمسارات
  useEffect(() => {
    const preloadRoutes = () => {
      // تحميل مسبق للمسارات المهمة عند عدم استخدام المتصفح
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => {
          // تحميل مسبق للمسارات الأكثر استخداماً
          const routes = ['/services', '/projects', '/contact'];
          routes.forEach(route => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = route;
            document.head.appendChild(link);
          });
        });
      }
    };

    // تأخير التحميل المسبق لتحسين الأداء الأولي
    const timer = setTimeout(preloadRoutes, 2000);
    return () => clearTimeout(timer);
  }, []);

  return null; // مكون غير مرئي
};

export default PerformanceOptimizer; 
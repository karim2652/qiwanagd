import React, { useEffect, useState, memo } from "react";
import { useTranslation } from "react-i18next";

// تم تحسين المكون باستخدام memo لتجنب إعادة الرسم غير الضرورية
const LoadingSpinner = memo(() => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [showLoader, setShowLoader] = useState(false);

  // استخدام React.lazy وأداء متفوق
  useEffect(() => {
    let mounted = true;

    // تحقق مما إذا كان هذا تحميل أولي للصفحة أو تنقل
    const checkNavigation = () => {
      // الكشف عن حالة التنقل بطريقة محسنة
      const perfEntries = performance.getEntriesByType("navigation");

      // للمتصفحات الحديثة، نتحقق مما إذا كان هذا تحميل مباشر أو إعادة تحميل
      if (perfEntries.length > 0) {
        const navType = perfEntries[0].type;
        // لا نظهر المؤشر إلا في حالة التنقل، وليس في حالة إعادة التحميل
        if (
          navType !== "reload" &&
          sessionStorage.getItem("isNavigating") === "true"
        ) {
          mounted && setShowLoader(true);
        }
      } else {
        // طريقة بديلة للمتصفحات الأقدم
        if (sessionStorage.getItem("isNavigating") === "true") {
          mounted && setShowLoader(true);
        }
      }
    };

    checkNavigation();

    // إزالة المؤشر سريعًا جدًا
    const timer = setTimeout(() => {
      mounted && setShowLoader(false);
    }, 200);

    return () => {
      mounted = false;
      clearTimeout(timer);
      sessionStorage.removeItem("isNavigating");
    };
  }, []);

  // لا نقوم بإرجاع أي شيء إذا لم نكن نريد إظهار مؤشر التحميل
  if (!showLoader) return null;

  // مؤشر بسيط وخفيف جدًا للأداء الممتاز
  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-1">
      <div className="h-full bg-gradient-to-r from-[#F03E2F] to-[#FF7D72] animate-loadingBar" />
    </div>
  );
});

LoadingSpinner.displayName = "LoadingSpinner";

export default LoadingSpinner;

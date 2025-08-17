import { Fragment, useState, useEffect, Suspense, useRef, useCallback } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Phone, ArrowUpRight, Globe2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SkeletonBase, SkeletonNavbar } from '../../components/ui/skeleton';
import logoAr from '../../assets/images/logo/2.svg';
import logoEn from '../../assets/images/logo/4.svg';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { sendGTMEvent } from '../../lib/gtm';

/**
 * Navigation items configuration
 * تكوين عناصر التنقل
 */
const navigation = [
  { nameKey: 'navigation.home', to: '/' },
  { nameKey: 'navigation.services', to: '/services' },
  { nameKey: 'navigation.projects', to: '/projects' },
  { nameKey: 'navigation.blog', to: '/blog' },
  { nameKey: 'navigation.contact', to: '/contact' },
];

/**
 * Language configuration with flags and labels
 * تكوين اللغات مع الأعلام والتسميات
 */
const LANGUAGES = [
  {
    code: 'ar',
    label: 'العربية',
    short: 'AR',
    flag: (
      <svg width='20' height='20' viewBox='0 0 60 40' className='rounded-full'>
        <rect width='60' height='40' fill='#198754' rx='8' />
        <g>
          <text
            x='30'
            y='22'
            textAnchor='middle'
            fontSize='13'
            fontFamily="'Amiri', serif"
            fill='#fff'
            fontWeight='bold'
            style={{ letterSpacing: '-1px' }}
          >
            لا إله إلا الله محمد رسول الله
          </text>
          <rect x='15' y='28' width='30' height='3' rx='1.5' fill='#fff' />
          <rect x='41' y='29' width='7' height='1' rx='0.5' fill='#198754' />
        </g>
      </svg>
    ),
  },
  {
    code: 'en',
    label: 'English',
    short: 'EN',
    flag: (
      <svg width='20' height='20' viewBox='0 0 20 20' className='rounded-full'>
        <rect width='20' height='20' fill='#00247d' />
        <rect y='8' width='20' height='4' fill='#fff' />
        <rect x='8' width='4' height='20' fill='#fff' />
        <rect y='9' width='20' height='2' fill='#cf142b' />
        <rect x='9' width='2' height='20' fill='#cf142b' />
      </svg>
    ),
  },
];

/**
 * Main Navigation Component
 * المكون الرئيسي للتنقل
 */
export default function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [lang, setLang] = useState(() => {
    // استرجاع اللغة من localStorage أو استخدام اللغة الافتراضية
    return localStorage.getItem('i18nextLng') || 'ar';
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const wasOpen = useRef(false);

  /**
   * Handle scroll effect for navbar styling
   * التعامل مع تأثير التمرير لتنسيق الناف بار
   */
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // تحميل اللغة عند بدء التطبيق
  useEffect(() => {
    const savedLang = localStorage.getItem('i18nextLng');
    if (savedLang) {
      setLang(savedLang);
      document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = savedLang;
    }
  }, []);

  // تغيير اتجاه الصفحة عند تغيير اللغة
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  /**
   * Handle language switching with error handling
   * التعامل مع تبديل اللغة مع معالجة الأخطاء
   */
  const handleLangSwitch = useCallback(
    async (code) => {
      try {
        setIsLoading(true);
        if (i18n && typeof i18n.changeLanguage === 'function') {
          await i18n.changeLanguage(code);
        } else {
          console.error('خطأ: دالة تغيير اللغة غير متوفرة');
          // إعادة تحميل الصفحة كحل بديل
          localStorage.setItem('i18nextLng', code);
          window.location.reload();
          return;
        }
        localStorage.setItem('i18nextLng', code);
        setLang(code);
      } catch (error) {
        console.error('خطأ أثناء تغيير اللغة:', error);
        // إعادة تحميل الصفحة كحل بديل في حالة حدوث خطأ
        localStorage.setItem('i18nextLng', code);
        window.location.reload();
      } finally {
        setIsLoading(false);
      }
    },
    [i18n]
  );

  /**
   * Handle phone call click with tracking
   * التعامل مع النقر على الاتصال مع التتبع
   */
  const handlePhoneClick = useCallback(
    (e) => {
      try {
        sendGTMEvent('phone_call_click', {
          button_text: t('navigation.call_us', 'اتصل بنا'),
          page_path: window.location.pathname,
          button_location: 'Navbar',
          phone_number: '+966548240556',
          language: lang,
        });
      } catch (error) {
        // Silently handle tracking errors
        console.warn('Phone click tracking failed:', error);
      }
    },
    [t, lang]
  );

  /**
   * Check if navigation item is active
   * التحقق من أن عنصر التنقل نشط
   */
  const isActiveRoute = useCallback(
    (path) => {
      if (path === '/') {
        return location.pathname === '/';
      }
      return location.pathname.startsWith(path);
    },
    [location.pathname]
  );

  if (isLoading) {
    return <SkeletonNavbar />;
  }

  return (
    <Disclosure
      as='nav'
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100'
          : 'bg-[#f5f9f9] shadow-sm'
      }`}
    >
      {({ open, close }) => {
        // تحكم في إظهار المنيو بناءً على open
        useEffect(() => {
          if (open) {
            setShowMobileMenu(true);
            wasOpen.current = true;
          }
        }, [open]);

        return (
          <>
            <motion.div
              className='mx-auto max-w-7xl px-3 sm:px-4 lg:px-6 xl:px-8'
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className='flex h-14 lg:h-16 xl:h-20 justify-between items-center'>
                {/* Logo */}
                <motion.div
                  className='relative h-8 w-[80px] lg:h-10 lg:w-[100px] xl:h-14 xl:w-[120px]'
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Link to='/' aria-label={t('home.company_name', 'قوى نجد')}>
                    <Suspense
                      fallback={
                        <SkeletonBase width='w-full' height='h-full' rounded='rounded-lg' />
                      }
                    >
                      <LazyLoadImage
                        src={lang === 'ar' ? logoAr : logoEn}
                        alt='Qiwa Najd Logo'
                        effect='blur'
                        className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-auto object-contain'
                        wrapperClassName='w-full h-full'
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = lang === 'ar' ? logoAr : logoEn;
                        }}
                      />
                    </Suspense>
                  </Link>
                </motion.div>

                {/* Desktop Navigation */}
                <div className='hidden lg:flex gap-3 xl:gap-4'>
                  {navigation.map((item) => (
                    <motion.div
                      key={item.nameKey}
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Link
                        to={item.to}
                        className={`relative text-xs lg:text-sm font-medium transition-all duration-300 px-2 py-1.5 lg:px-2 lg:py-2 rounded-lg ${
                          lang === 'ar' ? 'font-arabic' : 'font-english'
                        } ${
                          isActiveRoute(item.to)
                            ? 'text-[#F03E2F] font-bold'
                            : 'text-gray-700 hover:text-[#F03E2F]'
                        }`}
                      >
                        {t(item.nameKey)}
                        {isActiveRoute(item.to) && (
                          <motion.span
                            className='absolute -bottom-1 left-0 w-full h-0.5 bg-[#F03E2F] rounded-full'
                            layoutId='navIndicator'
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Desktop Actions */}
                <div className='hidden lg:flex items-center gap-2 xl:gap-3'>
                  {/* Phone */}
                  <motion.div
                    className='flex items-center gap-1.5 lg:gap-2'
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <span className='flex items-center justify-center w-6 h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 rounded-full bg-white shadow text-black'>
                      <Phone
                        size={12}
                        className='lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4'
                        aria-hidden='true'
                      />
                    </span>
                    <a
                      href='tel:+966548240556'
                      className={`font-medium text-black text-xs tracking-wide hover:text-[#F03E2F] transition-colors duration-300 ${
                        lang === 'ar' ? 'font-arabic text-right' : 'font-english'
                      }`}
                      dir={lang === 'ar' ? 'ltr' : 'auto'}
                      onClick={handlePhoneClick}
                      aria-label={t('navigation.call_us', 'اتصل بنا')}
                    >
                      +966548240556
                    </a>
                  </motion.div>

                  {/* Request a quote */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Link
                      to='/quote'
                      className={`flex items-center border border-black rounded-full px-2.5 py-1 lg:px-3 lg:py-1.5 xl:px-4 xl:py-2 bg-white hover:bg-gray-50 transition-all duration-300 group ${
                        lang === 'ar' ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <span
                        className={`font-medium text-black text-xs ${lang === 'ar' ? 'mr-1.5 lg:mr-2' : 'mr-1.5 lg:mr-2'}`}
                      >
                        {t('home.request_quote')}
                      </span>
                      <motion.span
                        className='flex items-center justify-center w-3.5 h-3.5 lg:w-4 lg:h-4 xl:w-5 xl:h-5 rounded-full bg-[#F03E2F] text-white group-hover:bg-red-700 transition'
                        whileHover={{ rotate: 45 }}
                      >
                        <ArrowUpRight size={8} className='lg:w-2.5 lg:h-2.5 xl:w-3 xl:h-3' />
                      </motion.span>
                    </Link>
                  </motion.div>

                  {/* Language Switcher */}
                  <div className='hidden lg:block'>
                    <motion.div
                      className='flex items-center gap-1 bg-white p-1 rounded-full shadow-sm border border-gray-100'
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <motion.button
                        onClick={() => handleLangSwitch('ar')}
                        className={`flex items-center gap-1 px-1.5 py-0.5 lg:px-2 lg:py-1 rounded-full transition-all duration-300 ${
                          lang === 'ar'
                            ? 'bg-[#F03E2F] text-white shadow-sm'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                        whileTap={{ scale: 0.95 }}
                        disabled={isLoading}
                        aria-label='Switch to Arabic'
                      >
                        <span className='text-xs lg:text-sm'>{LANGUAGES[0].flag}</span>
                        <span className='text-xs font-medium hidden xl:block'>العربية</span>
                      </motion.button>
                      <motion.button
                        onClick={() => handleLangSwitch('en')}
                        className={`flex items-center gap-1 px-1.5 py-0.5 lg:px-2 lg:py-1 rounded-full transition-all duration-300 ${
                          lang === 'en'
                            ? 'bg-[#F03E2F] text-white shadow-sm'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                        whileTap={{ scale: 0.95 }}
                        disabled={isLoading}
                        aria-label='Switch to English'
                      >
                        <span className='text-xs lg:text-sm'>{LANGUAGES[1].flag}</span>
                        <span className='text-xs font-medium hidden xl:block'>English</span>
                      </motion.button>
                    </motion.div>
                  </div>
                </div>

                {/* Mobile menu button */}
                <motion.div className='flex lg:hidden' whileTap={{ scale: 0.95 }}>
                  <Disclosure.Button className='inline-flex items-center justify-center rounded-lg p-2 sm:p-3 text-gray-700 hover:bg-blue-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-all duration-200'>
                    <span className='sr-only'>Open main menu</span>
                    {open ? (
                      <XMarkIcon className='block h-6 w-6 sm:h-7 sm:w-7' aria-hidden='true' />
                    ) : (
                      <Bars3Icon className='block h-6 w-6 sm:h-7 sm:w-7' aria-hidden='true' />
                    )}
                  </Disclosure.Button>
                </motion.div>
              </div>
            </motion.div>

            {/* Mobile menu */}
            <AnimatePresence onExitComplete={() => setShowMobileMenu(false)}>
              {showMobileMenu && open && (
                <Disclosure.Panel
                  static
                  as={motion.div}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className='lg:hidden bg-white/95 backdrop-blur-md overflow-hidden border-t border-gray-100'
                >
                  <div className='flex flex-col gap-1 px-3 pt-2 pb-3 sm:px-4 sm:pt-3 sm:pb-4'>
                    {navigation.map((item, index) => (
                      <motion.div
                        key={item.nameKey}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Link
                          to={item.to}
                          className={`block relative font-medium px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm transition-all duration-200 ${
                            isActiveRoute(item.to)
                              ? 'text-[#F03E2F] font-bold'
                              : 'text-gray-700 hover:text-[#F03E2F]'
                          }`}
                          onClick={() => open && close()}
                        >
                          {t(item.nameKey)}
                        </Link>
                      </motion.div>
                    ))}

                    {/* Mobile actions */}
                    <motion.div
                      className='flex flex-col gap-2 mt-3 pt-3 border-t border-gray-100 sm:gap-3 sm:mt-4 sm:pt-4'
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      {/* Phone */}
                      <div className='flex items-center gap-2 p-2 bg-gray-50 rounded-lg sm:gap-3 sm:p-3'>
                        <span className='flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white shadow text-black'>
                          <Phone size={12} className='sm:w-3.5 sm:h-3.5' aria-hidden='true' />
                        </span>
                        <a
                          href='tel:+966548240556'
                          className={`font-medium text-black text-xs tracking-wide hover:text-[#F03E2F] transition-colors duration-300 ${
                            lang === 'ar' ? 'font-arabic text-right' : 'font-english'
                          }`}
                          dir={lang === 'ar' ? 'ltr' : 'auto'}
                          onClick={handlePhoneClick}
                          aria-label={t('navigation.call_us', 'اتصل بنا')}
                        >
                          +966548240556
                        </a>
                      </div>

                      {/* Request Quote */}
                      <Link
                        to='/quote'
                        onClick={() => open && close()}
                        className={`flex items-center justify-between border border-black rounded-full px-2.5 py-1.5 sm:px-3 sm:py-2 bg-white hover:bg-gray-50 transition-all duration-200 group w-full text-xs font-bold ${
                          lang === 'ar' ? 'flex-row-reverse' : ''
                        }`}
                      >
                        <span className='flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#F03E2F] text-white group-hover:bg-red-700 transition'>
                          <ArrowUpRight
                            size={12}
                            className={`sm:w-3.5 sm:h-3.5 ${lang === 'ar' ? 'rotate-180' : ''}`}
                          />
                        </span>
                        <span
                          className={`text-black ${lang === 'ar' ? 'ml-1.5 sm:ml-2' : 'mr-1.5 sm:mr-2'}`}
                        >
                          {t('home.request_quote')}
                        </span>
                      </Link>

                      {/* Language Switcher - Mobile */}
                      <div className='flex items-center justify-center gap-2 mt-2'>
                        <div className='flex items-center gap-1 bg-white p-1 rounded-full shadow-sm border border-gray-100'>
                          <button
                            onClick={() => handleLangSwitch('ar')}
                            className={`flex items-center gap-1 px-1.5 py-0.5 sm:px-2 rounded-full transition-all duration-300 ${
                              lang === 'ar'
                                ? 'bg-[#F03E2F] text-white shadow-sm'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                            disabled={isLoading}
                            aria-label='Switch to Arabic'
                          >
                            <span className='text-xs'>{LANGUAGES[0].flag}</span>
                            <span className='text-xs font-medium hidden sm:block'>العربية</span>
                          </button>
                          <button
                            onClick={() => handleLangSwitch('en')}
                            className={`flex items-center gap-1 px-1.5 py-0.5 sm:px-2 rounded-full transition-all duration-300 ${
                              lang === 'en'
                                ? 'bg-[#F03E2F] text-white shadow-sm'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                            disabled={isLoading}
                            aria-label='Switch to English'
                          >
                            <span className='text-xs'>{LANGUAGES[1].flag}</span>
                            <span className='text-xs font-medium hidden sm:block'>English</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </Disclosure.Panel>
              )}
            </AnimatePresence>
          </>
        );
      }}
    </Disclosure>
  );
}

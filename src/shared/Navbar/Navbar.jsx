import { Fragment, useState, useEffect, Suspense, useRef } from 'react';
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

const navigation = [
  { nameKey: 'navigation.home', to: '/' },
  { nameKey: 'navigation.services', to: '/services' },
  { nameKey: 'navigation.projects', to: '/projects' },
  { nameKey: 'navigation.blog', to: '/blog' },
  { nameKey: 'navigation.contact', to: '/contact' },
];

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

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [lang, setLang] = useState(() => {
    // استرجاع اللغة من localStorage أو استخدام اللغة الافتراضية
    return localStorage.getItem('i18nextLng') || 'ar';
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const wasOpen = useRef(false);

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

  // Check for dataLayer availability
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.dataLayer) {
      console.warn('Google Tag Manager dataLayer is not available. Event tracking will not work.');
    }
  }, []);

  const handleLangSwitch = (code) => {
    try {
      setIsLoading(true);
      if (i18n && typeof i18n.changeLanguage === 'function') {
        i18n.changeLanguage(code);
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
  };

  // Handle phone call click with tracking
  const handlePhoneClick = (e) => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'phone_call_click',
        button_text: t('navigation.call_us', 'اتصل بنا'),
        page_path: window.location.pathname,
        button_location: 'Navbar',
        phone_number: '+966548240556',
        language: lang,
      });
    }
  };

  if (isLoading) {
    return <SkeletonNavbar />;
  }

  return (
    <Disclosure as='nav' className='bg-[#f5f9f9] sticky top-0 z-50 shadow-sm'>
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
              className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className='flex h-20 justify-between items-center'>
                {/* Logo */}
                <motion.div
                  className='relative h-14 w-[120px]'
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Link to='/'>
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

                {/* Navigation */}
                <div className='hidden lg:flex gap-6'>
                  {navigation.map((item) => (
                    <motion.div
                      key={item.nameKey}
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Link
                        to={item.to}
                        className={`relative text-sm font-medium transition px-2 ${
                          lang === 'ar' ? 'font-arabic' : 'font-english'
                        } ${
                          location.pathname === item.to ||
                          (item.to !== '/' && location.pathname.startsWith(item.to))
                            ? 'text-[#F03E2F] font-bold'
                            : 'text-black hover:text-[#F03E2F]'
                        }`}
                      >
                        {t(item.nameKey)}
                        {(location.pathname === item.to ||
                          (item.to !== '/' && location.pathname.startsWith(item.to))) && (
                          <motion.span
                            className='absolute -bottom-1 left-0 w-full h-0.5 bg-[#F03E2F] rounded-full'
                            layoutId='navIndicator'
                          />
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Actions */}
                <div className='hidden lg:flex items-center gap-4'>
                  {/* Phone */}
                  <motion.div
                    className='flex items-center gap-2'
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <span className='flex items-center justify-center w-8 h-8 rounded-full bg-white shadow text-black'>
                      <Phone size={16} aria-hidden='true' />
                    </span>
                    <a
                      href='tel:+966548240556'
                      className={`font-medium text-black text-sm tracking-wide hover:text-[#F03E2F] transition-colors duration-300 ${
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
                      className={`flex items-center border border-black rounded-full px-3 py-1 bg-white hover:bg-gray-50 transition group ${
                        lang === 'ar' ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <span
                        className={`font-medium text-black text-sm ${lang === 'ar' ? 'mr-2' : 'mr-2'}`}
                      >
                        {t('home.request_quote')}
                      </span>
                      <motion.span
                        className='flex items-center justify-center w-5 h-5 rounded-full bg-[#F03E2F] text-white group-hover:bg-red-700 transition'
                        whileHover={{ rotate: 45 }}
                      >
                        <ArrowUpRight size={12} />
                      </motion.span>
                    </Link>
                  </motion.div>

                  {/* Language Switcher */}
                  <div className='hidden lg:block'>
                    <motion.div
                      className='flex items-center gap-2 bg-white p-1 rounded-full shadow-sm border border-gray-100'
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <motion.button
                        onClick={() => handleLangSwitch('ar')}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all duration-300 ${
                          lang === 'ar'
                            ? 'bg-[#F03E2F] text-white shadow-sm'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className='text-base'>{LANGUAGES[0].flag}</span>
                        <span className='text-xs font-medium'>العربية</span>
                      </motion.button>
                      <motion.button
                        onClick={() => handleLangSwitch('en')}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all duration-300 ${
                          lang === 'en'
                            ? 'bg-[#F03E2F] text-white shadow-sm'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className='text-base'>{LANGUAGES[1].flag}</span>
                        <span className='text-xs font-medium'>English</span>
                      </motion.button>
                    </motion.div>
                  </div>
                </div>

                {/* Mobile menu button */}
                <motion.div className='flex lg:hidden' whileTap={{ scale: 0.95 }}>
                  <Disclosure.Button className='inline-flex items-center justify-center rounded-lg p-3 text-gray-700 hover:bg-blue-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500'>
                    <span className='sr-only'>Open main menu</span>
                    {open ? (
                      <XMarkIcon className='block h-7 w-7' aria-hidden='true' />
                    ) : (
                      <Bars3Icon className='block h-7 w-7' aria-hidden='true' />
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
                  className='lg:hidden bg-[#f5f9f9] overflow-hidden'
                >
                  <div className='flex flex-col gap-1.5 px-4 pt-3 pb-2'>
                    {navigation.map((item) => (
                      <motion.div
                        key={item.nameKey}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Link
                          to={item.to}
                          className={`block relative font-medium px-2 py-1.5 rounded-lg text-sm ${
                            location.pathname === item.to ||
                            (item.to !== '/' && location.pathname.startsWith(item.to))
                              ? 'text-[#F03E2F] font-bold bg-red-50'
                              : 'text-black hover:text-[#F03E2F] hover:bg-gray-50'
                          }`}
                          onClick={() => open && close()}
                        >
                          {t(item.nameKey)}
                        </Link>
                      </motion.div>
                    ))}

                    {/* Mobile actions */}
                    <motion.div
                      className='flex flex-col gap-2 mt-3'
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      <div className='flex items-center gap-2'>
                        <span className='flex items-center justify-center w-8 h-8 rounded-full bg-white shadow text-black'>
                          <Phone size={16} aria-hidden='true' />
                        </span>
                        <a
                          href='tel:+966548240556'
                          className={`font-medium text-black text-sm tracking-wide hover:text-[#F03E2F] transition-colors duration-300 ${
                            lang === 'ar' ? 'font-arabic text-right' : 'font-english'
                          }`}
                          dir={lang === 'ar' ? 'ltr' : 'auto'}
                          onClick={handlePhoneClick}
                          aria-label={t('navigation.call_us', 'اتصل بنا')}
                        >
                          +966548240556
                        </a>
                      </div>
                      <Link
                        to='/quote'
                        onClick={() => open && close()}
                        className={`flex items-center justify-between border border-black rounded-full px-3 py-1.5 bg-white hover:bg-gray-50 transition group w-full text-sm font-bold ${
                          lang === 'ar' ? 'flex-row-reverse' : ''
                        }`}
                      >
                        <span className='flex items-center justify-center w-6 h-6 rounded-full bg-[#F03E2F] text-white group-hover:bg-red-700 transition'>
                          <ArrowUpRight size={16} className={lang === 'ar' ? 'rotate-180' : ''} />
                        </span>
                        <span className={`text-black ${lang === 'ar' ? 'ml-2' : 'mr-2'}`}>
                          {t('home.request_quote')}
                        </span>
                      </Link>

                      {/* Language Switcher - Toggle Switch for Mobile */}
                      <div className='flex items-center justify-center gap-2 mt-3'>
                        <div className='flex items-center gap-2 bg-white p-1 rounded-full shadow-sm border border-gray-100'>
                          <Disclosure.Button
                            as='button'
                            onClick={() => handleLangSwitch('ar')}
                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all duration-300 ${
                              lang === 'ar'
                                ? 'bg-[#F03E2F] text-white shadow-sm'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            <span className='text-base'>{LANGUAGES[0].flag}</span>
                            <span className='text-xs font-medium'>العربية</span>
                          </Disclosure.Button>
                          <Disclosure.Button
                            as='button'
                            onClick={() => handleLangSwitch('en')}
                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all duration-300 ${
                              lang === 'en'
                                ? 'bg-[#F03E2F] text-white shadow-sm'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            <span className='text-base'>{LANGUAGES[1].flag}</span>
                            <span className='text-xs font-medium'>English</span>
                          </Disclosure.Button>
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

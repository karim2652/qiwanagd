import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { motion } from 'framer-motion';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { servicesAr, servicesEn } from '../../../data/servicesData';
import { Helmet } from 'react-helmet-async';
import { MdEmail, MdPhone } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';

const ServiceDetails = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const { title } = useParams();
  const navigate = useNavigate();
  // Handle WhatsApp click with tracking
  const handleWhatsAppClick = (e) => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'whatsapp_click',
        button_text: isArabic ? 'واتساب' : 'WhatsApp',
        page_path: window.location.pathname,
        button_location: 'Service Details',
        language: i18n.language,
      });
    }
  };

  // Handle phone call click with tracking
  const handlePhoneClick = (e) => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'phone_call_click',
        button_text: isArabic ? 'هاتف' : 'Phone',
        page_path: window.location.pathname,
        button_location: 'Service Details',
        phone_number: '+966548240556',
        language: i18n.language,
      });
    }
  };

  // Create slug from title for comparison
  const createSlug = (title) => {
    // For Arabic titles
    if (/[\u0600-\u06FF]/.test(title)) {
      return title
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\u0600-\u06FF\w-]/g, '')
        .replace(/-+/g, '-')
        .toLowerCase();
    }

    // For English titles
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  // Get the appropriate services data based on language
  const services = isArabic ? servicesAr : servicesEn;

  // Find service by title slug
  let service = services.find((s) => createSlug(s.title) === title);

  // If not found by slug, try to find by index (cross-language matching)
  if (!service) {
    // Try to find in the opposite language first
    const otherLanguageServices = isArabic ? servicesEn : servicesAr;
    const otherLanguageService = otherLanguageServices.find((s) => createSlug(s.title) === title);

    if (otherLanguageService) {
      // Find the corresponding service by index
      const serviceIndex = otherLanguageServices.indexOf(otherLanguageService);
      service = services[serviceIndex];
    }
  }

  // Effect to handle language changes
  useEffect(() => {
    const savedLang = localStorage.getItem('i18nextLng');
    if (savedLang && savedLang !== i18n.language) {
      i18n.changeLanguage(savedLang);
    }
  }, [i18n]);

  // Effect to update URL when language changes
  useEffect(() => {
    if (service) {
      const currentServices = isArabic ? servicesAr : servicesEn;
      const serviceIndex = (isArabic ? servicesAr : servicesEn).findIndex(
        (s) => s.title === service.title
      );
      const newService = currentServices[serviceIndex >= 0 ? serviceIndex : 0];

      if (newService) {
        const newSlug = createSlug(newService.title);
        if (newSlug !== title) {
          navigate(`/services/${newSlug}`, { replace: true });
        }
      }
    }
  }, [isArabic, service, title, navigate]);

  const fontFamily = isArabic ? 'Tajawal, Cairo, Arial, sans-serif' : 'inherit';

  if (!service) {
    return (
      <div className='container mx-auto px-4 py-8 text-center'>
        <h1 className='text-2xl font-bold mb-4' style={{ fontFamily }}>
          {isArabic ? 'الخدمة غير موجودة' : 'Service Not Found'}
        </h1>
        <p className='mb-4' style={{ fontFamily }}>
          {isArabic ? 'لم يتم العثور على الخدمة المطلوبة' : 'The requested service was not found'}
        </p>
        <Link
          to='/services'
          className='inline-block bg-[#FF5E3A] text-white px-6 py-2 rounded hover:bg-[#FF5E3A]/90 transition-colors'
          style={{ fontFamily }}
        >
          {isArabic ? 'العودة للخدمات' : 'Back to Services'}
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{service.mainTitle || service.title}</title>
        <meta name='description' content={service.metaDescription} />
        <meta property='og:title' content={service.mainTitle || service.title} />
        <meta property='og:description' content={service.metaDescription} />
        <meta property='og:type' content='service' />
      </Helmet>

      <div
        className='min-h-screen bg-gray-50'
        dir={isArabic ? 'rtl' : 'ltr'}
        style={{ fontFamily }}
      >
        {/* Header Section */}
        <div className='bg-white shadow-sm border-b border-gray-200'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
            <div className='flex items-center gap-4 mb-4'>
              <button
                onClick={() => navigate('/services')}
                className='flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors'
              >
                <svg
                  className={`w-5 h-5 ${isArabic ? 'rotate-180' : ''}`}
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M15 19l-7-7 7-7'
                  />
                </svg>
                {isArabic ? 'العودة للخدمات' : 'Back to Services'}
              </button>
            </div>
            <h1 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-2'>{service.title}</h1>
            <p className='text-lg text-gray-600 max-w-3xl'>{service.overview}</p>
          </div>
        </div>

        {/* Main Content */}
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <div className='flex flex-col lg:flex-row gap-8'>
            {/* Main Content Area */}
            <div className='flex-1 space-y-8'>
              {/* Service Overview Card */}
              <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
                <div className='p-6 border-b border-gray-100'>
                  <div className='flex items-center gap-3 mb-4'>
                    <div className='w-12 h-12 bg-[#FF5E3A] rounded-lg flex items-center justify-center text-white'>
                      {service.icon}
                    </div>
                    <h2 className='text-2xl font-bold text-gray-900'>
                      {isArabic ? 'نظرة عامة' : 'Overview'}
                    </h2>
                  </div>
                </div>
                <div className='p-6'>
                  <p className='text-gray-700 leading-relaxed text-lg'>{service.overview}</p>
                </div>
              </div>

              {/* Why Choose Us */}
              {service.whyBest && service.whyBest.length > 0 && (
                <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
                  <div className='p-6 border-b border-gray-100'>
                    <h2 className='text-2xl font-bold text-gray-900'>
                      {isArabic ? 'لماذا تختارنا؟' : 'Why Choose Us?'}
                    </h2>
                  </div>
                  <div className='p-6'>
                    <div className='space-y-4'>
                      {service.whyBest.map((item, index) => (
                        <div key={index}>
                          {typeof item === 'string' ? (
                            <div className='flex items-start gap-3 p-4 rounded-lg bg-gray-50'>
                              <div className='w-6 h-6 bg-[#FF5E3A] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                                <svg
                                  className='w-4 h-4 text-white'
                                  fill='currentColor'
                                  viewBox='0 0 20 20'
                                >
                                  <path
                                    fillRule='evenodd'
                                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                                    clipRule='evenodd'
                                  />
                                </svg>
                              </div>
                              <span className='text-gray-700 font-medium'>{item}</span>
                            </div>
                          ) : (
                            <div className='p-4 rounded-lg bg-gray-50'>
                              <h3 className='font-bold text-gray-900 mb-3 flex items-center gap-2'>
                                <div className='w-6 h-6 bg-[#FF5E3A] rounded-full flex items-center justify-center flex-shrink-0'>
                                  <svg
                                    className='w-4 h-4 text-white'
                                    fill='currentColor'
                                    viewBox='0 0 20 20'
                                  >
                                    <path
                                      fillRule='evenodd'
                                      d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                                      clipRule='evenodd'
                                    />
                                  </svg>
                                </div>
                                {item.title}
                              </h3>
                              {item.details && (
                                <ul className='space-y-2 mr-8'>
                                  {item.details.map((detail, idx) => (
                                    <li key={idx} className='text-gray-600 flex items-start gap-2'>
                                      <span className='w-1.5 h-1.5 bg-[#FF5E3A] rounded-full mt-2 flex-shrink-0'></span>
                                      {detail}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Detailed Services */}
              {service.detailedServices && service.detailedServices.length > 0 && (
                <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
                  <div className='p-6 border-b border-gray-100'>
                    <h2 className='text-2xl font-bold text-gray-900'>
                      {isArabic ? 'تفاصيل الخدمات' : 'Service Details'}
                    </h2>
                  </div>
                  <div className='p-6'>
                    <div className='space-y-6'>
                      {service.detailedServices.map((detail, index) => (
                        <div
                          key={index}
                          className='border-b border-gray-100 last:border-b-0 pb-6 last:pb-0'
                        >
                          <h3 className='text-lg font-semibold text-gray-900 mb-2 flex items-center gap-3'>
                            <span className='w-8 h-8 bg-[#FF5E3A] text-white rounded-lg flex items-center justify-center text-sm font-bold'>
                              {index + 1}
                            </span>
                            {detail.name}
                          </h3>
                          <p className='text-gray-600 leading-relaxed mr-11'>
                            {detail.description}
                          </p>
                          {detail.keywords && detail.keywords.length > 0 && (
                            <div className='mr-11 mt-3'>
                              <div className='flex flex-wrap gap-1'>
                                {detail.keywords.map((keyword, keywordIndex) => (
                                  <span
                                    key={keywordIndex}
                                    className='inline-block bg-orange-50 text-orange-700 px-2 py-1 rounded text-xs font-medium'
                                  >
                                    {keyword}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* FAQ */}
              {service.faq && service.faq.length > 0 && (
                <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
                  <div className='p-6 border-b border-gray-100'>
                    <h2 className='text-2xl font-bold text-gray-900'>
                      {isArabic ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
                    </h2>
                  </div>
                  <div className='p-6'>
                    <div className='space-y-6'>
                      {service.faq.map((item, index) => (
                        <div
                          key={index}
                          className='border-b border-gray-100 last:border-b-0 pb-6 last:pb-0'
                        >
                          <h3 className='text-lg font-semibold text-gray-900 mb-3 flex items-start gap-3'>
                            <span className='w-8 h-8 bg-[#FF5E3A] text-white rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5'>
                              Q
                            </span>
                            {item.question}
                          </h3>
                          <p className='text-gray-600 leading-relaxed mr-11'>{item.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Keywords Section */}
              {service.keywords && service.keywords.length > 0 && (
                <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
                  <div className='p-6 border-b border-gray-100'>
                    <h2 className='text-2xl font-bold text-gray-900'>
                      {isArabic ? 'الكلمات المفتاحية' : 'Keywords'}
                    </h2>
                  </div>
                  <div className='p-6'>
                    <div className='flex flex-wrap gap-2'>
                      {service.keywords.map((keyword, index) => (
                        <span
                          key={index}
                          className='inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-[#FF5E3A] hover:text-white transition-colors duration-200'
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className='lg:w-80 space-y-6'>
              {/* Service Items */}
              {service.items && service.items.length > 0 && (
                <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
                  <div className='p-6 border-b border-gray-100'>
                    <h3 className='text-lg font-bold text-gray-900'>
                      {isArabic ? 'الخدمات المتضمنة' : 'Services Included'}
                    </h3>
                  </div>
                  <div className='p-6'>
                    <ul className='space-y-3'>
                      {service.items.map((item, index) => (
                        <li key={index} className='flex items-start gap-3'>
                          <div className='w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                            <svg
                              className='w-3 h-3 text-white'
                              fill='none'
                              stroke='currentColor'
                              viewBox='0 0 24 24'
                              strokeWidth='3'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M5 13l4 4L19 7'
                              />
                            </svg>
                          </div>
                          <span className='text-gray-700 text-sm'>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Contact Info */}

              <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
                <div className='p-6 border-b border-gray-100'>
                  <h3 className='text-lg font-bold text-gray-900'>
                    {isArabic ? 'معلومات التواصل' : 'Contact Info'}
                  </h3>
                </div>
                <div className='p-6 space-y-4'>
                  <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center'>
                      <MdPhone className='text-blue-600' size={14} />
                    </div>
                    <div>
                      <p className='text-sm text-gray-500'>{isArabic ? 'هاتف' : 'Phone'}</p>
                      <a
                        href='tel:+966548240556'
                        className='text-gray-700 hover:text-[#FF5E3A] transition-colors duration-300'
                        onClick={handlePhoneClick}
                        dir='ltr'
                      >
                        +966 54 824 0556
                      </a>
                    </div>
                  </div>

                  <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center'>
                      <FaWhatsapp className='text-green-600' size={14} aria-hidden='true' />
                    </div>
                    <div>
                      <p className='text-sm text-gray-500'>{isArabic ? 'واتساب' : 'WhatsApp'}</p>
                      <a
                        onClick={handleWhatsAppClick}
                        href='https://wa.me/966548240556'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-gray-700 hover:text-green-600 transition-colors duration-300'
                        dir='ltr'
                      >
                        +966 54 824 0556
                      </a>
                    </div>
                  </div>

                  <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center'>
                      <MdEmail className='text-purple-600' size={14} />
                    </div>
                    <div>
                      <p className='text-sm text-gray-500'>
                        {isArabic ? 'بريد إلكتروني' : 'Email'}
                      </p>
                      <a
                        href='mailto:info@qiwanagd.com'
                        className='text-gray-700 hover:text-[#FF5E3A] transition-colors duration-300'
                      >
                        info@qiwanagd.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Card */}
              <div className='bg-[#FF5E3A] rounded-lg shadow-sm overflow-hidden'>
                <div className='p-6 text-white'>
                  <h3 className='text-lg font-bold mb-2'>
                    {isArabic ? 'احصل على عرض سعر' : 'Get a Quote'}
                  </h3>
                  <p className='text-white/90 text-sm mb-4'>
                    {isArabic
                      ? 'تواصل معنا للحصول على استشارة مجانية'
                      : 'Contact us for a free consultation'}
                  </p>
                  <button
                    onClick={() => navigate('/quote')}
                    className='w-full bg-white text-[#FF5E3A] px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors'
                  >
                    {isArabic ? 'طلب عرض سعر' : 'Request Quote'}
                  </button>
                </div>
              </div>

              {/* Additional CTA */}
              {service.callToAction && (
                <div className='bg-gray-900 rounded-lg shadow-sm overflow-hidden'>
                  <div className='p-6 text-white'>
                    <h3 className='text-lg font-bold mb-2'>{service.callToAction.title}</h3>
                    {service.callToAction.subtitle && (
                      <p className='text-gray-300 text-sm mb-4'>{service.callToAction.subtitle}</p>
                    )}
                    <button
                      onClick={() => navigate('/contact')}
                      className='w-full bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors'
                    >
                      {isArabic ? 'تواصل معنا' : 'Contact Us'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceDetails;

import React, { useMemo } from 'react';
import { FaWhatsapp, FaPhone, FaEnvelope } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { createPortal } from 'react-dom';
import './FloatingButtons.css'; // سيتم إنشاء هذا الملف
import { sendGTMEvent } from '../lib/gtm';

const FloatingButtons = () => {
  const { i18n } = useTranslation();

  // Memoize messages to update when language changes
  const messages = useMemo(() => {
    const isArabic = i18n.language === 'ar';
    return {
      call: isArabic ? 'اتصل بنا مباشرة' : 'Request a Call',
      whatsapp: isArabic ? 'تواصل عبر واتساب' : 'Chat on WhatsApp',
      email: isArabic ? 'راسلنا عبر البريد الإلكتروني' : 'Request a Consultation',
    };
  }, [i18n.language]); // Only recalculate when language changes

  // Handle WhatsApp click with tracking
  const handleWhatsAppClick = (e) => {
    try {
      sendGTMEvent('whatsapp_click', {
        button_text: messages.whatsapp,
        page_path: window.location.pathname,
        button_location: 'Floating Button',
        language: i18n.language,
      });
    } catch (error) {
      // Silently handle tracking errors
    }
  };

  // Handle phone call click with tracking
  const handlePhoneClick = (e) => {
    try {
      sendGTMEvent('phone_call_click', {
        button_text: messages.call,
        page_path: window.location.pathname,
        button_location: 'Floating Button',
        phone_number: '+966548240556',
        language: i18n.language,
      });
    } catch (error) {
      // Silently handle tracking errors
    }
  };

  // ثابت على اليمين دائمًا بغض النظر عن اللغة
  const buttons = (
    <div
      className='fixed bottom-7 right-2 z-[9999] animate-fadeIn'
      dir='ltr'
      style={{
        isolation: 'isolate',
        willChange: 'transform',
      }}
    >
      <div className='flex flex-col gap-4'>
        {/* Call Button */}
        <div className='group relative'>
          <a
            href='tel:+966548240556'
            className='w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-300'
            dir='ltr'
            onClick={handlePhoneClick}
            aria-label={messages.call}
          >
            <FaPhone size={20} color='white' aria-hidden='true' />
          </a>
          <div className='absolute right-14 top-1/2 bg-white/95 text-blue-700 px-5 py-3 rounded-xl shadow-md text-base font-semibold opacity-0 scale-95 -translate-y-2 translate-x-3 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-400 ease-out border border-blue-200 whitespace-nowrap pointer-events-none'>
            <span className='block tracking-wide'>{messages.call}</span>
            <div className='absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2 transform rotate-45 w-3 h-3 bg-white border-r border-b border-blue-200'></div>
          </div>
        </div>

        {/* WhatsApp Button */}
        <div className='group relative'>
          <a
            href='https://wa.me/966548240556'
            target='_blank'
            rel='noopener noreferrer'
            className='w-12 h-12 bg-green-600 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-300'
            onClick={handleWhatsAppClick}
            aria-label={messages.whatsapp}
          >
            <FaWhatsapp size={20} color='white' aria-hidden='true' />
          </a>
          <div className='absolute right-14 top-1/2 bg-white/95 text-green-700 px-5 py-3 rounded-xl shadow-md text-base font-semibold opacity-0 scale-95 -translate-y-2 translate-x-3 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-400 ease-out border border-green-200 whitespace-nowrap pointer-events-none'>
            <span className='block tracking-wide'>{messages.whatsapp}</span>
            <div className='absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2 transform rotate-45 w-3 h-3 bg-white border-r border-b border-green-200'></div>
          </div>
        </div>

        {/* Email Button */}
        <div className='group relative'>
          <a
            href='mailto:info@qiwanagd.com'
            className='w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-300'
            aria-label={messages.email}
          >
            <FaEnvelope size={20} color='white' aria-hidden='true' />
          </a>
          <div className='absolute right-14 top-1/2 bg-white/95 text-yellow-700 px-5 py-3 rounded-xl shadow-md text-base font-semibold opacity-0 scale-95 -translate-y-2 translate-x-3 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-400 ease-out border border-yellow-200 whitespace-nowrap pointer-events-none'>
            <span className='block tracking-wide'>{messages.email}</span>
            <div className='absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2 transform rotate-45 w-3 h-3 bg-white border-r border-b border-yellow-200'></div>
          </div>
        </div>
      </div>
    </div>
  );

  // Use portal to render outside of any parent stacking contexts
  return typeof document !== 'undefined' ? createPortal(buttons, document.body) : buttons;
};

export default FloatingButtons;

import React from 'react';
import { FaWhatsapp, FaPhone, FaEnvelope } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { createPortal } from 'react-dom';

// لا يقبل أي معلمات للغة
const FloatingButtons = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  // Messages based on language
  const messages = {
    call: isArabic ? 'اتصل بنا مباشرة' : 'Request a Call',
    whatsapp: isArabic ? 'تواصل عبر واتساب' : 'Chat on WhatsApp',
    email: isArabic ? 'راسلنا عبر البريد الإلكتروني' : 'Request a Consultation',
  };

  // ثابت على اليمين دائمًا بغض النظر عن اللغة
  const buttons = (
    <div
      className='fixed bottom-5 right-4 z-[9999]'
      dir='ltr'
      style={{
        isolation: 'isolate',
        animation: 'float 4s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        willChange: 'transform',
      }}
    >
      <style>
        {`
          @keyframes float {
            0% {
              transform: translateY(0px);
            }
            25% {
              transform: translateY(-6px);
            }
            50% {
              transform: translateY(-8px);
            }
            75% {
              transform: translateY(-6px);
            }
            100% {
              transform: translateY(0px);
            }
          }
        `}
      </style>

      <div className='flex flex-col gap-2'>
        {/* Call Button */}
        <div className='group relative'>
          <a
            href='tel:+966548240556'
            className='w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300'
            dir='ltr'
          >
            <FaPhone size={16} color='white' />
          </a>
          <div className='absolute right-12 top-1/2  bg-gradient-to-b from-white to-blue-50 text-gray-800 px-4 py-2.5 rounded-xl shadow-[0_5px_15px_rgba(0,0,0,0.1)] text-sm font-medium opacity-0 scale-95 -translate-y-2 translate-x-3 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-400 ease-out border border-blue-100 whitespace-nowrap pointer-events-none'>
            <span className='block text-blue-600 font-bold tracking-wide'>{messages.call}</span>
            <div className='absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2 transform rotate-45 w-2.5 h-2.5 bg-white border-r border-b border-blue-100'></div>
          </div>
        </div>

        {/* WhatsApp Button */}
        <div className='group relative'>
          <a
            href='https://wa.me/966548240556'
            target='_blank'
            rel='noopener noreferrer'
            className='w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300'
          >
            <FaWhatsapp size={16} color='white' />
          </a>
          <div className='absolute right-12 top-1/2  bg-gradient-to-b from-white to-green-50 text-gray-800 px-4 py-2.5 rounded-xl shadow-[0_5px_15px_rgba(0,0,0,0.1)] text-sm font-medium opacity-0 scale-95 -translate-y-2 translate-x-3 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-400 ease-out border border-green-100 whitespace-nowrap pointer-events-none'>
            <span className='block text-green-600 font-bold tracking-wide'>
              {messages.whatsapp}
            </span>
            <div className='absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2 transform rotate-45 w-2.5 h-2.5 bg-white border-r border-b border-green-100'></div>
          </div>
        </div>

        {/* Email Button */}
        <div className='group relative'>
          <a
            href='mailto:info@qiwanagd.com'
            className='w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300'
          >
            <FaEnvelope size={16} color='white' />
          </a>
          <div className='absolute right-12 top-1/2 -translate-y-1/2 bg-gradient-to-b from-white to-yellow-50 text-gray-800 px-4 py-2.5 rounded-xl shadow-[0_5px_15px_rgba(0,0,0,0.1)] text-sm font-medium opacity-0 scale-95  translate-x-3 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-400 ease-out border border-yellow-100 whitespace-nowrap pointer-events-none'>
            <span className='block text-yellow-600 font-bold tracking-wide'>{messages.email}</span>
            <div className='absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2 transform rotate-45 w-2.5 h-2.5 bg-white border-r border-b border-yellow-100'></div>
          </div>
        </div>
      </div>
    </div>
  );

  // Use portal to render outside of any parent stacking contexts
  return typeof document !== 'undefined' ? createPortal(buttons, document.body) : buttons;
};

export default FloatingButtons;

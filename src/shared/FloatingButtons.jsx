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
      className='fixed bottom-7 right-2 z-[9999] animate-fadeIn'
      dir='ltr'
      style={{
        isolation: 'isolate',
        willChange: 'transform',
      }}
    >
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            25% { transform: translateY(-6px); }
            50% { transform: translateY(-8px); }
            75% { transform: translateY(-6px); }
            100% { transform: translateY(0px); }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 1.2s cubic-bezier(0.4, 0, 0.2, 1);
          }
        `}
      </style>

      <div className='flex flex-col gap-4'>
        {/* Call Button */}
        <div className='group relative'>
          <a
            href='tel:+966548240556'
            className='w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-300'
            dir='ltr'
          >
            <FaPhone size={20} color='white' />
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
          >
            <FaWhatsapp size={20} color='white' />
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
          >
            <FaEnvelope size={20} color='white' />
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

import React, { useEffect, useState } from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { servicesAr, servicesEn } from '../../../data/servicesData';

const ServiceOverview = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // Create slug from title for URL
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

  const services = isRTL ? servicesAr : servicesEn;
  const sectionTitle = isRTL ? ' خدماتنا المتخصصه' : 'Our Services';
  const sectionSubtitle = isRTL
    ? '  نوفّر حلولًا هندسية شاملة تجمع بين الخبرة المحلية والمعايير العالمية'
    : 'We provide comprehensive engineering solutions that combine local expertise with international standards.';
  const ulDir = isRTL ? 'rtl' : 'ltr';

  return (
    <div className='min-h-screen  flex items-center justify-center py-6 px-2'>
      <div className='bg-white rounded-3xl p-6 md:p-10 max-w-6xl w-full shadow-sm border border-[#e9ecef]'>
        <div className='text-center mb-10'>
          <div className='text-md text-[#e76f51] font-semibold mb-3 inline-block border border-[#e76f51] rounded-full px-4 py-1 tracking-wider'>
            {sectionTitle}
          </div>
          <h2 className='text-gray-700 text-lg md:text-xl leading-relaxed mb-0 mt-0'>
            {sectionSubtitle}
          </h2>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {services.map((service, idx) => (
            <Link
              key={idx}
              to={`/services/${createSlug(service.title)}`}
              className={`group relative flex flex-col h-full rounded-2xl p-7 transition-all duration-300 border cursor-pointer
                ${idx === 1 ? 'bg-[#f76f51] text-white border-none' : 'bg-[#f6f9fa] text-[#222] border-[#e9ecef]'}
                shadow-sm
                hover:shadow-lg
                hover:-translate-y-1
                hover:scale-105
                ${idx !== 1 ? 'hover:border-[#e7401c]' : ''}
                block no-underline
              `}
            >
              <div
                className={`mb-4 flex items-center justify-center transition-all duration-500 ${idx === 1 ? 'text-white' : 'text-[#222]'} group-hover:-translate-y-1 group-hover:rotate-6`}
              >
                {service.icon}
              </div>
              <div className='font-bold text-lg mb-4 text-center'>{service.title}</div>
              <ul
                className={`flex-1 mb-8 text-sm text-${isRTL ? 'right' : 'left'} pr-2 space-y-2 ${idx === 1 ? 'text-white/90' : 'text-gray-600'}`}
                dir={ulDir}
              >
                {service.items.map((item, i) => (
                  <li key={i} className='flex items-start gap-2'>
                    <FiCheckCircle
                      className={`mt-0.5 flex-shrink-0 ${idx === 1 ? 'text-white' : 'text-[#e76f51]'}`}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div
                className={`
                  absolute bottom-5 ltr:right-5 rtl:left-5 w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-md
                  transition-all duration-500
                  ${
                    idx === 1
                      ? 'bg-[#e7401c] text-white'
                      : 'bg-[#222] text-white group-hover:bg-[#e7401c] group-hover:text-white'
                  }
                `}
              >
                <span
                  className={`inline-block transition-all duration-500
                    ${idx === 1 ? '' : ' -rotate-45 group-hover:rotate-0'}`}
                >
                  ➔
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceOverview;

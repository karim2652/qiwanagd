import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaDirections } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Location = () => {
  const [activeLocation, setActiveLocation] = useState('alkharj');
  const { i18n, t } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const locations = {
    alkharj: {
      id: 'alkharj',
      name: t('contact.locations.offices.alkharj'),
      address: isArabic ? 'الخرج، المملكة العربية السعودية' : 'Al Kharj, Saudi Arabia',
      phones: ['+966 54 824 0556', '+966 55 777 0556'],
      coordinates: [24.153167678397715, 47.31654357534841],
      mapUrl:
        'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3640.52917114754!2d47.31654357534841!3d24.153167678397715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjTCsDA5JzExLjQiTiA0N8KwMTknMDguOCJF!5e0!3m2!1sen!2seg!4v1747848669167!5m2!1sen!2seg',
    },
    mulham: {
      id: 'mulham',
      name: t('contact.locations.offices.mulham'),
      address: isArabic ? 'ملهم، المملكة العربية السعودية' : 'Mulham, Saudi Arabia',
      phones: ['+966 54 824 0556', '+966 55 777 0557'],
      coordinates: [25.164806377731757, 46.324943575380686],
      mapUrl:
        'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3611.138337221757!2d46.324943575380686!3d25.164806377731757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjXCsDA5JzUzLjMiTiA0NsKwMTknMzkuMSJF!5e0!3m2!1sen!2seg!4v1747850178090!5m2!1sen!2seg',
    },
    alaqiq: {
      id: 'alaqiq',
      name: t('contact.locations.offices.alaqiq'),
      address: isArabic ? 'العقيق، المملكة العربية السعودية' : 'Al Aqiq, Saudi Arabia',
      phones: ['+966 54 824 0556', '+966 55 777 0557'],
      coordinates: [25.164806377731757, 46.324943575380686],
      mapUrl:
        'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3611.138337221757!2d46.324943575380686!3d25.164806377731757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjXCsDA5JzUzLjMiTiA0NsKwMTknMzkuMSJF!5e0!3m2!1sen!2seg!4v1747850331529!5m2!1sen!2seg',
    },
    albaha: {
      id: 'albaha',
      name: t('contact.locations.offices.albaha'),
      address: isArabic ? 'الجرشي، المملكة العربية السعودية' : 'Al Garshi, Saudi Arabia',
      phones: ['+966 54 824 0556', '+966 55 777 0557'],
      coordinates: [20.2887, 41.4647],
      mapUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3752.485568616483!2d41.4647!3d20.2887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15ef5d16ac9ee875%3A0xc769f6a3c8d3f8cb!2z2YXZg9iq2Kgg2LPYudivINmF2LPZgdixINii2YQg2YfYtNio2YjZhCDZhNmE2KfYs9iq2LTYp9ix2KfYqiDYp9mE2YfZhtiv2LPZitip!5e0!3m2!1sen!2seg!4v1747850491925!5m2!1sen!2seg',
    },
  };

  return (
    <section className='py-16 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section Header */}
        <div className='text-center mb-12'>
          <h2 className='text-4xl font-bold text-gray-900 mb-4'>{t('contact.locations.title')}</h2>
          <p className='text-lg text-gray-600'>{t('contact.locations.subtitle')}</p>
        </div>

        {/* Location Tabs */}
        <div className='flex flex-wrap justify-center gap-4 mb-8'>
          {Object.values(locations).map((location) => (
            <button
              key={location.id}
              onClick={() => setActiveLocation(location.id)}
              className={`px-6 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                activeLocation === location.id
                  ? 'bg-[#F03E2F] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {location.name}
            </button>
          ))}
        </div>

        {/* Active Location Details */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {/* Map */}
          <div className='bg-white rounded-lg shadow-md overflow-hidden h-[400px]'>
            <iframe
              src={locations[activeLocation].mapUrl}
              width='100%'
              height='100%'
              style={{ border: 0 }}
              allowFullScreen=''
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
              title={`Qiwanagd Location - ${locations[activeLocation].name}`}
              importance='high'
            />
          </div>

          {/* Location Info */}
          <div className='bg-white rounded-lg shadow-md p-6'>
            <h3 className='text-2xl font-bold text-[#F03E2F] mb-6'>
              {locations[activeLocation].name}
            </h3>

            <div className='space-y-6'>
              <div className='flex items-start gap-4'>
                <div className='p-2 bg-[#EFF3F6] rounded-lg'>
                  <FaMapMarkerAlt className='text-[#F03E2F] text-xl' />
                </div>
                <div>
                  <h4 className='text-base font-medium text-gray-900 mb-1'>
                    {t('contact.locations.address')}
                  </h4>
                  <p className='text-gray-600'>{locations[activeLocation].address}</p>
                </div>
              </div>

              <div className='flex items-start gap-4'>
                <div className='p-2 bg-[#EFF3F6] rounded-lg'>
                  <FaPhone className='text-[#F03E2F] text-xl' />
                </div>
                <div>
                  <h4 className='text-base font-medium text-gray-900 mb-2'>
                    {t('contact.locations.phone_numbers')}
                  </h4>
                  <div className='space-y-2'>
                    {locations[activeLocation].phones.map((phone, index) => (
                      <a
                        key={index}
                        href={`tel:${phone.replace(/\s/g, '')}`}
                        className={`block font-medium text-black text-sm tracking-wide hover:text-[#F03E2F] transition-colors duration-300 ${isArabic ? 'font-arabic text-right' : 'font-english'}`}
                        dir={isArabic ? 'ltr' : 'auto'}
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className='flex flex-col gap-4 mt-8'>
              <a
                href={`https://www.google.com/maps?q=${locations[activeLocation].coordinates.join(',')}`}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center justify-center border border-black rounded-full px-5 py-2 text-black font-bold text-lg transition hover:bg-gray-50 w-fit mx-auto'
                style={{ gap: '0.75rem' }}
              >
                <span>{t('contact.locations.view_on_google')}</span>
                <span className='flex items-center justify-center bg-[#F03E2F] text-white rounded-full w-8 h-8 ml-2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='18'
                    height='18'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <path
                      fill='currentColor'
                      d='M17.25 6.75h-10.5a.75.75 0 1 1 0-1.5h12a.75.75 0 0 1 .75.75v12a.75.75 0 1 1-1.5 0v-10.5l-11.22 11.22a.75.75 0 1 1-1.06-1.06L17.25 6.75Z'
                    />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;

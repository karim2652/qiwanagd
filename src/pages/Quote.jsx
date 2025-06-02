import React from 'react';
import { useTranslation } from 'react-i18next';
import { TypeAnimation } from 'react-type-animation';
import logoAr from '../assets/images/logo/3.svg';
import logoEn from '../assets/images/logo/5.svg';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import QuoteForm from './components/QuoteForm';
import SEO from '../components/SEO/SEO';

const Quote = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <SEO
        title={t('quote.meta.title')}
        description={t('quote.meta.description')}
        keywords={t('quote.meta.keywords')}
        url='/quote'
        type='website'
      />
      <div className='min-h-screen bg-[#111] flex flex-col items-center justify-center px-4  py-6 md:py-10 m-2 rounded-3xl'>
        <div className='flex flex-col gap-6 md:gap-8 w-full max-w-6xl'>
          {/* Logo & Title */}
          <div className='w-full'>
            <div
              className={`flex flex-col w-full ${i18n.language === 'ar' ? 'items-start' : 'items-start'}`}
            >
              <LazyLoadImage
                src={i18n.language === 'ar' ? logoAr : logoEn}
                alt='logo'
                effect='blur'
                className='w-36 h-36 md:w-36 md:h-36 mb-2'
                wrapperClassName='w-36 h-36 md:w-36 md:h-36'
              />
              <span className='bg-[#222] text-[#ff3e33] px-4 py-1 rounded-full text-sm font-semibold inline-block'>
                {t('quote.title')}
              </span>
            </div>
          </div>
          <div
            className={`flex flex-col gap-2 -mt-4 w-full ${i18n.language === 'ar' ? 'items-center text-right' : 'items-start text-left'}`}
          >
            <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-white'>
              {t('quote.main_title')}{' '}
              <TypeAnimation
                key={i18n.language}
                sequence={
                  i18n.language === 'ar'
                    ? [
                        t('quote.design_types.external'),
                        2000,
                        t('quote.design_types.3d'),
                        2000,
                        t('quote.design_types.architectural'),
                        2000,
                        t('quote.design_types.structural'),
                        2000,
                      ]
                    : [
                        t('quote.design_types.external'),
                        2000,
                        t('quote.design_types.3d'),
                        2000,
                        t('quote.design_types.architectural'),
                        2000,
                        t('quote.design_types.structural'),
                        2000,
                      ]
                }
                wrapper='span'
                speed={25}
                repeat={Infinity}
                cursor={true}
                className='text-[#ff3e33]'
              />
            </h1>
            <p className='text-gray-300 text-md md:text-lg mt-6'>{t('quote.subtitle')}</p>
          </div>
        </div>
        <hr className='border-[#222] w-full max-w-6xl my-6 md:my-8' />
        {/* Form */}
        <QuoteForm />
      </div>
    </>
  );
};

export default Quote;

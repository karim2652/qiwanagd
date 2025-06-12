import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import SEO from '../components/SEO/SEO';
import HeroSection from './HeroSection';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import partnerData from '../data/partnerData';
import { Link } from 'react-router-dom';

const Partners = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // تجهيز صور اللايت بوكس
  const lightboxImages = partnerData.map((partner) => ({
    src: partner.image,
    alt: partner.name,
    title: partner.name,
  }));

  return (
    <>
      <SEO
        title={t('partners.meta.title')}
        description={t('partners.meta.description')}
        keywords={t('partners.meta.keywords')}
        url='/partners'
        type='website'
      />
      <div className='m-4'>
        <HeroSection
          backgroundImage='/images/partners/partenrsbg.webp'
          title={t('partners.title')}
          subtitle={t('partners.subtitle')}
        />
      </div>
      <div className='relative w-full pb-5'>
        <div className='mx-5 px-4 bg-black py-16'>
          {/* العنوان */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='text-center mb-20'
          >
            <h2 className='text-4xl font-bold text-white mb-6 tracking-tight'>
              {t('partners.title', 'شركاء النجاح')}
            </h2>
            <div className='w-32 h-1 bg-gradient-to-r from-[#ff3e33] to-[#ff6b33] mx-auto rounded-full'></div>
            <p className='mt-6 text-gray-300 max-w-2xl mx-auto text-lg'>
              {t(
                'partners.description',
                'نفخر بشراكتنا مع نخبة من الشركات الرائدة في مجال الهندسة والتصميم'
              )}
            </p>
          </motion.div>

          {/* شبكة الشركاء */}
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-8 max-w-7xl mx-auto px-4'>
            {partnerData.map((partner, idx) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.1,
                  type: 'spring',
                  stiffness: 100,
                }}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                  transition: { duration: 0.2 },
                }}
                className='group relative bg-white rounded-2xl h-auto  flex items-center justify-center shadow-lg border border-[#232428] hover:border-[#ff3e33]/40 cursor-pointer overflow-hidden transition-all duration-500'
                onClick={() => {
                  setLightboxIndex(idx);
                  setLightboxOpen(true);
                }}
              >
                {/* شعار الشريك */}
                <div className='relative z-10 w-full h-full flex items-center justify-center'>
                  <LazyLoadImage
                    src={partner.image}
                    alt={partner.name}
                    effect='blur'
                    className='object-cover   mx-auto my-auto drop-shadow-lg transition-all duration-500 group-hover:scale-105'
                    wrapperClassName='w-full h-full flex items-center justify-center'
                    style={{
                      filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.18))',
                    }}
                  />
                </div>
                {/* معلومات الشريك */}
                <div className='absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 text-center'>
                  <h3 className='text-white text-sm font-semibold truncate'>{partner.name}</h3>
                  <p className='text-gray-300 text-xs mt-1 line-clamp-2'>{partner.description}</p>
                </div>
                {/* أيقونة التكبير */}
                <div className='absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='text-white'
                  >
                    <circle cx='11' cy='11' r='8' />
                    <path d='m21 21-4.3-4.3' />
                    <path d='M11 8v6' />
                    <path d='M8 11h6' />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>

          {/* قسم دعوة للعمل */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className='mt-32 text-center relative'
          >
            <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black/50 -z-10'></div>
            <h3 className='text-3xl font-bold text-white mb-6'>
              {t('partners.become_partner', 'كن شريكاً معنا')}
            </h3>
            <p className='text-gray-300 mb-10 max-w-2xl mx-auto text-lg leading-relaxed'>
              {t(
                'partners.partner_cta',
                'نحن نبحث دائماً عن شركاء جدد لتعزيز خدماتنا وتوسيع نطاق عملنا. انضم إلينا في رحلة النجاح والتميز'
              )}
            </p>
            <Link
              to='/contact'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='inline-block bg-gradient-to-r from-[#ff3e33] to-[#ff6b33] text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300'
            >
              {t('partners.contact_us', 'تواصل معنا')}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Lightbox لعرض صور الشركاء */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={lightboxImages}
        index={lightboxIndex}
        render={{
          slide: ({ slide }) => (
            <div className='flex items-center justify-center w-full h-full p-4'>
              <div className='bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 flex flex-col items-center justify-center max-w-4xl mx-auto'>
                <div className='w-full h-full flex items-center justify-center bg-white/80 rounded-xl p-6'>
                  <LazyLoadImage
                    src={slide.src}
                    alt={slide.alt || ''}
                    effect='blur'
                    className='max-h-[60vh] max-w-full w-auto h-auto object-contain'
                    wrapperClassName='w-full h-full flex items-center justify-center'
                    style={{
                      filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.1))',
                      background: 'transparent',
                      borderRadius: '0.75rem',
                    }}
                  />
                </div>
                <h3 className='text-xl font-semibold text-gray-800 mt-6 text-center'>
                  {slide.title}
                </h3>
              </div>
            </div>
          ),
          iconPrev: () => (
            <div className='bg-black rounded-full p-2 text-white flex items-center justify-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='36'
                height='36'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='m15 18-6-6 6-6' />
              </svg>
            </div>
          ),
          iconNext: () => (
            <div className='bg-black rounded-full p-2 text-white flex items-center justify-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='36'
                height='36'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='m9 18 6-6-6-6' />
              </svg>
            </div>
          ),
          iconClose: () => (
            <div className='bg-black rounded-full p-2 text-white flex items-center justify-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='M18 6 6 18' />
                <path d='m6 6 12 12' />
              </svg>
            </div>
          ),
        }}
        styles={{
          container: { backgroundColor: 'rgba(0,0,0,0.95)' },
          root: {
            '--yarl__color_backdrop': 'rgba(0,0,0,0.95)',
            '--yarl__slide_captions_background': 'rgba(0,0,0,0.8)',
          },
        }}
      />
    </>
  );
};

export default Partners;

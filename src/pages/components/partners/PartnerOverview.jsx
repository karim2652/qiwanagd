import React, { useRef, useState, Suspense, lazy } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import partnerData from '../../../data/partnerData';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import 'yet-another-react-lightbox/styles.css';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

// استبدال الاستيراد المباشر لـ Slider وLightbox
const Slider = lazy(() => import('react-slick'));
const Lightbox = lazy(() => import('yet-another-react-lightbox'));

const PartnerOverview = () => {
  const sliderRef = useRef(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const { t } = useTranslation();

  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    arrows: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  const nextSlide = () => {
    sliderRef.current.slickNext();
  };

  const prevSlide = () => {
    sliderRef.current.slickPrev();
  };

  // تجهيز صور اللايت بوكس
  const lightboxImages = partnerData.map((partner) => ({
    src: partner.image,
    alt: partner.name,
    title: partner.name,
  }));

  return (
    <div className='relative w-full py-12 '>
      <div className=' mx-auto px-4 bg-black py-12'>
        {/* العنوان */}
        <div className='text-center mb-24'>
          <h2 className='text-3xl font-bold text-gray-100 mb-4'>
            {t('partners.title', 'شركاء النجاح')}
          </h2>
          <div className='w-24 h-1 bg-[#ff3e33] mx-auto rounded-full'></div>
        </div>

        <div className='relative flex items-center justify-center'>
          {/* زر السابق خارج السلايدر مباشرة */}
          <button
            onClick={nextSlide}
            className='z-10 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 -translate-y-1/2 absolute left-0 md:-left-2 top-1/2'
          >
            <FaChevronLeft size={24} />
          </button>

          {/* السلايدر مع التدرج */}
          <div className='relative w-full max-w-6xl'>
            {/* تأثير التدرج على الجانبين داخل السلايدر */}
            <div className='pointer-events-none absolute left-0 top-0 bottom-0 w-16 z-10'></div>
            <div className='pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-10'></div>
            <Suspense fallback={<div>Loading slider...</div>}>
              <Slider ref={sliderRef} {...settings}>
                {partnerData.map((partner, idx) => (
                  <div key={partner.id} className='px-3'>
                    <div
                      className='bg-white rounded-xl p-6 h-40 flex items-center justify-center transform transition-all duration-500 hover:scale-105 hover:shadow-xl border border-gray-100 hover:border-blue-100 cursor-pointer'
                      onClick={() => {
                        setLightboxIndex(idx);
                        setLightboxOpen(true);
                      }}
                    >
                      <LazyLoadImage
                        src={partner.image}
                        alt={partner.name}
                        effect='blur'
                        className='max-h-full max-w-full object-contain transition-all duration-500'
                        wrapperClassName='w-full h-full flex items-center justify-center'
                      />
                    </div>
                  </div>
                ))}
              </Slider>
            </Suspense>
          </div>

          {/* زر التالي خارج السلايدر مباشرة */}
          <button
            onClick={prevSlide}
            className='z-10 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 -translate-y-1/2 absolute right-0 md:-right-2 top-1/2'
          >
            <FaChevronRight size={24} />
          </button>
        </div>

        {/* زر عرض المزيد */}
        <div className='flex justify-center mt-24'>
          <Link
            to='/partners'
            className='bg-[#ff3e33] text-white px-8 py-3 rounded-full font-bold text-lg shadow-md hover:bg-[#e62e22] transition-all duration-300'
          >
            {t('partners.view_more', 'عرض المزيد')}
          </Link>
        </div>
      </div>

      {/* Lightbox لعرض صور الشركاء */}
      <Suspense fallback={<div>Loading preview...</div>}>
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={lightboxImages}
          index={lightboxIndex}
          render={{
            slide: ({ slide }) => (
              <div className='flex items-center justify-center w-full h-full'>
                <div className='bg-white rounded-2xl shadow-lg p-4 flex items-center justify-center'>
                  <LazyLoadImage
                    src={slide.src}
                    alt={slide.alt || ''}
                    effect='blur'
                    className='max-h-[80vh] max-w-full object-contain'
                    wrapperClassName='w-full h-full flex items-center justify-center'
                    style={{ background: 'white', borderRadius: '1rem' }}
                  />
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
            container: { backgroundColor: 'rgba(0,0,0,0.9)' },
            root: { '--yarl__color_backdrop': 'rgba(0,0,0,0.9)' },
          }}
        />
      </Suspense>
    </div>
  );
};

export default PartnerOverview;

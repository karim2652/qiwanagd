import React, { memo, useState, useEffect } from 'react';
import { Button } from '../../../components/ui/Button';
import { useTranslation } from 'react-i18next';
import styles from './HomeCover.module.css';
import { useNavigate } from 'react-router-dom';

// Import images using Vite's import.meta.glob
const images = import.meta.glob('../../../assets/images/home/*.webp', { eager: true, as: 'url' });
const image1 = images['../../../assets/images/home/1.webp'];
const image2 = images['../../../assets/images/home/2.webp'];
const image3 = images['../../../assets/images/home/3.webp'];

// Preload images
const preloadImage = (src) => {
  if (!src) return Promise.resolve();
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    if (img.decode) {
      return img.decode().then(resolve).catch(resolve);
    }
    img.onload = resolve;
    img.onerror = resolve;
  });
};

// Define slides array with translation keys
const slides = [
  {
    image: image1,
    titleKey: 'home.slide1.title',
    descriptionKey: 'home.slide1.description',
    highlightKey: 'home.slide1.highlight',
    priority: true,
  },
  {
    image: image2,
    titleKey: 'home.slide2.title',
    descriptionKey: 'home.slide2.description',
    highlightKey: 'home.slide2.highlight',
    priority: true,
  },
  {
    image: image3,
    titleKey: 'home.slide3.title',
    descriptionKey: 'home.slide3.description',
    highlightKey: 'home.slide3.highlight',
  },
];

const preloadAllImages = () => {
  return Promise.all(slides.map(slide => preloadImage(slide.image)));
};

const HomeCover = memo(() => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const isRTL = currentLanguage === 'ar';
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextSlideIndex, setNextSlideIndex] = useState(null);
  const [currentContent, setCurrentContent] = useState(slides[0]);
  const [nextContent, setNextContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    // Preload first image immediately
    const loadFirstImage = async () => {
      await preloadImage(currentContent.image);
      setLoadedImages(prev => ({ ...prev, [0]: true }));
      setIsLoading(false);
    };

    loadFirstImage();
  }, []);

  // Preload next slide image when current slide changes
  useEffect(() => {
    if (isLoading) return;

    const nextIndex = (currentSlide + 1) % slides.length;
    if (!loadedImages[nextIndex]) {
      const nextImage = slides[nextIndex].image;
      preloadImage(nextImage)
        .then(() => {
          setLoadedImages(prev => ({ ...prev, [nextIndex]: true }));
        });
    }
  }, [currentSlide, isLoading, loadedImages]);

  useEffect(() => {
    if (isLoading || isTransitioning) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isTransitioning, isLoading]);

  const nextSlide = () => {
    if (isTransitioning || isLoading) return;
    setIsTransitioning(true);
    const nextIndex = (currentSlide + 1) % slides.length;
    setNextSlideIndex(nextIndex);
    setNextContent(slides[nextIndex]);

    // Synchronize content and image transitions
    setTimeout(() => {
      setCurrentSlide(nextIndex);
      setCurrentContent(slides[nextIndex]);
      setNextSlideIndex(null);
      setNextContent(null);
      setTimeout(() => setIsTransitioning(false), 600);
    }, 600);
  };

  // const prevSlide = () => {
  //   if (isTransitioning) return;
  //   setIsTransitioning(true);
  //   const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
  //   setNextSlideIndex(prevIndex);
  //   setNextContent(slides[prevIndex]);

  //   // Synchronize content and image transitions
  //   setTimeout(() => {
  //     setCurrentSlide(prevIndex);
  //     setCurrentContent(slides[prevIndex]);
  //     setNextSlideIndex(null);
  //     setNextContent(null);
  //     setTimeout(() => setIsTransitioning(false), 600);
  //   }, 600);
  // };

  const handleQuoteClick = () => {
    navigate('/quote');
  };

  useEffect(() => {
    // Preload all images when component mounts
    preloadAllImages().catch(console.error);
  }, []);

  if (isLoading) {
    return (
      <div className={`${styles.homeCover} flex items-center justify-center`} style={{ height: '80vh' }}>
        <div className="animate-pulse bg-gray-200 w-full h-full"></div>
      </div>
    );
  }

  return (
    <section
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`${styles.homeCover} relative flex items-center justify-center m-4 overflow-hidden border border-red-500`}
    >
      {/* Background Images with Synchronized Transitions */}
      <div
        className='w-full h-full absolute inset-0 transition-all duration-1000 ease-in-out'
        style={{
          backgroundImage: `url(${currentContent.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: isTransitioning ? 0.9 : 1,
          filter: isTransitioning ? 'brightness(0.95)' : 'brightness(1)',
          willChange: 'transform, opacity',
          transform: 'translateZ(0)',
          loading: currentContent.priority ? 'eager' : 'lazy',
          fetchPriority: currentContent.priority ? 'high' : 'auto',
        }}
      />
      {nextSlideIndex !== null && (
        <div
          className='w-full h-full absolute inset-0 transition-all duration-1000 ease-in-out'
          style={{
            backgroundImage: `url(${nextContent.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: isTransitioning ? 0.1 : 0,
            filter: isTransitioning ? 'brightness(1.05)' : 'brightness(1)',
            willChange: 'transform, opacity',
            transform: 'translateZ(0)',
          }}
        />
      )}

      {/* Navigation Buttons */}
      {/* <button
        onClick={prevSlide}
        className={`absolute left-0 rounded-r-full top-1/2 -translate-y-1/2 w-4 sm:w-6 h-12 sm:h-20 bg-[#f7fafd] backdrop-blur-sm shadow-lg 
        transition-all duration-300 z-20 flex items-center justify-center cursor-pointer
        `}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-3 w-3 sm:h-4 sm:w-4 text-gray-700'
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path
            fillRule='evenodd'
            d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
            clipRule='evenodd'
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className={`absolute right-0 rounded-l-full top-1/2 -translate-y-1/2 w-4 sm:w-6 h-12 sm:h-20 bg-[#f7fafd] backdrop-blur-sm shadow-lg 
        transition-all duration-300 z-20 flex items-center justify-center cursor-pointer
       `}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-3 w-3 sm:h-4 sm:w-4 text-gray-700'
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path
            fillRule='evenodd'
            d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
            clipRule='evenodd'
          />
        </svg>
      </button> */}

      {/* Gradient Overlay */}
      <div
        className='absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50 rounded-[20px] z-10 
        transition-all duration-1000 ease-in-out'
        style={{
          opacity: isTransitioning ? 0.9 : 1,
          filter: isTransitioning ? 'blur(0.5px)' : 'blur(0)',
        }}
      />

      {/* Content with Synchronized Transitions */}
      <div
        className='absolute inset-0 flex items-center justify-center z-20 transition-all duration-1000 ease-in-out'
        style={{
          opacity: isTransitioning ? 0.9 : 1,
          transform: isTransitioning ? 'scale(0.995)' : 'scale(1)',
        }}
      >
        <div className='w-[90%] max-w-[800px] flex flex-col items-center'>
          <h1 className='text-4xl md:text-6xl font-bold text-white mb-8 leading-tight tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] text-center'>
            {t(currentContent.titleKey)
              .split(' ')
              .map((word, wordIndex, words) => (
                <span
                  key={wordIndex}
                  className={
                    word === t(currentContent.highlightKey)
                      ? 'text-[#F76F51] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]'
                      : undefined
                  }
                >
                  {word}
                  {wordIndex < words.length - 1 ? ' ' : ''}
                </span>
              ))}
          </h1>

          <p className='text-base md:text-lg text-white/90 mb-12 max-w-[600px] leading-relaxed font-bold drop-shadow-md text-center'>
            {t(currentContent.descriptionKey)}
          </p>

          <div className='relative shadow-xl'>
            <Button
              text={t('home.request_quote')}
              variant='primary'
              size='medium'
              bgColor='white'
              circleColor='#ff3e33'
              direction={isRTL ? 'rtl' : 'ltr'}
              onClick={handleQuoteClick}
            />
          </div>
        </div>
      </div>

      {/* Next Content (Hidden during transition) */}
      {nextContent && (
        <div
          className='absolute inset-0 flex items-center justify-center z-20 transition-all duration-1000 ease-in-out opacity-0'
          style={{
            opacity: isTransitioning ? 0.1 : 0,
            transform: isTransitioning ? 'scale(1.005)' : 'scale(1)',
          }}
        >
          <div className='w-[90%] max-w-[800px] flex flex-col items-center'>
            <span className='inline-block px-6 py-3 text-sm uppercase tracking-widest bg-white/10 text-white rounded-full mb-8 border border-white/20 backdrop-blur-md shadow-lg font-medium'>
              {t('home.company_name')}
            </span>

            <h1 className='text-4xl md:text-6xl font-bold text-white mb-8 leading-tight tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] text-center'>
              {t(nextContent.titleKey)
                .split(' ')
                .map((word, wordIndex, words) => (
                  <span
                    key={wordIndex}
                    className={
                      word === t(nextContent.highlightKey)
                        ? 'text-[#F76F51] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]'
                        : undefined
                    }
                  >
                    {word}
                    {wordIndex < words.length - 1 ? ' ' : ''}
                  </span>
                ))}
            </h1>

            <p className='text-base md:text-lg text-white/90 mb-12 max-w-[600px] leading-relaxed font-bold drop-shadow-md text-center'>
              {t(nextContent.descriptionKey)}
            </p>

            <div className='relative shadow-xl'>
              <Button
                text={t('home.request_quote')}
                variant='primary'
                size='medium'
                bgColor='white'
                circleColor='#ff3e33'
                direction={isRTL ? 'rtl' : 'ltr'}
                onClick={handleQuoteClick}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
});

HomeCover.displayName = 'HomeCover';

export default HomeCover;

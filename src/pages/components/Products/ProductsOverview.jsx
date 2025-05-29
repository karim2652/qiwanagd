import React, { useState, useMemo } from 'react';
import { projects, projectCategories } from './projectsData';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { motion, AnimatePresence } from 'framer-motion';
import Lightbox from 'yet-another-react-lightbox';
import Skeleton from 'react-loading-skeleton';
import Masonry from 'react-masonry-css';
import { useTranslation } from 'react-i18next';
import 'react-loading-skeleton/dist/skeleton.css';
import 'yet-another-react-lightbox/styles.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

const ProductsOverview = () => {
  const { t, i18n } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleItems, setVisibleItems] = useState(15);
  const [isLoading, setIsLoading] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const ITEMS_PER_LOAD = 13;
  const currentLanguage = i18n.language;
  const isRTL = currentLanguage === 'ar';

  // Advanced Masonry breakpoints configuration
  const breakpointColumnsObj = {
    default: 4,
    1440: 4,
    1280: 3,
    1024: 3,
    768: 2,
    640: 2,
    500: 1,
  };

  // Enhanced masonry grid styles
  const masonryStyles = `
    .my-masonry-grid {
      display: flex;
      width: auto;
      margin-left: -20px; /* Adjust for gutter */
      margin-right: -20px; /* Adjust for gutter */
    }
    
    .my-masonry-grid_column {
      padding-left: 20px; /* Gutter */
      padding-right: 20px; /* Gutter */
      background-clip: padding-box;
    }
    
    .my-masonry-grid_column > div {
      margin-bottom: 40px;
      border-radius: 12px;
      overflow: hidden;
      transform: translateZ(0); /* Hardware acceleration */
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .my-masonry-grid_column > div:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }
    
    /* Responsive adjustments */
    @media (max-width: 1280px) {
      .my-masonry-grid_column > div {
        margin-bottom: 30px;
      }
    }
    
    @media (max-width: 768px) {
      .my-masonry-grid_column > div {
        margin-bottom: 25px;
      }
    }
    
    @media (max-width: 500px) {
      .my-masonry-grid {
        margin-left: -10px;
        margin-right: -10px;
      }
      .my-masonry-grid_column {
        padding-left: 10px;
        padding-right: 10px;
      }
      .my-masonry-grid_column > div {
        margin-bottom: 20px;
      }
    }
  `;

  // Professional skeleton placeholder using react-loading-skeleton
  const SkeletonPlaceholder = () => (
    <div className='w-full h-full rounded-xl overflow-hidden'>
      <Skeleton
        height='100%'
        width='100%'
        borderRadius={12}
        baseColor='#f0f0f0'
        highlightColor='#f8f8f8'
        duration={1.8}
      />
    </div>
  );

  const filters = useMemo(
    () => [
      { id: 'all', title: t('projects.filter.all') },
      { id: 'Exterior design', title: isRTL ? 'تصميم خارجي' : 'Exterior design' },
      { id: 'Interior design', title: isRTL ? 'تصميم داخلي' : 'Interior design' },
      { id: 'Other design', title: isRTL ? 'تصاميم اخري' : 'Other design' },
    ],
    [t, isRTL]
  );

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => activeFilter === 'all' || p.type === activeFilter);
  }, [activeFilter]);

  // Create an array of image objects for the lightbox
  const lightboxImages = useMemo(() => {
    return filteredProjects
      .filter((project) => project && project.id) // Filter out invalid projects
      .slice(0, visibleItems) // Only use visible projects
      .map((project) => ({
        src: project.src || '/images/placeholder.png',
        alt:
          (project.title && typeof project.title === 'object'
            ? isRTL
              ? project.title.ar
              : project.title.en
            : project.title) || 'Project image',
        title:
          (project.title && typeof project.title === 'object'
            ? isRTL
              ? project.title.ar
              : project.title.en
            : project.title) || '',
        description:
          project.category && project.category.title && typeof project.category.title === 'object'
            ? isRTL
              ? project.category.title.ar
              : project.category.title.en
            : project.category
              ? project.category.title
              : '',
      }));
  }, [filteredProjects, visibleItems, isRTL]); // Add isRTL as dependency

  const handleLoadMore = () => {
    setVisibleItems((prev) => Math.min(prev + ITEMS_PER_LOAD, filteredProjects.length));
  };

  const handleFilterChange = (filterId) => {
    if (filterId === activeFilter) return;
    setActiveFilter(filterId);
    setVisibleItems(13);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 300);
  };

  // Open lightbox with index
  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  // Generate professional skeleton grid with dynamic heights using react-loading-skeleton
  const renderSkeletonGrid = () => {
    // Calculate approximate heights for skeleton items to match the same masonry pattern
    const heights = [
      '300px',
      '350px',
      '280px',
      '320px',
      '350px',
      '300px',
      '250px',
      '330px',
      '280px',
      '350px',
      '300px',
      '280px',
      '320px',
    ];

    return (
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className='my-masonry-grid'
        columnClassName='my-masonry-grid_column'
      >
        {Array.from({ length: 13 }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div style={{ height: heights[index % heights.length] }}>
              <Skeleton
                height='100%'
                width='100%'
                borderRadius={12}
                baseColor='#f0f0f0'
                highlightColor='#f8f8f8'
                duration={1.8}
                enableAnimation={true}
                style={{
                  display: 'block',
                  lineHeight: 1,
                }}
              />
            </div>
          </motion.div>
        ))}
      </Masonry>
    );
  };

  // Calculate dynamic heights based on image ratio
  const getProjectHeight = (index) => {
    // Create an array of different heights for variation
    const heightOptions = ['320px', '380px', '280px', '360px', '300px'];
    return heightOptions[index % heightOptions.length];
  };

  const getImageUrl = (src) => {
    if (!src) return '/images/placeholder.png';
    // If the URL is already absolute, return it as is
    if (src.startsWith('http://') || src.startsWith('https://')) {
      return src;
    }
    // For relative paths, ensure they start with a forward slash
    return src.startsWith('/') ? src : `/assets/images/projects/${src}`;
  };

  return (
    <section className=' py-16'>
      {/* Add masonry custom styles */}
      <style>{masonryStyles}</style>

      <div className='max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-center mb-12'
        >
          <span className='text-[#ff4d29] text-sm tracking-wider font-semibold block mb-3'>
            {t('projects.title')}
          </span>
          <h2 className='text-4xl md:text-5xl font-bold text-[#181818]'>
            {t('projects.subtitle')}
          </h2>
        </motion.div>

        <motion.div
          className='flex justify-center gap-3 mb-12 flex-wrap'
          dir={isRTL ? 'rtl' : 'ltr'}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              onClick={() => handleFilterChange(filter.id)}
              className={`
                px-6 py-2.5 rounded-full transition-all duration-300 text-sm font-medium
                ${
                  activeFilter === filter.id
                    ? 'bg-[#ff4d29] text-white shadow-lg'
                    : 'bg-gray-50 text-gray-800 hover:bg-gray-100 hover:shadow'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter.title}
            </motion.button>
          ))}
        </motion.div>

        {isLoading ? (
          <AnimatePresence>
            <motion.div
              className='min-h-[400px]'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {renderSkeletonGrid()}
            </motion.div>
          </AnimatePresence>
        ) : (
          <motion.div variants={containerVariants} initial='hidden' animate='show'>
            <AnimatePresence>
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className='my-masonry-grid'
                columnClassName='my-masonry-grid_column'
              >
                {filteredProjects
                  .filter((project) => project && project.id) // Filter out any invalid projects
                  .slice(0, visibleItems)
                  .map((project, index) => (
                    <motion.div
                      key={project.id}
                      className='group relative overflow-hidden rounded-xl cursor-pointer'
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                      onClick={() => openLightbox(index)}
                      style={{ height: getProjectHeight(index) }}
                    >
                      <div className='relative h-full w-full overflow-hidden rounded-xl'>
                        <LazyLoadImage
                          src={getImageUrl(project.src)}
                          alt={project.title || 'Project image'}
                          effect='opacity'
                          className='w-full h-full object-cover rounded-xl transform transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform group-hover:scale-110'
                          placeholder={<SkeletonPlaceholder />}
                          wrapperClassName='w-full h-full'
                          onError={(e) => {
                            if (e && e.target) {
                              e.target.onerror = null;
                              try {
                                e.target.src = '/images/placeholder.png';
                              } catch (_) {
                                // Ignore any errors when setting fallback
                              }
                            }
                          }}
                        />
                        <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] rounded-xl'>
                          <div
                            className={`absolute bottom-0 ${isRTL ? 'right-0' : 'left-0'} w-full p-6 ${isRTL ? 'text-right' : 'text-left'} transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]`}
                          >
                            <h3 className='text-white text-xl font-bold mb-3 transform -translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-[50ms] ease-[cubic-bezier(0.4,0,0.2,1)]'>
                              {project.title && typeof project.title === 'object'
                                ? isRTL
                                  ? project.title.ar
                                  : project.title.en
                                : project.title}
                            </h3>
                            {project.category && (
                              <p className='text-white/80 text-sm transform -translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-[100ms] ease-[cubic-bezier(0.4,0,0.2,1)]'>
                                {project.category.title &&
                                typeof project.category.title === 'object'
                                  ? isRTL
                                    ? project.category.title.ar
                                    : project.category.title.en
                                  : project.category.title}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </Masonry>
            </AnimatePresence>
          </motion.div>
        )}

        {/* Lightbox for image preview */}
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={lightboxImages}
          index={lightboxIndex}
          render={{
            slide: ({ slide }) => (
              <div className='flex items-center justify-center w-full h-full min-h-[90vh]'>
                <LazyLoadImage
                  src={slide.src}
                  alt={slide.alt || ''}
                  effect='blur'
                  className='max-h-[90vh] max-w-[90vw] object-contain'
                  wrapperClassName='flex items-center justify-center'
                  onError={(e) => {
                    if (e && e.target) {
                      e.target.onerror = null;
                      e.target.src = '/images/placeholder.png';
                    }
                  }}
                />
              </div>
            ),
            iconPrev: () => (
              <div className='bg-black/30 backdrop-blur-sm p-2 rounded-full text-white'>
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
                  <path d='m15 18-6-6 6-6' />
                </svg>
              </div>
            ),
            iconNext: () => (
              <div className='bg-black/30 backdrop-blur-sm p-2 rounded-full text-white'>
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
                  <path d='m9 18 6-6-6-6' />
                </svg>
              </div>
            ),
            iconClose: () => (
              <div className='bg-black/30 backdrop-blur-sm p-2 rounded-full text-white'>
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
          carousel={{
            spacing: 20,
            padding: 20,
          }}
          controller={{
            closeOnBackdropClick: true,
            closeOnPullDown: true,
          }}
          styles={{
            container: {
              backgroundColor: 'rgba(0, 0, 0, 0.95)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
            root: {
              '--yarl__color_backdrop': 'rgba(0, 0, 0, 0.95)',
              '--yarl__slide_captions_background': 'rgba(0, 0, 0, 0.5)',
            },
            slide: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
          }}
        />

        {visibleItems < filteredProjects.length && (
          <motion.div
            className='text-center mt-12'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.button
              onClick={handleLoadMore}
              className='bg-white text-[#ff4d29] border-2 border-[#ff4d29] hover:bg-[#ff4d29] hover:text-white px-8 py-3 rounded-full transition-all duration-300 text-sm font-medium'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('projects.view_more')}
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProductsOverview;

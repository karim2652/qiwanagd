import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { blogData } from '../../../data/blogData';
import { blogDataEn } from '../../../data/blogDataEn';
import { Helmet } from 'react-helmet-async';
import SuggestedArticles from './SuggestedArticles';

const BlogDetails = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const { title } = useParams();
  const navigate = useNavigate();

  // Select data source based on language
  const dataSource = isArabic ? blogData : blogDataEn;

  // Create slug from title for comparison
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

  // Find post by matching slugs
  const post = dataSource.posts.find((post) => {
    const postSlug = createSlug(post.title);
    return postSlug === title;
  });

  useEffect(() => {
    const savedLang = localStorage.getItem('i18nextLng');
    if (savedLang && savedLang !== i18n.language) {
      i18n.changeLanguage(savedLang);
    }
  }, [i18n]);

  const fontFamily = isArabic ? 'Tajawal, Cairo, Arial, sans-serif' : 'inherit';

  if (!post) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <p className='text-2xl text-gray-600 mb-4'>
            {isArabic ? 'المقال غير موجود' : 'Article not found'}
          </p>
          <button
            onClick={() => navigate('/blog')}
            className='px-6 py-3 bg-[#FF5E3A] text-white rounded-lg hover:bg-[#FF5E3A]/90 transition-colors duration-300'
          >
            {isArabic ? 'العودة إلى المدونة' : 'Back to Blog'}
          </button>
        </div>
      </div>
    );
  }

  const translatedTitle = post.title;
  const translatedDescription = post.description;
  // Use structured content array from blogData instead of parsing raw articleBody
  const contentBlocks = post.content || [];

  const getTranslatedCategory = (category) => {
    if (isArabic) return category;
    switch (category) {
      case 'Featured Article':
        return t('blog.categories.featured');
      case 'Engineering Services':
        return t('blog.categories.engineering_services');
      case 'Surveying Services':
        return t('blog.categories.surveying');
      case 'Architecture & Design':
        return t('blog.categories.architecture');
      case 'Construction':
        return t('blog.categories.construction');
      default:
        return category;
    }
  };

  const getTranslatedTag = (tag) => {
    if (isArabic) return tag;
    return tag;
  };

  const getTranslatedDate = (dateStr) => {
    if (isArabic) {
      const monthsMap = {
        January: 'يناير',
        February: 'فبراير',
        March: 'مارس',
        April: 'أبريل',
        May: 'مايو',
        June: 'يونيو',
        July: 'يوليو',
        August: 'أغسطس',
        September: 'سبتمبر',
        October: 'أكتوبر',
        November: 'نوفمبر',
        December: 'ديسمبر',
      };
      const parts = dateStr.split(' ');
      if (parts.length === 3 && monthsMap[parts[0]]) {
        return `${parts[1]} ${monthsMap[parts[0]]} ${parts[2]}`;
      }
    }
    return dateStr;
  };

  const ContentBlock = ({ block }) => {
    const { type } = block;
    switch (type) {
      case 'paragraph':
        return (
          <p
            className={`text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-5 md:mb-6 leading-relaxed ${isArabic ? 'text-right' : 'text-left'}`}
            style={{ fontFamily }}
            dir={isArabic ? 'rtl' : 'ltr'}
          >
            {block.text}
          </p>
        );
      case 'toc':
        return (
          <div className='bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 mb-6 sm:mb-7 md:mb-8 border border-gray-200 shadow-sm'>
            <h3
              className='text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6 tracking-wide text-center'
              style={{ fontFamily }}
            >
              {block.title}
            </h3>
            <ul className='mt-3 sm:mt-4 space-y-2 sm:space-y-3' dir={isArabic ? 'rtl' : 'ltr'}>
              {block.items.map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => {
                      const el = document.getElementById(item.id);
                      el && el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className='w-full text-blue-600 hover:text-blue-800 hover:underline cursor-pointer p-1.5 sm:p-2 rounded-md hover:bg-blue-50 text-sm sm:text-base'
                    style={{ fontFamily }}
                    dir={isArabic ? 'rtl' : 'ltr'}
                  >
                    {idx + 1}. {item.text}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );
      case 'section-header':
        return (
          <div className='mb-4 sm:mb-5 md:mb-6 mt-6 sm:mt-7 md:mt-8'>
            <h2
              id={block.id}
              className='text-lg sm:text-xl md:text-2xl font-bold text-gray-900'
              style={{ fontFamily }}
            >
              {block.text}
            </h2>
            <div className='mt-2 w-16 h-[4px] rounded-full bg-gradient-to-r from-[#FF5E3A] to-[#ff9a3a]'></div>
          </div>
        );
      case 'bullet-list':
        return (
          <ul
            className={`list-disc list-inside marker:text-[#FF5E3A] mb-4 sm:mb-5 md:mb-6 ${isArabic ? 'text-right' : 'text-left'} text-sm sm:text-base md:text-lg`}
            style={{ fontFamily }}
          >
            {block.items.map((item, idx) => (
              <li key={idx} className='my-1 sm:my-1.5'>
                {item}
              </li>
            ))}
          </ul>
        );
      case 'numbered-list':
        return (
          <ol
            className={`list-decimal list-inside mb-4 sm:mb-5 md:mb-6 ${isArabic ? 'text-right' : 'text-left'} text-sm sm:text-base md:text-lg`}
            style={{ fontFamily }}
          >
            {block.items.map((item, idx) => (
              <li key={idx} className='mb-1 sm:mb-1.5'>
                {item}
              </li>
            ))}
          </ol>
        );
      case 'callout':
        return (
          <div
            className={`bg-gradient-to-r ${isArabic ? 'from-gray-100 to-gray-50' : 'from-gray-50 to-gray-100'} rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 mb-4 sm:mb-5 md:mb-6 border border-gray-200 shadow-sm text-sm sm:text-base md:text-lg`}
            style={{ fontFamily }}
          >
            {block.icon && <span className='mr-2'>{block.icon}</span>}
            <span>{block.text}</span>
          </div>
        );
      case 'qa':
        return (
          <div className='mb-3 sm:mb-4 md:mb-5'>
            <p
              className={`text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 ${isArabic ? 'text-right' : 'text-left'}`}
              style={{ fontFamily }}
            >
              {block.question}
            </p>
            <div className='bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 border border-gray-200 shadow-sm'>
              <p
                className={`text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed ${isArabic ? 'text-right' : 'text-left'}`}
                style={{ fontFamily }}
              >
                {block.answer}
              </p>
            </div>
          </div>
        );
      case 'checklist':
        return (
          <ul
            className='mb-4 sm:mb-5 md:mb-6 text-sm sm:text-base md:text-lg'
            style={{ fontFamily }}
          >
            {block.items.map((item, idx) => (
              <li key={idx} className='flex items-start gap-2 mb-1.5 sm:mb-2 justify-start'>
                <span className='text-[#FF5E3A]'>✔</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        );
      case 'cta':
        return (
          <div className='mt-6 sm:mt-7 md:mt-8 text-center'>
            <button className='px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-[#FF5E3A] text-white rounded-lg hover:bg-[#FF5E3A]/90 transition-colors duration-300 text-sm sm:text-base md:text-lg'>
              {block.text}
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>{translatedTitle}</title>
        <meta name='description' content={translatedDescription} />
        <meta name='keywords' content={post.metaKeywords} />
        <meta property='og:title' content={translatedTitle} />
        <meta property='og:description' content={translatedDescription} />
        <meta property='og:image' content={post.ogImage} />
        <meta property='og:url' content={post.canonicalUrl} />
        <meta property='og:type' content='article' />
        <link rel='canonical' href={post.canonicalUrl} />
        <script type='application/ld+json'>{JSON.stringify(post.schema)}</script>
      </Helmet>

      <div
        className='min-h-screen py-4 sm:py-6 md:py-8 lg:py-10 bg-gray-50'
        dir={isArabic ? 'rtl' : 'ltr'}
        style={{ fontFamily }}
      >
        <div className='w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8'>
          <div className='flex flex-col-reverse md:flex-row gap-4 sm:gap-6 md:gap-8'>
            {/* Article content */}
            <div className={`flex-1 order-1 md:order-0 ${isArabic ? 'md:order-1' : 'md:order-0'}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden'
              >
                {/* Article main image */}
                <div className='relative w-full rounded-t-xl sm:rounded-t-2xl overflow-hidden aspect-[2] sm:aspect-[2/1] md:aspect-[2/1]'>
                  <LazyLoadImage
                    src={post.image}
                    alt={post.title}
                    effect='blur'
                    className='w-full h-full object-cover object-center transition-transform duration-500'
                    placeholderSrc='/assets/images/placeholder.png'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent' />
                  <div className='absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 lg:p-8 text-white z-10'>
                    <div className='flex flex-wrap items-center gap-1.5 sm:gap-2 md:gap-3 mb-2 sm:mb-3 md:mb-4'>
                      <span className='bg-white/20 backdrop-blur-sm text-white text-[11px] sm:text-xs md:text-sm font-medium px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full shadow'>
                        {getTranslatedCategory(post.category)}
                      </span>
                      <span className='text-white/80 text-[11px] sm:text-xs md:text-sm'>
                        {getTranslatedDate(post.date)}
                      </span>
                    </div>
                    <h1 className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 md:mb-4 drop-shadow-lg line-clamp-2'>
                      {translatedTitle}
                    </h1>
                    <div className='flex items-center gap-1.5 sm:gap-2'>
                      <span className='text-white/80 text-[11px] sm:text-xs md:text-sm'>
                        {t('blog.by')}
                      </span>
                      <span className='font-medium text-[11px] sm:text-xs md:text-sm'>
                        {post.author || 'Qawi Najd'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Article content */}
                <div className='p-4 sm:p-5 md:p-6 lg:p-8'>
                  {/* Article description */}
                  <div className='my-3 sm:my-4 rounded-lg sm:rounded-xl border border-[#FF5E3A]/10 p-3'>
                    <h2
                      className='text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3'
                      style={{ fontFamily }}
                    >
                      {t('blog.details.about_article')}
                    </h2>
                    <p
                      className={`text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed ${isArabic ? 'text-right' : 'text-left'}`}
                      style={{ fontFamily }}
                      dir={isArabic ? 'rtl' : 'ltr'}
                    >
                      {translatedDescription}
                    </p>
                  </div>

                  <div className='prose prose-sm sm:prose-base md:prose-lg max-w-none mt-4 sm:mt-5 md:mt-6'>
                    <div className='text-gray-600 leading-relaxed space-y-3 sm:space-y-4 md:space-y-5'>
                      {contentBlocks.length === 0 ? (
                        <p className='text-sm sm:text-base md:text-lg text-gray-500 italic'>
                          {t('blog.details.no_content')}
                        </p>
                      ) : (
                        contentBlocks.map((block, index) => (
                          <ContentBlock key={index} block={block} />
                        ))
                      )}
                    </div>
                  </div>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className='mt-6 sm:mt-8 md:mt-10 pt-4 sm:pt-5 md:pt-6 border-t border-gray-200'>
                      <h3
                        className='text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4'
                        style={{ fontFamily }}
                      >
                        {isArabic ? 'الوسوم' : 'Tags'}
                      </h3>
                      <div className='flex flex-wrap gap-1.5 sm:gap-2 md:gap-2.5'>
                        {post.tags.map((tag, index) => (
                          <span
                            key={index}
                            className='bg-gray-100 text-gray-700 px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full text-[11px] sm:text-xs md:text-sm font-medium hover:bg-[#FF5E3A] hover:text-white transition-colors duration-300'
                            style={{ fontFamily }}
                          >
                            {getTranslatedTag(tag)}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Keywords */}
                  {post.metaKeywords && (
                    <div className='mt-6 sm:mt-8 md:mt-10 pt-4 sm:pt-5 md:pt-6 border-t border-gray-200'>
                      <div className='flex flex-wrap gap-1.5 sm:gap-2 md:gap-2.5'>
                        {(isArabic
                          ? post.metaKeywords.split(',')
                          : post.id === 5
                            ? [
                                'Surveying Riyadh',
                                'Certified Survey Office',
                                'Surveying Cost in Saudi Arabia',
                                'Surveying Services Riyadh',
                                'Building Permit Survey',
                                'Riyadh Municipality',
                                'Land Surveying',
                              ]
                            : post.metaKeywords.split(',')
                        ).map((keyword, index) => (
                          <span
                            key={index}
                            className='bg-gray-100 text-gray-700 px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 my-1 rounded-full text-[11px] sm:text-xs md:text-sm font-medium'
                            style={{ fontFamily }}
                          >
                            {keyword.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Back to blog button */}
              <div className='mt-6 sm:mt-8 md:mt-10 pt-4 sm:pt-5 md:pt-6 border-t border-gray-200 flex justify-center'>
                <button
                  onClick={() => navigate('/blog')}
                  className='inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-[#FF5E3A] text-white rounded-lg hover:bg-[#FF5E3A]/90 transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base md:text-lg'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className={`h-4 w-4 sm:h-5 sm:w-5 ${isArabic ? 'rotate-180' : ''}`}
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d={isArabic ? 'M9 5l7 7-7 7' : 'M15 19l-7-7 7-7'}
                    />
                  </svg>
                  {isArabic ? 'العودة إلى المدونة' : 'Back to Blog'}
                </button>
              </div>
            </div>

            {/* Suggested articles */}
            <div
              className={`w-full md:w-72 lg:w-80 order-0 md:order-1 ${isArabic ? 'md:order-0' : 'md:order-1'}`}
            >
              <SuggestedArticles excludeId={post.id} isArabic={isArabic} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetails;

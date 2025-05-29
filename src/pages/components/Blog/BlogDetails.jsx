import React, { useEffect, useState } from 'react';
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
  const { id } = useParams();
  const navigate = useNavigate();

  // Select data source based on language
  const dataSource = isArabic ? blogData : blogDataEn;
  const post = dataSource.posts.find((post) => post.id === parseInt(id));

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
  const content = post.schema.articleBody;

  const paragraphs = content ? content.split('\n').filter((p) => p.trim()) : [];

  // Function to create section ID from text
  const createSectionId = (text) => {
    return text
      .replace(/^\d+\.\s*/, '') // Remove number and dot
      .replace(/[^\w\s\u0600-\u06FF]/g, '') // Keep only letters, numbers, spaces, and Arabic characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .toLowerCase();
  };

  // Function to parse table of contents and filter content
  const parseContentWithTOC = (paragraphs) => {
    const tocItems = [];
    const filteredContent = [];
    let inToc = false;
    let tocEndIndex = -1;
    let seenSections = new Set();
    let currentSectionTitle = null;
    let isInQuestion = false;

    // First pass: identify TOC items and find where TOC ends
    for (let i = 0; i < paragraphs.length; i++) {
      const trimmed = paragraphs[i].trim();

      // Check if this is the start of table of contents
      if (
        trimmed.includes('فهرس المحتويات') ||
        trimmed.toLowerCase().includes('table of contents')
      ) {
        inToc = true;
        continue;
      }

      // If we're in TOC and find a numbered item
      if (inToc && /^\d+\.\s/.test(trimmed)) {
        const sectionId = createSectionId(trimmed);
        const sectionNumber = trimmed.match(/^\d+/)[0];

        // Avoid duplicate sections
        if (!seenSections.has(sectionNumber)) {
          tocItems.push({
            text: trimmed,
            id: sectionId,
            number: sectionNumber,
          });
          seenSections.add(sectionNumber);
        }
      }

      // Check if TOC section has ended
      if (inToc && (trimmed === '' || (!trimmed.match(/^\d+\./) && tocItems.length > 0))) {
        tocEndIndex = i;
        inToc = false;
      }
    }

    // Second pass: filter out TOC items from main content
    const tocNumbers = new Set(tocItems.map((item) => item.number));

    for (let i = 0; i < paragraphs.length; i++) {
      const trimmed = paragraphs[i].trim();

      // Skip TOC section entirely
      if (
        trimmed.includes('فهرس المحتويات') ||
        trimmed.toLowerCase().includes('table of contents')
      ) {
        // Add TOC as special content block
        filteredContent.push({
          type: 'toc',
          content: trimmed,
          tocItems: tocItems,
          index: i,
        });

        // Skip until TOC ends
        while (i < paragraphs.length) {
          i++;
          const nextTrimmed = paragraphs[i]?.trim() || '';
          if (nextTrimmed === '' || (!nextTrimmed.match(/^\d+\./) && tocItems.length > 0)) {
            break;
          }
        }
        continue;
      }

      // Handle section headers (numbered sections)
      const sectionMatch = trimmed.match(/^\d+\.\s/);
      if (sectionMatch) {
        const sectionNumber = sectionMatch[0].replace('.', '').trim();
        if (tocNumbers.has(sectionNumber)) {
          // Add as section header with ID for scrolling
          const sectionId = createSectionId(trimmed);
          currentSectionTitle = trimmed;
          filteredContent.push({
            type: 'section-header',
            content: trimmed,
            sectionId: sectionId,
            index: i,
          });
          isInQuestion = false; // Reset question flag when we hit a new section
          continue;
        }
      }

      // Handle Q&A format (س: and ج:)
      if (trimmed.startsWith('س:') || trimmed.startsWith('Q:')) {
        filteredContent.push({
          type: 'question',
          content: trimmed,
          index: i,
        });
        isInQuestion = true;
        continue;
      }

      if (trimmed.startsWith('ج:') || trimmed.startsWith('A:')) {
        filteredContent.push({
          type: 'answer',
          content: trimmed,
          index: i,
        });
        isInQuestion = false;
        continue;
      }

      // Add regular content
      if (trimmed) {
        filteredContent.push({
          type: isInQuestion ? 'answer-content' : 'content',
          content: paragraphs[i],
          index: i,
          sectionTitle: currentSectionTitle,
        });
      }
    }

    return { tocItems, filteredContent };
  };

  // Function to scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  };

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

  // Parse content with TOC handling
  const { tocItems, filteredContent } = parseContentWithTOC(paragraphs);

  const ContentBlock = ({ item }) => {
    const { type, content, sectionId, tocItems } = item;

    switch (type) {
      case 'section-header':
        return (
          <h2
            id={sectionId}
            className='text-xl sm:text-2xl font-bold text-gray-900 mb-6 mt-8 scroll-mt-20 border-b-2 border-[#FF5E3A] pb-2'
            style={{ fontFamily }}
          >
            {content}
          </h2>
        );
      case 'toc':
        return (
          <div className='bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 mb-8 border border-gray-200 shadow-sm'>
            <h3
              className='text-xl sm:text-2xl font-bold text-gray-900 mb-6 tracking-wide text-center'
              style={{ fontFamily }}
            >
              {content}
            </h3>
            {tocItems && tocItems.length > 0 && (
              <div className='mt-4'>
                <ul
                  className={`space-y-3 ${isArabic ? 'text-right' : 'text-left'}`}
                  dir={isArabic ? 'rtl' : 'ltr'}
                >
                  {tocItems.map((item, index) => (
                    <li key={index} className={`${isArabic ? 'text-right' : 'text-left'}`}>
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200 cursor-pointer p-2 rounded-md hover:bg-blue-50 ${isArabic ? 'text-right' : 'text-left'}`}
                        style={{ fontFamily }}
                        dir={isArabic ? 'rtl' : 'ltr'}
                      >
                        <span className={`block ${isArabic ? 'text-right' : 'text-left'}`}>
                          {item.text}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      case 'question':
        return (
          <p
            className={`text-gray-900 font-semibold mb-2 mt-4 ${isArabic ? 'text-right' : 'text-left'}`}
            style={{ fontFamily }}
            dir={isArabic ? 'rtl' : 'ltr'}
          >
            {content}
          </p>
        );
      case 'answer':
      case 'answer-content':
        return (
          <div 
            className={`bg-gradient-to-r ${isArabic ? 'from-gray-100 to-gray-50' : 'from-gray-50 to-gray-100'} rounded-xl p-4 mb-4 border border-gray-200 shadow-sm`}
          >
            <p
              className={`text-gray-700 leading-relaxed ${isArabic ? 'text-right' : 'text-left'}`}
              style={{ fontFamily }}
              dir={isArabic ? 'rtl' : 'ltr'}
            >
              {content}
            </p>
          </div>
        );
      case 'content':
        const trimmedContent = content.trim();

        // Handle bullet points
        if (trimmedContent.startsWith('•') || trimmedContent.startsWith('- ')) {
          return (
            <div
              className={`flex items-start gap-3 mb-4 ${isArabic ? 'flex-row-reverse text-right' : ''}`}
              dir={isArabic ? 'rtl' : 'ltr'}
            >
              <span className='mt-1 text-[#FF5E3A] text-base'>●</span>
              <span className='text-gray-700 leading-relaxed' style={{ fontFamily }}>
                {trimmedContent.replace(/^[-•]\s*/, '')}
              </span>
            </div>
          );
        }

        // Handle regular paragraphs
        return (
          <p
            className={`text-gray-700 mb-6 leading-relaxed ${isArabic ? 'text-right' : 'text-left'}`}
            style={{ fontFamily }}
            dir={isArabic ? 'rtl' : 'ltr'}
          >
            {content}
          </p>
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
        className='min-h-screen py-8 sm:py-12 md:py-16 lg:py-20 bg-gray-50'
        dir={isArabic ? 'rtl' : 'ltr'}
        style={{ fontFamily }}
      >
        <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col-reverse md:flex-row gap-8'>
            {/* Article content */}
            <div className={`flex-1 order-1 md:order-0 ${isArabic ? 'md:order-1' : 'md:order-0'}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden'
              >
                {/* Article main image */}
                <div className='relative w-full rounded-t-2xl sm:rounded-t-3xl overflow-hidden aspect-[2] sm:aspect-[2/1] md:aspect-[2/1]'>
                  <LazyLoadImage
                    src={post.image}
                    alt={post.title}
                    effect='blur'
                    className='w-full h-full object-cover object-center transition-transform duration-500'
                    placeholderSrc='/assets/images/placeholder.png'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent' />
                  <div className='absolute bottom-0 left-0 right-0 p-2 sm:p-4 md:p-6 lg:p-10 text-white z-10'>
                    <div className='flex flex-wrap items-center gap-1 sm:gap-2 md:gap-4 mb-1 sm:mb-2 md:mb-4'>
                      <span className='bg-white/20 backdrop-blur-sm text-white text-[10px] sm:text-xs md:text-sm font-medium px-2 sm:px-3 md:px-4 py-0.5 sm:py-1 md:py-2 rounded-full shadow'>
                        {getTranslatedCategory(post.category)}
                      </span>
                      <span className='text-white/80 text-[10px] sm:text-xs md:text-sm'>
                        {getTranslatedDate(post.date)}
                      </span>
                    </div>
                    <h1 className='text-base sm:text-lg md:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 md:mb-4 drop-shadow-lg line-clamp-2'>
                      {translatedTitle}
                    </h1>
                    <div className='flex items-center gap-1 sm:gap-2'>
                      <span className='text-white/80 text-xs sm:text-sm md:text-base'>
                        {t('blog.by')}
                      </span>
                      <span className='font-medium text-xs sm:text-sm md:text-base'>
                        {post.author || 'Qawi Najd'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Article content */}
                <div className='sm:p-6 md:p-8 lg:p-12'>
                  {/* Article description */}
                  <div className='my-2 rounded-xl sm:rounded-2xl border border-[#FF5E3A]/10 p-4'>
                    <h2
                      className='text-xl sm:text-md font-bold text-gray-900 my-1'
                      style={{ fontFamily }}
                    >
                      {t('blog.details.about_article')}
                    </h2>
                    <p
                      className={`text-base sm:text-md text-gray-600 leading-relaxed ${isArabic ? 'text-right' : 'text-left'}`}
                      style={{ fontFamily }}
                      dir={isArabic ? 'rtl' : 'ltr'}
                    >
                      {translatedDescription}
                    </p>
                  </div>

                  <div className='prose prose-sm sm:prose-base md:prose-lg max-w-none mt-6'>
                    <div className='text-gray-600 leading-relaxed space-y-4 sm:space-y-6 md:space-y-8'>
                      {filteredContent.length === 0 ? (
                        <p className='text-base sm:text-lg text-gray-500 italic'>
                          {t('blog.details.no_content')}
                        </p>
                      ) : (
                        filteredContent.map((item, index) => (
                          <ContentBlock key={index} item={item} />
                        ))
                      )}
                    </div>
                  </div>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className='mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200'>
                      <h3
                        className='text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4'
                        style={{ fontFamily }}
                      >
                        {isArabic ? 'الوسوم' : 'Tags'}
                      </h3>
                      <div className='flex flex-wrap gap-2 sm:gap-3'>
                        {post.tags.map((tag, index) => (
                          <span
                            key={index}
                            className='bg-gray-100 text-gray-700 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-[#FF5E3A] hover:text-white transition-colors duration-300'
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
                    <div className='mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200'>
                      <div className='flex flex-wrap gap-2 sm:gap-3'>
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
                            className='bg-gray-100 text-gray-700 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium'
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
              <div className='mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200 flex justify-center'>
                <button
                  onClick={() => navigate('/blog')}
                  className='inline-flex items-center gap-2 px-6 py-3 bg-[#FF5E3A] text-white rounded-lg hover:bg-[#FF5E3A]/90 transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className={`h-5 w-5 ${isArabic ? 'rotate-180' : ''}`}
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
              className={`w-full md:w-80 order-0 md:order-1 ${isArabic ? 'md:order-0' : 'md:order-1'} `}
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

import React from 'react';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import HeroSection from './HeroSection';
import BlogContant from './components/Blog/BlogContant';
import { blogData } from '../data/blogData';
import { siteSEO } from '../data/seoData';
import { Helmet } from 'react-helmet-async';

const Blog = () => {
  const { t, i18n } = useTranslation();
  const { blogPageSEO } = siteSEO;
  const currentLang = i18n.language;
  const isArabic = currentLang === 'ar';

  // Get correct SEO data based on language
  const seoData = isArabic ? blogPageSEO.ar : blogPageSEO.en;

  return (
    <>
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{seoData.title}</title>
        <meta name='description' content={seoData.description} />
        <meta name='keywords' content={seoData.keywords} />

        {/* Open Graph Meta Tags */}
        <meta property='og:title' content={seoData.ogTitle} />
        <meta property='og:description' content={seoData.ogDescription} />
        <meta property='og:image' content={seoData.ogImage} />
        <meta property='og:url' content={seoData.canonicalUrl} />
        <meta property='og:type' content='website' />

        {/* Twitter Card Meta Tags */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={seoData.ogTitle} />
        <meta name='twitter:description' content={seoData.ogDescription} />
        <meta name='twitter:image' content={seoData.ogImage} />

        {/* Canonical URL */}
        <link rel='canonical' href={seoData.canonicalUrl} />

        {/* Schema.org JSON-LD */}
        <script type='application/ld+json'>{JSON.stringify(seoData.schema)}</script>
      </Helmet>

      <div className='m-4'>
        <HeroSection
          backgroundImage='/assets/images/blog/background.webp'
          title={t('blog.title')}
          subtitle={t('blog.subtitle')}
        />
      </div>

      <BlogContant blogData={blogData} />
    </>
  );
};

export default Blog;

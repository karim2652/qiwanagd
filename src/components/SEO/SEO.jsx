import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const SEO = ({
  title,
  description,
  keywords,
  image = '/src/assets/images/logo/Capture.webp',
  url,
  type = 'website',
  locale = 'ar_SA',
  siteName = 'قوى نجد للاستشارات الهندسية',
}) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const fullTitle = `${title} | ${siteName}`;
  const fullUrl = `https://qiwanagd.com${url || ''}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
      <meta name='language' content={currentLang} />
      <link rel='canonical' href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property='og:type' content={type} />
      <meta property='og:url' content={fullUrl} />
      <meta property='og:title' content={fullTitle} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={image} />
      <meta property='og:locale' content={locale} />
      <meta property='og:site_name' content={siteName} />

      {/* Twitter */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:url' content={fullUrl} />
      <meta name='twitter:title' content={fullTitle} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={image} />

      {/* Additional Meta Tags */}
      <meta name='robots' content='index, follow' />
      <meta name='author' content={siteName} />
      <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=5.0' />

      {/* Alternate Language Versions */}
      <link rel='alternate' hrefLang='ar' href={`https://qiwanagd.com/ar${url || ''}`} />
      <link rel='alternate' hrefLang='en' href={`https://qiwanagd.com/en${url || ''}`} />
      <link rel='alternate' hrefLang='x-default' href={`https://qiwanagd.com${url || ''}`} />

      {/* JSON-LD Structured Data */}
      <script type='application/ld+json'>
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': type === 'article' ? 'Article' : 'WebPage',
          name: fullTitle,
          description: description,
          url: fullUrl,
          image: image,
          publisher: {
            '@type': 'Organization',
            name: siteName,
            logo: {
              '@type': 'ImageObject',
              url: 'https://qiwanagd.com/src/assets/images/logo/Capture.webp',
            },
          },
          inLanguage: currentLang,
          isAccessibleForFree: true,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': fullUrl,
          },
        })}
      </script>
    </Helmet>
  );
};

export default SEO;

export const siteSEO = {
  // General Site SEO
  siteMetadata: {
    title: 'Qawi Najd - شركة قوى نجد للهندسة والاستشارات',
    description:
      'شركة رائدة في مجال الهندسة والاستشارات، نقدم خدمات متكاملة في التصميم المعماري، الهندسة المدنية، وإدارة المشاريع',
    keywords: 'هندسة, استشارات, تصميم معماري, هندسة مدنية, إدارة مشاريع, قوى نجد, Qawi Najd',
    siteUrl: 'https://qiwanagd.com',
    language: 'ar',
    locale: 'ar_SA',
    type: 'website',
    twitterHandle: '@qiwanagd',
    facebookPage: 'qiwanagd',
  },

  // Blog Page SEO
  blogPageSEO: {
    ar: {
      title: 'المدونة - مقالات وأخبار في مجال الهندسة والاستشارات | قوى نجد',
      description:
        'اكتشف أحدث المقالات والأخبار في مجال الهندسة والاستشارات. نقدم محتوى متخصص في التصميم المعماري، الهندسة المدنية، وإدارة المشاريع',
      keywords:
        'مقالات هندسية, أخبار هندسة, تصميم معماري, هندسة مدنية, إدارة مشاريع, مدونة قوى نجد',
      ogTitle: 'المدونة - مقالات وأخبار في مجال الهندسة والاستشارات | قوى نجد',
      ogDescription:
        'اكتشف أحدث المقالات والأخبار في مجال الهندسة والاستشارات. نقدم محتوى متخصص في التصميم المعماري، الهندسة المدنية، وإدارة المشاريع',
      ogImage: '/src/assets/images/blog/blog-og.jpg',
      canonicalUrl: 'https://qiwanagd.com/blog',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'مدونة قوى نجد',
        description: 'مقالات وأخبار في مجال الهندسة والاستشارات',
        url: 'https://qiwanagd.com/blog',
        publisher: {
          '@type': 'Organization',
          name: 'Qawi Najd',
          logo: {
            '@type': 'ImageObject',
            url: 'https://qiwanagd.com/logo.png',
          },
        },
      },
    },
    en: {
      title: 'Blog - Articles and News in Engineering & Consulting | Qawi Najd',
      description:
        'Discover the latest articles and news in engineering and consulting. We provide specialized content in architectural design, civil engineering, and project management',
      keywords:
        'engineering articles, engineering news, architectural design, civil engineering, project management, Qawi Najd blog',
      ogTitle: 'Blog - Articles and News in Engineering & Consulting | Qawi Najd',
      ogDescription:
        'Discover the latest articles and news in engineering and consulting. We provide specialized content in architectural design, civil engineering, and project management',
      ogImage: '/src/assets/images/blog/blog-og.jpg',
      canonicalUrl: 'https://qiwanagd.com/en/blog',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'Qawi Najd Blog',
        description: 'Articles and News in Engineering and Consulting',
        url: 'https://qiwanagd.com/en/blog',
        publisher: {
          '@type': 'Organization',
          name: 'Qawi Najd',
          logo: {
            '@type': 'ImageObject',
            url: 'https://qiwanagd.com/logo.png',
          },
        },
      },
    },
    get title() {
      return typeof window !== 'undefined' && localStorage.getItem('i18nextLng') === 'en'
        ? this.en.title
        : this.ar.title;
    },
    get description() {
      return typeof window !== 'undefined' && localStorage.getItem('i18nextLng') === 'en'
        ? this.en.description
        : this.ar.description;
    },
    get keywords() {
      return typeof window !== 'undefined' && localStorage.getItem('i18nextLng') === 'en'
        ? this.en.keywords
        : this.ar.keywords;
    },
    get ogTitle() {
      return typeof window !== 'undefined' && localStorage.getItem('i18nextLng') === 'en'
        ? this.en.ogTitle
        : this.ar.ogTitle;
    },
    get ogDescription() {
      return typeof window !== 'undefined' && localStorage.getItem('i18nextLng') === 'en'
        ? this.en.ogDescription
        : this.ar.ogDescription;
    },
    get ogImage() {
      return typeof window !== 'undefined' && localStorage.getItem('i18nextLng') === 'en'
        ? this.en.ogImage
        : this.ar.ogImage;
    },
    get canonicalUrl() {
      return typeof window !== 'undefined' && localStorage.getItem('i18nextLng') === 'en'
        ? this.en.canonicalUrl
        : this.ar.canonicalUrl;
    },
    get schema() {
      return typeof window !== 'undefined' && localStorage.getItem('i18nextLng') === 'en'
        ? this.en.schema
        : this.ar.schema;
    },
  },

  // Social Media
  socialMedia: {
    facebook: 'https://facebook.com/qiwanagd',
    twitter: 'https://twitter.com/qiwanagd',
    linkedin: 'https://linkedin.com/company/qiwanagd',
    instagram: 'https://instagram.com/qiwanagd',
  },

  // Robots.txt
  robots: {
    userAgent: '*',
    allow: '/',
    sitemap: 'https://qiwanagd.com/sitemap.xml',
  },
};

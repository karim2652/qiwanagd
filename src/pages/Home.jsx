import React, { Suspense, lazy } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO/SEO';
import HomeCover from './components/home/HomeCover';
import AboutOverview from './components/about/AboutOverview';
import ServiceOverview from './components/Services/ServiceOverview';
import Location from './components/ContactUs/Location';
import QrCode from './components/home/QrCode';

// تفعيل dynamic import للمكونات الثقيلة
const ProductsOverview = lazy(() => import('./components/Products/ProductsOverview'));
const PartnerOverview = lazy(() => import('./components/partners/PartnerOverview'));
const ContactForm = lazy(() => import('./components/ContactUs/ContactForm'));

const Home = () => {
  const { t } = useTranslation();

  return (
    <>
      <SEO
        title={t('home.meta.title')}
        description={t('home.meta.description')}
        keywords={t('home.meta.keywords')}
        url='/'
        type='website'
      />
      <HomeCover />
      <AboutOverview />
      <ServiceOverview />
      <Suspense fallback={<div className="min-h-[400px] flex items-center justify-center">Loading products...</div>}>
        <ProductsOverview />
      </Suspense>
      <Location />
      <Suspense fallback={<div className="min-h-[300px] flex items-center justify-center">Loading partners...</div>}>
        <PartnerOverview />
      </Suspense>
      <div className='flex flex-col md:flex-row justify-center items-center gap-6 p-4 md:p-14'>
        <QrCode />
        <Suspense fallback={<div className="min-h-[200px] flex items-center justify-center">Loading contact form...</div>}>
          <ContactForm />
        </Suspense>
      </div>
    </>
  );
};

export default Home;

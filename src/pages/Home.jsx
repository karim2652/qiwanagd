import React from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO/SEO';
import HomeCover from './components/home/HomeCover';
import AboutOverview from './components/about/AboutOverview';
import ServiceOverview from './components/Services/ServiceOverview';
import ProductsOverview from './components/Products/ProductsOverview';
import Location from './components/ContactUs/Location';
import QrCode from './components/home/QrCode';
import PartnerOverview from './components/partners/PartnerOverview';
import ContactForm from './components/ContactUs/ContactForm';

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
      <ProductsOverview />
      <Location />
      <PartnerOverview />
      <div className='flex flex-col md:flex-row justify-center items-center gap-6 p-4 md:p-14'>
        <QrCode />
        <ContactForm />
      </div>
    </>
  );
};

export default Home;

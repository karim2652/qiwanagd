import React from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO/SEO';
import ServiceOverview from './components/Services/ServiceOverview';
import HeroSection from './HeroSection';

const Services = () => {
  const { t } = useTranslation();

  return (
    <>
      <SEO
        title={t('services.meta.title')}
        description={t('services.meta.description')}
        keywords={t('services.meta.keywords')}
        url='/services'
        type='website'
      />
      <div className='m-4'>
        <HeroSection
          backgroundImage='/images/services/1.webp'
          title={t('services.title')}
          subtitle={t('services.subtitle')}
        />
      </div>
      <ServiceOverview />
    </>
  );
};

export default Services;

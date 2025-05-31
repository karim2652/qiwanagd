import React from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO/SEO';
import HeroSection from './HeroSection';

const ClientsPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <SEO
        title={t('clients.meta.title')}
        description={t('clients.meta.description')}
        keywords={t('clients.meta.keywords')}
        url='/clients'
        type='website'
      />
      <div className='m-4'>
        <HeroSection
          backgroundImage='/images/clients/clients.webp'
          title={t('clients.title')}
          subtitle={t('clients.subtitle')}
        />
      </div>
    </>
  );
};

export default ClientsPage;

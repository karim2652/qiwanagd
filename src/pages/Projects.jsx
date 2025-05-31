import React from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO/SEO';
import HeroSection from './HeroSection';
import ProductsOverview from './components/Products/ProductsOverview';

const Projects = () => {
  const { t } = useTranslation();

  return (
    <>
      <SEO
        title={t('projects.meta.title')}
        description={t('projects.meta.description')}
        keywords={t('projects.meta.keywords')}
        url='/projects'
        type='website'
      />
      <div className='m-4'>
        <HeroSection
          backgroundImage='/images/projects/1.webp'
          title={t('projects.title')}
          subtitle={t('projects.description')}
        />
      </div>
      <ProductsOverview />
    </>
  );
};

export default Projects;

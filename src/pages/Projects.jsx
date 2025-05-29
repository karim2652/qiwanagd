import React from 'react';
import { useTranslation } from 'react-i18next';
import HeroSection from './HeroSection';
import ProductsOverview from './components/Products/ProductsOverview';

const Projects = () => {
  const { t } = useTranslation();

  return (
    <>
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

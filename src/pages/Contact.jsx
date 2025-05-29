import React from 'react';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import ContactUsSection from './components/ContactUs/ContactUsCards';
import { ContactForm } from './components/ContactUs';
import Location from './components/ContactUs/Location';
import HeroSection from './HeroSection';

const Contact = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className='m-4'>
        <HeroSection
          backgroundImage='/images/contact/contact.webp'
          title={t('contact.title')}
          subtitle={t('contact.subtitle')}
        />
      </div>
      <ContactUsSection />

      <div className='min-h-screen bg-[#f8f9fa] py-12'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-12'>
            <h1 className='text-4xl font-bold mb-2'>{t('navigation.contact')}</h1>
            <div className='w-16 h-1 bg-[#ff3e33] mx-auto'></div>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            <div>
              <ContactForm />
            </div>
            <div>
              <div className=' px-8 rounded-3xl shadow-sm h-full relative overflow-hidden'>
                <div className='mb-4'>
                  <span className='inline-block px-4 py-1 text-xs font-medium text-[#ff3e33] bg-white rounded-full'>
                    {t('contact.about_us')}
                  </span>
                </div>

                <h2 className='text-4xl font-bold mb-4 text-gray-900'>
                  {t('contact.happy_to_answer')}
                </h2>

                <p className='text-gray-600 my-8'>{t('contact.placeholder_text')}</p>

                <div className='h-64 w-full bg-gray-300 rounded-2xl shadow-md mt-12'>
                  {/* Placeholder for image */}
                  <LazyLoadImage
                    src='images/contact/contactform.webp'
                    effect="blur"
                    className='w-full h-full object-cover rounded-2xl'
                    alt='contact'
                    wrapperClassName='w-full h-full'
                  />
                </div>

                <div className='absolute -bottom-10 -right-10 w-32 h-32 bg-white opacity-10 rounded-full'></div>
                <div className='absolute -bottom-16 -right-16 w-40 h-40 bg-white opacity-5 rounded-full'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Location />
    </>
  );
};

export default Contact;

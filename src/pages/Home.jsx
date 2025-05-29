import React from 'react';
import HomeCover from './components/home/HomeCover';
import AboutOverview from './components/about/AboutOverview';
import ServiceOverview from './components/Services/ServiceOverview';
import ProductsOverview from './components/Products/ProductsOverview';
import Location from './components/ContactUs/Location';
import QrCode from './components/home/QrCode';
import PartnerOverview from './components/partners/PartnerOverview';
const Home = () => {
  return (
    <>
      <HomeCover />
      <AboutOverview />
      <ServiceOverview />
      <ProductsOverview />
      <Location />
      <PartnerOverview />
      <QrCode />
    </>
  );
};

export default Home; 
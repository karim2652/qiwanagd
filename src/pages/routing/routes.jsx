import React, { Suspense, lazy } from 'react';

const Home = lazy(() => import('../Home'));
const Blog = lazy(() => import('../Blog'));
const Projects = lazy(() => import('../Projects'));
const Services = lazy(() => import('../Services'));
const Partners = lazy(() => import('../Partners'));
const Contact = lazy(() => import('../Contact'));
const Quote = lazy(() => import('../Quote'));

export const routes = [
  {
    path: '/',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: '/blog',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Blog />
      </Suspense>
    ),
  },
  {
    path: '/projects',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Projects />
      </Suspense>
    ),
  },
  {
    path: '/services',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Services />
      </Suspense>
    ),
  },
  {
    path: '/partners',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Partners />
      </Suspense>
    ),
  },
  {
    path: '/contact',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Contact />
      </Suspense>
    ),
  },
  {
    path: '/quote',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Quote />
      </Suspense>
    ),
  },
]; 
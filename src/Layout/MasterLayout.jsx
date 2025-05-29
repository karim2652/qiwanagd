import React, { Suspense } from "react";
import Footer from "../shared/Footer/Footer";
import Navbar from "../shared/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/routing/ScrollToTop";

const MasterLayout = () => {
  return (
    <div className="flex flex-col text-black min-h-screen font-sans">
      <ScrollToTop />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-main">
        تخطي إلى المحتوى الرئيسي
      </a>

      <header role="banner" className="sticky top-0 z-50">
        <Suspense
          fallback={
            <div className="bg-[#f5f9f9] h-20 flex items-center justify-center">
              <div className="animate-pulse flex space-x-4">
                <div className="h-16 w-[140px] bg-gray-200 rounded"></div>
              </div>
            </div>
          }>
          <Navbar />
        </Suspense>
      </header>

      <main id="main-content" className="flex-grow " role="main">
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F03E2F]"></div>
            </div>
          }>
          <Outlet />
        </Suspense>
      </main>

      <footer role="contentinfo">
        <Suspense
          fallback={
            <div className="bg-gray-100 h-64 animate-pulse"></div>
          }>
          <Footer />
        </Suspense>
      </footer>
    </div>
  );
};

export default MasterLayout;

import React from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaPinterestP,
  FaHome,
  FaInfoCircle,
  FaLaptopCode,
  FaMoneyBillWave,
  FaBriefcase,
} from 'react-icons/fa';
import { MdLocationOn, MdEmail, MdPhone } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logoAr from '../../assets/images/logo/3.svg';
import logoEn from '../../assets/images/logo/5.svg';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <footer
      className={`bg-black text-white ${isRTL ? 'rtl font-arabic' : 'ltr font-english'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Main Footer */}
      <div
        className={`max-w-7xl mx-auto pt-16 pb-12 px-6 lg:px-8 ${
          isRTL ? 'text-right' : 'text-left'
        }`}
      >
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-10'>
          {/* Logo & About */}
          <div className={`flex flex-col ${isRTL ? 'items-start sm:items-start' : 'items-start'}`}>
            <div className={`flex w-full ${isRTL ? 'justify-start' : 'justify-start'}`}>
              <LazyLoadImage
                src={isRTL ? logoAr : logoEn}
                alt='logo'
                effect='blur'
                className='w-40 h-40 object-contain -mt-10'
                wrapperClassName='w-40 h-40'
              />
            </div>
            <p
              className={`text-gray-400 text-base leading-relaxed font-light max-w-xs mt-4 ${
                isRTL ? 'font-arabic' : 'font-english'
              }`}
            >
              {t('footer.about')}
            </p>
            <div className={`flex gap-4 mt-6 ${isRTL ? 'self-start' : ''}`}>
              <Link
                to='https://facebook.com'
                target='_blank'
                rel='noopener noreferrer'
                className='w-10 h-10 flex items-center justify-center rounded-full bg-[#111] border border-gray-800 hover:bg-[#F03E2F] hover:border-[#F03E2F] transition-all duration-300'
              >
                <FaFacebookF size={18} />
              </Link>
              <Link
                to='https://twitter.com'
                target='_blank'
                rel='noopener noreferrer'
                className='w-10 h-10 flex items-center justify-center rounded-full bg-[#111] border border-gray-800 hover:bg-[#F03E2F] hover:border-[#F03E2F] transition-all duration-300'
              >
                <FaTwitter size={18} />
              </Link>
              <Link
                to='https://youtube.com'
                target='_blank'
                rel='noopener noreferrer'
                className='w-10 h-10 flex items-center justify-center rounded-full bg-[#111] border border-gray-800 hover:bg-[#F03E2F] hover:border-[#F03E2F] transition-all duration-300'
              >
                <FaYoutube size={18} />
              </Link>
              <Link
                to='https://pinterest.com'
                target='_blank'
                rel='noopener noreferrer'
                className='w-10 h-10 flex items-center justify-center rounded-full bg-[#111] border border-gray-800 hover:bg-[#F03E2F] hover:border-[#F03E2F] transition-all duration-300'
              >
                <FaPinterestP size={18} />
              </Link>
            </div>
          </div>

          {/* Useful Link */}
          <div className={`flex flex-col ${isRTL ? 'items-end sm:items-end' : 'items-start'}`}>
            <h3
              className={`text-xl font-semibold mb-6 text-white border-b border-gray-800 pb-3 ${
                isRTL
                  ? 'pr-0 pl-8 self-start w-auto font-arabic'
                  : 'pr-8 pl-0 self-start w-auto font-english'
              }`}
            >
              {t('footer.usefulLinks')}
            </h3>
            <div className='flex flex-col gap-5 w-full'>
              <Link
                to='/'
                className={`text-gray-400 hover:text-white transition-colors duration-300 
                  inline-flex items-center group w-full ${isRTL ? 'justify-between' : ''}`}
              >
                {isRTL ? (
                  <>
                    <span
                      className={`text-base text-right ${isRTL ? 'font-arabic' : 'font-english'}`}
                    >
                      {t('navigation.home')}
                    </span>
                    <div className='text-white group-hover:text-[#F03E2F] transition-colors duration-300'>
                      <FaHome
                        size={18}
                        className='group-hover:scale-110 transition-transform duration-300'
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className='text-white group-hover:text-[#F03E2F] mr-3 transition-colors duration-300'>
                      <FaHome
                        size={18}
                        className='group-hover:scale-110 transition-transform duration-300'
                      />
                    </div>
                    <span className={`text-base ${isRTL ? 'font-arabic' : 'font-english'}`}>
                      {t('navigation.home')}
                    </span>
                  </>
                )}
              </Link>

              <Link
                to='/services'
                className={`text-gray-400 hover:text-white transition-colors duration-300 
                  inline-flex items-center group w-full ${isRTL ? 'justify-between' : ''}`}
              >
                {isRTL ? (
                  <>
                    <span
                      className={`text-base text-right ${isRTL ? 'font-arabic' : 'font-english'}`}
                    >
                      {t('navigation.services')}
                    </span>
                    <div className='text-white group-hover:text-[#F03E2F] transition-colors duration-300'>
                      <FaLaptopCode
                        size={18}
                        className='group-hover:scale-110 transition-transform duration-300'
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className='text-white group-hover:text-[#F03E2F] mr-3 transition-colors duration-300'>
                      <FaLaptopCode
                        size={18}
                        className='group-hover:scale-110 transition-transform duration-300'
                      />
                    </div>
                    <span className={`text-base ${isRTL ? 'font-arabic' : 'font-english'}`}>
                      {t('navigation.services')}
                    </span>
                  </>
                )}
              </Link>

              <Link
                to='/projects'
                className={`text-gray-400 hover:text-white transition-colors duration-300 
                  inline-flex items-center group w-full ${isRTL ? 'justify-between' : ''}`}
              >
                {isRTL ? (
                  <>
                    <span
                      className={`text-base text-right ${isRTL ? 'font-arabic' : 'font-english'}`}
                    >
                      {t('navigation.projects')}
                    </span>
                    <div className='text-white group-hover:text-[#F03E2F] transition-colors duration-300'>
                      <FaBriefcase
                        size={18}
                        className='group-hover:scale-110 transition-transform duration-300'
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className='text-white group-hover:text-[#F03E2F] mr-3 transition-colors duration-300'>
                      <FaBriefcase
                        size={18}
                        className='group-hover:scale-110 transition-transform duration-300'
                      />
                    </div>
                    <span className={`text-base ${isRTL ? 'font-arabic' : 'font-english'}`}>
                      {t('navigation.projects')}
                    </span>
                  </>
                )}
              </Link>

              <Link
                to='/blog'
                className={`text-gray-400 hover:text-white transition-colors duration-300 
                  inline-flex items-center group w-full ${isRTL ? 'justify-between' : ''}`}
              >
                {isRTL ? (
                  <>
                    <span
                      className={`text-base text-right ${isRTL ? 'font-arabic' : 'font-english'}`}
                    >
                      {t('navigation.blog')}
                    </span>
                    <div className='text-white group-hover:text-[#F03E2F] transition-colors duration-300'>
                      <FaInfoCircle
                        size={18}
                        className='group-hover:scale-110 transition-transform duration-300'
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className='text-white group-hover:text-[#F03E2F] mr-3 transition-colors duration-300'>
                      <FaInfoCircle
                        size={18}
                        className='group-hover:scale-110 transition-transform duration-300'
                      />
                    </div>
                    <span className={`text-base ${isRTL ? 'font-arabic' : 'font-english'}`}>
                      {t('navigation.blog')}
                    </span>
                  </>
                )}
              </Link>

              <Link
                to='/contact'
                className={`text-gray-400 hover:text-white transition-colors duration-300 
                  inline-flex items-center group w-full ${isRTL ? 'justify-between' : ''}`}
              >
                {isRTL ? (
                  <>
                    <span
                      className={`text-base text-right ${isRTL ? 'font-arabic' : 'font-english'}`}
                    >
                      {t('navigation.contact')}
                    </span>
                    <div className='text-white group-hover:text-[#F03E2F] transition-colors duration-300'>
                      <MdLocationOn
                        size={18}
                        className='group-hover:scale-110 transition-transform duration-300'
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className='text-white group-hover:text-[#F03E2F] mr-3 transition-colors duration-300'>
                      <MdLocationOn
                        size={18}
                        className='group-hover:scale-110 transition-transform duration-300'
                      />
                    </div>
                    <span className={`text-base ${isRTL ? 'font-arabic' : 'font-english'}`}>
                      {t('navigation.contact')}
                    </span>
                  </>
                )}
              </Link>
            </div>
          </div>

          {/* Working Hours */}
          <div className={`flex flex-col ${isRTL ? 'items-end sm:items-end' : 'items-start'}`}>
            <h3
              className={`text-xl font-semibold mb-6 text-white border-b border-gray-800 pb-3 ${
                isRTL
                  ? 'pr-0 pl-8 self-start w-auto font-arabic'
                  : 'pr-8 pl-0 self-start w-auto font-english'
              }`}
            >
              {t('footer.workingHours')}
            </h3>
            {isRTL ? (
              <div className='w-full'>
                <div className='w-full rounded-lg p-4 flex flex-col gap-4'>
                  <div className='flex flex-col gap-1'>
                    <div className='text-gray-400 text-right'>من الأحد إلى الخميس :</div>
                    <div className='text-white font-medium text-center'>
                      8:00 ص - 1:00 م<br />
                      4:00 م - 8:00 م
                    </div>
                  </div>
                  <div className='flex flex-col gap-1 border-t border-gray-800 pt-4'>
                    <div className='text-gray-400 text-right'>السبت :</div>
                    <div className='text-white font-medium text-center'>8:00 ص - 1:00 م</div>
                  </div>
                  <div className='flex flex-col gap-1 border-t border-gray-800 pt-4'>
                    <div className='text-gray-400 text-right'>الجمعة :</div>
                    <div className='text-white font-medium text-center'>إجازة</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className='flex flex-col gap-4 bg-[#111] p-5 rounded-lg border border-gray-800 w-full'>
                <div className='flex justify-between text-base text-gray-400'>
                  <span className='font-light'>Sunday to Thursday :</span>
                  <span className='font-medium text-white'>8:00am - 1:00pm, 4:00pm - 8:00pm</span>
                </div>
                <div className='flex justify-between text-base text-gray-400 border-t border-gray-800 pt-4'>
                  <span className='font-light'>Saturday :</span>
                  <span className='font-medium text-white'>08am - 01pm</span>
                </div>
                <div className='flex justify-between text-base text-gray-400 border-t border-gray-800 pt-4'>
                  <span className='font-light'>Friday :</span>
                  <span className='font-medium text-white'>Closed</span>
                </div>
              </div>
            )}
          </div>

          {/* Contact Us */}
          <div className={`flex flex-col ${isRTL ? 'items-end sm:items-end' : 'items-start'}`}>
            <h3
              className={`text-xl font-semibold mb-6 text-white border-b border-gray-800 pb-3 ${
                isRTL
                  ? 'pr-0 pl-8 self-start w-auto font-arabic'
                  : 'pr-8 pl-0 self-start w-auto font-english'
              }`}
            >
              {t('footer.contactUs')}
            </h3>
            <div className='flex flex-col gap-5 mt-2 w-full'>
              <div className={`flex items-start gap-4 group ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className='bg-[#111] p-3 rounded-full border border-gray-800 group-hover:bg-[#F03E2F] group-hover:border-[#F03E2F] transition-all duration-300 shrink-0'>
                  <MdLocationOn className='text-white' size={22} />
                </div>
                <div className='flex-1'>
                  <span className='text-white font-medium block mb-1'>
                    {isRTL ? 'العنوان' : 'Location'}
                  </span>
                  <span className='text-gray-400 leading-relaxed block'>
                    {t('footer.company_info')}
                  </span>
                </div>
              </div>

              <div className={`flex items-start gap-4 group ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className='bg-[#111] p-3 rounded-full border border-gray-800 group-hover:bg-[#F03E2F] group-hover:border-[#F03E2F] transition-all duration-300 shrink-0'>
                  <MdEmail className='text-white' size={22} />
                </div>
                <div className='flex-1'>
                  <span className='text-white font-medium block mb-1'>
                    {isRTL ? 'البريد الإلكتروني' : 'Email'}
                  </span>
                  <span className='text-gray-400'>info@qiwanagd.com</span>
                </div>
              </div>

              <div className={`flex items-start gap-4 group ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className='bg-[#111] p-3 rounded-full border border-gray-800 group-hover:bg-[#F03E2F] group-hover:border-[#F03E2F] transition-all duration-300 shrink-0'>
                  <MdPhone className='text-white' size={22} />
                </div>
                <div className='flex-1'>
                  <span className='text-white font-medium block mb-1'>
                    {isRTL ? 'الهاتف' : 'Phone'}
                  </span>
                  <div className='flex flex-col gap-1'>
                    <a
                      href='tel:+966548240556'
                      className='text-gray-400 hover:text-[#F03E2F] transition-colors duration-300'
                      dir='ltr'
                    >
                      +966 54 824 0556
                    </a>
                    <a
                      href='tel:+966557770557'
                      className='text-gray-400 hover:text-[#F03E2F] transition-colors duration-300'
                      dir='ltr'
                    >
                      +966 55 777 0557
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className='border-t border-gray-800'>
        <div
          className={`max-w-7xl mx-auto py-6 px-6 lg:px-8 flex flex-col ${
            isRTL ? 'md:flex-row-reverse text-center' : 'md:flex-row text-center'
          } justify-between items-center text-gray-400 text-sm gap-4`}
        >
          <span className='w-full md:w-auto mx-auto'>
            {isRTL ? (
              <>
                © {new Date().getFullYear()} شركة قوى نجد للاستشارات الهندسية | أفضل شركة هندسية
                بالرياض. جميع الحقوق محفوظة.
              </>
            ) : (
              <>
                © {new Date().getFullYear()} Qawi Najd Engineering Company | Best Engineering
                Company in Riyadh. All Rights Reserved.
              </>
            )}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaEnvelope, FaPhone, FaCalendarAlt } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';

const ContactUsSection = () => {
  const { i18n, t } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const contactItems = [
    {
      icon: <FaEnvelope size={18} className='text-red-500' />,
      iconBg: 'bg-[#EFF3F6]',
      title: t('contact.cards.mail_us'),
      text: 'info@qiwanagd.com',
    },
    {
      icon: <MdLocationOn size={18} className='text-red-500' />,
      iconBg: 'bg-[#EFF3F6]',
      title: t('contact.cards.location'),
      text: t('contact.cards.location_text'),
    },
    {
      icon: <FaPhone size={18} className='text-red-500' />,
      iconBg: 'bg-[#EFF3F6]',
      title: t('contact.cards.call_us'),
      text: (
        <span className='block'>
          <span dir='ltr'>+966 54 824 0556</span>
          <br />
          <span dir='ltr'>+966 55 777 0556</span>
        </span>
      ),
    },
    {
      icon: <FaCalendarAlt size={18} className='text-red-500' />,
      iconBg: 'bg-[#EFF3F6]',
      title: t('contact.cards.working_days'),
      text: <span dangerouslySetInnerHTML={{ __html: t('contact.cards.working_days_text') }} />,
    },
  ];

  return (
    <div className='w-full py-6 bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
          {contactItems.map((item, index) => (
            <div
              key={index}
              className='bg-white rounded-lg shadow-sm overflow-hidden relative group'
            >
              <div className='p-6'>
                <div className='flex items-center'>
                  <div
                    className={`w-12 h-12 rounded-full ${item.iconBg} flex items-center justify-center shadow-sm`}
                  >
                    {item.icon}
                  </div>
                  <h3 className='ml-3.5 text-sm sm:text-base font-medium mx-3 text-gray-800'>
                    {item.title}
                  </h3>
                </div>
                <div className='w-full h-px bg-gray-200 my-4'></div>
                <div className='text-gray-500 text-sm leading-relaxed pb-5'>{item.text}</div>
                <div className=' my-6'>
                  {' '}
                  {index === 0 ? (
                    <a
                      href='mailto:info@qiwanagd.com'
                      className={`
                        absolute bottom-5 ltr:right-5 rtl:left-5 w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-md
                        transition-all duration-500 bg-[#e7401c] text-white
                      `}
                    >
                      <span className='inline-block -rotate-45 group-hover:rotate-0 transition-all duration-500'>
                        ➔
                      </span>
                    </a>
                  ) : index === 1 ? (
                    <a
                      href='https://maps.app.goo.gl/nwye1jD1GaLqTaUX6'
                      target='_blank'
                      rel='noopener noreferrer'
                      className={`
                        absolute bottom-5 ltr:right-5 rtl:left-5 w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-md
                        transition-all duration-500 bg-[#e7401c] text-white
                      `}
                    >
                      <span className='inline-block -rotate-45 group-hover:rotate-0 transition-all duration-500'>
                        ➔
                      </span>
                    </a>
                  ) : (
                    <button
                      className={`
                        absolute bottom-5 ltr:right-5 rtl:left-5 w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-md
                        transition-all duration-500 bg-[#222] text-white group-hover:bg-[#e7401c] group-hover:text-white
                      `}
                    >
                      <span className='inline-block -rotate-45 group-hover:rotate-0 transition-all duration-500'>
                        ➔
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactUsSection;

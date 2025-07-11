import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  FaBuilding,
  FaIndustry,
  FaHome,
  FaBriefcase,
  FaRegFileAlt,
  FaCheckCircle,
  FaArrowRight,
  FaLightbulb,
  FaHotel,
  FaUmbrellaBeach,
} from 'react-icons/fa';
import { GiDemolish } from 'react-icons/gi';
import { MdHomeRepairService } from 'react-icons/md';
import { TbArrowsDiagonal2 } from 'react-icons/tb';

const AboutOverview = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // Animation variants - simplified
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
  };

  const circleVariants = {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 50,
        damping: 20,
        delay: 0.5,
      },
    },
  };

  const titleVariants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const iconVariants = {
    animate: {
      rotate: [0, 360],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  };

  // Features/services
  const features = [
    {
      icon: <FaBuilding className='text-[#f03e2f] text-2xl' />,
      title: t('about.features.design'),
      desc: t('about.features.design_desc'),
    },
    {
      icon: <TbArrowsDiagonal2 className='text-[#f03e2f] text-2xl' />,
      title: t('about.features.survey'),
      desc: t('about.features.survey_desc'),
    },
    {
      icon: <MdHomeRepairService className='text-[#f03e2f] text-2xl' />,
      title: t('about.features.project'),
      desc: t('about.features.project_desc'),
    },
    {
      icon: <FaRegFileAlt className='text-[#f03e2f] text-2xl' />,
      title: t('about.features.license'),
      desc: t('about.features.license_desc'),
    },
  ];

  // Licenses
  const licenses = [
    {
      icon: <FaBuilding className='text-[#f03e2f]' />,
      text: t('about.licenses.building'),
    },
    {
      icon: <GiDemolish className='text-[#f03e2f]' />,
      text: t('about.licenses.demolish'),
    },
    {
      icon: <MdHomeRepairService className='text-[#f03e2f]' />,
      text: t('about.licenses.renovation'),
    },
    {
      icon: <TbArrowsDiagonal2 className='text-[#f03e2f]' />,
      text: t('about.licenses.expansion'),
    },
    {
      icon: <FaRegFileAlt className='text-[#f03e2f]' />,
      text: t('about.licenses.all'),
    },
  ];

  // Categories
  const categories = [
    {
      icon: <FaBuilding className='text-[#f03e2f] text-lg' />,
      label: t('about.categories.commercial'),
    },
    {
      icon: <FaIndustry className='text-gray-400 text-lg' />,
      label: t('about.categories.industrial'),
    },
    {
      icon: <FaHome className='text-gray-400 text-lg' />,
      label: t('about.categories.residential'),
    },
    {
      icon: <FaBriefcase className='text-gray-400 text-lg' />,
      label: t('about.categories.corporate'),
    },
    {
      icon: <FaHotel className='text-gray-400 text-lg' />,
      label: t('about.categories.hotels'),
    },
    {
      icon: <FaUmbrellaBeach className='text-gray-400 text-lg' />,
      label: t('about.categories.tourism'),
    },
  ];

  return (
    <div
      className='bg-[#f7fafd] min-h-[100vh] py-12 px-2 md:px-10 w-full'
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* القسم الرئيسي */}
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-start'>
          {/* يسار: صورة/مربع كبير مع إحصائية */}
          <div className='flex flex-col gap-6 items-center'>
            <div className='bg-white rounded-2xl w-full  p-8 shadow-sm border border-gray-100'>
              <div className='flex flex-col gap-6'>
                <div className='flex items-center gap-3'>
                  <span className='inline-block bg-[#fff0ed] text-[#f03e2f] px-4 py-1 rounded-full text-md font-bold'>
                    {t('about.badge')}
                  </span>
                </div>
                <h2 className='text-xl md:text-2xl font-extrabold text-gray-900 leading-snug'>
                  {t('about.title')}
                </h2>

                <p className='text-gray-600 text-base leading-relaxed'>{t('about.description')}</p>
                <motion.p
                  variants={itemVariants}
                  className='text-gray-700 text-base  leading-relaxed  '
                >
                  {t(
                    'about.commitment',
                    "At 'Qawi Najd', we are committed to quality, speed, and accuracy in delivering our services, to be the best engineering partner for your project success."
                  )}
                </motion.p>
                <div className='bg-[#f8f9fa] rounded-xl p-4'>
                  <h3 className='text-lg font-bold text-gray-800 mb-4'>{t('about.services')}</h3>
                  <ul className='space-y-3'>
                    {features.map((feature, index) => (
                      <li key={index} className='flex items-start gap-3'>
                        <span className='text-[#f03e2f] mt-1'>
                          <FaCheckCircle />
                        </span>
                        <span className='text-gray-700'>{feature.desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* يمين: التراخيص والخدمات */}
          <div className='flex flex-col gap-6'>
            <div className='bg-white rounded-2xl p-8 shadow-sm border border-gray-100'>
              <h3 className='text-xl font-bold text-gray-800 mb-6'>{t('about.licensesTitle')}</h3>
              <div className='space-y-6'>
                <p className='text-gray-600 text-base leading-relaxed'>
                  {t('about.licensesDescription')}
                </p>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {licenses.map((license, index) => (
                    <div
                      key={index}
                      className='flex items-center gap-3 p-4 bg-[#f8f9fa] rounded-xl'
                    >
                      <div className='text-[#f03e2f]'>{license.icon}</div>
                      <span className='text-gray-700 font-medium'>{license.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* قسم الإحصائيات */}
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
              <div className='bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100'>
                <div className='text-3xl font-bold text-[#f03e2f] my-2'>100%</div>
                <div className='text-sm text-gray-600'>{t('about.satisfaction')}</div>
              </div>
              <div className='bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100'>
                <div className='text-3xl font-bold text-[#f03e2f] mb-2'>20+</div>
                <div className='text-sm text-gray-600'>{t('about.experience')}</div>
              </div>
              <div className='bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100'>
                <div className='text-3xl font-bold text-[#f03e2f] mb-2'>500+</div>
                <div className='text-sm text-gray-600'>{t('about.projects')}</div>
              </div>
            </div>
          </div>
        </div>

        {/* قسم التصنيفات */}
        <div className='my-8'>
          <div className='grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6 gap-6 max-w-7xl mx-auto'>
            {categories.map((cat, i) => (
              <div
                key={i}
                className='group bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 text-center shadow-md border border-gray-100 hover:border-[#f03e2f] transition-all duration-500 hover:shadow-xl hover:-translate-y-2 relative overflow-hidden'
              >
                <div className='absolute inset-0 bg-gradient-to-br from-[#f03e2f]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500'></div>
                <div className='absolute -inset-1 bg-gradient-to-r from-[#f03e2f]/20 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500'></div>
                <div className='relative z-10 flex flex-col items-center justify-center h-full'>
                  <div className='text-3xl mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 text-[#f03e2f]'>
                    {cat.icon}
                  </div>
                  <div className='font-semibold text-gray-800 group-hover:text-[#f03e2f] transition-all duration-500 transform group-hover:translate-y-1'>
                    {cat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* قسم الرؤية */}
      <motion.div
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className='my-8 relative'
      >
        <div className='max-w-7xl mx-auto px-4'>
          <motion.div
            variants={itemVariants}
            className='bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100 relative overflow-hidden'
          >
            <motion.div
              variants={circleVariants}
              className='absolute top-0 right-0 w-32 h-32 bg-[#f03e2f]/5 rounded-full -mr-16 -mt-16'
            ></motion.div>
            <motion.div
              variants={circleVariants}
              className='absolute bottom-0 left-0 w-32 h-32 bg-[#f03e2f]/5 rounded-full -ml-16 -mb-16'
            ></motion.div>

            <div className='relative z-10'>
              <motion.div
                variants={itemVariants}
                className='flex items-center gap-3 mb-6'
                animate='animate'
              >
                <motion.div variants={iconVariants} className='text-[#f03e2f] text-3xl'>
                  <FaLightbulb />
                </motion.div>
                <motion.h2
                  variants={titleVariants}
                  className='text-3xl md:text-4xl font-bold text-gray-900'
                >
                  {t('about.vision.title', 'Our Vision')}
                </motion.h2>
              </motion.div>

              <motion.p
                variants={itemVariants}
                className='text-gray-700 text-lg md:text-xl leading-relaxed mb-8 text-center max-w-4xl mx-auto'
              >
                {t(
                  'about.vision.main',
                  "To achieve a leading position for our offices on the map of the Kingdom and the region as diverse consulting offices that harness their energies and resources for growth and create distinctive value for their clients, employees, and all stakeholders, while playing their role in supporting the Kingdom's Vision 2030"
                )}
              </motion.p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutOverview;

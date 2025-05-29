import React, { useEffect, useState } from 'react';
import { FiHome, FiTool, FiLayers, FiClipboard, FiCheckCircle } from 'react-icons/fi';

const servicesAr = [
  {
    title: 'خدمات التصميم الهندسي',
    icon: <FiHome className='w-8 h-8' />,
    items: [
      'تصميمات معمارية حديثة ومستدامة',
      'دراسات هندسية متكاملة',
      'استشارات هندسية',
      'حلول تصميمية مبتكرة',
    ],
  },
  {
    title: 'خدمات التراخيص الإنشائية',
    icon: <FiTool className='w-8 h-8' />,
    items: ['إصدار رخص بناء فورية', 'إصدار رخصة تسوير', 'إصدار رخصة ترميم', 'إصدار شهادة الامتثال'],
  },
  {
    title: 'خدمات الأعمال المساحية',
    icon: <FiLayers className='w-8 h-8' />,
    items: [
      'تجزئة ودمج قطع الأراضي',
      'فرز وحدات سكنية',
      'تحديث الصكوك',
      'رفع مساحي',
      'إعداد تقارير مساحية',
    ],
  },
  {
    title: 'خدمات إدارة المشاريع',
    icon: <FiClipboard className='w-8 h-8' />,
    items: [
      'إشراف متكامل على مراحل التنفيذ',
      'تخطيط استراتيجي وتحليل شامل',
      'إشراف هندسي لضمان الجودة',
      'استخدام تقنيات حديثة للإدارة',
      'إدارة المخاطر وتحسين التنفيذ',
      'الالتزام بالمعايير والمواصفات الفنية',
    ],
  },
  {
    title: 'خدمات الإشراف الهندسي',
    icon: <FiTool className='w-8 h-8' />,
    items: [
      'إشراف هندسي دقيق',
      'متابعة التنفيذ وفق المواصفات',
      'الالتزام بالجدول الزمني والتكلفة',
      'تقارير فنية دورية',
      'إدارة وحل المشكلات الفنية في الموقع',
    ],
  },
  {
    title: 'خدمات استشارية وهندسية إضافية',
    icon: <FiLayers className='w-8 h-8' />,
    items: [
      'دراسات جدوى هندسية',
      'تقييم المخاطر الفنية',
      'حلول هندسية مبتكرة',
      'دعم فني وتحليل المشاريع',
    ],
  },
];

const servicesEn = [
  {
    title: 'Engineering Design Services',
    icon: <FiHome className='w-8 h-8' />,
    items: [
      'Modern and sustainable architectural designs',
      'Comprehensive engineering studies',
      'Engineering consultations',
      'Innovative design solutions',
    ],
  },
  {
    title: 'Construction Licensing Services',
    icon: <FiTool className='w-8 h-8' />,
    items: [
      'Instant building permits',
      'Fencing permit issuance',
      'Renovation permit issuance',
      'Compliance certificate issuance',
    ],
  },
  {
    title: 'Surveying Services',
    icon: <FiLayers className='w-8 h-8' />,
    items: [
      'Land parcel subdivision and merging',
      'Residential unit segregation',
      'Deed updates',
      'Topographic surveying',
      'Surveying reports preparation',
    ],
  },
  {
    title: 'Project Management Services',
    icon: <FiClipboard className='w-8 h-8' />,
    items: [
      'Comprehensive supervision of execution stages',
      'Strategic planning and comprehensive analysis',
      'Engineering supervision for quality assurance',
      'Utilizing modern management technologies',
      'Risk management and process improvement',
      'Commitment to technical standards and specifications',
    ],
  },
  {
    title: 'Engineering Supervision Services',
    icon: <FiTool className='w-8 h-8' />,
    items: [
      'Accurate engineering supervision',
      'Execution monitoring as per specifications',
      'Commitment to schedule and cost',
      'Periodic technical reports',
      'On-site technical problem solving',
    ],
  },
  {
    title: 'Additional Consulting & Engineering Services',
    icon: <FiLayers className='w-8 h-8' />,
    items: [
      'Engineering feasibility studies',
      'Technical risk assessment',
      'Innovative engineering solutions',
      'Technical support and project analysis',
    ],
  },
];

const ServiceOverview = () => {
  const [isRTL, setIsRTL] = useState(() => {
    if (typeof window !== 'undefined') {
      const htmlDir = document.documentElement.getAttribute('dir');
      return htmlDir === 'rtl';
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const html = document.documentElement;
    const updateDir = () => setIsRTL(html.getAttribute('dir') === 'rtl');

    const observer = new MutationObserver(updateDir);
    observer.observe(html, { attributes: true, attributeFilter: ['dir'] });

    updateDir();

    return () => observer.disconnect();
  }, []);

  const services = isRTL ? servicesAr : servicesEn;
  const sectionTitle = isRTL ? ' خدماتنا المتخصصه' : 'Our Services';
  const sectionSubtitle = isRTL
    ? '  نوفّر حلولًا هندسية شاملة تجمع بين الخبرة المحلية والمعايير العالمية'
    : 'We provide comprehensive engineering solutions that combine local expertise with international standards.';
  const ulDir = isRTL ? 'rtl' : 'ltr';
  return (
    <div className='min-h-screen  flex items-center justify-center py-6 px-2'>
      <div className='bg-white rounded-3xl p-6 md:p-10 max-w-6xl w-full shadow-sm border border-[#e9ecef]'>
        <div className='text-center mb-10'>
          <div className='text-md text-[#e76f51] font-semibold mb-3 inline-block border border-[#e76f51] rounded-full px-4 py-1 tracking-wider'>
            {sectionTitle}
          </div>
          <h2 className='text-gray-700 text-lg md:text-xl leading-relaxed mb-0 mt-0'>
            {sectionSubtitle}
          </h2>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {services.map((service, idx) => (
            <div
              key={idx}
              className={`group relative flex flex-col h-full rounded-2xl p-7 transition-all duration-300 border cursor-pointer
                ${idx === 1 ? 'bg-[#f76f51] text-white border-none' : 'bg-[#f6f9fa] text-[#222] border-[#e9ecef]'}
                shadow-sm
                hover:shadow-lg
                hover:-translate-y-1
                hover:scale-105
                ${idx !== 1 ? 'hover:border-[#e7401c]' : ''}
              `}
            >
              <div
                className={`mb-4 flex items-center justify-center transition-all duration-500 ${idx === 1 ? 'text-white' : 'text-[#222]'} group-hover:-translate-y-1 group-hover:rotate-6`}
              >
                {service.icon}
              </div>
              <div className='font-bold text-lg mb-4 text-center'>{service.title}</div>
              <ul
                className={`flex-1 mb-8 text-sm text-${isRTL ? 'right' : 'left'} pr-2 space-y-2 ${idx === 1 ? 'text-white/90' : 'text-gray-600'}`}
                dir={ulDir}
              >
                {service.items.map((item, i) => (
                  <li key={i} className='flex items-start gap-2'>
                    <FiCheckCircle
                      className={`mt-0.5 flex-shrink-0 ${idx === 1 ? 'text-white' : 'text-[#e76f51]'}`}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`
                  absolute bottom-5 ltr:right-5 rtl:left-5 w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-md
                  transition-all duration-500
                  ${
                    idx === 1
                      ? 'bg-[#e7401c] text-white'
                      : 'bg-[#222] text-white group-hover:bg-[#e7401c] group-hover:text-white'
                  }
                `}
              >
                <span
                  className={`inline-block transition-all duration-500
                    ${idx === 1 ? '' : ' -rotate-45 group-hover:rotate-0'}`}
                >
                  ➔
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceOverview;

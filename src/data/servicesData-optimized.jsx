import React from 'react';
import { FiHome, FiTool, FiLayers, FiClipboard } from 'react-icons/fi';

// Optimized services data - contains only essential data for overview
export const servicesSummaryAr = [
  {
    id: 1,
    title: 'خدمات التصميم الهندسي',
    icon: <FiHome className='w-8 h-8' />,
    shortDescription: 'تصميم معماري حديث ومستدام يجمع بين الأناقة والوظيفية',
    image: '/assets/images/services/design.webp',
    keywords: ['تصميم معماري', 'مكتب هندسي الرياض', 'استشارات هندسية'],
    metaDescription: 'أفضل خدمات التصميم المعماري في الرياض لدى مكتب qiwa nagd الهندسي المعتمد.',
    slug: 'architectural-design',
    items: [
      'تصميمات معمارية حديثة ومستدامة',
      'دراسات هندسية متكاملة',
      'استشارات هندسية',
      'حلول تصميمية مبتكرة',
    ]
  },
  {
    id: 2,
    title: 'خدمات التراخيص الإنشائية',
    icon: <FiTool className='w-8 h-8' />,
    shortDescription: 'استخراج رخص البناء والترميم والتسوير بإشراف هندسي معتمد',
    image: '/assets/images/services/licenses.webp',
    keywords: ['رخصة بناء', 'رخصة ترميم', 'تراخيص إنشائية'],
    metaDescription: 'استخراج رخصة بناء، ترميم، أو تسوير في الرياض عبر مكتب هندسي معتمد.',
    slug: 'construction-licenses',
    items: [
      'إصدار رخصة بناء فورية',
      'إصدار رخصة ترميم',
      'إصدار رخصة تسوير',
      'إصدار شهادة الامتثال',
    ]
  },
  {
    id: 3,
    title: 'خدمات الأعمال المساحية',
    icon: <FiLayers className='w-8 h-8' />,
    shortDescription: 'خدمات مساحية دقيقة باستخدام أحدث التقنيات والأجهزة',
    image: '/assets/images/services/surveying.webp',
    keywords: ['أعمال مساحية', 'مساح معتمد', 'تجزئة أراضي'],
    metaDescription: 'خدمات مساحية دقيقة ومعتمدة في الرياض من مكتب qiwa nagd.',
    slug: 'surveying-services',
    items: [
      'تجزئة ودمج قطع الأراضي',
      'فرز وحدات سكنية',
      'تحديث الصكوك',
      'رفع مساحي',
    ]
  },
  {
    id: 4,
    title: 'خدمات إدارة المشاريع الإنشائية',
    icon: <FiClipboard className='w-8 h-8' />,
    shortDescription: 'إدارة شاملة للمشاريع من التخطيط حتى التسليم',
    image: '/assets/images/services/project-management.webp',
    keywords: ['إدارة مشاريع إنشائية', 'مدير مشروع معتمد', 'PMP'],
    metaDescription: 'خدمات إدارة المشاريع الإنشائية في الرياض من مكتب qiwa nagd الهندسي.',
    slug: 'project-management',
    items: [
      'تخطيط المشروع والجداول الزمنية',
      'إدارة التكلفة والميزانيات',
      'إدارة المخاطر والجودة',
      'الإشراف الميداني المتكامل',
    ]
  }
];

// Function to dynamically import full service details
export const loadServiceDetails = async (serviceId) => {
  try {
    switch (serviceId) {
      case 1:
        const service1 = await import('./services/service-1-ar.js');
        return service1.default;
      case 2:
        const service2 = await import('./services/service-2-ar.js');
        return service2.default;
      case 3:
        const service3 = await import('./services/service-3-ar.js');
        return service3.default;
      case 4:
        const service4 = await import('./services/service-4-ar.js');
        return service4.default;
      default:
        throw new Error('Service not found');
    }
  } catch (error) {
    console.error('Error loading service details:', error);
    return null;
  }
};

// English version
export const servicesSummaryEn = [
  {
    id: 1,
    title: 'Architectural Design Services',
    icon: <FiHome className='w-8 h-8' />,
    shortDescription: 'Modern and sustainable architectural design combining elegance and functionality',
    image: '/assets/images/services/design.webp',
    keywords: ['architectural design', 'engineering office Riyadh', 'engineering consulting'],
    metaDescription: 'Best architectural design services in Riyadh from qiwa nagd certified engineering office.',
    slug: 'architectural-design',
    items: [
      'Modern and sustainable architectural designs',
      'Integrated engineering studies',
      'Engineering consulting',
      'Innovative design solutions',
    ]
  },
  // Add other services...
]; 
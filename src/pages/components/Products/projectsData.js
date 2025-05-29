const projectCategories = {
  'Exterior design': {
    id: 'Exterior design',
    title: {
      ar: 'تصميم خارجي',
      en: 'Exterior Design',
    },
    description: {
      ar: 'تصاميم خارجية مميزة للفلل والقصور',
      en: 'Distinctive exterior designs for villas and palaces',
    },
  },
  'Interior design': {
    id: 'Interior design',
    title: {
      ar: 'تصميم داخلي',
      en: 'Interior Design',
    },
    description: {
      ar: 'تصاميم داخلية عصرية وفاخرة',
      en: 'Modern and luxurious interior designs',
    },
  },
  'Other design': {
    id: 'Other design',
    title: {
      ar: 'تصميمات أخرى',
      en: 'Other Designs',
    },
    description: {
      ar: 'تصاميم متنوعة ومميزة',
      en: 'Diverse and distinctive designs',
    },
  },
};

// Import images using a more production-friendly approach
const getImageUrl = (path) => {
  if (!path) {
    console.error('Missing image path');
    return '/images/placeholder.png';
  }

  try {
    // Always use the src/assets path
    return `/assets/images/projects/${path}`;
  } catch (error) {
    console.error(`Error processing image path: ${path}`, error);
    return '/images/placeholder.png';
  }
};

const projects = [
  // Exterior Design Projects
  {
    id: 'facade-mousa',
    title: {
      ar: 'واجهة موسى',
      en: 'Mousa Facade',
    },
    src: getImageUrl('Exterior design/1.webp'),
    type: 'Exterior design',
    category: projectCategories['Exterior design'],
  },
  {
    id: 'estraha-1',
    title: {
      ar: 'استراحة',
      en: 'Rest House',
    },
    src: getImageUrl('Exterior design/2.webp'),
    type: 'Exterior design',
    category: projectCategories['Exterior design'],
  },
  {
    id: 'estraha-2',
    title: {
      ar: 'استراحة',
      en: 'Rest House',
    },
    src: getImageUrl('Exterior design/3.webp'),
    type: 'Exterior design',
    category: projectCategories['Exterior design'],
  },
  {
    id: 'harbi',
    title: {
      ar: 'تصميم حربي',
      en: 'Harbi Design',
    },
    src: getImageUrl('Exterior design/4.webp'),
    type: 'Exterior design',
    category: projectCategories['Exterior design'],
  },
  {
    id: 'saad-alharthy',
    title: {
      ar: 'تصميم سعد الحارثي',
      en: 'Saad Al-Harthy Design',
    },
    src: getImageUrl('Exterior design/5.webp'),
    type: 'Exterior design',
    category: projectCategories['Exterior design'],
  },
  // إضافة جميع صور WhatsApp للتصميم الخارجي
  ...[6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((index) => ({
    id: `exterior-whatsapp-${index - 5}`,
    title: {
      ar: 'تصميم خارجي',
      en: 'Exterior Design',
    },
    src: getImageUrl(`Exterior design/${index}.webp`),
    type: 'Exterior design',
    category: projectCategories['Exterior design'],
  })),

  // Interior Design Projects
  // مجموعة LUXURY MODERN RECEPTION
  ...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((index) => ({
    id: `luxury-modern-reception-${index}`,
    title: {
      ar: 'استقبال عصري فاخر',
      en: 'Luxury Modern Reception',
    },
    src: getImageUrl(`Interior design/${index}.webp`),
    type: 'Interior design',
    category: projectCategories['Interior design'],
    group: 'luxury-modern-reception',
  })),

  // مجموعة CONTEMPORARY RECEPTION DESIGN
  ...[16, 17, 18, 19, 20].map((index) => ({
    id: `contemporary-reception-${index - 15}`,
    title: {
      ar: 'استقبال معاصر',
      en: 'Contemporary Reception',
    },
    src: getImageUrl(`Interior design/${index}.webp`),
    type: 'Interior design',
    category: projectCategories['Interior design'],
    group: 'contemporary-reception',
  })),

  // مجموعة EGY LUXURY BATHROOM
  ...[21, 22, 23, 24].map((index) => ({
    id: `egy-luxury-bathroom-${index - 20}`,
    title: {
      ar: 'حمام فاخر',
      en: 'Luxury Bathroom',
    },
    src: getImageUrl(`Interior design/${index}.webp`),
    type: 'Interior design',
    category: projectCategories['Interior design'],
    group: 'egy-luxury-bathroom',
  })),

  // مجموعة LUXURY MODERN INDOOR POOL
  ...[25, 26, 27, 28, 29].map((index) => ({
    id: `luxury-indoor-pool-${index - 24}`,
    title: {
      ar: 'مسبح داخلي فاخر',
      en: 'Luxury Indoor Pool',
    },
    src: getImageUrl(`Interior design/${index}.webp`),
    type: 'Interior design',
    category: projectCategories['Interior design'],
    group: 'luxury-indoor-pool',
  })),

  // مجموعة Beauty Salon Qblash - Kuwait
  ...[30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41].map((index) => ({
    id: `beauty-salon-kuwait-${index - 29}`,
    title: {
      ar: 'صالون تجميل',
      en: 'Beauty Salon',
    },
    src: getImageUrl(`Interior design/${index}.webp`),
    type: 'Interior design',
    category: projectCategories['Interior design'],
    group: 'beauty-salon-kuwait',
  })),

  // Other Design Projects
  {
    id: 'other-design-1',
    title: {
      ar: 'تصميم منتجع سياحي',
      en: 'Tourist Resort Design',
    },
    src: getImageUrl('Otherdesign/oth1.webp'),
    type: 'Other design',
    category: projectCategories['Other design'],
    group: 'other-design',
  },
  {
    id: 'other-design-2',
    title: {
      ar: 'تصميم منتجع سياحي',
      en: 'Tourist Resort Design',
    },
    src: getImageUrl('Otherdesign/oth2.webp'),
    type: 'Other design',
    category: projectCategories['Other design'],
    group: 'other-design',
  },
];

// تجميع المشاريع حسب المجموعات
const groupedProjects = projects.reduce((acc, project) => {
  if (project.group) {
    if (!acc[project.group]) {
      acc[project.group] = [];
    }
    acc[project.group].push(project);
  }
  return acc;
}, {});

export { projects, projectCategories, groupedProjects };

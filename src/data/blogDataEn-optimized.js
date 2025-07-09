// Optimized blog data - contains only essential data for listing
export const blogSummariesEn = [
  {
    id: 1,
    title: 'Complete Guide to Engineering Consulting Services in Saudi Arabia',
    category: 'Featured Article',
    date: 'March 15, 2024',
    image: '/assets/images/blog/1.webp',
    description: 'Discover comprehensive engineering consulting services in Saudi Arabia, from architectural design to project supervision and management. A detailed guide for developers and property owners in 2025.',
    featured: true,
    metaTitle: 'Engineering Consulting in Saudi Arabia | Complete Services Guide 2025',
    metaDescription: 'Discover comprehensive engineering consulting services in Saudi Arabia, from architectural design to project supervision and management. A detailed guide for developers and property owners in 2025.',
    metaKeywords: 'engineering consulting Saudi Arabia, architectural design, engineering supervision, project management',
    readTime: '12 min read',
    slug: 'engineering-consulting-guide-saudi'
  },
  {
    id: 2,
    title: 'Saudi Property Deed Update Regulations: Your Complete Guide to Deed Updates in Riyadh',
    category: 'Surveying Services',
    date: 'March 28, 2024',
    image: '/assets/images/blog/2.webp',
    description: 'Learn about the steps and requirements for updating property deeds in Riyadh according to Saudi regulations, and the importance of using a licensed engineering consulting office for accuracy.',
    featured: false,
    metaTitle: 'Property Deed Updates in Riyadh – Complete Guide',
    metaDescription: 'Learn about the steps and requirements for updating property deeds in Riyadh according to Saudi regulations.',
    metaKeywords: 'property deed update Riyadh, Ehkam platform deed updates, licensed surveying Riyadh',
    readTime: '8 min read',
    slug: 'property-deed-update-riyadh'
  },
  // Add more summaries as needed
];

// Function to dynamically import full article content
export const loadBlogArticle = async (id) => {
  try {
    switch (id) {
      case 1:
        const article1 = await import('./blog/article-1-en.js');
        return article1.default;
      case 2:
        const article2 = await import('./blog/article-2-en.js');
        return article2.default;
      default:
        throw new Error('Article not found');
    }
  } catch (error) {
    console.error('Error loading blog article:', error);
    return null;
  }
}; 
import { Card } from '../../../components/ui/card';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useNavigate } from 'react-router-dom';

const BlogContant = ({ blogData }) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const navigate = useNavigate();

  // Use Tajawal font for modern Arabic look
  const fontFamily = isArabic ? 'Tajawal, Cairo, Arial, sans-serif' : 'inherit';

  // Center grid if less than 9 posts
  const gridJustify = blogData.posts.length < 9 ? 'justify-center' : '';

  const handleReadMore = (postId) => {
    navigate(`/blog/${postId}`);
  };

  // Function to get translated category
  const getTranslatedCategory = (category) => {
    switch (category) {
      case 'مقال مميز':
        return t('blog.categories.featured');
      case 'الخدمات الهندسية':
        return t('blog.categories.engineering_services');
      case 'الأعمال المساحية':
        return t('blog.categories.surveying');
      case 'العمارة والتصميم':
        return t('blog.categories.architecture');
      case 'البناء والتشييد':
        return t('blog.categories.construction');
      default:
        return category;
    }
  };

  return (
    <div className='min-h-screen py-20' dir={isArabic ? 'rtl' : 'ltr'} style={{ fontFamily }}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <div
            className='text-[#FF5E3A] text-xs font-bold tracking-widest mb-2 uppercase'
            style={{ letterSpacing: '2px' }}
          >
            {t('blog.latest_posts')}
          </div>
          <h2
            className='text-3xl md:text-4xl font-bold text-[#222] my-2 tracking-tight'
            style={{ fontFamily }}
          >
            {t('blog.read_our_news')}
          </h2>
        </div>
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 ${gridJustify}`}>
          {blogData.posts.map((post, index) => (
            <div
              key={post.id}
              onClick={() => handleReadMore(post.id)}
              className='cursor-pointer group'
            >
              <Card className='bg-white rounded-[2rem] shadow-lg overflow-hidden flex flex-col border-0 p-0 h-full min-h-[50px] transition-all duration-500 ease-in-out hover:shadow-2xl hover:-translate-y-2'>
                <div className='relative overflow-hidden'>
                  <div className='overflow-hidden'>
                    <LazyLoadImage
                      src={post.image}
                      alt={post.title}
                      effect='blur'
                      className='w-full h-[400px] md:h-[500px] object-cover transform transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform '
                      placeholderSrc='/assets/images/placeholder.png'
                      style={{
                        borderTopLeftRadius: '2rem',
                        borderTopRightRadius: '2rem',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        transformOrigin: 'center',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                      }}
                    />
                  </div>
                  <div
                    className={`absolute top-4 ${isArabic ? 'left-4' : 'right-4'} z-10 transform transition-transform duration-500 group-hover:scale-105`}
                  >
                    <span className='bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-5 py-2 rounded-full shadow-lg border border-gray-200/50'>
                      {getTranslatedCategory(post.category)}
                    </span>
                  </div>
                </div>
                <div className='bg-white rounded-b-[2rem] p-8 flex flex-col flex-1 justify-between transform transition-all duration-500 ease-in-out group-hover:bg-gray-50'>
                  <div
                    className={`flex items-center gap-2 text-xs text-gray-500 font-medium mb-4 ${isArabic ? 'justify-end' : ''}`}
                  >
                    <span className='flex items-center gap-1 transition-colors duration-300 group-hover:text-[#FF5E3A]'>
                      <svg
                        className='w-4 h-4 text-[#FF5E3A]'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                        />
                      </svg>
                      {post.date}
                    </span>
                    <span className='mx-2'>•</span>
                    <span className='flex items-center gap-1 transition-colors duration-300 group-hover:text-[#FF5E3A]'>
                      <svg
                        className='w-4 h-4 text-gray-400 group-hover:text-[#FF5E3A] transition-colors duration-300'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                        />
                      </svg>
                      {isArabic
                        ? `بواسطة ${post.author || 'Qawi Najd'}`
                        : `${t('blog.by')} ${post.author || 'Qawi Najd'}`}
                    </span>
                  </div>
                  <h3
                    className='text-xl md:text-2xl font-bold text-gray-900 mb-4 leading-tight'
                    style={{ fontFamily, textAlign: isArabic ? 'right' : 'left' }}
                  >
                    {isArabic ? post.title : t(`blog_content.posts.${post.id}.title`)}
                  </h3>
                  <p className='text-gray-600 text-sm mb-6 line-clamp-3 transition-colors duration-500 group-hover:text-gray-700'>
                    {isArabic ? post.description : t(`blog_content.posts.${post.id}.description`)}
                  </p>
                  <div
                    className={`flex items-center gap-3 text-black font-medium text-base w-fit mt-auto transition-all duration-500 group-hover:text-[#FF5E3A] ${isArabic ? 'flex-row-reverse' : ''}`}
                    style={{ fontFamily }}
                  >
                    {t('blog.read_more')}
                    <span className='inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#222] group-hover:bg-[#FF5E3A] transition-all duration-500 ease-in-out shadow-md group-hover:shadow-lg'>
                      <span className='inline-block -rotate-45 group-hover:rotate-0 transition-all duration-500 ease-in-out text-white text-xl'>
                        ➔
                      </span>
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogContant;

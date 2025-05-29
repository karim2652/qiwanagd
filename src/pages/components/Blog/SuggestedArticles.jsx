import { useTranslation } from 'react-i18next';
import { blogData } from '../../../data/blogData';
import { blogDataEn } from '../../../data/blogDataEn';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const SuggestedArticles = ({ excludeId, isArabic }) => {
  const { t } = useTranslation();
  // Select data source based on language
  const dataSource = isArabic ? blogData : blogDataEn;
  // استثنِ المقال الحالي وخذ 4 مقالات
  const suggestions = dataSource.posts.filter((p) => p.id !== excludeId).slice(0, 5);

  // دالة ترجمة التاريخ
  const getTranslatedDate = (dateStr) => {
    if (isArabic) return dateStr;
    // تحويل التاريخ العربي إلى إنجليزي
    const monthsMap = {
      يناير: 'January',
      فبراير: 'February',
      مارس: 'March',
      أبريل: 'April',
      مايو: 'May',
      يونيو: 'June',
      يوليو: 'July',
      أغسطس: 'August',
      سبتمبر: 'September',
      أكتوبر: 'October',
      نوفمبر: 'November',
      ديسمبر: 'December',
    };
    const parts = dateStr.split(' ');
    if (parts.length === 3 && monthsMap[parts[1]]) {
      return `${monthsMap[parts[1]]} ${parts[0]}, ${parts[2]}`;
    }
    return dateStr;
  };

  return (
    <div className='bg-white rounded-xl shadow px-4 py-8'>
      <h3 className='font-bold text-lg  text-gray-800 text-center'>
        {t('blog.suggested_articles')}
      </h3>
      <ul className='space-y-9 my-5 '>
        {suggestions.map((article) => (
          <li key={article.id}>
            <Link
              to={`/blog/${article.id}`}
              className='flex items-center bg-gray-50 rounded-xl p-4 gap-3 hover:bg-gray-100 transition-colors duration-300 cursor-pointer group'
            >
              <LazyLoadImage
                src={article.image}
                alt={article.title}
                effect='blur'
                className='w-14 h-14 rounded object-cover border'
              />
              <div className='flex-1 min-w-0'>
                <span className='font-medium line-clamp-2 block text-sm text-gray-900 group-hover:text-[#e53a1e] transition-colors duration-300'>
                  {article.title}
                </span>
                <div className='text-xs text-gray-400 mt-1'>{getTranslatedDate(article.date)}</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuggestedArticles;

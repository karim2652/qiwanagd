import { useTranslation } from 'react-i18next';
import { servicesAr, servicesEn } from '../../../data/servicesData.jsx';
import { Link } from 'react-router-dom';

const SuggestedServices = ({ excludeTitle, isArabic }) => {
  const { t } = useTranslation();
  // Select data source based on language
  const dataSource = isArabic ? servicesAr : servicesEn;
  // استثنِ الخدمة الحالية وخذ 4 خدمات
  const suggestions = dataSource.filter((s) => s.title !== excludeTitle).slice(0, 4);

  // دالة تحويل العنوان إلى صيغة URL-friendly
  const createSlug = (title) => {
    // For Arabic titles
    if (/[\u0600-\u06FF]/.test(title)) {
      return title
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\u0600-\u06FF\w-]/g, '')
        .replace(/-+/g, '-')
        .toLowerCase();
    }

    // For English titles
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  return (
    <div className='bg-white rounded-xl shadow px-4 py-8'>
      <h3 className='font-bold text-lg text-gray-800 text-center'>
        {isArabic ? 'خدمات أخرى' : 'Other Services'}
      </h3>
      <ul className='space-y-6 my-5'>
        {suggestions.map((service, index) => (
          <li key={index}>
            <Link
              to={`/services/${createSlug(service.title)}`}
              className='flex items-center bg-gray-50 rounded-xl p-4 gap-3 hover:bg-gray-100 transition-colors duration-300 cursor-pointer group'
            >
              <div className='w-14 h-14 rounded bg-[#FF5E3A] flex items-center justify-center text-white text-xl border'>
                {service.icon}
              </div>
              <div className='flex-1 min-w-0'>
                <span className='font-medium line-clamp-2 block text-sm text-gray-900 group-hover:text-[#e53a1e] transition-colors duration-300'>
                  {service.title}
                </span>
                <div className='text-xs text-gray-400 mt-1 line-clamp-2'>
                  {service.overview && service.overview.length > 80
                    ? service.overview.substring(0, 80) + '...'
                    : service.overview}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuggestedServices;

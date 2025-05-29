import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import { TypeAnimation } from 'react-type-animation';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Mail,
  Phone,
  User,
  MessageSquare,
  Building,
  CheckCircle2,
  MapPin,
  Calendar,
} from 'lucide-react';
import { MdBusiness, MdHome, MdFactory, MdLocationCity } from 'react-icons/md';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import logoAr from '../assets/images/logo/3.svg';
import logoEn from '../assets/images/logo/5.svg';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const SERVICE_TYPES = [
  { key: 'commercial', label: 'Commercial', icon: <MdLocationCity size={40} /> },
  { key: 'industrial', label: 'Industrial', icon: <MdFactory size={40} /> },
  { key: 'residential', label: 'Residential', icon: <MdHome size={40} /> },
  { key: 'corporate', label: 'Corporate', icon: <MdBusiness size={40} /> },
];


// Zod schema for the quote form
const quoteSchema = z.object({
  name: z.string().min(1, 'name_required'),
  email: z.string().min(1, 'email_required').email('email_invalid'),
  phone: z.string().min(1, 'phone_required'),
  location: z.string().min(1, 'location_required'),
  howDidYouFind: z.string().min(1, 'how_did_you_find_required'),
  requestType: z.string().min(1, 'request_type_required'),
  workType: z.string().min(1, 'work_type_required'),
  service: z.string().min(1, 'select_service_required'),
  requiredService: z.string().min(1, 'required_service_required'),
  comment: z.string().optional(),
  date: z.string().min(1, 'date_required'),
});

const Quote = () => {
  const { t, i18n } = useTranslation();
  const buttonText = i18n.language === 'ar' ? 'ارسل لنا' : 'Send Us';
  const [selectedType, setSelectedType] = React.useState('industrial');
  const [isSending, setIsSending] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting: formIsSubmitting },
    setValue,
  } = useForm({
    resolver: zodResolver(quoteSchema),
  });

  // Dynamic options from the translation file
  const HOW_DID_YOU_FIND_OPTIONS = t('quote.how_did_you_find_options', { returnObjects: true });
  const REQUEST_TYPES = t('quote.request_types', { returnObjects: true });
  const REQUIRED_SERVICES = t('quote.required_services', { returnObjects: true });

  // أنواع الخدمات مع الترجمة
  const SERVICE_TYPES = [
    { key: 'commercial', label: t('quote.commercial'), icon: <MdLocationCity size={40} /> },
    { key: 'industrial', label: t('quote.industrial'), icon: <MdFactory size={40} /> },
    { key: 'residential', label: t('quote.residential'), icon: <MdHome size={40} /> },
    { key: 'corporate', label: t('quote.corporate'), icon: <MdBusiness size={40} /> },
  ];

  const handleTypeSelect = (key) => setSelectedType(key);

  const onSubmit = async (data) => {
    setIsSending(true);
    setIsSubmitting(true);
    try {
      // Add your form submission logic here
      console.log('Form data:', data);
      toast.success('تم إرسال الطلب بنجاح! 🎉');
      reset();
    } catch (error) {
      console.error('Failed to submit form:', error);
      toast.error('حدث خطأ أثناء إرسال الطلب! 😞');
    } finally {
      setIsSending(false);
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className='min-h-screen bg-[#111] flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-6 md:py-10 m-6 rounded-3xl'>
        <ToastContainer
          position='top-center'
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={true}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='dark'
        />
        <div className='flex flex-col gap-6 md:gap-8 w-full max-w-6xl'>
          {/* Logo & Title */}
          <div className='w-full'>
            <div
              className={`flex flex-col w-full ${i18n.language === 'ar' ? 'items-end' : 'items-start'}`}
            >
              <LazyLoadImage
                src={i18n.language === 'ar' ? logoAr : logoEn}
                alt='logo'
                effect='blur'
                className='w-36 h-36 md:w-36 md:h-36 mb-2'
                wrapperClassName='w-36 h-36 md:w-36 md:h-36'
              />
              <h1 className='bg-[#222] text-[#ff3e33] px-4 py-1 rounded-full text-sm font-semibold inline-block'>
                {t('quote.title')}
              </h1>
            </div>
          </div>
          <div className='flex flex-col items-center gap-2 -mt-4'>
            <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center'>
              {t('quote.main_title')}{' '}
              <TypeAnimation
                key={i18n.language}
                sequence={
                  i18n.language === 'ar'
                    ? [
                        t('quote.design_types.external'),
                        2000,
                        t('quote.design_types.3d'),
                        2000,
                        t('quote.design_types.architectural'),
                        2000,
                        t('quote.design_types.structural'),
                        2000,
                      ]
                    : [
                        t('quote.design_types.external'),
                        2000,
                        t('quote.design_types.3d'),
                        2000,
                        t('quote.design_types.architectural'),
                        2000,
                        t('quote.design_types.structural'),
                        2000,
                      ]
                }
                wrapper='span'
                speed={25}
                repeat={Infinity}
                cursor={true}
                className='text-[#ff3e33]'
              />
            </h1>
            <p className='text-gray-300 text-md md:text-lg text-center mt-6'>
              {t('quote.subtitle')}
            </p>
          </div>
        </div>
        <hr className='border-[#222] w-full max-w-6xl my-6 md:my-8' />
        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10'
        >
          {/* مجموعة معلومات التواصل */}
          <div className='col-span-1 flex flex-col gap-4 bg-[#181818] p-6 rounded-2xl border border-[#222]'>
            <h2 className='text-lg font-bold text-[#ff3e33] mb-2'>
              {t('quote.contact_info') || 'معلومات التواصل'}
            </h2>
            {/* Name */}
            <div className='relative'>
              <Input
                type='text'
                placeholder={t('quote.name')}
                className='w-full rounded-full bg-[#222] border-[#333] text-white px-10 py-3 placeholder:text-[#aaa] text-sm focus:border-[#ff3e33] focus:outline-none'
                {...register('name')}
              />
              <User className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5' />
              {errors.name && <p className='text-red-500 text-xs mt-1'>{errors.name.message}</p>}
            </div>
            {/* Email */}
            <div className='relative'>
              <Input
                type='email'
                placeholder={t('quote.email')}
                className='w-full rounded-full bg-[#222] border-[#333] text-white px-10 py-3 placeholder:text-[#aaa] text-sm focus:border-[#ff3e33] focus:outline-none'
                {...register('email')}
              />
              <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5' />
              {errors.email && <p className='text-red-500 text-xs mt-1'>{errors.email.message}</p>}
            </div>
            {/* Phone */}
            <div className='relative'>
              <Input
                type='tel'
                placeholder={t('quote.phone')}
                className='w-full rounded-full bg-[#222] border-[#333] text-white px-10 py-3 placeholder:text-[#aaa] text-sm focus:border-[#ff3e33] focus:outline-none'
                dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
                {...register('phone')}
              />
              <Phone
                className='absolute left-3 top-1/2 transform -translate-y-1/2 text-[#777]'
                size={20}
              />
              {errors.phone && <p className='text-red-500 text-xs mt-1'>{errors.phone.message}</p>}
            </div>
            {/* Location */}
            <div className='relative'>
              <Input
                type='text'
                placeholder={t('quote.location')}
                className='w-full rounded-full bg-[#222] border-[#333] text-white px-10 py-3 placeholder:text-[#aaa] text-sm focus:border-[#ff3e33] focus:outline-none'
                {...register('location')}
              />
              <MapPin className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5' />
              {errors.location && (
                <p className='text-red-500 text-xs mt-1'>{errors.location.message}</p>
              )}
            </div>
          </div>
          {/* مجموعة تفاصيل الطلب */}
          <div className='col-span-1 flex flex-col gap-4 bg-[#181818] p-6 rounded-2xl border border-[#222]'>
            <h2 className='text-lg font-bold text-[#ff3e33] mb-2'>
              {t('quote.request_details') || 'تفاصيل الطلب'}
            </h2>
            {/* Service Types */}
            <div className='flex flex-wrap gap-2 mb-2'>
              {SERVICE_TYPES.map((type) => (
                <button
                  key={type.key}
                  onClick={() => handleTypeSelect(type.key)}
                  type='button'
                  className={`flex flex-col items-center justify-center w-24 h-24 rounded-xl border transition-all duration-200 text-white text-sm font-medium gap-1 ${selectedType === type.key ? 'bg-[#ff3e33] border-[#ff3e33] shadow-lg' : 'bg-[#222] border-[#333] hover:border-[#ff3e33]'}`}
                >
                  <span className='text-2xl'>{type.icon}</span>
                  <span>{type.label}</span>
                </button>
              ))}
            </div>
            {/* How did you find us */}
            <div>
              <Select onValueChange={(value) => setValue('howDidYouFind', value)} defaultValue=''>
                <SelectTrigger className='w-full rounded-full bg-[#222] border-[#333] text-white px-10 py-3 placeholder:text-[#aaa] text-sm focus:border-[#ff3e33] focus:outline-none '>
                  <SelectValue placeholder={t('quote.how_did_you_find')} />
                </SelectTrigger>
                <SelectContent className='bg-[#222] border-[#333] text-white '>
                  {HOW_DID_YOU_FIND_OPTIONS.map((option) => (
                    <SelectItem className='hover:bg-[#ff3e33] ' key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.howDidYouFind && (
                <p className='text-red-500 text-xs mt-1'>{errors.howDidYouFind.message}</p>
              )}
            </div>
            {/* Request Type */}
            <div>
              <Select onValueChange={(value) => setValue('requestType', value)} defaultValue=''>
                <SelectTrigger className='w-full rounded-full bg-[#222] border-[#333] text-white px-10 py-3 placeholder:text-[#aaa] text-sm focus:border-[#ff3e33] focus:outline-none'>
                  <SelectValue placeholder={t('quote.request_type')} />
                </SelectTrigger>
                <SelectContent className='bg-[#222] border-[#333] text-white focus:border-[#ff3e33] focus:outline-none'>
                  {REQUEST_TYPES.map((type) => (
                    <SelectItem className='hover:bg-[#ff3e33] ' key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.requestType && (
                <p className='text-red-500 text-xs mt-1'>{errors.requestType.message}</p>
              )}
            </div>
            {/* Required Service */}
            <div>
              <Select onValueChange={(value) => setValue('requiredService', value)} defaultValue=''>
                <SelectTrigger className='w-full rounded-full bg-[#222] border-[#333] text-white px-10 py-3 placeholder:text-[#aaa] text-sm focus:border-[#ff3e33] focus:outline-none'>
                  <SelectValue placeholder={t('quote.required_service')} />
                </SelectTrigger>
                <SelectContent className='bg-[#222] border-[#333] text-white'>
                  {REQUIRED_SERVICES.map((service) => (
                    <SelectItem className='hover:bg-[#ff3e33]' key={service} value={service}>
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.requiredService && (
                <p className='text-red-500 text-xs mt-1'>{errors.requiredService.message}</p>
              )}
            </div>
          </div>
          {/* مجموعة الملاحظات والملف وزر الإرسال */}
          <div className='col-span-1 md:col-span-2 flex flex-col gap-4 bg-[#181818] p-6 rounded-2xl border border-[#222] mt-2'>
            <h2 className='text-lg font-bold text-[#ff3e33] mb-2'>
              {t('quote.additional_notes') || 'ملاحظات إضافية'}
            </h2>
            {/* File Upload */}
            <div className='flex items-center justify-center w-full'>
              <label
                htmlFor='dropzone-file'
                className='flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer bg-[#222] border-[#333] hover:border-[#ff3e33]'
              >
                <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                  <p className='mb-2 text-sm text-gray-400'>
                    <span className='font-semibold'>{t('quote.click_to_upload')}</span>
                  </p>
                  <p className='text-xs text-gray-400'>{t('quote.upload_concept')}</p>
                </div>
                <input
                  id='dropzone-file'
                  type='file'
                  className='hidden'
                  onChange={(e) => {
                    // Handle file upload logic here
                    console.log(e.target.files[0]);
                  }}
                />
              </label>
            </div>
            {/* Comment */}
            <div className='relative'>
              <Textarea
                placeholder={t('quote.comment')}
                className='w-full rounded-2xl bg-[#222] border-[#333] text-white px-4 py-3 placeholder:text-[#aaa] min-h-[120px] h-[120px] resize-none focus:border-[#ff3e33] focus:outline-none'
                dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
                {...register('comment')}
              />
              <MessageSquare
                className={`absolute top-3 ${i18n.language === 'ar' ? 'left-3' : 'right-3'} text-[#777]`}
                size={20}
              />
            </div>
            {/* Submit Button */}
            <div className='flex items-center justify-center mt-5'>
              <Button
                type='submit'
                text={buttonText}
                disabled={formIsSubmitting || isSending}
                className='bg-[#ff3e33] text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg hover:bg-[#e63a2e] flex items-center justify-center gap-2'
              >
                {isSending ? (
                  <>
                    <span className='animate-spin'>⚡</span>
                    {t('quote.sending')}
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={18} className='w-5 h-5' />
                    {t('quote.submit')}
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Quote;

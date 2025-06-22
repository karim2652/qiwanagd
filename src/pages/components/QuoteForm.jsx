import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import emailjs from '@emailjs/browser';
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
import { Mail, Phone, User, MessageSquare, CheckCircle2, MapPin } from 'lucide-react';
import { MdBusiness, MdHome, MdFactory, MdLocationCity } from 'react-icons/md';
import { zodResolver } from '@hookform/resolvers/zod';
import { createQuoteSchema } from '@/schemas/quoteSchema';
import { sendGTMEvent } from '@/lib/gtm';

const QuoteForm = () => {
  const { t, i18n } = useTranslation();
  const buttonText = i18n.language === 'ar' ? 'ارسل لنا' : 'Send Us';
  const [selectedType, setSelectedType] = React.useState('industrial');
  const [isSending, setIsSending] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Initialize EmailJS with the correct configuration
  React.useEffect(() => {
    try {
      emailjs.init({
        publicKey: 'yQ03ZUF1VMp4mz9rB',
        limitRate: true,
        blockHeadless: false,
        blockList: {
          list: [],
          watchVariable: true,
        },
        accountId: 'account_id', // Add your account ID if you have one
      });
      // console.log('EmailJS initialized successfully with config:', {
      //   publicKey: 'yQ03ZUF1VMp4mz9rB',
      //   serviceId: 'service_vh5fr15',
      //   templateId: 'template_8akn5z5',
      // });
    } catch (error) {
      console.error('EmailJS initialization error:', error);
    }
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting: formIsSubmitting },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(createQuoteSchema(i18n)),
    mode: 'onChange', // Enable real-time validation
  });

  // Dynamic options from the translation file
  const HOW_DID_YOU_FIND_OPTIONS = t('quote.how_did_you_find_options', { returnObjects: true });
  const REQUEST_TYPES = t('quote.request_types', { returnObjects: true });
  const REQUIRED_SERVICES = t('quote.required_services', { returnObjects: true });
  const handleTypeSelect = (key) => setSelectedType(key);

  const onSubmit = async (data) => {
    setIsSending(true);
    setIsSubmitting(true);
    toast.info(i18n.language === 'ar' ? 'جاري إرسال الطلب...' : 'Sending request...', {
      autoClose: false,
      containerId: 'quote-toast',
    });
    try {
      // Get current time in a formatted string
      const now = new Date();
      const timeString = now.toLocaleString(i18n.language === 'ar' ? 'ar-SA' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

      // Prepare template parameters to match EmailJS template variables exactly
      const templateParams = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        location: data.location,
        howDidYouFind: data.howDidYouFind,
        requestType: data.requestType,
        requiredService: data.requiredService,
        comment: data.comment || t('quote.no_additional_notes'),
        date: timeString,
      };

      // Send email using EmailJS with detailed error handling
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Email sending timed out')), 5000)
      );
      const emailPromise = emailjs.send(
        'service_vh5fr15',
        'template_8akn5z5',
        templateParams,
        'yQ03ZUF1VMp4mz9rB'
      );
      const response = await Promise.race([emailPromise, timeoutPromise]);

      toast.dismiss();

      if (response.status === 200) {
        // Track form submission
        try {
          sendGTMEvent('lead_form_submission', {
            form_location: 'quote-page',
            lead_type: data.requestType,
            lead_service: data.requiredService,
            lead_source: data.howDidYouFind,
          });
        } catch (error) {
          // Silently handle tracking errors
        }

        toast.success(t('contact.toast.success'), {
          position: 'bottom-center',
          autoClose: 3000,
          containerId: 'quote-toast',
        });
        reset();
      } else {
        throw new Error('Email service returned non-200 status');
      }
    } catch (error) {
      toast.dismiss();
      console.error('Failed to submit form:', error);
      let errorMessage =
        error.message && error.message.includes('timed out')
          ? i18n.language === 'ar'
            ? 'انتهت مهلة إرسال الطلب!'
            : 'Request sending timed out!'
          : i18n.language === 'ar'
            ? 'حدث خطأ أثناء إرسال الطلب! 😞'
            : 'Error sending request! 😞';
      // More specific error messages
      if (error.text?.includes('service ID not found')) {
        errorMessage =
          i18n.language === 'ar'
            ? `خطأ في معرف الخدمة (${'service_vh5fr15'}). يرجى التحقق من الإعدادات في لوحة التحكم`
            : `Service ID (${'service_vh5fr15'}) not found. Please check dashboard settings`;
      } else if (error.text?.includes('template ID not found')) {
        errorMessage =
          i18n.language === 'ar'
            ? `خطأ في معرف القالب (${'template_8akn5z5'}). يرجى التحقق من الإعدادات في لوحة التحكم`
            : `Template ID (${'template_8akn5z5'}) not found. Please check dashboard settings`;
      } else if (error.text?.includes('Invalid public key')) {
        errorMessage =
          i18n.language === 'ar'
            ? 'مفتاح API غير صالح. يرجى التحقق من الإعدادات'
            : 'Invalid API key. Please check settings';
      }
      toast.error(errorMessage, {
        position: 'bottom-center',
        autoClose: 3000,
        containerId: 'quote-toast',
      });
    } finally {
      setIsSending(false);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10'
        noValidate
      >
        {/* Contact Info Section */}
        <div className='col-span-1 flex flex-col gap-4 bg-[#181818] p-6 rounded-2xl border border-[#222]'>
          <h2 className='text-lg font-bold text-[#ff3e33] mb-2'>
            {t('quote.contact_info') || 'معلومات التواصل'}
          </h2>
          {/* Name */}
          <div className='relative'>
            <Input
              type='text'
              placeholder={t('quote.name')}
              className={`w-full rounded-full bg-[#222] border-[#333] text-white px-10 py-3 placeholder:text-[#aaa] text-sm focus:border-[#ff3e33] focus:outline-none ${i18n.language === 'ar' ? 'text-right pr-10 pl-3' : 'text-left pl-10 pr-3'}`}
              dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
              {...register('name', { required: true })}
            />
            <User
              className={`absolute ${i18n.language === 'ar' ? 'left-3' : 'right-3'} top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5`}
            />
            {errors.name && (
              <p className='text-red-500 text-xs mt-1'>
                {i18n.language === 'ar' ? 'الاسم مطلوب' : 'Name is required'}
              </p>
            )}
          </div>
          {/* Email */}
          <div className='relative'>
            <Input
              type='email'
              placeholder={t('quote.email')}
              className={`w-full rounded-full bg-[#222] border-[#333] text-white px-10 py-3 placeholder:text-[#aaa] text-sm focus:border-[#ff3e33] focus:outline-none ${i18n.language === 'ar' ? 'text-right pr-10 pl-3' : 'text-left pl-10 pr-3'}`}
              dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
              {...register('email', {
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              })}
            />
            <Mail
              className={`absolute ${i18n.language === 'ar' ? 'left-3' : 'right-3'} top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5`}
            />
            {errors.email && (
              <p className='text-red-500 text-xs mt-1'>
                {i18n.language === 'ar' ? 'البريد الإلكتروني غير صالح' : 'Invalid email address'}
              </p>
            )}
          </div>
          {/* Phone */}
          <div className='relative'>
            <Input
              type='tel'
              placeholder={t('quote.phone')}
              className={`w-full rounded-full bg-[#222] border-[#333] text-white px-10 py-3 placeholder:text-[#aaa] text-sm focus:border-[#ff3e33] focus:outline-none ${i18n.language === 'ar' ? 'text-right pr-10 pl-3' : 'text-left pl-10 pr-3'}`}
              dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
              {...register('phone', { required: true })}
            />
            <Phone
              className={`absolute ${i18n.language === 'ar' ? 'left-3' : 'right-3'} top-1/2 transform -translate-y-1/2 text-[#777]`}
              size={20}
            />
            {errors.phone && (
              <p className='text-red-500 text-xs mt-1'>
                {i18n.language === 'ar' ? 'رقم الهاتف مطلوب' : 'Phone number is required'}
              </p>
            )}
          </div>
          {/* Location */}
          <div className='relative'>
            <Input
              type='text'
              placeholder={t('quote.location')}
              className={`w-full rounded-full bg-[#222] border-[#333] text-white px-10 py-3 placeholder:text-[#aaa] text-sm focus:border-[#ff3e33] focus:outline-none ${i18n.language === 'ar' ? 'text-right pr-10 pl-3' : 'text-left pl-10 pr-3'}`}
              dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
              {...register('location', { required: true })}
            />
            <MapPin
              className={`absolute ${i18n.language === 'ar' ? 'left-3' : 'right-3'} top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5`}
            />
            {errors.location && (
              <p className='text-red-500 text-xs mt-1'>
                {i18n.language === 'ar' ? 'الموقع مطلوب' : 'Location is required'}
              </p>
            )}
          </div>
        </div>

        {/* Request Details Section */}
        <div className='col-span-1 flex flex-col gap-4 bg-[#181818] p-6 rounded-2xl border border-[#222]'>
          <h2 className='text-lg font-bold text-[#ff3e33] mb-2'>
            {t('quote.request_details') || 'تفاصيل الطلب'}
          </h2>

          {/* How did you find us */}
          <div>
            <Select onValueChange={(value) => setValue('howDidYouFind', value)} defaultValue=''>
              <SelectTrigger
                className={`w-full rounded-full bg-[#222] border-[#333] text-white px-10 py-3 placeholder:text-[#aaa] text-sm focus:border-[#ff3e33] focus:outline-none ${i18n.language === 'ar' ? 'flex-row-reverse text-right' : ''}`}
              >
                <SelectValue placeholder={t('quote.how_did_you_find')} />
              </SelectTrigger>
              <SelectContent className='bg-[#222] border-[#333] text-white'>
                {HOW_DID_YOU_FIND_OPTIONS.map((option) => (
                  <SelectItem className='hover:bg-[#ff3e33]' key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.howDidYouFind && (
              <p className='text-red-500 text-xs mt-1'>
                {i18n.language === 'ar' ? 'كيف وجدتنا مطلوب' : 'How did you find us is required'}
              </p>
            )}
          </div>
          {/* Request Type */}
          <div>
            <Select onValueChange={(value) => setValue('requestType', value)} defaultValue=''>
              <SelectTrigger
                className={`w-full rounded-full bg-[#222] border-[#333] text-white px-10 py-3 placeholder:text-[#aaa] text-sm focus:border-[#ff3e33] focus:outline-none ${i18n.language === 'ar' ? 'flex-row-reverse text-right' : ''}`}
              >
                <SelectValue placeholder={t('quote.request_type')} />
              </SelectTrigger>
              <SelectContent className='bg-[#222] border-[#333] text-white'>
                {REQUEST_TYPES.map((type) => (
                  <SelectItem className='hover:bg-[#ff3e33]' key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.requestType && (
              <p className='text-red-500 text-xs mt-1'>
                {i18n.language === 'ar' ? 'نوع الطلب مطلوب' : 'Request type is required'}
              </p>
            )}
          </div>
          {/* Required Service */}
          <div>
            <Select onValueChange={(value) => setValue('requiredService', value)} defaultValue=''>
              <SelectTrigger
                className={`w-full rounded-full bg-[#222] border-[#333] text-white px-10 py-3 placeholder:text-[#aaa] text-sm focus:border-[#ff3e33] focus:outline-none ${i18n.language === 'ar' ? 'flex-row-reverse text-right' : ''}`}
              >
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
              <p className='text-red-500 text-xs mt-1'>
                {i18n.language === 'ar' ? 'الخدمة المطلوبة مطلوبة' : 'Required service is required'}
              </p>
            )}
          </div>
          {/* Comment */}
          <div className='relative'>
            <Textarea
              placeholder={t('quote.comment')}
              className={`w-full rounded-2xl bg-[#222] border-[#333] text-white px-4 py-3 placeholder:text-[#aaa] min-h-[120px] h-[120px] resize-none focus:border-[#ff3e33] focus:outline-none ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}
              dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
              {...register('comment')}
            />
            <MessageSquare
              className={`absolute top-3 ${i18n.language === 'ar' ? 'left-3' : 'right-3'} text-[#777]`}
              size={20}
            />
          </div>
        </div>
        {/* Submit Button */}
        <div
          className='col-span-1 md:col-span-2 flex flex-col items-center justify-center mt-5'
          style={{ position: 'relative' }}
        >
          {/* ToastContainer فوق الزرار */}
          <ToastContainer
            containerId='quote-toast'
            position='top-center'
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={i18n.language === 'ar'}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='colored'
            style={{
              position: 'absolute',
              top: '-60px', // فوق الزرار مباشرة
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 99999,
            }}
          />
          <Button
            type='submit'
            text={isSending ? t('quote.form.sending') : t('quote.form.submit')}
            disabled={formIsSubmitting || isSending}
            className='bg-[#ff3e33] text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg hover:bg-[#e63a2e] flex items-center justify-center gap-2'
          ></Button>
        </div>
        {/* Additional Notes Section */}
        {/* <div className='col-span-1 md:col-span-2 flex flex-col gap-4 bg-[#181818] p-6 rounded-2xl border border-[#222] '>
          <h2 className='text-lg font-bold text-[#ff3e33] mb-2'>
            {t('quote.additional_notes') || 'ملاحظات إضافية'}
          </h2>
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
        </div> */}
      </form>
    </>
  );
};

export default QuoteForm;

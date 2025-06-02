import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../../components/ui/Button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, User, Phone, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

emailjs.init('yQ03ZUF1VMp4mz9rB');

const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters')
    .regex(/^[a-zA-Z\u0600-\u06FF\s]+$/, 'Name must contain only letters and spaces'),
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must not exceed 15 digits')
    .regex(
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
      'Please enter a valid phone number'
    ),
  email: z.string().email('Please enter a valid email address').optional().or(z.literal('')),
  address: z
    .string()
    .min(5, 'Address must be at least 5 characters')
    .max(200, 'Address must not exceed 200 characters')
    .optional()
    .or(z.literal('')),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must not exceed 1000 characters')
    .optional()
    .or(z.literal('')),
});

const ContactForm = () => {
  const [isSending, setIsSending] = useState(false);
  const { t, i18n } = useTranslation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    console.log('Form submitted with data:', data);
    setIsSending(true);
    toast.info(t('contact.toast.sending'), { autoClose: false });

    try {
      const templateParams = {
        from_name: data.name,
        phone_number: data.phone,
        email: data.email || '',
        address: data.address || '',
        message: data.message || '',
        sent_at: new Date().toLocaleString(),
      };

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Email sending timed out')), 5000)
      );

      const emailPromise = emailjs.send('service_vh5fr15', 'template_cobcglh', templateParams);

      const response = await Promise.race([emailPromise, timeoutPromise]);

      toast.dismiss();

      if (response.status === 200) {
        toast.success(t('contact.toast.success'), {
          position: 'bottom-center',
          autoClose: 3000,
        });
        reset();
      } else {
        throw new Error('Email service returned non-200 status');
      }
    } catch (error) {
      toast.dismiss();

      console.error('Failed to submit form:', error);
      const errorMessage = error.message.includes('timed out')
        ? t('contact.toast.timeout_error')
        : t('contact.toast.general_error');

      toast.error(errorMessage, {
        position: 'bottom-center',
        autoClose: 3000,
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className='w-full bg-white rounded-3xl p-8 shadow-sm relative'>
      <ToastContainer
        position='bottom-center'
        autoClose={5000}
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
          bottom: '60px',
          left: i18n.language === 'ar' ? '50%' : 'auto',
          right: i18n.language === 'ar' ? 'auto' : '-30%',
          transform: i18n.language === 'ar' ? 'translateX(-50%)' : 'none',
          zIndex: 99999,
        }}
      />
      <div className='mb-4'>
        <span className='inline-block px-4 py-1 text-xs font-medium text-[#ff3e33] border border-gray-400 bg-white rounded-full'>
          {t('contact.feedback_form')}
        </span>
      </div>

      <h2 className='text-4xl font-bold mb-8 text-black'>{t('contact.questions')}</h2>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6' noValidate>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='relative'>
            <Input
              type='text'
              placeholder={t('contact.form.name')}
              className={`w-full px-12 py-4 rounded-full border ${errors.name ? 'border-red-500' : 'border-gray-200'} bg-white text-black focus:outline-none focus:border-gray-400 placeholder:text-[#aaa]`}
              {...register('name')}
              aria-invalid={errors.name ? 'true' : 'false'}
            />
            <User className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5' />
            {errors.name && <p className='text-red-500 text-xs mt-1'>{errors.name.message}</p>}
          </div>

          <div className='relative'>
            <Input
              type='tel'
              placeholder={t('contact.form.phone')}
              className={`w-full px-12 py-4 rounded-full border ${errors.phone ? 'border-red-500' : 'border-gray-200'} bg-white text-black focus:outline-none focus:border-gray-400 placeholder:text-[#aaa]`}
              {...register('phone')}
              aria-invalid={errors.phone ? 'true' : 'false'}
            />
            <Phone className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5' />
            {errors.phone && <p className='text-red-500 text-xs mt-1'>{errors.phone.message}</p>}
          </div>

          <div className='relative'>
            <Input
              type='email'
              placeholder={t('contact.form.email')}
              className={`w-full px-12 py-4 rounded-full border ${errors.email ? 'border-red-500' : 'border-gray-200'} bg-white text-black focus:outline-none focus:border-gray-400 placeholder:text-[#aaa]`}
              {...register('email')}
              aria-invalid={errors.email ? 'true' : 'false'}
            />
            <Mail className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5' />
            {errors.email && <p className='text-red-500 text-xs mt-1'>{errors.email.message}</p>}
          </div>

          <div className='relative'>
            <Input
              type='text'
              placeholder={t('contact.form.address')}
              className={`w-full px-12 py-4 rounded-full border ${errors.address ? 'border-red-500' : 'border-gray-200'} bg-white text-black focus:outline-none focus:border-gray-400 placeholder:text-[#aaa]`}
              {...register('address')}
              aria-invalid={errors.address ? 'true' : 'false'}
            />
            <MapPin className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5' />
            {errors.address && (
              <p className='text-red-500 text-xs mt-1'>{errors.address.message}</p>
            )}
          </div>
        </div>

        <div className='relative'>
          <Textarea
            placeholder={t('contact.form.message')}
            rows='5'
            className='w-full px-4 py-3 rounded-3xl border border-gray-200 bg-white text-black placeholder:text-gray-500 resize-none focus:outline-none focus:border-gray-400'
            {...register('message')}
            aria-invalid={errors.message ? 'true' : 'false'}
          />
          {errors.message && <p className='text-red-500 text-xs mt-1'>{errors.message.message}</p>}
        </div>

        <div className='flex justify-center'>
          <Button
            text={isSending ? t('contact.form.sending') : t('contact.form.submit')}
            variant='primary'
            size='medium'
            type='submit'
            className='mt-2'
            disabled={isSending}
            onClick={() => console.log('Button clicked')}
          />
        </div>
      </form>
    </div>
  );
};

export default ContactForm;

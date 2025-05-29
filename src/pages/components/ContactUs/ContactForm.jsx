import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '../../../components/ui/Button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, User, Phone, MapPin, MessageSquare, CheckCircle2, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useTranslation } from 'react-i18next';

// Zod schema for form validation
const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z.string().min(1, 'Phone Number is required'),
  email: z.string().optional(),
  address: z.string().optional(),
  message: z.string().optional(),
});

const BUDGETS = [
  { value: 'small', label: '$1,000 - $5,000' },
  { value: 'medium', label: '$5,000 - $10,000' },
  { value: 'large', label: '$10,000+' },
];

const ContactForm = () => {
  const [isSending, setIsSending] = useState(false);
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      budget: '',
    },
  });

  const onSubmit = async (data) => {
    setIsSending(true);
    try {
      // Add your form submission logic here
      console.log('Form submitted:', data);
      toast.success('Your message has been sent successfully! 🎉');
      reset();
    } catch (error) {
      console.error('Failed to submit form:', error);
      toast.error('An error occurred while sending your message! 😞');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className='w-full bg-white rounded-3xl p-8 shadow-sm'>
      <ToastContainer
        position='top-center'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />

      <div className='mb-4 l'>
        <span className='inline-block px-4 py-1 text-xs font-medium text-[#ff3e33] border border-gray-400 bg-white rounded-full'>
          {t('contact.feedback_form')}
        </span>
      </div>

      <h2 className='text-4xl font-bold mb-8 text-black'>{t('contact.questions')}</h2>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* Name */}
          <div className='relative'>
            <Input
              type='text'
              placeholder={t('contact.form.name')}
              className={`w-full px-12 py-4 rounded-full border ${errors.name ? 'border-red-500' : 'border-gray-200'} bg-white text-white focus:outline-none focus:border-gray-400 placeholder:text-[#aaa]`}
              {...register('name')}
            />
            <User className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5' />
            {errors.name && <p className='text-red-500 text-xs mt-1'>{errors.name.message}</p>}
          </div>
          {/* phone number */}
          <div className='relative'>
            <Input
              type='number'
              placeholder={t('contact.form.phone')}
              className={`w-full px-12 py-4 rounded-full border ${errors.name ? 'border-red-500' : 'border-gray-200'} bg-white text-white focus:outline-none focus:border-gray-400 placeholder:text-[#aaa]`}
              {...register('phone')}
            />
            <Phone className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5' />
            {errors.name && <p className='text-red-500 text-xs mt-1'>{errors.name.message}</p>}
          </div>
          {/* Email */}
          <div className='relative'>
            <Input
              type='email'
              placeholder={t('contact.form.email')}
              className={`w-full px-12 py-4 rounded-full border ${errors.email ? 'border-red-500' : 'border-gray-200'} bg-white text-white focus:outline-none focus:border-gray-400 placeholder:text-[#aaa]`}
              {...register('email')}
            />
            <Mail className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5' />
            {errors.email && <p className='text-red-500 text-xs mt-1'>{errors.email.message}</p>}
          </div>

          {/* Address */}
          <div className='relative'>
            <Input
              type='text'
              placeholder={t('contact.form.address')}
              className={`w-full px-12 py-4 rounded-full border ${errors.address ? 'border-red-500' : ' border-gray-200'} bg-white text-white focus:outline-none focus:border-gray-400 placeholder:text-[#aaa]`}
              {...register('address')}
            />
            <MapPin className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5' />
            {errors.address && (
              <p className='text-red-500 text-xs mt-1'>{errors.address.message}</p>
            )}
          </div>
        </div>

        {/* Message */}
        <div className='relative'>
          <Textarea
            placeholder={t('contact.form.message')}
            rows='5'
            className='w-full px-4 py-3 rounded-3xl border border-gray-200 bg-white text-black placeholder:text-gray-500 resize-none focus:outline-none focus:border-gray-400'
            {...register('message')}
          />
        </div>

        {/* Submit Button */}
        <div>
          <Button
            text={isSending ? t('contact.form.sending') : t('contact.form.submit')}
            variant='primary'
            size='medium'
            type='submit'
            className='mt-2'
            disabled={isSending}
          />
        </div>
      </form>
    </div>
  );
};

export default ContactForm;

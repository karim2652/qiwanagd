import { z } from 'zod';

export const createContactSchema = (i18n, t) => {
  return z.object({
    name: z
      .string()
      .min(2, {
        message:
          i18n.language === 'ar'
            ? 'الاسم يجب أن يكون على الأقل حرفين'
            : 'Name must be at least 2 characters',
      })
      .max(50, {
        message:
          i18n.language === 'ar'
            ? 'الاسم يجب أن لا يتجاوز 50 حرف'
            : 'Name must not exceed 50 characters',
      })
      .regex(/^[A-Za-z\u0600-\u06FF\s]+$/, {
        message:
          i18n.language === 'ar'
            ? 'الاسم يجب أن يحتوي على أحرف عربية أو إنجليزية فقط'
            : 'Name must contain only Arabic or English letters',
      }),

    phone: z
      .string()
      .min(7, {
        message:
          i18n.language === 'ar'
            ? 'رقم الهاتف يجب أن يكون 7 أرقام على الأقل'
            : 'Phone number must be at least 7 digits',
      })
      .max(15, {
        message:
          i18n.language === 'ar'
            ? 'رقم الهاتف يجب ألا يتجاوز 15 رقم'
            : 'Phone number must not exceed 15 digits',
      })
      .regex(/^\d+$/, {
        message:
          i18n.language === 'ar'
            ? 'يرجى إدخال رقم هاتف صحيح (أرقام فقط)'
            : 'Please enter a valid phone number (digits only)',
      }),

    email: z
      .string()
      .email({
        message:
          i18n.language === 'ar'
            ? 'يرجى إدخال بريد إلكتروني صحيح'
            : 'Please enter a valid email address',
      })
      .optional()
      .or(z.literal('')),

    address: z
      .string()
      .max(200, {
        message:
          i18n.language === 'ar'
            ? 'العنوان يجب ألا يتجاوز 200 حرف'
            : 'Address must not exceed 200 characters',
      })
      .optional()
      .or(z.literal('')),

    message: z
      .string()
      .max(1000, {
        message:
          i18n.language === 'ar'
            ? 'الرسالة يجب ألا تتجاوز 1000 حرف'
            : 'Message must not exceed 1000 characters',
      })
      .optional()
      .or(z.literal('')),
  });
};

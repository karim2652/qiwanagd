import { z } from 'zod';

export const createQuoteSchema = (i18n) => {
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
      .regex(/^[\p{L}\s]+$/u, {
        message:
          i18n.language === 'ar'
            ? 'الاسم يجب أن يحتوي على أحرف فقط'
            : 'Name must contain only letters',
      }),

    email: z
      .string()
      .optional()
      .refine(
        (val) => {
          if (!val) return true; // Allow empty value
          return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(val);
        },
        {
          message: i18n.language === 'ar' ? 'البريد الإلكتروني غير صالح' : 'Invalid email address',
        }
      )
      .refine(
        (val) => {
          if (!val) return true; // Allow empty value
          return val.length <= 100;
        },
        {
          message:
            i18n.language === 'ar'
              ? 'البريد الإلكتروني يجب أن لا يتجاوز 100 حرف'
              : 'Email must not exceed 100 characters',
        }
      ),

    phone: z
      .string()
      .min(1, { message: i18n.language === 'ar' ? 'رقم الهاتف مطلوب' : 'Phone number is required' })
      .regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, {
        message: i18n.language === 'ar' ? 'رقم الهاتف غير صالح' : 'Invalid phone number format',
      }),

    location: z
      .string()
      .optional()
      .refine(
        (val) => {
          if (!val) return true; // Allow empty value
          return val.length >= 3;
        },
        {
          message:
            i18n.language === 'ar'
              ? 'الموقع يجب أن يكون على الأقل 3 أحرف'
              : 'Location must be at least 3 characters',
        }
      )
      .refine(
        (val) => {
          if (!val) return true; // Allow empty value
          return val.length <= 100;
        },
        {
          message:
            i18n.language === 'ar'
              ? 'الموقع يجب أن لا يتجاوز 100 حرف'
              : 'Location must not exceed 100 characters',
        }
      ),

    howDidYouFind: z
      .string()
      .min(1, {
        message: i18n.language === 'ar' ? 'كيف وجدتنا مطلوب' : 'How did you find us is required',
      })
      .optional(),

    requestType: z
      .string()
      .min(1, { message: i18n.language === 'ar' ? 'نوع الطلب مطلوب' : 'Request type is required' })
      .optional(),

    requiredService: z
      .string()
      .min(1, {
        message: i18n.language === 'ar' ? 'الخدمة المطلوبة مطلوبة' : 'Required service is required',
      })
      .optional(),

    comment: z
      .string()
      .max(500, {
        message:
          i18n.language === 'ar'
            ? 'الملاحظات يجب أن لا تتجاوز 500 حرف'
            : 'Comment must not exceed 500 characters',
      })
      .optional(),
  });
};

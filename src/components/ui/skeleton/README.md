# Skeleton Loading Components

مجموعة شاملة من مكونات skeleton loading لتحسين تجربة المستخدم أثناء تحميل المحتوى.

## الميزات الرئيسية

- 🚀 **أداء عالي**: محسنة للسرعة والأداء
- 🎨 **قابلة للتخصيص**: يمكن تخصيص الأبعاد والألوان والأشكال
- 📱 **متجاوبة**: تعمل بشكل مثالي على جميع الأجهزة
- 🌐 **دعم RTL/LTR**: تدعم الاتجاهين العربي والإنجليزي
- ♿ **إمكانية الوصول**: متوافقة مع معايير الوصول

## المكونات المتاحة

### 1. SkeletonBase

المكون الأساسي لإنشاء skeleton مخصص.

```jsx
import { SkeletonBase } from './components/ui/skeleton';

<SkeletonBase width='w-full' height='h-4' rounded='rounded-md' animate={true} className='mb-4' />;
```

**Props:**

- `width`: عرض العنصر (Tailwind classes)
- `height`: ارتفاع العنصر (Tailwind classes)
- `rounded`: شكل الحواف (Tailwind classes)
- `animate`: تفعيل/إلغاء الحركة (boolean)
- `className`: classes إضافية

### 2. SkeletonCard

مكون skeleton للكروت والبطاقات.

```jsx
import { SkeletonCard } from './components/ui/skeleton';

<SkeletonCard showImage={true} showButton={true} className='hover:shadow-lg' />;
```

**Props:**

- `showImage`: إظهار skeleton الصورة
- `showButton`: إظهار skeleton الزر
- `className`: classes إضافية

### 3. SkeletonRouter

مكون ذكي يختار نوع skeleton المناسب حسب المسار.

```jsx
import { SkeletonRouter } from './components/ui/skeleton';

// يستخدم مع React Router للتحميل التلقائي
<Suspense fallback={<SkeletonRouter />}>
  <Component />
</Suspense>;
```

### 4. SkeletonHome / SkeletonBlog / SkeletonServices / SkeletonProjects

مكونات skeleton مخصصة لكل صفحة.

```jsx
import { SkeletonHome, SkeletonBlog } from './components/ui/skeleton';

// للصفحة الرئيسية
<SkeletonHome />

// لصفحة المدونة
<SkeletonBlog />
```

### 5. SkeletonNavbar

skeleton مخصص لشريط التنقل.

```jsx
import { SkeletonNavbar } from './components/ui/skeleton';

<SkeletonNavbar />;
```

## الاستخدام مع React Router

```jsx
import { Suspense } from 'react';
import { SkeletonRouter } from './components/ui/skeleton';

const LazyRoute = ({ component: Component }) => (
  <Suspense fallback={<SkeletonRouter />}>
    <Component />
  </Suspense>
);
```

## تخصيص الألوان والأنماط

يمكنك تخصيص الألوان من خلال ملف CSS:

```css
/* في ملف skeleton.css */
.skeleton-shimmer {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
}

/* للوضع المظلم */
@media (prefers-color-scheme: dark) {
  .skeleton-shimmer {
    background: linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%);
  }
}
```

## أمثلة للاستخدام

### مثال بسيط

```jsx
<div className='space-y-4'>
  <SkeletonBase width='w-64' height='h-6' />
  <SkeletonBase width='w-48' height='h-4' />
  <SkeletonBase width='w-32' height='h-4' />
</div>
```

### مثال متقدم - قائمة منتجات

```jsx
<div className='grid md:grid-cols-3 gap-6'>
  {[...Array(6)].map((_, index) => (
    <SkeletonCard
      key={index}
      showImage={true}
      showButton={true}
      className='hover:shadow-lg transition-shadow'
    />
  ))}
</div>
```

### مثال للنماذج

```jsx
<div className='space-y-4'>
  <SkeletonBase width='w-full' height='h-12' />
  <SkeletonBase width='w-full' height='h-12' />
  <SkeletonBase width='w-full' height='h-32' />
  <SkeletonBase width='w-32' height='h-12' rounded='rounded-full' />
</div>
```

## نصائح للاستخدام الأمثل

1. **استخدم skeleton يطابق المحتوى الفعلي**: اجعل شكل skeleton قريب من شكل المحتوى النهائي
2. **لا تفرط في الاستخدام**: استخدم skeleton فقط للمحتوى الذي يستغرق وقت للتحميل
3. **اختبر على أجهزة مختلفة**: تأكد من أن skeleton يبدو جيد على جميع الأحجام
4. **استخدم حركات مناسبة**: لا تجعل الحركة سريعة جداً أو بطيئة جداً

## اختبار المكونات

يمكنك استخدام `SkeletonDemo` لاختبار جميع المكونات:

```jsx
import { SkeletonDemo } from './components/ui/skeleton';

<SkeletonDemo />;
```

## التوافق

- ✅ React 16.8+
- ✅ Tailwind CSS 3.0+
- ✅ TypeScript (قريباً)
- ✅ جميع المتصفحات الحديثة

## المساهمة

لإضافة مكون skeleton جديد:

1. أنشئ ملف جديد في مجلد `skeleton`
2. اتبع نفس نمط المكونات الموجودة
3. أضف export في ملف `index.js`
4. أضف مثال في `SkeletonDemo`
5. حدث هذا الملف

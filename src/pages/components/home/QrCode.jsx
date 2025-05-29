import React from 'react';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import QrImg from '../../../assets/images/Qr/QrCode.webp';

const QrCode = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <div className='w-full flex justify-center py-16'>
      <div className='max-w-7xl flex flex-col items-center w-full px-4'>
        <div className='text-center mb-8'>
          <h3 className='text-3xl md:text-4xl font-bold text-gray-800 mb-3'>
            {isRTL ? (
              <>
                رمزك التجاري <span className='text-[#4a6cf7]'>QR Code</span>
              </>
            ) : (
              <>
                Your Business <span className='text-[#4a6cf7]'>QR Code</span>
              </>
            )}
          </h3>
          <span className='text-lg md:text-xl text-gray-600 font-medium block'>
            {isRTL
              ? 'من خلاله يمكنك التحقق المباشر من المعلومات:'
              : 'Verify your information instantly through it:'}
          </span>
        </div>

        <div className='bg-white rounded-3xl p-8 shadow-xl border border-gray-100 transform hover:scale-105 transition-all duration-300'>
          <div className='w-full h-full max-w-[800px] max-h-[400px]'>
            <LazyLoadImage
              src={QrImg}
              alt={isRTL ? 'رمز QR الخاص بك' : 'Your QR Code'}
              effect='blur'
              className='w-full h-full object-cover rounded-xl drop-shadow-lg'
              wrapperClassName='w-full h-full'
            />
          </div>
        </div>

        <div className='mt-8 text-center'>
          <p className='text-gray-600 text-lg md:text-xl font-medium bg-gray-50 px-6 py-3 rounded-full inline-block'>
            {isRTL ? 'قم بمسح رمز QR للبدء' : 'Scan the QR code to get started'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default QrCode;

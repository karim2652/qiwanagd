import React from 'react';
import { useParams } from 'react-router-dom';

const ServiceDetails = () => {
  const { title } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      <div className="prose max-w-none">
        {/* Add your service details content here */}
        <p>تفاصيل الخدمة قيد التطوير...</p>
      </div>
    </div>
  );
};

export default ServiceDetails; 
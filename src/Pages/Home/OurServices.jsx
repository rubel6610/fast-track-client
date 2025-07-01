import React from 'react';
import { FaBoxOpen, FaGlobe, FaShieldAlt, FaRecycle, FaHandHoldingHeart, FaMapMarkedAlt } from 'react-icons/fa';

const services = [
  {
    title: 'Parcel Packaging',
    description: 'Safe and secure packaging for your valuable items.',
    icon: <FaBoxOpen className="text-4xl text-teal-600" />
  },
  {
    title: 'Global Delivery',
    description: 'We ship your parcels worldwide with care.',
    icon: <FaGlobe className="text-4xl text-teal-600" />
  },
  {
    title: 'Secure Handling',
    description: 'Your parcels are handled with maximum security.',
    icon: <FaShieldAlt className="text-4xl text-teal-600" />
  },
  {
    title: 'Eco-Friendly Shipping',
    description: 'We use sustainable packaging and delivery options.',
    icon: <FaRecycle className="text-4xl text-teal-600" />
  },
  {
    title: 'Special Care Service',
    description: 'Extra protection for fragile and sensitive parcels.',
    icon: <FaHandHoldingHeart className="text-4xl text-teal-600" />
  },
  {
    title: 'Real-Time Tracking',
    description: 'Track your parcels anytime, anywhere.',
    icon: <FaMapMarkedAlt className="text-4xl text-teal-600" />
  }
];

const OurServices = () => {
  return (
    <section className="py-12 my-10 px-4 rounded-3xl bg-[#03373D]" >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-white">Our Services</h2>
        <p className="text-gray-300 mb-10 max-w-3xl mx-auto">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition cursor-pointer">
              <div className="flex justify-center mb-4">
                {service.icon}
              </div>
              <h3 className="text-lg font-semibold text-teal-600 text-center mb-2">{service.title}</h3>
              <p className="text-black text-center">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;

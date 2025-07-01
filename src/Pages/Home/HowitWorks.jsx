import React from 'react';
import { FaTruckPickup, FaMoneyBillWave, FaWarehouse, FaBuilding } from 'react-icons/fa';

const steps = [
  {
    title: 'Booking Pick & Drop',
    description: 'From personal packages to business shipments — we deliver on time, every time.',
    icon: <FaTruckPickup className="text-5xl text-teal-600" />
  },
  {
    title: 'Cash On Delivery',
    description: 'From personal packages to business shipments — we deliver on time, every time.',
    icon: <FaMoneyBillWave className="text-5xl text-teal-600" />
  },
  {
    title: 'Delivery Hub',
    description: 'From personal packages to business shipments — we deliver on time, every time.',
    icon: <FaWarehouse className="text-5xl text-teal-600" />
  },
  {
    title: 'Booking SME & Corporate',
    description: 'From personal packages to business shipments — we deliver on time, every time.',
    icon: <FaBuilding className="text-5xl text-teal-600" />
  }
];

const HowItWorks = () => {
  return (
    <section className="bg-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">How it Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
              <div className="flex justify-center mb-4">
                {step.icon}
              </div>
              <h3 className="text-lg text-teal-600 font-semibold mb-2 text-center">{step.title}</h3>
              <p className="text-gray-600 text-center">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

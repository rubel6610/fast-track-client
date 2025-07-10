import React, { useState } from "react";
import reviewlogo from "../../assets/homepageimage/customer-top.png"
import { FaQuoteLeft } from "react-icons/fa";

const reviews = [
  { id: 1, reviewer: "John Doe", review: "Amazing service! Fast delivery and very reliable. Highly recommended." },
  { id: 2, reviewer: "Jane Smith", review: "Customer support was fantastic and the delivery was on time." },
  { id: 3, reviewer: "Michael Johnson", review: "Impressive tracking system and hassle-free experience!" },
  { id: 4, reviewer: "Emily Brown", review: "Very smooth process, will definitely use again." },
  { id: 5, reviewer: "David Wilson", review: "The best courier service I've ever used." }
];

const Reviews = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = reviews.length;

  const previousReview = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  return (
    <section className="bg-gray-100 py-12 px-4 text-center">
      {/* Header Image */}
      <img
        src={reviewlogo}
        alt="Reviews"
        className="mx-auto mb-4"
      />

      {/* Title & Description */}
      <h2 className="text-3xl font-bold mb-2 text-gray-800">What our customers are sayings</h2>
      <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
       Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!
      </p>

      {/* Review Cards */}
      <div className="flex items-center justify-center space-x-4 mb-6">
        {/* Left Side Card */}
        <div className="w-1/4 p-4 bg-white rounded-xl shadow opacity-40 hidden md:block">
          <div className="flex justify-center mb-4 text-teal-600">
            <FaQuoteLeft className="text-2xl" />
          </div>
          <p className="text-gray-600">{reviews[(currentPage - 1 + totalPages) % totalPages].review}</p>
          <h4 className="mt-4 font-semibold text-gray-700">
            {reviews[(currentPage - 1 + totalPages) % totalPages].reviewer}
          </h4>
        </div>

        {/* Center Card */}
        <div className="w-full md:w-1/3 p-6 bg-white rounded-2xl shadow-lg">
          <div className="flex justify-center mb-4 text-teal-600">
            <FaQuoteLeft className="text-4xl" />
          </div>
          <p className="text-gray-800 text-lg">{reviews[currentPage].review}</p>
          <h4 className="mt-6 font-semibold text-gray-800">{reviews[currentPage].reviewer}</h4>
        </div>

        {/* Right Side Card */}
        <div className="w-1/4 p-4 bg-white rounded-xl shadow opacity-40 hidden md:block">
          <div className="flex justify-center mb-4 text-teal-600">
            <FaQuoteLeft className="text-2xl" />
          </div>
          <p className="text-gray-600">{reviews[(currentPage + 1) % totalPages].review}</p>
          <h4 className="mt-4 font-semibold text-gray-700">
            {reviews[(currentPage + 1) % totalPages].reviewer}
          </h4>
        </div>
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-center items-center space-x-2 mt-6">
        <button onClick={previousReview} className="btn btn-outline btn-sm rounded-full">
          Previous
        </button>

        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index)}
            className={`btn btn-sm rounded-full ${currentPage === index ? 'bg-teal-600 text-white' : 'btn-outline'}`}
          >
            {index + 1}
          </button>
        ))}

        <button onClick={nextReview} className="btn btn-outline btn-sm rounded-full">
          Next
        </button>
      </div>
    </section>
  );
};

export default Reviews;

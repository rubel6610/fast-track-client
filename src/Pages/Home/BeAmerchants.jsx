import React, { useEffect } from "react";

import Aos from "aos";
import "aos/dist/aos.css";
import locationmerchant from "../../assets/homepageimage/location-merchant.png";
const BeAmerchants = () => {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: false,
    });
  },[]);
  return (
    <div
      data-aos="zoom-in-up"
      className="bg-[#03373D] bg-[url('assets/be-a-merchant-bg.png')] bg-no-repeat grid grid-cols-2 max-w-6xl mx-auto rounded-3xl p-6 my-10"
    >
      <div className="flex flex-col justify-center text-white">
        <h1 className="text-2xl font-bold ">
          Merchant and Customer Satisfaction is Our First Priority
        </h1>
        <p>
          We offer the lowest delivery charge with the highest value along with
          100% safety of your product. Pathao courier delivers your parcels in
          every corner of Bangladesh right on time.
        </p>
        <div className="flex gap-5 mt-5">
          <button className="btn rounded-xl bg-[#CAEB66] ">
            Be a Merchant
          </button>
          <button className="btn btn-outline text-[#CAEB66] hover:bg-[#CAEB66] hover:text-base-content rounded-xl">
            Earn with fast Track Courier
          </button>
        </div>
      </div>
      <div>
        <img src={locationmerchant} alt="" />
      </div>
    </div>
  );
};

export default BeAmerchants;

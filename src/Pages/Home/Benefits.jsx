import React from 'react';
import liveTracking from "../../assets/homepageimage/live-tracking.png"
import safedelivery from "../../assets/homepageimage/safe-delivery.png"

const Benefits = () => {
    return (
        <div className=' my-10  space-y-4 max-w-6xl mx-auto text-black'>
            <div className='flex gap-3 rounded-3xl bg-gray-100 p-5'>
                <img src={liveTracking} alt="" className='border-r max-w-53 border-dotted pr-4'/>
               
                <div className='flex flex-col justify-center'>
                    <h1 className='font-bold text-xl '>Live Parcel Tracking</h1>
                    <p>Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.</p>
                </div>
            </div>
            <div className='flex gap-3 rounded-3xl bg-gray-100 p-5'>
                <img src={safedelivery} alt="" className='border-r border-dotted max-w-53 pr-4'/>
                <div className='flex flex-col justify-center'>
                    <h1 className='font-bold text-xl '>100% Safe Delivery</h1>
                    <p>We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.</p>
                </div>
            </div>
            <div className='flex gap-3 rounded-3xl bg-gray-100 p-5'>
                <img src={safedelivery} alt="" className='border-r border-dotted max-w-53 pr-4'/>
                <div className='flex flex-col justify-center'>
                    <h1 className='font-bold text-xl '>24/7 Call Center Support</h1>
                    <p>Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.</p>
                </div>
            </div>
        </div>
    );
};

export default Benefits;

import React, { useState } from "react";

const FAQ = () => {
    const [activeIndex,setActiveIndex]=useState(0);
    const handleToggle = (index)=>{
        if(activeIndex === index){
            setActiveIndex(null)
        }else{
            setActiveIndex(index)
        }
    }
  return (
    <div className="max-w-6xl mx-auto my-10">
      <h1 className="font-bold text-3xl text-center">Frequently Asked Question (FAQ)</h1>
      <p className="text-base-content text-center max-w-4xl mx-auto">
        Enhance posture, mobility, and well-being effortlessly with Posture Pro.
        Achieve proper alignment, reduce pain, and strengthen your body with
        ease!
      </p>
     {/* accordion */}
      <div className={`collapse collapse-arrow ${activeIndex === 0 ? "bg-gray-300" :"bg-base-100" }  border border-base-300 p-4`}>
        <input type="radio" name="my-accordion-2" checked={activeIndex===0} onChange={()=>handleToggle(0)}/>
        <div className="collapse-title font-semibold">
         How does this posture corrector work?
        </div>
        <div className="collapse-content text-sm">
         A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.
        </div>
      </div>
      <div className={`collapse collapse-arrow ${activeIndex === 1 ? "bg-gray-300" :"bg-base-100" }  border border-base-300 p-4`}>
        <input type="radio" name="my-accordion-2" checked={activeIndex===1} onChange={()=>handleToggle(1)}/>
        <div className="collapse-title font-semibold">
          I forgot my password. What should I do?
        </div>
        <div className="collapse-content text-sm">
          Click on "Forgot Password" on the login page and follow the
          instructions sent to your email.
        </div>
      </div>
      <div className={`collapse collapse-arrow ${activeIndex === 2 ? "bg-gray-300" :"bg-base-100" }  border border-base-300 p-4`}>
        <input type="radio" name="my-accordion-2" checked={activeIndex===2} onChange={()=>handleToggle(2)}/>
        <div className="collapse-title font-semibold">
          How do I update my profile information?
        </div>
        <div className="collapse-content text-sm">
          Go to "My Account" settings and select "Edit Profile" to make changes.
        </div>
      </div>
    </div>
  );
};

export default FAQ;

import React from "react";
import { BsFacebook, BsLinkedin, BsX, BsYoutube } from "react-icons/bs";
import ProfastLogo from "../../Components/ProfastLogo";

const Footer = () => {
  return (
    <footer className="footer footer-horizontal footer-center bg-base-200 text-base-content rounded p-10">
      <div className="max-w-3xl">
        <ProfastLogo />
        <p>
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>

      <nav>
        <div className="grid grid-flow-col gap-4">
          <a>
            <BsLinkedin size={20} />
          </a>
          <a>
            <BsFacebook size={20} />
          </a>
          <a>
            <BsX size={20} />
          </a>
          <a>
            <BsYoutube size={20} />
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;

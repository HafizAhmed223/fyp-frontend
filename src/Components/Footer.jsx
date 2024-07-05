import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import img from "../Assets/logo2.png";

const FooterLink = ({ to, children }) => (
  <Link to={to}>
    <p className="font-rubik font-normal text-base text-white cursor-pointer hover:text-gray-600 hover:font-semibold hover:transform hover:scale-105 transition duration-300 ease-in-out">
      {children}
    </p>
  </Link>
);

const Footer = () => {
  const navigate = useNavigate();
  const sendEmail = () => {
    window.location.href = "mailto:hi.auto.magic@gmail.com";
  };

  return (
    <div className="w-full flex justify-center items-center bg-slate-900 py-8 h-full">
      <div className="w-[98%] h-[90%] flex flex-col">
        <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-8 w-full md:px-0 px-3">
          <div className="flex flex-col items-center gap-2 shadow-md">
            <div
              className="flex justify-center items-center cursor-pointer "
              onClick={() => navigate("/")}
            >
              <img
                className="w-12 h-10 xl:w-12 xl:h-12 md:w-12 md:h-14 sm:w-10 sm:h-10  cursor-pointer rounded-md"
                src={img}
                alt="automagic_logo"
              />
              <p className="font-rubik font-bold text-[20px] text-white text-center ml-2">
                AUTO MAGIC
              </p>
            </div>

            <p className="font-rubik font-normal text-base text-white text-center cursor-pointer hover:text-gray-600 hover:font-semibold hover:transform hover:scale-105 transition duration-300 ease-in-out">
              Experience the Future of Customer Feedback
            </p>
            <p className="font-rubik font-normal text-base text-white text-center cursor-pointer hover:text-gray-600 hover:font-semibold hover:transform hover:scale-105 transition duration-300 ease-in-out">
              With Our AI-Powered Platform AUTO MAGIC
            </p>
            <p className="font-rubik font-normal text-base text-white text-center cursor-pointer hover:text-gray-600 hover:font-semibold hover:transform hover:scale-105 transition duration-300 ease-in-out">
              For Automagic Analysis and Insights
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-rubik font-semibold text-[18px] text-white">
              Features
            </p>
            <FooterLink to="/reviews">Reviews</FooterLink>
            <FooterLink to="/insights">Insights</FooterLink>
            <FooterLink to="/competitor-analysis">
              Competitor Analysis
            </FooterLink>
          </div>
          <div className="flex flex-col gap-2 lg:mt-3">
            {/* <p className="font-rubik font-semibold text-[18px] text-white">
              AUTO MAGIC
            </p> */}
            <FooterLink to="/">HOME</FooterLink>
            <FooterLink to="/competitor-analysis">COMPETITORS</FooterLink>
            <FooterLink to="/about-us">ABOUT US</FooterLink>
          </div>
          <div className="flex flex-col">
            <p className="font-rubik font-semibold text-[18px] text-white">
              Address
            </p>
            <p className="font-rubik font-normal text-base text-white cursor-pointer hover:text-gray-600 hover:font-semibold hover:transform hover:scale-105 transition duration-300 ease-in-out">
              www.automagic.com
            </p>
            <div className="mt-2">
              <p className="font-rubik font-semibold text-[18px] text-white">
                Support Email
              </p>
              <p
                className="font-rubik font-normal text-base text-white cursor-pointer hover:text-gray-600 hover:font-semibold hover:transform hover:scale-105 transition duration-300 ease-in-out"
                onClick={sendEmail}
              >
                hi.auto.magic@gmail.com
              </p>
            </div>
          </div>
        </div>
        <hr className="mt-6 border-gray-700" />
        <div className="w-full flex flex-col md:flex-row justify-center gap-5 items-center py-4">
          <p className="font-rubik font-normal text-base text-white">
            &copy; <span className="text-[18px]">2024</span> AUTO MAGIC
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="text-white">|</span>
            <FooterLink to="/privacy-policy">Privacy Policy</FooterLink>
            <FooterLink to="/terms-of-service">Terms Of Service</FooterLink>
            <span className="text-white">|</span>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="text-white hover:text-gray-600 transition duration-300 ease-in-out" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="text-white hover:text-gray-600 transition duration-300 ease-in-out" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-white hover:text-gray-600 transition duration-300 ease-in-out" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="text-white hover:text-gray-600 transition duration-300 ease-in-out" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

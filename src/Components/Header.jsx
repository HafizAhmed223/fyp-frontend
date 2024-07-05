import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import img from "../Assets/logo2.png";
import "../../src/index.css";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    // <div
    //   className={`${
    //     location.pathname === "/" ? "bg-[#062846]" : "bg-gray-100"
    //   } flex justify-center items-center w-full`}
    // >
    <div
      className={`${
        location.pathname === "/" ? "bg-slate-950" : "bg-slate-950"
      } flex justify-center items-center w-full`}
    >
      <div className="bg-slate-900/50 font-rubik flex justify-between items-center w-[95%] md:w-[85%] h-[60px] xl:rounded-[50px] md:rounded-[40px] sm:rounded-[30px] rounded-[30px] mt-4">
        <img
          className="w-12 h-10 xl:w-14 xl:h-14 md:w-14 md:h-14 sm:w-12 sm:h-12 ml-2 cursor-pointer rounded-md"
          src={img}
          alt="automagic_logo"
          onClick={() => navigate("/")}
        />
        <div className="flex justify-around items-center flex-grow">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `lg:text-[23px] md:text-[25px] sm:text-[18px] text-[15px] mx-2 cursor-pointer transition duration-300 ease-in-out ${
                isActive
                  ? "text-gray-500 font-semibold border-b-[3px] border-gray-100"
                  : "text-white"
              }`
            }
            end
          >
            HOME
          </NavLink>
          <NavLink
            to="/competitor-analysis"
            className={({ isActive }) =>
              `lg:text-[23px] md:text-[25px] sm:text-[18px] text-[15px] mx-2 cursor-pointer transition duration-300 ease-in-out ${
                isActive
                  ? "text-gray-500 font-semibold border-b-[3px] border-gray-300 "
                  : "text-white"
              }`
            }
          >
            COMPETITORS
          </NavLink>
          <NavLink
            to="/about-us"
            className={({ isActive }) =>
              `lg:text-[23px] md:text-[25px] sm:text-[18px] text-[15px] mx-2 cursor-pointer transition duration-300 ease-in-out ${
                isActive
                  ? "text-gray-500 font-semibold border-b-[3px] border-gray-100"
                  : "text-white"
              }`
            }
          >
            ABOUT US
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;

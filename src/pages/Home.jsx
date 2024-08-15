import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomToast from "../Shared/alertModal";
import ButtonLoader from "../Shared/ButtonLoader";
import { useAuth0 } from "@auth0/auth0-react";
import "../../src/index.css";
import VideoModal from "../Shared/VideoModal";
import { FaUserTie } from "react-icons/fa";
import AuthContext from "../context/AuthContext";

const Home = () => {
  const [asin, setAsin] = useState("");
  const { auth, setAuth } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  let inputRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOnChange = (e) => {
    setAsin(e.target.value);
  };

  const { loginWithRedirect, logout, isLoading, isAuthenticated, user } =
    useAuth0();

  const handleLogin = async () => {
    try {
      await loginWithRedirect();
      // You can remove the console.log or handle it after the login
    } catch (error) {
      CustomToast({ type: "error", message: "Please try again Logging In!" });
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      setAuth(true);
      // CustomToast({ type: "success", message: "User Logged In Successfully" });
    } else {
      setAuth(false);
    }
  }, [isAuthenticated, setAuth]);
  const handleLogout = async () => {
    try {
      localStorage.clear();
      setAuth(false);
      await logout({ returnTo: window.location.origin });
    } catch (error) {
      CustomToast({ type: "error", message: "Please try again logging out!" });
    } finally {
      CustomToast({ type: "success", message: "User Logged Out" });
    }
  };

  const handleSearch = async () => {
    const keysToRemove = [
      "reviewData",
      "insightsData",
      "prompt",
      "productReview",
      "productSentiments",
    ];

    if (auth) {
      const asinRegex = /^[A-Z0-9]{10}$/;
      if (asin !== "") {
        if (asinRegex.test(asin)) {
          try {
            setLoading(true);
            const response = await axios.post(
              "https://breakable-jacquelin-auto-magic-04c769ea.koyeb.app/api/search/product/reviews",
              { asin: asin },
              { headers: { "Content-Type": "application/json" } } // Set the content type here
            );
            keysToRemove.forEach((key) => {
              localStorage.removeItem(key);
              console.log(`${key} has been removed from localStorage`);
            });
            if (response.data.scrapedData.length === 0) {
              CustomToast({ type: "error", message: "No Reviews Available" });
            } else {
              CustomToast({ type: "success", message: response.data.message });
              console.log(response.data);
              navigate("/reviews", {
                state: {
                  reviews: response.data.scrapedData,
                },
              });
            }
          } catch (error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.error("Error response data:", error.response.data);
              console.error("Error response status:", error.response.status);
              console.error("Error response headers:", error.response.headers);
              CustomToast({
                type: "error",
                message: `Error: ${error.response.statusText}`,
              });
            }
          }
        } else {
          CustomToast({ type: "error", message: "Please enter a valid ASIN." });
        }
      } else {
        CustomToast({
          type: "error",
          message: "Please Enter the Product ASIN",
        });
        inputRef.current.focus();
      }
    } else {
      CustomToast({ type: "error", message: "Please Login First!" });
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <div className="flex flex-col items-center justify-center py-6">
      <div className="font-rubik font-bold text-blue-500 text-center text-5xl md:text-6xl lg:text-8xl xl:text-8xl py-12">
        <span className="text-gray-600">A</span>
        <span className="text-gray-500">U</span>
        <span className="text-gray-400">T</span>
        <span className="text-gray-300">O</span>
        <span className="text-gray-800"> </span>
        <span className="text-gray-300">M</span>
        <span className="text-gray-400">A</span>
        <span className="text-gray-500">G</span>
        <span className="text-gray-600">I</span>
        <span className="text-gray-700">C</span>
      </div>
      <div className="mb-8 text-center font-rubik font-bold text-gray-300 text-xl md:text-2xl lg:text-3xl xl:text-3xl hover:text-blue-800 hover:font-semibold hover:transform hover:scale-105">
        <p>Transforming voices into insights,</p>
        <p>and insights into action.</p>
      </div>
      {user && (
        <div className="flex flex-col items-center font-bold cursor-pointer mb-4 text-3xl">
          <strong className="text-blue-500 font-semibold text-center hover:transform hover:scale-105 mr-4">
            Welcome
          </strong>
          <span className="flex justify-center text-blue-600 font-semibold hover:font-bold hover:transform hover:scale-105">
            {user.name.split(" ")[0].toUpperCase()}
            <FaUserTie className="ml-2 w-7 lg:w-8 h-7 lg:h-8" />
          </span>
        </div>
      )}
      <div className="flex justify-center w-full mb-4">
        <div className="flex w-full max-w-md px-4 border text-gray-600 placeholder-gray-600 shadow-sm rounded-full font-semibold bg-slate-900/50 border-blue-700">
          <input
            type="text"
            onChange={handleOnChange}
            placeholder="Enter the Amazon Product ASIN B0####"
            className="outline-none text-gray-400 text-center placeholder-gray-400 w-full rounded-full pl-2 bg-transparent"
            ref={inputRef}
          />
          <div className="flex justify-center ml-3 my-2">
            <button
              onClick={handleSearch}
              disabled={loading}
              className="w-40 h-12 text-md text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:from-purple-600 hover:to-pink-600 rounded-full font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 hover:transform hover:scale-105 hover:shadow-lg"
            >
              {loading ? <ButtonLoader /> : "Let's Get Reviews"}
            </button>
          </div>
        </div>
      </div>
      <div>
        <p
          onClick={handleOpenModal}
          className="font-rubik font-normal text-base text-white cursor-pointer hover:text-blue-500 hover:font-semibold hover:transform hover:scale-105 transition duration-300 ease-in-out mb-10"
        >
          HOW TO GET ASIN ?
        </p>
        <VideoModal isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>
      <div className="w-full flex justify-center text-[18px]">
        {auth ? (
          <button
            onClick={handleLogout}
            disabled={isLoading}
            className="w-[200px] h-[50px] mt-2 bg-blue-600 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 hover:transform hover:scale-105 hover:shadow-lg"
          >
            {isLoading ? <ButtonLoader /> : "Log Out"}
          </button>
        ) : (
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-[200px] h-[50px] mt-2 bg-blue-600 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 hover:transform hover:scale-105 hover:shadow-lg"
          >
            {isLoading ? <ButtonLoader /> : "Log In"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;

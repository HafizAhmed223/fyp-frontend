import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomToast from "./Shared/alertModal";
import ButtonLoader from "./Shared/ButtonLoader";
import { useAuth0 } from "@auth0/auth0-react";
import "../../src/index.css";
import VideoModal from "./Shared/VideoModal";
import { FaUserTie } from "react-icons/fa";
import { AuthContext } from "../Components/context/Auth";
const Home = () => {
  const [asin, setAsin] = useState("");
  const [loading, setLoading] = useState(false); // State variable for loading status
  const navigate = useNavigate();
  let inputRef = useRef(null);
  const authContext = useContext(AuthContext);
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
  const { loginWithRedirect, logout, isAuthenticated, isLoading, user } =
    useAuth0();
  const handleLogin = async () => {
    try {
      await loginWithRedirect();
    } catch (error) {
      CustomToast({ type: "error", message: "Please try again Logging In!" });
    }
  };
  const handleLogout = async () => {
    try {
      localStorage.clear();
      logout({ returnTo: window.location.origin });
      CustomToast({ type: "success", message: "User Logged Out" });
    } catch (error) {
      CustomToast({ type: "error", message: "Please try again logging out!" });
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      authContext.setAuth(true);
      console.log("isAuthenticated on log In =>>", isAuthenticated);
    } else {
      authContext.setAuth(false);
    }
  }, [isAuthenticated, authContext]);
  // const handleLogin = async () => {
  //   try {
  //     await loginWithRedirect();
  //     authContext.setAuth((authContext.auth = isAuthenticated));
  //     console.log("isAuthenticated on log In =>>", isAuthenticated);
  //     setTimeout(() => {
  //       console.log("isAuthenticated on log In =>>", isAuthenticated);
  //     }, 10000);
  //   } catch (error) {
  //     CustomToast({ type: "error", message: "Please try again Logging In!" });
  //   }
  // };
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     CustomToast({ type: "success", message: "User Logged In Successfully" });
  //   }
  // }, [isAuthenticated]);

  // const handleLogout = async () => {
  //   try {
  //     localStorage.clear();
  //     logout({ returnTo: window.location.origin });
  //     // console.log("isAuthenticated on log out =>>", isAuthenticated);
  //   } catch (error) {
  //     CustomToast({ type: "error", message: "Please try again logging out!" });
  //   } finally {
  //     CustomToast({ type: "success", message: "User Logged Out" });
  //   }
  // };
  const handleSearch = async () => {
    const keysToRemove = [
      "reviewData",
      "insightsData",
      "prompt",
      "productReview",
      "productSentiments",
    ];

    // localStorage.clear();
    if (isAuthenticated) {
      const asinRegex = /^[A-Z0-9]{10}$/;
      if (asin !== "") {
        if (asinRegex.test(asin)) {
          try {
            setLoading(true); // Set loading to true when search starts
            const response = await axios.post("/api/search/product/reviews", {
              asin: asin,
            });
            keysToRemove.forEach((key) => {
              localStorage.removeItem(key);
              console.log(`${key} has been removed from localStorage`);
            });
            if (response.data.scrapedData.length === 0) {
              // console.log('Length =>', response.data.scrapedData.length)
              CustomToast({ type: "error", message: "No Reviews Availble" });
            } else {
              CustomToast({ type: "success", message: response.data.message });
              console.log(response.data);
              navigate("/reviews", {
                state: {
                  reviews: response.data.scrapedData,
                  auth: isAuthenticated,
                },
              });
            }
          } catch (error) {
            CustomToast({ type: "error", message: "Error Scrapping Reviews" });
            console.error("Error while searching:", error);
          } finally {
            setLoading(false); // Set loading to false when search completes
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
    localStorage.setItem("auth", isAuthenticated);
    inputRef.current.focus();
    console.log("auth Context in Home :", authContext);
  });
  return (
    <div className="bgDiv bg-slate-950 flex flex-col items-center justify-center py-12">
      <div className="font-rubik font-bold text-blue-500 text-center text-6xl md:text-8xl lg:text-8xl xl:text-8xl py-12">
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
      <div className="mb-8 text-center">
        <p className="font-rubik font-bold text-gray-300 text-2xl md:text-3xl lg:text-4xl xl:text-4xl hover:text-blue-800 hover:font-semibold hover:transform hover:scale-105">
          Transforming voices into insights,
        </p>
        <p className="font-rubik font-bold text-gray-300 text-2xl md:text-3xl lg:text-4xl xl:text-4xl hover:text-blue-800 hover:font-semibold hover:transform hover:scale-105">
          and insights into action.
        </p>
      </div>
      {isAuthenticated && (
        <div className="flex flex-col items-center font-bold cursor-pointer mb-4 text-3xl">
          <strong className="text-gray-100 font-semibold text-center hover:text-blue-500 hover:transform hover:scale-105 mr-4">
            Hi
          </strong>{" "}
          <span className="flex justify-center text-blue-600 font-semibold hover:text-blue-500 hover:font-bold hover:transform hover:scale-105">
            {user.name.split(" ")[0].toUpperCase()}
            <FaUserTie className="ml-2 w-7 lg:w-8 h-7 lg:h-8" />
          </span>
        </div>
      )}
      <div className="flex justify-center w-full mb-4">
        <div className="flex w-full max-w-lg px-4 border text-gray-600 placeholder-gray-600 shadow-sm rounded-full font-semibold bg-slate-900/50 border-blue-700">
          <input
            type="text"
            onChange={handleOnChange}
            placeholder="Enter the Amazon Product ASIN B0####"
            className="outline-none text-gray-400 text-center placeholder-gray-400 w-full rounded-full pl-2 bg-transparent"
            ref={inputRef}
          />
          <div className="flex justify-center ml-3 my-2 ">
            <button
              onClick={handleSearch}
              disabled={loading}
              className="w-40 h-12 text-md text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:from-purple-600 hover:to-pink-600 rounded-full font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 hover:transform hover:scale-105 hover:shadow-lg"
            >
              {loading ? <ButtonLoader /> : "Let's Get Started"}
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
        {isAuthenticated ? (
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
        {/* <p className="bg-blue-500 text-white mt-[20px] mr-[10px]">
          {" "}
          Auth Value is {authContext.auth === false ? "false" : "true"}
        </p>
        <button
          className="bg-blue-500 text-white mr-[10px]"
          onClick={() => authContext.setAuth(!authContext.auth)}
        >
          Toggle Auth
        </button> */}
      </div>
    </div>
  );
};

export default Home;

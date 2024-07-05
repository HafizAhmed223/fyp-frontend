import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  FaStar,
  FaThumbsUp,
  FaThumbsDown,
  FaLightbulb,
  FaChartLine,
  FaSmile,
} from "react-icons/fa";
import "../../src/index.css";

const Insights = () => {
  const location = useLocation();
  const [avgRating, setAverageRating] = useState("");
  const [insightsData, setInsightsData] = useState(null);

  useEffect(() => {
    if (location.state) {
      setInsightsData(location.state);
      setAverageRating(location.state.reviews[0].ratingText);
      localStorage.setItem("insightsData", JSON.stringify(location.state));
    } else {
      const localStorageData = localStorage.getItem("insightsData");
      if (localStorageData) {
        setInsightsData(JSON.parse(localStorageData));
        setAverageRating(JSON.parse(localStorageData).rating);
      }
    }
  }, [location.state]);

  const {
    totalReviews = "0",
    summarizedText = `Insights's not Avialble Yet`,
    averageRating = 0,
  } = insightsData || {};

  const summaryPoints = summarizedText.split("\n");

  return (
    <div className="bg-slate-950 py-12">
      <div className="container mx-auto px-4 max-w-screen-lg">
        <h2 className="flex justify-center text-center text-4xl font-bold text-gray-100 mb-6">
          AUTO MAGIC INSIGHTS
          <FaLightbulb className="text-4xl text-blue-700 ml-2 mt-1" />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-700 rounded-lg shadow-lg p-6 text-center">
            <h3 className="text-xl font-semibold text-gray-100 mb-4">
              Total Reviews
            </h3>
            <p className="text-3xl font-bold text-white">
              {totalReviews ? totalReviews : avgRating}
            </p>
          </div>
          <div className="bg-slate-700 rounded-lg shadow-lg p-6 text-center">
            <h3 className="text-xl font-semibold text-gray-100 mb-4">
              Overall Rating
            </h3>
            <div className="flex items-center justify-center">
              <p className="text-3xl font-bold text-white">
                {avgRating ? avgRating : averageRating}
              </p>
              <FaStar className="text-yellow-500 ml-2 w-5 h-5" />
            </div>
          </div>
        </div>
        <div className="mt-12">
          <div className="bg-slate-700 rounded-lg shadow-lg p-6">
            <h3 className="flex justify-center text-2xl font-bold text-gray-100 mb-4 text-center">
              Sentiment Insights from Reviews
              <FaChartLine className="text-3xl text-orange-600 ml-2" />
            </h3>
            {summaryPoints.map((point, index) => (
              <div
                key={index}
                className="mb-4 transition duration-300 ease-in-out transform hover:scale-105"
              >
                {point.includes("Overall Rating") && (
                  <div className="flex justify-center items-center mb-2">
                    <FaStar className="text-yellow-500 mr-2" />
                    <p className="font-bold text-xl text-gray-100">
                      Overall Rating:
                    </p>
                    <p className="ml-2 text-gray-300 font-semibold text-lg">
                      {point.split(": ")[1] ? point.split(": ")[1] : "Positive"}
                    </p>
                  </div>
                )}
                {point.includes("Key Highlights") && (
                  <div className="flex justify-center items-center mb-2">
                    <FaThumbsUp className="text-green-500 mr-2" />
                    <p className="font-bold text-xl text-gray-100">
                      Key Highlights:
                    </p>
                  </div>
                )}
                {point.includes("Surprising Discoveries") && (
                  <div className="flex justify-center items-center mb-2">
                    <FaLightbulb className="text-yellow-500 mr-2" />
                    <p className="font-bold text-xl text-gray-100">
                      Surprising Discoveries:
                    </p>
                  </div>
                )}
                {point.includes("Improvement Suggestions") && (
                  <div className="flex justify-center items-center mb-2">
                    <FaThumbsDown className="text-red-500 mr-2" />
                    <p className="font-bold text-xl text-gray-100">
                      Improvement Suggestions:
                    </p>
                  </div>
                )}
                {!point.includes("Overall Rating") &&
                  !point.includes("Key Highlights") &&
                  !point.includes("Surprising Discoveries") &&
                  !point.includes("Improvement Suggestions") && (
                    <p className="text-gray-300 text-lg text-center">{point}</p>
                  )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;

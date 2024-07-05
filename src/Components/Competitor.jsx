import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomToast from "./Shared/alertModal";
import ButtonLoader from "./Shared/ButtonLoader";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  FaStar,
  FaThumbsUp,
  FaChartBar,
  FaLightbulb,
  FaChartLine,
  FaBoxOpen,
  FaUserTie,
  FaBox,
  FaBalanceScale,
} from "react-icons/fa";

const CompetitorAnalysis = () => {
  const [asins, setAsins] = useState({ asin1: "", asin2: "" });
  const [analysisResult, setAnalysisResult] = useState(null);
  const [insights, setInsights] = useState("");
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useState(true);
  const [buttonText, setButtonText] = useState("Generate Reviews");
  const googleApiKey = "AIzaSyD1fQVny_MTn3jxulRXXlqtCWLQkX8j2c8";

  useEffect(() => {
    const storedReviews = localStorage.getItem("productReview");
    const storedSentiments = localStorage.getItem("productSentiments");

    if (storedReviews) {
      setAnalysisResult(JSON.parse(storedReviews));
      setButtonText("Generate Insights");
    }
    if (storedSentiments) {
      setInsights(storedSentiments);
      setButtonText("Generate Reviews");
    }
    setAuth(localStorage.getItem("auth") === "true");
  }, []);

  const handleAsinChange = (e) => {
    const { name, value } = e.target;
    setAsins((prevAsins) => ({ ...prevAsins, [name]: value }));
  };

  const validateAsin = (asin) => /^[A-Z0-9]{10}$/.test(asin);

  const handleSubmit = async () => {
    if (!auth) {
      CustomToast({ type: "error", message: "Please Login First!" });
      return;
    }

    const { asin1, asin2 } = asins;

    if (!asin1 || !asin2) {
      CustomToast({
        type: "error",
        message: "Please Enter both Product ASINs",
      });
      return;
    }

    if (!validateAsin(asin1) || !validateAsin(asin2)) {
      CustomToast({ type: "error", message: "Please enter valid ASINs." });
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/api/competitor/analysis", {
        asin1,
        asin2,
      });
      if (!response.data || response.data.length === 0) {
        CustomToast({ type: "error", message: "No Competitors Available" });
      } else {
        setAnalysisResult(response.data);
        localStorage.setItem("productReview", JSON.stringify(response.data));
        CustomToast({
          type: "success",
          message: "Competitor Reviews Extracted Successfully",
        });
        setButtonText("Generate Insights");
      }
      setAsins({ asin1: "", asin2: "" });
      setInsights("");
    } catch (error) {
      CustomToast({ type: "error", message: "Error Scraping Reviews" });
      console.error("Error while searching:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateInsights = async () => {
    try {
      setLoading(true);
      const { product1, product2 } = analysisResult;
      const avgRating1 = product1.reviews[0].ratingText;
      const avgRating2 = product2.reviews[0].ratingText;

      const Product1 = product1.reviews
        .slice(0, 5)
        .map((review, index) => {
          return `${index + 1}\n , ${review.productName} ${
            review.reviewTitle
          }, ${review.rating}, ${review.reviewBody}`;
        })
        .join("\n");

      const Product2 = product2.reviews
        .slice(0, 5)
        .map((review, index) => {
          return `${index + 1}\n ,${review.productName} ${
            review.reviewTitle
          }, ${review.rating}, ${review.reviewBody}`;
        })
        .join("\n");

      console.log("Average Rating ==>>", avgRating1);
      console.log("\n");
      console.log("Product1 ==>>", Product1);
      console.log("\n\n");
      console.log("Product2 ==>>", Product2);
      console.log("\n");
      console.log("Product2 ==>>", avgRating2);
      console.log("\n\n");

      if (!Product1 || !Product2 || Product1 === "" || Product2 === "") {
        throw new Error("No reviews available for one or both products");
      }

      const genAI = new GoogleGenerativeAI(googleApiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const summaryPrompt = `As an AI summarizer, uncover fascinating insights to get the competitor analysis from the customer reviews to captivate potential buyers. Craft a concise summary with the following details within 100 characters:
      #Important Note: Each item must be in bullet points 

        Output Format:
        - Key Highlights: [List of standout features or benefits highlighted in the reviews of both the products, each item "must be separated by a bullet point"]
        - Surprising Discoveries: [Unexpected findings or unique experiences mentioned in the reviews of both the products, each item "must be separated by a bullet point"]
        - Potential Differences: [Based on the sentiment analysis, suggest potential areas for differentiation from the product reviews, each item "must be separated by a bullet point."]
        
        Product 1:
        Average Rating:${avgRating1}
        Reviews of Product 1:
        ${Product1}
        Product 2:
        Average Rating:${avgRating2}
        Reviews of Product 2:
        ${Product2}`;
      const result = await model.generateContent(summaryPrompt);
      const response = result?.response;
      const summarizedText = response?.text();
      console.log("summarizedText ==>>", summarizedText);
      CustomToast({
        type: "success",
        message: "Competitor Insights Extracted Successfully",
      });

      setInsights(summarizedText); // Set insights separately
      localStorage.setItem("productSentiments", summarizedText);
      setButtonText("Generate Reviews");
    } catch (error) {
      console.error("Error generating summary:", error);
      CustomToast({ type: "error", message: "No Insights Available" });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (insights && auth) {
      window.scrollTo({
        top: document.getElementById("insights-section").offsetTop,
        behavior: "smooth",
      });
    }
  }, [insights]);

  return (
    <div className="p-6 bg-slate-950">
      <div className="flex justify-center">
        <h1 className="text-center text-4xl font-bold text-gray-300 mb-6">
          COMPETITOR ANALYSIS
        </h1>
        <FaChartLine className="text-blue-600 ml-2 w-10 lg:w-10 h-10 lg:h-10" />
      </div>
      <div className="flex justify-center mb-6 space-x-6">
        <div className="w-1/3">
          <label className="block text-center text-gray-500 text-md font-medium">
            Product 1
          </label>
          <input
            type="text"
            name="asin1"
            value={asins.asin1}
            onChange={handleAsinChange}
            placeholder="Enter ASIN for Product 1"
            className="bg-slate-900/50 text-gray-400 placeholder-gray-400 mt-1 block w-full px-3 py-2 border border-blue-500 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="w-1/3 text-gray-100">
          <label className="block text-center text-gray-500 text-md font-medium">
            Product 2
          </label>
          <input
            type="text"
            name="asin2"
            value={asins.asin2}
            onChange={handleAsinChange}
            placeholder="Enter ASIN for Product 2"
            className="bg-slate-900/50 text-gray-400 placeholder-gray-400 mt-1 block w-full px-3 py-2 border border-blue-500 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>
      <div className="flex justify-center items-center border-gray-100">
        <button
          onClick={
            buttonText === "Generate Reviews" ? handleSubmit : generateInsights
          }
          disabled={loading}
          className="bg-orange-500 font-semibold shadow-md hover:bg-orange-600 w-54 text-xl text-white rounded-full px-6 py-3 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 hover:transform hover:scale-105 hover:shadow-lg"
        >
          {loading ? <ButtonLoader /> : buttonText}
        </button>
      </div>
      {analysisResult !== null && auth ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div>
              <p className="flex justify-center text-center text-3xl font-bold text-gray-100">
                Product 1
                <FaBoxOpen className="text-blue-600 ml-2 w-10 lg:w-10 h-10 lg:h-10" />
              </p>
              <ProductCard product={analysisResult.product1} />
            </div>
            <div>
              <p className="flex justify-center text-center text-3xl font-bold text-gray-100">
                Product 2
                <FaBoxOpen className="text-blue-600 ml-2 w-10 lg:w-10 h-10 lg:h-10" />
              </p>
              <ProductCard product={analysisResult.product2} />
            </div>
          </div>
          {insights && (
            <div
              id="insights-section"
              className="mt-8 p-4 bg-slate-800 shadow rounded mx-4"
            >
              <h2 className="flex justify-center text-center text-3xl font-bold mb-4 text-gray-100">
                Competitor Analysis Insights
                <FaBalanceScale className="text-orange-600 ml-2 w-10 lg:w-10 h-10 lg:h-10" />
              </h2>
              <h2 className="heading flex justify-center text-center text-2xl font-bold mb-4 text-gray-300">
                Product 1 {"  "}vs{"  "} Product 2
              </h2>
              {insights.split("\n").map((point, index) => (
                <div
                  key={index}
                  className="mb-4 transition duration-300 ease-in-out transform hover:scale-105 text-blue-600"
                >
                  {point.includes("Key Highlights") && (
                    <div className="flex justify-center items-center mb-2">
                      <FaThumbsUp className="text-green-500 mr-2" />
                      <p className="font-bold text-lg">Key Highlights:</p>
                    </div>
                  )}
                  {point.includes("Surprising Discoveries") && (
                    <div className="flex justify-center items-center mb-2">
                      <FaLightbulb className="text-yellow-500 mr-2" />
                      <p className="font-bold text-lg">
                        Surprising Discoveries:
                      </p>
                    </div>
                  )}
                  {point.includes("Potential Differences") && (
                    <div className="flex justify-center items-center mb-2">
                      <FaChartBar className="text-green-600 mr-2" />
                      <p className="font-bold text-lg">
                        Potential Differences:
                      </p>
                    </div>
                  )}
                  {!point.includes("Key Highlights") &&
                    !point.includes("Surprising Discoveries") &&
                    !point.includes("Potential Differences") && (
                      <p className="text-gray-100 text-lg text-center font-semibold">
                        {point}
                      </p>
                    )}
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          {/* <p className="text-xl font-semibold text-center text-white bg-gray-800 rounded-xl p-5 mt-8">
            Please Log In First
          </p> */}
        </div>
      )}
    </div>
  );
};

const ProductCard = ({ product }) => {
  const [auth, setAuth] = useState(true);

  useEffect(() => {
    setAuth(localStorage.getItem("auth") === "true");
  }, []);

  if (!product) return null;

  const { asin, reviews } = product;
  if (!reviews || reviews.length === 0) return null;
  const overallRating = (
    reviews.reduce((acc, review) => acc + parseFloat(review.rating), 0) /
    reviews.length
  ).toFixed(1);

  return (
    <div className="bg-slate-950 py-12">
      <div className="container mx-auto px-4 max-w-screen-lg">
        <div className="bg-slate-800 shadow-md rounded-lg p-6">
          {auth && reviews ? (
            <div className="">
              <h2 className="text-center text-2xl text-gray-100 mb-6">
                {/* Reviews of{" "} */}
                <span className="text-center text-2xl text-gray-500 mb-6">
                  {reviews ? reviews[0].productName.slice(0, 100) : ""}
                  {"..."}
                </span>
              </h2>
              <h2 className="text-xl text-gray-100 mb-2 text-end">
                ASIN: {asin}
              </h2>
              <p className="flex justify-center text-3xl font-bold text-white mb-4">
                Rating Score:
                <span className="text-yellow-500 flex items-center pl-3">
                  {reviews ? reviews[0].ratingText : overallRating}
                  <FaStar className="ml-1" />
                </span>
              </p>
              <div className="space-y-4">
                {reviews.map(
                  (
                    review,
                    index // Taking max 5 reviews
                  ) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 min-h-[135px]"
                    >
                      <img
                        src={review.imgSrc}
                        alt={`Review ${index + 1}`}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div>
                        <h3 className="font-bold text-blue-500">
                          {review.reviewTitle}
                        </h3>
                        <p className="text-sm text-gray-300">
                          {review.reviewDate}
                        </p>
                        <p className="text-gray-100">
                          {review.reviewBody.slice(0, 100)}...
                        </p>
                        <p className="text-yellow-500 flex items-center">
                          {review.rating} <FaStar className="ml-1" />
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          ) : (
            <div>
              {/* <p className="text-xl font-semibold text-center text-white bg-gray-800 rounded-xl p-5 mt-8">
                Please Log In First
              </p> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompetitorAnalysis;

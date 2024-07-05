import { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai"; // Import GoogleGenerativeAI class
import CustomToast from "./Shared/alertModal";
import { FaMagic } from "react-icons/fa";
import ButtonLoader from "./Shared/ButtonLoader";
import "../../src/index.css";
import { AuthContext } from "../Components/context/Auth";

const Reviews = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [totalReviews, setTotalReviews] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [allReviewBodies, setAllReviewBodies] = useState("");
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [auth, setAuth] = useState(false);
  const googleApiKey = "AIzaSyD1fQVny_MTn3jxulRXXlqtCWLQkX8j2c8"; // Use REACT_APP prefix
  const [reviewData, setReviewData] = useState("");
  const authContext = useContext(AuthContext);
  useEffect(() => {
    if (location.state) {
      // If data is available in location.state, use it and save to localStorage
      setReviewData(location.state);
      localStorage.setItem("reviewData", JSON.stringify(location.state));
      console.log("auth Context in Reviews =>>", authContext);
    } else {
      // If data is not available in location.state, try to retrieve from localStorage
      const localStorageData = localStorage.getItem("reviewData");
      if (localStorageData) {
        setReviewData(JSON.parse(localStorageData));
      }
    }
  }, [location.state]);

  const { reviews = [] } = reviewData || {};

  const fetchData = async () => {
    if (reviews.length > 0) {
      setTotalReviews(reviews.length);
      const totalRatings = reviews.reduce(
        (total, review) => total + parseFloat(review.rating),
        0
      );
      const average = totalRatings / totalReviews || 0;
      setAverageRating(average.toFixed(2));
      setAllReviewBodies(reviews.map((review) => review.reviewBody).join("\n"));
      if (location.state && location.state.reviews !== undefined) {
        setPrompt(allReviewBodies);
        localStorage.setItem("prompt", allReviewBodies);
      }
    }
  };
  useEffect(() => {
    fetchData(); // Call the async function inside useEffect
  }, [reviews, totalReviews, allReviewBodies, location.state]);

  const handleSummarize = async () => {
    console.log("Handle Summarized ");

    try {
      // console.log("prompt =>>", prompt);
      if (prompt !== "" && prompt !== null) {
        setLoading(true);
        const genAI = new GoogleGenerativeAI(googleApiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // Get the Gemini-Pro model

        const summaryPrompt = `As an AI summarizer, uncover fascinating insights from the customer reviews to captivate potential buyers. Craft a concise summary with the following details within 100 characters:
        #Important Note: Each item must be in bullet points 
        Output Format:
        - Overall Rating: [Extracted overall sentiment or rating from the reviews, whether Positive or Negative]
        - Key Highlights: [List of standout features or benefits highlighted in the reviews, each item "must be separated by a bullet point"]
        - Surprising Discoveries: [Unexpected findings or unique experiences mentioned in the reviews, each item "must be separated by a bullet point"]
        - Improvement Suggestions: [List of actionable feedback to enhance the product, each item "must be separated by a bullet point"]
        
        ${prompt}`;
        const result = await model.generateContent(summaryPrompt); // Use generateContent
        const response = result?.response;
        const summarizedText = response?.text();
        // console.log("summarizedText", summarizedText);
        if (summarizedText !== "") {
          CustomToast({
            type: "success",
            message: "Insights Extracted Successfully",
          });
          navigate("/insights", {
            state: { totalReviews, averageRating, summarizedText, reviews },
          });
        } else {
          // console.log("handleSummarize called again", summarizedText);
          handleSummarize();
        }
      }
    } catch (error) {
      console.error("Error generating summary:", error);
      CustomToast({ type: "error", message: "No Insights Available" });
      // setError('Failed to generate summary');
    } finally {
      setLoading(false);
    }
  };

  const handleInsights = () => {
    handleSummarize();
  };
  useEffect(() => {
    if (!prompt) {
      setPrompt(localStorage.getItem("prompt", prompt));
    }
  }, []);
  useEffect(() => {
    setAuth(localStorage.getItem("auth"));
  });

  return (
    <div className="bgDiv bg-slate-950 flex-grow flex flex-col py-12">
      <div className="flex flex-col justify-center items-center  w-full pb-10">
        <div className="flex flex-col justify-center items-center py-2 pb-[30px] md:mx-[100px] sm:mx-[50px] mx-[20px]">
          <div className="text-center">
            <h2 className="flex justify-center text-center text-4xl font-bold text-gray-300 mb-6">
              AUTO MAGIC REVIEWS
              <FaMagic className="text-4xl text-blue-600 ml-3" />
            </h2>
            <button
              className="bg-orange-500 text-white rounded-full px-6 py-3 font-semibold shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 hover:transform hover:scale-105 hover:shadow-lg"
              onClick={handleInsights}
            >
              {loading ? <ButtonLoader /> : "GENERATE INSIGHTS"}
            </button>
          </div>
        </div>
        {reviewData != [] ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 w-full max-w-6xl mt-6">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-slate-700 rounded-lg shadow-md p-6 transition-transform duration-300 transform hover:scale-105 hover:delay-200 cursor-pointer"
              >
                <div className="flex items-center mb-4">
                  <img
                    className="w-16 h-16 rounded-full mr-4"
                    alt="product_image"
                    src={review.imgSrc}
                  />
                  <div>
                    <p className="text-yellow-500 font-bold">
                      {review.rating} Stars
                    </p>
                    <p className="text-gray-400">{review.reviewDate}</p>
                  </div>
                </div>
                <h3 className="text-gray-200 font-bold text-xl mb-2">
                  {review.reviewTitle}
                </h3>
                <p className="text-gray-300 line-clamp-3 font-semibold">
                  {review.reviewBody}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="md:text-2xl sm:text-xl text-lg font-semibold text-white bg-slate-950 rounded-[30px] p-5 mt-[50px]">
            No reviews available
          </p>
        )}
      </div>
    </div>
  );
};

export default Reviews;

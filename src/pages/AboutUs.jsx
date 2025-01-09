import React from "react";
import { FaRobot, FaChartLine, FaComments, FaStar } from "react-icons/fa";

const AboutUs = () => {
  const img = require("../Assets/image.png");
  return (
    <div className="text-gray-100 bg-slate-950">
      <section className="bg-cover bg-center h-50 text-white flex items-center justify-center">
        <h1 className="text-center text-4xl md:text-5xl font-bold text-gray-300 mt-8">
          ABOUT AUTO MAGIC
        </h1>
      </section>

      <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <h2 className="text-4xl font-extrabold text-center mb-8 text-orange-500">
          Our Mission
        </h2>
        <p className="text-lg text-center mb-8 text-gray-400 font-semibold">
          At Auto Magic, we are revolutionizing the way businesses gather and
          analyze customer feedback. Our AI-powered platform provides
          comprehensive insights to help you stay ahead of the competition.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-slate-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <FaRobot className="text-4xl text-blue-600 mb-4" />
            <h3 className="text-2xl font-bold mb-2 text-gray-300">
              AI-Powered Analysis
            </h3>
            <p className="text-gray-400">
              Leverage the power of artificial intelligence to analyze customer
              reviews and extract valuable insights effortlessly.
            </p>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <FaChartLine className="text-4xl text-green-600 mb-4" />
            <h3 className="text-2xl font-bold mb-2 text-gray-300">
              Comprehensive Insights
            </h3>
            <p className="text-gray-400">
              Get detailed reports on customer sentiment, market trends, and
              competitor performance to make data-driven decisions.
            </p>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <FaComments className="text-4xl text-purple-600 mb-4" />
            <h3 className="text-2xl font-bold mb-2 text-gray-300">
              Real-Time Feedback
            </h3>
            <p className="text-gray-400">
              Stay updated with real-time notifications about new customer
              feedback, helping you respond swiftly and effectively.
            </p>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <FaStar className="text-4xl text-yellow-600 mb-4" />
            <h3 className="text-2xl font-bold mb-2 text-gray-300">
              Enhanced Customer Experience
            </h3>
            <p className="text-gray-400">
              Improve customer satisfaction by understanding their needs and
              addressing issues proactively.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:py-16 lg:px-8">
          <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-300">
            Why Choose AUTO MAGIC?
          </h2>
          <p className="text-lg text-center mb-8 text-gray-300 font-semibold">
            AUTO MAGIC stands out for its advanced AI technology, user-friendly
            interface, and actionable insights. Here are some reasons why our
            customers love us:
          </p>

          <ul className="list-disc list-inside text-lg space-y-4 mx-8 text-gray-400">
            <li>Seamless integration with your existing systems</li>
            <li>Customizable dashboards and reports</li>
            <li>24/7 customer support</li>
            <li>Secure and reliable data handling</li>
            <li>Competitive pricing with no hidden fees</li>
          </ul>
        </div>
      </section>

      <section className="bg-slate-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:py-16 lg:px-8">
          <h2 className="text-gray-300 text-3xl font-extrabold text-center mb-8">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
            {/* Add team member cards here */}
            <div className="bg-slate-900/50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
              <img
                className="w-42 h-52 rounded-full mx-auto mb-4"
                src={img}
                alt="Team Member"
              />
              <h3 className="text-2xl text-gray-500 font-bold text-center">
                AHMED WASEEM
              </h3>
              <p className="text-center text-gray-500">CEO & DEVELOPER</p>
            </div>
            {/* Repeat similar blocks for other team members */}
          </div>
        </div>
      </section>

      <section className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:py-16 lg:px-8">
          <h2 className="text-3xl font-extrabold text-center mb-8">
            Get in Touch
          </h2>
          <p className="text-lg text-center mb-8 text-gray-400">
            We'd love to hear from you. Whether you have a question about our
            features, pricing, or anything else, our team is ready to answer all
            your questions.
          </p>
          <div className="text-center">
            <button
              onClick={() =>
                (window.location.href = "mailto:contact@auto-magic.com")
              }
              className="bg-blue-600 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
      <div className="relative">
     <div>
        {navigator.onLine ? (
          <iframe
            src="https://app.arcade.software/share/VWtl88nqumdEhkCWL4IB"
            className="w-full md:h-[1000px] h-[500px] border rounded-lg shadow-md"
          ></iframe>
        ) : (
          <div className="flex flex-col items-center justify-center h-[500px] bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-red-500 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 16h-1v-4h-1m0-4h.01M12 8v4m0 4h.01m-6.938 4h13.856c.447 0 .786-.448.666-.89l-1.35-5.405a1.745 1.745 0 00-.058-.18l-3.68-9.13a1 1 0 00-1.8 0l-3.68 9.13a1.745 1.745 0 00-.058.18L5.272 19.11c-.12.442.219.89.666.89z"
              />
            </svg>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Unable to Load Content
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center max-w-xs">
              It seems like your internet connection is offline. Please check your connection and try again.
            </p>
          </div>
        )}
     </div>
</div>

    </div>
  );
};

export default AboutUs;

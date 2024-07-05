import React from "react";
import { FiLock } from "react-icons/fi";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto py-12 px-4 bg-slate-950 min-h-screen">
      <div className="max-w-3xl mx-auto bg-slate-800 rounded-lg shadow-md p-8 my-4">
        <div className="flex items-center justify-center mb-8">
          <FiLock className="text-purple-600 text-4xl mr-2" />
          <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-300">
            Privacy Policy
          </h1>
        </div>
        <div className="text-gray-400 text-lg leading-relaxed">
          <p className="mb-6">
            AUTO MAGIC is committed to protecting your privacy. This Privacy
            Policy explains how we collect, use, and safeguard your personal
            data when you use our services or visit our website.
          </p>
          <p className="mb-6">
            When you use Auto Magic services or visit our website, we may
            collect certain information from and about you, including:
          </p>
          <ul className="list-disc list-inside mb-6">
            <li>
              Your name, email address, and other contact details when you
              register for an account.
            </li>
            <li>
              Information about your interactions with our services, such as the
              pages you visit and the actions you take.
            </li>
            <li>
              Device and usage information, such as your IP address, browser
              type, and operating system.
            </li>
          </ul>
          <p className="mb-6">
            We use this information to provide and improve our services,
            personalize your experience, communicate with you, and comply with
            legal obligations.
          </p>
          <p className="mb-6">
            Auto Magic implements appropriate technical and organizational
            measures to protect your personal data. We also use Auth0 for
            authentication and authorization, ensuring secure access to our
            services.
          </p>
          <p className="mb-6">
            We may share your information with trusted third-party service
            providers, business partners, or affiliates who assist us in
            delivering our services or operating our business. These parties are
            obligated to maintain the confidentiality and security of your data.
          </p>
          <p className="mb-6">
            Auto Magic may update this Privacy Policy from time to time. We will
            notify you of any changes by posting the new Privacy Policy on this
            page.
          </p>
          <p>
            If you have any questions or concerns about our Privacy Policy or
            data practices, please contact us at{" "}
            <a
              href="mailto:privacy@automagic.com"
              className="text-purple-600 hover:underline"
            >
              privacy@automagic.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

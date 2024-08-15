import React from "react";
import { FiCheckCircle } from "react-icons/fi";

const TermsOfService = () => {
  return (
    <div className="container mx-auto py-12 px-4 bg-slate-950 min-h-screen">
      <h1 className="text-3xl text-gray-300 font-bold text-center mb-8">
        Terms of Service
      </h1>
      <div className="max-w-3xl mx-auto bg-slate-800 rounded-lg shadow-md p-8">
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-300 mb-4">
            1. Introduction
          </h2>
          <p className="text-gray-400 mb-2">
            Welcome to Auto Magic! These terms and conditions outline the rules
            and regulations for the use of our platform.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-300 mb-4">
            2. Acceptance of Terms
          </h2>
          <p className="text-gray-400 mb-2">
            By accessing our platform, you agree to be bound by these terms and
            conditions.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-300 mb-4">
            3. User Conduct
          </h2>
          <p className="text-gray-400 mb-2">
            You agree not to engage in any conduct that may disrupt or interfere
            with the operation of our platform.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-300 mb-4">
            4. Privacy
          </h2>
          <p className="text-gray-400 mb-2">
            We respect your privacy and are committed to protecting your
            personal information.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-300 mb-4">
            5. Intellectual Property
          </h2>
          <p className="text-gray-400 mb-2">
            All content provided on our platform is the property of Auto Magic
            and may not be used without permission.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-300 mb-4">
            6. Limitation of Liability
          </h2>
          <p className="text-gray-400 mb-2">
            We shall not be liable for any direct, indirect, incidental,
            consequential, or punitive damages arising out of your use of our
            platform.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-300 mb-4">
            7. Governing Law
          </h2>
          <p className="text-gray-400 mb-2">
            These terms and conditions shall be governed by and construed in
            accordance with the laws of [Your Country].
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-300 mb-4">
            8. Changes to Terms
          </h2>
          <p className="text-gray-400 mb-2">
            We reserve the right to modify or replace these terms at any time
            without notice. It is your responsibility to review this page
            periodically for changes.
          </p>
        </section>
        <div className="flex items-center text-gray-400">
          <FiCheckCircle className="text-green-500 mr-2" />
          <p>By using our platform, you agree to these terms and conditions.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;

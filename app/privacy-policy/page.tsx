import Link from "next/link";
import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="mx-4 md:mx-20 lg:mx-60">
      <h1 className="text-center text-2xl font-bold mb-4">
        <u>Privacy Policy</u>
      </h1>
      <p className="mb-4">
        At Seacoast Surgical, we are committed to protecting your privacy. This Privacy Policy explains how we
        collect, use, disclose, and protect your information when you visit our website
        (<a href="https://www.dynamicmedicalsolution.com/" className="text-blue-500 hover:underline">
          https://www.dynamicmedicalsolution.com/
        </a>) and interact with our products and services.
      </p>

      <h2 className="text-xl font-bold mt-6 mb-2">Information We Collect</h2>
      <p className="mb-4">
        We may collect the following types of information:
      </p>
      <ol className="list-decimal list-inside mb-4">
        <li className="mb-2">
          <strong>Personal Information:</strong> This includes information that can identify you, such as your name, email
          address, phone number, billing address, and shipping address, when you place an order or
          contact us.
        </li>
        <li className="mb-2">
          <strong>Non-Personal Information:</strong> This includes data that does not identify you personally, such as
          browser type, IP address, pages visited on our Site, and the date and time of your visit.
        </li>
        <li className="mb-2">
          <strong>Health Information:</strong> If you provide information related to health for our products, we will
          handle this information in accordance with applicable laws and regulations.
        </li>
      </ol>

      <h2 className="text-xl font-bold mt-6 mb-2">How We Use Your Information</h2>
      <p className="mb-4">
        We use the information we collect for various purposes, including:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li className="mb-2">To process and fulfill your orders.</li>
        <li className="mb-2">To communicate with you about your account, orders, and inquiries.</li>
        <li className="mb-2">To improve our products and services.</li>
        <li className="mb-2">To send you marketing communications, if you have opted in to receive them.</li>
        <li className="mb-2">To comply with legal obligations and protect our rights.</li>
      </ul>

      <h2 className="text-xl font-bold mt-6 mb-2">Disclosure of Your Information</h2>
      <p className="mb-4">
        We may share your information in the following situations:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li className="mb-2">
          <strong>With Service Providers:</strong> We may share your information with third-party vendors who assist us
          in operating our Site, conducting our business, or servicing you, as long as those parties agree to
          keep this information confidential.
        </li>
        <li className="mb-2">
          <strong>For Legal Reasons:</strong> We may disclose your information to comply with applicable laws,
          regulations, or legal requests, or to protect our rights, privacy, safety, or property, or that of
          others.
        </li>
      </ul>

      <h2 className="text-xl font-bold mt-6 mb-2">Security of Your Information</h2>
      <p className="mb-4">
        We implement reasonable security measures to protect your information from unauthorized access,
        use, or disclosure. However, no method of transmission over the Internet or electronic storage is 100%
        secure, and we cannot guarantee its absolute security.
      </p>

      <h2 className="text-xl font-bold mt-6 mb-2">Your Rights</h2>
      <p className="mb-4">
        You have certain rights regarding your personal information, including:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li className="mb-2">The right to access and receive a copy of your personal information.</li>
        <li className="mb-2">The right to request correction of any inaccuracies in your personal information.</li>
        <li className="mb-2">The right to request deletion of your personal information.</li>
        <li className="mb-2">The right to opt-out of marketing communications.</li>
      </ul>

      <h2 className="text-xl font-bold mt-6 mb-2">Third-Party Websites</h2>
      <p className="mb-4">
        Our Site may contain links to third-party websites. We are not responsible for the privacy practices or
        content of these websites. We encourage you to review the privacy policies of any third-party sites you
        visit.
      </p>

      <p className="mb-4">
        We may update this Privacy Policy from time to time. Any changes will be posted on this page with an
        updated effective date. We encourage you to review this policy periodically for any updates.
      </p>

      <p className="mb-4">
        If you have any questions about this Privacy Policy or our practices, please <span className="text-blue-500"><Link href="/contact">contact us</Link></span>.
      </p>
    </div>
  );
}
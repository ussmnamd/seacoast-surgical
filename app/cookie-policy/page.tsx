import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="mx-4 md:mx-20 lg:mx-60">
      <h1 className="text-center text-2xl font-bold mb-4">
        <u>Cookie Policy</u>
      </h1>
      <p className="mb-4">
        At Seacoast Surgical, we are committed to protecting your privacy. This Cookie Policy explains how we
        use cookies and similar technologies on our website: Seacoast Surgical.
      </p>

      <h2 className="text-xl font-bold mt-6 mb-2">What Are Cookies?</h2>
      <p className="mb-4">
        Cookies are small text files placed on your device when you visit our Site. They help us enhance your
        experience by remembering your preferences and improving the functionality of our site.
      </p>

      <h2 className="text-xl font-bold mt-6 mb-2">How We Use Cookies?</h2>
      <p className="mb-4">
        We use cookies for the following purposes:
      </p>
      <ol className="list-decimal list-inside mb-4">
        <li className="mb-2">
          <strong>Essential Cookies:</strong> These cookies are necessary for the operation of our Site. They enable you to
          navigate the Site and use its features, such as accessing secure areas.
        </li>
        <li className="mb-2">
          <strong>Performance Cookies:</strong> These cookies collect information about how visitors use our Site, such as
          which pages are visited most often. This information helps us improve our Site and provide a better
          user experience.
        </li>
        <li className="mb-2">
          <strong>Functional Cookies:</strong> These cookies allow us to remember choices you make (like your user name or
          language preferences) and provide enhanced features. For example, they may be used to provide
          services you have requested.
        </li>
        <li className="mb-2">
          <strong>Targeting/Advertising Cookies:</strong> These cookies are used to deliver advertisements that are relevant
          to you and your interests. They help us measure the effectiveness of our advertising campaigns.
        </li>
      </ol>

      <h2 className="text-xl font-bold mt-6 mb-2">Types of Cookies We Use</h2>
      <ul className="list-disc list-inside mb-4">
        <li className="mb-2">
          <strong>Session Cookies:</strong> These cookies are temporary and are deleted when you close your browser.
        </li>
        <li className="mb-2">
          <strong>Persistent Cookies:</strong> These cookies remain on your device for a set period or until you delete
          them.
        </li>
      </ul>

      <h2 className="text-xl font-bold mt-6 mb-2">Your Choices Regarding Cookies</h2>
      <p className="mb-4">
        You can manage your cookie preferences through your browser settings. Most web browsers allow you
        to refuse cookies or delete specific cookies. However, if you choose to disable cookies, some parts of our
        Site may not function properly.
      </p>

      <h2 className="text-xl font-bold mt-6 mb-2">Third-Party Cookies</h2>
      <p className="mb-4">
        We may also use third-party cookies from service providers that help us analyze our Site’s performance
        or deliver advertisements. These third parties have their own privacy policies, and we encourage you to
        review them.
      </p>

      <p className="mb-4">
        We may update this Cookie Policy from time to time. We will notify you of any changes by posting the
        new policy on our Site with a new effective date.
      </p>

      <p className="mb-4">
        If you have any questions about this Cookie Policy or our practices, please <span className="text-blue-500"><Link href="/contact">contact us</Link></span>.
      </p>
    </div>
  );
}
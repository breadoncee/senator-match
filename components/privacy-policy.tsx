export const PrivacyPolicyContent = () => {
  return (
    <div className="prose prose-sm max-w-none text-gray-700">
      <h2 className="text-xl font-bold mb-4 text-primary">Privacy Policy</h2>
      <p className="mb-2 text-xs text-gray-500">
        Last Updated: {new Date().toLocaleDateString()}
      </p>

      <p className="mb-3">
        Welcome to SenatorMatch! We are committed to protecting your privacy.
        This Privacy Policy explains how we collect, use, disclose, and
        safeguard your information when you use our application (the "Service").
      </p>

      <h3 className="text-lg font-semibold mt-4 mb-2 text-primary/90">
        1. Information We Collect
      </h3>
      <p className="mb-2">
        When you use our Service, you provide responses to survey questions. We
        collect these responses to generate your candidate matches. We may also
        collect technical information automatically, such as your device type
        and usage patterns, to improve our Service.
      </p>

      <h3 className="text-lg font-semibold mt-4 mb-2 text-primary/90">
        2. How We Use Your Information
      </h3>
      <p className="mb-2">The primary ways we use your information are:</p>
      <ul className="list-disc pl-5 space-y-1 mb-2">
        <li>
          <strong>To Provide and Improve the Service:</strong> Your survey
          responses are essential for the matching algorithm to function and to
          help us refine and improve its accuracy and relevance over time.
        </li>
        <li>
          <strong>For Educational Insights:</strong> Aggregated and anonymized
          data may be used for research and educational purposes to understand
          general voter preferences and trends. Individual responses are not
          singled out in such analyses.
        </li>
        <li>
          <strong>To Enhance User Experience:</strong> We analyze usage data to
          understand how our Service is used, which helps us identify areas for
          improvement and develop new features.
        </li>
      </ul>
      <p>
        If you choose to save your results via email, we will use your email
        address solely for the purpose of sending you a link to your results.
      </p>

      <h3 className="text-lg font-semibold mt-4 mb-2 text-primary/90">
        3. Data Storage and Security
      </h3>
      <p className="mb-2">
        Your survey responses are stored on our servers. We implement reasonable
        security measures to protect your information from unauthorized access,
        alteration, disclosure, or destruction. However, please note that no
        method of transmission over the Internet or method of electronic storage
        is 100% secure.
      </p>
      <p>
        While we strive to use commercially acceptable means to protect your
        Personal Information, we cannot guarantee its absolute security.
      </p>

      <h3 className="text-lg font-semibold mt-4 mb-2 text-primary/90">
        4. Data Sharing and Disclosure
      </h3>
      <p className="mb-2">
        We do not sell, trade, or rent your personally identifiable survey
        responses to third parties.
      </p>
      <ul className="list-disc pl-5 space-y-1 mb-2">
        <li>
          <strong>Aggregated Data:</strong> We may share aggregated, anonymized
          demographic and preference information for educational or research
          purposes. This information does not identify any individual user.
        </li>
        <li>
          <strong>Service Providers:</strong> We may employ third-party
          companies and individuals to facilitate our Service (e.g., hosting,
          analytics). These third parties have access to your information only
          to perform these tasks on our behalf and are obligated not to disclose
          or use it for any other purpose.
        </li>
        <li>
          <strong>Legal Requirements:</strong> We may disclose your information
          if required to do so by law or in response to valid requests by public
          authorities.
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-4 mb-2 text-primary/90">
        5. Your Choices and Rights
      </h3>
      <p className="mb-2">
        Since the core survey does not require account creation, direct
        modification or deletion of past responses by users is not currently
        offered through the interface. Data is retained to improve the
        underlying matching models. If you have specific concerns about your
        data, please contact us.
      </p>

      <h3 className="text-lg font-semibold mt-4 mb-2 text-primary/90">
        6. Children's Privacy
      </h3>
      <p>
        Our Service is not intended for use by children under the age of 13. We
        do not knowingly collect personally identifiable information from
        children under 13.
      </p>

      <h3 className="text-lg font-semibold mt-4 mb-2 text-primary/90">
        7. Changes to This Privacy Policy
      </h3>
      <p>
        We may update our Privacy Policy from time to time. We will notify you
        of any changes by posting the new Privacy Policy on this page and
        updating the "Last Updated" date. You are advised to review this Privacy
        Policy periodically for any changes.
      </p>

      <h3 className="text-lg font-semibold mt-4 mb-2 text-primary/90">
        8. Contact Us
      </h3>
      <p>
        If you have any questions about this Privacy Policy, please contact us
        at{" "}
        <a
          href="mailto:data.datospilipinas@gmail.com"
          className="text-primary hover:underline"
        >
          data.datospilipinas@gmail.com
        </a>
        .
      </p>
    </div>
  );
};

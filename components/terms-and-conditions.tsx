export const TermsAndConditionsContent = () => {
  return (
    <div className="prose prose-sm max-w-none text-gray-700">
      <h2 className="text-xl font-bold mb-4 text-primary">
        Terms and Conditions
      </h2>
      <p className="mb-2 text-xs text-gray-500">
        Last Updated: {new Date().toLocaleDateString()}
      </p>

      <h3 className="text-lg font-semibold mt-4 mb-2 text-primary/90">
        1. Acceptance of Terms
      </h3>
      <p>
        By accessing or using SenatorMatch (the "Service"), you agree to be
        bound by these Terms and Conditions ("Terms"). If you disagree with any
        part of the terms, then you may not access the Service.
      </p>

      <h3 className="text-lg font-semibold mt-4 mb-2 text-primary/90">
        2. Description of Service
      </h3>
      <p>
        SenatorMatch provides a platform to help users identify political
        candidates whose stances may align with their own, based on responses to
        a survey. The Service is intended for informational and educational
        purposes.
      </p>

      <h3 className="text-lg font-semibold mt-4 mb-2 text-primary/90">
        3. User Conduct
      </h3>
      <p>
        You agree to use the Service only for lawful purposes and in a way that
        does not infringe the rights of, restrict, or inhibit anyone else's use
        and enjoyment of the Service. You agree to provide accurate and truthful
        information to the best of your ability when using the survey.
      </p>

      <h3 className="text-lg font-semibold mt-4 mb-2 text-primary/90">
        4. Data Privacy and Storage
      </h3>
      <p>
        Your survey responses are collected and stored by SenatorMatch. By using
        the Service, you consent to such storage. The primary purpose of storing
        this data is to improve the matching algorithm, enhance the accuracy of
        future query results, and for educational insights into voter
        preferences. We are committed to protecting your privacy; however,
        please note that responses are not entirely anonymous in the context of
        improving the service for future users based on aggregated data.
      </p>

      <h3 className="text-lg font-semibold mt-4 mb-2 text-primary/90">
        5. Intellectual Property
      </h3>
      <p>
        The Service and its original content (excluding content provided by
        users), features, and functionality are and will remain the exclusive
        property of SenatorMatch and its licensors.
      </p>

      <h3 className="text-lg font-semibold mt-4 mb-2 text-primary/90">
        6. Disclaimers
      </h3>
      <p>
        The information provided by the Service is for general guidance on
        matters of interest only. SenatorMatch endeavors to provide accurate and
        up-to-date information, but we make no representation or warranty of any
        kind, express or implied, regarding the accuracy, adequacy, validity,
        reliability, availability, or completeness of any information on the
        Service. The matches provided do not constitute an endorsement of any
        political candidate or party.
      </p>

      <h3 className="text-lg font-semibold mt-4 mb-2 text-primary/90">
        7. Limitation of Liability
      </h3>
      <p>
        In no event shall SenatorMatch, nor its directors, employees, partners,
        agents, suppliers, or affiliates, be liable for any indirect,
        incidental, special, consequential or punitive damages, including
        without limitation, loss of profits, data, use, goodwill, or other
        intangible losses, resulting from your access to or use of or inability
        to access or use the Service.
      </p>

      <h3 className="text-lg font-semibold mt-4 mb-2 text-primary/90">
        8. Governing Law
      </h3>
      <p>
        These Terms shall be governed and construed in accordance with the laws
        of the jurisdiction in which the app is primarily operated, without
        regard to its conflict of law provisions.
      </p>

      <h3 className="text-lg font-semibold mt-4 mb-2 text-primary/90">
        9. Changes to Terms
      </h3>
      <p>
        We reserve the right, at our sole discretion, to modify or replace these
        Terms at any time. If a revision is material, we will try to provide at
        least 30 days' notice prior to any new terms taking effect. What
        constitutes a material change will be determined at our sole discretion.
      </p>

      <h3 className="text-lg font-semibold mt-4 mb-2 text-primary/90">
        10. Contact Us
      </h3>
      <p>
        If you have any questions about these Terms, please contact us at{" "}
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

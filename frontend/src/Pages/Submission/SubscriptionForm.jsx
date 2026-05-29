import React from "react";
import JournalPageLayout from "../JournalPage/JournalPageLayout";
import subscriptionFormPdf from "../../assets/Subscription -pdf.pdf";

const SubscriptionForm = () => (
  <JournalPageLayout title="Subscription Form" section="Manuscript Submission">
    <p>
      IJHAT is an open-access journal, but readers, libraries, departments, and
      institutions may subscribe to receive publication updates, issue alerts,
      calls for papers, and editorial announcements.
    </p>

    <h2>Subscription Options</h2>
    <div className="journal-info-grid">
      <section className="journal-info-card">
        <h3>Author Alerts</h3>
        <p>Receive updates about submission deadlines, calls for papers, and author resources.</p>
      </section>
      <section className="journal-info-card">
        <h3>Issue Notifications</h3>
        <p>Get notified when new issues, accepted papers, and archive updates are published.</p>
      </section>
    </div>

    <h2>Step-by-Step Guidance</h2>
    <ol>
      <li>Complete the subscription form with accurate contact information.</li>
      <li>Select the type of updates you want to receive.</li>
      <li>Submit the request and check your inbox for journal communications.</li>
    </ol>

    <a
      className="journal-download-btn"
      href={subscriptionFormPdf}
      download="IJHAT-Subscription-Form.pdf"
    >
      Download Subscription Form
    </a>
  </JournalPageLayout>
);

export default SubscriptionForm;

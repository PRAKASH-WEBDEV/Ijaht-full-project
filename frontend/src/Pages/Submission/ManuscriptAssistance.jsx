import React from "react";
import JournalPageLayout from "../JournalPage/JournalPageLayout";

const ManuscriptAssistance = () => (
  <JournalPageLayout title="Manuscript Assistance" section="Manuscript Submission">
    <p>
      IJHAT provides authors with guidance to help prepare manuscripts that are
      clear, complete, and suitable for academic review. Assistance focuses on
      improving presentation and compliance with journal requirements, while
      preserving the author's responsibility for content accuracy.
    </p>

    <h2>Available Support</h2>
    <div className="journal-info-grid">
      <section className="journal-info-card">
        <h3>Formatting Guidance</h3>
        <p>Support with structure, headings, tables, figures, and reference consistency.</p>
      </section>
      <section className="journal-info-card">
        <h3>Submission Readiness</h3>
        <p>Checks for required sections, author details, abstract quality, and file preparation.</p>
      </section>
      <section className="journal-info-card">
        <h3>Editorial Clarity</h3>
        <p>Recommendations for improving readability and logical flow before review.</p>
      </section>
      <section className="journal-info-card">
        <h3>Policy Awareness</h3>
        <p>Guidance on ethics declarations, conflicts of interest, and permissions.</p>
      </section>
    </div>

    <h2>Step-by-Step Guidance</h2>
    <ol>
      <li>Review the author instructions and prepare the manuscript structure.</li>
      <li>Check all figures, tables, references, and supplementary files.</li>
      <li>Prepare ethics, consent, funding, and conflict declarations.</li>
      <li>Submit the complete file through the manuscript submission page.</li>
    </ol>

    <div className="journal-notice">
      Manuscript assistance does not guarantee acceptance. Editorial decisions
      remain independent and based on peer review and journal standards.
    </div>
  </JournalPageLayout>
);

export default ManuscriptAssistance;

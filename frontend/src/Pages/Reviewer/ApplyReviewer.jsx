import React from "react";
import JournalPageLayout from "../JournalPage/JournalPageLayout";

const ApplyReviewer = () => (
  <JournalPageLayout title="Apply as Reviewer" section="Reviewer">
    <p>
      IJHAT welcomes qualified researchers, clinicians, educators, and
      healthcare professionals who are interested in contributing to rigorous
      peer review. Reviewers play an essential role in maintaining scholarly
      quality and supporting ethical publication decisions.
    </p>

    <h2>Eligibility Criteria</h2>
    <ul>
      <li>Relevant academic qualification or professional experience in healthcare, technology, or allied sciences.</li>
      <li>Research publication experience or demonstrated subject expertise.</li>
      <li>Ability to provide fair, constructive, and timely review reports.</li>
      <li>Commitment to confidentiality, ethical conduct, and conflict disclosure.</li>
    </ul>

    <h2>Benefits of Becoming a Reviewer</h2>
    <div className="journal-info-grid">
      <section className="journal-info-card">
        <h3>Academic Contribution</h3>
        <p>Support quality research and strengthen the scholarly record.</p>
      </section>
      <section className="journal-info-card">
        <h3>Professional Recognition</h3>
        <p>Receive acknowledgement for review contributions and editorial service.</p>
      </section>
    </div>

    <h2>Reviewer Application Information</h2>
    <p>
      Applicants should provide their full name, affiliation, area of expertise,
      publication record, contact details, and a brief statement describing
      their reviewing interests.
    </p>
  </JournalPageLayout>
);

export default ApplyReviewer;

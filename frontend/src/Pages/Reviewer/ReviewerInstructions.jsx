import React from "react";
import JournalPageLayout from "../JournalPage/JournalPageLayout";

const ReviewerInstructions = () => (
  <JournalPageLayout title="Reviewer Instructions" section="Reviewer">
    <p>
      Reviewers are expected to provide objective, respectful, and evidence-based
      feedback that helps editors make decisions and helps authors improve their
      manuscripts. Reviews should focus on scholarly quality, ethical reporting,
      methodological clarity, and contribution to the field.
    </p>

    <h2>Review Guidelines</h2>
    <ol>
      <li>Assess whether the manuscript fits the journal scope.</li>
      <li>Evaluate originality, study design, data presentation, and conclusions.</li>
      <li>Check whether references are appropriate and current.</li>
      <li>Provide clear recommendations with specific comments for authors.</li>
    </ol>

    <h2>Ethical Responsibilities</h2>
    <p>
      Reviewers must disclose conflicts of interest and decline assignments when
      impartial evaluation is not possible. Suspected plagiarism, ethical
      concerns, duplicate publication, or data irregularities should be reported
      confidentially to the editor.
    </p>

    <h2>Confidentiality Requirements</h2>
    <p>
      Manuscripts under review are confidential documents. Reviewers must not
      share, discuss, cite, or use unpublished manuscript content for personal
      advantage.
    </p>

    <h2>Review Workflow</h2>
    <div className="journal-info-grid">
      <section className="journal-info-card"><h3>Invitation</h3><p>Reviewer receives an invitation based on expertise.</p></section>
      <section className="journal-info-card"><h3>Evaluation</h3><p>Reviewer assesses quality, ethics, clarity, and contribution.</p></section>
      <section className="journal-info-card"><h3>Report</h3><p>Reviewer submits comments and a recommendation.</p></section>
      <section className="journal-info-card"><h3>Decision</h3><p>Editor considers review reports and makes a decision.</p></section>
    </div>
  </JournalPageLayout>
);

export default ReviewerInstructions;

import React from "react";
import JournalPageLayout from "../JournalPage/JournalPageLayout";

const ManuscriptProcedures = () => (
  <JournalPageLayout title="Manuscript Procedures" section="Manuscript Submission">
    <p>
      IJAHT follows a structured editorial workflow to ensure fairness,
      transparency, and scholarly quality. Every submission is handled through
      defined stages from initial receipt to final publication decision.
    </p>

    <h2>Submission Workflow</h2>
    <ol>
      <li>Author uploads the manuscript and completes submission details.</li>
      <li>Editorial office checks scope, formatting, file quality, and completeness.</li>
      <li>Suitable manuscripts are assigned for peer review.</li>
      <li>Authors receive a decision: accept, minor revision, major revision, or reject.</li>
      <li>Accepted manuscripts proceed to final publication preparation.</li>
    </ol>

    <h2>Review Process</h2>
    <p>
      Reviewers evaluate originality, methodology, ethical reporting, clarity,
      references, and contribution to healthcare or technology research.
      Reviewer comments guide editorial decisions and help authors improve the
      manuscript.
    </p>

    <h2>Publication Timeline</h2>
    <div className="journal-info-grid">
      <section className="journal-info-card">
        <h3>Initial Screening</h3>
        <p>Typically completed after submission once files and metadata are verified.</p>
      </section>
      <section className="journal-info-card">
        <h3>Peer Review</h3>
        <p>Time varies by reviewer availability, manuscript complexity, and revision cycles.</p>
      </section>
      <section className="journal-info-card">
        <h3>Revision</h3>
        <p>Authors should respond clearly to each reviewer and editor comment.</p>
      </section>
      <section className="journal-info-card">
        <h3>Publication</h3>
        <p>Accepted papers are prepared for online availability after final checks.</p>
      </section>
    </div>

    <div className="journal-notice">
      Authors should monitor email regularly during peer review so revision
      requests and editorial communications are not missed.
    </div>
  </JournalPageLayout>
);

export default ManuscriptProcedures;

import React from "react";
import JournalPageLayout from "../JournalPage/JournalPageLayout";

const ReviewerAcknowledgement = () => (
  <JournalPageLayout title="Reviewer Acknowledgement" section="Reviewer">
    <p>
      IJHAT recognizes the essential contribution of peer reviewers to
      scholarly publishing. Reviewers help protect research integrity, improve
      manuscript quality, and support fair editorial decisions.
    </p>

    <h2>Recognition Program</h2>
    <p>
      The journal may acknowledge reviewers through annual recognition lists,
      certificates of contribution, reviewer appreciation notices, and editorial
      communications that highlight service to the academic community.
    </p>

    <h2>Reviewer Appreciation</h2>
    <div className="journal-info-grid">
      <section className="journal-info-card">
        <h3>Quality Service</h3>
        <p>Reviewers who submit thoughtful and timely reviews support author development.</p>
      </section>
      <section className="journal-info-card">
        <h3>Scholarly Community</h3>
        <p>Peer review strengthens trust, transparency, and reliability in published research.</p>
      </section>
    </div>

    <h2>Annual Acknowledgement</h2>
    <p>
      IJHAT may publish an annual acknowledgement of reviewers who contributed
      to the journal during the year, subject to reviewer consent and editorial
      policy.
    </p>
  </JournalPageLayout>
);

export default ReviewerAcknowledgement;

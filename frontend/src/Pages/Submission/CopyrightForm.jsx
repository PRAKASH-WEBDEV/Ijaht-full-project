import React from "react";
import JournalPageLayout from "../JournalPage/JournalPageLayout";
import copyrightFormPdf from "../../assets/copyright-pdf.pdf";

const CopyrightForm = () => (
  <JournalPageLayout title="Copyright Form" section="Manuscript Submission">
    <p>
      The copyright form confirms author agreement for publication and clarifies
      rights related to distribution, access, attribution, and reuse. Authors
      should complete the form only after ensuring that all contributors have
      approved the manuscript and publication terms.
    </p>

    <h2>Required Information</h2>
    <ul>
      <li>Manuscript title and corresponding author details.</li>
      <li>Names and affiliations of all authors.</li>
      <li>Confirmation of originality and absence of duplicate publication.</li>
      <li>Permission confirmation for any third-party material.</li>
    </ul>

    <h2>Author Responsibilities</h2>
    <p>
      Authors must ensure that the manuscript does not violate copyright,
      privacy, confidentiality, or ethical standards. All authors should agree
      to publication and understand the journal's open-access licensing terms.
    </p>

    <a
      className="journal-download-btn"
      href={copyrightFormPdf}
      download="IJAHT-Copyright-Form.pdf"
    >
      Download Copyright Form
    </a>

    <div className="journal-notice">
      The journal may request a signed copyright or publication agreement before
      final publication.
    </div>
  </JournalPageLayout>
);

export default CopyrightForm;

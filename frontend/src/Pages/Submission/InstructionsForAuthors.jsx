import React from "react";
import JournalPageLayout from "../JournalPage/JournalPageLayout";

const InstructionsForAuthors = () => (
  <JournalPageLayout title="Instructions for Authors" section="Manuscript Submission">
    <p>
      Authors should prepare manuscripts carefully before submission to ensure
      efficient editorial screening and peer review. Submissions must be
      original, ethically conducted, clearly written, and aligned with the
      journal scope in applied healthcare and technology.
    </p>

    <h2>Formatting Requirements</h2>
    <ul>
      <li>Use a clear title, structured abstract, keywords, main text, references, tables, and figures.</li>
      <li>Manuscripts should be submitted in DOC, DOCX, or PDF format unless otherwise requested.</li>
      <li>Figures and tables must be numbered, cited in the text, and supplied with descriptive captions.</li>
      <li>Use consistent heading levels and avoid unnecessary decorative formatting.</li>
    </ul>

    <h2>Submission Guidelines</h2>
    <ol>
      <li>Register or log in to the journal website.</li>
      <li>Complete all manuscript metadata including title, author name, email, and abstract.</li>
      <li>Upload the manuscript file and verify that all required information is correct.</li>
      <li>Submit the manuscript for editorial screening and peer review.</li>
    </ol>

    <h2>Referencing Style</h2>
    <p>
      References should be accurate, complete, and consistently formatted.
      Authors may follow APA, Vancouver, or another recognized biomedical
      referencing style if applied consistently throughout the manuscript.
    </p>

    <h2>Ethics Requirements</h2>
    <p>
      Research involving human participants, patient data, animals, or clinical
      interventions must include appropriate ethics approval, consent
      statements, and disclosure of conflicts of interest.
    </p>

    <div className="journal-notice">
      Manuscripts with plagiarism, duplicate publication, fabricated data, or
      undisclosed conflicts may be rejected at any stage.
    </div>
  </JournalPageLayout>
);

export default InstructionsForAuthors;

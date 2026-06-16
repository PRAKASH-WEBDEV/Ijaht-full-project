import React from "react";
import AboutPageLayout from "./AboutPageLayout";

const Policies = () => {
  return (
    <AboutPageLayout title="Journal Policies">
      <p>
        IJAHT follows editorial and publication policies that promote research
        integrity, author accountability, fair peer review, and reliable
        scholarly communication. These policies apply to authors, reviewers,
        editors, and all contributors involved in the publication process.
      </p>

      <h2>Peer Review Policy</h2>
      <p>
        Submitted manuscripts are assessed for suitability, originality,
        relevance, and compliance with journal requirements. Manuscripts that
        pass initial editorial screening are sent for peer review. Reviewer
        feedback supports editorial decisions and helps authors improve the
        clarity, accuracy, and scholarly value of their work.
      </p>

      <h2>Publication Ethics</h2>
      <p>
        Authors must submit original work and properly acknowledge all sources,
        funding, contributors, and potential conflicts of interest. Plagiarism,
        duplicate publication, data fabrication, image manipulation, undisclosed
        conflicts, and inappropriate authorship practices are not acceptable.
      </p>

      <h2>Corrections and Retractions</h2>
      <p>
        If significant errors are identified after publication, the journal may
        issue corrections, expressions of concern, or retractions as
        appropriate. Decisions are guided by the seriousness of the issue, the
        reliability of the published record, and the need for transparent
        communication with readers.
      </p>

      <h2>Conflicts of Interest</h2>
      <p>
        Authors, reviewers, and editors are expected to disclose relationships
        or circumstances that could influence their judgment. Transparent
        disclosure helps preserve trust in the editorial process and the
        published literature.
      </p>
    </AboutPageLayout>
  );
};

export default Policies;

import React from "react";
import AboutPageLayout from "./AboutPageLayout";

const Publisher = () => {
  return (
    <AboutPageLayout title="Publisher">
      <p>
        IJAHT is published with a commitment to responsible academic
        communication, editorial independence, transparent review procedures,
        and open-access dissemination. The publisher supports the journal's
        editorial team by maintaining publication workflows, digital hosting,
        author communication, and post-publication access to journal content.
      </p>

      <h2>Publisher Responsibilities</h2>
      <ul>
        <li>
          Maintaining the journal website, submission infrastructure, and
          access to published article records.
        </li>
        <li>
          Supporting editors and reviewers while preserving editorial
          independence and unbiased decision-making.
        </li>
        <li>
          Ensuring that publication processes are aligned with recognized
          standards for ethics, transparency, and scholarly publishing.
        </li>
        <li>
          Communicating clearly with authors regarding submission status,
          revision requirements, publication decisions, and article access.
        </li>
      </ul>

      <h2>Editorial Independence</h2>
      <p>
        Editorial decisions are based on scholarly merit, ethical compliance,
        originality, clarity, and relevance to the journal scope. Commercial,
        institutional, or personal interests must not influence acceptance,
        rejection, or reviewer selection.
      </p>
    </AboutPageLayout>
  );
};

export default Publisher;

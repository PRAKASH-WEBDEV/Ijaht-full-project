import React from "react";
import JournalPageLayout from "../JournalPage/JournalPageLayout";
import CollaborationPartners from "./CollaborationPartners";

const PhysioElite = () => (
  <JournalPageLayout title="Physio Elite Collaboration" section="Collaborations">
    <p>
      The Physio Elite collaboration focuses on strengthening the connection
      between rehabilitation science, physiotherapy practice, clinical
      education, and applied healthcare research. It supports IJAHT's aim to
      publish research that has practical value for healthcare professionals
      and patient-centered care.
    </p>

    <h2>Collaboration Overview</h2>
    <p>
      This partnership encourages contributions from physiotherapy, sports
      rehabilitation, musculoskeletal care, neurological rehabilitation, and
      allied health domains. It helps promote high-quality research that can
      inform clinical decision-making and improve therapeutic outcomes.
    </p>

    <h2>Partnership Objectives</h2>
    <div className="journal-info-grid">
      <section className="journal-info-card">
        <h3>Clinical Relevance</h3>
        <p>Promote research that bridges rehabilitation evidence and practice.</p>
      </section>
      <section className="journal-info-card">
        <h3>Professional Engagement</h3>
        <p>Encourage physiotherapy professionals to contribute to scholarly publishing.</p>
      </section>
    </div>

    <h2>Benefits for Researchers</h2>
    <ul>
      <li>Focused visibility for rehabilitation and physiotherapy research.</li>
      <li>Opportunities for special issues and practice-oriented article collections.</li>
      <li>Editorial awareness for authors preparing clinical research manuscripts.</li>
      <li>Enhanced engagement with applied healthcare readers.</li>
    </ul>

    <h2>Future Initiatives</h2>
    <p>
      IJAHT and Physio Elite plan to support research literacy sessions,
      clinical evidence discussions, and collaborative publication activities
      that encourage rigorous reporting in rehabilitation sciences.
    </p>

    <CollaborationPartners />
  </JournalPageLayout>
);

export default PhysioElite;

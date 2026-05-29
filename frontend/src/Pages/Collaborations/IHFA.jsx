import React from "react";
import JournalPageLayout from "../JournalPage/JournalPageLayout";

const IHFA = () => (
  <JournalPageLayout title="IHFA Collaboration" section="Collaborations">
    <p>
      The IHFA collaboration supports IJHAT's commitment to connecting applied
      healthcare research with professional communities, clinical practice, and
      interdisciplinary education. The partnership encourages knowledge
      exchange between researchers, healthcare practitioners, and institutions
      working to improve patient care and healthcare delivery.
    </p>

    <h2>Collaboration Overview</h2>
    <p>
      Through this collaboration, IJHAT promotes scholarly communication,
      evidence-based practice, and academic engagement in healthcare and allied
      health fields. The relationship is intended to strengthen research
      visibility and create opportunities for professional dialogue.
    </p>

    <h2>Partnership Objectives</h2>
    <div className="journal-info-grid">
      <section className="journal-info-card">
        <h3>Research Exchange</h3>
        <p>Encourage the sharing of applied healthcare findings and clinical insights.</p>
      </section>
      <section className="journal-info-card">
        <h3>Academic Development</h3>
        <p>Support author education, reviewer development, and publication awareness.</p>
      </section>
    </div>

    <h2>Benefits for Researchers</h2>
    <ul>
      <li>Improved access to professional healthcare networks.</li>
      <li>Greater visibility for clinically relevant research outputs.</li>
      <li>Opportunities to participate in academic programs and knowledge events.</li>
      <li>Support for interdisciplinary collaboration across health science areas.</li>
    </ul>

    <h2>Future Initiatives</h2>
    <p>
      Planned initiatives include joint academic webinars, special thematic
      collections, reviewer orientation activities, and publication guidance
      sessions for early-career researchers.
    </p>
  </JournalPageLayout>
);

export default IHFA;

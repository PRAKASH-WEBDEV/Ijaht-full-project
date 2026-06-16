import React from "react";
import AboutPageLayout from "./AboutPageLayout";

const Mission = () => {
  return (
    <AboutPageLayout title="Mission & Vision">
      <p>
        The International Journal of Allied Healthcare and Technology exists to
        advance rigorous scholarship across allied health, clinical practice,
        biomedical inquiry, health systems, and applied technology. The journal
        provides an international platform for research that strengthens patient
        care, professional practice, public health understanding, and
        evidence-informed decision-making.
      </p>

      <p>
        The journal welcomes contributions from allied healthcare disciplines
        and clinical sciences, including rehabilitation, nursing, physiotherapy,
        diagnostics, pharmacy, laboratory sciences, community health, medical
        education, and interdisciplinary clinical research. Submissions should
        demonstrate relevance to healthcare professionals, institutions, and
        populations served by contemporary care systems.
      </p>

      <p>
        IJAHT also encourages scholarship in Artificial Intelligence,
        Healthcare Technology, Computer Science, Data Science, Digital Health,
        and Innovation where these fields contribute to safer, smarter, and more
        effective healthcare delivery. The journal supports research on digital
        tools, intelligent systems, informatics, health data, and technology-led
        models of clinical and public health improvement.
      </p>

      <p>
        All manuscripts are handled through peer review, ethical editorial
        practice, and quality-focused assessment. IJAHT is committed to
        transparent publication standards, responsible research conduct, and
        global dissemination of work that can create reliable scholarly and
        practical impact.
      </p>

      <div className="about-highlight-grid">
        <section>
          <h3>Integrity</h3>
          <p>
            We uphold editorial independence, fair peer review, transparent
            decision-making, and clear publication ethics.
          </p>
        </section>

        <section>
          <h3>Accessibility</h3>
          <p>
            We support open access so that published knowledge can be read,
            shared, and applied by the widest possible scholarly audience.
          </p>
        </section>

        <section>
          <h3>Relevance</h3>
          <p>
            We prioritize research with methodological strength and practical
            value for healthcare professionals, institutions, and communities.
          </p>
        </section>
      </div>
    </AboutPageLayout>
  );
};

export default Mission;

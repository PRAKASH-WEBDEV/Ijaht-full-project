import React from "react";
import AboutPageLayout from "./AboutPageLayout";

const Mission = () => {
  return (
    <AboutPageLayout title="Mission & Vision">
      <p>
        The International Journal of Applied Healthcare and Technology (IJHAT)
        exists to support rigorous, useful, and ethically conducted research at
        the intersection of healthcare practice, biomedical science, clinical
        innovation, public health, and applied technology. The journal provides
        an open-access platform for researchers, clinicians, educators, and
        policy professionals who are working to improve health systems and
        patient outcomes through evidence-based inquiry.
      </p>

      <h2>Our Mission</h2>
      <p>
        Our mission is to publish peer-reviewed research that contributes
        meaningfully to scientific understanding and practical healthcare
        improvement. IJHAT encourages submissions that demonstrate clear
        methodology, transparent reporting, clinical or technological relevance,
        and respect for research ethics. We aim to make dependable research
        accessible to readers across institutions, disciplines, and geographic
        regions.
      </p>

      <h2>Our Vision</h2>
      <p>
        IJHAT seeks to become a trusted international forum for applied
        healthcare scholarship. Our vision is to connect academic research with
        real-world healthcare implementation, helping authors share work that
        informs clinical decision-making, strengthens health technology
        adoption, and supports responsible innovation.
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

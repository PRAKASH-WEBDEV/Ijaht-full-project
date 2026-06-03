import React from "react";
import collabLogoOne from "../../assets/collab/Collab-logo-01.jpg";
import collabLogoTwo from "../../assets/collab/collab-logo-02.jpeg";
import "./Collaborations.css";

const partners = [
  {
    name: "Collaboration Partner 1",
    logo: collabLogoOne,
  },
  {
    name: "Collaboration Partner 2",
    logo: collabLogoTwo,
  },
];

const CollaborationPartners = () => (
  <section className="collaboration-partners" aria-labelledby="collaboration-partners-title">
    <h2 id="collaboration-partners-title">Collaboration Partners</h2>

    <div className="collaboration-logo-grid">
      {partners.map((partner) => (
        <div className="collaboration-logo-card" key={partner.name}>
          <img src={partner.logo} alt={partner.name} />
        </div>
      ))}
    </div>
  </section>
);

export default CollaborationPartners;

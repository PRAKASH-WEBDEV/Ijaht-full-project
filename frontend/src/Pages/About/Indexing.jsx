import React from "react";
import AboutPageLayout from "./AboutPageLayout";

const Indexing = () => {
  return (
    <AboutPageLayout title="Abstracting & Indexing">
      <p>
        IJHAT is committed to improving the visibility, discoverability, and
        long-term accessibility of published research. Abstracting and indexing
        services are essential to scholarly communication because they help
        researchers locate relevant work, track citations, and assess the
        contribution of published articles within a field.
      </p>

      <h2>Discoverability Strategy</h2>
      <p>
        The journal follows metadata and publication practices that support
        discoverability through academic search engines, digital library
        systems, institutional repositories, and indexing platforms. Article
        records are prepared with clear titles, author information, abstracts,
        keywords, publication dates, and persistent bibliographic details.
      </p>

      <h2>Indexing Development</h2>
      <p>
        IJHAT continues to work toward inclusion in appropriate abstracting and
        indexing databases that align with the journal's academic scope and
        publication standards. Applications to indexing services are pursued in
        accordance with each database's selection criteria, including editorial
        quality, publication regularity, peer-review transparency, and ethical
        publishing practice.
      </p>

      <div className="about-note">
        <strong>Note:</strong> Indexing information should always be verified
        from the journal's official announcements and database records before
        being used in institutional reporting or author documentation.
      </div>
    </AboutPageLayout>
  );
};

export default Indexing;

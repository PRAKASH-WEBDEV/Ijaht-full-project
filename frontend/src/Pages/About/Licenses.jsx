import React from "react";
import AboutPageLayout from "./AboutPageLayout";

const Licenses = () => {
  return (
    <AboutPageLayout title="Licenses">
      <p>
        IJHAT supports open-access publication to encourage the responsible
        sharing and reuse of scholarly work. Licensing terms define how readers,
        authors, institutions, and other users may access, distribute, and cite
        published articles while preserving appropriate credit to the original
        authors.
      </p>

      <h2>Open-Access Use</h2>
      <p>
        Articles published by the journal are intended to be freely accessible
        online. Readers may read, download, share, and cite published work in
        accordance with the applicable license terms and with proper attribution
        to the authors, article title, journal name, and publication details.
      </p>

      <h2>Author Rights</h2>
      <p>
        Authors retain scholarly recognition for their work and are encouraged
        to share the final published version through appropriate academic and
        institutional channels. Authors are responsible for ensuring that any
        third-party material included in their manuscript has the necessary
        permissions for publication and reuse.
      </p>

      <h2>Responsible Reuse</h2>
      <p>
        Reuse of published material must not misrepresent the original research,
        alter the authors' conclusions in a misleading manner, or remove
        attribution. Any reuse for educational, research, or professional
        purposes should preserve citation integrity and respect applicable
        license conditions.
      </p>
    </AboutPageLayout>
  );
};

export default Licenses;

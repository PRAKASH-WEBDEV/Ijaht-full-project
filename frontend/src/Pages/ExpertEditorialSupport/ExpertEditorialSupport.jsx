import React, { useEffect, useState } from "react";
import JournalPageLayout from "../JournalPage/JournalPageLayout";
import { api, assetUrl } from "../../config/api";
import "./ExpertEditorial.css";

const editorialServices = [
  {
    title: "Peer Review Management",
    text: "The editorial team coordinates fair, timely, and confidential peer review by selecting suitable reviewers and evaluating reports with academic independence.",
  },
  {
    title: "Manuscript Quality Assessment",
    text: "Submissions are screened for journal scope, research originality, reporting clarity, methodological consistency, and ethical compliance before review.",
  },
  {
    title: "Publication Ethics Oversight",
    text: "Editorial checks include plagiarism awareness, conflict of interest disclosure, authorship responsibility, research ethics statements, and correction policies.",
  },
  {
    title: "Author Communication",
    text: "Authors receive structured communication during screening, review, revision, acceptance, and publication preparation stages.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Initial Editorial Screening",
    text: "The manuscript is checked for scope, completeness, formatting, originality, and essential ethical declarations.",
  },
  {
    number: "02",
    title: "Reviewer Assignment",
    text: "Suitable subject experts are invited to evaluate the scholarly quality, methodology, clarity, and relevance of the submission.",
  },
  {
    number: "03",
    title: "Editorial Decision",
    text: "Editors consider reviewer comments and make a decision such as revision, acceptance, or rejection based on journal standards.",
  },
  {
    number: "04",
    title: "Publication Preparation",
    text: "Accepted manuscripts proceed through final checks for metadata, references, article presentation, and online publication readiness.",
  },
];

// Build initials for members without a photo.
const getInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

const ExpertEditorialSupport = () => {
  const [boardMembers, setBoardMembers] = useState([]);
  const [loadingMembers, setLoadingMembers] = useState(true);

  useEffect(() => {
    api
      .get("/api/board-members")
      .then((res) => setBoardMembers(Array.isArray(res.data) ? res.data : []))
      .catch((err) => console.error("Board members fetch error:", err))
      .finally(() => setLoadingMembers(false));
  }, []);

  return (
    <JournalPageLayout title="Editorial Board" section="Editorial">
      <p>
        The IJAHT editorial board supports the journal's mission to publish
        reliable, ethical, and practically relevant research in applied
        healthcare and technology. Editorial oversight ensures that manuscripts
        are handled through transparent processes and evaluated according to
        scholarly merit.
      </p>

      <h2>Editorial Excellence</h2>
      <p>
        The journal follows a structured editorial workflow designed to maintain
        academic quality, protect research integrity, and support authors during
        the publication process. Editors, reviewers, and publication staff work
        together to ensure that accepted manuscripts meet professional journal
        standards.
      </p>

      <div className="editorial-service-grid">
        {editorialServices.map((service) => (
          <section className="editorial-service-card" key={service.title}>
            <h3>{service.title}</h3>
            <p>{service.text}</p>
          </section>
        ))}
      </div>

      <h2>Editorial Responsibilities</h2>
      <ul>
        <li>Maintain independent and unbiased editorial decision-making.</li>
        <li>Ensure that manuscripts are reviewed by appropriate subject experts.</li>
        <li>Protect confidentiality during peer review and editorial handling.</li>
        <li>Promote ethical publishing practices and transparent author communication.</li>
        <li>Support corrections, clarifications, and post-publication integrity when required.</li>
      </ul>

      <h2>Editorial Process</h2>
      <div className="editorial-process-grid">
        {processSteps.map((step) => (
          <section className="editorial-process-card" key={step.number}>
            <span>{step.number}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </section>
        ))}
      </div>

      <div className="journal-notice">
        Editorial decisions are based on originality, methodological quality,
        ethical compliance, relevance to the journal scope, reviewer feedback,
        and the overall contribution of the manuscript to healthcare and
        technology research.
      </div>

      <h2>Board Members</h2>

      {loadingMembers ? (
        <div className="board-placeholder">Loading board members...</div>
      ) : boardMembers.length === 0 ? (
        <div className="board-placeholder">
          Board member profiles will be published soon.
        </div>
      ) : (
        <div className="board-member-grid">
          {boardMembers.map((member) => (
            <section className="board-member-card" key={member._id}>
              <div className="board-member-photo">
                {member.photo?.path ? (
                  <img src={assetUrl(member.photo.path)} alt={member.name} />
                ) : (
                  <span className="board-member-initials">
                    {getInitials(member.name)}
                  </span>
                )}
              </div>

              <h3>{member.name}</h3>

              {member.designation && (
                <p className="board-member-designation">{member.designation}</p>
              )}

              {member.qualification && (
                <p className="board-member-qualification">
                  {member.qualification}
                </p>
              )}

              {member.affiliation && (
                <p className="board-member-affiliation">{member.affiliation}</p>
              )}
            </section>
          ))}
        </div>
      )}
    </JournalPageLayout>
  );
};

export default ExpertEditorialSupport;

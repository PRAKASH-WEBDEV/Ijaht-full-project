import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Archives.css";

const API_URL = "http://localhost:3000";

const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "N/A";

const Archives = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/manuscript/archive`)
      .then((res) => setPapers(Array.isArray(res.data) ? res.data : []))
      .catch((err) => console.error("Archive fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="archives-container">
      <header className="page-header">
        <h1>Archives</h1>
        <p className="breadcrumb">Home / Archives</p>
      </header>

      <section className="archives-intro">
        <div className="section-title">
          <span className="blue-bar"></span>
          <h2>Published Articles</h2>
        </div>
        <p>
          Browse peer-reviewed IJHAT articles uploaded and approved by the
          editorial office. Newest published records appear first.
        </p>
      </section>

      {loading && (
        <div className="archive-empty-state">Loading published articles...</div>
      )}

      {!loading && papers.length === 0 && (
        <div className="archive-empty-state">
          No published articles are available yet.
        </div>
      )}

      {!loading && papers.length > 0 && (
        <div className="archives-list">
          <div className="volumes-grid article-archive-grid">
            {papers.map((paper) => (
              <article key={paper._id} className="archive-card article-card">
                <div className="card-right">
                  <h4>{paper.articleTitle}</h4>
                  <p className="issue-name">Authors: {paper.authorName}</p>

                  {paper.abstract && (
                    <p className="archive-abstract">{paper.abstract}</p>
                  )}

                  <div className="archive-meta-grid">
                    <span>DOI: {paper.doi || "N/A"}</span>
                    <span>Volume: {paper.volume || "N/A"}</span>
                    <span>Issue: {paper.issueNumber || "N/A"}</span>
                    <span>Issue Date: {formatDate(paper.issueDate)}</span>
                    <span>Upload Date: {formatDate(paper.createdAt)}</span>
                    <span>
                      Publication Date: {formatDate(paper.publicationDate)}
                    </span>
                  </div>

                  {paper.manuscriptFile?.path && (
                    <a
                      href={`${API_URL}/${paper.manuscriptFile.path}`}
                      target="_blank"
                      rel="noreferrer"
                      download
                      className="view-btn archive-download-link"
                    >
                      Download PDF
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Archives;

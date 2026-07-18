import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Sidebar from "../../component/Sidebar/Sidebar";
import Reveal from "../../component/ui/Reveal";
import {
  CalendarDays,
  ArrowRight,
  Check,
  ShieldCheck,
} from "lucide-react";
import { api, assetUrl } from "../../config/api";

const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "N/A";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loadingArticles, setLoadingArticles] = useState(true);
  const [visitorCount, setVisitorCount] = useState(null);

  useEffect(() => {
    api
      .get("/api/manuscript/archive?limit=3")
      .then((res) => setArticles(Array.isArray(res.data) ? res.data : []))
      .catch((err) => console.error("Latest articles fetch error:", err))
      .finally(() => setLoadingArticles(false));
  }, []);

  useEffect(() => {
    const sessionKey = "ijahtVisitorCounted";
    const hasVisited = sessionStorage.getItem(sessionKey) === "true";

    api
      .post("/api/visitors", { increment: !hasVisited })
      .then((res) => {
        setVisitorCount(Number(res.data?.count) || 0);
        if (!hasVisited) {
          sessionStorage.setItem(sessionKey, "true");
        }
      })
      .catch((err) => console.error("Visitor counter error:", err));
  }, []);

  return (
    <>
      <section className="hero">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
        >
          <source
            src="https://res.cloudinary.com/dkb4t6ank/video/upload/v1784374373/Create_a_premium_cinematic_her_nqgph5.mp4"
            type="video/mp4"
          />
        </video>

        <div className="hero-inner">
          <div className="hero-copy">
            <span className="hero-eyebrow">
              <ShieldCheck size={16} />
              Peer-Reviewed &middot; Open Access &middot; International
            </span>

            <p className="hero-title">
              Advancing Allied Healthcare &amp; Technology Through Rigorous
              Science
            </p>

            <p className="hero-sub">
              A peer-reviewed, open-access journal where clinicians, researchers,
              and technologists publish work that moves evidence-based care
              forward. Rigorous Research. Reliable Insights. Real Impact.
            </p>

            <div className="hero-cta">
              <Link to="/submit-manuscript" className="btn btn-lg btn-on-dark">
                Submit Manuscript
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/issues/current"
                className="btn btn-lg btn-outline-light"
              >
                Browse Current Issue
              </Link>
            </div>

            <ul className="hero-trust">
              <li>
                <Check size={16} /> Open-access &amp; freely available
              </li>
              <li>
                <Check size={16} /> Double-blind peer review
              </li>
              <li>
                <Check size={16} /> International editorial board
              </li>
            </ul>
          </div>

          <aside className="hero-card">
            <div className="hero-card-metric">
              <span className="hero-card-num">
                {visitorCount === null
                  ? "…"
                  : visitorCount.toLocaleString("en-IN")}
              </span>
              <span className="hero-card-label">Total Visitors</span>
            </div>

            <ul className="hero-card-list">
              <li>
                <Check size={16} /> Rigorous, transparent editorial process
              </li>
              <li>
                <Check size={16} /> Allied health, clinical &amp; tech research
              </li>
              <li>
                <Check size={16} /> Ethical, responsible publishing standards
              </li>
            </ul>

            <Link to="/issues/current" className="hero-card-link">
              View the current issue
              <ArrowRight size={16} />
            </Link>
          </aside>
        </div>
      </section>

      <main className="main-section">
        <div className="main-container">
          <div className="content-area">
            <Reveal className="content-card">
              <div className="section-header">
                <h2>About the Journal</h2>
              </div>

              <p>
                The International Journal of Allied Healthcare and Technology
                (IJAHT) is a peer-reviewed, open-access platform dedicated to
                advancing research across the ever-evolving landscape of
                healthcare and technology. Built on the philosophy of{" "}
                <em>Rigorous Research. Reliable Insights. Real Impact.</em>,
                IJAHT serves as a trusted bridge between scholars, clinicians,
                and technologists who believe that quality research must do more
                than sit in archives — it must move the world forward.
              </p>

              <p>
                From physiotherapy and occupational therapy to medical imaging,
                nutrition, and respiratory care, IJAHT provides allied health
                professionals a rigorous academic home for their discoveries. We
                recognize that the backbone of any healthcare system is its
                allied workforce, and our journal is committed to amplifying
                evidence-based practice across every discipline that sits at the
                intersection of science and human wellbeing. Every manuscript we
                publish carries the weight of reliable insights that clinicians
                can trust at the bedside.
              </p>
            </Reveal>

            <Reveal className="content-card">
              <div className="section-header">
                <h2>Current Issue</h2>

                <Link to="/issues/current" className="view-link">
                  View All
                  <ArrowRight size={16} />
                </Link>
              </div>

              {loadingArticles && (
                <p className="article-empty-state">Loading latest articles...</p>
              )}

              {!loadingArticles && articles.length === 0 && (
                <p className="article-empty-state">
                  No published articles are available yet.
                </p>
              )}

              {!loadingArticles &&
                articles.map((article) => (
                  <div className="issue-card" key={article._id}>
                    <span className="issue-badge">Published Article</span>

                    <h3>{article.articleTitle}</h3>

                    <p className="authors">{article.authorName}</p>

                    {article.abstract && (
                      <p className="article-abstract">{article.abstract}</p>
                    )}

                    <div className="article-meta-grid">
                      <span>DOI: {article.doi || "N/A"}</span>
                      <span>Volume: {article.volume || "N/A"}</span>
                      <span>Issue: {article.issueNumber || "N/A"}</span>
                      <span>Issue Date: {formatDate(article.issueDate)}</span>
                      <span>Upload Date: {formatDate(article.createdAt)}</span>
                      <span>
                        Publication Date: {formatDate(article.publicationDate)}
                      </span>
                    </div>

                    <div className="issue-meta">
                      <span>
                        <CalendarDays size={15} />
                        {formatDate(article.publicationDate || article.createdAt)}
                      </span>

                      {article.manuscriptFile?.path && (
                        <a
                          href={assetUrl(article.manuscriptFile.path)}
                          target="_blank"
                          rel="noreferrer"
                          download
                        >
                          Download PDF
                        </a>
                      )}
                    </div>
                  </div>
                ))}
            </Reveal>
          </div>

          <Sidebar />
        </div>
      </main>
    </>
  );
};

export default Home;

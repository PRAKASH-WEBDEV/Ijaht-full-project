import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Sidebar from "../../component/Sidebar/Sidebar";
import { CalendarDays, ArrowRight } from "lucide-react";
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
        <div className="hero-overlay">
          <div className="hero-content">
            <div className="hero-left">
              <p>Rigorous Research. Reliable Insights. Real Impact.</p>
            </div>

            <div className="hero-right">
              <div className="stats-card">
                <div className="stat-box">
                  <h3>{visitorCount === null ? "..." : visitorCount.toLocaleString("en-IN")}</h3>
                  <p>Visitor Count</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="main-section">
        <div className="main-container">
          <div className="content-area">
            <div className="content-card">
              <div className="section-header">
                <h2>About Journal</h2>
              </div>

              <p>
                International Journal of Allied Healthcare and Technology is an
                international peer reviewed open access journal publishing
                high-quality original research in applied healthcare,
                technology, biomedical sciences, and clinical innovation.
              </p>

              <p>
                The journal aims to foster scientific exchange and innovation by
                providing researchers with a trusted platform for scholarly
                communication and global visibility.
              </p>
            </div>

            <div className="content-card">
              <div className="section-header">
                <h2>Current Issues</h2>

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
            </div>
          </div>

          <Sidebar />
        </div>
      </main>
    </>
  );
};

export default Home;

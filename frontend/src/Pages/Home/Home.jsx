import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Home.css";
import Sidebar from "../../component/Sidebar/Sidebar";
import { CalendarDays, FileText, ArrowRight, BookOpen } from "lucide-react";

const API_URL = "http://localhost:3000";

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

  useEffect(() => {
    axios
      .get(`${API_URL}/api/manuscript/archive?limit=3`)
      .then((res) => setArticles(Array.isArray(res.data) ? res.data : []))
      .catch((err) => console.error("Latest articles fetch error:", err))
      .finally(() => setLoadingArticles(false));
  }, []);

  return (
    <>
      <section className="hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <div className="hero-left">
              <span className="hero-badge">
                International Peer Reviewed Journal
              </span>

              <h1>
                International Journal of Applied Healthcare
                <span> and Technology</span>
              </h1>

              <p>
                A high-impact open access journal dedicated to publishing
                innovative research in applied healthcare, biomedical sciences,
                digital health, and technology-driven clinical practice.
              </p>

              <div className="hero-buttons">
                <Link to="/submit-manuscript" className="primary-btn">
                  <FileText size={18} />
                  Submit Paper
                </Link>

                <Link to="/issues/current" className="secondary-btn">
                  <BookOpen size={18} />
                  Current Issue
                </Link>
              </div>
            </div>

            <div className="hero-right">
              <div className="stats-card">
                <div className="stat-box">
                  <h3>18+</h3>
                  <p>Years Publishing</p>
                </div>

                <div className="stat-box">
                  <h3>260</h3>
                  <p>i10 Index</p>
                </div>

                <div className="stat-box">
                  <h3>30+</h3>
                  <p>Google Scholar H-Index</p>
                </div>

                <div className="stat-box">
                  <h3>Open</h3>
                  <p>Access Journal</p>
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
                International Journal of Applied Healthcare and Technology is an
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
                <h2>Latest Published Articles</h2>

                <Link to="/issues/archive" className="view-link">
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
                          href={`${API_URL}/${article.manuscriptFile.path}`}
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

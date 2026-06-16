import React, { useEffect, useState } from "react";
import JournalPageLayout from "../JournalPage/JournalPageLayout";
import { api, assetUrl } from "../../config/api";

const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "N/A";

const CurrentIssue = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/api/manuscript/archive?limit=6")
      .then((res) => setArticles(Array.isArray(res.data) ? res.data : []))
      .catch((err) => console.error("Current issue fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  const latest = articles[0];

  return (
    <JournalPageLayout title="Current Issue" section="Issues">
      <div className="journal-meta-list">
        <div>
          <span>Volume</span>
          <strong>{latest?.volume || "N/A"}</strong>
        </div>
        <div>
          <span>Issue</span>
          <strong>{latest?.issueNumber || "N/A"}</strong>
        </div>
        <div>
          <span>Published</span>
          <strong>{formatDate(latest?.publicationDate)}</strong>
        </div>
      </div>

      <p>
        The current issue presents the latest approved IJAHT articles from the
        editorial database.
      </p>

      <h2>Featured Articles</h2>
      <div className="article-list-journal">
        {loading && (
          <section className="article-card-journal">
            <p>Loading current issue articles...</p>
          </section>
        )}

        {!loading && articles.length === 0 && (
          <section className="article-card-journal">
            <p>No published articles are available yet.</p>
          </section>
        )}

        {!loading &&
          articles.map((article) => (
            <section className="article-card-journal" key={article._id}>
              <h3>{article.articleTitle}</h3>
              <p>{article.authorName}</p>
              <div className="article-meta-line">
                <span>DOI: {article.doi || "N/A"}</span>
                <span>Volume: {article.volume || "N/A"}</span>
                <span>Issue: {article.issueNumber || "N/A"}</span>
                <span>Issue Date: {formatDate(article.issueDate)}</span>
                <span>Upload Date: {formatDate(article.createdAt)}</span>
                <span>
                  Publication Date: {formatDate(article.publicationDate)}
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
            </section>
          ))}
      </div>
    </JournalPageLayout>
  );
};

export default CurrentIssue;

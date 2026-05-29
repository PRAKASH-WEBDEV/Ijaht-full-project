import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import JournalPageLayout from "../JournalPage/JournalPageLayout";

const API_URL = "http://localhost:3000";

const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "N/A";

const IssueArchive = () => {
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/manuscript/archive`)
      .then((res) => setArticles(Array.isArray(res.data) ? res.data : []))
      .catch((err) => console.error("Issue archive fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredItems = useMemo(() => {
    const value = query.toLowerCase();
    return articles.filter((item) =>
      `${item.articleTitle} ${item.authorName} ${item.doi} ${item.volume} ${item.issueNumber}`
        .toLowerCase()
        .includes(value)
    );
  }, [articles, query]);

  return (
    <JournalPageLayout title="Archive" section="Issues">
      <p>
        The archive provides access to previous IJHAT published articles using
        real approved records from the editorial database.
      </p>

      <div className="archive-filter">
        <input
          type="search"
          placeholder="Search by title, author, volume, issue, or DOI"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      <div className="article-list-journal">
        {loading && (
          <section className="article-card-journal">
            <p>Loading published articles...</p>
          </section>
        )}

        {!loading && filteredItems.length === 0 && (
          <section className="article-card-journal">
            <p>No published articles are available yet.</p>
          </section>
        )}

        {!loading &&
          filteredItems.map((item) => (
            <section className="article-card-journal" key={item._id}>
              <h3>{item.articleTitle}</h3>
              <p>{item.authorName}</p>
              {item.abstract && <p>{item.abstract}</p>}
              <div className="article-meta-line">
                <span>DOI: {item.doi || "N/A"}</span>
                <span>Volume: {item.volume || "N/A"}</span>
                <span>Issue: {item.issueNumber || "N/A"}</span>
                <span>Issue Date: {formatDate(item.issueDate)}</span>
                <span>Upload Date: {formatDate(item.createdAt)}</span>
                <span>Publication Date: {formatDate(item.publicationDate)}</span>
                {item.manuscriptFile?.path && (
                  <a
                    href={`${API_URL}/${item.manuscriptFile.path}`}
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

export default IssueArchive;

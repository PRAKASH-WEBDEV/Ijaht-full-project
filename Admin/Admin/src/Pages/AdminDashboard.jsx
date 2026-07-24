import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  FaAngleLeft,
  FaAngleRight,
  FaBars,
  FaCheck,
  FaDownload,
  FaEye,
  FaFileAlt,
  FaInbox,
  FaRegClock,
  FaSearch,
  FaSignOutAlt,
  FaTimes,
  FaTrash,
  FaUserEdit,
  FaUsers,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import { api, assetUrl } from "../config/api";
import useSidebarCollapse from "../hooks/useSidebarCollapse";

const itemsPerPage = 6;

const statusOptions = [
  { key: "all", label: "All Submissions" },
  { key: "pending", label: "Pending Review" },
  { key: "approved", label: "Approved Papers" },
  { key: "rejected", label: "Rejected Papers" },
];

const statusLabels = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
};

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
  },
});

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [pdfSubmission, setPdfSubmission] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const res = await api.get("/api/manuscript/admin/list", getAuthConfig());
      setSubmissions(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load submissions. Please check backend connection."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const metrics = useMemo(() => {
    const approved = submissions.filter((item) => item.status === "approved").length;
    const rejected = submissions.filter((item) => item.status === "rejected").length;
    const pending = submissions.filter((item) => item.status === "pending").length;

    return {
      total: submissions.length,
      approved,
      rejected,
      pending,
    };
  }, [submissions]);

  const filteredData = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return submissions
      .filter((item) => filterStatus === "all" || item.status === filterStatus)
      .filter((item) => {
        if (!normalizedSearch) return true;

        return [item.articleTitle, item.authorName, item.email]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(normalizedSearch));
      });
  }, [filterStatus, searchTerm, submissions]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  const currentItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const latestSubmission = submissions[0];

  const pdfFile = pdfSubmission?.manuscriptFile;
  const pdfUrl = pdfFile?.path ? assetUrl(pdfFile.path) : "";
  const pdfPreviewable =
    !!pdfUrl &&
    (pdfFile?.mimetype === "application/pdf" ||
      /\.pdf$/i.test(pdfFile?.path || "") ||
      /^image\//.test(pdfFile?.mimetype || ""));

  const handleStatusChange = (status) => {
    setFilterStatus(status);
    setCurrentPage(1);
    setSidebarOpen(false);
  };

  const runAction = async (key, action) => {
    setActionLoading(key);
    setError("");

    try {
      await action();
      await fetchData();
    } catch (err) {
      setError(err.response?.data?.message || "Action failed. Please try again.");
    } finally {
      setActionLoading("");
    }
  };

  const approveManuscript = (id) => {
    runAction(`approve-${id}`, () =>
      api.put(`/api/manuscript/${id}/approve`, {}, getAuthConfig())
    );
  };

  const deleteManuscript = (id) => {
    if (!window.confirm("Delete this manuscript permanently?")) return;

    runAction(`delete-${id}`, () =>
      api.delete(`/api/manuscript/${id}`, getAuthConfig())
    );
  };

  const openRejectModal = (submission) => {
    setSelectedSubmission(submission);
    setRejectReason("");
    setShowModal(true);
  };

  const confirmReject = async () => {
    if (!rejectReason.trim()) {
      setError("Please enter a rejection reason.");
      return;
    }

    await runAction(`reject-${selectedSubmission._id}`, () =>
      api.put(
        `/api/manuscript/${selectedSubmission._id}/reject`,
        { reason: rejectReason },
        getAuthConfig()
      )
    );

    setShowModal(false);
    setRejectReason("");
    setSelectedSubmission(null);
  };

  const openPdf = (submission) => setPdfSubmission(submission);
  const closePdf = () => setPdfSubmission(null);

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  const getInitials = (name) =>
    (name || "?")
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("") || "?";

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "N/A";

  return (
    <div className="admin-shell">
      <div
        className={`admin-sidebar-overlay ${sidebarOpen ? "open" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="brand-block">
          <div className="brand-mark">IJ</div>
          <div>
            <h1>IJAHT</h1>
            <p>Editorial Admin</p>
          </div>
        </div>

        <nav className="admin-nav" aria-label="Admin navigation">
          {statusOptions.map((option) => (
            <button
              key={option.key}
              className={filterStatus === option.key ? "active" : ""}
              onClick={() => handleStatusChange(option.key)}
              type="button"
            >
              <span>
                {option.key === "all" && <FaInbox />}
                {option.key === "pending" && <FaRegClock />}
                {option.key === "approved" && <FaCheck />}
                {option.key === "rejected" && <FaTimes />}
                {option.label}
              </span>
              <strong>{option.key === "all" ? metrics.total : metrics[option.key]}</strong>
            </button>
          ))}
        </nav>

        <nav className="admin-nav admin-nav-content" aria-label="Content management">
          <button
            type="button"
            onClick={() => navigate("/admin/board-members")}
          >
            <span>
              <FaUsers />
              Board Members
            </span>
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/reviewer-content")}
          >
            <span>
              <FaUserEdit />
              Reviewer Content
            </span>
          </button>
        </nav>

        <div className="sidebar-panel">
          <span>Current Queue</span>
          <strong>{metrics.pending}</strong>
          <p>Manuscripts waiting for editorial decision.</p>
        </div>

        <button className="logout-button" onClick={logout} type="button">
          <FaSignOutAlt />
          Logout
        </button>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div className="topbar-title">
            <button
              className="menu-button"
              onClick={() => setSidebarOpen(true)}
              type="button"
              aria-label="Open admin menu"
            >
              <FaBars />
            </button>
            <div>
              <span>Dashboard</span>
              <h2>Manuscript Control Panel</h2>
            </div>
          </div>

          <div className="admin-search">
            <FaSearch />
            <input
              type="search"
              placeholder="Search title, author, or email"
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </header>

        {error && <div className="admin-alert">{error}</div>}

        <section className="overview-grid" aria-label="Submission overview">
          <article className="metric-card total">
            <div>
              <span>Total Submissions</span>
              <strong>{metrics.total}</strong>
            </div>
            <FaFileAlt />
          </article>
          <article className="metric-card pending">
            <div>
              <span>Pending Review</span>
              <strong>{metrics.pending}</strong>
            </div>
            <FaRegClock />
          </article>
          <article className="metric-card approved">
            <div>
              <span>Approved</span>
              <strong>{metrics.approved}</strong>
            </div>
            <FaCheck />
          </article>
          <article className="metric-card rejected">
            <div>
              <span>Rejected</span>
              <strong>{metrics.rejected}</strong>
            </div>
            <FaTimes />
          </article>
        </section>

        <section className="workbench-grid">
          <div className="panel submissions-panel">
            <div className="panel-header">
              <div>
                <span>Editorial Queue</span>
                <h3>{statusOptions.find((item) => item.key === filterStatus)?.label}</h3>
              </div>
              <button className="refresh-button" onClick={fetchData} type="button">
                Refresh
              </button>
            </div>

            <div className="filter-tabs">
              {statusOptions.map((option) => (
                <button
                  key={option.key}
                  className={filterStatus === option.key ? "active" : ""}
                  onClick={() => handleStatusChange(option.key)}
                  type="button"
                >
                  {option.label}
                </button>
              ))}
            </div>

            <div className="table-scroll">
              <table className="submission-table">
                <thead>
                  <tr>
                    <th>Author</th>
                    <th>Email</th>
                    <th>Submission Date</th>
                    <th>Status</th>
                    <th>File</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <tr>
                      <td colSpan="6" className="empty-cell">
                        Loading submissions...
                      </td>
                    </tr>
                  )}

                  {!loading && currentItems.length === 0 && (
                    <tr>
                      <td colSpan="6" className="empty-cell">
                        No submissions found.
                      </td>
                    </tr>
                  )}

                  {!loading &&
                    currentItems.map((submission) => (
                      <tr key={submission._id}>
                        <td className="author-cell" data-label="Author">
                          <strong title={submission.authorName}>
                            {submission.authorName}
                          </strong>
                        </td>
                        <td className="email-cell" data-label="Email">
                          <span title={submission.email}>{submission.email}</span>
                        </td>
                        <td data-label="Submission Date">
                          {formatDate(submission.createdAt)}
                        </td>
                        <td data-label="Status">
                          <span className={`status-badge ${submission.status}`}>
                            {statusLabels[submission.status] || "Pending"}
                          </span>
                        </td>
                        <td data-label="File">
                          <button
                            className="file-button"
                            onClick={() => openPdf(submission)}
                            type="button"
                          >
                            <FaEye />
                            View
                          </button>
                        </td>
                        <td data-label="Actions">
                          <div className="action-group">
                            {submission.status !== "approved" && (
                              <button
                                className="icon-action approve"
                                onClick={() => approveManuscript(submission._id)}
                                disabled={actionLoading === `approve-${submission._id}`}
                                type="button"
                                title="Approve manuscript"
                              >
                                <FaCheck />
                              </button>
                            )}
                            <button
                              className="icon-action reject"
                              onClick={() => openRejectModal(submission)}
                              disabled={actionLoading === `reject-${submission._id}`}
                              type="button"
                              title="Reject manuscript"
                            >
                              <FaTimes />
                            </button>
                            <button
                              className="icon-action delete"
                              onClick={() => deleteManuscript(submission._id)}
                              disabled={actionLoading === `delete-${submission._id}`}
                              type="button"
                              title="Delete manuscript"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <div className="pagination-bar">
              <span>
                Showing {currentItems.length} of {filteredData.length} submissions
              </span>
              <div>
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((page) => page - 1)}
                  type="button"
                >
                  Previous
                </button>
                <strong>
                  {currentPage} / {totalPages}
                </strong>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((page) => page + 1)}
                  type="button"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          <aside className="panel insight-panel">
            <div className="panel-header compact">
              <div>
                <span>Quick View</span>
                <h3>Latest Submission</h3>
              </div>
            </div>

            {latestSubmission ? (
              <div className="latest-card">
                <div className="latest-head">
                  <span className="latest-avatar">
                    {getInitials(latestSubmission.authorName)}
                  </span>
                  <span className={`status-badge ${latestSubmission.status}`}>
                    {statusLabels[latestSubmission.status] || "Pending"}
                  </span>
                </div>
                <h4>{latestSubmission.articleTitle}</h4>
                <p>{latestSubmission.authorName}</p>
                <dl>
                  <div>
                    <dt>Email</dt>
                    <dd>{latestSubmission.email}</dd>
                  </div>
                  <div>
                    <dt>Received</dt>
                    <dd>{formatDate(latestSubmission.createdAt)}</dd>
                  </div>
                </dl>
                <a
                  className="download-link"
                  href={assetUrl(latestSubmission.manuscriptFile?.path)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaDownload />
                  Open Manuscript
                </a>
              </div>
            ) : (
              <p className="muted-text">No manuscript has been submitted yet.</p>
            )}

            <div className="process-list">
              <h4>Editorial Workflow</h4>
              <div>
                <span>1</span>
                Initial screening
              </div>
              <div>
                <span>2</span>
                Peer review assignment
              </div>
              <div>
                <span>3</span>
                Decision and author email
              </div>
            </div>
          </aside>
        </section>
      </main>

      {pdfSubmission && (
        <div className="pdf-overlay" onClick={closePdf}>
          <div
            className="pdf-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Manuscript preview"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="pdf-modal-header">
              <div>
                <h2>Manuscript Preview</h2>
                {pdfSubmission.articleTitle && <p>{pdfSubmission.articleTitle}</p>}
              </div>
              <button
                className="pdf-close"
                onClick={closePdf}
                type="button"
                aria-label="Close preview"
              >
                <FaTimes />
              </button>
            </div>

            <div className="pdf-modal-body">
              {pdfUrl && pdfPreviewable ? (
                <iframe title="Manuscript preview" src={pdfUrl} />
              ) : (
                <div className="pdf-empty">
                  {pdfUrl ? (
                    <>
                      <FaFileAlt />
                      <p>This file type can’t be previewed here.</p>
                      <a
                        className="ui-btn ui-btn--primary"
                        href={pdfUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaDownload />
                        Open file
                      </a>
                    </>
                  ) : (
                    <>
                      <FaFileAlt />
                      <p>No manuscript uploaded.</p>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="pdf-modal-footer">
              {pdfUrl && (
                <a
                  className="ui-btn ui-btn--outline"
                  href={pdfUrl}
                  download
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaDownload />
                  Download
                </a>
              )}
              <button
                className="ui-btn ui-btn--secondary"
                onClick={closePdf}
                type="button"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="reject-modal">
            <h2>Reject Manuscript</h2>
            <p>
              Add a clear reason for rejecting
              {selectedSubmission?.articleTitle ? ` "${selectedSubmission.articleTitle}"` : ""}.
            </p>
            <textarea
              placeholder="Enter rejection reason for the author"
              value={rejectReason}
              onChange={(event) => setRejectReason(event.target.value)}
            />
            <div className="modal-actions">
              <button
                className="secondary-action"
                onClick={() => setShowModal(false)}
                type="button"
              >
                Cancel
              </button>
              <button className="danger-action" onClick={confirmReject} type="button">
                Confirm Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

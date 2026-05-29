import React, { useState } from "react";
import axios from "axios";
import { UploadCloud, FileText, ShieldCheck, ClipboardCheck } from "lucide-react";
import { toast } from "react-toastify";
import "./SubmitManuscript.css";

const initialForm = {
  title: "",
  abstract: "",
  authorName: "",
  email: "",
  manuscriptFile: null,
};

const SubmitManuscript = () => {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, manuscriptFile: e.target.files[0] || null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    const userToken = localStorage.getItem("token");

    if (!userToken) {
      toast.warning("Please login before submitting your manuscript.");
      return;
    }

    if (!formData.manuscriptFile) {
      toast.error("Please upload your manuscript file.");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      data.append("articleTitle", formData.title);
      data.append("authorName", formData.authorName);
      data.append("email", formData.email);
      data.append("abstract", formData.abstract);
      data.append("manuscript", formData.manuscriptFile);

      await axios.post("http://localhost:3000/api/manuscript/submit", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userToken}`,
        },
      });

      toast.success("Your manuscript has been submitted for editorial review.");
      setFormData(initialForm);
      e.target.reset();
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(
        error.response?.data?.message ||
          "Submission failed. Please check your file and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="submit-page">
      <section className="submit-card">
        <nav className="submit-breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span>/</span>
          <span>Submit Manuscript</span>
        </nav>

        <header className="submit-title">
          <p>Author Submission</p>
          <h1>Submit Manuscript</h1>
        </header>

        <div className="submit-layout">
          <section className="submit-form-panel">
            <h2>Manuscript Details</h2>

            <form className="manuscript-form" onSubmit={handleSubmit}>
              <label>
                Article Title
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  placeholder="Enter the full article title"
                  required
                  onChange={handleChange}
                />
              </label>

              <div className="form-row">
                <label>
                  Author Name
                  <input
                    type="text"
                    name="authorName"
                    value={formData.authorName}
                    placeholder="Corresponding author name"
                    required
                    onChange={handleChange}
                  />
                </label>

                <label>
                  Email Address
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder="author@example.com"
                    required
                    onChange={handleChange}
                  />
                </label>
              </div>

              <label>
                Abstract
                <textarea
                  rows="7"
                  name="abstract"
                  value={formData.abstract}
                  placeholder="Provide a concise abstract describing objectives, methods, results, and conclusion"
                  required
                  onChange={handleChange}
                />
              </label>

              <div className="file-upload-box">
                <input
                  type="file"
                  id="fileInput"
                  accept=".pdf,.doc,.docx"
                  hidden
                  onChange={handleFileChange}
                />
                <label htmlFor="fileInput" className="upload-label">
                  <UploadCloud size={28} />
                  <span>
                    {formData.manuscriptFile
                      ? formData.manuscriptFile.name
                      : "Upload PDF, DOC, or DOCX manuscript"}
                  </span>
                </label>
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Submitting..." : "Submit for Review"}
              </button>
            </form>
          </section>

          <aside className="submission-guidelines">
            <section className="guidelines-card">
              <FileText size={24} />
              <h3>File Requirements</h3>
              <p>Submit manuscripts in PDF, DOC, or DOCX format with all tables and figures included.</p>
            </section>

            <section className="guidelines-card">
              <ShieldCheck size={24} />
              <h3>Ethics Check</h3>
              <p>Ensure originality, proper authorship, conflict disclosures, and ethics approval where required.</p>
            </section>

            <section className="guidelines-card">
              <ClipboardCheck size={24} />
              <h3>Before Submission</h3>
              <p>Review author instructions, references, abstract quality, and manuscript formatting.</p>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default SubmitManuscript;

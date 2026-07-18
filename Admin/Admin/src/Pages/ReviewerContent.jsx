import React, { useCallback, useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout/AdminLayout";
import { api } from "../config/api";

const CONTENT_KEY = "reviewer-how-to-apply";

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
  },
});

const ReviewerContent = () => {
  const [form, setForm] = useState({ heading: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchContent = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const res = await api.get(`/api/site-content/${CONTENT_KEY}`);
      setForm({
        heading: res.data?.heading || "",
        content: res.data?.content || "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load reviewer content.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!form.heading.trim()) {
      setError("Heading is required.");
      return;
    }

    setSaving(true);

    try {
      await api.put(
        `/api/site-content/${CONTENT_KEY}`,
        { heading: form.heading, content: form.content },
        getAuthConfig()
      );
      setSuccess("Reviewer content updated successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to update reviewer content.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout eyebrow="Content Management" title="Reviewer Page Content">
      {error && <div className="cms-alert error">{error}</div>}
      {success && <div className="cms-alert success">{success}</div>}

      <section className="cms-panel">
        <div className="cms-panel-header">
          <div>
            <h3>“How to Apply?” Section</h3>
            <p>Shown on the public Apply as Reviewer page.</p>
          </div>
        </div>

        {loading ? (
          <div className="cms-empty">Loading content...</div>
        ) : (
          <form className="cms-form" onSubmit={handleSubmit}>
            <div className="cms-field">
              <label htmlFor="heading">Heading *</label>
              <input
                id="heading"
                name="heading"
                value={form.heading}
                onChange={handleChange}
                placeholder="How to Apply?"
                required
              />
            </div>

            <div className="cms-field">
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                name="content"
                value={form.content}
                onChange={handleChange}
                placeholder="Send your updated CV to support@ijaht.com"
              />
            </div>

            <div className="cms-form-actions">
              <button className="cms-btn primary" type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        )}
      </section>
    </AdminLayout>
  );
};

export default ReviewerContent;

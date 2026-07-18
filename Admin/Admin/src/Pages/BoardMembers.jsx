import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa";
import AdminLayout from "../components/AdminLayout/AdminLayout";
import { api, assetUrl } from "../config/api";

const emptyForm = {
  name: "",
  designation: "",
  qualification: "",
  affiliation: "",
  displayOrder: 0,
  status: "active",
};

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
  },
});

const getInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

const BoardMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fileInputRef = useRef(null);

  const fetchMembers = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const res = await api.get("/api/board-members/admin/list", getAuthConfig());
      setMembers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load board members.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setPhoto(null);
    setShowForm(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const startAdd = () => {
    setForm(emptyForm);
    setEditingId(null);
    setPhoto(null);
    setSuccess("");
    setError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    setShowForm(true);
  };

  const startEdit = (member) => {
    setForm({
      name: member.name || "",
      designation: member.designation || "",
      qualification: member.qualification || "",
      affiliation: member.affiliation || "",
      displayOrder: member.displayOrder ?? 0,
      status: member.status || "active",
    });
    setEditingId(member._id);
    setPhoto(null);
    setSuccess("");
    setError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    setShowForm(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name.trim()) {
      setError("Member name is required.");
      return;
    }

    const payload = new FormData();
    payload.append("name", form.name.trim());
    payload.append("designation", form.designation);
    payload.append("qualification", form.qualification);
    payload.append("affiliation", form.affiliation);
    payload.append("displayOrder", form.displayOrder || 0);
    payload.append("status", form.status);
    if (photo) payload.append("photo", photo);

    setSaving(true);

    try {
      if (editingId) {
        await api.put(`/api/board-members/${editingId}`, payload, getAuthConfig());
        setSuccess("Board member updated successfully.");
      } else {
        await api.post("/api/board-members", payload, getAuthConfig());
        setSuccess("Board member added successfully.");
      }

      resetForm();
      await fetchMembers();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to save board member.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (member) => {
    if (!window.confirm(`Delete board member "${member.name}"?`)) return;

    setError("");
    setSuccess("");

    try {
      await api.delete(`/api/board-members/${member._id}`, getAuthConfig());
      setSuccess("Board member deleted.");
      if (editingId === member._id) resetForm();
      await fetchMembers();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to delete board member.");
    }
  };

  return (
    <AdminLayout eyebrow="Content Management" title="Board Members">
      {error && <div className="cms-alert error">{error}</div>}
      {success && <div className="cms-alert success">{success}</div>}

      <section className="cms-panel">
        <div className="cms-panel-header">
          <div>
            <h3>Editorial Board Members</h3>
            <p>Active members appear on the public Editorial Board page.</p>
          </div>
          {!showForm && (
            <button className="cms-btn primary" onClick={startAdd} type="button">
              <FaPlus />
              Add Member
            </button>
          )}
        </div>

        {showForm && (
          <form className="cms-form" onSubmit={handleSubmit}>
            <div className="cms-form-grid">
              <div className="cms-field">
                <label htmlFor="name">Name *</label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full name"
                  required
                />
              </div>

              <div className="cms-field">
                <label htmlFor="designation">Designation</label>
                <input
                  id="designation"
                  name="designation"
                  value={form.designation}
                  onChange={handleChange}
                  placeholder="e.g. Editor-in-Chief"
                />
              </div>

              <div className="cms-field">
                <label htmlFor="qualification">Qualification</label>
                <input
                  id="qualification"
                  name="qualification"
                  value={form.qualification}
                  onChange={handleChange}
                  placeholder="e.g. PhD, MPT"
                />
              </div>

              <div className="cms-field">
                <label htmlFor="affiliation">Affiliation / Organization</label>
                <input
                  id="affiliation"
                  name="affiliation"
                  value={form.affiliation}
                  onChange={handleChange}
                  placeholder="Institution or organization"
                />
              </div>

              <div className="cms-field">
                <label htmlFor="displayOrder">Display Order</label>
                <input
                  id="displayOrder"
                  name="displayOrder"
                  type="number"
                  value={form.displayOrder}
                  onChange={handleChange}
                  placeholder="0"
                />
              </div>

              <div className="cms-field">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="cms-field full">
                <label htmlFor="photo">Photo (JPG, PNG, WEBP)</label>
                <input
                  id="photo"
                  ref={fileInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  onChange={(event) => setPhoto(event.target.files?.[0] || null)}
                />
              </div>
            </div>

            <div className="cms-form-actions">
              <button className="cms-btn primary" type="submit" disabled={saving}>
                {saving ? "Saving..." : editingId ? "Update Member" : "Add Member"}
              </button>
              <button
                className="cms-btn secondary"
                type="button"
                onClick={resetForm}
                disabled={saving}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </section>

      <section className="cms-panel">
        <div className="cms-panel-header">
          <div>
            <h3>All Members</h3>
            <p>{members.length} total</p>
          </div>
        </div>

        <div className="cms-table-scroll">
          <table className="cms-table">
            <thead>
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Designation</th>
                <th>Qualification</th>
                <th>Affiliation</th>
                <th>Order</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan="8" className="cms-empty">
                    Loading board members...
                  </td>
                </tr>
              )}

              {!loading && members.length === 0 && (
                <tr>
                  <td colSpan="8" className="cms-empty">
                    No board members added yet.
                  </td>
                </tr>
              )}

              {!loading &&
                members.map((member) => (
                  <tr key={member._id}>
                    <td>
                      <span className="cms-thumb">
                        {member.photo?.path ? (
                          <img src={assetUrl(member.photo.path)} alt={member.name} />
                        ) : (
                          getInitials(member.name)
                        )}
                      </span>
                    </td>
                    <td className="cms-member-name">{member.name}</td>
                    <td>{member.designation || "—"}</td>
                    <td>{member.qualification || "—"}</td>
                    <td>{member.affiliation || "—"}</td>
                    <td>{member.displayOrder ?? 0}</td>
                    <td>
                      <span className={`cms-status ${member.status}`}>
                        {member.status === "inactive" ? "Inactive" : "Active"}
                      </span>
                    </td>
                    <td>
                      <div className="cms-row-actions">
                        <button
                          className="cms-icon-btn edit"
                          type="button"
                          title="Edit member"
                          onClick={() => startEdit(member)}
                        >
                          <FaPen />
                        </button>
                        <button
                          className="cms-icon-btn delete"
                          type="button"
                          title="Delete member"
                          onClick={() => handleDelete(member)}
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
      </section>
    </AdminLayout>
  );
};

export default BoardMembers;

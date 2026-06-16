import React, { useState } from "react";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { toast } from "react-toastify";
import "./Contact.css";
import { apiFetch } from "../../config/api";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  subject: "",
  message: "",
};

const Contact = () => {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await apiFetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Contact request failed");
      }

      toast.success("Your message has been submitted successfully.");
      setFormData(initialForm);
    } catch (error) {
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="contact-page">
      <section className="contact-card">
        <nav className="contact-breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span>/</span>
          <span>Contact Us</span>
        </nav>

        <header className="contact-title">
          <p>Journal Support</p>
          <h1>Contact Us</h1>
        </header>

        <div className="contact-layout">
          <section className="contact-info-panel">
            <h2>Get in Touch</h2>
            <p>
              For manuscript queries, editorial communication, publication
              support, and institutional enquiries, contact the IJAHT editorial
              office using the details below or submit the online form.
            </p>

            <div className="contact-info-list">
              <div className="contact-info-item">
                <span><Mail size={20} /></span>
                <div>
                  <h3>Email Support</h3>
                  <p>editor@ijhat.org<br />support@ijhat.org</p>
                </div>
              </div>

              <div className="contact-info-item">
                <span><Phone size={20} /></span>
                <div>
                  <h3>Phone</h3>
                  <p>+91 98765 43210<br />Monday to Friday</p>
                </div>
              </div>

              <div className="contact-info-item">
                <span><Clock size={20} /></span>
                <div>
                  <h3>Office Hours</h3>
                  <p>9:00 AM - 6:00 PM<br />Editorial response within 2-3 working days</p>
                </div>
              </div>

              <div className="contact-info-item">
                <span><MapPin size={20} /></span>
                <div>
                  <h3>Correspondence</h3>
                  <p>International Journal of Allied Healthcare and Technology<br />Editorial Office</p>
                </div>
              </div>
            </div>
          </section>

          <section className="contact-form-card">
            <h2>Send a Message</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-form-row">
                <label>
                  First Name
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Last Name
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <label>
                Email Address
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Subject
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Message
                <textarea
                  rows="6"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </label>

              <button type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit Message"}
              </button>
            </form>
          </section>
        </div>
      </section>
    </main>
  );
};

export default Contact;

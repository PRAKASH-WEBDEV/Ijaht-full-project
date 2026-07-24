import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import footerLogo from "../../assets/main-logo.png";
import "./Footer.css";
import { apiFetch } from "../../config/api";

const socialLinks = [
  {
    label: "Facebook",
    href: import.meta.env.VITE_SOCIAL_FACEBOOK_URL || "https://facebook.com",
    icon: <FaFacebookF />,
  },
  {
    label: "LinkedIn",
    href: import.meta.env.VITE_SOCIAL_LINKEDIN_URL || "https://linkedin.com",
    icon: <FaLinkedinIn />,
  },
  {
    label: "Instagram",
    href: import.meta.env.VITE_SOCIAL_INSTAGRAM_URL || "https://instagram.com",
    icon: <FaInstagram />,
  },
];

const Footer = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });
    setIsSubmitting(true);

    try {
      const response = await apiFetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({
          type: "success",
          message: "Thank you! Your query has been submitted successfully.",
        });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setStatus({
          type: "error",
          message: result.message || "Unable to submit your query.",
        });
      }
    } catch (error) {
      console.log(error);
      setStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          {/* About */}
          <div className="footer-col footer-about">
            <Link to="/" className="footer-logo" aria-label="IJAHT home">
              <img src={footerLogo} alt="IJAHT logo" />
            </Link>

            <p>
              The International Journal of Allied Healthcare and Technology is a
              peer-reviewed, open-access journal dedicated to advancing rigorous
              healthcare and technology research.
            </p>

            <ul className="footer-contact-list">
              <li>
                <span>Email</span>
                <a href="mailto:editor@ijhat.org">editor@ijhat.org</a>
              </li>
              <li>
                <span>Support</span>
                <a href="mailto:support@ijhat.org">support@ijhat.org</a>
              </li>
            </ul>

            <div className="footer-social" aria-label="Social media links">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <nav className="footer-col footer-links" aria-label="Quick links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/editorial-board">Editorial Board</Link></li>
              <li><Link to="/issues/current">Current Issue</Link></li>
              <li><Link to="/archives">Archives</Link></li>
              <li><Link to="/about/mission">About the Journal</Link></li>
            </ul>
          </nav>

          {/* For Authors */}
          <nav className="footer-col footer-links" aria-label="Information for authors">
            <h4>For Authors</h4>
            <ul>
              <li>
                <Link to="/submission/instructions-for-authors">
                  Instructions for Authors
                </Link>
              </li>
              <li>
                <Link to="/submission/manuscript-procedures">
                  Manuscript Procedures
                </Link>
              </li>
              <li><Link to="/submit-manuscript">Submit Manuscript</Link></li>
              <li><Link to="/reviewer/apply">Apply as Reviewer</Link></li>
              <li><Link to="/about/policies">Journal Policies</Link></li>
            </ul>
          </nav>

          {/* Online Contact form */}
          <div className="footer-col footer-form-section">
            <h4>Online Contact</h4>

            <form onSubmit={handleSubmit}>
              <div className="footer-name-row">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />

                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />

              <textarea
                rows="4"
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
              />

              {status.message && (
                <p className={`footer-form-status ${status.type}`}>
                  {status.message}
                </p>
              )}

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>

        <div className="copyright-strip">
          <div className="copyright-text">
            Copyright &copy; 2026 IJAHT. All rights reserved.
          </div>
          <div className="copyright-powered">
            Powered by{" "}
            <a
              href="https://evergrowdigital.in/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Evergrowdigital</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

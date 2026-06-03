import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import footerLogo from "../../assets/main-logo.png";
import "./Footer.css";
import copyrightFormPdf from "../../assets/copyright-pdf.pdf";
import subscriptionFormPdf from "../../assets/Subscription -pdf.pdf";
import { apiFetch } from "../../config/api";

const authorLinks = [
  { title: "Submit Manuscript", path: "/submit-manuscript" },
  { title: "Instructions for Authors", path: "/submission/instructions-for-authors" },
  { title: "Manuscript Assistance", path: "/submission/manuscript-assistance" },
  {
    title: "Copyright Form",
    download: copyrightFormPdf,
    fileName: "IJHAT-Copyright-Form.pdf",
  },
  {
    title: "Subscription Form",
    download: subscriptionFormPdf,
    fileName: "IJHAT-Subscription-Form.pdf",
  },
];

const journalLinks = [
  { title: "Mission & Vision", path: "/about/mission" },
  { title: "Journal Policies", path: "/about/policies" },
  { title: "Editorial Board", path: "/editorial-board" },
  { title: "Current Issue", path: "/issues/current" },
  { title: "Issue Archive", path: "/issues/archive" },
  { title: "Contact Us", path: "/contact" },
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
      <div className="footer-grid">
        <div className="footer-about">
          <h4>About Journal</h4>

          <div className="footer-logo">
            <Link to="/">
              <img src={footerLogo} alt="Journal Logo" />
            </Link>
          </div>

          <p>
            International Journal of Applied Healthcare and Technology is a
            peer-reviewed open-access journal dedicated to advancing healthcare
            research.
          </p>
        </div>

        <div className="footer-form-section">
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

        <div className="footer-links">
          <h4>For Authors</h4>

          {authorLinks.map((link) => (
            link.download ? (
              <a key={link.title} href={link.download} download={link.fileName}>
                {link.title}
              </a>
            ) : (
              <Link key={link.path} to={link.path}>
                {link.title}
              </Link>
            )
          ))}
        </div>

        <div className="footer-links">
          <h4>Journal Menu</h4>

          {journalLinks.map((link) => (
            <Link key={link.path} to={link.path}>
              {link.title}
            </Link>
          ))}
        </div>

        <div className="footer-contact">
          <h4>Contact Info</h4>

          <p>Email: editor@ijhat.org</p>
          <p>support@ijhat.org</p>
          <p>Open Access International Journal</p>
        </div>
      </div>

      <div className="copyright-strip">
        <div className="copyright-text">
          Copyright &copy; 2026 IJHAT | Powered by <span>EmpowerWeb</span>
        </div>

        <div className="copyright-social">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
            <FaFacebookF />
          </a>

          <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
            <FaTwitter />
          </a>

          <Link to="/issues/archive" aria-label="RSS">
            RSS
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

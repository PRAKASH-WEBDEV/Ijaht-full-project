import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import "./Header.css";
import mainLogo from "../../assets/main-logo.png";

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
].filter((link) => Boolean(link.href));

const Header = () => {
  return (
    <header className="journal-header">
      <Link to="/" className="header-logo" aria-label="Go to IJAHT home">
        <img src={mainLogo} alt="Society Logo" />
      </Link>

      <div className="header-content">
        <h1>
          International Journal of Allied Healthcare and Technology
        </h1>
        <p>Rigorous Research. Reliable Insights. Real Impact.</p>
      </div>

      <nav className="header-social" aria-label="Social media links">
        {socialLinks.map((link) => (
          <a key={link.label} href={link.href} target="_blank" rel="noreferrer" aria-label={link.label}>
            {link.icon}
          </a>
        ))}
      </nav>
    </header>
  );
};

export default Header;

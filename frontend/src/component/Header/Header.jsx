import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.png"; // apna logo path

const Header = () => {
  return (
    <header className="journal-header">
      <div className="header-logo">
        <Link to="/" aria-label="Go to IJHAT home">
          <img src={logo} alt="Society Logo" />
        </Link>
      </div>

      <div className="header-content">
        <h1>
          International Journal of Applied Healthcare and Technology
        </h1>

        <h3>
          An International Peer Reviewed Open Access Journal
        </h3>

        <p>
          P-ISSN: 2456-123X | E-ISSN: 2456-456X
        </p>
      </div>
    </header>
  );
};

export default Header;

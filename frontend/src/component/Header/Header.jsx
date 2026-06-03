import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import mainLogo from "../../assets/main-logo.png";

const Header = () => {
  return (
    <header className="journal-header">
      <Link to="/" className="header-centered-logo" aria-label="Go to IJHAT home">
        <img src={mainLogo} alt="Society Logo" />
      </Link>

      <div className="header-content">
        <h1>
          International Journal of Applied Healthcare and Technology
        </h1>
      </div>
    </header>
  );
};

export default Header;

import React from "react";
import { NavLink } from "react-router-dom";
import Sidebar from "../../component/Sidebar/Sidebar";
import "./About.css";

const AboutPageLayout = ({ title, children }) => {
  return (
    <main className="about-page">
      <div className="about-shell">
        <Sidebar />

        <article className="about-content-card">
          <nav className="about-breadcrumb" aria-label="Breadcrumb">
            <NavLink to="/">Home</NavLink>
            <span>/</span>
            <NavLink to="/about/mission">About Journal</NavLink>
            <span>/</span>
            <span>{title}</span>
          </nav>

          <header className="about-page-title">
            <h1>{title}</h1>
          </header>

          <div className="about-prose">{children}</div>
        </article>
      </div>
    </main>
  );
};

export default AboutPageLayout;

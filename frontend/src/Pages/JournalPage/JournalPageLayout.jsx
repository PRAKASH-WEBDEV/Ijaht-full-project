import React from "react";
import { NavLink } from "react-router-dom";
import Sidebar from "../../component/Sidebar/Sidebar";
import "./JournalPage.css";

const JournalPageLayout = ({ title, section, children }) => {
  return (
    <main className="journal-page">
      <div className="journal-shell">
        <Sidebar />

        <article className="journal-card">
          <nav className="journal-breadcrumb" aria-label="Breadcrumb">
            <NavLink to="/">Home</NavLink>
            <span>/</span>
            <span>{section}</span>
            <span>/</span>
            <span>{title}</span>
          </nav>

          <header className="journal-title">
            <p>{section}</p>
            <h1>{title}</h1>
          </header>

          <div className="journal-prose">{children}</div>
        </article>
      </div>
    </main>
  );
};

export default JournalPageLayout;

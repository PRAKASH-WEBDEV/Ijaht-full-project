import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  FileText,
  ShieldCheck,
  BadgeDollarSign,
  ChevronRight,
} from "lucide-react";
import "./Sidebar.css";
import copyrightFormPdf from "../../assets/copyright-pdf.pdf";
import subscriptionFormPdf from "../../assets/Subscription -pdf.pdf";
import physioEliteLogo from "../../assets/collab/Collab-logo-01.jpg";
import ihfaCpdLogo from "../../assets/collab/collab-logo-02.jpeg";

const Sidebar = () => {
  const { pathname } = useLocation();

  const isAboutPage = pathname.startsWith("/about/");
  const isCollaborationsPage = pathname.startsWith("/collaborations/");
  const isSubmissionPage = pathname.startsWith("/submission/");
  const isReviewerPage = pathname.startsWith("/reviewer/");
  const isIssuesPage = pathname.startsWith("/issues/");

  return (
    <aside className="sidebar">
      {/* ACTION BUTTONS */}
      <div className="quick-actions">
        <NavLink to="/submit-manuscript" className="action-btn">
          <span>
            <FileText size={18} />
            Submit Paper
          </span>
          <ChevronRight size={18} />
        </NavLink>

        <a href={copyrightFormPdf} download className="action-btn">
          <span>
            <ShieldCheck size={18} />
            Copyright Form
          </span>
          <ChevronRight size={18} />
        </a>

        <a href={subscriptionFormPdf} download className="action-btn">
          <span>
            <BadgeDollarSign size={18} />
            Subscription Form
          </span>
          <ChevronRight size={18} />
        </a>
      </div>

      {isAboutPage && (
        <div className="sidebar-box sidebar-nav-section">
          <h4>About Journal</h4>

          <nav aria-label="About Journal navigation">
            <NavLink to="/about/mission">Mission & Vision</NavLink>
            <NavLink to="/about/why-publish">Why Publish With Us</NavLink>
            <NavLink to="/about/indexing">Abstracting & Indexing</NavLink>
            <NavLink to="/about/publisher">Publisher</NavLink>
            <NavLink to="/about/licenses">Licenses</NavLink>
            <NavLink to="/about/policies">Journal Policies</NavLink>
          </nav>
        </div>
      )}

      {isCollaborationsPage && (
        <div className="sidebar-box sidebar-nav-section">
          <h4>Collaborations</h4>

          <nav aria-label="Collaborations navigation">
            <NavLink to="/collaborations/ihfa">IHFA</NavLink>
            <NavLink to="/collaborations/physio-elite">Physio Elite</NavLink>
          </nav>
        </div>
      )}

      {isSubmissionPage && (
        <div className="sidebar-box sidebar-nav-section">
          <h4>Manuscript Submission</h4>

          <nav aria-label="Manuscript Submission navigation">
            <NavLink to="/submission/instructions-for-authors">
              Instructions for Authors
            </NavLink>
            <NavLink to="/submission/manuscript-procedures">
              Manuscript Procedures
            </NavLink>
            <NavLink to="/submission/manuscript-assistance">
              Manuscript Assistance
            </NavLink>
            <a href={copyrightFormPdf} download>Copyright Form</a>
            <a href={subscriptionFormPdf} download>
              Subscription Form
            </a>
          </nav>
        </div>
      )}

      {isReviewerPage && (
        <div className="sidebar-box sidebar-nav-section">
          <h4>Reviewer</h4>

          <nav aria-label="Reviewer navigation">
            <NavLink to="/reviewer/apply">Apply as Reviewer</NavLink>
            <NavLink to="/reviewer/instructions">Reviewer Instructions</NavLink>
            <NavLink to="/reviewer/acknowledgement">
              Reviewer Acknowledgement
            </NavLink>
          </nav>
        </div>
      )}

      {isIssuesPage && (
        <div className="sidebar-box sidebar-nav-section">
          <h4>Issues</h4>

          <nav aria-label="Issues navigation">
            <NavLink to="/issues/current">Current Issue</NavLink>
            <NavLink to="/issues/archive">Archive</NavLink>
          </nav>
        </div>
      )}

      {/* COLLABORATION PARTNERS */}
      <div className="sidebar-box collaboration-partners-box">
        <h4>Collaboration Partners</h4>

        <div className="collaboration-partners">
          <img
            src={physioEliteLogo}
            alt="PHYSIOELITE HEALTH & EDUCATION SOCIETY"
            className="collaboration-partner-logo"
          />

          <img
            src={ihfaCpdLogo}
            alt="IHFA + CPD Worldwide"
            className="collaboration-partner-logo"
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

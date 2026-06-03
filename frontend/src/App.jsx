import React, { useState } from "react";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import Header from "./component/Header/Header.jsx";
import Navbar from "./component/Navbaar/Navbar.jsx";
import Footer from "./component/Footer/Footer.jsx";

// Pages
import Home from "./Pages/Home/Home.jsx";
import About from "./Pages/About/About.jsx";
import Mission from "./Pages/About/Mission.jsx";
import WhyPublish from "./Pages/About/WhyPublish.jsx";
import Indexing from "./Pages/About/Indexing.jsx";
import Publisher from "./Pages/About/Publisher.jsx";
import Licenses from "./Pages/About/Licenses.jsx";
import Policies from "./Pages/About/Policies.jsx";
import ExpertEditorialSupport from "./Pages/ExpertEditorialSupport/ExpertEditorialSupport.jsx";
import SubmitManuscript from "./Pages/SubmitManuscript/SubmitManuscript.jsx";
import Archives from "./Pages/Archives/Archives.jsx";
import IHFA from "./Pages/Collaborations/IHFA.jsx";
import PhysioElite from "./Pages/Collaborations/PhysioElite.jsx";
import InstructionsForAuthors from "./Pages/Submission/InstructionsForAuthors.jsx";
import ManuscriptProcedures from "./Pages/Submission/ManuscriptProcedures.jsx";
import ManuscriptAssistance from "./Pages/Submission/ManuscriptAssistance.jsx";
import CopyrightForm from "./Pages/Submission/CopyrightForm.jsx";
import SubscriptionForm from "./Pages/Submission/SubscriptionForm.jsx";
import ApplyReviewer from "./Pages/Reviewer/ApplyReviewer.jsx";
import ReviewerInstructions from "./Pages/Reviewer/ReviewerInstructions.jsx";
import ReviewerAcknowledgement from "./Pages/Reviewer/ReviewerAcknowledgement.jsx";
import CurrentIssue from "./Pages/Issues/CurrentIssue.jsx";
import IssueArchive from "./Pages/Issues/IssueArchive.jsx";
import Researcher from "./Pages/Researcher/Researcher.jsx";
import Contact from "./Pages/Contact/Contact.jsx";
import Profile from "./Pages/Profile/Profile.jsx";
import ResetPassword from "./Pages/ResetPassword/ResetPassword.jsx";
// Popups
import LoginPopup from "./Pages/Login/Login.jsx";
import RegisterPopup from "./Pages/Register/Register.jsx";
import ForgotPasswordPopup from "./Pages/ForgotPassword/ForgotPassword.jsx"; // ✅ ADD
import { ADMIN_URL } from "./config/api";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

function LoginRedirectHandler({ setIsLoginOpen, setIsRegisterOpen, setIsForgotOpen }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state?.openLogin) return;

    setIsRegisterOpen(false);
    setIsForgotOpen(false);
    setIsLoginOpen(true);
    navigate(location.pathname, { replace: true, state: null });
  }, [
    location.pathname,
    location.state,
    navigate,
    setIsForgotOpen,
    setIsLoginOpen,
    setIsRegisterOpen,
  ]);

  return null;
}

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isForgotOpen, setIsForgotOpen] = useState(false); // ✅ ADD

  function AdminRedirect() {
    useEffect(() => {
      if (ADMIN_URL) {
        window.location.href = ADMIN_URL;
      }
    }, []);

    return <h2>{ADMIN_URL ? "Redirecting to Admin..." : "Admin URL is not configured."}</h2>;
  }

  return (
    <Router>
      <div className="App">
        <ScrollToTop />
        <LoginRedirectHandler
          setIsLoginOpen={setIsLoginOpen}
          setIsRegisterOpen={setIsRegisterOpen}
          setIsForgotOpen={setIsForgotOpen}
        />
        <Header />

        <Navbar
          onLoginClick={() => {
            setIsRegisterOpen(false);
            setIsForgotOpen(false);
            setIsLoginOpen(true);
          }}
          onRegisterClick={() => {
            setIsLoginOpen(false);
            setIsForgotOpen(false);
            setIsRegisterOpen(true);
          }}
        />

        <LoginPopup
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
          onRegisterClick={() => {
            setIsLoginOpen(false);
            setIsRegisterOpen(true);
          }}
          onForgotPasswordClick={() => {
            setIsLoginOpen(false);
            setIsForgotOpen(true);
          }}
        />

        <ForgotPasswordPopup
          isOpen={isForgotOpen}
          onClose={() => setIsForgotOpen(false)}
          onBackToLogin={() => setIsLoginOpen(true)}
        />

        <RegisterPopup
          isOpen={isRegisterOpen}
          onClose={() => setIsRegisterOpen(false)}
        />

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="colored"
        />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/about/mission" element={<Mission />} />
          <Route path="/about/why-publish" element={<WhyPublish />} />
          <Route path="/about/indexing" element={<Indexing />} />
          <Route path="/about/publisher" element={<Publisher />} />
          <Route path="/about/licenses" element={<Licenses />} />
          <Route path="/about/policies" element={<Policies />} />
          <Route
            path="/expert-editorial-support"
            element={<ExpertEditorialSupport />}
          />
          <Route path="/editorial-board" element={<ExpertEditorialSupport />} />
          <Route path="/collaborations/ihfa" element={<IHFA />} />
          <Route path="/collaborations/physio-elite" element={<PhysioElite />} />
          <Route path="/submission/instructions-for-authors" element={<InstructionsForAuthors />} />
          <Route path="/submission/manuscript-procedures" element={<ManuscriptProcedures />} />
          <Route path="/submission/manuscript-assistance" element={<ManuscriptAssistance />} />
          <Route path="/submission/copyright-form" element={<CopyrightForm />} />
          <Route path="/submission/subscription-form" element={<SubscriptionForm />} />
          <Route path="/reviewer/apply" element={<ApplyReviewer />} />
          <Route path="/reviewer/instructions" element={<ReviewerInstructions />} />
          <Route path="/reviewer/acknowledgement" element={<ReviewerAcknowledgement />} />
          <Route path="/issues/current" element={<CurrentIssue />} />
          <Route path="/issues/archive" element={<IssueArchive />} />
          <Route path="/submit-manuscript" element={<SubmitManuscript />} />
          <Route path="/archives" element={<Archives />} />
          <Route path="/researcher" element={<Researcher />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/admin" element={<AdminRedirect />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

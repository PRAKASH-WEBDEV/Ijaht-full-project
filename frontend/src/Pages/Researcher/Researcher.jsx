import React from 'react';
import './Researcher.css';

const Researcher = () => {
  const benefits = [
    { title: "Global Reach", desc: "Aapki research 150+ countries ke experts tak pahunchegi.", icon: "🌍" },
    { title: "Fast Track Review", desc: "4-6 weeks ke andar initial decision aur rapid publication.", icon: "⚡" },
    { title: "Open Access", desc: "Aapka kaam sabke liye free available hoga, high citations ke liye.", icon: "🔓" },
    { title: "Expert Support", desc: "Hamari editorial team har step par guidance provide karti hai.", icon: "🤝" }
  ];

  return (
    <div className="researcher-container">
      {/* Hero Section */}
      <header className="page-header">
        <h1>Researcher Hub</h1>
        <p className="breadcrumb">Home / Researcher</p>
      </header>

      {/* Main Content */}
      <section className="researcher-intro">
        <div className="section-title">
          <span className="blue-bar"></span>
          <h2>Why Publish With Us?</h2>
        </div>
        <p className="sub-text">
          Hum researchers ko ek aisa platform dete hain jahan unki mehnat ko global recognition mile. 
          Niche diye gaye benefits hamare journal ko unique banate hain.
        </p>

        {/* Benefits Grid - Modern Cards */}
        <div className="benefits-grid">
          {benefits.map((item, index) => (
            <div key={index} className="benefit-card">
              <div className="icon-circle">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Resources & Tools Section */}
      <section className="resources-section">
        <div className="section-title">
          <span className="blue-bar"></span>
          <h2>Author Resources</h2>
        </div>
        
        <div className="resource-list">
          <div className="resource-item">
            <div className="res-info">
              <h4>Manuscript Template</h4>
              <p>Download our official MS Word template for easy formatting.</p>
            </div>
            <button className="download-btn">Download .DOCX</button>
          </div>

          <div className="resource-item">
            <div className="res-info">
              <h4>Citation Styles</h4>
              <p>Learn how to cite your work using APA, MLA, or Harvard styles.</p>
            </div>
            <button className="download-btn">View Guide</button>
          </div>

          <div className="resource-item">
            <div className="res-info">
              <h4>Publication Ethics</h4>
              <p>Read about our policies on plagiarism and data integrity.</p>
            </div>
            <button className="download-btn">Read Policy</button>
          </div>
        </div>
      </section>

      {/* Call to Action Box */}
      <div className="cta-box">
        <h3>Ready to share your findings?</h3>
        <p>Join thousands of researchers worldwide and submit your paper today.</p>
        <button className="primary-cta">Start Your Submission</button>
      </div>
    </div>
  );
};

export default Researcher;
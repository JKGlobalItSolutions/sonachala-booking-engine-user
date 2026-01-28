import React from "react";
import { Link } from "react-router-dom";

import { FaBuilding, FaRedoAlt, FaStar, FaUserAlt } from "react-icons/fa"; // Icons similar to the image

const Agent = () => {
  return (
    <div className="ota-page-wrapper" style={{ backgroundColor: "var(--bg-light)", minHeight: "100vh", paddingTop: "120px", fontFamily: "'Inter', sans-serif" }}>
      <div className="container">
        <div className="ota-card mx-auto shadow-sm" style={{ maxWidth: "450px", padding: "0" }}>
          <div className="bg-success text-white px-4 py-3" style={{ borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}>
            <h5 className="fw-800 mb-0">B2B Partner Sign-in</h5>
          </div>
          <div className="p-4">
            <div className="mb-3">
              <label className="small fw-bold text-secondary mb-1">Email / Mobile number</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-0"><i className="fas fa-user text-secondary"></i></span>
                <input type="text" className="form-control bg-light border-0" placeholder="Enter your credentials" />
              </div>
            </div>
            <div className="mb-4">
              <label className="small fw-bold text-secondary mb-1">Password</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-0"><i className="fas fa-lock text-secondary"></i></span>
                <input type="password" className="form-control bg-light border-0" placeholder="••••••••" />
              </div>
            </div>
            <button className="ota-btn-primary w-100 py-2 fw-bold">Sign In</button>
            <div className="mt-3 text-center">
              <span className="text-secondary small">Not a partner? <Link to="/List-your-hotel" className="text-success fw-bold">Register Now</Link></span>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-5">
          <div className="text-center mb-5">
            <h2 className="fw-800 mb-2">Why Partner with Sonachala?</h2>
            <p className="text-secondary">Unlock global growth and seamless management</p>
          </div>
          <div className="row g-4 justify-content-center">
            {[
              { icon: "fa-rocket", title: "Scale Rapidly", text: "Reach millions of global travelers instantly through our optimized platform." },
              { icon: "fa-clock", title: "24/7 Support", text: "Get dedicated assistance around the clock for all your operational needs." },
              { icon: "fa-shield-alt", title: "Secure Payments", text: "Industry-leading security and prompt payouts for every successful booking." },
              { icon: "fa-chart-line", title: "Data Insights", text: "Access powerful analytics to optimize your pricing and occupancy rates." }
            ].map((item, idx) => (
              <div key={idx} className="col-lg-3 col-md-6 text-center">
                <div className="ota-card h-100 py-4 px-3 border-0 shadow-none hover-up">
                  <div className="bg-success-subtle text-success rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: "60px", height: "60px" }}>
                    <i className={`fas ${item.icon} fa-lg`}></i>
                  </div>
                  <h5 className="fw-bold mb-2">{item.title}</h5>
                  <p className="text-secondary small mb-0">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .fw-800 { font-weight: 800; }
        .bg-success-subtle { background-color: rgba(3, 138, 94, 0.1); }
        .hover-up { transition: transform 0.3s ease; }
        .hover-up:hover { transform: translateY(-5px); }
      `}} />
    </div>
  );
};

export default Agent;

import React from "react";

const Hotelpatner = () => {
  return (
    <div className="ota-page-wrapper" style={{ backgroundColor: "var(--bg-light)", minHeight: "100vh", paddingTop: "120px", fontFamily: "'Inter', sans-serif" }}>
      <div className="container">
        <div className="ota-card mx-auto shadow-sm" style={{ maxWidth: "450px", padding: "0" }}>
          <div className="bg-success text-white px-4 py-3" style={{ borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}>
            <h5 className="fw-800 mb-0">Hotel Partner Login</h5>
          </div>
          <div className="p-4">
            <p className="text-secondary small mb-4">Access your property management dashboard</p>
            <div className="mb-3">
              <label className="small fw-bold text-secondary mb-1">Email / Mobile number</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-0"><i className="fas fa-building text-secondary"></i></span>
                <input type="text" className="form-control bg-light border-0" placeholder="Partner ID or Email" />
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
              <span className="text-secondary small">Interested in listing? <Link to="/List-your-hotel" className="text-success fw-bold">Get Started</Link></span>
            </div>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: '.fw-800 { font-weight: 800; }' }} />
    </div>
  );
};

export default Hotelpatner;



import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import event from "../../assets/image/agreementform/event.png"; // Adjust the path as necessary

function EventForm() {
  const [price, setPrice] = useState(1000);

  return (
    <div className="ota-page-wrapper" style={{ backgroundColor: "var(--bg-light)", minHeight: "100vh", paddingTop: "120px", fontFamily: "'Inter', sans-serif" }}>
      <div className="container" style={{ maxWidth: "900px" }}>
        <div className="text-center mb-5">
          <h1 className="fw-800 mb-2">Local Events & Activities</h1>
          <p className="text-secondary">Explore spiritual gatherings, temple festivals, and cultural events</p>
        </div>

        <div className="ota-card shadow-sm p-4">
          <form>
            <div className="row g-3 mb-4">
              <div className="col-md-3">
                <label className="small fw-bold text-secondary mb-1">Event Name</label>
                <input type="text" className="form-control bg-light border-0 p-2" placeholder="Search events..." />
              </div>
              <div className="col-md-3">
                <label className="small fw-bold text-secondary mb-1">Event Type</label>
                <select className="form-select bg-light border-0 p-2">
                  <option>All Types</option>
                  <option>Spiritual</option>
                  <option>Cultural</option>
                  <option>Festival</option>
                </select>
              </div>
              <div className="col-md-3">
                <label className="small fw-bold text-secondary mb-1">Language</label>
                <select className="form-select bg-light border-0 p-2">
                  <option>All Languages</option>
                  <option>Tamil</option>
                  <option>English</option>
                  <option>Hindi</option>
                </select>
              </div>
              <div className="col-md-3">
                <label className="small fw-bold text-secondary mb-1">City</label>
                <input type="text" className="form-control bg-light border-0 p-2" placeholder="Tiruvannamalai" />
              </div>
            </div>

            <div className="row g-3 mb-4 align-items-end">
              <div className="col-md-3">
                <label className="small fw-bold text-secondary mb-1">From Date</label>
                <input type="date" className="form-control bg-light border-0 p-2" />
              </div>
              <div className="col-md-3">
                <label className="small fw-bold text-secondary mb-1">To Date</label>
                <input type="date" className="form-control bg-light border-0 p-2" />
              </div>
              <div className="col-md-6 d-flex gap-2">
                <button type="button" className="btn btn-outline-success flex-grow-1 py-2 fw-bold small">Today</button>
                <button type="button" className="btn btn-outline-success flex-grow-1 py-2 fw-bold small">Tomorrow</button>
                <button type="button" className="btn btn-outline-success flex-grow-1 py-2 fw-bold small">This Weekend</button>
              </div>
            </div>

            <div className="mb-5">
              <label className="small fw-bold text-secondary mb-3 d-block">Price Range (₹{price})</label>
              <input type="range" className="form-range" min="0" max="5000" step="100" value={price} onChange={(e) => setPrice(e.target.value)} />
              <div className="d-flex justify-content-between small text-muted mt-1">
                <span>Free</span>
                <span>₹5,000+</span>
              </div>
            </div>

            <div className="text-center">
              <button type="submit" className="ota-btn-primary px-5 py-3 fw-800">
                <i className="fas fa-search me-2"></i> Find Events
              </button>
            </div>
          </form>
        </div>

        <div className="mt-5 text-center">
          <p className="text-secondary small mb-4 font-italic">Partner Spotlight</p>
          <img src={event} alt="Event Promotion" className="img-fluid rounded-4 shadow-sm" style={{ maxWidth: "400px" }} />
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: '.fw-800 { font-weight: 800; }' }} />
    </div>
  );
}

export default EventForm;

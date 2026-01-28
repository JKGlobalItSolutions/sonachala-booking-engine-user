import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function BusForm() {
  return (
    <div className="ota-page-wrapper" style={{ backgroundColor: "var(--bg-light)", minHeight: "100vh", paddingTop: "120px", fontFamily: "'Inter', sans-serif" }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        <div className="text-center mb-5">
          <h1 className="fw-800 mb-2">Bus Search</h1>
          <p className="text-secondary">Comfortable and affordable travel across the country</p>
        </div>

        <div className="ota-card shadow-sm p-4">
          <form className="row g-3">
            <div className="col-md-4">
              <label className="small fw-bold text-secondary mb-1">From</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-0"><i className="fas fa-bus text-secondary"></i></span>
                <select className="form-select bg-light border-0" id="fromCity">
                  <option>Select Departure City</option>
                  <option>Tiruvannamalai</option>
                  <option>Chennai</option>
                  <option>Bangalore</option>
                </select>
              </div>
            </div>

            <div className="col-md-4">
              <label className="small fw-bold text-secondary mb-1">To</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-0"><i className="fas fa-map-marker-alt text-secondary"></i></span>
                <select className="form-select bg-light border-0" id="toCity">
                  <option>Select Destination City</option>
                  <option>Chennai</option>
                  <option>Bangalore</option>
                  <option>Pondicherry</option>
                </select>
              </div>
            </div>

            <div className="col-md-4">
              <label className="small fw-bold text-secondary mb-1">Departure Date</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-0"><i className="fas fa-calendar-alt text-secondary"></i></span>
                <input type="date" className="form-control bg-light border-0" id="departureDate" />
              </div>
            </div>

            <div className="col-12 text-center mt-5">
              <button type="submit" className="ota-btn-primary px-5 py-3 fw-800">
                <i className="fas fa-search me-2"></i> Search Buses
              </button>
            </div>
          </form>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: '.fw-800 { font-weight: 800; }' }} />
    </div>
  );
}

export default BusForm;

import React, { useState } from "react";
import { FaSearch, FaCalendarAlt, FaUserFriends } from "react-icons/fa";
import emailjs from '@emailjs/browser';

const Flightform = () => {
  const [activeTab, setActiveTab] = useState("oneWay");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  const handleCountChange = (setter, value) => {
    if (value >= 0) setter(value);
  };

  const handleSearch = () => {
    alert(`Searching ${activeTab} flights...`);
  };

  const InputGroup = ({ label, value, setValue }) => (
    <div className="d-flex align-items-center gap-2">
      <label className="fw-medium">{label}</label>
      <button
        className="btn btn-success btn-sm"
        onClick={() => handleCountChange(setValue, value - 1)}
        disabled={value <= 0}
      >
        -
      </button>
      <span className="fw-bold">{value}</span>
      <button
        className="btn btn-success btn-sm"
        onClick={() => handleCountChange(setValue, value + 1)}
      >
        +
      </button>
    </div>
  );

  const FlightInputs = () => (
    <div className="row mb-3">
      <div className="col-12 col-md-4 mb-3 mb-md-0">
        <label className="form-label">From</label>
        <input
          type="text"
          className="form-control"
          placeholder="City or Airport"
        />
      </div>
      <div className="col-12 col-md-4 mb-3 mb-md-0">
        <label className="form-label">To</label>
        <input
          type="text"
          className="form-control"
          placeholder="City or Airport"
        />
      </div>
      <div className="col-12 col-md-4">
        <label className="form-label">Date</label>
        <input type="date" className="form-control" />
      </div>
    </div>
  );

  const PassengerSection = () => (
    <div className="d-flex flex-column flex-md-row gap-3 mb-4 align-items-start">
      <InputGroup label="Adults" value={adults} setValue={setAdults} />
      <InputGroup label="Children" value={children} setValue={setChildren} />
      <InputGroup label="Infants" value={infants} setValue={setInfants} />
    </div>
  );

  const tabColors = {
    oneWay: "#e6f4ea", // pastel green
    roadTrip: "#fff7da", // pastel yellow
    multiCity: "#e5f0ff", // pastel blue
  };

  return (
    <div className="ota-page-wrapper" style={{ backgroundColor: "var(--bg-light)", minHeight: "100vh", paddingTop: "120px", fontFamily: "'Inter', sans-serif" }}>
      <div className="container" style={{ maxWidth: "900px" }}>
        <div className="text-center mb-5">
          <h1 className="fw-800 mb-2">Book Your Next Flight</h1>
          <p className="text-secondary">Search and compare the best deals from hundreds of airlines</p>
        </div>

        <div className="ota-card shadow-sm p-0 overflow-hidden">
          {/* Professional Pill Tabs */}
          <div className="d-flex bg-light p-2 gap-2 border-bottom">
            {["oneWay", "roadTrip", "multiCity"].map((tab) => (
              <button
                key={tab}
                className={`btn flex-grow-1 py-2 fw-bold small ${activeTab === tab ? "bg-white shadow-sm text-success" : "text-secondary border-0"}`}
                onClick={() => setActiveTab(tab)}
                style={{ borderRadius: "8px", transition: "all 0.2s" }}
              >
                {tab === "oneWay" ? "One Way" : tab === "roadTrip" ? "Round Trip" : "Multi-City"}
              </button>
            ))}
          </div>

          <div className="p-4">
            {activeTab === "multiCity" ? (
              <div className="mb-4">
                <div className="d-flex gap-2 mb-4">
                  <button className="ota-btn-primary py-1 px-3 small">Flight 1</button>
                  <button className="btn btn-outline-success py-1 px-3 small">Flight 2</button>
                  <button className="btn btn-outline-secondary py-1 px-3 small">+ Add Flight</button>
                </div>
                <div className="border-bottom pb-4 mb-4"><FlightInputs /></div>
                <FlightInputs />
              </div>
            ) : (
              <div className="mb-4">
                <FlightInputs />
                {activeTab === "roadTrip" && (
                  <div className="row mt-3">
                    <div className="col-md-4">
                      <label className="small fw-bold text-secondary mb-1">Return Date</label>
                      <input type="date" className="form-control bg-light border-0" />
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="bg-light p-3 rounded-3 mb-4">
              <label className="small fw-bold text-secondary mb-3 d-block">Passengers</label>
              <PassengerSection />
            </div>

            <div className="d-flex justify-content-between align-items-center mt-5">
              <div className="text-secondary small">
                <i className="fas fa-info-circle me-1"></i> Flexible dates can save you up to 20%
              </div>
              <button className="ota-btn-primary px-5 py-3 fw-800" onClick={handleSearch}>
                <i className="fas fa-search me-2"></i> Search Flights
              </button>
            </div>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{
        __html: `
        .fw-800 { font-weight: 800; }
        .form-control:focus { box-shadow: none; border-color: var(--brand-primary); }
      `}} />
    </div>
  );
};

export default Flightform;

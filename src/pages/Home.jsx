import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HomeAdvertisingSlider from "../common/HomeAdvertisingSlider";
import PartnersCarousel from "../common/PartnersCarousel";
import "./Home.css";

const Home = () => {
  const [destination, setDestination] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    // Initialize date inputs with default values
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const formatDate = (date) => {
      return date.toISOString().split('T')[0];
    };

    setCheckInDate(formatDate(today));
    setCheckOutDate(formatDate(tomorrow));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    // Create search parameters
    const searchParams = new URLSearchParams({
      destination: destination || "Tiruvannamalai",
      checkIn: checkInDate,
      checkOut: checkOutDate,
      adults: adults.toString(),
      children: children.toString()
    });

    // Navigate to hotels page with search parameters
    window.location.href = `/hotels?${searchParams.toString()}`;
  };

  const incrementAdults = () => setAdults(prev => Math.min(prev + 1, 10));
  const decrementAdults = () => setAdults(prev => Math.max(prev - 1, 1));
  const incrementChildren = () => setChildren(prev => Math.min(prev + 1, 5));
  const decrementChildren = () => setChildren(prev => Math.max(prev - 1, 0));

  const formatDateDisplay = (date) => {
    if (!date) return "Check-in - Check-out";
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatGuestsDisplay = () => {
    const adultsText = adults === 1 ? "1 adult" : `${adults} adults`;
    const childrenText = children === 0 ? "" : children === 1 ? " · 1 child" : ` · ${children} children`;
    return `${adultsText}${childrenText}`;
  };

  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const diffTime = checkOut - checkIn;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="home-container">
      <main>
        {/* Professional OTA Hero Section */}
        <section className="hero-section">
          <div className="hero-overlay"></div>
          <div className="container hero-content-wrapper">
            <div className="row">
              <div className="col-lg-12 text-center text-white">
                <h1 className="hero-title animate-fade-in">
                  Discover Your Perfect Stay
                </h1>
                <p className="hero-subtitle animate-fade-in-delayed">
                  Experience spiritual bliss and luxury in Tiruvannamalai
                </p>

                {/* Enhanced Search Bar Section */}
                <div className="hero-search-container animate-slide-up">
                  <form onSubmit={handleSearch} className="search-bar-wrapper">
                    <div className="search-input-group flex-grow-1">
                      <i className="fas fa-map-marker-alt"></i>
                      <input
                        type="text"
                        placeholder="Where are you going?"
                        className="search-input"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        onFocus={(e) => e.target.placeholder = ""}
                        onBlur={(e) => e.target.placeholder = "Where are you going?"}
                      />
                    </div>
                    <div className="search-divider d-none d-md-block"></div>
                    <div className="search-input-group position-relative">
                      <i className="fas fa-calendar-alt"></i>
                      <input
                        type="text"
                        placeholder="Check-in - Check-out"
                        className="search-input"
                        value={checkInDate && checkOutDate ? `${formatDateDisplay(checkInDate)} — ${formatDateDisplay(checkOutDate)}` : "Check-in - Check-out"}
                        readOnly
                        onClick={() => setShowDatePicker(!showDatePicker)}
                        style={{ cursor: "pointer" }}
                      />
                      {showDatePicker && (
                        <div className="date-dropdown">
                          <div className="date-picker-header">
                            <span className="date-picker-title">Select Dates</span>
                            <button
                              type="button"
                              className="close-btn"
                              onClick={() => setShowDatePicker(false)}
                            >
                              <i className="fas fa-times"></i>
                            </button>
                          </div>
                          <div className="date-range-container">
                            <div className="date-input-row">
                              <label className="date-label">Check-in</label>
                              <input
                                type="date"
                                className="date-picker-input"
                                value={checkInDate}
                                onChange={(e) => {
                                  setCheckInDate(e.target.value);
                                  // Auto-set check-out to next day if check-in is after current check-out
                                  if (e.target.value && (!checkOutDate || e.target.value >= checkOutDate)) {
                                    const nextDay = new Date(e.target.value);
                                    nextDay.setDate(nextDay.getDate() + 1);
                                    setCheckOutDate(nextDay.toISOString().split('T')[0]);
                                  }
                                }}
                                min={new Date().toISOString().split('T')[0]}
                                required
                              />
                            </div>
                            <div className="date-input-row">
                              <label className="date-label">Check-out</label>
                              <input
                                type="date"
                                className="date-picker-input"
                                value={checkOutDate}
                                onChange={(e) => setCheckOutDate(e.target.value)}
                                min={checkInDate || new Date().toISOString().split('T')[0]}
                                required
                              />
                            </div>
                          </div>
                          <div className="date-picker-footer">
                            <span className="date-days-count">
                              {checkInDate && checkOutDate ? `${calculateNights()} nights` : "Select dates"}
                            </span>
                            <button
                              type="button"
                              className="apply-dates-btn"
                              onClick={() => setShowDatePicker(false)}
                            >
                              Apply
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="search-divider d-none d-md-block"></div>
                    <div className="search-input-group position-relative">
                      <i className="fas fa-user-friends"></i>
                      <input
                        type="text"
                        placeholder={formatGuestsDisplay()}
                        className="search-input"
                        value={formatGuestsDisplay()}
                        readOnly
                        onClick={() => setShowGuestDropdown(!showGuestDropdown)}
                        style={{ cursor: "pointer" }}
                      />
                      {showGuestDropdown && (
                        <div className="guest-dropdown">
                          <div className="guest-row">
                            <div className="guest-info">
                              <span className="guest-label">Adults</span>
                              <span className="guest-sublabel">Ages 13+</span>
                            </div>
                            <div className="guest-controls">
                              <button type="button" className="guest-btn" onClick={decrementAdults} disabled={adults <= 1}>
                                <i className="fas fa-minus"></i>
                              </button>
                              <span className="guest-count">{adults}</span>
                              <button type="button" className="guest-btn" onClick={incrementAdults} disabled={adults >= 10}>
                                <i className="fas fa-plus"></i>
                              </button>
                            </div>
                          </div>
                          <div className="guest-row">
                            <div className="guest-info">
                              <span className="guest-label">Children</span>
                              <span className="guest-sublabel">Ages 2-12</span>
                            </div>
                            <div className="guest-controls">
                              <button type="button" className="guest-btn" onClick={decrementChildren} disabled={children <= 0}>
                                <i className="fas fa-minus"></i>
                              </button>
                              <span className="guest-count">{children}</span>
                              <button type="button" className="guest-btn" onClick={incrementChildren} disabled={children >= 5}>
                                <i className="fas fa-plus"></i>
                              </button>
                            </div>
                          </div>
                          <div className="guest-actions">
                            <button type="button" className="done-btn" onClick={() => setShowGuestDropdown(false)}>
                              Done
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    <button type="submit" className="search-btn">
                      <i className="fas fa-search me-2"></i> Search
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Home Content Sections */}
        <div className="container ota-section">
          <div className="row mb-5">
            <div className="col-12">
              <h2 className="section-heading">Why Book with Sonachala?</h2>
              <p className="section-subheading">Your gateway to sacred sanctuaries and unparalleled hospitality</p>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="feature-card-new">
                <div className="feature-icon-new"><i className="fas fa-om"></i></div>
                <h5 className="h4 mt-3">Spiritual Journey</h5>
                <p className="text-secondary">Connect with ancient wisdom and find inner peace in the shadow of Mount Arunachala.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card-new">
                <div className="feature-icon-new"><i className="fas fa-umbrella-beach"></i></div>
                <h5 className="h4 mt-3">Primal Beaches</h5>
                <p className="text-secondary">Tranquil shores and coastal serenity just a short drive from the temple city.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card-new">
                <div className="feature-icon-new"><i className="fas fa-concierge-bell"></i></div>
                <h5 className="h4 mt-3">Curated Stays</h5>
                <p className="text-secondary">Hand-picked hotels and homestays that guarantee comfort and authentic experiences.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="additional-content">
          <div className="container">
            <HomeAdvertisingSlider />
          </div>
          <PartnersCarousel />
        </div>
      </main>

      <style dangerouslySetInnerHTML={{
        __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
        .animate-fade-in-delayed { animation: fadeIn 0.8s ease-out 0.3s forwards; opacity: 0; }
        .animate-slide-up { animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards; opacity: 0; }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }

        /* Enhanced Search Form Styles */
        .date-input {
          background: transparent;
          border: none;
          outline: none;
          font-weight: 500;
          font-size: 0.95rem;
          color: var(--text-primary);
          width: 45%;
          padding: 0 5px;
          cursor: pointer;
        }

        .date-input::-webkit-calendar-picker-indicator {
          cursor: pointer;
          opacity: 0.8;
          filter: invert(1) brightness(2);
        }

        .date-input:hover::-webkit-calendar-picker-indicator {
          opacity: 1;
        }

        .date-separator {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(255, 255, 255, 0.1);
          padding: 0 10px;
          border-radius: 20px;
          font-size: 0.8rem;
          color: #9ca3af;
          pointer-events: none;
        }

        .guest-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          border-radius: 12px;
          padding: 1rem;
          box-shadow: var(--shadow-lg);
          border: 1px solid var(--border-color);
          z-index: 1000;
          margin-top: 8px;
          animation: dropdownSlideIn 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes dropdownSlideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .guest-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 0;
          border-bottom: 1px solid #e5e7eb;
        }

        .guest-row:last-child {
          border-bottom: none;
        }

        .guest-info {
          display: flex;
          flex-direction: column;
        }

        .guest-label {
          font-weight: 600;
          font-size: 0.9rem;
          color: #1f2937;
        }

        .guest-sublabel {
          font-size: 0.75rem;
          color: #6b7280;
          margin-top: 2px;
        }

        .guest-controls {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .guest-btn {
          width: 32px;
          height: 32px;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          background: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .guest-btn:hover:not(:disabled) {
          background: #f3f4f6;
          border-color: #d1d5db;
        }

        .guest-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .guest-count {
          font-weight: 600;
          font-size: 1rem;
          min-width: 24px;
          text-align: center;
        }

        .guest-actions {
          display: flex;
          justify-content: flex-end;
          padding-top: 1rem;
          border-top: 1px solid #e5e7eb;
          margin-top: 0.5rem;
        }

        .done-btn {
          background: var(--brand-primary);
          color: white;
          border: none;
          padding: 8px 20px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .done-btn:hover {
          background: #027a53;
        }

        /* Overlay to close dropdown when clicking outside */
        .guest-dropdown::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: -1;
        }

        /* Fancy Date Picker Styles */
        .date-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: var(--shadow-lg);
          border: 1px solid var(--border-color);
          z-index: 1000;
          margin-top: 8px;
          animation: dropdownSlideIn 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .date-picker-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .date-picker-title {
          font-weight: 700;
          font-size: 1.1rem;
          color: #1f2937;
        }

        .close-btn {
          background: none;
          border: none;
          cursor: pointer;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          color: #6b7280;
        }

        .close-btn:hover {
          background: #f3f4f6;
          color: #1f2937;
        }

        .date-range-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .date-input-row {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .date-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .date-picker-input {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 500;
          color: #1f2937;
          background: white;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .date-picker-input:focus {
          outline: none;
          border-color: var(--brand-primary);
          box-shadow: 0 0 0 3px rgba(3, 138, 94, 0.1);
        }

        .date-picker-input::-webkit-calendar-picker-indicator {
          cursor: pointer;
          opacity: 0.8;
          filter: none;
        }

        .date-picker-input:hover::-webkit-calendar-picker-indicator {
          opacity: 1;
        }

        .date-picker-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1rem;
          border-top: 1px solid #e5e7eb;
        }

        .date-days-count {
          font-size: 0.9rem;
          font-weight: 600;
          color: #1f2937;
          background: #f3f4f6;
          padding: 8px 16px;
          border-radius: 20px;
        }

        .apply-dates-btn {
          background: var(--brand-primary);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(3, 138, 94, 0.3);
        }

        .apply-dates-btn:hover {
          background: #027a53;
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(3, 138, 94, 0.4);
        }
      `}} />
    </div>
  );
};

export default Home;

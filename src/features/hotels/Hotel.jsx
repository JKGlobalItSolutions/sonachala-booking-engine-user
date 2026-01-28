import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import HomeAdvertisingSlider from "../../common/HomeAdvertisingSlider";
import PartnersCarousel from "../../common/PartnersCarousel";
import "./Hotel.css";

function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [bookingLocation, setBookingLocation] = useState("Tiruvannamalai");
  const [dates, setDates] = useState("");
  const [guests, setGuests] = useState("Guests: 2, Rooms: 1");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [showGuestsDropdown, setShowGuestsDropdown] = useState(false);
  const datePickerRef = useRef(null);
  const guestsDropdownRef = useRef(null);
  const flatpickrInstance = useRef(null);

  useEffect(() => {
    // Initial setup for dates
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };
    const defaultDates = `${formatDate(today)} - ${formatDate(tomorrow)}`;
    setDates(defaultDates);

    // Initialize Flatpickr
    flatpickrInstance.current = flatpickr(datePickerRef.current, {
      mode: "range",
      dateFormat: "Y-m-d",
      minDate: "today",
      defaultDate: [today, tomorrow],
      onChange: (selectedDates) => {
        if (selectedDates.length === 2) {
          const [checkin, checkout] = selectedDates.map(formatDate);
          setDates(`${checkin} - ${checkout}`);
          localStorage.setItem("checkIn", checkin);
          localStorage.setItem("checkOut", checkout);
        }
      }
    });

    const handleClickOutside = (event) => {
      if (guestsDropdownRef.current && !guestsDropdownRef.current.contains(event.target)) {
        setShowGuestsDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (flatpickrInstance.current) flatpickrInstance.current.destroy();
    };
  }, []);

  const updateGuestsDisplay = (a, c, r) => {
    setGuests(`Guests: ${a + c}, Rooms: ${r}`);
  };

  const incrementValue = (setter, value, maxValue, type) => {
    if (value < maxValue) {
      const newValue = value + 1;
      setter(newValue);
      // Auto-update display if it's a simple increment
      if (type === 'adults') updateGuestsDisplay(newValue, children, rooms);
      if (type === 'children') updateGuestsDisplay(adults, newValue, rooms);
      if (type === 'rooms') updateGuestsDisplay(adults, children, newValue);
    }
  };

  const decrementValue = (setter, value, minValue, type) => {
    if (value > minValue) {
      const newValue = value - 1;
      setter(newValue);
      if (type === 'adults') updateGuestsDisplay(newValue, children, rooms);
      if (type === 'children') updateGuestsDisplay(adults, newValue, rooms);
      if (type === 'rooms') updateGuestsDisplay(adults, children, newValue);
    }
  };

  const handleDone = () => {
    setShowGuestsDropdown(false);
    updateGuestsDisplay(adults, children, rooms);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const [checkIn, checkOut] = dates.split(" - ");
    const params = new URLSearchParams({
      location: bookingLocation,
      checkIn: checkIn || dates.split(" - ")[0],
      checkOut: checkOut || dates.split(" - ")[1],
      adults: adults.toString(),
      children: children.toString(),
      rooms: rooms.toString()
    });

    // Persist to local storage
    localStorage.setItem("location", bookingLocation);
    localStorage.setItem("adults", adults.toString());
    localStorage.setItem("children", children.toString());
    localStorage.setItem("rooms", rooms.toString());
    if (checkIn && checkOut) {
      localStorage.setItem("checkIn", checkIn);
      localStorage.setItem("checkOut", checkOut);
    }

    navigate(`/HotelList?${params.toString()}`);
  };

  return (
    <div className="hotel-page-container">
      {/* Hero Section */}
      <section className="hotel-hero" style={{
        backgroundImage: `url(${import.meta.env.BASE_URL}assets/img/hero.jpeg)`
      }}>
        <div className="hotel-hero-overlay"></div>
        <div className="hotel-hero-content">
          <h1 className="hotel-hero-title text-white">Find Your Perfect Stay</h1>
          <p className="hotel-hero-subtitle" style={{ color: '#d8d3d3db' }}>Discover handpicked hotels and homestays at the best prices.</p>
        </div>
      </section>

      {/* Search Section */}
      <div className="container">
        <div className="hotel-search-wrapper">
          <form onSubmit={handleSubmit} className="hotel-search-box">

            {/* Location Input */}
            <div className="search-field">
              <i className="fas fa-map-marker-alt search-icon"></i>
              <input
                type="text"
                className="search-input-control"
                placeholder="Where are you going?"
                value={bookingLocation}
                onChange={(e) => setBookingLocation(e.target.value)}
                required
              />
            </div>

            {/* Date Picker */}
            <div className="search-field">
              <i className="fas fa-calendar-alt search-icon"></i>
              <input
                type="text"
                className="search-input-control"
                placeholder="Check-in - Check-out"
                value={dates}
                ref={datePickerRef}
                readOnly
                required
              />
            </div>

            {/* Guests Dropdown */}
            <div className="search-field" ref={guestsDropdownRef} style={{ cursor: 'pointer' }}>
              <i className="fas fa-user-friends search-icon"></i>
              <input
                type="text"
                className="search-input-control"
                value={guests}
                readOnly
                onClick={() => setShowGuestsDropdown(!showGuestsDropdown)}
                style={{ cursor: 'pointer' }}
              />

              {showGuestsDropdown && (
                <div className="guests-dropdown-panel">
                  <div className="guest-control-row">
                    <span className="guest-control-label">Adults</span>
                    <div className="guest-counter">
                      <button type="button" className="counter-btn" onClick={() => decrementValue(setAdults, adults, 1, 'adults')}>-</button>
                      <span className="counter-value">{adults}</span>
                      <button type="button" className="counter-btn" onClick={() => incrementValue(setAdults, adults, 30, 'adults')}>+</button>
                    </div>
                  </div>

                  <div className="guest-control-row">
                    <span className="guest-control-label">Children</span>
                    <div className="guest-counter">
                      <button type="button" className="counter-btn" onClick={() => decrementValue(setChildren, children, 0, 'children')}>-</button>
                      <span className="counter-value">{children}</span>
                      <button type="button" className="counter-btn" onClick={() => incrementValue(setChildren, children, 10, 'children')}>+</button>
                    </div>
                  </div>

                  <div className="guest-control-row">
                    <span className="guest-control-label">Rooms</span>
                    <div className="guest-counter">
                      <button type="button" className="counter-btn" onClick={() => decrementValue(setRooms, rooms, 1, 'rooms')}>-</button>
                      <span className="counter-value">{rooms}</span>
                      <button type="button" className="counter-btn" onClick={() => incrementValue(setRooms, rooms, 30, 'rooms')}>+</button>
                    </div>
                  </div>

                  <button type="button" className="guests-done-btn" onClick={handleDone}>Done</button>
                </div>
              )}
            </div>

            <button type="submit" className="search-submit-btn">
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="container mb-5">
        <HomeAdvertisingSlider />
        <PartnersCarousel />
      </div>

    </div>
  );
}

export default HomePage;

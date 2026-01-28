import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaArrowLeft, FaRupeeSign } from "react-icons/fa";
// import qrImage from "../assets/upi/qr-placeholder.png";
// import upiApps from "../assets/upi/upi-apps.png";

// import upiswcan from "../Upi/upiscan.png";
// import upiswcantop from "../Upi/upiscan1.png";
// import upiid from "../Upi/upiid.png";

// import allupiimg from "../Upi/allupiimg.png";
import { FaInfoCircle } from "react-icons/fa";

import { Link } from "react-router-dom";

const Cards = () => {
  const location = useLocation();
  const bookingData = location.state?.bookingData;

  const [upiId, setUpiId] = useState("");
  const [error, setError] = useState("");

  const handlePaymentRequest = () => {
    if (!upiId.includes("@")) {
      setError("Please enter a valid UPI ID (example@upi)");
    } else {
      setError("");
      alert("Payment request sent to: " + upiId);
    }
  };

  const guestName = bookingData?.["Full Name"] || "Guest";
  const guestEmail = bookingData?.["Email Address"] || "example@email.com";
  const guestPhone = bookingData?.["Phone Number"] || "N/A";
  const totalPrice = bookingData?.["Total Price"] || 0;
  const basePrice = totalPrice * 0.9;
  const tax = totalPrice * 0.1;
  const totalNights = bookingData?.["Total Nights"] || 1;
  const roomsCount = bookingData?.Rooms?.length || 1;
  const adultsCount = bookingData?.["Total Adults"] || 1;
  const childrenCount = bookingData?.["Total Children"] || 0;
  const propertyName = bookingData?.["Property Name"] || "Hotel";
  const propertyAddress = bookingData?.["Property Address"] || "N/A";

  const checkIn = bookingData?.["Check-In Date"]
    ? new Date(bookingData["Check-In Date"].seconds * 1000).toLocaleDateString(
        "en-IN"
      )
    : "N/A";

  const checkOut = bookingData?.["Check-Out Date"]
    ? new Date(bookingData["Check-Out Date"].seconds * 1000).toLocaleDateString(
        "en-IN"
      )
    : "N/A";

  return (
    <div className="container my-4">
      {/* Hotel Booking Summary */}
      <div className="row">
        <div className="col-lg-12  col-md-8">
          <div className="card shadow-sm mb-3">
            <div className="card-body d-flex flex-column flex-md-row justify-content-between align-items-start">
              <div>
                <p className="mb-1">
                  <strong>Guest Name:</strong> {guestName}
                </p>
                <p className="mb-1">
                  <strong>Hotel Name:</strong> {propertyName}
                </p>
                <p className="mb-1">
                  <strong>Hotel Address:</strong> {propertyAddress}
                </p>
                <p className="mb-1">
                  <strong>Stay Dates:</strong> 📅 {checkIn} → {checkOut}
                </p>
                <p className="mb-1">
                  <strong>Rooms & Guests:</strong> 🛏️ {roomsCount} Room | 👤{" "}
                  {adultsCount} Adults, {childrenCount} Children
                </p>
                <p className="mb-1">
                  <strong>Total Nights:</strong> 🕒 {totalNights} Night(s)
                </p>
                <p className="mb-0">
                  <strong>Contact:</strong> 📧 {guestEmail}, 📱 +91-{guestPhone}
                </p>
              </div>
              <div className="text-end">
                <p className="text-muted mb-1">
                  <strong>Total Due</strong>
                </p>
                <h4 className="text-success mb-0">
                  <FaRupeeSign /> {totalPrice.toLocaleString("en-IN")}
                </h4>
                <small className="text-muted">
                  <strong>Breakup:</strong> Hotel Fare ₹{basePrice.toFixed(2)} +
                  Taxes ₹{tax.toFixed(2)}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>





  <div className="mb-3">
            <Link
              to="/PaymentPage"
              state={{ bookingData }}
              className="btn btn-link text-success p-0 text-decoration-none "
            >
              <FaArrowLeft className="me-1" /> ALL PAYMENT OPTIONS
            </Link>
          </div>






      {/* UPI Payment Section */}
     <div className="card shadow-sm p-4 rounded" style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h5 className="mb-3 fw-bold">Credit & Debit Cards</h5>
      <div className="d-flex align-items-start mb-3">
        <img
          src="https://cdn-icons-png.flaticon.com/512/633/633611.png" // Card icon placeholder
          alt="card icon"
          style={{ width: "32px", height: "32px", marginRight: "10px" }}
        />
        <div>
          <p className="mb-0 fw-semibold">Enter card details</p>
          <small className="text-muted">We support all major domestic & international cards</small>
        </div>
      </div>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="ENTER CARD NUMBER"
          maxLength="19"
        />
      </div>

      <div className="row g-2 mb-3">
        <div className="col-md-4">
          <select className="form-select">
            <option>MM</option>
            {[...Array(12)].map((_, i) => (
              <option key={i} value={i + 1}>
                {(i + 1).toString().padStart(2, "0")}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <select className="form-select">
            <option>YY</option>
            {[...Array(10)].map((_, i) => {
              const year = new Date().getFullYear() + i;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
        </div>

        <div className="col-md-4">
          <div className="input-group">
            <input
              type="password"
              className="form-control"
              placeholder="ENTER CVV"
              maxLength="3"
            />
            <span className="input-group-text">
              <FaInfoCircle />
            </span>
          </div>
        </div>
      </div>

      <button className="btn btn-secondary w-100" disabled>
        Pay Now
      </button>
    </div>
    </div>
  );
};

export default Cards;

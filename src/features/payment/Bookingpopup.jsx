import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaCreditCard } from "react-icons/fa"; // Payment & Confirmation icons

const BookingPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setShowPopup(true);
  }, []);

  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Segoe UI, sans-serif",
          }}
        >
          <div
            style={{
              background: "linear-gradient(to bottom, #ffffff, #f5f5f5)",
              width: "650px",
              height: "360px",
              padding: "40px",
              borderRadius: "16px",
              textAlign: "center",
              boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            {/* Top Icons */}
            <div style={{ marginBottom: "20px" }}>
              <FaCreditCard size={50} color="#FFB800" style={{ marginRight: "15px" }} />
              <FaCheckCircle size={50} color="#04B486" />
            </div>

            <h2
              style={{
                marginBottom: "15px",
                fontSize: "26px",
                fontWeight: "600",
                color: "#333",
              }}
            >
              Booking Confirmed!
            </h2>

            <p style={{ fontSize: "18px", color: "#555", lineHeight: "1.6" }}>
              Your room booking is successful.<br />
              Please proceed to complete your payment.
            </p>

            <p style={{ fontSize: "14px", color: "#888", marginTop: "10px" }}>
              * Payment ensures your reservation is fully locked in.
            </p>

            <button
              style={{
                marginTop: "25px",
                backgroundColor: "#038A5E",
                color: "#fff",
                border: "none",
                padding: "12px 28px",
                fontSize: "16px",
                fontWeight: "bold",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "0.3s",
              }}
              onClick={handleClose}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#02704C")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#038A5E")}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default BookingPopup;

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useLocation } from "react-router-dom";

import upi from "./paymentpageimages/upi.png";
import creditcard from "./paymentpageimages/creditcard.png";
import netbanking from "./paymentpageimages/netbanking.png";
import paylater from "./paymentpageimages/paylater.png";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state?.bookingData;



console.log("UPI PAGE bookingData:", bookingData);
console.log("bookingId:", bookingData?.id);




  return (
    <div className="container my-5">
      <div className="row gy-4">
        {/* Left Column */}
        <div className="col-md-8">
          {/* Booking Info */}

          <div className="card p-3">
            <h5 className="text-success border-bottom pb-2 mb-3 fw-bold">
              🏨 Booking Information
            </h5>

            <div className="d-flex justify-content-between align-items-start">
              <div>
                <p className="mb-1">
                  <strong>Guest Name:</strong>{" "}
                  {bookingData?.["Full Name"] || "Guest"}
                </p>

                <p className="mb-1">
                  <strong>Check-In:</strong>{" "}
                  {new Date(
                    bookingData?.["Check-In Date"]?.seconds * 1000
                  ).toLocaleDateString()}{" "}
                  → <strong>Check-Out:</strong>{" "}
                  {new Date(
                    bookingData?.["Check-Out Date"]?.seconds * 1000
                  ).toLocaleDateString()}
                </p>

                <p className="mb-1">
                  <strong>Stay Details:</strong>{" "}
                  {bookingData?.Rooms?.length || 1} Room |{" "}
                  {bookingData?.["Total Adults"] || 2} Adults |{" "}
                  {bookingData?.["Total Nights"] || 1} Night
                </p>

                <p className="mb-0">
                  <strong>Email:</strong>{" "}
                  {bookingData?.["Email Address"] || "N/A"},{" "}
                  <strong>Phone:</strong>{" "}
                  {bookingData?.["Phone Number"] || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Options */}
          <div className="card p-3 mt-3">
            <h5 className="mb-3">Payment Options</h5>

            <div className="list-group">
              <div
                className="list-group-item d-flex justify-content-between align-items-center list-group-item-action"
                role="button"
                // onClick={() => navigate("/upi", { state: { bookingData } })}
                onClick={() =>
                  navigate("/upi", {
                    state: {
                      bookingData: { ...bookingData, id: bookingData?.id },
                    },
                  })
                }
                style={{ cursor: "pointer" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src={upi}
                    alt="UPI"
                    className="me-3"
                    style={{ width: "40px" }}
                  />
                  <span>UPI Options</span>
                </div>
                <small className="text-muted">
                  Pay Directly From Your Bank Account
                </small>
              </div>

              <div
                className="list-group-item d-flex justify-content-between align-items-center list-group-item-action"
                role="button"
                onClick={() => navigate("/cards", { state: { bookingData } })}
                style={{ cursor: "pointer" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src={creditcard}
                    alt="Credit Card"
                    className="me-3"
                    style={{ width: "40px" }}
                  />
                  <span>Credit & Debit Cards</span>
                </div>
                <small className="text-muted">
                  Visa, Mastercard, Amex, Rupay and more
                </small>
              </div>

              {/* <div
                className="list-group-item d-flex justify-content-between align-items-center list-group-item-action"
                role="button"
                style={{ cursor: "pointer" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src={netbanking}
                    alt="Net Banking"
                    className="me-3"
                    style={{ width: "40px" }}
                  />
                  <span>Net Banking</span>
                </div>
                <small className="text-muted">40+ Banks Available</small>
              </div> */}

              <div
                className="list-group-item d-flex justify-content-between align-items-center list-group-item-action"
                role="button"
                style={{ cursor: "pointer" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src={paylater}
                    alt="Pay Later"
                    className="me-3"
                    style={{ width: "40px" }}
                  />
                  <span>Pay Later</span>
                </div>
                <small className="text-muted">Simpl, Lazypay</small>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-md-4">
          {/* Price Breakdown */}
          <div className="card p-3 shadow-sm border">
            <h5 className="fw-bold mb-3">Price Breakup</h5>

            {/* Base Price */}
            <div className="d-flex justify-content-between">
              <div>
                <div className="fw-semibold">
                  {bookingData?.Rooms?.length || 1} Room x{" "}
                  {bookingData?.["Total Nights"] || 1} Night
                </div>
                <div className="text-muted" style={{ fontSize: "0.85rem" }}>
                  Base Price
                </div>
              </div>
              <div>
                ₹{((bookingData?.["Total Price"] ?? 0) * 0.9).toFixed(2)}
              </div>
            </div>

            <hr className="my-3" />

            {/* Taxes */}
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <span className="fw-medium">Hotel Taxes</span>
                <i
                  className="bi bi-info-circle ms-1 text-muted"
                  title="Govt. & service taxes included"
                ></i>
              </div>
              <div>₹{(bookingData?.["Total Price"] * 0.1).toFixed(2)}</div>
            </div>

            <hr className="my-3" />

            {/* Total */}
            <div className="d-flex justify-content-between fw-bold">
              <span>Total Amount to be paid</span>
              <span>₹{bookingData?.["Total Price"] || "0"}</span>
            </div>

            {/* Optional: Software Commission Breakdown */}
            <div className="mt-2">
              <small className="text-muted">
                * 10% of this total is service charge collected by the platform.
              </small>
            </div>
          </div>

          {/* QR Code */}
          {/* <div className="card p-3 mt-3 text-center">
            <h6>Scan to Pay</h6>
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?data=https://razorpay.com&size=150x150"
              alt="QR Code"
              className="img-fluid my-2"
            />
            <p className="text-muted" style={{ fontSize: "0.85rem" }}>
              Instant Refund & High Success Rate
            </p>
            <div className="d-flex justify-content-center gap-2">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Google_Pay_Logo.svg/64px-Google_Pay_Logo.svg.png"
                alt="GPay"
                height="24"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Paytm_logo.png/64px-Paytm_logo.png"
                alt="Paytm"
                height="24"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/PhonePe_Logo.svg/64px-PhonePe_Logo.svg.png"
                alt="PhonePe"
                height="24"
              />
            </div>
          </div> */}

          {/* <button className="btn btn-success w-100 mt-3">
            Proceed to Pay ₹{bookingData?.["Total Price"] || "0"}
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;

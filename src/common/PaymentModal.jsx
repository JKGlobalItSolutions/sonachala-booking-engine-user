import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaTimes, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import './PaymentModal.css';

const PaymentModal = ({ isOpen, onClose, room, property, bookingDetails, onConfirm }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [name, setName] = useState(bookingDetails?.name || "");
  const [phone, setPhone] = useState(bookingDetails?.phone || "");

  if (!isOpen) return null;

  const handleConfirm = async () => {
    if (!name || !phone) {
      alert("Please enter both your name and phone number.");
      return;
    }

    setIsProcessing(true);
    // Simulate payment processing or call an API
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentConfirmed(true);
      // Wait 5 seconds before signaling confirmation to the parent (which triggers redirect)
      setTimeout(() => {
        if (onConfirm) onConfirm({ name, phone });
      }, 5000);
    }, 2000);
  };

  const totalPrice = room?.price || 0;

  return (
    <div className="payment-modal-overlay">
      <div className="payment-modal-container">
        <button className="payment-modal-close" onClick={onClose}>
          <FaTimes />
        </button>

        {paymentConfirmed ? (
          <div className="payment-success-view">
            <FaCheckCircle className="success-icon" />
            <h3>Booking Confirmed!</h3>
            <p>Your payment for {room?.name} has been received.</p>
            <p className="booking-ref">Ref: #INV-{Math.floor(Math.random() * 100000)}</p>
            <button className="ota-btn-primary" onClick={onClose}>Close</button>
          </div>
        ) : (
          <div className="payment-content-view">
            <div className="payment-header">
              <h2>Confirm Booking</h2>
              <p className="property-name">{property?.["Property Name"]}</p>
            </div>

            <div className="payment-body">
              <div className="room-summary">
                <h4>{room?.name}</h4>
                <div className="highlight-tag">{room?.bedType}</div>
                <div className="price-summary">
                  <span>Total Price:</span>
                  <span className="price-amount">₹{totalPrice}</span>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label text-secondary small">Your Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label text-secondary small">Phone Number</label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="qr-section">
                <p className="qr-instruction">Scan to Pay via UPI</p>
                {property?.paymentQr ? (
                  <div className="qr-image-wrapper">
                    <img src={property.paymentQr} alt="Payment QR Code" className="qr-code-img" />
                  </div>
                ) : (
                  <div className="qr-placeholder">
                    <p>No QR Code Available</p>
                  </div>
                )}
                <p className="qr-help">Use any UPI app (GPay, PhonePe, Paytm) to scan and pay.</p>
              </div>
            </div>

            <div className="payment-footer">
              <button
                className="ota-btn-primary w-100"
                onClick={handleConfirm}
                disabled={isProcessing || !name || !phone}
              >
                {isProcessing ? (
                  <>
                    <FaSpinner className="spinner-icon" /> Processing...
                  </>
                ) : (
                  'I Have Made the Payment'
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

PaymentModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  room: PropTypes.object,
  property: PropTypes.object,
  bookingDetails: PropTypes.object,
  onConfirm: PropTypes.func
};

export default PaymentModal;

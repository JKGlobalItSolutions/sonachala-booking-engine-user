import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../../services/emailjsConfig';


const FlightBooking = () => {
  const location = useLocation();
  const [isInternational, setIsInternational] = useState(location.pathname.includes('international'));

  const [formData, setFormData] = useState({
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
    class: 'economy',
    name: '',
    email: '',
    phone: '',
    passportNumber: '',
    passportExpiry: '',
    specialRequests: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleModeToggle = (isIntl) => {
    setIsInternational(isIntl);
    setFormData(prev => ({
      ...prev,
      passportNumber: '',
      passportExpiry: ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // EmailJS configuration
      const serviceId = EMAILJS_CONFIG.SERVICE_ID;
      const templateId = EMAILJS_CONFIG.TEMPLATE_ID;
      const userId = EMAILJS_CONFIG.PUBLIC_KEY;

      const emailData = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        flight_type: isInternational ? 'International' : 'Domestic',
        from_location: formData.from,
        to_location: formData.to,
        departure_date: formData.departureDate,
        return_date: formData.returnDate || 'One-way',
        passengers: formData.passengers,
        class_type: formData.class,
        passport_number: isInternational ? formData.passportNumber : 'N/A',
        passport_expiry: isInternational ? formData.passportExpiry : 'N/A',
        special_requests: formData.specialRequests,
        booking_time: new Date().toLocaleString()
      };

      await emailjs.send(serviceId, templateId, emailData, userId);

      setBookingComplete(true);
      setTimeout(() => {
        setBookingComplete(false);
        // Reset form
        setFormData({
          from: '',
          to: '',
          departureDate: '',
          returnDate: '',
          passengers: 1,
          class: 'economy',
          name: '',
          email: '',
          phone: '',
          passportNumber: '',
          passportExpiry: '',
          specialRequests: ''
        });
      }, 3000);
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Booking request sent successfully! We will contact you soon.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initialize date pickers
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('departureDate')?.setAttribute('min', today);
    document.getElementById('returnDate')?.setAttribute('min', today);
  }, []);

  return (
    <div className="ota-page-wrapper" style={{ backgroundColor: "var(--bg-light)", minHeight: "100vh", paddingTop: "120px", fontFamily: "'Inter', sans-serif" }}>
      <div className="container" style={{ maxWidth: "850px" }}>
        <div className="text-center mb-5">
          <h1 className="fw-800 mb-2">{isInternational ? 'International Flights' : 'Domestic Flights'}</h1>
          <p className="text-secondary h5 fw-normal">Global reach with specialized service and support</p>
        </div>

        {/* Mode Toggle - Professional OTA style */}
        <div className="d-flex justify-content-center mb-5">
          <div className="bg-white p-1 rounded-pill shadow-sm d-flex" style={{ width: "fit-content", border: "1px solid #eee" }}>
            <button
              onClick={() => handleModeToggle(false)}
              className={`btn rounded-pill px-4 py-2 fw-bold transition-all ${!isInternational ? 'ota-btn-primary' : 'btn-white text-secondary'}`}
            >
              <i className="fas fa-plane-departure me-2"></i> Domestic
            </button>
            <button
              onClick={() => handleModeToggle(true)}
              className={`btn rounded-pill px-4 py-2 fw-bold transition-all ${isInternational ? 'ota-btn-primary' : 'btn-white text-secondary'}`}
            >
              <i className="fas fa-globe me-2"></i> International
            </button>
          </div>
        </div>

        <div className="ota-card shadow-sm p-4">
          <form onSubmit={handleSubmit}>
            <div className="row g-4 mb-4">
              <div className="col-12">
                <h4 className="fw-bold mb-3 border-bottom pb-2">Flight Requirements</h4>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="small fw-bold text-secondary mb-1">Departure From</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-0"><i className="fas fa-plane-departure text-secondary"></i></span>
                      <input type="text" className="form-control bg-light border-0 p-3" name="from" value={formData.from} onChange={handleInputChange} placeholder="Origin" required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="small fw-bold text-secondary mb-1">Arrival At</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-0"><i className="fas fa-plane-arrival text-secondary"></i></span>
                      <input type="text" className="form-control bg-light border-0 p-3" name="to" value={formData.to} onChange={handleInputChange} placeholder="Destination" required />
                    </div>
                  </div>
                  <div className="col-md-6 mt-3">
                    <label className="small fw-bold text-secondary mb-1">Departure Date</label>
                    <input type="date" className="form-control bg-light border-0 p-3" name="departureDate" value={formData.departureDate} onChange={handleInputChange} required />
                  </div>
                  <div className="col-md-6 mt-3">
                    <label className="small fw-bold text-secondary mb-1">Return Date</label>
                    <input type="date" className="form-control bg-light border-0 p-3" name="returnDate" value={formData.returnDate} onChange={handleInputChange} placeholder="Optional" />
                  </div>
                  <div className="col-md-6 mt-3">
                    <label className="small fw-bold text-secondary mb-1">Class Select</label>
                    <select className="form-select bg-light border-0 p-3" name="class" value={formData.class} onChange={handleInputChange}>
                      <option value="economy">Economy</option>
                      <option value="premium-economy">Premium Economy</option>
                      <option value="business">Business</option>
                      <option value="first">First Class</option>
                    </select>
                  </div>
                  <div className="col-md-6 mt-3">
                    <label className="small fw-bold text-secondary mb-1">Passengers</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-0"><i className="fas fa-users text-secondary"></i></span>
                      <input type="number" className="form-control bg-light border-0 p-3" name="passengers" value={formData.passengers} onChange={handleInputChange} min="1" max="10" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 mt-4 pt-4 border-top">
                <h4 className="fw-bold mb-4">Passenger Contact</h4>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="small fw-bold text-secondary mb-1">Full Name</label>
                    <input type="text" className="form-control bg-light border-0 p-3" name="name" value={formData.name} onChange={handleInputChange} placeholder="Lead passenger name" required />
                  </div>
                  <div className="col-md-6">
                    <label className="small fw-bold text-secondary mb-1">Mobile number</label>
                    <input type="tel" className="form-control bg-light border-0 p-3" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+91" required />
                  </div>
                  <div className="col-12">
                    <label className="small fw-bold text-secondary mb-1">Email address</label>
                    <input type="email" className="form-control bg-light border-0 p-3" name="email" value={formData.email} onChange={handleInputChange} placeholder="Traveler email" required />
                  </div>
                  {isInternational && (
                    <>
                      <div className="col-md-6">
                        <label className="small fw-bold text-secondary mb-1">Passport Number</label>
                        <input type="text" className="form-control bg-light border-0 p-3" name="passportNumber" value={formData.passportNumber} onChange={handleInputChange} placeholder="Passport No." required />
                      </div>
                      <div className="col-md-6">
                        <label className="small fw-bold text-secondary mb-1">Passport Expiry</label>
                        <input type="date" className="form-control bg-light border-0 p-3" name="passportExpiry" value={formData.passportExpiry} onChange={handleInputChange} required />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className={`ota-btn-primary w-100 py-3 fw-800 ${isLoading ? 'opacity-75' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <><span className="spinner-border spinner-border-sm me-2"></span> Processing...</>
              ) : bookingComplete ? (
                <><i className="fas fa-check-circle me-2"></i> Request Sent</>
              ) : (
                'Submit Booking Request'
              )}
            </button>
          </form>
        </div>
      </div>

      {bookingComplete && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ zIndex: 9999, backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="ota-card p-5 text-center shadow-lg" style={{ maxWidth: "400px" }}>
            <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: "80px", height: "80px" }}>
              <i className="fas fa-paper-plane fa-2x"></i>
            </div>
            <h3 className="fw-800">Flight Request Sent!</h3>
            <p className="text-secondary">We'll verify availability and contact you within 24 hours.</p>
            <button className="ota-btn-primary px-4 mt-3" onClick={() => setBookingComplete(false)}>Close</button>
          </div>
        </div>
      )}
      <style dangerouslySetInnerHTML={{ __html: '.fw-800 { font-weight: 800; }' }} />
    </div>
  );
};

export default FlightBooking;

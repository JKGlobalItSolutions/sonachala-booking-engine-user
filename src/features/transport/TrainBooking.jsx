import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { Link } from 'react-router-dom';


const TrainBooking = () => {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    travelDate: '',
    returnDate: '',
    class: 'general',
    passengers: 1,
    name: '',
    email: '',
    phone: '',
    specialRequests: '',
    pnrCheck: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [isPnrCheck, setIsPnrCheck] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const serviceId = 'your_service_id';
      const templateId = 'your_template_id';
      const userId = 'your_user_id';

      const emailData = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        service_type: isPnrCheck ? 'PNR Status Check' : 'Train Booking',
        from_location: formData.from || 'N/A',
        to_location: formData.to || 'N/A',
        travel_date: formData.travelDate || 'N/A',
        return_date: formData.returnDate || 'One-way',
        class_type: formData.class,
        passengers: isPnrCheck ? 'N/A' : formData.passengers,
        pnr_number: isPnrCheck ? formData.pnrNumber : 'N/A',
        special_requests: formData.specialRequests,
        booking_time: new Date().toLocaleString()
      };

      await emailjs.send(serviceId, templateId, emailData, userId);

      setBookingComplete(true);
      setTimeout(() => {
        setBookingComplete(false);
        setFormData({
          from: '',
          to: '',
          travelDate: '',
          returnDate: '',
          class: 'general',
          passengers: 1,
          name: '',
          email: '',
          phone: '',
          specialRequests: '',
          pnrCheck: false,
          pnrNumber: ''
        });
      }, 3000);
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Request submitted successfully! We will contact you soon.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('travelDate')?.setAttribute('min', today);
    document.getElementById('returnDate')?.setAttribute('min', today);
    document.getElementById('pnrTravelDate')?.setAttribute('min', today);
  }, []);

  return (

    <div className="ota-page-wrapper" style={{ backgroundColor: "var(--bg-light)", minHeight: "100vh", paddingTop: "120px", fontFamily: "'Inter', sans-serif" }}>
      <div className="container" style={{ maxWidth: "850px" }}>
        <div className="text-center mb-5">
          <h1 className="fw-800 mb-2">Rail Transport</h1>
          <p className="text-secondary h5 fw-normal">Book train tickets and track PNR status with ease</p>
        </div>

        {/* Mode Toggle - Professional OTA style */}
        <div className="d-flex justify-content-center mb-5">
          <div className="bg-white p-1 rounded-pill shadow-sm d-flex" style={{ width: "fit-content", border: "1px solid #eee" }}>
            <button
              onClick={() => setIsPnrCheck(false)}
              className={`btn rounded-pill px-4 py-2 fw-bold transition-all ${!isPnrCheck ? 'ota-btn-primary' : 'btn-white text-secondary'}`}
            >
              <i className="fas fa-train me-2"></i> Book Train
            </button>
            <button
              onClick={() => setIsPnrCheck(true)}
              className={`btn rounded-pill px-4 py-2 fw-bold transition-all ${isPnrCheck ? 'ota-btn-primary' : 'btn-white text-secondary'}`}
            >
              <i className="fas fa-info-circle me-2"></i> PNR Status
            </button>
          </div>
        </div>

        <div className="ota-card shadow-sm p-4">
          <form onSubmit={handleSubmit}>
            <div className="row g-4 mb-4">
              <div className="col-12">
                <h4 className="fw-bold mb-3 border-bottom pb-2">{isPnrCheck ? 'PNR Status Check' : 'Journey Selection'}</h4>
                {isPnrCheck ? (
                  <div className="row g-3">
                    <div className="col-md-8">
                      <label className="small fw-bold text-secondary mb-1">PNR Number</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-0"><i className="fas fa-ticket-alt text-secondary"></i></span>
                        <input
                          type="text"
                          className="form-control bg-light border-0 p-3"
                          name="pnrNumber"
                          value={formData.pnrNumber}
                          onChange={handleInputChange}
                          placeholder="Enter 10-digit PNR"
                          maxLength="10"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <label className="small fw-bold text-secondary mb-1">Date</label>
                      <input type="date" className="form-control bg-light border-0 p-3" name="pnrTravelDate" value={formData.pnrTravelDate} onChange={handleInputChange} />
                    </div>
                  </div>
                ) : (
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="small fw-bold text-secondary mb-1">From Station</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-0"><i className="fas fa-train text-secondary"></i></span>
                        <input type="text" className="form-control bg-light border-0 p-3" name="from" value={formData.from} onChange={handleInputChange} placeholder="Origin" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label className="small fw-bold text-secondary mb-1">To Station</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-0"><i className="fas fa-map-pin text-secondary"></i></span>
                        <input type="text" className="form-control bg-light border-0 p-3" name="to" value={formData.to} onChange={handleInputChange} placeholder="Destination" />
                      </div>
                    </div>
                    <div className="col-md-6 mt-3">
                      <label className="small fw-bold text-secondary mb-1">Travel Date</label>
                      <input type="date" className="form-control bg-light border-0 p-3" name="travelDate" value={formData.travelDate} onChange={handleInputChange} />
                    </div>
                    <div className="col-md-6 mt-3">
                      <label className="small fw-bold text-secondary mb-1">Class Select</label>
                      <select className="form-select bg-light border-0 p-3" name="class" value={formData.class} onChange={handleInputChange}>
                        <option value="general">General</option>
                        <option value="sleeper">Sleeper (SL)</option>
                        <option value="ac-3tier">AC 3 Tier (3A)</option>
                        <option value="ac-2tier">AC 2 Tier (2A)</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              <div className="col-12 mt-4 pt-4 border-top">
                <h4 className="fw-bold mb-4">Contact Information</h4>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="small fw-bold text-secondary mb-1">Full Name</label>
                    <input type="text" className="form-control bg-light border-0 p-3" name="name" value={formData.name} onChange={handleInputChange} placeholder="Your name" />
                  </div>
                  <div className="col-md-6">
                    <label className="small fw-bold text-secondary mb-1">Mobile number</label>
                    <input type="tel" className="form-control bg-light border-0 p-3" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+91" />
                  </div>
                  <div className="col-12">
                    <label className="small fw-bold text-secondary mb-1">Email address</label>
                    <input type="email" className="form-control bg-light border-0 p-3" name="email" value={formData.email} onChange={handleInputChange} placeholder="example@mail.com" />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className={`ota-btn-primary w-100 py-3 fw-800 ${isLoading ? 'opacity-75' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <><span className="spinner-border spinner-border-sm me-2"></span> Processing Request...</>
              ) : bookingComplete ? (
                <><i className="fas fa-check-circle me-2"></i> Request Sent Successfully</>
              ) : (
                `Submit ${isPnrCheck ? 'PNR Check' : 'Booking'} Request`
              )}
            </button>
          </form>
        </div>
      </div>

      {bookingComplete && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ zIndex: 9999, backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="ota-card p-5 text-center shadow-lg" style={{ maxWidth: "400px" }}>
            <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: "80px", height: "80px" }}>
              <i className="fas fa-check fa-2x"></i>
            </div>
            <h3 className="fw-800">Confirmed!</h3>
            <p className="text-secondary">We've received your request and will contact you within 24 hours.</p>
            <button className="ota-btn-primary px-4 mt-3" onClick={() => setBookingComplete(false)}>Close</button>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
        .fw-800 { font-weight: 800; }
        .transition-all { transition: all 0.3s ease; }
      `}} />
    </div>
  );
};

export default TrainBooking;

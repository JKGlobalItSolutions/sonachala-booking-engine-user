import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';


const BusBooking = () => {
  const [formData, setFormData] = useState({
    serviceType: 'intercity',
    from: '',
    to: '',
    travelDate: '',
    returnDate: '',
    busType: 'ac-sleeper',
    passengers: 1,
    pickupLocation: '',
    dropLocation: '',
    rentalDuration: '1-day',
    vehicleType: 'van',
    name: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [isIntercity, setIsIntercity] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'serviceType') {
      setIsIntercity(value === 'intercity');
    }
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
        service_type: isIntercity ? 'Intercity Bus Booking' : 'Bus Rental',
        from_location: formData.from,
        to_location: formData.to,
        travel_date: formData.travelDate,
        return_date: formData.returnDate || 'N/A',
        bus_type: formData.busType,
        vehicle_type: isIntercity ? 'N/A' : formData.vehicleType,
        rental_duration: isIntercity ? 'N/A' : formData.rentalDuration,
        passengers: formData.passengers,
        pickup_location: formData.pickupLocation,
        drop_location: formData.dropLocation,
        special_requests: formData.specialRequests,
        booking_time: new Date().toLocaleString()
      };

      await emailjs.send(serviceId, templateId, emailData, userId);

      setBookingComplete(true);
      setTimeout(() => {
        setBookingComplete(false);
        setFormData({
          serviceType: 'intercity',
          from: '',
          to: '',
          travelDate: '',
          returnDate: '',
          busType: 'ac-sleeper',
          passengers: 1,
          pickupLocation: '',
          dropLocation: '',
          rentalDuration: '1-day',
          vehicleType: 'van',
          name: '',
          email: '',
          phone: '',
          specialRequests: ''
        });
        setIsIntercity(true);
      }, 3000);
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Booking request sent successfully! We will contact you soon.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('travelDate')?.setAttribute('min', today);
    document.getElementById('returnDate')?.setAttribute('min', today);
  }, []);

  return (
    <div className="ota-page-wrapper" style={{ backgroundColor: "var(--bg-light)", minHeight: "100vh", paddingTop: "120px", fontFamily: "'Inter', sans-serif" }}>
      <div className="container" style={{ maxWidth: "850px" }}>
        <div className="text-center mb-5">
          <h1 className="fw-800 mb-2">Bus & Rental Services</h1>
          <p className="text-secondary h5 fw-normal">Intercity travel and private bus rentals made simple</p>
        </div>

        {/* Mode Toggle - Professional OTA style */}
        <div className="d-flex justify-content-center mb-5">
          <div className="bg-white p-1 rounded-pill shadow-sm d-flex" style={{ width: "fit-content", border: "1px solid #eee" }}>
            <button
              onClick={() => {
                setFormData(prev => ({ ...prev, serviceType: 'intercity' }));
                setIsIntercity(true);
              }}
              className={`btn rounded-pill px-4 py-2 fw-bold transition-all ${isIntercity ? 'ota-btn-primary' : 'btn-white text-secondary'}`}
            >
              <i className="fas fa-bus me-2"></i> Intercity
            </button>
            <button
              onClick={() => {
                setFormData(prev => ({ ...prev, serviceType: 'rental' }));
                setIsIntercity(false);
              }}
              className={`btn rounded-pill px-4 py-2 fw-bold transition-all ${!isIntercity ? 'ota-btn-primary' : 'btn-white text-secondary'}`}
            >
              <i className="fas fa-key me-2"></i> Bus Rentals
            </button>
          </div>
        </div>

        <div className="ota-card shadow-sm p-4">
          <form onSubmit={handleSubmit}>
            <div className="row g-4 mb-4">
              <div className="col-12">
                <h4 className="fw-bold mb-3 border-bottom pb-2">{isIntercity ? 'Journey Details' : 'Rental Information'}</h4>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="small fw-bold text-secondary mb-1">Pick-up Location</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-0"><i className="fas fa-map-marker-alt text-secondary"></i></span>
                      <input type="text" className="form-control bg-light border-0 p-3" name="from" value={formData.from} onChange={handleInputChange} placeholder="Origin" required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="small fw-bold text-secondary mb-1">Drop-off Location</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-0"><i className="fas fa-map-pin text-secondary"></i></span>
                      <input type="text" className="form-control bg-light border-0 p-3" name="to" value={formData.to} onChange={handleInputChange} placeholder="Destination" required />
                    </div>
                  </div>
                  <div className="col-md-6 mt-3">
                    <label className="small fw-bold text-secondary mb-1">Travel Date</label>
                    <input type="date" className="form-control bg-light border-0 p-3" name="travelDate" value={formData.travelDate} onChange={handleInputChange} required />
                  </div>
                  <div className="col-md-6 mt-3">
                    <label className="small fw-bold text-secondary mb-1">{isIntercity ? 'Bus Preference' : 'Vehicle Choice'}</label>
                    <select className="form-select bg-light border-0 p-3" name={isIntercity ? 'busType' : 'vehicleType'} value={isIntercity ? formData.busType : formData.vehicleType} onChange={handleInputChange}>
                      {isIntercity ? (
                        <>
                          <option value="ac-sleeper">AC Sleeper</option>
                          <option value="ac-seater">AC Seater</option>
                          <option value="luxury">Luxury Coach</option>
                        </>
                      ) : (
                        <>
                          <option value="tempo-traveler">Tempo Traveler</option>
                          <option value="luxury-bus">Luxury Bus (30+ Seats)</option>
                          <option value="minibus">Mini Bus</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>
              </div>

              <div className="col-12 mt-4 pt-4 border-top">
                <h4 className="fw-bold mb-4">Lead Contact Group</h4>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="small fw-bold text-secondary mb-1">Contact Name</label>
                    <input type="text" className="form-control bg-light border-0 p-3" name="name" value={formData.name} onChange={handleInputChange} placeholder="Your name" required />
                  </div>
                  <div className="col-md-6">
                    <label className="small fw-bold text-secondary mb-1">Mobile number</label>
                    <input type="tel" className="form-control bg-light border-0 p-3" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+91" required />
                  </div>
                  <div className="col-12">
                    <label className="small fw-bold text-secondary mb-1">Email address</label>
                    <input type="email" className="form-control bg-light border-0 p-3" name="email" value={formData.email} onChange={handleInputChange} placeholder="travel@example.com" required />
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
                <><span className="spinner-border spinner-border-sm me-2"></span> Submitting...</>
              ) : bookingComplete ? (
                <><i className="fas fa-check-circle me-2"></i> Request Received</>
              ) : (
                `Submit ${isIntercity ? 'Intercity' : 'Rental'} Request`
              )}
            </button>
          </form>
        </div>
      </div>

      {bookingComplete && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ zIndex: 9999, backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="ota-card p-5 text-center shadow-lg" style={{ maxWidth: "400px" }}>
            <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: "80px", height: "80px" }}>
              <i className="fas fa-bus fa-2x"></i>
            </div>
            <h3 className="fw-800">Request Sent!</h3>
            <p className="text-secondary">We've received your inquiry and our travel desk will contact you soon.</p>
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

export default BusBooking;

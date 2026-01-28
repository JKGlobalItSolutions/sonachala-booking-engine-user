import React, { useState, useEffect, useRef } from "react"
import { useParams, useNavigate, useLocation, Link } from "react-router-dom"
import {
  FaWifi,
  FaUtensils,
  FaBed,
  FaMapMarkerAlt,
  FaCheck,
  FaClock,
  FaUserFriends,
  FaChild,
  FaAirFreshener,
  FaTv,
  FaParking,
  FaCoffee,
  FaPhone,
} from "react-icons/fa"
import flatpickr from "flatpickr"
import "flatpickr/dist/flatpickr.min.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import Preloader from "../hotels/Preloader"

const HotelDetails = ({ hotel }) => {
  return (
    <>
      <div className="card mb-4">

        <div className="card-body">
          <h3 className="h5 mb-3">{hotel.name}</h3>
          <p>
            <FaMapMarkerAlt className="me-2" />
            {hotel.location}
          </p>
          <div className="d-flex align-items-center mb-3">
            <div className="text-white px-2 py-1 rounded me-2" style={{ backgroundColor: "#038A5E" }}>
              {hotel.rating}
            </div>
            <div>{hotel.reviews} reviews</div>
          </div>
          <p>{hotel.description}</p>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <h3 className="h5 mb-3">Hotel Amenities</h3>
          <div className="row">
            {hotel.facilities.map((facility, index) => (
              <div key={index} className="col-6 mb-2">
                <div className="d-flex align-items-center">
                  {facility === "Wi-Fi" && <FaWifi className="me-2" />}
                  {facility === "AC" && <FaAirFreshener className="me-2" />}
                  {facility === "TV" && <FaTv className="me-2" />}
                  {facility === "Room Service" && <FaUtensils className="me-2" />}
                  {facility === "Parking" && <FaParking className="me-2" />}
                  {facility === "Restaurant" && <FaCoffee className="me-2" />}
                  {facility}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <h3 className="h5 mb-3">Hotel Policies</h3>
          <p>
            <strong>Child Policy:</strong> {hotel.childPolicy}
          </p>
          <p>
            <strong>Extra Bed Policy:</strong> {hotel.extraBedPolicy}
          </p>
          <p>
            <strong>ID Policy:</strong> {hotel.idPolicy}
          </p>
        </div>
      </div>
    </>
  )
}

const BookingSummary = ({
  checkInTime,
  selectedDuration,
  adults,
  children,
  rooms,
  getMealInfo,
  calculateTotalPrice,
}) => {
  return (
    <div className="ota-card shadow-sm p-4 sticky-top" style={{ top: "120px" }}>
      <h3 className="fw-bold mb-4 border-bottom pb-2">Booking Summary</h3>
      <div className="d-flex justify-content-between mb-3">
        <span className="text-secondary small fw-bold">Check-in Time</span>
        <span className="fw-bold">{checkInTime}</span>
      </div>
      <div className="d-flex justify-content-between mb-3">
        <span className="text-secondary small fw-bold">Duration</span>
        <span className="fw-bold">{selectedDuration} hours</span>
      </div>
      <div className="d-flex justify-content-between mb-3">
        <span className="text-secondary small fw-bold">Guests</span>
        <span className="fw-bold">
          {adults} Adults, {children} Child
        </span>
      </div>
      <div className="d-flex justify-content-between mb-3">
        <span className="text-secondary small fw-bold">Rooms</span>
        <span className="fw-bold">{rooms} Room</span>
      </div>
      <div className="d-flex justify-content-between mb-3">
        <span className="text-secondary small fw-bold">Meal Option</span>
        <span className="badge bg-light text-success border border-success-subtle">{getMealInfo()}</span>
      </div>
      <hr className="my-4" />
      <div className="d-flex justify-content-between align-items-center">
        <span className="h5 fw-800 mb-0">Total Price</span>
        <span className="h4 fw-800 mb-0 text-success">
          ₹{calculateTotalPrice()}
        </span>
      </div>
      <p className="small text-muted mt-3 mb-0 text-center">Inclusive of all taxes and fees</p>
    </div>
  )
}

const ReservationForm = ({
  checkInTime,
  setCheckInTime,
  adults,
  children,
  rooms,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  phone,
  setPhone,
  handleSubmit,
  timePickerRef,
}) => {
  return (
    <div className="ota-card shadow-sm p-4 h-100">
      <h2 className="fw-800 mb-4 border-bottom pb-2">Guest Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="small fw-bold text-secondary mb-1">Check-in Selection</label>
          <div className="input-group">
            <span className="input-group-text bg-light border-0"><FaClock className="text-secondary" /></span>
            <input
              type="text"
              className="form-control bg-light border-0 p-3"
              ref={timePickerRef}
              placeholder="Select check-in time"
              value={checkInTime}
              required
            />
          </div>
        </div>

        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <label className="small fw-bold text-secondary mb-1">First Name</label>
            <input type="text" className="form-control bg-light border-0 p-3" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" required />
          </div>
          <div className="col-md-6">
            <label className="small fw-bold text-secondary mb-1">Last Name</label>
            <input type="text" className="form-control bg-light border-0 p-3" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name" required />
          </div>
        </div>

        <div className="mb-4">
          <label className="small fw-bold text-secondary mb-1">Email address</label>
          <input type="email" className="form-control bg-light border-0 p-3" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Confirmation will be sent here" required />
        </div>

        <div className="mb-4">
          <label className="small fw-bold text-secondary mb-1">Mobile number</label>
          <div className="input-group">
            <span className="input-group-text bg-light border-0"><FaPhone className="text-secondary" /></span>
            <input type="tel" className="form-control bg-light border-0 p-3" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91" required />
          </div>
        </div>

        <button type="submit" className="ota-btn-primary w-100 py-3 fw-800 fs-5 mt-2">
          <FaCheck className="me-2" /> Complete Reservation
        </button>
      </form>
    </div>
  )
}

const HourlyStayReservation = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [checkInTime, setCheckInTime] = useState(location.state?.checkInTime || "14:00")
  const [adults, setAdults] = useState(location.state?.adults || 1)
  const [children, setChildren] = useState(location.state?.children || 0)
  const [rooms, setRooms] = useState(location.state?.rooms || 1)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const timePickerRef = useRef(null)

  const { selectedDuration, hourlyPrice } = location.state || { selectedDuration: "4", hourlyPrice: 1200 }

  const hotel = {
    id: id,
    name: "FabHotel Memories Inn",
    location: "9, Kudlu Road, Union Bank of India ATM, Kudlu, 560068 Chennai, India",
    rating: 4.5,
    reviews: 128,
    basePrice: hourlyPrice,
    image: "/placeholder.svg?height=400&width=600",
    facilities: ["Wi-Fi", "AC", "TV", "Room Service", "Parking", "Restaurant"],
    description:
      "Located within 4.5 miles of The Forum, Koramangala and 7.2 miles of Brigade Road, FabHotel Memories Inn provides rooms in Chennai. This 3-star hotel offers room service, a 24-hour front desk and free WiFi. The hotel features family rooms.",
    roomType: "1 Room",
    maxOccupancy: "Flexible",
    childPolicy: "Stay of 1 child up to 5 years of age is complementary without the use of extra mattress.",
    extraBedPolicy: "Extra mattress is provided for additional guests.",
    idPolicy:
      "It is mandatory for guests to present valid photo identification at the time of check-in. According to government regulations, a valid Photo ID has to be carried by every person above the age of 18 staying at the hotel. The identification proofs accepted are Aadhaar Card, Driving License, Voter ID Card, and Passport (Pan is not accepted as valid ID). Without Original copy of valid ID the guest will not be allowed to check-in.",
  }

  useEffect(() => {
    const fp = flatpickr(timePickerRef.current, {
      enableTime: true,
      noCalendar: true,
      dateFormat: "H:i",
      minTime: "09:00",
      maxTime: "21:00",
      defaultDate: checkInTime,
      onChange: (selectedDates, dateStr) => {
        setCheckInTime(dateStr)
      },
    })

    return () => {
      fp.destroy()
    }
  }, [checkInTime])

  const calculateTotalPrice = () => {
    const basePrice = hotel.basePrice
    const totalPrice = basePrice * rooms

    const checkInHour = Number.parseInt(checkInTime.split(":")[0])
    let mealCharge = 0
    if (checkInHour >= 7 && checkInHour < 10) {
      mealCharge = 200
    } else if (checkInHour >= 12 && checkInHour < 15) {
      mealCharge = 300
    } else if (checkInHour >= 19 && checkInHour < 22) {
      mealCharge = 300
    }

    const totalMealCharge = mealCharge * (adults + children)

    return totalPrice + totalMealCharge
  }

  const getMealInfo = () => {
    if (!checkInTime) return "Select check-in time to see meal options"
    const checkInHour = Number.parseInt(checkInTime.split(":")[0])
    if (checkInHour >= 7 && checkInHour < 10) {
      return "Breakfast included"
    } else if (checkInHour >= 12 && checkInHour < 15) {
      return "Lunch included"
    } else if (checkInHour >= 19 && checkInHour < 22) {
      return "Dinner included"
    }
    return "No meal included"
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      const bookingDetails = {
        fullName: `${firstName} ${lastName}`,
        roomDetails: { name: hotel.roomType },
        guestsCount: adults,
        childrenCount: children,
        totalPrice: calculateTotalPrice(),
        checkInDate: new Date().toISOString(),
        checkOutDate: new Date(new Date().getTime() + selectedDuration * 60 * 60 * 1000).toISOString(),
        checkInTime,
        duration: selectedDuration,
        hotelName: hotel.name,
        mealInfo: getMealInfo(),
      }
      navigate("/hourly-successful", { state: bookingDetails })
    }, 2000)
  }

  if (isLoading) {
    return <Preloader />
  }

  return (
    <div className="ota-page-wrapper" style={{ backgroundColor: "var(--bg-light)", minHeight: "100vh", paddingTop: "120px", fontFamily: "'Inter', sans-serif" }}>
      <div className="container" style={{ maxWidth: "1200px" }}>
        <div className="text-center mb-5">
          <h1 className="fw-800 mb-2">Hourly Reservation</h1>
          <p className="text-secondary h5 fw-normal">Flexible stays at the best rates in Chennai</p>
        </div>

        <div className="row g-4 mb-5">
          <div className="col-lg-8">
            <div className="ota-card shadow-sm p-4 mb-4">
              <div className="d-flex justify-content-between align-items-start mb-4">
                <div>
                  <h2 className="fw-800 mb-1">{hotel.name}</h2>
                  <p className="text-secondary small mb-0"><FaMapMarkerAlt className="me-1" /> {hotel.location}</p>
                </div>
                <div className="text-end">
                  <div className="bg-success text-white px-3 py-1 rounded fw-bold mb-1 d-inline-block">
                    {hotel.rating} <i className="fas fa-star small"></i>
                  </div>
                  <div className="small text-muted">{hotel.reviews} reviews</div>
                </div>
              </div>

              <p className="text-secondary">{hotel.description}</p>

              <h4 className="fw-bold mt-4 mb-3 border-top pt-4">Amenities</h4>
              <div className="row g-2">
                {hotel.facilities.map((facility, index) => (
                  <div key={index} className="col-md-4 col-6">
                    <div className="d-flex align-items-center bg-light p-2 rounded small fw-bold text-secondary">
                      {facility === "Wi-Fi" && <FaWifi className="me-2 text-success" />}
                      {facility === "AC" && <FaAirFreshener className="me-2 text-success" />}
                      {facility === "TV" && <FaTv className="me-2 text-success" />}
                      {facility === "Room Service" && <FaUtensils className="me-2 text-success" />}
                      {facility === "Parking" && <FaParking className="me-2 text-success" />}
                      {facility === "Restaurant" && <FaCoffee className="me-2 text-success" />}
                      {facility}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <ReservationForm
              checkInTime={checkInTime}
              setCheckInTime={setCheckInTime}
              adults={adults}
              children={children}
              rooms={rooms}
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              email={email}
              setEmail={setEmail}
              phone={phone}
              setPhone={setPhone}
              handleSubmit={handleSubmit}
              timePickerRef={timePickerRef}
            />
          </div>

          <div className="col-lg-4">
            <BookingSummary
              checkInTime={checkInTime}
              selectedDuration={selectedDuration}
              adults={adults}
              children={children}
              rooms={rooms}
              getMealInfo={getMealInfo}
              calculateTotalPrice={calculateTotalPrice}
            />

            <div className="ota-card shadow-sm p-4 mt-4 bg-white border-top border-4 border-success">
              <h4 className="fw-bold mb-3">Stay Policies</h4>
              <div className="small text-secondary">
                <p className="mb-2"><strong>ID Proof:</strong> Aadhaar, Voter ID, driving license & passport are accepted (Pan is not accepted).</p>
                <p className="mb-2"><strong>Child Policy:</strong> {hotel.childPolicy}</p>
                <p className="mb-0"><strong>Check-out:</strong> Guests must vacate the room promptly after {selectedDuration} hours.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{
        __html: `
        .fw-800 { font-weight: 800; }
        .border-left-success { border-left: 4px solid var(--brand-primary); }
      `}} />
    </div>
  )
}

export default HourlyStayReservation


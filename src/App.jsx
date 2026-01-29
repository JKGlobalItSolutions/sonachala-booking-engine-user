import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from "./core/contexts/AuthContext";
import Navbar from "./common/Navbar";
import Footer from "./common/Footer";
import ScrollToTop from "./common/ScrollToTop";
import HotelPage from "./features/hotels/Hotel";
import Home from "./pages/Home";
import Homestay from "./features/homestays/Homestay";
import LoginPage from "./features/auth/Login";
import HotelList from "./features/hotels/HotelList";
import HomestayList from "./features/homestays/HomestayList";
import HotelDetails from "./features/hotels/HotelDetails";
import MapScreen from "./features/hotels/HotelMap";
import "./styles/global.css";
import CreatePlan from "./features/hotels/CreatePlan";
import Reservation from "./features/hotels/Reservation";
import YourBooking from "./features/hotels/YourBooking";
import Profile from "./features/user/Profile";
import MyBookings from "./features/user/MyBookings";
import HelpAndSupport from "./pages/HelpAndSupport";
import About from "./pages/About";
import FlightBooking from "./features/transport/FlightBooking";
import TrainBooking from "./features/transport/TrainBooking";
import BusBooking from "./features/transport/BusBooking";
import ExplorePlaces from "./pages/ExplorePlaces";
import HourlyStay from "./features/hourly-stay/HourlyStay";
import HourlyStayRoomDetails from "./features/hourly-stay/RoomDetails";
import HourlyStayReservation from "./features/hourly-stay/Reservation";
import Preloader from "./features/hotels/Preloader";
import BookingSuccessful from "./features/hotels/YourBooking";
import HourlyStayBookingSuccessful from "./features/hourly-stay/Success";

// --------------------------------------------------------------------------------------------------

// new pages

// import Home from "./pages/Home";
import Agent from "./features/partners/Agent";
import Hotelpatner from "./features/partners/HotelPartner";
import Listyourhotel from "./features/partners/ListYourHotel";
import Agreementform from "./features/partners/AgreementForm";
import Flightform from "./features/forms/FlightForm";
import BusForm from "./features/forms/BusForm";
import EventForm from "./features/forms/EventForm";
import CabForm from "./features/forms/CabForm";
import HolidayForm from "./features/forms/HolidayForm";
import ForexForm from "./features/forms/ForexForm";

import SupportForm from "./features/forms/SupportForm";
import Searchbookings from "./features/forms/SearchBookings";
import CustomerSignin from "./features/auth/CustomerSignin";
import SignupForm from "./features/auth/Signup";
import Centralreseve from "./features/forms/CentralReserve";
import PmsConnect from "./features/forms/PmsConnect";
import ReserveBackend from "./features/forms/ReserveBackend";
import Revenuemanage from "./features/forms/RevenueManage";

// import PaymentPage from "./pages/paymentgateway/PaymentPage";

import PaymentPage from "./features/payment/PaymentPage";
import Upi from "./features/payment/Upi/Upi";
import Cards from "./features/payment/Cards/Cards";
import BookingPopup from "./features/payment/Bookingpopup";

import PartnerLogin from "./features/partners/PartnerLogin";
import PartnerDashboard from "./features/partners/PartnerDashboard";
import AddPropertyWizard from "./features/partners/AddPropertyWizard";
import RestrictedRoute from "./core/routes/RestrictedRoute";

// Page-specific body classes for unique backgrounds
const pageBackgrounds = {
  '/': '',
  '/login': '',
  '/SignupForm': '',
  '/hotels': '',
  '/hotel': '',
  '/Homestays': '',
};

function BodyClassManager() {
  const location = useLocation();

  useEffect(() => {
    // remove any known background classes first
    const allClasses = Object.values(pageBackgrounds).filter(Boolean);
    document.body.classList.remove(...allClasses);

    // add the current route class if available
    const cls = pageBackgrounds[location.pathname];
    if (cls) {
      document.body.classList.add(cls);
    }

    // cleanup when unmounting or route changes
    return () => {
      if (cls) {
        document.body.classList.remove(cls);
      }
    };
  }, [location.pathname]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1" style={{ paddingTop: "100px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/hotels" element={<HotelPage />} />
          <Route path="/Homestays" element={<Homestay />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/HotelList" element={<HotelList />} />
          <Route path="/HomestayList" element={<HomestayList />} />
          <Route path="/hourly-stay" element={<HourlyStay />} />

          <Route
            path="/hotel-details/:hotelId"
            element={<HotelDetails />}
          />
          <Route path="create-plan/:hotelId" element={<CreatePlan />} />
          <Route path="/reservation/:hotelId" element={<Reservation />} />
          <Route
            path="/Your-booking/:bookingId"
            element={<YourBooking />}
          />

          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/help-And-Support" element={<HelpAndSupport />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route
            path="hourly-stay-room-details"
            element={<HourlyStayRoomDetails />}
          />
          <Route
            path="hourly-reservation"
            element={<HourlyStayReservation />}
          />
          <Route
            path="/hourly-successful"
            element={<HourlyStayBookingSuccessful />}
          />

          <Route path="/map" element={<MapScreen />} />

          {/*---------------------- booking pages---------------------------------------------------------------- */}
          <Route path="/flights/domestic" element={<FlightBooking />} />
          <Route path="/flights/international" element={<FlightBooking />} />
          <Route path="/trains" element={<TrainBooking />} />
          <Route path="/trains/prn-status" element={<TrainBooking />} />
          <Route path="/buses" element={<BusBooking />} />
          <Route path="/buses/rentals" element={<BusBooking />} />

          <Route path="/explore-places" element={<ExplorePlaces />} />

          {/*---------------------- new pages---------------------------------------------------------------- */}

          {/* <Route path="/" element={<Home showPopup={showPopup} />} /> */}



          <Route path="/Agent" element={<Agent />} />
          <Route path="/Hotel-patner" element={<Hotelpatner />} />
          <Route path="/List-your-hotel" element={<Listyourhotel />} />
          <Route path="/Agreement-form" element={<Agreementform />} />

          {/* Partner Portal Routes */}
          <Route path="/partner/login" element={<PartnerLogin />} />
          <Route element={<RestrictedRoute allowedRoles={['partner', 'admin']} />}>
            <Route path="/partner/dashboard" element={<PartnerDashboard />} />
            <Route path="/partner/add-property" element={<AddPropertyWizard />} />
          </Route>
          <Route path="/flight-form" element={<Flightform />} />
          <Route path="/Bus-form" element={<BusForm />} />
          <Route path="/Event-form" element={<EventForm />} />
          <Route path="/Cab-form" element={<CabForm />} />
          <Route path="/Holiday-form" element={<HolidayForm />} />
          <Route path="/Forex-form" element={<ForexForm />} />
          <Route path="/Support-form" element={<SupportForm />} />
          <Route path="/Searchbookings" element={<Searchbookings />} />
          <Route path="/CustomerSignin" element={<CustomerSignin />} />
          <Route path="/SignupForm" element={<SignupForm />} />
          <Route path="/Centralreseve" element={<Centralreseve />} />
          <Route path="/PmsConnect" element={<PmsConnect />} />
          <Route path="/ReserveBackend" element={<ReserveBackend />} />
          <Route path="/Revenuemanage" element={<Revenuemanage />} />

          {/* payment gategay */}
          {/* <Route path="/payment" element={<PaymentPage />} /> */}

          <Route path="/PaymentPage" element={<PaymentPage />} />

          <Route path="/upi" element={<Upi />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/BookingPopup" element={<BookingPopup />} />

          {/* Catch-all route for better navigation */}
          <Route path="*" element={<Home />} />
          {/* Preloader */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <BodyClassManager />
      </Router>
    </AuthProvider>
  );
}

export default App;

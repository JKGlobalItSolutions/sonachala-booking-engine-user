import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import {
  FaHeart,
  FaWifi,
  FaDumbbell,
  FaUtensils,
  FaHotel,
  FaMapMarkerAlt,
  FaCheck,
  FaShareAlt,
  FaParking,
  FaSpa,
  FaWheelchair,
  FaStar,
  FaEdit,
  FaTrash,
  FaVideo,
  FaTshirt,
  FaBell,
  FaUsers,
  FaGlassMartini,
  FaSnowflake,
  FaBuilding,
  FaSmokingBan,
  FaSwimmer,
} from "react-icons/fa";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  setDoc,
  deleteDoc,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../core/firebase/config";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const calculateTotalPrice = (
  roomDetails,
  totalNights,
  totalAdults,
  totalChildren,
  totalRooms
) => {
  const nightPrice = calculateTotalNightPrice(
    totalNights,
    roomDetails.perNightPrice,
    totalRooms
  );
  const guestPrice = calculateTotalGuestPrice(
    totalAdults,
    totalChildren,
    roomDetails.perAdultPrice,
    roomDetails.perChildPrice
  );
  const totalPrice = nightPrice + guestPrice;
  const discount = calculateDiscount(totalPrice, roomDetails.discountValue);
  return totalPrice - discount;
};

const calculateTotalNightPrice = (nights, roomPrice, totalRooms) => {
  return nights * roomPrice * totalRooms;
};

const calculateTotalGuestPrice = (
  adults,
  children,
  perAdultPrice,
  perChildPrice
) => {
  return adults * perAdultPrice + children * perChildPrice;
};

const calculateDiscount = (totalPrice, discountValue) => {
  return totalPrice * (discountValue / 100);
};

const HotelDetails = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isFavorite, setIsFavorite] = useState(false);
  const [searchLocation, setSearchLocation] = useState("");
  const [dates, setDates] = useState("");
  const [guests, setGuests] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [showGuestsDropdown, setShowGuestsDropdown] = useState(false);
  const datePickerRef = useRef(null);
  const guestsDropdownRef = useRef(null);
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewCategories, setReviewCategories] = useState([]);
  const [canSubmitReview, setCanSubmitReview] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [newReview, setNewReview] = useState({
    staffReview: 0,
    luxury: 0,
    amenities: 0,
    price: 0,
    comments: "",
  });

  const fetchPropertyDetails = useCallback(async () => {
    if (!hotelId) {
      setError("No property ID provided");
      setLoading(false);
      return;
    }

    try {
      let propertyDoc;
      let propertyType;

      // Try to fetch from Hotels collection
      propertyDoc = await getDoc(doc(db, "Hotels", hotelId));
      if (propertyDoc.exists()) {
        propertyType = "Hotel";
      } else {
        // If not found in Hotels, try Homestays collection
        propertyDoc = await getDoc(doc(db, "Homestays", hotelId));
        if (propertyDoc.exists()) {
          propertyType = "Homestay";
        }
      }

      if (propertyDoc && propertyDoc.exists()) {
        const propertyData = {
          id: propertyDoc.id,
          ...propertyDoc.data(),
          type: propertyType,
        };

        // Fetch reviews to calculate overall rating
        const reviewsSnapshot = await getDocs(
          collection(db, propertyType + "s", hotelId, "Reviews")
        );
        let totalRating = 0;
        let totalStaffReview = 0;
        let totalLuxury = 0;
        let totalAmenities = 0;
        let totalPrice = 0;
        const reviewCount = reviewsSnapshot.size;

        reviewsSnapshot.forEach((doc) => {
          const review = doc.data();
          totalRating += review.overallRating || 0;
          totalStaffReview += review.staffReview || 0;
          totalLuxury += review.luxury || 0;
          totalAmenities += review.amenities || 0;
          totalPrice += review.price || 0;
        });

        const overallRating =
          reviewCount > 0
            ? (totalStaffReview + totalLuxury + totalAmenities + totalPrice) /
            (reviewCount * 4)
            : 0;
        const averageStaffReview =
          reviewCount > 0 ? totalStaffReview / reviewCount : 0;
        const averageLuxury = reviewCount > 0 ? totalLuxury / reviewCount : 0;
        const averageAmenities =
          reviewCount > 0 ? totalAmenities / reviewCount : 0;
        const averagePrice = reviewCount > 0 ? totalPrice / reviewCount : 0;

        // Fetch room details
        const roomSnapshot = await getDocs(
          collection(db, propertyType + "s", hotelId, "Rooms")
        );
        let roomDetails = {};
        if (roomSnapshot.docs.length > 0) {
          const roomData = roomSnapshot.docs[0].data();
          roomDetails = {
            perNightPrice: Number.parseFloat(roomData.roomPrice) || 0,
            perAdultPrice: Number.parseFloat(roomData.perAdultPrice) || 0,
            perChildPrice: Number.parseFloat(roomData.perChildPrice) || 0,
            discountValue: Number.parseFloat(roomData.discountValue) || 0,
          };
        }

        setProperty({
          ...propertyData,
          overallRating,
          averageStaffReview,
          averageLuxury,
          averageAmenities,
          averagePrice,
          reviewCount,
          roomDetails,
        });
        setSearchLocation(propertyData["Property Address"] || "");
        await fetchReviewCategories(hotelId, propertyType);
        await checkBookingStatus(hotelId);
        await fetchReviews(hotelId, propertyType);
      } else {
        setError("Property not found");
      }
    } catch (err) {
      console.error("Error fetching property data:", err);
      setError("Error fetching property data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [hotelId]);

  const getTotalNights = () => {
    if (!dates) return 1;
    const [start, end] = dates.split(" - ").map((date) => new Date(date));
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  };

  const fetchReviewCategories = async (propertyId, propertyType) => {
    try {
      const reviewsSnapshot = await getDocs(
        collection(db, propertyType + "s", propertyId, "Reviews")
      );
      let totalStaffReview = 0;
      let totalLuxury = 0;
      let totalAmenities = 0;
      let totalPrice = 0;
      const count = reviewsSnapshot.size;

      reviewsSnapshot.forEach((doc) => {
        const review = doc.data();
        totalStaffReview += review.staffReview || 0;
        totalLuxury += review.luxury || 0;
        totalAmenities += review.amenities || 0;
        totalPrice += review.price || 0;
      });

      const categories = [
        {
          name: "Staff Members",
          rating: count > 0 ? totalStaffReview / count : 0,
        },
        { name: "Luxury", rating: count > 0 ? totalLuxury / count : 0 },
        { name: "Fair Price", rating: count > 0 ? totalPrice / count : 0 },
        { name: "Amenities", rating: count > 0 ? totalAmenities / count : 0 },
      ];

      setReviewCategories(categories);
    } catch (err) {
      console.error("Error fetching review categories:", err);
    }
  };

  const checkBookingStatus = async (propertyId) => {
    if (!auth.currentUser) return;

    try {
      const bookingsRef = collection(
        db,
        "Users",
        auth.currentUser.uid,
        "Bookings"
      );
      const q = query(
        bookingsRef,
        where("propertyId", "==", propertyId),
        where("Status", "==", "Booked")
      );
      const bookingSnapshot = await getDocs(q);

      if (!bookingSnapshot.empty) {
        const booking = bookingSnapshot.docs[0].data();
        const checkOutDate = booking["Check-Out Date"]?.toDate();
        if (checkOutDate && new Date() > checkOutDate) {
          setCanSubmitReview(true);
        }
      }
    } catch (err) {
      console.error("Error checking booking status:", err);
    }
  };

  const fetchReviews = async (propertyId, propertyType) => {
    try {
      const reviewsSnapshot = await getDocs(
        collection(db, propertyType + "s", propertyId, "Reviews")
      );
      const reviewsData = reviewsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReviews(reviewsData);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  // Fetch property details only when hotelId changes
  useEffect(() => {
    fetchPropertyDetails();
  }, [hotelId]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const locationParam =
      searchParams.get("location") || localStorage.getItem("location") || "";
    const checkInParam =
      searchParams.get("checkIn") || localStorage.getItem("checkIn");
    const checkOutParam =
      searchParams.get("checkOut") || localStorage.getItem("checkOut");
    const adultsParam = Number.parseInt(
      searchParams.get("adults") || localStorage.getItem("adults") || "1"
    );
    const childrenParam = Number.parseInt(
      searchParams.get("children") || localStorage.getItem("children") || "0"
    );
    const roomsParam = Number.parseInt(
      searchParams.get("rooms") || localStorage.getItem("rooms") || "1"
    );

    setSearchLocation(locationParam);
    setDates(`${checkInParam} - ${checkOutParam}`);
    setAdults(adultsParam);
    setChildren(childrenParam);
    setRooms(roomsParam);
    updateGuests(adultsParam, childrenParam, roomsParam);

    if (datePickerRef.current) {
      const fp = flatpickr(datePickerRef.current, {
        mode: "range",
        dateFormat: "Y-m-d",
        minDate: "today",
        maxDate: new Date(Date.now() + 420 * 24 * 60 * 60 * 1000),
        defaultDate: [checkInParam, checkOutParam],
        onChange: (selectedDates) => {
          if (selectedDates.length === 2) {
            const [checkin, checkout] = selectedDates.map(
              (date) => date.toISOString().split("T")[0]
            );
            setDates(`${checkin} - ${checkout}`);
            updateURL({ checkIn: checkin, checkOut: checkout });
          }
        },
      });

      return () => fp.destroy(); // Cleanup flatpickr instance
    }
  }, [location.search]);

  const handleGuestsClick = () => {
    setShowGuestsDropdown(!showGuestsDropdown);
  };

  const updateGuests = (a, c, r) => {
    setGuests(`${a} Adults, ${c} Children, ${r} Rooms`);
  };

  const incrementValue = (setter, value, maxValue, param) => {
    if (value < maxValue) {
      const newValue = value + 1;
      setter(newValue);
      updateURL({ [param]: newValue });
      updatePrice(
        param === "rooms" ? newValue : rooms,
        param === "adults" ? newValue : adults,
        param === "children" ? newValue : children
      );
    }
  };

  const decrementValue = (setter, value, minValue, param) => {
    if (value > minValue) {
      const newValue = value - 1;
      setter(newValue);
      updateURL({ [param]: newValue });
      updatePrice(
        param === "rooms" ? newValue : rooms,
        param === "adults" ? newValue : adults,
        param === "children" ? newValue : children
      );
    }
  };

  const updatePrice = (newRooms, newAdults, newChildren) => {
    if (property && property.roomDetails) {
      const newPrice = calculateTotalPrice(
        property.roomDetails,
        getTotalNights(),
        newAdults,
        newChildren,
        newRooms
      );
      setProperty((prev) => ({ ...prev, price: newPrice }));
    }
  };

  const handleDone = () => {
    setShowGuestsDropdown(false);
    updateGuests(adults, children, rooms);
    updateURL({ adults, children, rooms });
  };

  const updateURL = (params) => {
    const searchParams = new URLSearchParams(location.search);
    Object.entries(params).forEach(([key, value]) => {
      searchParams.set(key, value);
    });
    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  };

  const handleLocationChange = (e) => {
    const newLocation = e.target.value;
    setSearchLocation(newLocation);
    updateURL({ location: newLocation });
  };

  const toggleFavorite = async () => {
    if (!auth.currentUser) {
      toast.info("Please login to add favorites");
      return;
    }

    if (!property) {
      console.error("Property data is not available");
      return;
    }

    const userId = auth.currentUser.uid;
    const favoriteRef = doc(db, "Users", userId, "Favorites", hotelId);

    try {
      if (isFavorite) {
        await deleteDoc(favoriteRef);
        toast.success("Removed from favorites");
      } else {
        await setDoc(favoriteRef, {
          propertyId: hotelId,
          "Property Addresss": property["Property Address"] || "",
          "Property Facility": property["Accommodation Facilities"] || [],
          "Property Image": property["Property Images"] || [],
          "Property Name": property["Property Name"] || "",
          "Property Price": property.price || 0,
          "Property Type": property.type || "Hotel",
          collectionName: property.type === "Hotel" ? "Hotels" : "Homestays",
          createdAt: new Date(),
        });
        toast.success("Added to favorites");
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error updating favorite status:", error);
      toast.error("Error updating favorites");
    }
  };

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      if (auth.currentUser) {
        const favoritesRef = doc(
          db,
          "Users",
          auth.currentUser.uid,
          "Favorites",
          hotelId
        );
        const docSnap = await getDoc(favoritesRef);
        setIsFavorite(docSnap.exists());
      }
    };

    fetchFavoriteStatus();
  }, [hotelId]);

  useEffect(() => {
    if (property && property.roomDetails) {
      const newPrice = calculateTotalPrice(
        property.roomDetails,
        getTotalNights(),
        adults,
        children,
        rooms
      );
      if (newPrice !== property.price) {
        setProperty((prev) => ({ ...prev, price: newPrice }));
      }
    }
  }, [property, dates, adults, children, rooms]);

  const handleReviewChange = (field, value) => {
    setNewReview((prev) => ({ ...prev, [field]: value }));
  };

  const submitReview = async () => {
    if (!auth.currentUser) {
      toast.error("You must be logged in to submit a review");
      return;
    }

    try {
      const reviewData = {
        ...newReview,
        userId: auth.currentUser.uid,
        username: auth.currentUser.displayName || "Anonymous",
        userProfilePicture: auth.currentUser.photoURL || "",
        timestamp: new Date(),
        date: format(new Date(), "dd-MM-yyyy"),
        overallRating:
          (newReview.staffReview +
            newReview.luxury +
            newReview.amenities +
            newReview.price) /
          4,
      };

      await addDoc(
        collection(db, property.type + "s", hotelId, "Reviews"),
        reviewData
      );

      toast.success("Review submitted successfully!");
      setNewReview({
        staffReview: 0,
        luxury: 0,
        amenities: 0,
        price: 0,
        comments: "",
      });
      fetchPropertyDetails();
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review. Please try again.");
    }
  };

  const editReview = async (reviewId, updatedReview) => {
    try {
      await updateDoc(
        doc(db, property.type + "s", hotelId, "Reviews", reviewId),
        updatedReview
      );
      toast.success("Review updated successfully!");
      fetchPropertyDetails();
    } catch (error) {
      console.error("Error updating review:", error);
      toast.error("Failed to update review. Please try again.");
    }
  };

  const deleteReview = async (reviewId) => {
    try {
      await deleteDoc(
        doc(db, property.type + "s", hotelId, "Reviews", reviewId)
      );
      toast.success("Review deleted successfully!");
      fetchPropertyDetails();
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error("Failed to delete review. Please try again.");
    }
  };

  const getFacilityIcon = (facilityName) => {
    switch (facilityName.toLowerCase()) {
      case "facility for disabled guests":
        return FaWheelchair;
      case "parking":
        return FaParking;
      case "gym":
        return FaDumbbell;
      case "spa":
        return FaSpa;
      case "pool":
        return FaSwimmer;
      case "wi-fi":
        return FaWifi;
      case "restaurant":
        return FaUtensils;
      case "cctv":
        return FaVideo;
      case "laundry":
        return FaTshirt;
      case "room service":
        return FaBell;
      case "family room":
        return FaUsers;
      case "bar":
        return FaGlassMartini;
      case "air conditioning":
        return FaSnowflake;
      case "lift":
      case "elevator":
        return FaBuilding;
      case "non-smoking area":
      case "smoke free area":
        return FaSmokingBan;
      default:
        return FaCheck;
    }
  };

  const handleReserveNow = () => {
    const [checkIn, checkOut] = dates.split(" - ");
    const queryParams = new URLSearchParams({
      checkIn,
      checkOut,
      adults,
      children,
      rooms,
      price: property.price,
    }).toString();

    // window.location.href = `/create-plan/${hotelId}?${queryParams}`
    navigate(`/create-plan/${hotelId}?${queryParams}`);
  };

  if (loading)
    return (
      <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light">
        <div className="text-center">
          <div className="mb-4">
            <FaHotel
              className=""
              style={{
                fontSize: "4rem",
                animation: "pulse 1.5s infinite",
                color: "#038A5E",
              }}
            />
          </div>
          <h2 className="mb-3">Loading your perfect stay...</h2>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  if (error)
    return (
      <div className="container mt-5">
        <h2>Error: {error}</h2>
      </div>
    );
  if (!property)
    return (
      <div className="container mt-5">
        <h2>No property data available</h2>
      </div>
    );

  return (
    <div className="ota-page-wrapper" style={{ backgroundColor: "var(--bg-light)", minHeight: "100vh", paddingTop: "100px", fontFamily: "'Inter', sans-serif" }}>
      <div className="container py-2">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-3">
            <li className="breadcrumb-item"><Link to="/" className="text-secondary">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/tamil-nadu" className="text-secondary">Tamil Nadu</Link></li>
            <li className="breadcrumb-item active">{property["Property Name"]}</li>
          </ol>
        </nav>
      </div>

      <div className="container">
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <div className="d-flex align-items-center gap-2 mb-2">
              <span className="badge" style={{ backgroundColor: "var(--brand-accent)", color: "#333" }}>Top Rated</span>
              <span className="text-secondary small fw-bold">{property.type}</span>
            </div>
            <h1 className="h2 fw-800 mb-2">{property["Property Name"]}</h1>
            <p className="text-secondary d-flex align-items-center gap-2">
              <i className="fas fa-map-marker-alt text-success"></i>
              {property["Property Address"]}
              <span className="text-success fw-bold cursor-pointer small">Show on map</span>
            </p>
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-white shadow-sm border rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px" }} onClick={toggleFavorite}>
              <i className={`fas fa-heart ${isFavorite ? 'text-danger' : 'text-secondary'}`}></i>
            </button>
            <button className="btn btn-white shadow-sm border rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px" }}>
              <i className="fas fa-share-alt text-secondary"></i>
            </button>
            <button className="ota-btn-primary ms-2" onClick={handleReserveNow}>Reserve Now</button>
          </div>
        </div>

        <div className="property-gallery-grid mb-5">
          <div className="gallery-main">
            <img src={property["Property Images"]?.[0] || "/placeholder.svg"} alt="" className="gallery-img-large" />
          </div>
          <div className="gallery-secondary">
            {property["Property Images"]?.slice(1, 5).map((img, idx) => (
              <img key={idx} src={img || "/placeholder.svg"} alt="" className="gallery-img-small" />
            ))}
            {property["Property Images"]?.length > 5 && (
              <div className="gallery-more-overlay">
                <span>+{property["Property Images"].length - 5} photos</span>
              </div>
            )}
          </div>
        </div>

        <div className="row g-4">
          <div className="col-12 col-lg-8">
            <div className="ota-card mb-4">
              <h4 className="fw-bold mb-3 border-bottom pb-2">About this property</h4>
              <p className="text-secondary lh-lg">{property.About}</p>
            </div>

            <div className="ota-card mb-4">
              <h4 className="fw-bold mb-3 border-bottom pb-2">Popular Facilities</h4>
              <div className="d-flex flex-wrap gap-4 py-2">
                {property["Accommodation Facilities"]?.map((f, i) => {
                  const Icon = getFacilityIcon(f.name);
                  return (
                    <div key={i} className="d-flex align-items-center gap-2">
                      <Icon className="text-success" style={{ fontSize: "1.2rem" }} />
                      <span className="fw-500">{f.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="ota-card mb-4">
              <h4 className="fw-bold mb-4 border-bottom pb-2">Guest reviews</h4>
              <div className="d-flex align-items-center gap-4 mb-4 bg-light p-3 rounded-3">
                <div className="bg-success text-white p-3 rounded-3 h3 fw-800 mb-0">
                  {property.overallRating.toFixed(1)}
                </div>
                <div>
                  <div className="fw-bold h5 mb-1">{property.overallRating > 4.5 ? 'Excellent' : 'Very Good'}</div>
                  <div className="text-secondary">{property.reviewCount || 0} total reviews</div>
                </div>
              </div>

              <div className="row g-3">
                {reviewCategories.map((c, i) => (
                  <div key={i} className="col-md-6 mb-2">
                    <div className="d-flex justify-content-between mb-1 small fw-bold">
                      <span>{c.name}</span>
                      <span>{c.rating.toFixed(1)}</span>
                    </div>
                    <div className="progress" style={{ height: "6px" }}>
                      <div className="progress-bar bg-success" style={{ width: `${(c.rating / 5) * 100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* ... (Reviews list remains but styled cleaner) */}
              <div className="mt-5 border-top pt-4">
                {reviews.slice(0, showAllReviews ? undefined : 3).map((r, i) => (
                  <div key={i} className="mb-4 border-bottom pb-3">
                    <div className="d-flex justify-content-between align-items-start">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <div className="bg-secondary-subtle rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: "32px", height: "32px", fontSize: "0.8rem" }}>{r.username[0]}</div>
                        <span className="fw-bold">{r.username}</span>
                        <span className="text-secondary smaller">• {r.date}</span>
                      </div>
                      <div className="bg-primary text-white px-2 py-1 rounded small fw-bold">{r.overallRating.toFixed(1)}</div>
                    </div>
                    <p className="text-secondary small italic px-4">"{r.comments}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="ota-card position-sticky" style={{ top: "120px" }}>
              <h4 className="fw-bold mb-4">Property Highlights</h4>
              <ul className="list-unstyled mb-4">
                {property["Nearby Iconic Places"]?.split("\n").map((place, i) => (
                  <li key={i} className="d-flex mb-3 small">
                    <i className="fas fa-check text-success mt-1 me-2"></i>
                    <span>{place}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-success-subtle p-3 rounded-3 mb-4">
                <h5 className="fw-bold small mb-3">Booking Selection</h5>
                <div className="mb-3">
                  <label className="smaller text-secondary fw-bold">DATES</label>
                  <input type="text" className="form-control form-control-sm" value={dates} ref={datePickerRef} readOnly />
                </div>
                <div className="mb-3">
                  <label className="smaller text-secondary fw-bold">GUESTS</label>
                  <div className="form-control form-control-sm cursor-pointer" onClick={handleGuestsClick}>{guests}</div>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-end mb-4 border-top pt-3">
                <div>
                  <div className="text-secondary small">Total Price</div>
                  <div className="h2 fw-800 mb-0 text-dark">₹{property.price?.toFixed(0)}</div>
                  <div className="text-secondary smaller">Includes taxes & charges</div>
                </div>
              </div>

              <button className="ota-btn-primary w-100 py-3" onClick={handleReserveNow}>Reserve Your Stay</button>
              <p className="text-center text-secondary smaller mt-3"><i className="fas fa-info-circle me-1"></i> Selection is not yet a booking</p>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .property-gallery-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 8px;
          height: 450px;
          border-radius: 12px;
          overflow: hidden;
        }
        .gallery-main { height: 100%; }
        .gallery-secondary {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: 8px;
          height: 100%;
          position: relative;
        }
        .gallery-img-large, .gallery-img-small { width: 100%; height: 100%; object-fit: cover; transition: filter 0.3s; }
        .gallery-img-large:hover, .gallery-img-small:hover { filter: brightness(0.85); cursor: pointer; }
        .gallery-more-overlay {
          position: absolute; bottom: 8px; right: 8px; 
          background: rgba(0,0,0,0.7); color: white; padding: 5px 12px;
          border-radius: 6px; font-size: 0.9rem; pointer-events: none;
        }
        .fw-800 { font-weight: 800; }
        .fw-500 { font-weight: 500; }
        @media (max-width: 992px) {
          .property-gallery-grid { grid-template-columns: 1fr; height: auto; }
          .gallery-secondary { grid-template-columns: 1fr 1fr 1fr 1fr; height: 120px; }
        }
      `}} />
    </div>
  );
};

export default HotelDetails;

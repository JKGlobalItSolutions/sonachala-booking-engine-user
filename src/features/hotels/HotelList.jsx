import React, { useState, useEffect, useRef } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import flatpickr from "flatpickr"
import "flatpickr/dist/flatpickr.min.css"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../../core/firebase/config"
import {
  FaLocationDot,
  FaCheck,
  FaArrowUp,
  FaList,
  FaGrip,
  FaFilter,
  FaWifi,
  FaCar,
  FaWater,
  FaDumbbell,
  FaUtensils,
  FaSpa,
  FaMartiniGlass,
  FaBell,
  FaUsers,
  FaShirt,
  FaSnowflake,
  FaVideo,
  FaWheelchair,
  FaBuilding,
  FaBanSmoking,
  FaSort,
  FaMap,
} from "react-icons/fa6"
import { Slider } from "../../common/Slider"
import { Modal } from "../../common/Modal"
import MapCard from "../../common/MapCard"
import MapModal from "../../common/MapModal"
import "./HotelList.css" // Import the new CSS

const HotelListing = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [filters, setFilters] = useState({
    priceRange: [300, 6000],
    facilities: [],
  })
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [searchLocation, setSearchLocation] = useState("")
  const [dates, setDates] = useState("")
  const [guests, setGuests] = useState("")
  const [showGuestsDropdown, setShowGuestsDropdown] = useState(false)
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [rooms, setRooms] = useState(1)
  const datePickerRef = useRef(null)
  const guestsDropdownRef = useRef(null)
  const [hotels, setHotels] = useState([])
  const [filteredHotels, setFilteredHotels] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedSort, setSelectedSort] = useState("Price - Low to High")
  const [allDeals, setAllDeals] = useState(false)
  const [viewType, setViewType] = useState("list")
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [showMapModal, setShowMapModal] = useState(false)
  const [showSortModal, setShowSortModal] = useState(false)

  const facilityOptions = [
    { name: "Wi-Fi", icon: FaWifi },
    { name: "Parking", icon: FaCar },
    { name: "Pool", icon: FaWater },
    { name: "Gym", icon: FaDumbbell },
    { name: "Restaurant", icon: FaUtensils },
    { name: "Spa", icon: FaSpa },
    { name: "Bar", icon: FaMartiniGlass },
    { name: "Room Service", icon: FaBell },
    { name: "Family Room", icon: FaUsers },
    { name: "Laundry", icon: FaShirt },
    { name: "Air Conditioning", icon: FaSnowflake },
    { name: "CCTV", icon: FaVideo },
    { name: "Facility for Disabled guests", icon: FaWheelchair },
    { name: "Lift/Elevator", icon: FaBuilding },
    { name: "Non-Smoking Area", icon: FaBanSmoking },
    { name: "Smoke Free Area", icon: FaBanSmoking },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.pageYOffset > 300)
    }

    window.addEventListener("scroll", handleScroll)

    const searchParams = new URLSearchParams(location.search)
    const locationParam = searchParams.get("location") || localStorage.getItem("location") || "Chennai"
    const checkInParam = searchParams.get("checkIn") || localStorage.getItem("checkIn")
    const checkOutParam = searchParams.get("checkOut") || localStorage.getItem("checkOut")
    const adultsParam = Number.parseInt(searchParams.get("adults") || localStorage.getItem("adults") || "1")
    const childrenParam = Number.parseInt(searchParams.get("children") || localStorage.getItem("children") || "0")
    const roomsParam = Number.parseInt(searchParams.get("rooms") || localStorage.getItem("rooms") || "1")

    setSearchLocation(locationParam)
    setDates(`${checkInParam} - ${checkOutParam}`)
    setAdults(adultsParam)
    setChildren(childrenParam)
    setRooms(roomsParam)
    updateGuests(adultsParam, childrenParam, roomsParam)

    const fp = flatpickr(datePickerRef.current, {
      mode: "range",
      dateFormat: "Y-m-d",
      minDate: "today",
      maxDate: new Date(Date.now() + 420 * 24 * 60 * 60 * 1000),
      defaultDate: [checkInParam, checkOutParam],
      onChange: (selectedDates, dateStr) => {
        if (selectedDates.length === 2) {
          const [checkin, checkout] = selectedDates.map((date) => {
            const year = date.getFullYear()
            const month = String(date.getMonth() + 1).padStart(2, "0")
            const day = String(date.getDate()).padStart(2, "0")
            return `${year}-${month}-${day}`
          })

          setDates(`${checkin} - ${checkout}`)
          localStorage.setItem("checkIn", checkin)
          localStorage.setItem("checkOut", checkout)
        }
      },
      onClose: (selectedDates, dateStr) => {
        if (selectedDates.length === 2) {
          const [checkin, checkout] = selectedDates.map((date) => {
            const year = date.getFullYear()
            const month = String(date.getMonth() + 1).padStart(2, "0")
            const day = String(date.getDate()).padStart(2, "0")
            return `${year}-${month}-${day}`
          })
          setDates(`${checkin} - ${checkout}`)
        }
      },
    })

    const handleClickOutside = (event) => {
      if (guestsDropdownRef.current && !guestsDropdownRef.current.contains(event.target)) {
        setShowGuestsDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    fetchHotelsAndPreloadPrices()

    // Store initial values in local storage
    localStorage.setItem("location", locationParam)
    localStorage.setItem("adults", adultsParam.toString())
    localStorage.setItem("children", childrenParam.toString())
    localStorage.setItem("rooms", roomsParam.toString())

    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("mousedown", handleClickOutside)
      if (fp) {
        fp.destroy()
      }
    }
  }, [location.search])

  const fetchHotelsAndPreloadPrices = async () => {
    setLoading(true)
    try {
      const hotelsQuery = query(collection(db, "Hotels"))

      const hotelsSnapshot = await getDocs(hotelsQuery)

      const hotelsData = await Promise.all(
        hotelsSnapshot.docs.map(async (doc) => {
          const hotelData = { id: doc.id, ...doc.data(), type: "Hotel" }
          const roomDetails = await fetchRoomDetails("Hotels", doc.id)
          const price = calculateTotalPrice(roomDetails, getTotalNights(), adults)
          return { ...hotelData, price }
        }),
      )

      const allProperties = hotelsData

      // Fetch Approved Partner Properties
      try {
        const approvedPropsQuery = query(
          collection(db, "properties"),
          where("status", "==", "approved")
        );
        const approvedSnapshot = await getDocs(approvedPropsQuery);

        const partnerProperties = approvedSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            "Property Name": data.name,
            "Property Address": `${data.location?.address}, ${data.location?.city}`,
            "Accommodation Facilities": (data.amenities || []).map(a => ({ name: a })),
            "Property Images": data.images && data.images.length > 0 ? data.images : ["/placeholder.svg"],
            price: Number(data.price) || 0,
            overallRating: 4.5, // Default rating for new properties
            type: data.type === 'homestay' ? 'Homestay' : 'Hotel',
            discountValue: 0,
            isPartnerProperty: true
          };
        });

        allProperties.push(...partnerProperties);
      } catch (err) {
        console.error("Error fetching partner properties:", err);
      }

      setHotels(allProperties)
      setFilteredHotels(allProperties)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching hotels:", error)
      setLoading(false)
    }
  }

  const fetchRoomDetails = async (collectionName, hotelId) => {
    try {
      const roomSnapshot = await getDocs(collection(db, collectionName, hotelId, "Rooms"))
      if (roomSnapshot.docs.length > 0) {
        const roomData = roomSnapshot.docs[0].data()
        return {
          perNightPrice: Number.parseFloat(roomData.roomPrice) || 0,
          perAdultPrice: Number.parseFloat(roomData.perAdultPrice) || 0,
          discountValue: Number.parseFloat(roomData.discountValue) || 0,
        }
      }
      return { perNightPrice: 0, perAdultPrice: 0, discountValue: 0 }
    } catch (error) {
      console.error("Error fetching room details:", error)
      return { perNightPrice: 0, perAdultPrice: 0, discountValue: 0 }
    }
  }

  const calculateTotalPrice = (roomDetails, totalNights, totalAdults) => {
    const { perNightPrice, perAdultPrice, discountValue } = roomDetails
    const nightPrice = totalNights * perNightPrice
    const guestPrice = totalAdults * perAdultPrice
    const totalPrice = nightPrice + guestPrice
    const discount = totalPrice * (discountValue / 100)
    return totalPrice - discount
  }

  const getTotalNights = () => {
    if (!dates) return 1
    const [start, end] = dates.split(" - ").map((date) => new Date(date))
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24))
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    applyFilters(newFilters)
  }

  const applyFilters = (filtersToApply) => {
    const filtered = hotels.filter((hotel) => {
      const [minPrice, maxPrice] = filtersToApply.priceRange
      if (hotel.price < minPrice || (maxPrice !== 6000 && hotel.price > maxPrice)) {
        return false
      }

      if (filtersToApply.facilities.length > 0) {
        if (
          !filtersToApply.facilities.every(
            (facility) =>
              hotel["Accommodation Facilities"] && hotel["Accommodation Facilities"].some((f) => f.name === facility),
          )
        ) {
          return false
        }
      }

      if (allDeals && (!hotel.discountValue || hotel.discountValue === 0)) {
        return false
      }

      return true
    })

    setFilteredHotels(filtered)
  }

  const resetFilters = () => {
    const resetFilters = {
      priceRange: [300, 6000],
      facilities: [],
    }
    setFilters(resetFilters)
    setAllDeals(false)
    setFilteredHotels(hotels)
  }

  const updateGuests = (a, c, r) => {
    setGuests(`${a} Adults, ${c} Children, ${r} Rooms`)
  }

  const handleGuestsClick = () => {
    setShowGuestsDropdown(!showGuestsDropdown)
  }

  const incrementValue = (setter, value, maxValue) => {
    if (value < maxValue) {
      setter(value + 1)
    }
  }

  const decrementValue = (setter, value, minValue) => {
    if (value > minValue) {
      setter(value - 1)
    }
  }

  const handleDone = () => {
    if (adults < rooms) {
      setAdults(rooms)
    }
    setShowGuestsDropdown(false)
    updateGuests(Math.max(adults, rooms), children, rooms)
    localStorage.setItem("adults", Math.max(adults, rooms).toString())
    localStorage.setItem("children", children.toString())
    localStorage.setItem("rooms", rooms.toString())
  }

  const handleSeeAvailability = (hotelId) => {
    const [checkIn, checkOut] = dates.split(" - ")
    const bookingData = {
      location: searchLocation,
      checkIn,
      checkOut,
      adults,
      children,
      rooms,
    }
    Object.entries(bookingData).forEach(([key, value]) => {
      localStorage.setItem(key, value)
    })
    const params = new URLSearchParams(bookingData)
    navigate(`/hotel-details/${hotelId}?${params.toString()}`)
  }

  const handleSort = (sortOption) => {
    setSelectedSort(sortOption)
    const sortedHotels = [...filteredHotels]
    switch (sortOption) {
      case "Our top picks":
        break
      case "Price - Low to High":
        sortedHotels.sort((a, b) => a.price - b.price)
        break
      case "Price - High to Low":
        sortedHotels.sort((a, b) => b.price - a.price)
        break
      default:
        break
    }
    setFilteredHotels(sortedHotels)
  }

  const validateForm = () => {
    if (!searchLocation) {
      alert("Please enter a destination")
      return false
    }
    if (!dates) {
      alert("Please select check-in and check-out dates")
      return false
    }
    if (adults + children > rooms * 4) {
      alert("Maximum 4 guests per room allowed")
      return false
    }
    if (children > adults * 2) {
      alert("Number of children cannot be more than twice the number of adults")
      return false
    }
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) {
      return
    }
    const [checkIn, checkOut] = dates.split(" - ")

    const params = new URLSearchParams()
    params.append("location", searchLocation)
    params.append("checkIn", checkIn)
    params.append("checkOut", checkOut)
    params.append("adults", adults.toString())
    params.append("children", children.toString())
    params.append("rooms", rooms.toString())

    localStorage.setItem("location", searchLocation)
    localStorage.setItem("checkIn", checkIn)
    localStorage.setItem("checkOut", checkOut)
    localStorage.setItem("adults", adults.toString())
    localStorage.setItem("children", children.toString())
    localStorage.setItem("rooms", rooms.toString())

    navigate(`/hotels?${params.toString()}`)
  }

  const handleFilterModalSubmit = () => {
    applyFilters(filters)
    setShowFilterModal(false)
  }

  return (
    <div className="hotel-page-container">
      <div className="container-fluid px-3 px-md-5">

        {/* Modern Search Section */}
        <section className="search-section">
          <div className="container p-0">
            <form id="bookingForm" onSubmit={handleSubmit} className="search-form-row">
              <div className="search-input-group">
                <div className="search-input-wrapper">
                  <i className="fas fa-map-marker-alt search-icon"></i>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Where are you going?"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                  />
                </div>
              </div>

              <div className="search-input-group">
                <div className="search-input-wrapper">
                  <i className="fas fa-calendar-alt search-icon"></i>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Check-in - Check-out"
                    value={dates}
                    ref={datePickerRef}
                    readOnly
                  />
                </div>
              </div>

              <div className="search-input-group">
                <div className="search-input-wrapper" onClick={handleGuestsClick} style={{ cursor: 'pointer' }}>
                  <i className="fas fa-user search-icon"></i>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Guests & Rooms"
                    value={guests}
                    readOnly
                    style={{ cursor: 'pointer' }}
                  />
                </div>

                {showGuestsDropdown && (
                  <div className="guest-dropdown" ref={guestsDropdownRef}>
                    <div className="guest-counter-row">
                      <span>Adults</span>
                      <div className="d-flex align-items-center gap-3">
                        <button type="button" className="counter-btn" onClick={() => decrementValue(setAdults, adults, 1)} disabled={adults <= 1}>-</button>
                        <span className="fw-bold">{adults}</span>
                        <button type="button" className="counter-btn" onClick={() => incrementValue(setAdults, adults, 30)}>+</button>
                      </div>
                    </div>
                    <div className="guest-counter-row">
                      <span>Children</span>
                      <div className="d-flex align-items-center gap-3">
                        <button type="button" className="counter-btn" onClick={() => decrementValue(setChildren, children, 0)} disabled={children <= 0}>-</button>
                        <span className="fw-bold">{children}</span>
                        <button type="button" className="counter-btn" onClick={() => incrementValue(setChildren, children, 10)}>+</button>
                      </div>
                    </div>
                    <div className="guest-counter-row">
                      <span>Rooms</span>
                      <div className="d-flex align-items-center gap-3">
                        <button type="button" className="counter-btn" onClick={() => decrementValue(setRooms, rooms, 1)} disabled={rooms <= 1}>-</button>
                        <span className="fw-bold">{rooms}</span>
                        <button type="button" className="counter-btn" onClick={() => incrementValue(setRooms, rooms, 30)}>+</button>
                      </div>
                    </div>
                    <button type="button" className="apply-btn" onClick={handleDone}>Apply</button>
                  </div>
                )}
              </div>

              <button type="submit" className="search-btn">Search</button>
            </form>
          </div>
        </section>

        {/* Breadcrumb Navigation */}
        <nav aria-label="breadcrumb" className="breadcrumb-nav">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/hotels">Hotels</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {searchLocation}
            </li>
          </ol>
        </nav>

        {/* Mobile Toolbar */}
        <div className="d-md-none mb-4">
          <div className="row g-2">
            <div className="col-4">
              <button
                className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center gap-2"
                onClick={() => setShowSortModal(true)}
              >
                <FaSort /> Sort
              </button>
            </div>
            <div className="col-4">
              <button
                className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center gap-2"
                onClick={() => setShowFilterModal(true)}
              >
                <FaFilter /> Filter
              </button>
            </div>
            <div className="col-4">
              <button
                className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center gap-2"
                onClick={() => setShowMapModal(true)}
              >
                <FaMap /> Map
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="page-layout">

          {/* Sidebar */}
          <aside className="sidebar d-none d-lg-block">
            <MapCard location={searchLocation} onOpenMap={() => setShowMapModal(true)} />
            <div className="mt-4">
              <Filters
                filters={filters}
                onFilterChange={handleFilterChange}
                onResetFilters={resetFilters}
                facilityOptions={facilityOptions}
                allDeals={allDeals}
                setAllDeals={setAllDeals}
              />
            </div>
          </aside>

          {/* Hotel List */}
          <main className={`content-area ${viewType === 'grid' ? 'grid-view' : ''}`}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h1 className="h4 fw-bold mb-1">
                  {searchLocation}: {filteredHotels.length} properties found
                </h1>
                <p className="text-secondary small mb-0">Prices include taxes and fees</p>
              </div>

              <div className="d-flex gap-3 align-items-center">
                <div className="dropdown d-none d-md-block">
                  <button
                    className="btn btn-outline-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span className="me-2">Sort by:</span>
                    {selectedSort}
                  </button>
                  <ul className="dropdown-menu">
                    <li><button className="dropdown-item" onClick={() => handleSort("Our top picks")}>Our top picks</button></li>
                    <li><button className="dropdown-item" onClick={() => handleSort("Price - Low to High")}>Price - Low to High</button></li>
                    <li><button className="dropdown-item" onClick={() => handleSort("Price - High to Low")}>Price - High to Low</button></li>
                  </ul>
                </div>

                <div className="btn-group d-none d-md-flex">
                  <button
                    className={`btn btn-outline-secondary ${viewType === "list" ? "active" : ""}`}
                    onClick={() => setViewType("list")}
                  >
                    <FaList />
                  </button>
                  <button
                    className={`btn btn-outline-secondary ${viewType === "grid" ? "active" : ""}`}
                    onClick={() => setViewType("grid")}
                  >
                    <FaGrip />
                  </button>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3 text-secondary">Finding best places for you...</p>
              </div>
            ) : (
              <>
                {filteredHotels.map((hotel) => (
                  <HotelCard
                    key={hotel.id}
                    hotel={hotel}
                    onSeeAvailability={() => handleSeeAvailability(hotel.id)}
                    viewType={viewType}
                  />
                ))}
                {filteredHotels.length === 0 && (
                  <div className="text-center py-5">
                    <p className="lead text-secondary">No properties found matching your criteria.</p>
                    <button className="btn btn-outline-primary" onClick={resetFilters}>Clear Filters</button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      <button
        className={`btn rounded-circle position-fixed bottom-0 end-0 m-4 ${showBackToTop ? "d-block" : "d-none"}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{ width: "50px", height: "50px", backgroundColor: "#038A5E", color: "white", zIndex: 100 }}
      >
        <FaArrowUp />
      </button>

      {/* Modals */}
      <Modal isOpen={showFilterModal} onClose={() => setShowFilterModal(false)} title="Filters" onSubmit={handleFilterModalSubmit}>
        <Filters filters={filters} onFilterChange={handleFilterChange} onResetFilters={resetFilters} facilityOptions={facilityOptions} allDeals={allDeals} setAllDeals={setAllDeals} />
      </Modal>

      <Modal isOpen={showSortModal} onClose={() => setShowSortModal(false)} title="Sort By">
        <div className="list-group">
          {["Our top picks", "Price - Low to High", "Price - High to Low"].map(opt => (
            <button
              key={opt}
              className={`list-group-item list-group-item-action ${selectedSort === opt ? "active" : ""}`}
              onClick={() => { handleSort(opt); setShowSortModal(false); }}
            >
              {opt}
            </button>
          ))}
        </div>
      </Modal>

      <MapModal
        isOpen={showMapModal}
        onClose={() => setShowMapModal(false)}
        hotels={filteredHotels}
        searchLocation={searchLocation}
      />
    </div>
  )
}

const Filters = ({ filters, onFilterChange, onResetFilters, facilityOptions, allDeals, setAllDeals }) => {
  const [localFilters, setLocalFilters] = useState(filters)
  const [priceRange, setPriceRange] = useState(filters.priceRange[0])

  const handleFilterChange = (category, value) => {
    let updatedFilters
    if (category === "priceRange") {
      updatedFilters = { ...localFilters, [category]: [300, value[0]] }
    } else {
      const currentFilters = localFilters[category] || []
      updatedFilters = {
        ...localFilters,
        [category]: currentFilters.includes(value)
          ? currentFilters.filter((item) => item !== value)
          : [...currentFilters, value],
      }
    }
    setLocalFilters(updatedFilters)
    onFilterChange(updatedFilters)
  }

  const handlePriceRangeChange = (value) => {
    setPriceRange(value[0])
    handleFilterChange("priceRange", value)
  }

  return (
    <div className="filters-card">
      <h5 className="filter-title">Filters</h5>

      <div className="filter-group">
        <h6 className="mb-3 small fw-bold text-uppercase text-secondary">Budget (per night)</h6>
        <div className="px-2">
          <Slider
            defaultValue={[priceRange]}
            min={300}
            max={6000}
            step={100}
            value={[priceRange]}
            onValueChange={handlePriceRangeChange}
            className="mb-3"
          />
          <div className="d-flex justify-content-between small fw-bold">
            <span>₹300</span>
            <span>₹{priceRange}+</span>
          </div>
        </div>
      </div>

      <div className="filter-group">
        <h6 className="mb-3 small fw-bold text-uppercase text-secondary">Deals</h6>
        <div className="custom-checkbox">
          <input
            type="checkbox"
            checked={allDeals}
            onChange={(e) => { setAllDeals(e.target.checked); onFilterChange(localFilters); }}
            id="allDeals"
          />
          <label htmlFor="allDeals">All deals</label>
        </div>
      </div>

      <div className="filter-group">
        <h6 className="mb-3 small fw-bold text-uppercase text-secondary">Facilities</h6>
        {facilityOptions.map((facility) => (
          <div className="custom-checkbox" key={facility.name}>
            <input
              type="checkbox"
              checked={localFilters.facilities.includes(facility.name)}
              onChange={() => handleFilterChange("facilities", facility.name)}
              id={facility.name}
            />
            <label htmlFor={facility.name}>{facility.name}</label>
          </div>
        ))}
      </div>

      <button className="btn btn-outline-secondary w-100 btn-sm" onClick={onResetFilters}>
        Reset filters
      </button>
    </div>
  )
}

const HotelCard = ({ hotel, onSeeAvailability, viewType }) => {
  return (
    <div className="hotel-card" onClick={() => onSeeAvailability(hotel.id)} style={{ cursor: "pointer" }}>
      <div className="hotel-img-wrapper">
        <img
          src={
            (hotel.exteriorPhotos && hotel.exteriorPhotos.length > 0 ? hotel.exteriorPhotos[0] : null) ||
            hotel["Property Images"]?.[0] ||
            "/placeholder.svg"
          }
          className="hotel-img"
          alt={hotel["Property Name"]}
        />
      </div>

      <div className="hotel-content">
        <div>
          <div className="hotel-header">
            <h3 className="hotel-name">{hotel["Property Name"]}</h3>
            <span className="rating-badge">
              {Number.parseFloat(hotel.overallRating || 0).toFixed(1)}
            </span>
          </div>

          <div className="hotel-address">
            <FaLocationDot />
            <span>{hotel["Property Address"]}</span>
          </div>

          <div className="facilities-preview">
            {hotel["Accommodation Facilities"]?.slice(0, 3).map((f, i) => (
              <span key={i} className="facility-pill">
                <FaCheck size={10} /> {f.name}
              </span>
            ))}
            {hotel["Accommodation Facilities"]?.length > 3 && (
              <span className="facility-pill">+{hotel["Accommodation Facilities"].length - 3} more</span>
            )}
          </div>
        </div>

        <div className="hotel-footer">
          <div className="price-info">
            <div className="price-label">1 night, 2 adults</div>
            <div className="price-value">₹{hotel.price.toFixed(0)}</div>
            <div className="text-secondary small">Includes taxes</div>
          </div>
          <button className="availability-btn">
            See Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default HotelListing

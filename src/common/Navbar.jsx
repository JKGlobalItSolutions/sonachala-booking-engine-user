import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../core/firebase/config";
import { useAuth } from "../core/contexts/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Navbar.css"; // Import the new CSS file
import LogoutPopup from "./LogoutPopup";
import logo from "../assets/image/componetimsges/logo.png";

function Navbar() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState(null); // State for active dropdown

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show at the very top
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else {
        // Hide if scrolling down, show if scrolling up
        if (currentScrollY > lastScrollY) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Bootstrap JS import kept for other components if needed, but not used for Navbar dropdowns anymore
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js")
      .then(() => {
        // Bootstrap JavaScript has been loaded
      })
      .catch((err) => console.error("Failed to load Bootstrap JavaScript", err));
  }, []);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    signOut(auth)
      .then(() => {
        setShowLogoutModal(false);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error logging out: ", error);
        alert("Error logging out. Please try again.");
      });
  };

  const isActive = (path, dropdown = []) => {
    if (location.pathname === path) return true;
    if (dropdown && dropdown.length > 0) {
      return dropdown.some(sub => location.pathname === sub.path);
    }
    return false;
  };

  // Toggle for mobile or click interactions
  const toggleDropdown = (idx, e) => {
    e?.stopPropagation(); // Prevent event bubbling if needed
    setActiveDropdown(activeDropdown === idx ? null : idx);
  };

  // Hover handlers for Desktop
  const handleMouseEnter = (idx) => {
    if (window.innerWidth >= 992) { // 992px is Bootstrap's lg breakpoint
      setActiveDropdown(idx);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 992) {
      setActiveDropdown(null);
    }
  };

  return (
    <>
      <nav style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: "9999",
        background: "var(--navbar-bg, linear-gradient(135deg, rgba(3, 138, 94, 0.95) 0%, rgba(2, 107, 72, 0.95) 100%))",
        backdropFilter: "blur(10px)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)",
        fontFamily: "'Poppins', 'Inter', sans-serif",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: isVisible ? "translateY(0)" : "translateY(-100%)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
        width: "100%",
        maxWidth: "100vw",
        boxSizing: "border-box"
      }}>
        <div className="container-fluid d-flex align-items-center justify-content-between" style={{ padding: "14px 20px" }}> {/* Reduced padding for mobile safety */}

          <div className="d-flex align-items-center flex-grow-1">
            <div className="d-flex align-items-center" style={{ marginRight: "auto", flexShrink: 0, position: "relative", zIndex: "1070" }}>
              <Link to="/" className="d-flex align-items-center" style={{ transition: "transform 0.3s ease" }}>
                <img
                  src={logo}
                  alt="Sonachala"
                  style={{
                    maxHeight: "80px", // Reduced height for mobile friendliness
                    filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.25))",
                    transition: "all 0.3s ease",
                  }}
                  className="navbar-brand-logo"
                />
              </Link>
            </div>

            {/* Navigation - Desktop */}
            <div className="d-none d-lg-flex align-items-center gap-1 mx-auto">
              {[
                { icon: "fa-home", label: "Home", path: "/" },
                {
                  icon: "fa-hotel",
                  label: "Stays",
                  path: "/hotels",
                  dropdown: [
                    { label: "Hotels", path: "/hotels" },
                    { label: "HomeStays", path: "/Homestays" }
                  ]
                },
                {
                  icon: "fa-plane",
                  label: "Flights",
                  path: "/flights/domestic",
                  dropdown: [
                    { label: "Domestic Flights", path: "/flights/domestic" },
                    { label: "International Flights", path: "/flights/international" }
                  ]
                },
                {
                  icon: "fa-bus",
                  label: "Bus",
                  path: "/buses",
                  dropdown: [
                    { label: "Bus Search", path: "/buses" },
                    { label: "Bus Rentals", path: "/buses/rentals" }
                  ]
                },
                {
                  icon: "fa-train",
                  label: "Trains",
                  path: "/trains",
                  dropdown: [
                    { label: "Train Search", path: "/trains" },
                    { label: "PNR Status", path: "/trains/prn-status" }
                  ]
                },
                { icon: "fa-car", label: "Car", path: "/Cab-form" },
                { icon: "fa-calendar-alt", label: "Events", path: "/Event-form" },
                { icon: "fa-lightbulb", label: "Solutions", path: "/Agent" },
                { icon: "fa-tools", label: "Support", path: "/Support-form" }
              ].map((item, idx) => {
                const active = isActive(item.path, item.dropdown);
                const isDropdownActive = activeDropdown === idx;

                return item.dropdown ? (
                  <div
                    className={`custom-dropdown ${isDropdownActive ? 'show' : ''}`}
                    key={idx}
                    onMouseEnter={() => handleMouseEnter(idx)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      className={`custom-dropdown-toggle ${isDropdownActive ? 'active' : ''}`}
                      onClick={(e) => toggleDropdown(idx, e)}
                      style={{
                        background: active ? "rgba(255, 255, 255, 0.15)" : "transparent",
                      }}
                    >
                      <span style={{
                        position: "relative",
                        zIndex: "2",
                        textShadow: "0 2px 4px rgba(0,0,0,0.3)"
                      }}>
                        <i className={`fas ${item.icon}`} style={{ fontSize: "0.9rem", marginRight: "6px", opacity: 0.95 }}></i> {item.label}
                      </span>
                      <i className="fas fa-chevron-down" style={{
                        fontSize: "0.7rem",
                        opacity: 0.8,
                        marginLeft: "6px",
                      }}></i>
                      {active && !isDropdownActive && (
                        <div style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: "rgba(255, 255, 255, 0.05)",
                          borderRadius: "12px",
                          zIndex: "1"
                        }}></div>
                      )}
                    </button>

                    <ul className="custom-dropdown-menu">
                      {item.dropdown.map((sub, sIdx) => (
                        <li key={sIdx}>
                          <Link
                            className={`custom-dropdown-item ${location.pathname === sub.path ? 'active-item' : ''}`}
                            to={sub.path}
                          >
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <Link
                    key={idx}
                    to={item.path}
                    className="custom-dropdown-toggle"
                    style={{
                      background: active ? "rgba(255, 255, 255, 0.15)" : "transparent",
                      textShadow: "0 1px 2px rgba(0,0,0,0.2)"
                    }}
                  >
                    <span style={{
                      position: "relative",
                      zIndex: "2"
                    }}>
                      <i className={`fas ${item.icon}`} style={{ fontSize: "0.9rem", marginRight: "6px", opacity: 0.95 }}></i> {item.label}
                    </span>
                    {active && (
                      <div style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "rgba(255, 255, 255, 0.08)",
                        borderRadius: "12px",
                        zIndex: "1"
                      }}></div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="d-flex align-items-center gap-2" style={{ flexShrink: 0 }}>
            {/* Account - Visible on all screens */}
            <div className="d-flex align-items-center gap-3">
              {currentUser ? (
                <div className="dropdown">
                  <button
                    className="btn border-0 d-flex align-items-center gap-3 p-2"
                    data-bs-toggle="dropdown"
                    style={{
                      color: "#ffffff",
                      background: "rgba(255, 255, 255, 0.1)",
                      borderRadius: "14px",
                      padding: "8px 16px",
                      transition: "all 0.3s ease",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      backdropFilter: "blur(5px)"
                    }}
                  >
                    <div style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, var(--brand-accent, #038A5E), #FFA500)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "800",
                      color: "#333",
                      fontSize: "0.85rem",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                      border: "2px solid rgba(255, 255, 255, 0.3)"
                    }}>
                      {currentUser.displayName ? currentUser.displayName[0].toUpperCase() : currentUser.email[0].toUpperCase()}
                    </div>
                    <div className="text-start d-none d-xl-block">
                      <span style={{ fontSize: "0.85rem", fontWeight: "600", display: "block", textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}>{currentUser.displayName || "Account"}</span>
                      <span style={{ fontSize: "0.75rem", opacity: 0.8, display: "block" }}>Welcome back</span>
                    </div>
                    <i className="fas fa-chevron-down d-none d-xl-block" style={{ fontSize: "0.8rem", opacity: 0.8 }}></i>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end border-0 shadow-lg mt-2 slide-in" style={{
                    borderRadius: "12px",
                    padding: "8px 0",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)"
                  }}>
                    <li>
                      <Link className="dropdown-item py-3 px-4" to="/profile" style={{ fontSize: "0.85rem", fontWeight: "500" }}>
                        <i className="fas fa-user-circle me-3" style={{ color: "#038A5E", opacity: 0.8 }}></i>
                        <span style={{ color: "#2d3748" }}>My Profile</span>
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item py-3 px-4" to="/my-bookings" style={{ fontSize: "0.85rem", fontWeight: "500" }}>
                        <i className="fas fa-list me-3" style={{ color: "#038A5E", opacity: 0.8 }}></i>
                        <span style={{ color: "#2d3748" }}>My Bookings</span>
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider" style={{ margin: "4px 0" }} /></li>
                    <li>
                      <button className="dropdown-item py-3 px-4 text-danger" onClick={handleLogout} style={{ fontSize: "0.85rem", fontWeight: "600" }}>
                        <i className="fas fa-sign-out-alt me-3"></i> Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link
                  to="/login"
                  style={{
                    background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
                    color: "var(--brand-primary, #038A5E)",
                    padding: "8px 16px",
                    borderRadius: "14px",
                    fontWeight: "700",
                    fontSize: "0.85rem",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.1)",
                    border: "1px solid rgba(3, 138, 94, 0.3)",
                    transition: "all 0.3s ease",
                    letterSpacing: "0.03em",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = "0 8px 25px rgba(0,0,0,0.2), 0 4px 12px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 6px 20px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.1)";
                  }}
                >
                  <i className="fas fa-user-plus me-2" style={{ opacity: 0.8 }}></i> <span className="d-none d-sm-inline">Sign In</span>
                </Link>
              )}
            </div>

            {/* Mobile Toggler */}
            <button
              className="navbar-toggler d-lg-none"
              type="button"
              style={{
                color: "#ffffff",
                border: "1px solid rgba(255, 255, 255, 0.4)",
                borderRadius: "10px",
                padding: "8px 12px",
                background: "rgba(255, 255, 255, 0.1)",
                transition: "all 0.3s ease",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.15)";
                e.target.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.1)";
                e.target.style.transform = "scale(1)";
              }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <i className={isMenuOpen ? "fas fa-times fa-lg" : "fas fa-bars fa-lg"} style={{ opacity: 0.9 }}></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="d-lg-none" style={{
            background: "linear-gradient(135deg, rgba(3, 138, 94, 0.98) 0%, rgba(2, 107, 72, 0.98) 100%)",
            borderTop: "1px solid rgba(255, 255, 255, 0.15)",
            padding: "24px",
            maxHeight: "85vh",
            overflowY: "auto",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
          }}>
            <div className="d-flex flex-column gap-2">
              {[
                { icon: "fa-home", label: "Home", path: "/" },
                {
                  icon: "fa-hotel",
                  label: "Stays",
                  path: "/hotels",
                  dropdown: [
                    { label: "Hotels", path: "/hotels" },
                    { label: "HomeStays", path: "/Homestays" }
                  ]
                },
                {
                  icon: "fa-plane",
                  label: "Flights",
                  path: "/flights/domestic",
                  dropdown: [
                    { label: "Domestic Flights", path: "/flights/domestic" },
                    { label: "International Flights", path: "/flights/international" }
                  ]
                },
                {
                  icon: "fa-bus",
                  label: "Bus",
                  path: "/buses",
                  dropdown: [
                    { label: "Bus Search", path: "/buses" },
                    { label: "Bus Rentals", path: "/buses/rentals" }
                  ]
                },
                {
                  icon: "fa-train",
                  label: "Trains",
                  path: "/trains",
                  dropdown: [
                    { label: "Train Search", path: "/trains" },
                    { label: "PNR Status", path: "/trains/prn-status" }
                  ]
                },
                { icon: "fa-car", label: "Car", path: "/Cab-form" },
                { icon: "fa-calendar-alt", label: "Events", path: "/Event-form" },
                { icon: "fa-lightbulb", label: "Solutions", path: "/Agent" },
                { icon: "fa-tools", label: "Support", path: "/Support-form" }
              ].map((item, idx) => {
                const isDropdownActive = activeDropdown === idx;

                if (item.dropdown) {
                  return (
                    <div key={idx} className="mobile-dropdown-container">
                      <div
                        onClick={() => toggleDropdown(idx)}
                        className="text-white text-decoration-none d-flex align-items-center justify-content-between gap-4"
                        style={{
                          background: isActive(item.path, item.dropdown) ? "rgba(255, 255, 255, 0.15)" : "transparent",
                          padding: "16px 20px",
                          borderRadius: "14px",
                          fontSize: "1rem",
                          fontWeight: "600",
                          transition: "all 0.3s ease",
                          border: isActive(item.path, item.dropdown) ? "1px solid rgba(255, 255, 255, 0.3)" : "none",
                          cursor: "pointer"
                        }}
                      >
                        <div className="d-flex align-items-center gap-4">
                          <div style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "12px",
                            background: isActive(item.path) ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "1.1rem",
                            opacity: 0.9
                          }}>
                            <i className={`fas ${item.icon}`}></i>
                          </div>
                          <span style={{ textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>{item.label}</span>
                        </div>
                        <i className={`fas fa-chevron-down ${isDropdownActive ? 'rotate-180' : ''}`} style={{ transition: 'transform 0.3s' }}></i>
                      </div>

                      {isDropdownActive && (
                        <div className="ps-5 pe-3 py-2" style={{ animation: "fadeInUp 0.3s ease-out" }}>
                          {item.dropdown.map((sub, sIdx) => (
                            <Link
                              key={sIdx}
                              to={sub.path}
                              onClick={() => setIsMenuOpen(false)}
                              className="d-block py-2 text-white text-decoration-none"
                              style={{ opacity: 0.9, fontSize: "0.95rem" }}
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={idx}
                    to={item.path}
                    className="text-white text-decoration-none d-flex align-items-center gap-4"
                    style={{
                      background: isActive(item.path) ? "rgba(255, 255, 255, 0.15)" : "transparent",
                      padding: "16px 20px",
                      borderRadius: "14px",
                      fontSize: "1rem",
                      fontWeight: "600",
                      transition: "all 0.3s ease",
                      border: isActive(item.path) ? "1px solid rgba(255, 255, 255, 0.3)" : "none",
                      position: "relative",
                      overflow: "hidden"
                    }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "12px",
                      background: isActive(item.path) ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.1rem",
                      opacity: 0.9
                    }}>
                      <i className={`fas ${item.icon}`}></i>
                    </div>
                    <span style={{ textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>


      <LogoutPopup isOpen={showLogoutModal} onClose={() => setShowLogoutModal(false)} onConfirm={confirmLogout} />
    </>
  );
}

export default Navbar;

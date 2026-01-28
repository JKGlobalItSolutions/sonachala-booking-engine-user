// Import partner images directly
import airbnbImg from '../assets/image/OurPartners/airbnb-3384008_1280.png';
import appleImg from '../assets/image/OurPartners/apple-3383931_1280.png';
import linkedinImg from '../assets/image/OurPartners/linked-in-2668692_1280.png';
import techcorpImg from '../assets/image/OurPartners/logo-7462411_1280.png';
import microsoftImg from '../assets/image/OurPartners/microsoft-5977659_1280.png';
import paypalImg from '../assets/image/OurPartners/paypal-3383998_1280.png';
import yahooImg from '../assets/image/OurPartners/yahoo-76684_1280.png';

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PartnersCarousel = () => {
  const partners = [
    airbnbImg,
    appleImg,
    linkedinImg,
    techcorpImg,
    microsoftImg,
    paypalImg,
    yahooImg
  ];

  const partnerNames = [
    "Airbnb",
    "Apple",
    "LinkedIn",
    "TechCorp",
    "Microsoft",
    "PayPal",
    "Yahoo"
  ];

  const settings = {
    autoplay: true,
    autoplaySpeed: 2500,
    infinite: true,
    dots: true,
    arrows: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 992, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1, arrows: false } },
    ],
  };

  return (
    <div className="container py-5 mt-5">
      <div className="text-center mb-5">
        <h2 style={{
          fontSize: "3rem",
          color: "#de0000c9",
          textTransform: "uppercase",
          letterSpacing: "3px",
          fontWeight: "bold",
          textShadow: "3px 3px 6px rgba(0,0,0,0.2)",
          marginBottom: "10px"
        }}>
          ✨ Our Clients
        </h2>
        <p style={{
          fontSize: "1.3rem",
          color: "#9fa1a3ff",
          fontStyle: "italic"
        }}>
          Trusted by Industry Leaders Worldwide
        </p>
        <div style={{
          width: "100px",
          height: "3px",
          background: "linear-gradient(to right, #e74c3c, #f39c12)",
          margin: "20px auto",
          borderRadius: "2px"
        }}></div>
      </div>

      <div className="position-relative">
        <div className="bg-light rounded-3 shadow-lg p-4">
          <Slider {...settings}>
            {partners.map((logo, index) => (
              <div key={index} className="px-3">
                <div className="partner-card text-center">
                  <div className="bg-white rounded-3 shadow-sm border-0 overflow-hidden transition-3d hover-shadow d-flex flex-column align-items-center justify-content-center"
                    style={{
                      height: "180px",
                      padding: "30px 20px",
                      borderRadius: "15px",
                      transition: "all 0.9s ease",
                      boxShadow: "20px 10px 30px rgba(0,0,0,0.1)"
                    }}>
                    <img
                      src={logo}
                      alt={`${partnerNames[index]} Logo`}
                      className="mb-3"
                      style={{
                        maxWidth: "100px",
                        maxHeight: "80px",
                        objectFit: "contain",
                        filter: "grayscale(20%)",
                        transition: "filter 0.3s ease"
                      }}
                    />
                    <h6 className="fw-bold mb-0" style={{ color: "#2c3e50" }}>
                      {partnerNames[index]}
                    </h6>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        <div className="mt-4 text-center">
          <div className="d-inline-flex align-items-center gap-2 flex-wrap justify-content-center">
            <span style={{
              fontSize: "1.1rem",
              color: "#7f8c8d",
              fontWeight: "500"
            }}>
              Powered by Excellence
            </span>
            <div className="d-flex gap-1">
              {[1, 2, 3, 4, 5].map(star => (
                <span key={star} style={{ color: "#f39c12", fontSize: "1.2rem" }}>⭐</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnersCarousel;

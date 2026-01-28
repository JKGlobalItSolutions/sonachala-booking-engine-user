// Import images directly
import londonImage from '../assets/image/Advertisements/london-3794348_1280.jpg';
import marketeerImage from '../assets/image/Advertisements/marketeer-1687065_1280.jpg';
import onlineAdvertisingImage from '../assets/image/Advertisements/online-advertising-6693945_1280.png';

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeAdvertisingSlider = () => {
  const images = [
    londonImage,
    marketeerImage,
    onlineAdvertisingImage,
  ];

  const settings = {
    autoplay: true,
    autoplaySpeed: 4000,
    infinite: true,
    dots: true,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: true,
        }
      }
    ]
  };

  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold mb-5" style={{
        fontSize: "2.5rem",
        color: "#1a1a1a",
        textTransform: "uppercase",
        letterSpacing: "2px",
        textShadow: "2px 2px 4px rgba(0,0,0,0.1)"
      }}>
        🎯 Exclusive News & Offers
      </h2>

      <div className="position-relative">
        <Slider {...settings}>
          {images.map((img, index) => (
            <div key={index}>
              <div className="position-relative overflow-hidden rounded shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
                  padding: "30px",
                  margin: "0 20px"
                }}>
                <div className="bg-white rounded shadow-inner p-4">
                  <img
                    src={img}
                    alt={`Luxury Advertisement ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "500px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                    }}
                  />
                  <div className="mt-4 text-center">
                    <h4 style={{
                      color: "#3498db",
                      fontWeight: "bold",
                      textTransform: "uppercase"
                    }}>
                      Premium Experience
                    </h4>
                    <p className="text-muted">
                      Discover unparalleled luxury and exceptional service
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        <div className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background: "radial-gradient(circle, transparent 30%, rgba(255,255,255,0.1) 70%)",
            pointerEvents: "none",
            zIndex: 1
          }}>
        </div>
      </div>
    </div>
  );
};

export default HomeAdvertisingSlider;

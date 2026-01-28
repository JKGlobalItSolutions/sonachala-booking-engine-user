import React from 'react'
import { Link } from 'react-router-dom'
import banner from '../Images/About/Frame 1006.png'
import './About.css'

const About = () => {
  return (
    <div className="about-container">
      <div className="about-hero">
        <img className='img-fluid' src={banner} alt="Sonachala Banner" />
        <div className="hero-overlay">
          <h1 className="hero-title">About Sonachala</h1>
        </div>
      </div>

      <div className="about-content">
        <div className="container">
          <section className="about-section">
            <h2 className="section-title">Company Overview</h2>
            <p className="section-content">
              <span className="brand-highlight">Sonachala</span> is your all-in-one platform designed to enhance your travel and dining experiences, whether you're planning a vacation, booking a stay, or finding the perfect restaurant. With our comprehensive suite of services, including stays & hotels, restaurant reservations, and holiday packages, we aim to make your journey seamless and memorable.
            </p>
          </section>

          <section className="about-section">
            <h2 className="section-title">Mission Statement</h2>
            <p className="section-content">
              At Sonachala our mission is to simplify travel and dining for everyone, offering a user-friendly platform that provides unparalleled convenience, value, and quality. We are dedicated to connecting our users with the best experiences, ensuring every trip and meal is extraordinary.
            </p>
          </section>

          <section className="about-section">
            <h2 className="section-title">Our Services</h2>

            <div className="service-item">
              <h3 className="service-title">Stays & Hotels</h3>
              <p className="service-description">
                Discover and book accommodations that suit your style and budget. From luxury hotels to cozy bed-and-breakfasts, Sonachala offers a wide range of options to ensure you find the perfect place to stay.
              </p>
              <ul className="service-features">
                <li><strong>Wide Selection:</strong> Browse thousands of properties worldwide.</li>
                <li><strong>Detailed Listings:</strong> Comprehensive details, high-quality photos, and real customer reviews.</li>
                <li><strong>Easy Booking:</strong> Simple and secure booking process with instant confirmation.</li>
              </ul>
            </div>

            <div className="service-item">
              <h3 className="service-title">Restaurants</h3>
              <p className="service-description">
                Find and reserve tables at top restaurants, whether you're looking for a casual dining experience or a gourmet meal.
              </p>
              <ul className="service-features">
                <li><strong>Diverse Choices:</strong> Explore a variety of cuisines and dining styles.</li>
                <li><strong>Real-Time Reservations:</strong> Check availability and book in real-time.</li>
                <li><strong>Customer Reviews:</strong> Read reviews and ratings from fellow diners to make informed choices.</li>
              </ul>
            </div>

            <div className="service-item">
              <h3 className="service-title">Holiday Packages</h3>
              <p className="service-description">
                Plan your perfect getaway with curated holiday packages that combine accommodations, activities, and dining.
              </p>
              <ul className="service-features">
                <li><strong>Curated Packages:</strong> Thoughtfully designed itineraries to suit different interests and budgets.</li>
                <li><strong>Customizable Options:</strong> Tailor your holiday package to your preferences.</li>
                <li><strong>Exclusive Deals:</strong> Access to special offers and discounts for a more affordable experience.</li>
              </ul>
            </div>
          </section>

          <section className="about-section">
            <h2 className="section-title">Core Values</h2>
            <ul className="values-list">
              <li><strong>Customer-Centric:</strong> Our users are at the heart of everything we do. We strive to exceed expectations and provide exceptional service.</li>
              <li><strong>Quality and Trust:</strong> We partner with reputable establishments to ensure the highest quality standards.</li>
              <li><strong>Innovation:</strong> We continuously improve our platform with the latest technology to offer the best user experience.</li>
            </ul>
          </section>

          <section className="about-section">
            <h2 className="section-title">Our Team</h2>
            <p className="section-content">
              Our dedicated team of travel and hospitality experts works tirelessly to bring you the best options and support your needs. From our experienced leadership to our passionate support staff, every team member is committed to making Sonachala your preferred travel and dining companion.
            </p>
          </section>

          <section className="about-section">
            <h2 className="section-title">Community and Sustainability</h2>
            <p className="section-content">
              Sonachala believes in giving back to the community and promoting sustainable travel practices. We partner with local businesses and support eco-friendly initiatives to ensure a positive impact on the environment and local economies.
            </p>
          </section>

          <section className="about-section">
            <h2 className="section-title">Vision for the Future</h2>
            <p className="section-content">
              We envision Sonachala as the go-to platform for all travel and dining needs, continuously expanding our services and reaching new markets. Our goal is to keep innovating and providing our users with unparalleled convenience and unforgettable experiences.
            </p>
          </section>

          <section className="about-section contact-section">
            <h2 className="section-title">Contact Us</h2>
            <p className="section-content">
              We are here to assist you 24/7. For any inquiries or support, feel free to reach out to us via email, phone, or through our social media channels. Connect with us today and start exploring the world with Sonachala!
            </p>
            <div className="contact-buttons">
              <Link to="/support" className="contact-button primary">Get Support</Link>
              <Link to="/hotels" className="contact-button secondary">Book Now</Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default About

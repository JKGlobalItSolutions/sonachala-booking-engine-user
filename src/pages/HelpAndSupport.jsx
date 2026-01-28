import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HelpAndSupport.css';

// Support components with proper content
const ContactUs = () => (
  <div className="support-content">
    <h1 className="support-title">Contact Us</h1>
    <div className="support-info">
      <div className="contact-section">
        <div className="contact-item">
          <div className="contact-icon">📞</div>
          <div>
            <h4>Phone Support</h4>
            <p>+91 98765 43210</p>
            <p>Mon-Sat: 9:00 AM - 9:00 PM IST</p>
          </div>
        </div>
        <div className="contact-item">
          <div className="contact-icon">✉️</div>
          <div>
            <h4>Email Support</h4>
            <p>support@sonachala.com</p>
            <p>We respond within 24 hours</p>
          </div>
        </div>
        <div className="contact-item">
          <div className="contact-icon">💬</div>
          <div>
            <h4>Live Chat</h4>
            <p>Available 24/7</p>
            <p>Connect with our support agents</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const FAQ = () => (
  <div className="support-content">
    <h1 className="support-title">Frequently Asked Questions</h1>
    <div className="faq-list">
      <div className="faq-item">
        <h5>How do I book a hotel?</h5>
        <p>You can book hotels by visiting our Hotels page, selecting your destination, dates, and preferred room type. Enter your location, check-in and check-out dates, number of guests, and browse available options.</p>
      </div>
      <div className="faq-item">
        <h5>What are the cancellation policies?</h5>
        <p>Cancellation policies vary by booking type. For hotels, check individual property policies which usually allow free cancellation 24-48 hours before check-in. Transport bookings typically allow free cancellation up to 24 hours before departure. Cancellation fees may apply otherwise.</p>
      </div>
      <div className="faq-item">
        <h5>How do I modify my booking?</h5>
        <p>You can modify most bookings through your profile dashboard under 'My Bookings'. Contact our support team for assistance with changes like date alterations or upgrading rooms. Modifications are subject to availability.</p>
      </div>
      <div className="faq-item">
        <h5>Can I book transportation along with hotels?</h5>
        <p>Yes! You can book flights, trains, buses, and cabs through our transportation services and combine them with your hotel bookings for complete trip planning. Use our integrated booking system for seamless travel arrangements.</p>
      </div>
      <div className="faq-item">
        <h5>What payment methods are accepted?</h5>
        <p>We accept all major credit cards (Visa, MasterCard, American Express), debit cards, UPI, net banking, wallets, and online payment methods for secure transactions. All payments are processed through encrypted channels.</p>
      </div>
      <div className="faq-item">
        <h5>Do you offer discounts for long stays?</h5>
        <p>Many properties offer seasonal discounts and special rates for stays longer than 7 days. Check individual hotel listings for extended stay deals, or contact our team for custom packages.</p>
      </div>
      <div className="faq-item">
        <h5>How do I add multiple rooms to my booking?</h5>
        <p>During the booking process, you can select multiple rooms by adjusting the 'Rooms' counter in the guest selection. Each room will be individually configurable for guest counts and amenities.</p>
      </div>
      <div className="faq-item">
        <h5>What if my flight gets delayed?</h5>
        <p>If your flight delay affects your hotel check-in, inform the hotel directly and they may hold your reservation. Most hotels are accommodating for reasonable delays. For major disruptions, contact our 24/7 support.</p>
      </div>
      <div className="faq-item">
        <h5>Can I request special room preferences?</h5>
        <p>Yes, you can specify room preferences like bed types, smoking/non-smoking, view preferences, or accessibility needs during booking. Availability depends on the property.</p>
      </div>
      <div className="faq-item">
        <h5>How do refunds work for cancelled bookings?</h5>
        <p>Refunds for cancellations typically process within 7-10 business days depending on your payment method. Credit card refunds may take additional time for bank processing.</p>
      </div>
    </div>
  </div>
);

const HelpSupport = () => (
  <div className="support-content">
    <h1 className="support-title">Help & Support</h1>
    <div className="help-sections">
      <div className="help-section">
        <h4>Booking Assistance</h4>
        <p>Get help with all aspects of making your reservations. Our comprehensive guides cover everything from selecting destinations to finalizing payments.</p>
        <ul>
          <li>How to search and book accommodations - Step-by-step guide to finding and reserving the perfect stay</li>
          <li>Transportation booking guide - Comprehensive tips for booking flights, trains, buses, and cabs</li>
          <li>Package deals and offers - Discover bundled travel deals, seasonal promotions, and special discounts</li>
          <li>Group booking process - Special procedures for large group reservations and corporate bookings</li>
        </ul>
      </div>
      <div className="help-section">
        <h4>Account & Profile</h4>
        <p>Manage your personal information and booking preferences with ease. Learn how to keep your account secure and up-to-date.</p>
        <ul>
          <li>Creating and managing your account - Registration process, verification steps, and account maintenance</li>
          <li>Profile settings and preferences - Customize notifications, language, currency, and travel preferences</li>
          <li>Booking history and receipts - Access all past bookings, download receipts, and track booking status</li>
          <li>Password and security settings - Protect your account with strong passwords and two-factor authentication</li>
        </ul>
      </div>
      <div className="help-section">
        <h4>Technical Support</h4>
        <p>Troubleshoot common issues and get technical assistance for using our platform effectively across all devices.</p>
        <ul>
          <li>Login and authentication issues - Password reset, account recovery, and login troubleshooting</li>
          <li>Payment processing problems - Card declines, transaction errors, and payment method issues</li>
          <li>Website performance and bugs - Browser compatibility, loading issues, and reporting technical bugs</li>
          <li>Mobile app support - Installation help, app features tutorial, and mobile-specific troubleshooting</li>
        </ul>
      </div>
      <div className="help-section">
        <h4>Policies & Guidelines</h4>
        <p>Understand our terms and conditions to ensure a smooth booking experience. Review important legal information.</p>
        <ul>
          <li>Terms of service - General usage policies and user responsibilities</li>
          <li>Privacy policy - How we collect, use, and protect your personal information</li>
          <li>Cancellation and refund policies - Detailed rules for booking modifications and refunds</li>
          <li>Booking conditions - Age restrictions, additional fees, and special conditions</li>
        </ul>
      </div>
      <div className="help-section">
        <h4>Travel Tips & Resources</h4>
        <p>Enhance your travel experience with expert advice and useful resources for planning your trips.</p>
        <ul>
          <li>Destination guides - Local insights, cultural etiquette, and must-visit attractions</li>
          <li>Travel insurance options - Protect your bookings with comprehensive coverage plans</li>
          <li>Weather and seasonal information - Current conditions and best times to visit</li>
          <li>Local transport and navigation - Getting around your destination safely</li>
        </ul>
      </div>
    </div>
    <div className="contact-us-prompt">
      <p>Still have questions or need personalized assistance?</p>
      <p>Our dedicated support team is here to help with any specific concerns or custom requirements.</p>
      <Link to="/support/contact" className="contact-btn">Contact Our Support Team</Link>
    </div>
  </div>
);

// Main HelpAndSupport Component
const HelpAndSupport = () => {
  const [activeTab, setActiveTab] = useState('contact');

  useEffect(() => {
    const handleResize = () => {
      // Optional: Handle mobile responsiveness if needed in future
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { id: 'contact', icon: '🎧', label: 'Contact Us', component: ContactUs },
    { id: 'faq', icon: '❓', label: 'FAQ', component: FAQ },
    { id: 'help', icon: '🛟', label: 'Help & Support', component: HelpSupport },
  ];

  return (
    <div className="help-support-container">
      <div className="help-support-header">
        <div className="container">
          <nav aria-label="breadcrumb" className="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/" className="breadcrumb-link">Home</Link>
              </li>
              <li className="breadcrumb-item active">Help & Support</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="help-main-content">
        <div className="help-sidebar">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className={`sidebar-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <div className="sidebar-icon">{item.icon}</div>
              {item.label}
            </div>
          ))}
        </div>

        <div className="help-main">
          {menuItems.find(item => item.id === activeTab)?.component()}
        </div>
      </div>
    </div>
  );
};

export default HelpAndSupport;

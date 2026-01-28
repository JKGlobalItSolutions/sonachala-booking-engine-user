// EmailJS Configuration
// To use EmailJS, you need to:
// 1. Sign up at https://www.emailjs.com/
// 2. Create an email service and template
// 3. Replace the values below with your actual service ID, template ID, and public key

export const EMAILJS_CONFIG = {
  SERVICE_ID: 'your_service_id', // Replace with your EmailJS service ID
  TEMPLATE_ID: 'your_template_id', // Replace with your EmailJS template ID
  PUBLIC_KEY: 'your_public_key', // Replace with your EmailJS public key
};

// For booking requests, use a template with these variables:
// - from_name
// - from_email
// - phone
// - service_type (Flight Booking, Train Booking, etc.)
// - from_location
// - to_location
// - travel_date
// - return_date
// - passengers/class_type/other relevant details
// - special_requests
// - booking_time

import React from 'react';
import { Link } from 'react-router-dom';
import './ExplorePlaces.css';

const ExplorePlaces = () => {
  const touristPlaces = [
    {
      name: 'Arunachala Hill',
      description: 'The sacred mountain at the heart of Tiruvannamalai, considered by many to be Lord Shiva himself.',
      image: `${import.meta.env.BASE_URL}assets/img/tiruvannamalai.jpg`,
      category: 'Spiritual',
      features: ['Sacred Mountain', 'Girivalam Path', 'Sunrise Views']
    },
    {
      name: 'Sri Ramanashram',
      description: 'The ashram of the great sage Ramana Maharshi, a place of spiritual learning and meditation.',
      image: `${import.meta.env.BASE_URL}assets/img/ramana img.jpg`,
      category: 'Spiritual',
      features: ['Meditation Center', 'Peaceful Gardens', 'Spiritual Discourses']
    },
    {
      name: 'Spiritual Journey',
      description: 'Connect with ancient wisdom and inner peace through various spiritual practices and teachings.',
      image: `${import.meta.env.BASE_URL}assets/img/tiruvannamalai.jpg`,
      category: 'Experience',
      features: ['Ancient Wisdom', 'Inner Peace', 'Sacred Practices']
    },
    {
      name: 'Primal Beaches',
      description: 'Tranquil shores and coastal serenity along the Coromandel Coast near Tiruvannamalai.',
      image: `${import.meta.env.BASE_URL}assets/img/tiruvannamalai.jpg`,
      category: 'Nature',
      features: ['Tranquil Shores', 'Coastal Serenity', 'Natural Beauty']
    },
    {
      name: 'Panchamukha Temple',
      description: 'A unique temple dedicated to Lord Shiva with five faces, located near the Arunachala Hill.',
      image: `${import.meta.env.BASE_URL}assets/img/tiruvannamalai.jpg`,
      category: 'Temple',
      features: ['Five Faces of Shiva', 'Ancient Architecture', 'Sacred Worship']
    },
    {
      name: 'Skandasramam',
      description: 'A peaceful cave temple on Arunachala Hill associated with Lord Muruga and spiritual seekers.',
      image: `${import.meta.env.BASE_URL}assets/img/tiruvannamalai.jpg`,
      category: 'Temple',
      features: ['Cave Temple', 'Lord Muruga', 'Spiritual Retreat']
    }
  ];

  const getCategoryColor = (category) => {
    const colors = {
      Spiritual: '#e57200',
      Experience: '#6c5ce7',
      Nature: '#00b894',
      Temple: '#d63031'
    };
    return colors[category] || '#636e72';
  };

  return (
    <div className="explore-places-container">
      <div className="explore-header">
        <h1>Explore Tiruvannamalai</h1>
        <p className="header-subtitle">Discover the sacred lands, ancient temples, and natural beauty of Tiruvannamalai district</p>
      </div>

      <div className="places-grid">
        {touristPlaces.map((place, index) => (
          <div
            key={index}
            className="place-card"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className="place-image-container">
              <img
                src={place.image}
                alt={place.name}
                className="place-image"
              />
              <div className="place-category" style={{ backgroundColor: getCategoryColor(place.category) }}>
                {place.category}
              </div>
            </div>

            <div className="place-content">
              <h3 className="place-title">{place.name}</h3>
              <p className="place-description">{place.description}</p>

              <div className="place-features">
                {place.features.map((feature, featureIndex) => (
                  <span key={featureIndex} className="feature-tag">
                    {feature}
                  </span>
                ))}
              </div>

              <div className="place-actions">
                <Link to="/hotels" className="btn-secondary">
                  Find Hotels Nearby
                </Link>
                <Link to="/Homestays" className="btn-primary">
                  Book Homestay
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="explore-footer">
        <div className="footer-content">
          <h3>Ready to Plan Your Journey?</h3>
          <p>Book your transportation, accommodation, and create unforgettable memories in Tiruvannamalai.</p>
          <div className="footer-actions">
            <Link to="/hotels" className="btn-primary">
              Book Hotels
            </Link>
            <Link to="/trains" className="btn-secondary">
              Book Train
            </Link>
            <Link to="/buses" className="btn-secondary">
              Book Bus
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePlaces;

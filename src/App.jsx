import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import './App.css';

// Initialize EmailJS with your Public Key
emailjs.init('oGzr3OBjpPBEt2Hvp');

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState('');

  // Gallery Images
  const galleryImages = [
    '/gallery1.jpg',
    '/gallery2.jpg',
    '/gallery3.jpg',
    '/gallery4.jpg',
    '/gallery5.jpg'
  ];

  // Services Data
  const servicesData = [
    { 
      img: "/gallery1.jpg", 
      category: "SKIN SERVICES", 
      title: "Threading", 
      desc: "Experience the precision of beauty with our expert Threading service." 
    },
    { 
      img: "/gallery2.jpg", 
      category: "SKIN SERVICES", 
      title: "Special Treatments", 
      desc: "Enjoy our Special Treatments that are available to you only..." 
    },
    { 
      img: "/gallery3.jpg", 
      category: "SKIN SERVICES", 
      title: "Skin Rejuvenating Face Masques", 
      desc: "Our Face Rejuvenating Masques will make your face glow beautifully." 
    }
  ];

  // Email Handler
  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    
    try {
      await emailjs.send(
        'service_tqi5ucb',
        'template_l5bxlrd',
        {
          customer_name: name,
          customer_email: email,
          salon_name: "Salon",
          salon_phone: "+91 98765 43210",
          salon_address: "Shop No. 5, Sai Plaza, Vasai East"
        },
        'oGzr3OBjpPBEt2Hvp'
      );
      
      setSendStatus('success');
      setName('');
      setEmail('');
    } catch (error) {
      console.error("Email error:", error);
      setSendStatus('error');
    } finally {
      setIsSending(false);
    }
  };

  // Gallery Navigation
  const handlePrev = () => setGalleryIndex(prev => prev === 0 ? galleryImages.length - 1 : prev - 1);
  const handleNext = () => setGalleryIndex(prev => prev === galleryImages.length - 1 ? 0 : prev + 1);

  // Tab Content Renderer
  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
            <div className="profile-section">
              <img src="/scissor.jpg" alt="Salon Logo" />
              <h2>Where Magic Happens ✨</h2>
              <p>Welcome to Akshay Salon</p>
            </div>

            <div className="link-buttons">
              <a href="https://wa.me/message/VHVQ37JUSL5AM1" className="link-card" target="_blank" rel="noreferrer">
                <img src="/wat.png" alt="WhatsApp" />
                WhatsApp for instant booking
              </a>

              <a href="https://www.instagram.com/virat.kohli/?hl=en" className="link-card" target="_blank" rel="noreferrer">
                <img src="/insta.jpg" alt="Instagram" />
                See our work on Instagram
              </a>

              <a href="https://maps.app.goo.gl/yY69Vc1CbnoH7wCx5" className="link-card" target="_blank" rel="noreferrer">
                <img src="/map.png" alt="Location" />
                Salon Location
              </a>
            </div>

            <div className="appointment-form">
              <h3>📅 Book Appointment</h3>
              {sendStatus === 'success' ? (
                <div className="success-message">
                  ✅ Confirmation sent! Check your email.
                </div>
              ) : sendStatus === 'error' ? (
                <div className="error-message">
                  ❌ Failed to send. Please WhatsApp us directly.
                </div>
              ) : (
                <form onSubmit={handleAppointmentSubmit}>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" disabled={isSending}>
                    {isSending ? 'Sending...' : 'Book Now'}
                  </button>
                </form>
              )}
            </div>
          </>
        );

      case 'services':
        return (
          <div className="services-tab">
            <h3>Our Premium Services</h3>
            <div className="services-grid">
              {servicesData.map((service, index) => (
                <div className="service-card" key={index}>
                  <img src={service.img} alt={service.title} loading="lazy" />
                  <span className="badge">{service.category}</span>
                  <h4>{service.title}</h4>
                  <p>{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'gallery':
        return (
          <div className="gallery-tab">
            <h3>Our Work Gallery</h3>
            <div className="gallery-viewer">
              <button onClick={handlePrev} className="nav-btn" aria-label="Previous">⟨</button>
              <img 
                src={galleryImages[galleryIndex]} 
                alt={`Salon Work ${galleryIndex + 1}`} 
                className="gallery-image" 
                loading="lazy"
              />
              <button onClick={handleNext} className="nav-btn" aria-label="Next">⟩</button>
            </div>
            <p>Image {galleryIndex + 1} of {galleryImages.length}</p>
          </div>
        );

      case 'contact':
        return (
          <div className="contact-tab">
            <h3>Reach Out to Us</h3>
            <div className="contact-cards">
              <div className="contact-card">
                <img src="/map.png" alt="Map" />
                <h4>Location</h4>
                <p>Shop No. 5, ABC Plaza<br />Vasai East, Mumbai</p>
                <a href="https://maps.app.goo.gl/yY69Vc1CbnoH7wCx5" target="_blank" rel="noreferrer">
                  View on Google Maps
                </a>
              </div>
              
              <div className="contact-card">
                <img src="/wat.png" alt="Phone" />
                <h4>Call/WhatsApp</h4>
                <p>+91 9802342342323 <br />10AM - 8PM Daily</p>
                <a href="https://wa.me/message/VHVQ37JUSL5AM1" target="_blank" rel="noreferrer">
                  Message Now
                </a>
              </div>
            </div>
          </div>
        );

      case 'about':
        return (
          <div className="about-tab">
            <h3>About ABC Salon</h3>
            <div className="about-content">
              <img src="/gallery4.jpg" alt="Salon Interior" />
              <div className="about-text">
                <p>Founded in 2015, we specialize in premium beauty services with hygiene as our top priority.</p>
                <ul>
                  <li>✓ Certified Professionals</li>
                  <li>✓ Sterilized Tools</li>
                  <li>✓ Luxury Products</li>
                </ul>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="app">
      <div className="tabs">
        {['home', 'services', 'gallery', 'contact', 'about'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={activeTab === tab ? 'active' : ''}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {renderTabContent()}
      </div>
    </div>
  );
}

export default App;
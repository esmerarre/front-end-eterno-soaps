import "./ContactUs.css";

export default function ContactUs() {
  return (
    <section id="contact" className="contact-us">
      <div className="contact-container">
        <h2 className="contact-title">Contact Us</h2>

        <form className="contact-form">
          <input
            type="text"
            placeholder="Your Name"
            className="contact-input"
          />

          <input
            type="email"
            placeholder="Your Email"
            className="contact-input"
          />

          <textarea
            placeholder="Your Message"
            className="contact-textarea"
          />

          <button className="contact-button">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}


// import { useState } from 'react';
// import './ContactUs.css';

// export default function ContactUs() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: ''
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Handle form submission here
//     console.log('Form submitted:', formData);
//     alert('Thank you for your message! We will get back to you soon.');
//     setFormData({ name: '', email: '', message: '' });
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   return (
//     <section id="contact" className="contact-us">
//       <div className="contact-container">
//         <div className="contact-header">
//           <h2 className="contact-title">Get in Touch</h2>
//           <p className="contact-subtitle">
//             We'd love to hear from you! Send us a message and we'll respond as soon as possible.
//           </p>
//         </div>

//         <div className="contact-content">
//           <div className="contact-info">
//             <div className="info-item">
//               <div className="info-icon">📧</div>
//               <div>
//                 <h3>Email</h3>
//                 <p>lucy@jaboneterno.com</p>
//                 <p>info@jaboneterno.com</p>
//               </div>
//             </div>

//             <div className="info-item">
//               <div className="info-icon">📱</div>
//               <div>
//                 <h3>Phone</h3>
//                 <p>+1 (555) 123-4567</p>
//                 <p>Mon-Fri: 9am - 6pm</p>
//               </div>
//             </div>

//             <div className="info-item">
//               <div className="info-icon">📍</div>
//               <div>
//                 <h3>Location</h3>
//                 <p>123 Artisan Way</p>
//                 <p>Portland, OR 97201</p>
//               </div>
//             </div>

//             <div className="social-links">
//               <h3>Follow Us</h3>
//               <div className="social-icons">
//                 <a href="#" className="social-icon">📘</a>
//                 <a href="#" className="social-icon">📷</a>
//                 <a href="#" className="social-icon">🐦</a>
//               </div>
//             </div>
//           </div>

//           <form className="contact-form" onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label htmlFor="name">Name</label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//                 placeholder="Your name"
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="email">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 placeholder="your@email.com"
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="message">Message</label>
//               <textarea
//                 id="message"
//                 name="message"
//                 value={formData.message}
//                 onChange={handleChange}
//                 required
//                 rows={6}
//                 placeholder="Tell us how we can help you..."
//               ></textarea>
//             </div>

//             <button type="submit" className="btn-submit">Send Message</button>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// }

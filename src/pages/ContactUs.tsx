import "./ContactUs.css";
import ContactUsForm from './ContactUsForm';

const ContactUs = () => {
    return (
      <section className="contact-us">
        <div className="contact-container">
            <div className="contact-header">
            <h2 className="contact-title">Get in Touch</h2>
            <p className="contact-subtitle">
              We'd love to hear from you! Send us a message and we'll respond as soon as possible.
              </p>
          </div>
        <div className="contact-content">
          {/* LEFT COLUMN */}
          <div className="contact-info">
            <div className="info-item">
              <div className="info-icon">📧</div>
              <div>
                <h3>Email</h3>
                <p>eternosoaps@gmail.com</p>
                {/* <p>info@jaboneterno.com</p> */}
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">📱</div>
              <div>
                <h3>Phone</h3>
                <p>+1 (505) 835-3880</p>
                <p>Mon-Fri: 9am - 6pm</p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">📍</div>
              <div>
                <h3>Location</h3>
                <p>Gallup, NM</p>
              </div>
            </div>
            </div>
            {/* RIGHT COLUMN */}
              <ContactUsForm/>
          </div>
        </div>
      </section>
    );
  };
export default ContactUs;
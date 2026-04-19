import "./ContactUs.css";
// Contact form temporarily disabled due to email delivery issues

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
            {/* RIGHT COLUMN (temporarily hidden) */}
              <div className="contact-closed">
                <p>
                  <h2>Thank You for Your Interest in Eterno Soaps</h2>

Thank you so much for visiting Eterno Soaps and for your incredible support.

Recently, our small family-run business received an unexpected wave of interest following a spontaneous feature in a YouTube creator’s video. While we are truly grateful for the excitement, we were not fully prepared for the level of demand that followed.

We are currently working behind the scenes to prepare inventory and ensure everything meets the quality standards we want to deliver before opening orders more widely.

We will continue to post updates as things come together. In the meantime, <h4>if you would like to be notified as soon as products become available, please feel free to contact us directly at <a href="mailto:eternosoaps@gmail.com">eternosoaps@gmail.com</a> — we would be happy to add you to our notification list.</h4>

Thank you again for your patience, kindness, and support of our small business. We’re excited to share Eterno Soaps with you soon.

Warm regards,
Eterno Soaps .
                </p>
              </div>
          </div>
        </div>
      </section>
    );
  };
export default ContactUs;
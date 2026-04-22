import "./ContactUs.css";
import React from "react";

// Contact form temporarily disabled due to email delivery issues

const ContactUs: React.FC = () => {
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

          {/* RIGHT COLUMN: policy text (replacing previous message) */}
          <div className="contact-closed">
            <h2>Store Policy</h2>
            <h3>All sales are final</h3>
            <p>
              We do not offer refunds, exchanges, or returns on any orders once they have been
              placed and payment has been processed. This applies to all soap and products in our
              store.
            </p>
            <h3>Order cancellations</h3>
            <p>
              Orders cannot be cancelled once they have been placed. Since many of our products are
              made to order, production may begin immediately after purchase. Please review your
              cart carefully before completing checkout.
            </p>
            <h3>Production time</h3>
            <p>
              Because each bar of soap is handcrafted in small batches, please allow 1 to 2 weeks
              for your order to be made. Production times may vary slightly depending on order
              volume and product type. We appreciate your patience and want to ensure every product
              meets our quality standards before it ships. Once your order has been completed and
              shipped, you will receive a shipping confirmation email.
            </p>
            <h3>Skin irritation disclaimer</h3>
            <p>
              All of our soaps are crafted with care using quality ingredients; 
              however, every individual's skin is unique and may respond differently to the same product. 
              Some customers may tolerate a formula very well, while others may experience sensitivity 
              or irritation. We are not responsible for any skin reactions that may occur as a result 
              of using our products. We encourage you to review the key ingredients listed on each product page prior to purchasing, 
              especially if you have known sensitivities.
            </p>
            <h3>Contact Us </h3>
            <p>
              If you have any questions about our products, ingredients, or policies, please don't hesitate to reach out. 
              We are here to help and want to ensure you have a positive experience with Eterno Soaps.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
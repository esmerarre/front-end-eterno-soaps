import "./ContactUsForm.css";
import { useState } from "react";

type FormData = {
  name: string;
  email: string;
  message: string;
};

const ContactUsForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/contact/", { // ✅ match FastAPI route
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      alert("Message sent!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-container">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Your name"
        />
      </div>

      <div className="form-container">
        <label htmlFor="email">Email</label>
        <input
          type="email" 
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="your@email.com"
        />
      </div>

      <div className="form-container">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message} 
          onChange={handleChange}
          placeholder="Tell us how we can help you..."
          rows={6}
          required
        ></textarea>
      </div>

      <button type="submit" className="btn-submit">Send Message</button>
    </form>
  );
};

export default ContactUsForm;



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
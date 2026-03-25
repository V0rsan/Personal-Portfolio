

import React, { useState } from 'react';
import './styles/Contact.css';
import { ArrowRPG } from "./ui/arrow-rpg";

export const ContactSection = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    how: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would handle sending the form data
  };

  return (
    <section className="contact-section rpg-contact-bg">
      <div className="rpg-contact-card">
        <div className="rpg-contact-header">
          <span className="rpg-contact-badge">QUEST BOARD</span>
          <h2 className="rpg-contact-title">
            <span className="rpg-contact-title-main">Begin Your Quest</span>
            <span className="rpg-contact-title-sub">Send a magical message</span>
          </h2>
        </div>
        <form className="rpg-contact-form" onSubmit={handleSubmit} autoComplete="off">
          <div className="rpg-contact-row">
            <input name="name" placeholder="Adventurer Name" value={form.name} onChange={handleChange} required className="rpg-input" />
            <input name="email" placeholder="Magic Scroll (Email)" value={form.email} onChange={handleChange} required type="email" className="rpg-input" />
          </div>
          <div className="rpg-contact-row">
            <select name="how" value={form.how} onChange={handleChange} required className="rpg-input">
              <option value="">How did you find this realm?</option>
              <option value="google">Google</option>
              <option value="linkedin">LinkedIn</option>
              <option value="referral">Referral</option>
              <option value="other">Other</option>
            </select>
            <input name="phone" placeholder="Crystal Number (Phone)" value={form.phone} onChange={handleChange} className="rpg-input" />
          </div>
          <textarea name="message" placeholder="Describe your quest..." value={form.message} onChange={handleChange} required className="rpg-input rpg-textarea" />
          <button type="submit" className="rpg-btn-main">
            <span className="rpg-btn-text">{submitted ? 'Message Sent!' : 'Send Message'}</span>
            <ArrowRPG className="rpg-arrow" />
            <span className="rpg-btn-glow" />
          </button>
        </form>
      </div>
    </section>
  );
};

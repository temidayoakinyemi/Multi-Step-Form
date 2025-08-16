import React, { useState } from "react";
import "./Personal.css";

const Personal = ({ setCurrentPage }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.id]: true });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "This field is required";
    if (!formData.email.trim()) {
      newErrors.email = "This field is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!formData.phone.trim()) newErrors.phone = "This field is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setCurrentPage("plan");
    }
  };

  return (
    <div className="personal">
      <h1 className="personalh1">Personal info</h1>
      <p className="personalp">
        Please provide your name, email address, and phone number.
      </p>

      <form onSubmit={handleSubmit}>
        <div className={`form-group ${errors.name ? "error-state" : ""}`}>
          <div className="label-row">
            <label htmlFor="name">Name</label>
            {errors.name && <span className="error-msg">{errors.name}</span>}
          </div>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g. Stephen King"
          />
        </div>

        <div className={`form-group ${errors.email ? "error-state" : ""}`}>
          <div className="label-row">
            <label htmlFor="email">Email Address</label>
            {errors.email && <span className="error-msg">{errors.email}</span>}
          </div>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g. stephenking@lorem.com"
          />
        </div>

        <div className={`form-group ${errors.phone ? "error-state" : ""}`}>
          <div className="label-row">
            <label htmlFor="phone">Phone Number</label>
            {errors.phone && <span className="error-msg">{errors.phone}</span>}
          </div>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g. +1 234 567 890"
          />
        </div>

        <button type="submit" className="next-step-btn">
          Next Step
        </button>
      </form>
    </div>
  );
};

export default Personal;

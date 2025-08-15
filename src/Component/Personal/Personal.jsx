import React, { useState } from "react";
import "./Personal.css";
import SelectPlan from "../SelectPlan/SelectPlan"; 

const Personal = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [showSelectPlan, setShowSelectPlan] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setShowSelectPlan(true);
    }
  };

  if (showSelectPlan) {
    return <SelectPlan />;
  }

  return (
    <div className="personal">
      <h1 className="personalh1">Personal info</h1>
      <p className="personalp">
        Please provide your name, email address, and phone number.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Stephen King"
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. stephenking@lorem.com"
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="form-row">
          <div className="form-group phone-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. +1 234 567 890"
            />
            {errors.phone && <p className="error">{errors.phone}</p>}
          </div>
        </div>

        <button type="submit" className="next-step-btn" >
          Next Step
        </button>
      </form>
    </div>
  );
};

export default Personal;

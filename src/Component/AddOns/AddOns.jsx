import React, { useState } from "react";
import "./AddOns.css";

const AddOns = ({
  billing,
  selectedAddOns,
  setSelectedAddOns,
  setCurrentPage,
}) => {
  const [error, setError] = useState("");

  const addOns = [
    {
      id: "online",
      title: "Online service",
      desc: "Access to multiplayer games",
      price: { monthly: 1, yearly: 10 },
    },
    {
      id: "storage",
      title: "Larger storage",
      desc: "Extra 1TB of cloud save",
      price: { monthly: 2, yearly: 20 },
    },
    {
      id: "profile",
      title: "Customizable profile",
      desc: "Custom theme on your profile",
      price: { monthly: 2, yearly: 20 },
    },
  ];

  const toggle = (id) => {
    const isSelected = selectedAddOns.some((a) => a.id === id);
    if (isSelected) {
      setSelectedAddOns(selectedAddOns.filter((a) => a.id !== id));
    } else {
      const addOn = addOns.find((a) => a.id === id);
      setSelectedAddOns([...selectedAddOns, addOn]);
    }
  };

  const handleNext = () => {
    if (selectedAddOns.length === 0) {
      setError("Choose at least one");
    } else {
      setError("");
      setCurrentPage("summary");
    }
  };

  const handleBack = () => {
    setCurrentPage("plan");
  };

  const suffix = billing === "monthly" ? "/mo" : "/yr";

  return (
    <div className="addons">
      <h1 className="ao-title">Pick add-ons</h1>
      <p className="ao-sub">Add-ons help enhance your gaming experience.</p>

      <div className="ao-list">
        {addOns.map((a) => (
          <label
            key={a.id}
            className={`ao-item ${
              selectedAddOns.some((sel) => sel.id === a.id) ? "checked" : ""
            }`}
          >
            <input
              type="checkbox"
              checked={selectedAddOns.some((sel) => sel.id === a.id)}
              onChange={() => toggle(a.id)}
            />
            <span className="ao-checkbox" />
            <div className="ao-text">
              <span className="ao-title-sm">{a.title}</span>
              <span className="ao-desc">{a.desc}</span>
            </div>
            <span className="ao-price">{`+$${a.price[billing]}${suffix}`}</span>
          </label>
        ))}
      </div>

      {error && <p className="error">{error}</p>}

      <div className="ao-footer">
        <button type="button" className="ao-back" onClick={handleBack}>
          Go Back
        </button>
        <button type="button" className="ao-next" onClick={handleNext}>
          Next Step
        </button>
      </div>
    </div>
  );
};

export default AddOns;

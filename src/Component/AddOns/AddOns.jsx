import React, { useState } from "react";
import "./AddOns.css";
import SelectPlan from "../SelectPlan/SelectPlan";
import Summary from "../Summary/Summary";

const AddOns = ({ billing = "monthly", selectedPlan }) => {
  const [selected, setSelected] = useState(new Set());
  const [error, setError] = useState("");
  const [showSelectPlan, setShowSelectPlan] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

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
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleNext = () => {
    if (selected.size === 0) {
      setError("Choose at least one");
    } else {
      setError("");
      setShowSummary(true);
    }
  };

  const handleBack = () => {
    setShowSelectPlan(true);
  };

  const suffix = billing === "monthly" ? "/mo" : "/yr";

  if (showSelectPlan) return <SelectPlan />;
  if (showSummary)
    return (
      <Summary
        billing={billing}
        selectedPlan={selectedPlan}
        selectedAddOns={Array.from(selected).map((id) =>
          addOns.find((a) => a.id === id)
        )}
        goBackToAddOns={() => setShowSummary(false)}
        goBackToSelectPlan={() => setShowSelectPlan(false)}
      />
    );

  return (
    <div className="addons">
      <h1 className="ao-title">Pick add-ons</h1>
      <p className="ao-sub">Add-ons help enhance your gaming experience.</p>

      <div className="ao-list">
        {addOns.map((a) => (
          <label
            key={a.id}
            className={`ao-item ${selected.has(a.id) ? "checked" : ""}`}
          >
            <input
              type="checkbox"
              checked={selected.has(a.id)}
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

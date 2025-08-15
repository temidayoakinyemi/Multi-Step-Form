import React, { useState } from "react";
import "./SelectPlan.css";
import arcade from "../../assets/arcade.png";
import advance from "../../assets/advance.png";
import pro from "../../assets/pro.png";
import AddOns from "../AddOns/AddOns";
import Personal from "../Personal/Personal";

const SelectPlan = () => {
  const [billing, setBilling] = useState("monthly");
  const [active, setActive] = useState(null);
  const [error, setError] = useState("");
  const [showAddOns, setShowAddOns] = useState(false);
  const [showPersonal, setShowPersonal] = useState(false);
  const [selectedPlanDetails, setSelectedPlanDetails] = useState(null);

  const plans = [
    { name: "Arcade", monthly: 9, yearly: 90, icon: arcade, color: "orange" },
    {
      name: "Advanced",
      monthly: 12,
      yearly: 120,
      icon: advance,
      color: "pink",
    },
    { name: "Pro", monthly: 15, yearly: 150, icon: pro, color: "purple" },
  ];

  const handleNext = () => {
    if (active === null) {
      setError("Please select a plan before continuing.");
    } else {
      setError("");
      const plan = plans[active];
      setSelectedPlanDetails({
        name: plan.name,
        type: billing,
        price: billing === "monthly" ? plan.monthly : plan.yearly,
      });
      setShowAddOns(true);
    }
  };

  const handleBack = () => {
    setShowPersonal(true);
  };

  if (showAddOns)
    return <AddOns billing={billing} selectedPlan={selectedPlanDetails} />;
  if (showPersonal) return <Personal />;

  return (
    <div className="selectplan">
      <h1 className="sp-title">Select your plan</h1>
      <p className="sp-sub">
        You have the option of monthly or yearly billing.
      </p>

      <div className="sp-grid">
        {plans.map((p, i) => {
          const price =
            billing === "monthly" ? `$${p.monthly}/mo` : `$${p.yearly}/yr`;
          return (
            <button
              type="button"
              key={p.name}
              className={`sp-card ${active === i ? "active" : ""}`}
              onClick={() => setActive(i)}
            >
              <div
                className="sp-icon-circle"
                style={{ backgroundColor: p.color }}
              >
                <img src={p.icon} alt={p.name} className="sp-img" />
              </div>
              <div className="sp-card-body">
                <div className="sp-plan-name">{p.name}</div>
                <div className="sp-price">{price}</div>
                {billing === "yearly" && (
                  <div className="sp-free">2 months free</div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {error && <p className="error">{error}</p>}

      <div className="sp-toggle-container">
        <div className="sp-toggle-row">
          <span className={`sp-cycle ${billing === "monthly" ? "on" : ""}`}>
            Monthly
          </span>
          <label className="sp-switch">
            <input
              type="checkbox"
              checked={billing === "yearly"}
              onChange={(e) =>
                setBilling(e.target.checked ? "yearly" : "monthly")
              }
            />
            <span className="sp-slider" />
          </label>
          <span className={`sp-cycle ${billing === "yearly" ? "on" : ""}`}>
            Yearly
          </span>
        </div>
      </div>

      <div className="sp-footer">
        <button type="button" className="sp-back" onClick={handleBack}>
          Go Back
        </button>
        <button type="button" className="sp-next" onClick={handleNext}>
          Next Step
        </button>
      </div>
    </div>
  );
};

export default SelectPlan;

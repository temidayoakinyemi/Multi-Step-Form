import React, { useState } from "react";
import "./Summary.css";
import Check from "../../assets/Check.png";

const Summary = ({
  billing = "monthly",
  selectedPlan = null,
  selectedAddOns = [],
  goBackToAddOns,
  goBackToSelectPlan,
}) => {
  const [showThankYou, setShowThankYou] = useState(false);

  if (!selectedPlan) return null;

  const suffix = billing === "monthly" ? "/mo" : "/yr";
  const totalAddOns = selectedAddOns.reduce(
    (acc, item) => acc + item.price[billing],
    0
  );
  const totalPrice = selectedPlan.price + totalAddOns;

  if (showThankYou) {
    return (
      <div className="summary1">
        <img src={Check} alt="" className="check" />
        <h1 className="checkh1">Thank you!</h1>
        <p className="checkp">
          Thanks for confirming your subscription! We hope you have <br /> fun using
          our platform. If you ever need support, please feel <br /> free to email us
          at support@loremgaming.com.
        </p>
      </div>
    );
  }

  return (
    <div className="summary">
      <h1 className="summary-title">Finishing up</h1>
      <p className="summaryp">
        Double-check everything looks OK before confirming.
      </p>

      <div className="summarydiv">
        <div className="plan-section">
          <div className="plan-actions">
            <h2 className="plan-name no-break">
              {`${selectedPlan.name} (${
                billing === "monthly" ? "Monthly" : "Yearly"
              })`}
            </h2>
            <a className="change" onClick={goBackToSelectPlan} href="">
              Change
            </a>
          </div>
          <div className="plan-price1">
            ${selectedPlan.price}
            {suffix}
          </div>
        </div>

        {selectedAddOns.length > 0 && <div className="summary-line" />}
        {selectedAddOns.map((a) => (
          <div key={a.id} className="addon-item">
            <span>{a.title}</span>
            <span>
              +${a.price[billing]}
              {suffix}
            </span>
          </div>
        ))}
      </div>

      <div className="plan-price-summarytotal">
        <p className="summarytotal">
          Total (per {billing === "monthly" ? "month" : "year"})
        </p>
        <p className="plan-price">
          +${totalPrice}
          {suffix}
        </p>
      </div>

      <div className="s-footer">
        <button type="button" className="s-back" onClick={goBackToAddOns}>
          Go Back
        </button>
        <button
          type="button"
          className="s-next"
          onClick={() => setShowThankYou(true)}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Summary;

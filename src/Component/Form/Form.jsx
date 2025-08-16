import React from "react";
import "./Form.css";

const Form = ({ currentPage, setCurrentPage }) => {
  const steps = [
    { page: "personal", number: 1, title: "YOUR INFO" },
    { page: "plan", number: 2, title: "SELECT PLAN" },
    { page: "addons", number: 3, title: "ADD-ONS" },
    { page: "summary", number: 4, title: "SUMMARY" },
  ];

  return (
    <div className="form">
      <div className="form-navbar">
        <div className="all">
          {steps.map((step) => (
            <div key={step.page} className="navbarppdiv">
              <div
                className={`navbar1 ${
                  currentPage === step.page ? "active" : ""
                }`}
                onClick={() => setCurrentPage(step.page)}
              >
                <p className="navbarspan">{step.number}</p>
              </div>
              <div className="navbar1pp1">
                <p className="navbar1p2">{`STEP ${step.number}`}</p>
                <p className="navbar1p3">{step.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Form;

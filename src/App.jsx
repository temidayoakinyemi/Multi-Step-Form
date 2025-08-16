import React, { useState } from "react";
import Form from "./Component/Form/Form";
import Personal from "./Component/Personal/Personal";
import SelectPlan from "./Component/SelectPlan/SelectPlan";
import AddOns from "./Component/AddOns/AddOns";
import Summary from "./Component/Summary/Summary";
import "./App.css";

const App = () => {
  const [currentPage, setCurrentPage] = useState("personal");
  const [billing, setBilling] = useState("monthly");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedAddOns, setSelectedAddOns] = useState([]);

  const renderPage = () => {
    switch (currentPage) {
      case "personal":
        return <Personal setCurrentPage={setCurrentPage} />;
      case "plan":
        return (
          <SelectPlan
            setCurrentPage={setCurrentPage}
            billing={billing}
            setBilling={setBilling}
            setSelectedPlan={setSelectedPlan}
          />
        );
      case "addons":
        return (
          <AddOns
            billing={billing}
            setCurrentPage={setCurrentPage}
            selectedAddOns={selectedAddOns}
            setSelectedAddOns={setSelectedAddOns}
          />
        );
      case "summary":
        return (
          <Summary
            billing={billing}
            selectedPlan={selectedPlan}
            selectedAddOns={selectedAddOns}
            goBackToAddOns={() => setCurrentPage("addons")}
            goBackToSelectPlan={() => setCurrentPage("plan")}
          />
        );

      default:
        return <Personal setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="page-wrapper">
      <div className="app-container">
        <div className="app-sidebar">
          <Form currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
        <div className="app-content">{renderPage()}</div>
      </div>
    </div>
  );
};

export default App;

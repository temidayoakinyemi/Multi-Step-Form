import React, { useState } from "react";
import Form from "./Component/Form/Form";
import Personal from "./Component/Personal/Personal";
import SelectPlan from "./Component/SelectPlan/SelectPlan";
import AddOns from "./Component/AddOns/AddOns";
import Summary from "./Component/Summary/Summary";
import "./App.css";

const App = () => {
  const [currentPage, setCurrentPage] = useState("personal");

  const renderPage = () => {
    switch (currentPage) {
      case "personal":
        return <Personal setCurrentPage={setCurrentPage} />;
      case "plan":
        return <SelectPlan setCurrentPage={setCurrentPage} />;
      case "addons":
        return <AddOns setCurrentPage={setCurrentPage} />;
      case "summary":
        return <Summary setCurrentPage={setCurrentPage} />;
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

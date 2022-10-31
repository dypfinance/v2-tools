import React, { useState } from "react";
import "./dashboard.css";
import TopPoolsCard from "../top-pools-card/TopPoolsCard";
import NewsCard from "../newsCard/NewsCard";

const Dashboard = () => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="container-lg dashboardwrapper">
      <TopPoolsCard
        top_pick={true}
        tokenName="DYP"
        apr={"1.09%"}
        tvl={"$48,382.30"}
        lockTime={"No lock"}
        onDetailsClick={() => {
          setShowDetails(!showDetails);
        }}
        showDetails={showDetails}
      />
    </div>
  );
};

export default Dashboard;

import React, { useState } from "react";
import "./dashboard.css";
import TopPoolsCard from "../top-pools-card/TopPoolsCard";
import NewsCard from "../newsCard/NewsCard";
import GovCard from "../gov-card/GovCard";
import BridgeCard from "../bridgecard/BridgeCard";
import ExplorerCard from "../explorer-card/ExplorerCard";
import Calculator from "../calculator/Calculator";
import FaqCard from "../faqcard/FaqCard";
import LaunchpadCard from "../launchpad-card/LaunchpadCard";
import rightarrow from "./assets/right-arrow.svg";

const Dashboard = () => {
  const cards = [
    {
      top_pick: true,
      tokenName: "DYP",
      apr: "1.09%",
      tvl: "$48,382.30",
      lockTime: "No lock",
    },
    {
      top_pick: true,
      tokenName: "DYP",
      apr: "1.09%",
      tvl: "$48,382.30",
      lockTime: "No lock",
    },
  ];

  return (
    <div className="container-lg dashboardwrapper">
      <div className="row m-0 justify-content-between gap-2">
        <div className="w-50">
      <Calculator />

        </div>
        <div className="d-flex flex-column gap-3 " style={{width: '49%'}}>
          <ExplorerCard />
          <div className="d-flex justify-content-between gap-3">
          <GovCard />
          <BridgeCard /></div>
        </div>
      </div>
      <div className="row m-0 align-items-center justify-content-between gap-2 w-100 pb-4">
        <h6 className="top-pools-title">Top Pools</h6>
        <h6 className="view-more-title">
          View all <img src={rightarrow} alt="" />{" "}
        </h6>
      </div>
      <div className="row m-0 gap-2">
        {cards.length > 0 &&
          cards.map((item, index) => {
            return (
              <TopPoolsCard
                cardId={item.tokenName}
                key={index}
                top_pick={item.top_pick}
                tokenName={item.tokenName}
                apr={item.apr}
                tvl={item.tvl}
                lockTime={item.lockTime}
              />
            );
          })}
      </div>

      <div className="row m-0 align-items-center justify-content-between gap-2 w-100 pb-4 pt-4">
        <h6 className="top-pools-title">News</h6>
        <h6 className="view-more-title">
          View all <img src={rightarrow} alt="" />{" "}
        </h6>
      </div>
      <FaqCard/>
      <LaunchpadCard/>
      <NewsCard />
      <NewsCard />
      <NewsCard />
    </div>
  );
};

export default Dashboard;

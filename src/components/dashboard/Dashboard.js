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
import ChainlinkCard from "../chainlink-card/ChainlinkCard";
import TrendingNews from "../newsCard/TrendingNews";
import rightarrow from "./assets/right-arrow.svg";
import TopPoolsDetails from "../top-pools-card/TopPoolsDetails";
import initStakingNew from "../FARMINNG/staking-new-front";
import { NavLink } from "react-router-dom";

 const Dashboard = ({ isConnected, coinbase, the_graph_result, lp_id, network, handleConnection  }) => {
  const cards = [
    {
      top_pick: true,
      tokenName: "DYP",
      apr: "1.09%",
      tvl: "$48,382.30",
      lockTime: "No lock",
      
      tokenLogo: 'dyplogo.svg',
    },
    {
      top_pick: false,
      tokenName: "DYP",
      apr: "1.09%",
      tvl: "$48,382.30",
      lockTime: "No lock",
      tokenLogo: 'dyplogo.svg',
    },
  ];

  const [activeCard, setActiveCard] = useState();
  const [cardIndex, setcardIndex] = useState();

  const eth_address = "ETH";
  const { rebase_factors } = window;

  const stakeArray = [
    window.farming_new_1,
    window.farming_new_2,
    window.farming_new_3,
    window.farming_new_4,
    window.farming_new_5,
  ];
  const constantArray = [
    window.constant_staking_new5,
    window.constant_staking_new6,
    window.constant_staking_new7,
    window.constant_staking_new8,
    window.constant_staking_new9,
  ];
  const feeArray = [0.3, 0.3, 0.4, 0.8, 1.2];

  const StakingNew1 = initStakingNew({
    token: window.token_new,
    // staking: window.farming_new_1,
    staking: stakeArray[cardIndex],
    chainId: network,
    coinbase: coinbase,
    constant: constantArray[cardIndex],
    liquidity: eth_address,
    lp_symbol: "USD",
    reward: "30,000",
    lock: "3 Days",
    rebase_factor: rebase_factors[0],
    expiration_time: "14 December 2022",
    fee: feeArray[cardIndex],
    handleConnection: handleConnection
  });
  
  return (
    <div className="container-lg dashboardwrapper px-0">
      <div className="d-flex m-0 justify-content-between gap-3">
        <div className="d-flex flex-column gap-3 justify-content-between main-dashboard-container p-4">
          <div className="d-flex m-0 gap-3 justify-content-between">
            <Calculator />
            <div
              className="d-flex flex-column gap-3 justify-content-between"
              style={{ width: "49%" }}
            >
              <ExplorerCard />
              <div className="d-flex justify-content-between gap-3">
                <GovCard />
                <BridgeCard />
              </div>
            </div>
          </div>
          <div>
            <div className="row m-0 align-items-center justify-content-between gap-2 w-100 pb-4">
              <h6 className="top-pools-title">Top Pools</h6>
              <h6 className="view-more-title">
                View all <img src={rightarrow} alt="" />{" "}

              </h6>
            </div>
            <div>
              <div className="row m-0 gap-2 toppool-allwrapper">
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
                        tokenLogo={item.tokenLogo}
                        onShowDetailsClick={() => {
                          setActiveCard(cards[index]);
                          setcardIndex(index);
                        }}
                        onHideDetailsClick={() => {
                          setActiveCard(null);
                        }}
                      />
                    );
                  })}
              </div>
              {activeCard && (
                <StakingNew1
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  lp_id={lp_id[cardIndex]}
                  chainId={network}
                  handleConnection = {handleConnection}
                />
              )}
              {/* {showDetails && <TopPoolsDetails />} */}

            </div>
          </div>
          <div className="row m-0 align-items-center justify-content-between gap-2 w-100 pb-4 pt-4">
            <h6 className="top-pools-title">News</h6>
            <NavLink className="view-more-title" to='/news' style={{color: '#7770e0'}}>
            View all <img src={rightarrow} alt="" /> 
          </NavLink>
          </div>
          <div className="d-flex gap-3 justify-content-between">
            <TrendingNews
              image={"news1.png"}
              title={
                "We are excited to announce our partnership with @ANKR 👉🏽 one of the world leaders in Web3 infrastructure. "
              }
              date={"Sept 10, 2022"}
            />
            <NewsCard
              image={"news2.png"}
              title={"Check out the new and improved #DYP TOOLS!"}
            />
            <NewsCard
              image={"news3.png"}
              title={"Check out the new and improved #DYP TOOLS!"}
            />
          </div>
        </div>
        <div className="d-flex flex-column gap-3">
          <ChainlinkCard />
          <div className="d-flex flex-column gap-2">
            <h6 className="header">Launchpad</h6>
            <LaunchpadCard />
          </div>
          <div className="d-flex flex-column gap-2">
            <h6 className="header">FAQs</h6>
            <FaqCard />
            <FaqCard />
            <FaqCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

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
import initConstantStakingNew from "../FARMINNG/constant-staking-new-front";
import initVaultNew from "../FARMINNG/vault-new";

 const Dashboard = ({ isConnected, coinbase, the_graph_result, lp_id, network, handleConnection  }) => {
  const cards = [
    {
      top_pick: false,
      tokenName: "DYP",
      apr: "1.09%",
      tvl: "$48,382.30",
      lockTime: "No lock",
      tokenLogo: 'dyplogo.svg',
      cardType: 'Staking'
    },
    {
      top_pick: false,
      tokenName: "USDT",
      apr: "9-23%",
      tvl: "$48,382.30",
      lockTime: "No lock",
      tokenLogo: 'usdt.svg',
      cardType: 'Vault'
    },
  ];

  const [activeCard, setActiveCard] = useState();
  const [cardIndex, setcardIndex] = useState();
  const [details, setDetails] = useState()

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

  const stakeArrayStakeNew = [
    window.constant_staking_new1,
    window.constant_staking_new2,
  ];

  const aprArrayStake = [25, 50];
  const lockarray = ["No Lock", 90];
  const feeArrayStake = [0.25, 0.5];

  const ConstantStaking1 = initConstantStakingNew({
    staking: stakeArrayStakeNew[cardIndex],
    apr: aprArrayStake[cardIndex],
    liquidity: eth_address,
    expiration_time: "14 December 2022",
    other_info: false,
    fee: feeArrayStake[cardIndex],
    coinbase: coinbase,
    handleConnection: handleConnection,
    chainId: network,
    lockTime: lockarray[cardIndex],
    renderedPage: "dashboard",
    listType: "table"
  });


  const vaultArray = window.vault_usdt
    const tokenvaultArray = window.token_usdt
    
  const vaultplatformArray = 15;
  const vaultdecimalsArray = 6;
  const vaultsymbolArray = "USDT"
  const locktimeFarm = ["No Lock", "3 Days", "30 Days", "60 Days", "90 Days"];

  const VaultCard = initVaultNew({
    vault: window.vault_usdt,
    token: window.token_usdt,
    platformTokenApyPercent: 15,
    UNDERLYING_DECIMALS: 6,
    UNDERLYING_SYMBOL: "USDT",
    expiration_time: "04 March 2023",
    coinbase: coinbase,
    lockTime: "No Lock",
    handleConnection: handleConnection,
    chainId: network,
    listType: "table"
  });
  
  return (
    <div className="container-lg dashboardwrapper px-0">
      <div className="d-flex m-0 justify-content-between gap-4">
        <div className="d-flex flex-column gap-4 justify-content-between">
          <div className="d-flex m-0 gap-3 justify-content-between">
            <Calculator />
            <div
              className="d-flex flex-column gap-4 justify-content-between"
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
            <div className="row m-0 align-items-center justify-content-between gap-2 w-100 pb-2">
              <h6 className="top-pools-title">Top Pools</h6>
              <NavLink to="/earn" className="view-more-title d-flex justify-content-center align-items-center gap-1">
                View all <img src={rightarrow} alt="" />{" "}

              </NavLink>
            </div>
            <div>
              <div className="row m-0 gap-4 toppool-allwrapper">
                {cards.length > 0 &&
                  cards.map((item, index) => {
                    return (
                      <TopPoolsCard
                      renderedPage="dashboard"
                        cardId={item.tokenName}
                        key={index}
                        cardType={item.cardType}
                        top_pick={item.top_pick}
                        tokenName={item.tokenName}
                        apr={item.apr}
                        tvl={item.tvl}
                        lockTime={item.lockTime}
                        tokenLogo={item.tokenLogo}
                        onShowDetailsClick={() => {
                          setActiveCard(cards[index]);
                          console.log(activeCard);
                          setcardIndex(index);
                          setDetails(index)
                        }}
                        onHideDetailsClick={() => {
                          setActiveCard(null);
                          setDetails()
                        }}
                        details={details === index ? true : false}
                      />
                    );
                  })}
              </div>
              {activeCard.cardType === "Staking" ? (
                <ConstantStaking1
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  lp_id={lp_id[cardIndex]}
                  chainId={network}
                  handleConnection = {handleConnection}
                />
              )
              : 
              (
                <VaultCard
              is_wallet_connected={isConnected}
              handleConnection={handleConnection}
              chainId={network}
              coinbase={coinbase}
              the_graph_result={the_graph_result}
              
            />
              )
            
            
            }
              {/* {showDetails && <TopPoolsDetails />} */}

            </div>
          </div>
          <div className="row m-0 align-items-center justify-content-between gap-2 w-100">
            <h6 className="top-pools-title">News</h6>
            <NavLink className="view-more-title d-flex justify-content-center align-items-center gap-1" to='/news'>
            View all <img src={rightarrow} alt="" /> 
          </NavLink>
          <div className="d-flex gap-3 justify-content-between px-0">
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
        </div>
        <div className="d-flex flex-column gap-4">
          <div className="d-flex flex-column gap-2">
            <h6 className="header">Launchpad</h6>
            <LaunchpadCard />
          </div>
          <ChainlinkCard />
          <div className="d-flex flex-column" style={{gap: '11px'}}>
            <h6 className="header">FAQs</h6>
            <FaqCard />
            <FaqCard />
            <FaqCard />
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

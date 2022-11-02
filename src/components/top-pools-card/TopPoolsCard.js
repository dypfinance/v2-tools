import React, { useState } from "react";
import "./top-pools.css";
import DypLogo from "./assets/dyplogo.svg";
import greenArrow from "./assets/greenarrow.svg";
import orangeArrow from "./assets/orangearrow.svg";
import TopPoolsDetails from "./TopPoolsDetails";
import usdc from "./assets/usdc.svg";
import usdt from "./assets/usdt.svg";
import dai from "./assets/dai.svg";
import wbtc from "./assets/wbtc.svg";
import ethereum from "./assets/ethereum.svg";
// import TopPoolsDetails from "./TopPoolsDetails";

const TopPoolsCard = ({
  tokenLogo,
  cardId,
  tokenName,
  apr,
  lockTime,
  tvl,
  // onDetailsClick,
  top_pick,
  cardType,
  // showDetails,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const coins = ["ethereum", "wbtc", "usdc", "usdt", "dai"];

  return (
    <>
      <div
        className={`poolscardwrapper ${top_pick === true ? "top-pick" : ""} ${
          showDetails && "pools-card-open"
        }`}
      >
        <div
          className="purplediv"
          style={{ background: top_pick === true ? "#F0603A" : "#7770e0" }}
        ></div>
        <div className="d-flex flex-column gap-0">
          <div
            className="d-flex m-0 justify-content between gap-2 align-items-center justify-content-between"
            style={{ padding: "0px 10px" }}
          >
            <div className="d-flex align-items-center">
              {cardType === "Farming" || cardType === "Buyback" ? (
               coins.length > 0 && 
               coins.map((coin, index) => (
                  <img
                    key={index}
                    src={require(`./assets/${coin}.svg`).default}
                    alt=""
                    className="pool-coins"
                  />
                ))
              ) : (
                tokenLogo !== undefined &&
                <h6 className="token-name d-flex align-items-center gap-2">
                  <img src={require(`./assets/${tokenLogo}`).default} alt="" className="tokenlogo" /> {tokenName}
                </h6>
              )}
            </div>
            <div className="d-flex align-items-baseline gap-1">
              <h6 className="apr-amount">{apr}</h6>
              <h6 className="apr-title">APR</h6>
            </div>
          </div>
          <div className="d-flex m-0 justify-content between gap-2 align-items-center justify-content-between bottomwrapper">
            {cardType !== "Vault" && (
              <div className="d-flex flex-column">
                <h6 className="tvl-text">Total Value Locked</h6>
                <h6 className="tvl-amount">{tvl}</h6>
              </div>
            )}
            <div className="d-flex flex-column">
              <h6 className="tvl-text">Lock Time</h6>

              <h6 className="tvl-amount">{lockTime}</h6>
            </div>
          </div>
          <div
            className="details-wrapper"
            onClick={() => {
              setShowDetails(!showDetails);
            }}
          >
            <h6
              className="details-text gap-1 d-flex align-items-center"
              style={{ color: showDetails === false ? "#75CAC2" : "#F8845B" }}
            >
              {showDetails === false ? "Details" : "Close"}
              <img src={showDetails === false ? greenArrow : orangeArrow} />
            </h6>
          </div>
        </div>
      </div>
      {showDetails && <TopPoolsDetails />}
    </>
  );
};

export default TopPoolsCard;

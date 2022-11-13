import React, { useEffect, useState } from "react";
import "./top-pools.css";
import greenArrow from "./assets/greenarrow.svg";
import orangeArrow from "./assets/orangearrow.svg";
import TopPoolsDetails from "./TopPoolsDetails";

const TopPoolsCard = ({
  tokenLogo,
  cardId,
  tokenName,
  apr,
  lockTime,
  tvl,
  onShowDetailsClick,
  onHideDetailsClick,
  top_pick,
  cardType,
  chain
  // showDetails,
}) => {
  
  const ethCoins = ["ethereum", "wbtc", "usdc", "usdt"];
  const bscCoins = ["bsc", "btcb", "ethereum", "busd", "pancakeswap", "idypius" ]
  const avaxCoins = ["avax", "ethereum", "wbtc", "usdt", "usdc", "dai", "idypius", "pangolin", "benqi", "xava", "link"]
  
  const [showDetails, setShowDetails] = useState(false);
  const [coins, setCoins] = useState(ethCoins)

  
  const handleDetails = () => {
    if(showDetails === false) {
      setShowDetails(true);
      onShowDetailsClick()
    }

    else if(showDetails === true) {
      setShowDetails(false);
      onHideDetailsClick()
    }
  }


  useEffect(() => {
    if(chain === 'eth'){
      setCoins(ethCoins)
    }else if(chain === 'bnb'){
      setCoins(bscCoins)
    }else if(chain === 'avax'){
      setCoins(avaxCoins)
    }
  }, [chain])
  

  return (
    <>
      <div
        className={`poolscardwrapper cursor-pointer ${top_pick === true ? "top-pick" : ""} ${
          showDetails && "pools-card-open"
        }`}

        onClick={() => handleDetails()}
      >
        <div
          className="purplediv"
          style={{ background: "#7770e0" }}
        ></div>
        <div className="d-flex flex-column gap-0">
          <div
            className="d-flex m-0 justify-content between gap-2 align-items-center justify-content-between"
            style={{ padding: "0px 10px" }}
          >
            <div className="d-flex align-items-center">
              {cardType === "Farming" || cardType === "Buyback" ? (
               coins.length > 0 && 
               coins.slice(0,5).map((coin, index) => (
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

              <h6 className="locktime-amount">{lockTime}</h6>
            </div>
          </div>
          <div
            className="details-wrapper"
            onClick={() => {
              handleDetails()
              
            }}
          >
            <h6
              className="details-text gap-1 d-flex align-items-center"
              style={{ color: showDetails === false ? "#75CAC2" : "#C0C9FF" }}
            >
              {showDetails === false ? "Details" : "Close"}
              <img src={showDetails === false ? greenArrow : orangeArrow} />
            </h6>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default TopPoolsCard;

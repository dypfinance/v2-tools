import React from "react";
import filledArrow from "./assets/filledarrow.svg";
import bridgeLogo from "./assets/bridge-logo.svg";
import './bridgecard.css'

const BridgeCard = () => {
  return (
    <div className="bridgecard-wrapper">
      <div className="orangediv"></div>
      <div className="d-flex flex-column gap-3 justify-content-between">
        <div className="">
          <h6 className="bridgecard-title d-flex justify-content-between gap-2 align-items-center">
          Bridge <img src={bridgeLogo} alt="" />
          </h6>
        </div>
       <div>
       <div>
          <h6 className="bridgecard-desc">
          Bridge between tokens... Instant and secure transactions
          </h6>
        </div>
        <div className="">
          <h6 className="bridgecard-btntext d-flex justify-content-end gap-2 align-items-center">
            <img src={filledArrow} alt="" />
          </h6>
        </div>
       </div>
      </div>
    </div>
  );
};

export default BridgeCard;

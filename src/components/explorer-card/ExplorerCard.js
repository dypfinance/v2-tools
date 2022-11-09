import React from "react";
import filledArrow from "./assets/filledarrow.svg";
import zoom from "./assets/zoom.svg";
import "./explorer-card.css";

const ExplorerCard = () => {
  return (
    <div className="explorercard-wrapper">
      <div className="purplediv"></div>
      <div className="d-flex flex-column gap-2 justify-content-between">
        <div className=" d-flex justify-content-between gap-2 align-items-center">
          <h6 className="explorercard-title d-flex gap-2 align-items-center">
            <img src={zoom} alt="" /> Explorer
          </h6>
          <div className="d-flex flex-column gap-0">
            {/* <h6 className="topapr-title">Top APR</h6> */}
            <h6 className="topapr-amount">1.09%</h6>
          </div>
        </div>
        <div>
          <h6 className="explorercard-desc">
            Lorem ispsum dolor sit amet Sit ame to dolor the little brown fox
            jumps
          </h6>
        </div>
        <div className="">
          <h6 className="explorercard-btntext d-flex gap-2 align-items-center">
            Go now <img src={filledArrow} alt="" />
          </h6>
        </div>
      </div>
    </div>
  );
};

export default ExplorerCard;

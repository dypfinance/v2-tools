import React from "react";
import filledArrow from "./assets/filledarrow.svg";
import zoom from "./assets/zoom.svg";
import explorerChart from './assets/explorerChart.webp'
import "./explorer-card.css";
import { NavLink } from "react-router-dom";

const ExplorerCard = () => {
  return (
    <NavLink to="/pair-explorer" className="explorercard-wrapper d-flex position-relative">
      <div className="purplediv" style={{background: '#8890C4'}}></div>
      <div className="col-6 d-flex flex-column gap-3 justify-content-between">
        <div className=" d-flex justify-content-between gap-2 align-items-center">
          <h6 className="explorercard-title d-flex gap-2 align-items-center">
            <img src={zoom} alt="" /> Explorer
          </h6>
          <div className="d-flex flex-column gap-0">
            {/* <h6 className="topapr-title">Top APR</h6> */}
            {/* <h6 className="topapr-amount">1.09%</h6> */}
          </div>
        </div>
        <div>
          <h6 className="explorercard-desc">
          Follow the latest trends, keep up with new tokens, big swaps, and get every information in real-time.
          </h6>
        </div>
        <div className="">
          <h6 className="explorercard-btntext d-flex gap-2 align-items-center">
            Explore more <img src={filledArrow} alt="" />
          </h6>
        </div>
      </div>
      <div className="col-6 d-flex justify-content-center align-items-center">
        <img src={explorerChart} alt="" />
      </div>
    </NavLink>
  );
};

export default ExplorerCard;

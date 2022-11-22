import React from "react";
import filledArrow from "./assets/filledarrow.svg";
import govLogo from "./assets/gov-logo.svg";
import { NavLink } from "react-router-dom";
import './govcard.css'

const GovCard = () => {
  return (
    <NavLink to="/governance" className="govcard-wrapper">
      <div className="purplediv" style={{background: '#8890C4'}}></div>
      <div className="d-flex flex-column gap-3 justify-content-between">
        <div className="">
          <h6 className="govcard-title d-flex justify-content-between gap-2 align-items-center">
            Governance <img src={govLogo} alt="" />
          </h6>
        </div>
      <div>
      <div>
          <h6 className="governancecard-desc">
          Vote to add more pools, burn tokens and create other unique proposals.
          </h6>
        </div>
        <div className="">
          <h6 className="govcard-btntext d-flex justify-content-end gap-2 align-items-center">
            <img src={filledArrow} alt="" />
          </h6>
        </div>
      </div>
      </div>
    </NavLink>
  );
};

export default GovCard;

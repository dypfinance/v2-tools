import React from "react";
import filledArrow from "./assets/filledarrow.svg";
import govLogo from "./assets/gov-logo.svg";
import './govcard.css'

const GovCard = () => {
  return (
    <div className="govcard-wrapper">
      <div className="greendiv"></div>
      <div className="d-flex flex-column gap-2 justify-content-between">
        <div className="">
          <h6 className="govcard-title d-flex justify-content-between gap-2 align-items-center">
            Governance <img src={govLogo} alt="" />
          </h6>
        </div>
        <div>
          <h6 className="govcard-desc">
            DYP holders can vote to add more pools, burn tokens and other
            programs
          </h6>
        </div>
        <div className="">
          <h6 className="govcard-btntext d-flex justify-content-between gap-2 align-items-center">
            Go now <img src={filledArrow} alt="" />
          </h6>
        </div>
      </div>
    </div>
  );
};

export default GovCard;
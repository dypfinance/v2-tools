import React from "react";
import moreInfo from "../FARMINNG/assets/more-info.svg";



const PairLockerCard = ({ completed, active }) => {
  return (
    <div className="pair-locker-card d-flex">
      <div className="col-7 pair-locker-left p-2 d-flex flex-column gap-2 position-relative">
        <div className="d-flex justify-content-between align-items-center">
          <span className="pair-indicator">ID</span>
          <span className="pair-value">1</span>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <span className="pair-indicator">Pair address</span>
          <span className="pair-value">..2012765</span>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <span className="pair-indicator">LP Amount</span>
          <span className="pair-value">0.8664435</span>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <span className="pair-indicator">DYP</span>
          <span className="pair-value">..2021765</span>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <span className="pair-indicator">Recipent</span>
          <span className="pair-value">..44324</span>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <span className="pair-indicator">Unlock</span>
          <span className="pair-value">6 months</span>
        </div>
        <img
          src={require(`./assets/${
            completed === true && active === true
              ? "pairPurple"
              : completed === false && active === true
              ? "pairOrange"
              : "pairGrey"
          }.svg`).default}
          className="pairlocker-badge"
          width={58}
          height={64}
          alt=""
        />
      </div>
      <div
        className={`col-5 pair-locker-right p-2 d-flex flex-column justify-content-between ${
          completed === true && active === true
            ? "active-pair-completed"
            : completed === false && active === true
            ? "active-pair"
            : "inactive-pair"
        }`}
      >
        <div className="d-flex flex-column" style={{ gap: "37px" }}>
          <div className="d-flex flex-column gap-2">
            <div className="d-flex align-items-start justify-content-between position-relative">
              <span className="pair-indicator">Status</span>
                {active === true &&  
              <img src={moreInfo} alt="" className="more-info-tag" />
                
                }             
              {active === true ? 
                <div
                className="active-tag d-flex align-items-center gap-2"
                style={{ position: "absolute", right: "0" }}
              >
                <img src={require("./assets/activeMark.svg").default} alt="" />
                <span className="active-tag-text">Active</span>
              </div>
              :
              <div
              className="inactive-tag d-flex align-items-center gap-2"
              style={{ position: "absolute", right: "0" }}
            >
              <img src={require("./assets/inactiveMark.svg").default} alt="" />
              <span className="inactive-tag-text">Inactive</span>
            </div>
            }
            </div>
          </div>
          <div className="d-flex flex-column gap-2">
            <div className="d-flex flex-column gap-2">
              <span className="pair-indicator">Ends in</span>
              <span className="pair-value">12.05.2022</span>
            </div>
            <div className="d-flex flex-column gap-2">
              <span className="pair-indicator">Created</span>
              <span className="pair-value">12.05.2022</span>
            </div>
          </div>
        </div>
        <div className="mt-4 d-flex w-100">
          <button className={`btn filledbtn w-100 ${completed === false && 'hide-btn'}`}>Claim</button>
        </div>
      </div>
    </div>
  );
};

export default PairLockerCard;

import React from "react";
import launchpadbg from './assets/launchpadbg.png'
import rightlogo from './assets/filledArrow.svg'
import './launchpad.css'


const LaunchpadCard = () => {
  return (
    <div className="launchpad-wrapper">
      <div className="d-flex flex-column gap-2 align-items-center justify-content-between">
        <img src={launchpadbg} alt=''className="launchpadbg"/>
        <div className="d-flex gap-2 align-items-center justify-content-between">
        <h6 className="faqtitle">Lorem ipsum dolor sit amet, consectet...</h6>
        <img src={rightlogo} alt=''/></div>
      </div>
    </div>
  );
};

export default LaunchpadCard;

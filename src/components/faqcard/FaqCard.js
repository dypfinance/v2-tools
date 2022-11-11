import React from "react";
import faqlogo from './assets/faqLogo.svg'
import rightlogo from './assets/rightlogo.svg'
import './faqcard.css'


const FaqCard = () => {
  return (
    <div className="faq-wrapper">
      <div className="d-flex gap-2 align-items-center justify-content-between">
        <img src={faqlogo} alt=''/>
        <h6 className="faqtitle">Lorem ipsum dolor sit amet, consectet...</h6>
        <img src={rightlogo} alt=''/>
      </div>
    </div>
  );
};

export default FaqCard;

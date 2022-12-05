import React from "react";
import faqlogo from './assets/faqlogo.svg'
import rightlogo from './assets/rightlogo.svg'
import './faqcard.css'
import { HashLink } from 'react-router-hash-link';


const FaqCard = ({option, pathName, title, section, pool}) => {
  return (
    <HashLink to={{pathname: pathName, state: {option: option, chain: 'eth', section: section, pool: pool}}} className="faq-wrapper">
      <div className="d-flex gap-2 align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-2">
        <img src={faqlogo} alt=''/>
        <h6 className="faqtitle">{title}</h6>
        </div>
        <img src={rightlogo} alt=''/>
      </div>
    </HashLink>
  );
};

export default FaqCard;

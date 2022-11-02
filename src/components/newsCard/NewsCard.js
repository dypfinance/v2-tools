import React from "react";
import filledArrow from './assets/filledArrow.svg'
import './newscard.css'

const NewsCard = ({image, title}) => {
  return (
    <div className="newscard-wrapper">
      <div className="d-flex flex-column gap-2 position-relative">
        <img src={require(`./assets/${image}`).default} alt='' className="newsimg"/>
        <h6 className="nc-title">{title}</h6>
        <img src={filledArrow} alt='' className="ncarrow"/>
      </div>
    </div>
  );
};

export default NewsCard;

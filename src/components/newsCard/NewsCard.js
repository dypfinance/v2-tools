import React from "react";
import filledArrow from './assets/filledArrow.svg'
import './newscard.css'

const NewsCard = ({image, title}) => {
  return (
    <div className="newscard-wrapper p-0">
      <div className="d-flex flex-column gap-2 position-relative">
        <img src={require(`./assets/${image}`).default} alt='' className="newsimg"/>
        <div className="d-flex justify-content-between align-items-end px-2 mt-2">
        <h6 className="nc-title">{title}</h6>
        <img src={filledArrow} alt=''/>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;

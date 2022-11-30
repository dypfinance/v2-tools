import React from "react";
import filledArrow from './assets/filledArrow.svg'
import newsShadow from './assets/newsShadow2.png'
import calendar from './assets/calendar.svg'
import './newscard.css'

const NewsCard = ({image, title}) => {
  return (
    <div className="newscard-wrapper p-0">
      <div className="d-flex flex-column gap-2 position-relative">
        <div className="position-relative">
        <img src={newsShadow} className="news-shadow" alt="" />
        <div className="d-flex align-items-center gap-2 news-date">
          <img src={calendar} alt="" />
          <span style={{fontSize: '10px', fontWeight: '400', lineHeight: '15px', color: '#DBD9FF'}}>Sept 10, 2022</span>
        </div>
        <img src={require(`./assets/${image}`).default} alt='' className="newsimg"/>
        </div>
        <div className="d-flex justify-content-between align-items-end px-2 mt-2">
        <h6 className="nc-title">{title}</h6>
        <img src={filledArrow} alt=''/>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;

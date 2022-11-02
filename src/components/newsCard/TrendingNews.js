import React from "react";
import filledArrow from './assets/filledArrow.svg'
import sparkle from './assets/sparkle.svg'
import calendar from './assets/calendar.svg'


import './newscard.css'

const TrendingNews = ({image, title, date}) => {
  return (
    <div className="newscard-wrapper" style={{width: '49%'}}>
      <div className="d-flex justify-content-between align-items-center gap-2 position-relative">
        <img src={require(`./assets/${image}`).default} alt='' className="newsimg2"/>
        <div className="d-flex flex-column gap-2 justify-content-between">
            <h6 className="nc-hot-trend"> <img src={sparkle} alt='' /> Hot Trending</h6>

      
        <h6 className="nc-title">{title}</h6>
        <div className="d-flex m-0 justify-content-between align-items-center gap-2">
        <h6 className="nc-date"> <img src={calendar} alt=''/> {date}</h6>
        <img src={filledArrow} alt='' className="" style={{ height: 20}}/>
        </div>  </div>
      </div>
    </div>
  );
};

export default TrendingNews;

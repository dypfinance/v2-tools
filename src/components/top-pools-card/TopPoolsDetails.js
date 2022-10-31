import React from "react";
import ellipse from "./assets/ellipse.svg";

const TopPoolsDetails = () => {
  return (
    <div className="pools-details-wrapper">
      <div className="leftside">
        <div className="activewrapper">
          <h6 className="activetxt">
            <img
              src={ellipse}
              alt=""
              className="position-relative"
              style={{ top: 3 }}
            />
            Active status
          </h6>
        </div>
        <div className="d-flex align-items-center gap-2 justify-content-between">
          <div>
            <h6>Earn rewards in:</h6>
            <h6>DYP</h6>
          </div>
          <div>
            <h6>Performance fee:</h6>
            <h6>0.25%</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopPoolsDetails;

import React, { useState, useEffect } from "react";
import axios from "axios";
import chainlinkLogo from "./assets/chainlink-logo.png";
import eth from "./assets/eth.svg";
import bnb from "./assets/bnb.svg";
import avax from "./assets/avax.svg";
import "./chainlink.css";
import getFormattedNumber from "../../functions/get-formatted-number";

const ChainlinkCard = () => {
  const [totalpaid, setTotalPaid] = useState();

  const getTotalPaidData = async () => {
    await axios.get("https://api.dyp.finance/api/totalpaid").then((data) => {
      setTotalPaid(data.data);
    });
  };

  useEffect(() => {
    getTotalPaidData();
  }, []);

  return (
    <div className="chainlink-wrapper">
      <div className="d-flex flex-column gap-2 justify-content-between">
        <div>
          <h6 className="chainlinktitle">
            <a
              href="https://data.chain.link/"
              target={"_blank"}
              rel="noreferrer"
            >
              <img src={chainlinkLogo} alt=""  style={{width: 20, height: 20}}/>
              Provided by Chainlink
            </a>
          </h6>
        </div>
        <div className="chbottomwrapper">
          <div>
            <h6 className="d-flex align-items-center gap-2 totalpaidtxt">
              <img src={eth} alt="" />
              {getFormattedNumber(totalpaid?.ethTotal.wethPaiOutTotals, 0)}
              <h6 className="tokenname">ETH</h6>
            </h6>
          </div>
          <div>
            <h6 className="d-flex align-items-center gap-2 totalpaidtxt">
              <img src={bnb} alt="" />
              {getFormattedNumber(
                totalpaid?.bnbTotal.wbnbPaidOutTotals,
                0
              )}
              <h6 className="tokenname">BNB</h6>
            </h6>
          </div>
          <div>
            <h6 className="d-flex align-items-center gap-2 totalpaidtxt">
              <img src={avax} alt="" />
              {getFormattedNumber(
                totalpaid?.avaxTotal.avaxPaidOutTotals,
                0
              )}
              <h6 className="tokenname">AVAX</h6>
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChainlinkCard;

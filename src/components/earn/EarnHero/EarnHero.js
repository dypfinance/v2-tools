import React, { useEffect, useState } from "react";
import earnHeroStats from "../../../assets/earnAssets/earnHeroStats.webp";
import coin from "../../../assets/earnAssets/coin.webp";
import coinBackground from "../../../assets/earnAssets/coinBackground.webp";
import eth from "../../../assets/earnAssets/ethereumIcon.svg";
import bnb from "../../../assets/earnAssets/bnbIcon.svg";
import avax from "../../../assets/earnAssets/avaxIcon.svg";
import getFormattedNumber from "../../../functions/get-formatted-number";
import CountUp from "react-countup";
import axios from "axios";

const EarnHero = () => {
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
    <div className="row w-100 earn-hero p-4 justify-content-between">
      <div className="col-5 d-flex flex-column justify-content-center gap-3">
        <h3 className="text-white">DYP Earn</h3>
        <p className="text-white">
          Make the most of your assets with Dypius Earn products. Start earning
          today!
        </p>
      </div>
      <div className="col-6 d-flex gap-5">
        <div className="d-flex flex-column align-items-start">
          <div className="d-flex flex-column" style={{ marginLeft: "80px" }}>
            <p style={{ fontSize: "9px", color: "#F36D46", fontWeight: "300" }}>
              Rewards paid out
            </p>
            <CountUp
              style={{
                fontSize: "19px",
                color: "#F36D46",
                fontWeight: "600",
                textAlign: "start",
              }}
              start={totalpaid?.totalPaidInUsd - 400.0}
              end={totalpaid?.totalPaidInUsd}
              duration={120}
              separator=","
              decimals={2}
              prefix="$"
            />
          </div>
          <img
            src={earnHeroStats}
            style={{ width: "230px", height: "80px" }}
            alt=""
          />
        </div>
        <div className="d-flex flex-column justify-content-between">
          <div className="d-flex justify-content-start align-items-center gap-2">
            <img src={eth} alt="" />
            <h4 style={{ color: "#6C85E7" }}>
              {" "}
              {getFormattedNumber(totalpaid?.ethTotal.wethPaiOutTotals, 0)}
            </h4>
          </div>
          <div className="d-flex justify-content-start align-items-center gap-2">
            <img src={bnb} alt="" />
            <h4 style={{ color: "#F6CC29" }}>
              {getFormattedNumber(totalpaid?.bnbTotal.wbnbPaidOutTotals, 0)}
            </h4>
          </div>
          <div className="d-flex justify-content-start align-items-center gap-2">
            <img src={avax} alt="" />
            <h4 style={{ color: "#F86667" }}>
              {getFormattedNumber(totalpaid?.avaxTotal.avaxPaidOutTotals, 0)}
            </h4>
          </div>
        </div>
        <div className="position-relative">
          <img src={coin} alt="" className="coin" />
          <img src={coinBackground} alt="" className="coin" />
        </div>
      </div>
    </div>
  );
};

export default EarnHero;
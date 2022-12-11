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
    <div className="row w-100 flex-column flex-lg-row earn-hero gap-2 gap-lg-0 p-2 p-lg-4 justify-content-between">
      <div className="col-5 d-flex flex-column justify-content-center gap-3">
        <h3 className="text-white" style={{whiteSpace: 'pre'}}>Dypius Earn</h3>
        <p className="text-white d-none d-lg-flex">
        Make the most of your assets with Dypius Earn products. Dypius offers four ways to productively use your assets. Participate in Staking, Farming, Vault and Buyback. Start earning today!
        </p>
      </div>
      <div className="col-12 col-lg-6 d-flex gap-0 gap-lg-5">
        <div className="d-flex flex-column align-items-start">
          <div className="d-flex flex-column paid-rewards">
            <p style={{ fontSize: "9px", color: "#f7f7fc", fontWeight: "300" }}>
              Rewards paid out
            </p>
            <CountUp
              className="count-up"
              style={{
                fontSize: "19px",
                color: "#f7f7fc",
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
            <h4 style={{ color: "#f7f7fc" }}>
              {" "}
              {getFormattedNumber(totalpaid?.ethTotal.wethPaiOutTotals, 0)}
            </h4>
          </div>
          <div className="d-flex justify-content-start align-items-center gap-2">
            <img src={bnb} alt="" />
            <h4 style={{ color: "#f7f7fc" }}>
              {getFormattedNumber(totalpaid?.bnbTotal.wbnbPaidOutTotals, 0)}
            </h4>
          </div>
          <div className="d-flex justify-content-start align-items-center gap-2">
            <img src={avax} alt="" />
            <h4 style={{ color: "#f7f7fc" }}>
              {getFormattedNumber(totalpaid?.avaxTotal.avaxPaidOutTotals, 0)}
            </h4>
          </div>
        </div>
        <div className="position-relative d-none d-xxl-block">
          <img src={coin} alt="" className="coin" />
          <img src={coinBackground} alt="" className="coin" />
        </div>
      </div>
    </div>
  );
};

export default EarnHero;

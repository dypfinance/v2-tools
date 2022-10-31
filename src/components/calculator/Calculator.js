// import { Form, Formik } from 'formik'
// import * as Yup from 'yup';
import React, { useEffect, useState } from "react";
import Button from "../../../assets/General/Button";
import PillsSlider from "../../../assets/General/PillsSlider";
import PillButton from "../../../assets/General/PillButton";
import PropTypes from "prop-types";
import { isMobile } from "react-device-detect";
import ChevronArrowSvg from "../../../assets/General/ChevronArrowSvg/ChevronArrowSvg";
import getFormattedNumber from "../../../functions/get-formatted-number";
import { useHistory } from "react-router-dom";
import './calculator.css'

const Calculator = ({ setSelectedMethod, high_apy }) => {
  const chainButtonsArray = [
    {
      icon: "eth-icon.svg",
      text: "ETH",
      action: () => console.log("chain button"),
    },
    {
      icon: "bsc-icon.svg",
      text: "BSC",
      action: () => console.log("chain button"),
    },
    {
      icon: "avax-icon.svg",
      text: "AVAX",
      action: () => console.log("chain button"),
    },
  ];
  const timePillsArray = [
    {
      text: "1 month",
      action: () => console.log("pill button"),
    },
    {
      text: "3 months",
      action: () => console.log("pill button"),
    },
    {
      text: "6 months",
      action: () => console.log("pill button"),
    },
    {
      text: "1 year",
      action: () => console.log("pill button"),
    },
  ];
  const pillsNames = ["Staking", "Buyback", "Vault", "Farming"];

  const getActivePill = (activePill) => {
    setActiveMethod(activePill);
    setSelectedMethod(activePill);
  };

  const [usdToDeposit, setUsdToDeposit] = useState(1000);
  const [days, setDays] = useState(365);
  const [activeChain, setActiveChain] = useState(chainButtonsArray[0]);
  const [activeTime, setActiveTime] = useState(
    timePillsArray[timePillsArray.length - 1]
  );
  const [activeMethod, setActiveMethod] = useState(pillsNames[0]);
  const [calculateApproxUSD, setCalculateApproxUSD] = useState(0);
  const [calculateApproxCrypto, setCalculateApproxCrypto] = useState("0");
  const [stakeApy, setStakeApy] = useState();
  const [buybackApy, setBuybackApy] = useState();
  const [vaultApy, setVaultApy] = useState();
  const [farmApy, setFarmApy] = useState();
  const [wethPrice, setWethPrice] = useState(0);
  const [wbnbPrice, setWbnbPrice] = useState(0);
  const [wavaxPrice, setWavaxPrice] = useState(0);

  let formData = {};

  if (isMobile) {
    const newChainButtons = [...chainButtonsArray];

    newChainButtons.map((item) => {
      item.text = item.text.split(" ")[0];
      return item;
    });
  }

  const getTotalTvl = async () => {
    const { BigNumber } = window;

    let [usdPerToken, usdPerTokeniDYP, usdiDYPAvax, usdiDYPEth] =
      await Promise.all([
        window.getPrice("defi-yield-protocol"),
        window.getPriceiDYP(),
        window.getPriceiDYPAvax(),
        window.getPriceiDYPEth(),
      ]);

    usdPerTokeniDYP = parseFloat(usdPerTokeniDYP);

    let apr1 = 50;
    let apy1 = new BigNumber(apr1)
      .div(1e2)
      .times(usdPerTokeniDYP)
      .div(usdPerToken)
      .times(1e2)
      .toFixed(2);

    if (activeChain.text === "BSC" && activeMethod === "Staking")
      setStakeApy(apy1);
    let apyAvax = new BigNumber(apr1)
      .div(1e2)
      .times(usdiDYPAvax)
      .div(usdPerToken)
      .times(1e2)
      .toFixed(2);
    if (activeChain.text === "AVAX" && activeMethod === "Staking")
      setStakeApy(apyAvax);

    let apyEth = new BigNumber(apr1)
      .div(1e2)
      .times(usdiDYPEth)
      .div(usdPerToken)
      .times(1e2)
      .toFixed(2);
    if (activeChain.text === "ETH" && activeMethod === "Staking")
      setStakeApy(apyEth);

    return stakeApy;
  };

  const getTotalTvlBuyBack = async () => {
    const { BigNumber } = window;

    let [usdPerToken, usdPerTokeniDYP, usdiDYPAvax, usdiDYPEth] =
      await Promise.all([
        window.getPrice("defi-yield-protocol"),
        window.getPriceiDYP(),
        window.getPriceiDYPAvax(),
        window.getPriceiDYPEth(),
      ]);

    // APR is 100% considering 1$ as initial investment, 0.75$ goes to Buyback
    let apy1_buyback2 = new BigNumber(0.75);
    let apy2_buyback2 = new BigNumber(0.25)
      .div(usdPerToken)
      .times(usdPerTokeniDYP);

    let apyBuyback2 = new BigNumber(apy1_buyback2)
      .plus(apy2_buyback2)
      .times(1e2)
      .toFixed(0);
    if (activeChain.text === "BSC" && activeMethod === "Buyback")
      setBuybackApy(apyBuyback2);
    //Apy AVAX V2 APR is 100%
    apy2_buyback2 = new BigNumber(0.25).div(usdPerToken).times(usdiDYPAvax);

    let apyBuybackAvax = new BigNumber(apy1_buyback2)
      .plus(apy2_buyback2)
      .times(1e2)
      .toFixed(0);
    if (activeChain.text === "AVAX" && activeMethod === "Buyback")
      setBuybackApy(apyBuybackAvax);

    //Apy ETH V2 APR is 100%
    apy2_buyback2 = new BigNumber(0.25).div(usdPerToken).times(usdiDYPEth);

    let apyBuybackEth = new BigNumber(apy1_buyback2)
      .plus(apy2_buyback2)
      .times(1e2)
      .toFixed(0);
    if (activeChain.text === "ETH" && activeMethod === "Buyback")
      setBuybackApy(apyBuybackEth);

    return buybackApy;
  };

  useEffect(() => {
    if (activeMethod === "Farming") {
      if (activeChain.text === "ETH") {
        setFarmApy(high_apy.highestAPY.highestAPY_ETH_V2);
      } else if (activeChain.text === "BSC") {
        setFarmApy(high_apy.highestAPY.highestAPY_BSC_V2);
      } else {
        setFarmApy(high_apy.highestAPY.highestAPY_AVAX_V2);
      }
    } else if (activeMethod === "Staking") {
      setStakeApy(25)
    } else if (activeMethod === "Buyback") {
      getTotalTvlBuyBack().then();
    } else {
      setVaultApy(18.43);
    }
  }, [activeChain.text, activeMethod]);

  const getWrappedTokenPrices = async () => {
    const wbnbPrice = await window.the_graph_result_bsc_v2?.usd_per_eth;
    setWbnbPrice(wbnbPrice);
    const wavaxPrice = await window.the_graph_result_AVAX?.usd_per_eth;
    setWavaxPrice(wavaxPrice);

    const wethPrice = await window.the_graph_result_eth_v2?.usd_per_eth;

    setWethPrice(wethPrice);
  };

  useEffect(() => {
    getWrappedTokenPrices().then();
    if (activeMethod === "Farming") {
      if (activeChain.text === "ETH") {
        setCalculateApproxUSD(
          (
            ((parseInt(usdToDeposit) * parseFloat(farmApy)) / 100 / 365) *
            parseInt(days)
          ).toFixed(2)
        );
        // setCalculateApproxCrypto((parseFloat(calculateApproxUSD) *parseFloat(wethPrice)))
        setCalculateApproxCrypto(
          getFormattedNumber(parseFloat(calculateApproxUSD) / wethPrice, 6)
        );
      } else if (activeChain.text === "BSC") {
        setCalculateApproxUSD(
          (
            ((parseInt(usdToDeposit) * parseFloat(farmApy)) / 100 / 365) *
            parseInt(days)
          ).toFixed(2)
        );
        setCalculateApproxCrypto(
          getFormattedNumber(parseFloat(calculateApproxUSD) / wbnbPrice, 6)
        );
      } else {
        setCalculateApproxUSD(
          (
            ((parseInt(usdToDeposit) * parseFloat(farmApy)) / 100 / 365) *
            parseInt(days)
          ).toFixed(2)
        );
        setCalculateApproxCrypto(
          getFormattedNumber(parseFloat(calculateApproxUSD) / wavaxPrice, 6)
        );
      }
    } else if (activeMethod === "Staking") {
      if (activeChain.text === "ETH") {
        setCalculateApproxUSD(
          (
            ((parseInt(usdToDeposit) * parseFloat(stakeApy)) / 100 / 365) *
            parseInt(days)
          ).toFixed(2)
        );

        setCalculateApproxCrypto(
          getFormattedNumber(parseFloat(calculateApproxUSD) / wethPrice, 6)
        );
      } else if (activeChain.text === "BSC") {
        setCalculateApproxUSD(
          (
            ((parseInt(usdToDeposit) * parseFloat(stakeApy)) / 100 / 365) *
            parseInt(days)
          ).toFixed(2)
        );
        setCalculateApproxCrypto(
          getFormattedNumber(parseFloat(calculateApproxUSD) / wbnbPrice, 6)
        );
      } else {
        setCalculateApproxUSD(
          (
            ((parseInt(usdToDeposit) * parseFloat(stakeApy)) / 100 / 365) *
            parseInt(days)
          ).toFixed(2)
        );
        setCalculateApproxCrypto(
          getFormattedNumber(parseFloat(calculateApproxUSD) / wavaxPrice, 6)
        );
      }
    } else if (activeMethod === "Buyback") {
      if (activeChain.text === "ETH") {
        setCalculateApproxUSD(
          (
            ((parseInt(usdToDeposit) * parseFloat(buybackApy)) / 100 / 365) *
            parseInt(days)
          ).toFixed(2)
        );
        setCalculateApproxCrypto(
          getFormattedNumber(parseFloat(calculateApproxUSD) / wethPrice, 6)
        );
      } else if (activeChain.text === "BSC") {
        setCalculateApproxUSD(
          (
            ((parseInt(usdToDeposit) * parseFloat(buybackApy)) / 100 / 365) *
            parseInt(days)
          ).toFixed(2)
        );
        setCalculateApproxCrypto(
          getFormattedNumber(parseFloat(calculateApproxUSD) / wbnbPrice, 6)
        );
      } else {
        setCalculateApproxUSD(
          (
            ((parseInt(usdToDeposit) * parseFloat(buybackApy)) / 100 / 365) *
            parseInt(days)
          ).toFixed(2)
        );

        setCalculateApproxCrypto(
          getFormattedNumber(parseFloat(calculateApproxUSD) / wavaxPrice, 6)
        );
      }
    } else {
      if (activeChain.text === "ETH") {
        setCalculateApproxUSD(
          (
            ((parseInt(usdToDeposit) * parseFloat(vaultApy)) / 100 / 365) *
            parseInt(days)
          ).toFixed(2)
        );
        setCalculateApproxCrypto(
          getFormattedNumber(parseFloat(calculateApproxUSD) / wethPrice, 6)
        );
      } else if (activeChain.text === "BSC") {
        setCalculateApproxUSD(
          (
            ((parseInt(usdToDeposit) * parseFloat(vaultApy)) / 100 / 365) *
            parseInt(days)
          ).toFixed(2)
        );
        setCalculateApproxCrypto(
          getFormattedNumber(parseFloat(calculateApproxUSD) / wbnbPrice, 6)
        );
      } else {
        setCalculateApproxUSD(
          (
            ((parseInt(usdToDeposit) * parseFloat(vaultApy)) / 100 / 365) *
            parseInt(days)
          ).toFixed(2)
        );

        setCalculateApproxCrypto(
          getFormattedNumber(parseFloat(calculateApproxUSD) / wavaxPrice, 6)
        );
      }
    }
  }, [
    activeChain.text,
    activeMethod,
    farmApy,
    stakeApy,
    buybackApy,
    vaultApy,
    usdToDeposit,
    days,
    getWrappedTokenPrices,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    formData = {
      usdToDeposit,
      days,
      chain: activeChain,
      time: activeTime.text,
      method: activeMethod,
    };

    console.log(formData);
  };

  const handleInputDays = (e) => {
    setDays(e);
    if (parseInt(e) <= 30) {
      setActiveTime(timePillsArray[0]);
    } else if (parseInt(e) > 30 && parseInt(e) < 92) {
      setActiveTime(timePillsArray[1]);
    } else if (parseInt(e) > 92 && parseInt(e) < 185) {
      setActiveTime(timePillsArray[2]);
    } else if (parseInt(e) > 185) {
      setActiveTime(timePillsArray[3]);
    }
  };

  const handleInputDays2 = (e) => {
    if (e === "1 month") {
      setDays(30);
    }
    if (e === "3 months") {
      setDays(92);
    }
    if (e === "6 months") {
      setDays(185);
    }
    if (e === "1 year") {
      setDays(365);
    }
  };

  const handleInputUSD = (e) => {
    setUsdToDeposit(e);
  };
 let navigate = useHistory();
  const gotoEarn = () => {
    const generalisedActiveMethod = activeMethod === 'Staking' ? 'Stake' : activeMethod;
    navigate.push("/earn");
    localStorage.setItem("activeTab", generalisedActiveMethod);
  };
  
  return (
    <div className="elevated-container form mr-lg-4">
      <div className="ball-decoration"></div>
      <div className="ball-decoration"></div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="p-md-0 col-12">
            <PillsSlider
              pillsNames={pillsNames}
              getActivePill={getActivePill}
              initialActivePill={pillsNames[0]}
            />
          </div>
          <div className="p-md-0 col-12">
            <div className="pill-buttons-wrapper">
              {chainButtonsArray.length > 0 &&
                 activeMethod === 'Vault' ? chainButtonsArray.map(item => {
                   return item.text === 'ETH' ?
                  <PillButton
                    type="chain"
                    onClick={() => setActiveChain(item)}
                    key={item.icon}
                    icon={item.icon}
                    text={item.text}
                    active={activeChain}
                  /> : null
                 }) : chainButtonsArray.map((item, id) => (
                  <PillButton
                    type="chain"
                    onClick={() => setActiveChain(item)}
                    key={id}
                    icon={item.icon}
                    text={item.text}
                    active={activeChain}
                  />
                ))}
            </div>
          </div>
        </div>
        <div className="row price-row">
          <div className="p-md-0 col-7 d-flex ">
            <div className="price-box">
              <span className="sub">Approx.</span>
              <span className="price">
                ${calculateApproxUSD === "NaN" ? "0.0" : calculateApproxUSD}{" "}
                <span className="currency">USD</span>
              </span>
              <span className="sup">
                (
                {calculateApproxCrypto != "∞.undefined" &&
                calculateApproxCrypto != "..."
                  ? calculateApproxCrypto
                  : "0.0"}
                {activeChain.text === "BSC"
                  ? "WBNB"
                  : activeChain.text === "AVAX"
                  ? "WAVAX"
                  : "WETH"}
                )
              </span>
            </div>
          </div>
          <div className="p-0 col-5 d-flex align-items-end">
            <img
              src={require("../../../assets/images/line-graph.svg").default}
              alt=""
            />
          </div>
        </div>
        <div className="row inputs-row">
          <div className="p-md-0 col-md-6 d-flex  ">
            <div className="form-group">
              <label htmlFor="usd_to_deposit" style={{ background: "none" }}>
                <span style={{ color: "var(--text-gray-8b-nft)" }}>
                  USD to deposit
                </span>
              </label>
              <input
                type="text"
                className="form-control"
                id="usd_to_deposit"
                name="usd_to_deposit"
                value={usdToDeposit}
                onChange={(e) => handleInputUSD(e.target.value)}
              />
            </div>
          </div>
          <div className="p-md-0 col-md-6">
            <div className="form-group">
              <label htmlFor="days" style={{ background: "none" }}>
                <span style={{ color: "var(--text-gray-8b-nft)" }}>Days</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="days"
                name="days"
                value={days}
                onChange={(e) => handleInputDays(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="p-md-0 col-md-6 order-2 order-md-1 ">
            <Button text="Earn now" icon={<ChevronArrowSvg />} action={()=>{gotoEarn()}}/>
          </div>
          <div className="p-md-0 col-md-6 order-1- order-md-2 d-flex align-items-center">
            <div className="pill-buttons-wrapper time-buttons">
              {timePillsArray.length > 0 &&
                timePillsArray.map((item, id) => (
                  <PillButton
                    type="time"
                    onClick={() => {
                      setActiveTime(item);
                      handleInputDays2(item.text);
                    }}
                    key={id}
                    icon={item.icon}
                    text={item.text}
                    active={activeTime}
                  />
                ))}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="p-md-0 col">
            <p className="form-info">
              *This calculator is for informational purposes only. <br />{" "}
              Calculated yields assume that prices of the deposited assets don't
              change.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};
Calculator.propTypes = {
  values: PropTypes.shape({
    usd_to_deposit: PropTypes.string,
    days: PropTypes.string,
    method: PropTypes.string,
    type_of_chain: PropTypes.string,
    time_period: PropTypes.string,
  }),
  setSelectedMethod: PropTypes.any,
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
};

export default Calculator;

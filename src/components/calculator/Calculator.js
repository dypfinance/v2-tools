import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { isMobile } from "react-device-detect";
import { useHistory } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import calculator from "./assets/calculator.svg";
import avax from "./assets/avax.svg";
import bnb from "./assets/bnb.svg";
import eth from "./assets/eth.svg";
import rightarrow from "./assets/rightarrow.svg";
import getFormattedNumber from "../../functions/getFormattedNumber2";

import "./calculator.css";

const Calculator = ({}) => {
  const chainButtonsArray = [
    {
      icon: "eth.svg",
      text: "ETH",
      action: () => console.log("chain button"),
    },
    {
      icon: "bnb.svg",
      text: "BSC",
      action: () => console.log("chain button"),
    },
    {
      icon: "avax.svg",
      text: "AVAX",
      action: () => console.log("chain button"),
    },
  ];
  const timePillsArray = ["1 month", "3 months", "6 months", "Max"];
  const pillsNames = ["Staking", "Buyback", "Vault", "Farming"];

  const getActivePill = (activePill) => {
    setActiveMethod(activePill);
  };

  const [usdToDeposit, setUsdToDeposit] = useState(1000);
  const [days, setDays] = useState(365);
  const [activeChain, setActiveChain] = useState(chainButtonsArray[0]);
  const [activeTime, setActiveTime] = useState( timePillsArray[timePillsArray.length - 1]);
  const [activeMethod, setActiveMethod] = useState(pillsNames[0]);
  const [calculateApproxUSD, setCalculateApproxUSD] = useState(0);
  const [calculateApproxCrypto, setCalculateApproxCrypto] = useState("0");
  const [stakeApy, setStakeApy] = useState();
  const [buybackApy, setBuybackApy] = useState();
  const [vaultApy, setVaultApy] = useState();
  const [farmApy, setFarmApy] = useState();
  const [apyData, setapyData] = useState();

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

  const getApy = async () => {
    await axios.get("https://api.dyp.finance/api/highest-apy").then((data) => {
      setapyData(data.data.highestAPY);
    });
  };

  const getETHdata = async () => {
    await axios
      .get("https://api.dyp.finance/api/the_graph_eth_v2")
      .then((data) => {
        setWethPrice(data.data.the_graph_eth_v2.usd_per_eth);
      });
  };

  const getBSCdata = async () => {
    await axios
      .get("https://api.dyp.finance/api/the_graph_bsc_v2")
      .then((data) => {
        setWbnbPrice(data.data.the_graph_bsc_v2.usd_per_eth);
      });
  };

  const getAVAXdata = async () => {
    await axios
      .get("https://api.dyp.finance/api/the_graph_avax_v2")
      .then((data) => {
        const wavaxPrice = data.data.the_graph_avax_v2.usd_per_eth;
        setWavaxPrice(wavaxPrice);
      });
  };



  useEffect(() => {
    getApy();
    getETHdata();
    getBSCdata();
    getAVAXdata();
  }, []);

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
    if (apyData) {
      if (activeMethod === "Farming") {
        if (activeChain.text === "ETH") {
          setFarmApy(apyData.highestAPY_ETH_V2);
        } else if (activeChain.text === "BSC") {
          setFarmApy(apyData.highestAPY_BSC_V2);
        } else {
          setFarmApy(apyData.highestAPY_AVAX_V2);
        }
      } else if (activeMethod === "Staking") {
        setStakeApy(25);
      } else if (activeMethod === "Buyback") {
        getTotalTvlBuyBack().then();
      } else {
        setVaultApy(18.43);
      }
    }
  }, [activeChain.text, activeMethod, apyData]);

  useEffect(() => {

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
    }
     else if (activeMethod === "Staking") {
      
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
    wethPrice,
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
      setActiveTimePill(timePillsArray[0])

    } else if (parseInt(e) > 30 && parseInt(e) < 92) {
      setActiveTime(timePillsArray[1]);
      setActiveTimePill(timePillsArray[1])

    } else if (parseInt(e) > 92 && parseInt(e) < 185) {
      setActiveTime(timePillsArray[2]);
      setActiveTimePill(timePillsArray[2])

    } else if (parseInt(e) > 185) {
      setActiveTime(timePillsArray[3]);
      setActiveTimePill(timePillsArray[3])

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
    if (e === "Max") {
      setDays(365);
    }
  };

  const handleInputUSD = (e) => {
    setUsdToDeposit(e);
  };
  let navigate = useHistory();
  const gotoEarn = () => {
    navigate.push("/earn");
  };

  const [chainState, setchainState] = useState("eth");
  const [activePill, setActivePill] = useState(pillsNames[0]);
  const pillRef = useRef([]);

  const [activeTimePill, setActiveTimePill] = useState(timePillsArray[3]);
  const timepillRef = useRef([]);

  return (
    <div className="calculator-wrapper">
      <div className="purple-div"></div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-column gap-2 justify-content-between">
          <div className="d-flex justify-content-between gap-2 align-items-center pb-4">
            <h6 className="d-flex gap-2 align-items-center calc-title">
              <img src={calculator} alt="" /> Calculator
            </h6>
            <DropdownButton
              id="dropdown-basic-button3"
              title={
                <span className="dropdown-title">
                  <img
                    src={
                      chainState === "eth"
                        ? eth
                        : chainState === "bnb"
                        ? bnb
                        : avax
                    }
                    alt=""
                  />
                  {chainState === "eth"
                    ? "Ethereum"
                    : chainState === "bnb"
                    ? "BNB Chain"
                    : "Avalanche"}
                  {/* <img src={dropdown} alt="" /> */}
                </span>
              }
            >
              <Dropdown.Item
                onClick={() => {
                  setchainState("eth");
                  setActiveChain(chainButtonsArray[0]);
                }}
              >
                <img src={eth} alt="" />
                Ethereum
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setchainState("bnb");
                  setActiveChain(chainButtonsArray[1]);
                }}
              >
                <img src={bnb} alt="" />
                BNB Chain
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setchainState("avax");
                  setActiveChain(chainButtonsArray[2]);
                }}
              >
                <img src={avax} alt="" />
                Avalanche
              </Dropdown.Item>
            </DropdownButton>
          </div>
          <div className="pills-container row m-0">
            {pillsNames &&
              pillsNames.length > 0 &&
              pillsNames.map((item, id) => (
                <p
                  key={id}
                  onClick={() => {
                    setActivePill(item);
                    getActivePill(item);
                  }}
                  className={`pill-item ${
                    activePill == item ? "active-color" : ""
                  }`}
                  ref={(el) => (pillRef.current[id] = el)}
                  style={{
                    background:
                      activePill == item
                        ? "rgba(248, 132, 91, 0.2)"
                        : "rgba(20, 20, 42, 0.2)",
                    color: activePill == item ? "#f8845b" : "#7770e0",
                    border:
                      activePill == item
                        ? "1px solid #f8845b"
                        : "1px solid #7770e0",
                  }}
                >
                  {item}
                </p>
              ))}
          </div>
          <div className="separator"></div>
          <div className="row justify-content-between align-items-center gap-2 m-0">
            <div
              className="inputwrapper position-relative"
              style={{ width: "fit-content", paddingLeft: 0 }}
            >
              <h6 className="inputlabel position-absolute">
                Days<h6 className="requiredstar">*</h6>
              </h6>
              <input
                type="text"
                className="form-control calcinput"
                id="days"
                name="days"
                value={days}
                onChange={(e) => handleInputDays(e.target.value)}
              />
            </div>
            <div className="time-pills-container row m-0">
              {timePillsArray.length > 0 &&
                timePillsArray.map((item, id) => (
                  <p
                    key={id}
                    className={`time-pill-item`}
                    ref={(el) => (timepillRef.current[id] = el)}
                    onClick={() => {
                      setActiveTimePill(item);
                      handleInputDays2(item);
                    }} // ref={(el) => (pillRef.current[id] = el)}
                    style={{
                      background:
                        activeTimePill == item
                          ? "linear-gradient(90.74deg, #7770E0 0%, #554FD8 100%)"
                          : "transparent",
                      color: activeTimePill == item ? "#F7F7FC" : "#6E7191",
                      border: "none",
                    }}
                  >
                    {item}
                  </p>
                ))}
            </div>
          </div>
          <div className="d-flex justify-content-between gap-2 align-items-center mt-2">
            <div className="inputwrapper position-relative">
              <h6 className="inputlabel position-absolute">
                USD to deposit<h6 className="requiredstar">*</h6>
              </h6>
              <input
                type="text"
                className="form-control calcinput w-100"
                id="usd_to_deposit"
                name="usd_to_deposit"
                value={usdToDeposit}
                onChange={(e) => handleInputUSD(e.target.value)}
              />
            </div>
            <h6 className="output-txt">
              ${calculateApproxUSD === "NaN" ? "0.0" : calculateApproxUSD}
              <h6 className="cryptotext">
                Approx. (
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
              </h6>
            </h6>
          </div>
          <div className="d-flex justify-content-between gap-2 align-items-center mt-3">
            <button
              className="earnbtn btn"
              onClick={() => {
                gotoEarn();
              }}
            >
              Earn now <img src={rightarrow} alt="" />{" "}
            </button>
            <h6 className="calc-footer">
              *This calculator is for informational purposes only. Calculated
              yields assume that prices of the deposited assets don't change.
            </h6>
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

  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
};

export default Calculator;

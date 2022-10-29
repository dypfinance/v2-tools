import { NavLink } from "react-router-dom";
import "./header.css";
import getFormattedNumber from "../../functions/get-formatted-number";
import React, { useEffect, useState } from "react";
import coin from "./assets/coins.svg";
import avax from "./assets/avax.svg";
import bnb from "./assets/bnb.svg";
import eth from "./assets/eth.svg";
import dropdown from './assets/dropdown.svg'


const Header = ({ toggleMobileSidebar, toggleTheme, theme, network }) => {
  const [gasPrice, setGasprice] = useState();
  const [ethPrice, setEthprice] = useState();
  // const [chainId, setChainId] = useState(1)

  let chainId = parseInt(network);

  // const checkNetworkId = () => {
  //     if(window.ethereum) {
  //         window.ethereum.request({ method: "net_version" })
  //             .then((data) => {
  //                 setChainId(Number(data))
  //                 fetchData()
  //             })
  //             .catch(console.error);
  //     }
  //     else {
  //         setChainId(1)
  //     }
  // }

  const [hotpairs, setHotpairs] = useState([]);


  const [ethState, setEthState] = useState(true);
  const [bnbState, setBnbState] = useState(false);
  const [avaxState, setAvaxState] = useState(false);

  const handleEthPool = () => {
    setAvaxState(false);
    setBnbState(false);
    setEthState(true);
  };

  const handleBnbPool = () => {
    setAvaxState(false);
    setBnbState(true);
    setEthState(false);
  };

  const handleAvaxPool = () => {
    setAvaxState(true);
    setBnbState(false);
    setEthState(false);
  };



  const fetchData = async () => {
    if (chainId === 1) {
      await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
      )
        .then((res) => res.json())
        .then((data) => setEthprice(data.ethereum.usd))
        .catch(console.error);

      await fetch(
        "https://ethgasstation.info/api/ethgasAPI.json?api-key=free_key"
      )
        .then((res) => res.json())
        .then((data) => setGasprice(data.average / 10))
        .catch(console.error);
    }

    if (chainId === 43114) {
      await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=avalanche-2&vs_currencies=usd"
      )
        .then((res) => res.json())
        .then((data) => setEthprice(data["avalanche-2"]["usd"]))
        .catch(console.error);

      await fetch("https://api.dyp.finance/api/bridged_on_avalanche")
        .then((res) => res.json())
        .then((data) => setGasprice(data))
        .catch(console.error);
    }
  };

  const refreshHotPairs = async () => {
    window.$.get(
      `${
        chainId === 1
          ? "https://app-tools.dyp.finance"
          : "https://app-tools-avax.dyp.finance"
      }/api/hot-pairs`
    )
      // window.$.get(`${API_BASEURL}/api/hot-pairs`)
      .then(({ hotPairs }) => {
        setHotpairs(hotPairs);
      })
      .catch(console.error);
  };

  const ethereum = window.ethereum;

  function handleChainChanged() {
    // We recommend reloading the page, unless you must do otherwise
    // window.location.reload()
    if (window.location.href.includes("pair-explorer")) {
      if (chainId === 1) {
        window.location.assign(
          "/pair-explorer/0x497070e8b6c55fd283d8b259a6971261e2021c01"
        );
      } else {
        window.location.assign(
          "/pair-explorer/0x76911e11fddb742d75b83c9e1f611f48f19234e4"
        );
      }
    }
  }

  useEffect(() => {
    fetchData().then();
    refreshHotPairs().then();
    // checkNetworkId()
    ethereum?.on("chainChanged", handleChainChanged);
    ethereum?.on("accountChanged", handleChainChanged);
  }, [chainId]);

  return (
    <header className="header-wrap" style={{ zIndex: 777 }}>
      <div className="d-flex m-0 justify-content-between gap-3 align-items-center">
        <div className="d-flex flex-column gap-2 text-start">
          <h4 className="text-white">Good morning, Dwight</h4>
          <span className="text-white headerdesc">Good morning, Stewie</span>
        </div>
        <div className="d-flex m-0 justify-content-between gap-3 align-items-center">
          <button className="buydyp-btn btn">
            <img src={coin} alt="" /> Buy
          </button>
          <div>
          <div className="dropdown">
             
              <div
                className="coins d-flex justify-content-between align-items-center"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{
                  borderColor:
                    ethState === true
                      ? "#566FCE"
                      : bnbState === true
                      ? "#D5A404"
                      : "#E84142",
                }}
              >
                {ethState === true ? (
                  <div
                    className="d-flex flex-row align-items-center justify-content-start gap-2"
                    style={{
                      cursor: "pointer",
                      color: "#566FCE",
                      fontSize: 12,
                    }}
                  >
                    <img src={eth} alt=""  />
                    ETH
                  </div>
                ) : bnbState === true ? (
                  <div
                    className="d-flex flex-row align-items-center justify-content-start gap-2"
                    style={{
                      cursor: "pointer",
                      color: "#D5A404",
                      fontSize: 12,
                    }}
                  >
                    <img src={bnb} alt=""  />
                    BNB
                  </div>
                ) : (
                  <div
                    className="d-flex flex-row align-items-center justify-content-start gap-2"
                    style={{
                      cursor: "pointer",
                      color: "#E84142",
                      fontSize: 12,
                    }}
                  >
                    <img src={avax} alt=""  />
                    AVAX
                  </div>
                )}
                <img src={dropdown} alt=""  />
              </div>
              <ul className="dropdown-menu coin-menu p-1">
                <li
                  className="d-flex flex-row align-items-center justify-content-start gap-3 py-3 mx-2 coin"
                  onClick={() => handleEthPool()}
                  style={{ color: "#566FCE" }}
                >
                  <img src={dropdown} alt=""  /> ETH
                </li>
                <li
                  className="d-flex flex-row align-items-center justify-content-start gap-3 py-3 mx-2 coin"
                  onClick={() => handleBnbPool()}
                  style={{ color: "#D5A404" }}
                >
                  <img src={dropdown} alt=""  /> BNB
                </li>
                <li
                  className="d-flex flex-row align-items-center justify-content-start gap-3 py-3 mx-2 coin"
                  onClick={() => handleAvaxPool()}
                  style={{ color: "#E84142" }}
                >
                  <img src={dropdown} alt=""  /> AVAX
                </li>
              </ul>
            </div>

            {/* <button className="buydyp-btn btn">
               Connect
            </button> */}

          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

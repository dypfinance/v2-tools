import "./header.css";
import Web3 from "web3";
import getFormattedNumber from "../../functions/get-formatted-number";
import React, { useEffect, useState } from "react";
import coin from "./assets/coins.svg";
import avax from "./assets/avax.svg";
import bnb from "./assets/bnb.svg";
import eth from "./assets/eth.svg";
import dropdown from "./assets/dropdown.svg";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { shortAddress } from "../../functions/shortAddress";
import ellipse from "./assets/ellipse.svg";
import user from "./assets/user.svg";
import logoutimg from "./assets/logout.svg";
import walletIcon from "./assets/walletIcon.svg";
import WalletModal from "../WalletModal";
import { handleSwitchNetworkhook } from "../../functions/hooks";
import { NavLink } from "react-router-dom";
import useWindowSize from '../../functions/useWindowSize'
import toolsLogo from '../../assets/sidebarIcons/toolsLogo.svg'

const Header = ({
  toggleMobileSidebar,
  toggleTheme,
  theme,
  network,
  coinbase,
  logout,
  handleSwitchNetwork,
  showModal,
  show,
  hideModal,
  handleConnection,
  isConnected,
}) => {
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

  const windowSize = useWindowSize()
  const [hotpairs, setHotpairs] = useState([]);

  const [ethState, setEthState] = useState(true);
  const [bnbState, setBnbState] = useState(false);
  const [avaxState, setAvaxState] = useState(false);
  const [avatar, setAvatar] = useState("../../assets/img/person.svg");

  const handleEthPool = () => {
    handleSwitchNetworkhook("0x1");
  };

  const handleBnbPool = () => {
    handleSwitchNetworkhook("0x38");
  };

  const handleAvaxPool = () => {
    handleSwitchNetworkhook("0xa86a");
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
    window.location.reload();
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

  const fetchAvatar = async () => {
    const response = await fetch(
      `https://api-image.dyp.finance/api/v1/avatar/${coinbase}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data.avatar
          ? setAvatar(data.avatar)
          : setAvatar("/assets/img/person.svg");
      })
      .catch(console.error);

    return response;
  };

  const [currencyAmount, setCurrencyAmount] = useState(0);
  const checklogout = localStorage.getItem("logout");

  const getEthBalance = async () => {
    if (checklogout === "false" && coinbase) {
      const balance = await ethereum.request({
        method: "eth_getBalance",
        params: [coinbase, "latest"],
      });
      if (balance) {
        const infuraWeb3 = new Web3(window.config.infura_endpoint);
        const bscWeb3 = new Web3(window.config.bsc_endpoint);
        const avaxWeb3 = new Web3(window.config.avax_endpoint);

        if (chainId === 1) {
          const stringBalance = infuraWeb3.utils.hexToNumberString(balance);
          const amount = infuraWeb3.utils.fromWei(stringBalance, "ether");
          setCurrencyAmount(amount.slice(0, 7));
        }

        if (chainId === 43114) {
          const stringBalance = avaxWeb3.utils.hexToNumberString(balance);
          const amount = avaxWeb3.utils.fromWei(stringBalance, "ether");
          setCurrencyAmount(amount.slice(0, 7));
        }

        if (chainId === 56) {
          const stringBalance = bscWeb3.utils.hexToNumberString(balance);
          const amount = bscWeb3.utils.fromWei(stringBalance, "ether");
          setCurrencyAmount(amount.slice(0, 7));
        }
      }
    }
  };


  

  useEffect(() => {
    getEthBalance();
  }, [chainId]);

  useEffect(() => {
    fetchData().then();
    refreshHotPairs().then();
    // checkNetworkId()
    ethereum?.on("chainChanged", handleChainChanged);
    ethereum?.on("accountChanged", handleChainChanged);

    if (chainId === 1) {
      setAvaxState(false);
      setBnbState(false);
      setEthState(true);
    } else if (chainId === 43114) {
      setAvaxState(true);
      setBnbState(false);
      setEthState(false);
    } else if (chainId === 56) {
      setAvaxState(false);
      setBnbState(true);
      setEthState(false);
    }
  }, [chainId]);

  useEffect(() => {
    fetchAvatar();
  }, [coinbase, checklogout]);

  return (
    <>
      <header className="header-wrap" style={{ zIndex: 5 }}>
        <div className="container-fluid d-flex justify-content-center justify-content-lg-start">
          <div className="row w-100">
            <div className="col-1"></div>
            <div className={`${windowSize.width < 786 ?'col-12' : windowSize.width < 1490 ? 'col-11' : 'col-10'}`}>
            <div
          className="container-lg px-0 d-flex justify-content-between gap-3 align-items-center w-100"
          // style={{ maxWidth: "calc(100% - 215px)"}}
        >
          {/* marginLeft: "240px" */}
          <div className="d-none d-lg-flex flex-column gap-2 text-start">
            <h4
              className="text-white"
              style={{ fontSize: "23px", fontWeight: "600" }}
            >
              Good morning, James
            </h4>
            <span className="text-white headerdesc">
            Discover the latest trends, breaking news and gain access to powerful dApps.
            </span>
          </div>
          <img src={toolsLogo} className="d-flex d-lg-none" alt="" />
          <div className="d-flex m-0 justify-content-between gap-3 align-items-center">
            <NavLink
              className="buydyp-btn btn"
              to="/buydyp"
            >
              <img src={coin} alt="" /> 
              <span className="buy-dyp-text d-none d-lg-flex">Buy DYP</span>
            </NavLink>
            <div className="d-flex justify-content-between gap-3 align-items-center">
              <DropdownButton
                id="dropdown-basic-button"
                title={
                  <span className="dropdown-title">
                    <img
                      src={
                        ethState === true ? eth : bnbState === true ? bnb : avax
                      }
                      alt=""
                    />
                    <span className="change-chain-text d-none d-lg-flex">
                    {ethState === true
                      ? "Ethereum"
                      : bnbState === true
                      ? "BNB Chain"
                      : "Avalanche"}
                    </span>

                    <img src={dropdown} alt="" />
                  </span>
                }
              >
                <Dropdown.Item onClick={() => handleEthPool()}>
                  <img src={eth} alt="" />
                  Ethereum
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleBnbPool()}>
                  <img src={bnb} alt="" />
                  BNB Chain
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleAvaxPool()}>
                  <img src={avax} alt="" />
                  Avalanche
                </Dropdown.Item>
              </DropdownButton>

              {/* <DropdownButton
                id="dropdown-basic-button2"
                onClick={checklogout === "true" && showModal}
                title={
                  <span className="dropdown-title walletaccount">
                    {checklogout === "false" && (
                      <img
                        src={avatar}
                        style={{
                          height: 18,
                          borderRadius: "50%",
                          border: "1px solid #00D849",
                        }}
                        alt=""
                      />
                    )}
                    {checklogout === "false" ? (
                      shortAddress(coinbase)
                    ) : (
                      <span className="d-flex align-items-center gap-2 connecttitle position-relative" style={{bottom: '5px'}}>
                        <img
                          src={walletIcon}
                          alt=""
                          className="position-relative"
                          // style={{ top: 4 }}
                        />
                        Connect Wallet
                      </span>
                    )}
                    {checklogout === "false" && <img src={dropdown} alt="" />}
                  </span>
                }
              >
                <Dropdown.Item
                  onClick={() => window.location.assign("/account")}
                >
                  <img src={user} alt="" />
                  Your account
                </Dropdown.Item>
                {checklogout === "false" && (
                  <Dropdown.Item onClick={() => logout()}>
                    <img src={logoutimg} alt="" />
                    Disconnect wallet
                  </Dropdown.Item>
                )}
              </DropdownButton> */}
              {checklogout === "false" ? (
                <>
                  <div className="account-info d-flex align-items-center justify-content-center gap-3">
                    <span className="account-balance">
                      {currencyAmount}{" "}
                      {chainId === 1 ? "ETH" : chainId === 56 ? "BNB" : "AVAX"}
                    </span>
                    <span className="account-address">
                      {shortAddress(coinbase)}
                    </span>
                  </div>
                  <DropdownButton
                    id="dropdown-basic-button4"
                    title={
                      <img
                        src={avatar}
                        style={{
                          height: 40,
                          width: 40,
                          borderRadius: "50%",
                          border: "2px solid #4ED5D2",
                          margin: "auto",
                        }}
                        alt=""
                      />
                    }
                  >
                    <Dropdown.Item
                      onClick={() => window.location.assign("/account")}
                    >
                      <img src={user} alt="" />
                      My account
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => logout()}>
                      <img src={logoutimg} alt="" />
                      Disconnect wallet
                    </Dropdown.Item>
                  </DropdownButton>
                </>
              ) : (
                <DropdownButton
                  onClick={checklogout === "true" && showModal}
                  id="dropdown-basic-button2"
                  title={
                    <div
                      className="d-flex align-items-center gap-2  position-relative"
                      style={{ bottom: "5px", fontSize: "12px" }}
                    >
                      <img
                        src={walletIcon}
                        alt=""
                        className="position-relative"
                        // style={{ top: 4 }}
                      />
                      <span className="connecttitle d-none d-lg-flex">Connect Wallet</span>
                    </div>
                  }
                ></DropdownButton>
              )}
            </div>
          </div>
        </div>
            </div>
            <div className="col-1"></div>
          </div>
        </div>
      </header>

      {show && (
        <WalletModal
          show={show}
          handleClose={hideModal}
          handleConnection={handleConnection}
        />
      )}
    </>
  );
};

export default Header;

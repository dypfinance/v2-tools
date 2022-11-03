import { NavLink } from "react-router-dom";
import "./header.css";
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
import WalletModal from "../WalletModal";

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

  const [hotpairs, setHotpairs] = useState([]);

  const [ethState, setEthState] = useState(true);
  const [bnbState, setBnbState] = useState(false);
  const [avaxState, setAvaxState] = useState(false);
  const [avatar, setAvatar] = useState("../../assets/img/person.svg");

  const handleEthPool = () => {

    handleSwitchNetwork(1)
  };

  const handleBnbPool = () => {
    setAvaxState(false);
    setBnbState(true);
    setEthState(false);
  };

  const handleAvaxPool = () => {
    handleSwitchNetwork(43114)
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

  const checklogout = localStorage.getItem("logout");

  useEffect(() => {
    fetchData().then();
    refreshHotPairs().then();
    // checkNetworkId()
    ethereum?.on("chainChanged", handleChainChanged);
    ethereum?.on("accountChanged", handleChainChanged);

    if(chainId === 1) {
      setAvaxState(false); setBnbState(false); setEthState(true)
    }

    else if(chainId === 43114) {
      setAvaxState(true); setBnbState(false); setEthState(false)
    }
  }, [chainId]);

  useEffect(() => {
    fetchAvatar();
  }, [coinbase, checklogout]);

  return (
    <>
      <header className="header-wrap " style={{ zIndex: 5 }}>
        <div className="container-lg d-flex m-0 justify-content-between gap-3 align-items-center w-100">
          <div className="d-flex flex-column gap-2 text-start">
            <h4 className="text-white">Good morning, Dwight</h4>
            <span className="text-white headerdesc">Good morning, Stewie</span>
          </div>
          <div className="d-flex m-0 justify-content-between gap-3 align-items-center">
            <a
              className="buydyp-btn btn"
              href={
                chainId === 1
                  ? "https://app.uniswap.org/#/swap?outputCurrency=0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17"
                  : "https://app.pangolin.exchange/#/swap?outputCurrency=0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17"
              }
              target={'_blank'} rel="noreferrer"
            >
              <img src={coin} alt="" /> Buy
            </a>
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
                    {ethState === true
                      ? "ETH"
                      : bnbState === true
                      ? "BNB"
                      : "AVAX"}
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

              <DropdownButton
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
                      <span className="d-flex align-items-center connecttitle">
                        Connect
                        <img
                          src={ellipse}
                          alt=""
                          className="position-relative"
                          style={{ top: 4 }}
                        />
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
              </DropdownButton>
            </div>
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

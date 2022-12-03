import React, { useState } from "react";
import ethStake from "../../../assets/earnAssets/ethStake.svg";
import bnbStake from "../../../assets/earnAssets/bnbStake.svg";
import avaxStake from "../../../assets/earnAssets/avaxStake.svg";
import ethStakeActive from "../../../assets/earnAssets/ethStakeActive.svg";
import bnbStakeActive from "../../../assets/earnAssets/bnbStakeActive.svg";
import avaxStakeActive from "../../../assets/earnAssets/avaxStakeActive.svg";
import addNewPools from "../../../assets/earnAssets/addNewPools.svg";
import listIcon from "../../../assets/earnAssets/listIcon.svg";
import tableIcon from "../../../assets/earnAssets/tableIcon.svg";
import tableIconActive from "../../../assets/earnAssets/tableIconActive.svg";
import listIconActive from "../../../assets/earnAssets/listIconActive.svg";
import EarnTopPicks from "../EarnTopPicks/EarnTopPicks";
import EarnFaq from "../EarnFaq/EarnFaq";
import axios from "axios";
import { useEffect } from "react";
import getFormattedNumber from "../../../functions/getFormattedNumber2";
import e from "cors";
import { useRef } from "react";

const EarnContent = ({
  coinbase,
  the_graph_result,
  lp_id,
  isConnected,
  chainId,
  handleConnection,
  the_graph_resultavax,
  the_graph_resultbsc,
  referrer,
  routeOption, 
  routeChain, 
  routeSection
}) => {
  const options = [
    {
      title: "Staking",
      content:
        "Staking ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut ipsum quis ligula commodo sollicitudin ut dictum augue. Curabitur massa justo",
      tvl: 244533.54234234,
    },
    {
      title: "Buyback",
      content:
        "Buyback ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut ipsum quis ligula commodo sollicitudin ut dictum augue. Curabitur massa justo",
      tvl: 53312.422334,
    },
    {
      title: "Vault",
      content:
        "Vault ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut ipsum quis ligula commodo sollicitudin ut dictum augue. Curabitur massa justo",
      tvl: 1122553.74424,
    },
    {
      title: "Farming",
      content:
        "Farming ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut ipsum quis ligula commodo sollicitudin ut dictum augue. Curabitur massa justo",
    },
  ];

  const [stake, setStake] = useState(routeChain);
  const [option, setOption] = useState(routeOption);
  const [content, setContent] = useState(options[0].content);
  const [listStyle, setListStyle] = useState("table");
  const [myStakes, setMyStakes] = useState(false);
  const [tvl, setTvl] = useState(options[0].tvl);
  var tempTvl = 0;
  var farming = [];



  const fetchEthTvl = async () => {
    await axios
      .get(`https://api.dyp.finance/api/the_graph_eth_v2`)
      .then((res) => {
        let temparray = Object.entries(res.data.the_graph_eth_v2.lp_data);
        temparray.map((item) => {
          farming.push(item[1]);
        });
        farming.map((item) => {
          tempTvl += item.tvl_usd;
        });

        setTvl(tempTvl);
        tempTvl = 0;
      })
      .catch((err) => console.error(err));
  };

  const fetchBscTvl = async () => {
    await axios
      .get(`https://api.dyp.finance/api/the_graph_bsc_v2`)
      .then((res) => {
        let temparray = Object.entries(res.data.the_graph_bsc_v2.lp_data);
        temparray.map((item) => {
          farming.push(item[1]);
        });
        farming.map((item) => {
          tempTvl += item.tvl_usd;
        });

        setTvl(tempTvl);
        tempTvl = 0;
      })
      .catch((err) => console.error(err));
  };

  // useEffect(() => {
  //   if(routeOption === null){
  //     setOption("Staking")
  //   }else{
  //     setOption(routeOption)
  //   }
  
  //   if(routeChain === null){
  //     setStake("eth")
  //   }else{
  //     setStake(routeChain)
  //   }
  
  // }, [])
  

  const fetchAvaxTvl = async () => {
    await axios
      .get(`https://api.dyp.finance/api/the_graph_avax_v2`)
      .then((res) => {
        let temparray = Object.entries(res.data.the_graph_avax_v2.lp_data);
        temparray.map((item) => {
          farming.push(item[1]);
        });
        farming.map((item) => {
          tempTvl += item.tvl_usd;
        });

        setTvl(tempTvl);
        tempTvl = 0;
      })
      .catch((err) => console.error(err));
  };

 

  return (
    <>
      <div className="row justify-content-center w-100">
        <div className="row justify-content-between align-items-center p-2 options-container" style={{marginTop: '30px', marginBottom: '40px'}}>
          <div className="col-2 d-flex justify-content-start align-items-center gap-3">
            <div
              className={`list-style ${
                listStyle === "table" && "list-style-active"
              }`}
              onClick={() => setListStyle("table")}
            >
              <img
                src={listStyle === "table" ? tableIconActive : tableIcon}
                alt=""
              />
            </div>
            <div
              className={`list-style ${
                listStyle === "list" && "list-style-active"
              }`}
              onClick={() => setListStyle("list")}
            >
              <img
                src={listStyle === "list" ? listIconActive : listIcon}
                alt=""
              />
            </div>
          </div>
          <div className="col-8 row d-flex gap-0 gap-xl-3 justify-content-center p-2">
            {options.map((item, index) => (
              <div
                className={`earn-option col-3 col-xl-2 d-flex align-items-center justify-content-center ${
                  option === item.title ? "earn-option-active" : null
                }`}
                key={index}
                onClick={() => {
                  setOption(item.title);
                  setContent(item.content);
                  item.tvl
                    ? setTvl(item.tvl)
                    : stake === "eth"
                    ? fetchEthTvl()
                    : stake === "bnb"
                    ? fetchBscTvl()
                    : fetchAvaxTvl();
                }}
              >
                <img
                  src={
                    require(`../../calculator/assets/${item.title.toLowerCase()}Icon.svg`)
                      .default
                  }
                  alt=""
                />
                {item.title}
              </div>
            ))}
          </div>
          <div className="col-2 d-flex justify-content-end align-items-center gap-3">
            <div
              className={`pill-box ${myStakes && "pill-box-active"}`}
              onClick={() => setMyStakes(!myStakes)}
            >
              <div className="pill"></div>
            </div>
            <h5 className="text-white" style={{fontSize: '16px', whiteSpace: 'nowrap' }}>My pools</h5>
          </div>
        </div> 

        <div className="row align-items-center justify-content-between px-0" style={{minHeight: '52px'}}>
          <div className="col-4 col-xl-3 px-0">
            <div className="total-value-locked-container p-2 d-flex justify-content-between align-items-center">
              <span style={{ fontWeight: "300", fontSize: "13px" }}>
                Total value locked
              </span>
              <h6
                className="text-white"
                style={{ fontWeight: "600", fontSize: "17px" }}
              >
                ${getFormattedNumber(tvl)}
              </h6>
            </div>
          </div>
          <div className="col-8 col-xl-6 d-flex gap-3 justify-content-end justify-content-xl-center px-0 px-xl-2">
            {option !== "Vault" && (
              <>
                <div
                  className={`stake-item position-relative d-flex align-items-center gap-2 ${
                    stake === "eth" ? "eth-item-active" : null
                  }`}
                  onClick={() => {
                    setStake("eth");
                    fetchEthTvl();
                  }}
                >
                  <img
                    src={stake === "eth" ? ethStakeActive : ethStake}
                    alt=""
                  />
                  <div className="d-flex flex-column">
                    <p
                      className="text-white"
                      style={{ fontSize: "12px", fontWeight: "300" }}
                    >
                      Ethereum
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                        fontWeight: "500",
                        color: "#f7f7fc",
                      }}
                    >
                      25% APR
                    </p>
                  </div>
                </div>
                <div
                  className={`stake-item position-relative d-flex align-items-center gap-2 ${
                    stake === "bnb" ? "bsc-item-active" : null
                  }`}
                  onClick={() => {
                    setStake("bnb");
                    fetchBscTvl();
                  }}
                >
                  <div className="new-pools d-flex justify-content-start align-items-center gap-2 position-absolute">
                    <img
                      src={addNewPools}
                      alt=""
                      style={{ width: "15px", height: "15px" }}
                    />
                    <span className="text-white" style={{ fontSize: "11px" }}>
                      New Pools
                    </span>
                  </div>
                  <img
                    src={stake === "bnb" ? bnbStakeActive : bnbStake}
                    alt=""
                  />
                  <div className="d-flex flex-column">
                    <p
                      className="text-white"
                      style={{ fontSize: "12px", fontWeight: "300" }}
                    >
                      BNB Chain
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                        fontWeight: "500",
                        color: "#f7f7fc",
                      }}
                    >
                      25% APR
                    </p>
                  </div>
                </div>
                <div
                  className={`stake-item position-relative d-flex align-items-center gap-2 ${
                    stake === "avax" ? "avax-item-active" : null
                  }`}
                  onClick={() => {
                    setStake("avax");
                    fetchAvaxTvl();
                  }}
                >
                  <div className="new-pools d-flex justify-content-start align-items-center gap-2 position-absolute">
                    <img
                      src={addNewPools}
                      alt=""
                      style={{ width: "15px", height: "15px" }}
                    />
                    <span className="text-white" style={{ fontSize: "11px" }}>
                      New Pools
                    </span>
                  </div>
                  <img
                    src={stake === "avax" ? avaxStakeActive : avaxStake}
                    alt=""
                  />
                  <div className="d-flex flex-column">
                    <p
                      className="text-white"
                      style={{ fontSize: "12px", fontWeight: "300" }}
                    >
                      Avalanche
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                        fontWeight: "500",
                        color: "#f7f7fc",
                      }}
                    >
                      25% APR
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="col-3"></div>
        </div>
        <div className="d-flex align-items-center justify-content-center  py-4 px-3"></div>
      </div>
      <EarnTopPicks
        topList={option}
        listType={listStyle}
        chain={stake}
        coinbase={coinbase}
        the_graph_result={the_graph_result}
        lp_id={lp_id}
        isConnected={isConnected}
        chainId={chainId}
        handleConnection={handleConnection}
        the_graph_resultavax={the_graph_resultavax}
        the_graph_resultbsc={the_graph_resultbsc}
        referrer={referrer}
      />
      <EarnFaq faqTypes={option}  />
    </>
  );
};

export default EarnContent;

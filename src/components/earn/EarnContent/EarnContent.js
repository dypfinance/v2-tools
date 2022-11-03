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

const EarnContent = ({coinbase, the_graph_result, lp_id, isConnected}) => {
  const options = [
    {
      title: "Staking",
      content:
        "Staking ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut ipsum quis ligula commodo sollicitudin ut dictum augue. Curabitur massa justo",
    },
    {
      title: "Buyback",
      content:
        "Buyback ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut ipsum quis ligula commodo sollicitudin ut dictum augue. Curabitur massa justo",
    },
    {
      title: "Vault",
      content:
        "Vault ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut ipsum quis ligula commodo sollicitudin ut dictum augue. Curabitur massa justo",
    },
    {
      title: "Farming",
      content:
        "Farming ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut ipsum quis ligula commodo sollicitudin ut dictum augue. Curabitur massa justo",
    },
  ];

  const [stake, setStake] = useState("eth");
  const [option, setOption] = useState("Staking");
  const [content, setContent] = useState(options[0].content);
  const [listStyle, setListStyle] = useState("table");
  const [myStakes, setMyStakes] = useState(false);

  return (
    <>
      <div className="row justify-content-center">
        <div className="d-flex gap-3 justify-content-center p-5">
          {options.map((item, index) => (
            <div
              className={`earn-option ${
                option === item.title ? "earn-option-active" : null
              }`}
              key={index}
              onClick={() => {
                setOption(item.title);
                setContent(item.content);
              }}
            >
              {item.title}
            </div>
          ))}
        </div>
        <div className="col-6">
          <p
            className="text-center"
            style={{ color: "#7A81B4", fontSize: "13px", fontWeight: "400" }}
          >
            {content}
          </p>
        </div>
        <hr />
        <div className="d-flex align-items-center justify-content-between  py-5 px-3">
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
          <div className="col-8 d-flex gap-3 justify-content-center">
            {option !== "Vault" && (
              <>
                <div
                  className={`stake-item position-relative d-flex align-items-center gap-2 ${
                    stake === "eth" ? "stake-item-active" : null
                  }`}
                  onClick={() => setStake("eth")}
                >
                  <img
                    src={stake === "eth" ? ethStakeActive : ethStake}
                    alt=""
                  />
                  <div className="d-flex flex-column">
                    <p
                      className="text-white"
                      style={{ fontSize: "11px", fontWeight: "300" }}
                    >
                      ETH Stake
                    </p>
                    <p
                      style={{
                        fontSize: "11px",
                        fontWeight: "500",
                        color: "#C0CBF7",
                      }}
                    >
                      25% APR
                    </p>
                  </div>
                </div>
                <div
                  className={`stake-item position-relative d-flex align-items-center gap-2 ${
                    stake === "bnb" ? "stake-item-active" : null
                  }`}
                  onClick={() => setStake("bnb")}
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
                      style={{ fontSize: "11px", fontWeight: "300" }}
                    >
                      BSC Stake
                    </p>
                    <p
                      style={{
                        fontSize: "11px",
                        fontWeight: "500",
                        color: "#C0CBF7",
                      }}
                    >
                      25% APR
                    </p>
                  </div>
                </div>
                <div
                  className={`stake-item position-relative d-flex align-items-center gap-2 ${
                    stake === "avax" ? "stake-item-active" : null
                  }`}
                  onClick={() => setStake("avax")}
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
                      style={{ fontSize: "11px", fontWeight: "300" }}
                    >
                      AVAX Stake
                    </p>
                    <p
                      style={{
                        fontSize: "11px",
                        fontWeight: "500",
                        color: "#C0CBF7",
                      }}
                    >
                      25% APR
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="col-2 d-flex justify-content-end align-items-center gap-3">
            <div
              className={`pill-box ${myStakes && "pill-box-active"}`}
              onClick={() => setMyStakes(!myStakes)}
            >
              <div className="pill"></div>
            </div>
            <h5 className="text-white">My Stakes</h5>
          </div>
        </div>
      </div>
      <EarnTopPicks topList={option} listType={listStyle} coinbase = {coinbase} the_graph_result = {the_graph_result} lp_id = {lp_id} isConnected = {isConnected}/>
    </>
  );
};

export default EarnContent;

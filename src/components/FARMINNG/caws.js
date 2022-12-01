import React, { useState, useEffect } from "react";
import Web3 from "web3";
import axios from "axios";
import moment from "moment";
import getFormattedNumber from "../../functions/get-formatted-number";
import { formattedNum } from "../../functions/formatUSD";

import Address from "./address";
import WalletModal from "../WalletModal";
import "./top-pools.css";
import dropdownVector from "./assets/dropdownVector.svg";
import ellipse from "./assets/ellipse.svg";
import empty from "./assets/empty.svg";
import check from "./assets/check.svg";
import failMark from "../../assets/failMark.svg";
import arrowup from "./assets/arrow-up.svg";
import whiteArrowUp from "./assets/whiteArrowUp.svg";
import moreinfo from "./assets/more-info.svg";
import stats from "./assets/stats.svg";
import purplestats from "./assets/purpleStat.svg";
import wallet from "./assets/wallet.svg";
import Tooltip from "@material-ui/core/Tooltip";
import Modal from "../Modal/Modal";
import Countdown from "react-countdown";
import statsLinkIcon from "./assets/statsLinkIcon.svg";
import { shortAddress } from "../../functions/shortAddress";
import xMark from "../calculator/assets/xMark.svg";
import weth from "./assets/weth.svg";
import NftStakeCheckListModal from "../caws/NftMinting/components/NftMinting/NftStakeChecklistModal/NftStakeChecklistModal";

const CawsDetails = ({ coinbase, isConnected, listType }) => {
  const [myNFTs, setMyNFTs] = useState([]);
  const [amountToStake, setamountToStake] = useState("");
  const [mystakes, setMystakes] = useState([]);
  const [color, setColor] = useState("#F13227");
  const [status, setStatus] = useState("");
  const [showApprove, setshowApprove] = useState(true);
  const [showChecklistModal, setshowChecklistModal] = useState(false);
  const [EthRewards, setEthRewards] = useState(0);
  const [showStaked, setshowStaked] = useState(true);
  const [showToStake, setshowToStake] = useState(false);
  const [ethToUSD, setethToUSD] = useState(0);
  const [openStakeChecklist, setOpenStakeChecklist] = useState(false);
  const [showUnstakeModal, setShowUnstakeModal] = useState(false);
  const [showClaimAllModal, setShowClaimAllModal] = useState(false);
  const [countDownLeft, setCountDownLeft] = useState(59000);

  const checkApproval = async () => {
    const address = coinbase;
    const stakeApr50 = await window.config.nftstaking_address50;

    if (address !== null) {
      const result = await window.nft
        .checkapproveStake(address, stakeApr50)
        .then((data) => {
          return data;
        });

      if (result === true) {
        setshowApprove(false);
        setStatus("");
        setColor("#939393");
      } else if (result === false) {
        setStatus(" *Please approve before deposit");
        setshowApprove(true);
      }
    }
  };

  const myNft = async () => {
    let myNft = await window.myNftListContract(coinbase);

    let nfts = myNft.map((nft) => window.getNft(nft));

    nfts = await Promise.all(nfts);

    nfts.reverse();

    setMyNFTs(nfts);
  };

  const getStakesIds = async () => {
    const address = coinbase;
    let staking_contract = await window.getContractNFT("NFTSTAKING");
    let stakenft = [];
    let myStakes = await staking_contract.methods
      .depositsOf(address)
      .call()
      .then((result) => {
        for (let i = 0; i < result.length; i++)
          stakenft.push(parseInt(result[i]));
        return stakenft;
      });

    return myStakes;
  };

  const myStakes = async () => {
    let myStakes = await getStakesIds();

    let stakes = myStakes.map((stake) => window.getNft(stake));

    stakes = await Promise.all(stakes);
    stakes.reverse();
    setMystakes(stakes);
  };

  const handleClaimAll = async () => {
    const address = coinbase;
    let myStakes = await getStakesIds();
    let calculateRewards = [];
    let result = 0;
    let staking_contract = await window.getContractNFT("NFTSTAKING");
    if (address !== null) {
      if (myStakes.length > 0) {
        calculateRewards = await staking_contract.methods
          .calculateRewards(address, myStakes)
          .call()
          .then((data) => {
            return data;
          });
      }
    }
    let a = 0;
    const infuraWeb3 = new Web3(window.config.infura_endpoint);
    for (let i = 0; i < calculateRewards.length; i++) {
      a = infuraWeb3.utils.fromWei(calculateRewards[i], "ether");

      result = result + Number(a);
    }

    setEthRewards(result);
  };

  const claimRewards = async () => {
    let myStakes = await getStakesIds();
    let staking_contract = await window.getContractNFT("NFTSTAKING");
    // setclaimAllStatus("Claiming all rewards, please wait...");
    await staking_contract.methods
      .claimRewards(myStakes)
      .send()
      .then(() => {
        setEthRewards(0);
        // setclaimAllStatus("Claimed All Rewards!");
      })
      .catch((err) => {
        // window.alertify.error(err?.message);
        // setclaimAllStatus("An error occurred, please try again");
      });
  };

  const convertEthToUsd = async () => {
    const res = axios
      .get("https://api.coinbase.com/v2/prices/ETH-USD/spot")
      .then((data) => {
        return data.data.data.amount;
      });
    return res;
  };

  const setUSDPrice = async () => {
    const ethprice = await convertEthToUsd();
    setethToUSD(Number(ethprice) * Number(EthRewards));
  };

  const calculateCountdown = async () => {
    const address = coinbase;

    let staking_contract = await window.getContractNFT("NFTSTAKING");
    if (address !== null) {
      let finalDay = await staking_contract.methods
        .stakingTime(address)
        .call()
        .then((data) => {
          return data;
        })
        .catch((err) => {
          // window.alertify.error(err?.message);
        });

      let lockup_time = await staking_contract.methods
        .LOCKUP_TIME()
        .call()
        .then((data) => {
          return data;
        })
        .catch((err) => {
          // window.alertify.error(err?.message);
        });

      finalDay = parseInt(finalDay) + parseInt(lockup_time);

      setCountDownLeft(parseInt(finalDay * 1000) - Date.now());
    }
  };

  const handleUnstakeAll = async () => {
    let myStakes = await getStakesIds();
    let stake_contract = await window.getContractNFT("NFTSTAKING");
    // setunstakeAllStatus("Unstaking all please wait...");

    await stake_contract.methods
      .withdraw(myStakes)
      .send()
      .then(() => {
        // setunstakeAllStatus("Successfully unstaked all!");
      })
      .catch((err) => {
        window.alertify.error(err?.message);
        // setunstakeAllStatus("An error occurred, please try again");
        setShowUnstakeModal(false);
      });
  };

  useEffect(() => {
    if (isConnected) {
      myNft().then();
      myStakes().then();
      checkApproval().then();
      handleClaimAll();
      setUSDPrice().then();
      calculateCountdown().then();
    }
  }, [isConnected]);

  return (
    <div className="container-lg p-0">
      <div
        className={`allwrappercaws ${listType === "table" && "my-4"}`}
        style={{
          border: listType !== "table" && "none",
          borderRadius: listType !== "table" && "0px",
        }}
      >
        <div className="leftside2 w-100">
          <div className="activewrapper">
            <div className="d-flex align-items-center justify-content-between gap-5">
              <h6 className="activetxt">
                <img
                  src={ellipse}
                  alt=""
                  className="position-relative"
                  style={{ top: 3 }}
                />
                Active Pool
              </h6>
              {/* <div className="d-flex align-items-center justify-content-between gap-2">
                    <h6 className="earnrewards-text">Earn rewards in:</h6>
                    <h6 className="earnrewards-token d-flex align-items-center gap-1">
                      DYP
                    </h6>
                  </div> */}

              <div className="d-flex align-items-center justify-content-between gap-2">
                <h6 className="earnrewards-text">APR:</h6>
                <h6 className="earnrewards-token d-flex align-items-center gap-1">
                  50%
                  <Tooltip
                    placement="top"
                    title={
                      <div className="tooltip-text">
                        {
                          "APR reflects the interest rate of earnings on an account over the course of one year. "
                        }
                      </div>
                    }
                  >
                    <img src={moreinfo} alt="" />
                  </Tooltip>
                </h6>
              </div>
              <div className="d-flex align-items-center justify-content-between gap-2">
                <h6 className="earnrewards-text">Lock time:</h6>
                <h6 className="earnrewards-token d-flex align-items-center gap-1">
                  30 days
                  <Tooltip
                    placement="top"
                    title={
                      <div className="tooltip-text">
                        {
                          "The amount of time your deposited assets will be locked."
                        }
                      </div>
                    }
                  >
                    <img src={moreinfo} alt="" />
                  </Tooltip>
                </h6>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between gap-3">
              <div
                onClick={() => {
                  this.showPopup();
                }}
              >
                <h6 className="bottomitems">
                  <img src={arrowup} alt="" />
                  Get CAWS
                </h6>
              </div>
            </div>
          </div>
        </div>
        <div className="pools-details-wrapper d-flex m-0 container-lg border-0">
          <div className="row w-100 justify-content-between">
            <div className="firstblockwrapper col-2">
              <div
                className="d-flex flex-column justify-content-between gap-4"
                style={{ height: "100%" }}
              >
                <h6 className="start-title">Start Staking</h6>

                {coinbase === null ? (
                  <button className="connectbtn btn">
                    {" "}
                    <img src={wallet} alt="" /> Connect wallet
                  </button>
                ) : (
                  <div className="addressbtn btn">
                    <Address a={coinbase} chainId={1} />
                  </div>
                )}
              </div>
            </div>
            <div className="otherside-border col-4">
              <div className="d-flex justify-content-between align-items-center gap-2">
                <div className="d-flex align-items-center gap-3">
                  <h6 className="deposit-txt">Stake</h6>

                  <h6 className="mybalance-text">
                    Avaliable NFT's:{" "}
                    <b>{isConnected === false ? 0 : myNFTs.length} CAWS</b>
                  </h6>
                </div>
                <Tooltip
                  placement="top"
                  title={
                    <div className="tooltip-text">
                      {"Deposit your CAWS NFT’s to the staking smart contract."}
                    </div>
                  }
                >
                  <img src={moreinfo} alt="" />
                </Tooltip>
              </div>
              <div className="d-flex flex-column gap-2 justify-content-between">
                <div className="d-flex align-items-center justify-content-between gap-2">
                  <div className="position-relative">
                    <h6 className="amount-txt">Amount 1/{myNFTs.length}</h6>
                    <input
                      type={"number"}
                      disabled={
                        myNFTs.length === 0 && mystakes.length === 0
                          ? true
                          : false
                      }
                      className="styledinput"
                      placeholder="0.0"
                      style={{ width: "100%" }}
                      value={amountToStake}
                      onChange={(e) => {
                        setamountToStake(e.target.value);
                        setshowChecklistModal(true);
                        setOpenStakeChecklist(true);
                      }}
                    />
                  </div>

                  <button
                    className={`btn ${
                      amountToStake !== "" && myNFTs.length > 0
                        ? "filledbtn"
                        : "disabled-btn"
                    } d-flex justify-content-center align-items-center gap-2`}
                    disabled={
                      amountToStake !== "" && myNFTs.length > 0 ? false : true
                    }
                    onClick={() => {}}
                  >
                    {showApprove === false ? "Deposit" : "Approve"}
                  </button>
                </div>
                {/* {this.state.errorMsg && (
                  <h6 className="errormsg">{this.state.errorMsg}</h6>
                )} */}
              </div>
            </div>
            <div className="otherside-border col-4">
              <div className="d-flex justify-content-between gap-2 ">
                <h6 className="withdraw-txt d-flex gap-2 align-items-center">
                  REWARDS
                  <h6 className="mybalance-text">
                    NFT's Staked:{""}
                    <b>{isConnected === false ? 0 : mystakes.length} CAWS</b>
                  </h6>
                </h6>
                <h6 className="withdraw-littletxt d-flex align-items-center gap-2">
                  Rewards are displayed in real-time
                  <Tooltip
                    placement="top"
                    title={
                      <div className="tooltip-text">
                        {
                          "Rewards earned by your CAWS NFT’s deposit to the staking smart contract are displayed in real-time."
                        }
                      </div>
                    }
                  >
                    <img src={moreinfo} alt="" />
                  </Tooltip>
                </h6>
              </div>
              <div className="d-flex flex-column gap-2 justify-content-between">
                <div className="d-flex align-items-center justify-content-between gap-2"></div>
                <div className="form-row d-flex gap-2 align-items-end justify-content-between">
                  <h6 className="rewardstxtCaws d-flex align-items-center gap-2">
                    <img src={weth} alt="" /> {EthRewards} ETH (
                    {formattedNum(ethToUSD, true)})
                  </h6>
                  <button
                    className={`btn filledbtn d-flex justify-content-center align-items-center`}
                    style={{ height: "fit-content" }}
                    onClick={() => {
                      claimRewards();
                    }}
                  >
                    <>Claim</>
                  </button>
                </div>
              </div>
            </div>

            <div className="otherside-border col-2">
              <h6 className="deposit-txt d-flex align-items-center gap-2 justify-content-between">
                Unstake
                <Tooltip
                  placement="top"
                  title={
                    <div className="tooltip-text">
                      {
                        "Withdraw your deposited assets from the buyback smart contract."
                      }
                    </div>
                  }
                >
                  <img src={moreinfo} alt="" />
                </Tooltip>
              </h6>

              <button
                className="btn outline-btn"
                onClick={() => {
                  setshowChecklistModal(true);
                  setOpenStakeChecklist(true);
                }}
              >
                Withdraw
              </button>
            </div>
          </div>
        </div>
      </div>
      {showChecklistModal === true && (
        <NftStakeCheckListModal
          onClose={() => {
            setshowChecklistModal(false);
            setamountToStake("");
          }}
          nftItem={showStaked ? mystakes : showToStake ? myNFTs : showStaked}
          onshowStaked={() => {
            setshowStaked(true);
            setshowToStake(false);
          }}
          onshowToStake={() => {
            setshowStaked(false);
            setshowToStake(true);
          }}
          onClaimAll={() => {
            claimRewards();
          }}
          onUnstake={() => handleUnstakeAll()}
          isConnected={isConnected}
          coinbase={coinbase}
          ETHrewards={EthRewards}
          countDownLeft={countDownLeft}
          open={openStakeChecklist ? true : false}
        />
      )}
    </div>
  );
};

export default CawsDetails;
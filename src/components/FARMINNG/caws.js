import React, { useState, useEffect } from "react";
import Web3 from "web3";
import moment from "moment";
import getFormattedNumber from "../../functions/get-formatted-number";
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
  const [amountToStake, setamountToStake] = useState(0);
  const [mystakes, setMystakes] = useState([]);
  const [color, setColor] = useState("#F13227");
  const [status, setStatus] = useState("");
  const [showApprove, setshowApprove] = useState(true);
  const [showChecklistModal, setshowChecklistModal] = useState(true);
  const [EthRewards, setEthRewards] = useState(0);

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

  useEffect(() => {
    if (isConnected) {
      myNft().then();
      myStakes().then();
      checkApproval().then();
      handleClaimAll();
    }
  }, [isConnected]);

  return (
    <div className="container-lg p-0">
      <div
        className={`allwrapper ${listType === "table" && "my-4"}`}
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
                      className="styledinput"
                      placeholder="0.0"
                      style={{ width: "100%" }}
                      value={amountToStake}
                      onChange={(e) => {
                        setamountToStake(e.target.value);
                      }}
                    />
                  </div>

                  <button
                    className={`btn ${
                      amountToStake !== 0 && myNFTs.length > 0
                        ? "filledbtn"
                        : "disabled-btn"
                    } d-flex justify-content-center align-items-center gap-2`}
                    onClick={() => {}}
                    disabled={
                      amountToStake !== 0 && myNFTs.length > 0 ? false : true
                    }
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
                    <img src={weth} alt="" /> {EthRewards} ETH
                  </h6>
                  <button
                    className={`btn filledbtn d-flex justify-content-center align-items-center`}
                    style={{ height: "fit-content" }}
                    onClick={() => {}}
                  >
                    {/* {this.state.claimLoading || this.state.claimidypLoading ? (
                      <div
                        class="spinner-border spinner-border-sm text-light"
                        role="status"
                      >
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    ) : this.state.claimStatus === "failed" ||
                      this.state.claimidypStatus === "failed" ? (
                      <>
                        <img src={failMark} alt="" />
                        Failed
                      </>
                    ) : this.state.claimStatus === "success" ||
                      this.state.claimidypStatus === "success" ? (
                      <>Success</>
                    ) : this.state.claimStatus === "initial" ||
                      this.state.claimidypStatus === "initial" ? ( */}
                    <>Claim</>
                    {/* ) : (
                      <></>
                    )} */}
                  </button>
                </div>
                {/* {this.state.errorMsg2 && (
                  <h6 className="errormsg">{this.state.errorMsg2}</h6>
                )} */}
                {/* <button
                            title={claimTitle}
                            disabled={!is_connected}
                            className="btn  btn-primary btn-block l-outline-btn"
                            type="submit"
                          >
                            CLAIM
                          </button> */}
                {/* <button
                          onClick={(e) => {
                            e.preventDefault();
                            this.handleClaimDyp();
                          }}
                          title={claimTitle}
                          disabled={!is_connected}
                          className="btn  btn-primary btn-block l-outline-btn"
                          type="submit"
                        >
                          CLAIM
                        </button> */}
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
                  //   this.setState({ showWithdrawModal: true });
                }}
              >
                Withdraw
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* {this.state.popup && (
        <Modal
          visible={this.state.popup}
          modalId="tymodal"
          title="stats"
          setIsVisible={() => {
            this.setState({ popup: false });
          }}
          width="fit-content"
        >
          <div className="earn-hero-content p4token-wrapper">
            <div className="l-box pl-3 pr-3"> */}
      {/* <div className="table-responsive container">
                    <div className="row" style={{ marginLeft: "0px" }}>
                      <div className="d-flex justify-content-between gap-2 align-items-center p-0">
                        <h6 className="d-flex gap-2 align-items-center statstext">
                          <img src={stats} alt="" />
                          Stats
                        </h6>
                        <h6 className="d-flex gap-2 align-items-center myaddrtext">
                          My address
                          <a
                            href={`${window.config.etherscan_baseURL}/address/${this.props.coinbase}`}
                            target={"_blank"}
                            rel="noreferrer"
                          >
                            <h6 className="addresstxt">
                              {this.props.coinbase?.slice(0, 10) + "..."}
                            </h6>
                          </a>
                          <img src={arrowup} alt="" />
                        </h6>
                      </div>
                    </div>
                    <table className="table-stats table table-sm table-borderless mt-2">
                      <tbody>
                        <tr>
                          <td className="text-right">
                            <th>My DYP Balance</th>
                            <div>
                              <strong>{token_balance}</strong>{" "}
                              <small>DYP</small>
                            </div>
                          </td>
                          <td className="text-right">
                            <th>My Deposit Value</th>
                            <div>
                              <strong>{depositedTokens}</strong>{" "}
                              <small>USD</small>
                            </div>
                          </td>
                          <td className="text-right">
                            <th>Total Earned</th>
                            <div>
                              <strong> ${totalEarnedTokens}</strong>{" "}
                              <small>USD</small>
                            </div>{" "}
                          </td>
                        </tr>

                        <tr>
                          <td className="text-right">
                            <th>TVL USD</th>
                            <div>
                              <strong>${tvl_usd}</strong> <small>USD</small>
                            </div>
                          </td>

                          <td className="text-right">
                            <th>Contract Address</th>
                            <small>
                              <a
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  color: "#f7f7fc",
                                  textDecoration: "underline",
                                }}
                                href={`${window.config.etherscan_baseURL}/token/${reward_token._address}?a=${coinbase}`}
                              >
                                {reward_token._address?.slice(0, 10) + "..."}
                              </a>
                            </small>
                          </td>

                          <td className="text-right">
                            <th>Contract Expiration</th>
                            <small>{expiration_time}</small>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="d-flex align-items-center gap-2">
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`https://github.com/dypfinance/Buyback-Farm-Stake-Governance-V2/tree/main/Audit`}
                        className="maxbtn d-flex align-items-center"
                        style={{ height: "25px" }}
                      >
                        Audit
                        <img src={arrowup} alt="" />
                      </a>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`${window.config.etherscan_baseURL}/token/${reward_token._address}?a=${this.props.coinbase}`}
                        className="text-white mb-0"
                        style={{ fontSize: "9px", textDecoration: "underline" }}
                      >
                        View on Etherscan
                        <img src={whiteArrowUp} alt="" className="ms-1" />
                      </a>
                    </div>
                  </div> */}
      {/* <div className="stats-container my-4">
                <div className="stats-card p-4 d-flex flex-column mx-auto w-100">
                  <span className="stats-card-title">My DYP Balance</span>
                 <h6 className="stats-card-content">{token_balance} DYP</h6>
                </div> */}
      {/* <div className="stats-card p-4 d-flex flex-column mx-auto w-100">
                  <span className="stats-card-title">My Deposit Value</span>
                 <h6 className="stats-card-content">{depositedTokens} USD</h6>
                </div> */}
      {/*<div className="stats-card p-4 d-flex flex-column mx-auto w-100">
                  <span className="stats-card-title">Total Earned</span>
                  <h6 className="stats-card-content">
                    {totalEarnedTokens} USD 
                  </h6>
                </div>*/}
      {/*<div className="stats-card p-4 d-flex flex-column mx-auto w-100">
                  <span className="stats-card-title">TVL USD</span>
                   <h6 className="stats-card-content">{tvl_usd} USD</h6>
                </div> */}
      {/*<div className="stats-card p-4 d-flex flex-column mx-auto w-100">
                  <span className="stats-card-title">Contract Expiration</span>
                 <h6 className="stats-card-content">{expiration_time} DYP</h6>
                </div> */}
      {/* <div className="d-flex flex-column gap-1">
                  <span
                    style={{
                      fontWeight: "400",
                      fontSize: "12px",
                      lineHeight: "18px",
                      color: "#C0C9FF",
                    }}
                  >
                    My address
                  </span>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`${window.config.snowtrace_baseURL}/address/${coinbase}`}
                    className="stats-link"
                  >
                    {shortAddress(coinbase)} <img src={statsLinkIcon} alt="" />
                  </a>
                 
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )} */}
    </div>
  );
};

export default CawsDetails;

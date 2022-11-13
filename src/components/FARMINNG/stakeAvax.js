import React from "react";
import moment from "moment";

import getFormattedNumber from "../../functions/get-formatted-number";
import Modal from "../Modal/Modal";
import Address from "./address";
import WalletModal from "../WalletModal";
import "./top-pools.css";
import ellipse from "./assets/ellipse.svg";
import failMark from "../../assets/failMark.svg";
import Clipboard from "react-clipboard.js";
import ReactTooltip from "react-tooltip";
import arrowup from "./assets/arrow-up.svg";
import moreinfo from "./assets/more-info.svg";
import stats from "./assets/stats.svg";
import purplestats from "./assets/purpleStat.svg";
import referralimg from "./assets/referral.svg";
import copy from "./assets/copy.svg";
import wallet from "./assets/wallet.svg";
import Tooltip from "@material-ui/core/Tooltip";
import Countdown from "react-countdown";

export default function stakeAvax({
  staking,
  apr,
  liquidity = "ETH",
  lock,
  expiration_time,
  other_info,
  fee,
  chainId,
  coinbase,
}) {
  let {
    reward_token,
    BigNumber,
    alertify,
    reward_token_idyp,
    reward_token_daiavax,
    token_dypsavax,
  } = window;
  let token_symbol = "DYP";

  // token, staking

  const TOKEN_DECIMALS = window.config.token_decimals;

  function download(filename, text) {
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  function jsonToCsv(items) {
    const replacer = (key, value) => (value === null ? "" : value); // specify how you want to handle null values here
    const header = Object.keys(items[0]);
    let csv = items.map((row) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(",")
    );
    csv.unshift(header.join(","));
    csv = csv.join("\r\n");
    return csv;
  }

  window.handleDownload = ({
    stakers,
    stakingTimes,
    lastClaimedTimes,
    stakedTokens,
  }) => {
    let list = [];
    stakers.forEach((staker, index) => {
      list.push({
        staker_address: staker,
        staking_timestamp_unix: stakingTimes[index],
        lastclaimed_timestamp_unix: lastClaimedTimes[index],
        staking_time: getDate(stakingTimes[index] * 1e3),
        lastclaimed_time: getDate(lastClaimedTimes[index] * 1e3),
        staked_tokens: stakedTokens[index],
      });
    });
    download("stakers-list.csv", jsonToCsv(list));

    function getDate(timestamp) {
      let a = new Date(timestamp);
      return a.toUTCString();
    }
  };

  class StakingAvax extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        token_balance: "",
        pendingDivs: "",
        totalEarnedTokens: "",
        cliffTime: "",
        stakingTime: "",
        depositedTokens: "",
        lastClaimedTime: "",

        depositAmount: "",
        

        coinbase: "0x0000000000000000000000000000000000000111",
        tvl: "",
        referralFeeEarned: "",
        stakingOwner: null,
        approxDeposit: 100,
        approxDays: 365,
        depositLoading: false,
        depositStatus: "initial",
        depositAmount: "",
        withdrawAmount: "",
        claimLoading: false,
        claimStatus: "initial",
        reInvestLoading: false,
        reInvestStatus: "initial",
        selectedTokenLogo: "wavax",
        selectedRewardTokenLogo1: "wavax",
        selectedRewardTokenLogo2: "dyp",
        withdrawLoading: false,
        withdrawStatus: "initial",
        showWithdrawModal: false,
        show: false,
        usdPerToken: "",

        contractDeployTime: "",
        disburseDuration: "",

        apy: 0,
      };

      this.showModal = this.showModal.bind(this);
      this.hideModal = this.hideModal.bind(this);

      this.showPopup = this.showPopup.bind(this);
      this.hidePopup = this.hidePopup.bind(this);
    }

    showModal = () => {
      this.setState({ show: true });
    };

    hideModal = () => {
      this.setState({ show: false });
    };

    showPopup = () => {
      this.setState({ popup: true });
    };

    hidePopup = () => {
      this.setState({ popup: false });
    };

    handleListDownload = async (e) => {
      e.preventDefault();
      let m = window.alertify.message(`Processing...`);
      m.ondismiss = () => false;
      let step = 100;
      let stakers = [];
      let stakingTimes = [];
      let lastClaimedTimes = [];
      let stakedTokens = [];
      let length = await staking.getNumberOfHolders();
      length = Number(length);
      try {
        for (let startIndex = 0; startIndex < length; startIndex += step) {
          console.log({ startIndex, endIndex: startIndex + step });
          let array = await staking.getStakersList(
            startIndex,
            Math.min(startIndex + step, length)
          );
          console.log(array);
          stakers = stakers.concat(array.stakers);
          stakingTimes = stakingTimes.concat(array.stakingTimestamps);
          lastClaimedTimes = lastClaimedTimes.concat(
            array.lastClaimedTimeStamps
          );
          stakedTokens = stakedTokens.concat(array.stakedTokens);
        }
        let result = { stakers, stakingTimes, lastClaimedTimes, stakedTokens };
        window.handleDownload(result);
      } catch (e) {
        console.error(e);
        alertify.error("Something went wrong while processing!");
      } finally {
        m.ondismiss = (f) => true;
        m.dismiss();
      }
    };

    componentDidMount() {
      this.refreshBalance();
      //   window._refreshBalInterval = setInterval(this.refreshBalance, 3000);

      if (this.props.coinbase !== null) {
        this.setState({ coinbase: this.props.coinbase });
      }

      this.getPriceDYP();
    }

    getPriceDYP = async () => {
      let usdPerToken = await window.getPrice("defi-yield-protocol");
      this.setState({ usdPerToken });
    };

    componentWillUnmount() {
      //   clearInterval(window._refreshBalInterval);
    }

    handleDeposit = (e) => {
      e.preventDefault();
      let amount = this.state.depositAmount;
      amount = new BigNumber(amount).times(1e18).toFixed(0);
      staking.depositTOKEN(amount);
    };

    handleApprove = async(e) => {
    //   e.preventDefault();

    this.setState({ depositLoading: true });


      if (other_info) {
        window.$.alert("This pool no longer accepts deposits!");
        return;
      }

      let amount = this.state.depositAmount;
      amount = new BigNumber(amount).times(1e18).toFixed(0);
    await  reward_token.approve(staking._address, amount).then(() => {
          this.setState({ depositLoading: false, depositStatus: "deposit" });
        })
        .catch(() => {
          this.setState({ depositLoading: false, depositStatus: "fail" });
        });
    };
    // handleStake = (e) => {
    //     let amount = this.state.depositAmount
    //     amount = new BigNumber(amount).times(1e18).toFixed(0)
    //     let referrer = this.props.referrer
    //
    //     if (referrer) {
    //         referrer = String(referrer).trim().toLowerCase()
    //     }
    //
    //     if (!window.web3.utils.isAddress(referrer)) {
    //         referrer = window.config.ZERO_ADDRESS
    //     }
    //     staking.stake(amount, referrer)
    // }

    handleStake = async (e) => {
    //   e.preventDefault();

    this.setState({ depositLoading: true });


      if (other_info) {
        window.$.alert("This pool no longer accepts deposits!");
        return;
      }

      let amount = this.state.depositAmount;
      amount = new BigNumber(amount).times(1e18).toFixed(0);
      let referrer = window.config.ZERO_ADDRESS;

      //NO REFERRER HERE

      staking.stake(amount, referrer).then(() => {
        this.setState({ depositLoading: false, depositStatus: "success" });
      })
      .catch(() => {
        this.setState({ depositLoading: false, depositStatus: "fail" });
      });
    };

    handleWithdraw = (e) => {
    //   e.preventDefault();

    this.setState({ withdrawLoading: true });
    
      let amount = this.state.withdrawAmount;
      amount = new BigNumber(amount).times(1e18).toFixed(0);
      staking.unstake(amount).then(() => {
          this.setState({ withdrawStatus: "success" });
          this.setState({ withdrawLoading: false });
        })
        .catch((e) => {
          this.setState({ withdrawStatus: "failed" });
          this.setState({ withdrawLoading: false });
          
        });
    };

    handleClaimDivs = async (e) => {
    //   e.preventDefault();
    this.setState({ claimLoading: true });
    this.setState({ claimStatus: "claim" });

      staking.claim().then(() => {
          this.setState({ claimStatus: "success" });
          this.setState({ claimLoading: false });
        })
        .catch(() => {
          this.setState({ claimStatus: "failed" });
          this.setState({ claimLoading: false });
        });
    };

    handleSetMaxDeposit = (e) => {
      e.preventDefault();
      this.setState({
        depositAmount: new BigNumber(this.state.token_balance)
          .div(1e18)
          .toFixed(18),
      });
    };
    handleSetMaxWithdraw = (e) => {
      e.preventDefault();
      this.setState({
        withdrawAmount: new BigNumber(this.state.depositedTokens)
          .div(1e18)
          .toFixed(18),
      });
    };

    getAPY = () => {
      return apr;
    };

    refreshBalance = async () => {
      let coinbase = this.props.coinbase;

      if (window.coinbase_address) {
        coinbase = window.coinbase_address;
        this.setState({ coinbase });
      }

      let lp_data = this.props.the_graph_result.token_data;
      //console.log({lp_data})

      //Calculate APY
      let { the_graph_result } = this.props;
      let usd_per_token = the_graph_result.token_data
        ? the_graph_result.token_data[
            "0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17"
          ].token_price_usd
        : 1;
      // let usd_per_idyp = the_graph_result.token_data ? the_graph_result.token_data["0xbd100d061e120b2c67a24453cf6368e63f1be056"].token_price_usd : 1
      let apy = apr - fee;
      this.setState({ apy });

      let usd_per_dyps = this.props.the_graph_result.price_DYPS
        ? this.props.the_graph_result.price_DYPS
        : 1;

      try {
        let _bal = reward_token.balanceOf(coinbase);
        let _pDivs = staking.getTotalPendingDivs(coinbase);

        let _tEarned = staking.totalEarnedTokens(coinbase);

        let _stakingTime = staking.stakingTime(coinbase);

        let _dTokens = staking.depositedTokens(coinbase);

        let _lClaimTime = staking.lastClaimedTime(coinbase);

        let _tvl = reward_token.balanceOf(staking._address);

        let _rFeeEarned = staking.totalReferralFeeEarned(coinbase);

        let tStakers = staking.getNumberOfHolders();

        //Take DAI Balance on Staking
        let _tvlConstantDAI = reward_token_daiavax.balanceOf(
          staking._address
        ); /* TVL of DAI on Staking */

        //Take DYPS Balance
        let _tvlDYPS = token_dypsavax.balanceOf(
          staking._address
        ); /* TVL of DYPS */

        let [
          token_balance,
          pendingDivs,
          totalEarnedTokens,
          stakingTime,
          depositedTokens,
          lastClaimedTime,
          tvl,
          referralFeeEarned,
          total_stakers,
          tvlConstantDAI,
          tvlDYPS,
        ] = await Promise.all([
          _bal,
          _pDivs,
          _tEarned,
          _stakingTime,
          _dTokens,
          _lClaimTime,
          _tvl,
          _rFeeEarned,
          tStakers,
          _tvlConstantDAI,
          _tvlDYPS,
        ]);

        //console.log({tvl, tvlConstantiDYP, _amountOutMin})

        let usdValueDAI = new BigNumber(tvlConstantDAI).toFixed(18);
        let usd_per_lp = lp_data
          ? lp_data[window.reward_token["_address"]].token_price_usd
          : 0;
        let tvlUSD = new BigNumber(tvl)
          .times(usd_per_lp)
          .plus(usdValueDAI)
          .toFixed(18);
        //console.log({tvlUSD})

        let tvlDyps = new BigNumber(tvlDYPS).times(usd_per_dyps).toFixed(18);

        this.setState({
          token_balance,
          pendingDivs,
          totalEarnedTokens,
          stakingTime,
          depositedTokens,
          lastClaimedTime,
          tvl,
          tvlDyps,
          referralFeeEarned,
          total_stakers,
          tvlUSD,
        });
        let stakingOwner = await staking.owner();
        this.setState({ stakingOwner });
      } catch (e) {
        console.error(e);
      }

      staking
        .LOCKUP_TIME()
        .then((cliffTime) => {
          this.setState({ cliffTime: Number(cliffTime) });
        })
        .catch(console.error);

      staking.contractStartTime().then((contractDeployTime) => {
        this.setState({ contractDeployTime });
      });

      staking.REWARD_INTERVAL().then((disburseDuration) => {
        this.setState({ disburseDuration });
      });
    };

    getUsdPerETH = () => {
      return this.props.the_graph_result.usd_per_eth || 0;
    };

    getApproxReturn = () => {
      let APY = this.getAPY() - fee;
      let approxDays = this.state.approxDays;
      let approxDeposit = this.state.approxDeposit;

      return ((approxDeposit * APY) / 100 / 365) * approxDays;
    };

    getReferralLink = () => {
      return (
        window.location.origin +
        window.location.pathname +
        "?r=" +
        this.state.coinbase
      );
    };

    handleReinvest = async (e) => {
    //   e.preventDefault();
    this.setState({ reInvestStatus: "invest", reInvestLoading: true });

      staking.reInvest().then(() => {
        this.setState({ reInvestStatus: "success" });
        this.setState({ reInvestLoading: false });
      })
      .catch((e) => {
        this.setState({ reInvestStatus: "failed" });
        this.setState({ reInvestLoading: false });
      });
    };

    render() {
      let {
        disburseDuration,
        contractDeployTime,
        cliffTime,
        referralFeeEarned,
        token_balance,
        pendingDivs,
        totalEarnedTokens,
        depositedTokens,
        stakingTime,
        coinbase,
        tvl,
      } = this.state;

      token_balance = new BigNumber(token_balance).div(1e18).toString(10);
      token_balance = getFormattedNumber(token_balance, 6);

      let { the_graph_result } = this.props;

      pendingDivs = new BigNumber(pendingDivs)
        .div(10 ** TOKEN_DECIMALS)
        .toString(10);
      pendingDivs = getFormattedNumber(pendingDivs, 6);

      totalEarnedTokens = new BigNumber(totalEarnedTokens)
        .div(10 ** TOKEN_DECIMALS)
        .toString(10);
      totalEarnedTokens = getFormattedNumber(totalEarnedTokens, 6);

      referralFeeEarned = getFormattedNumber(referralFeeEarned / 1e18, 6);

      depositedTokens = new BigNumber(depositedTokens).div(1e18).toString(10);
      depositedTokens = getFormattedNumber(depositedTokens, 6);

      tvl = new BigNumber(tvl).div(1e18).toString(10);
      tvl = getFormattedNumber(tvl, 2);

      stakingTime = stakingTime * 1e3;
      cliffTime = cliffTime * 1e3;

      let showDeposit = true;

      if (!isNaN(disburseDuration) && !isNaN(contractDeployTime)) {
        let lastDay = parseInt(disburseDuration) + parseInt(contractDeployTime);
        let lockTimeExpire = parseInt(Date.now()) + parseInt(cliffTime);
        lockTimeExpire = lockTimeExpire.toString().substr(0, 10);
        //console.log("now " + lockTimeExpire)
        //console.log('last ' + lastDay)
        if (lockTimeExpire > lastDay) {
          showDeposit = false;
        }
      }

      let cliffTimeInWords = "lockup period";

      let canWithdraw = true;
      if (!isNaN(cliffTime) && !isNaN(stakingTime)) {
        if (Date.now() - stakingTime <= cliffTime) {
          canWithdraw = false;
          cliffTimeInWords = moment
            .duration(cliffTime - (Date.now() - stakingTime))
            .humanize(true);
        }
      }

      let total_stakers = this.state.total_stakers;
      //let tvl_usd = this.state.tvl / 1e18 * this.state.usdPerToken
      let tvl_usd = this.state.tvlUSD / 1e18;

      let tvlDYPS = this.state.tvlDyps / 1e18;
      tvl_usd = tvl_usd + tvlDYPS;

      tvl_usd = getFormattedNumber(tvl_usd, 2);
      total_stakers = getFormattedNumber(total_stakers, 0);

      //console.log(total_stakers)

      let isOwner =
        String(this.state.coinbase).toLowerCase() ===
        String(window.config.admin_address).toLowerCase();

      let id = Math.random().toString(36);

      // let apy = new BigNumber(apr).div(1e2).times(usd_per_idyp).div(usd_per_token).times(1e2).toFixed(2)

      //this.setState({apy})

      let is_connected = this.props.is_wallet_connected;

      return (
        <div className="container-lg p-0">
          <div className="allwrapper">
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
                    Active status
                  </h6>
                  <div className="d-flex align-items-center justify-content-between gap-2">
                    <h6 className="earnrewards-text">Earn rewards in:</h6>
                    <h6 className="earnrewards-token d-flex align-items-center gap-1">
                      DYP
                    </h6>
                  </div>
                  <div className="d-flex align-items-center justify-content-between gap-2">
                    <h6 className="earnrewards-text">Performance fee:</h6>
                    <h6 className="earnrewards-token d-flex align-items-center gap-1">
                      {fee}%
                      <Tooltip
                        placement="top"
                        title={
                          <div style={{ whiteSpace: "pre-line" }}>
                            {
                              "Performance fee is subtracted from the displayed APR."
                            }
                          </div>
                        }
                      >
                        <img src={moreinfo} alt="" />
                      </Tooltip>
                    </h6>
                  </div>

                  <div className="d-flex align-items-center justify-content-between gap-2">
                    <h6 className="earnrewards-text">APR:</h6>
                    <h6 className="earnrewards-token d-flex align-items-center gap-1">
                      {getFormattedNumber(this.state.apy, 2)}%{" "}
                      <Tooltip
                        placement="top"
                        title={
                          <div style={{ whiteSpace: "pre-line" }}>
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
                      {/* {lockTime} */}
                      <Tooltip
                        placement="top"
                        title={
                          <div style={{ whiteSpace: "pre-line" }}>
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
                  <a
                    href={
                      chainId === 1
                        ? "https://app.uniswap.org/#/swap?outputCurrency=0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17"
                        : "https://app.pangolin.exchange/#/swap?outputCurrency=0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17"
                    }
                    target={"_blank"}
                    rel="noreferrer"
                  >
                    <h6 className="bottomitems">
                      <img src={arrowup} alt="" />
                      Get DYP
                    </h6>
                  </a>
                  <div
                    onClick={() => {
                      this.showPopup();
                    }}
                  >
                    <h6 className="bottomitems">
                      <img src={purplestats} alt="" />
                      Stats
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="pools-details-wrapper d-flex m-0 container-lg border-0">
              <div className="row w-100 justify-content-between">
                <div className="firstblockwrapper col-2">
                  <div
                    className="d-flex flex-column justify-content-between gap-2"
                    style={{ height: "100%" }}
                  >
                    <h6 className="start-title">Start Staking</h6>
                    <h6 className="start-desc">
                      {this.props.coinbase === null
                        ? "Connect wallet to view and interact with deposits and withdraws"
                        : "Interact with deposits and withdraws"}
                    </h6>
                    {this.props.coinbase === null ? (
                      <button
                        className="connectbtn btn"
                        onClick={this.showModal}
                      >
                        {" "}
                        <img src={wallet} alt="" /> Connect wallet
                      </button>
                    ) : (
                      <div className="addressbtn btn">
                        <Address a={this.props.coinbase} />
                      </div>
                    )}
                  </div>
                </div>
                {/* <div className="otherside">
            <button className="btn green-btn">
              TBD Claim reward 0.01 ETH
            </button>
          </div> */}
                <div className="otherside-border col-4">
                  <div className="d-flex justify-content-between align-items-center gap-2">
                    <div className="d-flex justify-content-center align-items-center gap-3">
                      <h6 className="deposit-txt">Deposit</h6>
                      <div className="d-flex gap-2 align-items-center">
                        <img
                          src={require(`./assets/dyp.svg`).default}
                          alt=""
                          style={{ width: 15, height: 15 }}
                        />
                        <h6
                          className="text-white"
                          style={{ fontSize: "11px", fontWeight: "600" }}
                        >
                          DYP
                        </h6>
                      </div>
                      <h6 className="mybalance-text">
                        Balance:
                        <b>{token_balance}</b>
                      </h6>
                    </div>
                    <Tooltip
                      placement="top"
                      title={
                        <div style={{ whiteSpace: "pre-line" }}>
                          {"lorem impsum deposit text"}
                        </div>
                      }
                    >
                      <img src={moreinfo} alt="" />
                    </Tooltip>
                  </div>
                  <div className="d-flex flex-column gap-2 justify-content-between">
                    <div className="d-flex align-items-center justify-content-between gap-2">
                      <div className="position-relative">
                        <h6 className="amount-txt">Amount</h6>
                        <input
                          type={"number"}
                          className="styledinput"
                          placeholder="0.0"
                          style={{ width: 200 }}
                          value={
                            Number(this.state.depositAmount) > 0
                              ? this.state.depositAmount
                              : this.state.depositAmount
                          }
                          onChange={(e) =>
                            this.setState({
                              depositAmount: e.target.value,
                            })
                          }
                        />
                      </div>
                      <button
                        className="btn maxbtn"
                        onClick={this.handleSetMaxDeposit}
                      >
                        Max
                      </button>
                      {/* <button
                    className="btn filledbtn"
                    onClick={this.handleApprove}
                  >
                    Approve
                  </button> */}
                      <button
                        disabled={
                          this.state.depositAmount === "" ||
                          this.state.depositLoading === true
                            ? true
                            : false
                        }
                        className={`btn filledbtn ${
                          this.state.depositAmount === "" && "disabled-btn"
                        } ${
                          this.state.depositStatus === "deposit" ||
                          this.state.depositStatus === "success"
                            ? "success-button"
                            : this.state.depositStatus === "fail"
                            ? "fail-button"
                            : null
                        } d-flex justify-content-center align-items-center gap-2`}
                        onClick={() => {
                          this.state.depositStatus === "deposit"
                            ? this.handleStake()
                            : this.state.depositStatus === "initial"
                            ? this.handleApprove()
                            : console.log("");
                        }}
                      >
                        {this.state.depositLoading ? (
                          <div
                            class="spinner-border spinner-border-sm text-light"
                            role="status"
                          >
                            <span class="visually-hidden">Loading...</span>
                          </div>
                        ) : this.state.depositStatus === "initial" ? (
                          <>Approve</>
                        ) : this.state.depositStatus === "deposit" ? (
                          <>Deposit</>
                        ) : this.state.depositStatus === "success" ? (
                          <>Success</>
                        ) : (
                          <>
                            <img src={failMark} alt="" />
                            Failed
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="otherside-border col-4">
                  <div className="d-flex justify-content-between gap-2 ">
                    <h6 className="withdraw-txt">Rewards</h6>
                    <h6 className="withdraw-littletxt">
                      Reward updated each day 00:00 (UTC) <b>22:36</b>
                      <Tooltip
                        placement="top"
                        title={
                          <div style={{ whiteSpace: "pre-line" }}>
                            {"rewards text"}
                          </div>
                        }
                      >
                        <img src={moreinfo} alt="" />
                      </Tooltip>
                    </h6>
                  </div>
                  <div className="d-flex flex-column gap-2 justify-content-between">
                    <div className="d-flex align-items-center justify-content-between gap-2"></div>
                    <div className="form-row d-flex gap-2 align-items-center justify-content-between">
                      <div className="position-relative">
                        <input
                          disabled
                          value={
                            Number(pendingDivs) > 0
                              ? `${pendingDivs} DYP`
                              : `${pendingDivs} DYP`
                          }
                          onChange={(e) =>
                            this.setState({
                              pendingDivs:
                                Number(e.target.value) > 0
                                  ? e.target.value
                                  : e.target.value,
                            })
                          }
                          className=" left-radius inputfarming styledinput2"
                          placeholder="0"
                          type="text"
                          style={{ fontSize: "14px", width: 140 }}
                        />
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <button
                          disabled={
                            this.state.claimStatus === "claimed" ||
                            this.state.claimStatus === "success"
                              ? true
                              : false
                          }
                          className={`btn filledbtn ${
                            this.state.claimStatus === "claimed"
                              ? "disabled-btn"
                              : this.state.claimStatus === "failed"
                              ? "fail-button"
                              : this.state.claimStatus === "success"
                              ? "success-button"
                              : null
                          } d-flex justify-content-center align-items-center gap-2`}
                          style={{ height: "fit-content" }}
                          onClick={this.handleClaimDivs}
                        >
                          {this.state.claimLoading &&
                          this.state.claimStatus === "initial" ? (
                            <div
                              class="spinner-border spinner-border-sm text-light"
                              role="status"
                            >
                              <span class="visually-hidden">Loading...</span>
                            </div>
                          ) : this.state.claimStatus === "failed" ? (
                            <>
                              <img src={failMark} alt="" />
                              Failed
                            </>
                          ) : this.state.claimStatus === "success" ? (
                            <>Success</>
                          ) : (
                            <>Claim</>
                          )}
                        </button>

                        <button
                          disabled={
                            // this.state.claimStatus === "invest" ? true :
                            false
                          }
                          className={`btn filledbtn ${
                            this.state.reInvestStatus === "invest"
                              ? "disabled-btn"
                              : this.state.reInvestStatus === "failed"
                              ? "fail-button"
                              : this.state.reInvestStatus === "success"
                              ? "success-button"
                              : null
                          } d-flex justify-content-center align-items-center gap-2`}
                          style={{ height: "fit-content" }}
                          onClick={this.handleReinvest}
                        >
                          {this.state.reInvestLoading &&
                          this.state.reInvestStatus === "invest" ? (
                            <div
                              class="spinner-border spinner-border-sm text-light"
                              role="status"
                            >
                              <span class="visually-hidden">Loading...</span>
                            </div>
                          ) : this.state.reInvestStatus === "failed" ? (
                            <>
                              <img src={failMark} alt="" />
                              Failed
                            </>
                          ) : this.state.reInvestStatus === "success" ? (
                            <>Success</>
                          ) : (
                            <>Reinvest</>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="otherside-border col-2">
                  <h6 className="deposit-txt d-flex align-items-center gap-2 justify-content-between">
                    WITHDRAW
                    <Tooltip
                      placement="top"
                      title={
                        <div style={{ whiteSpace: "pre-line" }}>
                          {"withdraw deposit text"}
                        </div>
                      }
                    >
                      <img src={moreinfo} alt="" />
                    </Tooltip>
                  </h6>

                  <button
                    // disabled={this.state.depositStatus === "success" ? false : true}
                    className={
                      // this.state.depositStatus === "success" ?
                      "filledbtn btn"
                      // :
                      //  "btn disabled-btn"
                    }
                    onClick={() => {
                      this.setState({ showWithdrawModal: true });
                    }}
                  >
                    Withdraw
                  </button>
                </div>
              </div>
            </div>
          </div>
          {this.state.popup && (
            <Modal
              visible={this.state.popup}
              modalId="tymodal"
              setIsVisible={() => {
                this.setState({ popup: false });
              }}
            >
              <div className="earn-hero-content p4token-wrapper">
                <div className="l-box pl-3 pr-3">
                  <div className="container">
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
                            <th>My DYP Deposit</th>
                            <div>
                              <strong>{depositedTokens}</strong>{" "}
                              <small>DYP</small>
                            </div>
                          </td>

                          <td className="text-right">
                            <th>My DYP Balance</th>
                            <div>
                              <strong>{token_balance}</strong>{" "}
                              <small>DYP</small>
                            </div>
                          </td>
                          <td className="text-right">
                            <th>Referral Fee Earned</th>
                            <div>
                              <strong>{referralFeeEarned}</strong>{" "}
                              <small>DYP</small>
                            </div>
                          </td>

                          {/* <td className="text-right">
                          <th>My DYP Deposit</th>
                          <div>
                            <strong>{depositedTokens}</strong>{" "}
                            <small>DYP</small>
                          </div>
                        </td> */}
                        </tr>

                        <tr>
                          <td className="text-right">
                            <th>Total DYP Locked</th>
                            <div>
                              <strong>{tvl}</strong> <small>DYP</small>
                            </div>
                          </td>
                          <td className="text-right">
                            <th>TVL USD</th>
                            <div>
                              <strong>${tvl_usd}</strong> <small>USD</small>
                            </div>
                          </td>

                          <td className="text-right">
                            <th>Contract Expiration</th>
                            <small>{expiration_time}</small>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="referralwrapper">
                      <div className="d-flex gap-2 align-items-start">
                        <img src={referralimg} alt="" />
                        <div
                          className="d-flex gap-2 flex-column"
                          style={{ width: "60%" }}
                        >
                          <div>
                            <span style={{ fontSize: ".8rem" }}>
                              <h6
                                className="referraltitle"
                                style={{ cursor: "pointer" }}
                              >
                                <Clipboard
                                  component="h6"
                                  onSuccess={(e) => {
                                    setTimeout(() => ReactTooltip.hide(), 2000);
                                  }}
                                  data-event="click"
                                  data-for={id}
                                  data-tip="Copied To Clipboard!"
                                  data-clipboard-text={this.getReferralLink()}
                                  className="referraltitle"
                                >
                                  Referral Link:
                                  <span
                                    title="Copy link to clipboard"
                                    style={{
                                      cursor: "pointer",
                                    }}
                                  ></span>
                                </Clipboard>
                                <ReactTooltip id={id} effect="solid" />
                              </h6>
                              <br />
                              {/* <a
                              className="text-muted small"
                              href={this.getReferralLink()}
                            >
                              {" "}
                              {this.getReferralLink()}{" "}
                            </a> */}
                            </span>
                          </div>

                          <h6 className="referraldesc">
                            Refferal link gives you 5% for each invite friend
                            you bring to buy DYP example
                          </h6>
                        </div>
                        <Clipboard
                          component="div"
                          onSuccess={(e) => {
                            setTimeout(() => ReactTooltip.hide(), 2000);
                          }}
                          data-event="click"
                          data-for={id}
                          data-tip="Copied To Clipboard!"
                          data-clipboard-text={this.getReferralLink()}
                          className=""
                        >
                          <button className="copybtn btn">
                            <img src={copy} alt="" /> Copy{" "}
                          </button>{" "}
                        </Clipboard>
                        <ReactTooltip id={id} effect="solid" />
                        &nbsp;{" "}
                      </div>
                    </div>
                    <div className="mt-4">
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`${window.config.etherscan_baseURL}/token/${reward_token._address}?a=${coinbase}`}
                        className="maxbtn"
                        style={{ color: "#7770e0" }}
                      >
                        Etherscan
                        <img src={arrowup} alt="" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
          )}

          {this.state.showWithdrawModal && (
            <Modal
              visible={this.state.showWithdrawModal}
              modalId="withdrawmodal"
              setIsVisible={() => {
                this.setState({ showWithdrawModal: false });
              }}
            >
              <div className="earn-hero-content p4token-wrapper">
                <div className="l-box pl-3 pr-3">
                  <div className="container">
                    <div className="row" style={{ marginLeft: "0px" }}>
                      <div className="d-flex justify-content-between gap-2 align-items-center p-0">
                        <h6 className="d-flex gap-2 align-items-center statstext">
                          <img src={stats} alt="" />
                          Withdraw
                        </h6>
                      </div>
                      <h6 className="withdrawdesc mt-2 p-0">
                        {/* {lockTime === "No Lock"
                        ? "Your deposit has no lock-in period. You can withdraw your assets anytime, or continue to earn rewards every day."
                        : `Your deposit is locked for ${lockTime} days. After ${lockTime} days you can
                      withdraw or you can continue to earn rewards everyday`} */}
                      </h6>
                    </div>

                    <div className="d-flex flex-column mt-2">
                      <div className="d-flex  gap-2 justify-content-between align-items-center">
                        <div className="d-flex flex-column gap-1">
                          <h6 className="withsubtitle">Timer</h6>
                          <h6
                            className="withtitle"
                            style={{ fontWeight: 300 }}
                          ></h6>
                        </div>
                      </div>
                      <div className="separator"></div>
                      <div className="d-flex  gap-2 justify-content-between align-items-center mb-4">
                        <div className="d-flex flex-column gap-1">
                          <h6 className="withsubtitle">Balance</h6>
                          <h6 className="withtitle">
                            {token_balance} {token_symbol}
                          </h6>
                        </div>
                      </div>

                      <div className="d-flex align-items-center justify-content-between gap-2">
                        <div className="position-relative w-100">
                          <h6 className="amount-txt">Withdraw Amount</h6>
                          <input
                            type={"text"}
                            className="styledinput"
                            placeholder="0.0"
                            style={{ width: "100%" }}
                            value={this.state.withdrawAmount}
                            onChange={(e) =>
                              this.setState({
                                withdrawAmount: e.target.value,
                              })
                            }
                          />
                        </div>
                        <button
                          className="btn maxbtn"
                          onClick={this.handleSetMaxWithdraw}
                        >
                          Max
                        </button>
                      </div>

                      <div className="d-flex align-items-center justify-content-between gap-2 mt-4">
                        <button
                          disabled={
                            this.state.withdrawStatus === "failed" ||
                            this.state.withdrawStatus === "success" ||
                            this.state.withdrawAmount === ""
                              ? true
                              : false
                          }
                          className={` w-100 btn filledbtn ${
                            this.state.withdrawStatus === "failed"
                              ? "fail-button"
                              : this.state.withdrawStatus === "success"
                              ? "success-button"
                              : this.state.withdrawAmount === ""
                              ? "disabled-btn"
                              : null
                          } d-flex justify-content-center align-items-center`}
                          style={{ height: "fit-content" }}
                          onClick={() => {
                            this.handleWithdraw();
                          }}
                        >
                          {this.state.withdrawLoading ? (
                            <div
                              class="spinner-border spinner-border-sm text-light"
                              role="status"
                            >
                              <span class="visually-hidden">Loading...</span>
                            </div>
                          ) : this.state.withdrawStatus === "failed" ? (
                            <>
                              <img src={failMark} alt="" />
                              Failed
                            </>
                          ) : this.state.withdrawStatus === "success" ? (
                            <>Success</>
                          ) : (
                            <>Withdraw</>
                          )}
                        </button>

                        {/* <button
                        className="btn filledbtn w-100"
                        onClick={(e) => {
                          // e.preventDefault();
                          this.handleWithdraw();
                        }}
                        title={
                          canWithdraw
                            ? ""
                            : `You recently staked, you can unstake ${cliffTimeInWords}`
                        }
                      >
                        Withdraw
                      </button> */}

                        {/* <div className="form-row">
                            <div className="col-6">
                              <button
                                title={
                                  canWithdraw
                                    ? ""
                                    : `You recently staked, you can unstake ${cliffTimeInWords}`
                                }
                                disabled={!canWithdraw || !is_connected}
                                className="btn  btn-primary btn-block l-outline-btn"
                                type="submit"
                              >
                                WITHDRAW
                              </button>
                            </div>
                            <div className="col-6">
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  this.handleWithdrawDyp();
                                }}
                                title={
                                  canWithdraw
                                    ? ""
                                    : `You recently staked, you can unstake ${cliffTimeInWords}`
                                }
                                disabled={!canWithdraw || !is_connected}
                                className="btn  btn-primary btn-block l-outline-btn"
                                type="submit"
                              >
                                WITHDRAW
                              </button>
                            </div>
                          </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
          )}

          {this.state.show && (
            <WalletModal
              show={this.state.show}
              handleClose={this.state.hideModal}
              handleConnection={this.props.handleConnection}
            />
          )}
        </div>

        // <div>
        //   <div className="row">
        //     <div className="col-12 header-image-staking-new">
        //       <div className="container">
        //         <Modal show={this.state.popup} handleClose={this.hidePopup}>
        //           <div className="earn-hero-content p4token-wrapper">
        //             <p className="h3">
        //               <b>DYP Staking</b>
        //             </p>
        //             <p>
        //               Stake your DYP tokens and earn {this.state.apy}% APR with
        //               no Impermanent Loss.
        //             </p>
        //             <p>
        //               To start earning, all you need is to deposit DYP tokens
        //               into the Staking contract and earn DYP as rewards.
        //             </p>
        //             <p>
        //               The staking pools have the REINVEST function integrated,
        //               meaning that you can automatically add your daily rewards
        //               to the staking pool. Moreover, the DYP Referral is
        //               available. If you refer DYP to your friends, 5% of your
        //               friends’ rewards will automatically be sent to you
        //               whenever they stake DYP.
        //             </p>
        //           </div>
        //         </Modal>
        //         <Modal
        //           show={this.state.show}
        //           handleConnection={this.props.handleConnection}
        //           handleConnectionWalletConnect={
        //             this.props.handleConnectionWalletConnect
        //           }
        //           handleClose={this.hideModal}
        //         />
        //         <div className="row">
        //           <div className="col-12">
        //             <p className="header-title-text">DYP Staking</p>
        //           </div>
        //           <div className="col-7 col-md-7 col-lg-6 col-xl-5">
        //             <div className="row">
        //               <div className="col-9 col-md-5 mb-4">
        //                 <button
        //                   onClick={this.showPopup}
        //                   className="btn  btn-block btn-primary button"
        //                   type="button"
        //                   style={{ maxWidth: "100%", width: "100%" }}
        //                 >
        //                   <img
        //                     src="img/icon/bulb.svg"
        //                     style={{ float: "left" }}
        //                     alt="wallet"
        //                   />
        //                   More info
        //                 </button>
        //               </div>
        //               <div className="col-11 col-md-5 mb-4">
        //                 <button
        //                   className
        //                   onClick={() =>
        //                     window.open(
        //                       "https://www.youtube.com/watch?v=s9gwo3J119U",
        //                       "_blank"
        //                     )
        //                   }
        //                   className="btn  btn-block btn-primary l-outline-btn button"
        //                   type="submit"
        //                   style={{ maxWidth: "100%", width: "100%" }}
        //                 >
        //                   <img
        //                     src="img/icon/video.svg"
        //                     style={{ float: "left" }}
        //                     alt="wallet"
        //                   />
        //                   Video tutorial
        //                 </button>
        //               </div>
        //             </div>
        //           </div>
        //         </div>
        //       </div>
        //     </div>

        //     <div className="container">
        //       <div className="token-staking mt-4">
        //         <div className="row p-3 p-sm-0 p-md-0">
        //           <div className="col-12">
        //             <div className="row">
        //               <div className="col-lg-6 col-xs-12">
        //                 <div className="row token-staking-form">
        //                   <div className="col-12">
        //                     <div
        //                       className="l-box"
        //                       style={{ padding: "0.5rem" }}
        //                     >
        //                       {is_connected ? (
        //                         <div className="row justify-content-center">
        //                           <div
        //                             className="col-9 col-sm-8 col-md-7 text-center text-md-left"
        //                             style={{ marginTop: "0px" }}
        //                           >
        //                             <img
        //                               src="img/connected.png"
        //                               style={{
        //                                 marginRight: "10px",
        //                                 marginTop: "3px",
        //                               }}
        //                               alt="wallet"
        //                             />
        //                             <span
        //                               htmlFor="deposit-amount"
        //                               style={{
        //                                 margin: "0",
        //                                 top: "3px",
        //                                 position: "relative",
        //                               }}
        //                             >
        //                               Wallet has been connected
        //                             </span>
        //                           </div>
        //                           <div className="col-8 col-sm-6 col-md-5 text-center">
        //                             <div
        //                               style={{
        //                                 marginTop: "5px",
        //                                 paddingRight: "15px",
        //                               }}
        //                             >
        //                               <Address
        //                                 style={{ fontFamily: "monospace" }}
        //                                 a={coinbase}
        //                               />
        //                             </div>
        //                           </div>
        //                         </div>
        //                       ) : (
        //                         <div className="row justify-content-center">
        //                           <div
        //                             className="col-11 col-sm-8 col-md-8 text-center text-md-left mb-3 mb-md-0"
        //                             style={{ marginTop: "0px" }}
        //                           >
        //                             <img
        //                               src="img/icon/wallet.svg"
        //                               style={{
        //                                 marginRight: "10px",
        //                                 marginTop: "3px",
        //                               }}
        //                               alt="wallet"
        //                             />
        //                             <label
        //                               htmlFor="deposit-amount"
        //                               style={{
        //                                 margin: "0",
        //                                 top: "3px",
        //                                 position: "relative",
        //                               }}
        //                             >
        //                               Please connect wallet to use this dApp
        //                             </label>
        //                           </div>
        //                           <div className="col-10 col-md-4 mb-3 mb-md-0">
        //                             <button
        //                               type="submit"
        //                               onClick={this.showModal}
        //                               className="btn  btn-block btn-primary l-outline-btn"
        //                             >
        //                               Connect Wallet
        //                             </button>
        //                           </div>
        //                         </div>
        //                       )}
        //                     </div>
        //                   </div>
        //                 </div>
        //               </div>
        //               <div className="col-lg-6 col-xs-12">
        //                 <div className="row token-staking-form">
        //                   <div className="col-12 padding-mobile">
        //                     <div
        //                       className=""
        //                       style={{
        //                         background:
        //                           "linear-gradient(257.76deg, #E84142 6.29%, #CB2627 93.71%)",
        //                         boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.06)",
        //                         borderRadius: "6px",
        //                         paddingLeft: "5px",
        //                         padding: "10px",
        //                       }}
        //                     >
        //                       <div className="row">
        //                         <div
        //                           style={{ marginTop: "0px", paddingLeft: "" }}
        //                           className="col-4 col-sm-4 col-md-3 mb-3 mb-md-0 pr-0"
        //                         >
        //                           <img
        //                             src="img/icon/avax.svg"
        //                             style={{
        //                               marginRight: "4px",
        //                               marginTop: "5px",
        //                             }}
        //                             alt="wallet"
        //                           />
        //                           <label
        //                             htmlFor="deposit-amount"
        //                             style={{
        //                               margin: "0px",
        //                               top: "3px",
        //                               position: "relative",
        //                               color: "white",
        //                             }}
        //                           >
        //                             Avalanche
        //                           </label>
        //                         </div>
        //                         <div className="col-8 col-sm-6 col-md-5 mb-3 mb-md-0 pr-2">
        //                           <div className="test">
        //                             <div className="tvl_test">
        //                               TVL USD{" "}
        //                               <span className="testNumber">
        //                                 $ {tvl_usd}{" "}
        //                               </span>
        //                             </div>
        //                           </div>
        //                         </div>
        //                         <div className="col-6 col-sm-4 col-md-4 mb-1 mb-md-0">
        //                           <div className="test">
        //                             <div className="tvl_test">
        //                               APR{" "}
        //                               <span className="testNumber">
        //                                 {" "}
        //                                 <img src="img/icon/vector.svg" />{" "}
        //                                 {getFormattedNumber(this.state.apy, 2)}%{" "}
        //                               </span>
        //                             </div>
        //                           </div>
        //                         </div>
        //                       </div>
        //                     </div>
        //                   </div>
        //                 </div>
        //               </div>
        //             </div>
        //           </div>
        //           <div className="col-lg-6">
        //             <div className="row token-staking-form">
        //               <div className="col-12">
        //                 <div className="l-box">
        //                   {showDeposit == true ? (
        //                     <form onSubmit={(e) => e.preventDefault()}>
        //                       <div className="form-group">
        //                         <div className="row">
        //                           <label
        //                             htmlFor="deposit-amount"
        //                             className="col-md-8 d-block text-left"
        //                           >
        //                             DEPOSIT
        //                           </label>
        //                           <div className="col-4">
        //                             <a
        //                               target="_blank"
        //                               rel="noopener noreferrer"
        //                               href={`https://app.pangolin.exchange/#/swap?inputCurrency=${liquidity}&outputCurrency=0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17`}
        //                             >
        //                               <button
        //                                 className="btn btn-sm btn-block btn-primary l-outline-btn"
        //                                 type="button"
        //                               >
        //                                 GET DYP
        //                               </button>
        //                             </a>
        //                           </div>
        //                         </div>
        //                         <div className="input-group ">
        //                           <input
        //                             value={
        //                               Number(this.state.depositAmount) > 0
        //                                 ? this.state.depositAmount
        //                                 : this.state.depositAmount
        //                             }
        //                             onChange={(e) =>
        //                               this.setState({
        //                                 depositAmount: e.target.value,
        //                               })
        //                             }
        //                             className="form-control left-radius"
        //                             placeholder="0"
        //                             type="text"
        //                           />
        //                           <div className="input-group-append">
        //                             <button
        //                               disabled={!is_connected}
        //                               className="btn  btn-primary right-radius btn-max l-light-btn"
        //                               style={{ cursor: "pointer" }}
        //                               onClick={this.handleSetMaxDeposit}
        //                             >
        //                               MAX
        //                             </button>
        //                           </div>
        //                         </div>
        //                       </div>
        //                       <div className="row">
        //                         <div
        //                           style={{ paddingRight: "0.3rem" }}
        //                           className="col-6"
        //                         >
        //                           <button
        //                             disabled={!is_connected}
        //                             onClick={this.handleApprove}
        //                             className="btn  btn-block btn-primary "
        //                             type="button"
        //                           >
        //                             APPROVE
        //                           </button>
        //                         </div>
        //                         <div
        //                           style={{ paddingLeft: "0.3rem" }}
        //                           className="col-6"
        //                         >
        //                           <button
        //                             disabled={!is_connected}
        //                             onClick={this.handleStake}
        //                             className="btn  btn-block btn-primary l-outline-btn"
        //                             type="submit"
        //                           >
        //                             DEPOSIT
        //                           </button>
        //                         </div>
        //                       </div>
        //                       <p
        //                         style={{ fontSize: ".8rem" }}
        //                         className="mt-1 text-center mb-0 text-muted mt-3"
        //                       >
        //                         Please approve before staking. PERFORMANCE FEE{" "}
        //                         {fee}%<br />
        //                         Performance fees are already subtracted from the
        //                         displayed APR.
        //                       </p>
        //                     </form>
        //                   ) : (
        //                     <div className="row">
        //                       <div
        //                         className="col-md-12 d-block text-muted small"
        //                         style={{ fontSize: "15px" }}
        //                       >
        //                         <b>NOTE:</b>
        //                       </div>
        //                       <div
        //                         className="col-md-12 d-block text-muted small"
        //                         style={{ fontSize: "15px" }}
        //                       >
        //                         Deposit not available because the contract
        //                         expires faster than the pool lock time.
        //                       </div>
        //                       <div
        //                         className="col-md-12 d-block mb-0 text-muted small"
        //                         style={{ fontSize: "15px" }}
        //                       >
        //                         New contracts with improved strategies are
        //                         coming soon, waiting for security audit results.
        //                       </div>
        //                     </div>
        //                   )}
        //                 </div>
        //               </div>
        //               <div className="col-12">
        //                 <div className="l-box">
        //                   <form onSubmit={this.handleWithdraw}>
        //                     <div className="form-group">
        //                       <label
        //                         htmlFor="deposit-amount"
        //                         className="d-block text-left"
        //                       >
        //                         WITHDRAW
        //                       </label>
        //                       <div className="input-group ">
        //                         <input
        //                           value={this.state.withdrawAmount}
        //                           onChange={(e) =>
        //                             this.setState({
        //                               withdrawAmount: e.target.value,
        //                             })
        //                           }
        //                           className="form-control left-radius"
        //                           placeholder="0"
        //                           type="text"
        //                         />
        //                         <div className="input-group-append">
        //                           <button
        //                             className="btn  btn-primary right-radius btn-max l-light-btn"
        //                             style={{ cursor: "pointer" }}
        //                             onClick={this.handleSetMaxWithdraw}
        //                           >
        //                             MAX
        //                           </button>
        //                         </div>
        //                       </div>
        //                     </div>
        //                     <button
        //                       title={
        //                         canWithdraw
        //                           ? ""
        //                           : `You recently staked, you can unstake ${cliffTimeInWords}`
        //                       }
        //                       disabled={!canWithdraw || !is_connected}
        //                       className="btn  btn-primary btn-block l-outline-btn"
        //                       type="submit"
        //                     >
        //                       WITHDRAW
        //                     </button>
        //                     <p
        //                       style={{ fontSize: ".8rem" }}
        //                       className="mt-1 text-center text-muted mt-3"
        //                     >
        //                       0% fee for withdraw
        //                     </p>
        //                   </form>
        //                 </div>
        //               </div>
        //               <div className="col-12">
        //                 <div className="l-box">
        //                   <form onSubmit={this.handleClaimDivs}>
        //                     <div className="form-group">
        //                       <label
        //                         htmlFor="deposit-amount"
        //                         className="text-left d-block"
        //                       >
        //                         REWARDS
        //                       </label>
        //                       <div className="form-row">

        //                         <div className="col-md-12">

        //                           <input
        //                             value={
        //                               Number(pendingDivs) > 0
        //                                 ? `${pendingDivs} DYP`
        //                                 : `${pendingDivs} DYP`
        //                             }
        //                             onChange={(e) =>
        //                               this.setState({
        //                                 pendingDivs:
        //                                   Number(e.target.value) > 0
        //                                     ? e.target.value
        //                                     : e.target.value,
        //                               })
        //                             }
        //                             className="form-control left-radius"
        //                             placeholder="0"
        //                             type="text"
        //                             disabled
        //                           />
        //                         </div>
        //                       </div>
        //                     </div>
        //                     <div className="form-row">
        //                       <div className="col-md-6 mb-2">
        //                         <button
        //                           disabled={!is_connected}
        //                           className="btn  btn-primary btn-block "
        //                           type="submit"
        //                         >
        //                           CLAIM
        //                         </button>
        //                       </div>
        //                       <div className="col-md-6 mb-2">
        //                         <button
        //                           disabled={!is_connected}
        //                           className="btn  btn-primary btn-block l-outline-btn"
        //                           type="button"
        //                           onClick={this.handleReinvest}
        //                         >
        //                           REINVEST
        //                         </button>
        //                       </div>
        //                     </div>
        //                   </form>
        //                 </div>
        //               </div>
        //               <div className="col-12">
        //                 <div className="l-box">
        //                   <form onSubmit={(e) => e.preventDefault()}>
        //                     <div className="form-group">
        //                       <label
        //                         htmlFor="deposit-amount"
        //                         className="d-block text-left"
        //                       >
        //                         RETURN CALCULATOR
        //                       </label>
        //                       <div className="row">
        //                         <div className="col">
        //                           <label
        //                             style={{
        //                               fontSize: "1rem",
        //                               fontWeight: "normal",
        //                             }}
        //                           >
        //                             DYP to Deposit
        //                           </label>
        //                           <input
        //                             className="form-control "
        //                             value={this.state.approxDeposit}
        //                             onChange={(e) =>
        //                               this.setState({
        //                                 approxDeposit: e.target.value,
        //                               })
        //                             }
        //                             placeholder="0"
        //                             type="text"
        //                           />
        //                         </div>
        //                         <div className="col">
        //                           <label
        //                             style={{
        //                               fontSize: "1rem",
        //                               fontWeight: "normal",
        //                             }}
        //                           >
        //                             Days
        //                           </label>
        //                           <input
        //                             className="form-control "
        //                             value={this.state.approxDays}
        //                             onChange={(e) =>
        //                               this.setState({
        //                                 approxDays: e.target.value,
        //                               })
        //                             }
        //                             type="text"
        //                           />
        //                         </div>
        //                       </div>
        //                     </div>
        //                     <p>
        //                       Approx.{" "}
        //                       {getFormattedNumber(this.getApproxReturn(), 6)}{" "}
        //                       DYP
        //                     </p>

        //                    </form>
        //                 </div>
        //               </div>
        //             </div>
        //           </div>
        //           <div className="col-lg-6">
        //             {/* <Boxes
        //               items={[
        //                 {
        //                   title: "TVL USD",
        //                   number: "$" + tvl_usd,
        //                 },
        //                 {
        //                   title: `APR`,
        //                   number: getFormattedNumber(this.state.apy, 2) + "%",
        //                 },
        //               ]}
        //             />*/}
        //             <div className="l-box">
        //               <div className="table-responsive">
        //                 <h3
        //                   style={{
        //                     fontSize: "1.1rem",
        //                     fontWeight: "600",
        //                     padding: ".3rem",
        //                   }}
        //                 >
        //                   STATS
        //                 </h3>
        //                 <table className="table-stats table table-sm table-borderless">
        //                   <tbody>

        //                     <tr>
        //                       <th>Contract Expiration</th>
        //                       <td className="text-right">
        //                         <strong>{expiration_time}</strong>
        //                       </td>
        //                     </tr>

        //                     <tr>
        //                       <th>My DYP Balance</th>
        //                       <td className="text-right">
        //                         <strong>{token_balance}</strong>{" "}
        //                         <small>{token_symbol}</small>
        //                       </td>
        //                     </tr>

        //                     <tr>
        //                       <th>MY DYP Deposit</th>
        //                       <td className="text-right">
        //                         <strong>{depositedTokens}</strong>{" "}
        //                         <small>{token_symbol}</small>
        //                       </td>
        //                     </tr>
        //                     <tr>
        //                       <th>Total DYP Locked</th>
        //                       <td className="text-right">
        //                         <strong>{tvl}</strong>{" "}
        //                         <small>{token_symbol}</small>
        //                       </td>
        //                     </tr>

        //                     <tr>
        //                       <th>TVL USD</th>
        //                       <td className="text-right">
        //                         <strong>${tvl_usd}</strong> <small>USD</small>
        //                       </td>
        //                     </tr>

        //                     {is_connected ? (
        //                       <tr>
        //                         <td
        //                           style={{
        //                             fontSize: "1rem",
        //                             paddingTop: "2rem",
        //                           }}
        //                           colSpan="2"
        //                           className="text-center"
        //                         >
        //                           <a
        //                             target="_blank"
        //                             rel="noopener noreferrer"
        //                             href={`${window.config.etherscan_baseURL}/token/${reward_token._address}?a=${coinbase}`}
        //                           >
        //                             View Transaction History on SnowTrace
        //                           </a>{" "}
        //                           &nbsp;{" "}
        //                           <i
        //                             style={{ fontSize: ".8rem" }}
        //                             className="fas fa-external-link-alt"
        //                           ></i>
        //                         </td>
        //                       </tr>
        //                     ) : (
        //                       ""
        //                     )}

        //                     <tr></tr>
        //                     {isOwner && (
        //                       <tr>
        //                         <td
        //                           style={{ fontSize: "1rem" }}
        //                           colSpan="2"
        //                           className="text-center"
        //                         >
        //                           <a
        //                             onClick={this.handleListDownload}
        //                             target="_blank"
        //                             rel="noopener noreferrer"
        //                             href="#"
        //                           >
        //                             <i
        //                               style={{ fontSize: ".8rem" }}
        //                               className="fas fa-download"
        //                             ></i>{" "}
        //                             Download Stakers List{" "}
        //                           </a>
        //                         </td>
        //                       </tr>
        //                     )}
        //                   </tbody>
        //                 </table>
        //               </div>
        //             </div>
        //           </div>
        //         </div>

        //         {/* <div className='mt-3 text-center'>
        //             <p><small>Some info text here</small></p>
        //         </div> */}
        //       </div>
        //     </div>
        //   </div>
        // </div>
      );
    }
  }

  return StakingAvax;
}

import React from "react";
import getFormattedNumber from "../../functions/get-formatted-number";
import Countdown from "react-countdown";
import "./bridge.css";
import eth from "./assets/eth.svg";
import bnb from "./assets/bnb.svg";
import avax from "./assets/avax.svg";
import wallet from "./assets/wallet.svg";
import moreinfo from "./assets/more-info.svg";
import switchicon from "./assets/switch.svg";
import failMark from "../../assets/failMark.svg";
import Tooltip from "@material-ui/core/Tooltip";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import routeIcon from "./assets/route-icon.svg";
import Address from "../FARMINNG/address";
import WalletModal from "../WalletModal";

// Renderer callback with condition
const getRenderer =
  (completedText = "0s", braces = false) =>
  ({ days, hours, minutes, seconds, completed }) => {
    if (braces && completedText === "0s") {
      completedText = "( 0s )";
    }
    if (completed) {
      // Render a complete state
      return <span>{completedText}</span>;
    } else {
      // Render a countdown
      return (
        <span>
          {braces ? "(" : ""} {days > 0 ? days + "d " : ""}
          {hours > 0 || days > 0 ? hours + "h " : ""}
          {minutes > 0 || hours > 0 || days > 0 ? minutes + "m " : ""}
          {seconds}s {braces ? ")" : ""}
          {/* {days}d {hours}h {minutes}m {seconds}s Left */}
        </span>
      );
    }
  };

export default function initBridgebsc({
  bridgeETH,
  bridgeBSC,
  tokenETH,
  tokenBSC,
  TOKEN_DECIMALS = 18,
  TOKEN_SYMBOL = "DYP",
}) {
  let { BigNumber } = window;

  class Bridge extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        token_balance: "",
        network: "ETH",
        depositAmount: "",
        coinbase: "",
        gasPrice: "",
        txHash: "",
        chainText: "",
        ethPool: "...",
        bnbPool: "...",
        withdrawableUnixTimestamp: null,
        depositLoading: false,
        depositStatus: "initial",
        withdrawLoading: false,
        withdrawStatus: "initial",
        errorMsg: "",
        errorMsg2: "",
        showWalletModal: false,
      };
    }

    componentDidMount() {
      this.refreshBalance();
      this.getChainSymbol();
      this.fetchData();
      window._refreshBalInterval = setInterval(this.refreshBalance, 4000);
    }

    componentWillUnmount() {
      clearInterval(window._refreshBalInterval);
    }

    fetchData = async () => {
      if (this.props.isConnected) {
        fetch(
          "https://data-api.defipulse.com/api/v1/egs/api/ethgasAPI.json?api-key=f9b308da480b2941d3f23b9e0366c141f8998f75803a5ee65f51cbcb261f"
        )
          .then((res) => res.json())
          .then((data) => this.setState({ gasPrice: data.fast / 10 }))
          .catch(console.error);
      }

      //Get DYP Balance Ethereum Pool
      let ethPool = await window.getTokenHolderBalanceAll(
        bridgeETH._address,
        bridgeETH.tokenAddress,
        1
      );
      ethPool = ethPool / 1e18;

      //Get DYP Balance BNB Chain Pool
      let bnbPool = await window.getTokenHolderBalanceAll(
        bridgeBSC._address,
        bridgeETH.tokenAddress,
        2
      );
      bnbPool = bnbPool / 1e18;

      this.setState({ ethPool, bnbPool });
    };

    handleApprove = (e) => {
      e.preventDefault();
      let amount = this.state.depositAmount;

      if (this.state.chainText === "ETH") {
        if (amount > this.state.bnbPool) {
          window.$.alert(
            "💡 Not enough balance on the bridge, check back later!"
          );
          return;
        }
      } else {
        if (amount > this.state.ethPool) {
          window.$.alert(
            "💡 Not enough balance on the bridge, check back later!"
          );
          return;
        }
      }

      amount = new BigNumber(amount).times(10 ** TOKEN_DECIMALS).toFixed(0);
      let bridge = this.state.network === "ETH" ? bridgeETH : bridgeBSC;
      (this.state.network === "ETH" ? tokenETH : tokenBSC).approve(
        bridge._address,
        amount
      );
    };

    handleDeposit = async (e) => {
      let amount = this.state.depositAmount;

      if (this.state.chainText === "ETH") {
        if (amount > this.state.bnbPool) {
          window.$.alert(
            "💡 Not enough balance on the bridge, check back later!"
          );
          return;
        }
      } else {
        if (amount > this.state.ethPool) {
          window.$.alert(
            "💡 Not enough balance on the bridge, check back later!"
          );
          return;
        }
      }

      amount = new BigNumber(amount).times(10 ** TOKEN_DECIMALS).toFixed(0);
      let bridge = this.state.network === "ETH" ? bridgeETH : bridgeBSC;
      let chainId = this.props.networkId;

      if (chainId !== undefined) {
        let contract = await window.getBridgeContract(bridge._address);
        contract.methods
          .deposit(amount)
          .send({ from: await window.getCoinbase() }, (err, txHash) => {
            this.setState({ txHash });
          });
      }
    };

    handleWithdraw = async (e) => {
      e.preventDefault();
      let amount = this.state.withdrawAmount;
      amount = new BigNumber(amount).times(10 ** TOKEN_DECIMALS).toFixed(0);
      try {
        let url =
          window.config.SIGNATURE_API_URLBSC +
          `/api/withdraw-args?depositNetwork=${
            this.state.network === "ETH" ? "BSC" : "ETH"
          }&txHash=${this.state.txHash}`;
        console.log({ url });
        let args = await window.jQuery.get(url);
        console.log({ args });
        (this.state.network === "ETH" ? bridgeETH : bridgeBSC).withdraw(args);
      } catch (e) {
        window.alertify.error("Something went wrong!");
        console.error(e);
      }
    };

    handleSetMaxDeposit = (e) => {
      e.preventDefault();
      this.setState({
        depositAmount: new BigNumber(this.state.token_balance)
          .div(10 ** TOKEN_DECIMALS)
          .toFixed(TOKEN_DECIMALS),
      });
    };

    refreshBalance = async () => {
      if (this.props.isConnected) {
        let coinbase = await window.getCoinbase();
        this.setState({ coinbase });
        try {
          let chainId = this.props.networkId;

          let network = window.config.chain_ids[chainId] || "UNKNOWN";

          let token_balance = await (network === "BSC"
            ? tokenBSC
            : tokenETH
          ).balanceOf(coinbase);

          this.setState({
            token_balance,
            network,
          });

          if (this.state.txHash) {
            try {
              let url =
                window.config.SIGNATURE_API_URL +
                `/api/withdraw-args?depositNetwork=${
                  this.state.network === "ETH" ? "BSC" : "ETH"
                }&txHash=${
                  this.state.txHash
                }&getWithdrawableUnixTimestamp=true`;
              console.log({ url });
              let { withdrawableUnixTimestamp } = await window.jQuery.get(url);
              this.setState({ withdrawableUnixTimestamp });
              console.log({ withdrawableUnixTimestamp });
            } catch (e) {
              console.error(e);
              this.setState({ withdrawableUnixTimestamp: null });
            }
          } else this.setState({ withdrawableUnixTimestamp: null });
        } catch (e) {
          console.error(e);
        }
      }
    };

    getChainSymbol = async () => {
      try {
        let chainId = this.props.networkId;
        if (chainId === 56) this.setState({ chainText: "BSC" });
        else if (chainId === 1) this.setState({ chainText: "ETH" });
      } catch (err) {
        this.setState({ chainText: "ETH" });
        // console.log(err);
      }
    };

    render() {
      let canWithdraw = false;
      let timeDiff = null;

      if (this.state.withdrawableUnixTimestamp) {
        timeDiff = Math.max(
          0,
          this.state.withdrawableUnixTimestamp * 1e3 - Date.now()
        );
        canWithdraw = timeDiff === 0;
      }

      return (
        <div className="d-flex gap-4 justify-content-between">
          <div className="token-staking mt-5 col-5">
            <div className="purplediv"></div>
            <div className="row">
              <div>
                <div className="d-flex flex-column">
                  <h6 className="fromtitle mb-2">From</h6>
                  <div className="d-flex align-items-center justify-content-between gap-2">
                    <div className="d-flex align-items-center justify-content-between gap-3">
                      <div
                        className={
                          this.props.networkId === 1
                            ? "optionbtn-active"
                            : "optionbtn-passive"
                        }
                      >
                        <h6 className="optiontext">
                          <img src={eth} alt="" /> Ethereum
                        </h6>
                      </div>
                      <div
                        className={
                          this.props.networkId === 56
                            ? "optionbtn-active"
                            : "optionbtn-passive"
                        }
                      >
                        <h6 className="optiontext">
                          <img src={bnb} alt="" /> BNB Chain
                        </h6>
                      </div>
                      <div
                        className={
                          this.props.networkId === 43114
                            ? "optionbtn-active"
                            : "optionbtn-passive"
                        }
                      >
                        <h6 className="optiontext">
                          <img src={avax} alt="" /> Avalanche
                        </h6>
                      </div>
                    </div>
                    {this.props.isConnected === false ? (
                      <button
                        className="connectbtn btn d-flex align-items-center gap-2"
                        style={{ width: "fit-content" }}
                        onClick={() => {
                          this.setState({ showWalletModal: true });
                        }}
                      >
                        <img src={wallet} alt="" />
                        Connect wallet
                      </button>
                    ) : (
                      <div className="addressbtn btn">
                        <Address a={this.state.coinbase} chainId={43114} />
                      </div>
                    )}
                  </div>
                </div>
                <div className="row token-staking-form">
                  <div className="col-12">
                    <div className="l-box">
                      <form onSubmit={(e) => e.preventDefault()}>
                        <div className="form-group">
                          <div className="row m-0">
                            <div className="activewrapper mt-3 mb-3">
                              <label
                                htmlFor="deposit-amount"
                                className="chainWrapper text-left"
                              >
                                <h6 className="mybalance-text">
                                  Balance:
                                  <b>
                                    {" "}
                                    {getFormattedNumber(
                                      this.state.token_balance / 1e18,
                                      6
                                    )}
                                  </b>
                                  DYP
                                </h6>
                              </label>
                              <div className="">
                                <h6
                                  className="poolbalance-text"
                                  style={{ gap: "6px" }}
                                >
                                  {this.state.chainText === "ETH"
                                    ? "Ethereum"
                                    : "BNB Chain"}{" "}
                                  Pool:{" "}
                                  <b>
                                    {this.state.chainText === "ETH"
                                      ? getFormattedNumber(
                                          this.state.ethPool,
                                          2
                                        )
                                      : getFormattedNumber(
                                          this.state.bnbPool,
                                          2
                                        )}{" "}
                                    DYP
                                  </b>
                                </h6>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 otherside w-100">
                            <h6 className="fromtitle d-flex justify-content-between align-items-center mt-1 mb-2">
                              Deposit
                              <Tooltip
                                placement="top"
                                title={
                                  <div className="tooltip-text">
                                    {"deposit text"}
                                  </div>
                                }
                              >
                                <img src={moreinfo} alt="" />
                              </Tooltip>
                            </h6>

                            <div className="d-flex gap-2 align-items-center justify-content-between">
                              <div className="d-flex gap-2 align-items-center">
                                <input
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
                                  className="styledinput"
                                  placeholder="0"
                                  type="text"
                                />

                                <button
                                  className="btn maxbtn"
                                  style={{ cursor: "pointer" }}
                                  onClick={this.handleSetMaxDeposit}
                                >
                                  MAX
                                </button>
                              </div>

                              <button
                                style={{ width: "fit-content" }}
                                disabled={
                                  this.state.depositAmount === "" ||
                                  this.state.depositLoading === true ||
                                  this.state.depositStatus === "success"
                                    ? true
                                    : false
                                }
                                className={`btn filledbtn ${
                                  this.state.depositAmount === "" &&
                                  this.state.depositStatus === "initial" &&
                                  "disabled-btn"
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
                                    ? this.handleDeposit()
                                    : this.state.depositStatus === "initial" &&
                                      this.state.depositAmount !== ""
                                    ? this.handleApprove()
                                    : console.log("");
                                }}
                              >
                                {this.state.depositLoading ? (
                                  <div
                                    class="spinner-border spinner-border-sm text-light"
                                    role="status"
                                  >
                                    <span class="visually-hidden">
                                      Loading...
                                    </span>
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
                            <p
                              style={{ fontSize: ".8rem" }}
                              className="mt-1 text-center mb-0"
                              id="firstPlaceholder"
                            >
                              Please approve before deposit.
                            </p>
                            {this.state.errorMsg && (
                              <h6 className="errormsg">
                                {this.state.errorMsg}
                              </h6>
                            )}
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <img
                    src={switchicon}
                    alt=""
                    style={{ width: 100, height: 100, margin: "auto" }}
                  />
                  <div className="col-12">
                    <div className="l-box">
                      <form className="pb-0">
                        <div className="form-group">
                          <label
                            htmlFor="deposit-amount"
                            className="d-block text-left"
                          >
                            <div className="d-flex flex-column">
                              <h6 className="fromtitle">to:</h6>
                              <div className="d-flex align-items-center justify-content-between gap-2">
                                <div className="d-flex align-items-center justify-content-between gap-3">
                                  <div
                                    className={
                                      this.props.networkId === 1
                                        ? "optionbtn-active"
                                        : "optionbtn-passive"
                                    }
                                  >
                                    <h6 className="optiontext">
                                      <img src={eth} alt="" /> Ethereum
                                    </h6>
                                  </div>
                                  <div
                                    className={
                                      this.props.networkId === 56
                                        ? "optionbtn-active"
                                        : "optionbtn-passive"
                                    }
                                  >
                                    <h6 className="optiontext">
                                      <img src={bnb} alt="" /> BNB Chain
                                    </h6>
                                  </div>
                                  <div
                                    className={
                                      this.props.networkId === 43114
                                        ? "optionbtn-active"
                                        : "optionbtn-passive"
                                    }
                                  >
                                    <h6 className="optiontext">
                                      <img src={avax} alt="" /> Avalanche
                                    </h6>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </label>

                          <div className="mt-4 otherside w-100">
                            <h6 className="fromtitle d-flex justify-content-between align-items-center mt-1 mb-2">
                              RECEIVE
                              <div className="d-flex align-items-center gap-2">
                                <h6
                                  className="poolbalance-text"
                                  style={{ gap: "6px" }}
                                >
                                  {this.state.chainText === "ETH"
                                    ? "BNB Chain"
                                    : "Ethereum"}{" "}
                                  Pool:{" "}
                                  <b>
                                    {this.state.chainText === "ETH"
                                      ? getFormattedNumber(
                                          this.state.bnbPool,
                                          2
                                        )
                                      : getFormattedNumber(
                                          this.state.ethPool,
                                          2
                                        )}{" "}
                                    DYP
                                  </b>
                                </h6>

                                <Tooltip
                                  placement="top"
                                  title={
                                    <div className="tooltip-text">
                                      {"RECEIVE text"}
                                    </div>
                                  }
                                >
                                  <img src={moreinfo} alt="" />
                                </Tooltip>
                              </div>
                            </h6>

                            <div className="d-flex gap-2 align-items-center justify-content-between">
                              <div className="d-flex gap-2 align-items-center">
                                <input
                                  value={this.state.txHash}
                                  onChange={(e) =>
                                    this.setState({ txHash: e.target.value })
                                  }
                                  className="styledinput"
                                  placeholder="Enter Deposit transaction hash"
                                  type="text"
                                  disabled={!canWithdraw}
                                />
                              </div>

                              <button
                                style={{ width: "fit-content" }}
                                disabled={
                                  canWithdraw === false ||
                                  this.state.withdrawLoading === true ||
                                  this.state.withdrawStatus === "success"
                                    ? true
                                    : false
                                }
                                className={`btn filledbtn ${
                                  canWithdraw === false &&
                                  this.state.withdrawStatus === "initial" &&
                                  "disabled-btn"
                                } ${
                                  this.state.withdrawStatus === "deposit" ||
                                  this.state.withdrawStatus === "success"
                                    ? "success-button"
                                    : this.state.withdrawStatus === "fail"
                                    ? "fail-button"
                                    : null
                                } d-flex justify-content-center align-items-center gap-2`}
                                onClick={() => {
                                  this.handleWithdraw();
                                }}
                              >
                                {this.state.withdrawLoading ? (
                                  <div
                                    class="spinner-border spinner-border-sm text-light"
                                    role="status"
                                  >
                                    <span class="visually-hidden">
                                      Loading...
                                    </span>
                                  </div>
                                ) : this.state.withdrawStatus === "initial" ? (
                                  <>Withdraw</>
                                ) : this.state.withdrawStatus === "success" ? (
                                  <>Success</>
                                ) : (
                                  <>
                                    <img src={failMark} alt="" />
                                    Failed
                                  </>
                                )}
                              </button>
                            </div>
                            {this.state.withdrawableUnixTimestamp &&
                              Date.now() <
                                this.state.withdrawableUnixTimestamp * 1e3 && (
                                <span>
                                  &nbsp;
                                  <Countdown
                                    onComplete={() => this.forceUpdate()}
                                    key="withdrawable"
                                    date={
                                      this.state.withdrawableUnixTimestamp * 1e3
                                    }
                                    renderer={getRenderer(undefined, true)}
                                  />
                                </span>
                              )}

                            {this.state.errorMsg2 && (
                              <h6 className="errormsg">
                                {this.state.errorMsg2}
                              </h6>
                            )}
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 guidewrapper">
            <div className="purplediv"> </div>
            <div>
              <h6 className="guidetitle">
                <img src={routeIcon} alt="" />
                Bridge process guide
              </h6>
              <div className="separator"></div>
              <Timeline>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot
                      className={
                        this.props.isConnected === true
                          ? "greendot"
                          : "passivedot"
                      }
                    />
                    <TimelineConnector
                      className={
                        this.props.isConnected === true
                          ? "greenline"
                          : "passiveline"
                      }
                    />
                  </TimelineSeparator>
                  <TimelineContent>
                    <h6 className="content-text">
                      <h6 className="content-title2">
                        <b>Connect wallet</b>
                      </h6>
                      Connect your wallet in order to start using Dypius Bridge.
                      Your wallet chain will be associated as default.
                    </h6>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot
                      className={
                        this.props.isConnected === true
                          ? "greendot"
                          : "passivedot"
                      }
                    />
                    <TimelineConnector
                      className={
                        this.props.isConnected === true
                          ? "greenline"
                          : "passiveline"
                      }
                    />
                  </TimelineSeparator>
                  <TimelineContent>
                    <h6 className="content-text">
                      <h6 className="content-title2">
                        <b>Select chains</b>
                      </h6>
                      Select desired bridge chains at “FROM” and “TO” sections.
                      To change the “FROM” chain you need to change it to your
                      wallet.
                    </h6>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot
                      className={
                        this.state.depositAmount !== ""
                          ? "greendot"
                          : "passivedot"
                      }
                    />
                    <TimelineConnector
                      className={
                        this.state.depositAmount !== ""
                          ? "greenline"
                          : "passiveline"
                      }
                    />
                  </TimelineSeparator>
                  <TimelineContent>
                    <h6 className="content-text">
                      <h6 className="content-title2">
                        <b>Fill in amount</b>
                      </h6>
                      Check your balance and fill in the desired amount you want
                      to bridge. You can use “Max” button to fill in the maximum
                      amount.
                    </h6>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot
                      className={
                        this.state.depositStatus === "deposit"
                          ? "greendot"
                          : "passivedot"
                      }
                    />
                    <TimelineConnector
                      className={
                        this.state.depositStatus === "deposit"
                          ? "greenline"
                          : "passiveline"
                      }
                    />
                  </TimelineSeparator>
                  <TimelineContent>
                    <h6 className="content-text">
                      <h6 className="content-title2">
                        <b>Approve deposit</b>
                      </h6>
                      Approve the transaction and then deposit the assets. These
                      steps need confirmation in your wallet.
                    </h6>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot
                      className={
                        this.state.txHash !== "" ? "greendot" : "passivedot"
                      }
                    />
                    <TimelineConnector
                      className={
                        this.state.txHash !== "" ? "greenline" : "passiveline"
                      }
                    />
                  </TimelineSeparator>
                  <TimelineContent>
                    <h6 className="content-text">
                      <h6 className="content-title2">
                        <b>Fill in transaction hash</b>
                      </h6>
                      After successful deposit, fill in the transaction hash
                      andswitch your wallet to the chosen bridge network.
                    </h6>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot
                      className={
                        canWithdraw === true ? "greendot" : "passivedot"
                      }
                    />
                  </TimelineSeparator>
                  <TimelineContent>
                    <h6 className="content-text">
                      <h6 className="content-title2">
                        <b>{"Wait timer & withdraw"}</b>
                      </h6>
                      Wait for the timer to end and and click withdraw button to
                      receive the assets in the desired chain.
                    </h6>
                  </TimelineContent>
                </TimelineItem>
              </Timeline>
            </div>
          </div>
          {this.state.showWalletModal === true && (
            <WalletModal
              show={this.state.showWalletModal}
              handleClose={() => {
                this.setState({ showWalletModal: false });
              }}
              handleConnection={this.props.handleConnection}
            />
          )}
        </div>
      );
    }
  }

  return Bridge;
}
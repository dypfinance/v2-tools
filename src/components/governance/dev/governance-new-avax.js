import React, { useState } from "react";
import moment from "moment";
import { NavLink, Route } from "react-router-dom";
import Address from "../../FARMINNG/address";
import getFormattedNumber from "../../../functions/get-formatted-number";
import "./governance-new.css";
import eth from "../assets/eth.svg";
import bnb from "../assets/bnb.svg";
import avax from "../assets/avax.svg";
import submit from "../assets/submit.svg";
import walleticon from "../assets/walleticon.svg";
import copy from "../assets/copy.svg";
import freetextPassive from "../assets/freetext-passive.svg";
import freetextActive from "../assets/freetext-active.svg";
import disburselogoActive from "../assets/disburselogo-active.svg";
import disburselogoPassive from "../assets/disburselogo-passive.svg";
import empty from "../assets/empty.svg";
import check from "../assets/check.svg";

const { new_governanceavax: governance, reward_token, BigNumber } = window;

const LP_AMPLIFY_FACTOR = 1;

let PoolGroupName = Object.freeze({
  AVAX: "0",
});

const stakingPools = [
  {
    logo: "/images/avax.png",
    name: "AVAX Pools",
    group_name: PoolGroupName.AVAX,
    pools: [
      "0x499c588146443235357e9C630A66D6fe0250caA1",
      "0xD8aF0591Be4Fba56e3634C992B7Fe4ff0A90B584",
      "0xBEBE1fe1444a50AC6EE95EA25Ba80ADF5aC7322C",
      "0x79BE220ab2dFcc2f140b59A97bFe6751ed1579B0",
    ],
  },
].map((pools) => {
  pools.pools = pools.pools
    .map((p) => p.toLowerCase())
    .sort()
    .join(",");
  return pools;
});

const AddProposal = (props) => {
  let [formState, setFormState] = useState({
    action: "0", // 0 - disburse or burn, 1 - upgrade governance
    stakingPool: stakingPools[0].pools,
    newGovernance: "",
    newQuorum: "",
    newMinBalance: "",
    text: "",
  });

  const setState = (obj) => setFormState({ ...formState, ...obj });
  let { isOwner, connected, coinbase } = props;

  return (
    <div>
      <h6 className="myDetails-title mb-3">New proposal</h6>
      <div className="submitproposal-wrapper">
        <div className="purplediv"></div>
        <div className="d-flex justify-content-between gap-2 align-items-center mb-3">
          <h6 className="submitnewproposal-title">
            <img src={require("../assets/submitwhite.svg").default} alt="" />{" "}
            Submit a proposal
          </h6>
          {coinbase === null ? (
            <button className="connectbtn btn" onClick={this.showModal}>
              <img src={require("../assets/wallet-green.svg").default} alt="" />{" "}
              Connect wallet
            </button>
          ) : (
            <div className="addressbtn btn">
              <Address a={coinbase} />
            </div>
          )}
        </div>
        <div className="separator mb-3"></div>
        <form onSubmit={props.onSubmit(formState)}>
          <div className="d-flex gap-2 justify-content-between align-items-center">
            <div>
              <label htmlFor="proposal-action" className="d-none">
                Select Action
              </label>
              <div className="d-flex justify-content-between gap-3 align-items-center">
                <div
                  className={
                    formState.action === "0"
                      ? "optionbtn-active"
                      : "optionbtn-passive"
                  }
                >
                  <input
                    type="checkbox"
                    value="0"
                    onChange={(e) => setState({ action: e.target.value })}
                    id="disburseburn"
                    className="d-none"
                  />
                  <label for="disburseburn" className="optiontext">
                    <img
                      src={
                        formState.action === "0"
                          ? disburselogoActive
                          : disburselogoPassive
                      }
                      alt=""
                    />
                    Disburse or Burn
                  </label>
                </div>
                <div
                  className={
                    formState.action === "3"
                      ? "optionbtn-active"
                      : "optionbtn-passive"
                  }
                >
                  <input
                    type="checkbox"
                    value="3"
                    onChange={(e) => setState({ action: e.target.value })}
                    id="freetext"
                    className="d-none"
                  />
                  <label for="freetext" className="optiontext">
                    <img
                      src={
                        formState.action === "3"
                          ? freetextActive
                          : freetextPassive
                      }
                      alt=""
                    />
                    Other / Free Text
                  </label>
                </div>
              </div>
              <select
                value={formState.action}
                onChange={(e) => setState({ action: e.target.value })}
                className="form-control d-none"
                id="proposal-action"
              >
                <option value="0">Disburse or Burn</option>
                {isOwner && <option value="1">Upgrade Governance</option>}
                {isOwner && <option value="2">Change Quorum</option>}
                {isOwner && <option value="4">Change Min Balance</option>}
                <option value="3">Other / Free Text</option>
              </select>
            </div>
            {["0", "1"].includes(formState.action) && (
              <div className="">
                <label htmlFor="staking-pool" className="d-none">
                  Select Pool
                </label>
                {stakingPools.map((v, i) => (
                  // <option value={v.pools} key={i}>
                  //   {" "}
                  //   {v ? v.name : "DYP"}{" "}
                  // </option>
                  <div key={i}>
                    <input
                      type="checkbox"
                      value={v.pools}
                      onChange={(e) =>
                        setState({ stakingPool: e.target.value })
                      }
                      id="stakingpool"
                      className="d-none"
                    />
                    <label for="stakingpool" className="stakingpool-option">
                      <img
                        src={
                          formState.stakingPool === stakingPools[0].pools
                            ? check
                            : empty
                        }
                        alt=""
                      />

                      <img
                        src={avax}
                        alt=""
                        style={{ width: 18, height: 18 }}
                      />
                      {v ? v.name : "DYP"}
                    </label>
                  </div>
                ))}
                <button className="btn btn-primary btn-block" type="submit">
              SUBMIT PROPOSAL
            </button>

                <select
                  className="form-control d-none"
                  id="staking-pool"
                  value={formState.stakingPool}
                  onChange={(e) => setState({ stakingPool: e.target.value })}
                >
                  {stakingPools.map((v, i) => (
                    <option value={v.pools} key={i}>
                      {" "}
                      {v ? v.name : "DYP"}{" "}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          {formState.action == "3" && (
            <div className="pt-3">
              <textarea
                style={{
                  minHeight: "150px",
                  width: "100%",
                  background: "#312F69",
                  border: "1px solid #8E97CD",
                }}
                required
                className="form-control"
                type="text"
                placeholder="Enter Proposal Text"
                value={formState.text}
                onChange={(e) => setState({ text: e.target.value })}
              ></textarea>
            </div>
          )}

          {formState.action == "1" && (
            <div className="pt-3">
              <input
                required
                className="form-control"
                type="text"
                placeholder="New Governance Contract Address"
                value={formState.newGovernance}
                onChange={(e) => setState({ newGovernance: e.target.value })}
              />
            </div>
          )}
          {formState.action == "2" && (
            <div className="pt-3">
              <input
                required
                className="form-control"
                type="number"
                placeholder="New Quorum"
                value={formState.newQuorum}
                onChange={(e) => setState({ newQuorum: e.target.value })}
              />
            </div>
          )}

          {formState.action == "4" && (
            <div className="pt-3">
              <input
                required
                className="form-control"
                type="number"
                placeholder="New Min Balance"
                value={formState.newMinBalance}
                onChange={(e) => setState({ newMinBalance: e.target.value })}
              />
            </div>
          )}
          <div className="pt-3 d-flex flex-column gap-2">
            
            <small className="form-text text-muted">
              Submitting a proposal requires a minimum of{" "}
              {(props.MIN_BALANCE_TO_INIT_PROPOSAL / 1e18).toFixed(2)} DYP
              Governance Token Balance.
            </small>
          </div>
        </form>
      </div>
    </div>
  );
};

const ProposalCard = (props) => (
  <div className="container vault-container d-flex">
    <div className="row vault-row text-start justify-content-between p-1">
      <div
        className="col-sm-8 col-md-8 text-center mb-2 d-flex align-items-center gap-3 justify-content-start"
        style={{ gap: 10 }}
      >
        <img
          className="m-0 cardlogo"
          src={props.vault ? props.vault.logo : "/logo192.png"}
        />

        <div
          style={{ whiteSpace: "pre-line", gap: 10 }}
          className="col-sm-3 col-md-12 p-0 d-flex"
        >
          <span className="vault-name ">
            {props.vault ? props.vault.name : "DYP Proposal"}{" "}
          </span>
          <div className="avaxchain">
            <span className="chaintext">
              AVAX Chain
              <img src={avax} alt="" className="chainlogo2" />
            </span>
          </div>
        </div>
      </div>
      <div className="card-bottom-wrapper">
        <div className="text-left ExpireWrapper d-flex flex-column justify-content-start">
          <p className="expiretxt">Expires</p>
          <h6 className="duration-txt small mb-0 ">
            {moment
              .duration(
                props._proposalStartTime * 1e3 +
                  window.config.vote_duration_in_seconds * 1e3 -
                  Date.now()
              )
              .humanize(true)}
          </h6>
        </div>
        <div className="col-sm-10 text-left actionwrapper">
          <span className="actionText">
            {{
              0: "Disburse / Burn",
              1: "Upgrade Governance",
              2: "Change Quorum",
              3: "Other / Free Text",
              4: "Change Min Balance",
            }[props._proposalAction] || ""}
          </span>
        </div>
      </div>
    </div>
  </div>
);

function getVaultByAddress(contract_address) {
  contract_address = contract_address.toLowerCase();
  let v = window.vaults.filter(
    (v) => v.contract_address.toLowerCase() == contract_address.toLowerCase()
  )[0];
  return v;
}

function getPoolForProposal(proposal) {
  let pools = proposal._stakingPool
    .map((p) => p.toLowerCase())
    .sort()
    .join(",");
  let p = stakingPools.filter((p) => p.pools == pools)[0];
  return p;
}

export default class Governance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      proposals: [],
      total_proposals: 0,
      isLoading: false,
      is_wallet_connected: false,
      token_balance: "",
      totalDeposited: "",
      lastVotedProposalStartTime: "",
      QUORUM: "",
      MIN_BALANCE_TO_INIT_PROPOSAL: "",
      coinbase: "0x0000000000000000000000000000000000000111",
      open: false,
      proposalId: undefined,
    };
  }

  refreshProposals = async () => {
    if (this.state.isLoading && this.state.proposals.length > 0) return;
    this.setState({ isLoading: true });
    try {
      let total_proposals = Number(await governance.lastIndex());
      let proposals = this.state.proposals;
      let newProposals = [];
      let newProposals2 = [];
      let step = window.config.max_proposals_per_call;
      for (
        let i = total_proposals - proposals.length;
        i >= Math.max(1, total_proposals - proposals.length - step + 1);
        i--
      ) {
        const checkproposal = await this.getProposal(i).then();
        if (checkproposal != undefined) {
          newProposals.push(this.getProposal(i));
        } else {
          this.refreshProposals();
        }
      }
      newProposals = await Promise.all(newProposals);
      // newProposals = newProposals.map(p => {
      //     p.vault = getVaultByAddress(p._stakingPool)
      //     return p
      // })
      newProposals2 = proposals.concat(newProposals);
      this.setState({ total_proposals, isLoading: false });
      this.setState({ proposals: newProposals2 });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  refreshDYPBalance = async () => {
    if (this.state.is_wallet_connected === true) {
      try {
        let coinbase = this.state.coinbase;
        await reward_token.balanceOf(coinbase).then((data) => {
          this.setState({
            token_balance: window.web3.utils.fromWei(data, "ether"),
          });
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  refreshBalance = async () => {
    if (this.state.is_wallet_connected === true) {
      let coinbase = this.state.coinbase;
      try {
        let _totalDeposited = governance.totalDepositedTokens(coinbase);
        let _lvsTime = governance.lastVotedProposalStartTime(coinbase);
        let _q = governance.QUORUM();
        let _m = governance.MIN_BALANCE_TO_INIT_PROPOSAL();

        let [
          totalDeposited,
          lastVotedProposalStartTime,
          QUORUM,
          MIN_BALANCE_TO_INIT_PROPOSAL,
        ] = await Promise.all([_totalDeposited, _lvsTime, _q, _m]);

        this.setState({
          totalDeposited,
          lastVotedProposalStartTime,
          QUORUM,
          MIN_BALANCE_TO_INIT_PROPOSAL,
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  getProposal = async (_proposalId) => {
    if (this.state.is_wallet_connected === true) {
      let p = await governance.getProposal(_proposalId);
      p.vault = getPoolForProposal(p);
      return p;
    }
  };

  checkConnection = async () => {
    const logout = localStorage.getItem("logout");
    if (logout === "false") {
      this.setState({ is_wallet_connected: true });
      let coinbase = await window.getCoinbase();
      this.setState({ coinbase: coinbase });
    }
    if (logout === "true") {
      this.setState({ is_wallet_connected: false });
    }
  };

  componentDidMount() {
    this.refreshBalance();
    this.refreshDYPBalance();

    this.checkConnection();
    this.getProposal();
    window._refreshBalInterval = setInterval(this.checkConnection, 1000);
    window.gRefBalInterval = setInterval(this.refreshBalance, 7e3);
    window.gRefDYPBalInterval = setInterval(this.refreshDYPBalance, 3000);
  }
  componentWillUnmount() {
    clearInterval(window.gRefBalInterval);
    clearInterval(window.gRefDYPBalInterval);
  }

  async shouldComponentUpdate(nextState) {
    if (nextState.connected !== this.props.connected) {
      await this.refreshProposals();
      return true;
    } else {
      return false;
    }
  }

  handleProposalSubmit = (formState) => (e) => {
    e.preventDefault();
    if (
      Number(this.state.token_balance) <
      1 * this.state.MIN_BALANCE_TO_INIT_PROPOSAL
    ) {
      window.alertify.error("Insufficiet Governance Token Balance!");
      return;
    }
    let poolGroupName;

    let poolGroup;
    if (
      (poolGroup = stakingPools.filter((p) => {
        return p.pools == formState.stakingPool;
      })[0])
    ) {
      poolGroupName = poolGroup.group_name;
    }

    if (!poolGroupName) {
      window.alertify.error("Invalid pool selected");
      return;
    }

    if (formState.action == "0") {
      governance.proposeDisburseOrBurn(poolGroupName);
    } else if (formState.action == "1") {
      if (!window.web3.utils.isAddress(formState.newGovernance)) {
        window.alertify.error("Invalid Address!");
        return;
      }
      governance.proposeUpgradeGovernance(
        poolGroupName,
        formState.newGovernance
      );
    } else if (formState.action == "2") {
      let newQuorum = formState.newQuorum;
      if (isNaN(newQuorum * 1)) {
        window.alertify.error("Invalid quorum!");
        return;
      }
      newQuorum = new BigNumber(newQuorum).times(1e18).toFixed(0);
      governance.proposeNewQuorum(newQuorum);
    } else if (formState.action == "3") {
      governance.proposeText(formState.text);
    } else if (formState.action == "4") {
      let newMinBalance = formState.newMinBalance;
      if (isNaN(newMinBalance * 1)) {
        window.alertify.error("Invalid quorum!");
        return;
      }
      newMinBalance = new BigNumber(newMinBalance).times(1e18).toFixed(0);
      governance.proposeNewMinBalanceToInitProposal(newMinBalance);
    }
  };

  handleClaim = (e) => {
    e.preventDefault();
    governance.withdrawAllTokens();
  };

  handleProposals = async (e) => {
    e.preventDefault();
    await this.refreshProposals();
  };

  render() {
    let { totalDeposited } = this.state;
    totalDeposited = getFormattedNumber(totalDeposited / 1e18, 6);

    let canWithdrawAll = false;
    let withdrawableTitleText = "";
    let canWithdrawAllAfter =
      this.state.lastVotedProposalStartTime * 1e3 +
      window.config.vote_duration_in_seconds * 1e3;
    if (Date.now() > canWithdrawAllAfter) {
      canWithdrawAll = true;
    } else if (canWithdrawAllAfter) {
      withdrawableTitleText =
        `You'll be able to withdraw ` +
        moment.duration(canWithdrawAllAfter - Date.now()).humanize(true);
    }

    let isOwner =
      String(this.state.coinbase).toLowerCase() ==
      window.config.admin_address.toLowerCase();
    const deviceWidth = window.innerWidth;
    let noVotes = localStorage.getItem("NoVotesAvax");

    return (
      <div>
        <div
          className={
            deviceWidth < 500 ? "container-fluid" : "container-fluid p-0"
          }
        >
          <div className="d-flex justify-content-between gap-2 align-items-center">
            <div className="col-7">
              <h6 className="govtitle mb-3">Dypius Governance</h6>
              <h6 className="govdesc mb-3">
                DYP tokens represent voting shares in Dypius Governance. The
                introduction of DYP tokens enables shared community ownership of
                a vibrant, diverse, and dedicated governance system which will
                actively guide the protocol toward the future. <br />
                <br />
                Through governance, DYP holders can vote to add more pools, burn
                tokens, or allocate DYP toward grants, strategic partnerships,
                governance initiatives, and other programs.
              </h6>
            </div>

            <div className="col-4 d-flex justify-content-between gap-2">
              <div className="totalproposals col-4">
                <img src={eth} alt="" className="chainlogo" />
                <div className="d-flex flex-column gap-2 justify-content-center align-items-center">
                  <h6 className="chaintitle">Ethereum</h6>
                  <h6 className="totalpoolsnr">52</h6>
                  <h6 className="totalproposals-text">Total proposals</h6>
                </div>
              </div>
              <div className="totalproposals col-4">
                <img src={bnb} alt="" className="chainlogo" />
                <div className="d-flex flex-column gap-2 justify-content-center align-items-center">
                  <h6 className="chaintitle">BNB Chain</h6>
                  <h6 className="totalpoolsnr">64</h6>
                  <h6 className="totalproposals-text">Total proposals</h6>
                </div>
              </div>
              <div className="totalproposals col-4">
                <img src={avax} alt="" className="chainlogo" />
                <div className="d-flex flex-column gap-2 justify-content-center align-items-center">
                  <h6 className="chaintitle">Avalanche</h6>
                  <h6 className="totalpoolsnr">52</h6>
                  <h6 className="totalproposals-text">Total proposals</h6>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between gap-2 cardwrapper mt-4 mb-4">
            <div className="govcard1 col-3">
              <div className="purplediv"></div>
              <div className="d-flex flex-column gap-2">
                <img
                  src={walleticon}
                  alt=""
                  style={{ width: 40, height: 40 }}
                />
                <div className="d-flex justify-content-between gap-2 align-items-baseline position-relative">
                  <h6 className="govcard-title">Connect wallet</h6>
                  <h6 className="govcard-number">1</h6>
                </div>
                <h6 className="govcard-desc">
                  Dypius Governance runs on Ethereum, BNB Chain, and Avalanche.
                  Connect your wallet to get started
                </h6>
              </div>
            </div>
            <div className="govcard2 col-3">
              <div className="greendiv"></div>
              <div className="d-flex flex-column gap-2">
                <img src={copy} alt="" style={{ width: 40, height: 40 }} />
                <div className="d-flex justify-content-between gap-2 align-items-baseline position-relative">
                  <h6 className="govcard-title">Create proposal</h6>
                  <h6 className="govcard-number">2</h6>
                </div>
                <h6 className="govcard-desc">
                  The proposal can be related to disbursing/burning tokens, or
                  other suggestions
                </h6>
              </div>
            </div>
            <div className="govcard3 col-3">
              <div className="orangediv"></div>
              <div className="d-flex flex-column gap-2">
                <img src={submit} alt="" style={{ width: 40, height: 40 }} />
                <div className="d-flex justify-content-between gap-2 align-items-baseline position-relative">
                  <h6 className="govcard-title">Submit</h6>
                  <h6 className="govcard-number">3</h6>
                </div>
                <h6 className="govcard-desc">
                  Submitting a proposal requires a minimum of 5000 DYP
                  Governance token balance
                </h6>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between mb-5">
            <div
              className=""
              id="votingWrapper"
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 20,
              }}
            >
              <AddProposal
                isOwner={isOwner}
                connected={this.state.is_wallet_connected}
                MIN_BALANCE_TO_INIT_PROPOSAL={
                  this.state.MIN_BALANCE_TO_INIT_PROPOSAL
                }
                onSubmit={this.handleProposalSubmit}
                coinbase={this.state.coinbase}
              />
            </div>
            <div className="d-flex flex-column">
              <h6 className="myDetails-title mb-3">My details</h6>
              <div className="mydetails-wrapper h-100">
                <div className="purplediv"></div>
                {this.state.is_wallet_connected === true ? (
                  <div className="d-flex justify-content-between flex-column">
                    <div className="d-flex justify-content-between gap-2 align-items-center mb-3">
                      <div className="colored-container">
                        <span className="purpletext">
                          <img
                            src={require("../assets/wallet2.svg").default}
                            alt=""
                          />{" "}
                          My DYP Balance
                        </span>
                        <span className="whitetext">
                          {this.state.token_balance} DYP
                        </span>
                      </div>
                      <div className="colored-container">
                        <span className="purpletext">
                          <img
                            src={require("../assets/votes.svg").default}
                            alt=""
                          />
                          My number of votes
                        </span>
                        <span className="whitetext">
                          {noVotes == null ? 0 : noVotes} DYP
                        </span>
                      </div>
                    </div>

                    <form className="" onSubmit={this.handleClaim}>
                      <div className="form-group2">
                        <label
                          htmlFor="deposit-amount"
                          className="text-left d-block totalvoting"
                        >
                          Total in voting
                        </label>
                        <div className="d-flex justify-content-between align-items-center gap-5">
                          <div className="form-row totalVotingButton">
                            <div>
                              <span className="dypamounttext">
                                {totalDeposited} DYP
                              </span>
                            </div>
                          </div>

                          <button
                            title={withdrawableTitleText}
                            disabled
                            className="btn withdrawButton"
                            type="submit"
                          >
                            Withdraw all
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="connectWallet">
                    <span style={{ display: "flex" }}>My Wallet</span>
                    <h3 className="titleWrapper">
                      Please connect wallet to use this dApp
                    </h3>
                    <button
                      onClick={() => {
                        this.props.handleConnection();
                      }}
                      style={{ borderRadius: "6px" }}
                      className="btn connectWalletBTN pr-5 pl-5"
                    >
                      Connect Wallet
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div
            className="row pb-5 m-0"
            style={{ flexDirection: "column-reverse" }}
          >
            <div className={`col-lg-12 p-0 governanceWrapper `}>
              {this.state.is_wallet_connected === undefined && (
                <div className="errorWrapper">
                  <span>
                    You need to connect your wallet in order to see the
                    proposals
                  </span>
                </div>
              )}

              {this.state.is_wallet_connected === true ? (
                this.state.proposals.map((props, i) => (
                  <div
                    className=" proposalscard"
                    key={i}
                    onClick={() => {
                      this.setState({ open: true });
                      this.setState({
                        proposalId: this.state.total_proposals - i,
                      });
                    }}
                  >
                    <div className="purplediv"></div>
                    <ProposalCard {...props} />
                  </div>
                ))
              ) : (
                <div className="col-lg-12 row justify-content-between p-0 ml-0"></div>
              )}

              <div className="text-center">
                {this.state.proposals.length < this.state.total_proposals && (
                  <button
                    className="btn btn-primary l-outline-btn bgt"
                    style={{
                      fontSize: ".8rem",
                      background: "transparent",
                    }}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      this.refreshProposals();
                    }}
                  >
                    {this.state.isLoading ? "LOADING..." : "LOAD MORE"}
                  </button>
                )}

                {!this.state.isLoading && this.state.proposals.length == 0 && (
                  <div className="pt-5">
                    <p>No Proposals to Display</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {this.state.open === true && (
            <ProposalDetails
              refreshBalance={this.refreshBalance}
              proposalId={
                this.state.proposalId === undefined ? 0 : this.state.proposalId
              }
            />
          )}
        </div>
      </div>
    );
  }
}

class ProposalDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      depositAmount: "",
      withdrawAmount: "",
      depositedTokens: "",
      token_balance: "",
      coinbase: "",
      totalDeposited: "",
      option: "1", // 0, 1.  0 = yes/disburse, 1 = no/burn
      lastVotedProposalStartTime: "",
      QUORUM: "",
      MIN_BALANCE_TO_INIT_PROPOSAL: "",
      is_wallet_connected: false,
      is_proposal_executible: false,

      proposal: {},
    };
  }
  componentDidMount() {
    this.refreshBalance();
    this.checkConnection();
    this.refreshProposal();
    window._refreshVoteBalInterval = setInterval(this.refreshBalance, 3000);
    window._refreshBalInterval = setInterval(this.checkConnection, 3000);
  }

  componentWillUnmount() {
    clearInterval(window._refreshVoteBalInterval);
  }

  refreshProposal = () => {
    this.getProposal(this.props.proposalId)
      .then((proposal) => this.setState({ proposal }))
      .catch(console.error);
  };

  getProposal = async (_proposalId) => {
    let p = await governance.getProposal(_proposalId);
    p.vault = getPoolForProposal(p);
    return p;
  };

  handleApprove = (e) => {
    e.preventDefault();
    let amount = this.state.depositAmount;
    amount = new BigNumber(amount).times(1e18).toFixed(0);
    reward_token.approve(governance._address, amount);
  };
  handleAddVote = (e) => {
    let amount = this.state.depositAmount;
    amount = new BigNumber(amount).times(1e18).toFixed(0);
    governance.addVotes(this.props.proposalId, this.state.option, amount);
  };

  handleRemoveVote = (e) => {
    e.preventDefault();
    let amount = this.state.withdrawAmount;
    amount = new BigNumber(amount).times(1e18).toFixed(0);
    governance.removeVotes(this.props.proposalId, amount);
  };

  handleClaim = (e) => {
    e.preventDefault();
    governance.withdrawAllTokens();
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

  checkConnection = async () => {
    const logout = localStorage.getItem("logout");
    if (logout === "false") {
      this.setState({ is_wallet_connected: true });
      let coinbase = await window.getCoinbase();
      this.setState({ coinbase: coinbase });
    }
    if (logout === "true") {
      this.setState({ is_wallet_connected: false });
    }
  };

  refreshBalance = async () => {
    if (this.state.is_wallet_connected === true) {
      this.refreshProposal();
      this.props.refreshBalance();

      let coinbase = this.state.coinbase;
      try {
        let _rBal = reward_token.balanceOf(coinbase);
        let _myVotes = governance.votesForProposalByAddress(
          coinbase,
          this.props.proposalId
        );
        let _totalDeposited = governance.totalDepositedTokens(coinbase);
        let _option = governance.votedForOption(
          coinbase,
          this.props.proposalId
        );
        let _lvsTime = governance.lastVotedProposalStartTime(coinbase);
        let _isExecutible = governance.isProposalExecutible(
          this.props.proposalId
        );
        let _q = governance.QUORUM();
        let _m = governance.MIN_BALANCE_TO_INIT_PROPOSAL();

        let [
          token_balance,
          depositedTokens,
          totalDeposited,
          option,
          lastVotedProposalStartTime,
          is_proposal_executible,
          QUORUM,
          MIN_BALANCE_TO_INIT_PROPOSAL,
        ] = await Promise.all([
          _rBal,
          _myVotes,
          _totalDeposited,
          _option,
          _lvsTime,
          _isExecutible,
          _q,
          _m,
        ]);

        this.setState({
          token_balance,
          depositedTokens,
          totalDeposited,
          lastVotedProposalStartTime,
          QUORUM,
          MIN_BALANCE_TO_INIT_PROPOSAL,
          is_proposal_executible:
            is_proposal_executible &&
            ["0", "1", "2", "4"].includes(this.state.proposal._proposalAction),
        });

        if (this.state.option == "" || Number(depositedTokens) > 0)
          this.setState({ option });
      } catch (e) {
        console.error(e);
      }
    }
  };

  getOptionText = (option) => {
    if (this.state.proposal._proposalAction == "0") {
      return { 0: "DISBURSE", 1: "BURN" }[option];
    }
    return { 0: "YES", 1: "NO" }[option];
  };

  handleSetOption = (option) => {
    if (Number(this.state.depositedTokens) > 0) return;
    this.setState({ option });
    localStorage.setItem(
      "NoVotesAvax",
      getFormattedNumber(this.state.proposal._optionTwoVotes / 1e18, 6)
    );
  };

  handleExecute = () => {
    governance.executeProposal(this.props.proposalId);
  };

  render() {
    let id = this.props.proposalId;

    let { coinbase, token_balance, proposal, totalDeposited, depositedTokens } =
      this.state;

    if (!proposal._proposalId) return "";

    token_balance = getFormattedNumber(token_balance / 1e18, 6);
    totalDeposited = getFormattedNumber(totalDeposited / 1e18, 6);

    let optionOneVotes = proposal._optionOneVotes;
    let optionTwoVotes = proposal._optionTwoVotes;
    let action = proposal._proposalAction;

    let actionText =
      {
        0: "Disburse / Burn",
        1: "Upgrade Governance",
        2: "Change Quorum",
        3: "Other / Free Text",
        4: "Change Min Balance",
      }[action] || "";

    optionOneVotes = getFormattedNumber(optionOneVotes / 1e18, 6);
    optionTwoVotes = getFormattedNumber(optionTwoVotes / 1e18, 6);
    depositedTokens = getFormattedNumber(depositedTokens / 1e18, 6);

    let endsOn =
      proposal._proposalStartTime * 1e3 +
      window.config.vote_duration_in_seconds * 1e3;

    let expires = moment.duration(endsOn - Date.now()).humanize(true);

    let canRemoveVotes = false;

    if (Date.now() < endsOn) {
      canRemoveVotes = true;
    }

    let canWithdrawAll = false;
    let withdrawableTitleText = "";
    let canWithdrawAllAfter =
      this.state.lastVotedProposalStartTime * 1e3 +
      window.config.vote_duration_in_seconds * 1e3;
    if (Date.now() > canWithdrawAllAfter) {
      canWithdrawAll = true;
    } else if (canWithdrawAllAfter) {
      withdrawableTitleText =
        `You'll be able to withdraw ` +
        moment.duration(canWithdrawAllAfter - Date.now()).humanize(true);
    }

    return (
      <div className="token-staking">
        <div className="row justify-content-between">
          <div className="col-lg-5 mt-5 proposalWrapper">
            <div className="row token-staking-form">
              <div className="col-12">
                <div className="l-box">
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                      <label
                        htmlFor="deposit-amount"
                        className="d-block text-left"
                      >
                        Add votes
                      </label>
                      <h5
                        className=""
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 20,
                          fontWeight: 600,
                          marginBottom: 20,
                        }}
                      >
                        <img
                          height={38}
                          src={
                            proposal.vault
                              ? proposal.vault.logo.toString()
                              : "/logo192.png"
                          }
                        />{" "}
                        {proposal.vault
                          ? proposal.vault.name.toString()
                          : "DYP Proposal"}
                      </h5>
                      <div className="input-group ">
                        <input
                          value={
                            Number(this.state.depositAmount) > 0
                              ? this.state.depositAmount * LP_AMPLIFY_FACTOR
                              : this.state.depositAmount
                          }
                          onChange={(e) =>
                            this.setState({
                              depositAmount:
                                Number(e.target.value) > 0
                                  ? e.target.value / LP_AMPLIFY_FACTOR
                                  : e.target.value,
                            })
                          }
                          className="form-control left-radius"
                          placeholder="0"
                          type="text"
                        />
                        <div className="input-group-append">
                          <button
                            className="btn btn-primary right-radius btn-max l-light-btn"
                            style={{ cursor: "pointer" }}
                            onClick={this.handleSetMaxDeposit}
                          >
                            MAX
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div style={{ paddingRight: "0.3rem" }} className="col-6">
                        <button
                          onClick={() => this.handleSetOption("0")}
                          className={`btn btn-block btn-primary l-light-btn ${
                            this.state.option == "0" ? "btn-outline" : ""
                          }`}
                          type="button"
                        >
                          <i
                            className={
                              this.state.option == "0"
                                ? "fas fa-check-square"
                                : "far fa-square"
                            }
                          ></i>{" "}
                          {this.getOptionText("0")}
                        </button>
                      </div>
                      <div style={{ paddingLeft: "0.3rem" }} className="col-6">
                        <button
                          onClick={() => this.handleSetOption("1")}
                          className={`btn btn-block btn-primary l-light-btn ${
                            this.state.option == "1" ? "btn-outline" : ""
                          }`}
                          type="button"
                        >
                          <i
                            className={
                              this.state.option == "1"
                                ? "fas fa-check-square"
                                : "far fa-square"
                            }
                          ></i>{" "}
                          {this.getOptionText("1")}
                        </button>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div style={{ paddingRight: "0.3rem" }} className="col-6">
                        <button
                          onClick={this.handleApprove}
                          className="btn btn-block btn-primary"
                          type="button"
                        >
                          APPROVE
                        </button>
                      </div>
                      <div style={{ paddingLeft: "0.3rem" }} className="col-6">
                        <button
                          disabled={!canRemoveVotes}
                          onClick={this.handleAddVote}
                          className="btn btn-block btn-primary l-outline-btn"
                          type="submit"
                        >
                          ADD VOTES
                        </button>
                      </div>
                    </div>
                    <p
                      style={{ fontSize: ".8rem" }}
                      className="mt-1 text-center mb-0 text-muted mt-3"
                    >
                      {/* Some info text here.<br /> */}
                      Please approve before voting.
                    </p>
                  </form>
                </div>
              </div>
              <div className="col-12">
                <div className="l-box">
                  <form onSubmit={this.handleRemoveVote}>
                    <div className="form-group">
                      <label
                        htmlFor="deposit-amount"
                        className="d-block text-left"
                      >
                        REMOVE VOTES
                      </label>
                      <div className="input-group ">
                        <input
                          value={
                            Number(this.state.withdrawAmount) > 0
                              ? this.state.withdrawAmount * LP_AMPLIFY_FACTOR
                              : this.state.withdrawAmount
                          }
                          onChange={(e) =>
                            this.setState({
                              withdrawAmount:
                                Number(e.target.value) > 0
                                  ? e.target.value / LP_AMPLIFY_FACTOR
                                  : e.target.value,
                            })
                          }
                          className="form-control left-radius"
                          placeholder="0"
                          type="text"
                        />
                        <div className="input-group-append">
                          <button
                            className="btn btn-primary right-radius btn-max l-light-btn"
                            style={{ cursor: "pointer" }}
                            onClick={this.handleSetMaxWithdraw}
                          >
                            MAX
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      disabled={!canRemoveVotes}
                      className="btn btn-primary btn-block l-outline-btn"
                      type="submit"
                    >
                      REMOVE VOTES
                    </button>
                    {/* <p style={{fontSize: '.8rem'}} className='mt-1 text-center'>Some info text here.</p> */}
                  </form>
                </div>
              </div>
              <div className="col-12">
                <div className="l-box">
                  <form onSubmit={this.handleClaim}>
                    <div className="form-group">
                      <label
                        htmlFor="deposit-amount"
                        className="text-left d-block"
                      >
                        Total in voting
                      </label>
                      <div className="row buttonWrapper m-0">
                        <div
                          className="form-row totalVotingButton"
                          style={{
                            maxWidth: 180,
                            width: "100%",
                          }}
                        >
                          <div className="form-row">
                            <div className="col-12">
                              <p
                                className="form-control  text-right"
                                style={{
                                  border: "none",
                                  fontSize: "1.2rem",
                                  marginBottom: 0,
                                  paddingLeft: 0,
                                  background: "rgba(82, 168, 164, 0.2)",
                                  color: "var(--text-color)",
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: "1.2rem",
                                    color: "var(--text-color)",
                                  }}
                                >
                                  {totalDeposited}
                                </span>{" "}
                                <small className="text-bold">DYP</small>
                              </p>
                            </div>
                          </div>
                        </div>
                        <button
                          title={withdrawableTitleText}
                          disabled={!canWithdrawAll}
                          className="btn btn-primary btn-block l-outline-btn withdrawButton"
                          type="submit"
                          style={{ maxWidth: 180 }}
                        >
                          Withdraw all
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-7 mt-4 pl-0">
            <div className="l-box">
              <div className="table-responsive">
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    padding: ".3rem",
                    display: "flex",
                  }}
                >
                  PROPOSAL DETAILS
                </h3>
                {proposal._proposalAction == "3" && (
                  <p
                    className="l-proposal-text"
                    style={{ whiteSpace: "pre-line", padding: ".3rem" }}
                  >
                    <td colSpan> {proposal._proposalText} </td>
                  </p>
                )}
                <table className="table-stats table table-sm table-borderless">
                  <tbody>
                    <tr>
                      <th className="d-flex">Pool</th>
                      <td className="text-right">
                        <strong>
                          {proposal.vault
                            ? proposal.vault.name
                            : "DYP Proposal"}
                        </strong>{" "}
                        <small></small>
                      </td>
                    </tr>

                    <tr>
                      <th className="d-flex">Proposal Action</th>
                      <td className="text-right">
                        <strong>{actionText}</strong> <small></small>
                      </td>
                    </tr>

                    <tr>
                      <th className="d-flex">My DYP Balance</th>
                      <td className="text-right">
                        <strong>{token_balance + " DYP"}</strong>{" "}
                        <small></small>
                      </td>
                    </tr>
                    <tr>
                      <th className="d-flex">{`My ${this.getOptionText(
                        this.state.option
                      )} Votes`}</th>
                      <td className="text-right">
                        <strong>{depositedTokens + " DYP"}</strong>{" "}
                        <small></small>
                      </td>
                    </tr>
                    <tr>
                      <th className="d-flex">Expires</th>
                      <td className="text-right">
                        <strong>{expires}</strong> <small></small>
                      </td>
                    </tr>
                    {proposal._proposalAction == "1" && (
                      <tr>
                        <th className="d-flex">New Gov. Address</th>
                        <td className="text-right">
                          <Address
                            style={{ fontFamily: "monospace" }}
                            a={proposal._newGovernance}
                          />
                        </td>
                      </tr>
                    )}
                    {proposal._proposalAction == "2" && (
                      <tr>
                        <th className="d-flex">New Quorum</th>
                        <td className="text-right">
                          <strong>
                            {getFormattedNumber(proposal._newQuorum / 1e18, 6)}
                          </strong>{" "}
                          <small>DYP</small>
                        </td>
                      </tr>
                    )}
                    {proposal._proposalAction == "4" && (
                      <tr>
                        <th className="d-flex">New Min Balance</th>
                        <td className="text-right">
                          <strong>
                            {getFormattedNumber(
                              proposal._newMinBalance / 1e18,
                              6
                            )}
                          </strong>{" "}
                          <small>DYP</small>
                        </td>
                      </tr>
                    )}
                    <tr>
                      <th className="d-flex">My Address</th>
                      <td className="text-right">
                        <Address
                          style={{ fontFamily: "monospace" }}
                          a={coinbase}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th className="d-flex">Contract Address</th>
                      <td className="text-right">
                        <Address
                          style={{ fontFamily: "monospace" }}
                          a={governance._address}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th className="d-flex">
                        {this.getOptionText("0")} Votes{" "}
                      </th>
                      <td className="text-right">
                        <strong>{optionOneVotes}</strong> <small>DYP</small>
                      </td>
                    </tr>

                    <tr>
                      <th className="d-flex">
                        {this.getOptionText("1")} Votes{" "}
                      </th>
                      <td className="text-right">
                        <strong>{optionTwoVotes}</strong> <small>DYP</small>
                      </td>
                    </tr>

                    <tr>
                      <th className="d-flex">
                        My {this.getOptionText(this.state.option)} Votes{" "}
                      </th>
                      <td className="text-right">
                        <strong>{depositedTokens}</strong> <small>DYP</small>
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan="2"
                        className="text-left text-muted small pt-3"
                        style={{ fontSize: ".8rem" }}
                      >
                        Proposals may be executed within{" "}
                        {moment
                          .duration(
                            window.config.execution_allowance_in_seconds * 1e3
                          )
                          .humanize()}{" "}
                        after voting ends. Quorum requirement is a minimum of{" "}
                        {(this.state.QUORUM / 1e18).toFixed(2)} DYP, proposals
                        with winning votes less than QUORUM will not be
                        executed. Disburse proposals will disburse a maximum
                        amount of DYP with a -2.5% Price Impact.
                      </td>
                    </tr>

                    {this.state.is_proposal_executible && (
                      <tr>
                        <td colSpan="2">
                          <button
                            onClick={this.handleExecute}
                            className="btn btn-block btn-primary mt-3"
                            type="button"
                          >
                            EXECUTE PROPOSAL
                          </button>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

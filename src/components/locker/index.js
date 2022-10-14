import React from "react";
import getFormattedNumber from "../../functions/get-formatted-number";
import DatePicker from "react-datepicker";
import { NavLink } from "react-router-dom";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import InfoModal from "./InfoModal";
import Badge from "../../assets/badge.svg";
import BadgeSmall from "../../assets/badge-small.svg";
import VerifiedLock from "./verifiedlock.svg";
import LiqLocked from "./lock-liquidity.jpeg";
import Active from "../../assets/active.svg";
import InActive from "../../assets/inactive.svg";
import BadgeYellow from "../../assets/badge-yellow.svg";
import BadgeGray from "../../assets/badge-gray.svg";
import BadgeGrayLight from "../../assets/badge-gray-light.svg";
import CountDownTimer from "./Countdown";
import Skeleton from "./Skeleton";
import Error from "../../assets/error.svg";
export default class Locker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unlockDate: new Date(Date.now() + 1 * 30 * 24 * 60 * 60 * 1000),
      todaysDateTimeStamp: new Date().getTime(),
      amount: 0,
      selectedBaseToken: "",
      selectedBaseTokenTicker: "Token",
      loadspinner: false,
      loadspinnerLock: false,

      pair_address: this.props.match.params.pair_id || "",
      lpBalance: "",
      unlockDatebtn: "1",
      lockActive: false,
      sliderValue: 25,
      showModal: false,
      maxLpID: 0,
      status: "",
      percentageLocked: 0,
      placeholderState: true,

      recipientLocksLength: 0,
      recipientLocks: [],
      tokenLocksLength: 0,
      tokenLocks: [],

      coinbase: "",
      isLoadingMoreMyLocks: false,
      isLoadingMoreTokenLocks: false,

      totalLpLocked: "",
      baseTokens: [],
      usdValueOfLP: undefined,
      lpTotalSupply: "",

      // iframe
      textToCopy: "",
      loadComponent: false,
      networkId: '1'
    };
  }

  checkNetworkId = async ()=> {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "net_version" })
        .then((data) => {
          this.setState({
            networkId: data,
          });
         
           this.selectBaseToken().then();
           this.refreshMyLocks().then()
           this.loadPairInfo().then();
           let pair_id = this.props.match.params.pair_id;
           if (window.web3.utils.isAddress(pair_id)) {
            this.refreshTokenLocks(pair_id);
          this.checkTotalLpLocked().then()
          }
            
    if (window.isConnectedOneTime) {
      this.onComponentMount();
    } else {
      window.addOneTimeWalletConnectionListener(this.onComponentMount);
    }
        })
        .catch(console.error);
    } else {
     
     this.selectBaseToken().then();
    if (window.isConnectedOneTime) {
      this.onComponentMount();
    } else {
      window.addOneTimeWalletConnectionListener(this.onComponentMount);
    }
      this.setState({
        networkId: "1",
      });
      
    }
  }

  checkTotalLpLocked = async () => {
    let baseTokens =
   
    this.state.networkId === "1"
      ? await window.getBaseTokensETH()
      : await window.getBaseTokens()

    let pair_id = this.props.match.params.pair_id;
    let totalLpLocked =
            this.state.networkId === "1"
              ? await window.getLockedAmountETH(pair_id)
              : await window.getLockedAmount(pair_id) 
            this.refreshUsdValueOfLP(pair_id, totalLpLocked, baseTokens);
          this.setState({ totalLpLocked });
  }


  checkConnection() {
    const logout = localStorage.getItem('logout')
    if (logout !== "true") {
    if(window.ethereum)
    {
      window.ethereum.request({ method: "eth_accounts" })
      .then((data) => {
        
        this.setState({
          coinbase: data.length === 0 ? undefined : data[0],
        });
        
      })
      .catch(console.error);
    }
  }
  else {
    this.setState({
      coinbase: undefined ,
    });
  }
    
    
  }

  componentDidMount() {
    window.scrollTo(0,0)
   this.checkNetworkId()
   this.checkConnection()
  }
  componentWillUnmount() {
    window.removeOneTimeWalletConnectionListener(this.onComponentMount);
  }

  refreshMyLocks = async () => {
    if (this.state.isLoadingMoreMyLocks) return;
    this.setState({ isLoadingMoreMyLocks: true });
    try {
      let recipient = this.state.coinbase;
      let recipientLocksLength =
      
        this.state.networkId === "1"
          ? await window.getActiveLockIdsLengthByRecipientETH(recipient)
          : await window.getActiveLockIdsLengthByRecipient(recipient)
          
      recipientLocksLength = Number(recipientLocksLength);

      let step = window.config.MAX_LOCKS_TO_LOAD_PER_CALL;

      if (recipientLocksLength !== 0) {
        let startIndex = this.state.recipientLocks.length;
        let endIndex = Math.min(recipientLocksLength, startIndex + step);
        let recipientLocks =
      
          this.state.networkId === "1"
            ? await window.getActiveLocksByRecipientETH(
                recipient,
                startIndex,
                endIndex
              )
            : await window.getActiveLocksByRecipient(
                recipient,
                startIndex,
                endIndex
              )
             
        recipientLocks = this.state.recipientLocks.concat(recipientLocks);
        this.setState({ recipientLocksLength, recipientLocks });
      }
    } finally {
      this.setState({ isLoadingMoreMyLocks: false });
    }
  };

  onComponentMount = async () => {
    this.refreshMyLocks().then();
    this.selectBaseToken().then();
   this.checkNetworkId()


    this.setState({ coinbase: await window.getCoinbase() });
    let pair_id = this.props.match.params.pair_id;

    let baseTokens =
   
      this.state.networkId === "1"
        ? await window.getBaseTokensETH()
        : await window.getBaseTokens()

    this.setState({ baseTokens });
    if (window.web3.utils.isAddress(pair_id)) {
      this.refreshTokenLocks(pair_id);
      this.handlePairChange(null, pair_id);
      let totalLpLocked =
        this.state.networkId === "1"
          ? await window.getLockedAmountETH(pair_id)
          : await window.getLockedAmount(pair_id) 
        this.refreshUsdValueOfLP(pair_id, totalLpLocked, baseTokens);
      this.setState({ totalLpLocked });
    }
  };

  refreshUsdValueOfLP = async (pair, amount, baseTokens) => {
    try {
      let totalSupply = await window.getTokenTotalSupply(pair);
      this.setState({ lpTotalSupply: totalSupply });

      let { token0, token1 } = await window.getPairTokensInfo(pair);
      let baseToken;
      if (baseTokens.includes(token0.address.toLowerCase())) {
        baseToken = token0;
      } else if (baseTokens.includes(token1.address.toLowerCase())) {
        baseToken = token1;
      }
      let baseTokenBalance = await window.getTokenHolderBalance(
        baseToken.address,
        pair
      );
      let baseTokenInLp =
        (baseTokenBalance / 10 ** (baseToken.decimals * 1)) *
        (amount / totalSupply);
      let tokenCG = window.tokenCG[baseToken.address.toLowerCase()];
      if (!tokenCG) return;
      let usdPerBaseToken = Number(await window.getPrice(tokenCG));
      let usdValueOfLP = baseTokenInLp * usdPerBaseToken * 2;
      this.setState({ usdValueOfLP });
    } catch (e) {
      console.error(e);
    }
  };

  refreshTokenLocks = async (token) => {
    if (this.state.isLoadingMoreTokenLocks) return;
    this.setState({ isLoadingMoreTokenLocks: true });
    try {
      let tokenLocksLength =
      
        this.state.networkId === "1"
          ? await window.getActiveLockIdsLengthByTokenETH(token)
          : await window.getActiveLockIdsLengthByToken(token)
          
      tokenLocksLength = Number(tokenLocksLength);
      let step = window.config.MAX_LOCKS_TO_LOAD_PER_CALL;
      if (tokenLocksLength !== 0) {
        let startIndex = this.state.tokenLocks.length;
        let endIndex = Math.min(tokenLocksLength, startIndex + step);
        let tokenLocks =
        
          this.state.networkId === "1"
            ? await window.getActiveLocksByTokenETH(token, startIndex, endIndex)
            : await window.getActiveLocksByToken(token, startIndex, endIndex)
            
        tokenLocks = this.state.tokenLocks.concat(tokenLocks);
        this.setState({ tokenLocksLength, tokenLocks });
      }
    } finally {
      this.setState({ isLoadingMoreTokenLocks: false });
      const maxAmount = Math.max.apply(
        Math,
        this.state.tokenLocks.map(function (o) {
          return o.amount;
        })
      );
      var objId = this.state.tokenLocks.find(function (o) {
        return o.amount == maxAmount;
      });
      this.setState({ maxLpID: objId?.id });
    }
  };

  handlePairChange = async (e, pair_address = null) => {
    let newPairAddress = pair_address || e.target.value;

    this.setState({ pair_address: newPairAddress }, () => {
      this.refreshTokenLocks(newPairAddress);
    });

    let totalLpLocked =
      this.state.networkId === "1"
        ? await window.getLockedAmountETH(newPairAddress)
        : await window.getLockedAmount(newPairAddress)
    this.setState({ totalLpLocked });

    let totalSupply = await window.getTokenTotalSupply(newPairAddress);
    this.setState({ lpTotalSupply: totalSupply });

    clearTimeout(this.pairChangeTimeout);
    this.pairChangeTimeout = setTimeout(this.loadPairInfo, 500);
  };

  loadPairInfo = async () => {
    let isConnected = this.state.coinbase !== undefined ? true : false;
    
    if (!isConnected) {
      this.setState({
        status: "Please connect your wallet!",
      });

      this.setState({ placeholderState: true });
      return;
    }
    let isAddress;

    
    isAddress = window.web3.utils.isAddress(this.state.pair_address);
    if (!isAddress) {
      
      this.setState({
        status: this.state.pair_address === '' ? '' : "Pair address not valid. Please enter a valid address!",
      }); 
      return;
     
    }

    if (this.state.placeholderState === true && isAddress && isConnected) {
      this.setState({ placeholderState: false });
      this.selectBaseToken();
      this.handlePairChange(this.state.pair_address);
      
    }

    if (this.state.placeholderState === false && isAddress && isConnected) {
      this.selectBaseToken();
      this.handlePairChange(this.state.pair_address);
      

    }
    
  };

  selectBaseToken = async (e) => {
    let pair = await window.getPairTokensInfo(this.state.pair_address);

    this.setState({ pair });
    this.setState({ status: "" });

    if (pair) {
      let balance = await window.getTokenHolderBalance(
        this.state.pair_address,
        this.state.coinbase
      );

      this.setState({ amount: balance, lpBalance: balance });

      let token0 = pair["token0"]?.address;
      let token1 = pair["token1"]?.address;

      let baseTokens =
      
        this.state.networkId === "1"
          ? await window.getBaseTokensETH()
          : await window.getBaseTokens()
         
      if (baseTokens.includes(token0)) {
        this.setState({ selectedBaseToken: "0" });
        this.setState({ selectedBaseTokenTicker: pair["token0"].symbol });
      } else if (baseTokens.includes(token1)) {
        this.setState({ selectedBaseToken: "1" });
        this.setState({ selectedBaseTokenTicker: pair["token1"].symbol });
      } else if (
        pair["token0"].symbol === "USDT" ||
        pair["token1"].symbol === "USDT"
      ) {
        this.setState({ selectedBaseTokenTicker: "WETH" });
      }
    }
  };

  handleApprove = async (e) => {
    let selectedBaseTokenAddress = this.state.pair
      ? this.state.pair[
          this.state.selectedBaseToken == "0" ? "token0" : "token1"
        ].address
      : "";
    let baseTokens =
    window.ethereum ?
      window.ethereum.chainId === "0x1"
        ? await window.getBaseTokensETH()
        : await window.getBaseTokens()
        :await window.getBaseTokensETH();
    if (
      !baseTokens.includes(selectedBaseTokenAddress) &&
      this.state.amount != 0
    ) {
      console.log({ selectedBaseTokenAddress, baseTokens });
      this.setState({
        status: "Base token is not valid. Please enter your pair address!",
      });
      return;
    }

    if (this.state.amount == 0) {
      this.setState({
        status: "Not enough liquidity of base token!",
      });
      return;
    }

    if (
      baseTokens.includes(selectedBaseTokenAddress) &&
      this.state.amount == 0
    ) {
      this.setState({
        status: "Please select amount to lock!",
      });
      return;
    }

    this.setState({ loadspinner: true });
    let amountWei = new window.BigNumber(this.state.amount);

    let tokenContract = await window.getContract({
      address: this.state.pair_address,
      ABI: window.ERC20_ABI,
    });
    await tokenContract.methods
      .approve(
        window.ethereum ?
        window.ethereum.chainId === "0x1"
          ? window.config.lockereth_address
          : window.config.locker_address
          :window.config.lockereth_address,
        amountWei.times(1e18).toFixed(0).toString()
      )
      .send()
      .then(() => {
        this.setState({ lockActive: true });
        this.setState({ loadspinner: false });
      })
      .catch((e) => {
        this.setState({ loadspinner: false });
        this.setState({ status: "An error occurred, please try again later" });
        console.error(e);
      });
  };

  handleLockSubmit = async (e) => {
    e.preventDefault();
    let selectedBaseTokenAddress = this.state.pair
      ? this.state.pair[
          this.state.selectedBaseToken == "0" ? "token0" : "token1"
        ].address
      : "";
      if(window.ethereum) {
 if (window.ethereum.chainId === "0x1") {
      let lockerContract = await window.getContract({ key: "LOCKERETH" });

      let estimatedValue = await window.getMinLockCreationFeeInWei(
        this.state.pair_address,
        selectedBaseTokenAddress,
        this.state.amount
      );
      estimatedValue = new window.BigNumber(estimatedValue)
        .times(1.1)
        .toFixed(0);
      this.setState({ loadspinnerLock: true });

      await lockerContract.methods
        .createLock(
          this.state.pair_address,
          selectedBaseTokenAddress,
          this.state.amount,
          Math.floor(this.state.unlockDate.getTime() / 1e3)
        )
        .send({ value: estimatedValue, from: await window.getCoinbase() })
        .then(() => {
          this.setState({ loadspinnerLock: false });
          this.setState({ lockActive: false });
        })
        .catch((e) => {
          console.error(e);
          this.setState({ loadspinnerLock: false });
          this.setState({ status: "An error occurred, please try again" });
        });
    }

    if (window.ethereum.chainId === "0xa86a") {
      let lockerContract = await window.getContract({ key: "LOCKER" });

      let estimatedValue = await window.getMinLockCreationFeeInWei(
        this.state.pair_address,
        selectedBaseTokenAddress,
        this.state.amount
      );
      estimatedValue = new window.BigNumber(estimatedValue)
        .times(1.1)
        .toFixed(0);
      this.setState({ loadspinnerLock: true });

      await lockerContract.methods
        .createLock(
          this.state.pair_address,
          selectedBaseTokenAddress,
          this.state.amount,
          Math.floor(this.state.unlockDate.getTime() / 1e3)
        )
        .send({ value: estimatedValue, from: await window.getCoinbase() })
        .then(() => {
          this.setState({ loadspinnerLock: false });
        })
        .catch((e) => {
          console.error(e);
          this.setState({ loadspinnerLock: false });
          this.setState({ status: "An error occurred, please try again" });
        });
    }
      }
      else {
        
          let lockerContract = await window.getContract({ key: "LOCKERETH" });
    
          let estimatedValue = await window.getMinLockCreationFeeInWei(
            this.state.pair_address,
            selectedBaseTokenAddress,
            this.state.amount
          );
          estimatedValue = new window.BigNumber(estimatedValue)
            .times(1.1)
            .toFixed(0);
          this.setState({ loadspinnerLock: true });
    
          await lockerContract.methods
            .createLock(
              this.state.pair_address,
              selectedBaseTokenAddress,
              this.state.amount,
              Math.floor(this.state.unlockDate.getTime() / 1e3)
            )
            .send({ value: estimatedValue, from: await window.getCoinbase() })
            .then(() => {
              this.setState({ loadspinnerLock: false });
              this.setState({ lockActive: false });
            })
            .catch((e) => {
              console.error(e);
              this.setState({ loadspinnerLock: false });
              this.setState({ status: "An error occurred, please try again" });
            });
        
      }
   
  };

  handleAmountPercentInput = (percent) => (e) => {
    e.preventDefault();
    let amount = new window.BigNumber(this.state.lpBalance);
    amount = amount.times(percent).div(100).toFixed(0);
    this.setState({ amount });
  };

  handleClaim = (id) => (e) => {
    e.preventDefault();
    if(window.ethereum) {
      if (window.ethereum.chainId === "0x1") {
      window.claimUnlockedETH(id);
    }
    if (window.ethereum.chainId === "0xa86a") {
      window.claimUnlocked(id);
    }
    }
    else window.claimUnlockedETH(id);
    
  };

  handleSearchPair = (e) => {
    if (e.key === "Enter") {
      this.selectBaseToken();
      e.preventDefault();
    }
  };

  handleCopyIFrame = () => {
    let iFrame = document.createElement("iframe");
    iFrame.setAttribute("id", "locker-iframe");
    // navigator.clipboard.writeText(this.state.textToCopy)
  };
  GetPairLockInfo = () => {
    return (
      <div className="mb-4">
        <p style={{ color: "#A4A4A4", fontSize: 12 }}>
          Total{" "}
          {this.state.pair
            ? `${this.state.pair.token0.symbol}-${this.state.pair.token1.symbol}`
            : "LP"}{" "}
          locked:{" "}
          <span style={{ fontWeight: "bold" }}>
            {getFormattedNumber(this.state.totalLpLocked / 1e18, 18)} (
            {getFormattedNumber(
              (this.state.totalLpLocked / this.state.lpTotalSupply) * 100,
              2
            )}
            %)
          </span>
        </p>
        {typeof this.state.usdValueOfLP !== "undefined" && (
          <p>
            USD Value Locked:{" "}
            <span style={{ fontWeight: "bold" }}>
              ${getFormattedNumber(this.state.usdValueOfLP, 2)}
            </span>
          </p>
        )}
      </div>
    );
  };

  GetCreateLockForm = () => {
    const getPercentageLocked = () => {
      if (this.state.recipientLocksLength !== 0) {
        const amount =
          this.state.recipientLocks[this.state.recipientLocksLength - 1]
            .amount / 1e18;
        const percentage =
          (amount * 100) / (this.state.lpBalance / 1e18 + amount);

        return percentage.toFixed(0);
      }

      if (!this.props.match.params.pair_id) {
        const percentage = 25;
        return percentage;
      }
    };

    const convertTimestampToDate = (timestamp) => {
      const result = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(timestamp * 1000);
      return result;
    };

    if (this.state.placeholderState === true) {
      return (
        <div className="placeholderdiv">
          <strong style={{ fontSize: "18px" }} className="d-block mb-3">
          Create a lock
          </strong>
          <div>
            <form>
              <p
                className="text-muted lock-text-wrapper"
                
              >
                DYP Locker is a solution that supports liquidity lock
                functionality to every new project. Liquidity is the first thing
                that users check for, therefore having it encrypted via DYP
                Locker will assure them on the project validity and security.
              </p>
              <div className="row m-0" style={{ gap: 20, alignItems: 'center', paddingBottom: '1rem'}}>
                <div>
                  <img
                    src={LiqLocked}
                    alt=""
                    style={{ width: 80, height: 80, borderRadius: 6 }}
                  />
                </div>
                <div className="lock-text-wrapper">
                  <h6 className="lockertitle-text">
                    <b>Locking Liquidity</b>
                  </h6>
                  <p
                    className="text-muted lockliqtext"
                    
                  >
                    This makes the funds immovable until they are unlocked.
                    Every owner of the project can encrypt a portion of the
                    asset for a specific period of time and this liquidity
                    cannot be withdrawn until the time is over. This way users
                    will create a sense of security against projects. Liquidity
                    is locked using time-locked smart contracts and DYP Locker
                    offers this functionality with no additional costs.
                  </p>
                </div>
              </div>
              <div className="row m-0" style={{ gap: 20, alignItems: 'center' }}>
                <div>
                  <img
                    src={VerifiedLock}
                    alt=""
                    style={{ width: 80, height: 80, borderRadius: 6 }}
                  />
                </div>
                <div className="lock-text-wrapper">
                  <h6 className="lockertitle-text">
                    <b>Verified Security</b>
                  </h6>
                  <p
                    className="text-muted"
                    style={{  width: "fit-content" }}
                  >
                    Each project that locks liquidity on DYP Locker will be
                    given a verified security badge. Owners of the project can
                    share it to their communities in order to increase
                    credibility.
                  </p>
                </div>
              </div>
              <br />
              <div style={{ gap: 100, marginTop: 40, marginBottom: 40 }} className="row ml-0">
                <div>
                  <div className="row m-0 align-items-end" style={{ gap: 40 }}>
                    <div>
                      <p className="mt-0">
                        <b>Enter Pair address</b>
                      </p>
                      <input
                        style={{ width: "266px", height: 46 }}
                        disabled={this.props.match.params.pair_id}
                        value={this.state.pair_address}
                        onChange={(e) => {
                          this.handlePairChange(e);
                          this.loadPairInfo();
                          this.selectBaseToken(e);
                        }}
                        className="form-control"
                        type="text"
                        placeholder="Pair Address"
                        onKeyDown={this.handleSearchPair}
                      />
                    </div>

                    <div className="form-group m-0">
                      <div className="search-pair-btn" onClick={this.handleSearchPair}>
                        <p className="search-pair-text">Search</p>
                      </div>
                    </div>
                  </div>

                  {this.state.status !== "" && (
                    <div className="status-wrapper">
                      <p style={{ color: "#E30613" }}>
                        <img src={Error} alt="" /> {this.state.status}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      );
    } else if (this.state.placeholderState === false) {
      return (
        <div>
          <strong style={{ fontSize: "18px" }} className="d-block mb-3">
          Create a lock
          </strong>
          <div>
            <form onSubmit={this.handleLockSubmit}>
              <p
                className="text-muted lock-text-wrapper"
                
              >
                DYP Locker is a solution that supports liquidity lock
                functionality to every new project. Liquidity is the first thing
                that users check for, therefore having it encrypted via DYP
                Locker will assure them on the project validity and security.
              </p>
              <div className="row m-0" style={{ gap: 20, alignItems: 'center', paddingBottom: '1rem' }}>
                <div>
                  <img
                    src={LiqLocked}
                    alt=""
                    style={{ width: 80, height: 80, borderRadius: 6 }}
                  />
                </div>
                <div className="lock-text-wrapper">
                  <h6 className="lockertitle-text">
                    <b>Locking Liquidity</b>
                  </h6>
                  <p
                    className="text-muted lockliqtext"
                    
                  >
                    This makes the funds immovable until they are unlocked.
                    Every owner of the project can encrypt a portion of the
                    asset for a specific period of time and this liquidity
                    cannot be withdrawn until the time is over. This way users
                    will create a sense of security against projects. Liquidity
                    is locked using time-locked smart contracts and DYP Locker
                    offers this functionality with no additional costs.
                  </p>
                </div>
              </div>
              <div className="row m-0" style={{ gap: 20, alignItems: 'center' }}>
                <div>
                  <img
                    src={VerifiedLock}
                    alt=""
                    style={{ width: 80, height: 80, borderRadius: 6 }}
                  />
                </div>
                <div className="lock-text-wrapper">
                  <h6 className="lockertitle-text">
                    <b>Verified Security</b>
                  </h6>
                  <p
                    className="text-muted"
                    style={{  width: "fit-content" }}
                  >
                    Each project that locks liquidity on DYP Locker will be
                    given a verified security badge. Owners of the project can
                    share it to their communities in order to increase
                    credibility.
                  </p>
                </div>
              </div>
              <br />
              <div style={{ gap: 100, marginTop: 40, marginBottom: 40 }} className="row ml-0">
                <div>
                  <div className="row m-0 align-items-end" style={{ gap: 40 }}>
                    <div>
                      <p className="mt-0">
                        <b>Enter Pair Address</b>
                      </p>
                      <input
                        style={{ width: "266px", height: 46 }}
                        disabled={this.props.match.params.pair_id}
                        value={this.state.pair_address}
                        onChange={(e) => {
                          this.handlePairChange(e);
                          this.selectBaseToken(e);
                        }}
                        className="form-control"
                        type="text"
                        placeholder="Pair Address"
                        onKeyDown={this.handleSearchPair}
                      />
                    </div>

                    <div className="form-group m-0">
                      <div>
                        <p>Selected Base Token</p>
                        <div className="d-flex align-items-center base-wrapper">
                          <label style={{ color: "#E30613", margin: 0 }}>
                            {this.state.selectedBaseTokenTicker}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <br />
                  <div className="form-group">
                    <div
                      className="row m-0 align-items-end"
                      style={{ gap: 40 }}
                    >
                      <div>
                        <p>
                          <b>Amount to lock</b>
                        </p>
                        <input
                          disabled
                          style={{ width: "266px", height: 46 }}
                          onChange={(e) => {
                            let amount = new window.BigNumber(e.target.value);
                            amount = amount.times(1e18).toFixed(0);
                            this.setState({ amount });
                          }}
                          value={this.state.amount}
                          type="number"
                          placeholder="LP Token Amount"
                          className="form-control"
                          min={
                            getFormattedNumber(this.state.lpBalance / 1e18, 6) *
                            0.25
                          }
                        />
                      </div>

                      <div className="d-flex flex-column">
                        <span className="balance-placeholder">Balance:</span>
                        <span className="balance-text">
                          {getFormattedNumber(this.state.lpBalance / 1e18, 6)}
                        </span>
                      </div>
                    </div>
                    <br />
                  </div>
                  <p>
                    <b>Selected % rate</b>
                  </p>
                  <br />
                  <div className="slider-text-wrapper">
                    <span
                      className="slider-text"
                      style={{
                        color:
                          this.state.sliderValue < 35 ? "#E30613" : "#A4A4A4",
                        fontSize: this.state.sliderValue < 35 ? 20 : 15,
                        fontWeight: this.state.sliderValue < 35 ? 700 : 500,
                        justifyContent: "start",
                      }}
                    >
                      25%
                    </span>
                    <span
                      className="slider-text"
                      style={{
                        color:
                          this.state.sliderValue > 35 &&
                          this.state.sliderValue < 65
                            ? "#E30613"
                            : "#A4A4A4",
                        fontSize:
                          this.state.sliderValue > 35 &&
                          this.state.sliderValue < 65
                            ? 20
                            : 15,
                        fontWeight:
                          this.state.sliderValue > 35 &&
                          this.state.sliderValue < 65
                            ? 700
                            : 500,
                        justifyContent: "center",
                        width: "18%",
                      }}
                    >
                      50%
                    </span>
                    <span
                      className="slider-text"
                      style={{
                        color:
                          this.state.sliderValue > 65 &&
                          this.state.sliderValue < 90
                            ? "#E30613"
                            : "#A4A4A4",
                        fontSize:
                          this.state.sliderValue > 65 &&
                          this.state.sliderValue < 90
                            ? 20
                            : 15,
                        fontWeight:
                          this.state.sliderValue > 65 &&
                          this.state.sliderValue < 90
                            ? 700
                            : 500,
                        width: "27%",
                      }}
                    >
                      75%
                    </span>
                    <span
                      className="slider-text"
                      style={{
                        color:
                          this.state.sliderValue > 90 ? "#E30613" : "#A4A4A4",
                        fontSize: this.state.sliderValue > 90 ? 20 : 15,
                        fontWeight: this.state.sliderValue > 90 ? 700 : 500,
                        width: "30%",
                      }}
                    >
                      100%
                    </span>
                  </div>
                  <Slider
                    step={25}
                    dots
                    min={25}
                    dotStyle={{
                      background: "#B10C16",
                      height: 8,
                      width: 8,
                      border: "1px solid #B10C16",
                    }}
                    activeDotStyle={{ background: "#B10C16" }}
                    value={this.state.sliderValue}
                    onChange={(e) => {
                      this.handleAmountPercentInput(e);
                      this.setState({ sliderValue: e });

                      this.setState({
                        amount:
                          (getFormattedNumber(this.state.lpBalance / 1e18, 6) *
                            e) /
                          100,
                      });
                    }}
                  />
                  <br />
                  <p style={{ color: "#E30613" }}>
                    *Select % to of the balance to lock
                  </p>
                  <br />
                  <br />
                  <p>
                    <b>Selected unlock date</b>
                  </p>
                  <div className="form-group row align-items-end">
                    <div className="col">
                      <div
                        onClick={() => {
                          this.setState({
                            unlockDate: new Date(
                              Date.now() + 1 * 30 * 24 * 60 * 60 * 1000
                            ),
                          });

                          this.setState({ unlockDatebtn: "1" });
                        }}
                        className="btn btn-info btn-block"
                        style={{
                          border:
                            this.state.unlockDatebtn === "1"
                              ? "none"
                              : "1px solid #D8D8D8",
                          background:
                            this.state.unlockDatebtn === "1"
                              ? "linear-gradient(51.32deg, #E30613 -12.3%, #FA4A33 50.14%)"
                              : "transparent",
                          color:
                            this.state.unlockDatebtn === "1"
                              ? "white"
                              : "#A4A4A4",
                          width: "max-content",
                        }}
                      >
                        1 month
                      </div>
                    </div>
                    <div className="col">
                      <div
                        onClick={() => {
                          this.setState({
                            unlockDate: new Date(
                              Date.now() + 3 * 30 * 24 * 60 * 60 * 1000
                            ),
                          });
                          this.setState({ unlockDatebtn: "3" });
                        }}
                        style={{
                          border:
                            this.state.unlockDatebtn === "3"
                              ? "none"
                              : "1px solid #D8D8D8",
                          background:
                            this.state.unlockDatebtn === "3"
                              ? "linear-gradient(51.32deg, #E30613 -12.3%, #FA4A33 50.14%)"
                              : "transparent",
                          color:
                            this.state.unlockDatebtn === "3"
                              ? "white"
                              : "#A4A4A4",
                          width: "max-content",
                        }}
                        className="btn btn-info btn-block"
                      >
                        3 months
                      </div>
                    </div>
                    <div className="col">
                      <div
                        onClick={() => {
                          this.setState({
                            unlockDate: new Date(
                              Date.now() + 6 * 30 * 24 * 60 * 60 * 1000
                            ),
                          });
                          this.setState({ unlockDatebtn: "6" });
                        }}
                        style={{
                          border:
                            this.state.unlockDatebtn === "6"
                              ? "none"
                              : "1px solid #D8D8D8",
                          background:
                            this.state.unlockDatebtn === "6"
                              ? "linear-gradient(51.32deg, #E30613 -12.3%, #FA4A33 50.14%)"
                              : "transparent",
                          color:
                            this.state.unlockDatebtn === "6"
                              ? "white"
                              : "#A4A4A4",
                          width: "max-content",
                        }}
                        className="btn btn-info btn-block"
                      >
                        6 months
                      </div>
                    </div>
                    <div style={{ width: "fit-content", marginLeft: 10 }}>
                      <p>Custom date</p>
                      <DatePicker
                        selected={this.state.unlockDate}
                        onChange={(unlockDate) => this.setState({ unlockDate })}
                        showTimeSelect
                        dateFormat="MMMM d, yyyy h:mm aa"
                        className="form-control l-datepicker"
                      />
                    </div>
                  </div>

                  <hr />
                  <br />
                  <div
                    className="row m-0 justify-content-between"
                    style={{ gap: 30 }}
                  >
                    <button
                      onClick={this.handleApprove}
                      className="btn v1"
                      type="button"
                      style={{
                        background:
                          "linear-gradient(51.32deg, #E30613 -12.3%, #FA4A33 50.14%)",
                        width: 230,
                      }}
                    >
                      {this.state.loadspinner === true ? (
                        <>
                          <div
                            className="spinner-border "
                            role="status"
                            style={{ height: "1.5rem", width: "1.5rem" }}
                          ></div>
                        </>
                      ) : (
                        "APPROVE"
                      )}
                    </button>
                    <button
                      className="btn v1 ml-0"
                      type="submit"
                      style={{
                        background:
                          this.state.lockActive === false
                            ? "#C4C4C4"
                            : "linear-gradient(51.32deg, #E30613 -12.3%, #FA4A33 50.14%)",
                        width: 230,
                        pointerEvents:
                          this.state.lockActive === false ? "none" : "auto",
                      }}
                    >
                      {this.state.loadspinnerLock === true ? (
                        <>
                          <div
                            className="spinner-border "
                            role="status"
                            style={{ height: "1.5rem", width: "1.5rem" }}
                          ></div>
                        </>
                      ) : (
                        "LOCK"
                      )}
                    </button>
                  </div>
                  {this.state.status !== "" && (
                    <div className="status-wrapper">
                      <p style={{ color: "#E30613" }}>
                        <img src={Error} alt="" /> {this.state.status}
                      </p>
                    </div>
                  )}
                </div>
                {this.state.recipientLocks.length > 0 ? (
                  <div style={{ maxWidth: "400px", width: "100%" }}>
                    
                    <div className="row m-0">
                      
                      <div className="badge-wraper">
                        <img
                          src={
                            this.state.lockActive === true
                              ? BadgeGrayLight
                              : Badge
                          }
                          alt=""
                        />
                        <div
                          className="counter-wrapper"
                          style={{
                            background:
                              this.state.lockActive === false
                                ? "#EC2120"
                                : "#C4C4C4",
                          }}
                        >
                          
                          {this.state.lockActive === true ? (
                            <span className="counter-text">
                              Liquidity not locked
                            </span>
                          ) : (
                            <span className="counter-text">
                              {!this.state.lpBalance
                                ? 25
                                : getPercentageLocked()}{" "}
                              % Locked
                              <CountDownTimer
                                date={
                                  this.state.recipientLocksLength
                                    ? convertTimestampToDate(
                                        Number(
                                          this.state.recipientLocks[
                                            this.state.recipientLocksLength - 1
                                          ].unlockTimestamp
                                        )
                                      )
                                    : ""
                                }
                              />
                            </span>
                          )}
                        </div>
                      </div>
                      <div>
                        <div
                          className="moreinfo-wrapper"
                          onClick={() => {
                            this.setState({ showModal: true });
                          }}
                        >
                          <span className="moreinfo-text">
                            More info<i className="fas fa-info-circle"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* <iframe
                    style={{border: 'none'}}
                      srcDoc={`<div style="display: flex; flex-direction: column; align-items: center; gap: 5px"><img src=${BadgeSmall} alt="" style="width: 100px; height: 100px;"/>
                      <span style="background: rgb(236, 33, 32); color: #fff; padding: 5px 10px; border-radius: 4px; font-weight: 500; ">${
                        !this.state.lpBalance ? 25 : getPercentageLocked()
                      } % Locked</span</div>`}
                    ></iframe> */}
                    <div className="copylink-wrapper">
                      <div>
                        <span className="link-text">
                          https://dyp.finance/link/dummytext/
                        </span>
                      </div>
                      <div
                        className="d-flex align-items-center"
                        style={{ gap: 20 }}
                      >
                        <span className="sharelink-text">
                          Share this link lorem ipsum dolor sit{" "}
                        </span>
                        <div
                          onClick={this.handleCopyIFrame}
                          className="copy-btn"
                        >
                          Copy
                        </div>
                      </div>
                    </div>
                    <div className="info-wrappers">
                      <div className="row-wrapper">
                        <span className="left-info-text">ID</span>
                        <span className="right-info-text">
                          {this.state.recipientLocksLength
                            ? this.state.recipientLocks[
                                this.state.recipientLocksLength - 1
                              ].id
                            : ""}
                        </span>
                      </div>
                      <div className="row-wrapper">
                        <span className="left-info-text">Pair address</span>
                        <span className="right-info-text">
                          <NavLink
                            to={`/pair-explorer/${
                              this.state.recipientLocksLength
                                ? this.state.recipientLocks[
                                    this.state.recipientLocksLength - 1
                                  ].token
                                : ""
                            }`}
                            style={{ color: "#A4A4A4" }}
                          >
                            ...
                            {this.state.recipientLocksLength
                              ? this.state.recipientLocks[
                                  this.state.recipientLocksLength - 1
                                ].token.slice(35)
                              : ""}
                          </NavLink>{" "}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="badge-wraper">
                    <div
                          className="moreinfo-wrapper"
                          onClick={() => {
                            this.setState({ showModal: true });
                          }}
                        >
                          <span className="moreinfo-text">
                            More info<i className="fas fa-info-circle"></i>
                          </span>
                        </div>
                    <img src={BadgeGrayLight} alt="" />
                    <div
                      className="counter-wrapper"
                      style={{
                        background: "#C4C4C4",
                      }}
                    >
                      <span className="counter-text">Liquidity not locked</span>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
          {this.state.showModal === true ? (
            <InfoModal
              visible={this.state.showModal}
              modalId="infomodal"
              onModalClose={() => {
                this.setState({ showModal: false });
              }}
            />
          ) : (
            <></>
          )}
        </div>
      );
    }
  };

  GetMyLocks = () => {
    const convertTimestampToDate = (timestamp) => {
      const result = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(timestamp * 1000);
      return result;
    };

    if (this.state.recipientLocks.length > 0) {
      return (
        <div>
          <strong style={{ fontSize: "18px" }} className="d-block mb-3 mt-3">
            My locks
          </strong>
          <div
            style={{ display: "flex", flexWrap: "wrap", gap: 20, rowGap: 45 }}
          >
            {this.state.recipientLocks.map((lock) => (
              <div
                style={{ position: "relative", maxWidth: 390, width: "100%" }}
                key={lock.id}
              >
                <div
                  className="d-flex table-wrapper"
                  style={{
                    background:
                      lock.claimed === false
                        ? Date.now() > lock.unlockTimestamp * 1e3
                          ? "linear-gradient(230.69deg, #F08522 1.73%, #F8E11A 120.4%)"
                          : "linear-gradient(30.97deg, #E30613 18.87%, #FC4F36 90.15%)"
                        : "linear-gradient(30.97deg, #4D4D4D 18.87%, #A4A4A4 90.15%)",
                  }}
                >
                  <div className="pair-locks-wrapper">
                    <div className="row-wrapper">
                      <span className="left-info-text">
                        ID {lock.unlockTimestamp}
                      </span>
                      <span className="right-info-text">{lock.id}</span>
                    </div>
                    <div className="row-wrapper">
                      <span className="left-info-text">Pair Address</span>
                      <span className="right-info-text">
                        <NavLink
                          to={`/pair-explorer/${lock.token}`}
                          style={{ color: "#A4A4A4" }}
                        >
                          ...{lock.token.slice(35)}
                        </NavLink>{" "}
                      </span>
                    </div>
                    <div className="row-wrapper">
                      <span className="left-info-text">LP Amount</span>
                      <span className="right-info-text">
                        {getFormattedNumber(lock.amount / 1e18, 6)}
                      </span>
                    </div>
                    <div className="row-wrapper">
                      <span className="left-info-text">DYP</span>
                      <span className="right-info-text">
                        {getFormattedNumber(
                          lock.platformTokensLocked / 1e18,
                          6
                        )}
                      </span>
                    </div>
                    <div className="row-wrapper">
                      <span className="left-info-text">Recipient</span>
                      <span className="right-info-text">
                        <a
                          rel="noopener noreferrer"
                          style={{ color: "#A4A4A4" }}
                          target="_blank"
                          href={`https://etherscan.io/address/${lock.recipient}`}
                        >
                          ...{lock.recipient.slice(35)}
                        </a>
                      </span>
                    </div>
                    <div className="row-wrapper">
                      <span className="left-info-text">Unlocks In</span>
                      <span className="right-info-text">
                        {convertTimestampToDate(lock.unlockTimestamp)}
                      </span>
                    </div>
                  </div>
                  <div className="table-left-wrapper">
                    <span className="table-title-text">Status</span>
                    <div className="d-flex align-items-center status-button">
                      <h6 className="status-btn-text">
                        <img
                          src={
                            lock.claimed === false
                              ? Date.now() > lock.unlockTimestamp * 1e3
                                ? Active
                                : Active
                              : InActive
                          }
                          alt=""
                        />
                        {lock.claimed === false
                          ? Date.now() > lock.unlockTimestamp * 1e3
                            ? "Active"
                            : "Active"
                          : "Passive"}
                      </h6>
                    </div>
                    <span className="table-title-text" style={{ marginTop: 6 }}>
                      Ends in
                    </span>
                    <span className="table-subtitle-text">
                      <CountDownTimer
                        date={convertTimestampToDate(lock.unlockTimestamp)}
                      />
                    </span>
                    <span
                      className="table-title-text"
                      style={{ marginTop: 16, fontSize: 13 }}
                    >
                      Created on
                    </span>
                    <span className="table-subtitle-text">
                      {convertTimestampToDate(lock.unlockTimestamp)}
                    </span>
                  </div>
                </div>
                {String(this.state.coinbase).toLowerCase() ==
                  lock.recipient.toLowerCase() && (
                  <button
                    onClick={this.handleClaim(lock.id)}
                    disabled={Date.now() < lock.unlockTimestamp * 1e3}
                    style={{
                      color:
                        Date.now() < lock.unlockTimestamp * 1e3
                          ? "#C4C4C4"
                          : "#13D38E",
                      border:
                        Date.now() < lock.unlockTimestamp * 1e3
                          ? "2px solid #C4C4C4"
                          : "2px solid #13D38E",
                    }}
                    className="btn v1 btn-sm claim-btn"
                  >
                    Claim
                  </button>
                )}
              </div>
            ))}
          </div>
          {/* <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Pair Address</th>
                <th>LP Amount</th>
                <th>DYP</th>
                <th>Recipient</th>
                <th>Unlocks In</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {this.state.recipientLocks.map((lock) => (
                <tr key={lock.id}>
                  <td>{lock.id} </td>
                  <td title={lock.token}>
                    <NavLink to={`/pair-explorer/${lock.token}`}>
                      ...{lock.token.slice(35)}
                    </NavLink>{" "}
                  </td>
                  <td title={getFormattedNumber(lock.amount / 1e18, 18)}>
                    {getFormattedNumber(lock.amount / 1e18, 6)}{" "}
                  </td>
                  <td
                    title={getFormattedNumber(
                      lock.platformTokensLocked / 1e18,
                      18
                    )}
                  >
                    {getFormattedNumber(lock.platformTokensLocked / 1e18, 6)}
                  </td>
                  <td title={lock.recipient}>
                    <a
                      rel="noopener noreferrer"
                      target="_blank"
                      href={`https://etherscan.io/address/${lock.recipient}`}
                    >
                      ...{lock.recipient.slice(35)}
                    </a>
                  </td>
                  <td title={new Date(lock.unlockTimestamp * 1e3)}>
                    {moment
                      .duration(lock.unlockTimestamp * 1e3 - Date.now())
                      .humanize(true)}{" "}
                  </td>
                  <td>
                    {String(this.state.coinbase).toLowerCase() ==
                      lock.recipient.toLowerCase() && (
                      <button
                        onClick={this.handleClaim(lock.id)}
                        disabled={Date.now() < lock.unlockTimestamp * 1e3}
                        style={{ height: "auto" }}
                        className="btn v1 btn-sm"
                      >
                        CLAIM
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {this.state.recipientLocksLength >
                this.state.recipientLocks.length && (
                <tr>
                  <td colSpan="7" className="text-center">
                    {" "}
                    <a onClick={this.refreshMyLocks} href="javascript:void(0)">
                      {!this.state.isLoadingMoreMyLocks
                        ? "Load more"
                        : "Loading..."}{" "}
                    </a>{" "}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div> */}
        </div>
      );
    } else {
      return (
        <div>
          <strong
            style={{ fontSize: "18px", marginTop: "3rem" }}
            className="d-block mb-3 mt-3"
          >
            My locks
          </strong>
          <div className="row justify-content-between p-0 ml-0">
            <Skeleton theme={this.props.theme}/>
            <Skeleton theme={this.props.theme}/>
            <Skeleton theme={this.props.theme}/>
          </div>
        </div>
      );
    }
  };

  helperFunction = () => {
    this.forceUpdate();
    this.GetTokenLocks();
  };

  GetTokenLocks = () => {
    const convertTimestampToDate = (timestamp) => {
      const result = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(timestamp * 1000);
      return result;
    };

    return (
      <div>
        <strong style={{ fontSize: "18px" }} className="d-block mb-3">
          Pair locks
        </strong>
        {this.GetPairLockInfo()}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 20,
            marginTop: "3rem",
            rowGap: 45,
          }}
        >
          {this.state.tokenLocks &&
            this.state.tokenLocks
              .filter((lock) => lock.id === this.state.maxLpID)
              .map((lock) => {
                return (
                  <div
                    style={{
                      position: "relative",
                      maxWidth: 390,
                      width: "100%",
                    }}
                  >
                    {this.state.maxLpID === lock.id ? (
                      <div
                        className="top-locked-wrapper"
                        style={{
                          background:
                            lock.claimed === false
                              ? Date.now() < lock.unlockTimestamp * 1e3
                                ? "linear-gradient(30.97deg, #E30613 18.87%, #FC4F36 90.15%)"
                                : "linear-gradient(230.69deg, #F08522 1.73%, #F8E11A 120.4%)"
                              : "linear-gradient(30.97deg, #4D4D4D 18.87%, #A4A4A4 90.15%)",
                        }}
                      >
                        <span className="top-locked-text">Top locked</span>
                      </div>
                    ) : (
                      <></>
                    )}
                    <div
                      className="single-info"
                      onClick={() => {
                        this.setState({ showModal: true });
                      }}
                    >
                      <i className="fas fa-info-circle"></i>
                    </div>
                    <div
                      className="d-flex table-wrapper"
                      style={{
                        background:
                          lock.claimed === false
                            ? Date.now() < lock.unlockTimestamp * 1e3
                              ? "linear-gradient(30.97deg, #E30613 18.87%, #FC4F36 90.15%)"
                              : "linear-gradient(230.69deg, #F08522 1.73%, #F8E11A 120.4%)"
                            : "linear-gradient(30.97deg, #4D4D4D 18.87%, #A4A4A4 90.15%)",
                        borderTopLeftRadius:
                          this.state.maxLpID === lock.id ? 0 : 6,
                      }}
                    >
                      <div key={lock.id} className="pair-locks-wrapper">
                        <div className="row-wrapper">
                          <span className="left-info-text">
                            ID{lock.unlockTimestamp}
                          </span>
                          <span className="right-info-text">{lock.id}</span>
                        </div>
                        <div className="row-wrapper">
                          <span className="left-info-text">Pair Address</span>
                          <span className="right-info-text">
                            <NavLink
                              to={`/pair-explorer/${lock.token}`}
                              style={{ color: "#A4A4A4" }}
                            >
                              ...{lock.token.slice(35)}
                            </NavLink>{" "}
                          </span>
                        </div>
                        <div className="row-wrapper">
                          <span className="left-info-text">LP Amount</span>
                          <span className="right-info-text">
                            {getFormattedNumber(lock.amount / 1e18, 6)}
                          </span>
                        </div>
                        <div className="row-wrapper">
                          <span className="left-info-text">DYP</span>
                          <span className="right-info-text">
                            {getFormattedNumber(
                              lock.platformTokensLocked / 1e18,
                              6
                            )}
                          </span>
                        </div>
                        <div className="row-wrapper">
                          <span className="left-info-text">Recipient</span>
                          <span className="right-info-text">
                            <a
                              rel="noopener noreferrer"
                              style={{ color: "#A4A4A4" }}
                              target="_blank"
                              href={`https://etherscan.io/address/${lock.recipient}`}
                            >
                              ...{lock.recipient.slice(35)}
                            </a>
                          </span>
                        </div>
                        <div className="row-wrapper">
                          <span className="left-info-text">Unlocks In</span>
                          <span className="right-info-text">
                            {convertTimestampToDate(lock.unlockTimestamp)}
                          </span>
                        </div>
                      </div>
                      <div className="table-left-wrapper">
                        <span className="table-title-text">Status</span>
                        <div className="d-flex align-items-center status-button">
                          <h6 className="status-btn-text">
                            <img
                              src={
                                lock.claimed === false
                                  ? Date.now() < lock.unlockTimestamp * 1e3
                                    ? Active
                                    : Active
                                  : InActive
                              }
                              alt=""
                            />
                            {lock.claimed === false
                              ? Date.now() < lock.unlockTimestamp * 1e3
                                ? "Active"
                                : "Active"
                              : "Passive"}
                          </h6>
                        </div>
                        <span
                          className="table-title-text"
                          style={{ marginTop: 6 }}
                        >
                          Ends in
                        </span>
                        <span className="table-subtitle-text">
                          <CountDownTimer
                            date={convertTimestampToDate(lock.unlockTimestamp)}
                          />
                        </span>
                        <span
                          className="table-title-text"
                          style={{ marginTop: 16, fontSize: 13 }}
                        >
                          Created on
                        </span>
                        <span className="table-subtitle-text">
                          {convertTimestampToDate(lock.unlockTimestamp)}
                        </span>
                      </div>
                    </div>
                    <img
                      src={
                        lock.claimed === false
                          ? Date.now() > lock.unlockTimestamp * 1e3
                            ? BadgeYellow
                            : Badge
                          : BadgeGray
                      }
                      alt=""
                      className="badge-img"
                    />
                  </div>
                );
              })}
          {this.state.tokenLocks
            .filter((lock) => lock.id !== this.state.maxLpID)
            .map((lock) => {
              return (
                <div
                  style={{ position: "relative", maxWidth: 390, width: "100%" }}
                >
                  {this.state.maxLpID === lock.id ? (
                    <div
                      className="top-locked-wrapper"
                      style={{
                        background:
                          lock.claimed === false
                            ? Date.now() < lock.unlockTimestamp * 1e3
                              ? "linear-gradient(30.97deg, #E30613 18.87%, #FC4F36 90.15%)"
                              : "linear-gradient(230.69deg, #F08522 1.73%, #F8E11A 120.4%)"
                            : "linear-gradient(30.97deg, #4D4D4D 18.87%, #A4A4A4 90.15%)",
                      }}
                    >
                      <span className="top-locked-text">Top locked</span>
                    </div>
                  ) : (
                    <></>
                  )}
                  <div
                    className="d-flex table-wrapper"
                    style={{
                      background:
                        lock.claimed === false
                          ? Date.now() < lock.unlockTimestamp * 1e3
                            ? "linear-gradient(30.97deg, #E30613 18.87%, #FC4F36 90.15%)"
                            : "linear-gradient(230.69deg, #F08522 1.73%, #F8E11A 120.4%)"
                          : "linear-gradient(30.97deg, #4D4D4D 18.87%, #A4A4A4 90.15%)",
                      borderTopLeftRadius:
                        this.state.maxLpID === lock.id ? 0 : 6,
                    }}
                  >
                    <div key={lock.id} className="pair-locks-wrapper">
                      <div className="row-wrapper">
                        <span className="left-info-text">ID</span>
                        <span className="right-info-text">{lock.id}</span>
                      </div>
                      <div className="row-wrapper">
                        <span className="left-info-text">Pair Address</span>
                        <span className="right-info-text">
                          <NavLink
                            to={`/pair-explorer/${lock.token}`}
                            style={{ color: "#A4A4A4" }}
                          >
                            ...{lock.token.slice(35)}
                          </NavLink>{" "}
                        </span>
                      </div>
                      <div className="row-wrapper">
                        <span className="left-info-text">LP Amount</span>
                        <span className="right-info-text">
                          {getFormattedNumber(lock.amount / 1e18, 6)}
                        </span>
                      </div>
                      <div className="row-wrapper">
                        <span className="left-info-text">DYP</span>
                        <span className="right-info-text">
                          {getFormattedNumber(
                            lock.platformTokensLocked / 1e18,
                            6
                          )}
                        </span>
                      </div>
                      <div className="row-wrapper">
                        <span className="left-info-text">Recipient</span>
                        <span className="right-info-text">
                          <a
                            rel="noopener noreferrer"
                            style={{ color: "#A4A4A4" }}
                            target="_blank"
                            href={`https://etherscan.io/address/${lock.recipient}`}
                          >
                            ...{lock.recipient.slice(35)}
                          </a>
                        </span>
                      </div>
                      <div className="row-wrapper">
                        <span className="left-info-text">Unlocks In</span>
                        <span className="right-info-text">
                          {convertTimestampToDate(lock.unlockTimestamp)}
                        </span>
                      </div>
                    </div>
                    <div className="table-left-wrapper">
                      <span className="table-title-text">Status</span>
                      <div className="d-flex align-items-center status-button">
                        <h6 className="status-btn-text">
                          <img
                            src={
                              lock.claimed === false
                                ? Date.now() < lock.unlockTimestamp * 1e3
                                  ? Active
                                  : Active
                                : InActive
                            }
                            alt=""
                          />
                          {lock.claimed === false
                            ? Date.now() < lock.unlockTimestamp * 1e3
                              ? "Active"
                              : "Active"
                            : "Passive"}
                        </h6>
                      </div>
                      <span
                        className="table-title-text"
                        style={{ marginTop: 6 }}
                      >
                        Ends in
                      </span>
                      <span className="table-subtitle-text">
                        <CountDownTimer
                          date={convertTimestampToDate(lock.unlockTimestamp)}
                        />
                      </span>
                      <span
                        className="table-title-text"
                        style={{ marginTop: 16, fontSize: 12 }}
                      >
                        Created on
                      </span>
                      <span className="table-subtitle-text">
                        {convertTimestampToDate(lock.unlockTimestamp)}
                      </span>
                    </div>
                  </div>
                  <img
                    src={
                      lock.claimed === false
                        ? Date.now() > lock.unlockTimestamp * 1e3
                          ? BadgeYellow
                          : BadgeSmall
                        : BadgeGray
                    }
                    alt=""
                    className="badge-img"
                  />
                </div>
              );
            })}

          {this.state.tokenLocks.length == 0 && (
            <div className="row justify-content-between p-0 ml-0">
              <Skeleton theme={this.props.theme}/>
              <Skeleton theme={this.props.theme}/>
              <Skeleton theme={this.props.theme}/>
            </div>
          )}
        </div>
      </div>
    );
  };
  render() {
    return (
      <div className="locker">
        <div className="table-title">
          <h2 style={{ display: "block", color: `var(--preloader-clr)` }}>
            DYP Locker
          </h2>

          <p>
            Lock {window.ethereum ? window.ethereum.chainId === "0x1" ? "Uniswap" : "Pangolin" : 'Uniswap'}
            {" "}liquidity and check status of liquidity locks.
          </p>
        </div>
        <div className="l-table-wrapper-div p-4">
          <div className="mb-4">{this.GetCreateLockForm()}</div>
          <div className="mb-4">{this.GetTokenLocks()}</div>
          {this.state.recipientLocks.length > 0 && (
            <div className="mb-5">{this.GetMyLocks()}</div>
          )}
        </div>
      </div>
    );
  }
}

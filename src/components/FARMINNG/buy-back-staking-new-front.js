import React from "react";
import moment from "moment";
import getFormattedNumber from "../../functions/get-formatted-number";
import Address from "./address";
import WalletModal from "../WalletModal";
import "./top-pools.css";
import statsLinkIcon from "./assets/statsLinkIcon.svg";
import { shortAddress } from "../../functions/shortAddress";
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
import dropdownVector from "./assets/dropdownVector.svg";
import poolsCalculatorIcon from './assets/poolsCalculatorIcon.svg'
import calculatorIcon from "../calculator/assets/calculator.svg";
import xMark from "../calculator/assets/xMark.svg";



const renderer = ({ days, hours, minutes, seconds }) => {
  return (
    <div className="d-flex gap-3 justify-content-center align-items-center">
      <div className="d-flex gap-1 align-items-baseline">
        <span>{days < 10 ? "0" + days : days}</span>
        <span style={{ fontSize: "13px" }}>days</span>
      </div>
      <div className="d-flex gap-1 align-items-baseline">
        <span>{hours < 10 ? "0" + hours : hours}</span>
        <span style={{ fontSize: "13px" }}>hours</span>
      </div>
      <div className="d-flex gap-1 align-items-baseline">
        <span>{minutes < 10 ? "0" + minutes : minutes}</span>
        <span style={{ fontSize: "13px" }}>minutes</span>
      </div>
      <span className="d-none">{seconds < 10 ? "0" + seconds : seconds}</span>
      <span className="d-none">seconds</span>
    </div>
  );
};

export default function initBuybackStakingNew({
  staking,
  constant,
  apr,
  lock,
  expiration_time,
  fee,
  lockTime,
  listType
}) {
  let { reward_token, BigNumber, alertify, reward_token_idyp, token_dyps } =
    window;
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

  class Staking extends React.Component {
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
        depositLoading: false,
        depositStatus: "initial",
        depositAmount: "",
        withdrawAmount: 0,
        selectedPool: "",
        claimLoading: false,
        claimStatus: "initial",
        claimidypLoading: false,
        claimidypStatus: "initial",
        withdrawLoading: false,
        withdrawStatus: "initial",
        reInvestLoading: false,
        reInvestStatus: "initial",
        coinbase: "0x0000000000000000000000000000000000000111",
        tvl: "",
        stakingOwner: null,
        approxDeposit: 100,
        approxDays: 365,
        selectedTokenLogo: "weth",
        selectedRewardTokenLogo1: "weth",
        selectedRewardTokenLogo2: "dyp",
        usdPerToken: 0,
        showWithdrawModal: false,
        errorMsg: "",
        errorMsg2: "",
        errorMsg3: "",
        dypstake: 0,
        dypConst: 0,
        dypstakeWithdraw: 0,
        dypConstWithdraw: 0,

        selectedBuybackToken: Object.keys(window.buyback_tokens)[0],
        selectedTokenDecimals:
          window.buyback_tokens[Object.keys(window.buyback_tokens)[0]].decimals,
        selectedTokenBalance: "",
        selectedTokenSymbol:
          window.buyback_tokens[Object.keys(window.buyback_tokens)[0]].symbol,

        contractDeployTime: "",
        disburseDuration: "",
        show: false,
        popup: false,
        is_wallet_connected: false,
        apyBuyback1: 0,
        apyBuyback2: 0,
      };

      this.showModal = this.showModal.bind(this);
      this.hideModal = this.hideModal.bind(this);

      this.showPopup = this.showPopup.bind(this);
      this.hidePopup = this.hidePopup.bind(this);
    }

    clickDeposit = () => {
      if (this.state.depositStatus === "initial") {
        this.setState({ depositLoading: true });
        setTimeout(() => {
          this.setState({ depositLoading: false, depositStatus: "deposit" });
        }, 2000);
      } else if (this.state.depositStatus === "deposit") {
        this.setState({ depositLoading: true });
        setTimeout(() => {
          this.setState({ depositLoading: false, depositStatus: "success" });
        }, 2000);
      }
    };

    clickClaim = () => {
      this.setState({ claimLoading: true });
      setTimeout(() => {
        this.setState({ claimStatus: "claimed" });
        this.setState({ claimLoading: false });
      }, 2000);
    };
    clickReInvest = () => {
      this.setState({ reInvestLoading: true });
      setTimeout(() => {
        this.setState({ claimStatus: "claimed" });
        this.setState({ reInvestLoading: false });
      }, 2000);
    };

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
    handleSelectedTokenChange = async (tokenAddress) => {
      let tokenDecimals = window.buyback_tokens[tokenAddress].decimals;
      let selectedTokenSymbol = window.buyback_tokens[tokenAddress].symbol;
      this.setState({
        selectedBuybackToken: tokenAddress,
        selectedTokenBalance: "",
        selectedTokenDecimals: tokenDecimals,
        selectedTokenSymbol,
      });
      this.setState({
        selectedTokenLogo: window.buyback_tokens[tokenAddress].symbol,
      });
      let selectedTokenBalance = await window.getTokenHolderBalance(
        tokenAddress,
        this.props.coinbase
      );
      this.setState({ selectedTokenBalance });
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
      // window._refreshBalInterval = setInterval(this.refreshBalance, 3000);
      this.getDypbalanceConst();
      this.getDypbalanceStake();
      this.getPriceDYP();
      this.getDypbalanceStakeWithdraw();
      this.getDypbalanceConstWithdraw();

      if (this.props.coinbase !== this.state.coinbase) {
        this.setState({ coinbase: this.props.coinbase });
      }
    }

    getTotalTvl = async () => {
      let { the_graph_result } = this.props;

      // console.log(the_graph_result)

      let usd_per_token = the_graph_result.token_data
        ? the_graph_result.token_data[
            "0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17"
          ].token_price_usd
        : 1;
      let usd_per_idyp = the_graph_result.token_data
        ? the_graph_result.token_data[
            "0xbd100d061e120b2c67a24453cf6368e63f1be056"
          ].token_price_usd
        : 1;

      //apr is 30%
      let apy1_buyback1 = new BigNumber(0.225).minus(fee / 100);
      let apy2_buyback1 = new BigNumber(0.25)
        .div(usd_per_token)
        .times(30)
        .div(1e2)
        .times(usd_per_idyp);

      // APR is 100% considering 1$ as initial investment, 0.75$ goes to Buyback
      let apy1_buyback2 = new BigNumber(0.75).minus(fee / 100);
      let apy2_buyback2 = new BigNumber(0.25)
        .div(usd_per_token)
        .times(usd_per_idyp);

      let apyBuyback1 = new BigNumber(apy1_buyback1)
        .plus(apy2_buyback1)
        .times(1e2)
        .toFixed(0);
      let apyBuyback2 = new BigNumber(apy1_buyback2)
        .plus(apy2_buyback2)
        .times(1e2)
        .toFixed(0);

      this.setState({ apyBuyback1, apyBuyback2 });
    };

    getPriceDYP = async () => {
      let usdPerToken = await window.getPrice("defi-yield-protocol");
      this.setState({ usdPerToken });
    };

    componentWillUnmount() {
      // clearInterval(window._refreshBalInterval);
    }

    handleApprove = async (e) => {
      let amount = this.state.depositAmount;
      this.setState({ depositLoading: true });

      amount = new BigNumber(amount)
        .times(10 ** this.state.selectedTokenDecimals)
        .toFixed(0);
      window
        .approveToken(this.state.selectedBuybackToken, staking._address, amount)
        .then(() => {
          this.setState({ depositLoading: false, depositStatus: "deposit" });
        })
        .catch((e) => {
          this.setState({ depositLoading: false, depositStatus: "fail" });
          this.setState({ errorMsg: e?.message });
          setTimeout(() => {
            this.setState({
              depositStatus: "initial",
              depositAmount: "",
              errorMsg: "",
            });
          }, 2000);
        });
    };

    handleStake = async (e) => {
      this.setState({ depositLoading: true });

      let selectedBuybackToken = this.state.selectedBuybackToken;
      let amount = this.state.depositAmount;

      amount = new BigNumber(amount)
        .times(10 ** this.state.selectedTokenDecimals)
        .toFixed(0);

      let _75Percent = new BigNumber(amount).times(75e2).div(100e2).toFixed(0);
      let _25Percent = new BigNumber(amount).minus(_75Percent).toFixed(0);

      let deadline = Math.floor(
        Date.now() / 1e3 + window.config.tx_max_wait_seconds
      ).toFixed(0);
      let router = await window.getUniswapRouterContract();
      let WETH = await router.methods.WETH().call();
      let platformTokenAddress = window.config.reward_token_idyp_address;
      let platformTokenAddress_25Percent = window.config.reward_token_address;

      let path = [
        ...new Set(
          [selectedBuybackToken, WETH, platformTokenAddress].map((a) =>
            a.toLowerCase()
          )
        ),
      ];
      let _amountOutMin_75Percent = await router.methods
        .getAmountsOut(_75Percent, path)
        .call()
        .catch((e) => {
          this.setState({ depositLoading: false, depositStatus: "fail" });
          this.setState({ errorMsg: e?.message });
          setTimeout(() => {
            this.setState({
              depositStatus: "initial",
              depositAmount: "",
              errorMsg: "",
            });
          }, 10000);
        });
      _amountOutMin_75Percent =
        _amountOutMin_75Percent[_amountOutMin_75Percent.length - 1];
      _amountOutMin_75Percent = new BigNumber(_amountOutMin_75Percent)
        .times(100 - window.config.slippage_tolerance_percent)
        .div(100)
        .toFixed(0);

      let path_25Percent = [
        ...new Set(
          [selectedBuybackToken, WETH, platformTokenAddress_25Percent].map(
            (a) => a.toLowerCase()
          )
        ),
      ];
      let _amountOutMin_25Percent = await router.methods
        .getAmountsOut(_25Percent, path_25Percent)
        .call()
        .catch((e) => {
          this.setState({ depositLoading: false, depositStatus: "fail" });
          this.setState({ errorMsg: e?.message });
          setTimeout(() => {
            this.setState({
              depositStatus: "initial",
              depositAmount: "",
              errorMsg: "",
            });
          }, 10000);
        });
      _amountOutMin_25Percent =
        _amountOutMin_25Percent[_amountOutMin_25Percent.length - 1];
      _amountOutMin_25Percent = new BigNumber(_amountOutMin_25Percent)
        .times(100 - window.config.slippage_tolerance_percent)
        .div(100)
        .toFixed(0);

      let _amountOutMin_stakingReferralFee = new BigNumber(0).toFixed(0);

      console.log({
        amount,
        selectedBuybackToken,
        _amountOutMin_75Percent,
        _amountOutMin_25Percent,
        _amountOutMin_stakingReferralFee,
        deadline,
      });

      staking
        .stake(
          amount,
          selectedBuybackToken,
          _amountOutMin_75Percent,
          _amountOutMin_25Percent,
          _amountOutMin_stakingReferralFee,
          deadline
        )
        .then(() => {
          this.setState({ depositLoading: false, depositStatus: "success" });
        })
        .catch((e) => {
          this.setState({ depositLoading: false, depositStatus: "fail" });
          this.setState({ errorMsg: e?.message });
          setTimeout(() => {
            this.setState({
              depositStatus: "initial",
              depositAmount: "",
              errorMsg: "",
            });
          }, 10000);
        });
    };




    


    getDypbalanceConstWithdraw = async()=>{
      let amountConstant = await constant.depositedTokens(this.state.coinbase);
      amountConstant = new BigNumber(amountConstant).toFixed(0);
       this.setState({dypConstWithdraw: getFormattedNumber(amountConstant, 6)})
    }

    
    getDypbalanceStakeWithdraw = async()=>{
      let amountBuyback = await staking.depositedTokens(this.state.coinbase);
      this.setState({dypstakeWithdraw: getFormattedNumber(amountBuyback, 6)})
    }

    handleWithdrawConst = async (e) => {
      // e.preventDefault();
      this.setState({ withdrawLoading: true });

      let amountConstant = await constant.depositedTokens(this.props.coinbase);
      amountConstant = new BigNumber(amountConstant).toFixed(0);

      let amountBuyback = await staking.depositedTokens(this.props.coinbase);

      let router = await window.getUniswapRouterContract();
      let WETH = await router.methods.WETH().call();
      let platformTokenAddress = window.config.reward_token_address;
      let rewardTokenAddress = window.config.reward_token_idyp_address;
      let path = [
        ...new Set(
          [rewardTokenAddress, WETH, platformTokenAddress].map((a) =>
            a.toLowerCase()
          )
        ),
      ];
      let _amountOutMin = await router.methods
        .getAmountsOut(amountBuyback, path)
        .call()
        .catch((e) => {
          this.setState({ withdrawStatus: "failed" });
          this.setState({ withdrawLoading: false });
          this.setState({ errorMsg3: e?.message });

          setTimeout(() => {
            this.setState({
              withdrawStatus: "initial",
              selectedPool: "",
              errorMsg3: "",
            });
          }, 10000);
        });
      _amountOutMin = _amountOutMin[_amountOutMin.length - 1];
      _amountOutMin = new BigNumber(_amountOutMin)
        .times(100 - window.config.slippage_tolerance_percent)
        .div(100)
        .toFixed(0);

      let deadline = Math.floor(
        Date.now() / 1e3 + window.config.tx_max_wait_seconds
      );

      // console.log({amountBuyback, amountConstant, _amountOutMin})

      try {
        // setTimeout(() => constant.unstake(amountConstant, 0, deadline), 10e3);
        constant
          .unstake(amountConstant, 0, deadline)
          .then(() => {
            this.setState({ withdrawStatus: "success" });
            this.setState({ withdrawLoading: false });
          })
          .catch((e) => {
            this.setState({ withdrawStatus: "failed" });
            this.setState({ withdrawLoading: false });
            this.setState({ errorMsg3: e?.message });
            setTimeout(() => {
              this.setState({
                withdrawStatus: "initial",
                selectedPool: "",
                errorMsg3: "",
              });
            }, 10000);
          });
      } catch (e) {
        this.setState({ errorMsg3: e?.message });
        setTimeout(() => {
          this.setState({
            withdrawStatus: "initial",
            selectedPool: "",
            errorMsg3: "",
          });
        }, 10000);

        console.error(e);
        return;
      }
    };

    handleWithdrawStake = async (e) => {
      let amountConstant = await constant.depositedTokens(this.props.coinbase);
      amountConstant = new BigNumber(amountConstant).toFixed(0);
      this.setState({ withdrawLoading: true });

      let amountBuyback = await staking.depositedTokens(this.props.coinbase);

      let router = await window.getUniswapRouterContract();
      let WETH = await router.methods.WETH().call();
      let platformTokenAddress = window.config.reward_token_address;
      let rewardTokenAddress = window.config.reward_token_idyp_address;
      let path = [
        ...new Set(
          [rewardTokenAddress, WETH, platformTokenAddress].map((a) =>
            a.toLowerCase()
          )
        ),
      ];
      let _amountOutMin = await router.methods
        .getAmountsOut(amountBuyback, path)
        .call()
        .catch((e) => {
          this.setState({ withdrawStatus: "failed" });
          this.setState({ withdrawLoading: false });
          this.setState({ errorMsg3: e?.message });

          setTimeout(() => {
            this.setState({
              withdrawStatus: "initial",
              selectedPool: "",
              errorMsg3: "",
            });
          }, 10000);
        });
      _amountOutMin = _amountOutMin[_amountOutMin.length - 1];
      _amountOutMin = new BigNumber(_amountOutMin)
        .times(100 - window.config.slippage_tolerance_percent)
        .div(100)
        .toFixed(0);

      let deadline = Math.floor(
        Date.now() / 1e3 + window.config.tx_max_wait_seconds
      );

      try {
        staking
          .unstake(amountBuyback, _amountOutMin, deadline)
          .then(() => {
            this.setState({ withdrawStatus: "success" });
            this.setState({ withdrawLoading: false });
          })
          .catch((e) => {
            this.setState({ withdrawStatus: "failed" });
            this.setState({ withdrawLoading: false });
            this.setState({ errorMsg3: e?.message });

            setTimeout(() => {
              this.setState({
                withdrawStatus: "initial",
                selectedPool: "",
                errorMsg3: "",
              });
            }, 10000);
          });
      } catch (e) {
        this.setState({ errorMsg3: e?.message });

        setTimeout(() => {
          this.setState({
            withdrawStatus: "initial",
            selectedPool: "",
            errorMsg3: "",
          });
        }, 10000);

        console.error(e);
        return;
      }
    };



    getDypbalanceConst = async () => {
      let address = this.props.coinbase;
      let amount = await staking.getTotalPendingDivs(address);
      let router = await window.getUniswapRouterContract();
      let WETH = await router.methods.WETH().call();
      let platformTokenAddress = window.config.reward_token_address;
      let rewardTokenAddress = window.config.reward_token_idyp_address;
      let path = [
        ...new Set(
          [rewardTokenAddress, WETH, platformTokenAddress].map((a) =>
            a.toLowerCase()
          )
        ),
      ];

      let _amountOutMinConstant = await router.methods
        .getAmountsOut(amount, path)
        .call()
        .catch((e) => {
          this.setState({ dypConst: getFormattedNumber(0, 6) });
        });
      _amountOutMinConstant =
        _amountOutMinConstant[_amountOutMinConstant.length - 1];
      _amountOutMinConstant = new BigNumber(_amountOutMinConstant)
        .times(100 - window.config.slippage_tolerance_percent)
        .div(100)
        .toFixed(0);
      this.setState({ dypConst: getFormattedNumber(_amountOutMinConstant, 6) });
    };

    handleClaimDivsConst = async (e) => {
      let address = this.props.coinbase;
      let amount = await staking.getTotalPendingDivs(address);
      this.setState({ claimLoading: true });

      let router = await window.getUniswapRouterContract();
      let WETH = await router.methods.WETH().call();
      let platformTokenAddress = window.config.reward_token_address;
      let rewardTokenAddress = window.config.reward_token_idyp_address;
      let path = [
        ...new Set(
          [rewardTokenAddress, WETH, platformTokenAddress].map((a) =>
            a.toLowerCase()
          )
        ),
      ];
      let _amountOutMin = await router.methods
        .getAmountsOut(amount, path)
        .call()
        .catch((e) => {
          this.setState({ claimStatus: "failed" });
          this.setState({ claimLoading: false });
          this.setState({ errorMsg2: e?.message });
          setTimeout(() => {
            this.setState({
              claimStatus: "initial",
              selectedPool: "",
              errorMsg2: "",
            });
          }, 10000);
        });
      _amountOutMin = _amountOutMin[_amountOutMin.length - 1];
      _amountOutMin = new BigNumber(_amountOutMin)
        .times(100 - window.config.slippage_tolerance_percent)
        .div(100)
        .toFixed(0);

      let deadline = Math.floor(
        Date.now() / 1e3 + window.config.tx_max_wait_seconds
      );

      //console.log({_amountOutMin, deadline})
      amount = await constant.getTotalPendingDivs(address);
      let _amountOutMinConstant = await router.methods
        .getAmountsOut(amount, path)
        .call()
        .catch((e) => {
          this.setState({ claimStatus: "failed" });
          this.setState({ claimLoading: false });
          this.setState({ errorMsg2: e?.message });
          setTimeout(() => {
            this.setState({
              claimStatus: "initial",
              selectedPool: "",
              errorMsg2: "",
            });
          }, 10000);
        });
      _amountOutMinConstant =
        _amountOutMinConstant[_amountOutMinConstant.length - 1];
      _amountOutMinConstant = new BigNumber(_amountOutMinConstant)
        .times(100 - window.config.slippage_tolerance_percent)
        .div(100)
        .toFixed(0);

      let referralFee = new BigNumber(_amountOutMinConstant)
        .times(500)
        .div(1e4)
        .toFixed(0);
      referralFee = referralFee.toString();

      try {
        // setTimeout(
        //   () => constant.claim(referralFee, _amountOutMinConstant, deadline),
        //   10e3
        // );
        constant
          .claim(referralFee, _amountOutMinConstant, deadline)
          .then(() => {
            this.setState({ claimStatus: "success" });
            this.setState({ claimLoading: false });
          })
          .catch((e) => {
            this.setState({ claimStatus: "failed" });
            this.setState({ claimLoading: false });
            this.setState({ errorMsg2: e?.message });

            setTimeout(() => {
              this.setState({
                claimStatus: "initial",
                selectedPool: "",
                errorMsg2: "",
              });
            }, 10000);
          });
      } catch (e) {
        this.setState({ claimStatus: "failed" });
        this.setState({ claimLoading: false });
        this.setState({ errorMsg2: e?.message });
        setTimeout(() => {
          this.setState({
            claimStatus: "initial",
            selectedPool: "",
            errorMsg2: "",
          });
        }, 10000);

        console.error(e);
        return;
      }
    };

    getDypbalanceStake = async () => {
      let address = this.state.coinbase;
      let amount = await staking.getTotalPendingDivs(address);

      let router = await window.getPangolinRouterContract();
      let WETH = await router.methods.WAVAX().call();
      let platformTokenAddress = window.config.reward_token_address;
      let rewardTokenAddress = window.config.reward_token_idyp_address;
      let path = [
        ...new Set(
          [rewardTokenAddress, WETH, platformTokenAddress].map((a) =>
            a.toLowerCase()
          )
        ),
      ];
      let _amountOutMin = await router.methods
        .getAmountsOut(amount, path)
        .call()
        .catch((e) => {
          this.setState({ dypstake: getFormattedNumber(0, 6) });
        });

      _amountOutMin = _amountOutMin[_amountOutMin.length - 1];
      _amountOutMin = new BigNumber(_amountOutMin)
        .times(100 - window.config.slippage_tolerance_percent)
        .div(100)
        .toFixed(0);
      this.setState({ dypstake: getFormattedNumber(_amountOutMin, 6) });
    };

    handleClaimDivsStake = async (e) => {
      let address = this.props.coinbase;
      let amount = await staking.getTotalPendingDivs(address);
      this.setState({ claimidypLoading: true });

      let router = await window.getUniswapRouterContract();
      let WETH = await router.methods.WETH().call();
      let platformTokenAddress = window.config.reward_token_address;
      let rewardTokenAddress = window.config.reward_token_idyp_address;
      let path = [
        ...new Set(
          [rewardTokenAddress, WETH, platformTokenAddress].map((a) =>
            a.toLowerCase()
          )
        ),
      ];
      let _amountOutMin = await router.methods
        .getAmountsOut(amount, path)
        .call()
        .catch((e) => {
          this.setState({ claimidypStatus: "failed" });
          this.setState({ claimidypLoading: false });
          this.setState({ errorMsg2: e?.message });
          setTimeout(() => {
            this.setState({
              claimidypStatus: "initial",
              selectedPool: "",
              errorMsg2: "",
            });
          }, 10000);
        });
      _amountOutMin = _amountOutMin[_amountOutMin.length - 1];
      _amountOutMin = new BigNumber(_amountOutMin)
        .times(100 - window.config.slippage_tolerance_percent)
        .div(100)
        .toFixed(0);

      let deadline = Math.floor(
        Date.now() / 1e3 + window.config.tx_max_wait_seconds
      );

      try {
        staking
          .claim(_amountOutMin, deadline)
          .then(() => {
            this.setState({ claimidypStatus: "success" });
            this.setState({ claimidypLoading: false });
          })
          .catch((e) => {
            this.setState({ claimidypStatus: "failed" });
            this.setState({ claimidypLoading: false });
            this.setState({ errorMsg2: e?.message });
            setTimeout(() => {
              this.setState({
                claimidypStatus: "initial",
                selectedPool: "",
                errorMsg2: "",
              });
            }, 10000);
          });
      } catch (e) {
        this.setState({ claimidypStatus: "failed" });
        this.setState({ claimidypLoading: false });
        this.setState({ errorMsg2: e?.message });
        setTimeout(() => {
          this.setState({
            claimidypStatus: "initial",
            selectedPool: "",
            errorMsg2: "",
          });
        }, 10000);
        console.error(e);
        return;
      }
    };

    handleReinvestConst = async (e) => {
      // e.preventDefault();
      this.setState({ reInvestStatus: "invest", reInvestLoading: true });

      //Calculate for Constant Staking
      let address = this.props.coinbase;
      let amount = await constant.getTotalPendingDivs(address);

      let router = await window.getUniswapRouterContract();
      let WETH = await router.methods.WETH().call();
      let platformTokenAddress = window.config.reward_token_address;
      let rewardTokenAddress = window.config.reward_token_idyp_address;
      let path = [
        ...new Set(
          [rewardTokenAddress, WETH, platformTokenAddress].map((a) =>
            a.toLowerCase()
          )
        ),
      ];
      let _amountOutMin = await router.methods
        .getAmountsOut(amount, path)
        .call()
        .catch((e) => {
          this.setState({ reInvestStatus: "failed" });
          this.setState({ reInvestLoading: false });
          this.setState({ errorMsg2: e?.message });
          setTimeout(() => {
            this.setState({
              reInvestStatus: "initial",
              selectedPool: "",
              errorMsg2: "",
            });
          }, 10000);
        });
      _amountOutMin = _amountOutMin[_amountOutMin.length - 1];
      _amountOutMin = new BigNumber(_amountOutMin)
        .times(100 - window.config.slippage_tolerance_percent)
        .div(100)
        .toFixed(0);
      let deadline = Math.floor(
        Date.now() / 1e3 + window.config.tx_max_wait_seconds
      );

      console.log({ _amountOutMin, deadline });

      try {
        constant
          .reInvest(0, _amountOutMin, deadline)
          .then(() => {
            this.setState({ reInvestStatus: "success" });
            this.setState({ reInvestLoading: false });
          })
          .catch((e) => {
            this.setState({ reInvestStatus: "failed" });
            this.setState({ reInvestLoading: false });
            this.setState({ errorMsg2: e?.message });
            setTimeout(() => {
              this.setState({
                reInvestStatus: "initial",
                selectedPool: "",
                errorMsg2: "",
              });
            }, 10000);
          });
      } catch (e) {
        this.setState({ errorMsg2: e?.message });
        setTimeout(() => {
          this.setState({
            reInvestStatus: "initial",
            selectedPool: "",
            errorMsg2: "",
          });
        }, 10000);
        console.error(e);
        return;
      }
    };

    handleReinvestStake = async (e) => {
      // e.preventDefault();
      this.setState({ reInvestStatus: "invest", reInvestLoading: true });

      //Calculate for Constant Staking
      let address = this.props.coinbase;
      let amount = await constant.getTotalPendingDivs(address);

      let router = await window.getUniswapRouterContract();
      let WETH = await router.methods.WETH().call();
      let platformTokenAddress = window.config.reward_token_address;
      let rewardTokenAddress = window.config.reward_token_idyp_address;
      let path = [
        ...new Set(
          [rewardTokenAddress, WETH, platformTokenAddress].map((a) =>
            a.toLowerCase()
          )
        ),
      ];
      let _amountOutMin = await router.methods
        .getAmountsOut(amount, path)
        .call(e)
        .catch((e) => {
          this.setState({ reInvestStatus: "failed" });
          this.setState({ reInvestLoading: false });
          this.setState({ errorMsg2: e?.message });
          setTimeout(() => {
            this.setState({
              reInvestStatus: "initial",
              selectedPool: "",
              errorMsg2: "",
            });
          }, 10000);
        });
      _amountOutMin = _amountOutMin[_amountOutMin.length - 1];
      _amountOutMin = new BigNumber(_amountOutMin)
        .times(100 - window.config.slippage_tolerance_percent)
        .div(100)
        .toFixed(0);

      /* We don't have any referrer here because it is Staked from Buyback */

      // let referralFee = new BigNumber(_amountOutMin).times(500).div(1e4).toFixed(0)
      // referralFee = referralFee.toString()

      // _amountOutMin = _amountOutMin - referralFee
      // _amountOutMin = _amountOutMin.toString()

      let deadline = Math.floor(
        Date.now() / 1e3 + window.config.tx_max_wait_seconds
      );

      console.log({ _amountOutMin, deadline });

      try {
        staking
          .reInvest()
          .then(() => {
            this.setState({ reInvestStatus: "success" });
            this.setState({ reInvestLoading: false });
          })
          .catch((e) => {
            this.setState({ reInvestStatus: "failed" });
            this.setState({ reInvestLoading: false });
            this.setState({ errorMsg2: e?.message });
            setTimeout(() => {
              this.setState({
                reInvestStatus: "initial",
                selectedPool: "",
                errorMsg2: "",
              });
            }, 10000);
          });
      } catch (e) {
        this.setState({ errorMsg2: e?.message });
        setTimeout(() => {
          this.setState({
            reInvestStatus: "initial",
            selectedPool: "",
            errorMsg2: "",
          });
        }, 10000);
        console.error(e);
        return;
      }
    };

    handleSetMaxDeposit = (e) => {
      e.preventDefault();
      this.setState({
        depositAmount: new BigNumber(this.state.selectedTokenBalance)
          .div(10 ** this.state.selectedTokenDecimals)
          .toFixed(this.state.selectedTokenDecimals),
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
      let coinbase = this.state.coinbase;

      if (window.coinbase_address) {
        coinbase = window.coinbase_address;
        this.setState({ coinbase });
      }

      this.getTotalTvl();

      let { the_graph_result } = this.props;
      let usd_per_dyps = the_graph_result.price_DYPS
        ? the_graph_result.price_DYPS
        : 1;

      try {
        let amount = new BigNumber(1000000000000000000).toFixed(0);
        let router = await window.getUniswapRouterContract();
        let WETH = await router.methods.WETH().call();
        let platformTokenAddress = window.config.USDC_address;
        let rewardTokenAddress = window.config.reward_token_idyp_address;
        let path = [
          ...new Set(
            [rewardTokenAddress, WETH, platformTokenAddress].map((a) =>
              a.toLowerCase()
            )
          ),
        ];
        let _amountOutMin = await router.methods
          .getAmountsOut(amount, path)
          .call();
        _amountOutMin = _amountOutMin[_amountOutMin.length - 1];
        _amountOutMin = new BigNumber(_amountOutMin).div(1e6).toFixed(18);

        //buyback
        let _bal = reward_token.balanceOf(this.state.coinbase);
        let _pDivs = staking.getTotalPendingDivs(this.state.coinbase);
        let _tEarned = staking.totalEarnedTokens(this.state.coinbase);
        let _stakingTime = staking.stakingTime(this.state.coinbase);
        let _dTokens = staking.depositedTokens(this.state.coinbase);
        let _dTokensBuyback = staking.depositedTokens(this.state.coinbase);
        let _lClaimTime = staking.lastClaimedTime(this.state.coinbase);
        let _tvl = reward_token_idyp.balanceOf(staking._address);
        let tStakers = staking.getNumberOfHolders();
        //constant Staking
        let _balConstant =
          constant.depositedTokens(
            this.state.coinbase
          ); /* Balance of DYP on Constant Staking */
        let _pDivsConstant =
          constant.getTotalPendingDivs(this.state.coinbase); /* Pending Divs is iDYP */
        let _tvlConstant = reward_token.balanceOf(
          constant._address
        ); /* TVL of DYP on Constant Staking */
        let _tvlConstantiDYP = reward_token_idyp.balanceOf(
          constant._address
        ); /* TVL of iDYP on Constant Staking */
        let _tEarnedConstant = constant.totalEarnedTokens(this.state.coinbase);

        //Take DYPS Balance
        let _tvlDYPS = token_dyps.balanceOf(staking._address); /* TVL of DYPS */

        let [
          token_balance,
          pendingDivs,
          totalEarnedTokens,
          stakingTime,
          depositedTokens,
          lastClaimedTime,
          tvl,
          total_stakers,
          price_iDYP,
          //constant staking
          pendingDivsConstant,
          token_dyp_balance,
          tvlConstant,
          tvlConstantiDYP,
          totalEarnedTokensConstant,
          depositedTokensBuyback,
          tvlDYPS,
        ] = await Promise.all([
          _bal,
          _pDivs,
          _tEarned,
          _stakingTime,
          _dTokens,
          _lClaimTime,
          _tvl,
          tStakers,
          _amountOutMin,
          _pDivsConstant,
          _balConstant,
          _tvlConstant,
          _tvlConstantiDYP,
          _tEarnedConstant,
          _dTokensBuyback,
          _tvlDYPS,
        ]);

        pendingDivs = new BigNumber(pendingDivs)
          .plus(pendingDivsConstant)
          .times(_amountOutMin)
          .toFixed(18);
        depositedTokens = new BigNumber(depositedTokens)
          .times(_amountOutMin)
          .toFixed(18);
        totalEarnedTokens = new BigNumber(totalEarnedTokens)
          .plus(totalEarnedTokensConstant)
          .times(_amountOutMin)
          .toFixed(18);
        tvl = new BigNumber(tvl).times(_amountOutMin).toFixed(18);

        //iDYP + DYP
        let dypValue = new BigNumber(token_dyp_balance)
          .times(this.state.usdPerToken)
          .toFixed(18);
        let tvlValue = new BigNumber(tvlConstant)
          .times(this.state.usdPerToken)
          .toFixed(18);
        let tvlValueiDYP = new BigNumber(tvlConstantiDYP)
          .times(_amountOutMin)
          .toFixed(18);

        //DYPS
        let usdValueDYPS = new BigNumber(tvlDYPS)
          .times(usd_per_dyps)
          .toFixed(18);

        depositedTokens = new BigNumber(depositedTokens)
          .plus(dypValue)
          .toFixed(18);
        tvl = new BigNumber(tvl)
          .plus(tvlValue)
          .plus(tvlValueiDYP)
          .plus(usdValueDYPS)
          .toFixed(18);

        this.setState({
          token_balance,
          pendingDivs,
          totalEarnedTokens,
          stakingTime,
          depositedTokens,
          lastClaimedTime,
          tvl,
          total_stakers,
          price_iDYP,
          //constant staking
          pendingDivsConstant,
          token_dyp_balance,
          tvlConstant,
          totalEarnedTokensConstant,
          //for Buyback Only depositedTokens unconverted
          depositedTokensBuyback,
        });
        let stakingOwner = await staking.owner();
        this.setState({ stakingOwner });
      } catch (e) {
        console.error(e);
      }

      //Set Value $ of iDYP & DYP for Withdraw Input
      this.setState({
        withdrawAmount: new BigNumber(this.state.depositedTokens)
          .div(1e18)
          .toFixed(2),
      });

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

      try {
        let selectedTokenBalance = await window.getTokenHolderBalance(
          this.state.selectedBuybackToken,
          this.state.coinbase
        );
        this.setState({ selectedTokenBalance });
      } catch (e) {
        console.warn(e);
      }
    };

    getUsdPerETH = () => {
      return this.props.the_graph_result.usd_per_eth || 0;
    };

    getApproxReturn = () => {
      let APY = this.getAPY();
      let approxDays = this.state.approxDays;
      let approxDeposit = this.state.approxDeposit;

      return ((approxDeposit * APY) / 100 / 365) * approxDays;
    };

    // getReferralLink = () => {
    //     return window.location.origin + window.location.pathname + '?r=' + this.state.coinbase
    // }

    convertTimestampToDate = (timestamp) => {
      const result = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(timestamp * 1000);
      return result;
    };

    render() {
      let {
        disburseDuration,
        contractDeployTime,
        cliffTime,
        token_balance,
        pendingDivs,
        totalEarnedTokens,
        depositedTokens,
        stakingTime,
        coinbase,
        tvl,
      } = this.state;

      let { the_graph_result } = this.props;

      let usd_per_token = the_graph_result.token_data
        ? the_graph_result.token_data[
            "0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17"
          ].token_price_usd
        : 1;
      let usd_per_idyp = the_graph_result.token_data
        ? the_graph_result.token_data[
            "0xbd100d061e120b2c67a24453cf6368e63f1be056"
          ].token_price_usd
        : 1;

      token_balance = new BigNumber(token_balance).div(1e18).toString(10);
      token_balance = getFormattedNumber(token_balance, 2);

      pendingDivs = new BigNumber(pendingDivs)
        .div(10 ** TOKEN_DECIMALS)
        .div(usd_per_token)
        .toString(10);
      pendingDivs = getFormattedNumber(pendingDivs, 6);

      totalEarnedTokens = new BigNumber(totalEarnedTokens)
        .div(10 ** TOKEN_DECIMALS)
        .toString(10);
      totalEarnedTokens = getFormattedNumber(totalEarnedTokens, 2);

      depositedTokens = new BigNumber(depositedTokens).div(1e18).toString(10);
      depositedTokens = getFormattedNumber(depositedTokens, 2);

      tvl = new BigNumber(tvl).div(1e18).toString(10);
      tvl = getFormattedNumber(tvl, 3);

      stakingTime = stakingTime * 1e3;
      cliffTime = cliffTime * 1e3;

      let showDeposit = true;
      let lockDate;

      if (!isNaN(disburseDuration) && !isNaN(contractDeployTime)) {
        let lastDay = parseInt(disburseDuration) + parseInt(contractDeployTime);
        let lockTimeExpire = parseInt(Date.now()) + parseInt(cliffTime);
        lockTimeExpire = lockTimeExpire.toString().substr(0, 10);
        //console.log("now " + lockTimeExpire)
        //console.log('last ' + lastDay)
        if (lockTimeExpire > lastDay) {
          showDeposit = false;
        }
        lockDate = lockTimeExpire;
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
      // let tvl_usd = this.state.tvl / 1e18 * this.state.usdPerToken
      let tvl_usd = this.state.tvl / 1e18;

      tvl_usd = getFormattedNumber(tvl_usd, 2);
      total_stakers = getFormattedNumber(total_stakers, 0);

      //console.log(total_stakers)

      let isOwner =
        String(this.state.coinbase).toLowerCase() ===
        String(window.config.admin_address).toLowerCase();

      // APR is 100% considering 1$ as initial investment, 0.75$ goes to Buyback
      let apy1 = new BigNumber(0.75);
      let apy2 = new BigNumber(0.25).div(usd_per_token).times(usd_per_idyp);

      //apr is 30%
      if (apr == 30) {
        apy1 = new BigNumber(0.225);
        apy2 = new BigNumber(0.25)
          .div(usd_per_token)
          .times(30)
          .div(1e2)
          .times(usd_per_idyp);

        //apr is 50%
        // apy1 = new BigNumber(0.375)
        // apy2 = new BigNumber(0.25).div(usd_per_token).div(2).times(usd_per_idyp)
      }

      let apy = new BigNumber(apy1)
        .minus(fee / 100)
        .plus(apy2)
        .times(1e2)
        .toFixed(0);

      //console.log({usd_per_idyp})

      let id = Math.random().toString(36);

      let is_connected = this.props.is_wallet_connected;

      return (
        <div className="container-lg p-0">
          <div className={`allwrapper ${listType === 'table' && 'my-4'}`} style={{border: listType !== 'table' && 'none', borderRadius: listType !== 'table' && '0px' }}>
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
                  {/* <div className="d-flex align-items-center justify-content-between gap-2">
                    <h6 className="earnrewards-text">Earn rewards in:</h6>
                    <h6 className="earnrewards-token d-flex align-items-center gap-1">
                      DYP
                    </h6>
                  </div> */}
                  <div className="d-flex align-items-center justify-content-between gap-2">
                    <h6 className="earnrewards-text">Performance fee:</h6>
                    <h6 className="earnrewards-token d-flex align-items-center gap-1">
                      {fee}%
                      <Tooltip
                        placement="top"
                        title={
                          <div className="tooltip-text">
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
                      {apy}%
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
                      {lockTime} {lockTime !== "No Lock" ? "Days" : ""}
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
                  {/* <a
                    href={
                      // chainId === 1
                      //   ? "https://app.uniswap.org/#/swap?outputCurrency=0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17"
                      //   :
                      "https://app.pangolin.exchange/#/swap?outputCurrency=0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17"
                    }
                    target={"_blank"}
                    rel="noreferrer"
                  >
                    <h6 className="bottomitems">
                      <img src={arrowup} alt="" />
                      Get DYP
                    </h6>
                  </a> */}
                   <h6 className="bottomitems" onClick={() => this.setState({ showCalculator: true })}>
                      <img src={poolsCalculatorIcon} alt="" />
                      Calculator
                    </h6>
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
                    className="d-flex flex-column justify-content-between gap-4"
                    style={{ height: "100%" }}
                  >
                    <h6 className="start-title">Start Buyback</h6>
                    {/* <h6 className="start-desc">
                    {this.props.coinbase === null
                      ? "Connect wallet to view and interact with deposits and withdraws"
                      : "Interact with deposits and withdraws"}
                  </h6> */}
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
                    <div className="d-flex align-items-center gap-3">
                      <h6 className="deposit-txt">Deposit</h6>
                      <div className="d-flex align-items-center gap-2">
                        {/* <img
                      src={
                        require(`./assets/${this.state.selectedTokenLogo.toLowerCase()}.svg`)
                          .default
                      }
                      alt=""
                      style={{ width: 14, height: 14 }}
                    />
                    <select
                      disabled={!is_connected}
                      value={this.state.selectedBuybackToken}
                      onChange={(e) =>
                        this.handleSelectedTokenChange(e.target.value)
                      }
                      className="inputfarming p-0"
                      style={{ border: "none" }}
                    >
                      {Object.keys(window.buyback_tokens).map((t) => (
                        <option key={t} value={t}>
                          {window.buyback_tokens[t].symbol}
                        </option>
                      ))}
                    </select> */}
                        <div className="dropdown">
                          <button
                            class="btn farming-dropdown inputfarming d-flex align-items-center justify-content-center gap-1"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <img
                              src={
                                require(`./assets/${this.state.selectedTokenLogo.toLowerCase()}.svg`)
                                  .default
                              }
                              alt=""
                              style={{ width: 14, height: 14 }}
                            />
                            {this.state.selectedTokenLogo.toUpperCase()}
                            <img
                              src={dropdownVector}
                              alt=""
                              style={{ width: 10, height: 10 }}
                            />
                          </button>
                          <ul
                            className="dropdown-menu"
                            style={{ minWidth: "100%" }}
                          >
                            {Object.keys(window.buyback_tokens).map((t) => (
                              <span
                                className="d-flex align-items-center justify-content-start ps-2 gap-1 inputfarming farming-dropdown-item py-1 w-100"
                                onClick={() =>
                                  this.handleSelectedTokenChange(t)
                                }
                              >
                                <img
                                  src={
                                    require(`./assets/${window.buyback_tokens[
                                      t
                                    ].symbol.toLowerCase()}.svg`).default
                                  }
                                  alt=""
                                  style={{ width: 14, height: 14 }}
                                />
                                {window.buyback_tokens[t].symbol}
                              </span>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <h6 className="mybalance-text">
                        Balance:
                        <b>
                          {getFormattedNumber(
                            this.state.selectedTokenBalance /
                              10 ** this.state.selectedTokenDecimals,
                            6
                          )}
                        </b>
                      </h6>
                    </div>
                    <Tooltip
                      placement="top"
                      title={
                        <div className="tooltip-text">
                          {"Deposit your assets to the buyback smart contract. All deposited assets will automatically be converted into DYP & iDYP and will be deposited into a staking smart contract to generate rewards. "}
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
                          style={{ width: "100%" }}
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
                          // onChange={(e) => setDepositValue(e.target.value)}
                        />
                      </div>
                      <button
                        className="btn maxbtn"
                        onClick={this.handleSetMaxDeposit}
                      >
                        Max
                      </button>
                      {/* <button
                      disabled={
                        this.state.depositAmount === "" ||
                        this.state.depositLoading === true
                          ? true
                          : false
                      }
                      className={`btn filledbtn ${
                        this.state.depositAmount === "" && "disabled-btn"
                      } ${
                        this.state.depositStatus === "deposit"
                          ? "success-button"
                          : this.state.depositStatus === "success"
                          ? "fail-button"
                          : null
                      } d-flex justify-content-center align-items-center gap-2`}
                      onClick={this.clickDeposit}
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
                      ) : (
                        <>
                          <img src={failMark} alt="" />
                          Failed
                        </>
                      )}
                    </button> */}
                      <button
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
                            ? this.handleStake()
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
                    {this.state.errorMsg && (
                      <h6 className="errormsg">{this.state.errorMsg}</h6>
                    )}
                  </div>
                </div>
                <div className="otherside-border col-4">
                  <div className="d-flex justify-content-between gap-2 ">
                    <h6 className="withdraw-txt">Rewards</h6>
                    <h6 className="withdraw-littletxt d-flex align-items-center gap-2">
                    Rewards are displayed in real-time
                      <Tooltip
                        placement="top"
                        title={
                          <div className="tooltip-text">
                            {"Rewards earned by your deposit to the buyback smart contract are distributed automatically and can be claimed every day. You need to select assets individually and claim them to your wallet. The reinvest function does not reset the lock-in period. "}
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
                      <div className="d-flex flex-column gap-2">
                        <div
                          className="gap-1 claimreward-wrapper"
                          style={{
                            background:
                              this.state.selectedPool === "dyp"
                                ? "#141333"
                                : "#26264F",
                            border:
                              this.state.selectedPool === "dyp"
                                ? "1px solid #57B6AB"
                                : "1px solid #8E97CD",
                          }}
                          onClick={() => {
                            this.setState({ selectedPool: "dyp" });
                            this.setState({
                              claimidypStatus: "initial",
                              claimStatus: "initial",
                            });
                          }}
                        >
                          <img
                            src={
                              this.state.selectedPool === "dyp" ? check : empty
                            }
                            alt=""
                            className="activestate"
                            style={{ left: "-8px", top: 5 }}
                          />

                          <div className="position-relative">
                            <input
                              disabled
                              value={
                                Number(this.state.dypConst) > 0
                                  ? `${this.state.dypConst} DYP`
                                  : `${this.state.dypConst} DYP`
                              }
                              onChange={(e) =>
                                this.setState({
                                  dypConst:
                                    Number(e.target.value) > 0
                                      ? e.target.value
                                      : e.target.value,
                                })
                              }
                              className=" left-radius inputfarming styledinput2"
                              placeholder="0"
                              type="text"
                              style={{
                                width: "150px",
                                padding: 10,
                                height: 23,
                              }}
                            />
                          </div>

                          {/* <div className="d-flex align-items-center">
                        <img
                          src={
                            require(`./assets/${this.state.selectedRewardTokenLogo2.toLowerCase()}.svg`)
                              .default
                          }
                          alt=""
                          style={{ width: 14, height: 14 }}
                        />
                        <select
                          disabled={!is_connected}
                          defaultValue="DYP"
                          className=" inputfarming"
                          style={{ border: "none" }}
                        >
                          <option value="DYP"> DYP </option>
                        </select>
                      </div> */}
                        </div>
                        <div
                          className="gap-1 claimreward-wrapper"
                          style={{
                            background:
                              this.state.selectedPool === "idyp"
                                ? "#141333"
                                : "#26264F",
                            border:
                              this.state.selectedPool === "idyp"
                                ? "1px solid #57B6AB"
                                : "1px solid #8E97CD",
                          }}
                          onClick={() => {
                            this.setState({ selectedPool: "idyp" });
                            this.setState({
                              claimidypStatus: "initial",
                              claimStatus: "initial",
                            });
                          }}
                        >
                          <img
                            src={
                              this.state.selectedPool === "idyp" ? check : empty
                            }
                            alt=""
                            className="activestate"
                            style={{ left: "-8px", top: 5 }}
                          />

                          <div className="position-relative">
                            <input
                              disabled
                              value={
                                Number(this.state.dypstake) > 0
                                  ? `${this.state.dypstake} iDYP`
                                  : `${this.state.dypstake} iDYP`
                              }
                              onChange={(e) =>
                                this.setState({
                                  dypstake:
                                    Number(e.target.value) > 0
                                      ? e.target.value
                                      : e.target.value,
                                })
                              }
                              className=" left-radius inputfarming styledinput2"
                              placeholder="0"
                              type="text"
                              style={{
                                width: "150px",
                                padding: 10,
                                height: 23,
                              }}
                            />
                          </div>

                          {/* <div className="d-flex align-items-center">
                        <img
                          src={
                            require(`./assets/${this.state.selectedRewardTokenLogo2.toLowerCase()}.svg`)
                              .default
                          }
                          alt=""
                          style={{ width: 14, height: 14 }}
                        />
                        <select
                          disabled={!is_connected}
                          defaultValue="DYP"
                          className=" inputfarming"
                          style={{ border: "none" }}
                        >
                          <option value="DYP"> DYP </option>
                        </select>
                      </div> */}
                        </div>
                      </div>
                     <div className="d-flex align-items-center gap-2">
                     <button
                        disabled={
                          this.state.selectedPool === "" ||
                          this.state.claimStatus === "claimed" ||
                          this.state.claimStatus === "failed" ||
                          this.state.claimStatus === "success"
                            ? true
                            : false
                        }
                        className={`btn filledbtn ${
                          this.state.claimStatus === "initial" &&
                          this.state.selectedPool === ""
                            ? "disabled-btn"
                            : this.state.claimStatus === "failed" ||
                              this.state.claimidypStatus === "failed"
                            ? "fail-button"
                            : this.state.claimStatus === "success" ||
                              this.state.claimidypStatus === "success"
                            ? "success-button"
                            : null
                        } d-flex justify-content-center align-items-center`}
                        style={{ height: "fit-content" }}
                        onClick={() =>
                          this.state.selectedPool === "dyp"
                            ? this.handleClaimDivsConst()
                            : this.state.selectedPool === "idyp"
                            ? this.handleClaimDivsStake()
                            : console.log("")
                        }
                      >
                        {this.state.claimLoading ||
                        this.state.claimidypLoading ? (
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
                          this.state.claimidypStatus === "initial" ? (
                          <>Claim</>
                        ) : (
                          <></>
                        )}
                      </button>

                      <button
                        disabled={false}
                        className={`btn outline-btn ${
                          this.state.reInvestStatus === "invest"
                            ? "disabled-btn"
                            : this.state.reInvestStatus === "failed"
                            ? "fail-button"
                            : this.state.reInvestStatus === "success"
                            ? "success-button"
                            : null
                        } d-flex justify-content-center align-items-center gap-2`}
                        style={{ height: "fit-content" }}
                        onClick={() => {
                          this.state.selectedPool === "dyp"
                            ? this.handleReinvestConst()
                            : this.handleReinvestStake();
                        }}
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
                    {this.state.errorMsg2 && (
                      <h6 className="errormsg">{this.state.errorMsg2}</h6>
                    )}
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
                    WITHDRAW
                    <Tooltip
                      placement="top"
                      title={
                        <div className="tooltip-text">
                          {"Withdraw your deposited assets from the buyback smart contract."}
                        </div>
                      }
                    >
                      <img src={moreinfo} alt="" />
                    </Tooltip>
                  </h6>

                  <button
                    className="btn outline-btn"
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
              title="stats"
              setIsVisible={() => {
                this.setState({ popup: false });
              }}
            >
              <div className="earn-hero-content p4token-wrapper">
                <div className="l-box pl-3 pr-3">
                  {/* <div className="table-responsive container">
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
                  <div className="stats-container my-4">
                    <div className="stats-card p-4 d-flex flex-column mx-auto w-100">
                      <span className="stats-card-title">My DYP Balance</span>
                      <h6 className="stats-card-content">
                        {token_balance} DYP
                      </h6>
                    </div>
                    <div className="stats-card p-4 d-flex flex-column mx-auto w-100">
                      <span className="stats-card-title">My Deposit Value</span>
                      <h6 className="stats-card-content">
                        {depositedTokens} USD
                      </h6>
                    </div>
                    <div className="stats-card p-4 d-flex flex-column mx-auto w-100">
                      <span className="stats-card-title">Total Earned</span>
                      <h6 className="stats-card-content">
                        {totalEarnedTokens} USD
                      </h6>
                    </div>
                    <div className="stats-card p-4 d-flex flex-column mx-auto w-100">
                      <span className="stats-card-title">TVL USD</span>
                      <h6 className="stats-card-content">{tvl_usd} USD</h6>
                    </div>
                    <div className="stats-card p-4 d-flex flex-column mx-auto w-100">
                      <span className="stats-card-title">
                        Contract Expiration
                      </span>
                      <h6 className="stats-card-content">
                        {expiration_time} DYP
                      </h6>
                    </div>
                    <div className="d-flex flex-column gap-1">
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
                        href={`${window.config.etherscan_baseURL}/address/${coinbase}`}
                        className="stats-link"
                      >
                        {shortAddress(coinbase)}{" "}
                        <img src={statsLinkIcon} alt="" />
                      </a>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`https://github.com/dypfinance/staking-governance-security-audits`}
                        className="stats-link"
                      >
                        Audit <img src={statsLinkIcon} alt="" />
                      </a>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`${window.config.etherscan_baseURL}/token/${reward_token._address}?a=${coinbase}`}
                        className="stats-link"
                      >
                        View on Etherscan <img src={statsLinkIcon} alt="" />
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
              title="withdraw"
              setIsVisible={() => {
                this.setState({ showWithdrawModal: false });
              }}
            >
              <div className="earn-hero-content p4token-wrapper">
                <div className="l-box pl-3 pr-3">
                  <div className="container px-0">
                    <div className="row" style={{ marginLeft: "0px" }}>
                      <h6 className="withdrawdesc mt-2 p-0">
                        {lockTime === "No Lock"
                          ? "Your deposit has no lock-in period. You can withdraw your assets anytime, or continue to earn rewards every day."
                          : `The pool has a lock time. You can withdraw your deposited assets after the lock time expires.`}
                      </h6>
                    </div>

                    <div className="d-flex flex-column mt-2">
                      {/* <div className="d-flex  gap-2 justify-content-between align-items-center mt-2">
                        <div className="d-flex flex-column gap-1">
                          <h6 className="withsubtitle">LP amount</h6>
                          <h6 className="withtitle">
                            <input
                              disabled={!is_connected}
                              value={`$${this.state.withdrawAmount}`}
                              onChange={(e) =>
                                this.setState({
                                  withdrawAmount: e.target.value,
                                })
                              }
                              className="styledinput2 left-radius inputfarming"
                              style={{ fontSize: 20, width: 170 }}
                              placeholder="0"
                              type="text"
                            />
                          </h6>
                        </div>
                        <div className="d-flex flex-column gap-1">
                          <h6 className="withsubtitle">Value dollar amount</h6>
                          <h6
                            className="withtitle"
                            style={{ color: "#C0CBF7" }}
                          >
                            $200
                          </h6>
                        </div>
                      </div> */}
                      <div className="d-flex  gap-2 justify-content-between align-items-center">
                        <div className="d-flex flex-column gap-1">
                          <h6 className="withsubtitle mt-3">Timer</h6>
                          <h6 className="withtitle" style={{ fontWeight: 300 }}>
                            {lockTime === "No Lock" ? (
                              "No Lock"
                            ) : (
                              <Countdown
                                date={this.convertTimestampToDate(
                                  Number(lockDate)
                                )}
                                renderer={renderer}
                              />
                            )}
                          </h6>
                        </div>
                      </div>

                      <div className="separator"></div>
                      <div
                        className="row d-grid gap-2 justify-content-between align-items-center"
                        style={{ gridTemplateColumns: "repeat(2, 1fr)" }}
                      >
                        <div className="w-100">
                          <div
                            className="gap-1 claimreward-wrapper w-100"
                            style={{
                              background:
                                this.state.selectedPool === "dyp2"
                                  ? "#141333"
                                  : "#26264F",
                              border:
                                this.state.selectedPool === "dyp2"
                                  ? "1px solid #57B6AB"
                                  : "1px solid #8E97CD",
                            }}
                            onClick={() => {
                              this.setState({ selectedPool: "dyp2" });
                              this.setState({
                                claimidypStatus: "initial",
                                claimStatus: "initial",
                              });
                            }}
                          >
                            <img
                              src={
                                this.state.selectedPool === "dyp2"
                                  ? check
                                  : empty
                              }
                              alt=""
                              className="activestate"
                              style={{ top: 33 }}
                            />

                            <div className="d-flex align-items-center gap-2 justify-content-between w-100 position-relative">
                              <div className="position-relative">
                                <input
                                  disabled
                                  value={`${this.state.dypConstWithdraw}`}
                                  onChange={(e) =>
                                    this.setState({
                                      dypConstWithdraw: e.target.value,
                                    })
                                  }
                                  className=" left-radius inputfarming styledinput2"
                                  placeholder="0"
                                  type="text"
                                  style={{
                                    width: "100px",
                                    padding: "0px 15px 0px 15px",
                                    height: 35,
                                    fontSize: 20,
                                    fontWeight: 300,
                                  }}
                                />
                              </div>
                              {/* <div
                                className="d-flex flex-column gap-1 position-relative"
                                style={{ paddingRight: "15px", top: "-8px" }}
                              >
                                <h6 className="withsubtitle">Value</h6>
                                <h6
                                  className="withtitle"
                                  style={{ color: "#C0CBF7" }}
                                >
                                  $200
                                </h6>
                              </div> */}
                            </div>
                            <div className="d-flex align-items-center w-100 justify-content-start gap-1 p-1 buyback-coin">
                              <img
                                src={
                                  require(`./assets/${this.state.selectedRewardTokenLogo2.toLowerCase()}.svg`)
                                    .default
                                }
                                alt=""
                                style={{ width: 16, height: 16 }}
                              />
                              <span
                                style={{
                                  fontSize: "12px",
                                  fontWeight: "500",
                                  lineHeight: "18px",
                                  color: "#F7F7FC",
                                }}
                              >
                                DYP
                              </span>
                            </div>
                          </div>
                          <h6 className="withsubtitle d-flex justify-content-start w-100 mt-3">
                            *Total DYP Deposited
                          </h6>
                        </div>
                        <div className="w-100">
                          <div
                            className="gap-1 claimreward-wrapper w-100"
                            style={{
                              background:
                                this.state.selectedPool === "idyp2"
                                  ? "#141333"
                                  : "#26264F",
                              border:
                                this.state.selectedPool === "idyp2"
                                  ? "1px solid #57B6AB"
                                  : "1px solid #8E97CD",
                            }}
                            onClick={() => {
                              this.setState({ selectedPool: "idyp2" });
                              this.setState({
                                claimidypStatus: "initial",
                                claimStatus: "initial",
                              });
                            }}
                          >
                            <img
                              src={
                                this.state.selectedPool === "idyp2"
                                  ? check
                                  : empty
                              }
                              alt=""
                              className="activestate"
                              style={{ top: 33 }}
                            />

                            <div className="d-flex align-items-center gap-2 justify-content-between w-100 position-relative">
                              <div className="position-relative">
                                <input
                                  disabled
                                  value={`${this.state.dypstakeWithdraw}`}
                                  onChange={(e) =>
                                    this.setState({
                                      dypstakeWithdraw: e.target.value,
                                    })
                                  }
                                  className=" left-radius inputfarming styledinput2"
                                  placeholder="0"
                                  type="text"
                                  style={{
                                    width: "100px",
                                    padding: "0px 15px 0px 15px",
                                    height: 35,
                                    fontSize: 20,
                                    fontWeight: 300,
                                  }}
                                />
                              </div>
                            </div>
                            <div className="d-flex align-items-center w-100 justify-content-start gap-1 p-1 buyback-coin">
                              <img
                                src={require(`./assets/avax/idyp.svg`).default}
                                alt=""
                                style={{ width: 16, height: 16 }}
                              />
                              <span
                                style={{
                                  fontSize: "12px",
                                  fontWeight: "500",
                                  lineHeight: "18px",
                                  color: "#F7F7FC",
                                }}
                              >
                                iDYP
                              </span>
                            </div>
                          </div>
                          <h6 className="withsubtitle d-flex justify-content-start w-100 mt-3">
                            *Total iDYP staked
                          </h6>
                        </div>
                      </div>
                      <div className="separator"></div>

                      <div className="d-flex flex-column align-items-start justify-content-between gap-2">
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
                        <button
                          disabled={
                            this.state.selectedPool === "" ||
                            this.state.withdrawStatus === "failed" ||
                            this.state.withdrawStatus === "success"
                              ? true
                              : false
                          }
                          className={` w-100 btn filledbtn ${
                            this.state.selectedPool === "" &&
                            this.state.withdrawStatus === "initial"
                              ? "disabled-btn"
                              : this.state.withdrawStatus === "failed"
                              ? "fail-button"
                              : this.state.withdrawStatus === "success"
                              ? "success-button"
                              : null
                          } d-flex justify-content-center align-items-center`}
                          style={{ height: "fit-content" }}
                          onClick={() =>
                            this.state.selectedPool === "idyp2"
                              ? this.handleWithdrawStake()
                              : this.state.selectedPool === "dyp2"
                              ? this.handleWithdrawConst()
                              : console.log("test")
                          }
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
                        <span
                          className="mt-2"
                          style={{
                            fontWeight: "400",
                            fontSize: "12px",
                            lineHeight: "18px",
                            color: "#C0C9FF",
                          }}
                        >
                          *No withdrawal fee
                        </span>
                      </div>
                      {this.state.errorMsg3 && (
                        <h6 className="errormsg">{this.state.errorMsg3}</h6>
                      )}
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
           {this.state.showCalculator && (
            <div className="pools-calculator p-3">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-3">
                  <img src={calculatorIcon} alt="" />
                  <h5
                    style={{
                      fontSize: "23px",
                      fontWeight: "500",
                      color: "#f7f7fc",
                    }}
                  >
                    Calculator
                  </h5>
                </div>
                <img
                  src={xMark}
                  alt=""
                  onClick={() => {
                    this.setState({ showCalculator: false });
                  }}
                  className="cursor-pointer"
                />
              </div>
              <hr />
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex flex-column gap-3 w-50 me-5">
                  <span style={{ fontSize: "15px", fontWeight: "500" }}>
                    Days to stake
                  </span>
                  <input
                    style={{ height: "40px" }}
                    type="number"
                    className="form-control calcinput w-100"
                    id="days"
                    name="days"
                    placeholder="Days*"
                    value={this.state.approxDays}
                    onChange={(e) =>
                      this.setState({
                        approxDays: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="d-flex flex-column gap-3 w-50 me-5">
                  <span style={{ fontSize: "15px", fontWeight: "500" }}>
                    Amount to stake
                  </span>
                  <input
                    style={{ height: "40px" }}
                    type="number"
                    className="form-control calcinput w-100"
                    id="days"
                    name="days"
                    placeholder="USD to deposit*"
                    value={this.state.approxDeposit}
                    onChange={(e) =>
                      this.setState({
                        approxDeposit: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="d-flex flex-column gap-2 mt-4">
                <h3 style={{ fontWeight: "500", fontSize: "39px" }}>tbd</h3>
                <h6
                  style={{
                    fontWeight: "300",
                    fontSize: "15px",
                    color: "#f7f7fc",
                  }}
                >
                  Approx {getFormattedNumber(this.getApproxReturn(), 6)} WETH
                </h6>
              </div>
              <div className="mt-4">
                <p
                  style={{
                    fontWeight: "400",
                    fontSize: "13px",
                    color: "#f7f7fc",
                  }}
                >
                  *This calculator is for informational purposes only.
                  Calculated yields assume that prices of the deposited assets
                  don't change.
                </p>
              </div>
            </div>
          )}
        </div>

        //   <div>
        //     <div className="row">
        //       <div className="col-12 header-image-buyback-new">
        //         <div className="container">
        //           <Modal
        //             show={this.state.popup}
        //             handleClose={this.hidePopup}
        //           >
        //             <div className="earn-hero-content p4token-wrapper">
        //               <p className="h3">
        //                 <b>DYP Buyback</b>
        //               </p>
        //               <p>
        //                 Deposit WETH, WBTC, USDC, USDT, DAI, or LINK.e, and
        //                 earn{" "}
        //                 {this.state.apyBuyback2 == 0
        //                   ? "..."
        //                   : getFormattedNumber(this.state.apyBuyback2, 0)}
        //                 % APR in DYP. To start earning, all you need is to
        //                 deposit one of the supported assets into the Buyback
        //                 contract. Then, all assets will automatically be
        //                 converted into DYP + iDYP and deposited into a
        //                 staking contract. You can choose from two different
        //                 options, with rewards starting from{" "}
        //                 {this.state.apyBuyback1 == 0
        //                   ? "..."
        //                   : getFormattedNumber(this.state.apyBuyback1, 0)}
        //                 % APR up to{" "}
        //                 {this.state.apyBuyback2 == 0
        //                   ? "..."
        //                   : getFormattedNumber(this.state.apyBuyback2, 0)}
        //                 % APR, depending on the lock time from a minimum of
        //                 zero-days up to a maximum of 90 days.
        //               </p>
        //               <p>
        //                 The rewards are distributed automatically and can be
        //                 claimed every day. When you unstake you will receive
        //                 all the deposited amounts in DYP.
        //               </p>
        //             </div>
        //           </Modal>
        //           <Modal
        //             show={this.state.show}
        //             handleConnection={this.props.handleConnection}
        //             handleConnectionWalletConnect={
        //               this.props.handleConnectionWalletConnect
        //             }
        //             handleClose={this.hideModal}
        //           />
        //           <div className="row">
        //             <div className="col-12">
        //               <p className="header-title-text">DYP Buyback</p>
        //             </div>
        //             <div className="col-7 col-md-7 col-lg-6 col-xl-5">
        //               <div className="row">
        //                 <div className="col-9 col-md-5 mb-4">
        //                   <button
        //                     onClick={this.showPopup}
        //                     className="btn  btn-block btn-primary button"
        //                     type="button"
        //                     style={{ maxWidth: "100%", width: "100%" }}
        //                   >
        //                     <img
        //                       src="img/icon/bulb.svg"
        //                       style={{ float: "left" }}
        //                       alt="wallet"
        //                     />
        //                     More info
        //                   </button>
        //                 </div>
        //                 <div className="col-11 col-md-5 mb-4">
        //                   <button
        //                     className
        //                     onClick={() =>
        //                       window.open(
        //                         "https://www.youtube.com/watch?v=7CZ_ianX2bk",
        //                         "_blank"
        //                       )
        //                     }
        //                     className="btn  btn-block btn-primary l-outline-btn button"
        //                     type="submit"
        //                     style={{ maxWidth: "100%", width: "100%" }}
        //                   >
        //                     <img
        //                       src="img/icon/video.svg"
        //                       style={{ float: "left" }}
        //                       alt="wallet"
        //                     />
        //                     Video tutorial
        //                   </button>
        //                 </div>
        //               </div>
        //             </div>
        //           </div>
        //         </div>
        //       </div>

        //       <div className="container">
        //         <div className="token-staking mt-4">
        //           <div className="row p-3 p-sm-0 p-md-0">
        //             <div className="col-12">
        //               <div className="row">
        //                 <div className="col-lg-6 col-xs-12">
        //                   <div className="row token-staking-form">
        //                     <div className="col-12">
        //                       <div
        //                         className="l-box"
        //                         style={{ padding: "0.5rem" }}
        //                       >
        //                         {is_connected ? (
        //                           <div className="row justify-content-center">
        //                             <div
        //                               className="col-9 col-sm-8 col-md-7 text-center text-md-left"
        //                               style={{ marginTop: "0px" }}
        //                             >
        //                               <img
        //                                 src="img/connected.png"
        //                                 style={{
        //                                   marginRight: "10px",
        //                                   marginTop: "3px",
        //                                 }}
        //                                 alt="wallet"
        //                               />
        //                               <span
        //                                 htmlFor="deposit-amount"
        //                                 style={{
        //                                   margin: "0",
        //                                   top: "3px",
        //                                   position: "relative",
        //                                 }}
        //                               >
        //                                 Wallet has been connected
        //                               </span>
        //                             </div>
        //                             <div className="col-8 col-sm-6 col-md-5 text-center">
        //                               <div
        //                                 style={{
        //                                   marginTop: "5px",
        //                                   paddingRight: "15px",
        //                                 }}
        //                               >
        //                                 <Address
        //                                   style={{
        //                                     fontFamily: "monospace",
        //                                   }}
        //                                   a={coinbase}
        //                                 />
        //                               </div>
        //                             </div>
        //                           </div>
        //                         ) : (
        //                           <div className="row justify-content-center">
        //                             <div
        //                               className="col-11 col-sm-8 col-md-8 text-center text-md-left mb-3 mb-md-0"
        //                               style={{ marginTop: "0px" }}
        //                             >
        //                               <img
        //                                 src="img/icon/wallet.svg"
        //                                 style={{
        //                                   marginRight: "10px",
        //                                   marginTop: "3px",
        //                                 }}
        //                                 alt="wallet"
        //                               />
        //                               <label
        //                                 htmlFor="deposit-amount"
        //                                 style={{
        //                                   margin: "0",
        //                                   top: "3px",
        //                                   position: "relative",
        //                                 }}
        //                               >
        //                                 Please connect wallet to use this
        //                                 dApp
        //                               </label>
        //                             </div>
        //                             <div className="col-10 col-md-4 mb-3 mb-md-0">
        //                               <button
        //                                 type="submit"
        //                                 onClick={this.showModal}
        //                                 className="btn  btn-block btn-primary l-outline-btn"
        //                               >
        //                                 Connect Wallet
        //                               </button>
        //                             </div>
        //                           </div>
        //                         )}
        //                       </div>
        //                     </div>
        //                   </div>
        //                 </div>
        //                 <div className="col-lg-6 col-xs-12">
        //                   <div className="row token-staking-form">
        //                     <div className="col-12 padding-mobile">
        //                       <div
        //                         className=""
        //                         style={{
        //                           background:
        //                             "linear-gradient(257.76deg, #32B1F7 6.29%, #1D91D0 93.71%)",
        //                           boxShadow:
        //                             "0px 4px 24px rgba(0, 0, 0, 0.06)",
        //                           borderRadius: "6px",
        //                           paddingLeft: "5px",
        //                           padding: "10px",
        //                         }}
        //                       >
        //                         <div className="row">
        //                           <div
        //                             style={{
        //                               marginTop: "0px",
        //                               paddingLeft: "",
        //                             }}
        //                             className="col-4 col-sm-4 col-md-3 mb-3 mb-md-0 pr-0"
        //                           >
        //                             <img
        //                               src="img/icon/eth.svg"
        //                               style={{
        //                                 marginRight: "4px",
        //                                 marginTop: "5px",
        //                               }}
        //                               alt="wallet"
        //                             />
        //                             <label
        //                               htmlFor="deposit-amount"
        //                               style={{
        //                                 margin: "0px",
        //                                 top: "3px",
        //                                 position: "relative",
        //                                 color: "white",
        //                               }}
        //                             >
        //                               Ethereum
        //                             </label>
        //                           </div>
        //                           <div className="col-8 col-sm-6 col-md-5 mb-3 mb-md-0 pr-2">
        //                             <div className="test">
        //                               <div className="tvl_test">
        //                                 TVL USD{" "}
        //                                 <span className="testNumber">
        //                                   $ {tvl_usd}{" "}
        //                                 </span>
        //                               </div>
        //                             </div>
        //                           </div>
        //                           <div className="col-7 col-sm-4 col-md-4 mb-1 mb-md-0">
        //                             <div className="test">
        //                               <div className="tvl_test">
        //                                 APR{" "}
        //                                 <span className="testNumber">
        //                                   {" "}
        //                                   <img src="img/icon/vector.svg" />{" "}
        //                                   {apy}%{" "}
        //                                 </span>
        //                               </div>
        //                             </div>
        //                           </div>
        //                         </div>
        //                       </div>
        //                     </div>
        //                   </div>
        //                 </div>
        //               </div>
        //             </div>

        //             <div className="col-lg-6">
        //               <div className="row token-staking-form">
        //                 <div className="col-12">
        //                   <div className="l-box">
        //                     {showDeposit == true ? (
        //                       <form onSubmit={(e) => e.preventDefault()}>
        //                         <div className="form-group">
        //                           <div className="row">
        //                             <label
        //                               htmlFor="deposit-amount"
        //                               className="col-md-8 d-block text-left"
        //                             >
        //                               DEPOSIT
        //                             </label>

        //                           </div>
        //                           <div>
        //                             <p>
        //                               Balance:{" "}
        //                               {getFormattedNumber(
        //                                 this.state.selectedTokenBalance /
        //                                   10 **
        //                                     this.state
        //                                       .selectedTokenDecimals,
        //                                 6
        //                               )}{" "}
        //                               {this.state.selectedTokenSymbol}
        //                             </p>
        //                             <select
        //                               value={
        //                                 this.state.selectedBuybackToken
        //                               }
        //                               onChange={(e) =>
        //                                 this.handleSelectedTokenChange(
        //                                   e.target.value
        //                                 )
        //                               }
        //                               className="form-control"
        //                               className="form-control"
        //                             >
        //                               {Object.keys(
        //                                 window.buyback_tokens
        //                               ).map((t) => (
        //                                 <option key={t} value={t}>
        //                                   {" "}
        //                                   {
        //                                     window.buyback_tokens[t].symbol
        //                                   }{" "}
        //                                 </option>
        //                               ))}
        //                             </select>
        //                             <br />
        //                           </div>
        //                           <div className="input-group ">
        //                             <input
        //                               disabled={!is_connected}
        //                               value={
        //                                 Number(this.state.depositAmount) > 0
        //                                   ? this.state.depositAmount
        //                                   : this.state.depositAmount
        //                               }
        //                               onChange={(e) =>
        //                                 this.setState({
        //                                   depositAmount: e.target.value,
        //                                 })
        //                               }
        //                               className="form-control left-radius"
        //                               placeholder="0"
        //                               type="text"
        //                             />
        //                             <div className="input-group-append">
        //                               <button
        //                                 className="btn  btn-primary right-radius btn-max l-light-btn"
        //                                 style={{ cursor: "pointer" }}
        //                                 onClick={this.handleSetMaxDeposit}
        //                               >
        //                                 MAX
        //                               </button>
        //                             </div>
        //                           </div>
        //                         </div>
        //                         <div className="row">
        //                           <div
        //                             style={{ paddingRight: "0.3rem" }}
        //                             className="col-6"
        //                           >
        //                             <button
        //                               disabled={!is_connected}
        //                               onClick={this.handleApprove}
        //                               className="btn  btn-block btn-primary "
        //                               type="button"
        //                             >
        //                               APPROVE
        //                             </button>
        //                           </div>
        //                           <div
        //                             style={{ paddingLeft: "0.3rem" }}
        //                             className="col-6"
        //                           >
        //                             <button
        //                               disabled={!is_connected}
        //                               onClick={this.handleStake}
        //                               className="btn  btn-block btn-primary l-outline-btn"
        //                               type="submit"
        //                             >
        //                               DEPOSIT
        //                             </button>
        //                           </div>
        //                         </div>
        //                         <p
        //                           style={{ fontSize: ".8rem" }}
        //                           className="mt-1 text-center mb-0 text-muted mt-3"
        //                         >

        //                           Please approve before deposit. PERFORMANCE
        //                           FEE {fee}%<br />
        //                           Performance fees are already subtracted
        //                           from the displayed APR.
        //                         </p>
        //                       </form>
        //                     ) : (
        //                       <div className="row">
        //                         <div
        //                           className="col-md-12 d-block text-muted small"
        //                           style={{ fontSize: "15px" }}
        //                         >
        //                           <b>NOTE:</b>
        //                         </div>
        //                         <div
        //                           className="col-md-12 d-block text-muted small"
        //                           style={{ fontSize: "15px" }}
        //                         >
        //                           Deposit not available because the contract
        //                           expires faster than the pool lock time.
        //                         </div>
        //                         <div
        //                           className="col-md-12 d-block mb-0 text-muted small"
        //                           style={{ fontSize: "15px" }}
        //                         >
        //                           New contracts with improved strategies are
        //                           coming soon, waiting for security audit
        //                           results.
        //                         </div>
        //                       </div>
        //                     )}
        //                   </div>
        //                 </div>
        //                 <div className="col-12">
        //                   <div className="l-box">
        //                     <form onSubmit={this.handleWithdraw}>
        //                       <div className="form-group">
        //                         <label
        //                           htmlFor="deposit-amount"
        //                           className="d-block text-left"
        //                         >
        //                           WITHDRAW
        //                         </label>
        //                         <div className="input-group ">
        //                           <input
        //                             disabled={!is_connected}
        //                             value={`$${this.state.withdrawAmount}`}
        //                             onChange={(e) =>
        //                               this.setState({
        //                                 withdrawAmount: e.target.value,
        //                               })
        //                             }
        //                             className="form-control left-radius"
        //                             placeholder="0"
        //                             type="text"
        //                             disabled
        //                           />

        //                         </div>
        //                       </div>
        //                       <button
        //                         title={
        //                           canWithdraw
        //                             ? ""
        //                             : `You recently staked, you can unstake ${cliffTimeInWords}`
        //                         }
        //                         disabled={!canWithdraw || !is_connected}
        //                         className="btn  btn-primary btn-block l-outline-btn"
        //                         type="submit"
        //                       >
        //                         WITHDRAW
        //                       </button>
        //                       <p
        //                         style={{ fontSize: ".8rem" }}
        //                         className="mt-1 text-center mb-0 text-muted mt-3"
        //                       >
        //                         To <strong>WITHDRAW</strong> you will be
        //                         asked to sign{" "}
        //                         <strong>2 transactions</strong>
        //                       </p>
        //                       <p
        //                         style={{ fontSize: ".8rem" }}
        //                         className="mt-1 text-center text-muted mt-3"
        //                       >
        //                         0% fee for withdraw
        //                       </p>
        //                     </form>
        //                   </div>
        //                 </div>
        //                 <div className="col-12">
        //                   <div className="l-box">
        //                     <form onSubmit={this.handleClaimDivs}>
        //                       <div className="form-group">
        //                         <label
        //                           htmlFor="deposit-amount"
        //                           className="text-left d-block"
        //                         >
        //                           REWARDS
        //                         </label>
        //                         <div className="form-row">

        //                           <div className="col-md-12">

        //                             <input
        //                               disabled={!is_connected}
        //                               value={
        //                                 Number(pendingDivs) > 0
        //                                   ? `${pendingDivs} DYP`
        //                                   : `${pendingDivs} DYP`
        //                               }
        //                               onChange={(e) =>
        //                                 this.setState({
        //                                   pendingDivs:
        //                                     Number(e.target.value) > 0
        //                                       ? e.target.value
        //                                       : e.target.value,
        //                                 })
        //                               }
        //                               className="form-control left-radius"
        //                               placeholder="0"
        //                               type="text"
        //                               disabled
        //                             />
        //                           </div>
        //                         </div>
        //                       </div>
        //                       <div className="form-row">
        //                         <div className="col-md-6 mb-2">
        //                           <button
        //                             disabled={!is_connected}
        //                             className="btn  btn-primary btn-block "
        //                             type="submit"
        //                           >
        //                             CLAIM
        //                           </button>
        //                         </div>
        //                         <div className="col-md-6 mb-2">
        //                           <button
        //                             disabled={!is_connected}
        //                             className="btn  btn-primary btn-block l-outline-btn"
        //                             type="button"
        //                             onClick={this.handleReinvest}
        //                           >
        //                             REINVEST
        //                           </button>
        //                         </div>
        //                       </div>
        //                       <p
        //                         style={{ fontSize: ".8rem" }}
        //                         className="mt-1 text-center mb-0 text-muted mt-3"
        //                       >
        //                         To <strong>CLAIM</strong> you will be asked
        //                         to sign <strong>2 transactions</strong>
        //                       </p>
        //                     </form>
        //                   </div>
        //                 </div>

        //               </div>
        //             </div>
        //             <div className="col-lg-6">
        //               <div className="l-box">
        //                 <div className="table-responsive">
        //                   <h3
        //                     style={{
        //                       fontSize: "1.1rem",
        //                       fontWeight: "600",
        //                       padding: ".3rem",
        //                     }}
        //                   >
        //                     STATS
        //                   </h3>
        //                   <table className="table-stats table table-sm table-borderless">
        //                     <tbody>

        //                       <tr>
        //                         <th>Contract Expiration</th>
        //                         <td className="text-right">
        //                           <strong>{expiration_time}</strong>
        //                         </td>
        //                       </tr>

        //                       <tr>
        //                         <th>My DYP Balance</th>
        //                         <td className="text-right">
        //                           <strong>{token_balance}</strong>{" "}
        //                           <small>{token_symbol}</small>
        //                         </td>
        //                       </tr>

        //                       <tr>
        //                         <th>My Deposit Value</th>
        //                         <td className="text-right">
        //                           <strong>${depositedTokens}</strong>{" "}
        //                           <small>USD</small>
        //                         </td>
        //                       </tr>

        //                       <tr>
        //                         <th>Total Earned</th>
        //                         <td className="text-right">
        //                           <strong>${totalEarnedTokens}</strong>{" "}
        //                           <small>USD</small>
        //                         </td>
        //                       </tr>

        //                       <tr>
        //                         <th>TVL USD</th>
        //                         <td className="text-right">
        //                           <strong>${tvl_usd}</strong>{" "}
        //                           <small>USD</small>
        //                         </td>
        //                       </tr>

        //                       {is_connected ? (
        //                         <tr>
        //                           <td
        //                             style={{
        //                               fontSize: "1rem",
        //                               paddingTop: "2rem",
        //                             }}
        //                             colSpan="2"
        //                             className="text-center"
        //                           >
        //                             <a
        //                               target="_blank"
        //                               rel="noopener noreferrer"
        //                               href={`${window.config.etherscan_baseURL}/token/${reward_token._address}?a=${coinbase}`}
        //                             >
        //                               View Transaction History on Etherscan
        //                             </a>{" "}
        //                             &nbsp;{" "}
        //                             <i
        //                               style={{ fontSize: ".8rem" }}
        //                               className="fas fa-external-link-alt"
        //                             ></i>
        //                           </td>
        //                         </tr>
        //                       ) : (
        //                         ""
        //                       )}

        //                       <tr></tr>
        //                       {isOwner && (
        //                         <tr>
        //                           <td
        //                             style={{ fontSize: "1rem" }}
        //                             colSpan="2"
        //                             className="text-center"
        //                           >
        //                             <a
        //                               onClick={this.handleListDownload}
        //                               target="_blank"
        //                               rel="noopener noreferrer"
        //                               href="#"
        //                             >
        //                               <i
        //                                 style={{ fontSize: ".8rem" }}
        //                                 className="fas fa-download"
        //                               ></i>{" "}
        //                               Download Stakers List{" "}
        //                             </a>
        //                           </td>
        //                         </tr>
        //                       )}
        //                     </tbody>
        //                   </table>
        //                 </div>
        //               </div>
        //             </div>
        //           </div>
        //         </div>
        //       </div>
        //     </div>
        //   </div>
      );
    }
  }

  return Staking;
}

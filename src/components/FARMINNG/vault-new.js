import React from "react";
import moment from "moment";
import getFormattedNumber from "../../functions/get-formatted-number";
import Modal from "../Modal/Modal";
import Address from "./address";
import WalletModal from "../WalletModal";
import "./top-pools.css";
import ellipse from "./assets/ellipse.svg";
import empty from "./assets/empty.svg";
import check from "./assets/check.svg";
import successMark from "../../assets/successMark.svg";
import failMark from "../../assets/failMark.svg";
import Clipboard from "react-clipboard.js";
import ReactTooltip from "react-tooltip";
import arrowup from "./assets/arrow-up.svg";
import moreinfo from "./assets/more-info.svg";
import stats from "./assets/stats.svg";
import purplestats from "./assets/purpleStat.svg";
import calculatorIcon from "../calculator/assets/calculator.svg";
import xMark from "../calculator/assets/xMark.svg";
import wallet from "./assets/wallet.svg";
import Tooltip from "@material-ui/core/Tooltip";
import statsLinkIcon from "./assets/statsLinkIcon.svg";
import { shortAddress } from "../../functions/shortAddress";
import poolStatsIcon from "./assets/poolStatsIcon.svg";

export default function initVaultNew({
  vault,
  platformTokenApyPercent,
  apr = 72,
  liquidity = "ETH",
  token,
  UNDERLYING_DECIMALS = 18,
  UNDERLYING_SYMBOL = "DAI",
  expiration_time,
  coinbase,
  chainId,
  lockTime,
}) {
  let { BigNumber, alertify, token_dyps } = window;
  let token_symbol = UNDERLYING_SYMBOL;

  // token, staking

  const TOKEN_DECIMALS = UNDERLYING_DECIMALS;

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
    download("depositors-list.csv", jsonToCsv(list));

    function getDate(timestamp) {
      let a = new Date(timestamp);
      return a.toUTCString();
    }
  };

  class Vault extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        token_balance: "",
        platform_token_balance: "",

        pendingDivsEth: "",
        pendingDivsDyp: "",
        pendingDivsToken: "",
        pendingDivsComp: "",

        totalEarnedEth: "",
        totalEarnedDyp: "",
        totalEarnedToken: "",
        totalEarnedComp: "",

        cliffTime: "",
        stakingTime: "",
        depositedTokens: "",
        totalDepositedTokens: "",
        lastClaimedTime: "",

        depositAmount: "",
        withdrawAmount: "",
        rdepositAmount: "",
        errorMsg: "",
        errorMsg2: "",
        errorMsg3: "",
        coinbase: "0x0000000000000000000000000000000000000111",
        tvl_usd: "...",
        apy_percent: "...",
        owner: null,
        approxDeposit: 100,
        approxDays: 365,

        usdPerToken: "",
        usdPerDepositToken: "",

        gasPrice: "",
        depositLoading: false,
        depositStatus: "initial",
        claimLoading: false,
        claimStatus: "initial",

        withdrawLoading: false,
        withdrawStatus: "initial",
        showWithdrawModal: false,
        showCalculator: false,

        contractDeployTime: "",
        disburseDuration: "",
        tvlUSD: 1,
        show: false,
        popup: false,
        is_wallet_connected: false,
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
      let length = await vault.getNumberOfHolders();
      length = Number(length);
      try {
        for (let startIndex = 0; startIndex < length; startIndex += step) {
          console.log({ startIndex, endIndex: startIndex + step });
          let array = await vault.getDepositorsList(
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
      if (coinbase !== null) {
        this.setState({ coinbase: coinbase });
      }

      this.refreshBalance();
      // window._refreshBalInterval = setInterval(this.refreshBalance, 8000);
      // console.log( vault.getTvlUsdAndApyPercent(UNDERLYING_DECIMALS))
      vault
        .getTvlUsdAndApyPercent(UNDERLYING_DECIMALS)
        .then(
          ({ tvl_usd, apy_percent }) => this.setState({ tvl_usd, apy_percent })
          // console.log(tvl_usd)
        )
        .catch(console.error);

      fetch(
        "https://data-api.defipulse.com/api/v1/egs/api/ethgasAPI.json?api-key=0cb24df6d59351fdfb85e84c264c1d89dada314bbd85bbb5bea318f7f995"
      )
        .then((res) => res.json())
        .then((data) => this.setState({ gasPrice: data.fast / 10 }))
        .catch(console.error);
    }

    componentWillUnmount() {
      // clearInterval(window._refreshBalInterval);
    }

    handleApprove = async (e) => {
      // e.preventDefault();
      this.setState({ depositLoading: true });

      let amount = this.state.depositAmount;
      amount = new BigNumber(amount)
        .times(10 ** UNDERLYING_DECIMALS)
        .toFixed(0);
      await token
        .approve(vault._address, amount)
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
      let amount = this.state.depositAmount;
      amount = new BigNumber(amount)
        .times(10 ** UNDERLYING_DECIMALS)
        .toFixed(0);
      let value = await this.getMinEthFeeInWei();
      this.setState({ depositLoading: true });

      let FEE_PERCENT_TO_BUYBACK_X_100 =
        await vault.FEE_PERCENT_TO_BUYBACK_X_100();
      let feeAmountEth = new BigNumber(value)
        .times(FEE_PERCENT_TO_BUYBACK_X_100)
        .div(100e2)
        .toFixed(0);

      let deadline = Math.floor(
        Date.now() / 1e3 + window.config.tx_max_wait_seconds
      );
      let router = await window.getUniswapRouterContract();

      let WETH = await router.methods.WETH().call();
      let platformTokenAddress = window.config.reward_token_idyp_address;

      let path = [WETH, platformTokenAddress];

      let _amountOutMin_ethFeeBuyBack = await router.methods
        .getAmountsOut(feeAmountEth, path)
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
      _amountOutMin_ethFeeBuyBack =
        _amountOutMin_ethFeeBuyBack[_amountOutMin_ethFeeBuyBack.length - 1];
      _amountOutMin_ethFeeBuyBack = new BigNumber(_amountOutMin_ethFeeBuyBack)
        .times(100 - window.config.slippage_tolerance_percent)
        .div(100)
        .toFixed(0);

      //console.log({ _amountOutMin_ethFeeBuyBack, deadline, value })
      vault
        .deposit([amount, _amountOutMin_ethFeeBuyBack, deadline], value)
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

    handleWithdraw = async (e) => {
      // e.preventDefault();
      this.setState({ withdrawLoading: true });

      let amount = this.state.withdrawAmount;
      amount = new BigNumber(amount)
        .times(10 ** UNDERLYING_DECIMALS)
        .toFixed(0);
      let value = await this.getMinEthFeeInWei();

      let FEE_PERCENT_X_100 = await vault.FEE_PERCENT_X_100();
      let FEE_PERCENT_TO_BUYBACK_X_100 =
        await vault.FEE_PERCENT_TO_BUYBACK_X_100();
      let buyBackFeeAmountEth = new BigNumber(value)
        .times(FEE_PERCENT_TO_BUYBACK_X_100)
        .div(100e2)
        .toFixed(0);
      let feeAmountToken = new BigNumber(amount)
        .times(FEE_PERCENT_X_100)
        .div(100e2)
        .toFixed(0);
      let buyBackFeeAmountToken = new BigNumber(feeAmountToken)
        .times(FEE_PERCENT_TO_BUYBACK_X_100)
        .div(100e2)
        .toFixed(0);

      let deadline = Math.floor(
        Date.now() / 1e3 + window.config.tx_max_wait_seconds
      );
      let router = await window.getUniswapRouterContract();

      let WETH = await router.methods.WETH().call();
      let platformTokenAddress = window.config.reward_token_idyp_address;

      let path = [WETH, platformTokenAddress];

      let _amountOutMin_ethFeeBuyBack = await router.methods
        .getAmountsOut(buyBackFeeAmountEth, path)
        .call()
        .catch((e) => {
          this.setState({ withdrawStatus: "failed" });
          this.setState({ withdrawLoading: false });
          this.setState({ errorMsg3: e?.message });
          setTimeout(() => {
            this.setState({
              withdrawStatus: "initial", 
              errorMsg3: "",
            });
          }, 10000);
        });
      _amountOutMin_ethFeeBuyBack =
        _amountOutMin_ethFeeBuyBack[_amountOutMin_ethFeeBuyBack.length - 1];
      _amountOutMin_ethFeeBuyBack = new BigNumber(_amountOutMin_ethFeeBuyBack)
        .times(100 - window.config.slippage_tolerance_percent)
        .div(100)
        .toFixed(0);

      let tokenFeePath = [
        ...new Set(
          [token._address, WETH, platformTokenAddress].map((a) =>
            a.toLowerCase()
          )
        ),
      ];

      let _amountOutMin_tokenFeeBuyBack = await router.methods
        .getAmountsOut(buyBackFeeAmountToken, tokenFeePath)
        .call()
        .catch((e) => {
          this.setState({ withdrawStatus: "failed" });
          this.setState({ withdrawLoading: false });
          this.setState({ errorMsg3: e?.message });
          setTimeout(() => {
            this.setState({
              withdrawStatus: "initial", 
              errorMsg3: "",
            });
          }, 10000);
        });
      _amountOutMin_tokenFeeBuyBack =
        _amountOutMin_tokenFeeBuyBack[_amountOutMin_tokenFeeBuyBack.length - 1];
      _amountOutMin_tokenFeeBuyBack = new BigNumber(
        _amountOutMin_tokenFeeBuyBack
      )
        .times(100 - window.config.slippage_tolerance_percent)
        .div(100)
        .toFixed(0);

      //console.log({ _amountOutMin_ethFeeBuyBack, _amountOutMin_tokenFeeBuyBack, deadline, value })

      vault
        .withdraw(
          [
            amount,
            _amountOutMin_ethFeeBuyBack,
            _amountOutMin_tokenFeeBuyBack,
            deadline,
          ],
          value
        )
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
              errorMsg3: "",
              withdrawAmount: ''
            });
          }, 10000);
        });
    };

    getMinEthFeeInWei = async () => {
      let minEthFeeInWei = Number(await vault.MIN_ETH_FEE_IN_WEI());
      let calculatedFee = 0;
      if (this.state.gasPrice) {
        calculatedFee = 4_000 * 1 * 10 ** 9;
      }
      return Math.max(minEthFeeInWei, calculatedFee);
    };

    handleClaimDivs = async (e) => {
      // e.preventDefault();
      this.setState({ claimLoading: true });
      let router = await window.getUniswapRouterContract();
      let _amountOutMin_platformTokens = [0];
      let depositTokenAddress = token._address;

      let platformToken = window.config.reward_token_idyp_address;

      let WETH = await router.methods.WETH().call();

      let path = [
        ...new Set(
          [depositTokenAddress, WETH, platformToken].map((a) => a.toLowerCase())
        ),
      ];

      //console.log({ path })
      try {
        if (Number(this.state.pendingDivsDyp)) {
          //alert(this.state.pendingDivsDyp)
          _amountOutMin_platformTokens = await router.methods
            .getAmountsOut(this.state.pendingDivsDyp, path)
            .call()
            .catch((e) => {
              this.setState({ claimStatus: "failed" });
              this.setState({ claimLoading: false });
              this.setState({ errorMsg2: e?.message });
              setTimeout(() => {
                this.setState({
                  claimStatus: "initial", 
                  errorMsg2: "",
                });
              }, 10000);
            });
        }
      } catch (e) {
        this.setState({ errorMsg2: e });

        console.warn(e);
      }

      //_amountOutMin_platformTokens = await router.methods.getAmountsOut(this.state.pendingDivsDyp, path).call()

      _amountOutMin_platformTokens =
        _amountOutMin_platformTokens[_amountOutMin_platformTokens.length - 1];
      _amountOutMin_platformTokens = new BigNumber(_amountOutMin_platformTokens)
        .times(100 - window.config.slippage_tolerance_percent)
        .div(100)
        .toFixed(0);

      //console.log({ _amountOutMin_platformTokens })
      //alert("reached here!")
      vault
        .claim([_amountOutMin_platformTokens])
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
              errorMsg2: "",
            });
          }, 10000);
        });
    };

    handleSetMaxDeposit = (e) => {
      e.preventDefault();
      this.setState({
        depositAmount: new BigNumber(this.state.token_balance)
          .div(10 ** UNDERLYING_DECIMALS)
          .toFixed(UNDERLYING_DECIMALS),
      });
    };
    rhandleSetMaxDeposit = (e) => {
      e.preventDefault();
      this.setState({
        rdepositAmount: new BigNumber(this.state.platform_token_balance)
          .div(1e18)
          .toFixed(18),
      });
    };
    handleSetMaxWithdraw = (e) => {
      e.preventDefault();
      this.setState({
        withdrawAmount: new BigNumber(this.state.depositedTokens)
          .div(10 ** UNDERLYING_DECIMALS)
          .toFixed(UNDERLYING_DECIMALS),
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

      let pendingRewardsInToken = 0;

      let { the_graph_result } = this.props;

      let usd_per_dyps = the_graph_result.price_DYPS
        ? the_graph_result.price_DYPS
        : 1;

      try {
        let _bal = token.balanceOf(coinbase);

        let _stakingTime = vault.depositTime(coinbase);

        let _dTokens = vault.depositTokenBalance(coinbase);

        let _lClaimTime = vault.lastClaimedTime(coinbase);

        let tStakers = vault.getNumberOfHolders();

        //Take DYPS Balance

        let _tvlDYPS = token_dyps.balanceOf(vault._address); /* TVL of DYPS */

        let [
          token_balance,
          stakingTime,
          depositedTokens,
          lastClaimedTime,
          total_stakers,
          tvlDYPS,
        ] = await Promise.all([
          _bal,
          _stakingTime,
          _dTokens,
          _lClaimTime,
          tStakers,
          _tvlDYPS,
        ]);

        let usdValueDYPS = new BigNumber(tvlDYPS)
          .times(usd_per_dyps)
          .toFixed(18);

        let tvlUSD = new BigNumber(usdValueDYPS).div(1e18).toFixed(0);
        this.setState({
          token_balance,
          stakingTime,
          depositedTokens,
          lastClaimedTime,
          total_stakers,
          tvlUSD,
        });
        let owner = await vault.owner();
        this.setState({ owner });

        let _pDivsToken = vault.tokenDivsOwing(coinbase);

        let _pDivsComp = vault.getEstimatedCompoundDivsOwing(coinbase);

        let _pDivsDyp = vault.platformTokenDivsOwing(coinbase);

        let _pDivsEth = vault.ethDivsOwing(coinbase);

        let _pBalToken = vault.tokenDivsBalance(coinbase);

        let _pBalEth = vault.ethDivsBalance(coinbase);

        let _pBalDyp = vault.platformTokenDivsBalance(coinbase);
        let [
          pendingDivsEth,
          pendingDivsComp,
          pendingDivsDyp,
          pendingDivsToken,
          pendingBalEth,
          pendingBalDyp,
          pendingBalToken,
        ] = await Promise.all([
          _pDivsEth,
          _pDivsComp,
          _pDivsDyp,
          _pDivsToken,
          _pBalEth,
          _pBalDyp,
          _pBalToken,
        ]);

        pendingDivsEth = new BigNumber(pendingDivsEth)
          .plus(pendingBalEth)
          .toFixed(0);
        pendingDivsToken = new BigNumber(pendingDivsToken)
          .plus(pendingBalToken)
          .toFixed(0);
        pendingDivsDyp = new BigNumber(pendingDivsDyp)
          .plus(pendingBalDyp)
          .toFixed(0);

        pendingRewardsInToken = pendingDivsDyp;

        this.setState({
          pendingDivsComp,
          pendingDivsDyp,
          pendingDivsEth,
          pendingDivsToken,
        });
      } catch (e) {
        console.error(e);
      }

      window.reward_token_idyp
        .balanceOf(coinbase)
        .then((platform_token_balance) =>
          this.setState({ platform_token_balance })
        );

      vault
        .totalDepositedTokens()
        .then((totalDepositedTokens) => {
          // console.log({ totalDepositedTokens })
          this.setState({ totalDepositedTokens });
        })
        .catch(console.log);

      vault
        .totalEarnedCompoundDivs(coinbase)
        .then((totalEarnedComp) => this.setState({ totalEarnedComp }))
        .catch(console.log);
      vault
        .totalEarnedEthDivs(coinbase)
        .then((totalEarnedEth) => this.setState({ totalEarnedEth }))
        .catch(console.log);
      vault
        .totalEarnedTokenDivs(coinbase)
        .then((totalEarnedToken) => this.setState({ totalEarnedToken }))
        .catch(console.log);
      vault
        .totalEarnedPlatformTokenDivs(coinbase)
        .then((totalEarnedDyp) => this.setState({ totalEarnedDyp }))
        .catch(console.log);

      vault
        .LOCKUP_DURATION()
        .then((cliffTime) => {
          this.setState({ cliffTime: Number(cliffTime) });
        })
        .catch(console.error);

      vault.contractStartTime().then((contractDeployTime) => {
        this.setState({ contractDeployTime });
      });

      vault.REWARD_INTERVAL().then((disburseDuration) => {
        this.setState({ disburseDuration });
      });

      let usdPerToken = (await window.getPrices("idefiyieldprotocol"))[
        "idefiyieldprotocol"
      ]["usd"];
      let dId = window.config.cg_ids[vault.tokenAddress.toLowerCase()];
      let usdPerDepositToken = (await window.getPrices(dId))[dId]["usd"];
      //console.log({usdPerToken, usdPerDepositToken})
      this.setState({ usdPerToken, usdPerDepositToken });

      if (!this.state.rdepositAmount) {
        let usdValueOfPendingDivsInToken =
          (usdPerDepositToken * pendingRewardsInToken) / 10 ** TOKEN_DECIMALS;
        let dypAmount = usdValueOfPendingDivsInToken / usdPerToken;
        //console.log({ usdValueOfPendingDivsInToken, dypAmount })
        this.setState({ rdepositAmount: dypAmount.toFixed(19) });
      }
    };

    getApproxReturn = () => {
      let APY = this.state.apy_percent;
      let approxDays = this.state.approxDays;
      let approxDeposit = this.state.approxDeposit;

      return ((approxDeposit * APY) / 100 / 365) * approxDays;
    };

    render() {
      let {
        cliffTime,
        token_balance,
        depositedTokens,
        stakingTime,
        coinbase,

        pendingDivsComp,
        pendingDivsEth,
        pendingDivsToken,
        pendingDivsDyp,

        totalEarnedComp,
        totalEarnedDyp,
        totalEarnedEth,
        totalEarnedToken,
        disburseDuration,
        contractDeployTime,
      } = this.state;

      pendingDivsEth = new BigNumber(pendingDivsEth).div(10 ** 18).toString(10);
      pendingDivsEth = getFormattedNumber(pendingDivsEth, 8);

      pendingDivsToken = new BigNumber(pendingDivsToken)
        .div(10 ** TOKEN_DECIMALS)
        .toString(10);
      pendingDivsToken = getFormattedNumber(pendingDivsToken, TOKEN_DECIMALS);

      pendingDivsDyp = new BigNumber(pendingDivsDyp)
        .div(10 ** TOKEN_DECIMALS)
        .toString(10);
      pendingDivsDyp = getFormattedNumber(pendingDivsDyp, TOKEN_DECIMALS);

      pendingDivsComp = new BigNumber(pendingDivsComp)
        .div(10 ** TOKEN_DECIMALS)
        .toString(10);
      pendingDivsComp = getFormattedNumber(pendingDivsComp, TOKEN_DECIMALS);

      token_balance = new BigNumber(token_balance)
        .div(10 ** TOKEN_DECIMALS)
        .toString(10);
      token_balance = getFormattedNumber(token_balance, 6);

      totalEarnedToken = new BigNumber(totalEarnedToken)
        .div(10 ** TOKEN_DECIMALS)
        .toString(10);
      totalEarnedToken = getFormattedNumber(totalEarnedToken, 6);

      totalEarnedComp = new BigNumber(totalEarnedComp)
        .div(10 ** TOKEN_DECIMALS)
        .toString(10);
      totalEarnedComp = getFormattedNumber(totalEarnedComp, 6);

      totalEarnedDyp = new BigNumber(totalEarnedDyp).div(10 ** 18).toString(10);
      totalEarnedDyp = getFormattedNumber(totalEarnedDyp, 6);

      totalEarnedEth = new BigNumber(totalEarnedEth).div(10 ** 18).toString(10);
      totalEarnedEth = getFormattedNumber(totalEarnedEth, 6);

      depositedTokens = new BigNumber(depositedTokens)
        .div(10 ** TOKEN_DECIMALS)
        .toString(10);
      depositedTokens = getFormattedNumber(depositedTokens, 6);

      stakingTime = stakingTime * 1e3;
      cliffTime = cliffTime * 1e3;

      let showDeposit = true;

      if (!isNaN(disburseDuration) && !isNaN(contractDeployTime)) {
        let lastDay = parseInt(disburseDuration) + parseInt(contractDeployTime);
        let lockTimeExpire = parseInt(Date.now()) + parseInt(cliffTime);
        lockTimeExpire = lockTimeExpire.toString().substr(0, 10);
        // console.log("now " + lockTimeExpire)
        // console.log('last ' + lastDay)
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
      total_stakers = getFormattedNumber(total_stakers, 0);

      let APY_TOTAL = this.state.apy_percent + platformTokenApyPercent;

      //console.log(total_stakers)

      let isOwner =
        String(this.state.coinbase).toLowerCase() ===
        String(window.config.admin_address).toLowerCase();

      let tvlUSD = parseInt(this.state.tvlUSD) + parseInt(this.state.tvl_usd);

      let tvl_usd = getFormattedNumber(tvlUSD, 2);

      let is_connected = this.props.is_wallet_connected;

      let id = Math.random().toString(36);

      return (
        <div className="container-lg p-0">
          <div className="allwrapper my-4">
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
                      {token_symbol}
                    </h6>
                  </div>
                  <div className="d-flex align-items-center justify-content-between gap-2">
                    <h6 className="earnrewards-text">Performance fee:</h6>
                    <h6 className="earnrewards-token d-flex align-items-center gap-1">
                      0.3%
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
                      {getFormattedNumber(APY_TOTAL, 2)}%
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
                      {lockTime}
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
              <div className="firstblockwrapper col-2">
                <div
                  className="d-flex flex-column justify-content-between gap-4"
                  style={{ height: "100%" }}
                >
                  <h6 className="start-title">Start Vault</h6>
                  {/* <h6 className="start-desc">
                    {this.props.coinbase === null
                      ? "Connect wallet to view and interact with deposits and withdraws"
                      : "Interact with deposits and withdraws"}
                  </h6> */}
                  {this.props.coinbase === null ? (
                    <button className="connectbtn btn" onClick={this.showModal}>
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
                  <h6 className="deposit-txt">
                    Deposit
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
                  </h6>
                  <h6 className="mybalance-text">
                    Balance:
                    <b>{token_balance}</b>
                    <img
                      src={require(`./assets/dyp.svg`).default}
                      alt=""
                      style={{ width: 14, height: 14 }}
                    />
                  </h6>
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
                  <h6 className="withdraw-littletxt">
                    You have 3 differents reward categories <b></b>
                    <Tooltip
                      placement="top"
                      title={
                        <div style={{ whiteSpace: "pre-line" }}>
                          <h6 className="tvl-text">
                            Earn Rewards in:{" "}
                            <h6 className="tvl-amount" style={{ fontSize: 12 }}>
                              {" "}
                              {pendingDivsDyp}iDYP
                            </h6>
                          </h6>
                          <h6 className="tvl-text">
                            Earn Rewards in:{" "}
                            <h6 className="tvl-amount" style={{ fontSize: 12 }}>
                              {pendingDivsEth}ETH
                            </h6>
                          </h6>
                          <h6 className="tvl-text">
                            Earn Rewards in:{" "}
                            <h6 className="tvl-amount" style={{ fontSize: 12 }}>
                              {pendingDivsComp} {token_symbol} (Compound){" "}
                            </h6>
                          </h6>
                          <h6 className="tvl-text">
                            Earn Rewards in:{" "}
                            <h6 className="tvl-amount" style={{ fontSize: 12 }}>
                              {pendingDivsToken} {token_symbol}
                            </h6>
                          </h6>
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
                      <span>{pendingDivsEth}</span>
                    </div>
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
                  </div>
                </div>
                {this.state.errorMsg2 && (
                  <h6 className="errormsg">{this.state.errorMsg2}</h6>
                )}
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
                  {/* <table className="table-stats table table-sm table-borderless mt-2">
                      <tbody>
                        <tr>
                          <td className="text-right">
                            <th>MY {token_symbol} Deposit</th>
                            <div>
                              <strong>{depositedTokens}</strong> <small>{token_symbol}</small>
                            </div>
                          </td>

                          <td className="text-right">
                            <th>Total Earned iDYP</th>
                            <div>
                              <strong style={{ fontSize: 9 }}>
                                {totalEarnedDyp}
                              </strong>{" "}
                              <small>iDYP</small>
                            </div>
                          </td>
                          <td className="text-right">
                            <th>Total Earned {token_symbol} (Fees) </th>
                            <div>
                              <strong>{totalEarnedToken}</strong>{" "}
                              <small>{token_symbol}</small>
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <td className="text-right">
                            <th>Total Earned {token_symbol} (Compound)</th>
                            <div>
                              <strong>{totalEarnedComp}</strong>{" "}
                              <small>{token_symbol}</small>
                            </div>
                          </td>
                          <td className="text-right">
                            <th>My Share</th>
                            <div>
                              <strong>
                                {getFormattedNumber(
                                  !this.state.totalDepositedTokens
                                    ? "..."
                                    : (this.state.depositedTokens /
                                        this.state.totalDepositedTokens) *
                                        100,
                                  2
                                )}
                              </strong>{" "}
                              <small>%</small>
                            </div>
                          </td>
                        </tr>
                        <tr></tr>
                      </tbody>
                    </table> */}
                  <div className="stats-container my-4">
                    <div className="stats-card p-4 d-flex flex-column mx-auto w-100">
                      <span className="stats-card-title">
                        MY {token_symbol} Deposit
                      </span>
                      <h6 className="stats-card-content">
                        {depositedTokens} {token_symbol}
                      </h6>
                    </div>
                    <div className="stats-card p-4 d-flex flex-column mx-auto w-100">
                      <span className="stats-card-title">
                        Total Earned iDYP
                      </span>
                      <h6 className="stats-card-content">
                        {totalEarnedDyp} iDYP
                      </h6>
                    </div>
                    <div className="stats-card p-4 d-flex flex-column mx-auto w-100">
                      <span className="stats-card-title">
                        Total Earned {token_symbol} (Fees)
                      </span>
                      <h6 className="stats-card-content">
                        {totalEarnedToken} {token_symbol}
                      </h6>
                    </div>
                    <div className="stats-card p-4 d-flex flex-column mx-auto w-100">
                      <span className="stats-card-title">
                        Total Earned {token_symbol} (Compound)
                      </span>
                      <h6 className="stats-card-content">
                        {totalEarnedComp} {token_symbol}
                      </h6>
                    </div>
                    <div className="stats-card p-4 d-flex flex-column mx-auto w-100">
                      <span className="stats-card-title">My share</span>
                      <h6 className="stats-card-content">
                        {getFormattedNumber(
                          !this.state.totalDepositedTokens
                            ? "..."
                            : (this.state.depositedTokens /
                                this.state.totalDepositedTokens) *
                                100,
                          2
                        )}
                      </h6>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end align-items-center gap-2">
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
                  </div>
                  <hr />
                  <div className="container px-0">
                    <div className="row" style={{ marginLeft: "0px" }}>
                      <div className="d-flex justify-content-between gap-2 align-items-center p-0">
                        <h6
                          className="d-flex gap-2 align-items-center statstext"
                          style={{
                            fontWeight: "500",
                            fontSize: "20px",
                            lineHeight: "28px",
                            color: "#f7f7fc",
                          }}
                        >
                          <img src={poolStatsIcon} alt="" />
                          Pool stats
                        </h6>
                      </div>
                    </div>
                    {/* <table className="table-stats table table-sm table-borderless mt-2">
                      <tbody>
                        <tr>
                          <td className="text-right">
                            <th>TVL USD</th>
                            <div>
                              <strong>${tvl_usd}</strong> <small>USD</small>
                            </div>
                          </td>

                          <td className="text-right">
                            <th>Total {token_symbol} Deposited</th>
                            <div>
                              <strong style={{ fontSize: 11 }}>
                                {getFormattedNumber(
                                  this.state.totalDepositedTokens /
                                    10 ** TOKEN_DECIMALS,
                                  6
                                )}{" "}
                              </strong>{" "}
                              <small>{token_symbol}</small>
                            </div>
                          </td>

                          <td className="text-right">
                            <th>Contract Expiration</th>
                            <small>{expiration_time}</small>
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{
                              background: "transparent",
                              border: "none",
                              gap: 10,
                              flexDirection: "row",
                              justifyContent: "flex-start",
                            }}
                          >
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              href={`${window.config.etherscan_baseURL}/token/${token._address}?a=${coinbase}`}
                              className="maxbtn d-flex align-items-center"
                              style={{ height: "25px" }}
                            >
                              Etherscan
                              <img src={arrowup} alt="" />
                            </a>

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
                          </td>
                        </tr>
                      </tbody>
                    </table> */}
                    <div className="stats-container my-4">
                      <div className="stats-card p-4 d-flex flex-column mx-auto w-100">
                        <span className="stats-card-title">TVL USD</span>
                        <h6 className="stats-card-content">${tvl_usd} USD</h6>
                      </div>
                      <div className="stats-card p-4 d-flex flex-column mx-auto w-100">
                        <span className="stats-card-title">
                          Total {token_symbol} deposited
                        </span>
                        <h6 className="stats-card-content">
                          {getFormattedNumber(
                            this.state.totalDepositedTokens /
                              10 ** TOKEN_DECIMALS,
                            6
                          )}{" "}
                          {token_symbol}
                        </h6>
                      </div>
                      <div className="stats-card p-4 d-flex flex-column mx-auto w-100">
                        <span className="stats-card-title">
                          Contract expiration
                        </span>
                        <h6 className="stats-card-content">
                          {expiration_time}
                        </h6>
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-end gap-4">
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
                        href={`${window.config.etherscan_baseURL}/token/${token._address}?a=${coinbase}`}
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
                          : `Your deposit is locked for ${lockTime.toLowerCase()}. After ${lockTime.toLowerCase()} you can
                        withdraw or you can continue to earn rewards everyday`}
                      </h6>
                    </div>

                    <div className="d-flex flex-column mt-2">
                      <div className="d-flex  gap-2 justify-content-between align-items-center">
                        <div className="d-flex flex-column gap-1">
                          <h6 className="withsubtitle mt-3">Timer</h6>
                          <h6 className="withtitle" style={{ fontWeight: 300 }}>
                            {lockTime === "No Lock" ? "No Lock" : lockTime}
                          </h6>
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
                        <div className="position-relative">
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
        </div>

        // <div>
        //   <div className="row">
        //     <div
        //       className="col-12"
        //       style={{
        //         background: "url(img/banner/dyp_farming_vault-09.svg)",
        //         backgroundSize: "cover",
        //         resize: "both",
        //       }}
        //     >
        //       <div className="container">
        //         <Modal show={this.state.popup} handleClose={this.hidePopup}>
        //           <div className="earn-hero-content p4token-wrapper">
        //             <p className="h3">
        //               <b>DYP Vault</b>
        //             </p>
        //             <p>
        //               The DYP Vault is an automated smart contract with Compound
        //               Protocol integration and support for ETH, WBTC, USDC,
        //               USDT, and DAI markets. The rewards from Compound Protocol
        //               are entirely distributed to the users; from the other
        //               strategies, a substantial proportion of the rewards (75%)
        //               is converted to ETH and distributed to the users, whereas
        //               the remainder (25%) is used to buy back our protocol token
        //               and burn it.
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
        //           <div className="col-12" style={{ marginBottom: "30px" }}>
        //             <p
        //               style={{
        //                 width: "100%",
        //                 height: "auto",
        //                 fontFamily: "Mulish",
        //                 fontStyle: "normal",
        //                 fontWeight: "900",
        //                 fontSize: "42px",
        //                 lineHeight: "55px",
        //                 color: "#FFFFFF",
        //                 marginTop: "35px",
        //                 maxHeight: "55px",
        //               }}
        //             >
        //               DYP Vault
        //             </p>
        //           </div>
        //           <div
        //             className="col-12 col-sm-6"
        //             style={{ marginBottom: "27px" }}
        //           >
        //             <div className="row">
        //               <div
        //                 style={{ paddingRight: "15px" }}
        //                 className="col-6 col-sm-12 col-md-9 col-lg-6"
        //               >
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

        //             </div>
        //           </div>
        //         </div>
        //       </div>
        //     </div>

        //     <div className="container">
        //       <div className="token-staking mt-5">
        //         <div className="row">
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
        //                           "linear-gradient(257.76deg, #32B1F7 6.29%, #1D91D0 93.71%)",
        //                         boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.06)",
        //                         borderRadius: "6px",
        //                         paddingLeft: "5px",
        //                         padding: "10px",
        //                       }}
        //                     >
        //                       <div className="row">
        //                         <div
        //                           className="col-5 col-sm-4 col-md-3 mb-3 mb-md-0"
        //                           style={{ marginTop: "0px", paddingLeft: "" }}
        //                         >
        //                           <img
        //                             src="img/icon/eth.svg"
        //                             style={{
        //                               marginRight: "10px",
        //                               marginTop: "5px",
        //                             }}
        //                             alt="wallet"
        //                           />
        //                           <label
        //                             htmlFor="deposit-amount"
        //                             style={{
        //                               margin: "0px",
        //                               top: "4px",
        //                               position: "relative",
        //                               color: "white",
        //                             }}
        //                           >
        //                             Ethereum
        //                           </label>
        //                         </div>
        //                         <div className="col-7 col-sm-6 col-md-5 mb-3 mb-md-0">
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
        //                                 {getFormattedNumber(APY_TOTAL, 2)}%{" "}
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
        //                             disabled={!is_connected}
        //                             className="form-control left-radius"
        //                             placeholder="0"
        //                             type="text"
        //                           />
        //                           <div className="input-group-append">
        //                             <button
        //                               className="btn  btn-primary right-radius btn-max l-light-btn"
        //                               disabled={!is_connected}
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
        //                             onClick={this.handleApprove}
        //                             className="btn  btn-block btn-primary "
        //                             disabled={!is_connected}
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
        //                             onClick={this.handleStake}
        //                             disabled={!is_connected}
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

        //                         Please approve before deposit.
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
        //                         1. Before you deposit your funds, please make
        //                         sure that you double-check the contract
        //                         expiration date. At the end of a contract, you
        //                         can withdraw your funds only after the
        //                         expiration of your lock time. Consider a
        //                         scenario wherein you deposit funds to a contract
        //                         that expires in 30 days, but you lock the funds
        //                         for 90 days; you will then be able to withdraw
        //                         the funds 60 days after the expiration of the
        //                         contract. Furthermore, you will not receive any
        //                         rewards during this period.
        //                       </div>
        //                       <div
        //                         className="col-md-12 d-block mb-0 text-muted small"
        //                         style={{ fontSize: "15px" }}
        //                       >
        //                         2. New contracts with improved strategies will
        //                         be released after the current one expires.
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
        //                           disabled={!is_connected}
        //                         />
        //                         <div className="input-group-append">
        //                           <button
        //                             disabled={!is_connected}
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
        //                           : `You recently deposited, you can withdraw ${cliffTimeInWords}`
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
        //                       0.3% fee for withdraw (75% distributed pro-rata
        //                       among active vault users, whereas the remainder
        //                       25% is used to buy back iDYP and burn it)
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
        //                           <p
        //                             className="form-control  text-right"
        //                             style={{
        //                               border: "none",
        //                               marginBottom: 0,
        //                               paddingLeft: 0,
        //                               background: "transparent",
        //                               color: "var(--text-color)",
        //                             }}
        //                           >
        //                             <span
        //                               style={{
        //                                 fontSize: "1.2rem",
        //                                 color: "var(--text-color)",
        //                               }}
        //                             >
        //                               {pendingDivsDyp}
        //                             </span>{" "}
        //                             <small className="text-bold">
        //                               {token_symbol} worth iDYP
        //                             </small>
        //                           </p>
        //                         </div>
        //                         <div className="col-md-12">
        //                           <p
        //                             className="form-control  text-right"
        //                             style={{
        //                               border: "none",
        //                               marginBottom: 0,
        //                               paddingLeft: 0,
        //                               background: "transparent",
        //                               color: "var(--text-color)",
        //                             }}
        //                           >
        //                             <span
        //                               style={{
        //                                 fontSize: "1.2rem",
        //                                 color: "var(--text-color)",
        //                               }}
        //                             >
        //                               {pendingDivsEth}
        //                             </span>{" "}
        //                             <small className="text-bold">ETH</small>
        //                           </p>
        //                         </div>
        //                         <div className="col-md-12">
        //                           <p
        //                             className="form-control  text-right"
        //                             style={{
        //                               border: "none",
        //                               marginBottom: 0,
        //                               paddingLeft: 0,
        //                               background: "transparent",
        //                               color: "var(--text-color)",
        //                             }}
        //                           >
        //                             <span
        //                               style={{
        //                                 fontSize: "1.2rem",
        //                                 color: "var(--text-color)",
        //                               }}
        //                             >
        //                               {pendingDivsComp}
        //                             </span>{" "}
        //                             <small className="text-bold">
        //                               {token_symbol} (Compound)
        //                             </small>
        //                           </p>
        //                         </div>
        //                         <div className="col-md-12">
        //                           <p
        //                             className="form-control  text-right"
        //                             style={{
        //                               border: "none",
        //                               marginBottom: 0,
        //                               paddingLeft: 0,
        //                               background: "transparent",
        //                               color: "var(--text-color)",
        //                             }}
        //                           >
        //                             <span
        //                               style={{
        //                                 fontSize: "1.2rem",
        //                                 color: "var(--text-color)",
        //                               }}
        //                             >
        //                               {pendingDivsToken}
        //                             </span>{" "}
        //                             <small className="text-bold">
        //                               {token_symbol}
        //                             </small>
        //                           </p>
        //                         </div>
        //                       </div>
        //                     </div>
        //                     <div className="form-row">
        //                       <div className="col-md-12 mb-2">
        //                         <button
        //                           className="btn  btn-primary btn-block l-outline-btn"
        //                           disabled={!is_connected}
        //                           type="submit"
        //                         >
        //                           CLAIM
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
        //                             {token_symbol} to Deposit
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
        //                       {token_symbol} worth rewards.
        //                     </p>
        //                     <p
        //                       style={{ fontSize: ".8rem" }}
        //                       className="mt-1 text-center text-muted mt-3"
        //                     >
        //                       Approx. Value Not Considering Fees or unstable
        //                       APR.
        //                     </p>
        //                   </form>
        //                 </div>
        //               </div>
        //             </div>
        //           </div>
        //           <div className="col-lg-6">

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
        //                       <th>Contract Address</th>
        //                       <td className="text-right">
        //                        <Address
        //                           style={{ fontFamily: "monospace" }}
        //                           a={vault._address}
        //                         />
        //                       </td>
        //                     </tr>

        //                     <tr>
        //                       <th>Contract Expiration</th>
        //                       <td className="text-right">
        //                         <strong>{expiration_time}</strong>
        //                       </td>
        //                     </tr>

        //                     <tr>
        //                       <th>My {token_symbol} Balance</th>
        //                       <td className="text-right">
        //                         <strong>{token_balance}</strong>{" "}
        //                         <small>{token_symbol}</small>
        //                       </td>
        //                     </tr>

        //                     <tr>
        //                       <th>My iDYP Balance</th>
        //                       <td className="text-right">
        //                         <strong>
        //                           {getFormattedNumber(
        //                             this.state.platform_token_balance / 1e18,
        //                             6
        //                           )}
        //                         </strong>{" "}
        //                         <small>iDYP</small>
        //                       </td>
        //                     </tr>

        //                     <tr>
        //                       <th>MY {token_symbol} Deposit</th>
        //                       <td className="text-right">
        //                         <strong>{depositedTokens}</strong>{" "}
        //                         <small>{token_symbol}</small>
        //                       </td>
        //                     </tr>

        //                     <tr>
        //                       <th>Total {token_symbol} Deposited</th>
        //                       <td className="text-right">
        //                         <strong>
        //                           {getFormattedNumber(
        //                             this.state.totalDepositedTokens /
        //                               10 ** TOKEN_DECIMALS,
        //                             6
        //                           )}
        //                         </strong>{" "}
        //                         <small>{token_symbol}</small>
        //                       </td>
        //                     </tr>
        //                     <tr>
        //                       <th>MY Share</th>
        //                       <td className="text-right">
        //                         <strong>
        //                           {getFormattedNumber(
        //                             !this.state.totalDepositedTokens
        //                               ? "..."
        //                               : (this.state.depositedTokens /
        //                                   this.state.totalDepositedTokens) *
        //                                   100,
        //                             2
        //                           )}
        //                         </strong>{" "}
        //                         <small>%</small>
        //                       </td>
        //                     </tr>

        //                     <tr>
        //                       <th>Total Earned iDYP</th>
        //                       <td className="text-right">
        //                         <strong>{totalEarnedDyp}</strong>{" "}
        //                         <small>iDYP</small>
        //                       </td>
        //                     </tr>
        //                     <tr>
        //                       <th>Total Earned {token_symbol} (Compound)</th>
        //                       <td className="text-right">
        //                         <strong>{totalEarnedComp}</strong>{" "}
        //                         <small>{token_symbol}</small>
        //                       </td>
        //                     </tr>
        //                     <tr>
        //                       <th>Total Earned {token_symbol} (Fees)</th>
        //                       <td className="text-right">
        //                         <strong>{totalEarnedToken}</strong>{" "}
        //                         <small>{token_symbol}</small>
        //                       </td>
        //                     </tr>
        //                     <tr>
        //                       <th>Total Earned ETH</th>
        //                       <td className="text-right">
        //                         <strong>{totalEarnedEth}</strong>{" "}
        //                         <small>ETH</small>
        //                       </td>
        //                     </tr>

        //                     <tr>
        //                       <th>TVL USD</th>
        //                       <td className="text-right">
        //                         <strong>${tvl_usd}</strong> <small>USD</small>
        //                       </td>
        //                     </tr>
        //                     <tr>
        //                       <th>APR</th>
        //                       <td className="text-right">
        //                         <strong>
        //                           {getFormattedNumber(APY_TOTAL, 2)}
        //                         </strong>{" "}
        //                         <small>%</small>
        //                       </td>
        //                     </tr>
        //                     {isOwner && (
        //                       <tr>
        //                         <th>Total Stakers</th>
        //                         <td className="text-right">
        //                           <strong>{total_stakers}</strong>{" "}
        //                           <small></small>
        //                         </td>
        //                       </tr>
        //                     )}

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
        //                             href={`${window.config.etherscan_baseURL}/token/${token._address}?a=${coinbase}`}
        //                           >
        //                             View Transaction History on Etherscan
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

        //       </div>
        //     </div>
        //   </div>
        // </div>
      );
    }
  }

  return Vault;
}

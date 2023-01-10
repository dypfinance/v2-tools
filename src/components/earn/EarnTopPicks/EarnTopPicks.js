import React, { useEffect, useState } from "react";
import TopPoolsCard from "../../top-pools-card/TopPoolsCard";
import CawsCard from "../../top-pools-card/CawsCard";
import TopPoolsListCard from "../../top-pools-card/TopPoolsListCard";
import axios from "axios";
import getFormattedNumber from "../../../functions/getFormattedNumber2";
import initStakingNew from "../../FARMINNG/staking-new-front";
import initConstantStakingiDYP from "../../FARMINNG/constant-staking-idyp-new-front";
import initFarmAvax from "../../FARMINNG/farmAvax";
import stakeAvax from "../../FARMINNG/stakeAvax";
import stakeAvax30 from "../../FARMINNG/stakeAvax30";
import CawsDetails from "../../FARMINNG/caws";
import { FadeLoader } from "react-spinners";
import useWindowSize from "../../../functions/useWindowSize";
import initBscFarming from "../../FARMINNG/bscFarming";
import InitConstantStakingiDYP from "../../FARMINNG/constant-staking-idyp-new-front";
import StakeAvaxIDyp from "../../FARMINNG/stakeAvaxiDyp";
import StakeBscIDyp from "../../FARMINNG/bscConstantStakeiDyp";
import StakeBscDai from "../../FARMINNG/bscConstantStakeDai";
import StakeBsc from "../../FARMINNG/bscConstantStake";
import StakeBsc2 from "../../FARMINNG/bscConstantStake2";
import StakeAvaxDai from "../../FARMINNG/stakeAvax3";
import StakeEthDai from "../../FARMINNG/constant-staking-dai-front";
import StakeEth from "../../FARMINNG/constant-staking-new-front";
import Vault from "../../FARMINNG/vault-new";

const EarnTopPicks = ({
  topList,
  listType,
  coinbase,
  the_graph_result,
  lp_id,
  isConnected,
  chain,
  chainId,
  handleConnection,
  the_graph_resultavax,
  the_graph_resultbsc,
  referrer,
  pool,
  routeOption,
  customChain,
  handleSwitchNetwork,
  expiredPools,
}) => {
  const vault = [
    {
      icon: "ethereum.svg",
      pair_name: "ETH",
      apy_percent: "3 - 13",
      tvl_usd: ``,
      lock_time: "No lock",
      top_pick: true,
      new_badge: false,
      link: "https://vault.dyp.finance/vault-weth",
    },
    {
      icon: "wbtc.svg",
      pair_name: "WBTC",
      apy_percent: "3 - 13",
      tvl_usd: ``,
      lock_time: "No lock",
      link: "https://vault.dyp.finance/vault-wbtc",
    },
    {
      icon: "usdc.svg",
      pair_name: "USDC",
      apy_percent: "8 - 22",
      tvl_usd: ``,
      lock_time: "No lock",
      new_badge: false,
      top_pick: false,
      link: "https://vault.dyp.finance/vault-usdc",
    },
    {
      icon: "usdt.svg",
      pair_name: "USDT",
      apy_percent: "9 - 23",
      tvl_usd: ``,
      lock_time: "No lock",
      new_badge: false,
      top_pick: false,
      link: "https://vault.dyp.finance/vault-usdt",
    },
    {
      icon: "dai.svg",
      pair_name: "DAI",
      apy_percent: "8 - 21",
      tvl_usd: ``,
      lock_time: "No lock",
      new_badge: false,
      top_pick: false,
      link: "https://vault.dyp.finance/vault-dai",
    },
  ];

  const [farmingItem, setFarming] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [topPools, setTopPools] = useState([]);
  const [activePools, setActivePools] = useState([]);
  const [expiredDYPPools, setExpiredPools] = useState([]);
  const [listing, setListing] = useState(listType);
  const [cawsCard, setCawsCard] = useState([]);
  const [cawsCard2, setCawsCard2] = useState([]);
  const [tvlTotal, setTvlTotal] = useState();

  var farming = [];

  const fetchEthStaking = async () => {
    await axios
      .get(`https://api.dyp.finance/api/get_staking_info_eth`)
      .then((res) => {
        const dypIdyp = res.data.stakingInfoDYPEth.concat(
          res.data.stakingInfoiDYPEth
        );

        const expiredEth = dypIdyp.filter((item) => {
          return item.expired !== "No";
        });
        const activeEth = dypIdyp.filter((item) => {
          return item.expired !== "Yes";
        });
        const sortedActive = activeEth.sort(function (a, b) {
          return b.tvl_usd - a.tvl_usd;
        });
        const sortedExpired = expiredEth.sort(function (a, b) {
          return b.tvl_usd - a.tvl_usd;
        });

        setActivePools(sortedActive);
        setExpiredPools(sortedExpired);
        setTopPools(dypIdyp);
        setCawsCard(res.data.stakingInfoCAWS);
        setCawsCard2(res.data.stakingInfoCAWS[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchBnbStaking = async () => {
    await axios
      .get(`https://api.dyp.finance/api/get_staking_info_bnb`)
      .then((res) => {
        const dypIdypBnb = res.data.stakingInfoDYPBnb.concat(
          res.data.stakingInfoiDYPBnb
        );

        const expiredBnb = dypIdypBnb.filter((item) => {
          return item.expired !== "No";
        });
        const activeBnb = dypIdypBnb.filter((item) => {
          return item.expired !== "Yes";
        });
        const sortedActive = activeBnb.sort(function (a, b) {
          return b.tvl_usd - a.tvl_usd;
        });
        const sortedExpired = expiredBnb.sort(function (a, b) {
          return b.tvl_usd - a.tvl_usd;
        });

        setActivePools(sortedActive);
        setExpiredPools(sortedExpired);
        setTopPools(dypIdypBnb);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchAvaxStaking = async () => {
    await axios
      .get(`https://api.dyp.finance/api/get_staking_info_avax`)
      .then((res) => {
        const dypIdypAvax = res.data.stakingInfoDYPAvax.concat(
          res.data.stakingInfoiDYPAvax
        );

        const expiredAvax = dypIdypAvax.filter((item) => {
          return item.expired !== "No";
        });

        const activeAvax = dypIdypAvax.filter((item) => {
          return item.expired !== "Yes";
        });

        const sortedActive = activeAvax.sort(function (a, b) {
          return b.tvl_usd - a.tvl_usd;
        });
        const sortedExpired = expiredAvax.sort(function (a, b) {
          return b.tvl_usd - a.tvl_usd;
        });

        setActivePools(sortedActive);
        setExpiredPools(sortedExpired);
        setTopPools(dypIdypAvax);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchEthBuyback = async () => {
    await axios
      .get(`https://api.dyp.finance/api/get_buyback_info_eth`)
      .then((res) => {
        setTopPools(res.data.BuybackETHInfo);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchBnbBuyback = async () => {
    await axios
      .get(`https://api.dyp.finance/api/get_buyback_info_bnb`)
      .then((res) => {
        setTopPools(res.data.BuybackBNBInfo);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchAvaxBuyback = async () => {
    await axios
      .get(`https://api.dyp.finance/api/get_buyback_info_avax`)
      .then((res) => {
        setTopPools(res.data.BuybackAVAXInfo);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchEthFarming = async () => {
    await axios
      .get("https://api.dyp.finance/api/the_graph_eth_v2")
      .then((res) => {
        let temparray = Object.entries(res.data.the_graph_eth_v2.lp_data);
        // let farming = [];
        temparray.map((item) => {
          farming.push(item[1]);
        });

        const expiredFarmingEth = farming.filter((item) => {
          return item.expired !== "No";
        });
        const activeFarmingEth = farming.filter((item) => {
          return item.expired !== "Yes";
        });

        const sortedActive = activeFarmingEth.sort(function (a, b) {
          return b.tvl_usd - a.tvl_usd;
        });
        const sortedExpired = expiredFarmingEth.sort(function (a, b) {
          return b.tvl_usd - a.tvl_usd;
        });

        setActivePools(sortedActive);
        setExpiredPools(sortedExpired);
        setFarming(farming);
      })
      .catch((err) => console.error(err));
  };
  const fetchBscFarming = async () => {
    await axios
      .get("https://api.dyp.finance/api/the_graph_bsc_v2")
      .then((res) => {
        let temparray = Object.entries(res.data.the_graph_bsc_v2.lp_data);
        // let farming = [];
        temparray.map((item) => {
          farming.push(item[1]);
        });
        const expiredFarmingBsc = farming.filter((item) => {
          return item.expired !== "No";
        });
        const activeFarmingBsc = farming.filter((item) => {
          return item.expired !== "Yes";
        });

        const sortedActive = activeFarmingBsc.sort(function (a, b) {
          return b.tvl_usd - a.tvl_usd;
        });
        const sortedExpired = expiredFarmingBsc.sort(function (a, b) {
          return b.tvl_usd - a.tvl_usd;
        });

        setActivePools(sortedActive);
        setExpiredPools(sortedExpired);
      })
      .catch((err) => console.error(err));
  };
  const fetchAvaxFarming = async () => {
    await axios
      .get("https://api.dyp.finance/api/the_graph_avax_v2")
      .then((res) => {
        let temparray = Object.entries(res.data.the_graph_avax_v2.lp_data);
        // let farming = [];
        temparray.map((item) => {
          farming.push(item[1]);
        });
        const expiredFarmingAvax = farming.filter((item) => {
          return item.expired !== "No";
        });
        const activeFarmingAvax = farming.filter((item) => {
          return item.expired !== "Yes";
        });

        const sortedActive = activeFarmingAvax.sort(function (a, b) {
          return b.tvl_usd - a.tvl_usd;
        });
        const sortedExpired = expiredFarmingAvax.sort(function (a, b) {
          return b.tvl_usd - a.tvl_usd;
        });

        setActivePools(sortedActive);
        setExpiredPools(sortedExpired);
      })
      .catch((err) => console.error(err));
  };

  const [customPool, setCustomPool] = useState(pool);
  const [filteredPools, setFilteredPools] = useState([]);
  const [unfilteredPools, setUnfilteredPools] = useState([]);
  const [activeCard, setActiveCard] = useState();
  const [activeCardNFT, setActiveCardNFT] = useState();
  const [activeCard2, setActiveCard2] = useState();
  const [activeCard3, setActiveCard3] = useState();
  const [activeCard4, setActiveCard4] = useState();
  const [activeCard5, setActiveCard5] = useState();
  const [activeCard6, setActiveCard6] = useState();
  const [activeCard7, setActiveCard7] = useState();
  const [activeCard8, setActiveCard8] = useState();
  const [activeCard9, setActiveCard9] = useState();
  const [activeCard10, setActiveCard10] = useState();
  const [activeCard11, setActiveCard11] = useState();
  const [activeCard12, setActiveCard12] = useState();
  const [cardIndex, setcardIndex] = useState(0);
  const [cardIndexiDyp, setcardIndexiDyp] = useState(0);
  const [cardIndexavax30, setcardIndexavax30] = useState(0);
  const [cardIndexavaxiDyp, setcardIndexavaxiDyp] = useState(0);
  const [details, setDetails] = useState(0);
  const windowSize = useWindowSize();

  const eth_address = "ETH";
  const wbnb_address = "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7";
  const wbsc_address = "0x2170Ed0880ac9A755fd29B2688956BD959F933F8";

  const avax_address = "AVAX";

  const { rebase_factors, rebase_factorsavax, rebase_factorsbsc } = window;

  const stakeArray = [
    window.farming_new_4,
    window.farming_new_3,
    window.farming_new_1,
    window.farming_new_2,
    window.farming_new_5,
  ];

  const constantArray = [
    window.constant_staking_new8,
    window.constant_staking_new7,
    window.constant_staking_new5,
    window.constant_staking_new6,
    window.constant_staking_new9,
  ];

  const feeArray = [0.8, 0.4, 0.3, 0.3, 1.2];

  const stakeArrayiDYPActive = [
    window.constant_staking_idyp_3,
    window.constant_staking_idyp_4,
  ];

  const withdrawFeeiDyp = [1, 0, 0, 0];

  const lockarrayFarm = ["No Lock", 3, 30, 60, 90];

  const StakingNew1 = initStakingNew({
    token: window.token_new,
    finalApr: expiredDYPPools[cardIndex]?.apy_percent,
    staking: stakeArray[cardIndex],
    chainId: chainId,
    constant: constantArray[cardIndex],
    liquidity: eth_address,
    lp_symbol: "USD",
    reward: "30,000",
    lock: "3 Days",
    rebase_factor: rebase_factors[0],
    expiration_time: "14 December 2022",
    fee: feeArray[cardIndex],
    handleConnection: handleConnection,
    lockTime: lockarrayFarm[cardIndex],
    listType: listType,
    handleSwitchNetwork: handleSwitchNetwork,
  });

  const bscFarmArrayStake = [
    window.farming_newbsc_2,
    window.farming_newbsc_5,
    window.farming_newbsc_1,
    window.farming_newbsc_4,
    window.farming_newbsc_3,
  ];
  const bscFarmArrayConst = [
    window.constant_stakingnewbsc_new6,
    window.constant_stakingnewbsc_new9,
    window.constant_stakingnewbsc_new5,
    window.constant_stakingnewbsc_new8,
    window.constant_stakingnewbsc_new7,
  ];
  const bscFarmArrayFee = [0.3, 1.2, 0.3, 0.8, 0.4];
  const lockarrayFarmbsc = ["No Lock", 3, 30, 60, 90];

  const BscFarming = initBscFarming({
    staking: bscFarmArrayStake[cardIndex],
    token: window.token_newbsc,
    chainId: chainId,
    constant: bscFarmArrayConst[cardIndex],
    liquidity: wbsc_address,
    lp_symbol: "USD",
    reward: "30,000",
    lock: "3 Days",
    rebase_factor: rebase_factorsbsc[0],
    expiration_time: "19 November 2022",
    fee: bscFarmArrayFee[cardIndex],
    handleConnection: handleConnection,
    finalApr: expiredDYPPools[cardIndex]?.apy_percent,
    lockTime: lockarrayFarmbsc[cardIndex],
    listType: listType,
    handleSwitchNetwork: handleSwitchNetwork,
  });

  const lockarrayFarmAvax = ["No Lock", 3, 30, 60, 90];
  const feearrayFarmAvax = [0.3, 0.3, 1.2, 0.4, 0.8];

  const constantArrayFarmAvax = [
    window.constant_staking_newavax6,
    window.constant_staking_newavax5,
    window.constant_staking_newavax9,
    window.constant_staking_newavax7,
    window.constant_staking_newavax8,
  ];

  const stakeArrayFarmAvax = [
    window.farming_newavax_2,
    window.farming_newavax_1,
    window.farming_newavax_5,
    window.farming_newavax_3,
    window.farming_newavax_4,
  ];

  const { LP_IDs_V2Avax, LP_IDs_V2BNB } = window;

  const LP_IDAVAX_Array = [
    LP_IDs_V2Avax.wavax[1],
    LP_IDs_V2Avax.wavax[0],
    LP_IDs_V2Avax.wavax[4],
    LP_IDs_V2Avax.wavax[2],
    LP_IDs_V2Avax.wavax[3],
  ];

  const LP_IDBNB_Array = [
    LP_IDs_V2BNB.wbnb[1],
    LP_IDs_V2BNB.wbnb[4],
    LP_IDs_V2BNB.wbnb[0],
    LP_IDs_V2BNB.wbnb[3],
    LP_IDs_V2BNB.wbnb[2],
  ];

  const FarmAvax = initFarmAvax({
    token: window.token_newavax,
    staking: stakeArrayFarmAvax[cardIndex],
    constant: constantArrayFarmAvax[cardIndex],
    liquidity: wbnb_address,
    lp_symbol: "USD",
    reward: "30,000",
    lock: lockarrayFarmAvax[cardIndex],
    rebase_factor: rebase_factorsavax[0],
    expiration_time: "6 December 2022",
    fee: feearrayFarmAvax[cardIndex],
    coinbase: coinbase,
    lockTime: lockarrayFarmAvax[cardIndex],
    chainId: chainId,
    listType: listType,
    finalApr: expiredDYPPools[cardIndex]?.apy_percent,
    handleSwitchNetwork: handleSwitchNetwork,
  });

  //Buyback New

  const expirearrayStakeAvax = ["14 July 2023", "05 August 2023"];

  //constant_staking_new3
  const stakingarrayStakeAvax = [
    window.constant_staking_new10,
    window.constant_staking_new11,
  ];

  const StakeAvax = stakeAvax({
    staking: stakingarrayStakeAvax[cardIndex],
    apr:
      expiredPools === false
        ? activePools[cardIndex]?.apy_percent
        : expiredDYPPools[cardIndex]?.apy_percent,
    liquidity: avax_address,
    expiration_time: expirearrayStakeAvax[cardIndex],
    finalApr:
      expiredPools === false
        ? activePools[cardIndex]?.apy_performancefee
        : expiredDYPPools[cardIndex]?.apy_performancefee,
    fee:
      expiredPools === false
        ? activePools[cardIndex]?.performancefee
        : expiredDYPPools[cardIndex]?.performancefee,
    coinbase: coinbase,
    chainId: chainId,
    referrer: referrer,
    lockTime:
      cardIndex !== undefined
        ? expiredPools === false
          ? activePools[cardIndex]?.lock_time?.split(" ")[0] === "No"
            ? "No Lock"
            : activePools[cardIndex]?.lock_time?.split(" ")[0]
          : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] === "No"
          ? "No Lock"
          : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
        : "No Lock",
    listType: listType,
    handleSwitchNetwork: handleSwitchNetwork,
  });

  const expirearrayStakeBscExpired = ["17 November 2022", "17 November 2022"];

  const stakearrayStakeBscDyp2 = [
    window.constant_stakingbsc_new10,
    window.constant_stakingbsc_new11,
  ];

  const expirearrayStakeBscDyp2 = ["14 July 2023", "5 August 2023"];

  const stakearrayStakeBscExpired = [
    window.constant_stakingbsc_new13,
    window.constant_stakingbsc_new12,
  ];

  const stakearrayStakeBsciDyp2 = [
    window.constant_stakingidyp_6,
    window.constant_stakingidyp_5,
  ];

  const stakearrayStakeBsciDyp2Expired = [
    window.constant_stakingidyp_2,
    window.constant_stakingidyp_1,
  ];

  const expirearrayStakeBsciDyp2 = ["15 August 2023", "15 August 2023"];
  const expirearrayStakeBsciDyp2Expired = [
    "28 February 2023",
    "28 February 2023",
  ];

  const stakingarrayStakeAvax30 = [
    window.constant_staking_newavax2,
    window.constant_staking_newavax1,
  ];

  const StakeAvax30 = stakeAvax30({
    staking: stakingarrayStakeAvax30[cardIndex === 0 ? 0 : 1],
    apr: expiredDYPPools[cardIndex]?.apy_percent,
    liquidity: avax_address,
    expiration_time: "6 December 2022",
    finalApr: expiredDYPPools[cardIndex]?.apy_performancefee,
    fee: expiredDYPPools[cardIndex]?.performancefee,
    coinbase: coinbase,
    chainId: chainId,
    lockTime:
      expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] === "No"
        ? "No Lock"
        : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0],
    listType: listType,
    handleSwitchNetwork: handleSwitchNetwork,
  });

  const feeUarrayStakeAvaxiDyp = [0, 0.25, 0, 0.25];

  const expirearrayStakeAvaxiDyp = [
    "15 August 2023",
    "15 August 2023",
    "28 February 2023",
    "28 February 2023",
    "28 February 2023",
  ];

  const stakingarrayStakeAvaxiDypActive = [
    window.constant_staking_idypavax_6,
    window.constant_staking_idypavax_5,
  ];

  const stakingarrayStakeAvaxiDypExpired = [
    window.constant_staking_idypavax_2,
    window.constant_staking_idypavax_1,
  ];

  const stakeArrayStakeNew = [
    window.constant_staking_new2,
    window.constant_staking_new1,
  ];

  const stakeArrayiDYP = [
    window.constant_staking_idyp_2,
    window.constant_staking_idyp_1,
  ];

  const expirationArray = [
    "28 February 2023",
    "28 February 2023",
    "15 August 2023",
    "15 August 2023",
  ];

  const ConstantStakingiDYP1 = initConstantStakingiDYP({
    staking: stakeArrayiDYP[cardIndex - 2],
    finalApr:
      expiredPools === false
        ? activePools[cardIndex]?.apy_performancefee
        : expiredDYPPools[cardIndex]?.apy_performancefee,
    apr:
      expiredPools === false
        ? activePools[cardIndex]?.apy_percent
        : expiredDYPPools[cardIndex]?.apy_percent,
    liquidity: eth_address,
    expiration_time: expirationArray[cardIndex - 2],
    other_info:
      cardIndex !== undefined
        ? expiredPools === false
          ? activePools[cardIndex]?.expired === "Yes"
            ? true
            : false
          : expiredDYPPools[cardIndex]?.expired === "Yes"
          ? true
          : false
        : false,
    fee_s:
      expiredPools === false
        ? activePools[cardIndex]?.performancefee
        : expiredDYPPools[cardIndex]?.performancefee,
    fee_u: withdrawFeeiDyp[cardIndex - 2],
    coinbase: coinbase,
    handleConnection: handleConnection,
    chainId: chainId,
    lockTime:
      cardIndex !== undefined
        ? expiredPools === false
          ? activePools[cardIndex]?.lock_time?.split(" ")[0] === "No"
            ? "No Lock"
            : activePools[cardIndex]?.lock_time?.split(" ")[0]
          : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] === "No"
          ? "No Lock"
          : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
        : "No Lock",
    listType: listType,
    handleSwitchNetwork: handleSwitchNetwork,
  });

  // const ConstantStakingiDYP1Active = initConstantStakingiDYP();

  const vaultArray = [
    window.vault_weth,
    window.vault_wbtc,
    window.vault_usdc,
    window.vault_usdt,
    window.vault_dai,
  ];
  const tokenvaultArray = [
    window.token_weth,
    window.token_wbtc,
    window.token_usdc,
    window.token_usdt,
    window.token_dai,
  ];
  const vaultplatformArray = [10, 10, 15, 15, 15];
  const vaultdecimalsArray = [18, 8, 6, 6, 18];
  const vaultsymbolArray = ["WETH", "WBTC", "USDC", "USDT", "DAI"];
  const locktimeFarm = ["No Lock", "3 Days", "30 Days", "60 Days", "90 Days"];

  useEffect(() => {
    setActiveCard();
    if (topList === "Staking") {
      setTopPools([]);
      if (chain === "avax") {
        setTimeout(() => {
          fetchAvaxStaking();
        }, 500);
      }
      if (chain === "eth") {
        setTimeout(() => {
          // setTopPools(stake);
          fetchEthStaking();
        }, 500);
      }

      if (chain === "bnb") {
        setTimeout(() => {
          // setTopPools(stakebsc);
          fetchBnbStaking();
        }, 500);
      }
    } else if (topList === "Buyback") {
      setTopPools([]);
      if (chain === "bnb") {
        setTimeout(() => {
          // setTopPools(buyback);
          fetchBnbBuyback();
        }, 500);
      }

      if (chain === "eth") {
        setTimeout(() => {
          // setTopPools(buyback);
          fetchEthBuyback();
        }, 500);
      }
      if (chain === "avax") {
        setTimeout(() => {
          fetchAvaxBuyback();
        }, 500);
      }
    } else if (topList === "Vault" && chainId === "1") {
      setTopPools([]);

      setTimeout(() => {
        setTopPools(vault);
        setActivePools(vault);
        setExpiredPools([]);
      }, 500);
    } else if (topList === "Vault" && chainId !== "1") {
      setTopPools([]);
      setTimeout(() => {
        setTopPools([]);
        setActivePools([]);
        setExpiredPools([]);
      }, 500);
    } else if (topList === "Farming") {
      setTopPools([]);
      setTimeout(() => {
        setTopPools(farming);
      }, 500);
    }

    if (customPool !== null) {
      if (routeOption === "Staking" && chain === "eth") {
        setDetails(0);
        setActiveCard(topPools[0]);
        handleCardIndexStake(0);
        handleCardIndexStake30(0);
        handleCardIndexStakeiDyp(0);
      } else if (routeOption === "Staking" && chain === "bnb") {
        setDetails(1);
        setActiveCard(topPools[1]);
        handleCardIndexStake(1);
        handleCardIndexStake30(1);
        handleCardIndexStakeiDyp(1);
      } else if (routeOption === "Staking" && chain === "avax") {
        setDetails(2);
        setActiveCard(topPools[2]);
        handleCardIndexStake(2);
        handleCardIndexStake30(2);
        handleCardIndexStakeiDyp(2);
      } else if (routeOption === "BuyBack" && chain === "eth") {
        setDetails(1);
        setActiveCard(topPools[1]);
        handleCardIndexStake(1);
        handleCardIndexStake30(1);
        handleCardIndexStakeiDyp(1);
      } else if (routeOption === "BuyBack" && chain === "bnb") {
        setDetails(0);
        setActiveCard(topPools[0]);
        handleCardIndexStake(0);
        handleCardIndexStake30(0);
        handleCardIndexStakeiDyp(0);
      } else if (routeOption === "BuyBack" && chain === "avax") {
        setDetails(0);
        setActiveCard(topPools[0]);
        handleCardIndexStake(0);
        handleCardIndexStake30(0);
        handleCardIndexStakeiDyp(0);
      } else if (routeOption === "Vault" && customChain === "eth") {
        setDetails(0);
        setActiveCard(topPools[0]);
        handleCardIndexStake(0);
        handleCardIndexStake30(0);
        handleCardIndexStakeiDyp(0);
      } else if (routeOption === "Vault" && customChain === "bnb") {
        setDetails(2);
        setActiveCard(topPools[2]);
        handleCardIndexStake(2);
        handleCardIndexStake30(2);
        handleCardIndexStakeiDyp(2);
      } else if (routeOption === "Vault" && customChain === "avax") {
        setDetails(3);
        setActiveCard2(topPools[3]);
        handleCardIndexStake(3);
        handleCardIndexStake30(3);
        handleCardIndexStakeiDyp(3);
      } else if (routeOption === "Farming" && chain === "eth") {
        setDetails(4);
        setActiveCard2(topPools[4]);
        handleCardIndexStake(4);
        handleCardIndexStake30(4);
        handleCardIndexStakeiDyp(4);
      } else if (routeOption === "Farming" && chain === "bnb") {
        setDetails(3);
        setActiveCard2(topPools[3]);
        handleCardIndexStake(3);
        handleCardIndexStake30(3);
        handleCardIndexStakeiDyp(3);
      } else if (routeOption === "Farming" && chain === "avax") {
        setDetails(4);
        setActiveCard2(topPools[4]);
        handleCardIndexStake(4);
        handleCardIndexStake30(4);
        handleCardIndexStakeiDyp(4);
      }
    } else {
      setDetails();
      setActiveCard(null);
    }

    setCustomPool(null);

    if (chain === "eth") {
      fetchEthFarming();
    } else if (chain === "bnb") {
      fetchBscFarming();
    } else if (chain === "avax") {
      fetchAvaxFarming();
    }
    setShowDetails(false);
    setListing(listType);
  }, [topList, listType, chain, expiredPools]);

  const handleCardIndexStake = (index) => {
    if (topList === "Staking") {
      if (index >= 3) {
        const newIndex = index - 3;
        setcardIndexiDyp(newIndex);
        setcardIndex(index);
      } else setcardIndex(index);
    } else setcardIndex(index);
  };

  const handleCardIndexStake30 = (index) => {
    if (topList === "Staking" && chain === "avax") {
      if (index >= 2) {
        const newIndex = index - 2;
        setcardIndexavax30(newIndex);
        setcardIndex(index);
      } else setcardIndex(index);
    } else setcardIndex(index);
  };

  const handleCardIndexStakeiDyp = (index) => {
    if (topList === "Staking" && chain === "avax") {
      if (index >= 2) {
        const newIndex = index - 2;
        setcardIndexavaxiDyp(newIndex);
        setcardIndex(index);
      } else setcardIndex(index);
    } else setcardIndex(index);
  };

  
  return topPools.length > 0 && expiredPools === false ? (
    <div className={`row w-100 justify-content-center gap-4`}>
      {expiredPools === false ? (
        <>
          {listing === "table" ? (
            windowSize.width > 1300 ? (
              <div className="px-0">
                <>
                  <div className="top-picks-container">
                    {topList === "Staking" && chain === "eth" && (
                      <CawsCard
                        onShowDetailsClick={() => {
                          setActiveCardNFT(true);
                          setActiveCard(null);
                          setActiveCard2(null);
                          setActiveCard3(null);
                          setActiveCard4(null);
                          setDetails();
                        }}
                        onHideDetailsClick={() => {
                          setActiveCardNFT(false);
                          setDetails();
                        }}
                        cardType={topList}
                        details={activeCardNFT === true ? true : false}
                        listType={listType}
                        tvl={"$" + getFormattedNumber(cawsCard2.tvl_usd)}
                      />
                    )}

                    {activePools.slice(0, 3).map((pool, index) => (
                      <TopPoolsCard
                        key={index}
                        chain={chain}
                        top_pick={pool.top_pick}
                        tokenName={pool.pair_name}
                        apr={pool.apy_percent + "%"}
                        tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                        lockTime={
                          pool.lock_time ? pool.lock_time : locktimeFarm[index]
                        }
                        tokenLogo={
                          pool.icon
                            ? pool.icon
                            : pool.pair_name === "DYP"
                            ? "dyplogo.svg"
                            : "idypius.svg"
                        }
                        onShowDetailsClick={() => {
                          setActiveCard(topPools[index]);
                          setActiveCard2(null);
                          setActiveCard3(null);
                          setActiveCard4(null);
                          setActiveCardNFT(false);
                          handleCardIndexStake(index);
                          handleCardIndexStake30(index);
                          handleCardIndexStakeiDyp(index);
                          setDetails(index);
                        }}
                        onHideDetailsClick={() => {
                          setActiveCard(null);
                          setDetails();
                        }}
                        cardType={topList}
                        details={details === index ? true : false}
                        isNewPool={pool.isNewPool}
                        isStaked={pool.isStaked}
                        expired={false}
                      />
                    ))}
                  </div>
                  {activeCardNFT && (
                    <CawsDetails
                      coinbase={coinbase}
                      isConnected={isConnected}
                      listType={listType}
                      chainId={chainId}
                      handleSwitchNetwork={handleSwitchNetwork}
                      handleConnection={handleConnection}
                    />
                  )}

                  {activeCard && topList === "Farming" ? (
                    chain === "eth" ? (
                      <StakingNew1
                        is_wallet_connected={isConnected}
                        coinbase={coinbase}
                        the_graph_result={the_graph_result}
                        lp_id={lp_id[cardIndex]}
                        chainId={chainId}
                        handleConnection={handleConnection}
                        expired={false}
                        handleSwitchNetwork={handleSwitchNetwork}
                      />
                    ) : chain === "bnb" ? (
                      <BscFarming
                        is_wallet_connected={isConnected}
                        coinbase={coinbase}
                        the_graph_result={the_graph_resultbsc}
                        lp_id={LP_IDBNB_Array[cardIndex]}
                        chainId={chainId}
                        handleConnection={handleConnection}
                        expired={false}
                        handleSwitchNetwork={handleSwitchNetwork}
                      />
                    ) : (
                      <FarmAvax
                        is_wallet_connected={isConnected}
                        handleConnection={handleConnection}
                        the_graph_result={the_graph_resultavax}
                        lp_id={LP_IDAVAX_Array[cardIndex]}
                        chainId={chainId}
                        coinbase={coinbase}
                        handleSwitchNetwork={handleSwitchNetwork}
                        expired={false}
                      />
                    )
                  ) : activeCard &&
                    topList === "Staking" &&
                    cardIndex < 2 &&
                    chain === "bnb" ? (
                    <StakeBsc
                      lp_id={LP_IDBNB_Array[cardIndex]}
                      staking={stakearrayStakeBscDyp2[cardIndex]}
                      apr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_percent
                          : expiredDYPPools[cardIndex]?.apy_percent
                      }
                      liquidity={wbsc_address}
                      expiration_time={expirearrayStakeBscDyp2[cardIndex]}
                      finalApr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_performancefee
                          : expiredDYPPools[cardIndex]?.apy_performancefee
                      }
                      fee={
                        expiredPools === false
                          ? activePools[cardIndex]?.performancefee
                          : expiredDYPPools[cardIndex]?.performancefee
                      }
                      lockTime={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                              ? "No Lock"
                              : parseInt(
                                  activePools[cardIndex]?.lock_time?.split(
                                    " "
                                  )[0]
                                )
                            : expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                            ? "No Lock"
                            : parseInt(
                                expiredDYPPools[cardIndex]?.lock_time?.split(
                                  " "
                                )[0]
                              )
                          : "No Lock"
                      }
                      listType={listType}
                      other_info={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.expired === "Yes"
                              ? true
                              : false
                            : expiredDYPPools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : false
                      }
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_resultbsc}
                      chainId={chainId}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      referrer={referrer}
                    />
                  ) : activeCard &&
                    cardIndex === 0  &&
                    topList === "Staking" &&
                    chain === "eth" ? (
                    <InitConstantStakingiDYP
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_result}
                      lp_id={lp_id[cardIndex]}
                      chainId={chainId}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      staking={stakeArrayiDYPActive[cardIndex]}
                      listType={listType}
                      finalApr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_performancefee
                          : expiredDYPPools[cardIndex]?.apy_performancefee
                      }
                      apr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_percent
                          : expiredDYPPools[cardIndex]?.apy_percent
                      }
                      liquidity={eth_address}
                      expiration_time={expirationArray[cardIndex]}
                      other_info={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.expired === "Yes"
                              ? true
                              : false
                            : expiredDYPPools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : false
                      }
                      fee_s={
                        expiredPools === false
                          ? activePools[cardIndex]?.performancefee
                          : expiredDYPPools[cardIndex]?.performancefee
                      }
                      fee_u={withdrawFeeiDyp[cardIndex]}
                      lockTime={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                              ? "No Lock"
                              : activePools[cardIndex]?.lock_time?.split(" ")[0]
                            : expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                            ? "No Lock"
                            : expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0]
                          : "No Lock"
                      }
                    />
                  ) : activeCard && cardIndex === 1 && topList === "Staking" && chain === 'eth'
                  ? (
                    <StakeEth
                    staking={window.constant_staking_new3}
                    apr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_percent
                        : expiredDYPPools[cardIndex]?.apy_percent
                    }
                    liquidity={eth_address}
                    expiration_time={"14 December 2022"}
                    finalApr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_performancefee
                        : expiredDYPPools[cardIndex]?.apy_performancefee
                    }
                    fee={
                      expiredPools
                        ? expiredPools[cardIndex - 1]?.performancefee
                        : 0
                    }
                    lockTime={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                            "No"
                            ? "No Lock"
                            : activePools[cardIndex]?.lock_time?.split(" ")[0]
                          : expiredDYPPools[cardIndex]?.lock_time?.split(
                              " "
                            )[0] === "No"
                          ? "No Lock"
                          : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                        : "No Lock"
                    }
                    lp_id={LP_IDBNB_Array[cardIndex]}
                    listType={listType}
                    other_info={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : expiredDYPPools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : false
                    }
                    fee={
                      expiredPools === false
                        ? activePools[cardIndex]?.performancefee
                        : expiredDYPPools[cardIndex]?.performancefee
                    }
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_result}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={false}
                    referrer={referrer}
                  />

                  ) : activeCard &&
                    cardIndex >= 2 &&
                    topList === "Staking" &&
                    chain === "bnb" ? (
                    <StakeBscIDyp
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_resultbsc}
                      chainId={chainId}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      staking={
                        expiredPools === false
                          ? stakearrayStakeBsciDyp2[cardIndex - 2]
                          : stakearrayStakeBsciDyp2Expired[cardIndex - 3]
                      }
                      listType={listType}
                      finalApr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_performancefee
                          : expiredDYPPools[cardIndex]?.apy_performancefee
                      }
                      apr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_percent
                          : expiredDYPPools[cardIndex]?.apy_percent
                      }
                      liquidity={wbsc_address}
                      expiration_time={
                        expiredPools === false
                          ? expirearrayStakeBsciDyp2[cardIndex - 2]
                          : expirearrayStakeBsciDyp2Expired[cardIndex - 3]
                      }
                      other_info={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.expired === "Yes"
                              ? true
                              : false
                            : expiredDYPPools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : false
                      }
                      fee_s={
                        expiredPools === false
                          ? activePools[cardIndex]?.performancefee
                          : expiredDYPPools[cardIndex]?.performancefee
                      }
                      fee_u={0}
                      lockTime={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                              ? "No Lock"
                              : parseInt(
                                  activePools[cardIndex]?.lock_time?.split(
                                    " "
                                  )[0]
                                )
                            : expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                            ? "No Lock"
                            : parseInt(
                                expiredDYPPools[cardIndex]?.lock_time?.split(
                                  " "
                                )[0]
                              )
                          : "No Lock"
                      }
                    />
                  ) : activeCard &&
                    topList === "Staking" &&
                    chain === "avax" &&
                    cardIndex < 2 ? (
                    <StakeAvax
                      is_wallet_connected={isConnected}
                      handleConnection={handleConnection}
                      the_graph_result={the_graph_resultavax}
                      chainId={chainId}
                      coinbase={coinbase}
                      referrer={referrer}
                      expired={false}
                      handleSwitchNetwork={handleSwitchNetwork}
                    />
                  ) : activeCard &&
                    topList === "Staking" &&
                    chain === "avax" &&
                    cardIndex >= 2 ? (
                    <StakeAvaxIDyp
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_resultavax}
                      chainId={chainId}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      staking={
                        expiredPools === false
                          ? stakingarrayStakeAvaxiDypActive[cardIndex - 2]
                          : stakingarrayStakeAvaxiDypExpired[cardIndex - 3]
                      }
                      listType={listType}
                      finalApr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_performancefee
                          : expiredDYPPools[cardIndex]?.apy_performancefee
                      }
                      apr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_percent
                          : expiredDYPPools[cardIndex]?.apy_percent
                      }
                      liquidity={avax_address}
                      expiration_time={expirearrayStakeAvaxiDyp[cardIndex]}
                      other_info={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.expired === "Yes"
                              ? true
                              : false
                            : expiredDYPPools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : false
                      }
                      fee_s={
                        expiredPools === false
                          ? activePools[cardIndex]?.performancefee
                          : expiredDYPPools[cardIndex]?.performancefee
                      }
                      fee_u={feeUarrayStakeAvaxiDyp[cardIndexavaxiDyp - 3]}
                      lockTime={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                              ? "No Lock"
                              : activePools[cardIndex]?.lock_time?.split(" ")[0]
                            : expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                            ? "No Lock"
                            : expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0]
                          : "No Lock"
                      }
                    />
                  ) : activeCard && topList === "Vault" && chain === "eth" ? (
                    <Vault
                      vault={vaultArray[cardIndex]}
                      token={tokenvaultArray[cardIndex]}
                      platformTokenApyPercent={vaultplatformArray[cardIndex]}
                      UNDERLYING_DECIMALS={vaultdecimalsArray[cardIndex]}
                      UNDERLYING_SYMBOL={vaultsymbolArray[cardIndex]}
                      expiration_time={"04 March 2023"}
                      coinbase={coinbase}
                      lockTime={"No Lock"}
                      handleConnection={handleConnection}
                      chainId={chainId}
                      listType={listType}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      isConnected={isConnected}
                      the_graph_result={the_graph_result}
                    />
                  ) : (
                    <></>
                  )}
                </>
                <div
                  className="top-picks-container"
                  style={{ marginTop: "25px" }}
                >
                  {activePools.slice(3, 6).map((pool, index) => (
                    <TopPoolsCard
                      display={
                        pool.expired
                          ? pool.expired === "Yes"
                            ? "none"
                            : ""
                          : ""
                      }
                      key={index}
                      chain={chain}
                      top_pick={pool.top_pick}
                      tokenName={
                        pool.tokenName
                          ? pool.tokenName
                          : pool.pair_name
                          ? pool.pair_name
                          : ""
                      }
                      apr={
                        pool.apy_percent
                          ? pool.apy_percent + "%"
                          : pool.apy + "%"
                      }
                      tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                      lockTime={
                        pool.lock_time
                          ? pool.lock_time
                          : locktimeFarm[index + 3]
                      }
                      tokenLogo={
                        pool.icon
                          ? pool.icon
                          : pool.pair_name === "DYP"
                          ? "dyplogo.svg"
                          : "idypius.svg"
                      }
                      onShowDetailsClick={() => {
                        setActiveCard(null);
                        setActiveCard2(topPools[index + 3]);
                        setActiveCard3(null);
                        setActiveCardNFT(false);
                        handleCardIndexStake(index + 3);
                        handleCardIndexStake30(index + 3);
                        handleCardIndexStakeiDyp(index + 3);
                        setDetails(index + 3);
                      }}
                      onHideDetailsClick={() => {
                        setActiveCard2(null);
                        setDetails();
                      }}
                      cardType={topList}
                      details={details === index + 3 ? true : false}
                      isNewPool={pool.isNewPool}
                      isStaked={pool.isStaked}
                      expired={false}
                    />
                  ))}
                </div>
                {activeCard2 &&
                topList === "Staking" &&
                cardIndex < 2 &&
                chain === "bnb" ? (
                  <StakeBsc
                    lp_id={LP_IDBNB_Array[cardIndex]}
                    staking={stakearrayStakeBscDyp2[cardIndex]}
                    apr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_percent
                        : expiredDYPPools[cardIndex]?.apy_percent
                    }
                    liquidity={wbsc_address}
                    expiration_time={expirearrayStakeBscDyp2[cardIndex]}
                    finalApr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_performancefee
                        : expiredDYPPools[cardIndex]?.apy_performancefee
                    }
                    fee={
                      expiredPools === false
                        ? activePools[cardIndex]?.performancefee
                        : expiredDYPPools[cardIndex]?.performancefee
                    }
                    lockTime={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                            "No"
                            ? "No Lock"
                            : parseInt(
                                activePools[cardIndex]?.lock_time?.split(" ")[0]
                              )
                          : expiredDYPPools[cardIndex]?.lock_time?.split(
                              " "
                            )[0] === "No"
                          ? "No Lock"
                          : parseInt(
                              expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0]
                            )
                        : "No Lock"
                    }
                    listType={listType}
                    other_info={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : expiredDYPPools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : false
                    }
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_resultbsc}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={false}
                    referrer={referrer}
                  />
                ) : activeCard2 &&
                  cardIndex ===2 &&
                  topList === "Staking" &&
                  chain === "eth" ? (
                  <InitConstantStakingiDYP
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_result}
                    lp_id={lp_id[cardIndex]}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={false}
                    staking={stakeArrayiDYPActive[cardIndex]}
                    finalApr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_performancefee
                        : expiredDYPPools[cardIndex]?.apy_performancefee
                    }
                    apr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_percent
                        : expiredDYPPools[cardIndex]?.apy_percent
                    }
                    liquidity={eth_address}
                    expiration_time={expirationArray[cardIndex]}
                    other_info={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : expiredDYPPools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : false
                    }
                    fee_s={
                      expiredPools === false
                        ? activePools[cardIndex]?.performancefee
                        : expiredDYPPools[cardIndex]?.performancefee
                    }
                    fee_u={withdrawFeeiDyp[cardIndex]}
                    referrer={referrer}
                  />
                ) : activeCard2 &&
                  cardIndex >= 3 &&
                  topList === "Staking" &&
                  chain === "bnb" ? (
                  <StakeBscIDyp
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_resultbsc}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={false}
                    staking={
                      expiredPools === false
                        ? stakearrayStakeBsciDyp2[cardIndex - 2]
                        : stakearrayStakeBsciDyp2Expired[cardIndex - 3]
                    }
                    listType={listType}
                    finalApr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_performancefee
                        : expiredDYPPools[cardIndex]?.apy_performancefee
                    }
                    apr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_percent
                        : expiredDYPPools[cardIndex]?.apy_percent
                    }
                    liquidity={wbsc_address}
                    expiration_time={
                      expiredPools === false
                        ? expirearrayStakeBsciDyp2[cardIndex - 2]
                        : expirearrayStakeBsciDyp2Expired[cardIndex - 3]
                    }
                    other_info={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : expiredDYPPools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : false
                    }
                    fee_s={
                      expiredPools === false
                        ? activePools[cardIndex]?.performancefee
                        : expiredDYPPools[cardIndex]?.performancefee
                    }
                    fee_u={0}
                    lockTime={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                            "No"
                            ? "No Lock"
                            : parseInt(
                                activePools[cardIndex]?.lock_time?.split(" ")[0]
                              )
                          : expiredDYPPools[cardIndex]?.lock_time?.split(
                              " "
                            )[0] === "No"
                          ? "No Lock"
                          : parseInt(
                              expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0]
                            )
                        : "No Lock"
                    }
                  />
                ) : activeCard2 &&
                  topList === "Staking" &&
                  chain === "avax" &&
                  cardIndex < 2 ? (
                  <StakeAvax
                    is_wallet_connected={isConnected}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    the_graph_result={the_graph_resultavax}
                    chainId={chainId}
                    coinbase={coinbase}
                    referrer={referrer}
                    expired={false}
                  />
                ) : activeCard2 &&
                  topList === "Staking" &&
                  chain === "avax" &&
                  cardIndex >= 2 ? (
                  <StakeAvaxIDyp
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_resultavax}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={false}
                    staking={
                      expiredPools === false
                        ? stakingarrayStakeAvaxiDypActive[cardIndex - 2]
                        : stakingarrayStakeAvaxiDypExpired[cardIndex - 3]
                    }
                    listType={listType}
                    finalApr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_performancefee
                        : expiredDYPPools[cardIndex]?.apy_performancefee
                    }
                    apr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_percent
                        : expiredDYPPools[cardIndex]?.apy_percent
                    }
                    liquidity={avax_address}
                    expiration_time={expirearrayStakeAvaxiDyp[cardIndex]}
                    other_info={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : expiredDYPPools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : false
                    }
                    fee_s={
                      expiredPools === false
                        ? activePools[cardIndex]?.performancefee
                        : expiredDYPPools[cardIndex]?.performancefee
                    }
                    fee_u={feeUarrayStakeAvaxiDyp[cardIndexavaxiDyp - 3]}
                    lockTime={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                            "No"
                            ? "No Lock"
                            : activePools[cardIndex]?.lock_time?.split(" ")[0]
                          : expiredDYPPools[cardIndex]?.lock_time?.split(
                              " "
                            )[0] === "No"
                          ? "No Lock"
                          : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                        : "No Lock"
                    }
                  />
                ) : activeCard2 && topList === "Vault" && chain === "eth" ? (
                  <Vault
                    vault={vaultArray[cardIndex]}
                    token={tokenvaultArray[cardIndex]}
                    platformTokenApyPercent={vaultplatformArray[cardIndex]}
                    UNDERLYING_DECIMALS={vaultdecimalsArray[cardIndex]}
                    UNDERLYING_SYMBOL={vaultsymbolArray[cardIndex]}
                    expiration_time={"04 March 2023"}
                    coinbase={coinbase}
                    lockTime={"No Lock"}
                    handleConnection={handleConnection}
                    chainId={chainId}
                    listType={listType}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={false}
                    isConnected={isConnected}
                    the_graph_result={the_graph_result}
                  />
                ) : (
                  <></>
                )}
                <div
                  className="top-picks-container"
                  style={{ marginTop: "25px" }}
                >
                  {activePools.slice(6, 9).map((pool, index) => (
                    <TopPoolsCard
                      display={
                        pool.expired
                          ? pool.expired === "Yes"
                            ? "none"
                            : ""
                          : ""
                      }
                      key={index}
                      chain={chain}
                      top_pick={pool.top_pick}
                      tokenName={
                        pool.tokenName
                          ? pool.tokenName
                          : pool.pair_name
                          ? pool.pair_name
                          : ""
                      }
                      apr={pool.apy_percent + "%"}
                      tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                      lockTime={
                        pool.lock_time ? pool.lock_time : locktimeFarm[index]
                      }
                      tokenLogo={
                        pool.icon
                          ? pool.icon
                          : pool.pair_name === "iDYP"
                          ? "idypius.svg"
                          : "dyplogo.svg"
                      }
                      onShowDetailsClick={() => {
                        setActiveCard(null);
                        setActiveCard2(null);
                        setActiveCard3(topPools[index + 6]);
                        setActiveCardNFT(false);
                        handleCardIndexStake(index + 6);
                        handleCardIndexStake30(index + 6);
                        handleCardIndexStakeiDyp(index + 6);
                        setDetails(index + 6);
                      }}
                      onHideDetailsClick={() => {
                        setActiveCard3(null);
                        setDetails();
                      }}
                      cardType={topList}
                      details={details === index + 6 ? true : false}
                      isNewPool={pool.isNewPool}
                      isStaked={pool.isStaked}
                      expired={false}
                    />
                  ))}
                </div>
                {activeCard3 &&
                topList === "Staking" &&
                cardIndex < 2 &&
                chain === "bnb" ? (
                  <StakeBsc
                    lp_id={LP_IDBNB_Array[cardIndex]}
                    staking={stakearrayStakeBscDyp2[cardIndex]}
                    apr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_percent
                        : expiredDYPPools[cardIndex]?.apy_percent
                    }
                    liquidity={wbsc_address}
                    expiration_time={expirearrayStakeBscDyp2[cardIndex]}
                    finalApr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_performancefee
                        : expiredDYPPools[cardIndex]?.apy_performancefee
                    }
                    fee={
                      expiredPools === false
                        ? activePools[cardIndex]?.performancefee
                        : expiredDYPPools[cardIndex]?.performancefee
                    }
                    lockTime={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                            "No"
                            ? "No Lock"
                            : parseInt(
                                activePools[cardIndex]?.lock_time?.split(" ")[0]
                              )
                          : expiredDYPPools[cardIndex]?.lock_time?.split(
                              " "
                            )[0] === "No"
                          ? "No Lock"
                          : parseInt(
                              expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0]
                            )
                        : "No Lock"
                    }
                    listType={listType}
                    other_info={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : expiredDYPPools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : false
                    }
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_resultbsc}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={false}
                    referrer={referrer}
                  />
                ) : activeCard3 &&
                  cardIndex >= 0 &&
                  topList === "Staking" &&
                  chain === "eth" ? (
                  <InitConstantStakingiDYP
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_result}
                    lp_id={lp_id[cardIndex]}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={false}
                  />
                ) : activeCard3 &&
                  cardIndex >= 5 &&
                  topList === "Staking" &&
                  chain === "bnb" ? (
                  <StakeBscIDyp
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_resultbsc}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={false}
                    staking={
                      expiredPools === false
                        ? stakearrayStakeBsciDyp2[cardIndex - 2]
                        : stakearrayStakeBsciDyp2Expired[cardIndex - 3]
                    }
                    listType={listType}
                    finalApr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_performancefee
                        : expiredDYPPools[cardIndex]?.apy_performancefee
                    }
                    apr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_percent
                        : expiredDYPPools[cardIndex]?.apy_percent
                    }
                    liquidity={wbsc_address}
                    expiration_time={
                      expiredPools === false
                        ? expirearrayStakeBsciDyp2[cardIndex - 2]
                        : expirearrayStakeBsciDyp2Expired[cardIndex - 3]
                    }
                    other_info={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : expiredDYPPools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : false
                    }
                    fee_s={
                      expiredPools === false
                        ? activePools[cardIndex]?.performancefee
                        : expiredDYPPools[cardIndex]?.performancefee
                    }
                    fee_u={0}
                    lockTime={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                            "No"
                            ? "No Lock"
                            : parseInt(
                                activePools[cardIndex]?.lock_time?.split(" ")[0]
                              )
                          : expiredDYPPools[cardIndex]?.lock_time?.split(
                              " "
                            )[0] === "No"
                          ? "No Lock"
                          : parseInt(
                              expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0]
                            )
                        : "No Lock"
                    }
                  />
                ) : activeCard3 &&
                  topList === "Staking" &&
                  chain === "avax" &&
                  cardIndex < 2 ? (
                  <StakeAvax
                    is_wallet_connected={isConnected}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    the_graph_result={the_graph_resultavax}
                    chainId={chainId}
                    coinbase={coinbase}
                    referrer={referrer}
                    expired={false}
                  />
                ) : activeCard3 &&
                  topList === "Staking" &&
                  chain === "avax" &&
                  cardIndex >= 2 ? (
                  <StakeAvaxIDyp
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_resultavax}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={false}
                    staking={
                      expiredPools === false
                        ? stakingarrayStakeAvaxiDypActive[cardIndex - 2]
                        : stakingarrayStakeAvaxiDypExpired[cardIndex - 3]
                    }
                    listType={listType}
                    finalApr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_performancefee
                        : expiredDYPPools[cardIndex]?.apy_performancefee
                    }
                    apr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_percent
                        : expiredDYPPools[cardIndex]?.apy_percent
                    }
                    liquidity={avax_address}
                    expiration_time={expirearrayStakeAvaxiDyp[cardIndex]}
                    other_info={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : expiredDYPPools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : false
                    }
                    fee_s={
                      expiredPools === false
                        ? activePools[cardIndex]?.performancefee
                        : expiredDYPPools[cardIndex]?.performancefee
                    }
                    fee_u={feeUarrayStakeAvaxiDyp[cardIndexavaxiDyp - 3]}
                    lockTime={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                            "No"
                            ? "No Lock"
                            : activePools[cardIndex]?.lock_time?.split(" ")[0]
                          : expiredDYPPools[cardIndex]?.lock_time?.split(
                              " "
                            )[0] === "No"
                          ? "No Lock"
                          : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                        : "No Lock"
                    }
                  />
                ) : activeCard3 && topList === "Vault" && chain === "eth" ? (
                  <Vault
                    vault={vaultArray[cardIndex]}
                    token={tokenvaultArray[cardIndex]}
                    platformTokenApyPercent={vaultplatformArray[cardIndex]}
                    UNDERLYING_DECIMALS={vaultdecimalsArray[cardIndex]}
                    UNDERLYING_SYMBOL={vaultsymbolArray[cardIndex]}
                    expiration_time={"04 March 2023"}
                    coinbase={coinbase}
                    lockTime={"No Lock"}
                    handleConnection={handleConnection}
                    chainId={chainId}
                    listType={listType}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={false}
                    isConnected={isConnected}
                    the_graph_result={the_graph_result}
                  />
                ) : (
                  <></>
                )}
                <div
                  className="top-picks-container"
                  style={{ marginTop: activePools.length > 9 && "25px" }}
                >
                  {activePools
                    .slice(9, activePools.length)
                    .map((pool, index) => (
                      <TopPoolsCard
                        display={
                          pool.expired
                            ? pool.expired === "Yes"
                              ? "none"
                              : ""
                            : ""
                        }
                        key={index}
                        chain={chain}
                        top_pick={pool.top_pick}
                        tokenName={
                          pool.tokenName
                            ? pool.tokenName
                            : pool.pair_name
                            ? pool.pair_name
                            : ""
                        }
                        apr={pool.apy + "%"}
                        tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                        lockTime={
                          pool.lock_time ? pool.lock_time : locktimeFarm[index]
                        }
                        tokenLogo={
                          pool.icon
                            ? pool.icon
                            : pool.pair_name === "iDYP"
                            ? "idypius.svg"
                            : "dyplogo.svg"
                        }
                        onShowDetailsClick={() => {
                          setActiveCard(null);
                          setActiveCard2(null);
                          setActiveCard3(null);
                          setActiveCard4(topPools[index + 9]);
                          setActiveCardNFT(false);
                          handleCardIndexStake(index + 9);
                          handleCardIndexStake30(index + 9);
                          handleCardIndexStakeiDyp(index + 9);
                          setDetails(index + 9);
                        }}
                        onHideDetailsClick={() => {
                          setActiveCard4(null);
                          setDetails();
                        }}
                        cardType={topList}
                        details={details === index + 9 ? true : false}
                        isNewPool={pool.isNewPool}
                        expired={false}
                        isStaked={pool.isStaked}
                      />
                    ))}
                </div>
                {activeCard4 &&
                topList === "Staking" &&
                cardIndex < 2 &&
                chain === "bnb" ? (
                  <StakeBsc
                    lp_id={LP_IDBNB_Array[cardIndex]}
                    staking={stakearrayStakeBscDyp2[cardIndex]}
                    apr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_percent
                        : expiredDYPPools[cardIndex]?.apy_percent
                    }
                    liquidity={wbsc_address}
                    expiration_time={expirearrayStakeBscDyp2[cardIndex]}
                    finalApr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_performancefee
                        : expiredDYPPools[cardIndex]?.apy_performancefee
                    }
                    fee={
                      expiredPools === false
                        ? activePools[cardIndex]?.performancefee
                        : expiredDYPPools[cardIndex]?.performancefee
                    }
                    lockTime={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                            "No"
                            ? "No Lock"
                            : parseInt(
                                activePools[cardIndex]?.lock_time?.split(" ")[0]
                              )
                          : expiredDYPPools[cardIndex]?.lock_time?.split(
                              " "
                            )[0] === "No"
                          ? "No Lock"
                          : parseInt(
                              expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0]
                            )
                        : "No Lock"
                    }
                    listType={listType}
                    other_info={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : expiredDYPPools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : false
                    }
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_resultbsc}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={false}
                    referrer={referrer}
                  />
                ) : activeCard4 &&
                  cardIndex >= 0 &&
                  topList === "Staking" &&
                  chain === "eth" ? (
                  <InitConstantStakingiDYP
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_result}
                    lp_id={lp_id[cardIndex]}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={false}
                  />
                ) : activeCard4 &&
                  cardIndex >= 5 &&
                  topList === "Staking" &&
                  chain === "bnb" ? (
                  <StakeBscIDyp
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_resultbsc}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={false}
                    staking={
                      expiredPools === false
                        ? stakearrayStakeBsciDyp2[cardIndex - 2]
                        : stakearrayStakeBsciDyp2Expired[cardIndex - 3]
                    }
                    listType={listType}
                    finalApr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_performancefee
                        : expiredDYPPools[cardIndex]?.apy_performancefee
                    }
                    apr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_percent
                        : expiredDYPPools[cardIndex]?.apy_percent
                    }
                    liquidity={wbsc_address}
                    expiration_time={
                      expiredPools === false
                        ? expirearrayStakeBsciDyp2[cardIndex - 2]
                        : expirearrayStakeBsciDyp2Expired[cardIndex - 3]
                    }
                    other_info={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : expiredDYPPools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : false
                    }
                    fee_s={
                      expiredPools === false
                        ? activePools[cardIndex]?.performancefee
                        : expiredDYPPools[cardIndex]?.performancefee
                    }
                    fee_u={0}
                    lockTime={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                            "No"
                            ? "No Lock"
                            : parseInt(
                                activePools[cardIndex]?.lock_time?.split(" ")[0]
                              )
                          : expiredDYPPools[cardIndex]?.lock_time?.split(
                              " "
                            )[0] === "No"
                          ? "No Lock"
                          : parseInt(
                              expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0]
                            )
                        : "No Lock"
                    }
                  />
                ) : activeCard4 &&
                  topList === "Staking" &&
                  chain === "avax" &&
                  cardIndex < 2 ? (
                  <StakeAvax
                    is_wallet_connected={isConnected}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    the_graph_result={the_graph_resultavax}
                    chainId={chainId}
                    coinbase={coinbase}
                    expired={false}
                    referrer={referrer}
                  />
                ) : activeCard4 &&
                  topList === "Staking" &&
                  chain === "avax" &&
                  cardIndex >= 2 ? (
                  <StakeAvaxIDyp
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_resultavax}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={false}
                    staking={
                      expiredPools === false
                        ? stakingarrayStakeAvaxiDypActive[cardIndex - 2]
                        : stakingarrayStakeAvaxiDypExpired[cardIndex - 3]
                    }
                    listType={listType}
                    finalApr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_performancefee
                        : expiredDYPPools[cardIndex]?.apy_performancefee
                    }
                    apr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_percent
                        : expiredDYPPools[cardIndex]?.apy_percent
                    }
                    liquidity={avax_address}
                    expiration_time={expirearrayStakeAvaxiDyp[cardIndex]}
                    other_info={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : expiredDYPPools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : false
                    }
                    fee_s={
                      expiredPools === false
                        ? activePools[cardIndex]?.performancefee
                        : expiredDYPPools[cardIndex]?.performancefee
                    }
                    fee_u={feeUarrayStakeAvaxiDyp[cardIndexavaxiDyp - 3]}
                    lockTime={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                            "No"
                            ? "No Lock"
                            : activePools[cardIndex]?.lock_time?.split(" ")[0]
                          : expiredDYPPools[cardIndex]?.lock_time?.split(
                              " "
                            )[0] === "No"
                          ? "No Lock"
                          : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                        : "No Lock"
                    }
                  />
                ) : activeCard4 && topList === "Vault" ? (
                  <Vault
                    vault={vaultArray[cardIndex]}
                    token={tokenvaultArray[cardIndex]}
                    platformTokenApyPercent={vaultplatformArray[cardIndex]}
                    UNDERLYING_DECIMALS={vaultdecimalsArray[cardIndex]}
                    UNDERLYING_SYMBOL={vaultsymbolArray[cardIndex]}
                    expiration_time={"04 March 2023"}
                    coinbase={coinbase}
                    lockTime={"No Lock"}
                    handleConnection={handleConnection}
                    chainId={chainId}
                    listType={listType}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={false}
                    isConnected={isConnected}
                    the_graph_result={the_graph_result}
                  />
                ) : (
                  <></>
                )}
              </div>
            ) : windowSize.width > 786 ? (
              <div className="px-0">
                <div className="top-picks-container">
                  {topList === "Staking" && chain === "eth" && (
                    <CawsCard
                      onShowDetailsClick={() => {
                        setActiveCardNFT(true);
                        setActiveCard(null);
                        setActiveCard2(null);
                        setActiveCard3(null);
                        setActiveCard4(null);
                        setDetails();
                      }}
                      onHideDetailsClick={() => {
                        setActiveCardNFT(false);
                        setDetails();
                      }}
                      cardType={topList}
                      details={activeCardNFT === true ? true : false}
                      listType={listType}
                      tvl={"$" + getFormattedNumber(cawsCard2.tvl_usd)}
                    />
                  )}

                  {activePools.slice(0, 2).map((pool, index) => (
                    <TopPoolsCard
                      display={
                        pool.expired
                          ? pool.expired === "Yes"
                            ? "none"
                            : ""
                          : ""
                      }
                      key={index}
                      chain={chain}
                      top_pick={pool.top_pick}
                      tokenName={
                        pool.tokenName
                          ? pool.tokenName
                          : pool.pair_name
                          ? pool.pair_name
                          : ""
                      }
                      apr={pool.apy_percent + "%"}
                      tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                      lockTime={
                        pool.lockTime
                          ? pool.lockTime
                          : pool.lock_time
                          ? pool.lock_time
                          : locktimeFarm[index]
                      }
                      tokenLogo={
                        pool.icon
                          ? pool.icon
                          : pool.pair_name === "iDYP"
                          ? "idypius.svg"
                          : "dyplogo.svg"
                      }
                      onShowDetailsClick={() => {
                        setActiveCard(topPools[index]);
                        setActiveCard2(null);
                        setActiveCard3(null);
                        setActiveCard4(null);
                        setActiveCard5(null);
                        setActiveCard6(null);
                        setActiveCardNFT(false);
                        handleCardIndexStake(index);
                        handleCardIndexStake30(index);
                        handleCardIndexStakeiDyp(index);
                        setDetails(index);
                      }}
                      onHideDetailsClick={() => {
                        setActiveCard(null);
                        setDetails();
                      }}
                      cardType={topList}
                      details={details === index ? true : false}
                      isNewPool={pool.isNewPool}
                      isStaked={pool.isStaked}
                      expired={false}
                    />
                  ))}
                </div>
                {activeCardNFT && (
                  <CawsDetails
                    coinbase={coinbase}
                    isConnected={isConnected}
                    listType={listType}
                    chainId={chainId}
                    handleSwitchNetwork={handleSwitchNetwork}
                    handleConnection={handleConnection}
                  />
                )}

                {activeCard &&
                topList === "Staking" &&
                cardIndex === 2 &&
                chain === "eth" ? (
                  <StakeEth
                    staking={stakeArrayStakeNew[cardIndex]}
                    apr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_percent
                        : expiredDYPPools[cardIndex]?.apy_percent
                    }
                    liquidity={eth_address}
                    expiration_time={"14 December 2022"}
                    finalApr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_performancefee
                        : expiredDYPPools[cardIndex]?.apy_performancefee
                    }
                    fee={
                      expiredPools
                        ? expiredPools[cardIndex - 1]?.performancefee
                        : 0
                    }
                    lockTime={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                            "No"
                            ? "No Lock"
                            : activePools[cardIndex]?.lock_time?.split(" ")[0]
                          : expiredDYPPools[cardIndex]?.lock_time?.split(
                              " "
                            )[0] === "No"
                          ? "No Lock"
                          : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                        : "No Lock"
                    }
                    lp_id={LP_IDBNB_Array[cardIndex]}
                    listType={listType}
                    other_info={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : expiredDYPPools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : false
                    }
                    fee={
                      expiredPools === false
                        ? activePools[cardIndex]?.performancefee
                        : expiredDYPPools[cardIndex]?.performancefee
                    }
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_result}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={false}
                    referrer={referrer}
                  />
                ) : activeCard &&
                  topList === "Staking" &&
                  cardIndex < 2 &&
                  chain === "bnb" ? (
                  <StakeBsc
                    lp_id={LP_IDBNB_Array[cardIndex]}
                    staking={stakearrayStakeBscDyp2[cardIndex]}
                    apr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_percent
                        : expiredDYPPools[cardIndex]?.apy_percent
                    }
                    liquidity={wbsc_address}
                    expiration_time={expirearrayStakeBscDyp2[cardIndex]}
                    finalApr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_performancefee
                        : expiredDYPPools[cardIndex]?.apy_performancefee
                    }
                    fee={
                      expiredPools === false
                        ? activePools[cardIndex]?.performancefee
                        : expiredDYPPools[cardIndex]?.performancefee
                    }
                    lockTime={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                            "No"
                            ? "No Lock"
                            : parseInt(
                                activePools[cardIndex]?.lock_time?.split(" ")[0]
                              )
                          : expiredDYPPools[cardIndex]?.lock_time?.split(
                              " "
                            )[0] === "No"
                          ? "No Lock"
                          : parseInt(
                              expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0]
                            )
                        : "No Lock"
                    }
                    listType={listType}
                    other_info={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : expiredDYPPools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : false
                    }
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_resultbsc}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={false}
                    referrer={referrer}
                  />
                ) : activeCard &&
                  cardIndex >= 0 &&
                  topList === "Staking" &&
                  chain === "eth" ? (
                  <InitConstantStakingiDYP
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_result}
                    lp_id={lp_id[cardIndex]}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={false}
                    staking={stakeArrayiDYPActive[cardIndex]}
                    listType={listType}
                    finalApr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_performancefee
                        : expiredDYPPools[cardIndex]?.apy_performancefee
                    }
                    apr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_percent
                        : expiredDYPPools[cardIndex]?.apy_percent
                    }
                    liquidity={eth_address}
                    expiration_time={expirationArray[cardIndex]}
                    other_info={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : expiredDYPPools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : false
                    }
                    fee_s={
                      expiredPools === false
                        ? activePools[cardIndex]?.performancefee
                        : expiredDYPPools[cardIndex]?.performancefee
                    }
                    fee_u={withdrawFeeiDyp[cardIndex]}
                    lockTime={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                            "No"
                            ? "No Lock"
                            : activePools[cardIndex]?.lock_time?.split(" ")[0]
                          : expiredDYPPools[cardIndex]?.lock_time?.split(
                              " "
                            )[0] === "No"
                          ? "No Lock"
                          : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                        : "No Lock"
                    }
                  />
                ) : activeCard &&
                  cardIndex >= 2 &&
                  topList === "Staking" &&
                  chain === "bnb" ? (
                  <StakeBscIDyp
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_resultbsc}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={false}
                    staking={
                      expiredPools === false
                        ? stakearrayStakeBsciDyp2[cardIndex - 2]
                        : stakearrayStakeBsciDyp2Expired[cardIndex - 3]
                    }
                    listType={listType}
                    finalApr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_performancefee
                        : expiredDYPPools[cardIndex]?.apy_performancefee
                    }
                    apr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_percent
                        : expiredDYPPools[cardIndex]?.apy_percent
                    }
                    liquidity={wbsc_address}
                    expiration_time={
                      expiredPools === false
                        ? expirearrayStakeBsciDyp2[cardIndex - 2]
                        : expirearrayStakeBsciDyp2Expired[cardIndex - 3]
                    }
                    other_info={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : expiredDYPPools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : false
                    }
                    fee_s={
                      expiredPools === false
                        ? activePools[cardIndex]?.performancefee
                        : expiredDYPPools[cardIndex]?.performancefee
                    }
                    fee_u={0}
                    lockTime={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                            "No"
                            ? "No Lock"
                            : parseInt(
                                activePools[cardIndex]?.lock_time?.split(" ")[0]
                              )
                          : expiredDYPPools[cardIndex]?.lock_time?.split(
                              " "
                            )[0] === "No"
                          ? "No Lock"
                          : parseInt(
                              expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0]
                            )
                        : "No Lock"
                    }
                  />
                ) : activeCard &&
                  topList === "Staking" &&
                  chain === "avax" &&
                  cardIndex < 2 ? (
                  <StakeAvax
                    is_wallet_connected={isConnected}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    the_graph_result={the_graph_resultavax}
                    chainId={chainId}
                    coinbase={coinbase}
                    referrer={referrer}
                    expired={false}
                  />
                ) : activeCard &&
                  topList === "Staking" &&
                  chain === "avax" &&
                  cardIndex >= 2 ? (
                  <StakeAvaxIDyp
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_resultavax}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={false}
                    staking={
                      expiredPools === false
                        ? stakingarrayStakeAvaxiDypActive[cardIndex - 2]
                        : stakingarrayStakeAvaxiDypExpired[cardIndex - 3]
                    }
                    listType={listType}
                    finalApr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_performancefee
                        : expiredDYPPools[cardIndex]?.apy_performancefee
                    }
                    apr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_percent
                        : expiredDYPPools[cardIndex]?.apy_percent
                    }
                    liquidity={avax_address}
                    expiration_time={expirearrayStakeAvaxiDyp[cardIndex]}
                    other_info={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : expiredDYPPools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : false
                    }
                    fee_s={
                      expiredPools === false
                        ? activePools[cardIndex]?.performancefee
                        : expiredDYPPools[cardIndex]?.performancefee
                    }
                    fee_u={feeUarrayStakeAvaxiDyp[cardIndexavaxiDyp - 3]}
                    lockTime={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                            "No"
                            ? "No Lock"
                            : activePools[cardIndex]?.lock_time?.split(" ")[0]
                          : expiredDYPPools[cardIndex]?.lock_time?.split(
                              " "
                            )[0] === "No"
                          ? "No Lock"
                          : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                        : "No Lock"
                    }
                  />
                ) : activeCard && topList === "Vault" ? (
                  <Vault
                    vault={vaultArray[cardIndex]}
                    token={tokenvaultArray[cardIndex]}
                    platformTokenApyPercent={vaultplatformArray[cardIndex]}
                    UNDERLYING_DECIMALS={vaultdecimalsArray[cardIndex]}
                    UNDERLYING_SYMBOL={vaultsymbolArray[cardIndex]}
                    expiration_time={"04 March 2023"}
                    coinbase={coinbase}
                    lockTime={"No Lock"}
                    handleConnection={handleConnection}
                    chainId={chainId}
                    listType={listType}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={false}
                    isConnected={isConnected}
                    the_graph_result={the_graph_result}
                  />
                ) : (
                  <></>
                )}
                <div
                  className="top-picks-container"
                  style={{ marginTop: "25px" }}
                >
                  {activePools.slice(2, 4).map((pool, index) => (
                    <TopPoolsCard
                      display={
                        pool.expired
                          ? pool.expired === "Yes"
                            ? "none"
                            : ""
                          : ""
                      }
                      expired={false}
                      key={index}
                      chain={chain}
                      top_pick={pool.top_pick}
                      tokenName={
                        pool.tokenName
                          ? pool.tokenName
                          : pool.pair_name
                          ? pool.pair_name
                          : ""
                      }
                      apr={pool.apy_percent + "%"}
                      tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                      lockTime={
                        pool.lockTime
                          ? pool.lockTime
                          : pool.lock_time
                          ? pool.lock_time
                          : locktimeFarm[index]
                      }
                      tokenLogo={
                        pool.icon
                          ? pool.icon
                          : pool.pair_name === "iDYP"
                          ? "idypius.svg"
                          : "dyplogo.svg"
                      }
                      onShowDetailsClick={() => {
                        setActiveCard(null);
                        setActiveCard2(topPools[index + 2]);
                        setActiveCard3(null);
                        setActiveCard4(null);
                        setActiveCard5(null);
                        setActiveCard6(null);
                        setActiveCardNFT(false);
                        handleCardIndexStake(index + 2);
                        handleCardIndexStake30(index + 2);
                        handleCardIndexStakeiDyp(index + 2);
                        setDetails(index + 2);
                      }}
                      onHideDetailsClick={() => {
                        setActiveCard2(null);
                        setDetails();
                      }}
                      cardType={topList}
                      details={details === index + 2 ? true : false}
                      isNewPool={pool.isNewPool}
                      isStaked={pool.isStaked}
                    />
                  ))}
                </div>
                {activeCard2 &&
                topList === "Staking" &&
                cardIndex < 2 &&
                chain === "bnb" ? (
                  <StakeBsc
                    lp_id={LP_IDBNB_Array[cardIndex]}
                    staking={stakearrayStakeBscDyp2[cardIndex]}
                    apr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_percent
                        : expiredDYPPools[cardIndex]?.apy_percent
                    }
                    liquidity={wbsc_address}
                    expiration_time={expirearrayStakeBscDyp2[cardIndex]}
                    finalApr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_performancefee
                        : expiredDYPPools[cardIndex]?.apy_performancefee
                    }
                    fee={
                      expiredPools === false
                        ? activePools[cardIndex]?.performancefee
                        : expiredDYPPools[cardIndex]?.performancefee
                    }
                    lockTime={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                            "No"
                            ? "No Lock"
                            : parseInt(
                                activePools[cardIndex]?.lock_time?.split(" ")[0]
                              )
                          : expiredDYPPools[cardIndex]?.lock_time?.split(
                              " "
                            )[0] === "No"
                          ? "No Lock"
                          : parseInt(
                              expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0]
                            )
                        : "No Lock"
                    }
                    listType={listType}
                    other_info={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : expiredDYPPools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : false
                    }
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_resultbsc}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={false}
                    referrer={referrer}
                  />
                ) : activeCard2 &&
                  cardIndex >= 0 &&
                  topList === "Staking" &&
                  chain === "eth" ? (
                  <InitConstantStakingiDYP
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_result}
                    lp_id={lp_id[cardIndex]}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={false}
                    staking={stakeArrayiDYPActive[cardIndex]}
                    listType={listType}
                    finalApr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_performancefee
                        : expiredDYPPools[cardIndex]?.apy_performancefee
                    }
                    apr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_percent
                        : expiredDYPPools[cardIndex]?.apy_percent
                    }
                    liquidity={eth_address}
                    expiration_time={expirationArray[cardIndex]}
                    other_info={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : expiredDYPPools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : false
                    }
                    fee_s={
                      expiredPools === false
                        ? activePools[cardIndex]?.performancefee
                        : expiredDYPPools[cardIndex]?.performancefee
                    }
                    fee_u={withdrawFeeiDyp[cardIndex]}
                    lockTime={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                            "No"
                            ? "No Lock"
                            : activePools[cardIndex]?.lock_time?.split(" ")[0]
                          : expiredDYPPools[cardIndex]?.lock_time?.split(
                              " "
                            )[0] === "No"
                          ? "No Lock"
                          : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                        : "No Lock"
                    }
                  />
                ) : activeCard2 &&
                  cardIndex >= 2 &&
                  topList === "Staking" &&
                  chain === "bnb" ? (
                  <StakeBscIDyp
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_resultbsc}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={false}
                    staking={
                      expiredPools === false
                        ? stakearrayStakeBsciDyp2[cardIndex - 2]
                        : stakearrayStakeBsciDyp2Expired[cardIndex - 3]
                    }
                    listType={listType}
                    finalApr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_performancefee
                        : expiredDYPPools[cardIndex]?.apy_performancefee
                    }
                    apr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_percent
                        : expiredDYPPools[cardIndex]?.apy_percent
                    }
                    liquidity={wbsc_address}
                    expiration_time={
                      expiredPools === false
                        ? expirearrayStakeBsciDyp2[cardIndex - 2]
                        : expirearrayStakeBsciDyp2Expired[cardIndex - 3]
                    }
                    other_info={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : expiredDYPPools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : false
                    }
                    fee_s={
                      expiredPools === false
                        ? activePools[cardIndex]?.performancefee
                        : expiredDYPPools[cardIndex]?.performancefee
                    }
                    fee_u={0}
                    lockTime={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                            "No"
                            ? "No Lock"
                            : parseInt(
                                activePools[cardIndex]?.lock_time?.split(" ")[0]
                              )
                          : expiredDYPPools[cardIndex]?.lock_time?.split(
                              " "
                            )[0] === "No"
                          ? "No Lock"
                          : parseInt(
                              expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0]
                            )
                        : "No Lock"
                    }
                  />
                ) : activeCard2 &&
                  topList === "Staking" &&
                  chain === "avax" &&
                  cardIndex < 2 ? (
                  <StakeAvax
                    is_wallet_connected={isConnected}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    the_graph_result={the_graph_resultavax}
                    chainId={chainId}
                    coinbase={coinbase}
                    referrer={referrer}
                    expired={false}
                  />
                ) : activeCard2 &&
                  topList === "Staking" &&
                  chain === "avax" &&
                  cardIndex >= 2 ? (
                  <StakeAvaxIDyp
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_resultavax}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={false}
                    staking={
                      expiredPools === false
                        ? stakingarrayStakeAvaxiDypActive[cardIndex - 2]
                        : stakingarrayStakeAvaxiDypExpired[cardIndex - 3]
                    }
                    listType={listType}
                    finalApr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_performancefee
                        : expiredDYPPools[cardIndex]?.apy_performancefee
                    }
                    apr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_percent
                        : expiredDYPPools[cardIndex]?.apy_percent
                    }
                    liquidity={avax_address}
                    expiration_time={expirearrayStakeAvaxiDyp[cardIndex]}
                    other_info={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : expiredDYPPools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : false
                    }
                    fee_s={
                      expiredPools === false
                        ? activePools[cardIndex]?.performancefee
                        : expiredDYPPools[cardIndex]?.performancefee
                    }
                    fee_u={feeUarrayStakeAvaxiDyp[cardIndexavaxiDyp - 3]}
                    lockTime={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                            "No"
                            ? "No Lock"
                            : activePools[cardIndex]?.lock_time?.split(" ")[0]
                          : expiredDYPPools[cardIndex]?.lock_time?.split(
                              " "
                            )[0] === "No"
                          ? "No Lock"
                          : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                        : "No Lock"
                    }
                  />
                ) : activeCard2 && topList === "Vault" ? (
                  <Vault
                    vault={vaultArray[cardIndex]}
                    token={tokenvaultArray[cardIndex]}
                    platformTokenApyPercent={vaultplatformArray[cardIndex]}
                    UNDERLYING_DECIMALS={vaultdecimalsArray[cardIndex]}
                    UNDERLYING_SYMBOL={vaultsymbolArray[cardIndex]}
                    expiration_time={"04 March 2023"}
                    coinbase={coinbase}
                    lockTime={"No Lock"}
                    handleConnection={handleConnection}
                    chainId={chainId}
                    listType={listType}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={false}
                    isConnected={isConnected}
                    the_graph_result={the_graph_result}
                  />
                ) : (
                  <></>
                )}
                <div
                  className="top-picks-container"
                  style={{ marginTop: "25px" }}
                >
                  {activePools.slice(4, 6).map((pool, index) => (
                    <TopPoolsCard
                      display={
                        pool.expired
                          ? pool.expired === "Yes"
                            ? "none"
                            : ""
                          : ""
                      }
                      expired={false}
                      key={index}
                      chain={chain}
                      top_pick={pool.top_pick}
                      tokenName={
                        pool.tokenName
                          ? pool.tokenName
                          : pool.pair_name
                          ? pool.pair_name
                          : ""
                      }
                      apr={pool.apy_percent + "%"}
                      tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                      lockTime={
                        pool.lockTime
                          ? pool.lockTime
                          : pool.lock_time
                          ? pool.lock_time
                          : locktimeFarm[index]
                      }
                      tokenLogo={
                        pool.icon
                          ? pool.icon
                          : pool.pair_name === "iDYP"
                          ? "idypius.svg"
                          : "dyplogo.svg"
                      }
                      onShowDetailsClick={() => {
                        setActiveCard(null);
                        setActiveCard2(null);
                        setActiveCard3(topPools[index + 4]);
                        setActiveCard4(null);
                        setActiveCard5(null);
                        setActiveCard6(null);
                        setActiveCardNFT(false);
                        handleCardIndexStake(index + 4);
                        handleCardIndexStake30(index + 4);
                        handleCardIndexStakeiDyp(index + 4);
                        setDetails(index + 4);
                      }}
                      onHideDetailsClick={() => {
                        setActiveCard3(null);
                        setDetails();
                      }}
                      cardType={topList}
                      details={details === index + 4 ? true : false}
                      isNewPool={pool.isNewPool}
                      isStaked={pool.isStaked}
                    />
                  ))}
                </div>
                {activeCard3 &&
                topList === "Staking" &&
                cardIndex < 2 &&
                chain === "bnb" ? (
                  <StakeBsc
                    lp_id={LP_IDBNB_Array[cardIndex]}
                    staking={stakearrayStakeBscDyp2[cardIndex]}
                    apr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_percent
                        : expiredDYPPools[cardIndex]?.apy_percent
                    }
                    liquidity={wbsc_address}
                    expiration_time={expirearrayStakeBscDyp2[cardIndex]}
                    finalApr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_performancefee
                        : expiredDYPPools[cardIndex]?.apy_performancefee
                    }
                    fee={
                      expiredPools === false
                        ? activePools[cardIndex]?.performancefee
                        : expiredDYPPools[cardIndex]?.performancefee
                    }
                    lockTime={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                            "No"
                            ? "No Lock"
                            : parseInt(
                                activePools[cardIndex]?.lock_time?.split(" ")[0]
                              )
                          : expiredDYPPools[cardIndex]?.lock_time?.split(
                              " "
                            )[0] === "No"
                          ? "No Lock"
                          : parseInt(
                              expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0]
                            )
                        : "No Lock"
                    }
                    listType={listType}
                    other_info={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : expiredDYPPools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : false
                    }
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_resultbsc}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={false}
                    referrer={referrer}
                  />
                ) : activeCard3 &&
                  cardIndex >= 0 &&
                  topList === "Staking" &&
                  chain === "eth" ? (
                  <InitConstantStakingiDYP
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_result}
                    lp_id={lp_id[cardIndex]}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={false}
                  />
                ) : activeCard3 &&
                  cardIndex >= 2 &&
                  topList === "Staking" &&
                  chain === "bnb" ? (
                  <StakeBscIDyp
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_resultbsc}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={false}
                    staking={
                      expiredPools === false
                        ? stakearrayStakeBsciDyp2[cardIndex - 2]
                        : stakearrayStakeBsciDyp2Expired[cardIndex - 3]
                    }
                    listType={listType}
                    finalApr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_performancefee
                        : expiredDYPPools[cardIndex]?.apy_performancefee
                    }
                    apr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_percent
                        : expiredDYPPools[cardIndex]?.apy_percent
                    }
                    liquidity={wbsc_address}
                    expiration_time={
                      expiredPools === false
                        ? expirearrayStakeBsciDyp2[cardIndex - 2]
                        : expirearrayStakeBsciDyp2Expired[cardIndex - 3]
                    }
                    other_info={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : expiredDYPPools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : false
                    }
                    fee_s={
                      expiredPools === false
                        ? activePools[cardIndex]?.performancefee
                        : expiredDYPPools[cardIndex]?.performancefee
                    }
                    fee_u={0}
                    lockTime={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                            "No"
                            ? "No Lock"
                            : parseInt(
                                activePools[cardIndex]?.lock_time?.split(" ")[0]
                              )
                          : expiredDYPPools[cardIndex]?.lock_time?.split(
                              " "
                            )[0] === "No"
                          ? "No Lock"
                          : parseInt(
                              expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0]
                            )
                        : "No Lock"
                    }
                  />
                ) : activeCard3 &&
                  topList === "Staking" &&
                  chain === "avax" &&
                  cardIndex < 2 ? (
                  <StakeAvax
                    is_wallet_connected={isConnected}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    the_graph_result={the_graph_resultavax}
                    chainId={chainId}
                    coinbase={coinbase}
                    expired={false}
                    referrer={referrer}
                  />
                ) : activeCard3 &&
                  topList === "Staking" &&
                  chain === "avax" &&
                  cardIndex >= 2 ? (
                  <StakeAvaxIDyp
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_resultavax}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={false}
                    staking={
                      expiredPools === false
                        ? stakingarrayStakeAvaxiDypActive[cardIndex - 2]
                        : stakingarrayStakeAvaxiDypExpired[cardIndex - 3]
                    }
                    listType={listType}
                    finalApr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_performancefee
                        : expiredDYPPools[cardIndex]?.apy_performancefee
                    }
                    apr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_percent
                        : expiredDYPPools[cardIndex]?.apy_percent
                    }
                    liquidity={avax_address}
                    expiration_time={expirearrayStakeAvaxiDyp[cardIndex]}
                    other_info={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : expiredDYPPools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : false
                    }
                    fee_s={
                      expiredPools === false
                        ? activePools[cardIndex]?.performancefee
                        : expiredDYPPools[cardIndex]?.performancefee
                    }
                    fee_u={feeUarrayStakeAvaxiDyp[cardIndexavaxiDyp - 3]}
                    lockTime={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                            "No"
                            ? "No Lock"
                            : activePools[cardIndex]?.lock_time?.split(" ")[0]
                          : expiredDYPPools[cardIndex]?.lock_time?.split(
                              " "
                            )[0] === "No"
                          ? "No Lock"
                          : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                        : "No Lock"
                    }
                  />
                ) : activeCard3 && topList === "Vault" ? (
                  <Vault
                    vault={vaultArray[cardIndex]}
                    token={tokenvaultArray[cardIndex]}
                    platformTokenApyPercent={vaultplatformArray[cardIndex]}
                    UNDERLYING_DECIMALS={vaultdecimalsArray[cardIndex]}
                    UNDERLYING_SYMBOL={vaultsymbolArray[cardIndex]}
                    expiration_time={"04 March 2023"}
                    coinbase={coinbase}
                    lockTime={"No Lock"}
                    handleConnection={handleConnection}
                    chainId={chainId}
                    listType={listType}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={false}
                    isConnected={isConnected}
                    the_graph_result={the_graph_result}
                  />
                ) : (
                  <></>
                )}
                <div
                  className="top-picks-container"
                  style={{ marginTop: "25px" }}
                >
                  {activePools.slice(6, 8).map((pool, index) => (
                    <TopPoolsCard
                      display={
                        pool.expired
                          ? pool.expired === "Yes"
                            ? "none"
                            : ""
                          : ""
                      }
                      expired={false}
                      key={index}
                      chain={chain}
                      top_pick={pool.top_pick}
                      tokenName={
                        pool.tokenName
                          ? pool.tokenName
                          : pool.pair_name
                          ? pool.pair_name
                          : ""
                      }
                      apr={pool.apy_percent + "%"}
                      tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                      lockTime={
                        pool.lockTime
                          ? pool.lockTime
                          : pool.lock_time
                          ? pool.lock_time
                          : locktimeFarm[index]
                      }
                      tokenLogo={
                        pool.icon
                          ? pool.icon
                          : pool.pair_name === "iDYP"
                          ? "idypius.svg"
                          : "dyplogo.svg"
                      }
                      onShowDetailsClick={() => {
                        setActiveCard(null);
                        setActiveCard2(null);
                        setActiveCard3(null);
                        setActiveCard4(topPools[index + 6]);
                        setActiveCard5(null);
                        setActiveCard6(null);
                        setActiveCardNFT(false);
                        handleCardIndexStake(index + 6);
                        handleCardIndexStake30(index + 6);
                        handleCardIndexStakeiDyp(index + 6);
                        setDetails(index + 6);
                      }}
                      onHideDetailsClick={() => {
                        setActiveCard4(null);
                        setDetails();
                      }}
                      cardType={topList}
                      details={details === index + 6 ? true : false}
                      isNewPool={pool.isNewPool}
                      isStaked={pool.isStaked}
                    />
                  ))}
                </div>
                {activeCard4 &&
                topList === "Staking" &&
                cardIndex < 2 &&
                chain === "bnb" ? (
                  <StakeBsc
                    lp_id={LP_IDBNB_Array[cardIndex]}
                    staking={stakearrayStakeBscDyp2[cardIndex]}
                    apr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_percent
                        : expiredDYPPools[cardIndex]?.apy_percent
                    }
                    liquidity={wbsc_address}
                    expiration_time={expirearrayStakeBscDyp2[cardIndex]}
                    finalApr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_performancefee
                        : expiredDYPPools[cardIndex]?.apy_performancefee
                    }
                    fee={
                      expiredPools === false
                        ? activePools[cardIndex]?.performancefee
                        : expiredDYPPools[cardIndex]?.performancefee
                    }
                    lockTime={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                            "No"
                            ? "No Lock"
                            : parseInt(
                                activePools[cardIndex]?.lock_time?.split(" ")[0]
                              )
                          : expiredDYPPools[cardIndex]?.lock_time?.split(
                              " "
                            )[0] === "No"
                          ? "No Lock"
                          : parseInt(
                              expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0]
                            )
                        : "No Lock"
                    }
                    listType={listType}
                    other_info={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : expiredDYPPools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : false
                    }
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_resultbsc}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={false}
                    referrer={referrer}
                  />
                ) : activeCard4 &&
                  cardIndex >= 0 &&
                  topList === "Staking" &&
                  chain === "eth" ? (
                  <InitConstantStakingiDYP
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_result}
                    lp_id={lp_id[cardIndex]}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={false}
                  />
                ) : activeCard4 &&
                  cardIndex >= 2 &&
                  topList === "Staking" &&
                  chain === "bnb" ? (
                  <StakeBscIDyp
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_resultbsc}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={false}
                    staking={
                      expiredPools === false
                        ? stakearrayStakeBsciDyp2[cardIndex - 2]
                        : stakearrayStakeBsciDyp2Expired[cardIndex - 3]
                    }
                    listType={listType}
                    finalApr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_performancefee
                        : expiredDYPPools[cardIndex]?.apy_performancefee
                    }
                    apr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_percent
                        : expiredDYPPools[cardIndex]?.apy_percent
                    }
                    liquidity={wbsc_address}
                    expiration_time={
                      expiredPools === false
                        ? expirearrayStakeBsciDyp2[cardIndex - 2]
                        : expirearrayStakeBsciDyp2Expired[cardIndex - 3]
                    }
                    other_info={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : expiredDYPPools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : false
                    }
                    fee_s={
                      expiredPools === false
                        ? activePools[cardIndex]?.performancefee
                        : expiredDYPPools[cardIndex]?.performancefee
                    }
                    fee_u={0}
                    lockTime={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                            "No"
                            ? "No Lock"
                            : parseInt(
                                activePools[cardIndex]?.lock_time?.split(" ")[0]
                              )
                          : expiredDYPPools[cardIndex]?.lock_time?.split(
                              " "
                            )[0] === "No"
                          ? "No Lock"
                          : parseInt(
                              expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0]
                            )
                        : "No Lock"
                    }
                  />
                ) : activeCard4 &&
                  topList === "Staking" &&
                  chain === "avax" &&
                  cardIndex < 2 ? (
                  <StakeAvax
                    is_wallet_connected={isConnected}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    the_graph_result={the_graph_resultavax}
                    chainId={chainId}
                    coinbase={coinbase}
                    referrer={referrer}
                    expired={false}
                  />
                ) : activeCard4 &&
                  topList === "Staking" &&
                  chain === "avax" &&
                  cardIndex >= 2 ? (
                  <StakeAvaxIDyp
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_resultavax}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={false}
                    staking={
                      expiredPools === false
                        ? stakingarrayStakeAvaxiDypActive[cardIndex - 2]
                        : stakingarrayStakeAvaxiDypExpired[cardIndex - 3]
                    }
                    listType={listType}
                    finalApr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_performancefee
                        : expiredDYPPools[cardIndex]?.apy_performancefee
                    }
                    apr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_percent
                        : expiredDYPPools[cardIndex]?.apy_percent
                    }
                    liquidity={avax_address}
                    expiration_time={expirearrayStakeAvaxiDyp[cardIndex]}
                    other_info={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : expiredDYPPools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : false
                    }
                    fee_s={
                      expiredPools === false
                        ? activePools[cardIndex]?.performancefee
                        : expiredDYPPools[cardIndex]?.performancefee
                    }
                    fee_u={feeUarrayStakeAvaxiDyp[cardIndexavaxiDyp - 3]}
                    lockTime={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                            "No"
                            ? "No Lock"
                            : activePools[cardIndex]?.lock_time?.split(" ")[0]
                          : expiredDYPPools[cardIndex]?.lock_time?.split(
                              " "
                            )[0] === "No"
                          ? "No Lock"
                          : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                        : "No Lock"
                    }
                  />
                ) : activeCard4 && topList === "Vault" ? (
                  <Vault
                    vault={vaultArray[cardIndex]}
                    token={tokenvaultArray[cardIndex]}
                    platformTokenApyPercent={vaultplatformArray[cardIndex]}
                    UNDERLYING_DECIMALS={vaultdecimalsArray[cardIndex]}
                    UNDERLYING_SYMBOL={vaultsymbolArray[cardIndex]}
                    expiration_time={"04 March 2023"}
                    coinbase={coinbase}
                    lockTime={"No Lock"}
                    handleConnection={handleConnection}
                    chainId={chainId}
                    listType={listType}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={false}
                    isConnected={isConnected}
                    the_graph_result={the_graph_result}
                  />
                ) : (
                  <></>
                )}
                <div
                  className="top-picks-container"
                  style={{ marginTop: activePools.length > 8 && "25px" }}
                >
                  {activePools
                    .slice(8, activePools.length)
                    .map((pool, index) => (
                      <TopPoolsCard
                        display={
                          pool.expired
                            ? pool.expired === "Yes"
                              ? "none"
                              : ""
                            : ""
                        }
                        expired={false}
                        key={index}
                        chain={chain}
                        top_pick={pool.top_pick}
                        tokenName={
                          pool.tokenName
                            ? pool.tokenName
                            : pool.pair_name
                            ? pool.pair_name
                            : ""
                        }
                        apr={pool.apy_percent + "%"}
                        tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                        lockTime={
                          pool.lockTime
                            ? pool.lockTime
                            : pool.lock_time
                            ? pool.lock_time
                            : locktimeFarm[index]
                        }
                        tokenLogo={
                          pool.icon
                            ? pool.icon
                            : pool.pair_name === "iDYP"
                            ? "idypius.svg"
                            : "dyplogo.svg"
                        }
                        onShowDetailsClick={() => {
                          setActiveCard(null);
                          setActiveCard2(null);
                          setActiveCard3(null);
                          setActiveCard4(null);
                          setActiveCard5(topPools[index + 8]);
                          setActiveCard6(null);
                          setActiveCardNFT(false);
                          handleCardIndexStake(index + 8);
                          handleCardIndexStake30(index + 8);
                          handleCardIndexStakeiDyp(index + 8);
                          setDetails(index + 8);
                        }}
                        onHideDetailsClick={() => {
                          setActiveCard5(null);
                          setDetails();
                        }}
                        cardType={topList}
                        details={details === index + 8 ? true : false}
                        isNewPool={pool.isNewPool}
                        isStaked={pool.isStaked}
                      />
                    ))}
                </div>
                {activeCard5 &&
                topList === "Staking" &&
                cardIndex < 2 &&
                chain === "bnb" ? (
                  <StakeBsc
                    lp_id={LP_IDBNB_Array[cardIndex]}
                    staking={stakearrayStakeBscDyp2[cardIndex]}
                    apr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_percent
                        : expiredDYPPools[cardIndex]?.apy_percent
                    }
                    liquidity={wbsc_address}
                    expiration_time={expirearrayStakeBscDyp2[cardIndex]}
                    finalApr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_performancefee
                        : expiredDYPPools[cardIndex]?.apy_performancefee
                    }
                    fee={
                      expiredPools === false
                        ? activePools[cardIndex]?.performancefee
                        : expiredDYPPools[cardIndex]?.performancefee
                    }
                    lockTime={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                            "No"
                            ? "No Lock"
                            : parseInt(
                                activePools[cardIndex]?.lock_time?.split(" ")[0]
                              )
                          : expiredDYPPools[cardIndex]?.lock_time?.split(
                              " "
                            )[0] === "No"
                          ? "No Lock"
                          : parseInt(
                              expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0]
                            )
                        : "No Lock"
                    }
                    listType={listType}
                    other_info={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : expiredDYPPools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : false
                    }
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_resultbsc}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={false}
                    referrer={referrer}
                  />
                ) : activeCard5 &&
                  cardIndex >= 0 &&
                  topList === "Staking" &&
                  chain === "eth" ? (
                  <InitConstantStakingiDYP
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_result}
                    lp_id={lp_id[cardIndex]}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={false}
                  />
                ) : activeCard5 &&
                  cardIndex >= 2 &&
                  topList === "Staking" &&
                  chain === "bnb" ? (
                  <StakeBscIDyp
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_resultbsc}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={false}
                    staking={
                      expiredPools === false
                        ? stakearrayStakeBsciDyp2[cardIndex - 2]
                        : stakearrayStakeBsciDyp2Expired[cardIndex - 3]
                    }
                    listType={listType}
                    finalApr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_performancefee
                        : expiredDYPPools[cardIndex]?.apy_performancefee
                    }
                    apr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_percent
                        : expiredDYPPools[cardIndex]?.apy_percent
                    }
                    liquidity={wbsc_address}
                    expiration_time={
                      expiredPools === false
                        ? expirearrayStakeBsciDyp2[cardIndex - 2]
                        : expirearrayStakeBsciDyp2Expired[cardIndex - 3]
                    }
                    other_info={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : expiredDYPPools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : false
                    }
                    fee_s={
                      expiredPools === false
                        ? activePools[cardIndex]?.performancefee
                        : expiredDYPPools[cardIndex]?.performancefee
                    }
                    fee_u={0}
                    lockTime={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                            "No"
                            ? "No Lock"
                            : parseInt(
                                activePools[cardIndex]?.lock_time?.split(" ")[0]
                              )
                          : expiredDYPPools[cardIndex]?.lock_time?.split(
                              " "
                            )[0] === "No"
                          ? "No Lock"
                          : parseInt(
                              expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0]
                            )
                        : "No Lock"
                    }
                  />
                ) : activeCard5 &&
                  topList === "Staking" &&
                  chain === "avax" &&
                  cardIndex < 2 ? (
                  <StakeAvax
                    is_wallet_connected={isConnected}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    the_graph_result={the_graph_resultavax}
                    chainId={chainId}
                    coinbase={coinbase}
                    expired={false}
                    referrer={referrer}
                  />
                ) : activeCard5 &&
                  topList === "Staking" &&
                  chain === "avax" &&
                  cardIndex >= 2 ? (
                  <StakeAvaxIDyp
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_resultavax}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={false}
                    staking={
                      expiredPools === false
                        ? stakingarrayStakeAvaxiDypActive[cardIndex - 2]
                        : stakingarrayStakeAvaxiDypExpired[cardIndex - 3]
                    }
                    listType={listType}
                    finalApr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_performancefee
                        : expiredDYPPools[cardIndex]?.apy_performancefee
                    }
                    apr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_percent
                        : expiredDYPPools[cardIndex]?.apy_percent
                    }
                    liquidity={avax_address}
                    expiration_time={expirearrayStakeAvaxiDyp[cardIndex]}
                    other_info={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : expiredDYPPools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : false
                    }
                    fee_s={
                      expiredPools === false
                        ? activePools[cardIndex]?.performancefee
                        : expiredDYPPools[cardIndex]?.performancefee
                    }
                    fee_u={feeUarrayStakeAvaxiDyp[cardIndexavaxiDyp - 3]}
                    lockTime={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                            "No"
                            ? "No Lock"
                            : activePools[cardIndex]?.lock_time?.split(" ")[0]
                          : expiredDYPPools[cardIndex]?.lock_time?.split(
                              " "
                            )[0] === "No"
                          ? "No Lock"
                          : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                        : "No Lock"
                    }
                  />
                ) : activeCard5 && topList === "Vault" ? (
                  <Vault
                    vault={vaultArray[cardIndex]}
                    token={tokenvaultArray[cardIndex]}
                    platformTokenApyPercent={vaultplatformArray[cardIndex]}
                    UNDERLYING_DECIMALS={vaultdecimalsArray[cardIndex]}
                    UNDERLYING_SYMBOL={vaultsymbolArray[cardIndex]}
                    expiration_time={"04 March 2023"}
                    coinbase={coinbase}
                    lockTime={"No Lock"}
                    handleConnection={handleConnection}
                    chainId={chainId}
                    listType={listType}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={false}
                    isConnected={isConnected}
                    the_graph_result={the_graph_result}
                  />
                ) : (
                  <></>
                )}
                <div
                  className="top-picks-container"
                  style={{ marginTop: activePools.length > 9 && "25px" }}
                >
                  {activePools
                    .slice(10, activePools.length)
                    .map((pool, index) => (
                      <TopPoolsCard
                        display={
                          pool.expired
                            ? pool.expired === "Yes"
                              ? "none"
                              : ""
                            : ""
                        }
                        expired={false}
                        key={index}
                        chain={chain}
                        top_pick={pool.top_pick}
                        tokenName={
                          pool.tokenName
                            ? pool.tokenName
                            : pool.pair_name
                            ? pool.pair_name
                            : ""
                        }
                        apr={pool.apy_percent + "%"}
                        tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                        lockTime={
                          pool.lockTime
                            ? pool.lockTime
                            : pool.lock_time
                            ? pool.lock_time
                            : locktimeFarm[index]
                        }
                        tokenLogo={
                          pool.icon
                            ? pool.icon
                            : pool.pair_name === "iDYP"
                            ? "idypius.svg"
                            : "dyplogo.svg"
                        }
                        onShowDetailsClick={() => {
                          setActiveCard(null);
                          setActiveCard2(null);
                          setActiveCard3(null);
                          setActiveCard4(null);
                          setActiveCard5(null);
                          setActiveCard6(topPools[index + 10]);
                          setActiveCardNFT(false);
                          handleCardIndexStake(index + 10);
                          handleCardIndexStake30(index + 10);
                          handleCardIndexStakeiDyp(index + 10);
                          setDetails(index + 10);
                        }}
                        onHideDetailsClick={() => {
                          setActiveCard6(null);
                          setDetails();
                        }}
                        cardType={topList}
                        details={details === index + 10 ? true : false}
                        isNewPool={pool.isNewPool}
                        isStaked={pool.isStaked}
                      />
                    ))}
                </div>
                {activeCard6 &&
                topList === "Staking" &&
                cardIndex < 2 &&
                chain === "bnb" ? (
                  <StakeBsc
                    lp_id={LP_IDBNB_Array[cardIndex]}
                    staking={stakearrayStakeBscDyp2[cardIndex]}
                    apr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_percent
                        : expiredDYPPools[cardIndex]?.apy_percent
                    }
                    liquidity={wbsc_address}
                    expiration_time={expirearrayStakeBscDyp2[cardIndex]}
                    finalApr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_performancefee
                        : expiredDYPPools[cardIndex]?.apy_performancefee
                    }
                    fee={
                      expiredPools === false
                        ? activePools[cardIndex]?.performancefee
                        : expiredDYPPools[cardIndex]?.performancefee
                    }
                    lockTime={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                            "No"
                            ? "No Lock"
                            : parseInt(
                                activePools[cardIndex]?.lock_time?.split(" ")[0]
                              )
                          : expiredDYPPools[cardIndex]?.lock_time?.split(
                              " "
                            )[0] === "No"
                          ? "No Lock"
                          : parseInt(
                              expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0]
                            )
                        : "No Lock"
                    }
                    listType={listType}
                    other_info={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : expiredDYPPools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : false
                    }
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_resultbsc}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={false}
                    referrer={referrer}
                  />
                ) : activeCard6 &&
                  cardIndex >= 0 &&
                  topList === "Staking" &&
                  chain === "eth" ? (
                  <InitConstantStakingiDYP
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_result}
                    lp_id={lp_id[cardIndex]}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={false}
                  />
                ) : activeCard6 &&
                  cardIndex >= 2 &&
                  topList === "Staking" &&
                  chain === "bnb" ? (
                  <StakeBscIDyp
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_resultbsc}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={false}
                    staking={
                      expiredPools === false
                        ? stakearrayStakeBsciDyp2[cardIndex - 2]
                        : stakearrayStakeBsciDyp2Expired[cardIndex - 3]
                    }
                    listType={listType}
                    finalApr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_performancefee
                        : expiredDYPPools[cardIndex]?.apy_performancefee
                    }
                    apr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_percent
                        : expiredDYPPools[cardIndex]?.apy_percent
                    }
                    liquidity={wbsc_address}
                    expiration_time={
                      expiredPools === false
                        ? expirearrayStakeBsciDyp2[cardIndex - 2]
                        : expirearrayStakeBsciDyp2Expired[cardIndex - 3]
                    }
                    other_info={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : expiredDYPPools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : false
                    }
                    fee_s={
                      expiredPools === false
                        ? activePools[cardIndex]?.performancefee
                        : expiredDYPPools[cardIndex]?.performancefee
                    }
                    fee_u={0}
                    lockTime={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                            "No"
                            ? "No Lock"
                            : parseInt(
                                activePools[cardIndex]?.lock_time?.split(" ")[0]
                              )
                          : expiredDYPPools[cardIndex]?.lock_time?.split(
                              " "
                            )[0] === "No"
                          ? "No Lock"
                          : parseInt(
                              expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0]
                            )
                        : "No Lock"
                    }
                  />
                ) : activeCard6 &&
                  topList === "Staking" &&
                  chain === "avax" &&
                  cardIndex < 2 ? (
                  <StakeAvax
                    is_wallet_connected={isConnected}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    the_graph_result={the_graph_resultavax}
                    chainId={chainId}
                    coinbase={coinbase}
                    referrer={referrer}
                    expired={false}
                  />
                ) : activeCard6 &&
                  topList === "Staking" &&
                  chain === "avax" &&
                  cardIndex >= 2 ? (
                  <StakeAvaxIDyp
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_resultavax}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={false}
                    staking={
                      expiredPools === false
                        ? stakingarrayStakeAvaxiDypActive[cardIndex - 2]
                        : stakingarrayStakeAvaxiDypExpired[cardIndex - 3]
                    }
                    listType={listType}
                    finalApr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_performancefee
                        : expiredDYPPools[cardIndex]?.apy_performancefee
                    }
                    apr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_percent
                        : expiredDYPPools[cardIndex]?.apy_percent
                    }
                    liquidity={avax_address}
                    expiration_time={expirearrayStakeAvaxiDyp[cardIndex]}
                    other_info={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : expiredDYPPools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : false
                    }
                    fee_s={
                      expiredPools === false
                        ? activePools[cardIndex]?.performancefee
                        : expiredDYPPools[cardIndex]?.performancefee
                    }
                    fee_u={feeUarrayStakeAvaxiDyp[cardIndexavaxiDyp - 3]}
                    lockTime={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                            "No"
                            ? "No Lock"
                            : activePools[cardIndex]?.lock_time?.split(" ")[0]
                          : expiredDYPPools[cardIndex]?.lock_time?.split(
                              " "
                            )[0] === "No"
                          ? "No Lock"
                          : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                        : "No Lock"
                    }
                  />
                ) : activeCard6 && topList === "Vault" ? (
                  <Vault
                    vault={vaultArray[cardIndex]}
                    token={tokenvaultArray[cardIndex]}
                    platformTokenApyPercent={vaultplatformArray[cardIndex]}
                    UNDERLYING_DECIMALS={vaultdecimalsArray[cardIndex]}
                    UNDERLYING_SYMBOL={vaultsymbolArray[cardIndex]}
                    expiration_time={"04 March 2023"}
                    coinbase={coinbase}
                    lockTime={"No Lock"}
                    handleConnection={handleConnection}
                    chainId={chainId}
                    listType={listType}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={false}
                    isConnected={isConnected}
                    the_graph_result={the_graph_result}
                  />
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <div className="px-0">
                <>
                  <div className="top-picks-container">
                    {topList === "Staking" && chain === "eth" && (
                      <CawsCard
                        onShowDetailsClick={() => {
                          setActiveCardNFT(true);
                          setActiveCard(null);
                          setActiveCard2(null);
                          setActiveCard3(null);
                          setActiveCard4(null);
                          setDetails();
                        }}
                        onHideDetailsClick={() => {
                          setActiveCardNFT(false);
                          setDetails();
                        }}
                        cardType={topList}
                        details={activeCardNFT === true ? true : false}
                        listType={listType}
                        tvl={"$" + getFormattedNumber(cawsCard2.tvl_usd)}
                      />
                    )}
                    {activeCardNFT && (
                      <CawsDetails
                        coinbase={coinbase}
                        isConnected={isConnected}
                        listType={listType}
                        chainId={chainId}
                        handleSwitchNetwork={handleSwitchNetwork}
                        handleConnection={handleConnection}
                      />
                    )}
                    {activePools.slice(0, 1).map((pool, index) => (
                      <TopPoolsCard
                        display={
                          pool.expired
                            ? pool.expired === "Yes"
                              ? "none"
                              : ""
                            : ""
                        }
                        expired={false}
                        key={index}
                        chain={chain}
                        top_pick={pool.top_pick}
                        tokenName={
                          pool.tokenName
                            ? pool.tokenName
                            : pool.pair_name
                            ? pool.pair_name
                            : ""
                        }
                        apr={pool.apy_percent + "%"}
                        tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                        lockTime={
                          pool.lockTime
                            ? pool.lockTime
                            : pool.lock_time
                            ? pool.lock_time
                            : locktimeFarm[index]
                        }
                        tokenLogo={
                          pool.icon
                            ? pool.icon
                            : pool.pair_name === "iDYP"
                            ? "idypius.svg"
                            : "dyplogo.svg"
                        }
                        onShowDetailsClick={() => {
                          setActiveCard(topPools[index]);
                          setActiveCard2(null);
                          setActiveCard3(null);
                          setActiveCard4(null);
                          setActiveCard5(null);
                          setActiveCard6(null);
                          setActiveCard7(null);
                          setActiveCard8(null);
                          setActiveCard9(null);
                          setActiveCard10(null);
                          setActiveCard11(null);
                          setActiveCard12(null);
                          setActiveCardNFT(false);
                          handleCardIndexStake(index);
                          handleCardIndexStake30(index);
                          handleCardIndexStakeiDyp(index);
                          setDetails(index);
                        }}
                        onHideDetailsClick={() => {
                          setActiveCard(null);
                          setDetails();
                        }}
                        cardType={topList}
                        details={details === index ? true : false}
                        isNewPool={pool.isNewPool}
                        isStaked={pool.isStaked}
                      />
                    ))}
                  </div>

                  {activeCard &&
                  topList === "Staking" &&
                  cardIndex < 2 &&
                  chain === "bnb" ? (
                    <StakeBsc
                      lp_id={LP_IDBNB_Array[cardIndex]}
                      staking={stakearrayStakeBscDyp2[cardIndex]}
                      apr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_percent
                          : expiredDYPPools[cardIndex]?.apy_percent
                      }
                      liquidity={wbsc_address}
                      expiration_time={expirearrayStakeBscDyp2[cardIndex]}
                      finalApr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_performancefee
                          : expiredDYPPools[cardIndex]?.apy_performancefee
                      }
                      fee={
                        expiredPools === false
                          ? activePools[cardIndex]?.performancefee
                          : expiredDYPPools[cardIndex]?.performancefee
                      }
                      lockTime={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                              ? "No Lock"
                              : parseInt(
                                  activePools[cardIndex]?.lock_time?.split(
                                    " "
                                  )[0]
                                )
                            : expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                            ? "No Lock"
                            : parseInt(
                                expiredDYPPools[cardIndex]?.lock_time?.split(
                                  " "
                                )[0]
                              )
                          : "No Lock"
                      }
                      listType={listType}
                      other_info={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.expired === "Yes"
                              ? true
                              : false
                            : expiredDYPPools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : false
                      }
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_resultbsc}
                      chainId={chainId}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      referrer={referrer}
                    />
                  ) : activeCard &&
                    cardIndex >= 0 &&
                    topList === "Staking" &&
                    chain === "eth" ? (
                    <InitConstantStakingiDYP
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_result}
                      lp_id={lp_id[cardIndex]}
                      chainId={chainId}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      staking={stakeArrayiDYPActive[cardIndex]}
                      listType={listType}
                      finalApr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_performancefee
                          : expiredDYPPools[cardIndex]?.apy_performancefee
                      }
                      apr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_percent
                          : expiredDYPPools[cardIndex]?.apy_percent
                      }
                      liquidity={eth_address}
                      expiration_time={expirationArray[cardIndex]}
                      other_info={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.expired === "Yes"
                              ? true
                              : false
                            : expiredDYPPools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : false
                      }
                      fee_s={
                        expiredPools === false
                          ? activePools[cardIndex]?.performancefee
                          : expiredDYPPools[cardIndex]?.performancefee
                      }
                      fee_u={withdrawFeeiDyp[cardIndex]}
                      lockTime={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                              ? "No Lock"
                              : activePools[cardIndex]?.lock_time?.split(" ")[0]
                            : expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                            ? "No Lock"
                            : expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0]
                          : "No Lock"
                      }
                    />
                  ) : activeCard &&
                    cardIndex >= 2 &&
                    topList === "Staking" &&
                    chain === "bnb" ? (
                    <StakeBscIDyp
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_resultbsc}
                      chainId={chainId}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      staking={
                        expiredPools === false
                          ? stakearrayStakeBsciDyp2[cardIndex - 2]
                          : stakearrayStakeBsciDyp2Expired[cardIndex - 3]
                      }
                      listType={listType}
                      finalApr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_performancefee
                          : expiredDYPPools[cardIndex]?.apy_performancefee
                      }
                      apr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_percent
                          : expiredDYPPools[cardIndex]?.apy_percent
                      }
                      liquidity={wbsc_address}
                      expiration_time={
                        expiredPools === false
                          ? expirearrayStakeBsciDyp2[cardIndex - 2]
                          : expirearrayStakeBsciDyp2Expired[cardIndex - 3]
                      }
                      other_info={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.expired === "Yes"
                              ? true
                              : false
                            : expiredDYPPools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : false
                      }
                      fee_s={
                        expiredPools === false
                          ? activePools[cardIndex]?.performancefee
                          : expiredDYPPools[cardIndex]?.performancefee
                      }
                      fee_u={0}
                      lockTime={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                              ? "No Lock"
                              : parseInt(
                                  activePools[cardIndex]?.lock_time?.split(
                                    " "
                                  )[0]
                                )
                            : expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                            ? "No Lock"
                            : parseInt(
                                expiredDYPPools[cardIndex]?.lock_time?.split(
                                  " "
                                )[0]
                              )
                          : "No Lock"
                      }
                    />
                  ) : activeCard &&
                    topList === "Staking" &&
                    chain === "avax" &&
                    cardIndex < 2 ? (
                    <StakeAvax
                      is_wallet_connected={isConnected}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      the_graph_result={the_graph_resultavax}
                      chainId={chainId}
                      coinbase={coinbase}
                      referrer={referrer}
                      expired={false}
                    />
                  ) : activeCard &&
                    topList === "Staking" &&
                    chain === "avax" &&
                    cardIndex >= 2 ? (
                    <StakeAvaxIDyp
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_resultavax}
                      chainId={chainId}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      staking={
                        expiredPools === false
                          ? stakingarrayStakeAvaxiDypActive[cardIndex - 2]
                          : stakingarrayStakeAvaxiDypExpired[cardIndex - 3]
                      }
                      listType={listType}
                      finalApr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_performancefee
                          : expiredDYPPools[cardIndex]?.apy_performancefee
                      }
                      apr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_percent
                          : expiredDYPPools[cardIndex]?.apy_percent
                      }
                      liquidity={avax_address}
                      expiration_time={expirearrayStakeAvaxiDyp[cardIndex]}
                      other_info={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.expired === "Yes"
                              ? true
                              : false
                            : expiredDYPPools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : false
                      }
                      fee_s={
                        expiredPools === false
                          ? activePools[cardIndex]?.performancefee
                          : expiredDYPPools[cardIndex]?.performancefee
                      }
                      fee_u={feeUarrayStakeAvaxiDyp[cardIndexavaxiDyp - 3]}
                      lockTime={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                              ? "No Lock"
                              : activePools[cardIndex]?.lock_time?.split(" ")[0]
                            : expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                            ? "No Lock"
                            : expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0]
                          : "No Lock"
                      }
                    />
                  ) : activeCard && topList === "Vault" ? (
                    <Vault
                      vault={vaultArray[cardIndex]}
                      token={tokenvaultArray[cardIndex]}
                      platformTokenApyPercent={vaultplatformArray[cardIndex]}
                      UNDERLYING_DECIMALS={vaultdecimalsArray[cardIndex]}
                      UNDERLYING_SYMBOL={vaultsymbolArray[cardIndex]}
                      expiration_time={"04 March 2023"}
                      coinbase={coinbase}
                      lockTime={"No Lock"}
                      handleConnection={handleConnection}
                      chainId={chainId}
                      listType={listType}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      isConnected={isConnected}
                      the_graph_result={the_graph_result}
                    />
                  ) : (
                    <></>
                  )}
                </>
                <>
                  <div
                    className="top-picks-container"
                    style={{ marginTop: "25px" }}
                  >
                    {activePools.slice(1, 2).map((pool, index) => (
                      <TopPoolsCard
                        display={
                          pool.expired
                            ? pool.expired === "Yes"
                              ? "none"
                              : ""
                            : ""
                        }
                        expired={false}
                        key={index}
                        chain={chain}
                        top_pick={pool.top_pick}
                        tokenName={
                          pool.tokenName
                            ? pool.tokenName
                            : pool.pair_name
                            ? pool.pair_name
                            : ""
                        }
                        apr={pool.apy_percent + "%"}
                        tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                        lockTime={
                          pool.lockTime
                            ? pool.lockTime
                            : pool.lock_time
                            ? pool.lock_time
                            : locktimeFarm[index]
                        }
                        tokenLogo={
                          pool.icon
                            ? pool.icon
                            : pool.pair_name === "iDYP"
                            ? "idypius.svg"
                            : "dyplogo.svg"
                        }
                        onShowDetailsClick={() => {
                          setActiveCard(null);
                          setActiveCard2(topPools[index + 1]);
                          setActiveCard3(null);
                          setActiveCard4(null);
                          setActiveCard5(null);
                          setActiveCard6(null);
                          setActiveCard7(null);
                          setActiveCard8(null);
                          setActiveCard9(null);
                          setActiveCard10(null);
                          setActiveCard11(null);
                          setActiveCard12(null);
                          setActiveCardNFT(false);
                          handleCardIndexStake(index + 1);
                          handleCardIndexStake30(index + 1);
                          handleCardIndexStakeiDyp(index + 1);
                          setDetails(index + 1);
                        }}
                        onHideDetailsClick={() => {
                          setActiveCard2(null);
                          setDetails();
                        }}
                        cardType={topList}
                        details={details === index + 1 ? true : false}
                        isNewPool={pool.isNewPool}
                        isStaked={pool.isStaked}
                      />
                    ))}
                  </div>
                  {activeCard2 &&
                  topList === "Staking" &&
                  cardIndex < 2 &&
                  chain === "bnb" ? (
                    <StakeBsc
                      lp_id={LP_IDBNB_Array[cardIndex]}
                      staking={stakearrayStakeBscDyp2[cardIndex]}
                      apr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_percent
                          : expiredDYPPools[cardIndex]?.apy_percent
                      }
                      liquidity={wbsc_address}
                      expiration_time={expirearrayStakeBscDyp2[cardIndex]}
                      finalApr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_performancefee
                          : expiredDYPPools[cardIndex]?.apy_performancefee
                      }
                      fee={
                        expiredPools === false
                          ? activePools[cardIndex]?.performancefee
                          : expiredDYPPools[cardIndex]?.performancefee
                      }
                      lockTime={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                              ? "No Lock"
                              : parseInt(
                                  activePools[cardIndex]?.lock_time?.split(
                                    " "
                                  )[0]
                                )
                            : expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                            ? "No Lock"
                            : parseInt(
                                expiredDYPPools[cardIndex]?.lock_time?.split(
                                  " "
                                )[0]
                              )
                          : "No Lock"
                      }
                      listType={listType}
                      other_info={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.expired === "Yes"
                              ? true
                              : false
                            : expiredDYPPools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : false
                      }
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_resultbsc}
                      chainId={chainId}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      referrer={referrer}
                    />
                  ) : activeCard2 &&
                    cardIndex >= 0 &&
                    topList === "Staking" &&
                    chain === "eth" ? (
                    <InitConstantStakingiDYP
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_result}
                      lp_id={lp_id[cardIndex]}
                      chainId={chainId}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      staking={stakeArrayiDYPActive[cardIndex]}
                      listType={listType}
                      finalApr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_performancefee
                          : expiredDYPPools[cardIndex]?.apy_performancefee
                      }
                      apr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_percent
                          : expiredDYPPools[cardIndex]?.apy_percent
                      }
                      liquidity={eth_address}
                      expiration_time={expirationArray[cardIndex]}
                      other_info={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.expired === "Yes"
                              ? true
                              : false
                            : expiredDYPPools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : false
                      }
                      fee_s={
                        expiredPools === false
                          ? activePools[cardIndex]?.performancefee
                          : expiredDYPPools[cardIndex]?.performancefee
                      }
                      fee_u={withdrawFeeiDyp[cardIndex]}
                      lockTime={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                              ? "No Lock"
                              : activePools[cardIndex]?.lock_time?.split(" ")[0]
                            : expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                            ? "No Lock"
                            : expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0]
                          : "No Lock"
                      }
                    />
                  ) : activeCard2 &&
                    cardIndex >= 2 &&
                    topList === "Staking" &&
                    chain === "bnb" ? (
                    <StakeBscIDyp
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_resultbsc}
                      chainId={chainId}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      staking={
                        expiredPools === false
                          ? stakearrayStakeBsciDyp2[cardIndex - 2]
                          : stakearrayStakeBsciDyp2Expired[cardIndex - 3]
                      }
                      listType={listType}
                      finalApr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_performancefee
                          : expiredDYPPools[cardIndex]?.apy_performancefee
                      }
                      apr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_percent
                          : expiredDYPPools[cardIndex]?.apy_percent
                      }
                      liquidity={wbsc_address}
                      expiration_time={
                        expiredPools === false
                          ? expirearrayStakeBsciDyp2[cardIndex - 2]
                          : expirearrayStakeBsciDyp2Expired[cardIndex - 3]
                      }
                      other_info={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.expired === "Yes"
                              ? true
                              : false
                            : expiredDYPPools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : false
                      }
                      fee_s={
                        expiredPools === false
                          ? activePools[cardIndex]?.performancefee
                          : expiredDYPPools[cardIndex]?.performancefee
                      }
                      fee_u={0}
                      lockTime={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                              ? "No Lock"
                              : parseInt(
                                  activePools[cardIndex]?.lock_time?.split(
                                    " "
                                  )[0]
                                )
                            : expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                            ? "No Lock"
                            : parseInt(
                                expiredDYPPools[cardIndex]?.lock_time?.split(
                                  " "
                                )[0]
                              )
                          : "No Lock"
                      }
                    />
                  ) : activeCard2 &&
                    topList === "Staking" &&
                    chain === "avax" &&
                    cardIndex < 2 ? (
                    <StakeAvax
                      is_wallet_connected={isConnected}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      the_graph_result={the_graph_resultavax}
                      chainId={chainId}
                      expired={false}
                      coinbase={coinbase}
                      referrer={referrer}
                    />
                  ) : activeCard2 &&
                    topList === "Staking" &&
                    chain === "avax" &&
                    cardIndex >= 2 ? (
                    <StakeAvaxIDyp
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_resultavax}
                      chainId={chainId}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      staking={
                        expiredPools === false
                          ? stakingarrayStakeAvaxiDypActive[cardIndex - 2]
                          : stakingarrayStakeAvaxiDypExpired[cardIndex - 3]
                      }
                      listType={listType}
                      finalApr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_performancefee
                          : expiredDYPPools[cardIndex]?.apy_performancefee
                      }
                      apr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_percent
                          : expiredDYPPools[cardIndex]?.apy_percent
                      }
                      liquidity={avax_address}
                      expiration_time={expirearrayStakeAvaxiDyp[cardIndex]}
                      other_info={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.expired === "Yes"
                              ? true
                              : false
                            : expiredDYPPools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : false
                      }
                      fee_s={
                        expiredPools === false
                          ? activePools[cardIndex]?.performancefee
                          : expiredDYPPools[cardIndex]?.performancefee
                      }
                      fee_u={feeUarrayStakeAvaxiDyp[cardIndexavaxiDyp - 3]}
                      lockTime={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                              ? "No Lock"
                              : activePools[cardIndex]?.lock_time?.split(" ")[0]
                            : expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                            ? "No Lock"
                            : expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0]
                          : "No Lock"
                      }
                    />
                  ) : activeCard2 && topList === "Vault" ? (
                    <Vault
                      vault={vaultArray[cardIndex]}
                      token={tokenvaultArray[cardIndex]}
                      platformTokenApyPercent={vaultplatformArray[cardIndex]}
                      UNDERLYING_DECIMALS={vaultdecimalsArray[cardIndex]}
                      UNDERLYING_SYMBOL={vaultsymbolArray[cardIndex]}
                      expiration_time={"04 March 2023"}
                      coinbase={coinbase}
                      lockTime={"No Lock"}
                      handleConnection={handleConnection}
                      chainId={chainId}
                      listType={listType}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      isConnected={isConnected}
                      the_graph_result={the_graph_result}
                    />
                  ) : (
                    <></>
                  )}
                </>
                <>
                  <div
                    className="top-picks-container"
                    style={{ marginTop: "25px" }}
                  >
                    {activePools.slice(2, 3).map((pool, index) => (
                      <TopPoolsCard
                        display={
                          pool.expired
                            ? pool.expired === "Yes"
                              ? "none"
                              : ""
                            : ""
                        }
                        expired={false}
                        key={index}
                        chain={chain}
                        top_pick={pool.top_pick}
                        tokenName={
                          pool.tokenName
                            ? pool.tokenName
                            : pool.pair_name
                            ? pool.pair_name
                            : ""
                        }
                        apr={pool.apy_percent + "%"}
                        tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                        lockTime={
                          pool.lockTime
                            ? pool.lockTime
                            : pool.lock_time
                            ? pool.lock_time
                            : locktimeFarm[index]
                        }
                        tokenLogo={
                          pool.icon
                            ? pool.icon
                            : pool.pair_name === "iDYP"
                            ? "idypius.svg"
                            : "dyplogo.svg"
                        }
                        onShowDetailsClick={() => {
                          setActiveCard(null);
                          setActiveCard2(null);
                          setActiveCard3(topPools[index + 2]);
                          setActiveCard4(null);
                          setActiveCard5(null);
                          setActiveCard6(null);
                          setActiveCard7(null);
                          setActiveCard8(null);
                          setActiveCard9(null);
                          setActiveCard10(null);
                          setActiveCard11(null);
                          setActiveCard12(null);
                          setActiveCardNFT(false);
                          handleCardIndexStake(index + 2);
                          handleCardIndexStake30(index + 2);
                          handleCardIndexStakeiDyp(index + 2);
                          setDetails(index + 2);
                        }}
                        onHideDetailsClick={() => {
                          setActiveCard3(null);
                          setDetails();
                        }}
                        cardType={topList}
                        details={details === index + 2 ? true : false}
                        isNewPool={pool.isNewPool}
                        isStaked={pool.isStaked}
                      />
                    ))}
                  </div>
                  {activeCard3 &&
                  cardIndex >= 0 &&
                  topList === "Staking" &&
                  chain === "eth" ? (
                    <InitConstantStakingiDYP
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_result}
                      lp_id={lp_id[cardIndex]}
                      chainId={chainId}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      staking={stakeArrayiDYPActive[cardIndex]}
                      listType={listType}
                      finalApr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_performancefee
                          : expiredDYPPools[cardIndex]?.apy_performancefee
                      }
                      apr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_percent
                          : expiredDYPPools[cardIndex]?.apy_percent
                      }
                      liquidity={eth_address}
                      expiration_time={expirationArray[cardIndex]}
                      other_info={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.expired === "Yes"
                              ? true
                              : false
                            : expiredDYPPools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : false
                      }
                      fee_s={
                        expiredPools === false
                          ? activePools[cardIndex]?.performancefee
                          : expiredDYPPools[cardIndex]?.performancefee
                      }
                      fee_u={withdrawFeeiDyp[cardIndex]}
                      lockTime={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                              ? "No Lock"
                              : activePools[cardIndex]?.lock_time?.split(" ")[0]
                            : expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                            ? "No Lock"
                            : expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0]
                          : "No Lock"
                      }
                    />
                  ) : activeCard3 &&
                    cardIndex < 2 &&
                    topList === "Staking" &&
                    chain === "bnb" ? (
                    <StakeBsc
                      lp_id={LP_IDBNB_Array[cardIndex]}
                      staking={stakearrayStakeBscDyp2[cardIndex]}
                      apr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_percent
                          : expiredDYPPools[cardIndex]?.apy_percent
                      }
                      liquidity={wbsc_address}
                      expiration_time={expirearrayStakeBscDyp2[cardIndex]}
                      finalApr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_performancefee
                          : expiredDYPPools[cardIndex]?.apy_performancefee
                      }
                      fee={
                        expiredPools === false
                          ? activePools[cardIndex]?.performancefee
                          : expiredDYPPools[cardIndex]?.performancefee
                      }
                      lockTime={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                              ? "No Lock"
                              : parseInt(
                                  activePools[cardIndex]?.lock_time?.split(
                                    " "
                                  )[0]
                                )
                            : expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                            ? "No Lock"
                            : parseInt(
                                expiredDYPPools[cardIndex]?.lock_time?.split(
                                  " "
                                )[0]
                              )
                          : "No Lock"
                      }
                      listType={listType}
                      other_info={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.expired === "Yes"
                              ? true
                              : false
                            : expiredDYPPools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : false
                      }
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_resultbsc}
                      chainId={chainId}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      referrer={referrer}
                    />
                  ) : activeCard3 && cardIndex === 2 && topList === "Staking" && chain === 'eth'
                  ? (
                    <StakeEth
                    staking={stakeArrayStakeNew[cardIndex]}
                    apr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_percent
                        : expiredDYPPools[cardIndex]?.apy_percent
                    }
                    liquidity={eth_address}
                    expiration_time={"14 December 2022"}
                    finalApr={
                      expiredPools === false
                        ? activePools[cardIndex]?.apy_performancefee
                        : expiredDYPPools[cardIndex]?.apy_performancefee
                    }
                    fee={
                      expiredPools
                        ? expiredPools[cardIndex - 1]?.performancefee
                        : 0
                    }
                    lockTime={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                            "No"
                            ? "No Lock"
                            : activePools[cardIndex]?.lock_time?.split(" ")[0]
                          : expiredDYPPools[cardIndex]?.lock_time?.split(
                              " "
                            )[0] === "No"
                          ? "No Lock"
                          : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                        : "No Lock"
                    }
                    lp_id={LP_IDBNB_Array[cardIndex]}
                    listType={listType}
                    other_info={
                      cardIndex !== undefined
                        ? expiredPools === false
                          ? activePools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : expiredDYPPools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : false
                    }
                    fee={
                      expiredPools === false
                        ? activePools[cardIndex]?.performancefee
                        : expiredDYPPools[cardIndex]?.performancefee
                    }
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_result}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={false}
                    referrer={referrer}
                  />

                  ) :
                  
                  activeCard3 &&
                    cardIndex >= 2 &&
                    topList === "Staking" &&
                    chain === "bnb" ? (
                    <StakeBscIDyp
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_resultbsc}
                      chainId={chainId}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      staking={
                        expiredPools === false
                          ? stakearrayStakeBsciDyp2[cardIndex - 2]
                          : stakearrayStakeBsciDyp2Expired[cardIndex - 3]
                      }
                      listType={listType}
                      finalApr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_performancefee
                          : expiredDYPPools[cardIndex]?.apy_performancefee
                      }
                      apr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_percent
                          : expiredDYPPools[cardIndex]?.apy_percent
                      }
                      liquidity={wbsc_address}
                      expiration_time={
                        expiredPools === false
                          ? expirearrayStakeBsciDyp2[cardIndex - 2]
                          : expirearrayStakeBsciDyp2Expired[cardIndex - 3]
                      }
                      other_info={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.expired === "Yes"
                              ? true
                              : false
                            : expiredDYPPools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : false
                      }
                      fee_s={
                        expiredPools === false
                          ? activePools[cardIndex]?.performancefee
                          : expiredDYPPools[cardIndex]?.performancefee
                      }
                      fee_u={0}
                      lockTime={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                              ? "No Lock"
                              : parseInt(
                                  activePools[cardIndex]?.lock_time?.split(
                                    " "
                                  )[0]
                                )
                            : expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                            ? "No Lock"
                            : parseInt(
                                expiredDYPPools[cardIndex]?.lock_time?.split(
                                  " "
                                )[0]
                              )
                          : "No Lock"
                      }
                    />
                  ) : activeCard3 &&
                    topList === "Staking" &&
                    chain === "avax" &&
                    cardIndex < 2 ? (
                    <StakeAvax
                      is_wallet_connected={isConnected}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      the_graph_result={the_graph_resultavax}
                      chainId={chainId}
                      coinbase={coinbase}
                      expired={false}
                      referrer={referrer}
                    />
                  ) : activeCard3 &&
                    topList === "Staking" &&
                    chain === "avax" &&
                    cardIndex >= 2 ? (
                    <StakeAvaxIDyp
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_resultavax}
                      chainId={chainId}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      staking={
                        expiredPools === false
                          ? stakingarrayStakeAvaxiDypActive[cardIndex - 2]
                          : stakingarrayStakeAvaxiDypExpired[cardIndex - 3]
                      }
                      listType={listType}
                      finalApr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_performancefee
                          : expiredDYPPools[cardIndex]?.apy_performancefee
                      }
                      apr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_percent
                          : expiredDYPPools[cardIndex]?.apy_percent
                      }
                      liquidity={avax_address}
                      expiration_time={expirearrayStakeAvaxiDyp[cardIndex]}
                      other_info={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.expired === "Yes"
                              ? true
                              : false
                            : expiredDYPPools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : false
                      }
                      fee_s={
                        expiredPools === false
                          ? activePools[cardIndex]?.performancefee
                          : expiredDYPPools[cardIndex]?.performancefee
                      }
                      fee_u={feeUarrayStakeAvaxiDyp[cardIndexavaxiDyp - 3]}
                      lockTime={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                              ? "No Lock"
                              : activePools[cardIndex]?.lock_time?.split(" ")[0]
                            : expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                            ? "No Lock"
                            : expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0]
                          : "No Lock"
                      }
                    />
                  ) : activeCard3 && topList === "Vault" ? (
                    <Vault
                      vault={vaultArray[cardIndex]}
                      token={tokenvaultArray[cardIndex]}
                      platformTokenApyPercent={vaultplatformArray[cardIndex]}
                      UNDERLYING_DECIMALS={vaultdecimalsArray[cardIndex]}
                      UNDERLYING_SYMBOL={vaultsymbolArray[cardIndex]}
                      expiration_time={"04 March 2023"}
                      coinbase={coinbase}
                      lockTime={"No Lock"}
                      handleConnection={handleConnection}
                      chainId={chainId}
                      listType={listType}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      isConnected={isConnected}
                      the_graph_result={the_graph_result}
                    />
                  ) : (
                    <></>
                  )}
                </>
                <>
                  <div
                    className="top-picks-container"
                    style={{ marginTop: "25px" }}
                  >
                    {activePools.slice(3, 4).map((pool, index) => (
                      <TopPoolsCard
                        display={
                          pool.expired
                            ? pool.expired === "Yes"
                              ? "none"
                              : ""
                            : ""
                        }
                        expired={false}
                        key={index}
                        chain={chain}
                        top_pick={pool.top_pick}
                        tokenName={
                          pool.tokenName
                            ? pool.tokenName
                            : pool.pair_name
                            ? pool.pair_name
                            : ""
                        }
                        apr={pool.apy_percent + "%"}
                        tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                        lockTime={
                          pool.lockTime
                            ? pool.lockTime
                            : pool.lock_time
                            ? pool.lock_time
                            : locktimeFarm[index]
                        }
                        tokenLogo={
                          pool.icon
                            ? pool.icon
                            : pool.pair_name === "iDYP"
                            ? "idypius.svg"
                            : "dyplogo.svg"
                        }
                        onShowDetailsClick={() => {
                          setActiveCard(null);
                          setActiveCard2(null);
                          setActiveCard3(null);
                          setActiveCard4(topPools[index + 3]);
                          setActiveCard5(null);
                          setActiveCard6(null);
                          setActiveCard7(null);
                          setActiveCard8(null);
                          setActiveCard9(null);
                          setActiveCard10(null);
                          setActiveCard11(null);
                          setActiveCard12(null);
                          setActiveCardNFT(false);
                          handleCardIndexStake(index + 3);
                          handleCardIndexStake30(index + 3);
                          handleCardIndexStakeiDyp(index + 3);
                          setDetails(index + 3);
                        }}
                        onHideDetailsClick={() => {
                          setActiveCard4(null);
                          setDetails();
                        }}
                        cardType={topList}
                        details={details === index + 3 ? true : false}
                        isNewPool={pool.isNewPool}
                        isStaked={pool.isStaked}
                      />
                    ))}
                  </div>
                  {activeCard4 &&
                  cardIndex >= 0 &&
                  topList === "Staking" &&
                  chain === "eth" ? (
                    <InitConstantStakingiDYP
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_result}
                      lp_id={lp_id[cardIndex]}
                      chainId={chainId}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                    />
                  ) : activeCard4 &&
                    cardIndex < 2 &&
                    topList === "Staking" &&
                    chain === "bnb" ? (
                    <StakeBsc
                      lp_id={LP_IDBNB_Array[cardIndex]}
                      staking={stakearrayStakeBscDyp2[cardIndex]}
                      apr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_percent
                          : expiredDYPPools[cardIndex]?.apy_percent
                      }
                      liquidity={wbsc_address}
                      expiration_time={expirearrayStakeBscDyp2[cardIndex]}
                      finalApr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_performancefee
                          : expiredDYPPools[cardIndex]?.apy_performancefee
                      }
                      fee={
                        expiredPools === false
                          ? activePools[cardIndex]?.performancefee
                          : expiredDYPPools[cardIndex]?.performancefee
                      }
                      lockTime={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                              ? "No Lock"
                              : parseInt(
                                  activePools[cardIndex]?.lock_time?.split(
                                    " "
                                  )[0]
                                )
                            : expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                            ? "No Lock"
                            : parseInt(
                                expiredDYPPools[cardIndex]?.lock_time?.split(
                                  " "
                                )[0]
                              )
                          : "No Lock"
                      }
                      listType={listType}
                      other_info={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.expired === "Yes"
                              ? true
                              : false
                            : expiredDYPPools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : false
                      }
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_resultbsc}
                      chainId={chainId}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      referrer={referrer}
                    />
                  ) : activeCard4 &&
                    cardIndex >= 2 &&
                    topList === "Staking" &&
                    chain === "bnb" ? (
                    <StakeBscIDyp
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_resultbsc}
                      chainId={chainId}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      staking={
                        expiredPools === false
                          ? stakearrayStakeBsciDyp2[cardIndex - 2]
                          : stakearrayStakeBsciDyp2Expired[cardIndex - 3]
                      }
                      listType={listType}
                      finalApr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_performancefee
                          : expiredDYPPools[cardIndex]?.apy_performancefee
                      }
                      apr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_percent
                          : expiredDYPPools[cardIndex]?.apy_percent
                      }
                      liquidity={wbsc_address}
                      expiration_time={
                        expiredPools === false
                          ? expirearrayStakeBsciDyp2[cardIndex - 2]
                          : expirearrayStakeBsciDyp2Expired[cardIndex - 3]
                      }
                      other_info={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.expired === "Yes"
                              ? true
                              : false
                            : expiredDYPPools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : false
                      }
                      fee_s={
                        expiredPools === false
                          ? activePools[cardIndex]?.performancefee
                          : expiredDYPPools[cardIndex]?.performancefee
                      }
                      fee_u={0}
                      lockTime={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                              ? "No Lock"
                              : parseInt(
                                  activePools[cardIndex]?.lock_time?.split(
                                    " "
                                  )[0]
                                )
                            : expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                            ? "No Lock"
                            : parseInt(
                                expiredDYPPools[cardIndex]?.lock_time?.split(
                                  " "
                                )[0]
                              )
                          : "No Lock"
                      }
                    />
                  ) : activeCard4 &&
                    topList === "Staking" &&
                    chain === "avax" &&
                    cardIndex < 2 ? (
                    <StakeAvax
                      is_wallet_connected={isConnected}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      the_graph_result={the_graph_resultavax}
                      chainId={chainId}
                      coinbase={coinbase}
                      expired={false}
                      referrer={referrer}
                    />
                  ) : activeCard4 &&
                    topList === "Staking" &&
                    chain === "avax" &&
                    cardIndex >= 2 ? (
                    <StakeAvaxIDyp
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_resultavax}
                      chainId={chainId}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      staking={
                        expiredPools === false
                          ? stakingarrayStakeAvaxiDypActive[cardIndex - 2]
                          : stakingarrayStakeAvaxiDypExpired[cardIndex - 3]
                      }
                      listType={listType}
                      finalApr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_performancefee
                          : expiredDYPPools[cardIndex]?.apy_performancefee
                      }
                      apr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_percent
                          : expiredDYPPools[cardIndex]?.apy_percent
                      }
                      liquidity={avax_address}
                      expiration_time={expirearrayStakeAvaxiDyp[cardIndex]}
                      other_info={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.expired === "Yes"
                              ? true
                              : false
                            : expiredDYPPools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : false
                      }
                      fee_s={
                        expiredPools === false
                          ? activePools[cardIndex]?.performancefee
                          : expiredDYPPools[cardIndex]?.performancefee
                      }
                      fee_u={feeUarrayStakeAvaxiDyp[cardIndexavaxiDyp - 3]}
                      lockTime={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                              ? "No Lock"
                              : activePools[cardIndex]?.lock_time?.split(" ")[0]
                            : expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                            ? "No Lock"
                            : expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0]
                          : "No Lock"
                      }
                    />
                  ) : activeCard4 && topList === "Vault" ? (
                    <Vault
                      vault={vaultArray[cardIndex]}
                      token={tokenvaultArray[cardIndex]}
                      platformTokenApyPercent={vaultplatformArray[cardIndex]}
                      UNDERLYING_DECIMALS={vaultdecimalsArray[cardIndex]}
                      UNDERLYING_SYMBOL={vaultsymbolArray[cardIndex]}
                      expiration_time={"04 March 2023"}
                      coinbase={coinbase}
                      lockTime={"No Lock"}
                      handleConnection={handleConnection}
                      chainId={chainId}
                      listType={listType}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      isConnected={isConnected}
                      the_graph_result={the_graph_result}
                    />
                  ) : (
                    <></>
                  )}
                </>
                <>
                  <div
                    className="top-picks-container"
                    style={{ marginTop: "25px" }}
                  >
                    {activePools.slice(4, 5).map((pool, index) => (
                      <TopPoolsCard
                        display={
                          pool.expired
                            ? pool.expired === "Yes"
                              ? "none"
                              : ""
                            : ""
                        }
                        expired={false}
                        key={index}
                        chain={chain}
                        top_pick={pool.top_pick}
                        tokenName={
                          pool.tokenName
                            ? pool.tokenName
                            : pool.pair_name
                            ? pool.pair_name
                            : ""
                        }
                        apr={pool.apy_percent + "%"}
                        tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                        lockTime={
                          pool.lockTime
                            ? pool.lockTime
                            : pool.lock_time
                            ? pool.lock_time
                            : locktimeFarm[index]
                        }
                        tokenLogo={
                          pool.icon
                            ? pool.icon
                            : pool.pair_name === "iDYP"
                            ? "idypius.svg"
                            : "dyplogo.svg"
                        }
                        onShowDetailsClick={() => {
                          setActiveCard(null);
                          setActiveCard2(null);
                          setActiveCard3(null);
                          setActiveCard4(null);
                          setActiveCard5(topPools[index + 4]);
                          setActiveCard6(null);
                          setActiveCard7(null);
                          setActiveCard8(null);
                          setActiveCard9(null);
                          setActiveCard10(null);
                          setActiveCard11(null);
                          setActiveCard12(null);
                          setActiveCardNFT(false);
                          handleCardIndexStake(index + 4);
                          handleCardIndexStake30(index + 4);
                          handleCardIndexStakeiDyp(index + 4);
                          setDetails(index + 4);
                        }}
                        onHideDetailsClick={() => {
                          setActiveCard5(null);
                          setDetails();
                        }}
                        cardType={topList}
                        details={details === index + 4 ? true : false}
                        isNewPool={pool.isNewPool}
                        isStaked={pool.isStaked}
                      />
                    ))}
                  </div>
                  {activeCard5 &&
                  cardIndex >= 0 &&
                  topList === "Staking" &&
                  chain === "eth" ? (
                    <InitConstantStakingiDYP
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_result}
                      lp_id={lp_id[cardIndex]}
                      chainId={chainId}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      staking={stakeArrayiDYPActive[cardIndex]}
                      finalApr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_performancefee
                          : expiredDYPPools[cardIndex]?.apy_performancefee
                      }
                      apr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_percent
                          : expiredDYPPools[cardIndex]?.apy_percent
                      }
                      liquidity={eth_address}
                      expiration_time={expirationArray[cardIndex]}
                      other_info={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.expired === "Yes"
                              ? true
                              : false
                            : expiredDYPPools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : false
                      }
                      fee_s={
                        expiredPools === false
                          ? activePools[cardIndex]?.performancefee
                          : expiredDYPPools[cardIndex]?.performancefee
                      }
                      fee_u={withdrawFeeiDyp[cardIndex]}
                    />
                  ) : activeCard5 &&
                    cardIndex < 2 &&
                    cardIndex < 4 &&
                    topList === "Staking" &&
                    chain === "bnb" ? (
                    <StakeBsc
                      lp_id={LP_IDBNB_Array[cardIndex]}
                      staking={stakearrayStakeBscDyp2[cardIndex]}
                      apr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_percent
                          : expiredDYPPools[cardIndex]?.apy_percent
                      }
                      liquidity={wbsc_address}
                      expiration_time={expirearrayStakeBscDyp2[cardIndex]}
                      finalApr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_performancefee
                          : expiredDYPPools[cardIndex]?.apy_performancefee
                      }
                      fee={
                        expiredPools === false
                          ? activePools[cardIndex]?.performancefee
                          : expiredDYPPools[cardIndex]?.performancefee
                      }
                      lockTime={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                              ? "No Lock"
                              : parseInt(
                                  activePools[cardIndex]?.lock_time?.split(
                                    " "
                                  )[0]
                                )
                            : expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                            ? "No Lock"
                            : parseInt(
                                expiredDYPPools[cardIndex]?.lock_time?.split(
                                  " "
                                )[0]
                              )
                          : "No Lock"
                      }
                      listType={listType}
                      other_info={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.expired === "Yes"
                              ? true
                              : false
                            : expiredDYPPools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : false
                      }
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_resultbsc}
                      chainId={chainId}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      referrer={referrer}
                    />
                  ) : activeCard5 &&
                    cardIndex >= 2 &&
                    topList === "Staking" &&
                    chain === "bnb" ? (
                    <StakeBscIDyp
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_resultbsc}
                      chainId={chainId}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      staking={
                        expiredPools === false
                          ? stakearrayStakeBsciDyp2[cardIndex - 2]
                          : stakearrayStakeBsciDyp2Expired[cardIndex - 3]
                      }
                      listType={listType}
                      finalApr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_performancefee
                          : expiredDYPPools[cardIndex]?.apy_performancefee
                      }
                      apr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_percent
                          : expiredDYPPools[cardIndex]?.apy_percent
                      }
                      liquidity={wbsc_address}
                      expiration_time={
                        expiredPools === false
                          ? expirearrayStakeBsciDyp2[cardIndex - 2]
                          : expirearrayStakeBsciDyp2Expired[cardIndex - 3]
                      }
                      other_info={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.expired === "Yes"
                              ? true
                              : false
                            : expiredDYPPools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : false
                      }
                      fee_s={
                        expiredPools === false
                          ? activePools[cardIndex]?.performancefee
                          : expiredDYPPools[cardIndex]?.performancefee
                      }
                      fee_u={0}
                      lockTime={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                              ? "No Lock"
                              : parseInt(
                                  activePools[cardIndex]?.lock_time?.split(
                                    " "
                                  )[0]
                                )
                            : expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                            ? "No Lock"
                            : parseInt(
                                expiredDYPPools[cardIndex]?.lock_time?.split(
                                  " "
                                )[0]
                              )
                          : "No Lock"
                      }
                    />
                  ) : activeCard5 &&
                    topList === "Staking" &&
                    chain === "avax" &&
                    cardIndex < 2 ? (
                    <StakeAvax
                      is_wallet_connected={isConnected}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      the_graph_result={the_graph_resultavax}
                      chainId={chainId}
                      expired={false}
                      coinbase={coinbase}
                      referrer={referrer}
                    />
                  ) : activeCard5 &&
                    topList === "Staking" &&
                    chain === "avax" &&
                    cardIndex >= 2 &&
                    cardIndex < 4 ? (
                    <StakeAvax30
                      is_wallet_connected={isConnected}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      the_graph_result={the_graph_resultavax}
                      chainId={chainId}
                      expired={false}
                      coinbase={coinbase}
                      referrer={referrer}
                    />
                  ) : activeCard5 &&
                    topList === "Staking" &&
                    chain === "avax" &&
                    cardIndex >= 5 ? (
                    <StakeAvaxIDyp
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_resultavax}
                      chainId={chainId}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      staking={
                        expiredPools === false
                          ? stakingarrayStakeAvaxiDypActive[cardIndex - 2]
                          : stakingarrayStakeAvaxiDypExpired[cardIndex - 3]
                      }
                      listType={listType}
                      finalApr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_performancefee
                          : expiredDYPPools[cardIndex]?.apy_performancefee
                      }
                      apr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_percent
                          : expiredDYPPools[cardIndex]?.apy_percent
                      }
                      liquidity={avax_address}
                      expiration_time={expirearrayStakeAvaxiDyp[cardIndex]}
                      other_info={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.expired === "Yes"
                              ? true
                              : false
                            : expiredDYPPools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : false
                      }
                      fee_s={
                        expiredPools === false
                          ? activePools[cardIndex]?.performancefee
                          : expiredDYPPools[cardIndex]?.performancefee
                      }
                      fee_u={feeUarrayStakeAvaxiDyp[cardIndexavaxiDyp - 3]}
                      lockTime={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                              ? "No Lock"
                              : activePools[cardIndex]?.lock_time?.split(" ")[0]
                            : expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                            ? "No Lock"
                            : expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0]
                          : "No Lock"
                      }
                    />
                  ) : activeCard5 && topList === "Vault" ? (
                    <Vault
                      vault={vaultArray[cardIndex]}
                      token={tokenvaultArray[cardIndex]}
                      platformTokenApyPercent={vaultplatformArray[cardIndex]}
                      UNDERLYING_DECIMALS={vaultdecimalsArray[cardIndex]}
                      UNDERLYING_SYMBOL={vaultsymbolArray[cardIndex]}
                      expiration_time={"04 March 2023"}
                      coinbase={coinbase}
                      lockTime={"No Lock"}
                      handleConnection={handleConnection}
                      chainId={chainId}
                      listType={listType}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      isConnected={isConnected}
                      the_graph_result={the_graph_result}
                    />
                  ) : (
                    <></>
                  )}
                </>
                <>
                  <div
                    className="top-picks-container"
                    style={{ marginTop: activePools.length >= 7 && "25px" }}
                  >
                    {activePools.slice(5, 6).map((pool, index) => (
                      <TopPoolsCard
                        display={
                          pool.expired
                            ? pool.expired === "Yes"
                              ? "none"
                              : ""
                            : ""
                        }
                        expired={false}
                        key={index}
                        chain={chain}
                        top_pick={pool.top_pick}
                        tokenName={
                          pool.tokenName
                            ? pool.tokenName
                            : pool.pair_name
                            ? pool.pair_name
                            : ""
                        }
                        apr={pool.apy_percent + "%"}
                        tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                        lockTime={
                          pool.lockTime
                            ? pool.lockTime
                            : pool.lock_time
                            ? pool.lock_time
                            : locktimeFarm[index]
                        }
                        tokenLogo={
                          pool.icon
                            ? pool.icon
                            : pool.pair_name === "iDYP"
                            ? "idypius.svg"
                            : "dyplogo.svg"
                        }
                        onShowDetailsClick={() => {
                          setActiveCard(null);
                          setActiveCard2(null);
                          setActiveCard3(null);
                          setActiveCard4(null);
                          setActiveCard5(null);
                          setActiveCard6(topPools[index + 5]);
                          setActiveCard7(null);
                          setActiveCard8(null);
                          setActiveCard9(null);
                          setActiveCard10(null);
                          setActiveCard11(null);
                          setActiveCard12(null);
                          setActiveCardNFT(false);
                          handleCardIndexStake(index + 5);
                          handleCardIndexStake30(index + 5);
                          handleCardIndexStakeiDyp(index + 5);
                          setDetails(index + 5);
                        }}
                        onHideDetailsClick={() => {
                          setActiveCard6(null);
                          setDetails();
                        }}
                        cardType={topList}
                        details={details === index + 5 ? true : false}
                        isNewPool={pool.isNewPool}
                        isStaked={pool.isStaked}
                      />
                    ))}
                  </div>
                  {activeCard6 &&
                  topList === "Staking" &&
                  cardIndex < 2 &&
                  chain === "bnb" ? (
                    <StakeBsc
                      lp_id={LP_IDBNB_Array[cardIndex]}
                      staking={stakearrayStakeBscDyp2[cardIndex]}
                      apr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_percent
                          : expiredDYPPools[cardIndex]?.apy_percent
                      }
                      liquidity={wbsc_address}
                      expiration_time={expirearrayStakeBscDyp2[cardIndex]}
                      finalApr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_performancefee
                          : expiredDYPPools[cardIndex]?.apy_performancefee
                      }
                      fee={
                        expiredPools === false
                          ? activePools[cardIndex]?.performancefee
                          : expiredDYPPools[cardIndex]?.performancefee
                      }
                      lockTime={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                              ? "No Lock"
                              : parseInt(
                                  activePools[cardIndex]?.lock_time?.split(
                                    " "
                                  )[0]
                                )
                            : expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                            ? "No Lock"
                            : parseInt(
                                expiredDYPPools[cardIndex]?.lock_time?.split(
                                  " "
                                )[0]
                              )
                          : "No Lock"
                      }
                      listType={listType}
                      other_info={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.expired === "Yes"
                              ? true
                              : false
                            : expiredDYPPools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : false
                      }
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_resultbsc}
                      chainId={chainId}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      referrer={referrer}
                    />
                  ) : activeCard6 &&
                    cardIndex >= 0 &&
                    topList === "Staking" &&
                    chain === "eth" ? (
                    <InitConstantStakingiDYP
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_result}
                      lp_id={lp_id[cardIndex]}
                      chainId={chainId}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      staking={stakeArrayiDYPActive[cardIndex]}
                      finalApr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_performancefee
                          : expiredDYPPools[cardIndex]?.apy_performancefee
                      }
                      apr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_percent
                          : expiredDYPPools[cardIndex]?.apy_percent
                      }
                      liquidity={eth_address}
                      expiration_time={expirationArray[cardIndex]}
                      other_info={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.expired === "Yes"
                              ? true
                              : false
                            : expiredDYPPools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : false
                      }
                      fee_s={
                        expiredPools === false
                          ? activePools[cardIndex]?.performancefee
                          : expiredDYPPools[cardIndex]?.performancefee
                      }
                      fee_u={withdrawFeeiDyp[cardIndex]}
                    />
                  ) : activeCard6 &&
                    cardIndex >= 2 &&
                    topList === "Staking" &&
                    chain === "bnb" ? (
                    <StakeBscIDyp
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_resultbsc}
                      chainId={chainId}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      staking={
                        expiredPools === false
                          ? stakearrayStakeBsciDyp2[cardIndex - 2]
                          : stakearrayStakeBsciDyp2Expired[cardIndex - 3]
                      }
                      listType={listType}
                      finalApr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_performancefee
                          : expiredDYPPools[cardIndex]?.apy_performancefee
                      }
                      apr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_percent
                          : expiredDYPPools[cardIndex]?.apy_percent
                      }
                      liquidity={wbsc_address}
                      expiration_time={
                        expiredPools === false
                          ? expirearrayStakeBsciDyp2[cardIndex - 2]
                          : expirearrayStakeBsciDyp2Expired[cardIndex - 3]
                      }
                      other_info={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.expired === "Yes"
                              ? true
                              : false
                            : expiredDYPPools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : false
                      }
                      fee_s={
                        expiredPools === false
                          ? activePools[cardIndex]?.performancefee
                          : expiredDYPPools[cardIndex]?.performancefee
                      }
                      fee_u={0}
                      lockTime={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                              ? "No Lock"
                              : parseInt(
                                  activePools[cardIndex]?.lock_time?.split(
                                    " "
                                  )[0]
                                )
                            : expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                            ? "No Lock"
                            : parseInt(
                                expiredDYPPools[cardIndex]?.lock_time?.split(
                                  " "
                                )[0]
                              )
                          : "No Lock"
                      }
                    />
                  ) : activeCard6 &&
                    topList === "Staking" &&
                    chain === "avax" &&
                    cardIndex < 2 ? (
                    <StakeAvax
                      is_wallet_connected={isConnected}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      the_graph_result={the_graph_resultavax}
                      chainId={chainId}
                      coinbase={coinbase}
                      referrer={referrer}
                      expired={false}
                    />
                  ) : activeCard6 &&
                    topList === "Staking" &&
                    chain === "avax" &&
                    cardIndex >= 2 &&
                    cardIndex < 4 ? (
                    <StakeAvax30
                      is_wallet_connected={isConnected}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      the_graph_result={the_graph_resultavax}
                      chainId={chainId}
                      coinbase={coinbase}
                      expired={false}
                      referrer={referrer}
                    />
                  ) : activeCard6 &&
                    topList === "Staking" &&
                    chain === "avax" &&
                    cardIndex >= 5 ? (
                    <StakeAvaxIDyp
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_resultavax}
                      chainId={chainId}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      staking={
                        expiredPools === false
                          ? stakingarrayStakeAvaxiDypActive[cardIndex - 2]
                          : stakingarrayStakeAvaxiDypExpired[cardIndex - 3]
                      }
                      listType={listType}
                      finalApr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_performancefee
                          : expiredDYPPools[cardIndex]?.apy_performancefee
                      }
                      apr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_percent
                          : expiredDYPPools[cardIndex]?.apy_percent
                      }
                      liquidity={avax_address}
                      expiration_time={expirearrayStakeAvaxiDyp[cardIndex]}
                      other_info={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.expired === "Yes"
                              ? true
                              : false
                            : expiredDYPPools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : false
                      }
                      fee_s={
                        expiredPools === false
                          ? activePools[cardIndex]?.performancefee
                          : expiredDYPPools[cardIndex]?.performancefee
                      }
                      fee_u={feeUarrayStakeAvaxiDyp[cardIndexavaxiDyp - 3]}
                      lockTime={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                              ? "No Lock"
                              : activePools[cardIndex]?.lock_time?.split(" ")[0]
                            : expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                            ? "No Lock"
                            : expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0]
                          : "No Lock"
                      }
                    />
                  ) : activeCard6 && topList === "Vault" ? (
                    <Vault
                      vault={vaultArray[cardIndex]}
                      token={tokenvaultArray[cardIndex]}
                      platformTokenApyPercent={vaultplatformArray[cardIndex]}
                      UNDERLYING_DECIMALS={vaultdecimalsArray[cardIndex]}
                      UNDERLYING_SYMBOL={vaultsymbolArray[cardIndex]}
                      expiration_time={"04 March 2023"}
                      coinbase={coinbase}
                      lockTime={"No Lock"}
                      handleConnection={handleConnection}
                      chainId={chainId}
                      listType={listType}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      isConnected={isConnected}
                      the_graph_result={the_graph_result}
                    />
                  ) : (
                    <></>
                  )}
                </>
                <>
                  <div
                    className="top-picks-container"
                    style={{ marginTop: activePools.length >= 8 && "25px" }}
                  >
                    {activePools.slice(6, 7).map((pool, index) => (
                      <TopPoolsCard
                        display={
                          pool.expired
                            ? pool.expired === "Yes"
                              ? "none"
                              : ""
                            : ""
                        }
                        expired={false}
                        key={index}
                        chain={chain}
                        top_pick={pool.top_pick}
                        tokenName={
                          pool.tokenName
                            ? pool.tokenName
                            : pool.pair_name
                            ? pool.pair_name
                            : ""
                        }
                        apr={pool.apy_percent + "%"}
                        tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                        lockTime={
                          pool.lockTime
                            ? pool.lockTime
                            : pool.lock_time
                            ? pool.lock_time
                            : locktimeFarm[index]
                        }
                        tokenLogo={
                          pool.icon
                            ? pool.icon
                            : pool.pair_name === "iDYP"
                            ? "idypius.svg"
                            : "dyplogo.svg"
                        }
                        onShowDetailsClick={() => {
                          setActiveCard(null);
                          setActiveCard2(null);
                          setActiveCard3(null);
                          setActiveCard4(null);
                          setActiveCard5(null);
                          setActiveCard6(null);
                          setActiveCard7(topPools[index + 6]);
                          setActiveCard8(null);
                          setActiveCard9(null);
                          setActiveCard10(null);
                          setActiveCard11(null);
                          setActiveCard12(null);
                          setActiveCardNFT(false);
                          handleCardIndexStake(index + 6);
                          handleCardIndexStake30(index + 6);
                          handleCardIndexStakeiDyp(index + 6);
                          setDetails(index + 6);
                        }}
                        onHideDetailsClick={() => {
                          setActiveCard7(null);
                          setDetails();
                        }}
                        cardType={topList}
                        details={details === index + 6 ? true : false}
                        isNewPool={pool.isNewPool}
                        isStaked={pool.isStaked}
                      />
                    ))}
                  </div>
                  {activeCard7 &&
                  topList === "Staking" &&
                  cardIndex < 2 &&
                  chain === "bnb" ? (
                    <StakeBsc
                      lp_id={LP_IDBNB_Array[cardIndex]}
                      staking={stakearrayStakeBscDyp2[cardIndex]}
                      apr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_percent
                          : expiredDYPPools[cardIndex]?.apy_percent
                      }
                      liquidity={wbsc_address}
                      expiration_time={expirearrayStakeBscDyp2[cardIndex]}
                      finalApr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_performancefee
                          : expiredDYPPools[cardIndex]?.apy_performancefee
                      }
                      fee={
                        expiredPools === false
                          ? activePools[cardIndex]?.performancefee
                          : expiredDYPPools[cardIndex]?.performancefee
                      }
                      lockTime={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                              ? "No Lock"
                              : parseInt(
                                  activePools[cardIndex]?.lock_time?.split(
                                    " "
                                  )[0]
                                )
                            : expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                            ? "No Lock"
                            : parseInt(
                                expiredDYPPools[cardIndex]?.lock_time?.split(
                                  " "
                                )[0]
                              )
                          : "No Lock"
                      }
                      listType={listType}
                      other_info={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.expired === "Yes"
                              ? true
                              : false
                            : expiredDYPPools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : false
                      }
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_resultbsc}
                      chainId={chainId}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      referrer={referrer}
                    />
                  ) : activeCard7 &&
                    cardIndex >= 0 &&
                    topList === "Staking" &&
                    chain === "eth" ? (
                    <InitConstantStakingiDYP
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_result}
                      lp_id={lp_id[cardIndex]}
                      chainId={chainId}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      staking={stakeArrayiDYPActive[cardIndex]}
                      finalApr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_performancefee
                          : expiredDYPPools[cardIndex]?.apy_performancefee
                      }
                      apr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_percent
                          : expiredDYPPools[cardIndex]?.apy_percent
                      }
                      liquidity={eth_address}
                      expiration_time={expirationArray[cardIndex]}
                      other_info={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.expired === "Yes"
                              ? true
                              : false
                            : expiredDYPPools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : false
                      }
                      fee_s={
                        expiredPools === false
                          ? activePools[cardIndex]?.performancefee
                          : expiredDYPPools[cardIndex]?.performancefee
                      }
                      fee_u={withdrawFeeiDyp[cardIndex]}
                    />
                  ) : activeCard7 &&
                    cardIndex >= 2 &&
                    topList === "Staking" &&
                    chain === "bnb" ? (
                    <StakeBscIDyp
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_resultbsc}
                      chainId={chainId}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      staking={
                        expiredPools === false
                          ? stakearrayStakeBsciDyp2[cardIndex - 2]
                          : stakearrayStakeBsciDyp2Expired[cardIndex - 3]
                      }
                      listType={listType}
                      finalApr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_performancefee
                          : expiredDYPPools[cardIndex]?.apy_performancefee
                      }
                      apr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_percent
                          : expiredDYPPools[cardIndex]?.apy_percent
                      }
                      liquidity={wbsc_address}
                      expiration_time={
                        expiredPools === false
                          ? expirearrayStakeBsciDyp2[cardIndex - 2]
                          : expirearrayStakeBsciDyp2Expired[cardIndex - 3]
                      }
                      other_info={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.expired === "Yes"
                              ? true
                              : false
                            : expiredDYPPools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : false
                      }
                      fee_s={
                        expiredPools === false
                          ? activePools[cardIndex]?.performancefee
                          : expiredDYPPools[cardIndex]?.performancefee
                      }
                      fee_u={0}
                      lockTime={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                              ? "No Lock"
                              : parseInt(
                                  activePools[cardIndex]?.lock_time?.split(
                                    " "
                                  )[0]
                                )
                            : expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                            ? "No Lock"
                            : parseInt(
                                expiredDYPPools[cardIndex]?.lock_time?.split(
                                  " "
                                )[0]
                              )
                          : "No Lock"
                      }
                    />
                  ) : activeCard7 &&
                    topList === "Staking" &&
                    chain === "avax" &&
                    cardIndex < 2 ? (
                    <StakeAvax
                      is_wallet_connected={isConnected}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      the_graph_result={the_graph_resultavax}
                      chainId={chainId}
                      coinbase={coinbase}
                      expired={false}
                      referrer={referrer}
                    />
                  ) : activeCard7 &&
                    topList === "Staking" &&
                    chain === "avax" &&
                    cardIndex >= 2 &&
                    cardIndex < 4 ? (
                    <StakeAvax30
                      is_wallet_connected={isConnected}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      the_graph_result={the_graph_resultavax}
                      chainId={chainId}
                      expired={false}
                      coinbase={coinbase}
                      referrer={referrer}
                    />
                  ) : activeCard7 &&
                    topList === "Staking" &&
                    chain === "avax" &&
                    cardIndex >= 5 ? (
                    <StakeAvaxIDyp
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_resultavax}
                      chainId={chainId}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      staking={
                        expiredPools === false
                          ? stakingarrayStakeAvaxiDypActive[cardIndex - 2]
                          : stakingarrayStakeAvaxiDypExpired[cardIndex - 3]
                      }
                      listType={listType}
                      finalApr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_performancefee
                          : expiredDYPPools[cardIndex]?.apy_performancefee
                      }
                      apr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_percent
                          : expiredDYPPools[cardIndex]?.apy_percent
                      }
                      liquidity={avax_address}
                      expiration_time={expirearrayStakeAvaxiDyp[cardIndex]}
                      other_info={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.expired === "Yes"
                              ? true
                              : false
                            : expiredDYPPools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : false
                      }
                      fee_s={
                        expiredPools === false
                          ? activePools[cardIndex]?.performancefee
                          : expiredDYPPools[cardIndex]?.performancefee
                      }
                      fee_u={feeUarrayStakeAvaxiDyp[cardIndexavaxiDyp - 3]}
                      lockTime={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                              ? "No Lock"
                              : activePools[cardIndex]?.lock_time?.split(" ")[0]
                            : expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                            ? "No Lock"
                            : expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0]
                          : "No Lock"
                      }
                    />
                  ) : activeCard7 && topList === "Vault" ? (
                    <Vault
                      vault={vaultArray[cardIndex]}
                      token={tokenvaultArray[cardIndex]}
                      platformTokenApyPercent={vaultplatformArray[cardIndex]}
                      UNDERLYING_DECIMALS={vaultdecimalsArray[cardIndex]}
                      UNDERLYING_SYMBOL={vaultsymbolArray[cardIndex]}
                      expiration_time={"04 March 2023"}
                      coinbase={coinbase}
                      lockTime={"No Lock"}
                      handleConnection={handleConnection}
                      chainId={chainId}
                      listType={listType}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      isConnected={isConnected}
                      the_graph_result={the_graph_result}
                    />
                  ) : (
                    <></>
                  )}
                </>
                <>
                  <div
                    className="top-picks-container"
                    style={{ marginTop: activePools.length >= 9 && "25px" }}
                  >
                    {activePools.slice(7, 8).map((pool, index) => (
                      <TopPoolsCard
                        display={
                          pool.expired
                            ? pool.expired === "Yes"
                              ? "none"
                              : ""
                            : ""
                        }
                        expired={false}
                        key={index}
                        chain={chain}
                        top_pick={pool.top_pick}
                        tokenName={
                          pool.tokenName
                            ? pool.tokenName
                            : pool.pair_name
                            ? pool.pair_name
                            : ""
                        }
                        apr={pool.apy_percent + "%"}
                        tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                        lockTime={
                          pool.lockTime
                            ? pool.lockTime
                            : pool.lock_time
                            ? pool.lock_time
                            : locktimeFarm[index]
                        }
                        tokenLogo={
                          pool.icon
                            ? pool.icon
                            : pool.pair_name === "iDYP"
                            ? "idypius.svg"
                            : "dyplogo.svg"
                        }
                        onShowDetailsClick={() => {
                          setActiveCard(null);
                          setActiveCard2(null);
                          setActiveCard3(null);
                          setActiveCard4(null);
                          setActiveCard5(null);
                          setActiveCard6(null);
                          setActiveCard7(null);
                          setActiveCard8(topPools[index + 7]);
                          setActiveCard9(null);
                          setActiveCard10(null);
                          setActiveCard11(null);
                          setActiveCard12(null);
                          setActiveCardNFT(false);
                          handleCardIndexStake(index + 7);
                          handleCardIndexStake30(index + 7);
                          handleCardIndexStakeiDyp(index + 7);
                          setDetails(index + 7);
                        }}
                        onHideDetailsClick={() => {
                          setActiveCard8(null);
                          setDetails();
                        }}
                        cardType={topList}
                        details={details === index + 7 ? true : false}
                        isNewPool={pool.isNewPool}
                        isStaked={pool.isStaked}
                      />
                    ))}
                  </div>
                  {activeCard8 &&
                  topList === "Staking" &&
                  cardIndex < 2 &&
                  chain === "bnb" ? (
                    <StakeBsc
                      lp_id={LP_IDBNB_Array[cardIndex]}
                      staking={stakearrayStakeBscDyp2[cardIndex]}
                      apr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_percent
                          : expiredDYPPools[cardIndex]?.apy_percent
                      }
                      liquidity={wbsc_address}
                      expiration_time={expirearrayStakeBscDyp2[cardIndex]}
                      finalApr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_performancefee
                          : expiredDYPPools[cardIndex]?.apy_performancefee
                      }
                      fee={
                        expiredPools === false
                          ? activePools[cardIndex]?.performancefee
                          : expiredDYPPools[cardIndex]?.performancefee
                      }
                      lockTime={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                              ? "No Lock"
                              : parseInt(
                                  activePools[cardIndex]?.lock_time?.split(
                                    " "
                                  )[0]
                                )
                            : expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                            ? "No Lock"
                            : parseInt(
                                expiredDYPPools[cardIndex]?.lock_time?.split(
                                  " "
                                )[0]
                              )
                          : "No Lock"
                      }
                      listType={listType}
                      other_info={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.expired === "Yes"
                              ? true
                              : false
                            : expiredDYPPools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : false
                      }
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_resultbsc}
                      chainId={chainId}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      referrer={referrer}
                    />
                  ) : activeCard8 &&
                    cardIndex >= 0 &&
                    topList === "Staking" &&
                    chain === "eth" ? (
                    <InitConstantStakingiDYP
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_result}
                      lp_id={lp_id[cardIndex]}
                      chainId={chainId}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      staking={stakeArrayiDYPActive[cardIndex]}
                      finalApr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_performancefee
                          : expiredDYPPools[cardIndex]?.apy_performancefee
                      }
                      apr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_percent
                          : expiredDYPPools[cardIndex]?.apy_percent
                      }
                      liquidity={eth_address}
                      expiration_time={expirationArray[cardIndex]}
                      other_info={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.expired === "Yes"
                              ? true
                              : false
                            : expiredDYPPools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : false
                      }
                      fee_s={
                        expiredPools === false
                          ? activePools[cardIndex]?.performancefee
                          : expiredDYPPools[cardIndex]?.performancefee
                      }
                      fee_u={withdrawFeeiDyp[cardIndex]}
                    />
                  ) : activeCard8 &&
                    cardIndex >= 2 &&
                    topList === "Staking" &&
                    chain === "bnb" ? (
                    <StakeBscIDyp
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_resultbsc}
                      chainId={chainId}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      staking={
                        expiredPools === false
                          ? stakearrayStakeBsciDyp2[cardIndex - 2]
                          : stakearrayStakeBsciDyp2Expired[cardIndex - 3]
                      }
                      listType={listType}
                      finalApr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_performancefee
                          : expiredDYPPools[cardIndex]?.apy_performancefee
                      }
                      apr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_percent
                          : expiredDYPPools[cardIndex]?.apy_percent
                      }
                      liquidity={wbsc_address}
                      expiration_time={
                        expiredPools === false
                          ? expirearrayStakeBsciDyp2[cardIndex - 2]
                          : expirearrayStakeBsciDyp2Expired[cardIndex - 3]
                      }
                      other_info={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.expired === "Yes"
                              ? true
                              : false
                            : expiredDYPPools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : false
                      }
                      fee_s={
                        expiredPools === false
                          ? activePools[cardIndex]?.performancefee
                          : expiredDYPPools[cardIndex]?.performancefee
                      }
                      fee_u={0}
                      lockTime={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                              ? "No Lock"
                              : parseInt(
                                  activePools[cardIndex]?.lock_time?.split(
                                    " "
                                  )[0]
                                )
                            : expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                            ? "No Lock"
                            : parseInt(
                                expiredDYPPools[cardIndex]?.lock_time?.split(
                                  " "
                                )[0]
                              )
                          : "No Lock"
                      }
                    />
                  ) : activeCard8 &&
                    topList === "Staking" &&
                    chain === "avax" &&
                    cardIndex < 2 ? (
                    <StakeAvax
                      is_wallet_connected={isConnected}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      the_graph_result={the_graph_resultavax}
                      chainId={chainId}
                      coinbase={coinbase}
                      referrer={referrer}
                      expired={false}
                    />
                  ) : activeCard8 &&
                    topList === "Staking" &&
                    chain === "avax" &&
                    cardIndex >= 2 &&
                    cardIndex < 4 ? (
                    <StakeAvax30
                      is_wallet_connected={isConnected}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      the_graph_result={the_graph_resultavax}
                      chainId={chainId}
                      coinbase={coinbase}
                      referrer={referrer}
                      expired={false}
                    />
                  ) : activeCard8 &&
                    topList === "Staking" &&
                    chain === "avax" &&
                    cardIndex >= 5 ? (
                    <StakeAvaxIDyp
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_resultavax}
                      chainId={chainId}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      staking={
                        expiredPools === false
                          ? stakingarrayStakeAvaxiDypActive[cardIndex - 2]
                          : stakingarrayStakeAvaxiDypExpired[cardIndex - 3]
                      }
                      listType={listType}
                      finalApr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_performancefee
                          : expiredDYPPools[cardIndex]?.apy_performancefee
                      }
                      apr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_percent
                          : expiredDYPPools[cardIndex]?.apy_percent
                      }
                      liquidity={avax_address}
                      expiration_time={expirearrayStakeAvaxiDyp[cardIndex]}
                      other_info={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.expired === "Yes"
                              ? true
                              : false
                            : expiredDYPPools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : false
                      }
                      fee_s={
                        expiredPools === false
                          ? activePools[cardIndex]?.performancefee
                          : expiredDYPPools[cardIndex]?.performancefee
                      }
                      fee_u={feeUarrayStakeAvaxiDyp[cardIndexavaxiDyp - 3]}
                      lockTime={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                              ? "No Lock"
                              : activePools[cardIndex]?.lock_time?.split(" ")[0]
                            : expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                            ? "No Lock"
                            : expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0]
                          : "No Lock"
                      }
                    />
                  ) : activeCard8 && topList === "Vault" ? (
                    <Vault
                      vault={vaultArray[cardIndex]}
                      token={tokenvaultArray[cardIndex]}
                      platformTokenApyPercent={vaultplatformArray[cardIndex]}
                      UNDERLYING_DECIMALS={vaultdecimalsArray[cardIndex]}
                      UNDERLYING_SYMBOL={vaultsymbolArray[cardIndex]}
                      expiration_time={"04 March 2023"}
                      coinbase={coinbase}
                      lockTime={"No Lock"}
                      handleConnection={handleConnection}
                      chainId={chainId}
                      listType={listType}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      isConnected={isConnected}
                      the_graph_result={the_graph_result}
                    />
                  ) : (
                    <></>
                  )}
                </>
                <>
                  <div
                    className="top-picks-container"
                    style={{ marginTop: activePools.length >= 9 && "25px" }}
                  >
                    {activePools.slice(8, 9).map((pool, index) => (
                      <TopPoolsCard
                        display={
                          pool.expired
                            ? pool.expired === "Yes"
                              ? "none"
                              : ""
                            : ""
                        }
                        expired={false}
                        key={index}
                        chain={chain}
                        top_pick={pool.top_pick}
                        tokenName={
                          pool.tokenName
                            ? pool.tokenName
                            : pool.pair_name
                            ? pool.pair_name
                            : ""
                        }
                        apr={pool.apy_percent + "%"}
                        tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                        lockTime={
                          pool.lockTime
                            ? pool.lockTime
                            : pool.lock_time
                            ? pool.lock_time
                            : locktimeFarm[index]
                        }
                        tokenLogo={
                          pool.icon
                            ? pool.icon
                            : pool.pair_name === "iDYP"
                            ? "idypius.svg"
                            : "dyplogo.svg"
                        }
                        onShowDetailsClick={() => {
                          setActiveCard(null);
                          setActiveCard2(null);
                          setActiveCard3(null);
                          setActiveCard4(null);
                          setActiveCard5(null);
                          setActiveCard6(null);
                          setActiveCard7(null);
                          setActiveCard8(null);
                          setActiveCard9(topPools[index + 8]);
                          setActiveCard10(null);
                          setActiveCard11(null);
                          setActiveCard12(null);
                          setActiveCardNFT(false);
                          handleCardIndexStake(index + 8);
                          handleCardIndexStake30(index + 8);
                          handleCardIndexStakeiDyp(index + 8);
                          setDetails(index + 8);
                        }}
                        onHideDetailsClick={() => {
                          setActiveCard9(null);
                          setDetails();
                        }}
                        cardType={topList}
                        details={details === index + 8 ? true : false}
                        isNewPool={pool.isNewPool}
                        isStaked={pool.isStaked}
                      />
                    ))}
                  </div>
                  {activeCard9 && topList === "Farming" ? (
                    chain === "eth" ? (
                      <StakingNew1
                        is_wallet_connected={isConnected}
                        coinbase={coinbase}
                        the_graph_result={the_graph_result}
                        lp_id={lp_id[cardIndex]}
                        chainId={chainId}
                        handleConnection={handleConnection}
                        handleSwitchNetwork={handleSwitchNetwork}
                        expired={false}
                      />
                    ) : chain === "bnb" ? (
                      <BscFarming
                        is_wallet_connected={isConnected}
                        coinbase={coinbase}
                        the_graph_result={the_graph_resultbsc}
                        lp_id={LP_IDBNB_Array[cardIndex]}
                        chainId={chainId}
                        handleConnection={handleConnection}
                        handleSwitchNetwork={handleSwitchNetwork}
                        expired={false}
                      />
                    ) : (
                      <FarmAvax
                        is_wallet_connected={isConnected}
                        handleConnection={handleConnection}
                        handleSwitchNetwork={handleSwitchNetwork}
                        the_graph_result={the_graph_resultavax}
                        lp_id={LP_IDAVAX_Array[cardIndex]}
                        chainId={chainId}
                        coinbase={coinbase}
                        expired={false}
                      />
                    )
                  ) : // : activeCard9 &&
                  //   topList === "Staking" &&
                  //   cardIndex < 3 &&
                  //   chain === "eth" ? (
                  //   <ConstantStaking1
                  //     is_wallet_connected={isConnected}
                  //     coinbase={coinbase}
                  //     the_graph_result={the_graph_result}
                  //     lp_id={lp_id[cardIndex]}
                  //     chainId={chainId}
                  //     handleConnection={handleConnection}
                  //     handleSwitchNetwork={handleSwitchNetwork}
                  //   />
                  // )

                  activeCard9 &&
                    cardIndex >= 0 &&
                    topList === "Staking" &&
                    chain === "eth" ? (
                    <InitConstantStakingiDYP
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_result}
                      lp_id={lp_id[cardIndex]}
                      chainId={chainId}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      staking={stakeArrayiDYPActive[cardIndex]}
                      finalApr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_performancefee
                          : expiredDYPPools[cardIndex]?.apy_performancefee
                      }
                      apr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_percent
                          : expiredDYPPools[cardIndex]?.apy_percent
                      }
                      liquidity={eth_address}
                      expiration_time={expirationArray[cardIndex]}
                      other_info={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.expired === "Yes"
                              ? true
                              : false
                            : expiredDYPPools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : false
                      }
                      fee_s={
                        expiredPools === false
                          ? activePools[cardIndex]?.performancefee
                          : expiredDYPPools[cardIndex]?.performancefee
                      }
                      fee_u={withdrawFeeiDyp[cardIndex]}
                    />
                  ) : activeCard9 &&
                    cardIndex >= 5 &&
                    topList === "Staking" &&
                    chain === "bnb" ? (
                    <StakeBscIDyp
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_resultbsc}
                      chainId={chainId}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      staking={
                        expiredPools === false
                          ? stakearrayStakeBsciDyp2[cardIndex - 2]
                          : stakearrayStakeBsciDyp2Expired[cardIndex - 3]
                      }
                      listType={listType}
                      finalApr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_performancefee
                          : expiredDYPPools[cardIndex]?.apy_performancefee
                      }
                      apr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_percent
                          : expiredDYPPools[cardIndex]?.apy_percent
                      }
                      liquidity={wbsc_address}
                      expiration_time={
                        expiredPools === false
                          ? expirearrayStakeBsciDyp2[cardIndex - 2]
                          : expirearrayStakeBsciDyp2Expired[cardIndex - 3]
                      }
                      other_info={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.expired === "Yes"
                              ? true
                              : false
                            : expiredDYPPools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : false
                      }
                      fee_s={
                        expiredPools === false
                          ? activePools[cardIndex]?.performancefee
                          : expiredDYPPools[cardIndex]?.performancefee
                      }
                      fee_u={0}
                      lockTime={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                              ? "No Lock"
                              : parseInt(
                                  activePools[cardIndex]?.lock_time?.split(
                                    " "
                                  )[0]
                                )
                            : expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                            ? "No Lock"
                            : parseInt(
                                expiredDYPPools[cardIndex]?.lock_time?.split(
                                  " "
                                )[0]
                              )
                          : "No Lock"
                      }
                    />
                  ) : activeCard9 &&
                    topList === "Staking" &&
                    chain === "avax" &&
                    cardIndex < 2 ? (
                    <StakeAvax
                      is_wallet_connected={isConnected}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      the_graph_result={the_graph_resultavax}
                      chainId={chainId}
                      coinbase={coinbase}
                      expired={false}
                      referrer={referrer}
                    />
                  ) : activeCard9 &&
                    topList === "Staking" &&
                    chain === "avax" &&
                    cardIndex >= 2 &&
                    cardIndex < 4 ? (
                    <StakeAvax30
                      is_wallet_connected={isConnected}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      the_graph_result={the_graph_resultavax}
                      chainId={chainId}
                      expired={false}
                      coinbase={coinbase}
                      referrer={referrer}
                    />
                  ) : activeCard9 &&
                    topList === "Staking" &&
                    chain === "avax" &&
                    cardIndex >= 5 ? (
                    <StakeAvaxIDyp
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_resultavax}
                      chainId={chainId}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      staking={
                        expiredPools === false
                          ? stakingarrayStakeAvaxiDypActive[cardIndex - 2]
                          : stakingarrayStakeAvaxiDypExpired[cardIndex - 3]
                      }
                      listType={listType}
                      finalApr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_performancefee
                          : expiredDYPPools[cardIndex]?.apy_performancefee
                      }
                      apr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_percent
                          : expiredDYPPools[cardIndex]?.apy_percent
                      }
                      liquidity={avax_address}
                      expiration_time={expirearrayStakeAvaxiDyp[cardIndex]}
                      other_info={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.expired === "Yes"
                              ? true
                              : false
                            : expiredDYPPools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : false
                      }
                      fee_s={
                        expiredPools === false
                          ? activePools[cardIndex]?.performancefee
                          : expiredDYPPools[cardIndex]?.performancefee
                      }
                      fee_u={feeUarrayStakeAvaxiDyp[cardIndexavaxiDyp - 3]}
                      lockTime={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                              ? "No Lock"
                              : activePools[cardIndex]?.lock_time?.split(" ")[0]
                            : expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                            ? "No Lock"
                            : expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0]
                          : "No Lock"
                      }
                    />
                  ) : activeCard9 && topList === "Vault" ? (
                    <Vault
                      vault={vaultArray[cardIndex]}
                      token={tokenvaultArray[cardIndex]}
                      platformTokenApyPercent={vaultplatformArray[cardIndex]}
                      UNDERLYING_DECIMALS={vaultdecimalsArray[cardIndex]}
                      UNDERLYING_SYMBOL={vaultsymbolArray[cardIndex]}
                      expiration_time={"04 March 2023"}
                      coinbase={coinbase}
                      lockTime={"No Lock"}
                      handleConnection={handleConnection}
                      chainId={chainId}
                      listType={listType}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      isConnected={isConnected}
                      the_graph_result={the_graph_result}
                    />
                  ) : (
                    <></>
                  )}
                </>
                <>
                  <div
                    className="top-picks-container"
                    style={{ marginTop: activePools.length > 9 && "25px" }}
                  >
                    {activePools.slice(9, 10).map((pool, index) => (
                      <TopPoolsCard
                        display={
                          pool.expired
                            ? pool.expired === "Yes"
                              ? "none"
                              : ""
                            : ""
                        }
                        expired={false}
                        key={index}
                        chain={chain}
                        top_pick={pool.top_pick}
                        tokenName={
                          pool.tokenName
                            ? pool.tokenName
                            : pool.pair_name
                            ? pool.pair_name
                            : ""
                        }
                        apr={pool.apy_percent + "%"}
                        tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                        lockTime={
                          pool.lockTime
                            ? pool.lockTime
                            : pool.lock_time
                            ? pool.lock_time
                            : locktimeFarm[index]
                        }
                        tokenLogo={
                          pool.icon
                            ? pool.icon
                            : pool.pair_name === "iDYP"
                            ? "idypius.svg"
                            : "dyplogo.svg"
                        }
                        onShowDetailsClick={() => {
                          setActiveCard(null);
                          setActiveCard2(null);
                          setActiveCard3(null);
                          setActiveCard4(null);
                          setActiveCard5(null);
                          setActiveCard6(null);
                          setActiveCard7(null);
                          setActiveCard8(null);
                          setActiveCard9(null);
                          setActiveCard10(topPools[index + 9]);
                          setActiveCard11(null);
                          setActiveCard12(null);
                          setActiveCardNFT(false);
                          handleCardIndexStake(index + 9);
                          handleCardIndexStake30(index + 9);
                          handleCardIndexStakeiDyp(index + 9);
                          setDetails(index + 9);
                        }}
                        onHideDetailsClick={() => {
                          setActiveCard10(null);
                          setDetails();
                        }}
                        cardType={topList}
                        details={details === index + 9 ? true : false}
                        isNewPool={pool.isNewPool}
                        isStaked={pool.isStaked}
                      />
                    ))}
                  </div>
                  {activeCard10 && topList === "Farming" ? (
                    chain === "eth" ? (
                      <StakingNew1
                        is_wallet_connected={isConnected}
                        coinbase={coinbase}
                        the_graph_result={the_graph_result}
                        lp_id={lp_id[cardIndex]}
                        chainId={chainId}
                        handleConnection={handleConnection}
                        handleSwitchNetwork={handleSwitchNetwork}
                        expired={false}
                      />
                    ) : chain === "bnb" ? (
                      <BscFarming
                        is_wallet_connected={isConnected}
                        coinbase={coinbase}
                        the_graph_result={the_graph_resultbsc}
                        lp_id={LP_IDBNB_Array[cardIndex]}
                        chainId={chainId}
                        handleConnection={handleConnection}
                        handleSwitchNetwork={handleSwitchNetwork}
                        expired={false}
                      />
                    ) : (
                      <FarmAvax
                        is_wallet_connected={isConnected}
                        handleConnection={handleConnection}
                        handleSwitchNetwork={handleSwitchNetwork}
                        the_graph_result={the_graph_resultavax}
                        lp_id={LP_IDAVAX_Array[cardIndex]}
                        chainId={chainId}
                        expired={false}
                        coinbase={coinbase}
                      />
                    )
                  ) : // : activeCard10 &&
                  //   topList === "Staking" &&
                  //   cardIndex < 3 &&
                  //   chain === "eth" ? (
                  //   <ConstantStaking1
                  //     is_wallet_connected={isConnected}
                  //     coinbase={coinbase}
                  //     the_graph_result={the_graph_result}
                  //     lp_id={lp_id[cardIndex]}
                  //     chainId={chainId}
                  //     handleConnection={handleConnection}
                  //     handleSwitchNetwork={handleSwitchNetwork}
                  //   />
                  // )

                  activeCard10 &&
                    cardIndex >= 0 &&
                    topList === "Staking" &&
                    chain === "eth" ? (
                    <InitConstantStakingiDYP
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_result}
                      lp_id={lp_id[cardIndex]}
                      chainId={chainId}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      staking={stakeArrayiDYPActive[cardIndex]}
                      finalApr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_performancefee
                          : expiredDYPPools[cardIndex]?.apy_performancefee
                      }
                      apr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_percent
                          : expiredDYPPools[cardIndex]?.apy_percent
                      }
                      liquidity={eth_address}
                      expiration_time={expirationArray[cardIndex]}
                      other_info={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.expired === "Yes"
                              ? true
                              : false
                            : expiredDYPPools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : false
                      }
                      fee_s={
                        expiredPools === false
                          ? activePools[cardIndex]?.performancefee
                          : expiredDYPPools[cardIndex]?.performancefee
                      }
                      fee_u={withdrawFeeiDyp[cardIndex]}
                    />
                  ) : activeCard10 &&
                    cardIndex >= 5 &&
                    topList === "Staking" &&
                    chain === "bnb" ? (
                    <StakeBscIDyp
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_resultbsc}
                      chainId={chainId}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      staking={
                        expiredPools === false
                          ? stakearrayStakeBsciDyp2[cardIndex - 2]
                          : stakearrayStakeBsciDyp2Expired[cardIndex - 3]
                      }
                      listType={listType}
                      finalApr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_performancefee
                          : expiredDYPPools[cardIndex]?.apy_performancefee
                      }
                      apr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_percent
                          : expiredDYPPools[cardIndex]?.apy_percent
                      }
                      liquidity={wbsc_address}
                      expiration_time={
                        expiredPools === false
                          ? expirearrayStakeBsciDyp2[cardIndex - 2]
                          : expirearrayStakeBsciDyp2Expired[cardIndex - 3]
                      }
                      other_info={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.expired === "Yes"
                              ? true
                              : false
                            : expiredDYPPools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : false
                      }
                      fee_s={
                        expiredPools === false
                          ? activePools[cardIndex]?.performancefee
                          : expiredDYPPools[cardIndex]?.performancefee
                      }
                      fee_u={0}
                      lockTime={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                              ? "No Lock"
                              : parseInt(
                                  activePools[cardIndex]?.lock_time?.split(
                                    " "
                                  )[0]
                                )
                            : expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                            ? "No Lock"
                            : parseInt(
                                expiredDYPPools[cardIndex]?.lock_time?.split(
                                  " "
                                )[0]
                              )
                          : "No Lock"
                      }
                    />
                  ) : activeCard10 &&
                    topList === "Staking" &&
                    chain === "avax" &&
                    cardIndex < 2 ? (
                    <StakeAvax
                      is_wallet_connected={isConnected}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      the_graph_result={the_graph_resultavax}
                      chainId={chainId}
                      coinbase={coinbase}
                      referrer={referrer}
                      expired={false}
                    />
                  ) : activeCard10 &&
                    topList === "Staking" &&
                    chain === "avax" &&
                    cardIndex >= 2 &&
                    cardIndex < 4 ? (
                    <StakeAvax30
                      is_wallet_connected={isConnected}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      the_graph_result={the_graph_resultavax}
                      chainId={chainId}
                      coinbase={coinbase}
                      referrer={referrer}
                      expired={false}
                    />
                  ) : activeCard10 &&
                    topList === "Staking" &&
                    chain === "avax" &&
                    cardIndex >= 5 ? (
                    <StakeAvaxIDyp
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_resultavax}
                      chainId={chainId}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      staking={
                        expiredPools === false
                          ? stakingarrayStakeAvaxiDypActive[cardIndex - 2]
                          : stakingarrayStakeAvaxiDypExpired[cardIndex - 3]
                      }
                      listType={listType}
                      finalApr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_performancefee
                          : expiredDYPPools[cardIndex]?.apy_performancefee
                      }
                      apr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_percent
                          : expiredDYPPools[cardIndex]?.apy_percent
                      }
                      liquidity={avax_address}
                      expiration_time={expirearrayStakeAvaxiDyp[cardIndex]}
                      other_info={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.expired === "Yes"
                              ? true
                              : false
                            : expiredDYPPools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : false
                      }
                      fee_s={
                        expiredPools === false
                          ? activePools[cardIndex]?.performancefee
                          : expiredDYPPools[cardIndex]?.performancefee
                      }
                      fee_u={feeUarrayStakeAvaxiDyp[cardIndexavaxiDyp - 3]}
                      lockTime={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                              ? "No Lock"
                              : activePools[cardIndex]?.lock_time?.split(" ")[0]
                            : expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                            ? "No Lock"
                            : expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0]
                          : "No Lock"
                      }
                    />
                  ) : activeCard10 && topList === "Vault" ? (
                    <Vault
                      vault={vaultArray[cardIndex]}
                      token={tokenvaultArray[cardIndex]}
                      platformTokenApyPercent={vaultplatformArray[cardIndex]}
                      UNDERLYING_DECIMALS={vaultdecimalsArray[cardIndex]}
                      UNDERLYING_SYMBOL={vaultsymbolArray[cardIndex]}
                      expiration_time={"04 March 2023"}
                      coinbase={coinbase}
                      lockTime={"No Lock"}
                      handleConnection={handleConnection}
                      chainId={chainId}
                      listType={listType}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      isConnected={isConnected}
                      the_graph_result={the_graph_result}
                    />
                  ) : (
                    <></>
                  )}
                </>
                <>
                  <div
                    className="top-picks-container"
                    style={{ marginTop: activePools.length > 9 && "25px" }}
                  >
                    {activePools.slice(10, 11).map((pool, index) => (
                      <TopPoolsCard
                        display={
                          pool.expired
                            ? pool.expired === "Yes"
                              ? "none"
                              : ""
                            : ""
                        }
                        expired={false}
                        key={index}
                        chain={chain}
                        top_pick={pool.top_pick}
                        tokenName={
                          pool.tokenName
                            ? pool.tokenName
                            : pool.pair_name
                            ? pool.pair_name
                            : ""
                        }
                        apr={pool.apy_percent + "%"}
                        tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                        lockTime={
                          pool.lockTime
                            ? pool.lockTime
                            : pool.lock_time
                            ? pool.lock_time
                            : locktimeFarm[index]
                        }
                        tokenLogo={
                          pool.icon
                            ? pool.icon
                            : pool.pair_name === "iDYP"
                            ? "idypius.svg"
                            : "dyplogo.svg"
                        }
                        onShowDetailsClick={() => {
                          setActiveCard(null);
                          setActiveCard2(null);
                          setActiveCard3(null);
                          setActiveCard4(null);
                          setActiveCard5(null);
                          setActiveCard6(null);
                          setActiveCard7(null);
                          setActiveCard8(null);
                          setActiveCard9(null);
                          setActiveCard10(null);
                          setActiveCard11(topPools[index + 10]);
                          setActiveCard12(null);
                          setActiveCardNFT(false);
                          handleCardIndexStake(index + 10);
                          handleCardIndexStake30(index + 10);
                          handleCardIndexStakeiDyp(index + 10);
                          setDetails(index + 10);
                        }}
                        onHideDetailsClick={() => {
                          setActiveCard11(null);
                          setDetails();
                        }}
                        cardType={topList}
                        details={details === index + 10 ? true : false}
                        isNewPool={pool.isNewPool}
                        isStaked={pool.isStaked}
                      />
                    ))}
                  </div>
                  {activeCard11 && topList === "Farming" ? (
                    chain === "eth" ? (
                      <StakingNew1
                        is_wallet_connected={isConnected}
                        coinbase={coinbase}
                        the_graph_result={the_graph_result}
                        lp_id={lp_id[cardIndex]}
                        chainId={chainId}
                        handleConnection={handleConnection}
                        handleSwitchNetwork={handleSwitchNetwork}
                        expired={false}
                      />
                    ) : chain === "bnb" ? (
                      <BscFarming
                        is_wallet_connected={isConnected}
                        coinbase={coinbase}
                        the_graph_result={the_graph_resultbsc}
                        lp_id={LP_IDBNB_Array[cardIndex]}
                        chainId={chainId}
                        handleConnection={handleConnection}
                        expired={false}
                        handleSwitchNetwork={handleSwitchNetwork}
                      />
                    ) : (
                      <FarmAvax
                        is_wallet_connected={isConnected}
                        handleConnection={handleConnection}
                        handleSwitchNetwork={handleSwitchNetwork}
                        the_graph_result={the_graph_resultavax}
                        lp_id={LP_IDAVAX_Array[cardIndex]}
                        chainId={chainId}
                        coinbase={coinbase}
                        expired={false}
                      />
                    )
                  ) : // : activeCard11 &&
                  //   topList === "Staking" &&
                  //   cardIndex < 3 &&
                  //   chain === "eth" ? (
                  //   <ConstantStaking1
                  //     is_wallet_connected={isConnected}
                  //     coinbase={coinbase}
                  //     the_graph_result={the_graph_result}
                  //     lp_id={lp_id[cardIndex]}
                  //     chainId={chainId}
                  //     handleConnection={handleConnection}
                  //     handleSwitchNetwork={handleSwitchNetwork}
                  //   />
                  // )
                  activeCard11 &&
                    cardIndex >= 0 &&
                    topList === "Staking" &&
                    chain === "eth" ? (
                    <InitConstantStakingiDYP
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_result}
                      lp_id={lp_id[cardIndex]}
                      chainId={chainId}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      staking={stakeArrayiDYPActive[cardIndex]}
                      finalApr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_performancefee
                          : expiredDYPPools[cardIndex]?.apy_performancefee
                      }
                      apr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_percent
                          : expiredDYPPools[cardIndex]?.apy_percent
                      }
                      liquidity={eth_address}
                      expiration_time={expirationArray[cardIndex]}
                      other_info={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.expired === "Yes"
                              ? true
                              : false
                            : expiredDYPPools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : false
                      }
                      fee_s={
                        expiredPools === false
                          ? activePools[cardIndex]?.performancefee
                          : expiredDYPPools[cardIndex]?.performancefee
                      }
                      fee_u={withdrawFeeiDyp[cardIndex]}
                    />
                  ) : activeCard11 &&
                    cardIndex >= 5 &&
                    topList === "Staking" &&
                    chain === "bnb" ? (
                    <StakeBscIDyp
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_resultbsc}
                      chainId={chainId}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      staking={
                        expiredPools === false
                          ? stakearrayStakeBsciDyp2[cardIndex - 2]
                          : stakearrayStakeBsciDyp2Expired[cardIndex - 3]
                      }
                      listType={listType}
                      finalApr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_performancefee
                          : expiredDYPPools[cardIndex]?.apy_performancefee
                      }
                      apr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_percent
                          : expiredDYPPools[cardIndex]?.apy_percent
                      }
                      liquidity={wbsc_address}
                      expiration_time={
                        expiredPools === false
                          ? expirearrayStakeBsciDyp2[cardIndex - 2]
                          : expirearrayStakeBsciDyp2Expired[cardIndex - 3]
                      }
                      other_info={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.expired === "Yes"
                              ? true
                              : false
                            : expiredDYPPools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : false
                      }
                      fee_s={
                        expiredPools === false
                          ? activePools[cardIndex]?.performancefee
                          : expiredDYPPools[cardIndex]?.performancefee
                      }
                      fee_u={0}
                      lockTime={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                              ? "No Lock"
                              : parseInt(
                                  activePools[cardIndex]?.lock_time?.split(
                                    " "
                                  )[0]
                                )
                            : expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                            ? "No Lock"
                            : parseInt(
                                expiredDYPPools[cardIndex]?.lock_time?.split(
                                  " "
                                )[0]
                              )
                          : "No Lock"
                      }
                    />
                  ) : activeCard11 &&
                    topList === "Staking" &&
                    chain === "avax" &&
                    cardIndex < 2 ? (
                    <StakeAvax
                      is_wallet_connected={isConnected}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      the_graph_result={the_graph_resultavax}
                      chainId={chainId}
                      coinbase={coinbase}
                      referrer={referrer}
                      expired={false}
                    />
                  ) : activeCard11 &&
                    topList === "Staking" &&
                    chain === "avax" &&
                    cardIndex >= 2 &&
                    cardIndex < 4 ? (
                    <StakeAvax30
                      is_wallet_connected={isConnected}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      the_graph_result={the_graph_resultavax}
                      chainId={chainId}
                      coinbase={coinbase}
                      expired={false}
                      referrer={referrer}
                    />
                  ) : activeCard11 &&
                    topList === "Staking" &&
                    chain === "avax" &&
                    cardIndex >= 5 ? (
                    <StakeAvaxIDyp
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_resultavax}
                      chainId={chainId}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      staking={
                        expiredPools === false
                          ? stakingarrayStakeAvaxiDypActive[cardIndex - 2]
                          : stakingarrayStakeAvaxiDypExpired[cardIndex - 3]
                      }
                      listType={listType}
                      finalApr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_performancefee
                          : expiredDYPPools[cardIndex]?.apy_performancefee
                      }
                      apr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_percent
                          : expiredDYPPools[cardIndex]?.apy_percent
                      }
                      liquidity={avax_address}
                      expiration_time={expirearrayStakeAvaxiDyp[cardIndex]}
                      other_info={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.expired === "Yes"
                              ? true
                              : false
                            : expiredDYPPools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : false
                      }
                      fee_s={
                        expiredPools === false
                          ? activePools[cardIndex]?.performancefee
                          : expiredDYPPools[cardIndex]?.performancefee
                      }
                      fee_u={feeUarrayStakeAvaxiDyp[cardIndexavaxiDyp - 3]}
                      lockTime={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                              ? "No Lock"
                              : activePools[cardIndex]?.lock_time?.split(" ")[0]
                            : expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                            ? "No Lock"
                            : expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0]
                          : "No Lock"
                      }
                    />
                  ) : activeCard11 && topList === "Vault" ? (
                    <Vault
                      vault={vaultArray[cardIndex]}
                      token={tokenvaultArray[cardIndex]}
                      platformTokenApyPercent={vaultplatformArray[cardIndex]}
                      UNDERLYING_DECIMALS={vaultdecimalsArray[cardIndex]}
                      UNDERLYING_SYMBOL={vaultsymbolArray[cardIndex]}
                      expiration_time={"04 March 2023"}
                      coinbase={coinbase}
                      lockTime={"No Lock"}
                      handleConnection={handleConnection}
                      chainId={chainId}
                      listType={listType}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      isConnected={isConnected}
                      the_graph_result={the_graph_result}
                    />
                  ) : (
                    <></>
                  )}
                </>
                <>
                  <div
                    className="top-picks-container"
                    style={{ marginTop: activePools.length > 9 && "25px" }}
                  >
                    {activePools
                      .slice(11, activePools.length)
                      .map((pool, index) => (
                        <TopPoolsCard
                          display={
                            pool.expired
                              ? pool.expired === "Yes"
                                ? "none"
                                : ""
                              : ""
                          }
                          expired={false}
                          key={index}
                          chain={chain}
                          top_pick={pool.top_pick}
                          tokenName={
                            pool.tokenName
                              ? pool.tokenName
                              : pool.pair_name
                              ? pool.pair_name
                              : ""
                          }
                          apr={pool.apy_percent + "%"}
                          tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                          lockTime={
                            pool.lockTime
                              ? pool.lockTime
                              : pool.lock_time
                              ? pool.lock_time
                              : locktimeFarm[index]
                          }
                          tokenLogo={
                            pool.icon
                              ? pool.icon
                              : pool.pair_name === "iDYP"
                              ? "idypius.svg"
                              : "dyplogo.svg"
                          }
                          onShowDetailsClick={() => {
                            setActiveCard(null);
                            setActiveCard2(null);
                            setActiveCard3(null);
                            setActiveCard4(null);
                            setActiveCard5(null);
                            setActiveCard6(null);
                            setActiveCard7(null);
                            setActiveCard8(null);
                            setActiveCard9(null);
                            setActiveCard10(null);
                            setActiveCard11(null);
                            setActiveCard12(topPools[index + 11]);
                            setActiveCardNFT(false);
                            handleCardIndexStake(index + 11);
                            handleCardIndexStake30(index + 11);
                            handleCardIndexStakeiDyp(index + 11);
                            setDetails(index + 11);
                          }}
                          onHideDetailsClick={() => {
                            setActiveCard12(null);
                            setDetails();
                          }}
                          cardType={topList}
                          details={details === index + 11 ? true : false}
                          isNewPool={pool.isNewPool}
                          isStaked={pool.isStaked}
                        />
                      ))}
                  </div>
                  {activeCard12 && topList === "Farming" ? (
                    chain === "eth" ? (
                      <StakingNew1
                        is_wallet_connected={isConnected}
                        coinbase={coinbase}
                        the_graph_result={the_graph_result}
                        lp_id={lp_id[cardIndex]}
                        chainId={chainId}
                        handleConnection={handleConnection}
                        handleSwitchNetwork={handleSwitchNetwork}
                        expired={false}
                      />
                    ) : chain === "bnb" ? (
                      <BscFarming
                        is_wallet_connected={isConnected}
                        coinbase={coinbase}
                        the_graph_result={the_graph_resultbsc}
                        lp_id={LP_IDBNB_Array[cardIndex]}
                        chainId={chainId}
                        handleConnection={handleConnection}
                        handleSwitchNetwork={handleSwitchNetwork}
                        expired={false}
                      />
                    ) : (
                      <FarmAvax
                        is_wallet_connected={isConnected}
                        handleConnection={handleConnection}
                        handleSwitchNetwork={handleSwitchNetwork}
                        the_graph_result={the_graph_resultavax}
                        lp_id={LP_IDAVAX_Array[cardIndex]}
                        chainId={chainId}
                        coinbase={coinbase}
                        expired={false}
                      />
                    )
                  ) : // : activeCard12 &&
                  //   topList === "Staking" &&
                  //   cardIndex < 3 &&
                  //   chain === "eth" ? (
                  //   <ConstantStaking1
                  //     is_wallet_connected={isConnected}
                  //     coinbase={coinbase}
                  //     the_graph_result={the_graph_result}
                  //     lp_id={lp_id[cardIndex]}
                  //     chainId={chainId}
                  //     handleConnection={handleConnection}
                  //     handleSwitchNetwork={handleSwitchNetwork}
                  //   />
                  // )
                  activeCard12 &&
                    cardIndex >= 0 &&
                    topList === "Staking" &&
                    chain === "eth" ? (
                    <InitConstantStakingiDYP
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_result}
                      lp_id={lp_id[cardIndex]}
                      chainId={chainId}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      staking={stakeArrayiDYPActive[cardIndex]}
                      finalApr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_performancefee
                          : expiredDYPPools[cardIndex]?.apy_performancefee
                      }
                      apr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_percent
                          : expiredDYPPools[cardIndex]?.apy_percent
                      }
                      liquidity={eth_address}
                      expiration_time={expirationArray[cardIndex]}
                      other_info={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.expired === "Yes"
                              ? true
                              : false
                            : expiredDYPPools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : false
                      }
                      fee_s={
                        expiredPools === false
                          ? activePools[cardIndex]?.performancefee
                          : expiredDYPPools[cardIndex]?.performancefee
                      }
                      fee_u={withdrawFeeiDyp[cardIndex]}
                    />
                  ) : activeCard12 &&
                    cardIndex >= 5 &&
                    topList === "Staking" &&
                    chain === "bnb" ? (
                    <StakeBscIDyp
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_resultbsc}
                      chainId={chainId}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      staking={
                        expiredPools === false
                          ? stakearrayStakeBsciDyp2[cardIndex - 2]
                          : stakearrayStakeBsciDyp2Expired[cardIndex - 3]
                      }
                      listType={listType}
                      finalApr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_performancefee
                          : expiredDYPPools[cardIndex]?.apy_performancefee
                      }
                      apr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_percent
                          : expiredDYPPools[cardIndex]?.apy_percent
                      }
                      liquidity={wbsc_address}
                      expiration_time={
                        expiredPools === false
                          ? expirearrayStakeBsciDyp2[cardIndex - 2]
                          : expirearrayStakeBsciDyp2Expired[cardIndex - 3]
                      }
                      other_info={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.expired === "Yes"
                              ? true
                              : false
                            : expiredDYPPools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : false
                      }
                      fee_s={
                        expiredPools === false
                          ? activePools[cardIndex]?.performancefee
                          : expiredDYPPools[cardIndex]?.performancefee
                      }
                      fee_u={0}
                      lockTime={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                              ? "No Lock"
                              : parseInt(
                                  activePools[cardIndex]?.lock_time?.split(
                                    " "
                                  )[0]
                                )
                            : expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                            ? "No Lock"
                            : parseInt(
                                expiredDYPPools[cardIndex]?.lock_time?.split(
                                  " "
                                )[0]
                              )
                          : "No Lock"
                      }
                    />
                  ) : activeCard12 &&
                    topList === "Staking" &&
                    chain === "avax" &&
                    cardIndex < 2 ? (
                    <StakeAvax
                      is_wallet_connected={isConnected}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      the_graph_result={the_graph_resultavax}
                      chainId={chainId}
                      coinbase={coinbase}
                      referrer={referrer}
                      expired={false}
                    />
                  ) : activeCard12 &&
                    topList === "Staking" &&
                    chain === "avax" &&
                    cardIndex >= 2 &&
                    cardIndex < 4 ? (
                    <StakeAvax30
                      is_wallet_connected={isConnected}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      the_graph_result={the_graph_resultavax}
                      chainId={chainId}
                      coinbase={coinbase}
                      referrer={referrer}
                      expired={false}
                    />
                  ) : activeCard12 &&
                    topList === "Staking" &&
                    chain === "avax" &&
                    cardIndex >= 5 ? (
                    <StakeAvaxIDyp
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_resultavax}
                      chainId={chainId}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      staking={
                        expiredPools === false
                          ? stakingarrayStakeAvaxiDypActive[cardIndex - 2]
                          : stakingarrayStakeAvaxiDypExpired[cardIndex - 3]
                      }
                      listType={listType}
                      finalApr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_performancefee
                          : expiredDYPPools[cardIndex]?.apy_performancefee
                      }
                      apr={
                        expiredPools === false
                          ? activePools[cardIndex]?.apy_percent
                          : expiredDYPPools[cardIndex]?.apy_percent
                      }
                      liquidity={avax_address}
                      expiration_time={expirearrayStakeAvaxiDyp[cardIndex]}
                      other_info={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.expired === "Yes"
                              ? true
                              : false
                            : expiredDYPPools[cardIndex]?.expired === "Yes"
                            ? true
                            : false
                          : false
                      }
                      fee_s={
                        expiredPools === false
                          ? activePools[cardIndex]?.performancefee
                          : expiredDYPPools[cardIndex]?.performancefee
                      }
                      fee_u={feeUarrayStakeAvaxiDyp[cardIndexavaxiDyp - 3]}
                      lockTime={
                        cardIndex !== undefined
                          ? expiredPools === false
                            ? activePools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                              ? "No Lock"
                              : activePools[cardIndex]?.lock_time?.split(" ")[0]
                            : expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0] === "No"
                            ? "No Lock"
                            : expiredDYPPools[cardIndex]?.lock_time?.split(
                                " "
                              )[0]
                          : "No Lock"
                      }
                    />
                  ) : activeCard12 && topList === "Vault" ? (
                    <Vault
                      vault={vaultArray[cardIndex]}
                      token={tokenvaultArray[cardIndex]}
                      platformTokenApyPercent={vaultplatformArray[cardIndex]}
                      UNDERLYING_DECIMALS={vaultdecimalsArray[cardIndex]}
                      UNDERLYING_SYMBOL={vaultsymbolArray[cardIndex]}
                      expiration_time={"04 March 2023"}
                      coinbase={coinbase}
                      lockTime={"No Lock"}
                      handleConnection={handleConnection}
                      chainId={chainId}
                      listType={listType}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                      isConnected={isConnected}
                      the_graph_result={the_graph_result}
                    />
                  ) : (
                    <></>
                  )}
                </>
              </div>
            )
          ) : (
            <div className="list-pools-container px-0">
              {cawsCard &&
                topList === "Staking" &&
                chain === "eth" &&
                cawsCard.map((pool, index) => (
                  <TopPoolsListCard
                    key={index}
                    expired={false}
                    chain={chain}
                    top_pick={pool.top_pick}
                    tokenName={
                      pool.tokenName
                        ? pool.tokenName
                        : pool.pair_name
                        ? pool.pair_name
                        : ""
                    }
                    apr={pool.apy_percent + "%"}
                    tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                    lockTime={
                      pool.lockTime
                        ? pool.lockTime
                        : pool.lock_time
                        ? pool.lock_time
                        : locktimeFarm[index]
                    }
                    cardType={topList}
                    tokenLogo={
                      pool.icon
                        ? pool.icon
                        : pool.pair_name === "iDYP"
                        ? "idypius.svg"
                        : pool.pair_name === "DYP"
                        ? "dyplogo.svg"
                        : "cawslogo.svg"
                    }
                    listType={listType}
                    onShowDetailsClick={() => {
                      setActiveCardNFT(true);
                      setActiveCard(null);
                      setActiveCard2(null);
                      setActiveCard3(null);
                      setActiveCard4(null);
                      setDetails();
                    }}
                    onHideDetailsClick={() => {
                      setActiveCardNFT(false);
                      setDetails();
                    }}
                    showDetails={activeCardNFT}
                    topList={topList}
                    coinbase={coinbase}
                    cardIndex={index}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                  />
                ))}
              {activePools.map((pool, index) => (
                <TopPoolsListCard
                  key={index}
                  expired={false}
                  chain={chain}
                  top_pick={pool.top_pick}
                  tokenName={
                    pool.tokenName
                      ? pool.tokenName
                      : pool.pair_name
                      ? pool.pair_name
                      : ""
                  }
                  apr={pool.apy_percent + "%"}
                  tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                  lockTime={
                    pool.lockTime
                      ? pool.lockTime
                      : pool.lock_time
                      ? pool.lock_time
                      : locktimeFarm[index]
                  }
                  cardType={topList}
                  tokenLogo={
                    pool.icon
                      ? pool.icon
                      : pool.pair_name === "iDYP"
                      ? "idypius.svg"
                      : "dyplogo.svg"
                  }
                  listType={listType}
                  onShowDetailsClick={() => {
                    setShowDetails(!showDetails);
                    setActiveCard(topPools[index]);
                    handleCardIndexStake(index);
                    handleCardIndexStake30(index);
                    handleCardIndexStakeiDyp(index);
                  }}
                  onHideDetailsClick={() => {
                    setActiveCard(null);
                  }}
                  showDetails={showDetails}
                  topList={topList}
                  cardIndex={index + 1}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  coinbase={coinbase}
                  referrer={referrer}
                  lp_id={lp_id[cardIndex]}
                  the_graph_result={the_graph_result}
                  the_graph_resultbsc={the_graph_resultbsc}
                  isConnected={isConnected}
                  the_graph_resultavax={the_graph_resultavax}
                  display={
                    pool.expired
                      ? pool.expired === "Yes"
                        ? "none"
                        : "flex"
                      : "flex"
                  }
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <>loading...</>
      )}
    </div>
  ) : topPools.length === 0 && expiredPools === false ? (
    <div
      className="w-100 d-flex justify-content-center align-items-center mt-5"
      style={{ minHeight: "240px" }}
    >
      <FadeLoader color="#7770DF" />
    </div>
  ) : (
    <div className={`row w-100 justify-content-center gap-4`}>
      {listing === "table" ? (
        windowSize.width > 1300 ? (
          <div className="px-0">
            <>
              <div className="top-picks-container">
                {expiredDYPPools.slice(0, 3).map((pool, index) => (
                  <TopPoolsCard
                    expired={true}
                    key={index}
                    chain={chain}
                    top_pick={pool.top_pick}
                    tokenName={pool.pair_name}
                    apr={pool.apy_percent + "%"}
                    tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                    lockTime={
                      pool.lock_time ? pool.lock_time : locktimeFarm[index]
                    }
                    tokenLogo={
                      pool.icon
                        ? pool.icon
                        : pool.pair_name === "DYP"
                        ? "dyplogo.svg"
                        : "idypius.svg"
                    }
                    onShowDetailsClick={() => {
                      setActiveCard(topPools[index]);
                      setActiveCard2(null);
                      setActiveCard3(null);
                      setActiveCard4(null);
                      setActiveCardNFT(false);
                      handleCardIndexStake(index);
                      handleCardIndexStake30(index);
                      // handleCardIndexStakeiDyp(index);
                      setDetails(index);
                    }}
                    onHideDetailsClick={() => {
                      setActiveCard(null);
                      setDetails();
                    }}
                    cardType={topList}
                    details={details === index ? true : false}
                    isNewPool={pool.isNewPool}
                    isStaked={pool.isStaked}
                  />
                ))}
              </div>

              {activeCard && topList === "Farming" ? (
                chain === "eth" ? (
                  <StakingNew1
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_result}
                    lp_id={lp_id[cardIndex]}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={true}
                  />
                ) : chain === "bnb" ? (
                  <BscFarming
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_resultbsc}
                    lp_id={LP_IDBNB_Array[cardIndex]}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={true}
                  />
                ) : (
                  <FarmAvax
                    is_wallet_connected={isConnected}
                    handleConnection={handleConnection}
                    the_graph_result={the_graph_resultavax}
                    lp_id={LP_IDAVAX_Array[cardIndex]}
                    chainId={chainId}
                    coinbase={coinbase}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={true}
                  />
                )
              ) : activeCard &&
                topList === "Staking" &&
                cardIndex < 2 &&
                chain === "eth" ? (
                <StakeEth
                  staking={stakeArrayStakeNew[cardIndex]}
                  apr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_percent
                      : expiredDYPPools[cardIndex]?.apy_percent
                  }
                  liquidity={eth_address}
                  expiration_time={"14 December 2022"}
                  finalApr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_performancefee
                      : expiredDYPPools[cardIndex]?.apy_performancefee
                  }
                  fee={
                    expiredPools
                      ? expiredPools[cardIndex - 1]?.performancefee
                      : 0
                  }
                  lockTime={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                          "No"
                          ? "No Lock"
                          : activePools[cardIndex]?.lock_time?.split(" ")[0]
                        : expiredDYPPools[cardIndex]?.lock_time?.split(
                            " "
                          )[0] === "No"
                        ? "No Lock"
                        : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                      : "No Lock"
                  }
                  lp_id={LP_IDBNB_Array[cardIndex]}
                  listType={listType}
                  other_info={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : expiredDYPPools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : false
                  }
                  fee={
                    expiredPools === false
                      ? activePools[cardIndex]?.performancefee
                      : expiredDYPPools[cardIndex]?.performancefee
                  }
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  referrer={referrer}
                />
              ) : activeCard &&
                cardIndex >= 2 &&
                topList === "Staking" &&
                chain === "eth" ? (
                <InitConstantStakingiDYP
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  staking={stakeArrayiDYP[cardIndex - 2]}
                  listType={listType}
                  finalApr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_performancefee
                      : expiredDYPPools[cardIndex]?.apy_performancefee
                  }
                  apr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_percent
                      : expiredDYPPools[cardIndex]?.apy_percent
                  }
                  liquidity={eth_address}
                  expiration_time={expirationArray[cardIndex - 2]}
                  other_info={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : expiredDYPPools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : false
                  }
                  fee_s={
                    expiredPools === false
                      ? activePools[cardIndex]?.performancefee
                      : expiredDYPPools[cardIndex]?.performancefee
                  }
                  fee_u={withdrawFeeiDyp[cardIndex - 2]}
                  lockTime={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                          "No"
                          ? "No Lock"
                          : activePools[cardIndex]?.lock_time?.split(" ")[0]
                        : expiredDYPPools[cardIndex]?.lock_time?.split(
                            " "
                          )[0] === "No"
                        ? "No Lock"
                        : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                      : "No Lock"
                  }
                />
              ) : activeCard &&
                (cardIndex === 0 || cardIndex === 2) &&
                topList === "Staking" &&
                chain === "bnb" ? (
                <StakeBsc2
                  staking={
                    cardIndex === 2
                      ? stakearrayStakeBscExpired[cardIndex - 1]
                      : stakearrayStakeBscExpired[cardIndex]
                  }
                  apr={expiredDYPPools[cardIndex]?.apy_percent}
                  liquidity={wbsc_address}
                  expiration_time={
                    cardIndex === 2
                      ? expirearrayStakeBscExpired[cardIndex - 1]
                      : expirearrayStakeBscExpired[cardIndex]
                  }
                  finalApr={expiredDYPPools[cardIndex]?.apy_performancefee}
                  fee={expiredDYPPools[cardIndex]?.performancefee}
                  lockTime={
                    expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                    "No"
                      ? "No Lock"
                      : parseInt(
                          expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                        )
                  }
                  lp_id={LP_IDBNB_Array[cardIndex]}
                  listType={listType}
                  other_info={true}
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultbsc}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  referrer={referrer}
                />
              ) : activeCard &&
                cardIndex === 1 &&
                topList === "Staking" &&
                chain === "bnb" ? (
                <StakeBscDai
                  staking={window.constant_stakingdaibsc}
                  apr={expiredDYPPools[cardIndex]?.apy_percent}
                  liquidity={wbsc_address}
                  expiration_time={"Expired"}
                  finalApr={expiredDYPPools[cardIndex]?.apy_performancefee}
                  fee={expiredDYPPools[cardIndex]?.performancefee}
                  lockTime={
                    expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                    "No"
                      ? "No Lock"
                      : parseInt(
                          expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                        )
                  }
                  listType={listType}
                  other_info={true}
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultbsc}
                  lp_id={LP_IDBNB_Array[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  referrer={referrer}
                />
              ) : activeCard &&
                cardIndex >= 3 &&
                topList === "Staking" &&
                chain === "bnb" ? (
                <StakeBscIDyp
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultbsc}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  staking={
                    expiredPools === false
                      ? stakearrayStakeBsciDyp2[cardIndex - 2]
                      : stakearrayStakeBsciDyp2Expired[cardIndex - 3]
                  }
                  listType={listType}
                  finalApr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_performancefee
                      : expiredDYPPools[cardIndex]?.apy_performancefee
                  }
                  apr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_percent
                      : expiredDYPPools[cardIndex]?.apy_percent
                  }
                  liquidity={wbsc_address}
                  expiration_time={
                    expiredPools === false
                      ? expirearrayStakeBsciDyp2[cardIndex - 2]
                      : expirearrayStakeBsciDyp2Expired[cardIndex - 3]
                  }
                  other_info={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : expiredDYPPools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : false
                  }
                  fee_s={
                    expiredPools === false
                      ? activePools[cardIndex]?.performancefee
                      : expiredDYPPools[cardIndex]?.performancefee
                  }
                  fee_u={0}
                  lockTime={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                          "No"
                          ? "No Lock"
                          : parseInt(
                              activePools[cardIndex]?.lock_time?.split(" ")[0]
                            )
                        : expiredDYPPools[cardIndex]?.lock_time?.split(
                            " "
                          )[0] === "No"
                        ? "No Lock"
                        : parseInt(
                            expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                          )
                      : "No Lock"
                  }
                />
              ) : activeCard &&
                topList === "Staking" &&
                chain === "avax" &&
                (cardIndex === 0 || cardIndex === 1) ? (
                <StakeAvax30
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  coinbase={coinbase}
                  referrer={referrer}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                />
              ) : activeCard &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex === 2 ? (
                <StakeAvaxDai
                  staking={window.constant_stakingdaiavax}
                  apr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_percent
                      : expiredDYPPools[cardIndex]?.apy_percent
                  }
                  liquidity={avax_address}
                  expiration_time={"Expired"}
                  finalApr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_performancefee
                      : expiredDYPPools[cardIndex]?.apy_performancefee
                  }
                  fee={
                    expiredPools
                      ? expiredPools[cardIndex - 1]?.performancefee
                      : 0
                  }
                  lockTime={
                    cardIndex !== undefined
                      ? expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                        ? "No Lock"
                        : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                      : "No Lock"
                  }
                  listType={listType}
                  other_info={true}
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  referrer={referrer}
                />
              ) : activeCard &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex > 2 ? (
                <StakeAvaxIDyp
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  staking={
                    expiredPools === false
                      ? stakingarrayStakeAvaxiDypActive[cardIndex - 2]
                      : stakingarrayStakeAvaxiDypExpired[cardIndex - 3]
                  }
                  listType={listType}
                  finalApr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_performancefee
                      : expiredDYPPools[cardIndex]?.apy_performancefee
                  }
                  apr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_percent
                      : expiredDYPPools[cardIndex]?.apy_percent
                  }
                  liquidity={avax_address}
                  expiration_time={expirearrayStakeAvaxiDyp[cardIndex]}
                  other_info={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : expiredDYPPools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : false
                  }
                  fee_s={
                    expiredPools === false
                      ? activePools[cardIndex]?.performancefee
                      : expiredDYPPools[cardIndex]?.performancefee
                  }
                  fee_u={feeUarrayStakeAvaxiDyp[cardIndexavaxiDyp - 3]}
                  lockTime={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                          "No"
                          ? "No Lock"
                          : activePools[cardIndex]?.lock_time?.split(" ")[0]
                        : expiredDYPPools[cardIndex]?.lock_time?.split(
                            " "
                          )[0] === "No"
                        ? "No Lock"
                        : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                      : "No Lock"
                  }
                />
              ) : (
                <></>
              )}
            </>
            <div className="top-picks-container" style={{ marginTop: "25px" }}>
              {expiredDYPPools.slice(3, 6).map((pool, index) => (
                <TopPoolsCard
                  expired={true}
                  display={
                    pool.expired
                      ? pool.expired === "Yes"
                        ? "grid"
                        : "none"
                      : "none"
                  }
                  key={index}
                  chain={chain}
                  top_pick={pool.top_pick}
                  tokenName={
                    pool.tokenName
                      ? pool.tokenName
                      : pool.pair_name
                      ? pool.pair_name
                      : ""
                  }
                  apr={
                    pool.apy_percent ? pool.apy_percent + "%" : pool.apy + "%"
                  }
                  tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                  lockTime={
                    pool.lock_time ? pool.lock_time : locktimeFarm[index + 3]
                  }
                  tokenLogo={
                    pool.icon
                      ? pool.icon
                      : pool.pair_name === "DYP"
                      ? "dyplogo.svg"
                      : "idypius.svg"
                  }
                  onShowDetailsClick={() => {
                    setActiveCard(null);
                    setActiveCard2(topPools[index + 3]);
                    setActiveCard3(null);
                    setActiveCardNFT(false);
                    handleCardIndexStake(index + 3);
                    handleCardIndexStake30(index + 3);
                    handleCardIndexStakeiDyp(index + 3);
                    setDetails(index + 3);
                  }}
                  onHideDetailsClick={() => {
                    setActiveCard2(null);
                    setDetails();
                  }}
                  cardType={topList}
                  details={details === index + 3 ? true : false}
                  isNewPool={pool.isNewPool}
                  isStaked={pool.isStaked}
                />
              ))}
            </div>
            {activeCard2 && topList === "Farming" ? (
              chain === "eth" ? (
                <StakingNew1
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  lp_id={lp_id[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                />
              ) : chain === "bnb" ? (
                <BscFarming
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultbsc}
                  lp_id={LP_IDBNB_Array[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                />
              ) : (
                <FarmAvax
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  the_graph_result={the_graph_resultavax}
                  lp_id={LP_IDAVAX_Array[cardIndex]}
                  chainId={chainId}
                  coinbase={coinbase}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                />
              )
            ) : activeCard2 &&
              cardIndex === 3 &&
              topList === "Staking" &&
              chain === "eth" ? (
              <InitConstantStakingiDYP
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_result}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                staking={stakeArrayiDYP[cardIndex - 2]}
                listType={listType}
                finalApr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_performancefee
                    : expiredDYPPools[cardIndex]?.apy_performancefee
                }
                apr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_percent
                    : expiredDYPPools[cardIndex]?.apy_percent
                }
                liquidity={eth_address}
                expiration_time={expirationArray[cardIndex - 2]}
                other_info={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : expiredDYPPools[cardIndex]?.expired === "Yes"
                      ? true
                      : false
                    : false
                }
                fee_s={
                  expiredPools === false
                    ? activePools[cardIndex]?.performancefee
                    : expiredDYPPools[cardIndex]?.performancefee
                }
                fee_u={withdrawFeeiDyp[cardIndex - 2]}
                lockTime={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                        ? "No Lock"
                        : activePools[cardIndex]?.lock_time?.split(" ")[0]
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                      ? "No Lock"
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                    : "No Lock"
                }
              />
            ) : activeCard2 &&
              cardIndex === 4 &&
              topList === "Staking" &&
              chain === "eth" ? (
              <StakeEthDai
                staking={window.constant_stakingdaieth}
                apr={expiredDYPPools[cardIndex]?.apy_percent}
                liquidity={eth_address}
                expiration_time={"Expired"}
                finalApr={expiredDYPPools[cardIndex]?.apy_performancefee}
                fee={expiredDYPPools[cardIndex]?.performancefee}
                lockTime={
                  expiredPools
                    ? expiredPools[cardIndex - 1]?.lock_time?.split(" ")[0] ===
                      "No"
                      ? "No Lock"
                      : expiredPools[cardIndex - 1]?.lock_time?.split(" ")[0]
                    : "No Lock"
                }
                listType={listType}
                other_info={true}
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_result}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                referrer={referrer}
                lp_id={lp_id[cardIndex]}
              />
            ) : activeCard2 &&
              cardIndex > 2 &&
              topList === "Staking" &&
              chain === "bnb" ? (
              <StakeBscIDyp
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultbsc}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                staking={
                  expiredPools === false
                    ? stakearrayStakeBsciDyp2[cardIndex - 2]
                    : stakearrayStakeBsciDyp2Expired[cardIndex - 3]
                }
                listType={listType}
                finalApr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_performancefee
                    : expiredDYPPools[cardIndex]?.apy_performancefee
                }
                apr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_percent
                    : expiredDYPPools[cardIndex]?.apy_percent
                }
                liquidity={wbsc_address}
                expiration_time={
                  expiredPools === false
                    ? expirearrayStakeBsciDyp2[cardIndex - 2]
                    : expirearrayStakeBsciDyp2Expired[cardIndex - 3]
                }
                other_info={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : expiredDYPPools[cardIndex]?.expired === "Yes"
                      ? true
                      : false
                    : false
                }
                fee_s={
                  expiredPools === false
                    ? activePools[cardIndex]?.performancefee
                    : expiredDYPPools[cardIndex]?.performancefee
                }
                fee_u={0}
                lockTime={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                        ? "No Lock"
                        : parseInt(
                            activePools[cardIndex]?.lock_time?.split(" ")[0]
                          )
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                      ? "No Lock"
                      : parseInt(
                          expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                        )
                    : "No Lock"
                }
              />
            ) : activeCard2 &&
              (cardIndex === 5 || cardIndex > 5) &&
              topList === "Staking" &&
              chain === "bnb" ? (
              <StakeBscIDyp
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultbsc}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                staking={
                  expiredPools === false
                    ? stakearrayStakeBsciDyp2[cardIndex - 2]
                    : stakearrayStakeBsciDyp2Expired[cardIndex - 3]
                }
                listType={listType}
                finalApr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_performancefee
                    : expiredDYPPools[cardIndex]?.apy_performancefee
                }
                apr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_percent
                    : expiredDYPPools[cardIndex]?.apy_percent
                }
                liquidity={wbsc_address}
                expiration_time={
                  expiredPools === false
                    ? expirearrayStakeBsciDyp2[cardIndex - 2]
                    : expirearrayStakeBsciDyp2Expired[cardIndex - 3]
                }
                other_info={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : expiredDYPPools[cardIndex]?.expired === "Yes"
                      ? true
                      : false
                    : false
                }
                fee_s={
                  expiredPools === false
                    ? activePools[cardIndex]?.performancefee
                    : expiredDYPPools[cardIndex]?.performancefee
                }
                fee_u={0}
                lockTime={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                        ? "No Lock"
                        : parseInt(
                            activePools[cardIndex]?.lock_time?.split(" ")[0]
                          )
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                      ? "No Lock"
                      : parseInt(
                          expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                        )
                    : "No Lock"
                }
              />
            ) : activeCard2 &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex < 2 ? (
              <StakeAvax30
                is_wallet_connected={isConnected}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                coinbase={coinbase}
                referrer={referrer}
              />
            ) : activeCard2 &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex === 2 ? (
              <StakeAvaxDai
                staking={window.constant_stakingdaiavax}
                apr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_percent
                    : expiredDYPPools[cardIndex]?.apy_percent
                }
                liquidity={avax_address}
                expiration_time={"Expired"}
                finalApr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_performancefee
                    : expiredDYPPools[cardIndex]?.apy_performancefee
                }
                fee={
                  expiredPools ? expiredPools[cardIndex - 1]?.performancefee : 0
                }
                lockTime={
                  cardIndex !== undefined
                    ? expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                      "No"
                      ? "No Lock"
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                    : "No Lock"
                }
                listType={listType}
                other_info={true}
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                referrer={referrer}
              />
            ) : activeCard2 &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex >= 3 ? (
              <StakeAvaxIDyp
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                staking={
                  expiredPools === false
                    ? stakingarrayStakeAvaxiDypActive[cardIndex - 2]
                    : stakingarrayStakeAvaxiDypExpired[cardIndex - 3]
                }
                listType={listType}
                finalApr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_performancefee
                    : expiredDYPPools[cardIndex]?.apy_performancefee
                }
                apr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_percent
                    : expiredDYPPools[cardIndex]?.apy_percent
                }
                liquidity={avax_address}
                expiration_time={expirearrayStakeAvaxiDyp[cardIndex]}
                other_info={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : expiredDYPPools[cardIndex]?.expired === "Yes"
                      ? true
                      : false
                    : false
                }
                fee_s={
                  expiredPools === false
                    ? activePools[cardIndex]?.performancefee
                    : expiredDYPPools[cardIndex]?.performancefee
                }
                fee_u={feeUarrayStakeAvaxiDyp[cardIndexavaxiDyp - 3]}
                lockTime={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                        ? "No Lock"
                        : activePools[cardIndex]?.lock_time?.split(" ")[0]
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                      ? "No Lock"
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                    : "No Lock"
                }
              />
            ) : (
              <></>
            )}
            <div className="top-picks-container" style={{ marginTop: "25px" }}>
              {expiredDYPPools.slice(6, 9).map((pool, index) => (
                <TopPoolsCard
                  expired={true}
                  display={
                    pool.expired
                      ? pool.expired === "Yes"
                        ? "grid"
                        : "none"
                      : "none"
                  }
                  key={index}
                  chain={chain}
                  top_pick={pool.top_pick}
                  tokenName={
                    pool.tokenName
                      ? pool.tokenName
                      : pool.pair_name
                      ? pool.pair_name
                      : ""
                  }
                  apr={
                    pool.apy_percent ? pool.apy_percent + "%" : pool.apy + "%"
                  }
                  tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                  lockTime={
                    pool.lock_time ? pool.lock_time : locktimeFarm[index]
                  }
                  tokenLogo={
                    pool.icon
                      ? pool.icon
                      : pool.pair_name === "iDYP"
                      ? "idypius.svg"
                      : "dyplogo.svg"
                  }
                  onShowDetailsClick={() => {
                    setActiveCard(null);
                    setActiveCard2(null);
                    setActiveCard3(topPools[index + 6]);
                    setActiveCardNFT(false);
                    handleCardIndexStake(index + 6);
                    handleCardIndexStake30(index + 6);
                    handleCardIndexStakeiDyp(index + 6);
                    setDetails(index + 6);
                  }}
                  onHideDetailsClick={() => {
                    setActiveCard3(null);
                    setDetails();
                  }}
                  cardType={topList}
                  details={details === index + 10 ? true : false}
                  isNewPool={pool.isNewPool}
                  isStaked={pool.isStaked}
                />
              ))}
            </div>
            {activeCard3 && topList === "Farming" ? (
              chain === "eth" ? (
                <StakingNew1
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  lp_id={lp_id[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                />
              ) : chain === "bnb" ? (
                <BscFarming
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultbsc}
                  lp_id={LP_IDBNB_Array[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                />
              ) : (
                <FarmAvax
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  the_graph_result={the_graph_resultavax}
                  lp_id={LP_IDAVAX_Array[cardIndex]}
                  chainId={chainId}
                  coinbase={coinbase}
                />
              )
            ) : activeCard3 &&
              topList === "Staking" &&
              cardIndex < 2 &&
              chain === "eth" ? (
              <StakeEth
                staking={stakeArrayStakeNew[cardIndex]}
                apr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_percent
                    : expiredDYPPools[cardIndex]?.apy_percent
                }
                liquidity={eth_address}
                expiration_time={"14 December 2022"}
                finalApr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_performancefee
                    : expiredDYPPools[cardIndex]?.apy_performancefee
                }
                fee={
                  expiredPools ? expiredPools[cardIndex - 1]?.performancefee : 0
                }
                lockTime={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                        ? "No Lock"
                        : activePools[cardIndex]?.lock_time?.split(" ")[0]
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                      ? "No Lock"
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                    : "No Lock"
                }
                lp_id={LP_IDBNB_Array[cardIndex]}
                listType={listType}
                other_info={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : expiredDYPPools[cardIndex]?.expired === "Yes"
                      ? true
                      : false
                    : false
                }
                fee={
                  expiredPools === false
                    ? activePools[cardIndex]?.performancefee
                    : expiredDYPPools[cardIndex]?.performancefee
                }
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_result}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                referrer={referrer}
              />
            ) : activeCard3 &&
              cardIndex > 2 &&
              topList === "Staking" &&
              chain === "eth" ? (
              <StakeEth
                staking={stakeArrayStakeNew[cardIndex]}
                apr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_percent
                    : expiredDYPPools[cardIndex]?.apy_percent
                }
                liquidity={eth_address}
                expiration_time={"14 December 2022"}
                finalApr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_performancefee
                    : expiredDYPPools[cardIndex]?.apy_performancefee
                }
                fee={
                  expiredPools ? expiredPools[cardIndex - 1]?.performancefee : 0
                }
                lockTime={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                        ? "No Lock"
                        : activePools[cardIndex]?.lock_time?.split(" ")[0]
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                      ? "No Lock"
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                    : "No Lock"
                }
                lp_id={LP_IDBNB_Array[cardIndex]}
                listType={listType}
                other_info={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : expiredDYPPools[cardIndex]?.expired === "Yes"
                      ? true
                      : false
                    : false
                }
                fee={
                  expiredPools === false
                    ? activePools[cardIndex]?.performancefee
                    : expiredDYPPools[cardIndex]?.performancefee
                }
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_result}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                referrer={referrer}
              />
            ) : activeCard3 &&
              cardIndex >= 2 &&
              topList === "Staking" &&
              chain === "eth" ? (
              <InitConstantStakingiDYP
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_result}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                staking={stakeArrayiDYP[cardIndex - 2]}
                listType={listType}
                finalApr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_performancefee
                    : expiredDYPPools[cardIndex]?.apy_performancefee
                }
                apr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_percent
                    : expiredDYPPools[cardIndex]?.apy_percent
                }
                liquidity={eth_address}
                expiration_time={expirationArray[cardIndex - 2]}
                other_info={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : expiredDYPPools[cardIndex]?.expired === "Yes"
                      ? true
                      : false
                    : false
                }
                fee_s={
                  expiredPools === false
                    ? activePools[cardIndex]?.performancefee
                    : expiredDYPPools[cardIndex]?.performancefee
                }
                fee_u={withdrawFeeiDyp[cardIndex - 2]}
                lockTime={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                        ? "No Lock"
                        : activePools[cardIndex]?.lock_time?.split(" ")[0]
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                      ? "No Lock"
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                    : "No Lock"
                }
              />
            ) : activeCard3 &&
              cardIndex >= 5 &&
              topList === "Staking" &&
              chain === "bnb" ? (
              <StakeBscIDyp
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultbsc}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                staking={
                  expiredPools === false
                    ? stakearrayStakeBsciDyp2[cardIndex - 2]
                    : stakearrayStakeBsciDyp2Expired[cardIndex - 3]
                }
                listType={listType}
                finalApr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_performancefee
                    : expiredDYPPools[cardIndex]?.apy_performancefee
                }
                apr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_percent
                    : expiredDYPPools[cardIndex]?.apy_percent
                }
                liquidity={wbsc_address}
                expiration_time={
                  expiredPools === false
                    ? expirearrayStakeBsciDyp2[cardIndex - 2]
                    : expirearrayStakeBsciDyp2Expired[cardIndex - 3]
                }
                other_info={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : expiredDYPPools[cardIndex]?.expired === "Yes"
                      ? true
                      : false
                    : false
                }
                fee_s={
                  expiredPools === false
                    ? activePools[cardIndex]?.performancefee
                    : expiredDYPPools[cardIndex]?.performancefee
                }
                fee_u={0}
                lockTime={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                        ? "No Lock"
                        : parseInt(
                            activePools[cardIndex]?.lock_time?.split(" ")[0]
                          )
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                      ? "No Lock"
                      : parseInt(
                          expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                        )
                    : "No Lock"
                }
              />
            ) : activeCard3 &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex >= 2 &&
              cardIndex < 4 ? (
              <StakeAvax30
                is_wallet_connected={isConnected}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                coinbase={coinbase}
                referrer={referrer}
              />
            ) : activeCard3 &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex === 4 ? (
              <StakeAvaxDai
                staking={window.constant_stakingdaiavax}
                apr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_percent
                    : expiredDYPPools[cardIndex]?.apy_percent
                }
                liquidity={avax_address}
                expiration_time={"Expired"}
                finalApr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_performancefee
                    : expiredDYPPools[cardIndex]?.apy_performancefee
                }
                fee={
                  expiredPools ? expiredPools[cardIndex - 1]?.performancefee : 0
                }
                lockTime={
                  cardIndex !== undefined
                    ? expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                      "No"
                      ? "No Lock"
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                    : "No Lock"
                }
                listType={listType}
                other_info={true}
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                referrer={referrer}
              />
            ) : activeCard3 &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex >= 2 ? (
              <StakeAvaxIDyp
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                staking={
                  expiredPools === false
                    ? stakingarrayStakeAvaxiDypActive[cardIndex - 2]
                    : stakingarrayStakeAvaxiDypExpired[cardIndex - 3]
                }
                listType={listType}
                finalApr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_performancefee
                    : expiredDYPPools[cardIndex]?.apy_performancefee
                }
                apr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_percent
                    : expiredDYPPools[cardIndex]?.apy_percent
                }
                liquidity={avax_address}
                expiration_time={expirearrayStakeAvaxiDyp[cardIndex]}
                other_info={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : expiredDYPPools[cardIndex]?.expired === "Yes"
                      ? true
                      : false
                    : false
                }
                fee_s={
                  expiredPools === false
                    ? activePools[cardIndex]?.performancefee
                    : expiredDYPPools[cardIndex]?.performancefee
                }
                fee_u={feeUarrayStakeAvaxiDyp[cardIndexavaxiDyp - 3]}
                lockTime={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                        ? "No Lock"
                        : activePools[cardIndex]?.lock_time?.split(" ")[0]
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                      ? "No Lock"
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                    : "No Lock"
                }
              />
            ) : (
              <></>
            )}
            <div
              className="top-picks-container"
              style={{ marginTop: expiredDYPPools.length > 9 && "25px" }}
            >
              {expiredDYPPools
                .slice(9, expiredDYPPools.length)
                .map((pool, index) => (
                  <TopPoolsCard
                    expired={true}
                    display={
                      pool.expired
                        ? pool.expired === "Yes"
                          ? "none"
                          : "none"
                        : "none"
                    }
                    key={index}
                    chain={chain}
                    top_pick={pool.top_pick}
                    tokenName={
                      pool.tokenName
                        ? pool.tokenName
                        : pool.pair_name
                        ? pool.pair_name
                        : ""
                    }
                    apr={pool.apy + "%"}
                    tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                    lockTime={
                      pool.lock_time ? pool.lock_time : locktimeFarm[index]
                    }
                    tokenLogo={
                      pool.icon
                        ? pool.icon
                        : pool.pair_name === "iDYP"
                        ? "idypius.svg"
                        : "dyplogo.svg"
                    }
                    onShowDetailsClick={() => {
                      setActiveCard(null);
                      setActiveCard2(null);
                      setActiveCard3(null);
                      setActiveCard4(topPools[index + 9]);
                      setActiveCardNFT(false);
                      handleCardIndexStake(index + 9);
                      handleCardIndexStake30(index + 9);
                      handleCardIndexStakeiDyp(index + 9);
                      setDetails(index + 9);
                    }}
                    onHideDetailsClick={() => {
                      setActiveCard4(null);
                      setDetails();
                    }}
                    cardType={topList}
                    details={details === index + 9 ? true : false}
                    isNewPool={pool.isNewPool}
                    isStaked={pool.isStaked}
                  />
                ))}
            </div>
            {activeCard4 && topList === "Farming" ? (
              chain === "eth" ? (
                <StakingNew1
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  lp_id={lp_id[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                />
              ) : chain === "bnb" ? (
                <BscFarming
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultbsc}
                  lp_id={LP_IDBNB_Array[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                />
              ) : (
                <FarmAvax
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  the_graph_result={the_graph_resultavax}
                  lp_id={LP_IDAVAX_Array[cardIndex]}
                  chainId={chainId}
                  coinbase={coinbase}
                />
              )
            ) : activeCard4 &&
              topList === "Staking" &&
              cardIndex < 3 &&
              chain === "eth" ? (
              <StakeEth
                staking={stakeArrayStakeNew[cardIndex]}
                apr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_percent
                    : expiredDYPPools[cardIndex]?.apy_percent
                }
                liquidity={eth_address}
                expiration_time={"14 December 2022"}
                finalApr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_performancefee
                    : expiredDYPPools[cardIndex]?.apy_performancefee
                }
                fee={
                  expiredPools ? expiredPools[cardIndex - 1]?.performancefee : 0
                }
                lockTime={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                        ? "No Lock"
                        : activePools[cardIndex]?.lock_time?.split(" ")[0]
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                      ? "No Lock"
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                    : "No Lock"
                }
                lp_id={LP_IDBNB_Array[cardIndex]}
                listType={listType}
                other_info={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : expiredDYPPools[cardIndex]?.expired === "Yes"
                      ? true
                      : false
                    : false
                }
                fee={
                  expiredPools === false
                    ? activePools[cardIndex]?.performancefee
                    : expiredDYPPools[cardIndex]?.performancefee
                }
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_result}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                referrer={referrer}
              />
            ) : activeCard4 &&
              cardIndex > 2 &&
              topList === "Staking" &&
              chain === "eth" ? (
              <StakeEth
                staking={stakeArrayStakeNew[cardIndex]}
                apr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_percent
                    : expiredDYPPools[cardIndex]?.apy_percent
                }
                liquidity={eth_address}
                expiration_time={"14 December 2022"}
                finalApr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_performancefee
                    : expiredDYPPools[cardIndex]?.apy_performancefee
                }
                fee={
                  expiredPools ? expiredPools[cardIndex - 1]?.performancefee : 0
                }
                lockTime={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                        ? "No Lock"
                        : activePools[cardIndex]?.lock_time?.split(" ")[0]
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                      ? "No Lock"
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                    : "No Lock"
                }
                lp_id={LP_IDBNB_Array[cardIndex]}
                listType={listType}
                other_info={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : expiredDYPPools[cardIndex]?.expired === "Yes"
                      ? true
                      : false
                    : false
                }
                fee={
                  expiredPools === false
                    ? activePools[cardIndex]?.performancefee
                    : expiredDYPPools[cardIndex]?.performancefee
                }
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_result}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                referrer={referrer}
              />
            ) : activeCard4 &&
              cardIndex >= 2 &&
              topList === "Staking" &&
              chain === "eth" ? (
              <InitConstantStakingiDYP
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_result}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                staking={stakeArrayiDYP[cardIndex - 2]}
                listType={listType}
                finalApr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_performancefee
                    : expiredDYPPools[cardIndex]?.apy_performancefee
                }
                apr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_percent
                    : expiredDYPPools[cardIndex]?.apy_percent
                }
                liquidity={eth_address}
                expiration_time={expirationArray[cardIndex - 2]}
                other_info={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : expiredDYPPools[cardIndex]?.expired === "Yes"
                      ? true
                      : false
                    : false
                }
                fee_s={
                  expiredPools === false
                    ? activePools[cardIndex]?.performancefee
                    : expiredDYPPools[cardIndex]?.performancefee
                }
                fee_u={withdrawFeeiDyp[cardIndex - 2]}
                lockTime={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                        ? "No Lock"
                        : activePools[cardIndex]?.lock_time?.split(" ")[0]
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                      ? "No Lock"
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                    : "No Lock"
                }
              />
            ) : activeCard4 &&
              cardIndex >= 5 &&
              topList === "Staking" &&
              chain === "bnb" ? (
              <StakeBscIDyp
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultbsc}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                staking={
                  expiredPools === false
                    ? stakearrayStakeBsciDyp2[cardIndex - 2]
                    : stakearrayStakeBsciDyp2Expired[cardIndex - 3]
                }
                listType={listType}
                finalApr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_performancefee
                    : expiredDYPPools[cardIndex]?.apy_performancefee
                }
                apr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_percent
                    : expiredDYPPools[cardIndex]?.apy_percent
                }
                liquidity={wbsc_address}
                expiration_time={
                  expiredPools === false
                    ? expirearrayStakeBsciDyp2[cardIndex - 2]
                    : expirearrayStakeBsciDyp2Expired[cardIndex - 3]
                }
                other_info={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : expiredDYPPools[cardIndex]?.expired === "Yes"
                      ? true
                      : false
                    : false
                }
                fee_s={
                  expiredPools === false
                    ? activePools[cardIndex]?.performancefee
                    : expiredDYPPools[cardIndex]?.performancefee
                }
                fee_u={0}
                lockTime={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                        ? "No Lock"
                        : parseInt(
                            activePools[cardIndex]?.lock_time?.split(" ")[0]
                          )
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                      ? "No Lock"
                      : parseInt(
                          expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                        )
                    : "No Lock"
                }
              />
            ) : activeCard4 &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex >= 2 &&
              cardIndex < 4 ? (
              <StakeAvax30
                is_wallet_connected={isConnected}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                coinbase={coinbase}
                referrer={referrer}
              />
            ) : activeCard4 &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex === 4 ? (
              <StakeAvaxDai
                staking={window.constant_stakingdaiavax}
                apr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_percent
                    : expiredDYPPools[cardIndex]?.apy_percent
                }
                liquidity={avax_address}
                expiration_time={"Expired"}
                finalApr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_performancefee
                    : expiredDYPPools[cardIndex]?.apy_performancefee
                }
                fee={
                  expiredPools ? expiredPools[cardIndex - 1]?.performancefee : 0
                }
                lockTime={
                  cardIndex !== undefined
                    ? expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                      "No"
                      ? "No Lock"
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                    : "No Lock"
                }
                listType={listType}
                other_info={true}
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                referrer={referrer}
              />
            ) : activeCard4 &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex >= 2 ? (
              <StakeAvaxIDyp
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                staking={
                  expiredPools === false
                    ? stakingarrayStakeAvaxiDypActive[cardIndex - 2]
                    : stakingarrayStakeAvaxiDypExpired[cardIndex - 3]
                }
                listType={listType}
                finalApr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_performancefee
                    : expiredDYPPools[cardIndex]?.apy_performancefee
                }
                apr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_percent
                    : expiredDYPPools[cardIndex]?.apy_percent
                }
                liquidity={avax_address}
                expiration_time={expirearrayStakeAvaxiDyp[cardIndex]}
                other_info={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : expiredDYPPools[cardIndex]?.expired === "Yes"
                      ? true
                      : false
                    : false
                }
                fee_s={
                  expiredPools === false
                    ? activePools[cardIndex]?.performancefee
                    : expiredDYPPools[cardIndex]?.performancefee
                }
                fee_u={feeUarrayStakeAvaxiDyp[cardIndexavaxiDyp - 3]}
                lockTime={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                        ? "No Lock"
                        : activePools[cardIndex]?.lock_time?.split(" ")[0]
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                      ? "No Lock"
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                    : "No Lock"
                }
              />
            ) : (
              <></>
            )}
          </div>
        ) : windowSize.width > 786 ? (
          <div className="px-0">
            <div className="top-picks-container">
              {expiredDYPPools.slice(0, 2).map((pool, index) => (
                <TopPoolsCard
                  expired={true}
                  display={
                    pool.expired
                      ? pool.expired === "Yes"
                        ? ""
                        : "none"
                      : "none"
                  }
                  key={index}
                  chain={chain}
                  top_pick={pool.top_pick}
                  tokenName={
                    pool.tokenName
                      ? pool.tokenName
                      : pool.pair_name
                      ? pool.pair_name
                      : ""
                  }
                  apr={pool.apy_percent + "%"}
                  tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                  lockTime={
                    pool.lockTime
                      ? pool.lockTime
                      : pool.lock_time
                      ? pool.lock_time
                      : locktimeFarm[index]
                  }
                  tokenLogo={
                    pool.icon
                      ? pool.icon
                      : pool.pair_name === "iDYP"
                      ? "idypius.svg"
                      : "dyplogo.svg"
                  }
                  onShowDetailsClick={() => {
                    setActiveCard(topPools[index]);
                    setActiveCard2(null);
                    setActiveCard3(null);
                    setActiveCard4(null);
                    setActiveCard5(null);
                    setActiveCard6(null);
                    setActiveCardNFT(false);
                    handleCardIndexStake(index);
                    handleCardIndexStake30(index);
                    handleCardIndexStakeiDyp(index);
                    setDetails(index);
                  }}
                  onHideDetailsClick={() => {
                    setActiveCard(null);
                    setActiveCard2(null);
                    setActiveCard3(null);
                    setActiveCard4(null);
                    setActiveCard5(null);
                    setActiveCard6(null);
                    setDetails();
                  }}
                  cardType={topList}
                  details={details === index ? true : false}
                  isNewPool={pool.isNewPool}
                  isStaked={pool.isStaked}
                />
              ))}
            </div>

            {activeCard2 && topList === "Farming" ? (
              chain === "eth" ? (
                <StakingNew1
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  lp_id={lp_id[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                />
              ) : chain === "bnb" ? (
                <BscFarming
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultbsc}
                  lp_id={LP_IDBNB_Array[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                />
              ) : (
                <FarmAvax
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  the_graph_result={the_graph_resultavax}
                  lp_id={LP_IDAVAX_Array[cardIndex]}
                  chainId={chainId}
                  coinbase={coinbase}
                />
              )
            ) : activeCard &&
              topList === "Staking" &&
              cardIndex < 2 &&
              chain === "eth" ? (
              <StakeEth
                staking={stakeArrayStakeNew[cardIndex]}
                apr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_percent
                    : expiredDYPPools[cardIndex]?.apy_percent
                }
                liquidity={eth_address}
                expiration_time={"14 December 2022"}
                finalApr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_performancefee
                    : expiredDYPPools[cardIndex]?.apy_performancefee
                }
                fee={
                  expiredPools ? expiredPools[cardIndex - 1]?.performancefee : 0
                }
                lockTime={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                        ? "No Lock"
                        : activePools[cardIndex]?.lock_time?.split(" ")[0]
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                      ? "No Lock"
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                    : "No Lock"
                }
                lp_id={LP_IDBNB_Array[cardIndex]}
                listType={listType}
                other_info={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : expiredDYPPools[cardIndex]?.expired === "Yes"
                      ? true
                      : false
                    : false
                }
                fee={
                  expiredPools === false
                    ? activePools[cardIndex]?.performancefee
                    : expiredDYPPools[cardIndex]?.performancefee
                }
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_result}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                referrer={referrer}
              />
            ) : activeCard &&
              topList === "Staking" &&
              cardIndex < 2 &&
              chain === "bnb" ? (
              <StakeBsc2
                staking={
                  cardIndex === 2
                    ? stakearrayStakeBscExpired[cardIndex - 1]
                    : stakearrayStakeBscExpired[cardIndex]
                }
                apr={expiredDYPPools[cardIndex]?.apy_percent}
                liquidity={wbsc_address}
                expiration_time={
                  cardIndex === 2
                    ? expirearrayStakeBscExpired[cardIndex - 1]
                    : expirearrayStakeBscExpired[cardIndex]
                }
                finalApr={expiredDYPPools[cardIndex]?.apy_performancefee}
                fee={expiredDYPPools[cardIndex]?.performancefee}
                lockTime={
                  expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] === "No"
                    ? "No Lock"
                    : parseInt(
                        expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                      )
                }
                lp_id={LP_IDBNB_Array[cardIndex]}
                listType={listType}
                other_info={true}
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultbsc}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                referrer={referrer}
              />
            ) : activeCard &&
              cardIndex > 2 &&
              topList === "Staking" &&
              chain === "eth" ? (
              <InitConstantStakingiDYP
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_result}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                staking={stakeArrayiDYP[cardIndex - 2]}
                listType={listType}
                finalApr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_performancefee
                    : expiredDYPPools[cardIndex]?.apy_performancefee
                }
                apr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_percent
                    : expiredDYPPools[cardIndex]?.apy_percent
                }
                liquidity={eth_address}
                expiration_time={expirationArray[cardIndex - 2]}
                other_info={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : expiredDYPPools[cardIndex]?.expired === "Yes"
                      ? true
                      : false
                    : false
                }
                fee_s={
                  expiredPools === false
                    ? activePools[cardIndex]?.performancefee
                    : expiredDYPPools[cardIndex]?.performancefee
                }
                fee_u={withdrawFeeiDyp[cardIndex - 2]}
                lockTime={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                        ? "No Lock"
                        : activePools[cardIndex]?.lock_time?.split(" ")[0]
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                      ? "No Lock"
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                    : "No Lock"
                }
              />
            ) : activeCard &&
              cardIndex === 1 &&
              topList === "Staking" &&
              chain === "bnb" ? (
              <StakeBscDai
                staking={window.constant_stakingdaibsc}
                apr={expiredDYPPools[cardIndex]?.apy_percent}
                liquidity={wbsc_address}
                expiration_time={"Expired"}
                finalApr={expiredDYPPools[cardIndex]?.apy_performancefee}
                fee={expiredDYPPools[cardIndex]?.performancefee}
                lockTime={
                  expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] === "No"
                    ? "No Lock"
                    : parseInt(
                        expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                      )
                }
                listType={listType}
                other_info={true}
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultbsc}
                lp_id={LP_IDBNB_Array[cardIndex]}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                referrer={referrer}
              />
            ) : activeCard &&
              cardIndex >= 2 &&
              cardIndex < 4 &&
              topList === "Staking" &&
              chain === "bnb" ? (
              <StakeBsc2
                staking={
                  cardIndex === 2
                    ? stakearrayStakeBscExpired[cardIndex - 1]
                    : stakearrayStakeBscExpired[cardIndex]
                }
                apr={expiredDYPPools[cardIndex]?.apy_percent}
                liquidity={wbsc_address}
                expiration_time={
                  cardIndex === 2
                    ? expirearrayStakeBscExpired[cardIndex - 1]
                    : expirearrayStakeBscExpired[cardIndex]
                }
                finalApr={expiredDYPPools[cardIndex]?.apy_performancefee}
                fee={expiredDYPPools[cardIndex]?.performancefee}
                lockTime={
                  expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] === "No"
                    ? "No Lock"
                    : parseInt(
                        expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                      )
                }
                lp_id={LP_IDBNB_Array[cardIndex]}
                listType={listType}
                other_info={true}
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultbsc}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                referrer={referrer}
              />
            ) : activeCard &&
              (cardIndex === 5 || cardIndex > 5) &&
              topList === "Staking" &&
              chain === "bnb" ? (
              <StakeBscIDyp
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultbsc}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                staking={
                  expiredPools === false
                    ? stakearrayStakeBsciDyp2[cardIndex - 2]
                    : stakearrayStakeBsciDyp2Expired[cardIndex - 3]
                }
                listType={listType}
                finalApr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_performancefee
                    : expiredDYPPools[cardIndex]?.apy_performancefee
                }
                apr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_percent
                    : expiredDYPPools[cardIndex]?.apy_percent
                }
                liquidity={wbsc_address}
                expiration_time={
                  expiredPools === false
                    ? expirearrayStakeBsciDyp2[cardIndex - 2]
                    : expirearrayStakeBsciDyp2Expired[cardIndex - 3]
                }
                other_info={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : expiredDYPPools[cardIndex]?.expired === "Yes"
                      ? true
                      : false
                    : false
                }
                fee_s={
                  expiredPools === false
                    ? activePools[cardIndex]?.performancefee
                    : expiredDYPPools[cardIndex]?.performancefee
                }
                fee_u={0}
                lockTime={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                        ? "No Lock"
                        : parseInt(
                            activePools[cardIndex]?.lock_time?.split(" ")[0]
                          )
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                      ? "No Lock"
                      : parseInt(
                          expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                        )
                    : "No Lock"
                }
              />
            ) : activeCard &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex < 2 ? (
              <StakeAvax30
                is_wallet_connected={isConnected}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                coinbase={coinbase}
                referrer={referrer}
              />
            ) : activeCard &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex === 2 ? (
              <StakeAvaxDai
                staking={window.constant_stakingdaiavax}
                apr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_percent
                    : expiredDYPPools[cardIndex]?.apy_percent
                }
                liquidity={avax_address}
                expiration_time={"Expired"}
                finalApr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_performancefee
                    : expiredDYPPools[cardIndex]?.apy_performancefee
                }
                fee={
                  expiredPools ? expiredPools[cardIndex - 1]?.performancefee : 0
                }
                lockTime={
                  cardIndex !== undefined
                    ? expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                      "No"
                      ? "No Lock"
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                    : "No Lock"
                }
                listType={listType}
                other_info={true}
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                referrer={referrer}
              />
            ) : (
              <></>
            )}
            <div className="top-picks-container" style={{ marginTop: "25px" }}>
              {expiredDYPPools.slice(2, 4).map((pool, index) => (
                <TopPoolsCard
                  expired={true}
                  display={
                    pool.expired
                      ? pool.expired === "Yes"
                        ? ""
                        : "none"
                      : "none"
                  }
                  key={index}
                  chain={chain}
                  top_pick={pool.top_pick}
                  tokenName={
                    pool.tokenName
                      ? pool.tokenName
                      : pool.pair_name
                      ? pool.pair_name
                      : ""
                  }
                  apr={pool.apy_percent + "%"}
                  tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                  lockTime={
                    pool.lockTime
                      ? pool.lockTime
                      : pool.lock_time
                      ? pool.lock_time
                      : locktimeFarm[index]
                  }
                  tokenLogo={
                    pool.icon
                      ? pool.icon
                      : pool.pair_name === "iDYP"
                      ? "idypius.svg"
                      : "dyplogo.svg"
                  }
                  onShowDetailsClick={() => {
                    setActiveCard(null);
                    setActiveCard2(topPools[index + 2]);
                    setActiveCard3(null);
                    setActiveCard4(null);
                    setActiveCard5(null);
                    setActiveCard6(null);
                    setActiveCardNFT(false);
                    handleCardIndexStake(index + 2);
                    handleCardIndexStake30(index + 2);
                    handleCardIndexStakeiDyp(index + 2);
                    setDetails(index + 2);
                  }}
                  onHideDetailsClick={() => {
                    setActiveCard2(null);
                    setActiveCard3(null);
                    setActiveCard4(null);
                    setActiveCard5(null);
                    setActiveCard6(null);
                    setDetails();
                  }}
                  cardType={topList}
                  details={details === index + 2 ? true : false}
                  isNewPool={pool.isNewPool}
                  isStaked={pool.isStaked}
                />
              ))}
            </div>
            {activeCard2 && topList === "Farming" ? (
              chain === "eth" ? (
                <StakingNew1
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  lp_id={lp_id[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                />
              ) : chain === "bnb" ? (
                <BscFarming
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultbsc}
                  lp_id={LP_IDBNB_Array[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                />
              ) : (
                <FarmAvax
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  the_graph_result={the_graph_resultavax}
                  lp_id={LP_IDAVAX_Array[cardIndex]}
                  chainId={chainId}
                  coinbase={coinbase}
                />
              )
            ) : activeCard2 &&
              topList === "Staking" &&
              cardIndex < 2 &&
              chain === "eth" ? (
              <StakeEth
                staking={stakeArrayStakeNew[cardIndex]}
                apr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_percent
                    : expiredDYPPools[cardIndex]?.apy_percent
                }
                liquidity={eth_address}
                expiration_time={"14 December 2022"}
                finalApr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_performancefee
                    : expiredDYPPools[cardIndex]?.apy_performancefee
                }
                fee={
                  expiredPools ? expiredPools[cardIndex - 1]?.performancefee : 0
                }
                lockTime={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                        ? "No Lock"
                        : activePools[cardIndex]?.lock_time?.split(" ")[0]
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                      ? "No Lock"
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                    : "No Lock"
                }
                lp_id={LP_IDBNB_Array[cardIndex]}
                listType={listType}
                other_info={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : expiredDYPPools[cardIndex]?.expired === "Yes"
                      ? true
                      : false
                    : false
                }
                fee={
                  expiredPools === false
                    ? activePools[cardIndex]?.performancefee
                    : expiredDYPPools[cardIndex]?.performancefee
                }
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_result}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                referrer={referrer}
              />
            ) : activeCard2 &&
              (cardIndex === 0 || cardIndex === 2) &&
              topList === "Staking" &&
              chain === "bnb" ? (
              <StakeBsc2
                staking={
                  cardIndex === 2
                    ? stakearrayStakeBscExpired[cardIndex - 1]
                    : stakearrayStakeBscExpired[cardIndex]
                }
                apr={expiredDYPPools[cardIndex]?.apy_percent}
                liquidity={wbsc_address}
                expiration_time={
                  cardIndex === 2
                    ? expirearrayStakeBscExpired[cardIndex - 1]
                    : expirearrayStakeBscExpired[cardIndex]
                }
                finalApr={expiredDYPPools[cardIndex]?.apy_performancefee}
                fee={expiredDYPPools[cardIndex]?.performancefee}
                lockTime={
                  expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] === "No"
                    ? "No Lock"
                    : parseInt(
                        expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                      )
                }
                lp_id={LP_IDBNB_Array[cardIndex]}
                listType={listType}
                other_info={true}
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultbsc}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                referrer={referrer}
              />
            ) : activeCard2 &&
              cardIndex >= 3 &&
              topList === "Staking" &&
              chain === "eth" ? (
              <InitConstantStakingiDYP
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_result}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                staking={stakeArrayiDYP[cardIndex - 2]}
                listType={listType}
                finalApr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_performancefee
                    : expiredDYPPools[cardIndex]?.apy_performancefee
                }
                apr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_percent
                    : expiredDYPPools[cardIndex]?.apy_percent
                }
                liquidity={eth_address}
                expiration_time={expirationArray[cardIndex - 2]}
                other_info={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : expiredDYPPools[cardIndex]?.expired === "Yes"
                      ? true
                      : false
                    : false
                }
                fee_s={
                  expiredPools === false
                    ? activePools[cardIndex]?.performancefee
                    : expiredDYPPools[cardIndex]?.performancefee
                }
                fee_u={withdrawFeeiDyp[cardIndex - 2]}
                lockTime={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                        ? "No Lock"
                        : activePools[cardIndex]?.lock_time?.split(" ")[0]
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                      ? "No Lock"
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                    : "No Lock"
                }
              />
            ) : activeCard2 &&
              cardIndex >= 3 &&
              topList === "Staking" &&
              chain === "bnb" ? (
              <StakeBscIDyp
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultbsc}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                staking={
                  expiredPools === false
                    ? stakearrayStakeBsciDyp2[cardIndex - 2]
                    : stakearrayStakeBsciDyp2Expired[cardIndex - 3]
                }
                listType={listType}
                finalApr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_performancefee
                    : expiredDYPPools[cardIndex]?.apy_performancefee
                }
                apr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_percent
                    : expiredDYPPools[cardIndex]?.apy_percent
                }
                liquidity={wbsc_address}
                expiration_time={
                  expiredPools === false
                    ? expirearrayStakeBsciDyp2[cardIndex - 2]
                    : expirearrayStakeBsciDyp2Expired[cardIndex - 3]
                }
                other_info={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : expiredDYPPools[cardIndex]?.expired === "Yes"
                      ? true
                      : false
                    : false
                }
                fee_s={
                  expiredPools === false
                    ? activePools[cardIndex]?.performancefee
                    : expiredDYPPools[cardIndex]?.performancefee
                }
                fee_u={0}
                lockTime={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                        ? "No Lock"
                        : parseInt(
                            activePools[cardIndex]?.lock_time?.split(" ")[0]
                          )
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                      ? "No Lock"
                      : parseInt(
                          expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                        )
                    : "No Lock"
                }
              />
            ) : activeCard2 &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex === 2 ? (
              <StakeAvax30
                is_wallet_connected={isConnected}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                coinbase={coinbase}
                referrer={referrer}
              />
            ) : activeCard2 &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex > 2 ? (
              <StakeAvaxIDyp
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                staking={
                  expiredPools === false
                    ? stakingarrayStakeAvaxiDypActive[cardIndex - 2]
                    : stakingarrayStakeAvaxiDypExpired[cardIndex - 3]
                }
                listType={listType}
                finalApr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_performancefee
                    : expiredDYPPools[cardIndex]?.apy_performancefee
                }
                apr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_percent
                    : expiredDYPPools[cardIndex]?.apy_percent
                }
                liquidity={avax_address}
                expiration_time={expirearrayStakeAvaxiDyp[cardIndex]}
                other_info={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : expiredDYPPools[cardIndex]?.expired === "Yes"
                      ? true
                      : false
                    : false
                }
                fee_s={
                  expiredPools === false
                    ? activePools[cardIndex]?.performancefee
                    : expiredDYPPools[cardIndex]?.performancefee
                }
                fee_u={feeUarrayStakeAvaxiDyp[cardIndexavaxiDyp - 3]}
                lockTime={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                        ? "No Lock"
                        : activePools[cardIndex]?.lock_time?.split(" ")[0]
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                      ? "No Lock"
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                    : "No Lock"
                }
              />
            ) : (
              <></>
            )}
            <div className="top-picks-container" style={{ marginTop: "25px" }}>
              {expiredDYPPools.slice(4, 6).map((pool, index) => (
                <TopPoolsCard
                  expired={true}
                  display={
                    pool.expired
                      ? pool.expired === "Yes"
                        ? ""
                        : "none"
                      : "none"
                  }
                  key={index}
                  chain={chain}
                  top_pick={pool.top_pick}
                  tokenName={
                    pool.tokenName
                      ? pool.tokenName
                      : pool.pair_name
                      ? pool.pair_name
                      : ""
                  }
                  apr={pool.apy_percent + "%"}
                  tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                  lockTime={
                    pool.lockTime
                      ? pool.lockTime
                      : pool.lock_time
                      ? pool.lock_time
                      : locktimeFarm[index]
                  }
                  tokenLogo={
                    pool.icon
                      ? pool.icon
                      : pool.pair_name === "iDYP"
                      ? "idypius.svg"
                      : "dyplogo.svg"
                  }
                  onShowDetailsClick={() => {
                    setActiveCard(null);
                    setActiveCard2(null);
                    setActiveCard3(topPools[index + 4]);
                    setActiveCard4(null);
                    setActiveCard5(null);
                    setActiveCard6(null);
                    setActiveCardNFT(false);
                    handleCardIndexStake(index + 4);
                    handleCardIndexStake30(index + 4);
                    handleCardIndexStakeiDyp(index + 4);
                    setDetails(index + 4);
                  }}
                  onHideDetailsClick={() => {
                    setActiveCard3(null);
                    setDetails();
                  }}
                  cardType={topList}
                  details={details === index + 4 ? true : false}
                  isNewPool={pool.isNewPool}
                  isStaked={pool.isStaked}
                />
              ))}
            </div>
            {activeCard3 && topList === "Farming" ? (
              chain === "eth" ? (
                <StakingNew1
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  lp_id={lp_id[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                />
              ) : chain === "bnb" ? (
                <BscFarming
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultbsc}
                  lp_id={LP_IDBNB_Array[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                />
              ) : (
                <FarmAvax
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  the_graph_result={the_graph_resultavax}
                  lp_id={LP_IDAVAX_Array[cardIndex]}
                  chainId={chainId}
                  coinbase={coinbase}
                />
              )
            ) : activeCard3 &&
              topList === "Staking" &&
              cardIndex < 2 &&
              chain === "eth" ? (
              <StakeEth
                staking={stakeArrayStakeNew[cardIndex]}
                apr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_percent
                    : expiredDYPPools[cardIndex]?.apy_percent
                }
                liquidity={eth_address}
                expiration_time={"14 December 2022"}
                finalApr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_performancefee
                    : expiredDYPPools[cardIndex]?.apy_performancefee
                }
                fee={
                  expiredPools ? expiredPools[cardIndex - 1]?.performancefee : 0
                }
                lockTime={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                        ? "No Lock"
                        : activePools[cardIndex]?.lock_time?.split(" ")[0]
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                      ? "No Lock"
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                    : "No Lock"
                }
                lp_id={LP_IDBNB_Array[cardIndex]}
                listType={listType}
                other_info={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : expiredDYPPools[cardIndex]?.expired === "Yes"
                      ? true
                      : false
                    : false
                }
                fee={
                  expiredPools === false
                    ? activePools[cardIndex]?.performancefee
                    : expiredDYPPools[cardIndex]?.performancefee
                }
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_result}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                referrer={referrer}
              />
            ) : activeCard3 &&
              topList === "Staking" &&
              cardIndex === 4 &&
              chain === "eth" ? (
              <StakeEthDai
                staking={window.constant_stakingdaieth}
                apr={expiredDYPPools[cardIndex]?.apy_percent}
                liquidity={eth_address}
                expiration_time={"Expired"}
                finalApr={expiredDYPPools[cardIndex]?.apy_performancefee}
                fee={expiredDYPPools[cardIndex]?.performancefee}
                lockTime={
                  expiredPools
                    ? expiredPools[cardIndex - 1]?.lock_time?.split(" ")[0] ===
                      "No"
                      ? "No Lock"
                      : expiredPools[cardIndex - 1]?.lock_time?.split(" ")[0]
                    : "No Lock"
                }
                listType={listType}
                other_info={true}
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_result}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                referrer={referrer}
                lp_id={lp_id[cardIndex]}
              />
            ) : activeCard3 &&
              topList === "Staking" &&
              cardIndex < 2 &&
              chain === "bnb" ? (
              <StakeBsc2
                staking={
                  cardIndex === 2
                    ? stakearrayStakeBscExpired[cardIndex - 1]
                    : stakearrayStakeBscExpired[cardIndex]
                }
                apr={expiredDYPPools[cardIndex]?.apy_percent}
                liquidity={wbsc_address}
                expiration_time={
                  cardIndex === 2
                    ? expirearrayStakeBscExpired[cardIndex - 1]
                    : expirearrayStakeBscExpired[cardIndex]
                }
                finalApr={expiredDYPPools[cardIndex]?.apy_performancefee}
                fee={expiredDYPPools[cardIndex]?.performancefee}
                lockTime={
                  expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] === "No"
                    ? "No Lock"
                    : parseInt(
                        expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                      )
                }
                lp_id={LP_IDBNB_Array[cardIndex]}
                listType={listType}
                other_info={true}
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultbsc}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                referrer={referrer}
              />
            ) : activeCard3 &&
              cardIndex === 3 &&
              topList === "Staking" &&
              chain === "eth" ? (
              <InitConstantStakingiDYP
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_result}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                staking={stakeArrayiDYP[cardIndex - 2]}
                listType={listType}
                finalApr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_performancefee
                    : expiredDYPPools[cardIndex]?.apy_performancefee
                }
                apr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_percent
                    : expiredDYPPools[cardIndex]?.apy_percent
                }
                liquidity={eth_address}
                expiration_time={expirationArray[cardIndex - 2]}
                other_info={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : expiredDYPPools[cardIndex]?.expired === "Yes"
                      ? true
                      : false
                    : false
                }
                fee_s={
                  expiredPools === false
                    ? activePools[cardIndex]?.performancefee
                    : expiredDYPPools[cardIndex]?.performancefee
                }
                fee_u={withdrawFeeiDyp[cardIndex - 2]}
                lockTime={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                        ? "No Lock"
                        : activePools[cardIndex]?.lock_time?.split(" ")[0]
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                      ? "No Lock"
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                    : "No Lock"
                }
              />
            ) : activeCard3 &&
              cardIndex === 4 &&
              topList === "Staking" &&
              chain === "bnb" ? (
              <StakeBscDai
                staking={window.constant_stakingdaibsc}
                apr={expiredDYPPools[cardIndex]?.apy_percent}
                liquidity={wbsc_address}
                expiration_time={"Expired"}
                finalApr={expiredDYPPools[cardIndex]?.apy_performancefee}
                fee={expiredDYPPools[cardIndex]?.performancefee}
                lockTime={
                  expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] === "No"
                    ? "No Lock"
                    : parseInt(
                        expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                      )
                }
                listType={listType}
                other_info={true}
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultbsc}
                lp_id={LP_IDBNB_Array[cardIndex]}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                referrer={referrer}
              />
            ) : activeCard3 &&
              cardIndex >= 2 &&
              cardIndex < 4 &&
              topList === "Staking" &&
              chain === "bnb" ? (
              <StakeBsc2
                staking={
                  cardIndex === 2
                    ? stakearrayStakeBscExpired[cardIndex - 1]
                    : stakearrayStakeBscExpired[cardIndex]
                }
                apr={expiredDYPPools[cardIndex]?.apy_percent}
                liquidity={wbsc_address}
                expiration_time={
                  cardIndex === 2
                    ? expirearrayStakeBscExpired[cardIndex - 1]
                    : expirearrayStakeBscExpired[cardIndex]
                }
                finalApr={expiredDYPPools[cardIndex]?.apy_performancefee}
                fee={expiredDYPPools[cardIndex]?.performancefee}
                lockTime={
                  expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] === "No"
                    ? "No Lock"
                    : parseInt(
                        expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                      )
                }
                lp_id={LP_IDBNB_Array[cardIndex]}
                listType={listType}
                other_info={true}
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultbsc}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                referrer={referrer}
              />
            ) : activeCard3 &&
              (cardIndex === 5 || cardIndex > 5) &&
              topList === "Staking" &&
              chain === "bnb" ? (
              <StakeBscIDyp
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultbsc}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                staking={
                  expiredPools === false
                    ? stakearrayStakeBsciDyp2[cardIndex - 2]
                    : stakearrayStakeBsciDyp2Expired[cardIndex - 3]
                }
                listType={listType}
                finalApr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_performancefee
                    : expiredDYPPools[cardIndex]?.apy_performancefee
                }
                apr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_percent
                    : expiredDYPPools[cardIndex]?.apy_percent
                }
                liquidity={wbsc_address}
                expiration_time={
                  expiredPools === false
                    ? expirearrayStakeBsciDyp2[cardIndex - 2]
                    : expirearrayStakeBsciDyp2Expired[cardIndex - 3]
                }
                other_info={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : expiredDYPPools[cardIndex]?.expired === "Yes"
                      ? true
                      : false
                    : false
                }
                fee_s={
                  expiredPools === false
                    ? activePools[cardIndex]?.performancefee
                    : expiredDYPPools[cardIndex]?.performancefee
                }
                fee_u={0}
                lockTime={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                        ? "No Lock"
                        : parseInt(
                            activePools[cardIndex]?.lock_time?.split(" ")[0]
                          )
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                      ? "No Lock"
                      : parseInt(
                          expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                        )
                    : "No Lock"
                }
              />
            ) : activeCard3 &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex < 2 ? (
              <StakeAvax
                is_wallet_connected={isConnected}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                coinbase={coinbase}
                referrer={referrer}
              />
            ) : activeCard3 &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex < 2 ? (
              <StakeAvax30
                is_wallet_connected={isConnected}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                coinbase={coinbase}
                referrer={referrer}
              />
            ) : activeCard3 &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex === 2 ? (
              <StakeAvaxDai
                staking={window.constant_stakingdaiavax}
                apr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_percent
                    : expiredDYPPools[cardIndex]?.apy_percent
                }
                liquidity={avax_address}
                expiration_time={"Expired"}
                finalApr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_performancefee
                    : expiredDYPPools[cardIndex]?.apy_performancefee
                }
                fee={
                  expiredPools ? expiredPools[cardIndex - 1]?.performancefee : 0
                }
                lockTime={
                  cardIndex !== undefined
                    ? expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                      "No"
                      ? "No Lock"
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                    : "No Lock"
                }
                listType={listType}
                other_info={true}
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                referrer={referrer}
              />
            ) : activeCard3 &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex > 2 ? (
              <StakeAvaxIDyp
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                staking={
                  expiredPools === false
                    ? stakingarrayStakeAvaxiDypActive[cardIndex - 2]
                    : stakingarrayStakeAvaxiDypExpired[cardIndex - 3]
                }
                listType={listType}
                finalApr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_performancefee
                    : expiredDYPPools[cardIndex]?.apy_performancefee
                }
                apr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_percent
                    : expiredDYPPools[cardIndex]?.apy_percent
                }
                liquidity={avax_address}
                expiration_time={expirearrayStakeAvaxiDyp[cardIndex]}
                other_info={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : expiredDYPPools[cardIndex]?.expired === "Yes"
                      ? true
                      : false
                    : false
                }
                fee_s={
                  expiredPools === false
                    ? activePools[cardIndex]?.performancefee
                    : expiredDYPPools[cardIndex]?.performancefee
                }
                fee_u={feeUarrayStakeAvaxiDyp[cardIndexavaxiDyp - 3]}
                lockTime={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                        ? "No Lock"
                        : activePools[cardIndex]?.lock_time?.split(" ")[0]
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                      ? "No Lock"
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                    : "No Lock"
                }
              />
            ) : (
              <></>
            )}
            <div className="top-picks-container" style={{ marginTop: "25px" }}>
              {expiredDYPPools.slice(9, 12).map((pool, index) => (
                <TopPoolsCard
                  expired={true}
                  display={
                    pool.expired
                      ? pool.expired === "Yes"
                        ? ""
                        : "none"
                      : "none"
                  }
                  key={index}
                  chain={chain}
                  top_pick={pool.top_pick}
                  tokenName={
                    pool.tokenName
                      ? pool.tokenName
                      : pool.pair_name
                      ? pool.pair_name
                      : ""
                  }
                  apr={pool.apy_percent + "%"}
                  tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                  lockTime={
                    pool.lockTime
                      ? pool.lockTime
                      : pool.lock_time
                      ? pool.lock_time
                      : locktimeFarm[index]
                  }
                  tokenLogo={
                    pool.icon
                      ? pool.icon
                      : pool.pair_name === "iDYP"
                      ? "idypius.svg"
                      : "dyplogo.svg"
                  }
                  onShowDetailsClick={() => {
                    setActiveCard(null);
                    setActiveCard2(null);
                    setActiveCard3(null);
                    setActiveCard4(topPools[index + 9]);
                    setActiveCard5(null);
                    setActiveCard6(null);
                    setActiveCardNFT(false);
                    handleCardIndexStake(index + 9);
                    handleCardIndexStake30(index + 9);
                    handleCardIndexStakeiDyp(index + 9);
                    setDetails(index + 9);
                  }}
                  onHideDetailsClick={() => {
                    setActiveCard4(null);
                    setDetails();
                  }}
                  cardType={topList}
                  details={details === index + 9 ? true : false}
                  isNewPool={pool.isNewPool}
                  isStaked={pool.isStaked}
                />
              ))}
            </div>
            {activeCard4 && topList === "Farming" ? (
              chain === "eth" ? (
                <StakingNew1
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  lp_id={lp_id[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                />
              ) : chain === "bnb" ? (
                <BscFarming
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultbsc}
                  lp_id={LP_IDBNB_Array[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                />
              ) : (
                <FarmAvax
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  the_graph_result={the_graph_resultavax}
                  lp_id={LP_IDAVAX_Array[cardIndex]}
                  chainId={chainId}
                  coinbase={coinbase}
                />
              )
            ) : activeCard4 &&
              topList === "Staking" &&
              cardIndex < 2 &&
              chain === "eth" ? (
              <StakeEth
                staking={stakeArrayStakeNew[cardIndex]}
                apr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_percent
                    : expiredDYPPools[cardIndex]?.apy_percent
                }
                liquidity={eth_address}
                expiration_time={"14 December 2022"}
                finalApr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_performancefee
                    : expiredDYPPools[cardIndex]?.apy_performancefee
                }
                fee={
                  expiredPools ? expiredPools[cardIndex - 1]?.performancefee : 0
                }
                lockTime={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                        ? "No Lock"
                        : activePools[cardIndex]?.lock_time?.split(" ")[0]
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                      ? "No Lock"
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                    : "No Lock"
                }
                lp_id={LP_IDBNB_Array[cardIndex]}
                listType={listType}
                other_info={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : expiredDYPPools[cardIndex]?.expired === "Yes"
                      ? true
                      : false
                    : false
                }
                fee={
                  expiredPools === false
                    ? activePools[cardIndex]?.performancefee
                    : expiredDYPPools[cardIndex]?.performancefee
                }
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_result}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                referrer={referrer}
              />
            ) : activeCard4 &&
              topList === "Staking" &&
              cardIndex < 2 &&
              chain === "bnb" ? (
              <StakeBsc2
                staking={
                  cardIndex === 2
                    ? stakearrayStakeBscExpired[cardIndex - 1]
                    : stakearrayStakeBscExpired[cardIndex]
                }
                apr={expiredDYPPools[cardIndex]?.apy_percent}
                liquidity={wbsc_address}
                expiration_time={
                  cardIndex === 2
                    ? expirearrayStakeBscExpired[cardIndex - 1]
                    : expirearrayStakeBscExpired[cardIndex]
                }
                finalApr={expiredDYPPools[cardIndex]?.apy_performancefee}
                fee={expiredDYPPools[cardIndex]?.performancefee}
                lockTime={
                  expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] === "No"
                    ? "No Lock"
                    : parseInt(
                        expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                      )
                }
                lp_id={LP_IDBNB_Array[cardIndex]}
                listType={listType}
                other_info={true}
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultbsc}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                referrer={referrer}
              />
            ) : activeCard4 &&
              cardIndex > 2 &&
              topList === "Staking" &&
              chain === "eth" ? (
              <InitConstantStakingiDYP
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_result}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                staking={stakeArrayiDYP[cardIndex - 2]}
                listType={listType}
                finalApr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_performancefee
                    : expiredDYPPools[cardIndex]?.apy_performancefee
                }
                apr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_percent
                    : expiredDYPPools[cardIndex]?.apy_percent
                }
                liquidity={eth_address}
                expiration_time={expirationArray[cardIndex - 2]}
                other_info={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : expiredDYPPools[cardIndex]?.expired === "Yes"
                      ? true
                      : false
                    : false
                }
                fee_s={
                  expiredPools === false
                    ? activePools[cardIndex]?.performancefee
                    : expiredDYPPools[cardIndex]?.performancefee
                }
                fee_u={withdrawFeeiDyp[cardIndex - 2]}
                lockTime={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                        ? "No Lock"
                        : activePools[cardIndex]?.lock_time?.split(" ")[0]
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                      ? "No Lock"
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                    : "No Lock"
                }
              />
            ) : activeCard4 &&
              cardIndex === 4 &&
              topList === "Staking" &&
              chain === "bnb" ? (
              <StakeBscDai
                staking={window.constant_stakingdaibsc}
                apr={expiredDYPPools[cardIndex]?.apy_percent}
                liquidity={wbsc_address}
                expiration_time={"Expired"}
                finalApr={expiredDYPPools[cardIndex]?.apy_performancefee}
                fee={expiredDYPPools[cardIndex]?.performancefee}
                lockTime={
                  expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] === "No"
                    ? "No Lock"
                    : parseInt(
                        expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                      )
                }
                listType={listType}
                other_info={true}
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultbsc}
                lp_id={LP_IDBNB_Array[cardIndex]}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                referrer={referrer}
              />
            ) : activeCard4 &&
              cardIndex >= 2 &&
              cardIndex < 4 &&
              topList === "Staking" &&
              chain === "bnb" ? (
              <StakeBsc2
                staking={
                  cardIndex === 2
                    ? stakearrayStakeBscExpired[cardIndex - 1]
                    : stakearrayStakeBscExpired[cardIndex]
                }
                apr={expiredDYPPools[cardIndex]?.apy_percent}
                liquidity={wbsc_address}
                expiration_time={
                  cardIndex === 2
                    ? expirearrayStakeBscExpired[cardIndex - 1]
                    : expirearrayStakeBscExpired[cardIndex]
                }
                finalApr={expiredDYPPools[cardIndex]?.apy_performancefee}
                fee={expiredDYPPools[cardIndex]?.performancefee}
                lockTime={
                  expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] === "No"
                    ? "No Lock"
                    : parseInt(
                        expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                      )
                }
                lp_id={LP_IDBNB_Array[cardIndex]}
                listType={listType}
                other_info={true}
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultbsc}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                referrer={referrer}
              />
            ) : activeCard4 &&
              (cardIndex === 5 || cardIndex > 5) &&
              topList === "Staking" &&
              chain === "bnb" ? (
              <StakeBscIDyp
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultbsc}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                staking={
                  expiredPools === false
                    ? stakearrayStakeBsciDyp2[cardIndex - 2]
                    : stakearrayStakeBsciDyp2Expired[cardIndex - 3]
                }
                listType={listType}
                finalApr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_performancefee
                    : expiredDYPPools[cardIndex]?.apy_performancefee
                }
                apr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_percent
                    : expiredDYPPools[cardIndex]?.apy_percent
                }
                liquidity={wbsc_address}
                expiration_time={
                  expiredPools === false
                    ? expirearrayStakeBsciDyp2[cardIndex - 2]
                    : expirearrayStakeBsciDyp2Expired[cardIndex - 3]
                }
                other_info={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : expiredDYPPools[cardIndex]?.expired === "Yes"
                      ? true
                      : false
                    : false
                }
                fee_s={
                  expiredPools === false
                    ? activePools[cardIndex]?.performancefee
                    : expiredDYPPools[cardIndex]?.performancefee
                }
                fee_u={0}
                lockTime={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                        ? "No Lock"
                        : parseInt(
                            activePools[cardIndex]?.lock_time?.split(" ")[0]
                          )
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                      ? "No Lock"
                      : parseInt(
                          expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                        )
                    : "No Lock"
                }
              />
            ) : activeCard4 &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex < 2 ? (
              <StakeAvax
                is_wallet_connected={isConnected}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                coinbase={coinbase}
                referrer={referrer}
              />
            ) : activeCard4 &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex >= 2 &&
              cardIndex < 4 ? (
              <StakeAvax30
                is_wallet_connected={isConnected}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                coinbase={coinbase}
                referrer={referrer}
              />
            ) : activeCard4 &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex === 4 ? (
              <StakeAvaxDai
                staking={window.constant_stakingdaiavax}
                apr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_percent
                    : expiredDYPPools[cardIndex]?.apy_percent
                }
                liquidity={avax_address}
                expiration_time={"Expired"}
                finalApr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_performancefee
                    : expiredDYPPools[cardIndex]?.apy_performancefee
                }
                fee={
                  expiredPools ? expiredPools[cardIndex - 1]?.performancefee : 0
                }
                lockTime={
                  cardIndex !== undefined
                    ? expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                      "No"
                      ? "No Lock"
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                    : "No Lock"
                }
                listType={listType}
                other_info={true}
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                referrer={referrer}
              />
            ) : activeCard4 &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex >= 5 ? (
              <StakeAvaxIDyp
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                staking={
                  expiredPools === false
                    ? stakingarrayStakeAvaxiDypActive[cardIndex - 2]
                    : stakingarrayStakeAvaxiDypExpired[cardIndex - 3]
                }
                listType={listType}
                finalApr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_performancefee
                    : expiredDYPPools[cardIndex]?.apy_performancefee
                }
                apr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_percent
                    : expiredDYPPools[cardIndex]?.apy_percent
                }
                liquidity={avax_address}
                expiration_time={expirearrayStakeAvaxiDyp[cardIndex]}
                other_info={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : expiredDYPPools[cardIndex]?.expired === "Yes"
                      ? true
                      : false
                    : false
                }
                fee_s={
                  expiredPools === false
                    ? activePools[cardIndex]?.performancefee
                    : expiredDYPPools[cardIndex]?.performancefee
                }
                fee_u={feeUarrayStakeAvaxiDyp[cardIndexavaxiDyp - 3]}
                lockTime={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                        ? "No Lock"
                        : activePools[cardIndex]?.lock_time?.split(" ")[0]
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                      ? "No Lock"
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                    : "No Lock"
                }
              />
            ) : (
              <></>
            )}
            <div
              className="top-picks-container"
              style={{ marginTop: expiredDYPPools.length > 12 && "25px" }}
            >
              {expiredDYPPools.slice(12, 15).map((pool, index) => (
                <TopPoolsCard
                  expired={true}
                  display={
                    pool.expired
                      ? pool.expired === "Yes"
                        ? ""
                        : "none"
                      : "none"
                  }
                  key={index}
                  chain={chain}
                  top_pick={pool.top_pick}
                  tokenName={
                    pool.tokenName
                      ? pool.tokenName
                      : pool.pair_name
                      ? pool.pair_name
                      : ""
                  }
                  apr={pool.apy_percent + "%"}
                  tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                  lockTime={
                    pool.lockTime
                      ? pool.lockTime
                      : pool.lock_time
                      ? pool.lock_time
                      : locktimeFarm[index]
                  }
                  tokenLogo={
                    pool.icon
                      ? pool.icon
                      : pool.pair_name === "iDYP"
                      ? "idypius.svg"
                      : "dyplogo.svg"
                  }
                  onShowDetailsClick={() => {
                    setActiveCard(null);
                    setActiveCard2(null);
                    setActiveCard3(null);
                    setActiveCard4(null);
                    setActiveCard5(topPools[index + 12]);
                    setActiveCard6(null);
                    setActiveCardNFT(false);
                    handleCardIndexStake(index + 12);
                    handleCardIndexStake30(index + 12);
                    handleCardIndexStakeiDyp(index + 12);
                    setDetails(index + 12);
                  }}
                  onHideDetailsClick={() => {
                    setActiveCard5(null);
                    setDetails();
                  }}
                  cardType={topList}
                  details={details === index + 12 ? true : false}
                  isNewPool={pool.isNewPool}
                  isStaked={pool.isStaked}
                />
              ))}
            </div>
            {activeCard5 && topList === "Farming" ? (
              chain === "eth" ? (
                <StakingNew1
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  lp_id={lp_id[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                />
              ) : chain === "bnb" ? (
                <BscFarming
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultbsc}
                  lp_id={LP_IDBNB_Array[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                />
              ) : (
                <FarmAvax
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  the_graph_result={the_graph_resultavax}
                  lp_id={LP_IDAVAX_Array[cardIndex]}
                  chainId={chainId}
                  coinbase={coinbase}
                />
              )
            ) : activeCard5 &&
              topList === "Staking" &&
              cardIndex < 2 &&
              chain === "eth" ? (
              <StakeEth
                staking={stakeArrayStakeNew[cardIndex]}
                apr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_percent
                    : expiredDYPPools[cardIndex]?.apy_percent
                }
                liquidity={eth_address}
                expiration_time={"14 December 2022"}
                finalApr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_performancefee
                    : expiredDYPPools[cardIndex]?.apy_performancefee
                }
                fee={
                  expiredPools ? expiredPools[cardIndex - 1]?.performancefee : 0
                }
                lockTime={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                        ? "No Lock"
                        : activePools[cardIndex]?.lock_time?.split(" ")[0]
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                      ? "No Lock"
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                    : "No Lock"
                }
                lp_id={LP_IDBNB_Array[cardIndex]}
                listType={listType}
                other_info={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : expiredDYPPools[cardIndex]?.expired === "Yes"
                      ? true
                      : false
                    : false
                }
                fee={
                  expiredPools === false
                    ? activePools[cardIndex]?.performancefee
                    : expiredDYPPools[cardIndex]?.performancefee
                }
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_result}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                referrer={referrer}
              />
            ) : activeCard5 &&
              topList === "Staking" &&
              cardIndex < 2 &&
              chain === "bnb" ? (
              <StakeBsc2
                staking={
                  cardIndex === 2
                    ? stakearrayStakeBscExpired[cardIndex - 1]
                    : stakearrayStakeBscExpired[cardIndex]
                }
                apr={expiredDYPPools[cardIndex]?.apy_percent}
                liquidity={wbsc_address}
                expiration_time={
                  cardIndex === 2
                    ? expirearrayStakeBscExpired[cardIndex - 1]
                    : expirearrayStakeBscExpired[cardIndex]
                }
                finalApr={expiredDYPPools[cardIndex]?.apy_performancefee}
                fee={expiredDYPPools[cardIndex]?.performancefee}
                lockTime={
                  expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] === "No"
                    ? "No Lock"
                    : parseInt(
                        expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                      )
                }
                lp_id={LP_IDBNB_Array[cardIndex]}
                listType={listType}
                other_info={true}
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultbsc}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                referrer={referrer}
              />
            ) : activeCard5 &&
              cardIndex > 2 &&
              topList === "Staking" &&
              chain === "eth" ? (
              <InitConstantStakingiDYP
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_result}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                staking={stakeArrayiDYP[cardIndex - 2]}
                listType={listType}
                finalApr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_performancefee
                    : expiredDYPPools[cardIndex]?.apy_performancefee
                }
                apr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_percent
                    : expiredDYPPools[cardIndex]?.apy_percent
                }
                liquidity={eth_address}
                expiration_time={expirationArray[cardIndex - 2]}
                other_info={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : expiredDYPPools[cardIndex]?.expired === "Yes"
                      ? true
                      : false
                    : false
                }
                fee_s={
                  expiredPools === false
                    ? activePools[cardIndex]?.performancefee
                    : expiredDYPPools[cardIndex]?.performancefee
                }
                fee_u={withdrawFeeiDyp[cardIndex - 2]}
                lockTime={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                        ? "No Lock"
                        : activePools[cardIndex]?.lock_time?.split(" ")[0]
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                      ? "No Lock"
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                    : "No Lock"
                }
              />
            ) : activeCard5 &&
              cardIndex === 4 &&
              topList === "Staking" &&
              chain === "bnb" ? (
              <StakeBscDai
                staking={window.constant_stakingdaibsc}
                apr={expiredDYPPools[cardIndex]?.apy_percent}
                liquidity={wbsc_address}
                expiration_time={"Expired"}
                finalApr={expiredDYPPools[cardIndex]?.apy_performancefee}
                fee={expiredDYPPools[cardIndex]?.performancefee}
                lockTime={
                  expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] === "No"
                    ? "No Lock"
                    : parseInt(
                        expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                      )
                }
                listType={listType}
                other_info={true}
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultbsc}
                lp_id={LP_IDBNB_Array[cardIndex]}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                referrer={referrer}
              />
            ) : activeCard5 &&
              cardIndex >= 2 &&
              cardIndex < 4 &&
              topList === "Staking" &&
              chain === "bnb" ? (
              <StakeBsc2
                staking={
                  cardIndex === 2
                    ? stakearrayStakeBscExpired[cardIndex - 1]
                    : stakearrayStakeBscExpired[cardIndex]
                }
                apr={expiredDYPPools[cardIndex]?.apy_percent}
                liquidity={wbsc_address}
                expiration_time={
                  cardIndex === 2
                    ? expirearrayStakeBscExpired[cardIndex - 1]
                    : expirearrayStakeBscExpired[cardIndex]
                }
                finalApr={expiredDYPPools[cardIndex]?.apy_performancefee}
                fee={expiredDYPPools[cardIndex]?.performancefee}
                lockTime={
                  expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] === "No"
                    ? "No Lock"
                    : parseInt(
                        expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                      )
                }
                lp_id={LP_IDBNB_Array[cardIndex]}
                listType={listType}
                other_info={true}
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultbsc}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                referrer={referrer}
              />
            ) : activeCard5 &&
              (cardIndex === 5 || cardIndex > 5) &&
              topList === "Staking" &&
              chain === "bnb" ? (
              <StakeBscIDyp
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultbsc}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                staking={
                  expiredPools === false
                    ? stakearrayStakeBsciDyp2[cardIndex - 2]
                    : stakearrayStakeBsciDyp2Expired[cardIndex - 3]
                }
                listType={listType}
                finalApr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_performancefee
                    : expiredDYPPools[cardIndex]?.apy_performancefee
                }
                apr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_percent
                    : expiredDYPPools[cardIndex]?.apy_percent
                }
                liquidity={wbsc_address}
                expiration_time={
                  expiredPools === false
                    ? expirearrayStakeBsciDyp2[cardIndex - 2]
                    : expirearrayStakeBsciDyp2Expired[cardIndex - 3]
                }
                other_info={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : expiredDYPPools[cardIndex]?.expired === "Yes"
                      ? true
                      : false
                    : false
                }
                fee_s={
                  expiredPools === false
                    ? activePools[cardIndex]?.performancefee
                    : expiredDYPPools[cardIndex]?.performancefee
                }
                fee_u={0}
                lockTime={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                        ? "No Lock"
                        : parseInt(
                            activePools[cardIndex]?.lock_time?.split(" ")[0]
                          )
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                      ? "No Lock"
                      : parseInt(
                          expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                        )
                    : "No Lock"
                }
              />
            ) : activeCard5 &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex < 2 ? (
              <StakeAvax
                is_wallet_connected={isConnected}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                coinbase={coinbase}
                referrer={referrer}
              />
            ) : activeCard5 &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex >= 2 &&
              cardIndex < 4 ? (
              <StakeAvax30
                is_wallet_connected={isConnected}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                coinbase={coinbase}
                referrer={referrer}
              />
            ) : activeCard5 &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex === 4 ? (
              <StakeAvaxDai
                staking={window.constant_stakingdaiavax}
                apr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_percent
                    : expiredDYPPools[cardIndex]?.apy_percent
                }
                liquidity={avax_address}
                expiration_time={"Expired"}
                finalApr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_performancefee
                    : expiredDYPPools[cardIndex]?.apy_performancefee
                }
                fee={
                  expiredPools ? expiredPools[cardIndex - 1]?.performancefee : 0
                }
                lockTime={
                  cardIndex !== undefined
                    ? expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                      "No"
                      ? "No Lock"
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                    : "No Lock"
                }
                listType={listType}
                other_info={true}
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                referrer={referrer}
              />
            ) : activeCard5 &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex >= 5 ? (
              <StakeAvaxIDyp
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                staking={
                  expiredPools === false
                    ? stakingarrayStakeAvaxiDypActive[cardIndex - 2]
                    : stakingarrayStakeAvaxiDypExpired[cardIndex - 3]
                }
                listType={listType}
                finalApr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_performancefee
                    : expiredDYPPools[cardIndex]?.apy_performancefee
                }
                apr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_percent
                    : expiredDYPPools[cardIndex]?.apy_percent
                }
                liquidity={avax_address}
                expiration_time={expirearrayStakeAvaxiDyp[cardIndex]}
                other_info={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : expiredDYPPools[cardIndex]?.expired === "Yes"
                      ? true
                      : false
                    : false
                }
                fee_s={
                  expiredPools === false
                    ? activePools[cardIndex]?.performancefee
                    : expiredDYPPools[cardIndex]?.performancefee
                }
                fee_u={feeUarrayStakeAvaxiDyp[cardIndexavaxiDyp - 3]}
                lockTime={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                        ? "No Lock"
                        : activePools[cardIndex]?.lock_time?.split(" ")[0]
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                      ? "No Lock"
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                    : "No Lock"
                }
              />
            ) : (
              <></>
            )}
            <div
              className="top-picks-container"
              style={{ marginTop: expiredDYPPools.length > 15 && "25px" }}
            >
              {expiredDYPPools
                .slice(15, expiredDYPPools.length)
                .map((pool, index) => (
                  <TopPoolsCard
                    expired={true}
                    display={
                      pool.expired
                        ? pool.expired === "Yes"
                          ? ""
                          : "none"
                        : "none"
                    }
                    key={index}
                    chain={chain}
                    top_pick={pool.top_pick}
                    tokenName={
                      pool.tokenName
                        ? pool.tokenName
                        : pool.pair_name
                        ? pool.pair_name
                        : ""
                    }
                    apr={pool.apy_percent + "%"}
                    tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                    lockTime={
                      pool.lockTime
                        ? pool.lockTime
                        : pool.lock_time
                        ? pool.lock_time
                        : locktimeFarm[index]
                    }
                    tokenLogo={
                      pool.icon
                        ? pool.icon
                        : pool.pair_name === "iDYP"
                        ? "idypius.svg"
                        : "dyplogo.svg"
                    }
                    onShowDetailsClick={() => {
                      setActiveCard(null);
                      setActiveCard2(null);
                      setActiveCard3(null);
                      setActiveCard4(null);
                      setActiveCard5(null);
                      setActiveCard6(topPools[index + 15]);
                      setActiveCardNFT(false);
                      handleCardIndexStake(index + 15);
                      handleCardIndexStake30(index + 15);
                      handleCardIndexStakeiDyp(index + 15);
                      setDetails(index + 15);
                    }}
                    onHideDetailsClick={() => {
                      setActiveCard6(null);
                      setDetails();
                    }}
                    cardType={topList}
                    details={details === index + 15 ? true : false}
                    isNewPool={pool.isNewPool}
                    isStaked={pool.isStaked}
                  />
                ))}
            </div>
            {activeCard6 && topList === "Farming" ? (
              chain === "eth" ? (
                <StakingNew1
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  lp_id={lp_id[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                />
              ) : chain === "bnb" ? (
                <BscFarming
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultbsc}
                  lp_id={LP_IDBNB_Array[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                />
              ) : (
                <FarmAvax
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  the_graph_result={the_graph_resultavax}
                  lp_id={LP_IDAVAX_Array[cardIndex]}
                  chainId={chainId}
                  coinbase={coinbase}
                />
              )
            ) : activeCard6 &&
              topList === "Staking" &&
              cardIndex < 2 &&
              chain === "eth" ? (
              <StakeEth
                staking={stakeArrayStakeNew[cardIndex]}
                apr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_percent
                    : expiredDYPPools[cardIndex]?.apy_percent
                }
                liquidity={eth_address}
                expiration_time={"14 December 2022"}
                finalApr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_performancefee
                    : expiredDYPPools[cardIndex]?.apy_performancefee
                }
                fee={
                  expiredPools ? expiredPools[cardIndex - 1]?.performancefee : 0
                }
                lockTime={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                        ? "No Lock"
                        : activePools[cardIndex]?.lock_time?.split(" ")[0]
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                      ? "No Lock"
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                    : "No Lock"
                }
                lp_id={LP_IDBNB_Array[cardIndex]}
                listType={listType}
                other_info={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : expiredDYPPools[cardIndex]?.expired === "Yes"
                      ? true
                      : false
                    : false
                }
                fee={
                  expiredPools === false
                    ? activePools[cardIndex]?.performancefee
                    : expiredDYPPools[cardIndex]?.performancefee
                }
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_result}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                referrer={referrer}
              />
            ) : activeCard6 &&
              topList === "Staking" &&
              cardIndex < 2 &&
              chain === "bnb" ? (
              <StakeBsc2
                staking={
                  cardIndex === 2
                    ? stakearrayStakeBscExpired[cardIndex - 1]
                    : stakearrayStakeBscExpired[cardIndex]
                }
                apr={expiredDYPPools[cardIndex]?.apy_percent}
                liquidity={wbsc_address}
                expiration_time={
                  cardIndex === 2
                    ? expirearrayStakeBscExpired[cardIndex - 1]
                    : expirearrayStakeBscExpired[cardIndex]
                }
                finalApr={expiredDYPPools[cardIndex]?.apy_performancefee}
                fee={expiredDYPPools[cardIndex]?.performancefee}
                lockTime={
                  expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] === "No"
                    ? "No Lock"
                    : parseInt(
                        expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                      )
                }
                lp_id={LP_IDBNB_Array[cardIndex]}
                listType={listType}
                other_info={true}
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultbsc}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                referrer={referrer}
              />
            ) : activeCard6 &&
              cardIndex > 2 &&
              topList === "Staking" &&
              chain === "eth" ? (
              <InitConstantStakingiDYP
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_result}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                staking={stakeArrayiDYP[cardIndex - 2]}
                listType={listType}
                finalApr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_performancefee
                    : expiredDYPPools[cardIndex]?.apy_performancefee
                }
                apr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_percent
                    : expiredDYPPools[cardIndex]?.apy_percent
                }
                liquidity={eth_address}
                expiration_time={expirationArray[cardIndex - 2]}
                other_info={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : expiredDYPPools[cardIndex]?.expired === "Yes"
                      ? true
                      : false
                    : false
                }
                fee_s={
                  expiredPools === false
                    ? activePools[cardIndex]?.performancefee
                    : expiredDYPPools[cardIndex]?.performancefee
                }
                fee_u={withdrawFeeiDyp[cardIndex - 2]}
                lockTime={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                        ? "No Lock"
                        : activePools[cardIndex]?.lock_time?.split(" ")[0]
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                      ? "No Lock"
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                    : "No Lock"
                }
              />
            ) : activeCard6 &&
              cardIndex === 4 &&
              topList === "Staking" &&
              chain === "bnb" ? (
              <StakeBscDai
                staking={window.constant_stakingdaibsc}
                apr={expiredDYPPools[cardIndex]?.apy_percent}
                liquidity={wbsc_address}
                expiration_time={"Expired"}
                finalApr={expiredDYPPools[cardIndex]?.apy_performancefee}
                fee={expiredDYPPools[cardIndex]?.performancefee}
                lockTime={
                  expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] === "No"
                    ? "No Lock"
                    : parseInt(
                        expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                      )
                }
                listType={listType}
                other_info={true}
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultbsc}
                lp_id={LP_IDBNB_Array[cardIndex]}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                referrer={referrer}
              />
            ) : activeCard2 &&
              cardIndex >= 2 &&
              cardIndex < 4 &&
              topList === "Staking" &&
              chain === "bnb" ? (
              <StakeBsc2
                staking={
                  cardIndex === 2
                    ? stakearrayStakeBscExpired[cardIndex - 1]
                    : stakearrayStakeBscExpired[cardIndex]
                }
                apr={expiredDYPPools[cardIndex]?.apy_percent}
                liquidity={wbsc_address}
                expiration_time={
                  cardIndex === 2
                    ? expirearrayStakeBscExpired[cardIndex - 1]
                    : expirearrayStakeBscExpired[cardIndex]
                }
                finalApr={expiredDYPPools[cardIndex]?.apy_performancefee}
                fee={expiredDYPPools[cardIndex]?.performancefee}
                lockTime={
                  expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] === "No"
                    ? "No Lock"
                    : parseInt(
                        expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                      )
                }
                lp_id={LP_IDBNB_Array[cardIndex]}
                listType={listType}
                other_info={true}
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultbsc}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                referrer={referrer}
              />
            ) : activeCard6 &&
              (cardIndex === 5 || cardIndex > 5) &&
              topList === "Staking" &&
              chain === "bnb" ? (
              <StakeBscIDyp
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultbsc}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                staking={
                  expiredPools === false
                    ? stakearrayStakeBsciDyp2[cardIndex - 2]
                    : stakearrayStakeBsciDyp2Expired[cardIndex - 3]
                }
                listType={listType}
                finalApr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_performancefee
                    : expiredDYPPools[cardIndex]?.apy_performancefee
                }
                apr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_percent
                    : expiredDYPPools[cardIndex]?.apy_percent
                }
                liquidity={wbsc_address}
                expiration_time={
                  expiredPools === false
                    ? expirearrayStakeBsciDyp2[cardIndex - 2]
                    : expirearrayStakeBsciDyp2Expired[cardIndex - 3]
                }
                other_info={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : expiredDYPPools[cardIndex]?.expired === "Yes"
                      ? true
                      : false
                    : false
                }
                fee_s={
                  expiredPools === false
                    ? activePools[cardIndex]?.performancefee
                    : expiredDYPPools[cardIndex]?.performancefee
                }
                fee_u={0}
                lockTime={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                        ? "No Lock"
                        : parseInt(
                            activePools[cardIndex]?.lock_time?.split(" ")[0]
                          )
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                      ? "No Lock"
                      : parseInt(
                          expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                        )
                    : "No Lock"
                }
              />
            ) : activeCard6 &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex < 2 ? (
              <StakeAvax
                is_wallet_connected={isConnected}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                coinbase={coinbase}
                referrer={referrer}
              />
            ) : activeCard6 &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex >= 2 &&
              cardIndex < 4 ? (
              <StakeAvax30
                is_wallet_connected={isConnected}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                coinbase={coinbase}
                referrer={referrer}
              />
            ) : activeCard6 &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex === 4 ? (
              <StakeAvaxDai
                staking={window.constant_stakingdaiavax}
                apr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_percent
                    : expiredDYPPools[cardIndex]?.apy_percent
                }
                liquidity={avax_address}
                expiration_time={"Expired"}
                finalApr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_performancefee
                    : expiredDYPPools[cardIndex]?.apy_performancefee
                }
                fee={
                  expiredPools ? expiredPools[cardIndex - 1]?.performancefee : 0
                }
                lockTime={
                  cardIndex !== undefined
                    ? expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                      "No"
                      ? "No Lock"
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                    : "No Lock"
                }
                listType={listType}
                other_info={true}
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                referrer={referrer}
              />
            ) : activeCard6 &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex >= 5 ? (
              <StakeAvaxIDyp
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                handleConnection={handleConnection}
                handleSwitchNetwork={handleSwitchNetwork}
                expired={true}
                staking={
                  expiredPools === false
                    ? stakingarrayStakeAvaxiDypActive[cardIndex - 2]
                    : stakingarrayStakeAvaxiDypExpired[cardIndex - 3]
                }
                listType={listType}
                finalApr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_performancefee
                    : expiredDYPPools[cardIndex]?.apy_performancefee
                }
                apr={
                  expiredPools === false
                    ? activePools[cardIndex]?.apy_percent
                    : expiredDYPPools[cardIndex]?.apy_percent
                }
                liquidity={avax_address}
                expiration_time={expirearrayStakeAvaxiDyp[cardIndex]}
                other_info={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : expiredDYPPools[cardIndex]?.expired === "Yes"
                      ? true
                      : false
                    : false
                }
                fee_s={
                  expiredPools === false
                    ? activePools[cardIndex]?.performancefee
                    : expiredDYPPools[cardIndex]?.performancefee
                }
                fee_u={feeUarrayStakeAvaxiDyp[cardIndexavaxiDyp - 3]}
                lockTime={
                  cardIndex !== undefined
                    ? expiredPools === false
                      ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                        ? "No Lock"
                        : activePools[cardIndex]?.lock_time?.split(" ")[0]
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                      ? "No Lock"
                      : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                    : "No Lock"
                }
              />
            ) : (
              <></>
            )}
          </div>
        ) : (
          <div className="px-0">
            <>
              <div className="top-picks-container">
                {expiredDYPPools.slice(0, 1).map((pool, index) => (
                  <TopPoolsCard
                    expired={true}
                    display={
                      pool.expired
                        ? pool.expired === "Yes"
                          ? ""
                          : "none"
                        : "none"
                    }
                    key={index}
                    chain={chain}
                    top_pick={pool.top_pick}
                    tokenName={
                      pool.tokenName
                        ? pool.tokenName
                        : pool.pair_name
                        ? pool.pair_name
                        : ""
                    }
                    apr={pool.apy_percent + "%"}
                    tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                    lockTime={
                      pool.lockTime
                        ? pool.lockTime
                        : pool.lock_time
                        ? pool.lock_time
                        : locktimeFarm[index]
                    }
                    tokenLogo={
                      pool.icon
                        ? pool.icon
                        : pool.pair_name === "iDYP"
                        ? "idypius.svg"
                        : "dyplogo.svg"
                    }
                    onShowDetailsClick={() => {
                      setActiveCard(topPools[index]);
                      setActiveCard2(null);
                      setActiveCard3(null);
                      setActiveCard4(null);
                      setActiveCard5(null);
                      setActiveCard6(null);
                      setActiveCard7(null);
                      setActiveCard8(null);
                      setActiveCard9(null);
                      setActiveCard10(null);
                      setActiveCard11(null);
                      setActiveCard12(null);
                      setActiveCardNFT(false);
                      handleCardIndexStake(index);
                      handleCardIndexStake30(index);
                      handleCardIndexStakeiDyp(index);
                      setDetails(index);
                    }}
                    onHideDetailsClick={() => {
                      setActiveCard(null);
                      setDetails();
                    }}
                    cardType={topList}
                    details={details === index ? true : false}
                    isNewPool={pool.isNewPool}
                    isStaked={pool.isStaked}
                  />
                ))}
              </div>

              {activeCard && topList === "Farming" ? (
                chain === "eth" ? (
                  <StakingNew1
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_result}
                    lp_id={lp_id[cardIndex]}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={true}
                  />
                ) : chain === "bnb" ? (
                  <BscFarming
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_resultbsc}
                    lp_id={LP_IDBNB_Array[cardIndex]}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={true}
                  />
                ) : (
                  <FarmAvax
                    is_wallet_connected={isConnected}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={true}
                    the_graph_result={the_graph_resultavax}
                    lp_id={LP_IDAVAX_Array[cardIndex]}
                    chainId={chainId}
                    coinbase={coinbase}
                  />
                )
              ) : activeCard &&
                topList === "Staking" &&
                cardIndex < 2 &&
                chain === "eth" ? (
                <StakeEth
                  staking={stakeArrayStakeNew[cardIndex]}
                  apr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_percent
                      : expiredDYPPools[cardIndex]?.apy_percent
                  }
                  liquidity={eth_address}
                  expiration_time={"14 December 2022"}
                  finalApr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_performancefee
                      : expiredDYPPools[cardIndex]?.apy_performancefee
                  }
                  fee={
                    expiredPools
                      ? expiredPools[cardIndex - 1]?.performancefee
                      : 0
                  }
                  lockTime={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                          "No"
                          ? "No Lock"
                          : activePools[cardIndex]?.lock_time?.split(" ")[0]
                        : expiredDYPPools[cardIndex]?.lock_time?.split(
                            " "
                          )[0] === "No"
                        ? "No Lock"
                        : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                      : "No Lock"
                  }
                  lp_id={LP_IDBNB_Array[cardIndex]}
                  listType={listType}
                  other_info={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : expiredDYPPools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : false
                  }
                  fee={
                    expiredPools === false
                      ? activePools[cardIndex]?.performancefee
                      : expiredDYPPools[cardIndex]?.performancefee
                  }
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  referrer={referrer}
                />
              ) : activeCard &&
                (cardIndex === 0 || cardIndex === 2) &&
                topList === "Staking" &&
                chain === "bnb" ? (
                <StakeBsc2
                  staking={
                    cardIndex === 2
                      ? stakearrayStakeBscExpired[cardIndex - 1]
                      : stakearrayStakeBscExpired[cardIndex]
                  }
                  apr={expiredDYPPools[cardIndex]?.apy_percent}
                  liquidity={wbsc_address}
                  expiration_time={
                    cardIndex === 2
                      ? expirearrayStakeBscExpired[cardIndex - 1]
                      : expirearrayStakeBscExpired[cardIndex]
                  }
                  finalApr={expiredDYPPools[cardIndex]?.apy_performancefee}
                  fee={expiredDYPPools[cardIndex]?.performancefee}
                  lockTime={
                    expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                    "No"
                      ? "No Lock"
                      : parseInt(
                          expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                        )
                  }
                  lp_id={LP_IDBNB_Array[cardIndex]}
                  listType={listType}
                  other_info={true}
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultbsc}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  referrer={referrer}
                />
              ) : activeCard &&
                cardIndex === 1 &&
                topList === "Staking" &&
                chain === "bnb" ? (
                <StakeBscDai
                  staking={window.constant_stakingdaibsc}
                  apr={expiredDYPPools[cardIndex]?.apy_percent}
                  liquidity={wbsc_address}
                  expiration_time={"Expired"}
                  finalApr={expiredDYPPools[cardIndex]?.apy_performancefee}
                  fee={expiredDYPPools[cardIndex]?.performancefee}
                  lockTime={
                    expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                    "No"
                      ? "No Lock"
                      : parseInt(
                          expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                        )
                  }
                  listType={listType}
                  other_info={true}
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultbsc}
                  lp_id={LP_IDBNB_Array[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  referrer={referrer}
                />
              ) : activeCard &&
                cardIndex >= 3 &&
                topList === "Staking" &&
                chain === "bnb" ? (
                <StakeBscIDyp
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultbsc}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  staking={
                    expiredPools === false
                      ? stakearrayStakeBsciDyp2[cardIndex - 2]
                      : stakearrayStakeBsciDyp2Expired[cardIndex - 3]
                  }
                  listType={listType}
                  finalApr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_performancefee
                      : expiredDYPPools[cardIndex]?.apy_performancefee
                  }
                  apr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_percent
                      : expiredDYPPools[cardIndex]?.apy_percent
                  }
                  liquidity={wbsc_address}
                  expiration_time={
                    expiredPools === false
                      ? expirearrayStakeBsciDyp2[cardIndex - 2]
                      : expirearrayStakeBsciDyp2Expired[cardIndex - 3]
                  }
                  other_info={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : expiredDYPPools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : false
                  }
                  fee_s={
                    expiredPools === false
                      ? activePools[cardIndex]?.performancefee
                      : expiredDYPPools[cardIndex]?.performancefee
                  }
                  fee_u={0}
                  lockTime={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                          "No"
                          ? "No Lock"
                          : parseInt(
                              activePools[cardIndex]?.lock_time?.split(" ")[0]
                            )
                        : expiredDYPPools[cardIndex]?.lock_time?.split(
                            " "
                          )[0] === "No"
                        ? "No Lock"
                        : parseInt(
                            expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                          )
                      : "No Lock"
                  }
                />
              ) : activeCard &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex < 2 ? (
                <StakeAvax30
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  coinbase={coinbase}
                  referrer={referrer}
                />
              ) : (
                <></>
              )}
            </>
            <>
              <div
                className="top-picks-container"
                style={{ marginTop: "25px" }}
              >
                {expiredDYPPools.slice(1, 2).map((pool, index) => (
                  <TopPoolsCard
                    expired={true}
                    display={
                      pool.expired
                        ? pool.expired === "Yes"
                          ? ""
                          : "none"
                        : "none"
                    }
                    key={index}
                    chain={chain}
                    top_pick={pool.top_pick}
                    tokenName={
                      pool.tokenName
                        ? pool.tokenName
                        : pool.pair_name
                        ? pool.pair_name
                        : ""
                    }
                    apr={pool.apy_percent + "%"}
                    tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                    lockTime={
                      pool.lockTime
                        ? pool.lockTime
                        : pool.lock_time
                        ? pool.lock_time
                        : locktimeFarm[index]
                    }
                    tokenLogo={
                      pool.icon
                        ? pool.icon
                        : pool.pair_name === "iDYP"
                        ? "idypius.svg"
                        : "dyplogo.svg"
                    }
                    onShowDetailsClick={() => {
                      setActiveCard(null);
                      setActiveCard2(topPools[index + 1]);
                      setActiveCard3(null);
                      setActiveCard4(null);
                      setActiveCard5(null);
                      setActiveCard6(null);
                      setActiveCard7(null);
                      setActiveCard8(null);
                      setActiveCard9(null);
                      setActiveCard10(null);
                      setActiveCard11(null);
                      setActiveCard12(null);
                      setActiveCardNFT(false);
                      handleCardIndexStake(index + 1);
                      handleCardIndexStake30(index + 1);
                      handleCardIndexStakeiDyp(index + 1);
                      setDetails(index + 1);
                    }}
                    onHideDetailsClick={() => {
                      setActiveCard2(null);
                      setDetails();
                    }}
                    cardType={topList}
                    details={details === index + 1 ? true : false}
                    isNewPool={pool.isNewPool}
                    isStaked={pool.isStaked}
                  />
                ))}
              </div>
              {activeCard2 && topList === "Farming" ? (
                chain === "eth" ? (
                  <StakingNew1
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_result}
                    lp_id={lp_id[cardIndex]}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={true}
                  />
                ) : chain === "bnb" ? (
                  <BscFarming
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_resultbsc}
                    lp_id={LP_IDBNB_Array[cardIndex]}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={true}
                  />
                ) : (
                  <FarmAvax
                    is_wallet_connected={isConnected}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={true}
                    the_graph_result={the_graph_resultavax}
                    lp_id={LP_IDAVAX_Array[cardIndex]}
                    chainId={chainId}
                    coinbase={coinbase}
                  />
                )
              ) : activeCard2 &&
                topList === "Staking" &&
                cardIndex < 2 &&
                chain === "eth" ? (
                <StakeEth
                  staking={stakeArrayStakeNew[cardIndex]}
                  apr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_percent
                      : expiredDYPPools[cardIndex]?.apy_percent
                  }
                  liquidity={eth_address}
                  expiration_time={"14 December 2022"}
                  finalApr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_performancefee
                      : expiredDYPPools[cardIndex]?.apy_performancefee
                  }
                  fee={
                    expiredPools
                      ? expiredPools[cardIndex - 1]?.performancefee
                      : 0
                  }
                  lockTime={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                          "No"
                          ? "No Lock"
                          : activePools[cardIndex]?.lock_time?.split(" ")[0]
                        : expiredDYPPools[cardIndex]?.lock_time?.split(
                            " "
                          )[0] === "No"
                        ? "No Lock"
                        : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                      : "No Lock"
                  }
                  lp_id={LP_IDBNB_Array[cardIndex]}
                  listType={listType}
                  other_info={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : expiredDYPPools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : false
                  }
                  fee={
                    expiredPools === false
                      ? activePools[cardIndex]?.performancefee
                      : expiredDYPPools[cardIndex]?.performancefee
                  }
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  referrer={referrer}
                />
              ) : activeCard2 &&
                topList === "Staking" &&
                (cardIndex === 0 || cardIndex === 2) &&
                topList === "Staking" &&
                chain === "bnb" ? (
                <StakeBsc2
                  staking={
                    cardIndex === 2
                      ? stakearrayStakeBscExpired[cardIndex - 1]
                      : stakearrayStakeBscExpired[cardIndex]
                  }
                  apr={expiredDYPPools[cardIndex]?.apy_percent}
                  liquidity={wbsc_address}
                  expiration_time={
                    cardIndex === 2
                      ? expirearrayStakeBscExpired[cardIndex - 1]
                      : expirearrayStakeBscExpired[cardIndex]
                  }
                  finalApr={expiredDYPPools[cardIndex]?.apy_performancefee}
                  fee={expiredDYPPools[cardIndex]?.performancefee}
                  lockTime={
                    expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                    "No"
                      ? "No Lock"
                      : parseInt(
                          expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                        )
                  }
                  lp_id={LP_IDBNB_Array[cardIndex]}
                  listType={listType}
                  other_info={true}
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultbsc}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  referrer={referrer}
                />
              ) : activeCard2 &&
                cardIndex >= 3 &&
                topList === "Staking" &&
                chain === "eth" ? (
                <ConstantStakingiDYP1
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  lp_id={lp_id[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                />
              ) : activeCard2 &&
                cardIndex === 1 &&
                topList === "Staking" &&
                chain === "bnb" ? (
                <StakeBscDai
                  staking={window.constant_stakingdaibsc}
                  apr={expiredDYPPools[cardIndex]?.apy_percent}
                  liquidity={wbsc_address}
                  expiration_time={"Expired"}
                  finalApr={expiredDYPPools[cardIndex]?.apy_performancefee}
                  fee={expiredDYPPools[cardIndex]?.performancefee}
                  lockTime={
                    expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                    "No"
                      ? "No Lock"
                      : parseInt(
                          expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                        )
                  }
                  listType={listType}
                  other_info={true}
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultbsc}
                  lp_id={LP_IDBNB_Array[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  referrer={referrer}
                />
              ) : activeCard2 &&
                cardIndex >= 3 &&
                topList === "Staking" &&
                chain === "bnb" ? (
                <StakeBscIDyp
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultbsc}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  staking={
                    expiredPools === false
                      ? stakearrayStakeBsciDyp2[cardIndex - 2]
                      : stakearrayStakeBsciDyp2Expired[cardIndex - 3]
                  }
                  listType={listType}
                  finalApr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_performancefee
                      : expiredDYPPools[cardIndex]?.apy_performancefee
                  }
                  apr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_percent
                      : expiredDYPPools[cardIndex]?.apy_percent
                  }
                  liquidity={wbsc_address}
                  expiration_time={
                    expiredPools === false
                      ? expirearrayStakeBsciDyp2[cardIndex - 2]
                      : expirearrayStakeBsciDyp2Expired[cardIndex - 3]
                  }
                  other_info={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : expiredDYPPools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : false
                  }
                  fee_s={
                    expiredPools === false
                      ? activePools[cardIndex]?.performancefee
                      : expiredDYPPools[cardIndex]?.performancefee
                  }
                  fee_u={0}
                  lockTime={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                          "No"
                          ? "No Lock"
                          : parseInt(
                              activePools[cardIndex]?.lock_time?.split(" ")[0]
                            )
                        : expiredDYPPools[cardIndex]?.lock_time?.split(
                            " "
                          )[0] === "No"
                        ? "No Lock"
                        : parseInt(
                            expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                          )
                      : "No Lock"
                  }
                />
              ) : activeCard2 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex === 1 ? (
                <StakeAvaxDai
                  staking={window.constant_stakingdaiavax}
                  apr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_percent
                      : expiredDYPPools[cardIndex]?.apy_percent
                  }
                  liquidity={avax_address}
                  expiration_time={"Expired"}
                  finalApr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_performancefee
                      : expiredDYPPools[cardIndex]?.apy_performancefee
                  }
                  fee={
                    expiredPools
                      ? expiredPools[cardIndex - 1]?.performancefee
                      : 0
                  }
                  lockTime={
                    cardIndex !== undefined
                      ? expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                        ? "No Lock"
                        : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                      : "No Lock"
                  }
                  listType={listType}
                  other_info={true}
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  referrer={referrer}
                />
              ) : (
                <></>
              )}
            </>
            <>
              <div
                className="top-picks-container"
                style={{ marginTop: "25px" }}
              >
                {expiredDYPPools.slice(2, 3).map((pool, index) => (
                  <TopPoolsCard
                    expired={true}
                    display={
                      pool.expired
                        ? pool.expired === "Yes"
                          ? ""
                          : "none"
                        : "none"
                    }
                    key={index}
                    chain={chain}
                    top_pick={pool.top_pick}
                    tokenName={
                      pool.tokenName
                        ? pool.tokenName
                        : pool.pair_name
                        ? pool.pair_name
                        : ""
                    }
                    apr={pool.apy_percent + "%"}
                    tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                    lockTime={
                      pool.lockTime
                        ? pool.lockTime
                        : pool.lock_time
                        ? pool.lock_time
                        : locktimeFarm[index]
                    }
                    tokenLogo={
                      pool.icon
                        ? pool.icon
                        : pool.pair_name === "iDYP"
                        ? "idypius.svg"
                        : "dyplogo.svg"
                    }
                    onShowDetailsClick={() => {
                      setActiveCard(null);
                      setActiveCard2(null);
                      setActiveCard3(topPools[index + 2]);
                      setActiveCard4(null);
                      setActiveCard5(null);
                      setActiveCard6(null);
                      setActiveCard7(null);
                      setActiveCard8(null);
                      setActiveCard9(null);
                      setActiveCard10(null);
                      setActiveCard11(null);
                      setActiveCard12(null);
                      setActiveCardNFT(false);
                      handleCardIndexStake(index + 2);
                      handleCardIndexStake30(index + 2);
                      handleCardIndexStakeiDyp(index + 2);
                      setDetails(index + 2);
                    }}
                    onHideDetailsClick={() => {
                      setActiveCard3(null);
                      setDetails();
                    }}
                    cardType={topList}
                    details={details === index + 2 ? true : false}
                    isNewPool={pool.isNewPool}
                    isStaked={pool.isStaked}
                  />
                ))}
              </div>
              {activeCard3 && topList === "Farming" ? (
                chain === "eth" ? (
                  <StakingNew1
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_result}
                    lp_id={lp_id[cardIndex]}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={true}
                  />
                ) : chain === "bnb" ? (
                  <BscFarming
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_resultbsc}
                    lp_id={LP_IDBNB_Array[cardIndex]}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={true}
                  />
                ) : (
                  <FarmAvax
                    is_wallet_connected={isConnected}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={true}
                    the_graph_result={the_graph_resultavax}
                    lp_id={LP_IDAVAX_Array[cardIndex]}
                    chainId={chainId}
                    coinbase={coinbase}
                  />
                )
              ) : activeCard3 &&
                topList === "Staking" &&
                cardIndex < 2 &&
                chain === "eth" ? (
                <StakeEth
                  staking={stakeArrayStakeNew[cardIndex]}
                  apr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_percent
                      : expiredDYPPools[cardIndex]?.apy_percent
                  }
                  liquidity={eth_address}
                  expiration_time={"14 December 2022"}
                  finalApr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_performancefee
                      : expiredDYPPools[cardIndex]?.apy_performancefee
                  }
                  fee={
                    expiredPools
                      ? expiredPools[cardIndex - 1]?.performancefee
                      : 0
                  }
                  lockTime={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                          "No"
                          ? "No Lock"
                          : activePools[cardIndex]?.lock_time?.split(" ")[0]
                        : expiredDYPPools[cardIndex]?.lock_time?.split(
                            " "
                          )[0] === "No"
                        ? "No Lock"
                        : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                      : "No Lock"
                  }
                  lp_id={LP_IDBNB_Array[cardIndex]}
                  listType={listType}
                  other_info={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : expiredDYPPools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : false
                  }
                  fee={
                    expiredPools === false
                      ? activePools[cardIndex]?.performancefee
                      : expiredDYPPools[cardIndex]?.performancefee
                  }
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  referrer={referrer}
                />
              ) : activeCard3 &&
                cardIndex >= 2 &&
                topList === "Staking" &&
                chain === "eth" ? (
                <ConstantStakingiDYP1
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  lp_id={lp_id[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                />
              ) : activeCard3 &&
                (cardIndex === 0 || cardIndex === 2) &&
                topList === "Staking" &&
                chain === "bnb" ? (
                <StakeBsc2
                  staking={
                    cardIndex === 2
                      ? stakearrayStakeBscExpired[cardIndex - 1]
                      : stakearrayStakeBscExpired[cardIndex]
                  }
                  apr={expiredDYPPools[cardIndex]?.apy_percent}
                  liquidity={wbsc_address}
                  expiration_time={
                    cardIndex === 2
                      ? expirearrayStakeBscExpired[cardIndex - 1]
                      : expirearrayStakeBscExpired[cardIndex]
                  }
                  finalApr={expiredDYPPools[cardIndex]?.apy_performancefee}
                  fee={expiredDYPPools[cardIndex]?.performancefee}
                  lockTime={
                    expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                    "No"
                      ? "No Lock"
                      : parseInt(
                          expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                        )
                  }
                  lp_id={LP_IDBNB_Array[cardIndex]}
                  listType={listType}
                  other_info={true}
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultbsc}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  referrer={referrer}
                />
              ) : activeCard &&
                cardIndex === 1 &&
                topList === "Staking" &&
                chain === "bnb" ? (
                <StakeBscDai
                  staking={window.constant_stakingdaibsc}
                  apr={expiredDYPPools[cardIndex]?.apy_percent}
                  liquidity={wbsc_address}
                  expiration_time={"Expired"}
                  finalApr={expiredDYPPools[cardIndex]?.apy_performancefee}
                  fee={expiredDYPPools[cardIndex]?.performancefee}
                  lockTime={
                    expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                    "No"
                      ? "No Lock"
                      : parseInt(
                          expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                        )
                  }
                  listType={listType}
                  other_info={true}
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultbsc}
                  lp_id={LP_IDBNB_Array[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  referrer={referrer}
                />
              ) : activeCard3 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex === 2 ? (
                <StakeAvax30
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  coinbase={coinbase}
                  referrer={referrer}
                />
              ) : (
                <></>
              )}
            </>
            <>
              <div
                className="top-picks-container"
                style={{ marginTop: "25px" }}
              >
                {expiredDYPPools.slice(3, 4).map((pool, index) => (
                  <TopPoolsCard
                    expired={true}
                    display={
                      pool.expired
                        ? pool.expired === "Yes"
                          ? ""
                          : "none"
                        : "none"
                    }
                    key={index}
                    chain={chain}
                    top_pick={pool.top_pick}
                    tokenName={
                      pool.tokenName
                        ? pool.tokenName
                        : pool.pair_name
                        ? pool.pair_name
                        : ""
                    }
                    apr={pool.apy_percent + "%"}
                    tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                    lockTime={
                      pool.lockTime
                        ? pool.lockTime
                        : pool.lock_time
                        ? pool.lock_time
                        : locktimeFarm[index]
                    }
                    tokenLogo={
                      pool.icon
                        ? pool.icon
                        : pool.pair_name === "iDYP"
                        ? "idypius.svg"
                        : "dyplogo.svg"
                    }
                    onShowDetailsClick={() => {
                      setActiveCard(null);
                      setActiveCard2(null);
                      setActiveCard3(null);
                      setActiveCard4(topPools[index + 3]);
                      setActiveCard5(null);
                      setActiveCard6(null);
                      setActiveCard7(null);
                      setActiveCard8(null);
                      setActiveCard9(null);
                      setActiveCard10(null);
                      setActiveCard11(null);
                      setActiveCard12(null);
                      setActiveCardNFT(false);
                      handleCardIndexStake(index + 3);
                      handleCardIndexStake30(index + 3);
                      handleCardIndexStakeiDyp(index + 3);
                      setDetails(index + 3);
                    }}
                    onHideDetailsClick={() => {
                      setActiveCard4(null);
                      setDetails();
                    }}
                    cardType={topList}
                    details={details === index + 3 ? true : false}
                    isNewPool={pool.isNewPool}
                    isStaked={pool.isStaked}
                  />
                ))}
              </div>
              {activeCard4 && topList === "Farming" ? (
                chain === "eth" ? (
                  <StakingNew1
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_result}
                    lp_id={lp_id[cardIndex]}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={true}
                  />
                ) : chain === "bnb" ? (
                  <BscFarming
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_resultbsc}
                    lp_id={LP_IDBNB_Array[cardIndex]}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={true}
                  />
                ) : (
                  <FarmAvax
                    is_wallet_connected={isConnected}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={true}
                    the_graph_result={the_graph_resultavax}
                    lp_id={LP_IDAVAX_Array[cardIndex]}
                    chainId={chainId}
                    coinbase={coinbase}
                  />
                )
              ) : activeCard4 &&
                cardIndex >= 3 &&
                topList === "Staking" &&
                chain === "eth" ? (
                <ConstantStakingiDYP1
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  lp_id={lp_id[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                />
              ) : activeCard4 &&
                cardIndex === 1 &&
                topList === "Staking" &&
                chain === "bnb" ? (
                <StakeBscDai
                  staking={window.constant_stakingdaibsc}
                  apr={expiredDYPPools[cardIndex]?.apy_percent}
                  liquidity={wbsc_address}
                  expiration_time={"Expired"}
                  finalApr={expiredDYPPools[cardIndex]?.apy_performancefee}
                  fee={expiredDYPPools[cardIndex]?.performancefee}
                  lockTime={
                    expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                    "No"
                      ? "No Lock"
                      : parseInt(
                          expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                        )
                  }
                  listType={listType}
                  other_info={true}
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultbsc}
                  lp_id={LP_IDBNB_Array[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  referrer={referrer}
                />
              ) : activeCard4 &&
                cardIndex >= 3 &&
                topList === "Staking" &&
                chain === "bnb" ? (
                <StakeBscIDyp
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultbsc}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  staking={
                    expiredPools === false
                      ? stakearrayStakeBsciDyp2[cardIndex - 2]
                      : stakearrayStakeBsciDyp2Expired[cardIndex - 3]
                  }
                  listType={listType}
                  finalApr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_performancefee
                      : expiredDYPPools[cardIndex]?.apy_performancefee
                  }
                  apr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_percent
                      : expiredDYPPools[cardIndex]?.apy_percent
                  }
                  liquidity={wbsc_address}
                  expiration_time={
                    expiredPools === false
                      ? expirearrayStakeBsciDyp2[cardIndex - 2]
                      : expirearrayStakeBsciDyp2Expired[cardIndex - 3]
                  }
                  other_info={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : expiredDYPPools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : false
                  }
                  fee_s={
                    expiredPools === false
                      ? activePools[cardIndex]?.performancefee
                      : expiredDYPPools[cardIndex]?.performancefee
                  }
                  fee_u={0}
                  lockTime={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                          "No"
                          ? "No Lock"
                          : parseInt(
                              activePools[cardIndex]?.lock_time?.split(" ")[0]
                            )
                        : expiredDYPPools[cardIndex]?.lock_time?.split(
                            " "
                          )[0] === "No"
                        ? "No Lock"
                        : parseInt(
                            expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                          )
                      : "No Lock"
                  }
                />
              ) : activeCard4 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex > 2 ? (
                <StakeAvaxIDyp
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  staking={
                    expiredPools === false
                      ? stakingarrayStakeAvaxiDypActive[cardIndex - 2]
                      : stakingarrayStakeAvaxiDypExpired[cardIndex - 3]
                  }
                  listType={listType}
                  finalApr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_performancefee
                      : expiredDYPPools[cardIndex]?.apy_performancefee
                  }
                  apr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_percent
                      : expiredDYPPools[cardIndex]?.apy_percent
                  }
                  liquidity={avax_address}
                  expiration_time={expirearrayStakeAvaxiDyp[cardIndex]}
                  other_info={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : expiredDYPPools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : false
                  }
                  fee_s={
                    expiredPools === false
                      ? activePools[cardIndex]?.performancefee
                      : expiredDYPPools[cardIndex]?.performancefee
                  }
                  fee_u={feeUarrayStakeAvaxiDyp[cardIndexavaxiDyp - 3]}
                  lockTime={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                          "No"
                          ? "No Lock"
                          : activePools[cardIndex]?.lock_time?.split(" ")[0]
                        : expiredDYPPools[cardIndex]?.lock_time?.split(
                            " "
                          )[0] === "No"
                        ? "No Lock"
                        : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                      : "No Lock"
                  }
                />
              ) : (
                <></>
              )}
            </>
            <>
              <div
                className="top-picks-container"
                style={{ marginTop: "25px" }}
              >
                {expiredDYPPools.slice(4, 5).map((pool, index) => (
                  <TopPoolsCard
                    expired={true}
                    display={
                      pool.expired
                        ? pool.expired === "Yes"
                          ? ""
                          : "none"
                        : "none"
                    }
                    key={index}
                    chain={chain}
                    top_pick={pool.top_pick}
                    tokenName={
                      pool.tokenName
                        ? pool.tokenName
                        : pool.pair_name
                        ? pool.pair_name
                        : ""
                    }
                    apr={pool.apy_percent + "%"}
                    tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                    lockTime={
                      pool.lockTime
                        ? pool.lockTime
                        : pool.lock_time
                        ? pool.lock_time
                        : locktimeFarm[index]
                    }
                    tokenLogo={
                      pool.icon
                        ? pool.icon
                        : pool.pair_name === "iDYP"
                        ? "idypius.svg"
                        : "dyplogo.svg"
                    }
                    onShowDetailsClick={() => {
                      setActiveCard(null);
                      setActiveCard2(null);
                      setActiveCard3(null);
                      setActiveCard4(null);
                      setActiveCard5(topPools[index + 4]);
                      setActiveCard6(null);
                      setActiveCard7(null);
                      setActiveCard8(null);
                      setActiveCard9(null);
                      setActiveCard10(null);
                      setActiveCard11(null);
                      setActiveCard12(null);
                      setActiveCardNFT(false);
                      handleCardIndexStake(index + 4);
                      handleCardIndexStake30(index + 4);
                      handleCardIndexStakeiDyp(index + 4);
                      setDetails(index + 4);
                    }}
                    onHideDetailsClick={() => {
                      setActiveCard5(null);
                      setDetails();
                    }}
                    cardType={topList}
                    details={details === index + 4 ? true : false}
                    isNewPool={pool.isNewPool}
                    isStaked={pool.isStaked}
                  />
                ))}
              </div>
              {activeCard5 && topList === "Farming" ? (
                chain === "eth" ? (
                  <StakingNew1
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_result}
                    lp_id={lp_id[cardIndex]}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={true}
                  />
                ) : chain === "bnb" ? (
                  <BscFarming
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_resultbsc}
                    lp_id={LP_IDBNB_Array[cardIndex]}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={true}
                  />
                ) : (
                  <FarmAvax
                    is_wallet_connected={isConnected}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={true}
                    the_graph_result={the_graph_resultavax}
                    lp_id={LP_IDAVAX_Array[cardIndex]}
                    chainId={chainId}
                    coinbase={coinbase}
                  />
                )
              ) : activeCard5 &&
                topList === "Staking" &&
                cardIndex < 2 &&
                chain === "eth" ? (
                <StakeEth
                  staking={stakeArrayStakeNew[cardIndex]}
                  apr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_percent
                      : expiredDYPPools[cardIndex]?.apy_percent
                  }
                  liquidity={eth_address}
                  expiration_time={"14 December 2022"}
                  finalApr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_performancefee
                      : expiredDYPPools[cardIndex]?.apy_performancefee
                  }
                  fee={
                    expiredPools
                      ? expiredPools[cardIndex - 1]?.performancefee
                      : 0
                  }
                  lockTime={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                          "No"
                          ? "No Lock"
                          : activePools[cardIndex]?.lock_time?.split(" ")[0]
                        : expiredDYPPools[cardIndex]?.lock_time?.split(
                            " "
                          )[0] === "No"
                        ? "No Lock"
                        : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                      : "No Lock"
                  }
                  lp_id={LP_IDBNB_Array[cardIndex]}
                  listType={listType}
                  other_info={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : expiredDYPPools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : false
                  }
                  fee={
                    expiredPools === false
                      ? activePools[cardIndex]?.performancefee
                      : expiredDYPPools[cardIndex]?.performancefee
                  }
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  referrer={referrer}
                />
              ) : activeCard5 &&
                topList === "Staking" &&
                cardIndex === 4 &&
                chain === "eth" ? (
                <StakeEthDai
                  staking={window.constant_stakingdaieth}
                  apr={expiredDYPPools[cardIndex]?.apy_percent}
                  liquidity={eth_address}
                  expiration_time={"Expired"}
                  finalApr={expiredDYPPools[cardIndex]?.apy_performancefee}
                  fee={expiredDYPPools[cardIndex]?.performancefee}
                  lockTime={
                    expiredPools
                      ? expiredPools[cardIndex - 1]?.lock_time?.split(
                          " "
                        )[0] === "No"
                        ? "No Lock"
                        : expiredPools[cardIndex - 1]?.lock_time?.split(" ")[0]
                      : "No Lock"
                  }
                  listType={listType}
                  other_info={true}
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  referrer={referrer}
                  lp_id={lp_id[cardIndex]}
                />
              ) : activeCard5 &&
                (cardIndex === 0 || cardIndex === 2) &&
                topList === "Staking" &&
                chain === "bnb" ? (
                <StakeBsc2
                  staking={
                    cardIndex === 2
                      ? stakearrayStakeBscExpired[cardIndex - 1]
                      : stakearrayStakeBscExpired[cardIndex]
                  }
                  apr={expiredDYPPools[cardIndex]?.apy_percent}
                  liquidity={wbsc_address}
                  expiration_time={
                    cardIndex === 2
                      ? expirearrayStakeBscExpired[cardIndex - 1]
                      : expirearrayStakeBscExpired[cardIndex]
                  }
                  finalApr={expiredDYPPools[cardIndex]?.apy_performancefee}
                  fee={expiredDYPPools[cardIndex]?.performancefee}
                  lockTime={
                    expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                    "No"
                      ? "No Lock"
                      : parseInt(
                          expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                        )
                  }
                  lp_id={LP_IDBNB_Array[cardIndex]}
                  listType={listType}
                  other_info={true}
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultbsc}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  referrer={referrer}
                />
              ) : activeCard5 &&
                cardIndex === 1 &&
                topList === "Staking" &&
                chain === "bnb" ? (
                <StakeBscDai
                  staking={window.constant_stakingdaibsc}
                  apr={expiredDYPPools[cardIndex]?.apy_percent}
                  liquidity={wbsc_address}
                  expiration_time={"Expired"}
                  finalApr={expiredDYPPools[cardIndex]?.apy_performancefee}
                  fee={expiredDYPPools[cardIndex]?.performancefee}
                  lockTime={
                    expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                    "No"
                      ? "No Lock"
                      : parseInt(
                          expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                        )
                  }
                  listType={listType}
                  other_info={true}
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultbsc}
                  lp_id={LP_IDBNB_Array[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  referrer={referrer}
                />
              ) : activeCard5 &&
                cardIndex >= 3 &&
                topList === "Staking" &&
                chain === "bnb" ? (
                <StakeBscIDyp
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultbsc}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  staking={
                    expiredPools === false
                      ? stakearrayStakeBsciDyp2[cardIndex - 2]
                      : stakearrayStakeBsciDyp2Expired[cardIndex - 3]
                  }
                  listType={listType}
                  finalApr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_performancefee
                      : expiredDYPPools[cardIndex]?.apy_performancefee
                  }
                  apr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_percent
                      : expiredDYPPools[cardIndex]?.apy_percent
                  }
                  liquidity={wbsc_address}
                  expiration_time={
                    expiredPools === false
                      ? expirearrayStakeBsciDyp2[cardIndex - 2]
                      : expirearrayStakeBsciDyp2Expired[cardIndex - 3]
                  }
                  other_info={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : expiredDYPPools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : false
                  }
                  fee_s={
                    expiredPools === false
                      ? activePools[cardIndex]?.performancefee
                      : expiredDYPPools[cardIndex]?.performancefee
                  }
                  fee_u={0}
                  lockTime={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                          "No"
                          ? "No Lock"
                          : parseInt(
                              activePools[cardIndex]?.lock_time?.split(" ")[0]
                            )
                        : expiredDYPPools[cardIndex]?.lock_time?.split(
                            " "
                          )[0] === "No"
                        ? "No Lock"
                        : parseInt(
                            expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                          )
                      : "No Lock"
                  }
                />
              ) : activeCard5 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex < 2 ? (
                <StakeAvax30
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  coinbase={coinbase}
                  referrer={referrer}
                />
              ) : activeCard5 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex === 2 ? (
                <StakeAvaxDai
                  staking={window.constant_stakingdaiavax}
                  apr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_percent
                      : expiredDYPPools[cardIndex]?.apy_percent
                  }
                  liquidity={avax_address}
                  expiration_time={"Expired"}
                  finalApr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_performancefee
                      : expiredDYPPools[cardIndex]?.apy_performancefee
                  }
                  fee={
                    expiredPools
                      ? expiredPools[cardIndex - 1]?.performancefee
                      : 0
                  }
                  lockTime={
                    cardIndex !== undefined
                      ? expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                        ? "No Lock"
                        : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                      : "No Lock"
                  }
                  listType={listType}
                  other_info={true}
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  referrer={referrer}
                />
              ) : activeCard5 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex > 2 ? (
                <StakeAvaxIDyp
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  staking={
                    expiredPools === false
                      ? stakingarrayStakeAvaxiDypActive[cardIndex - 2]
                      : stakingarrayStakeAvaxiDypExpired[cardIndex - 3]
                  }
                  listType={listType}
                  finalApr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_performancefee
                      : expiredDYPPools[cardIndex]?.apy_performancefee
                  }
                  apr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_percent
                      : expiredDYPPools[cardIndex]?.apy_percent
                  }
                  liquidity={avax_address}
                  expiration_time={expirearrayStakeAvaxiDyp[cardIndex]}
                  other_info={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : expiredDYPPools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : false
                  }
                  fee_s={
                    expiredPools === false
                      ? activePools[cardIndex]?.performancefee
                      : expiredDYPPools[cardIndex]?.performancefee
                  }
                  fee_u={feeUarrayStakeAvaxiDyp[cardIndexavaxiDyp - 3]}
                  lockTime={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                          "No"
                          ? "No Lock"
                          : activePools[cardIndex]?.lock_time?.split(" ")[0]
                        : expiredDYPPools[cardIndex]?.lock_time?.split(
                            " "
                          )[0] === "No"
                        ? "No Lock"
                        : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                      : "No Lock"
                  }
                />
              ) : (
                <></>
              )}
            </>
            <>
              <div
                className="top-picks-container"
                style={{ marginTop: "25px" }}
              >
                {expiredDYPPools.slice(5, 6).map((pool, index) => (
                  <TopPoolsCard
                    expired={true}
                    display={
                      pool.expired
                        ? pool.expired === "Yes"
                          ? ""
                          : "none"
                        : "none"
                    }
                    key={index}
                    chain={chain}
                    top_pick={pool.top_pick}
                    tokenName={
                      pool.tokenName
                        ? pool.tokenName
                        : pool.pair_name
                        ? pool.pair_name
                        : ""
                    }
                    apr={pool.apy_percent + "%"}
                    tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                    lockTime={
                      pool.lockTime
                        ? pool.lockTime
                        : pool.lock_time
                        ? pool.lock_time
                        : locktimeFarm[index]
                    }
                    tokenLogo={
                      pool.icon
                        ? pool.icon
                        : pool.pair_name === "iDYP"
                        ? "idypius.svg"
                        : "dyplogo.svg"
                    }
                    onShowDetailsClick={() => {
                      setActiveCard(null);
                      setActiveCard2(null);
                      setActiveCard3(null);
                      setActiveCard4(null);
                      setActiveCard5(null);
                      setActiveCard6(topPools[index + 5]);
                      setActiveCard7(null);
                      setActiveCard8(null);
                      setActiveCard9(null);
                      setActiveCard10(null);
                      setActiveCard11(null);
                      setActiveCard12(null);
                      setActiveCardNFT(false);
                      handleCardIndexStake(index + 5);
                      handleCardIndexStake30(index + 5);
                      handleCardIndexStakeiDyp(index + 5);
                      setDetails(index + 5);
                    }}
                    onHideDetailsClick={() => {
                      setActiveCard6(null);
                      setDetails();
                    }}
                    cardType={topList}
                    details={details === index + 5 ? true : false}
                    isNewPool={pool.isNewPool}
                    isStaked={pool.isStaked}
                  />
                ))}
              </div>
              {activeCard6 && topList === "Farming" ? (
                chain === "eth" ? (
                  <StakingNew1
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_result}
                    lp_id={lp_id[cardIndex]}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={true}
                  />
                ) : chain === "bnb" ? (
                  <BscFarming
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_resultbsc}
                    lp_id={LP_IDBNB_Array[cardIndex]}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={true}
                  />
                ) : (
                  <FarmAvax
                    is_wallet_connected={isConnected}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={true}
                    the_graph_result={the_graph_resultavax}
                    lp_id={LP_IDAVAX_Array[cardIndex]}
                    chainId={chainId}
                    coinbase={coinbase}
                  />
                )
              ) : activeCard6 &&
                topList === "Staking" &&
                cardIndex < 3 &&
                chain === "eth" ? (
                <StakeEth
                  staking={stakeArrayStakeNew[cardIndex]}
                  apr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_percent
                      : expiredDYPPools[cardIndex]?.apy_percent
                  }
                  liquidity={eth_address}
                  expiration_time={"14 December 2022"}
                  finalApr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_performancefee
                      : expiredDYPPools[cardIndex]?.apy_performancefee
                  }
                  fee={
                    expiredPools
                      ? expiredPools[cardIndex - 1]?.performancefee
                      : 0
                  }
                  lockTime={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                          "No"
                          ? "No Lock"
                          : activePools[cardIndex]?.lock_time?.split(" ")[0]
                        : expiredDYPPools[cardIndex]?.lock_time?.split(
                            " "
                          )[0] === "No"
                        ? "No Lock"
                        : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                      : "No Lock"
                  }
                  lp_id={LP_IDBNB_Array[cardIndex]}
                  listType={listType}
                  other_info={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : expiredDYPPools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : false
                  }
                  fee={
                    expiredPools === false
                      ? activePools[cardIndex]?.performancefee
                      : expiredDYPPools[cardIndex]?.performancefee
                  }
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  referrer={referrer}
                />
              ) : activeCard6 &&
                cardIndex > 3 &&
                topList === "Staking" &&
                chain === "eth" ? (
                <ConstantStakingiDYP1
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  lp_id={lp_id[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                />
              ) : activeCard6 &&
                cardIndex >= 5 &&
                topList === "Staking" &&
                chain === "bnb" ? (
                <StakeBscIDyp
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultbsc}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  staking={
                    expiredPools === false
                      ? stakearrayStakeBsciDyp2[cardIndex - 2]
                      : stakearrayStakeBsciDyp2Expired[cardIndex - 3]
                  }
                  listType={listType}
                  finalApr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_performancefee
                      : expiredDYPPools[cardIndex]?.apy_performancefee
                  }
                  apr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_percent
                      : expiredDYPPools[cardIndex]?.apy_percent
                  }
                  liquidity={wbsc_address}
                  expiration_time={
                    expiredPools === false
                      ? expirearrayStakeBsciDyp2[cardIndex - 2]
                      : expirearrayStakeBsciDyp2Expired[cardIndex - 3]
                  }
                  other_info={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : expiredDYPPools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : false
                  }
                  fee_s={
                    expiredPools === false
                      ? activePools[cardIndex]?.performancefee
                      : expiredDYPPools[cardIndex]?.performancefee
                  }
                  fee_u={0}
                  lockTime={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                          "No"
                          ? "No Lock"
                          : parseInt(
                              activePools[cardIndex]?.lock_time?.split(" ")[0]
                            )
                        : expiredDYPPools[cardIndex]?.lock_time?.split(
                            " "
                          )[0] === "No"
                        ? "No Lock"
                        : parseInt(
                            expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                          )
                      : "No Lock"
                  }
                />
              ) : activeCard6 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex < 2 ? (
                <StakeAvax
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  coinbase={coinbase}
                  referrer={referrer}
                />
              ) : activeCard6 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex >= 2 &&
                cardIndex < 4 ? (
                <StakeAvax30
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  coinbase={coinbase}
                  referrer={referrer}
                />
              ) : activeCard6 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex === 4 ? (
                <StakeAvaxDai
                  staking={window.constant_stakingdaiavax}
                  apr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_percent
                      : expiredDYPPools[cardIndex]?.apy_percent
                  }
                  liquidity={avax_address}
                  expiration_time={"Expired"}
                  finalApr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_performancefee
                      : expiredDYPPools[cardIndex]?.apy_performancefee
                  }
                  fee={
                    expiredPools
                      ? expiredPools[cardIndex - 1]?.performancefee
                      : 0
                  }
                  lockTime={
                    cardIndex !== undefined
                      ? expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                        ? "No Lock"
                        : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                      : "No Lock"
                  }
                  listType={listType}
                  other_info={true}
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  referrer={referrer}
                />
              ) : activeCard6 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex >= 5 ? (
                <StakeAvaxIDyp
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  staking={
                    expiredPools === false
                      ? stakingarrayStakeAvaxiDypActive[cardIndex - 2]
                      : stakingarrayStakeAvaxiDypExpired[cardIndex - 3]
                  }
                  listType={listType}
                  finalApr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_performancefee
                      : expiredDYPPools[cardIndex]?.apy_performancefee
                  }
                  apr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_percent
                      : expiredDYPPools[cardIndex]?.apy_percent
                  }
                  liquidity={avax_address}
                  expiration_time={expirearrayStakeAvaxiDyp[cardIndex]}
                  other_info={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : expiredDYPPools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : false
                  }
                  fee_s={
                    expiredPools === false
                      ? activePools[cardIndex]?.performancefee
                      : expiredDYPPools[cardIndex]?.performancefee
                  }
                  fee_u={feeUarrayStakeAvaxiDyp[cardIndexavaxiDyp - 3]}
                  lockTime={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                          "No"
                          ? "No Lock"
                          : activePools[cardIndex]?.lock_time?.split(" ")[0]
                        : expiredDYPPools[cardIndex]?.lock_time?.split(
                            " "
                          )[0] === "No"
                        ? "No Lock"
                        : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                      : "No Lock"
                  }
                />
              ) : (
                <></>
              )}
            </>
            <>
              <div
                className="top-picks-container"
                style={{ marginTop: "25px" }}
              >
                {expiredDYPPools.slice(6, 7).map((pool, index) => (
                  <TopPoolsCard
                    expired={true}
                    display={
                      pool.expired
                        ? pool.expired === "Yes"
                          ? ""
                          : "none"
                        : "none"
                    }
                    key={index}
                    chain={chain}
                    top_pick={pool.top_pick}
                    tokenName={
                      pool.tokenName
                        ? pool.tokenName
                        : pool.pair_name
                        ? pool.pair_name
                        : ""
                    }
                    apr={pool.apy_percent + "%"}
                    tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                    lockTime={
                      pool.lockTime
                        ? pool.lockTime
                        : pool.lock_time
                        ? pool.lock_time
                        : locktimeFarm[index]
                    }
                    tokenLogo={
                      pool.icon
                        ? pool.icon
                        : pool.pair_name === "iDYP"
                        ? "idypius.svg"
                        : "dyplogo.svg"
                    }
                    onShowDetailsClick={() => {
                      setActiveCard(null);
                      setActiveCard2(null);
                      setActiveCard3(null);
                      setActiveCard4(null);
                      setActiveCard5(null);
                      setActiveCard6(null);
                      setActiveCard7(topPools[index + 6]);
                      setActiveCard8(null);
                      setActiveCard9(null);
                      setActiveCard10(null);
                      setActiveCard11(null);
                      setActiveCard12(null);
                      setActiveCardNFT(false);
                      handleCardIndexStake(index + 6);
                      handleCardIndexStake30(index + 6);
                      handleCardIndexStakeiDyp(index + 6);
                      setDetails(index + 6);
                    }}
                    onHideDetailsClick={() => {
                      setActiveCard7(null);
                      setDetails();
                    }}
                    cardType={topList}
                    details={details === index + 6 ? true : false}
                    isNewPool={pool.isNewPool}
                    isStaked={pool.isStaked}
                  />
                ))}
              </div>
              {activeCard7 && topList === "Farming" ? (
                chain === "eth" ? (
                  <StakingNew1
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_result}
                    lp_id={lp_id[cardIndex]}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={true}
                  />
                ) : chain === "bnb" ? (
                  <BscFarming
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_resultbsc}
                    lp_id={LP_IDBNB_Array[cardIndex]}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={true}
                  />
                ) : (
                  <FarmAvax
                    is_wallet_connected={isConnected}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={true}
                    the_graph_result={the_graph_resultavax}
                    lp_id={LP_IDAVAX_Array[cardIndex]}
                    chainId={chainId}
                    coinbase={coinbase}
                  />
                )
              ) : activeCard7 &&
                topList === "Staking" &&
                cardIndex < 3 &&
                chain === "eth" ? (
                <StakeEth
                  staking={stakeArrayStakeNew[cardIndex]}
                  apr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_percent
                      : expiredDYPPools[cardIndex]?.apy_percent
                  }
                  liquidity={eth_address}
                  expiration_time={"14 December 2022"}
                  finalApr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_performancefee
                      : expiredDYPPools[cardIndex]?.apy_performancefee
                  }
                  fee={
                    expiredPools
                      ? expiredPools[cardIndex - 1]?.performancefee
                      : 0
                  }
                  lockTime={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                          "No"
                          ? "No Lock"
                          : activePools[cardIndex]?.lock_time?.split(" ")[0]
                        : expiredDYPPools[cardIndex]?.lock_time?.split(
                            " "
                          )[0] === "No"
                        ? "No Lock"
                        : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                      : "No Lock"
                  }
                  lp_id={LP_IDBNB_Array[cardIndex]}
                  listType={listType}
                  other_info={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : expiredDYPPools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : false
                  }
                  fee={
                    expiredPools === false
                      ? activePools[cardIndex]?.performancefee
                      : expiredDYPPools[cardIndex]?.performancefee
                  }
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  referrer={referrer}
                />
              ) : activeCard7 &&
                cardIndex > 3 &&
                topList === "Staking" &&
                chain === "eth" ? (
                <ConstantStakingiDYP1
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  lp_id={lp_id[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                />
              ) : activeCard7 &&
                cardIndex >= 5 &&
                topList === "Staking" &&
                chain === "bnb" ? (
                <StakeBscIDyp
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultbsc}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  staking={
                    expiredPools === false
                      ? stakearrayStakeBsciDyp2[cardIndex - 2]
                      : stakearrayStakeBsciDyp2Expired[cardIndex - 3]
                  }
                  listType={listType}
                  finalApr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_performancefee
                      : expiredDYPPools[cardIndex]?.apy_performancefee
                  }
                  apr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_percent
                      : expiredDYPPools[cardIndex]?.apy_percent
                  }
                  liquidity={wbsc_address}
                  expiration_time={
                    expiredPools === false
                      ? expirearrayStakeBsciDyp2[cardIndex - 2]
                      : expirearrayStakeBsciDyp2Expired[cardIndex - 3]
                  }
                  other_info={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : expiredDYPPools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : false
                  }
                  fee_s={
                    expiredPools === false
                      ? activePools[cardIndex]?.performancefee
                      : expiredDYPPools[cardIndex]?.performancefee
                  }
                  fee_u={0}
                  lockTime={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                          "No"
                          ? "No Lock"
                          : parseInt(
                              activePools[cardIndex]?.lock_time?.split(" ")[0]
                            )
                        : expiredDYPPools[cardIndex]?.lock_time?.split(
                            " "
                          )[0] === "No"
                        ? "No Lock"
                        : parseInt(
                            expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                          )
                      : "No Lock"
                  }
                />
              ) : activeCard7 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex < 2 ? (
                <StakeAvax
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  coinbase={coinbase}
                  referrer={referrer}
                />
              ) : activeCard7 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex >= 2 &&
                cardIndex < 4 ? (
                <StakeAvax30
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  coinbase={coinbase}
                  referrer={referrer}
                />
              ) : activeCard7 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex === 4 ? (
                <StakeAvaxDai
                  staking={window.constant_stakingdaiavax}
                  apr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_percent
                      : expiredDYPPools[cardIndex]?.apy_percent
                  }
                  liquidity={avax_address}
                  expiration_time={"Expired"}
                  finalApr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_performancefee
                      : expiredDYPPools[cardIndex]?.apy_performancefee
                  }
                  fee={
                    expiredPools
                      ? expiredPools[cardIndex - 1]?.performancefee
                      : 0
                  }
                  lockTime={
                    cardIndex !== undefined
                      ? expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                        ? "No Lock"
                        : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                      : "No Lock"
                  }
                  listType={listType}
                  other_info={true}
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  referrer={referrer}
                />
              ) : activeCard7 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex >= 5 ? (
                <StakeAvaxIDyp
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  staking={
                    expiredPools === false
                      ? stakingarrayStakeAvaxiDypActive[cardIndex - 2]
                      : stakingarrayStakeAvaxiDypExpired[cardIndex - 3]
                  }
                  listType={listType}
                  finalApr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_performancefee
                      : expiredDYPPools[cardIndex]?.apy_performancefee
                  }
                  apr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_percent
                      : expiredDYPPools[cardIndex]?.apy_percent
                  }
                  liquidity={avax_address}
                  expiration_time={expirearrayStakeAvaxiDyp[cardIndex]}
                  other_info={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : expiredDYPPools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : false
                  }
                  fee_s={
                    expiredPools === false
                      ? activePools[cardIndex]?.performancefee
                      : expiredDYPPools[cardIndex]?.performancefee
                  }
                  fee_u={feeUarrayStakeAvaxiDyp[cardIndexavaxiDyp - 3]}
                  lockTime={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                          "No"
                          ? "No Lock"
                          : activePools[cardIndex]?.lock_time?.split(" ")[0]
                        : expiredDYPPools[cardIndex]?.lock_time?.split(
                            " "
                          )[0] === "No"
                        ? "No Lock"
                        : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                      : "No Lock"
                  }
                />
              ) : (
                <></>
              )}
            </>
            <>
              <div
                className="top-picks-container"
                style={{ marginTop: expiredDYPPools.length >= 9 && "25px" }}
              >
                {expiredDYPPools.slice(7, 8).map((pool, index) => (
                  <TopPoolsCard
                    expired={true}
                    display={
                      pool.expired
                        ? pool.expired === "Yes"
                          ? ""
                          : "none"
                        : "none"
                    }
                    key={index}
                    chain={chain}
                    top_pick={pool.top_pick}
                    tokenName={
                      pool.tokenName
                        ? pool.tokenName
                        : pool.pair_name
                        ? pool.pair_name
                        : ""
                    }
                    apr={pool.apy_percent + "%"}
                    tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                    lockTime={
                      pool.lockTime
                        ? pool.lockTime
                        : pool.lock_time
                        ? pool.lock_time
                        : locktimeFarm[index]
                    }
                    tokenLogo={
                      pool.icon
                        ? pool.icon
                        : pool.pair_name === "iDYP"
                        ? "idypius.svg"
                        : "dyplogo.svg"
                    }
                    onShowDetailsClick={() => {
                      setActiveCard(null);
                      setActiveCard2(null);
                      setActiveCard3(null);
                      setActiveCard4(null);
                      setActiveCard5(null);
                      setActiveCard6(null);
                      setActiveCard7(null);
                      setActiveCard8(topPools[index + 7]);
                      setActiveCard9(null);
                      setActiveCard10(null);
                      setActiveCard11(null);
                      setActiveCard12(null);
                      setActiveCardNFT(false);
                      handleCardIndexStake(index + 7);
                      handleCardIndexStake30(index + 7);
                      handleCardIndexStakeiDyp(index + 7);
                      setDetails(index + 7);
                    }}
                    onHideDetailsClick={() => {
                      setActiveCard8(null);
                      setDetails();
                    }}
                    cardType={topList}
                    details={details === index + 7 ? true : false}
                    isNewPool={pool.isNewPool}
                    isStaked={pool.isStaked}
                  />
                ))}
              </div>
              {activeCard8 && topList === "Farming" ? (
                chain === "eth" ? (
                  <StakingNew1
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_result}
                    lp_id={lp_id[cardIndex]}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={true}
                  />
                ) : chain === "bnb" ? (
                  <BscFarming
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_resultbsc}
                    lp_id={LP_IDBNB_Array[cardIndex]}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={true}
                  />
                ) : (
                  <FarmAvax
                    is_wallet_connected={isConnected}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={true}
                    the_graph_result={the_graph_resultavax}
                    lp_id={LP_IDAVAX_Array[cardIndex]}
                    chainId={chainId}
                    coinbase={coinbase}
                  />
                )
              ) : activeCard8 &&
                topList === "Staking" &&
                cardIndex < 3 &&
                chain === "eth" ? (
                <StakeEth
                  staking={stakeArrayStakeNew[cardIndex]}
                  apr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_percent
                      : expiredDYPPools[cardIndex]?.apy_percent
                  }
                  liquidity={eth_address}
                  expiration_time={"14 December 2022"}
                  finalApr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_performancefee
                      : expiredDYPPools[cardIndex]?.apy_performancefee
                  }
                  fee={
                    expiredPools
                      ? expiredPools[cardIndex - 1]?.performancefee
                      : 0
                  }
                  lockTime={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                          "No"
                          ? "No Lock"
                          : activePools[cardIndex]?.lock_time?.split(" ")[0]
                        : expiredDYPPools[cardIndex]?.lock_time?.split(
                            " "
                          )[0] === "No"
                        ? "No Lock"
                        : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                      : "No Lock"
                  }
                  lp_id={LP_IDBNB_Array[cardIndex]}
                  listType={listType}
                  other_info={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : expiredDYPPools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : false
                  }
                  fee={
                    expiredPools === false
                      ? activePools[cardIndex]?.performancefee
                      : expiredDYPPools[cardIndex]?.performancefee
                  }
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  referrer={referrer}
                />
              ) : activeCard8 &&
                cardIndex > 3 &&
                topList === "Staking" &&
                chain === "eth" ? (
                <ConstantStakingiDYP1
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  lp_id={lp_id[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                />
              ) : activeCard8 &&
                cardIndex >= 5 &&
                topList === "Staking" &&
                chain === "bnb" ? (
                <StakeBscIDyp
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultbsc}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  staking={
                    expiredPools === false
                      ? stakearrayStakeBsciDyp2[cardIndex - 2]
                      : stakearrayStakeBsciDyp2Expired[cardIndex - 3]
                  }
                  listType={listType}
                  finalApr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_performancefee
                      : expiredDYPPools[cardIndex]?.apy_performancefee
                  }
                  apr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_percent
                      : expiredDYPPools[cardIndex]?.apy_percent
                  }
                  liquidity={wbsc_address}
                  expiration_time={
                    expiredPools === false
                      ? expirearrayStakeBsciDyp2[cardIndex - 2]
                      : expirearrayStakeBsciDyp2Expired[cardIndex - 3]
                  }
                  other_info={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : expiredDYPPools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : false
                  }
                  fee_s={
                    expiredPools === false
                      ? activePools[cardIndex]?.performancefee
                      : expiredDYPPools[cardIndex]?.performancefee
                  }
                  fee_u={0}
                  lockTime={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                          "No"
                          ? "No Lock"
                          : parseInt(
                              activePools[cardIndex]?.lock_time?.split(" ")[0]
                            )
                        : expiredDYPPools[cardIndex]?.lock_time?.split(
                            " "
                          )[0] === "No"
                        ? "No Lock"
                        : parseInt(
                            expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                          )
                      : "No Lock"
                  }
                />
              ) : activeCard8 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex < 2 ? (
                <StakeAvax
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  coinbase={coinbase}
                  referrer={referrer}
                />
              ) : activeCard8 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex >= 2 &&
                cardIndex < 4 ? (
                <StakeAvax30
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  coinbase={coinbase}
                  referrer={referrer}
                />
              ) : activeCard8 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex === 4 ? (
                <StakeAvaxDai
                  staking={window.constant_stakingdaiavax}
                  apr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_percent
                      : expiredDYPPools[cardIndex]?.apy_percent
                  }
                  liquidity={avax_address}
                  expiration_time={"Expired"}
                  finalApr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_performancefee
                      : expiredDYPPools[cardIndex]?.apy_performancefee
                  }
                  fee={
                    expiredPools
                      ? expiredPools[cardIndex - 1]?.performancefee
                      : 0
                  }
                  lockTime={
                    cardIndex !== undefined
                      ? expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                        ? "No Lock"
                        : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                      : "No Lock"
                  }
                  listType={listType}
                  other_info={true}
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  referrer={referrer}
                />
              ) : activeCard8 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex >= 5 ? (
                <StakeAvaxIDyp
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  staking={
                    expiredPools === false
                      ? stakingarrayStakeAvaxiDypActive[cardIndex - 2]
                      : stakingarrayStakeAvaxiDypExpired[cardIndex - 3]
                  }
                  listType={listType}
                  finalApr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_performancefee
                      : expiredDYPPools[cardIndex]?.apy_performancefee
                  }
                  apr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_percent
                      : expiredDYPPools[cardIndex]?.apy_percent
                  }
                  liquidity={avax_address}
                  expiration_time={expirearrayStakeAvaxiDyp[cardIndex]}
                  other_info={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : expiredDYPPools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : false
                  }
                  fee_s={
                    expiredPools === false
                      ? activePools[cardIndex]?.performancefee
                      : expiredDYPPools[cardIndex]?.performancefee
                  }
                  fee_u={feeUarrayStakeAvaxiDyp[cardIndexavaxiDyp - 3]}
                  lockTime={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                          "No"
                          ? "No Lock"
                          : activePools[cardIndex]?.lock_time?.split(" ")[0]
                        : expiredDYPPools[cardIndex]?.lock_time?.split(
                            " "
                          )[0] === "No"
                        ? "No Lock"
                        : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                      : "No Lock"
                  }
                />
              ) : (
                <></>
              )}
            </>
            <>
              <div
                className="top-picks-container"
                style={{ marginTop: expiredDYPPools.length >= 9 && "25px" }}
              >
                {expiredDYPPools.slice(8, 9).map((pool, index) => (
                  <TopPoolsCard
                    expired={true}
                    display={
                      pool.expired
                        ? pool.expired === "Yes"
                          ? ""
                          : "none"
                        : "none"
                    }
                    key={index}
                    chain={chain}
                    top_pick={pool.top_pick}
                    tokenName={
                      pool.tokenName
                        ? pool.tokenName
                        : pool.pair_name
                        ? pool.pair_name
                        : ""
                    }
                    apr={pool.apy_percent + "%"}
                    tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                    lockTime={
                      pool.lockTime
                        ? pool.lockTime
                        : pool.lock_time
                        ? pool.lock_time
                        : locktimeFarm[index]
                    }
                    tokenLogo={
                      pool.icon
                        ? pool.icon
                        : pool.pair_name === "iDYP"
                        ? "idypius.svg"
                        : "dyplogo.svg"
                    }
                    onShowDetailsClick={() => {
                      setActiveCard(null);
                      setActiveCard2(null);
                      setActiveCard3(null);
                      setActiveCard4(null);
                      setActiveCard5(null);
                      setActiveCard6(null);
                      setActiveCard7(null);
                      setActiveCard8(null);
                      setActiveCard9(topPools[index + 8]);
                      setActiveCard10(null);
                      setActiveCard11(null);
                      setActiveCard12(null);
                      setActiveCardNFT(false);
                      handleCardIndexStake(index + 8);
                      handleCardIndexStake30(index + 8);
                      handleCardIndexStakeiDyp(index + 8);
                      setDetails(index + 8);
                    }}
                    onHideDetailsClick={() => {
                      setActiveCard9(null);
                      setDetails();
                    }}
                    cardType={topList}
                    details={details === index + 8 ? true : false}
                    isNewPool={pool.isNewPool}
                    isStaked={pool.isStaked}
                  />
                ))}
              </div>
              {activeCard9 && topList === "Farming" ? (
                chain === "eth" ? (
                  <StakingNew1
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_result}
                    lp_id={lp_id[cardIndex]}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={true}
                  />
                ) : chain === "bnb" ? (
                  <BscFarming
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_resultbsc}
                    lp_id={LP_IDBNB_Array[cardIndex]}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={true}
                  />
                ) : (
                  <FarmAvax
                    is_wallet_connected={isConnected}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={true}
                    the_graph_result={the_graph_resultavax}
                    lp_id={LP_IDAVAX_Array[cardIndex]}
                    chainId={chainId}
                    coinbase={coinbase}
                  />
                )
              ) : activeCard9 &&
                topList === "Staking" &&
                cardIndex < 3 &&
                chain === "eth" ? (
                <StakeEth
                  staking={stakeArrayStakeNew[cardIndex]}
                  apr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_percent
                      : expiredDYPPools[cardIndex]?.apy_percent
                  }
                  liquidity={eth_address}
                  expiration_time={"14 December 2022"}
                  finalApr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_performancefee
                      : expiredDYPPools[cardIndex]?.apy_performancefee
                  }
                  fee={
                    expiredPools
                      ? expiredPools[cardIndex - 1]?.performancefee
                      : 0
                  }
                  lockTime={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                          "No"
                          ? "No Lock"
                          : activePools[cardIndex]?.lock_time?.split(" ")[0]
                        : expiredDYPPools[cardIndex]?.lock_time?.split(
                            " "
                          )[0] === "No"
                        ? "No Lock"
                        : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                      : "No Lock"
                  }
                  lp_id={LP_IDBNB_Array[cardIndex]}
                  listType={listType}
                  other_info={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : expiredDYPPools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : false
                  }
                  fee={
                    expiredPools === false
                      ? activePools[cardIndex]?.performancefee
                      : expiredDYPPools[cardIndex]?.performancefee
                  }
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  referrer={referrer}
                />
              ) : activeCard9 &&
                cardIndex > 3 &&
                topList === "Staking" &&
                chain === "eth" ? (
                <ConstantStakingiDYP1
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  lp_id={lp_id[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                />
              ) : activeCard9 &&
                cardIndex >= 5 &&
                topList === "Staking" &&
                chain === "bnb" ? (
                <StakeBscIDyp
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultbsc}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  staking={
                    expiredPools === false
                      ? stakearrayStakeBsciDyp2[cardIndex - 2]
                      : stakearrayStakeBsciDyp2Expired[cardIndex - 3]
                  }
                  listType={listType}
                  finalApr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_performancefee
                      : expiredDYPPools[cardIndex]?.apy_performancefee
                  }
                  apr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_percent
                      : expiredDYPPools[cardIndex]?.apy_percent
                  }
                  liquidity={wbsc_address}
                  expiration_time={
                    expiredPools === false
                      ? expirearrayStakeBsciDyp2[cardIndex - 2]
                      : expirearrayStakeBsciDyp2Expired[cardIndex - 3]
                  }
                  other_info={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : expiredDYPPools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : false
                  }
                  fee_s={
                    expiredPools === false
                      ? activePools[cardIndex]?.performancefee
                      : expiredDYPPools[cardIndex]?.performancefee
                  }
                  fee_u={0}
                  lockTime={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                          "No"
                          ? "No Lock"
                          : parseInt(
                              activePools[cardIndex]?.lock_time?.split(" ")[0]
                            )
                        : expiredDYPPools[cardIndex]?.lock_time?.split(
                            " "
                          )[0] === "No"
                        ? "No Lock"
                        : parseInt(
                            expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                          )
                      : "No Lock"
                  }
                />
              ) : activeCard9 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex < 2 ? (
                <StakeAvax
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  coinbase={coinbase}
                  referrer={referrer}
                />
              ) : activeCard9 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex >= 2 &&
                cardIndex < 4 ? (
                <StakeAvax30
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  coinbase={coinbase}
                  referrer={referrer}
                />
              ) : activeCard9 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex === 4 ? (
                <StakeAvaxDai
                  staking={window.constant_stakingdaiavax}
                  apr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_percent
                      : expiredDYPPools[cardIndex]?.apy_percent
                  }
                  liquidity={avax_address}
                  expiration_time={"Expired"}
                  finalApr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_performancefee
                      : expiredDYPPools[cardIndex]?.apy_performancefee
                  }
                  fee={
                    expiredPools
                      ? expiredPools[cardIndex - 1]?.performancefee
                      : 0
                  }
                  lockTime={
                    cardIndex !== undefined
                      ? expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                        ? "No Lock"
                        : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                      : "No Lock"
                  }
                  listType={listType}
                  other_info={true}
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  referrer={referrer}
                />
              ) : activeCard9 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex >= 5 ? (
                <StakeAvaxIDyp
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  staking={
                    expiredPools === false
                      ? stakingarrayStakeAvaxiDypActive[cardIndex - 2]
                      : stakingarrayStakeAvaxiDypExpired[cardIndex - 3]
                  }
                  listType={listType}
                  finalApr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_performancefee
                      : expiredDYPPools[cardIndex]?.apy_performancefee
                  }
                  apr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_percent
                      : expiredDYPPools[cardIndex]?.apy_percent
                  }
                  liquidity={avax_address}
                  expiration_time={expirearrayStakeAvaxiDyp[cardIndex]}
                  other_info={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : expiredDYPPools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : false
                  }
                  fee_s={
                    expiredPools === false
                      ? activePools[cardIndex]?.performancefee
                      : expiredDYPPools[cardIndex]?.performancefee
                  }
                  fee_u={feeUarrayStakeAvaxiDyp[cardIndexavaxiDyp - 3]}
                  lockTime={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                          "No"
                          ? "No Lock"
                          : activePools[cardIndex]?.lock_time?.split(" ")[0]
                        : expiredDYPPools[cardIndex]?.lock_time?.split(
                            " "
                          )[0] === "No"
                        ? "No Lock"
                        : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                      : "No Lock"
                  }
                />
              ) : (
                <></>
              )}
            </>
            <>
              <div
                className="top-picks-container"
                style={{ marginTop: expiredDYPPools.length > 9 && "25px" }}
              >
                {expiredDYPPools.slice(9, 10).map((pool, index) => (
                  <TopPoolsCard
                    expired={true}
                    display={
                      pool.expired
                        ? pool.expired === "Yes"
                          ? ""
                          : "none"
                        : "none"
                    }
                    key={index}
                    chain={chain}
                    top_pick={pool.top_pick}
                    tokenName={
                      pool.tokenName
                        ? pool.tokenName
                        : pool.pair_name
                        ? pool.pair_name
                        : ""
                    }
                    apr={pool.apy_percent + "%"}
                    tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                    lockTime={
                      pool.lockTime
                        ? pool.lockTime
                        : pool.lock_time
                        ? pool.lock_time
                        : locktimeFarm[index]
                    }
                    tokenLogo={
                      pool.icon
                        ? pool.icon
                        : pool.pair_name === "iDYP"
                        ? "idypius.svg"
                        : "dyplogo.svg"
                    }
                    onShowDetailsClick={() => {
                      setActiveCard(null);
                      setActiveCard2(null);
                      setActiveCard3(null);
                      setActiveCard4(null);
                      setActiveCard5(null);
                      setActiveCard6(null);
                      setActiveCard7(null);
                      setActiveCard8(null);
                      setActiveCard9(null);
                      setActiveCard10(topPools[index + 9]);
                      setActiveCard11(null);
                      setActiveCard12(null);
                      setActiveCardNFT(false);
                      handleCardIndexStake(index + 9);
                      handleCardIndexStake30(index + 9);
                      handleCardIndexStakeiDyp(index + 9);
                      setDetails(index + 9);
                    }}
                    onHideDetailsClick={() => {
                      setActiveCard10(null);
                      setDetails();
                    }}
                    cardType={topList}
                    details={details === index + 9 ? true : false}
                    isNewPool={pool.isNewPool}
                    isStaked={pool.isStaked}
                  />
                ))}
              </div>
              {activeCard10 && topList === "Farming" ? (
                chain === "eth" ? (
                  <StakingNew1
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_result}
                    lp_id={lp_id[cardIndex]}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={true}
                  />
                ) : chain === "bnb" ? (
                  <BscFarming
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_resultbsc}
                    lp_id={LP_IDBNB_Array[cardIndex]}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={true}
                  />
                ) : (
                  <FarmAvax
                    is_wallet_connected={isConnected}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={true}
                    the_graph_result={the_graph_resultavax}
                    lp_id={LP_IDAVAX_Array[cardIndex]}
                    chainId={chainId}
                    coinbase={coinbase}
                  />
                )
              ) : activeCard10 &&
                topList === "Staking" &&
                cardIndex < 3 &&
                chain === "eth" ? (
                <StakeEth
                  staking={stakeArrayStakeNew[cardIndex]}
                  apr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_percent
                      : expiredDYPPools[cardIndex]?.apy_percent
                  }
                  liquidity={eth_address}
                  expiration_time={"14 December 2022"}
                  finalApr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_performancefee
                      : expiredDYPPools[cardIndex]?.apy_performancefee
                  }
                  fee={
                    expiredPools
                      ? expiredPools[cardIndex - 1]?.performancefee
                      : 0
                  }
                  lockTime={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                          "No"
                          ? "No Lock"
                          : activePools[cardIndex]?.lock_time?.split(" ")[0]
                        : expiredDYPPools[cardIndex]?.lock_time?.split(
                            " "
                          )[0] === "No"
                        ? "No Lock"
                        : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                      : "No Lock"
                  }
                  lp_id={LP_IDBNB_Array[cardIndex]}
                  listType={listType}
                  other_info={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : expiredDYPPools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : false
                  }
                  fee={
                    expiredPools === false
                      ? activePools[cardIndex]?.performancefee
                      : expiredDYPPools[cardIndex]?.performancefee
                  }
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  referrer={referrer}
                />
              ) : activeCard10 &&
                cardIndex > 3 &&
                topList === "Staking" &&
                chain === "eth" ? (
                <ConstantStakingiDYP1
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  lp_id={lp_id[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                />
              ) : activeCard10 &&
                cardIndex >= 5 &&
                topList === "Staking" &&
                chain === "bnb" ? (
                <StakeBscIDyp
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultbsc}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  staking={
                    expiredPools === false
                      ? stakearrayStakeBsciDyp2[cardIndex - 2]
                      : stakearrayStakeBsciDyp2Expired[cardIndex - 3]
                  }
                  listType={listType}
                  finalApr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_performancefee
                      : expiredDYPPools[cardIndex]?.apy_performancefee
                  }
                  apr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_percent
                      : expiredDYPPools[cardIndex]?.apy_percent
                  }
                  liquidity={wbsc_address}
                  expiration_time={
                    expiredPools === false
                      ? expirearrayStakeBsciDyp2[cardIndex - 2]
                      : expirearrayStakeBsciDyp2Expired[cardIndex - 3]
                  }
                  other_info={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : expiredDYPPools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : false
                  }
                  fee_s={
                    expiredPools === false
                      ? activePools[cardIndex]?.performancefee
                      : expiredDYPPools[cardIndex]?.performancefee
                  }
                  fee_u={0}
                  lockTime={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                          "No"
                          ? "No Lock"
                          : parseInt(
                              activePools[cardIndex]?.lock_time?.split(" ")[0]
                            )
                        : expiredDYPPools[cardIndex]?.lock_time?.split(
                            " "
                          )[0] === "No"
                        ? "No Lock"
                        : parseInt(
                            expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                          )
                      : "No Lock"
                  }
                />
              ) : activeCard10 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex < 2 ? (
                <StakeAvax
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  coinbase={coinbase}
                  referrer={referrer}
                />
              ) : activeCard10 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex >= 2 &&
                cardIndex < 4 ? (
                <StakeAvax30
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  coinbase={coinbase}
                  referrer={referrer}
                />
              ) : activeCard10 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex === 4 ? (
                <StakeAvaxDai
                  staking={window.constant_stakingdaiavax}
                  apr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_percent
                      : expiredDYPPools[cardIndex]?.apy_percent
                  }
                  liquidity={avax_address}
                  expiration_time={"Expired"}
                  finalApr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_performancefee
                      : expiredDYPPools[cardIndex]?.apy_performancefee
                  }
                  fee={
                    expiredPools
                      ? expiredPools[cardIndex - 1]?.performancefee
                      : 0
                  }
                  lockTime={
                    cardIndex !== undefined
                      ? expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                        ? "No Lock"
                        : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                      : "No Lock"
                  }
                  listType={listType}
                  other_info={true}
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  referrer={referrer}
                />
              ) : activeCard10 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex >= 5 ? (
                <StakeAvaxIDyp
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  staking={
                    expiredPools === false
                      ? stakingarrayStakeAvaxiDypActive[cardIndex - 2]
                      : stakingarrayStakeAvaxiDypExpired[cardIndex - 3]
                  }
                  listType={listType}
                  finalApr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_performancefee
                      : expiredDYPPools[cardIndex]?.apy_performancefee
                  }
                  apr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_percent
                      : expiredDYPPools[cardIndex]?.apy_percent
                  }
                  liquidity={avax_address}
                  expiration_time={expirearrayStakeAvaxiDyp[cardIndex]}
                  other_info={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : expiredDYPPools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : false
                  }
                  fee_s={
                    expiredPools === false
                      ? activePools[cardIndex]?.performancefee
                      : expiredDYPPools[cardIndex]?.performancefee
                  }
                  fee_u={feeUarrayStakeAvaxiDyp[cardIndexavaxiDyp - 3]}
                  lockTime={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                          "No"
                          ? "No Lock"
                          : activePools[cardIndex]?.lock_time?.split(" ")[0]
                        : expiredDYPPools[cardIndex]?.lock_time?.split(
                            " "
                          )[0] === "No"
                        ? "No Lock"
                        : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                      : "No Lock"
                  }
                />
              ) : (
                <></>
              )}
            </>
            <>
              <div
                className="top-picks-container"
                style={{ marginTop: expiredDYPPools.length > 9 && "25px" }}
              >
                {expiredDYPPools.slice(10, 11).map((pool, index) => (
                  <TopPoolsCard
                    expired={true}
                    display={
                      pool.expired
                        ? pool.expired === "Yes"
                          ? ""
                          : "none"
                        : "none"
                    }
                    key={index}
                    chain={chain}
                    top_pick={pool.top_pick}
                    tokenName={
                      pool.tokenName
                        ? pool.tokenName
                        : pool.pair_name
                        ? pool.pair_name
                        : ""
                    }
                    apr={pool.apy_percent + "%"}
                    tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                    lockTime={
                      pool.lockTime
                        ? pool.lockTime
                        : pool.lock_time
                        ? pool.lock_time
                        : locktimeFarm[index]
                    }
                    tokenLogo={
                      pool.icon
                        ? pool.icon
                        : pool.pair_name === "iDYP"
                        ? "idypius.svg"
                        : "dyplogo.svg"
                    }
                    onShowDetailsClick={() => {
                      setActiveCard(null);
                      setActiveCard2(null);
                      setActiveCard3(null);
                      setActiveCard4(null);
                      setActiveCard5(null);
                      setActiveCard6(null);
                      setActiveCard7(null);
                      setActiveCard8(null);
                      setActiveCard9(null);
                      setActiveCard10(null);
                      setActiveCard11(topPools[index + 10]);
                      setActiveCard12(null);
                      setActiveCardNFT(false);
                      handleCardIndexStake(index + 10);
                      handleCardIndexStake30(index + 10);
                      handleCardIndexStakeiDyp(index + 10);
                      setDetails(index + 10);
                    }}
                    onHideDetailsClick={() => {
                      setActiveCard11(null);
                      setDetails();
                    }}
                    cardType={topList}
                    details={details === index + 10 ? true : false}
                    isNewPool={pool.isNewPool}
                    isStaked={pool.isStaked}
                  />
                ))}
              </div>
              {activeCard11 && topList === "Farming" ? (
                chain === "eth" ? (
                  <StakingNew1
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_result}
                    lp_id={lp_id[cardIndex]}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={true}
                  />
                ) : chain === "bnb" ? (
                  <BscFarming
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_resultbsc}
                    lp_id={LP_IDBNB_Array[cardIndex]}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={true}
                  />
                ) : (
                  <FarmAvax
                    is_wallet_connected={isConnected}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={true}
                    the_graph_result={the_graph_resultavax}
                    lp_id={LP_IDAVAX_Array[cardIndex]}
                    chainId={chainId}
                    coinbase={coinbase}
                  />
                )
              ) : activeCard11 &&
                topList === "Staking" &&
                cardIndex < 3 &&
                chain === "eth" ? (
                <StakeEth
                  staking={stakeArrayStakeNew[cardIndex]}
                  apr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_percent
                      : expiredDYPPools[cardIndex]?.apy_percent
                  }
                  liquidity={eth_address}
                  expiration_time={"14 December 2022"}
                  finalApr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_performancefee
                      : expiredDYPPools[cardIndex]?.apy_performancefee
                  }
                  fee={
                    expiredPools
                      ? expiredPools[cardIndex - 1]?.performancefee
                      : 0
                  }
                  lockTime={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                          "No"
                          ? "No Lock"
                          : activePools[cardIndex]?.lock_time?.split(" ")[0]
                        : expiredDYPPools[cardIndex]?.lock_time?.split(
                            " "
                          )[0] === "No"
                        ? "No Lock"
                        : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                      : "No Lock"
                  }
                  lp_id={LP_IDBNB_Array[cardIndex]}
                  listType={listType}
                  other_info={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : expiredDYPPools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : false
                  }
                  fee={
                    expiredPools === false
                      ? activePools[cardIndex]?.performancefee
                      : expiredDYPPools[cardIndex]?.performancefee
                  }
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  referrer={referrer}
                />
              ) : activeCard11 &&
                cardIndex > 3 &&
                topList === "Staking" &&
                chain === "eth" ? (
                <ConstantStakingiDYP1
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  lp_id={lp_id[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                />
              ) : activeCard11 &&
                cardIndex >= 5 &&
                topList === "Staking" &&
                chain === "bnb" ? (
                <StakeBscIDyp
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultbsc}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  staking={
                    expiredPools === false
                      ? stakearrayStakeBsciDyp2[cardIndex - 2]
                      : stakearrayStakeBsciDyp2Expired[cardIndex - 3]
                  }
                  listType={listType}
                  finalApr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_performancefee
                      : expiredDYPPools[cardIndex]?.apy_performancefee
                  }
                  apr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_percent
                      : expiredDYPPools[cardIndex]?.apy_percent
                  }
                  liquidity={wbsc_address}
                  expiration_time={
                    expiredPools === false
                      ? expirearrayStakeBsciDyp2[cardIndex - 2]
                      : expirearrayStakeBsciDyp2Expired[cardIndex - 3]
                  }
                  other_info={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : expiredDYPPools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : false
                  }
                  fee_s={
                    expiredPools === false
                      ? activePools[cardIndex]?.performancefee
                      : expiredDYPPools[cardIndex]?.performancefee
                  }
                  fee_u={0}
                  lockTime={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                          "No"
                          ? "No Lock"
                          : parseInt(
                              activePools[cardIndex]?.lock_time?.split(" ")[0]
                            )
                        : expiredDYPPools[cardIndex]?.lock_time?.split(
                            " "
                          )[0] === "No"
                        ? "No Lock"
                        : parseInt(
                            expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                          )
                      : "No Lock"
                  }
                />
              ) : activeCard11 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex < 2 ? (
                <StakeAvax
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  coinbase={coinbase}
                  referrer={referrer}
                />
              ) : activeCard11 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex >= 2 &&
                cardIndex < 4 ? (
                <StakeAvax30
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  coinbase={coinbase}
                  referrer={referrer}
                />
              ) : activeCard11 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex === 4 ? (
                <StakeAvaxDai
                  staking={window.constant_stakingdaiavax}
                  apr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_percent
                      : expiredDYPPools[cardIndex]?.apy_percent
                  }
                  liquidity={avax_address}
                  expiration_time={"Expired"}
                  finalApr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_performancefee
                      : expiredDYPPools[cardIndex]?.apy_performancefee
                  }
                  fee={
                    expiredPools
                      ? expiredPools[cardIndex - 1]?.performancefee
                      : 0
                  }
                  lockTime={
                    cardIndex !== undefined
                      ? expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                        ? "No Lock"
                        : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                      : "No Lock"
                  }
                  listType={listType}
                  other_info={true}
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  referrer={referrer}
                />
              ) : activeCard11 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex >= 5 ? (
                <StakeAvaxIDyp
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  staking={
                    expiredPools === false
                      ? stakingarrayStakeAvaxiDypActive[cardIndex - 2]
                      : stakingarrayStakeAvaxiDypExpired[cardIndex - 3]
                  }
                  listType={listType}
                  finalApr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_performancefee
                      : expiredDYPPools[cardIndex]?.apy_performancefee
                  }
                  apr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_percent
                      : expiredDYPPools[cardIndex]?.apy_percent
                  }
                  liquidity={avax_address}
                  expiration_time={expirearrayStakeAvaxiDyp[cardIndex]}
                  other_info={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : expiredDYPPools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : false
                  }
                  fee_s={
                    expiredPools === false
                      ? activePools[cardIndex]?.performancefee
                      : expiredDYPPools[cardIndex]?.performancefee
                  }
                  fee_u={feeUarrayStakeAvaxiDyp[cardIndexavaxiDyp - 3]}
                  lockTime={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                          "No"
                          ? "No Lock"
                          : activePools[cardIndex]?.lock_time?.split(" ")[0]
                        : expiredDYPPools[cardIndex]?.lock_time?.split(
                            " "
                          )[0] === "No"
                        ? "No Lock"
                        : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                      : "No Lock"
                  }
                />
              ) : (
                <></>
              )}
            </>
            <>
              <div
                className="top-picks-container"
                style={{ marginTop: expiredDYPPools.length > 9 && "25px" }}
              >
                {expiredDYPPools
                  .slice(11, expiredDYPPools.length)
                  .map((pool, index) => (
                    <TopPoolsCard
                      display={
                        pool.expired
                          ? pool.expired === "Yes"
                            ? ""
                            : "none"
                          : "none"
                      }
                      key={index}
                      chain={chain}
                      top_pick={pool.top_pick}
                      tokenName={
                        pool.tokenName
                          ? pool.tokenName
                          : pool.pair_name
                          ? pool.pair_name
                          : ""
                      }
                      apr={pool.apy_percent + "%"}
                      tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                      lockTime={
                        pool.lockTime
                          ? pool.lockTime
                          : pool.lock_time
                          ? pool.lock_time
                          : locktimeFarm[index]
                      }
                      expired={true}
                      tokenLogo={
                        pool.icon
                          ? pool.icon
                          : pool.pair_name === "iDYP"
                          ? "idypius.svg"
                          : "dyplogo.svg"
                      }
                      onShowDetailsClick={() => {
                        setActiveCard(null);
                        setActiveCard2(null);
                        setActiveCard3(null);
                        setActiveCard4(null);
                        setActiveCard5(null);
                        setActiveCard6(null);
                        setActiveCard7(null);
                        setActiveCard8(null);
                        setActiveCard9(null);
                        setActiveCard10(null);
                        setActiveCard11(null);
                        setActiveCard12(topPools[index + 11]);
                        setActiveCardNFT(false);
                        handleCardIndexStake(index + 11);
                        handleCardIndexStake30(index + 11);
                        handleCardIndexStakeiDyp(index + 11);
                        setDetails(index + 11);
                      }}
                      onHideDetailsClick={() => {
                        setActiveCard12(null);
                        setDetails();
                      }}
                      cardType={topList}
                      details={details === index + 11 ? true : false}
                      isNewPool={pool.isNewPool}
                      isStaked={pool.isStaked}
                    />
                  ))}
              </div>
              {activeCard12 && topList === "Farming" ? (
                chain === "eth" ? (
                  <StakingNew1
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_result}
                    lp_id={lp_id[cardIndex]}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={true}
                  />
                ) : chain === "bnb" ? (
                  <BscFarming
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_resultbsc}
                    lp_id={LP_IDBNB_Array[cardIndex]}
                    chainId={chainId}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={true}
                  />
                ) : (
                  <FarmAvax
                    is_wallet_connected={isConnected}
                    handleConnection={handleConnection}
                    handleSwitchNetwork={handleSwitchNetwork}
                    expired={true}
                    the_graph_result={the_graph_resultavax}
                    lp_id={LP_IDAVAX_Array[cardIndex]}
                    chainId={chainId}
                    coinbase={coinbase}
                  />
                )
              ) : activeCard12 &&
                topList === "Staking" &&
                cardIndex < 3 &&
                chain === "eth" ? (
                <StakeEth
                  staking={stakeArrayStakeNew[cardIndex]}
                  apr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_percent
                      : expiredDYPPools[cardIndex]?.apy_percent
                  }
                  liquidity={eth_address}
                  expiration_time={"14 December 2022"}
                  finalApr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_performancefee
                      : expiredDYPPools[cardIndex]?.apy_performancefee
                  }
                  fee={
                    expiredPools
                      ? expiredPools[cardIndex - 1]?.performancefee
                      : 0
                  }
                  lockTime={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                          "No"
                          ? "No Lock"
                          : activePools[cardIndex]?.lock_time?.split(" ")[0]
                        : expiredDYPPools[cardIndex]?.lock_time?.split(
                            " "
                          )[0] === "No"
                        ? "No Lock"
                        : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                      : "No Lock"
                  }
                  lp_id={LP_IDBNB_Array[cardIndex]}
                  listType={listType}
                  other_info={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : expiredDYPPools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : false
                  }
                  fee={
                    expiredPools === false
                      ? activePools[cardIndex]?.performancefee
                      : expiredDYPPools[cardIndex]?.performancefee
                  }
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  referrer={referrer}
                />
              ) : activeCard12 &&
                cardIndex > 3 &&
                topList === "Staking" &&
                chain === "eth" ? (
                <ConstantStakingiDYP1
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  lp_id={lp_id[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                />
              ) : activeCard12 &&
                cardIndex >= 5 &&
                topList === "Staking" &&
                chain === "bnb" ? (
                <StakeBscIDyp
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultbsc}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  staking={
                    expiredPools === false
                      ? stakearrayStakeBsciDyp2[cardIndex - 2]
                      : stakearrayStakeBsciDyp2Expired[cardIndex - 3]
                  }
                  listType={listType}
                  finalApr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_performancefee
                      : expiredDYPPools[cardIndex]?.apy_performancefee
                  }
                  apr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_percent
                      : expiredDYPPools[cardIndex]?.apy_percent
                  }
                  liquidity={wbsc_address}
                  expiration_time={
                    expiredPools === false
                      ? expirearrayStakeBsciDyp2[cardIndex - 2]
                      : expirearrayStakeBsciDyp2Expired[cardIndex - 3]
                  }
                  other_info={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : expiredDYPPools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : false
                  }
                  fee_s={
                    expiredPools === false
                      ? activePools[cardIndex]?.performancefee
                      : expiredDYPPools[cardIndex]?.performancefee
                  }
                  fee_u={0}
                  lockTime={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                          "No"
                          ? "No Lock"
                          : parseInt(
                              activePools[cardIndex]?.lock_time?.split(" ")[0]
                            )
                        : expiredDYPPools[cardIndex]?.lock_time?.split(
                            " "
                          )[0] === "No"
                        ? "No Lock"
                        : parseInt(
                            expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                          )
                      : "No Lock"
                  }
                />
              ) : activeCard12 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex < 2 ? (
                <StakeAvax
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  coinbase={coinbase}
                  referrer={referrer}
                />
              ) : activeCard12 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex >= 2 &&
                cardIndex < 4 ? (
                <StakeAvax30
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  coinbase={coinbase}
                  referrer={referrer}
                />
              ) : activeCard12 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex === 4 ? (
                <StakeAvaxDai
                  staking={window.constant_stakingdaiavax}
                  apr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_percent
                      : expiredDYPPools[cardIndex]?.apy_percent
                  }
                  liquidity={avax_address}
                  expiration_time={"Expired"}
                  finalApr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_performancefee
                      : expiredDYPPools[cardIndex]?.apy_performancefee
                  }
                  fee={
                    expiredPools
                      ? expiredPools[cardIndex - 1]?.performancefee
                      : 0
                  }
                  lockTime={
                    cardIndex !== undefined
                      ? expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0] ===
                        "No"
                        ? "No Lock"
                        : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                      : "No Lock"
                  }
                  listType={listType}
                  other_info={true}
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  referrer={referrer}
                />
              ) : activeCard12 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex >= 5 ? (
                <StakeAvaxIDyp
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  handleSwitchNetwork={handleSwitchNetwork}
                  expired={true}
                  staking={
                    expiredPools === false
                      ? stakingarrayStakeAvaxiDypActive[cardIndex - 2]
                      : stakingarrayStakeAvaxiDypExpired[cardIndex - 3]
                  }
                  listType={listType}
                  finalApr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_performancefee
                      : expiredDYPPools[cardIndex]?.apy_performancefee
                  }
                  apr={
                    expiredPools === false
                      ? activePools[cardIndex]?.apy_percent
                      : expiredDYPPools[cardIndex]?.apy_percent
                  }
                  liquidity={avax_address}
                  expiration_time={expirearrayStakeAvaxiDyp[cardIndex]}
                  other_info={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.expired === "Yes"
                          ? true
                          : false
                        : expiredDYPPools[cardIndex]?.expired === "Yes"
                        ? true
                        : false
                      : false
                  }
                  fee_s={
                    expiredPools === false
                      ? activePools[cardIndex]?.performancefee
                      : expiredDYPPools[cardIndex]?.performancefee
                  }
                  fee_u={feeUarrayStakeAvaxiDyp[cardIndexavaxiDyp - 3]}
                  lockTime={
                    cardIndex !== undefined
                      ? expiredPools === false
                        ? activePools[cardIndex]?.lock_time?.split(" ")[0] ===
                          "No"
                          ? "No Lock"
                          : activePools[cardIndex]?.lock_time?.split(" ")[0]
                        : expiredDYPPools[cardIndex]?.lock_time?.split(
                            " "
                          )[0] === "No"
                        ? "No Lock"
                        : expiredDYPPools[cardIndex]?.lock_time?.split(" ")[0]
                      : "No Lock"
                  }
                />
              ) : (
                <></>
              )}
            </>
          </div>
        )
      ) : (
        <div
          className={`${
            expiredPools === true
              ? "poolscardwrapperexpired d-flex flex-column gap-1"
              : "list-pools-container"
          } px-0`}
        >
          {expiredDYPPools.map((pool, index) => (
            <TopPoolsListCard
              key={index}
              expiredPools={expiredDYPPools}
              expired={true}
              chain={chain}
              top_pick={pool.top_pick}
              tokenName={
                pool.tokenName
                  ? pool.tokenName
                  : pool.pair_name
                  ? pool.pair_name
                  : ""
              }
              apr={pool.apy_percent + "%"}
              tvl={"$" + getFormattedNumber(pool.tvl_usd)}
              lockTime={
                pool.lockTime
                  ? pool.lockTime
                  : pool.lock_time
                  ? pool.lock_time
                  : locktimeFarm[index]
              }
              cardType={topList}
              tokenLogo={
                pool.icon
                  ? pool.icon
                  : pool.pair_name === "iDYP"
                  ? "idypius.svg"
                  : "dyplogo.svg"
              }
              listType={listType}
              onShowDetailsClick={() => {
                setShowDetails(!showDetails);
                setActiveCard(topPools[index]);
                handleCardIndexStake(index);
                handleCardIndexStake30(index);
                handleCardIndexStakeiDyp(index);
              }}
              onHideDetailsClick={() => {
                setActiveCard(null);
              }}
              showDetails={showDetails}
              topList={topList}
              cardIndex={index + 1}
              chainId={chainId}
              handleConnection={handleConnection}
              handleSwitchNetwork={handleSwitchNetwork}
              coinbase={coinbase}
              referrer={referrer}
              lp_id={lp_id[cardIndex]}
              the_graph_result={the_graph_result}
              the_graph_resultbsc={the_graph_resultbsc}
              isConnected={isConnected}
              the_graph_resultavax={the_graph_resultavax}
              display={
                pool.expired
                  ? pool.expired === "Yes"
                    ? "flex"
                    : "none"
                  : "none"
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EarnTopPicks;

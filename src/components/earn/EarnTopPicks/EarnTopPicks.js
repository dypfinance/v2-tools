import React, { useEffect, useState } from "react";
import TopPoolsCard from "../../top-pools-card/TopPoolsCard";
import CawsCard from "../../top-pools-card/CawsCard";
import TopPoolsListCard from "../../top-pools-card/TopPoolsListCard";
import axios from "axios";
import getFormattedNumber from "../../../functions/getFormattedNumber2";
import initStakingNew from "../../FARMINNG/staking-new-front";
import initBuybackStakingNew from "../../FARMINNG/buy-back-staking-new-front";
import initConstantStakingNew from "../../FARMINNG/constant-staking-new-front";
import initConstantStakingiDYP from "../../FARMINNG/constant-staking-idyp-new-front";
import initVaultNew from "../../FARMINNG/vault-new";
import initFarmAvax from "../../FARMINNG/farmAvax";
import stakeAvax from "../../FARMINNG/stakeAvax";
import avaxBuyback from "../../FARMINNG/avaxBuyback";
import stakeAvax30 from "../../FARMINNG/stakeAvax30";
import stakeAvax3 from "../../FARMINNG/stakeAvax3";
import stakeAvaxiDyp from "../../FARMINNG/stakeAvaxiDyp";
import CawsDetails from "../../FARMINNG/caws";
import { FadeLoader } from "react-spinners";
import useWindowSize from "../../../functions/useWindowSize";
import initBscBuyback from "../../FARMINNG/bscBuyback";
import initBscFarming from "../../FARMINNG/bscFarming";
import initbscConstantStaking from "../../FARMINNG/bscConstantStake";
import initbscConstantStaking2 from "../../FARMINNG/bscConstantStake2";
import initbscConstantStakingDai from "../../FARMINNG/bscConstantStakeDai";
import initbscConstantStakingiDyp from "../../FARMINNG/bscConstantStakeiDyp";

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
}) => {
  const stake = [
    {
      icon: "dyplogo.svg",
      top_pick: false,
      tokenName: "DYP",
      apy: "1.08",
      tvl_usd: "48543.20",
      lockTime: "No lock",
      isNewPool: false,
      isStaked: false,
    },
    {
      icon: "dyplogo.svg",
      top_pick: false,
      tokenName: "DYP",
      apy: "1.08",
      tvl_usd: "48543.20",
      lockTime: "90 Days",
      isNewPool: false,
      isStaked: false,
    },
    {
      icon: "idypius.svg",
      top_pick: false,
      tokenName: "iDYP",
      apy: "1.08",
      tvl_usd: "48543.20",
      lockTime: "No lock",
      isNewPool: false,
      isStaked: false,
    },
    {
      icon: "idypius.svg",
      top_pick: false,
      tokenName: "iDYP",
      apy: "1.08",
      tvl_usd: "48543.20",
      lockTime: "90 days",
      isNewPool: false,
      isStaked: false,
    },
    {
      icon: "idypius.svg",
      top_pick: false,
      tokenName: "iDYP",
      apy: "1.08",
      tvl_usd: "48543.20",
      lockTime: "No lock",
      isNewPool: false,
      isStaked: false,
    },
    {
      icon: "idypius.svg",
      top_pick: false,
      tokenName: "iDYP",
      apy: "1.08",
      tvl_usd: "48543.20",
      lockTime: "90 days",
      isNewPool: false,
      isStaked: false,
    },
  ];

  const stakeavax = [
    {
      icon: "dyplogo.svg",
      top_pick: true,
      tokenName: "DYP",
      apy: "1.08",
      tvl_usd: "48543.20",
      lockTime: "180 Days",
      isNewPool: false,
      isStaked: false,
    },
    {
      icon: "dyplogo.svg",
      top_pick: false,
      tokenName: "DYP",
      apy: "1.08",
      tvl_usd: "48543.20",
      lockTime: "30 Days",
      isNewPool: false,
      isStaked: false,
    },
    {
      icon: "dyplogo.svg",
      top_pick: false,
      tokenName: "DYP",
      apy: "1.08",
      tvl_usd: "48543.20",
      lockTime: "No lock",
      isNewPool: false,
      isStaked: false,
    },
    {
      icon: "dyplogo.svg",
      top_pick: false,
      tokenName: "DYP",
      apy: "1.08",
      tvl_usd: "48543.20",
      lockTime: "90 Days",
      isNewPool: false,
      isStaked: false,
    },
    {
      icon: "dyplogo.svg",
      top_pick: false,
      tokenName: "DYP",
      apy: "1.08",
      tvl_usd: "48543.20",
      lockTime: "90 Days",
      isNewPool: false,
      isStaked: false,
    },
    {
      icon: "idypius.svg",
      top_pick: false,
      tokenName: "iDYP",
      apy: "1.08",
      tvl_usd: "48543.20",
      lockTime: "No lock",
      isNewPool: false,
      isStaked: false,
    },
    {
      icon: "idypius.svg",
      top_pick: false,
      tokenName: "iDYP",
      apy: "1.08",
      tvl_usd: "48543.20",
      lockTime: "90 Days",
      isNewPool: false,
      isStaked: false,
    },
    {
      icon: "idypius.svg",
      top_pick: false,
      tokenName: "iDYP",
      apy: "1.08",
      tvl_usd: "48543.20",
      lockTime: "No lock",
      isNewPool: false,
      isStaked: false,
    },
    {
      icon: "idypius.svg",
      top_pick: false,
      tokenName: "iDYP",
      apy: "1.08",
      tvl_usd: "48543.20",
      lockTime: "90 Days",
      isNewPool: false,
      isStaked: false,
    },
  ];

  const stakebsc = [
    {
      icon: "dyplogo.svg",
      top_pick: true,
      tokenName: "DYP",
      apy: "30",
      tvl_usd: "48543.20",
      lockTime: "180 Days",
      isNewPool: true,
      isStaked: false,
    },
    {  
      icon: "dyplogo.svg",
      top_pick: false,
      tokenName: "DYP",
      apy: "1.08",
      tvl_usd: "48543.204",
      lockTime: "30 Days",
      isNewPool: true,
      isStaked: false,
    },
    {
      icon: "dyplogo.svg",
      top_pick: false,
      tokenName: "DYP",
      apy: "0.20",
      tvl_usd: "48543.20",
      lockTime: "No Lock",
      isNewPool: false,
      isStaked: false,
    },
    {
      icon: "dyplogo.svg",
      top_pick: false,
      tokenName: "DYP",
      apy: "20",
      tvl_usd: "48543.20",
      lockTime: "90 Days",
      isNewPool: false,
      isStaked: false,
    },
    {
      icon: "dyplogo.svg",
      top_pick: false,
      tokenName: "DYP",
      apy: "1.08",
      tvl_usd: "48543.20",
      lockTime: "90 Days",
      isNewPool: false,
      isStaked: false,
    },
    {
      icon: "idypius.svg",
      top_pick: false,
      tokenName: "iDYP",
      apy: "15",
      tvl_usd: "48543.20",
      lockTime: "No lock",
      isNewPool: true,
      isStaked: false,
    },
    {
      icon: "idypius.svg",
      top_pick: false,
      tokenName: "iDYP",
      apy: "1.08",
      tvl_usd: "48543.20",
      lockTime: "90 Days",
      isNewPool: true,
      isStaked: false,
    },
    {
      icon: "idypius.svg",
      top_pick: false,
      tokenName: "iDYP",
      apy: "1.08",
      tvl_usd: "48543.20",
      lockTime: "No lock",
      isNewPool: false,
      isStaked: false,
    },
    {
      icon: "idypius.svg",
      top_pick: false,
      tokenName: "iDYP",
      apy: "1.08",
      tvl_usd: "48543.20",
      lockTime: "90 Days",
      isNewPool: false,
      isStaked: false,
    },
  ];

  const buyback = [
    {
      top_pick: true,
      tokenName: "DYP",
      apy: "1.08",
      tvl_usd: "48543.20",
      lockTime: "No lock",
    },
    {
      top_pick: false,
      tokenName: "AVAX",
      apy: "1.08",
      tvl_usd: "48543.20",
      lockTime: "90 Days",
    },
  ];

  const vault = [
    {
      icon: "ethereum.svg",
      tokenName: "ETH",
      apy: "3 - 13",
      tvl_usd: ``,
      lockTime: "No lock",
      top_pick: true,
      new_badge: false,
      link: "https://vault.dyp.finance/vault-weth",
    },
    {
      icon: "wbtc.svg",
      tokenName: "WBTC",
      apy: "3 - 13",
      tvl_usd: ``,
      lockTime: "No lock",
      link: "https://vault.dyp.finance/vault-wbtc",
    },
    {
      icon: "usdc.svg",
      tokenName: "USDC",
      apy: "8 - 22",
      tvl_usd: ``,
      lockTime: "No lock",
      new_badge: false,
      top_pick: false,
      link: "https://vault.dyp.finance/vault-usdc",
    },
    {
      icon: "usdt.svg",
      tokenName: "USDT",
      apy: "9 - 23",
      tvl_usd: ``,
      lockTime: "No lock",
      new_badge: false,
      top_pick: false,
      link: "https://vault.dyp.finance/vault-usdt",
    },
    {
      icon: "dai.svg",
      tokenName: "DAI",
      apy: "8 - 21",
      tvl_usd: ``,
      lockTime: "No lock",
      new_badge: false,
      top_pick: false,
      link: "https://vault.dyp.finance/vault-dai",
    },
  ];





  const [farmingItem, setFarming] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [topPools, setTopPools] = useState(stake);
  const [listing, setListing] = useState(listType);
  const [cawsCard, setCawsCard] = useState({})



  var farming = [];

  const fetchEthStaking = async() => {
    await axios.get(`https://api.dyp.finance/api/get_staking_info_eth`).then((res) => {
      const dypIdyp = res.data.stakingInfoDYPEth.concat(res.data.stakingInfoiDYPEth)
      setTopPools(dypIdyp)
      setCawsCard(res.data.stakingInfoCAWS[0])
    }).catch((err) => {
      console.log(err);
    })
  } 
  const fetchBnbStaking = async() => {
    await axios.get(`https://api.dyp.finance/api/get_staking_info_eth`).then((res) => {
      const dypIdypBnb = res.data.stakingInfoDYPBnb.concat(res.data.stakingInfoiDYPBnb)
      setTopPools(dypIdypBnb)
    }).catch((err) => {
      console.log(err);
    })
  } 
  const fetchAvaxStaking = async() => {
    await axios.get(`https://api.dyp.finance/api/get_staking_info_eth`).then((res) => {
      const dypIdypAvax = res.data.stakingInfoDYPEth.concat(res.data.stakingInfoiDYPEth)
      setTopPools(dypIdypAvax)
    }).catch((err) => {
      console.log(err);
    })
  } 
  
  const fetchEthBuyback = async() => {
    await axios.get(`https://api.dyp.finance/api/get_buyback_info_eth`).then((res) => {
      setTopPools(res.data.BuybackETHInfo)
    }).catch((err) => {
      console.log(err);
    })
  }
  const fetchBnbBuyback = async() => {
    await axios.get(`https://api.dyp.finance/api/get_buyback_info_bnb`).then((res) => {
      setTopPools(res.data.BuybackBNBInfo)
    }).catch((err) => {
      console.log(err);
    })
  }
  const fetchAvaxBuyback = async() => {
    await axios.get(`https://api.dyp.finance/api/get_buyback_info_avax`).then((res) => {
      setTopPools(res.data.BuybackAVAXInfo)
    }).catch((err) => {
      console.log(err);
    })
  }
  
  
  const fetchEthFarming = async () => {
    await axios
      .get("https://api.dyp.finance/api/the_graph_eth_v2")
      .then((res) => {
        let temparray = Object.entries(res.data.the_graph_eth_v2.lp_data);
        // let farming = [];
        temparray.map((item) => {
          farming.push(item[1]);
        });
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
        setFarming(farming);
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
        setFarming(farming);
      })
      .catch((err) => console.error(err));
  };

  const [customPool, setCustomPool] = useState(pool);
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
    window.farming_new_1,
    window.farming_new_2,
    window.farming_new_3,
    window.farming_new_4,
    window.farming_new_5,
  ];
  const constantArray = [
    window.constant_staking_new5,
    window.constant_staking_new6,
    window.constant_staking_new7,
    window.constant_staking_new8,
    window.constant_staking_new9,
  ];

  const stakeArrayBuyBack = [
    window.buyback_staking1_1,
    window.buyback_staking1_2,
  ];
  const constantArrayBuyback = [
    window.constant_staking_new3,
    window.constant_staking_new4,
  ];

  const stakeArrayStakeNew = [
    window.constant_staking_new1,
    window.constant_staking_new2,
  ];

  const feeArray = [0.3, 0.3, 0.4, 0.8, 1.2];
  const feeArrayBuyback = [1, 3.5];
  const aprArray = [30, 100];

  const feeArrayStake = [0.25, 0.5];
  const aprArrayStake = [25, 50];

  const stakeArrayiDYP = [
    window.constant_staking_idyp_1,
    window.constant_staking_idyp_2,
    window.constant_staking_idyp_3,
    window.constant_staking_idyp_4,
  ];

  const performancefeeArrayidyp = [0, 0, 1, 3.5];
  const withdrawFeeiDyp = [0.25, 0.25, 0, 0];
  const aprArrayiDyp = [20, 45, 15, 30];
  const expirationArray = [
    "28 February 2023",
    "28 February 2023",
    "15 August 2023",
    "15 August 2023",
  ];

  const lockarrayFarm = ["No Lock", 3, 30, 60, 90];

  const StakingNew1 = initStakingNew({
    token: window.token_new,
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
  });

  const bscFarmArrayStake = [
    window.farming_newbsc_1,
    window.farming_newbsc_2,
    window.farming_newbsc_3,
    window.farming_newbsc_4,
    window.farming_newbsc_5,
  ];
  const bscFarmArrayConst = [
    window.constant_stakingnewbsc_new5,
    window.constant_stakingnewbsc_new6,
    window.constant_stakingnewbsc_new7,
    window.constant_stakingnewbsc_new8,
    window.constant_stakingnewbsc_new9,
  ];
  const bscFarmArrayFee = [0.3, 0.3, 0.4, 0.8, 1.2];

  const BscFarming = initBscFarming({
    token: window.token_newbsc,
    staking: bscFarmArrayStake[cardIndex],
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
    lockTime: 3,
    listType: listType,
  });

  const lockarrayFarmAvax = ["No Lock", 3, 30, 60, 90];
  const feearrayFarmAvax = [0.3, 0.3, 0.4, 0.8, 1.2];

  const constantArrayFarmAvax = [
    window.constant_staking_newavax5,
    window.constant_staking_newavax6,
    window.constant_staking_newavax7,
    window.constant_staking_newavax8,
    window.constant_staking_newavax9,
  ];

  const stakeArrayFarmAvax = [
    window.farming_newavax_1,
    window.farming_newavax_2,
    window.farming_newavax_3,
    window.farming_newavax_4,
    window.farming_newavax_5,
  ];

  const { LP_IDs_V2Avax, LP_IDs_V2BNB } = window;

  const LP_IDAVAX_Array = [
    LP_IDs_V2Avax.wavax[0],
    LP_IDs_V2Avax.wavax[1],
    LP_IDs_V2Avax.wavax[2],
    LP_IDs_V2Avax.wavax[3],
    LP_IDs_V2Avax.wavax[4],
  ];

  const LP_IDBNB_Array = [
    LP_IDs_V2BNB.wbnb[0],
    LP_IDs_V2BNB.wbnb[1],
    LP_IDs_V2BNB.wbnb[2],
    LP_IDs_V2BNB.wbnb[3],
    LP_IDs_V2BNB.wbnb[4],
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
    lockTime: lockarrayFarm[cardIndex],
    listType: listType,
  });

  const lockarrayBuyback = ["No Lock", 90];

  //Buyback New
  const BuybackStaking1 = initBuybackStakingNew({
    staking: stakeArrayBuyBack[cardIndex],
    constant: constantArrayBuyback[cardIndex],
    apr: aprArray[cardIndex],
    expiration_time: "14 December 2022",
    fee: feeArrayBuyback[cardIndex],
    coinbase: coinbase,
    handleConnection: handleConnection,
    chainId: chainId,
    lockTime: lockarrayBuyback[cardIndex],
    listType: listType,
  });

  const stakeArrayBuyBackAvax = [
    window.buyback_stakingavax1_1,
    window.buyback_stakingavax1_2,
  ];
  const constantArrayBuybackAvax = [
    window.constant_staking_newavax3,
    window.constant_staking_newavax4,
  ];

  const aprArrayBuyBackAvax = [30, 100];

  const AvaxBuyback = avaxBuyback({
    staking: stakeArrayBuyBackAvax[cardIndex],
    constant: constantArrayBuybackAvax[cardIndex],
    apr: aprArrayBuyBackAvax[cardIndex],
    expiration_time: "6 December 2022",
    fee: feeArrayBuyback[cardIndex],
    coinbase: coinbase,
    handleConnection: handleConnection,
    chainId: chainId,
    lockTime: lockarrayBuyback[cardIndex],
    listType: listType,
  });

  const bscStakeArray = [
    window.buyback_stakingbsc1_1,
    window.buyback_stakingbsc1_2,
  ];
  const bscConstArray = [
    window.constant_stakingbsc_new3,
    window.constant_stakingbsc_new4,
  ];
  const bscAprArray = [30, 100];
  const bscFeeArray = [1, 3.5];
  const bscLockArray = ["No Lock", 90];

  const BscBuyback = initBscBuyback({
    staking: bscStakeArray[cardIndex],
    constant: bscConstArray[cardIndex],
    apr: bscAprArray[cardIndex],
    expiration_time: "17 November 2022",
    fee: bscFeeArray[cardIndex],
    coinbase: coinbase,
    handleConnection: handleConnection,
    chainId: chainId,
    lockTime: bscLockArray[cardIndex],
    listType: listType,
  });

  const aprarrayStakeAvax = [30, 10];
  const feearrayStakeAvax = [3.5, 1];

  const stakingarrayStakeAvax = [
    window.constant_staking_new10,
    window.constant_staking_new11,
  ];

  const aprarrayStakeAvax30 = [25, 50];
  const lockarrayStakeAvax = [
    180,
    30,
    "No Lock",
    90,
    90,
    "No Lock",
    90,
    "No Lock",
    90,
  ];

  const feearrayStakeAvax30 = [0.25, 0.5];
  const stakingarrayStakeAvax30 = [
    window.constant_staking_newavax1,
    window.constant_staking_newavax2,
  ];

  const StakeAvax = stakeAvax({
    staking: stakingarrayStakeAvax[cardIndex],
    apr: aprarrayStakeAvax[cardIndex],
    liquidity: avax_address,
    expiration_time: "6 December 2022",
    fee: feearrayStakeAvax[cardIndex],
    coinbase: coinbase,
    chainId: chainId,
    referrer: referrer,
    lockTime: lockarrayStakeAvax[cardIndex],
    listType: listType,
  });

  const feearrayStakeBsc = [3.5, 1, 0.25, 0.5, 0, 0, 1, 3.5];
  const expirearrayStakeBsc = [
    "14 July 2023",
    "5 August 2023",
    "17 November 2022",
    "17 November 2022",
    "Expired",
    "28 February 2023",
    "28 February 2023",
    "15 August 2023",
    "15 August 2023",
  ];
  const aprarrayStakeBsc = [30, 10, 25, 50, 25, 20, 45, 15, 30];

  const stakearrayStakeBsc = [
    window.constant_stakingbsc_new10,
    window.constant_stakingbsc_new11,
    window.constant_stakingbsc_new12,
    window.constant_stakingbsc_new13,
    window.constant_stakingdaibsc,
    window.constant_stakingidyp_1,
    window.constant_stakingidyp_2,
    window.constant_stakingidyp_5,
    window.constant_stakingidyp_6,
  ];

  const otherInfoarrayStakeBsc = [
    false,
    false,
    false,
    false,
    true,
    true,
    true,
    false,
    false,
  ];

  const BscConstantStake = initbscConstantStaking({
    staking: stakearrayStakeBsc[cardIndex],
    apr: aprarrayStakeBsc[cardIndex],
    liquidity: wbsc_address,
    expiration_time: expirearrayStakeBsc[cardIndex],
    fee: feearrayStakeBsc[cardIndex],
    coinbase: coinbase,
    chainId: chainId,
    lockTime: lockarrayStakeAvax[cardIndex],
    listType: listType,
    other_info: otherInfoarrayStakeBsc[cardIndex],
  });

  const BscConstantStake2 = initbscConstantStaking2({
    staking: stakearrayStakeBsc[cardIndex],
    apr: aprarrayStakeBsc[cardIndex],
    liquidity: wbsc_address,
    expiration_time: expirearrayStakeBsc[cardIndex],
    fee: feearrayStakeBsc[cardIndex],
    coinbase: coinbase,
    chainId: chainId,
    lockTime: lockarrayStakeAvax[cardIndex],
    listType: listType,
    other_info: otherInfoarrayStakeBsc[cardIndex],
  });

  const BscConstantStakeDai = initbscConstantStakingDai({
    staking: stakearrayStakeBsc[cardIndex],
    apr: aprarrayStakeBsc[cardIndex],
    liquidity: wbsc_address,
    expiration_time: expirearrayStakeBsc[cardIndex],
    fee: feearrayStakeBsc[cardIndex],
    coinbase: coinbase,
    chainId: chainId,
    lockTime: lockarrayStakeAvax[cardIndex],
    listType: listType,
    other_info: otherInfoarrayStakeBsc[cardIndex],
  });

  const BscConstantStakingiDyp = initbscConstantStakingiDyp({
    staking: stakearrayStakeBsc[cardIndex],
    apr: aprarrayStakeBsc[cardIndex],
    liquidity: wbsc_address,
    expiration_time: expirearrayStakeBsc[cardIndex],
    fee: feearrayStakeBsc[cardIndex],
    coinbase: coinbase,
    chainId: chainId,
    lockTime: lockarrayStakeAvax[cardIndex],
    listType: listType,
    other_info: otherInfoarrayStakeBsc[cardIndex],
  });

  const StakeAvax30 = stakeAvax30({
    staking: stakingarrayStakeAvax30[cardIndexavax30],
    apr: aprarrayStakeAvax30[cardIndexavax30],
    liquidity: avax_address,
    expiration_time: "6 December 2022",
    fee: feearrayStakeAvax30[cardIndexavax30],
    coinbase: coinbase,
    chainId: chainId,
    lockTime: lockarrayStakeAvax[cardIndex],
    listType: listType,
  });

  const StakeAvax3 = stakeAvax3({
    staking: window.constant_stakingdaiavax,
    apr: 25,
    liquidity: avax_address,
    expiration_time: "Expired",
    coinbase: coinbase,
    chainId: chainId,
    lockTime: lockarrayStakeAvax[cardIndex],
    listType: listType,
  });

  const aprarrayStakeAvaxiDyp = [20, 50, 15, 30];
  const feeSarrayStakeAvaxiDyp = [0, 0, 1, 3.5];
  const feeUarrayStakeAvaxiDyp = [0.25, 0.25, 0, 0];
  const otherinfoarrayStakeAvaxiDyp = [true, true, false, false];

  const expirearrayStakeAvaxiDyp = [
    "28 February 2023",
    "28 February 2023",
    "15 August 2023",
    "15 August 2023",
  ];

  const stakingarrayStakeAvaxiDyp = [
    window.constant_staking_idypavax_1,
    window.constant_staking_idypavax_2,
    window.constant_staking_idypavax_5,
    window.constant_staking_idypavax_6,
  ];

  const StakeAvaxiDyp = stakeAvaxiDyp({
    staking: stakingarrayStakeAvaxiDyp[cardIndexavaxiDyp],
    apr: aprarrayStakeAvaxiDyp[cardIndexavaxiDyp],
    liquidity: avax_address,
    expiration_time: expirearrayStakeAvaxiDyp[cardIndexavaxiDyp],
    other_info: otherinfoarrayStakeAvaxiDyp[cardIndexavaxiDyp],
    fee_s: feeSarrayStakeAvaxiDyp[cardIndexavaxiDyp],
    fee_u: feeUarrayStakeAvaxiDyp[cardIndexavaxiDyp],
    listType: listType,
  });

  const lockarray = ["No Lock", 3, 30];

  const lockarrayiDyp = ["No Lock", 90, 90];

  const ConstantStaking1 = initConstantStakingNew({
    staking: stakeArrayStakeNew[cardIndex],
    apr: aprArrayStake[cardIndex],
    liquidity: eth_address,
    expiration_time: "14 December 2022",
    other_info: false,
    fee: feeArrayStake[cardIndex],
    coinbase: coinbase,
    handleConnection: handleConnection,
    chainId: chainId,
    lockTime: lockarray[cardIndex],
    listType: listType,
  });

  const ConstantStakingiDYP1 = initConstantStakingiDYP({
    staking: stakeArrayiDYP[cardIndexiDyp],
    apr: aprArrayiDyp[cardIndexiDyp],
    liquidity: eth_address,
    expiration_time: expirationArray[cardIndexiDyp],
    other_info: true,
    fee_s: performancefeeArrayidyp[cardIndexiDyp],
    fee_u: withdrawFeeiDyp[cardIndexiDyp],
    coinbase: coinbase,
    handleConnection: handleConnection,
    chainId: chainId,
    lockTime: lockarrayiDyp[cardIndexiDyp],
    listType: listType,
  });

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

  const VaultCard = initVaultNew({
    vault: vaultArray[cardIndex],
    token: tokenvaultArray[cardIndex],
    platformTokenApyPercent: vaultplatformArray[cardIndex],
    UNDERLYING_DECIMALS: vaultdecimalsArray[cardIndex],
    UNDERLYING_SYMBOL: vaultsymbolArray[cardIndex],
    expiration_time: "04 March 2023",
    coinbase: coinbase,
    lockTime: "No Lock",
    handleConnection: handleConnection,
    chainId: chainId,
    listType: listType,
  });

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
          fetchBnbStaking()
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
      if(chain === "avax"){
        setTimeout(() => {
          fetchAvaxBuyback();
        }, 500);
      }
    } else if (topList === "Vault") {
      setTopPools([]);
      setTimeout(() => {
        setTopPools(vault);
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
  }, [topList, listType, chain]);

  const handleCardIndexStake = (index) => {
    if (topList === "Staking") {
      if (index >= 2) {
        const newIndex = index - 2;
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
      if (index >= 5) {
        const newIndex = index - 5;
        setcardIndexavaxiDyp(newIndex);
        setcardIndex(index);
      } else setcardIndex(index);
    } else setcardIndex(index);
  };

  return topPools.length > 0 ? (
    <div className={`row w-100 justify-content-center gap-4`}>
      {listing === "table" ? (
        windowSize.width > 1300 ? (
          <div className="px-0">
          <>
          <div className="top-picks-container">
              {topPools.slice(0, 3).map((pool, index) => (
                <TopPoolsCard
                  key={index}
                  chain={chain}
                  top_pick={pool.top_pick}
                  tokenName={pool.pair_name}
                  apr={pool.apy_percent + "%"}
                  tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                  lockTime={pool.lock_time ? pool.lock_time : locktimeFarm[index]}
                  tokenLogo={pool.pair_name === "DYP" ? 'dyplogo.svg' : 'idypius.svg'}
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
                    console.log(details, activeCard, cardIndex);
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
                />
              ) : chain === "bnb" ? (
                <BscFarming
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultbsc}
                  lp_id={LP_IDBNB_Array[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                />
              ) : (
                <FarmAvax
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  the_graph_result={the_graph_resultavax}
                  lp_id={LP_IDAVAX_Array[cardIndex]}
                  chainId={chainId}
                  coinbase={coinbase}
                />
              )
            ) : activeCard && topList === "Buyback" && chain === "eth" ? (
              <BuybackStaking1
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_result}
                lp_id={lp_id[cardIndex]}
                chainId={chainId}
                handleConnection={handleConnection}
              />
            ) : activeCard && topList === "Buyback" && chain === "avax" ? (
              <AvaxBuyback
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultavax}
                lp_id={LP_IDAVAX_Array[cardIndex]}
                chainId={chainId}
                handleConnection={handleConnection}
              />
            ) : activeCard && topList === "Buyback" && chain === "bnb" ? (
              <BscBuyback
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultbsc}
                chainId={chainId}
                handleConnection={handleConnection}
              />
            ) : activeCard &&
              topList === "Staking" &&
              cardIndex < 2 &&
              chain === "eth" ? (
              <ConstantStaking1
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_result}
                lp_id={lp_id[cardIndex]}
                chainId={chainId}
                handleConnection={handleConnection}
              />
            ) : activeCard &&
              topList === "Staking" &&
              cardIndex < 2 &&
              chain === "bnb" ? (
              <BscConstantStake
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultbsc}
                lp_id={LP_IDBNB_Array[cardIndex]}
                chainId={chainId}
                handleConnection={handleConnection}
              />
            ) : activeCard &&
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
              />
            ) : activeCard &&
              cardIndex >= 2 &&
              cardIndex < 4 &&
              topList === "Staking" &&
              chain === "bnb" ? (
              <BscConstantStake2
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultbsc}
                lp_id={LP_IDBNB_Array[cardIndex]}
                chainId={chainId}
                handleConnection={handleConnection}
              />
            ) : activeCard &&
              cardIndex === 4 &&
              topList === "Staking" &&
              chain === "bnb" ? (
              <BscConstantStakeDai
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultbsc}
                lp_id={LP_IDBNB_Array[cardIndex]}
                chainId={chainId}
                handleConnection={handleConnection}
                referrer={referrer}
              />
            ) : activeCard &&
              cardIndex >= 5 &&
              topList === "Staking" &&
              chain === "bnb" ? (
              <BscConstantStakingiDyp
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultbsc}
                chainId={chainId}
                handleConnection={handleConnection}
                referrer={referrer}
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
              />
            ) : activeCard &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex >= 2 &&
              cardIndex < 4 ? (
              <StakeAvax30
                is_wallet_connected={isConnected}
                handleConnection={handleConnection}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                coinbase={coinbase}
                referrer={referrer}
              />
            ) : activeCard &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex === 4 ? (
              <StakeAvax3
                is_wallet_connected={isConnected}
                handleConnection={handleConnection}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                coinbase={coinbase}
                referrer={referrer}
              />
            ) : activeCard &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex >= 5 ? (
              <StakeAvaxiDyp
                is_wallet_connected={isConnected}
                handleConnection={handleConnection}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                coinbase={coinbase}
                referrer={referrer}
              />
            ) : activeCard && topList === "Vault" ? (
              <VaultCard
                is_wallet_connected={isConnected}
                handleConnection={handleConnection}
                chainId={chainId}
                coinbase={coinbase}
                the_graph_result={the_graph_result}
              />
            ) : (
              <></>
            )}
          </>
            <div className="top-picks-container" style={{ marginTop: "25px" }}>
              {topPools.slice(3, 6).map((pool, index) => (
                <TopPoolsCard
                  key={index}
                  chain={chain}
                  top_pick={pool.top_pick}
                  tokenName={pool.pair_name}
                  apr={pool.apy_percent + "%"}
                  tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                  lockTime={
                    pool.lock_time ? pool.lock_time : locktimeFarm[index + 3]
                  }
                  tokenLogo={pool.pair_name === "DYP" ? "dyplogo.svg" : "idypius.svg"}
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
                />
              ) : chain === "bnb" ? (
                <BscFarming
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultbsc}
                  lp_id={LP_IDBNB_Array[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                />
              ) : (
                <FarmAvax
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  the_graph_result={the_graph_resultavax}
                  lp_id={LP_IDAVAX_Array[cardIndex]}
                  chainId={chainId}
                  coinbase={coinbase}
                />
              )
            ) : activeCard2 && topList === "Buyback" && chain === "eth" ? (
              <BuybackStaking1
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_result}
                lp_id={lp_id[cardIndex]}
                chainId={chainId}
                handleConnection={handleConnection}
              />
            ) : activeCard2 && topList === "Buyback" && chain === "avax" ? (
              <AvaxBuyback
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultavax}
                lp_id={LP_IDAVAX_Array[cardIndex]}
                chainId={chainId}
                handleConnection={handleConnection}
              />
            ) : activeCard2 && topList === "Buyback" && chain === "bnb" ? (
              <></>
            ) : activeCard2 &&
              topList === "Staking" &&
              cardIndex < 2 &&
              chain === "eth" ? (
              <ConstantStaking1
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_result}
                lp_id={lp_id[cardIndex]}
                chainId={chainId}
                handleConnection={handleConnection}
              />
            ) : activeCard2 &&
              topList === "Staking" &&
              cardIndex < 2 &&
              chain === "bnb" ? (
              <BscConstantStake2
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultbsc}
                lp_id={LP_IDBNB_Array[cardIndex]}
                chainId={chainId}
                handleConnection={handleConnection}
              />
            ) : activeCard2 &&
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
              />
            ) : activeCard2 &&
              cardIndex === 4 &&
              topList === "Staking" &&
              chain === "bnb" ? (
              <BscConstantStakeDai
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultbsc}
                lp_id={LP_IDBNB_Array[cardIndex]}
                chainId={chainId}
                handleConnection={handleConnection}
                referrer={referrer}
              />
            ) : activeCard2 &&
              cardIndex >= 2 &&
              cardIndex < 4 &&
              topList === "Staking" &&
              chain === "bnb" ? (
              <BscConstantStake2
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultbsc}
                lp_id={LP_IDBNB_Array[cardIndex]}
                chainId={chainId}
                handleConnection={handleConnection}
              />
            ) : activeCard2 &&
              (cardIndex === 5 || cardIndex > 5) &&
              topList === "Staking" &&
              chain === "bnb" ? (
              <BscConstantStakingiDyp
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultbsc}
                referrer={referrer}
                chainId={chainId}
                handleConnection={handleConnection}
              />
            ) : activeCard2 &&
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
              />
            ) : activeCard2 &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex >= 2 &&
              cardIndex < 4 ? (
              <StakeAvax30
                is_wallet_connected={isConnected}
                handleConnection={handleConnection}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                coinbase={coinbase}
                referrer={referrer}
              />
            ) : activeCard2 &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex === 4 ? (
              <StakeAvax3
                is_wallet_connected={isConnected}
                handleConnection={handleConnection}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                coinbase={coinbase}
                referrer={referrer}
              />
            ) : activeCard2 &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex >= 5 ? (
              <StakeAvaxiDyp
                is_wallet_connected={isConnected}
                handleConnection={handleConnection}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                coinbase={coinbase}
                referrer={referrer}
              />
            ) : activeCard2 && topList === "Vault" ? (
              <VaultCard
                is_wallet_connected={isConnected}
                handleConnection={handleConnection}
                chainId={chainId}
                coinbase={coinbase}
                the_graph_result={the_graph_result}
              />
            ) : (
              <></>
            )}
            <div className="top-picks-container" style={{ marginTop: "25px" }}>
              {topPools.slice(6, 9).map((pool, index) => (
                <TopPoolsCard
                  key={index}
                  chain={chain}
                  top_pick={pool.top_pick}
                  tokenName={pool.tokenName}
                  apr={pool.apy + "%"}
                  tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                  lockTime={
                    pool.lockTime ? pool.lockTime : locktimeFarm[index + 6]
                  }
                  tokenLogo={pool.icon}
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
                />
              ) : chain === "bnb" ? (
                <BscFarming
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultbsc}
                  lp_id={LP_IDBNB_Array[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                />
              ) : (
                <FarmAvax
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  the_graph_result={the_graph_resultavax}
                  lp_id={LP_IDAVAX_Array[cardIndex]}
                  chainId={chainId}
                  coinbase={coinbase}
                />
              )
            ) : activeCard3 && topList === "Buyback" && chain === "eth" ? (
              <BuybackStaking1
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_result}
                lp_id={lp_id[cardIndex]}
                chainId={chainId}
                handleConnection={handleConnection}
              />
            ) : activeCard3 && topList === "Buyback" && chain === "avax" ? (
              <AvaxBuyback
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultavax}
                lp_id={LP_IDAVAX_Array[cardIndex]}
                chainId={chainId}
                handleConnection={handleConnection}
              />
            ) : activeCard3 && topList === "Buyback" && chain === "bnb" ? (
              <></>
            ) : activeCard3 &&
              topList === "Staking" &&
              cardIndex < 2 &&
              chain === "eth" ? (
              <ConstantStaking1
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_result}
                lp_id={lp_id[cardIndex]}
                chainId={chainId}
                handleConnection={handleConnection}
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
              />
            ) : activeCard3 &&
              cardIndex >= 5 &&
              topList === "Staking" &&
              chain === "bnb" ? (
              <BscConstantStakingiDyp
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultbsc}
                referrer={referrer}
                chainId={chainId}
                handleConnection={handleConnection}
              />
            ) : activeCard3 &&
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
              />
            ) : activeCard3 &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex >= 2 &&
              cardIndex < 4 ? (
              <StakeAvax30
                is_wallet_connected={isConnected}
                handleConnection={handleConnection}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                coinbase={coinbase}
                referrer={referrer}
              />
            ) : activeCard3 &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex === 4 ? (
              <StakeAvax3
                is_wallet_connected={isConnected}
                handleConnection={handleConnection}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                coinbase={coinbase}
                referrer={referrer}
              />
            ) : activeCard3 &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex >= 5 ? (
              <StakeAvaxiDyp
                is_wallet_connected={isConnected}
                handleConnection={handleConnection}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                coinbase={coinbase}
                referrer={referrer}
              />
            ) : activeCard3 && topList === "Vault" ? (
              <VaultCard
                is_wallet_connected={isConnected}
                handleConnection={handleConnection}
                chainId={chainId}
                coinbase={coinbase}
                the_graph_result={the_graph_result}
              />
            ) : (
              <></>
            )}
            <div
              className="top-picks-container"
              style={{ marginTop: topPools.length > 9 && "25px" }}
            >
              {topPools.slice(9, topPools.length).map((pool, index) => (
                <TopPoolsCard
                  key={index}
                  chain={chain}
                  top_pick={pool.top_pick}
                  tokenName={pool.tokenName}
                  apr={pool.apy + "%"}
                  tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                  lockTime={
                    pool.lockTime ? pool.lockTime : locktimeFarm[index + 9]
                  }
                  tokenLogo={pool.icon}
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
                />
              )}
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
                />
              ) : chain === "bnb" ? (
                <BscFarming
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultbsc}
                  lp_id={LP_IDBNB_Array[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                />
              ) : (
                <FarmAvax
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  the_graph_result={the_graph_resultavax}
                  lp_id={LP_IDAVAX_Array[cardIndex]}
                  chainId={chainId}
                  coinbase={coinbase}
                />
              )
            ) : activeCard4 && topList === "Buyback" && chain === "eth" ? (
              <BuybackStaking1
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_result}
                lp_id={lp_id[cardIndex]}
                chainId={chainId}
                handleConnection={handleConnection}
              />
            ) : activeCard4 && topList === "Buyback" && chain === "avax" ? (
              <AvaxBuyback
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultavax}
                lp_id={LP_IDAVAX_Array[cardIndex]}
                chainId={chainId}
                handleConnection={handleConnection}
              />
            ) : activeCard4 && topList === "Buyback" && chain === "bnb" ? (
              <></>
            ) : activeCard4 &&
              topList === "Staking" &&
              cardIndex < 2 &&
              chain === "eth" ? (
              <ConstantStaking1
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_result}
                lp_id={lp_id[cardIndex]}
                chainId={chainId}
                handleConnection={handleConnection}
              />
            ) : activeCard4 &&
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
              />
            ) : activeCard4 &&
              cardIndex >= 5 &&
              topList === "Staking" &&
              chain === "bnb" ? (
              <BscConstantStakingiDyp
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultbsc}
                referrer={referrer}
                chainId={chainId}
                handleConnection={handleConnection}
              />
            ) : activeCard4 &&
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
              />
            ) : activeCard4 &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex >= 2 &&
              cardIndex < 4 ? (
              <StakeAvax30
                is_wallet_connected={isConnected}
                handleConnection={handleConnection}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                coinbase={coinbase}
                referrer={referrer}
              />
            ) : activeCard4 &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex === 4 ? (
              <StakeAvax3
                is_wallet_connected={isConnected}
                handleConnection={handleConnection}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                coinbase={coinbase}
                referrer={referrer}
              />
            ) : activeCard4 &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex >= 5 ? (
              <StakeAvaxiDyp
                is_wallet_connected={isConnected}
                handleConnection={handleConnection}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                coinbase={coinbase}
                referrer={referrer}
              />
            ) : activeCard4 && topList === "Vault" ? (
              <VaultCard
                is_wallet_connected={isConnected}
                handleConnection={handleConnection}
                chainId={chainId}
                coinbase={coinbase}
                the_graph_result={the_graph_result}
              />
            ) : (
              activeCardNFT && (
                <CawsDetails
                  coinbase={coinbase}
                  isConnected={isConnected}
                  listType={listType}
                />
              )
            )}
          </div>
        ) : windowSize.width > 786 ? (
          <div className="px-0">
            <div className="top-picks-container">
              {topPools.slice(0, 2).map((pool, index) => (
                <TopPoolsCard
                  key={index}
                  chain={chain}
                  top_pick={pool.top_pick}
                  tokenName={pool.tokenName}
                  apr={pool.apy + "%"}
                  tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                  lockTime={pool.lockTime ? pool.lockTime : locktimeFarm[index]}
                  tokenLogo={pool.icon}
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
                />
              ) : chain === "bnb" ? (
                <></>
              ) : (
                <FarmAvax
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  the_graph_result={the_graph_resultavax}
                  lp_id={LP_IDAVAX_Array[cardIndex]}
                  chainId={chainId}
                  coinbase={coinbase}
                />
              )
            ) : activeCard && topList === "Buyback" && chain === "eth" ? (
              <BuybackStaking1
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_result}
                lp_id={lp_id[cardIndex]}
                chainId={chainId}
                handleConnection={handleConnection}
              />
            ) : activeCard && topList === "Buyback" && chain === "avax" ? (
              <AvaxBuyback
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultavax}
                lp_id={LP_IDAVAX_Array[cardIndex]}
                chainId={chainId}
                handleConnection={handleConnection}
              />
            ) : activeCard && topList === "Buyback" && chain === "bnb" ? (
              <></>
            ) : activeCard &&
              topList === "Staking" &&
              cardIndex < 2 &&
              chain === "eth" ? (
              <ConstantStaking1
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_result}
                lp_id={lp_id[cardIndex]}
                chainId={chainId}
                handleConnection={handleConnection}
              />
            ) : activeCard &&
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
              />
            ) : activeCard &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex >= 2 &&
              cardIndex < 4 ? (
              <StakeAvax30
                is_wallet_connected={isConnected}
                handleConnection={handleConnection}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                coinbase={coinbase}
                referrer={referrer}
              />
            ) : activeCard &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex === 4 ? (
              <StakeAvax3
                is_wallet_connected={isConnected}
                handleConnection={handleConnection}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                coinbase={coinbase}
                referrer={referrer}
              />
            ) : activeCard &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex >= 5 ? (
              <StakeAvaxiDyp
                is_wallet_connected={isConnected}
                handleConnection={handleConnection}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                coinbase={coinbase}
                referrer={referrer}
              />
            ) : activeCard && topList === "Vault" ? (
              <VaultCard
                is_wallet_connected={isConnected}
                handleConnection={handleConnection}
                chainId={chainId}
                coinbase={coinbase}
                the_graph_result={the_graph_result}
              />
            ) : (
              <></>
            )}
            <div className="top-picks-container" style={{ marginTop: "25px" }}>
              {topPools.slice(2, 4).map((pool, index) => (
                <TopPoolsCard
                  key={index}
                  chain={chain}
                  top_pick={pool.top_pick}
                  tokenName={pool.tokenName}
                  apr={pool.apy + "%"}
                  tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                  lockTime={
                    pool.lockTime ? pool.lockTime : locktimeFarm[index + 2]
                  }
                  tokenLogo={pool.icon}
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
            {activeCard2 && topList === "Farming" ? (
              chain === "eth" ? (
                <StakingNew1
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  lp_id={lp_id[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                />
              ) : chain === "bnb" ? (
                <></>
              ) : (
                <FarmAvax
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  the_graph_result={the_graph_resultavax}
                  lp_id={LP_IDAVAX_Array[cardIndex]}
                  chainId={chainId}
                  coinbase={coinbase}
                />
              )
            ) : activeCard2 && topList === "Buyback" && chain === "eth" ? (
              <BuybackStaking1
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_result}
                lp_id={lp_id[cardIndex]}
                chainId={chainId}
                handleConnection={handleConnection}
              />
            ) : activeCard2 && topList === "Buyback" && chain === "avax" ? (
              <AvaxBuyback
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultavax}
                lp_id={LP_IDAVAX_Array[cardIndex]}
                chainId={chainId}
                handleConnection={handleConnection}
              />
            ) : activeCard2 && topList === "Buyback" && chain === "bnb" ? (
              <></>
            ) : activeCard2 &&
              topList === "Staking" &&
              cardIndex < 2 &&
              chain === "eth" ? (
              <ConstantStaking1
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_result}
                lp_id={lp_id[cardIndex]}
                chainId={chainId}
                handleConnection={handleConnection}
              />
            ) : activeCard2 &&
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
              />
            ) : activeCard2 &&
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
              />
            ) : activeCard2 &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex >= 2 &&
              cardIndex < 4 ? (
              <StakeAvax30
                is_wallet_connected={isConnected}
                handleConnection={handleConnection}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                coinbase={coinbase}
                referrer={referrer}
              />
            ) : activeCard2 &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex === 4 ? (
              <StakeAvax3
                is_wallet_connected={isConnected}
                handleConnection={handleConnection}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                coinbase={coinbase}
                referrer={referrer}
              />
            ) : activeCard2 &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex >= 5 ? (
              <StakeAvaxiDyp
                is_wallet_connected={isConnected}
                handleConnection={handleConnection}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                coinbase={coinbase}
                referrer={referrer}
              />
            ) : activeCard2 && topList === "Vault" ? (
              <VaultCard
                is_wallet_connected={isConnected}
                handleConnection={handleConnection}
                chainId={chainId}
                coinbase={coinbase}
                the_graph_result={the_graph_result}
              />
            ) : (
              <></>
            )}
            <div className="top-picks-container" style={{ marginTop: "25px" }}>
              {topPools.slice(4, 6).map((pool, index) => (
                <TopPoolsCard
                  key={index}
                  chain={chain}
                  top_pick={pool.top_pick}
                  tokenName={pool.tokenName}
                  apr={pool.apy + "%"}
                  tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                  lockTime={
                    pool.lockTime ? pool.lockTime : locktimeFarm[index + 4]
                  }
                  tokenLogo={pool.icon}
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
                />
              ) : chain === "bnb" ? (
                <></>
              ) : (
                <FarmAvax
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  the_graph_result={the_graph_resultavax}
                  lp_id={LP_IDAVAX_Array[cardIndex]}
                  chainId={chainId}
                  coinbase={coinbase}
                />
              )
            ) : activeCard3 && topList === "Buyback" && chain === "eth" ? (
              <BuybackStaking1
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_result}
                lp_id={lp_id[cardIndex]}
                chainId={chainId}
                handleConnection={handleConnection}
              />
            ) : activeCard3 && topList === "Buyback" && chain === "avax" ? (
              <AvaxBuyback
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultavax}
                lp_id={LP_IDAVAX_Array[cardIndex]}
                chainId={chainId}
                handleConnection={handleConnection}
              />
            ) : activeCard3 && topList === "Buyback" && chain === "bnb" ? (
              <></>
            ) : activeCard3 &&
              topList === "Staking" &&
              cardIndex < 2 &&
              chain === "eth" ? (
              <ConstantStaking1
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_result}
                lp_id={lp_id[cardIndex]}
                chainId={chainId}
                handleConnection={handleConnection}
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
              />
            ) : activeCard3 &&
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
              />
            ) : activeCard3 &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex >= 2 &&
              cardIndex < 4 ? (
              <StakeAvax30
                is_wallet_connected={isConnected}
                handleConnection={handleConnection}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                coinbase={coinbase}
                referrer={referrer}
              />
            ) : activeCard3 &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex === 4 ? (
              <StakeAvax3
                is_wallet_connected={isConnected}
                handleConnection={handleConnection}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                coinbase={coinbase}
                referrer={referrer}
              />
            ) : activeCard3 &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex >= 5 ? (
              <StakeAvaxiDyp
                is_wallet_connected={isConnected}
                handleConnection={handleConnection}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                coinbase={coinbase}
                referrer={referrer}
              />
            ) : activeCard3 && topList === "Vault" ? (
              <VaultCard
                is_wallet_connected={isConnected}
                handleConnection={handleConnection}
                chainId={chainId}
                coinbase={coinbase}
                the_graph_result={the_graph_result}
              />
            ) : (
              <></>
            )}
            <div className="top-picks-container" style={{ marginTop: "25px" }}>
              {topPools.slice(6, 8).map((pool, index) => (
                <TopPoolsCard
                  key={index}
                  chain={chain}
                  top_pick={pool.top_pick}
                  tokenName={pool.tokenName}
                  apr={pool.apy + "%"}
                  tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                  lockTime={
                    pool.lockTime ? pool.lockTime : locktimeFarm[index + 6]
                  }
                  tokenLogo={pool.icon}
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
            {activeCard4 && topList === "Farming" ? (
              chain === "eth" ? (
                <StakingNew1
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  lp_id={lp_id[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                />
              ) : chain === "bnb" ? (
                <></>
              ) : (
                <FarmAvax
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  the_graph_result={the_graph_resultavax}
                  lp_id={LP_IDAVAX_Array[cardIndex]}
                  chainId={chainId}
                  coinbase={coinbase}
                />
              )
            ) : activeCard4 && topList === "Buyback" && chain === "eth" ? (
              <BuybackStaking1
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_result}
                lp_id={lp_id[cardIndex]}
                chainId={chainId}
                handleConnection={handleConnection}
              />
            ) : activeCard4 && topList === "Buyback" && chain === "avax" ? (
              <AvaxBuyback
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultavax}
                lp_id={LP_IDAVAX_Array[cardIndex]}
                chainId={chainId}
                handleConnection={handleConnection}
              />
            ) : activeCard4 && topList === "Buyback" && chain === "bnb" ? (
              <></>
            ) : activeCard4 &&
              topList === "Staking" &&
              cardIndex < 2 &&
              chain === "eth" ? (
              <ConstantStaking1
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_result}
                lp_id={lp_id[cardIndex]}
                chainId={chainId}
                handleConnection={handleConnection}
              />
            ) : activeCard4 &&
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
              />
            ) : activeCard4 &&
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
              />
            ) : activeCard4 &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex >= 2 &&
              cardIndex < 4 ? (
              <StakeAvax30
                is_wallet_connected={isConnected}
                handleConnection={handleConnection}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                coinbase={coinbase}
                referrer={referrer}
              />
            ) : activeCard4 &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex === 4 ? (
              <StakeAvax3
                is_wallet_connected={isConnected}
                handleConnection={handleConnection}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                coinbase={coinbase}
                referrer={referrer}
              />
            ) : activeCard4 &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex >= 5 ? (
              <StakeAvaxiDyp
                is_wallet_connected={isConnected}
                handleConnection={handleConnection}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                coinbase={coinbase}
                referrer={referrer}
              />
            ) : activeCard4 && topList === "Vault" ? (
              <VaultCard
                is_wallet_connected={isConnected}
                handleConnection={handleConnection}
                chainId={chainId}
                coinbase={coinbase}
                the_graph_result={the_graph_result}
              />
            ) : (
              <></>
            )}
            <div
              className="top-picks-container"
              style={{ marginTop: topPools.length > 8 && "25px" }}
            >
              {topPools.slice(8, 10).map((pool, index) => (
                <TopPoolsCard
                  key={index}
                  chain={chain}
                  top_pick={pool.top_pick}
                  tokenName={pool.tokenName}
                  apr={pool.apy + "%"}
                  tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                  lockTime={
                    pool.lockTime ? pool.lockTime : locktimeFarm[index + 8]
                  }
                  tokenLogo={pool.icon}
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
                    setActiveCard4(null);
                    setDetails();
                  }}
                  cardType={topList}
                  details={details === index + 8 ? true : false}
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
                />
              ) : chain === "bnb" ? (
                <></>
              ) : (
                <FarmAvax
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  the_graph_result={the_graph_resultavax}
                  lp_id={LP_IDAVAX_Array[cardIndex]}
                  chainId={chainId}
                  coinbase={coinbase}
                />
              )
            ) : activeCard5 && topList === "Buyback" && chain === "eth" ? (
              <BuybackStaking1
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_result}
                lp_id={lp_id[cardIndex]}
                chainId={chainId}
                handleConnection={handleConnection}
              />
            ) : activeCard5 && topList === "Buyback" && chain === "avax" ? (
              <AvaxBuyback
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultavax}
                lp_id={LP_IDAVAX_Array[cardIndex]}
                chainId={chainId}
                handleConnection={handleConnection}
              />
            ) : activeCard5 && topList === "Buyback" && chain === "bnb" ? (
              <></>
            ) : activeCard5 &&
              topList === "Staking" &&
              cardIndex < 2 &&
              chain === "eth" ? (
              <ConstantStaking1
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_result}
                lp_id={lp_id[cardIndex]}
                chainId={chainId}
                handleConnection={handleConnection}
              />
            ) : activeCard5 &&
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
              />
            ) : activeCard5 &&
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
              />
            ) : activeCard5 &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex >= 2 &&
              cardIndex < 4 ? (
              <StakeAvax30
                is_wallet_connected={isConnected}
                handleConnection={handleConnection}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                coinbase={coinbase}
                referrer={referrer}
              />
            ) : activeCard5 &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex === 4 ? (
              <StakeAvax3
                is_wallet_connected={isConnected}
                handleConnection={handleConnection}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                coinbase={coinbase}
                referrer={referrer}
              />
            ) : activeCard5 &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex >= 5 ? (
              <StakeAvaxiDyp
                is_wallet_connected={isConnected}
                handleConnection={handleConnection}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                coinbase={coinbase}
                referrer={referrer}
              />
            ) : activeCard5 && topList === "Vault" ? (
              <VaultCard
                is_wallet_connected={isConnected}
                handleConnection={handleConnection}
                chainId={chainId}
                coinbase={coinbase}
                the_graph_result={the_graph_result}
              />
            ) : (
              <></>
            )}
            <div
              className="top-picks-container"
              style={{ marginTop: topPools.length > 10 && "25px" }}
            >
              {topPools.slice(10, topPools.length).map((pool, index) => (
                <TopPoolsCard
                  key={index}
                  chain={chain}
                  top_pick={pool.top_pick}
                  tokenName={pool.tokenName}
                  apr={pool.apy + "%"}
                  tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                  lockTime={
                    pool.lockTime ? pool.lockTime : locktimeFarm[index + 10]
                  }
                  tokenLogo={pool.icon}
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
                    setActiveCard4(null);
                    setDetails();
                  }}
                  cardType={topList}
                  details={details === index + 10 ? true : false}
                  isNewPool={pool.isNewPool}
                  isStaked={pool.isStaked}
                />
              ))}
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
                />
              )}
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
                />
              ) : chain === "bnb" ? (
                <></>
              ) : (
                <FarmAvax
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  the_graph_result={the_graph_resultavax}
                  lp_id={LP_IDAVAX_Array[cardIndex]}
                  chainId={chainId}
                  coinbase={coinbase}
                />
              )
            ) : activeCard6 && topList === "Buyback" && chain === "eth" ? (
              <BuybackStaking1
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_result}
                lp_id={lp_id[cardIndex]}
                chainId={chainId}
                handleConnection={handleConnection}
              />
            ) : activeCard6 && topList === "Buyback" && chain === "avax" ? (
              <AvaxBuyback
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultavax}
                lp_id={LP_IDAVAX_Array[cardIndex]}
                chainId={chainId}
                handleConnection={handleConnection}
              />
            ) : activeCard6 && topList === "Buyback" && chain === "bnb" ? (
              <></>
            ) : activeCard6 &&
              topList === "Staking" &&
              cardIndex < 2 &&
              chain === "eth" ? (
              <ConstantStaking1
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_result}
                lp_id={lp_id[cardIndex]}
                chainId={chainId}
                handleConnection={handleConnection}
              />
            ) : activeCard6 &&
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
              />
            ) : activeCard6 &&
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
              />
            ) : activeCard6 &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex >= 2 &&
              cardIndex < 4 ? (
              <StakeAvax30
                is_wallet_connected={isConnected}
                handleConnection={handleConnection}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                coinbase={coinbase}
                referrer={referrer}
              />
            ) : activeCard6 &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex === 4 ? (
              <StakeAvax3
                is_wallet_connected={isConnected}
                handleConnection={handleConnection}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                coinbase={coinbase}
                referrer={referrer}
              />
            ) : activeCard6 &&
              topList === "Staking" &&
              chain === "avax" &&
              cardIndex >= 5 ? (
              <StakeAvaxiDyp
                is_wallet_connected={isConnected}
                handleConnection={handleConnection}
                the_graph_result={the_graph_resultavax}
                chainId={chainId}
                coinbase={coinbase}
                referrer={referrer}
              />
            ) : activeCard6 && topList === "Vault" ? (
              <VaultCard
                is_wallet_connected={isConnected}
                handleConnection={handleConnection}
                chainId={chainId}
                coinbase={coinbase}
                the_graph_result={the_graph_result}
              />
            ) : (
              activeCardNFT && (
                <CawsDetails
                  coinbase={coinbase}
                  isConnected={isConnected}
                  listType={listType}
                />
              )
            )}
          </div>
        ) : (
          <div className="px-0">
            <>
              <div className="top-picks-container">
                {topPools.slice(0, 1).map((pool, index) => (
                  <TopPoolsCard
                    key={index}
                    chain={chain}
                    top_pick={pool.top_pick}
                    tokenName={pool.tokenName}
                    apr={pool.apy + "%"}
                    tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                    lockTime={
                      pool.lockTime ? pool.lockTime : locktimeFarm[index]
                    }
                    tokenLogo={pool.icon}
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
                  />
                ) : chain === "bnb" ? (
                  <BscFarming
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_resultbsc}
                    lp_id={LP_IDBNB_Array[cardIndex]}
                    chainId={chainId}
                    handleConnection={handleConnection}
                  />
                ) : (
                  <FarmAvax
                    is_wallet_connected={isConnected}
                    handleConnection={handleConnection}
                    the_graph_result={the_graph_resultavax}
                    lp_id={LP_IDAVAX_Array[cardIndex]}
                    chainId={chainId}
                    coinbase={coinbase}
                  />
                )
              ) : activeCard && topList === "Buyback" && chain === "eth" ? (
                <BuybackStaking1
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  lp_id={lp_id[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                />
              ) : activeCard && topList === "Buyback" && chain === "avax" ? (
                <AvaxBuyback
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultavax}
                  lp_id={LP_IDAVAX_Array[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                />
              ) : activeCard && topList === "Buyback" && chain === "bnb" ? (
                <BscBuyback
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultbsc}
                  chainId={chainId}
                  handleConnection={handleConnection}
                />
              ) : activeCard &&
                topList === "Staking" &&
                cardIndex < 2 &&
                chain === "eth" ? (
                <ConstantStaking1
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  lp_id={lp_id[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                />
              ) : activeCard &&
                topList === "Staking" &&
                cardIndex < 2 &&
                chain === "bnb" ? (
                <BscConstantStake
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultbsc}
                  lp_id={LP_IDBNB_Array[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                />
              ) : activeCard &&
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
                />
              ) : activeCard &&
                cardIndex >= 2 &&
                cardIndex < 4 &&
                topList === "Staking" &&
                chain === "bnb" ? (
                <BscConstantStake2
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultbsc}
                  lp_id={LP_IDBNB_Array[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                />
              ) : activeCard &&
                cardIndex === 4 &&
                topList === "Staking" &&
                chain === "bnb" ? (
                <BscConstantStakeDai
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultbsc}
                  lp_id={LP_IDBNB_Array[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  referrer={referrer}
                />
              ) : activeCard &&
                cardIndex >= 5 &&
                topList === "Staking" &&
                chain === "bnb" ? (
                <BscConstantStakingiDyp
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultbsc}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  referrer={referrer}
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
                />
              ) : activeCard &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex >= 2 &&
                cardIndex < 4 ? (
                <StakeAvax30
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  coinbase={coinbase}
                  referrer={referrer}
                />
              ) : activeCard &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex === 4 ? (
                <StakeAvax3
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  coinbase={coinbase}
                  referrer={referrer}
                />
              ) : activeCard &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex >= 5 ? (
                <StakeAvaxiDyp
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  coinbase={coinbase}
                  referrer={referrer}
                />
              ) : activeCard && topList === "Vault" ? (
                <VaultCard
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  chainId={chainId}
                  coinbase={coinbase}
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
                {topPools.slice(1, 2).map((pool, index) => (
                  <TopPoolsCard
                    key={index}
                    chain={chain}
                    top_pick={pool.top_pick}
                    tokenName={pool.tokenName}
                    apr={pool.apy + "%"}
                    tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                    lockTime={
                      pool.lockTime ? pool.lockTime : locktimeFarm[index + 1]
                    }
                    tokenLogo={pool.icon}
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
                  />
                ) : chain === "bnb" ? (
                  <BscFarming
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_resultbsc}
                    lp_id={LP_IDBNB_Array[cardIndex]}
                    chainId={chainId}
                    handleConnection={handleConnection}
                  />
                ) : (
                  <FarmAvax
                    is_wallet_connected={isConnected}
                    handleConnection={handleConnection}
                    the_graph_result={the_graph_resultavax}
                    lp_id={LP_IDAVAX_Array[cardIndex]}
                    chainId={chainId}
                    coinbase={coinbase}
                  />
                )
              ) : activeCard2 && topList === "Buyback" && chain === "eth" ? (
                <BuybackStaking1
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  lp_id={lp_id[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                />
              ) : activeCard2 && topList === "Buyback" && chain === "avax" ? (
                <AvaxBuyback
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultavax}
                  lp_id={LP_IDAVAX_Array[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                />
              ): activeCard2 && topList === "Buyback" && chain === "bnb" ? (
                <BscBuyback
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultbsc}
                  chainId={chainId}
                  handleConnection={handleConnection}
                />
              ) : activeCard2 &&
                topList === "Staking" &&
                cardIndex < 2 &&
                chain === "eth" ? (
                <ConstantStaking1
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  lp_id={lp_id[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                />
              ) : activeCard2 &&
                topList === "Staking" &&
                cardIndex < 2 &&
                chain === "bnb" ? (
                <BscConstantStake2
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultbsc}
                  lp_id={LP_IDBNB_Array[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                />
              ) : activeCard2 &&
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
                />
              ) : activeCard2 &&
                cardIndex === 4 &&
                topList === "Staking" &&
                chain === "bnb" ? (
                <BscConstantStakeDai
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultbsc}
                  lp_id={LP_IDBNB_Array[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                  referrer={referrer}
                />
              ) : activeCard2 &&
                cardIndex >= 2 &&
                cardIndex < 4 &&
                topList === "Staking" &&
                chain === "bnb" ? (
                <BscConstantStake2
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultbsc}
                  lp_id={LP_IDBNB_Array[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                />
              ) : activeCard2 &&
                (cardIndex === 5 || cardIndex > 5) &&
                topList === "Staking" &&
                chain === "bnb" ? (
                <BscConstantStakingiDyp
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultbsc}
                  referrer={referrer}
                  chainId={chainId}
                  handleConnection={handleConnection}
                />
              ) : activeCard2 &&
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
                />
              ) : activeCard2 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex >= 2 &&
                cardIndex < 4 ? (
                <StakeAvax30
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  coinbase={coinbase}
                  referrer={referrer}
                />
              ) : activeCard2 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex === 4 ? (
                <StakeAvax3
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  coinbase={coinbase}
                  referrer={referrer}
                />
              ) : activeCard2 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex >= 5 ? (
                <StakeAvaxiDyp
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  coinbase={coinbase}
                  referrer={referrer}
                />
              ) : activeCard2 && topList === "Vault" ? (
                <VaultCard
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  chainId={chainId}
                  coinbase={coinbase}
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
                {topPools.slice(2, 3).map((pool, index) => (
                  <TopPoolsCard
                    key={index}
                    chain={chain}
                    top_pick={pool.top_pick}
                    tokenName={pool.tokenName}
                    apr={pool.apy + "%"}
                    tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                    lockTime={
                      pool.lockTime ? pool.lockTime : locktimeFarm[index + 2]
                    }
                    tokenLogo={pool.icon}
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
                  />
                ) : chain === "bnb" ? (
                  <BscFarming
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_resultbsc}
                    lp_id={LP_IDBNB_Array[cardIndex]}
                    chainId={chainId}
                    handleConnection={handleConnection}
                  />
                ) : (
                  <FarmAvax
                    is_wallet_connected={isConnected}
                    handleConnection={handleConnection}
                    the_graph_result={the_graph_resultavax}
                    lp_id={LP_IDAVAX_Array[cardIndex]}
                    chainId={chainId}
                    coinbase={coinbase}
                  />
                )
              ) : activeCard3 && topList === "Buyback" && chain === "eth" ? (
                <BuybackStaking1
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  lp_id={lp_id[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                />
              ) : activeCard3 && topList === "Buyback" && chain === "avax" ? (
                <AvaxBuyback
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultavax}
                  lp_id={LP_IDAVAX_Array[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                />
              ) : activeCard3 && topList === "Buyback" && chain === "bnb" ? (
                <></>
              ) : activeCard3 &&
                topList === "Staking" &&
                cardIndex < 2 &&
                chain === "eth" ? (
                <ConstantStaking1
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  lp_id={lp_id[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
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
                />              
              ) : activeCard3 &&
              cardIndex >= 2 &&
              cardIndex < 4 &&
              topList === "Staking" &&
              chain === "bnb" ? (
              <BscConstantStake2
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultbsc}
                lp_id={LP_IDBNB_Array[cardIndex]}
                chainId={chainId}
                handleConnection={handleConnection}
              />
            ) : activeCard3 &&
              cardIndex === 4 &&
              topList === "Staking" &&
              chain === "bnb" ? (
              <BscConstantStakeDai
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultbsc}
                lp_id={LP_IDBNB_Array[cardIndex]}
                chainId={chainId}
                handleConnection={handleConnection}
                referrer={referrer}
              />
            )
               : activeCard3 &&
                cardIndex >= 5 &&
                topList === "Staking" &&
                chain === "bnb" ? (
                <BscConstantStakingiDyp
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultbsc}
                  referrer={referrer}
                  chainId={chainId}
                  handleConnection={handleConnection}
                />
              ) : activeCard3 &&
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
                />
              ) : activeCard3 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex >= 2 &&
                cardIndex < 4 ? (
                <StakeAvax30
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  coinbase={coinbase}
                  referrer={referrer}
                />
              ) : activeCard3 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex === 4 ? (
                <StakeAvax3
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  coinbase={coinbase}
                  referrer={referrer}
                />
              ) : activeCard3 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex >= 5 ? (
                <StakeAvaxiDyp
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  coinbase={coinbase}
                  referrer={referrer}
                />
              ) : activeCard3 && topList === "Vault" ? (
                <VaultCard
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  chainId={chainId}
                  coinbase={coinbase}
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
                {topPools.slice(3, 4).map((pool, index) => (
                  <TopPoolsCard
                    key={index}
                    chain={chain}
                    top_pick={pool.top_pick}
                    tokenName={pool.tokenName}
                    apr={pool.apy + "%"}
                    tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                    lockTime={
                      pool.lockTime ? pool.lockTime : locktimeFarm[index + 3]
                    }
                    tokenLogo={pool.icon}
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
                  />
                ) : chain === "bnb" ? (
                  <BscFarming
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_resultbsc}
                    lp_id={LP_IDBNB_Array[cardIndex]}
                    chainId={chainId}
                    handleConnection={handleConnection}
                  />
                ) : (
                  <FarmAvax
                    is_wallet_connected={isConnected}
                    handleConnection={handleConnection}
                    the_graph_result={the_graph_resultavax}
                    lp_id={LP_IDAVAX_Array[cardIndex]}
                    chainId={chainId}
                    coinbase={coinbase}
                  />
                )
              ) : activeCard4 && topList === "Buyback" && chain === "eth" ? (
                <BuybackStaking1
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  lp_id={lp_id[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                />
              ) : activeCard4 && topList === "Buyback" && chain === "avax" ? (
                <AvaxBuyback
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultavax}
                  lp_id={LP_IDAVAX_Array[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                />
              ) : activeCard4 && topList === "Buyback" && chain === "bnb" ? (
                <></>
              ) : activeCard4 &&
                topList === "Staking" &&
                cardIndex < 2 &&
                chain === "eth" ? (
                <ConstantStaking1
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  lp_id={lp_id[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                />
              ) : activeCard4 &&
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
                />
              ) : activeCard4 &&
              cardIndex >= 2 &&
              cardIndex < 4 &&
              topList === "Staking" &&
              chain === "bnb" ? (
              <BscConstantStake2
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultbsc}
                lp_id={LP_IDBNB_Array[cardIndex]}
                chainId={chainId}
                handleConnection={handleConnection}
              />
            ) : activeCard4 &&
              cardIndex === 4 &&
              topList === "Staking" &&
              chain === "bnb" ? (
              <BscConstantStakeDai
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultbsc}
                lp_id={LP_IDBNB_Array[cardIndex]}
                chainId={chainId}
                handleConnection={handleConnection}
                referrer={referrer}
              />
            )
              
              : activeCard4 &&
                cardIndex >= 5 &&
                topList === "Staking" &&
                chain === "bnb" ? (
                <BscConstantStakingiDyp
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultbsc}
                  referrer={referrer}
                  chainId={chainId}
                  handleConnection={handleConnection}
                />
              ) : activeCard4 &&
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
                />
              ) : activeCard4 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex >= 2 &&
                cardIndex < 4 ? (
                <StakeAvax30
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  coinbase={coinbase}
                  referrer={referrer}
                />
              ) : activeCard4 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex === 4 ? (
                <StakeAvax3
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  coinbase={coinbase}
                  referrer={referrer}
                />
              ) : activeCard4 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex >= 5 ? (
                <StakeAvaxiDyp
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  coinbase={coinbase}
                  referrer={referrer}
                />
              ) : activeCard4 && topList === "Vault" ? (
                <VaultCard
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  chainId={chainId}
                  coinbase={coinbase}
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
                {topPools.slice(4, 5).map((pool, index) => (
                  <TopPoolsCard
                    key={index}
                    chain={chain}
                    top_pick={pool.top_pick}
                    tokenName={pool.tokenName}
                    apr={pool.apy + "%"}
                    tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                    lockTime={
                      pool.lockTime ? pool.lockTime : locktimeFarm[index + 4]
                    }
                    tokenLogo={pool.icon}
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
                  />
                ) : chain === "bnb" ? (
                  <BscFarming
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_resultbsc}
                    lp_id={LP_IDBNB_Array[cardIndex]}
                    chainId={chainId}
                    handleConnection={handleConnection}
                  />
                ) : (
                  <FarmAvax
                    is_wallet_connected={isConnected}
                    handleConnection={handleConnection}
                    the_graph_result={the_graph_resultavax}
                    lp_id={LP_IDAVAX_Array[cardIndex]}
                    chainId={chainId}
                    coinbase={coinbase}
                  />
                )
              ) : activeCard5 && topList === "Buyback" && chain === "eth" ? (
                <BuybackStaking1
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  lp_id={lp_id[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                />
              ) : activeCard5 && topList === "Buyback" && chain === "avax" ? (
                <AvaxBuyback
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultavax}
                  lp_id={LP_IDAVAX_Array[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                />
              ) : activeCard5 && topList === "Buyback" && chain === "bnb" ? (
                <></>
              ) : activeCard5 &&
                topList === "Staking" &&
                cardIndex < 2 &&
                chain === "eth" ? (
                <ConstantStaking1
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  lp_id={lp_id[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                />
              ) : activeCard5 &&
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
                />
              ): activeCard5 &&
              cardIndex >= 2 &&
              cardIndex < 4 &&
              topList === "Staking" &&
              chain === "bnb" ? (
              <BscConstantStake2
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultbsc}
                lp_id={LP_IDBNB_Array[cardIndex]}
                chainId={chainId}
                handleConnection={handleConnection}
              />
            ) : activeCard5 &&
              cardIndex === 4 &&
              topList === "Staking" &&
              chain === "bnb" ? (
              <BscConstantStakeDai
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultbsc}
                lp_id={LP_IDBNB_Array[cardIndex]}
                chainId={chainId}
                handleConnection={handleConnection}
                referrer={referrer}
              />
            )
              
              : activeCard5 &&
                cardIndex >= 5 &&
                topList === "Staking" &&
                chain === "bnb" ? (
                <BscConstantStakingiDyp
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultbsc}
                  referrer={referrer}
                  chainId={chainId}
                  handleConnection={handleConnection}
                />
              ) : activeCard5 &&
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
                />
              ) : activeCard5 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex >= 2 &&
                cardIndex < 4 ? (
                <StakeAvax30
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  coinbase={coinbase}
                  referrer={referrer}
                />
              ) : activeCard5 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex === 4 ? (
                <StakeAvax3
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  coinbase={coinbase}
                  referrer={referrer}
                />
              ) : activeCard5 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex >= 5 ? (
                <StakeAvaxiDyp
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  coinbase={coinbase}
                  referrer={referrer}
                />
              ) : activeCard5 && topList === "Vault" ? (
                <VaultCard
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  chainId={chainId}
                  coinbase={coinbase}
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
                {topPools.slice(5, 6).map((pool, index) => (
                  <TopPoolsCard
                    key={index}
                    chain={chain}
                    top_pick={pool.top_pick}
                    tokenName={pool.tokenName}
                    apr={pool.apy + "%"}
                    tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                    lockTime={
                      pool.lockTime ? pool.lockTime : locktimeFarm[index + 5]
                    }
                    tokenLogo={pool.icon}
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
                  />
                ) : chain === "bnb" ? (
                  <BscFarming
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_resultbsc}
                    lp_id={LP_IDBNB_Array[cardIndex]}
                    chainId={chainId}
                    handleConnection={handleConnection}
                  />
                ) : (
                  <FarmAvax
                    is_wallet_connected={isConnected}
                    handleConnection={handleConnection}
                    the_graph_result={the_graph_resultavax}
                    lp_id={LP_IDAVAX_Array[cardIndex]}
                    chainId={chainId}
                    coinbase={coinbase}
                  />
                )
              ) : activeCard6 && topList === "Buyback" && chain === "eth" ? (
                <BuybackStaking1
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  lp_id={lp_id[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                />
              ) : activeCard6 && topList === "Buyback" && chain === "avax" ? (
                <AvaxBuyback
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultavax}
                  lp_id={LP_IDAVAX_Array[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                />
              ) : activeCard6 && topList === "Buyback" && chain === "bnb" ? (
                <></>
              ) : activeCard6 &&
                topList === "Staking" &&
                cardIndex < 2 &&
                chain === "eth" ? (
                <ConstantStaking1
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  lp_id={lp_id[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                />
              ) : activeCard6 &&
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
                />
              ) : activeCard6 &&
                cardIndex >= 5 &&
                topList === "Staking" &&
                chain === "bnb" ? (
                <BscConstantStakingiDyp
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultbsc}
                  referrer={referrer}
                  chainId={chainId}
                  handleConnection={handleConnection}
                />
              ) : activeCard6 &&
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
                />
              ) : activeCard6 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex >= 2 &&
                cardIndex < 4 ? (
                <StakeAvax30
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  coinbase={coinbase}
                  referrer={referrer}
                />
              ) : activeCard6 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex === 4 ? (
                <StakeAvax3
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  coinbase={coinbase}
                  referrer={referrer}
                />
              ) : activeCard6 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex >= 5 ? (
                <StakeAvaxiDyp
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  coinbase={coinbase}
                  referrer={referrer}
                />
              ) : activeCard6 && topList === "Vault" ? (
                <VaultCard
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  chainId={chainId}
                  coinbase={coinbase}
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
                {topPools.slice(6, 7).map((pool, index) => (
                  <TopPoolsCard
                    key={index}
                    chain={chain}
                    top_pick={pool.top_pick}
                    tokenName={pool.tokenName}
                    apr={pool.apy + "%"}
                    tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                    lockTime={
                      pool.lockTime ? pool.lockTime : locktimeFarm[index + 6]
                    }
                    tokenLogo={pool.icon}
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
                  />
                ) : chain === "bnb" ? (
                  <BscFarming
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_resultbsc}
                    lp_id={LP_IDBNB_Array[cardIndex]}
                    chainId={chainId}
                    handleConnection={handleConnection}
                  />
                ) : (
                  <FarmAvax
                    is_wallet_connected={isConnected}
                    handleConnection={handleConnection}
                    the_graph_result={the_graph_resultavax}
                    lp_id={LP_IDAVAX_Array[cardIndex]}
                    chainId={chainId}
                    coinbase={coinbase}
                  />
                )
              ) : activeCard7 && topList === "Buyback" && chain === "eth" ? (
                <BuybackStaking1
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  lp_id={lp_id[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                />
              ) : activeCard7 && topList === "Buyback" && chain === "avax" ? (
                <AvaxBuyback
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultavax}
                  lp_id={LP_IDAVAX_Array[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                />
              ) : activeCard7 && topList === "Buyback" && chain === "bnb" ? (
                <></>
              ) : activeCard7 &&
                topList === "Staking" &&
                cardIndex < 2 &&
                chain === "eth" ? (
                <ConstantStaking1
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  lp_id={lp_id[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                />
              ) : activeCard7 &&
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
                />
              ) : activeCard7 &&
                cardIndex >= 5 &&
                topList === "Staking" &&
                chain === "bnb" ? (
                <BscConstantStakingiDyp
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultbsc}
                  referrer={referrer}
                  chainId={chainId}
                  handleConnection={handleConnection}
                />
              ) : activeCard7 &&
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
                />
              ) : activeCard7 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex >= 2 &&
                cardIndex < 4 ? (
                <StakeAvax30
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  coinbase={coinbase}
                  referrer={referrer}
                />
              ) : activeCard7 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex === 4 ? (
                <StakeAvax3
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  coinbase={coinbase}
                  referrer={referrer}
                />
              ) : activeCard7 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex >= 5 ? (
                <StakeAvaxiDyp
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  coinbase={coinbase}
                  referrer={referrer}
                />
              ) : activeCard7 && topList === "Vault" ? (
                <VaultCard
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  chainId={chainId}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                />
              ) : (
                <></>
              )}
            </>
            <>
              <div
                className="top-picks-container"
                style={{ marginTop: topPools.length >= 9 && "25px" }}
              >
                {topPools.slice(7, 8).map((pool, index) => (
                  <TopPoolsCard
                    key={index}
                    chain={chain}
                    top_pick={pool.top_pick}
                    tokenName={pool.tokenName}
                    apr={pool.apy + "%"}
                    tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                    lockTime={
                      pool.lockTime ? pool.lockTime : locktimeFarm[index + 7]
                    }
                    tokenLogo={pool.icon}
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
                  />
                ) : chain === "bnb" ? (
                  <BscFarming
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_resultbsc}
                    lp_id={LP_IDBNB_Array[cardIndex]}
                    chainId={chainId}
                    handleConnection={handleConnection}
                  />
                ) : (
                  <FarmAvax
                    is_wallet_connected={isConnected}
                    handleConnection={handleConnection}
                    the_graph_result={the_graph_resultavax}
                    lp_id={LP_IDAVAX_Array[cardIndex]}
                    chainId={chainId}
                    coinbase={coinbase}
                  />
                )
              ) : activeCard8 && topList === "Buyback" && chain === "eth" ? (
                <BuybackStaking1
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  lp_id={lp_id[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                />
              ) : activeCard8 && topList === "Buyback" && chain === "avax" ? (
                <AvaxBuyback
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultavax}
                  lp_id={LP_IDAVAX_Array[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                />
              ) : activeCard8 && topList === "Buyback" && chain === "bnb" ? (
                <></>
              ) : activeCard8 &&
                topList === "Staking" &&
                cardIndex < 2 &&
                chain === "eth" ? (
                <ConstantStaking1
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  lp_id={lp_id[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                />
              ) : activeCard8 &&
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
                />
              ) : activeCard8 &&
                cardIndex >= 5 &&
                topList === "Staking" &&
                chain === "bnb" ? (
                <BscConstantStakingiDyp
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultbsc}
                  referrer={referrer}
                  chainId={chainId}
                  handleConnection={handleConnection}
                />
              ) : activeCard8 &&
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
                />
              ) : activeCard8 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex >= 2 &&
                cardIndex < 4 ? (
                <StakeAvax30
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  coinbase={coinbase}
                  referrer={referrer}
                />
              ) : activeCard8 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex === 4 ? (
                <StakeAvax3
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  coinbase={coinbase}
                  referrer={referrer}
                />
              ) : activeCard8 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex >= 5 ? (
                <StakeAvaxiDyp
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  coinbase={coinbase}
                  referrer={referrer}
                />
              ) : activeCard8 && topList === "Vault" ? (
                <VaultCard
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  chainId={chainId}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                />
              ) : (
                <></>
              )}
            </>
            <>
              <div
                className="top-picks-container"
                style={{ marginTop: topPools.length >= 9 && "25px" }}
              >
                {topPools.slice(8, 9).map((pool, index) => (
                  <TopPoolsCard
                    key={index}
                    chain={chain}
                    top_pick={pool.top_pick}
                    tokenName={pool.tokenName}
                    apr={pool.apy + "%"}
                    tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                    lockTime={
                      pool.lockTime ? pool.lockTime : locktimeFarm[index + 8]
                    }
                    tokenLogo={pool.icon}
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
                  />
                ) : chain === "bnb" ? (
                  <BscFarming
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_resultbsc}
                    lp_id={LP_IDBNB_Array[cardIndex]}
                    chainId={chainId}
                    handleConnection={handleConnection}
                  />
                ) : (
                  <FarmAvax
                    is_wallet_connected={isConnected}
                    handleConnection={handleConnection}
                    the_graph_result={the_graph_resultavax}
                    lp_id={LP_IDAVAX_Array[cardIndex]}
                    chainId={chainId}
                    coinbase={coinbase}
                  />
                )
              ) : activeCard9 && topList === "Buyback" && chain === "eth" ? (
                <BuybackStaking1
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  lp_id={lp_id[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                />
              ) : activeCard9 && topList === "Buyback" && chain === "avax" ? (
                <AvaxBuyback
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultavax}
                  lp_id={LP_IDAVAX_Array[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                />
              ) : activeCard9 && topList === "Buyback" && chain === "bnb" ? (
                <></>
              ) : activeCard9 &&
                topList === "Staking" &&
                cardIndex < 2 &&
                chain === "eth" ? (
                <ConstantStaking1
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  lp_id={lp_id[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                />
              ) : activeCard9 &&
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
                />
              ) : activeCard9 &&
                cardIndex >= 5 &&
                topList === "Staking" &&
                chain === "bnb" ? (
                <BscConstantStakingiDyp
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultbsc}
                  referrer={referrer}
                  chainId={chainId}
                  handleConnection={handleConnection}
                />
              ) : activeCard9 &&
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
                />
              ) : activeCard9 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex >= 2 &&
                cardIndex < 4 ? (
                <StakeAvax30
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  coinbase={coinbase}
                  referrer={referrer}
                />
              ) : activeCard9 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex === 4 ? (
                <StakeAvax3
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  coinbase={coinbase}
                  referrer={referrer}
                />
              ) : activeCard9 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex >= 5 ? (
                <StakeAvaxiDyp
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  coinbase={coinbase}
                  referrer={referrer}
                />
              ) : activeCard9 && topList === "Vault" ? (
                <VaultCard
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  chainId={chainId}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                />
              ) : (
                <></>
              )}
            </>
            <>
              <div
                className="top-picks-container"
                style={{ marginTop: topPools.length > 9 && "25px" }}
              >
                {topPools.slice(9, 10).map((pool, index) => (
                  <TopPoolsCard
                    key={index}
                    chain={chain}
                    top_pick={pool.top_pick}
                    tokenName={pool.tokenName}
                    apr={pool.apy + "%"}
                    tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                    lockTime={
                      pool.lockTime ? pool.lockTime : locktimeFarm[index + 9]
                    }
                    tokenLogo={pool.icon}
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
                  />
                ) : chain === "bnb" ? (
                  <BscFarming
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_resultbsc}
                    lp_id={LP_IDBNB_Array[cardIndex]}
                    chainId={chainId}
                    handleConnection={handleConnection}
                  />
                ) : (
                  <FarmAvax
                    is_wallet_connected={isConnected}
                    handleConnection={handleConnection}
                    the_graph_result={the_graph_resultavax}
                    lp_id={LP_IDAVAX_Array[cardIndex]}
                    chainId={chainId}
                    coinbase={coinbase}
                  />
                )
              ) : activeCard10 && topList === "Buyback" && chain === "eth" ? (
                <BuybackStaking1
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  lp_id={lp_id[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                />
              ) : activeCard10 && topList === "Buyback" && chain === "avax" ? (
                <AvaxBuyback
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultavax}
                  lp_id={LP_IDAVAX_Array[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                />
              ) : activeCard10 && topList === "Buyback" && chain === "bnb" ? (
                <></>
              ) : activeCard10 &&
                topList === "Staking" &&
                cardIndex < 2 &&
                chain === "eth" ? (
                <ConstantStaking1
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  lp_id={lp_id[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                />
              ) : activeCard10 &&
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
                />
              ) : activeCard10 &&
                cardIndex >= 5 &&
                topList === "Staking" &&
                chain === "bnb" ? (
                <BscConstantStakingiDyp
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultbsc}
                  referrer={referrer}
                  chainId={chainId}
                  handleConnection={handleConnection}
                />
              ) : activeCard10 &&
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
                />
              ) : activeCard10 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex >= 2 &&
                cardIndex < 4 ? (
                <StakeAvax30
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  coinbase={coinbase}
                  referrer={referrer}
                />
              ) : activeCard10 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex === 4 ? (
                <StakeAvax3
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  coinbase={coinbase}
                  referrer={referrer}
                />
              ) : activeCard10 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex >= 5 ? (
                <StakeAvaxiDyp
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  coinbase={coinbase}
                  referrer={referrer}
                />
              ) : activeCard10 && topList === "Vault" ? (
                <VaultCard
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  chainId={chainId}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                />
              ) : (
                <></>
              )}
            </>
            <>
              <div
                className="top-picks-container"
                style={{ marginTop: topPools.length > 9 && "25px" }}
              >
                {topPools.slice(10, 11).map((pool, index) => (
                  <TopPoolsCard
                    key={index}
                    chain={chain}
                    top_pick={pool.top_pick}
                    tokenName={pool.tokenName}
                    apr={pool.apy + "%"}
                    tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                    lockTime={
                      pool.lockTime ? pool.lockTime : locktimeFarm[index + 10]
                    }
                    tokenLogo={pool.icon}
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
                  />
                ) : chain === "bnb" ? (
                  <BscFarming
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_resultbsc}
                    lp_id={LP_IDBNB_Array[cardIndex]}
                    chainId={chainId}
                    handleConnection={handleConnection}
                  />
                ) : (
                  <FarmAvax
                    is_wallet_connected={isConnected}
                    handleConnection={handleConnection}
                    the_graph_result={the_graph_resultavax}
                    lp_id={LP_IDAVAX_Array[cardIndex]}
                    chainId={chainId}
                    coinbase={coinbase}
                  />
                )
              ) : activeCard11 && topList === "Buyback" && chain === "eth" ? (
                <BuybackStaking1
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  lp_id={lp_id[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                />
              ) : activeCard11 && topList === "Buyback" && chain === "avax" ? (
                <AvaxBuyback
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultavax}
                  lp_id={LP_IDAVAX_Array[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                />
              ) : activeCard11 && topList === "Buyback" && chain === "bnb" ? (
                <></>
              ) : activeCard11 &&
                topList === "Staking" &&
                cardIndex < 2 &&
                chain === "eth" ? (
                <ConstantStaking1
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  lp_id={lp_id[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                />
              ) : activeCard11 &&
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
                />
              ) : activeCard11 &&
                cardIndex >= 5 &&
                topList === "Staking" &&
                chain === "bnb" ? (
                <BscConstantStakingiDyp
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultbsc}
                  referrer={referrer}
                  chainId={chainId}
                  handleConnection={handleConnection}
                />
              ) : activeCard11 &&
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
                />
              ) : activeCard11 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex >= 2 &&
                cardIndex < 4 ? (
                <StakeAvax30
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  coinbase={coinbase}
                  referrer={referrer}
                />
              ) : activeCard11 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex === 4 ? (
                <StakeAvax3
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  coinbase={coinbase}
                  referrer={referrer}
                />
              ) : activeCard11 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex >= 5 ? (
                <StakeAvaxiDyp
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  coinbase={coinbase}
                  referrer={referrer}
                />
              ) : activeCard11 && topList === "Vault" ? (
                <VaultCard
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  chainId={chainId}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                />
              ) : (
                <></>
              )}
            </>
            <>
              <div
                className="top-picks-container"
                style={{ marginTop: topPools.length > 9 && "25px" }}
              >
                {topPools.slice(11, topPools.length).map((pool, index) => (
                  <TopPoolsCard
                    key={index}
                    chain={chain}
                    top_pick={pool.top_pick}
                    tokenName={pool.tokenName}
                    apr={pool.apy + "%"}
                    tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                    lockTime={
                      pool.lockTime ? pool.lockTime : locktimeFarm[index + 11]
                    }
                    tokenLogo={pool.icon}
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
                  />
                )}
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
                  />
                ) : chain === "bnb" ? (
                  <BscFarming
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_resultbsc}
                    lp_id={LP_IDBNB_Array[cardIndex]}
                    chainId={chainId}
                    handleConnection={handleConnection}
                  />
                ) : (
                  <FarmAvax
                    is_wallet_connected={isConnected}
                    handleConnection={handleConnection}
                    the_graph_result={the_graph_resultavax}
                    lp_id={LP_IDAVAX_Array[cardIndex]}
                    chainId={chainId}
                    coinbase={coinbase}
                  />
                )
              ) : activeCard12 && topList === "Buyback" && chain === "eth" ? (
                <BuybackStaking1
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  lp_id={lp_id[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                />
              ) : activeCard12 && topList === "Buyback" && chain === "avax" ? (
                <AvaxBuyback
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultavax}
                  lp_id={LP_IDAVAX_Array[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                />
              ) : activeCard12 && topList === "Buyback" && chain === "bnb" ? (
                <></>
              ) : activeCard12 &&
                topList === "Staking" &&
                cardIndex < 2 &&
                chain === "eth" ? (
                <ConstantStaking1
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  lp_id={lp_id[cardIndex]}
                  chainId={chainId}
                  handleConnection={handleConnection}
                />
              ) : activeCard12 &&
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
                />
              ) : activeCard12 &&
                cardIndex >= 5 &&
                topList === "Staking" &&
                chain === "bnb" ? (
                <BscConstantStakingiDyp
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultbsc}
                  referrer={referrer}
                  chainId={chainId}
                  handleConnection={handleConnection}
                />
              ) : activeCard12 &&
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
                />
              ) : activeCard12 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex >= 2 &&
                cardIndex < 4 ? (
                <StakeAvax30
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  coinbase={coinbase}
                  referrer={referrer}
                />
              ) : activeCard12 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex === 4 ? (
                <StakeAvax3
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  coinbase={coinbase}
                  referrer={referrer}
                />
              ) : activeCard12 &&
                topList === "Staking" &&
                chain === "avax" &&
                cardIndex >= 5 ? (
                <StakeAvaxiDyp
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  the_graph_result={the_graph_resultavax}
                  chainId={chainId}
                  coinbase={coinbase}
                  referrer={referrer}
                />
              ) : activeCard12 && topList === "Vault" ? (
                <VaultCard
                  is_wallet_connected={isConnected}
                  handleConnection={handleConnection}
                  chainId={chainId}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                />
              ) : (
                activeCardNFT && (
                  <CawsDetails
                    coinbase={coinbase}
                    isConnected={isConnected}
                    listType={listType}
                  />
                )
              )}
            </>
          </div>
        )
      ) : (
        <div className="list-pools-container px-0">
          {topPools.map((pool, index) => (
            <TopPoolsListCard
              key={index}
              chain={chain}
              top_pick={pool.top_pick}
              tokenName={pool.tokenName}
              apr={pool.apy + "%"}
              tvl={"$" + getFormattedNumber(pool.tvl_usd)}
              lockTime={pool.lockTime ? pool.lockTime : "No Lock"}
              cardType={topList}
              tokenLogo={pool.icon}
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
              cardIndex={cardIndex}
              chainId={chainId}
              handleConnection={handleConnection}
              coinbase={coinbase}
              referrer={referrer}
              lp_id={lp_id[cardIndex]}
              the_graph_result={the_graph_result}
              isConnected={isConnected}
              the_graph_resultavax={the_graph_resultavax}
            />
          ))}
        </div>
      )}
    </div>
  ) : (
    <div
      className="w-100 d-flex justify-content-center align-items-center mt-5"
      style={{ minHeight: "240px" }}
    >
      <FadeLoader color="#7770DF" />
    </div>
  );
};

export default EarnTopPicks;

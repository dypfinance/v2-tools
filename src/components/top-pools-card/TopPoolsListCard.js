import React, { useEffect, useState } from "react";
import greenArrow from "./assets/greenarrow.svg";
import orangeArrow from "./assets/orangearrow.svg";
import topPick from "./assets/toppick.svg";
import "./top-pools.css";
import initStakingNew from "../FARMINNG/staking-new-front";
import initBuybackStakingNew from "../FARMINNG/buy-back-staking-new-front";
import initConstantStakingNew from "../FARMINNG/constant-staking-new-front";
import initConstantStakingiDYP from "../FARMINNG/constant-staking-idyp-new-front";
import initVaultNew from "../FARMINNG/vault-new";
import initFarmAvax from "../FARMINNG/farmAvax";
import stakeAvax from "../FARMINNG/stakeAvax";
import avaxBuyback from "../FARMINNG/avaxBuyback";
import stakeAvax30 from "../FARMINNG/stakeAvax30";
import stakeAvax3 from "../FARMINNG/stakeAvax3";
import stakeAvaxiDyp from "../FARMINNG/stakeAvaxiDyp";
import CawsDetails from "../FARMINNG/caws";
import initBscBuyback from "../FARMINNG/bscBuyback";
import initBscFarming from "../FARMINNG/bscFarming";
import initbscConstantStaking from "../FARMINNG/bscConstantStake";
import initbscConstantStaking2 from "../FARMINNG/bscConstantStake2";
import initbscConstantStakingDai from "../FARMINNG/bscConstantStakeDai";
import initbscConstantStakingiDyp from "../FARMINNG/bscConstantStakeiDyp";
import initConstantStakingNewDai from "../FARMINNG/constant-staking-dai-front";

const TopPoolsListCard = ({
  tokenLogo,
  cardId,
  tokenName,
  apr,
  lockTime,
  tvl,
  onShowDetailsClick,
  onHideDetailsClick,
  top_pick,
  cardType,
  chain,
  topList,
  cardIndex,
  chainId,
  handleConnection,
  handleSwitchNetwork,
  coinbase,
  referrer,
  isConnected,
  the_graph_result,
  lp_id,
  the_graph_resultavax,
  the_graph_resultbsc,
  listType,
  display,
  expired,
  expiredPools,
  
}) => {
  const ethCoins = ["ethereum", "wbtc", "usdc", "usdt"];
  const bscCoins = [
    "bsc",
    "btcb",
    "ethereum",
    "busd",
    "pancakeswap",
    "idypius",
  ];
  const avaxCoins = [
    "avax",
    "ethereum",
    "wbtc",
    "usdt",
    "usdc",
    "dai",
    "idypius",
    "pangolin",
    "benqi",
    "xava",
    "link",
  ];
  const [activeCardNFT, setActiveCardNFT] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [coins, setCoins] = useState(ethCoins);
  const [cardIndexiDyp, setcardIndexiDyp] = useState();
  const [cardIndexavax30, setcardIndexavax30] = useState();
  const [cardIndexavaxiDyp, setcardIndexavaxiDyp] = useState();
 
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


  const feeArray = [0.3, 0.3, 0.4, 0.8, 1.2]; 

  const lockarrayFarm = ["No Lock", 3, 30, 60, 90];



  const StakingNew1 = initStakingNew({
    token: window.token_new,
    staking: stakeArray[cardIndex-1],
    chainId: chainId,
    constant: constantArray[cardIndex-1],
    liquidity: eth_address,
    lp_symbol: "USD",
    reward: "30,000",
    lock: "3 Days",
    finalApr: expiredPools ? expiredPools[cardIndex-1]?.apy_percent : 0,
    rebase_factor: rebase_factors[0],
    expiration_time: "14 December 2022",
    fee: feeArray[cardIndex-1],
    handleConnection: handleConnection,
    lockTime: lockarrayFarm[cardIndex-1],
    listType: listType,
  });


  const stakeArrayiDYPActive = [
    window.constant_staking_idyp_3,
    window.constant_staking_idyp_4,
  ];

  const performancefeeArrayidypActive = [1, 3.5];

  
  const withdrawFeeiDypActive = [0, 0];

  const aprArrayiDypActive = [ 15, 30];


  const lockarrayiDypActive = ["No Lock", 90];




  const expirationArrayActive = [
    "15 August 2023",
    "15 August 2023",
  ];


  const ConstantStakingiDYP1Active = initConstantStakingiDYP({
    staking: stakeArrayiDYPActive[cardIndex -1],
    apr: aprArrayiDypActive[cardIndex -1],
    finalApr: aprArrayiDypActive[cardIndex -1] - performancefeeArrayidypActive[cardIndex -1],
    liquidity: eth_address,
    expiration_time: expirationArrayActive[cardIndex -1],
    other_info: false,
    fee_s: performancefeeArrayidypActive[cardIndex -1],
    fee_u: withdrawFeeiDypActive[cardIndex -1],
    coinbase: coinbase,
    handleConnection: handleConnection,
    chainId: chainId,
    lockTime: lockarrayiDypActive[cardIndex -1],
    listType: listType,
    handleSwitchNetwork: { handleSwitchNetwork },
  });

  const [mystakes, setMystakes] = useState([]);

  
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

  const FarmAvax = initFarmAvax({
    token: window.token_newavax,
    staking: stakeArrayFarmAvax[cardIndex-1],
    constant: constantArrayFarmAvax[cardIndex-1],
    finalApr: expiredPools ? expiredPools[cardIndex-1]?.apy_percent : 0,
    liquidity: wbnb_address,
    lp_symbol: "USD",
    reward: "30,000",
    lock: lockarrayFarmAvax[cardIndex-1],
    rebase_factor: rebase_factorsavax[0],
    expiration_time: "6 December 2022",
    fee: feearrayFarmAvax[cardIndex-1],
    coinbase: coinbase,
    lockTime: lockarrayFarm[cardIndex-1],
    listType: listType,
    chainId: chainId,

  });





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
  const aprarrayStakeAvax = [30, 10];
  const aprarrayStakeAvaxActive = [30, 10];

  const feearrayStakeAvax = [3.5, 1];
  const feearrayStakeAvaxActive = [3.5, 1];


  const stakingarrayStakeAvaxActive = [
    window.constant_staking_new10,
    window.constant_staking_new11,
  ];

  const expirearrayStakeAvaxActive = [
    "14 July 2023",
    "05 August 2023",
  ];


  const stakingarrayStakeAvax = [
    window.constant_staking_new10,
    window.constant_staking_new11,
  ];


  

  const lockarrayStakeAvaxActive = [
    180,
    30
  ];



  const StakeAvaxActive = stakeAvax({
    finalApr: aprarrayStakeAvaxActive[cardIndex -1] - feearrayStakeAvaxActive[cardIndex -1],
    staking: stakingarrayStakeAvaxActive[cardIndex-1],
    apr: aprarrayStakeAvaxActive[cardIndex-1],
    liquidity: avax_address,
    expiration_time: expirearrayStakeAvaxActive[cardIndex-1],
    fee: feearrayStakeAvaxActive[cardIndex-1],
    coinbase: coinbase,
    chainId: chainId,
    referrer: referrer,
    lockTime: lockarrayStakeAvaxActive[cardIndex-1],
    listType: listType,
    handleSwitchNetwork: { handleSwitchNetwork },
  });


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
    handleSwitchNetwork: { handleSwitchNetwork },
  });

  const aprarrayStakeAvax30 = [25, 50];
  
  const feearrayStakeAvax30 = [0.25, 0.5];
  const stakingarrayStakeAvax30 = [
    window.constant_staking_newavax2,
    window.constant_staking_newavax1,
  ];


  const StakeAvax30 = stakeAvax30({
    staking: stakingarrayStakeAvax30[cardIndex - 1],
    apr: expiredPools ? expiredPools[cardIndex-1]?.apy_percent : 0,
    liquidity: avax_address,
    expiration_time: "6 December 2022",
    fee: expiredPools ? expiredPools[cardIndex-1]?.performancefee : 0,
    finalApr: expiredPools ? expiredPools[cardIndex]?.apy_performancefee : 0,
    coinbase: coinbase,
    chainId: chainId,
    lockTime: expiredPools ? expiredPools[cardIndex-1]?.lock_time?.split(" ")[0] === "No"
    ? "No Lock"
    : expiredPools[cardIndex-1]?.lock_time?.split(" ")[0] : "No Lock",
    listType: listType,
    handleSwitchNetwork: { handleSwitchNetwork },
  });

  const StakeAvax3 = stakeAvax3({
    finalApr: expiredPools ? expiredPools[cardIndex-1]?.apy_performancefee:0,
    staking: window.constant_stakingdaiavax,
    apr: 25,
    liquidity: avax_address,
    expiration_time: "Expired",
    coinbase: coinbase,
    chainId: chainId,
    lockTime: expiredPools ? expiredPools[cardIndex-1]?.lock_time?.split(" ")[0] === "No"
    ? "No Lock"
    : expiredPools[cardIndex-1]?.lock_time?.split(" ")[0] : "No Lock",
    listType: listType,
    handleSwitchNetwork: { handleSwitchNetwork },
  });

  const aprarrayStakeAvaxiDyp = [20, 50];
  const feeSarrayStakeAvaxiDyp = [0, 0, 1, 3.5];
  const feeUarrayStakeAvaxiDyp = [0.25, 0.25, 0, 0];
  const otherinfoarrayStakeAvaxiDyp = [true, true, false, false];

  const expirearrayStakeAvaxiDyp = [
    "28 February 2023",
    "28 February 2023",
  ];

  const stakingarrayStakeAvaxiDyp = [
    window.constant_staking_idypavax_2,
    window.constant_staking_idypavax_1,
  ];

  const stakingarrayStakeAvaxiDypActive = [
    window.constant_staking_idypavax_6,
    window.constant_staking_idypavax_5,

  ];

  const aprarrayStakeAvaxiDypActive = [30,15];

  
  const expirearrayStakeAvaxiDypActive = [
    "15 August 2023",
    "15 August 2023",
  ];

  const feeSarrayStakeAvaxiDypActive = [3.5,1];
  const feeUarrayStakeAvaxiDypActive = [0, 0];


  const StakeAvaxiDypActive = stakeAvaxiDyp({
    finalApr: aprarrayStakeAvaxiDypActive[cardIndex -3] - feeSarrayStakeAvaxiDypActive[cardIndex -3],
    staking: stakingarrayStakeAvaxiDypActive[cardIndex-3],
    apr: aprarrayStakeAvaxiDypActive[cardIndex-3],
    liquidity: avax_address,
    expiration_time: expirearrayStakeAvaxiDypActive[cardIndex-3],
    other_info: false,
    fee_s: feeSarrayStakeAvaxiDypActive[cardIndex-3],
    fee_u: feeUarrayStakeAvaxiDypActive[cardIndex-3],
    listType: listType,
    handleSwitchNetwork: { handleSwitchNetwork },
    chainId: chainId,

  });

  const StakeAvaxiDyp = stakeAvaxiDyp({
    staking: stakingarrayStakeAvaxiDyp[cardIndex - 4],
    apr: expiredPools ? expiredPools[cardIndex-1]?.apy_percent : 0,
    finalApr: expiredPools ? expiredPools[cardIndex-1]?.apy_performancefee : 0,
    liquidity: avax_address,
    expiration_time: expirearrayStakeAvaxiDyp[cardIndex - 4],
    other_info: true,
    fee_s: expiredPools ? expiredPools[cardIndex-1]?.performancefee : 0,
    fee_u: feeUarrayStakeAvaxiDyp[cardIndex-4],
    listType: listType,
    handleSwitchNetwork: { handleSwitchNetwork },
    chainId: chainId,
    lockTime: expiredPools ? expiredPools[cardIndex-1]?.lock_time?.split(" ")[0] : "No Lock",
  });

  const lockarray = ["No Lock", 90];


  const stakeArrayStakeNew = [
    window.constant_staking_new2,
    window.constant_staking_new1,
  ];

  const feeArrayStake = [0.25, 0.5];
  const aprArrayStake = [25, 50];


  const ConstantStaking1 = initConstantStakingNew({
    staking: stakeArrayStakeNew[cardIndex-1],
    apr: aprArrayStake[cardIndex],
    finalApr: aprArrayStake[cardIndex -1] - feeArrayStake[cardIndex -1],
    liquidity: eth_address,
    expiration_time: "14 December 2022",
    other_info: false,
    fee: feeArrayStake[cardIndex],
    coinbase: coinbase,
    handleConnection: handleConnection,
    chainId: chainId,
    lockTime: lockarray[cardIndex],
    listType: listType,
    handleSwitchNetwork: { handleSwitchNetwork },
  });



  const stakeArrayiDYP = [
    window.constant_staking_idyp_2,
    window.constant_staking_idyp_1,
  ];

  const aprArrayiDyp = [45,20];

  const expirationArray = [
    "28 February 2023",
    "28 February 2023", 
  ];

  const performancefeeArrayidyp = [0,0];

  const lockarrayiDyp = [ 90 , "No Lock"];
  const withdrawFeeiDyp = [ 0, 0];


  const ConstantStakingiDYP1 = initConstantStakingiDYP({
    staking: stakeArrayiDYP[cardIndex - 4],
    apr: aprArrayiDyp[cardIndex - 4],
    finalApr: aprArrayiDyp[cardIndex - 4] - performancefeeArrayidyp[cardIndex - 4],
    liquidity: eth_address,
    expiration_time: expirationArray[cardIndex - 4],
    other_info: true,
    fee_s: performancefeeArrayidyp[cardIndex - 4],
    fee_u: withdrawFeeiDyp[cardIndex - 4],
    coinbase: coinbase,
    handleConnection: handleConnection,
    chainId: chainId,
    lockTime: lockarrayiDyp[cardIndex - 4],
    listType: listType,
    handleSwitchNetwork: { handleSwitchNetwork },
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
    window.vault_usdc,
    window.token_usdt,
    window.vault_dai,
  ];

  const LP_IDBNB_Array = [
    LP_IDs_V2BNB.wbnb[0],
    LP_IDs_V2BNB.wbnb[1],
    LP_IDs_V2BNB.wbnb[2],
    LP_IDs_V2BNB.wbnb[3],
    LP_IDs_V2BNB.wbnb[4],
  ];

  const vaultplatformArray = [10, 10, 15, 15, 15];
  const vaultdecimalsArray = [18, 8, 6, 6, 18];
  const vaultsymbolArray = ["WETH", "WBTC",  "USDC","USDT", "DAI"];

  const VaultCard = initVaultNew({
    vault: vaultArray[cardIndex-1],
    token: tokenvaultArray[cardIndex-1],
    platformTokenApyPercent: vaultplatformArray[cardIndex-1],
    UNDERLYING_DECIMALS: vaultdecimalsArray[cardIndex-1],
    UNDERLYING_SYMBOL: vaultsymbolArray[cardIndex-1],
    expiration_time: "04 March 2023",
    coinbase: coinbase,
    lockTime: "No Lock",
    handleConnection: handleConnection,
    chainId: chainId,
    handleSwitchNetwork: { handleSwitchNetwork },
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
  const lockarrayFarmbsc = ["No Lock", 3, 30, 60, 90];

  const BscFarming = initBscFarming({
    token: window.token_newbsc,
    staking: bscFarmArrayStake[cardIndex-1],
    chainId: chainId,
    constant: bscFarmArrayConst[cardIndex-1],
    liquidity: wbsc_address,
    lp_symbol: "USD",
    reward: "30,000",
    lock: "3 Days",
    rebase_factor: rebase_factorsbsc[0],
    expiration_time: "19 November 2022",
    fee: bscFarmArrayFee[cardIndex-1],
    handleConnection: handleConnection,
    lockTime: lockarrayFarmbsc[cardIndex],
    finalApr: expiredPools ? expiredPools[cardIndex-1]?.apy_percent : 0,
    listType: listType,
    handleSwitchNetwork: { handleSwitchNetwork },
  });

  const feearrayStakeBscActive = [3.5, 1];

  const expirearrayStakeBscActive = [
    "14 July 2023",
    "5 August 2023",
  ];

  const aprarrayStakeBscActive = [30, 10];

  
  const stakearrayStakeBscActive = [
    window.constant_stakingbsc_new10,
    window.constant_stakingbsc_new11,
  ];
 
  const lockarrayStakeBscActive = [
    180,
    30,
  ];


  const BscConstantStakeActive = initbscConstantStaking({
    staking: stakearrayStakeBscActive[cardIndex-1],
    apr: aprarrayStakeBscActive[cardIndex-1],
    finalApr: aprarrayStakeBscActive[cardIndex -1] - feearrayStakeBscActive[cardIndex -1],
    liquidity: wbsc_address,
    expiration_time: expirearrayStakeBscActive[cardIndex-1],
    fee: feearrayStakeBscActive[cardIndex-1],
    coinbase: coinbase,
    chainId: chainId,
    lockTime: lockarrayStakeBscActive[cardIndex-1],
    listType: listType,
    other_info: false,
    handleSwitchNetwork: { handleSwitchNetwork },
  });


  const aprarrayStakeBsc = [0.27,0.14];
  const feearrayStakeBsc = [0.5,0.25];

  const lockarrayStakeBSC= [
    90, 'No Lock',
  ];

  const lockarrayStakebsciDYP = [ 
    "No Lock",
    90,
    90,
    "No Lock",
    90,
    "No Lock",
    90,
  ];
  
  const feearrayStakeBsciDYP = [ 0, 0, 1, 3.5];

  const aprarrayStakeBsciDYP = [25, 20, 45, 15, 30];

  const stakearrayStakeBsciDyp = [
    window.constant_stakingidyp_1,
    window.constant_stakingidyp_2,
    window.constant_stakingidyp_5,
    window.constant_stakingidyp_6,
  ];



  const expirearrayStakeBsciDYP = [
    
    "28 February 2023",
    "28 February 2023",
    "15 August 2023",
    "15 August 2023",
  ];


   const expirearrayStakeBsc = [
    "17 November 2022",
    "17 November 2022",
  ];
  
  
  
  const stakearrayStakeBsc = [
    window.constant_stakingbsc_new13,
    window.constant_stakingbsc_new12,
  ];
  

  const BscConstantStake2 = initbscConstantStaking2({
    staking: cardIndex === 3 ? stakearrayStakeBsc[cardIndex-2] : stakearrayStakeBsc[cardIndex-1],
    apr:  expiredPools ? expiredPools[cardIndex-1]?.apy_percent : 0,
    finalApr: expiredPools ? expiredPools[cardIndex-1]?.apy_performancefee : 0,
    liquidity: wbsc_address,
    expiration_time: cardIndex === 3 ? expirearrayStakeBsc[cardIndex-2] : expirearrayStakeBsc[cardIndex-1],
    fee: expiredPools ? expiredPools[cardIndex-1]?.performancefee: 0,
    coinbase: coinbase,
    chainId: chainId,
    lockTime:  expiredPools ? expiredPools[cardIndex-1]?.lock_time?.split(" ")[0] === "No"
    ? "No Lock"
    : parseInt(expiredPools[cardIndex-1]?.lock_time?.split(" ")[0]) : 0,
    listType: listType,
    other_info: true,
    handleSwitchNetwork: { handleSwitchNetwork },
  });


  
  const BscConstantStakeDai = initbscConstantStakingDai({
    staking: window.constant_stakingdaibsc,
    finalApr: expiredPools ? expiredPools[cardIndex-1]?.apy_performancefee : 0,
    apr: expiredPools ? expiredPools[cardIndex-1]?.apy_percent : 0,
    liquidity: wbsc_address,
    expiration_time: "Expired",
    fee: expiredPools ? expiredPools[cardIndex-1]?.performancefee : 0,
    coinbase: coinbase,
    chainId: chainId,
    lockTime:  expiredPools ? expiredPools[cardIndex-1]?.lock_time?.split(" ")[0] === "No"
    ? "No Lock"
    : parseInt(expiredPools[cardIndex-1]?.lock_time?.split(" ")[0]) : 0,
    listType: listType,
    other_info: true,
    handleSwitchNetwork: { handleSwitchNetwork },
  });

  
  const stakearrayStakeBscidypActive = [
    window.constant_stakingidyp_6,
    window.constant_stakingidyp_5,
  ];




  const aprarrayStakeBscidypActive = [30, 15];
 

  const feearrayStakeBscidypActive = [3.5,1];


  const expirearrayStakeBscidypActive = [
    "15 August 2023",
    "15 August 2023",
  ];


  const lockarrayStakeBscidypActive = [
    90,
    "No Lock",
  ]

  const BscConstantStakingiDypActive = initbscConstantStakingiDyp({
    staking: stakearrayStakeBscidypActive[cardIndex-3],
    apr: aprarrayStakeBscidypActive[cardIndex-3],
    finalApr: aprarrayStakeBscidypActive[cardIndex -3] - feearrayStakeBscidypActive[cardIndex -3],
    liquidity: wbsc_address,
    expiration_time: expirearrayStakeBscidypActive[cardIndex-3],
    fee_s: feearrayStakeBscidypActive[cardIndex-3],
    fee_u: 0,
    coinbase: coinbase,
    chainId: chainId,
    lockTime: lockarrayStakeBscidypActive[cardIndex-3],
    listType: listType,
    other_info: false,
    handleSwitchNetwork: { handleSwitchNetwork },
  });

  const stakearrayStakeBscidyp = [
    window.constant_stakingidyp_2,
    window.constant_stakingidyp_1,
  ];
 const expirearrayStakeBscidyp = [
  "28 February 2023",
  "28 February 2023",
];


  const BscConstantStakingiDyp = initbscConstantStakingiDyp({
    staking: stakearrayStakeBscidyp[cardIndex-4],
    apr:  expiredPools ? expiredPools[cardIndex-1]?.apy_percent : 0,
    finalApr: expiredPools ? expiredPools[cardIndex-1]?.apy_performancefee : 0,
    liquidity: wbsc_address,
    expiration_time: expirearrayStakeBscidyp[cardIndex-4],
    fee_s: expiredPools ? expiredPools[cardIndex-1]?.performancefee :0,
    coinbase: coinbase,
    chainId: chainId,
    lockTime:  expiredPools ? expiredPools[cardIndex-1]?.lock_time?.split(" ")[0] === "No"
    ? "No Lock"
    : parseInt(expiredPools[cardIndex-1]?.lock_time?.split(" ")[0]) : 0,
    listType: listType,
    other_info: true,
    handleSwitchNetwork: { handleSwitchNetwork },
  });

  const ConstantStakingDai = initConstantStakingNewDai({
    staking: window.constant_stakingdaieth,
    apr: 25,
    finalApr: 25,
    liquidity: eth_address,
    expiration_time: "Expired",
    other_info: true,
    fee: 0,
    coinbase: coinbase,
    handleConnection: handleConnection,
    chainId: chainId,
    lockTime: 90,
    listType: listType,
    handleSwitchNetwork: { handleSwitchNetwork },
  });

  const handleDetails = () => {
    if (showDetails === false) {
      setShowDetails(true);
      onShowDetailsClick();
    } else if (showDetails === true) {
      setShowDetails(false);
    }
  };

  useEffect(() => {
    if (chain === "eth") {
      myStakes()
      setCoins(ethCoins);
    } else if (chain === "bnb") {
      setCoins(bscCoins);
    } else if (chain === "avax") {
      setCoins(avaxCoins);
    }
  }, [chain]);

  useEffect(() => {
    if (topList === "Staking") {
      if (cardIndex >= 2) {
        const newIndex = cardIndex - 2;
        setcardIndexiDyp(newIndex);
      }
    }

    if (topList === "Staking" && chain === "avax") {
      if (cardIndex >= 2) {
        const newIndex = cardIndex - 2;
        setcardIndexavax30(newIndex);
      }
    }

    if (topList === "Staking" && chain === "avax") {
      if (cardIndex >= 5) {
        const newIndex = cardIndex - 5;
        setcardIndexavaxiDyp(newIndex);
      }
    }
  }, [cardIndex, topList, chain]);
  
  return (
    <>
      <div
        className={`row w-100 flex-column gap-3 gap-lg-0 flex-lg-row align-items-center justify-content-between  mx-0 cursor-pointer ${ expired === true ? "poolscardwrapperexpired" : 'list-pool-card'}`}
        onClick={() => handleDetails()}
        style={{ display: display }}
      >
        <div className="col-12 col-lg-4 d-flex justify-content-between align-items-center">
          <div
            className={` d-flex align-items-center ${
              cardType === "Farming" || cardType === "Buyback" ? null : "gap-2"
            }`}
            style={{ width: "100px" }}
          >
            {cardType === "Farming" || cardType === "Buyback"
              ? coins.length > 0 &&
                coins
                  .slice(0, 5)
                  .map((coin, index) => (
                    <img
                      key={index}
                      src={require(`./assets/${coin}.svg`).default}
                      alt=""
                      className="pool-coins"
                    />
                  ))
              : tokenLogo !== undefined && (
                  <>
                    <img
                      src={require(`./assets/${tokenLogo}`).default}
                      width={32}
                      height={32}
                      alt=""
                    />
                    <h5
                      className="text-white"
                      style={{ fontSize: "25px", fontWeight: "600" }}
                    >
                      {tokenName}
                    </h5>
                  </>
                )}
          </div>
          <div className="d-flex align-items-baseline gap-2">
            <h5
              className="text-white"
              style={{
                fontSize: "26px",
                fontWeight: "600",
                lineHeight: "30px",
              }}
            >
              {apr}
            </h5>
            <p
              className="text-white"
              style={{
                fontSize: "18px",
                fontWeight: "600",
                lineHeight: "26px",
              }}
            >
              APR
            </p>
          </div>
        </div>
        <div className="d-flex col-12 col-lg-4 align-items-center justify-content-between">
          {cardType !== "Vault" && (
            <div className="d-flex flex-column gap-2">
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "400",
                  color: "#C0C9FF",
                }}
              >
                Total Value Locked
              </span>
              <h5
                style={{
                  fontSize: "20px",
                  fontWeight: "500",
                  color: "#F7F7FC",
                }}
              >
                {tvl}
              </h5>
            </div>
          )}
          <div className="d-flex flex-column gap-2">
            <span
              style={{ fontSize: "12px", fontWeight: "400", color: "#C0C9FF" }}
            >
              Lock Time
            </span>
            <h5
              style={{ fontSize: "18px", fontWeight: "300", color: "#F7F7FC" }}
            >
              {lockTime}
            </h5>
          </div>
        </div>
        <div
          className="col-12 col-lg-4 d-flex justify-content-end gap-5"
          style={{ width: "170px" }}
        >
          {top_pick && <img src={topPick} alt="" />}
          <h6
            className="details-text gap-1 d-flex align-items-center cursor-pointer justify-content-end"
            style={{
              color: showDetails === false ? "#75CAC2" : "#C0C9FF",
              minWidth: "100px",
              maxWidth: "100px",
            }}
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails === false ? "Deposit" : "Close"}
            <img
              src={showDetails === false ? greenArrow : orangeArrow}
              alt=""
            />
          </h6>
        </div>
      </div>
      {expired === false ? (
        <>
          { showDetails &&
            topList === "Staking" &&
            cardIndex === 0 &&
            chain === "eth" ? (
              <CawsDetails
              coinbase={coinbase}
              isConnected={isConnected}
              listType={listType}
              chainId={chainId}
              handleSwitchNetwork={handleSwitchNetwork}
              handleConnection={handleConnection}
            myStakes={mystakes}
            />

          ) : showDetails &&
            topList === "Staking" &&
            cardIndex <= 2 &&
            chain === "bnb" ? (
            <BscConstantStakeActive
              is_wallet_connected={isConnected}
              coinbase={coinbase}
              the_graph_result={the_graph_resultbsc}
              lp_id={LP_IDBNB_Array[cardIndex]}
              chainId={chainId}
              handleConnection={handleConnection}
              handleSwitchNetwork={handleSwitchNetwork}
            />
          ) : showDetails &&
            cardIndex >= 1 &&
            topList === "Staking" &&
            chain === "eth" ? (
            <ConstantStakingiDYP1Active
              is_wallet_connected={isConnected}
              coinbase={coinbase}
              the_graph_result={the_graph_result}
              lp_id={lp_id[cardIndex]}
              chainId={chainId}
              handleConnection={handleConnection}
              handleSwitchNetwork={handleSwitchNetwork}
            />
          )  : showDetails &&
            cardIndex > 2 &&
            cardIndex <= 4 &&
            topList === "Staking" &&
            chain === "bnb" ? (
            <BscConstantStakingiDypActive
              is_wallet_connected={isConnected}
              coinbase={coinbase}
              the_graph_result={the_graph_resultbsc}
              chainId={chainId}
              handleConnection={handleConnection}
              handleSwitchNetwork={handleSwitchNetwork}
              referrer={referrer}
            />
          ) : showDetails &&
            topList === "Staking" &&
            chain === "avax" &&
            cardIndex <= 2 ? (
            <StakeAvaxActive
              is_wallet_connected={isConnected}
              handleConnection={handleConnection}
              handleSwitchNetwork={handleSwitchNetwork}
              the_graph_result={the_graph_resultavax}
              chainId={chainId}
              coinbase={coinbase}
              referrer={referrer}
            />
          )  : showDetails &&
            topList === "Staking" &&
            chain === "avax" &&
            cardIndex >= 3 ? (
            <StakeAvaxiDypActive
              is_wallet_connected={isConnected}
              handleConnection={handleConnection}
              handleSwitchNetwork={handleSwitchNetwork}
              the_graph_result={the_graph_resultavax}
              chainId={chainId}
              coinbase={coinbase}
              referrer={referrer}
            />
          ) : showDetails === true && topList === "Vault" ? (
            <VaultCard
              is_wallet_connected={isConnected}
              handleConnection={handleConnection}
              handleSwitchNetwork={handleSwitchNetwork}
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
      ) : (
        <>
          {showDetails && showDetails === true && topList === "Farming" ? (
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
                lp_id={LP_IDBNB_Array[cardIndex-1]}
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
                the_graph_result={the_graph_resultavax}
                lp_id={LP_IDAVAX_Array[cardIndex-1]}
                chainId={chainId}
                coinbase={coinbase}
                expired={true}
              />
            )
          ) :  showDetails &&
            topList === "Staking" &&
            cardIndex <= 2 &&
            chain === "eth" ? (
            <ConstantStaking1
              is_wallet_connected={isConnected}
              coinbase={coinbase}
              the_graph_result={the_graph_result}
              lp_id={lp_id[cardIndex]}
              chainId={chainId}
              handleConnection={handleConnection}
              handleSwitchNetwork={handleSwitchNetwork}
              expired={true}
            />
          ) :  showDetails &&
          topList === "Staking" &&
          cardIndex === 3 &&
          chain === "eth" ? (
          <ConstantStakingDai
            is_wallet_connected={isConnected}
            coinbase={coinbase}
            the_graph_result={the_graph_result}
            lp_id={lp_id[cardIndex]}
            chainId={chainId}
            handleConnection={handleConnection}
            handleSwitchNetwork={handleSwitchNetwork}
            expired={true}
          />
        ) : showDetails &&
            cardIndex > 3 &&
            topList === "Staking" &&
            chain === "eth" ? (
            <ConstantStakingiDYP1
              is_wallet_connected={isConnected}
              coinbase={coinbase}
              the_graph_result={the_graph_result}
              lp_id={lp_id[cardIndex]}
              chainId={chainId}
              expired={true}
              handleConnection={handleConnection}
              handleSwitchNetwork={handleSwitchNetwork}
            />
          ) : showDetails &&
          (cardIndex === 1 || cardIndex === 3) &&
            topList === "Staking" &&
            chain === "bnb" ? (
            <BscConstantStake2
              is_wallet_connected={isConnected}
              coinbase={coinbase}
              the_graph_result={the_graph_resultbsc}
              lp_id={LP_IDBNB_Array[cardIndex]}
              chainId={chainId}
              handleConnection={handleConnection}
              handleSwitchNetwork={handleSwitchNetwork}
              expired={true}
            />
          ) : showDetails &&
            cardIndex === 2 &&
            topList === "Staking" &&
            chain === "bnb" ? (
            <BscConstantStakeDai
              is_wallet_connected={isConnected}
              coinbase={coinbase}
              the_graph_result={the_graph_resultbsc}
              lp_id={LP_IDBNB_Array[cardIndex]}
              chainId={chainId}
              handleConnection={handleConnection}
              handleSwitchNetwork={handleSwitchNetwork}
              referrer={referrer}
              expired={true}

            />
          ) : showDetails &&
            cardIndex >= 4 &&
            topList === "Staking" &&
            chain === "bnb" ? (
            <BscConstantStakingiDyp
              is_wallet_connected={isConnected}
              coinbase={coinbase}
              the_graph_result={the_graph_resultbsc}
              chainId={chainId}
              handleConnection={handleConnection}
              handleSwitchNetwork={handleSwitchNetwork}
              referrer={referrer}
              expired={true}

            />
          ) : showDetails &&
            topList === "Staking" &&
            chain === "avax" &&
            cardIndex <= 2 ? (
            <StakeAvax30
              is_wallet_connected={isConnected}
              handleConnection={handleConnection}
              handleSwitchNetwork={handleSwitchNetwork}
              the_graph_result={the_graph_resultavax}
              chainId={chainId}
              coinbase={coinbase}
              referrer={referrer}
              expired={true}
            />
          ) : showDetails &&
            topList === "Staking" &&
            chain === "avax" &&
            cardIndex === 3 ? (
            <StakeAvax3
              is_wallet_connected={isConnected}
              handleConnection={handleConnection}
              handleSwitchNetwork={handleSwitchNetwork}
              the_graph_result={the_graph_resultavax}
              chainId={chainId}
              coinbase={coinbase}
              referrer={referrer}
              expired={true}
            />
          ) : showDetails &&
            topList === "Staking" &&
            chain === "avax" &&
            cardIndex >= 4 ? (
            <StakeAvaxiDyp
              is_wallet_connected={isConnected}
              handleConnection={handleConnection}
              handleSwitchNetwork={handleSwitchNetwork}
              the_graph_result={the_graph_resultavax}
              chainId={chainId}
              coinbase={coinbase}
              referrer={referrer}
              expired={true}
            />
          ) : showDetails === true && topList === "Vault" ? (
            <VaultCard
              is_wallet_connected={isConnected}
              handleConnection={handleConnection}
              handleSwitchNetwork={handleSwitchNetwork}
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
      )}
    </>
  );
};

export default TopPoolsListCard;

import React, { useEffect, useState } from "react";
import TopPoolsCard from "../../top-pools-card/TopPoolsCard";
import TopPoolsListCard from "../../top-pools-card/TopPoolsListCard";
import noPoolsIcon from "../../../assets/earnAssets/noPoolsIcon.svg";
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

import { FadeLoader } from "react-spinners";
import PoolsCalculator from "../../pools-calculator/PoolsCalculator";

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
  referrer,
}) => {
  const stake = [
    {
      icon: "dyplogo.svg",
      top_pick: true,
      tokenName: "DYP",
      apy: "1.08",
      tvl_usd: "48543.20",
      lockTime: "No lock",
    },
    {
      icon: "dyplogo.svg",
      top_pick: false,
      tokenName: "DYP",
      apy: "1.08",
      tvl_usd: "48543.20",
      lockTime: "90 Days",
    },
    {
      icon: "dyplogo.svg",
      top_pick: false,
      tokenName: "iDYP",
      apy: "1.08",
      tvl_usd: "48543.20",
      lockTime: "No lock",
    },
    {
      icon: "dyplogo.svg",
      top_pick: false,
      tokenName: "iDYP",
      apy: "1.08",
      tvl_usd: "48543.20",
      lockTime: "90 days",
    },
    {
      icon: "dyplogo.svg",
      top_pick: false,
      tokenName: "iDYP",
      apy: "1.08",
      tvl_usd: "48543.20",
      lockTime: "No lock",
    },
    {
      icon: "dyplogo.svg",
      top_pick: false,
      tokenName: "iDYP",
      apy: "1.08",
      tvl_usd: "48543.20",
      lockTime: "90 days",
    },
    {
      icon: "dyplogo.svg",
      top_pick: false,
      tokenName: "DYP",
      apy: "1.08",
      tvl_usd: "48543.20",
      lockTime: "No lock",
    },
    {
      icon: "dyplogo.svg",
      top_pick: false,
      tokenName: "DYP",
      apy: "1.08",
      tvl_usd: "48543.20",
      lockTime: "90 Days",
    },
    {
      icon: "dyplogo.svg",
      top_pick: false,
      tokenName: "iDYP",
      apy: "1.08",
      tvl_usd: "48543.20",
      lockTime: "No lock",
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

  var farming = [];

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

  const [activeCard, setActiveCard] = useState();
  const [cardIndex, setcardIndex] = useState();
  const [cardIndexiDyp, setcardIndexiDyp] = useState();
  const [cardIndexavax30, setcardIndexavax30] = useState();
  const [cardIndexavaxiDyp, setcardIndexavaxiDyp] = useState();

  const eth_address = "ETH";
  const wbnb_address = "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7";
  const avax_address = "AVAX";

  const { rebase_factors, rebase_factorsavax } = window;

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
    window.constant_staking_neweth1,
    window.constant_staking_neweth2,
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
    // staking: window.farming_new_1,
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

  const { LP_IDs_V2Avax } = window;

  const LP_IDAVAX_Array = [
    LP_IDs_V2Avax.wavax[0],
    LP_IDs_V2Avax.wavax[1],
    LP_IDs_V2Avax.wavax[2],
    LP_IDs_V2Avax.wavax[3],
    LP_IDs_V2Avax.wavax[4],
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
  });

  const stakeArrayBuyBackAvax = [
    window.buyback_stakingavax1_1,
    window.buyback_stakingavax1_2,
  ];
  const constantArrayBuybackAvax = [
    window.constant_stakingavax_new5,
    window.constant_stakingavax_new6,
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
  });

  const aprarrayStakeAvax = [30, 10];
  const feearrayStakeAvax = [3.5, 1];

  const stakingarrayStakeAvax = [
    window.constant_staking_new10,
    window.constant_staking_new11,
  ];

  const aprarrayStakeAvax30 = [25, 50];
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
  });

  const StakeAvax30 = stakeAvax30({
    staking: stakingarrayStakeAvax30[cardIndexavax30],
    apr: aprarrayStakeAvax30[cardIndexavax30],
    liquidity: avax_address,
    expiration_time: "6 December 2022",
    fee: feearrayStakeAvax30[cardIndexavax30],
    coinbase: coinbase,
    chainId: chainId,
  });

  const StakeAvax3 = stakeAvax3({
    staking: window.constant_stakingdaiavax,
    apr: 25,
    liquidity: avax_address,
    expiration_time: "Expired",
    coinbase: coinbase,
    chainId: chainId,
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
  });

  const lockarray = ["No Lock", 90];

  const lockarrayiDyp = ["No Lock", 90, "No Lock", 90];

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
  });

  const vaultArray = [
    window.vault_weth,
    window.vault_wbtc,
    window.vault_usdt,
    window.vault_usdc,
    window.vault_dai,
  ];
  const tokenvaultArray = [
    window.token_weth,
    window.token_wbtc,
    window.token_usdt,
    window.vault_usdc,
    window.token_usdc,
  ];
  const vaultplatformArray = [10, 10, 15, 15, 15];
  const vaultdecimalsArray = [18, 8, 6, 6, 18];
  const vaultsymbolArray = ["WETH", "WBTC", "USDT", "USDC", "DAI"];

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
  });

  useEffect(() => {
    if (topList === "Staking") {
      setTopPools([]);
      setTimeout(() => {
        setTopPools(stake);
      }, 500);
    } else if (topList === "Buyback") {
      setTopPools([]);
      setTimeout(() => {
        setTopPools(buyback);
      }, 500);
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

    if (chain === "eth") {
      fetchEthFarming();
    } else if (chain === "bnb") {
      fetchBscFarming();
    } else if (chain === "avax") {
      fetchAvaxFarming();
    }
    setActiveCard(null);
    setShowDetails(false);
    setListing(listType);
  }, [topList, listType, chain]);

  const handleCardIndexStake = (index) => {
    // console.log(index)

    if (topList === "Staking") {
      if (index >= 2) {
        const newIndex = index - 2;
        setcardIndexiDyp(newIndex);
        setcardIndex(index);
      } else setcardIndex(index);
    } else setcardIndex(index);
  };

  const handleCardIndexStake30 = (index) => {
    // console.log(index)

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
        <div>
          <div className="top-picks-container">
            {topPools.map((pool, index) => (
              
              <TopPoolsCard
                key={index}
                chain={chain}
                top_pick={pool.top_pick}
                tokenName={pool.tokenName}
                apr={pool.apy + "%"}
                tvl={"$" + getFormattedNumber(pool.tvl_usd)}
                lockTime={pool.lockTime ? pool.lockTime : "No Lock"}
                tokenLogo={pool.icon}
                onShowDetailsClick={() => {
                  setActiveCard(topPools[index]);
                  handleCardIndexStake(index);
                  handleCardIndexStake30(index);
                  handleCardIndexStakeiDyp(index);
                }}
                onHideDetailsClick={() => {
                  setActiveCard(null);
                }}
                cardType={topList}
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
            ) :  activeCard && topList === "Buyback" && chain === "avax" ? (
              <AvaxBuyback
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultavax}
                lp_id={LP_IDAVAX_Array[cardIndex]}
                chainId={chainId}
                handleConnection={handleConnection}
              />
            ) :  activeCard && topList === "Buyback" && chain === "bnb" ? (
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
              handleConnection={handleConnection}
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
              handleConnection={handleConnection}
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
              handleConnection={handleConnection}
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
              handleConnection={handleConnection}
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
        </div>
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
              onDetailsClick={() => {
                setShowDetails(!showDetails);
              }}
              showDetails={showDetails}
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

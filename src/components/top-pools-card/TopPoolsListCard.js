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
  coinbase,
  referrer,
  isConnected,
  the_graph_result,
  lp_id,
  the_graph_resultavax,
  listType

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

  const [showDetails, setShowDetails] = useState(false);
  const [coins, setCoins] = useState(ethCoins);
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
    listType: listType
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
    lockTime: lockarrayFarm[cardIndex],
    listType: listType
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
    listType: listType
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
    listType: listType
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
    listType: listType
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
    listType: listType
  });

  const StakeAvax3 = stakeAvax3({
    staking: window.constant_stakingdaiavax,
    apr: 25,
    liquidity: avax_address,
    expiration_time: "Expired",
    coinbase: coinbase,
    chainId: chainId,
    lockTime: lockarrayStakeAvax[cardIndex],
    listType: listType
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
    listType: listType
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
    listType: listType
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
    listType: listType
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
    listType: listType
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
        className="row w-100 d-flex flex-row align-items-center justify-content-between list-pool-card mx-0 cursor-pointer"
        onClick={() => handleDetails()}
      >
        <div className="purplediv"></div>
        <div
          className={`col-2 d-flex align-items-center ${
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
                  <img src={require(`./assets/${tokenLogo}`).default} alt="" />
                  <h5
                    className="text-white"
                    style={{ fontSize: "25px", fontWeight: "600" }}
                  >
                    {tokenName}
                  </h5>
                </>
              )}
        </div>
        <div className="col-2 d-flex align-items-baseline gap-2">
          <h5
            className="text-white"
            style={{ fontSize: "26px", fontWeight: "600", lineHeight: "30px" }}
          >
            {apr}
          </h5>
          <p
            className="text-white"
            style={{ fontSize: "18px", fontWeight: "600", lineHeight: "26px" }}
          >
            APR
          </p>
        </div>
        {cardType !== "Vault" && (
          <div className="col-2 d-flex flex-column gap-2">
            <span
              style={{ fontSize: "12px", fontWeight: "400", color: "#C0C9FF" }}
            >
              Total Value Locked
            </span>
            <h5
              style={{ fontSize: "20px", fontWeight: "500", color: "#F7F7FC" }}
            >
              {tvl}
            </h5>
          </div>
        )}
        <div className="col-2 d-flex flex-column gap-2">
          <span
            style={{ fontSize: "12px", fontWeight: "400", color: "#C0C9FF" }}
          >
            Lock Time
          </span>
          <h5 style={{ fontSize: "18px", fontWeight: "300", color: "#F7F7FC" }}>
            {lockTime}
          </h5>
        </div>
        <div
          className="col-2 d-flex justify-content-end gap-5"
          style={{ width: "170px" }}
        >
          {top_pick && <img src={topPick} alt="" />}
          <h6
            className="details-text gap-1 d-flex align-items-center cursor-pointer justify-content-end"
            style={{
              color: showDetails === false ? "#75CAC2" : "#C0C9FF",
              width: "100px",
            }}
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails === false ? "Deposit" : "Close"}
            <img src={showDetails === false ? greenArrow : orangeArrow} />
          </h6>
        </div>
      </div>
      {showDetails && showDetails === true && topList === "Farming" ? (
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
      ) : showDetails === true && topList === "Buyback" && chain === "eth" ? (
        <BuybackStaking1
          is_wallet_connected={isConnected}
          coinbase={coinbase}
          the_graph_result={the_graph_result}
          lp_id={lp_id[cardIndex]}
          chainId={chainId}
          handleConnection={handleConnection}
        />
      ) : showDetails === true && topList === "Buyback" && chain === "avax" ? (
        <AvaxBuyback
          is_wallet_connected={isConnected}
          coinbase={coinbase}
          the_graph_result={the_graph_resultavax}
          lp_id={LP_IDAVAX_Array[cardIndex]}
          chainId={chainId}
          handleConnection={handleConnection}
        />
      ) : showDetails === true && topList === "Buyback" && chain === "bnb" ? (
        <></>
      ) : showDetails === true &&
        topList === "Staking" &&
        cardIndex < 2 &&
        chain === "eth" ? (
        <ConstantStaking1
          is_wallet_connected={isConnected}
          coinbase={coinbase}
          the_graph_result={the_graph_result}
          chainId={chainId}
          handleConnection={handleConnection}
        />
      ) : showDetails === true &&
        cardIndex >= 2 &&
        topList === "Staking" &&
        chain === "eth" ? (
        <ConstantStakingiDYP1
          is_wallet_connected={isConnected}
          coinbase={coinbase}
          the_graph_result={the_graph_result}
          chainId={chainId}
          handleConnection={handleConnection}
        />
      ) : showDetails === true &&
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
      ) : showDetails === true &&
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
      ) : showDetails === true &&
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
      ) : showDetails === true &&
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
      ) : showDetails === true && topList === "Vault" ? (
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
  );
};

export default TopPoolsListCard;

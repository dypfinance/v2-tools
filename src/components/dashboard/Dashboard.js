import React, { useEffect, useState } from "react";
import "./dashboard.css";
import TopPoolsCard from "../top-pools-card/TopPoolsCard";
import NewsCard from "../newsCard/NewsCard";
import GovCard from "../gov-card/GovCard";
import BridgeCard from "../bridgecard/BridgeCard";
import ExplorerCard from "../explorer-card/ExplorerCard";
import Calculator from "../calculator/Calculator";
import FaqCard from "../faqcard/FaqCard";
import LaunchpadCard from "../launchpad-card/LaunchpadCard";
import ChainlinkCard from "../chainlink-card/ChainlinkCard";
import TrendingNews from "../newsCard/TrendingNews";
import rightarrow from "./assets/right-arrow.svg";
import initStakingNew from "../FARMINNG/staking-new-front";
import { NavLink } from "react-router-dom";
import initConstantStakingNew from "../FARMINNG/constant-staking-new-front";
import initVaultNew from "../FARMINNG/vault-new";
import useWindowSize from "../../functions/useWindowSize";
import initBscBuyback from "../FARMINNG/bscBuyback";
import initbscConstantStaking from "../FARMINNG/bscConstantStake";
import avaxBuyback from "../FARMINNG/avaxBuyback";
import stakeAvax from "../FARMINNG/stakeAvax";
import { FadeLoader } from "react-spinners";

const Dashboard = ({
  isConnected,
  coinbase,
  the_graph_result,
  lp_id,
  network,
  handleConnection,
  the_graph_resultbsc,
  the_graph_resultavax,
  referrer
}) => {
  const cardsEth = [
    {
      top_pick: false,
      tokenName: "DYP",
      apr: "1.09%",
      tvl: "$48,382.30",
      lockTime: "No lock",
      tokenLogo: "dyplogo.svg",
      cardType: "Staking",
    },
    {
      top_pick: false,
      tokenName: "USDT",
      apr: "9-23%",
      tvl: "$48,382.30",
      lockTime: "No lock",
      tokenLogo: "usdt.svg",
      cardType: "Vault",
    },
  ];

  const cardsBsc = [
    {
      tokenLogo: "dyplogo.svg",
      top_pick: true,
      tokenName: "DYP",
      apr: "30%",
      tvl: "48543.20",
      lockTime: "180 Days",
      isNewPool: true,
      isStaked: false,
      cardType: "Staking",
    },
    {
      top_pick: false,
      tokenName: "AVAX",
      apr: "1.08%",
      tvl: "48543.20",
      lockTime: "90 Days",
      cardType: "Buyback",
    },
  ];

  const cardsAvax = [
    {
      tokenLogo: "dyplogo.svg",
      top_pick: true,
      tokenName: "DYP",
      apr: "1.08%",
      tvl: "48543.20",
      lockTime: "180 Days",
      isNewPool: false,
      isStaked: false,
      cardType: "Staking",
    },
    {
      top_pick: false,
      tokenName: "AVAX",
      apr: "1.08%",
      tvl: "48543.20",
      lockTime: "90 Days",
      cardType: "Buyback",
    },
  ];

  const [activeCard, setActiveCard] = useState();
  const [cardIndex, setcardIndex] = useState();
  const [details, setDetails] = useState();
  const [popularNewsData, setPopularNewsData] = useState([]);
  const [activeCard2, setActiveCard2] = useState();
  const [cards, setCards] = useState(cardsEth);
  const [loading, setLoading] = useState(true)

  let networkId = parseInt(network);

  const eth_address = "ETH";
  const { rebase_factors } = window;

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
  const feeArray = [0.3, 0.3, 0.4, 0.8, 1.2];

  const StakingNew1 = initStakingNew({
    token: window.token_new,
    // staking: window.farming_new_1,
    staking: stakeArray[cardIndex],
    chainId: network,
    coinbase: coinbase,
    constant: constantArray[cardIndex],
    liquidity: eth_address,
    lp_symbol: "USD",
    reward: "30,000",
    lock: "3 Days",
    rebase_factor: rebase_factors[0],
    expiration_time: "14 December 2022",
    fee: feeArray[cardIndex],
    handleConnection: handleConnection,
  });

  const stakeArrayStakeNew = [
    window.constant_staking_new1,
    window.constant_staking_new2,
  ];

  const aprArrayStake = [25, 50];
  const lockarray = ["No Lock", 90];
  const feeArrayStake = [0.25, 0.5];

  const ConstantStaking1 = initConstantStakingNew({
    staking: stakeArrayStakeNew[cardIndex],
    apr: aprArrayStake[cardIndex],
    liquidity: eth_address,
    expiration_time: "14 December 2022",
    other_info: false,
    fee: feeArrayStake[cardIndex],
    coinbase: coinbase,
    handleConnection: handleConnection,
    chainId: network,
    lockTime: lockarray[cardIndex],
    renderedPage: "dashboard",
    listType: "table",
  });

  const vaultArray = window.vault_usdt;
  const tokenvaultArray = window.token_usdt;

  const vaultplatformArray = 15;
  const vaultdecimalsArray = 6;
  const vaultsymbolArray = "USDT";
  const locktimeFarm = ["No Lock", "3 Days", "30 Days", "60 Days", "90 Days"];

  const VaultCard = initVaultNew({
    vault: window.vault_usdt,
    token: window.token_usdt,
    platformTokenApyPercent: 15,
    UNDERLYING_DECIMALS: 6,
    UNDERLYING_SYMBOL: "USDT",
    expiration_time: "04 March 2023",
    coinbase: coinbase,
    lockTime: "No Lock",
    handleConnection: handleConnection,
    chainId: network,
    listType: "table",
  });

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
  const aprarrayStakeBsc = [30, 10, 25, 50, 25, 20, 45, 15, 30];
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
  const feearrayStakeBsc = [3.5, 1, 0.25, 0.5, 0, 0, 1, 3.5];
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
  const wbsc_address = "0x2170Ed0880ac9A755fd29B2688956BD959F933F8";

  const BscConstantStake = initbscConstantStaking({
    staking: stakearrayStakeBsc[cardIndex],
    apr: aprarrayStakeBsc[cardIndex],
    liquidity: wbsc_address,
    expiration_time: expirearrayStakeBsc[cardIndex],
    fee: feearrayStakeBsc[cardIndex],
    coinbase: coinbase,
    chainId: network,
    lockTime: lockarrayStakeAvax[cardIndex],
    listType: "table",
    other_info: otherInfoarrayStakeBsc[cardIndex],
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

  const { LP_IDs_V2Avax, LP_IDs_V2BNB } = window;

  const LP_IDBNB_Array = [
    LP_IDs_V2BNB.wbnb[0],
    LP_IDs_V2BNB.wbnb[1],
    LP_IDs_V2BNB.wbnb[2],
    LP_IDs_V2BNB.wbnb[3],
    LP_IDs_V2BNB.wbnb[4],
  ];

  const LP_IDAVAX_Array = [
    LP_IDs_V2Avax.wavax[0],
    LP_IDs_V2Avax.wavax[1],
    LP_IDs_V2Avax.wavax[2],
    LP_IDs_V2Avax.wavax[3],
    LP_IDs_V2Avax.wavax[4],
  ];


  const BscBuyback = initBscBuyback({
    staking: bscStakeArray[cardIndex],
    constant: bscConstArray[cardIndex],
    apr: bscAprArray[cardIndex],
    expiration_time: "17 November 2022",
    fee: bscFeeArray[cardIndex],
    coinbase: coinbase,
    handleConnection: handleConnection,
    chainId: network,
    lockTime: bscLockArray[cardIndex],
    listType: "table",
  });


  const stakeArrayBuyBackAvax = [
    window.buyback_stakingavax1_1,
    window.buyback_stakingavax1_2,
  ];
  const constantArrayBuybackAvax = [
    window.constant_staking_newavax3,
    window.constant_staking_newavax4,
  ];
  const feeArrayBuyback = [1, 3.5];
  const lockarrayBuyback = ["No Lock ", 90];
  const aprArrayBuyBackAvax = [30, 100];

  const AvaxBuyback = avaxBuyback({
    staking: stakeArrayBuyBackAvax[cardIndex],
    constant: constantArrayBuybackAvax[cardIndex],
    apr: aprArrayBuyBackAvax[cardIndex],
    expiration_time: "6 December 2022",
    fee: feeArrayBuyback[cardIndex],
    coinbase: coinbase,
    handleConnection: handleConnection,
    chainId: network,
    lockTime: lockarrayBuyback[cardIndex],
    listType: "table",
  });

  const stakingarrayStakeAvax = [
    window.constant_staking_new10,
    window.constant_staking_new11,
  ];
  const feearrayStakeAvax = [3.5, 1];

  const aprarrayStakeAvax = [30, 10];

  const avax_address = "AVAX";


  const StakeAvax = stakeAvax({
    staking: stakingarrayStakeAvax[cardIndex],
    apr: aprarrayStakeAvax[cardIndex],
    liquidity: avax_address,
    expiration_time: "6 December 2022",
    fee: feearrayStakeAvax[cardIndex],
    coinbase: coinbase,
    chainId: network,
    referrer: referrer,
    lockTime: lockarrayStakeAvax[cardIndex],
    listType: "table",
  });

  const faqItems = [
    {
      title: "What is Dypius Stake?",
      option: "Staking",
      pathName: "/earn",
      section: "earnFaq",
      pool: null,
      faqIndex: 1,
    },
    {
      title: "What is the Reinvest function?",
      option: "Staking",
      pathName: "/earn",
      section: "earnFaq",
      pool: null,
      faqIndex: 14,
    },
    {
      title: "What is APR?",
      option: "Farming",
      pathName: "/earn",
      section: "earnFaq",
      pool: null,
      faqIndex: 6,
    },
    {
      title: "What is Dypius Vault?",
      option: "Vault",
      pathName: "/earn",
      section: "earnFaq",
      pool: null,
      faqIndex: 0,
    },
    {
      title: "What is Dypius Bridge?",
      option: "Bridge",
      pathName: "/bridge",
      section: "earnFaq",
      pool: null,
      faqIndex: 0,
    },
    {
      title: "Will my lock period reset if I deposit ad...",
      option: "Farming",
      pathName: "/earn",
      section: "earnFaq",
      pool: null,
      faqIndex: 4,
    },
  ];

  const fetchPopularNewsData = async () => {
    const result = await fetch(`https://news-manage.dyp.finance/api/populars`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPopularNewsData(data);
      })
      .catch(console.error);

    return result;
  };

  const setPools = () => {
    if (network === 1) {
      setCards(cardsEth);
    } else if (network === 56) {
      setCards(cardsBsc);
      console.log(cards);
    } else {
      setCards(cardsAvax);
    }
  }

  useEffect(() => {
    fetchPopularNewsData();
    setPools()
      setLoading(false)
  }, []);

  const windowSize = useWindowSize();

  return (
    <div className="container-lg dashboardwrapper px-0">
      <div className="d-flex m-0 flex-column flex-xxl-row justify-content-between gap-4">
        <div className="d-flex flex-column gap-4 justify-content-between">
          <div className="d-flex flex-column flex-lg-row m-0 gap-3 justify-content-between">
            <Calculator />
            <div className="d-flex flex-column gap-4 justify-content-between dashboard-cards-wrapper">
              <ExplorerCard />
              <div className="d-flex flex-column flex-lg-row justify-content-between gap-3">
                <GovCard />
                <BridgeCard />
              </div>
            </div>
          </div>
          <div>
            <div className="row m-0 align-items-center justify-content-between gap-2 w-100 pb-2">
              <h6 className="top-pools-title">Top Pools</h6>
              <NavLink
                to="/earn"
                className="view-more-title d-flex justify-content-center align-items-center gap-1"
              >
                View all <img src={rightarrow} alt="" />{" "}
              </NavLink>
            </div>
            {windowSize.width > 786 ? (
              <div>
                <div className="row m-0 gap-4 toppool-allwrapper">
                  {cards.length > 0 && loading === false ?
                    cards.map((item, index) => {
                      return (
                        <TopPoolsCard
                        chain={networkId === 1 ? "eth" : networkId === 56 ? "bnb" : "avax"}
                          renderedPage="dashboard"
                          cardId={item.tokenName}
                          key={index}
                          cardType={item.cardType}
                          top_pick={item.top_pick}
                          tokenName={item.tokenName}
                          apr={item.apr}
                          tvl={item.tvl}
                          lockTime={item.lockTime}
                          tokenLogo={item.tokenLogo}
                          onShowDetailsClick={() => {
                            setActiveCard(cards[index]);
                            setcardIndex(index);
                            setDetails(index);
                            console.log(item.tvl_usd);
                          }}
                          onHideDetailsClick={() => {
                            setActiveCard(null);
                            setDetails();
                          }}
                          details={details === index ? true : false}
                        />
                      );
                    })
                  :
                  <div
                  className="w-100 d-flex justify-content-center align-items-center mt-5"
                  style={{ gridColumn: "1 / 3" }}
                >
                  <FadeLoader color="#7770DF" />
                </div>
                  }
                </div>
                {activeCard && networkId === 1 ? (
                  activeCard?.cardType === "Staking" ? (
                    <ConstantStaking1
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_result}
                      lp_id={lp_id[cardIndex]}
                      chainId={network}
                      handleConnection={handleConnection}
                    />
                  ) : (
                    <VaultCard
                      is_wallet_connected={isConnected}
                      handleConnection={handleConnection}
                      chainId={network}
                      coinbase={coinbase}
                      the_graph_result={the_graph_result}
                    />
                  )
                ) : activeCard && networkId === 56 ? (
                 activeCard.cardType === "Staking" ? 

                  <BscConstantStake
                    is_wallet_connected={isConnected}
                    coinbase={coinbase}
                    the_graph_result={the_graph_resultbsc}
                    lp_id={LP_IDBNB_Array[cardIndex]}
                    chainId={network}
                    handleConnection={handleConnection}
                  />
                  :
                  <BscBuyback
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_resultbsc}
                  chainId={network}
                  handleConnection={handleConnection}
                />
                 

                ) : activeCard && networkId === 43114 ? (
                  activeCard.cardType === "Staking" ?
                   <StakeAvax
                is_wallet_connected={isConnected}
                handleConnection={handleConnection}
                the_graph_result={the_graph_resultavax}
                chainId={network}
                coinbase={coinbase}
                referrer={referrer}
              />
              :
               <AvaxBuyback
                is_wallet_connected={isConnected}
                coinbase={coinbase}
                the_graph_result={the_graph_resultavax}
                lp_id={LP_IDAVAX_Array[cardIndex]}
                chainId={network}
                handleConnection={handleConnection}
              />
                )
                :
                <></>
                }
              </div>
            ) : (
              <div className="d-flex flex-column gap-4">
                <div className="row m-0 gap-4 toppool-allwrapper">
                  {cards.length > 0 &&
                    cards.slice(0, 1).map((item, index) => {
                      return (
                        <TopPoolsCard
                          renderedPage="dashboard"
                          cardId={item.tokenName}
                          key={index}
                          cardType={item.cardType}
                          top_pick={item.top_pick}
                          tokenName={item.tokenName}
                          apr={item.apr}
                          tvl={item.tvl}
                          lockTime={item.lockTime}
                          tokenLogo={item.tokenLogo}
                          onShowDetailsClick={() => {
                            setActiveCard(cards[index]);
                            setActiveCard2(null);
                            setcardIndex(index);
                            setDetails(index);
                          }}
                          onHideDetailsClick={() => {
                            setActiveCard(null);
                            setDetails();
                          }}
                          details={details === index ? true : false}
                        />
                      );
                    })}
                </div>
                {activeCard ? (
                  activeCard?.cardType === "Staking" ? (
                    <ConstantStaking1
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_result}
                      lp_id={lp_id[cardIndex]}
                      chainId={network}
                      handleConnection={handleConnection}
                    />
                  ) : (
                    <VaultCard
                      is_wallet_connected={isConnected}
                      handleConnection={handleConnection}
                      chainId={network}
                      coinbase={coinbase}
                      the_graph_result={the_graph_result}
                    />
                  )
                ) : (
                  <></>
                )}
                <div className="row m-0 gap-4 toppool-allwrapper">
                  {cards.length > 0 &&
                    cards.slice(1, cards.length).map((item, index) => {
                      return (
                        <TopPoolsCard
                          renderedPage="dashboard"
                          cardId={item.tokenName}
                          key={index}
                          cardType={item.cardType}
                          top_pick={item.top_pick}
                          tokenName={item.tokenName}
                          apr={item.apr}
                          tvl={item.tvl}
                          lockTime={item.lockTime}
                          tokenLogo={item.tokenLogo}
                          onShowDetailsClick={() => {
                            setActiveCard2(cards[index + 1]);
                            setActiveCard(null);
                            setcardIndex(index + 1);
                            setDetails(index + 1);
                          }}
                          onHideDetailsClick={() => {
                            setActiveCard2(null);
                            setDetails();
                          }}
                          details={details === index + 1 ? true : false}
                        />
                      );
                    })}
                </div>
                {activeCard2 ? (
                  activeCard2?.cardType === "Staking" ? (
                    <ConstantStaking1
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_result}
                      lp_id={lp_id[cardIndex]}
                      chainId={network}
                      handleConnection={handleConnection}
                    />
                  ) : (
                    <VaultCard
                      is_wallet_connected={isConnected}
                      handleConnection={handleConnection}
                      chainId={network}
                      coinbase={coinbase}
                      the_graph_result={the_graph_result}
                    />
                  )
                ) : (
                  <></>
                )}
              </div>
            )}
          </div>
          <div className="row m-0 align-items-center justify-content-between gap-2 w-100">
            <h6 className="top-pools-title">News</h6>
            <NavLink
              className="view-more-title d-flex justify-content-center align-items-center gap-1"
              to="/news"
            >
              View all <img src={rightarrow} alt="" />
            </NavLink>
            <div className="d-flex flex-column flex-lg-row gap-3 justify-content-between px-0">
              {popularNewsData !== [] && (
                <>
                  {" "}
                  <TrendingNews
                    image={popularNewsData[0]?.image}
                    title={popularNewsData[0]?.title}
                    date={popularNewsData[0]?.date}
                    link={popularNewsData[0]?.id}
                  />
                  <NewsCard
                    image={popularNewsData[1]?.image}
                    title={popularNewsData[1]?.title}
                    date={popularNewsData[1]?.date}
                    link={popularNewsData[1]?.id}
                  />
                  <NewsCard
                    image={popularNewsData[2]?.image}
                    title={popularNewsData[2]?.title}
                    date={popularNewsData[2]?.date}
                    link={popularNewsData[2]?.id}
                  />
                </>
              )}
            </div>
          </div>
        </div>
        <div className="right-side-wrapper d-flex flex-column flex-lg-row flex-xxl-column gap-4">
          <div className="launchpad-section-wrapper d-flex flex-column gap-3 gap-xxl-2">
            <h6 className="header">Launchpad</h6>
            <LaunchpadCard />
          </div>
          <ChainlinkCard />
          <div
            className="faq-items-wrapper d-flex flex-column"
            style={{ gap: "11px" }}
          >
            <h6 className="header">FAQs</h6>
            <div className="faq-grid">
              {faqItems.map((faq) => (
                <FaqCard
                  title={faq.title}
                  option={faq.option}
                  pathName={faq.pathName}
                  section={faq.section}
                  pool={faq.pool}
                  faqIndex={faq.faqIndex}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

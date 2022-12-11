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
import initConstantStakingiDYP from "../FARMINNG/constant-staking-idyp-new-front";
import initbscConstantStakingiDyp from "../FARMINNG/bscConstantStakeiDyp";
import initVaultNew from "../FARMINNG/vault-new";
import useWindowSize from "../../functions/useWindowSize";
import axios from "axios";
import getFormattedNumber from "../../functions/get-formatted-number";
import initbscConstantStaking from "../FARMINNG/bscConstantStake";
import stakeAvax from "../FARMINNG/stakeAvax";
import stakeAvaxiDyp from "../FARMINNG/stakeAvaxiDyp";
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
  referrer,
  handleSwitchNetwork,
}) => {
  const [topPools, setTopPools] = useState([]);
  const wbsc_address = "0x2170Ed0880ac9A755fd29B2688956BD959F933F8";

  const fetchBnbStaking = async () => {
    await axios
      .get(`https://api.dyp.finance/api/get_staking_info_bnb`)
      .then((res) => {
        let dataArray = [];
        const dypIdypBnb1 = res.data.stakingInfoDYPBnb[4];
        dataArray.push(dypIdypBnb1);
        const dypIdypBnb2 = res.data.stakingInfoiDYPBnb[2];
        dataArray.push(dypIdypBnb2);

        setTopPools(dataArray);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchAvaxStaking = async () => {
    await axios
      .get(`https://api.dyp.finance/api/get_staking_info_avax`)
      .then((res) => {
        let dataArray = [];
        const dypIdypavax1 = res.data.stakingInfoDYPAvax[4];
        dataArray.push(dypIdypavax1);
        const dypIdypavax2 = res.data.stakingInfoiDYPAvax[2];
        dataArray.push(dypIdypavax2);
        setTopPools(dataArray);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchEthStaking = async () => {
    await axios
      .get(`https://api.dyp.finance/api/get_staking_info_eth`)
      .then((res) => {
        let dataArray = [];
        const dypIdypeth2 = res.data.stakingInfoiDYPEth[2];
        dataArray.push(dypIdypeth2);
        setTopPools(dataArray);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const cardsEth = [
    {
      top_pick: false,
      tokenName: "iDYP",
      apr: topPools.length > 0 ? topPools[0]?.apy_percent + "%" : "30%",
      tvl: topPools.length > 0
      ? "$" + getFormattedNumber(topPools[0]?.tvl_usd)
      : "$48543.20",
      lockTime: topPools.length > 0 ? topPools[0]?.lock_time : "No lock",
      tokenLogo: "idypius.svg",
      cardType: "Staking",
      tag: "stake",
    },
    {
      top_pick: false,
      tokenName: "USDT",
      apr: "9-23%",
      tvl: "$48,382.30",
      lockTime: "No lock",
      tokenLogo: "usdt.svg",
      cardType: "Vault",
      tag: "vault",
    },
  ]; 
  const cardsBsc = [
    {
      tokenLogo: "dyplogo.svg",
      top_pick: false,
      tokenName: "DYP",
      apr: topPools.length > 0 ? topPools[0]?.apy_percent + "%" : "30%",
      tvl:
        topPools.length > 0
          ? "$" + getFormattedNumber(topPools[0]?.tvl_usd)
          : "$48543.20",
      lockTime: topPools.length > 0 ? topPools[0]?.lock_time : "No lock",
      isNewPool: true,
      isStaked: false,
      cardType: "Staking",
      tag: "stake",
    },
    {
      tokenLogo: "idypius.svg",
      top_pick: false,
      tokenName: "iDYP",
      apr: topPools.length > 0 ? topPools[1]?.apy_percent + "%" : "30%",
      tvl:
        topPools.length > 0
          ? "$" + getFormattedNumber(topPools[1]?.tvl_usd)
          : "$48543.20",
      lockTime: topPools.length > 0 ? topPools[1]?.lock_time : "No lock",
      isNewPool: true,
      isStaked: false,
      cardType: "Staking",
      tag: "stake",
    },
  ];

  const cardsAvax = [
    {
      tokenLogo: "dyplogo.svg",
      top_pick: false,
      tokenName: "DYP",
      apr: topPools.length > 0 ? topPools[0]?.apy_percent + "%" : "30%",
      tvl:
        topPools.length > 0
          ? "$" + getFormattedNumber(topPools[0]?.tvl_usd)
          : "$48543.20",
      lockTime: topPools.length > 0 ? topPools[0]?.lock_time : "No lock",
      isNewPool: true,
      isStaked: false,
      cardType: "Staking",
      tag: "stake",
    },
    {
      tokenLogo: "idypius.svg",
      top_pick: false,
      tokenName: "iDYP",
      apr: topPools.length > 0 ? topPools[1]?.apy_percent + "%" : "30%",
      tvl:
        topPools.length > 0
          ? "$" + getFormattedNumber(topPools[1]?.tvl_usd)
          : "$48543.20",
      lockTime: topPools.length > 0 ? topPools[1]?.lock_time : "No lock",
      isNewPool: true,
      isStaked: false,
      cardType: "Staking",
      tag: "stake",
    },
  ];

  const [activeCard, setActiveCard] = useState();
  const [cardIndex, setcardIndex] = useState();
  const [details, setDetails] = useState();
  const [popularNewsData, setPopularNewsData] = useState([]);
  const [activeCard2, setActiveCard2] = useState();
  const [cards, setCards] = useState(cardsEth);
  const [loading, setLoading] = useState(true);

  // let network = parseInt(network);

  const eth_address = "ETH";


  
  const ConstantStakingiDYP1 = initConstantStakingiDYP({
    staking: window.constant_staking_idyp_3,
    apr: 30,
    liquidity: eth_address,
    expiration_time: "15 August 2023",
    other_info: false,
    fee_s: 3.5,
    fee_u: 0,
    coinbase: coinbase,
    handleConnection: handleConnection,
    chainId: network.toString(),
    lockTime: 90,
    listType: 'table',
    handleSwitchNetwork: handleSwitchNetwork,
  });



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
    chainId: network.toString(),
    listType: "table",
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
 

  const BscConstantStake = initbscConstantStaking({
    staking: window.constant_stakingbsc_new10,
    apr: 30,
    liquidity: wbsc_address,
    expiration_time: "14 July 2023",
    coinbase: coinbase,
    chainId: network.toString(),
    lockTime: 180,
    listType: "table",
    other_info: false,
    fee: 3.5,
  });

  const BscConstantStakingiDyp = initbscConstantStakingiDyp({
    staking: window.constant_stakingidyp_2,
    apr: 30,
    liquidity: wbsc_address,
    expiration_time: "28 February 2023",
    fee: 0,
    fee_s: 3.5,
    coinbase: coinbase,
    chainId: network.toString(),
    lockTime: 90,
    listType: "table",
    other_info: false,
    handleSwitchNetwork: handleSwitchNetwork,
  });

  const {  LP_IDs_V2BNB } = window;

  const LP_IDBNB_Array = [
    LP_IDs_V2BNB.wbnb[0],
    LP_IDs_V2BNB.wbnb[1],
    LP_IDs_V2BNB.wbnb[2],
    LP_IDs_V2BNB.wbnb[3],
    LP_IDs_V2BNB.wbnb[4],
  ];


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
    chainId: network.toString(),
    referrer: referrer,
    lockTime: lockarrayStakeAvax[cardIndex],
    listType: "table",
  });

  const StakeAvaxiDyp = stakeAvaxiDyp({
    staking: window.constant_staking_idypavax_1,
    apr: 30,
    liquidity: avax_address,
    expiration_time: "28 February 2023",
    other_info: false,
    fee_s: 3.5,
    fee_u: 0,
    listType: "table",
    lockTime: 90,
    handleSwitchNetwork: handleSwitchNetwork,
    chainId:network.toString()
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
    } else {
      setCards(cardsAvax);
    }
  };

  useEffect(() => {
    fetchPopularNewsData();
    if (network === 56) {
      fetchBnbStaking();
    } else if (network === 43114) {
      fetchAvaxStaking();
    }
    else if(network === 1) {
      fetchEthStaking()
    }
    setPools();
    setLoading(false);
  }, [network, topPools, network]);

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
                  {cards.length > 0 && loading === false ? (
                    cards.map((item, index) => {
                      return (
                        <TopPoolsCard
                          chain={
                            network === 1
                              ? "eth"
                              : network === 56
                              ? "bnb"
                              : "avax"
                          }
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
                          tag={item.tag}
                          onShowDetailsClick={() => {
                            setActiveCard(cards[index]);
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
                    })
                  ) : (
                    <div
                      className="w-100 d-flex justify-content-center align-items-center mt-5"
                      style={{ gridColumn: "1 / 3" }}
                    >
                      <FadeLoader color="#7770DF" />
                    </div>
                  )}
                </div>
                {activeCard && network === 1 ? (
                  activeCard?.cardType === "Staking" ? (
                    <ConstantStakingiDYP1
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_result}
                      lp_id={lp_id[cardIndex]}
                      chainId={network.toString()}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                    />
                  ) : (
                    <VaultCard
                      is_wallet_connected={isConnected}
                      handleConnection={handleConnection}
                      chainId={network.toString()}
                      coinbase={coinbase}
                      the_graph_result={the_graph_result}
                      handleSwitchNetwork={handleSwitchNetwork}
                    />
                  )
                ) : activeCard && network === 56 && cardIndex === 0 ? (
                  activeCard.cardType === "Staking" ? (
                    <BscConstantStake
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_resultbsc}
                      lp_id={LP_IDBNB_Array[cardIndex]}
                      chainId={network.toString()}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                    />
                  ) : (
                    <></>
                  )
                ) : activeCard && network === 56 && cardIndex === 1 ? (
                  activeCard.cardType === "Staking" ? (
                    <BscConstantStakingiDyp
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_resultbsc}
                      lp_id={LP_IDBNB_Array[cardIndex]}
                      chainId={network.toString()}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                    />
                  ) : (
                    <></>
                  )
                ) : activeCard && network === 43114 && cardIndex === 0 ? (
                  activeCard.cardType === "Staking" ? (
                    <StakeAvax
                      is_wallet_connected={isConnected}
                      handleConnection={handleConnection}
                      the_graph_result={the_graph_resultavax}
                      chainId={network.toString()}
                      coinbase={coinbase}
                      referrer={referrer}
                      handleSwitchNetwork={handleSwitchNetwork}
                    />
                  ) : (
                    <></>
                  )
                ) : activeCard && network === 43114 && cardIndex === 1 ? (
                  activeCard.cardType === "Staking" ? (
                    <StakeAvaxiDyp
                      is_wallet_connected={isConnected}
                      handleConnection={handleConnection}
                      the_graph_result={the_graph_resultavax}
                      chainId={network.toString()}
                      coinbase={coinbase}
                      referrer={referrer}
                      handleSwitchNetwork={handleSwitchNetwork}
                    />
                  ) : (
                    <></>
                  )
                ) : (
                  <></>
                )}
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
                          tag={item.tag}
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
                    <ConstantStakingiDYP1
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_result}
                      lp_id={lp_id[cardIndex]}
                      chainId={network.toString()}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                    />
                  ) : (
                    <VaultCard
                      is_wallet_connected={isConnected}
                      handleConnection={handleConnection}
                      chainId={network.toString()}
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
                    <ConstantStakingiDYP1
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_result}
                      lp_id={lp_id[cardIndex]}
                      chainId={network.toString()}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                    />
                  ) : (
                    <VaultCard
                      is_wallet_connected={isConnected}
                      handleConnection={handleConnection}
                      chainId={network.toString()}
                      coinbase={coinbase}
                      the_graph_result={the_graph_result}
                      handleSwitchNetwork={handleSwitchNetwork}
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
          <div className="launchpad-section-wrapper d-flex flex-column gap-3 gap-xxl-1">
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

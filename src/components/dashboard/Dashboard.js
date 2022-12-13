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
import CawsCard from "../top-pools-card/CawsCard";
import CawsDetails from "../FARMINNG/caws";

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
  const [poolTvl, setTvl] = useState(0);

  const [chainId, setChainId] = useState(network);

  const wbsc_address = "0x2170Ed0880ac9A755fd29B2688956BD959F933F8";

  const fetchBnbStaking = async () => {
    return await axios
      .get(`https://api.dyp.finance/api/get_staking_info_bnb`)
      .then((res) => {
        const dypIdypBnb = res.data.stakingInfoDYPBnb;
        const cleanCards = dypIdypBnb.filter((item) => {
          return item.expired !== "Yes";
        });

        const sortedAprs = cleanCards.sort(function (a, b) {
          return b.tvl_usd - a.tvl_usd;
        });
        setTopPools(sortedAprs);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchAvaxStaking = async () => {
    return await axios
      .get(`https://api.dyp.finance/api/get_staking_info_avax`)
      .then((res) => {
        const dypIdypBnb = res.data.stakingInfoDYPAvax;
        const cleanCards = dypIdypBnb.filter((item) => {
          return item.expired !== "Yes";
        });

        const sortedAprs = cleanCards.sort(function (a, b) {
          return b.tvl_usd - a.tvl_usd;
        });
        setTopPools(sortedAprs);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchEthStaking = async () => {
    await axios
      .get(`https://api.dyp.finance/api/get_staking_info_eth`)
      .then((res) => {
        const dypIdyp = res.data.stakingInfoiDYPEth;

        const cleanCards = dypIdyp.filter((item) => {
          return item.expired !== "Yes";
        });

        const sortedAprs = cleanCards.sort(function (a, b) {
          return b.tvl_usd - a.tvl_usd;
        });

        const finalEthCards = res.data.stakingInfoCAWS.concat(
          sortedAprs.slice(0, 2)
        );
        setTopPools(finalEthCards.slice(0, 2));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkNetworkId = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "net_version" })
        .then((data) => {
          setChainId(parseInt(data));
        })
        .catch(console.error);
    } else {
      setChainId(network);
    }
  };

  const cardsEth = [
    {
      top_pick: false,
      tokenName: "CAWS",
      apr: "50%",
      tvl:
        topPools.length > 0
          ? "$" + getFormattedNumber(topPools[0]?.tvl_usd)
          : "$48543.20",
      lockTime: "30 Days",
      tokenLogo: "cawslogo.svg",
      cardType: "NFT",
      tag: "stake",
    },
    {
      top_pick: false,
      tokenName: "iDYP",
      apr: topPools.length > 0 ? topPools[1]?.apy_percent + "%" : "30%",
      tvl:
        topPools.length > 0
          ? "$" + getFormattedNumber(topPools[1]?.tvl_usd)
          : "$48543.20",
      lockTime: topPools.length > 0 ? topPools[1]?.lock_time : "No lock",
      tokenLogo: "idypius.svg",
      cardType: "Staking",
      tag: "stake",
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
      tokenLogo: "dyplogo.svg",
      top_pick: false,
      tokenName: "DYP",
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
      tokenLogo: "dyplogo.svg",
      top_pick: false,
      tokenName: "DYP",
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
    apr: topPools[1]?.apy_percent ? topPools[1]?.apy_percent : 30,
    finalApr: topPools[1]?.apy_performancefee
      ? topPools[1]?.apy_performancefee
      : 30,
    liquidity: eth_address,
    expiration_time: "15 August 2023 ",
    other_info: false,
    fee_s: topPools[1]?.performancefee ? topPools[1]?.performancefee : 30,
    fee_u: 0,
    coinbase: coinbase,
    handleConnection: handleConnection,
    chainId: network.toString(),
    lockTime:
      parseInt(topPools[1]?.lock_time?.split(" ")[0]) === "No"
        ? "No Lock"
        : topPools[1]?.lock_time?.split(" ")[0],
    listType: "table",
    handleSwitchNetwork: handleSwitchNetwork,
  });

  const stakearrayStakeBscDyp2 = [
    window.constant_stakingbsc_new10,
    window.constant_stakingbsc_new11,
  ];

  const expirearrayStakeBscDyp2 = ["14 July 2023", "5 August 2023"];

  const BscConstantStake = initbscConstantStaking({
    staking: stakearrayStakeBscDyp2[0],
    apr: topPools[0]?.apy_percent ? topPools[0]?.apy_percent : 30,
    finalApr: topPools[0]?.apy_performancefee
      ? topPools[0]?.apy_performancefee
      : 30,
    liquidity: wbsc_address,
    expiration_time: expirearrayStakeBscDyp2[0],
    coinbase: coinbase,
    chainId: network.toString(),
    lockTime:
      parseInt(topPools[0]?.lock_time?.split(" ")[0]) === "No"
        ? "No Lock"
        : topPools[0]?.lock_time?.split(" ")[0],
    listType: "table",
    other_info: false,
    fee: topPools[0]?.performancefee,
  });

  const BscConstantStake1 = initbscConstantStaking({
    staking: stakearrayStakeBscDyp2[1],
    apr: topPools[1]?.apy_percent ? topPools[1]?.apy_percent : 30,
    finalApr: topPools[1]?.apy_performancefee
      ? topPools[1]?.apy_performancefee
      : 30,
    liquidity: wbsc_address,
    expiration_time: expirearrayStakeBscDyp2[1],
    coinbase: coinbase,
    chainId: network.toString(),
    lockTime:
      parseInt(topPools[1]?.lock_time?.split(" ")[0]) === "No"
        ? "No Lock"
        : topPools[1]?.lock_time?.split(" ")[0],
    listType: "table",
    other_info: false,
    fee: topPools[1]?.performancefee,
  });

  const { LP_IDs_V2BNB } = window;

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
  const expirearrayStakeAvax = ["14 July 2023", "05 August 2023"];

  const StakeAvax = stakeAvax({
    staking: stakingarrayStakeAvax[0],
    apr: topPools[0]?.apy_percent ? topPools[0]?.apy_percent : 30,
    finalApr: topPools[0]?.apy_performancefee
      ? topPools[0]?.apy_performancefee
      : 30,
    liquidity: avax_address,
    expiration_time: expirearrayStakeAvax[0],
    fee: topPools[0]?.performancefee,
    coinbase: coinbase,
    chainId: network.toString(),
    referrer: referrer,
    lockTime:
      parseInt(topPools[0]?.lock_time?.split(" ")[0]) === "No"
        ? "No Lock"
        : topPools[cardIndex]?.lock_time?.split(" ")[0],
    listType: "table",
  });

  const StakeAvax1 = stakeAvax({
    staking: stakingarrayStakeAvax[1],
    apr: topPools[1]?.apy_percent ? topPools[1]?.apy_percent : 30,
    finalApr: topPools[1]?.apy_performancefee
      ? topPools[1]?.apy_performancefee
      : 30,
    liquidity: avax_address,
    expiration_time: expirearrayStakeAvax[1],
    fee: topPools[1]?.performancefee,
    coinbase: coinbase,
    chainId: network.toString(),
    referrer: referrer,
    lockTime:
      parseInt(topPools[1]?.lock_time?.split(" ")[0]) === "No"
        ? "No Lock"
        : topPools[cardIndex]?.lock_time?.split(" ")[0],
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

  const fetchStakingData = () => {
    if (chainId === 1) {
      fetchEthStaking();
    }
    if (chainId === 56) {
      fetchBnbStaking();
    }
    if (chainId === 43114) {
      fetchAvaxStaking();
    }
  };
 

  const handleReload = () => {
    window.location.reload();
  };

  const ethereum = window.ethereum;

  // ethereum?.on("chainChanged", handleReload);

  // ethereum?.removeAllListeners(["networkChanged"]);

  useEffect(() => {
    fetchStakingData();
    checkNetworkId();
    setLoading(false);
    fetchPopularNewsData();
  }, [network, chainId]);

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
                  {topPools.length > 0 && loading === false ? (
                    topPools.map((item, index) => {
                      return (
                        <TopPoolsCard
                          key={index}
                          chain={network}
                          top_pick={item.top_pick}
                          tokenName={item.pair_name}
                          apr={item.apy_percent + "%"}
                          tvl={"$" + getFormattedNumber(item.tvl_usd)}
                          lockTime={item.lock_time ? item.lock_time : 30}
                          tokenLogo={
                            item.icon
                              ? item.icon
                              : item.pair_name === "iDYP"
                              ? "idypius.svg"
                              : item.pair_name === "DYP"
                              ? "dyplogo.svg"
                              : "cawslogo.svg"
                          }
                          onShowDetailsClick={() => {
                            setActiveCard(topPools[index]);
                            setcardIndex(index);
                            setDetails(index);
                          }}
                          onHideDetailsClick={() => {
                            setActiveCard(null);
                            setDetails();
                          }}
                          cardType={"table"}
                          details={details === index ? true : false}
                          expired={false}
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
                {activeCard && chainId === 1 ? (
                 
                  chainId === 1 &&
                  cardIndex === 1 ? (
                    <ConstantStakingiDYP1
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_result}
                      lp_id={lp_id[cardIndex]}
                      chainId={chainId.toString()}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                    />
                  ) : activeCard && chainId === 1 && cardIndex === 0 ? (
                    <CawsDetails
                      coinbase={coinbase}
                      isConnected={isConnected}
                      listType={"table"}
                      chainId={chainId.toString()}
                      handleSwitchNetwork={handleSwitchNetwork}
                      handleConnection={handleConnection}
                      expired={false}
                    />
                  ) : (
                    <></>
                  )
                ) : activeCard && chainId === 56 && cardIndex === 0 ? (
                
                    <BscConstantStake
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_resultbsc}
                      lp_id={LP_IDBNB_Array[cardIndex]}
                      chainId={chainId.toString()}
                      expired={false}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                    />
                  
                ) : activeCard && chainId === 56 && cardIndex === 1 ? (
                  
                    <BscConstantStake1
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_resultbsc}
                      lp_id={LP_IDBNB_Array[cardIndex]}
                      chainId={chainId.toString()}
                      expired={false}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                    />
                
                ) : activeCard && chainId === 43114 && cardIndex === 0 ? (
                 
                    <StakeAvax
                      is_wallet_connected={isConnected}
                      handleConnection={handleConnection}
                      the_graph_result={the_graph_resultavax}
                      chainId={chainId.toString()}
                      coinbase={coinbase}
                      referrer={referrer}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                    />
                 
                ) : activeCard && chainId === 43114 && cardIndex === 1 ? (
                 
                    <StakeAvax1
                      is_wallet_connected={isConnected}
                      handleConnection={handleConnection}
                      the_graph_result={the_graph_resultavax}
                      chainId={chainId.toString()}
                      coinbase={coinbase}
                      referrer={referrer}
                      expired={false}
                      handleSwitchNetwork={handleSwitchNetwork}
                    />
               
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <div className="d-flex flex-column gap-4">
                <div className="row m-0 gap-4 toppool-allwrapper">
                {topPools.length > 0 && loading === false ? (
                    topPools.slice(0,1).map((item, index) => {
                      return (
                        <TopPoolsCard
                          key={index}
                          chain={network}
                          top_pick={item.top_pick}
                          tokenName={item.pair_name}
                          apr={item.apy_percent + "%"}
                          tvl={"$" + getFormattedNumber(item.tvl_usd)}
                          lockTime={item.lock_time ? item.lock_time : 30}
                          tokenLogo={
                            item.icon
                              ? item.icon
                              : item.pair_name === "iDYP"
                              ? "idypius.svg"
                              : item.pair_name === "DYP"
                              ? "dyplogo.svg"
                              : "cawslogo.svg"
                          }
                          onShowDetailsClick={() => {
                            setActiveCard(topPools[index]);
                            setcardIndex(index);
                            setDetails(index);
                          }}
                          onHideDetailsClick={() => {
                            setActiveCard(null);
                            setDetails();
                          }}
                          cardType={"table"}
                          details={details === index ? true : false}
                          expired={false}
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
                {activeCard ? (
                 chainId === 1 &&
                 cardIndex === 1 ? (
                    <ConstantStakingiDYP1
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_result}
                      lp_id={lp_id[cardIndex]}
                      chainId={chainId.toString()}
                      handleConnection={handleConnection}
                      handleSwitchNetwork={handleSwitchNetwork}
                      expired={false}
                    />
                  ) : (
                    <CawsDetails
                      coinbase={coinbase}
                      isConnected={isConnected}
                      listType={"table"}
                      chainId={chainId.toString()}
                      handleSwitchNetwork={handleSwitchNetwork}
                      handleConnection={handleConnection}
                      expired={false}
                    />
                  )
                ) : (
                  <></>
                )}
                <div className="row m-0 gap-4 toppool-allwrapper">
                {topPools.length > 0 && loading === false ? (
                    topPools.slice(1, topPools.length).map((item, index) => {
                      return (
                        <TopPoolsCard
                          key={index}
                          chain={network}
                          top_pick={item.top_pick}
                          tokenName={item.pair_name}
                          apr={item.apy_percent + "%"}
                          tvl={"$" + getFormattedNumber(item.tvl_usd)}
                          lockTime={item.lock_time ? item.lock_time : 30}
                          tokenLogo={
                            item.icon
                              ? item.icon
                              : item.pair_name === "iDYP"
                              ? "idypius.svg"
                              : item.pair_name === "DYP"
                              ? "dyplogo.svg"
                              : "cawslogo.svg"
                          }
                          onShowDetailsClick={() => {
                            setActiveCard(topPools[index]);
                            setcardIndex(index);
                            setDetails(index);
                          }}
                          onHideDetailsClick={() => {
                            setActiveCard(null);
                            setDetails();
                          }}
                          cardType={"table"}
                          details={details === index ? true : false}
                          expired={false}
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
                {activeCard2 ? (
                 chainId === 1 && cardIndex === 1 ? (
                    <ConstantStakingiDYP1
                      is_wallet_connected={isConnected}
                      coinbase={coinbase}
                      the_graph_result={the_graph_result}
                      lp_id={lp_id[cardIndex]}
                      chainId={chainId.toString()}
                      handleConnection={handleConnection}
                      expired={false}
                      handleSwitchNetwork={handleSwitchNetwork}
                    />
                  ) : (
                    <CawsDetails
                      coinbase={coinbase}
                      isConnected={isConnected}
                      listType={"table"}
                      chainId={chainId.toString()}
                      handleSwitchNetwork={handleSwitchNetwork}
                      handleConnection={handleConnection}
                      expired={false}
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

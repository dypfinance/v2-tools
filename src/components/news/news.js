import React, { useState, useRef, useEffect } from "react";
import SingleNews from "./singleNews";
import MainNews from "./mainNews";
import PressRealease from "./PressRelease";
import OtherNews from "./OtherNews";
import NewsModal from "./NewsModal";
import axios from "axios";
import ToolTip from "./ToolTip";
import OutsideClickHandler from "react-outside-click-handler";
import * as _ from "lodash";
import { useWeb3React } from "@web3-react/core";
import Carousel from "better-react-carousel";
import { useParams } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Slider from "react-slick";
import pressReleaseNext from './assets/pressReleaseNext.svg'

const News = ({ theme, isPremium, coinbase }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    autoplay: false,
    responsive: [
      {
        breakpoint: 1138,
        settings: {
          arrows: false,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          fade: false,
          arrows: false,
        },
      },
    ],
  };

  const mainSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
    dotsClass : "news__dots",
    responsive: [
      {
        breakpoint: 1138,
        settings: {
          arrows: false,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          fade: false,
          arrows: false,
        },
      },
    ],
  };



  const newsPerRow = 9;
  const [activeClass, setActiveClass] = useState("latestnews");
  const [showModal, setShowModal] = useState(false);
  const [newsItemId, setnewsItemId] = useState(-1);
  const [votes, setVotes] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [activeNews, setActiveNews] = useState([]);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isParam, setIsParam] = useState(true);
  const [isConnected, setIsConnected] = useState();
  const { account, chainId, active } = useWeb3React();
  const [pressNewsData, setPressNewsData] = useState([]);
  const [popularNewsData, setPopularNewsData] = useState([]);
  const [otherNewsData, setOtherNewsData] = useState([]);
  const [otherNewsDataReverse, setOtherNewsDataReverse] = useState([]);
  const [otherPressReverse, setotherPressReverse] = useState([]);
  const [newsContent, setNewsContent] = useState([]);
  const [next, setNext] = useState(newsPerRow);
  const [userAlreadyVoted, setUserAlreadyVoted] = useState(true);
  const [canVote, setCanVote] = useState(false);

  const loadMore = () => {
    setNext(next + newsPerRow);
  };

  const handleSingleNewsUpdate = (id) => {
    setActiveNews(newsData[id]);
    setShowModal(true);
  };

  const fetchVotingdata = async () => {
    const response = await fetch(`https://news-manage.dyp.finance/api/v1/votes/all`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setVotes(data.Data);
      })
      .catch(console.error);

    return response;
  };

  const fetchNewsdata = async () => {
    const result = await fetch(`https://news-manage.dyp.finance/api/news`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setNewsData(data);
      })
      .catch(console.error);

    return result;
  };

  const fetchPressData = async () => {
    const result = await fetch(`https://news-manage.dyp.finance/api/press`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPressNewsData(data);
        // checkSingleVotes(parseInt(data._id))
      })
      .catch(console.error);

    return result;
  };

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

  const checkSingleVotes = async () => {

    const topnews = [
      ...otherNewsData,
      ...popularNewsData,
      ...newsData,
      ...pressNewsData,
    ];

    if (topnews.length > 0) {
      for (let i = 0; i < topnews.length; i++) {
        axios
          .get(`https://news-manage.dyp.finance/api/v1/votes/${topnews[i].id}`)
          .then((data) => {
            votes.push(data);
          })
          .catch(console.error);
      }
    }

  };

  const fetchOtherNewsData = async () => {
    const result = await fetch(`https://news-manage.dyp.finance/api/others`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setOtherNewsData(data);
      })
      .catch(console.error);

    return result;
  };

  useEffect(() => {
    if (account !== undefined) {
      setIsConnected(true);
    } else setIsConnected(false);
  },[account]);

  useEffect(() => {
    fetchVotingdata().then();
    // checkSingleVotes() 
  }, [showModal, newsItemId, activeNews]);

  const { news_id } = useParams();

  const handleSelecTopNews = (key) => {
    const topnews = [
      ...otherNewsData,
      ...popularNewsData,
      ...newsData,
      ...pressNewsData,
    ];
    const search = (obj) => obj.id == key;
    const index = topnews.findIndex(search);
    setActiveNews(topnews[index]);
  };

  const handleFetchNewsContent = async (dataType, itemId) => {
    if (dataType === "popular") {
      const result = await fetch(
        `https://news-manage.dyp.finance/api/populars/${itemId}`
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setNewsContent(data.content);
        })
        .catch(console.error);

      return result;
    }

    if (dataType === "other") {
      const result = await fetch(
        `https://news-manage.dyp.finance/api/others/${itemId}`
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setNewsContent(data.content);
        })
        .catch(console.error);

      return result;
    }

    if (dataType === "press") {
      const result = await fetch(
        `https://news-manage.dyp.finance/api/press/${itemId}`
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setNewsContent(data.content);
        })
        .catch(console.error);

      return result;
    }

    if (dataType === "news") {
      const result = await fetch(
        `https://news-manage.dyp.finance/api/news/${itemId}`
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setNewsContent(data.content);
        })
        .catch(console.error);

      return result;
    }

    if (dataType === "special") {
      const bigData = [
        ...popularNewsData,
        ...otherNewsData,
        ...newsData,
        ...pressNewsData,
      ];

      for (let i = 0; i < bigData.length; i++) {
        if (itemId === otherNewsData[i]?.id) {
          for (let j = 0; j < otherNewsData.length; j++) {
            if (itemId === otherNewsData[j].id) {
              if (popularNewsData.find((obj) => obj.id === itemId)) {
                handleFetchNewsContent("popular", itemId);
              } else if (pressNewsData.find((obj) => obj.id === itemId)) {
                handleFetchNewsContent("press", itemId);
              } else if (newsData.find((obj) => obj.id === itemId)) {
                handleFetchNewsContent("news", itemId);
              } else {
                handleFetchNewsContent("other", itemId);
              }
            }
          }
        }
      }
    }
  };

  const handleSelectPressNews = (key) => {
    if (popularNewsData.length > 0) {
      const search = (obj) => obj.id == key;
      const index = popularNewsData.findIndex(search);
      setActiveNews(popularNewsData[index]);
      handleFetchNewsContent("popular", key);
    }
  };

  const handleSelectTopVotedNews = (key) => {
    const topVotedArray = [
      ...otherNewsData,
      ...newsData,
      ...popularNewsData,
      ...pressNewsData,
    ];
    if (topVotedArray.length > 0) {
      const search = (obj) => obj.id == key;
      const index = topVotedArray.findIndex(search);
      setActiveNews(topVotedArray[index]);
      handleFetchNewsContent("special", key);
    }
  };

  const handleDisplayNewsFromParam = async () => {
    if (news_id != undefined && isParam === true) {
      window.scrollTo(0, 0);
      const search = (obj) => obj.id == news_id;
      let index = otherNewsData.findIndex(search);
      if (index != "-1") {
        handleFetchNewsContent("other", news_id);
        setActiveNews(otherNewsData[index]);
        setShowModal(true);
      } else {
        let index = newsData.findIndex(search);
        if (index != "-1") {
          handleFetchNewsContent("news", news_id);
          setActiveNews(newsData[index]);
          setShowModal(true);
        } else {
          let index = popularNewsData.findIndex(search);
          if (index != "-1") {
            handleFetchNewsContent("popular", news_id);
            setActiveNews(popularNewsData[index]);
            setShowModal(true);
          } else {
            let index = pressNewsData.findIndex(search);
            if (index != "-1") {
              handleFetchNewsContent("press", news_id);
              setActiveNews(pressNewsData[index]);
              setShowModal(true);
            }
          }
        }
      }
    }
  };

  const sortTopVoted = (arrayOfVotes) => {
    return arrayOfVotes.sort((a, b) =>
      a.up - a.down < b.up - b.down ? 1 : -1
    );
  };

  const topVotes = (votes) => {
    const arrayOfVotes = sortTopVoted(votes);
    const cloneArray = [
      ...otherNewsData,
      ...popularNewsData,
      ...pressNewsData,
      ...newsData,
    ];
    return arrayOfVotes.map((i) => cloneArray.find((j) => j.id === i.id));
  };
  const cloneArray = [
    ...otherNewsData,
    ...popularNewsData,
    ...pressNewsData,
    ...newsData,
  ];
  useEffect(() => {
    if (activeNews.date !== undefined) {
      setIsParam(false);
    } else {
      if (cloneArray.length > 0) {
        fetchNewsdata();
        handleDisplayNewsFromParam();
      }
    }
  }, [cloneArray.length, news_id, activeNews]);

  const handleNewsReoderPopular = () => {
    if (popularNewsData.length > 5 && otherNewsData.length > 0) {
      otherNewsData.push(...popularNewsData.slice(5, popularNewsData.length));
      otherNewsData.reverse();
      setOtherNewsDataReverse(otherNewsData);
    }
  };

  const handleNewsReoderPress = () => {
    if (pressNewsData.length > 8 && otherNewsData.length > 0) {
      otherPressReverse.push(...pressNewsData.slice(8, pressNewsData.length));
      otherPressReverse.reverse();
      setotherPressReverse(otherNewsData);
    }
  };
  useEffect(() => {
    handleNewsReoderPopular();
    handleNewsReoderPress();
  }, [popularNewsData.length, otherNewsData.length, pressNewsData.length]);

  useEffect(() => {
    fetchNewsdata().then();
    fetchPressData().then();
    fetchPopularNewsData().then();
    fetchOtherNewsData().then();
  }, [newsData.length, popularNewsData.length]);

  useEffect(() => {
    fetchVotingdata().then();
  }, [newsItemId]);

  const bal1 = Number(localStorage.getItem("balance1"));
  const bal2 = Number(localStorage.getItem("balance2"));
  const logout = localStorage.getItem("logout");

  useEffect(() => {
    if (bal1 === 0 && bal2 === 0 && isPremium === true) {
      setCanVote(true);
    } else if (bal1 !== 0 && bal2 !== 0 && isPremium === true) {
      setCanVote(true);
    } else if ((bal1 !== 0 || bal2 !== 0) && isPremium === false) {
      setCanVote(true);
    } else if (bal1 === 0 && bal2 === 0 && isPremium === false) {
      setCanVote(false);
    } else if (logout === "true") {
      setCanVote(false);
    }
  }, [userAlreadyVoted, bal1, bal2, isPremium]);

  // console.log(isPremium)

  const handleUpVoting = async (itemId) => {
    const coinbase = await window.getCoinbase();
    // console.log(itemId)
    if (
      (bal1 === 0 && bal2 === 0 && isPremium === false) ||
      logout === "true"
    ) {
      setShowTooltip(true);
    } else {
      let response = null;
      try {
        response = await axios.get(
          `https://news-manage.dyp.finance/api/v1/vote/${itemId}/${coinbase}/up`
        );

        if (response.data.status === "success") {
          setUserAlreadyVoted(false);
          fetchVotingdata().then((votes) => topVotes(votes));
          setnewsItemId(Number(itemId) + 1);
        } else {
          setUserAlreadyVoted(true);
          setShowTooltip(true);
        }
      } catch (e) {
        console.log(e);
      }
      return response;
    }
  };

  const handleDownVoting = async (itemId) => {
    const coinbase = await window.getCoinbase();

    if (
      (bal1 === 0 && bal2 === 0 && isPremium === false) ||
      logout === "true"
    ) {
      setShowTooltip(true);
    } else {
      return await axios
        .get(
          `https://news-manage.dyp.finance/api/v1/vote/${itemId}/${coinbase}/down`
        )
        .then((data) => {
          if (data.data.status === "success") {
            setnewsItemId(itemId);
            setUserAlreadyVoted(false);
          } else {
            setUserAlreadyVoted(true);
            setShowTooltip(true);
          }
          // console.log(data)
        })
        .catch(console.error);
    }
  };

  const listInnerRef = useRef();

  useEffect(() => {
    document.addEventListener("scroll", onScroll);
  });

  useEffect(() => {
    localStorage.setItem("firstTimeVoter", "false");
  }, []);

  let result = [...otherNewsDataReverse, ...otherPressReverse, ...newsData];
  const bigNews = [...new Set(result)];
  const bigNewsSorted = bigNews.sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });

  const onScroll = () => {
    const wrappedElement = document.getElementById("header");
    const isBottom =
      wrappedElement.getBoundingClientRect()?.bottom <= window.innerHeight;
    if (isBottom) {
      if (next < bigNews.length) {
        loadMore();
      }
      document.removeEventListener("scroll", onScroll);
    }
  };


  const slider = useRef()
  const carousel = useRef();



  const nextMain = () => {
    carousel.current.slickNext();
  }

  const prevMain = () => {
    carousel.current.slickPrev();
  }

  const nextSlide = () => {
    slider.current.slickNext();
  };
  const prevSlide = () => {
    slider.current.slickPrev();
  };



  return (
    <div onScroll={onScroll} ref={listInnerRef} className="container-lg" id="header">
        {/* {!showModal ? <h1 className="news-title">Popular News</h1> : ""} */}
        <div className="row m-0 main-news-content-wrapper">
          {showModal === true ? (
            <NewsModal
              style={{ width: "fit-content" }}
              onSelectOtherNews={(key) => {
                window.scrollTo(0, 0);
                handleSelecTopNews(key);
                handleFetchNewsContent("special", key);
                setIsParam(false);
              }}
              title={activeNews.title}
              link={activeNews.link}
              image={activeNews.image}
              content={newsContent}
              theme={theme}
              coinbase={coinbase}
              // upvotes={
              //   votes.length !== 0
              //     ? votes.find((obj) => obj.id === activeNews.id)?.up !== undefined ? votes.find((obj) => obj.id === activeNews.id)?.up : 0
              //     : 0
              // }
              // downvotes={
              //   votes.length !== 0
              //     ? votes.find((obj) => obj.id === activeNews.id)?.down !== undefined
              //       ? votes.find((obj) => obj.id === activeNews.id)?.down
              //       : 0
              //     : 0
              // }
              upvotes={activeNews.vote.up}
                            downvotes={activeNews.vote.down}
              day={activeNews.date?.slice(0, 10)}
              month={activeNews.month}
              year={activeNews.year}
              fullDate={activeNews.date}
              latestNewsData={topVotes(votes)}
              newsId={activeNews.id}
              pressData={pressNewsData}
              onHandleUpvote={(id) => {
                handleUpVoting(id);
              }}
              onHandleDownvote={(id) => {
                handleDownVoting(id);
              }}
              onHandlePressUpvote={(id) => {
                handleUpVoting(id);
              }}
              onHandlePressDownvote={(id) => {
                handleDownVoting(id);
              }}
              isConnected={isConnected}
              onModalClose={() => {
                news_id !== undefined
                  ? window.location.replace("/news")
                  : setShowModal(false);
              }}
              isPremium={isPremium}
            />
          ) : newsData.length > 0 ? (
            <>
              <div className="col-8 ps-0">
              <div className="position-relative p-3 featured-slider-wrapper">
              <Slider {...mainSettings} ref={carousel}>
                {popularNewsData.length > 0 &&
                    popularNewsData.slice(0, 5).map((item, index) => {
                      return (
                          <div className="" key={index}>
                            <MainNews
                              image={item.image}
                              title={item.title}
                              link={item.link}
                              day={item.date}
                              theme={theme}
                              coinbase={coinbase}
                              upvotes={
                                votes.length !== 0
                                  ? votes.find((obj) => obj.id === item.id)?.up !== undefined ? votes.find((obj) => obj.id === item.id)?.up : 0
                                  : 0
                              }
                              downvotes={
                                votes.length !== 0
                                  ? votes.find((obj) => obj.id === item.id)?.down !== undefined
                                    ? votes.find((obj) => obj.id === item.id)?.down
                                    : 0
                                  : 0
                              }
                              newsId={item.id}
                              onShowModalClick={() => {
                                setShowModal(true);
                                setActiveNews(popularNewsData[index]);
                                handleFetchNewsContent("popular", item.id);
                                console.log(index);
                              }}
                              onVotesFetch={fetchVotingdata}
                              isConnected={isConnected}
                              isPremium={isPremium}
                            />
                          </div>
                      );
                    })}
                </Slider>
                <div className="d-flex align-items-center gap-2 featured-slider-arrows">
          <img src={pressReleaseNext} height={40} width={40} className="cursor-pointer"  alt="prev-button" style={{transform: 'rotate(180deg)'}} onClick={prevMain} />
          <img src={pressReleaseNext} height={40} width={40} className="cursor-pointer"  alt="prev-button" onClick={nextMain} />

                </div>
              </div>
               
              </div>
              <div
                className=" col-4 pe-0"
                style={{
                  display: !showModal ? "flex" : "none",
                }}
              >
               <div className="singlenews-side p-3">
               <div className="button-wrapper">
                  <h6
                    className={
                      activeClass === "latestnews"
                        ? "activebutton"
                        : "passivebutton"
                    }
                    onClick={() => {
                      setActiveClass("latestnews");
                    }}
                  >
                    Latest news
                  </h6>
                  <h6
                    className={
                      activeClass !== "latestnews"
                        ? "activebutton"
                        : "passivebutton"
                    }
                    onClick={() => {
                      setActiveClass("toprated");
                    }}
                  >
                    Top voted
                  </h6>
                </div>
                {popularNewsData.length > 0 &&
                  activeClass === "latestnews" &&
                  popularNewsData.slice(0, 3).map((item, key) => {
                    return (
                      <div className="banner-item pl-0" key={key}>
                        <SingleNews
                          image={item.image}
                          title={item.title}
                          link={item.link}
                          year={item.year}
                          month={item.month}
                          day={item.date.slice(0, 10)}
                          fullDate={item.date}
                          theme={theme}
                          newsId={item.id}
                          // upvotes={
                          //   votes.length !== 0
                          //     ? votes.find((obj) => obj.id === item.id)?.up !== undefined ? votes.find((obj) => obj.id === item.id)?.up : 0
                          //     : 0
                          // }
                          upvotes={item.vote.up}
                          // downvotes={
                          //   votes.length !== 0
                          //     ? votes.find((obj) => obj.id === item.id)?.down !== undefined
                          //       ? votes.find((obj) => obj.id === item.id)?.down
                          //       : 0
                          //     : 0
                          // }
                          downvotes={item.vote.down}
                          onVotesFetch={fetchVotingdata}
                          coinbase={coinbase}
                          onNewsClick={() => {
                            setShowModal(true);
                            setActiveNews(popularNewsData[key]);
                            handleFetchNewsContent("popular", item.id);
                          }}
                          isConnected={isConnected}
                          isPremium={isPremium}
                        />
                      </div>
                    );
                  })}

                {topVotes(votes).length > 0 && //todo
                activeClass === "toprated" ? (
                  topVotes(votes)
                    .slice(0, 3)
                    .map((item, key) => {
                      return (
                        <div className="banner-item pl-0" key={key}>
                          <SingleNews
                            image={item.image}
                            title={item.title}
                            link={item.link}
                            year={item.year}
                            month={item.month}
                            day={item.date.slice(0, 10)}
                            fullDate={item.date}
                            theme={theme}
                            onVotesFetch={fetchVotingdata}
                            coinbase={coinbase}
                            // upvotes={
                            //   votes.length !== 0
                            //     ? votes.find((obj) => obj.id === item.id)?.up !== undefined ? votes.find((obj) => obj.id === item.id)?.up : 0
                            //     : 0
                            // }
                            // downvotes={
                            //   votes.length !== 0
                            //     ? votes.find((obj) => obj.id === item.id)?.down !== undefined
                            //       ? votes.find((obj) => obj.id === item.id)?.down
                            //       : 0
                            //     : 0
                            // }
                            upvotes={item.vote.up}
                            downvotes={item.vote.down}
                            onNewsClick={() => {
                              setShowModal(true);
                              handleSelectTopVotedNews(item.id);
                            }}
                            isConnected={isConnected}
                            isPremium={isPremium}
                          />
                        </div>
                      );
                    })
                ) : (
                  <></>
                )}
               </div>
              </div>
            </>
          ) : (
            <div
              style={{
                padding: "60px",
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <CircularProgress color="inherit" size={75} />
            </div>
          )}
        </div>
      <div className="press-release-wrapper">
        <h1 className="news-title" style={{paddingBottom: '20px'}}>
          Press Release
        </h1>
        {/* <div
          className="brand-wrapper banner-wrapper"
          style={{ width: "98%", margin: "auto" }}
        >
          <Carousel
            cols={2}
            rows={1}
            gap={1}
            showDots={true}
            loop
            scrollSnap={true}
            responsiveLayout={responsive1}
            autoplay={4000}
          >
           
          </Carousel>
        </div> */}
        <div
          className="press-release-container d-flex justify-content-center position-relative  p-3"
          // style={{ width: "96%", margin: "auto", background: "none" }}
        >
          <img src={pressReleaseNext} className="press-prev-btn" alt="prev-button" style={{transform: 'rotate(180deg)'}} onClick={prevSlide} />
         <div style={{width: '93%'}}>
         <Slider {...settings} ref={slider}>
            {pressNewsData.length > 0 &&
              pressNewsData.slice(0, 8).map((item, key) => {
                return (
                  <div
                    style={{ background: "none" }}
                    key={key}
                    onDragEnd={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    <PressRealease
                      image={item.image}
                      title={item.title}
                      link={item.link}
                      date={item.date}
                      isPremium={isPremium}
                      isConnected={isConnected}
                      onVotesFetch={fetchVotingdata}
                      newsId={item.id}
                      onSinglePressHighlightClick={() => {
                        setActiveNews(pressNewsData[key]);
                        handleFetchNewsContent("press", item.id);
                        setShowModal(true);
                        console.log(key);
                        window.scrollTo(0, 0);
                      }}
                      // upvotes={
                      //   votes.length !== 0
                      //     ? votes.find((obj) => obj.id === item.id)?.up !== undefined ? votes.find((obj) => obj.id === item.id)?.up : 0
                      //     : 0
                      // }
                      // downvotes={
                      //   votes.length !== 0
                      //     ? votes.find((obj) => obj.id === item.id)?.down !== undefined
                      //       ? votes.find((obj) => obj.id === item.id)?.down
                      //       : 0
                      //     : 0
                      // }
                      upvotes={item.vote.up}
                            downvotes={item.vote.down}
                      coinbase={coinbase}
                    />
                  </div>
                );
              })}
          </Slider>
         </div>
          <img src={pressReleaseNext} alt="next-button" className="press-next-btn" onClick={nextSlide} />

        </div>
      </div>
      <div className="press-release-wrapper" style={{ paddingTop: 0 }}>
        <h1
          className="news-title"
          style={{paddingBottom: '20px'}}
        >
          Other News
        </h1>
        <div className="row m-0 othernews-row-wrapper">
          {bigNewsSorted.length > 0 &&
            bigNewsSorted?.slice(0, next)?.map((item, key) => {
              return (
                <div
                  className="banner-item  p-0"
                  key={key}
                  style={{ background: "none" }}
                >
                  <OtherNews
                    image={item.image}
                    title={item.title}
                    link={item.link}
                    date={item.date.slice(0, 10)}
                    fulldate={item.date}
                    month={item.month}
                    year={item.year}
                    theme={theme}
                    onVotesFetch={fetchVotingdata}
                    newsId={item.id}
                    // upvotes={
                    //   votes.length !== 0
                    //     ? votes.find((obj) => obj.id === item.id)?.up !== undefined ? votes.find((obj) => obj.id === item.id)?.up : 0
                    //     : 0
                    // }
                    // downvotes={
                    //   votes.length !== 0
                    //     ? votes.find((obj) => obj.id === item.id)?.down !== undefined
                    //       ? votes.find((obj) => obj.id === item.id)?.down
                    //       : 0
                    //     : 0
                    // }
                    upvotes={item.vote.up}
                    downvotes={item.vote.down}
                    onOtherNewsClick={() => {
                      setActiveNews(bigNewsSorted[key]);
                      handleFetchNewsContent("special", item.id);
                      setShowModal(true);
                      window.scrollTo(0, 0);
                    }}
                    isConnected={isConnected}
                    isPremium={isPremium}
                    coinbase={coinbase}
                  />
                </div>
              );
            })}
        </div>
        <div className="d-flex justify-content-center">
          {next < otherNewsData?.length + newsData.length && (
            <button onClick={() => loadMore()} className="load-more-btn">
              Load more
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default News;

import Modal from "../general/Modal";
import axios from "axios";
import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import RelatedNews from "./RelatedNews";
import OutsideClickHandler from "react-outside-click-handler";
import VotePassive from "./assets/votepassive.svg";
import Upvote from "./assets/upvote.svg";
import Downvote from "./assets/downvote.svg";
import Clock from "./assets/clock.svg";
import ToolTip from "./ToolTip";

import { useState } from "react";

const NewsModal = ({
  title,
  image,
  content,
  newsId,
  latestNewsData,
  pressData,
  theme,
  onHandleUpvote,
  onHandleDownvote,
  onSelectOtherNews,
  onHandlePressDownvote,
  onHandlePressUpvote,
  isConnected,
  upvotes,
  downvotes,
  month,
  day,
  year,
  link,
  onModalClose,
  isPremium,
  coinbase,
}) => {
  const getItemsWithoutCurrentItem = (currentItemId, arrayOfItems) => {
    return arrayOfItems.filter((item) => item?.id !== currentItemId);
  };
  const elementRef = useRef();
  const [height, setHeight] = useState(0);
  const [likeIndicator, setLikeIndicator] = useState(false);
  const [dislikeIndicator, setDislikeIndicator] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [votes, setVotes] = useState([]);
  const [alreadyVoted, setalreadyVoted] = useState(true);
  const [canVote, setCanVote] = useState(false);

  useEffect(() => {
    if (elementRef.current.clientHeight !== 0) {
      setHeight(elementRef.current.clientHeight);
      setDislikeIndicator(false);
      setLikeIndicator(false);
    }
  }, [newsId, content]);

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
  }, [alreadyVoted, bal1, bal2, isPremium]);

  const handleLikeStates = () => {
    if (logout === "false") {
      checkUpVoting(newsId);
    }
    else {setShowTooltip(true);}
    if (
      (bal1 === 0 && bal2 === 0 && isPremium === false) ||
      logout === "true" ||
      alreadyVoted === false
    ) {
      setLikeIndicator(false);
      setDislikeIndicator(false);
      setShowTooltip(true);
    } else {
      if (likeIndicator === true) {
        setLikeIndicator(false);
        // onHandlePressDownvote(newsId);
      } else if (likeIndicator === false) {
        setLikeIndicator(true);
        setDislikeIndicator(false);
        // onHandlePressUpvote(newsId);
      }
    }
  };

  const handleDisLikeStates = () => {
    if (logout === "false") {
      checkDownVoting(newsId);
    }
    else {setShowTooltip(true);}
    if (
      (bal1 === 0 && bal2 === 0 && isPremium === false) ||
      logout === "true" ||
      alreadyVoted === false
    ) {
      setLikeIndicator(false);
      setShowTooltip(true);
    } else {
      if (dislikeIndicator === true) {
        setDislikeIndicator(false);
        // onHandlePressUpvote(newsId);
      } else if (dislikeIndicator === false) {
        // onHandlePressDownvote(newsId);
        setDislikeIndicator(true);
        setLikeIndicator(false);
      }
    }
  };

  const checkUpVoting = async (itemId) => {
    return await axios
      .get(
        `https://news-manage.dyp.finance/api/v1/vote/${itemId}/${coinbase}/up`
      )
      .then((data) => {
        if (data.data.status === "success") {
          fetchVotingdata().then();
        } else {
          setalreadyVoted(false);
          setShowTooltip(true);
          setLikeIndicator(false);
        }
      })
      .catch(console.error);
  };

  const checkDownVoting = async (itemId) => {
    return await axios
      .get(
        `https://news-manage.dyp.finance/api/v1/vote/${itemId}/${coinbase}/down`
      )
      .then((data) => {
        if (data.data.status === "success") {
          fetchVotingdata();
        } else {
          setalreadyVoted(false);
          setShowTooltip(true);
          setLikeIndicator(false);
          setDislikeIndicator(false);
        }
      })
      .catch(console.error);
  };

  const fetchVotingdata = async () => {
    const result = await fetch(
      `https://news-manage.dyp.finance/api/v1/votes/all`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setVotes(data.Data);
      })
      .catch(console.error);

    return result;
  };

  useEffect(() => {
    fetchVotingdata().then();
  }, []);

  return (
    <div className="newmodal">
      <div>
        <div className="details-modal-content">
          <div className="left-col" ref={elementRef}>
            <div className="d-flex justify-content-between">
              <div className="backbtn" onClick={onModalClose}>
                <i className="fas fa-arrow-left" style={{ color: "white" }}></i>
              </div>
              <h2 className="left-col-title" style={{ fontSize: 20 }}>
                {title}
              </h2>
              {/* <div
                className="social-share-parent"
                style={{
                  display: "inline-block",
                  position: "relative",
                }}
              >
                
                <button
                  className="btn v3"
                  style={{
                    background: "linear-gradient(to right, #ee0979, #ff6a00)",
                    padding: '1px 10px',
                    height: 30
                  }}
                >
                  <i className="fas fa-share-alt"></i>
                </button>
                 */}

              {/* </div> */}
            </div>
            <img
              src={image}
              alt=""
              className="left-col-image"
              style={{ padding: "20px 0" }}
            />
            <div className="news-bottom-wrapper mb-3 justify-content-between">
              <div
                className="d-flex w-100 align-items-center"
                style={{ gap: 20 }}
              >
                <div className="like-wrapper">
                  <img
                    src={
                      likeIndicator === false && dislikeIndicator === false
                        ? VotePassive
                        : likeIndicator === true
                        ? Upvote
                        : VotePassive
                    }
                    alt=""
                    className="like-indicator"
                    onClick={(e) => {
                      handleLikeStates();
                      e.stopPropagation();
                    }}
                  />
                  {showTooltip === true ? (
                    <OutsideClickHandler
                      onOutsideClick={() => {
                        setShowTooltip(false);
                      }}
                    >
                      <ToolTip
                        status={
                          logout === "false" && canVote === false
                            ? "You need to be holding DYP to vote"
                            : logout === "true"
                            ? "Please connect your wallet"
                            : alreadyVoted === true && canVote === true
                            ? "You have already voted"
                            : "You have already voted"
                        }
                      />
                    </OutsideClickHandler>
                  ) : (
                    <></>
                  )}
                  <span>
                    {Number(votes.find((obj) => obj.id === newsId)?.up) -
                      Number(votes.find((obj) => obj.id === newsId)?.down)}
                  </span>

                  <img
                    src={
                      likeIndicator === false && dislikeIndicator === false
                        ? VotePassive
                        : dislikeIndicator === true
                        ? Downvote
                        : VotePassive
                    }
                    alt=""
                    className="like-indicator"
                    id="dislike"
                    onClick={() => {
                      handleDisLikeStates();
                    }}
                  />
                </div>

                <div className="date-wrapper">
                  <img src={Clock} alt="" style={{ width: "auto" }} />
                  <h6 className="date-content">
                    {month} {day} {year}
                  </h6>
                </div>
              </div>
              <div className="d-flex">
                <a
                  className="resp-sharing-button__link"
                  href={`https://twitter.com/intent/tweet/?text=${title}&url=${`https://tools.dyp.finance/news/${newsId}`}`}
                  target="_blank"
                  rel="noopener"
                  aria-label=""
                >
                  <div className="resp-sharing-button resp-sharing-button--twitter resp-sharing-button--small">
                    <div
                      aria-hidden="true"
                      className="resp-sharing-button__icon resp-sharing-button__icon--solid"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z" />
                      </svg>
                    </div>
                  </div>
                </a>

                <a
                  className="resp-sharing-button__link"
                  href={`https://reddit.com/submit/?&url=${`https://tools.dyp.finance/news/${newsId}`}&resubmit=true&title=${title}`}
                  target="_blank"
                  rel="noopener"
                  aria-label=""
                >
                  <div className="resp-sharing-button resp-sharing-button--reddit resp-sharing-button--small">
                    <div
                      aria-hidden="true"
                      className="resp-sharing-button__icon resp-sharing-button__icon--solid"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 11.5c0-1.65-1.35-3-3-3-.96 0-1.86.48-2.42 1.24-1.64-1-3.75-1.64-6.07-1.72.08-1.1.4-3.05 1.52-3.7.72-.4 1.73-.24 3 .5C17.2 6.3 18.46 7.5 20 7.5c1.65 0 3-1.35 3-3s-1.35-3-3-3c-1.38 0-2.54.94-2.88 2.22-1.43-.72-2.64-.8-3.6-.25-1.64.94-1.95 3.47-2 4.55-2.33.08-4.45.7-6.1 1.72C4.86 8.98 3.96 8.5 3 8.5c-1.65 0-3 1.35-3 3 0 1.32.84 2.44 2.05 2.84-.03.22-.05.44-.05.66 0 3.86 4.5 7 10 7s10-3.14 10-7c0-.22-.02-.44-.05-.66 1.2-.4 2.05-1.54 2.05-2.84zM2.3 13.37C1.5 13.07 1 12.35 1 11.5c0-1.1.9-2 2-2 .64 0 1.22.32 1.6.82-1.1.85-1.92 1.9-2.3 3.05zm3.7.13c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9.8 4.8c-1.08.63-2.42.96-3.8.96-1.4 0-2.74-.34-3.8-.95-.24-.13-.32-.44-.2-.68.15-.24.46-.32.7-.18 1.83 1.06 4.76 1.06 6.6 0 .23-.13.53-.05.67.2.14.23.06.54-.18.67zm.2-2.8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm5.7-2.13c-.38-1.16-1.2-2.2-2.3-3.05.38-.5.97-.82 1.6-.82 1.1 0 2 .9 2 2 0 .84-.53 1.57-1.3 1.87z" />
                      </svg>
                    </div>
                  </div>
                </a>

                <a
                  className="resp-sharing-button__link"
                  href={`https://telegram.me/share/url?text=${title}&url=${`https://tools.dyp.finance/news/${newsId}`}`}
                  target="_blank"
                  rel="noopener"
                  aria-label=""
                >
                  <div className="resp-sharing-button resp-sharing-button--telegram resp-sharing-button--small">
                    <div
                      aria-hidden="true"
                      className="resp-sharing-button__icon resp-sharing-button__icon--solid"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M.707 8.475C.275 8.64 0 9.508 0 9.508s.284.867.718 1.03l5.09 1.897 1.986 6.38a1.102 1.102 0 0 0 1.75.527l2.96-2.41a.405.405 0 0 1 .494-.013l5.34 3.87a1.1 1.1 0 0 0 1.046.135 1.1 1.1 0 0 0 .682-.803l3.91-18.795A1.102 1.102 0 0 0 22.5.075L.706 8.475z" />
                      </svg>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <p
              // style={{ maxWidth: 520 }}
              className="left-col-content"
              dangerouslySetInnerHTML={{ __html: content }}
            ></p>
            <p>
              Source:{" "}
              <a href={link} target="_blank">
                <u>click here</u>
              </a>
            </p>
          </div>

          <div className="right-col">
            <h3 className="related-news-side-title">Top voted news</h3>
            <div className="related-news-wrapper">
              {latestNewsData.length > 0 &&
                getItemsWithoutCurrentItem(newsId, latestNewsData)
                  .slice(0, parseInt(height / 100))
                  .map((item, key) => {
                    if (item !== undefined) {
                      return (
                        <div
                          key={key}
                          onClick={() => {
                            window.scrollTo(0, 0);
                          }}
                        >
                          <RelatedNews
                            newsId={item.id}
                            theme={theme}
                            title={item.title}
                            date={item.date.slice(0, 10)}
                            month={item.month}
                            year={item.year}
                            link={item.link}
                            // alreadyVoted={alreadyVoted}
                            upvotes={
                              votes.length !== 0
                                ? votes.find((obj) => obj.id === item.id)?.up
                                : item.up
                            }
                            downvotes={
                              votes.length !== 0
                                ? votes.find((obj) => obj.id === item.id)?.down
                                : item.down
                            }
                            image={item.image}
                            onSelectOtherNews={onSelectOtherNews}
                            onHandleDownvote={onHandleDownvote}
                            onHandleUpvote={onHandleUpvote}
                            isConnected={isConnected}
                            isPremium={isPremium}
                            onVotesFetch={fetchVotingdata}
                            coinbase={coinbase}
                          />
                        </div>
                      );
                    }
                  })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
NewsModal.propTypes = {
  modalId: PropTypes.string,
  visible: PropTypes.bool,
  onModalClose: PropTypes.func,
  onSelectOtherNews: PropTypes.func,
};

export default NewsModal;

import React, { useState, useEffect } from "react";
import Web3 from "web3";
import axios from "axios";
import VotePassive from "./assets/votepassive.svg";
import Upvote from "./assets/upvote.svg";
import Downvote from "./assets/downvote.svg";
import ToolTip from "./ToolTip";
import Clock from "./assets/clock.svg";
import OutsideClickHandler from "react-outside-click-handler";

const OtherNews = ({
  image,
  link,
  title,
  date,
  year,
  month,
  theme,
  onOtherNewsClick,
  newsId,
  upvotes,
  downvotes,
  onUpVoteClick,
  onDownVoteClick,
  isConnected,
  onHandlePressDownvote,
  onVotesFetch,
  onHandlePressUpvote,
  isPremium,
  coinbase
}) => {
  const [likeIndicator, setLikeIndicator] = useState(false);
  const [dislikeIndicator, setDislikeIndicator] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [alreadyVoted, setalreadyVoted] = useState(true);
  const [canVote, setCanVote] = useState(false);

  const bal1 = Number(localStorage.getItem("balance1"));
  const bal2 = Number(localStorage.getItem("balance2"));
  const logout = localStorage.getItem("logout");

  useEffect(() => {
    if(bal1 === 0 && bal2 === 0 && isPremium === true) {
      setCanVote(true)
    }

    else if(bal1 !== 0 && bal2 !== 0 && isPremium === true) {
      setCanVote(true)
    }

    else if((bal1 !== 0 || bal2 !== 0) && isPremium === false) {
      setCanVote(true)
    }

    else if((bal1 === 0 && bal2 === 0) && isPremium === false) {
      setCanVote(false)
    }
    else if(logout === 'true') {
      setCanVote(false)
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
      setShowTooltip(true);
      setDislikeIndicator(false);
    } else {
      if (likeIndicator === true) {
        setLikeIndicator(false);
        // onDownVoteClick(newsId);
      } else if (likeIndicator === false) {
        setLikeIndicator(true);
        setDislikeIndicator(false);
        // onUpVoteClick(newsId);
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
        // onUpVoteClick(newsId);
      } else if (dislikeIndicator === false) {
        // onDownVoteClick(newsId);
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
          
          onVotesFetch()
          
        } else {
          setalreadyVoted(false);
          setShowTooltip(true)
          setLikeIndicator(false)
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
          onVotesFetch()
        } else {
          setalreadyVoted(false);
          setShowTooltip(true)
          setLikeIndicator(false)
          setDislikeIndicator(false)

        }
      })
      .catch(console.error);
  };

  return (
    <div
      className="other-news-singlewrapper"
      onClick={() => {
        onOtherNewsClick(newsId);
        setLikeIndicator(false);
        setDislikeIndicator(false);
      }}
    >
      <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <img src={image} alt="" className="other-news-image" />
        <div
          style={{ padding: 12, gap: 10, height: "40%" }}
          className="d-flex flex-column justify-content-between"
        >
          {/* <a href={link} target={"_blank"}> */}
          <h4 className="singlenews-title">{title}</h4>
          {/* </a> */}
          <div
            className="news-bottom-wrapper"
            style={{ justifyContent: "space-between" }}
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
                      : logout === 'true'
                     ? "Please connect your wallet"
                     :   alreadyVoted === true && canVote === true
                     ? "You have already voted"
                     : "You have already voted"
                    }
                  />
                </OutsideClickHandler>
              ) : (
                <></>
              )}
              <span> {Number(upvotes) - Number(downvotes)}</span>
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
                onClick={(e) => {
                  handleDisLikeStates();
                  e.stopPropagation();
                }}
              />
            </div>
            {/* <img
              src={theme === "theme-dark" ? WhiteDots : Dots}
              alt=""
              style={{ width: "auto" }}
            /> */}
            <div className="date-wrapper">
              <img src={Clock} alt="" style={{ width: "auto" }} />
              <h6 className="date-content">
                {date} {month} {year}
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherNews;

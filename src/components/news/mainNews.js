import React, { useState, useEffect } from "react";
import axios from "axios";
import VotePassive from "./assets/votepassive.svg";
import Upvote from "./assets/upvote.svg";
import Downvote from "./assets/downvote.svg";
import Clock from "./assets/clock.svg";
import ToolTip from "./ToolTip";
import OutsideClickHandler from "react-outside-click-handler";

const MainNews = ({
  link,
  image,
  title,
  month,
  day,
  year,
  theme,
  onShowModalClick,
  newsId,
  upvotes,
  downvotes,
  onUpVoteClick,
  isConnected,
  onDownVoteClick,
  isPremium,
  onVotesFetch,
  coinbase
}) => {
  const [likeIndicator, setLikeIndicator] = useState(false);
  const [dislikeIndicator, setDislikeIndicator] = useState(false);
  const [alreadyVoted, setalreadyVoted] = useState(true);
  const [canVote, setCanVote] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

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
      
    }, [alreadyVoted, bal1, bal2, isPremium, logout]);

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

    
  const handleLikeStates = () => {
    if (logout === "false") {
      checkUpVoting(newsId);
    }
    else {setShowTooltip(true);}

    if ((bal1 === 0 && bal2 === 0 && isPremium === false) || logout === 'true') {
      setLikeIndicator(false);
      setDislikeIndicator(false);
      onUpVoteClick();
    } else {
      if (likeIndicator === true) {
        setLikeIndicator(false);
        onDownVoteClick();
      } if (likeIndicator === false) {
        setLikeIndicator(true);
        setDislikeIndicator(false);
        onUpVoteClick();
      }
    }
  };

  const handleDisLikeStates = () => {
     if (logout === "false") {
      checkDownVoting(newsId);
    }
    else {setShowTooltip(true);}
    
    const logout = localStorage.getItem("logout");
    if ((bal1 === 0 && bal2 === 0 && isPremium === false) || logout === 'true') {
      setLikeIndicator(false);
      setDislikeIndicator(false);
      onDownVoteClick();
    } else {
      if (dislikeIndicator === true) {
        setDislikeIndicator(false);
        onUpVoteClick();
      } else if (dislikeIndicator === false) {
        onDownVoteClick();
        setDislikeIndicator(true);
        setLikeIndicator(false);
      }
    }
  };

  return (
    <div className="main-news-image" key={newsId}>
      <div className="banner-item">
        {/* <a target="_blank" href={link}> */}
        <div className="main-image">
          <img
            src={image}
            alt="Image not found"
            className="news-image"
            onClick={(e) => {
              e.preventDefault();
              onShowModalClick();
            }}
          />
          <div className="tag-wrapper">
            <div className="d-flex" style={{ gap: 10 }}>
              <h2
                className="main-title-text"
                onClick={(e) => {
                  e.preventDefault();
                  onShowModalClick();
                }}
              >
                {title}
              </h2>
            </div>
          </div>
        </div>

        {/* </a> */}

        <div className="news-bottom-wrapper mt-3 justify-content-between">
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
              onClick={() => {
                handleLikeStates();
              }}
            />
            <span> {Number(upvotes) - Number(downvotes)}</span>
            {showTooltip === true ? (
              <OutsideClickHandler
                onOutsideClick={() => {
                  setShowTooltip(false);
                }}
              >
                <ToolTip
                  bottom={0}
                  left={"auto"}
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
      </div>
    </div>
  );
};

export default MainNews;

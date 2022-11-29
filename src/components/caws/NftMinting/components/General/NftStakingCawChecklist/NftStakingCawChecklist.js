import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
// import SvgEyeIcon from "../NftCawCard/SvgEyeIcon";
// import EthLogo from "../../../../../assets/General/eth-create-nft.png";
import { formattedNum } from "../../../../../../functions/formatUSD";
import getFormattedNumber from '../../../../../../functions/get-formatted-number'

const NftStakingCawChecklist = ({
  modalId,
  nft,
  isStake,
  checked,
  checklistItemID,
  onChange,
  countDownLeft,
  onNftCheckListClick,
}) => {
  const [checkbtn, setCheckBtn] = useState(false);
  const [Unstakebtn, setUnstakeBtn] = useState(false);
  const [checkPassiveBtn, setcheckPassiveBtn] = useState(false);

  const [isconnectedWallet, setisConnectedWallet] = useState(false);
  const [EthRewards, setEthRewards] = useState(0);

  const [ethToUSD, setethToUSD] = useState(0);
  const [loading, setloading] = useState(false);
  const checkConnection = async () => {
    let test = await window.web3.eth?.getAccounts().then((data) => {
      data.length === 0
        ? setisConnectedWallet(false)
        : setisConnectedWallet(true);
    });
  };

  const convertEthToUsd = async () => {
    const res = axios
      .get("https://api.coinbase.com/v2/prices/ETH-USD/spot")
      .then((data) => {
        return data.data.data.amount;
      });
    return res;
  };

  const calculateReward = async (currentId) => {
    const address = await window.web3.eth?.getAccounts().then((data) => {
      return data[0];
    });

    let calculateRewards;
    let staking_contract = await window.getContract("NFTSTAKING");

    calculateRewards = await staking_contract.methods
      .calculateReward(address, parseInt(currentId))
      .call()
      .then((data) => {
        return data;
      })
      .catch((err) => {
        // window.alertify.error(err?.message);
      });

    let a = await window.web3.utils.fromWei(calculateRewards, "ether");
    const ethprice = await convertEthToUsd();
    setethToUSD(Number(ethprice) * Number(a));
    setEthRewards(Number(a));
  };

  const handleClaim = async (itemId) => {
    let staking_contract = await window.getContract("NFTSTAKING");

    await staking_contract.methods
      .claimRewards([itemId])
      .send()
      .then(() => {
        // setethToUSD(0);
        setEthRewards(0);
      })
      .catch((err) => {
        window.alertify.error(err?.message);
      });
  };

  const handleUnstake = async (itemId) => {
    let stake_contract = await window.getContract("NFTSTAKING");
    setloading(true);

    await stake_contract.methods
      .withdraw([itemId])
      .send()
      .then(() => {
        setcheckPassiveBtn(false);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  };

  useEffect(() => {
    checkConnection().then();
    if (isconnectedWallet) {
      getStakesIds().then();
      calculateReward(checklistItemID).then();

      if (countDownLeft <= 0 && countDownLeft !== undefined) {
        setcheckPassiveBtn(true);
      }
    }
  }, [EthRewards, checklistItemID, isconnectedWallet, countDownLeft]);

  useEffect(() => {
    setCheckBtn(checked);
    setUnstakeBtn(checked);
  }, [checked, isStake]);

  if (!nft) {
    return null;
  }

  const getStakesIds = async () => {
    const address = await window.web3.eth?.getAccounts().then((data) => {
      return data[0];
    });
    let staking_contract = await window.getContract("NFTSTAKING");
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

  const handleCawClick = () => {
    if (isStake === false) {
      setCheckBtn(!checkbtn);
      onChange(checklistItemID);
    } else if (isStake === true) {
      setUnstakeBtn(!Unstakebtn);
      onChange(checklistItemID);
    }
  };
  return (
    <>
      <div
        className="nft-caw-card"
        data-toggle="modal"
        data-target={modalId}
        style={{ width: 195 }}
        onClick={() => {
          handleCawClick(checklistItemID);
        }}
      >
        <div
          className="elevated-stake-container"
          style={{
            background: "transparent",
            display: "flex",
            flexDirection: "column",
            gap: 5,
          }}
        >
          <div
            style={{
              background: "white",
              border: isStake
                ? checked === true
                  ? Unstakebtn === true
                    ? "2px solid #E30613"
                    : "none"
                  : Unstakebtn === true
                  ? "2px solid #E30613"
                  : "none"
                : checked === true && checkbtn === true
                ? "2px solid #E30613"
                : checked === false && checkbtn === true
                ? "2px solid #E30613"
                : "none",
            }}
            className="sub-container"
          >
            <img
              src={nft.image.replace("images", "thumbs")}
              className="nft-img"
              alt=""
              onClick={() => {
                onNftCheckListClick(nft);
              }}
              // style={{ cursor: "pointer" }}
            />
            <p
              style={{
                color: "var(--light-gray-99-nft)",
              }}
            >
              CAWS {checklistItemID}
            </p>
            <div className="footer" style={{ flexDirection: "column" }}>
              <div className="d-flex w-100 justify-content-between align-baseline">
                <p
                  className="nft-id"
                  style={{
                    color: "var(--black-nft)",
                  }}
                >
                  #{String(nft.name).replace("CAWS #", "")}
                </p>
                {isStake ? (
                  <>
                    <input
                      type="checkbox"
                      id={checklistItemID}
                      name="AddtoUnstake"
                      checked={Unstakebtn}
                      onClick={() => {
                        setUnstakeBtn(!Unstakebtn);
                        // onChange(checklistItemID);
                      }}
                      // style={{
                      //   pointerEvents:
                      //     checkPassiveBtn === true ? "auto" : "none",
                      // }}
                    />
                  </>
                ) : (
                  <>
                    <input
                      type="checkbox"
                      id={checklistItemID}
                      name="checkbtn"
                      checked={checkbtn && isStake === false}
                      onChange={(e) => {
                        setCheckBtn(!checkbtn);
                        // onChange(checklistItemID);
                        //console.log(e.target.id);
                      }}
                    />
                  </>
                )}
              </div>
              {/* <div className="img">
              <SvgEyeIcon />
            </div> */}
              {isStake && (
                <>
                  <div
                    className="earn-checklist-container d-block mb-0 p-0 w-100"
                    style={{ boxShadow: "none", borderTop: "none" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <p id="earnedText">Pending</p>
                      <div>
                        <p id="ethPrice">
                          {getFormattedNumber(EthRewards, 2)}ETH
                        </p>
                        <p id="fiatPrice">{formattedNum(ethToUSD, true)}</p>
                      </div>
                      {/* <img
                        src={EthLogo}
                        alt=""
                        style={{ width: 24, height: 24 }}
                      /> */}
                    </div>{" "}
                  </div>
                  <button
                    className="claim-rewards-btn-countdown mb-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClaim(checklistItemID);
                    }}
                    style={{
                      pointerEvents: EthRewards == 0 ? "none" : "auto",
                      borderColor: EthRewards == 0 ? "#C4C4C4" : "#FF0000",
                      color: EthRewards == 0 ? "#fff" : "#FF0000",
                      background: EthRewards == 0 ? "#C4C4C4" : "#fff",
                    }}
                  >
                    Claim reward
                  </button>
                </>
              )}
            </div>
          </div>
          {isStake ? (
            <>
              <button
                className="checkbox-button"
                onClick={() => {
                  handleUnstake(checklistItemID);
                }}
                style={{
                  background:
                    checkPassiveBtn === true
                      ? "linear-gradient(51.32deg, #e30613 -12.3%, #fa4a33 50.14%)"
                      : "#C4C4C4",
                  pointerEvents: checkPassiveBtn === true ? "auto" : "none",
                }}
              >
                {loading ? (
                  <>
                    <div
                      className="spinner-border "
                      role="status"
                      style={{ height: "1.5rem", width: "1.5rem" }}
                    ></div>
                  </>
                ) : (
                  "Unstake"
                )}
              </button>
            </>
          ) : (
            <>
              {/* <button
                className="checkbox-button"
                // onClick={() => {
                //   setCheckBtn(!checkbtn);
                //   onChange(checklistItemID);
                // }}
                style={{
                  background:
                    (!checked && !checkbtn) || (checked && !checkbtn)
                      ? "linear-gradient(51.32deg, #e30613 -12.3%, #fa4a33 50.14%)"
                      : "#C4C4C4",
                }}
              >
                
                {(!checked && !checkbtn) || (checked && !checkbtn && !isStake)
                  ? "Add to Stake"
                  : "Remove Stake"}
              </button> */}
            </>
          )}
        </div>
      </div>
    </>
  );
};
NftStakingCawChecklist.propTypes = {
  modalId: PropTypes.string,
  nft: PropTypes.object,
  isStake: PropTypes.bool,
  checked: PropTypes.bool,
  checklistItemID: PropTypes.number,
  onChange: PropTypes.func,
  onNftCheckListClick: PropTypes.func,
  countDownLeft: PropTypes.any,
};

export default NftStakingCawChecklist;

import React from "react";
import BadgeYellow from "../../assets/badge-yellow.svg";
import BadgeGray from "../../assets/badge-gray.svg";
import Badge from "../../assets/badge.svg";
import Modal from "../general/Modal";
import OutsideClickHandler from "react-outside-click-handler";

const InfoModal = ({ modalId, visible, onModalClose }) => {
  return (
    <Modal visible={visible} modalId={modalId} onModalClose={onModalClose} maxWidth={1000}>
      <OutsideClickHandler
        onOutsideClick={() => {
          onModalClose();
        }}
      >
        <div>
          <div style={{padding: '30px'}}>
            <h2 style={{ maxWidth: 550 }} className="left-col-title">
              DYP Locker
            </h2>
            <p style={{marginBottom: 20}}>
            A liquidity pool is a crowdsourced pool of cryptocurrencies or tokens locked in a smart contract that is used to facilitate trades between the assets on a decentralized exchange (DEX).
            </p>
            <div>
              <div className="row m-0 justify-content-center m-4" style={{gap: 100, alignItems: 'flex-start'}}>
                <img src={Badge} alt="" />
                <div>
                  <h6 className="info-title">Active – Liquidity Locked</h6>
                  <br />
                  <p className="info-text">
                  This badge means that the liquidity pool is locked and safe. Owner of the pool cannot withdraw the liquidity until the locking time ends.
                  </p>
                </div>
              </div>
              <hr/>
              <div className="row m-0 justify-content-center m-4" style={{gap: 100, alignItems: 'flex-start'}}>
                <img src={BadgeYellow} alt="" style={{width: 112, height: '115'}}/>
                <div>
                  <h6 className="info-title">Active – Potential Liquidity Unlock</h6>
                  <br />
                  <p className="info-text">
                  This badge means that the liquidity pool locking time has ended, and the owner have the possibility to withdraw locked liquidity at any moment in time. Note that unlocked liquidity means that you cannot sell the coin or token and will experience Impermanent Loss (IL).
                  </p>
                </div>
              </div>
              <hr/>
              <div className="row m-0 justify-content-center m-4" style={{gap: 100, alignItems: 'flex-start'}}>
                <img src={BadgeGray} alt=""  style={{width: 112, height: '115'}}/>
                <div>
                  <h6 className="info-title">Inactive – Liquidity Unlocked</h6>
                  <br />
                  <p className="info-text">
                  This badge means that locking time ended and liquidity pool has been withdrawn. Note that unlocked liquidity means that you cannot sell the coin or token and will experience Impermanent Loss (IL).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </OutsideClickHandler>
    </Modal>
  );
};

export default InfoModal;

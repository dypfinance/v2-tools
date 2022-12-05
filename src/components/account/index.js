import React from "react";
import Web3 from "web3";
import getFormattedNumber from "../../functions/get-formatted-number";
import { NavLink } from "react-router-dom";
import Error from "../../assets/error.svg";
import Placeholder from "../../assets/person.svg";
import "./account.css";
import NftCawCard from "../caws/NftMinting/components/General/NftCawCard/NftCawCard";
import TierLevels from "../launchpad/tierlevels/TierLevels";
import coinStackIcon from "../launchpad/assets/coinStackIcon.svg";
// import { benefits } from "./benefits";
// import Check from "./check.svg";
// import Cross from "./cross.svg";
// import Free from "./free.svg";
// import Premium from "./premium.svg";
// import FreeWhite from "./free-white.svg";
// import Collapsible from "react-collapsible";

const { BigNumber } = window;

export default class Subscription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coinbase: "",
      selectedSubscriptionToken: Object.keys(
        window.config.subscription_tokens
      )[0],
      tokenBalance: "",
      price: "",
      formattedPrice: 0.000000,
      favorites: [],
      favoritesETH: [],
      selectedFile: null,
      image: Placeholder,
      lockActive: false,
      status: "",
      loadspinner: false,
      loadspinnerSub: false,
      loadspinnerSave: false,
      loadspinnerRemove: false,
      showSavebtn: false,
      showRemovebtn: false,
      subscribe_now: false,
      usdtAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      triggerText: "See more V",
      myNFTs: [],
      myStakess: [],
      viewall: false,
      username: "",
    };
  }


  
  fetchfavData() {
    window
      .getFavoritesETH()
      .then((favorites) => {
        this.setState({ favoritesETH: favorites });
      })
      .catch(console.error);
    if (this.props.networkId === 1) {
      this.setState({
        selectedSubscriptionToken: Object.keys(
          window.config.subscriptioneth_tokens
        )[0],
      });
    }

    window
      .getFavorites()
      .then((favorites) => {
        this.setState({ favorites: favorites });
      })
      .catch(console.error);
    if (this.props.networkId !== 1) {
      this.setState({
        selectedSubscriptionToken: Object.keys(
          window.config.subscription_tokens
        )[0],
      });
    }
  }

  // checkConnection() {
  //   const logout = localStorage.getItem("logout");
  //   if (logout !== "true") {
  //     if (window.ethereum) {
  //       window.ethereum
  //         .request({ method: "eth_accounts" })
  //         .then((data) => {
  //           this.setState({
  //             coinbase: this.props.coinbase,
  //           });
  //           this.fetchAvatar().then();
  //         })
  //         .catch(console.error);
  //     } else {
  //       this.setState({
  //         networkId: "1",
  //       });
  //     }
  //   } else {
  //     this.setState({
  //       coinbase: undefined,
  //     });
  //     this.setState({ image: Placeholder });
  //   }
  // }

  componentDidMount() {
    this.handleSubscriptionTokenChange(this.state.usdtAddress)
    this.fetchAvatar();
    this.fetchfavData();
    this.myNft().then();
    this.myStakes().then();
    window._refreshBalInterval = setInterval(this.myNft, 1000);
    window._refreshBalInterval2 = setInterval(this.myStakes, 1000);

    this.setState({ coinbase: this.props.coinbase });

    this.handleCheckIfAlreadyApproved();
    window.scrollTo(0, 0);
    // this.checkConnection();

    if (window.isConnectedOneTime) {
      this.onComponentMount();
    } else {
      window.addOneTimeWalletConnectionListener(this.onComponentMount);
    }
  }
  componentWillUnmount() {
    clearInterval(window._refreshBalInterval);
    clearInterval(window._refreshBalInterval2);

    window.removeOneTimeWalletConnectionListener(this.onComponentMount);
  }

  onComponentMount = async () => {
    this.handleSubscriptionTokenChange(this.state.selectedSubscriptionToken);
    // this.checkNetworkId();

    // this.fetchAvatar().then();
    // this.checkConnection();
  };

  

  handleSubscriptionTokenChange = async (tokenAddress) => {
    let tokenDecimals =
      this.props.networkId === 1
        ? window.config.subscriptioneth_tokens[tokenAddress]?.decimals
        : window.config.subscription_tokens[tokenAddress]?.decimals;
    this.setState({
      selectedSubscriptionToken: tokenAddress,
      tokenBalance: "",
      formattedPrice: "",
      price: "",
    });
    let price =
      this.props.networkId === 1
        ? await window.getEstimatedTokenSubscriptionAmountETH(tokenAddress)
        : await window.getEstimatedTokenSubscriptionAmount(tokenAddress);
    price = new BigNumber(price).times(1.1).toFixed(0);

    let formattedPrice = getFormattedNumber(
      price / 10 ** tokenDecimals,
      tokenDecimals
    );
    let tokenBalance = await window.getTokenHolderBalance(
      tokenAddress,
      this.props.coinbase
    );
    this.setState({ price, formattedPrice, tokenBalance });
  };

  myNft = async () => {
    if (this.props.coinbase !== null) {
      let myNft = await window.myNftListContract(this.props.coinbase);

      let nfts = myNft.map((nft) => window.getNft(nft));

      nfts = await Promise.all(nfts);

      nfts.reverse();
      this.setState({ myNFTs: nfts });
    }
  };

  getStakesIds = async () => {
    const address = this.props.coinbase;
    if (address !== null) {
      let staking_contract = await window.getContractNFT("NFTSTAKING");
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
    }
  };

  myStakes = async () => {
    let myStakes = await this.getStakesIds();
    let stakes = myStakes.map((stake) => window.getNft(stake));
    stakes = await Promise.all(stakes);
    stakes.reverse();
    this.setState({ myStakess: stakes });
  };

  handleApprove = async (e) => {
    e.preventDefault();

    let tokenContract = await window.getContract({
      address: this.state.selectedSubscriptionToken,
      ABI: window.ERC20_ABI,
    });
    this.setState({ loadspinner: true });

    await tokenContract.methods
      .approve(
        this.props.networkId === 1
          ? window.config.subscriptioneth_address
          : window.config.subscriptioneth_address,
        this.state.price
      )
      .send()
      .then(() => {
        this.setState({ lockActive: true });
        this.setState({ loadspinner: false });
        this.handleSubscribe();
      })
      .catch((e) => {
        this.setState({ status: "An error occurred. Please try again" });
        this.setState({ loadspinner: false });
      });
  };

  handleCheckIfAlreadyApproved = async () => {
    const web3eth = new Web3(
      "https://mainnet.infura.io/v3/94608dc6ddba490697ec4f9b723b586e"
    );

    const ethsubscribeAddress = window.config.subscriptioneth_address;
    const avaxsubscribeAddress = window.config.subscription_address;
    const subscribeToken = this.state.selectedSubscriptionToken;
    const subscribeTokencontract = new web3eth.eth.Contract(
      window.ERC20_ABI,
      subscribeToken
    );

    if (this.props.coinbase) {
      if (this.props.networkId === 1) {
        const result = await subscribeTokencontract.methods
          .allowance(this.props.coinbase, ethsubscribeAddress)
          .call()
          .then();

        if (result != 0) {
          this.setState({ lockActive: true });
          this.setState({ loadspinner: false });
        } else if (result == 0) {
          this.setState({ lockActive: false });
          this.setState({ loadspinner: false });
        }
      } else {
        const result = await subscribeTokencontract.methods
          .allowance(this.props.coinbase, avaxsubscribeAddress)
          .call()
          .then();

        if (result != 0) {
          this.setState({ lockActive: true });
          this.setState({ loadspinner: false });
        } else if (result == 0) {
          this.setState({ lockActive: false });
          this.setState({ loadspinner: false });
        }
      }
    }
  };

  handleSubscribe = async (e) => {
    e.preventDefault();
    console.log("handleSubscribe()");
    let subscriptionContract = await window.getContract({
      key: this.props.networkId === 1 ? "SUBSCRIPTIONETH" : "SUBSCRIPTION",
    });

    this.setState({ loadspinnerSub: true });

    await subscriptionContract.methods
      .subscribe(this.state.selectedSubscriptionToken, this.state.price)
      .send({ from: await window.getCoinbase() })
      .then(() => {
        this.setState({ loadspinnerSub: false });
      })
      .catch((e) => {
        this.setState({ status: "An error occurred. Please try again" });
        this.setState({ loadspinnerSub: false });
      });
  };

  handleUnsubscribe = async (e) => {
    e.preventDefault();
    let subscriptionContract = await window.getContract({
      key: this.props.networkId === 1 ? "SUBSCRIPTIONETH" : "SUBSCRIPTION",
    });
    await subscriptionContract.methods
      .unsubscribe()
      .send({ from: await window.getCoinbase() })
      .then(() => {
        // this.setState({ loadspinner: false });
      })
      .catch((e) => {
        this.setState({ status: "An error occurred. Please try again" });
        // this.setState({ loadspinner: false });
      });
  };

  onImageChange = (event) => {
    const fileTypes = [
      "image/apng",
      "image/bmp",
      "image/gif",
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/svg+xml",
      "image/tiff",
      "image/webp",
      "image/x-icon",
    ];

    this.setState({ showSavebtn: true, showRemovebtn: true });

    if (fileTypes.includes(event.target.files[0].type)) {
      if (event.target.files && event.target.files[0]) {
        this.setState({ selectedFile: event.target.files[0] });
        let reader = new FileReader();
        reader.onload = (e) => {
          this.setState({ image: e.target.result });
          this.handleSubmission();
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    } else {
      window.alertify.error("Image type not supported");
    }
  };

  handleSubmission = async () => {
    const formData = new FormData();
    formData.append("image", this.state.selectedFile);
    let coinbase = this.props.coinbase;
    this.setState({ loadspinnerSave: true });
    if (!coinbase) {
      await window.connectWallet();
    }
    let signature;

    try {
      signature = await window.sign(
        window.config.metamask_message2,
        await window.getCoinbase()
      );
    } catch (e) {
      console.error(e);
      console.log(e);
      this.setState({ loadspinnerSave: false });

      return;
    }

    if (!signature) {
      window.alertify("No Signature provided");
      this.setState({ loadspinnerSave: false });

      return;
    }

    formData.append("signature", signature);

    await fetch("https://api-image.dyp.finance/api/v1/upload/avatar", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    window.alertify.message("Avatar has been uploaded successfully!");
    this.setState({ loadspinnerSave: false, showSavebtn: false });
    // this.fetchAvatar().then();
  };

  fetchAvatar = async () => {
    const response = await fetch(
      `https://api-image.dyp.finance/api/v1/avatar/${this.props.coinbase}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({ image: data.status === 0 ? Placeholder : data.avatar });
      })
      .catch(console.error);

    return response;
  };

  deleteAvatar = async () => {
    const response = await fetch(
      `https://api-image.dyp.finance/api/v1/avatar/${this.props.coinbase}/delete`
    )
      .then((res) => {
        return res.json();
      })
      .then(() => {
        this.setState({ image: Placeholder });
      })
      .catch(console.error);

    return response;
  };

  GetSubscriptionForm = () => {
    let tokenDecimals =
      this.props.networkId === 1
        ? window.config.subscriptioneth_tokens[
            this.state.selectedSubscriptionToken
          ]?.decimals
        : window.config.subscription_tokens[
            this.state.selectedSubscriptionToken
          ]?.decimals;
    // this.handleCheckIfAlreadyApproved()
let mycaws = [...this.state.myNFTs, ...this.state.myStakess]

const focusInput = (input) => {
  document.getElementById(input).focus()
} 

const clearField = () => {
  this.setState({username: ""})
}

const freePlanItems = [
  'Real time DYP Tools',
  'Pair Explorer',
  'Big Swap Explorer',
  'Top Tokens',
  'Yields',
  'News Section',
  'DYP Locker',
  'Community Trust Vote',
  'dApps access',
]

const paidPlanItems = [
  'All free features included',
  'Manual research info for projects',
  'Full access to Community Trust Vote',
  'Perform any votes on the News section',
  'Early access to new features released in the future',
  'Guaranteed allocation to presales of new projects launched using our Launchpad',
]

// console.log(mycaws)
    return (
      <div>
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex flex-column gap-2">
            <div className="d-flex align-items-center gap-3">
              <h6 className="account-username">Username: Dypian</h6>
              <div
                    className="input-container px-0"
                    style={{ width: "100%" }}
                  >
              <input
                      type="text"
                      min={1}
                      max={365}
                      id="username"
                      name="username"
                      placeholder=" "
                      className="text-input"
                      style={{ width: "100%" }}
                      value={this.state.username}
                      onChange={(e) => this.setState({username : e.target.value})}
                    />
                    <label
                      htmlFor="username"
                      className="label"
                      onClick={() => focusInput("username")}
                    >
                      Input new name
                    </label>
                    <img src={require(`./assets/clearFieldIcon.svg`).default} className="clear-icon" alt="clear field" onClick={clearField} />
                    </div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <img src={require(`./assets/metamask.png`).default} alt="" />
              <div className="d-flex flex-column gap-1">
                <span className="address-span">Wallet address:</span>
                <div className="d-flex align-items-center gap-2">
                <span className="account-wallet-address">{this.props.coinbase}</span>
                <img src={require('./assets/clipboardIcon.svg').default} className="cursor-pointer" alt="clipboard" onClick={() => navigator.clipboard.writeText(this.props.coinbase)} />
                </div>
              </div>
            </div>
            </div>  
            <div className={this.props.coinbase ? "mb-3" : "d-none"}>

            <div className="d-flex align-items-center gap-2">
              <div className="d-flex flex-column">
              <span className="dyp-amount-placeholder">Balance:</span>
              <h6 className="account-dyp-amount">0.00000 DYP</h6>
              </div>
            <div className="position-relative">
              <div className="avatar-border"></div>
              <img src={require('./assets/changeImage.svg').default} alt="" className="add-image" />
              <img
                src={this.state.image}
                alt="your image"
                className="avatarimg"
                
              />
              <input
                type="file"
                id="group_image"
                onChange={this.onImageChange}
              />
              {/* {this.state.showSavebtn === true ? (
                <div
                  className="savebtn"
                  type=""
                  onClick={this.handleSubmission}
                >
                  {this.state.loadspinnerSave === true ? (
                    <div
                      className="spinner-border "
                      role="status"
                      style={{ height: "1.5rem", width: "1.5rem" }}
                    ></div>
                  ) : (
                    "Save"
                  )}
                </div>
              ) : (
                <></>
              )}
              {this.state.showRemovebtn === true ||
              this.state.image !== Placeholder ? (
                <div className="removebtn" type="" onClick={this.deleteAvatar}>
                  {this.state.loadspinnerRemove === true ? (
                    <div
                      className="spinner-border "
                      role="status"
                      style={{ height: "1.5rem", width: "1.5rem" }}
                    ></div>
                  ) : (
                    "Remove"
                  )}
                </div>
              ) : (
                <></>
              )} */}
            </div>
            </div>
          </div>                       
        </div>
        <div className="row mt-5">
          <div className="col-6 position-relative d-flex justify-content-center">
              <div className="purplediv" style={{top: '15px', zIndex: 1, left: '12px', background: '#8E97CD' }}></div>
            <div className="row free-plan-container p-3 position-relative w-100">
              <div className="col-6">
                <div className="d-flex align-items-center gap-2">
                  <img src={require('./assets/freePlanIcon.svg').default} alt="" />
                  <h6 className="free-plan-title">Free plan</h6>
                </div>
                <div className="d-flex flex-column gap-1 mt-3">
                {freePlanItems.map((item, index) => (
                  <div key={index} className="free-plan-item d-flex align-items-center justify-content-between p-2">
                    <span className="free-plain-item-text">{item}</span>
                    <img src={require('./assets/freeCheck.svg').default} alt="" />
                  </div>
                ))}
              </div>
              </div>
              <div className="col-6 free-plan-image">
              </div>
            <div className="col-12">
            <hr className="form-divider my-4" style={{height: '2px'}} />
            <div className="d-flex flex-column">
              <span className="inactive-plan">Active</span>
              <span className="inactive-plan">Free plan bundle</span>
            </div>
            </div>
            </div>
           
          </div>
          <div className="col-6 position-relative d-flex justify-content-center">
              <div className="purplediv" style={{top: '15px', zIndex: 1, left: '12px', background: '#8E97CD' }}></div>
            <div className="row free-plan-container p-3 position-relative w-100">
              <div className="col-6">
                <div className="d-flex align-items-center gap-2">
                  <img src={require('./assets/paidPlanIcon.svg').default} alt="" />
                  <h6 className="free-plan-title">Dypian plan</h6>
                </div>
                <div className="d-flex flex-column gap-1 mt-3">
                {paidPlanItems.map((item, index) => (
                  <div key={index} className="free-plan-item d-flex align-items-center justify-content-between p-2">
                    <span className="free-plain-item-text">{item}</span>
                    <img src={require('./assets/freeCheck.svg').default} alt="" />
                  </div>
                ))}
              </div>
              </div>
              
              <div className="col-6 paid-plan-image">
              </div>
              <div className="col-12">
              {!this.props.appState.isPremium ? (
              <>
                <div className="premiumbanner">
                  <div className="d-flex align-items-center justify-content-between">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 5,
                      }}
                    >
                      <h3 className="subscr-title">Lifetime subscription </h3>
                      <p className="subscr-subtitle">
                        The subscription tokens will be used to buy and lock DYP
                      </p>
                      {/* <p className="subscr-note">
                        *When you unsubscribe the DYP will be unlocked and sent to
                        your wallet
                      </p> */}
                    </div>
                    <div>
                      <div className="d-flex gap-2">
                        <img src="/assets/img/usdt.svg"></img>
                        <h3 className="subscr-price">75 USDT</h3>
                      </div>
                      <p className="subscr-note">*Exclusive offer</p>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div
                    style={{
                      color: "#F7F7FC",
                      fontSize: "14px",
                      fontWeight: "500",
                      lineHeight: "20px",
                    }}
                  >
                    Subscribe <br></br> to the Premium plan
                  </div>
                  <div
                    className="btn filledbtn px-5"
                    type=""
                    onClick={() => {
                      this.setState({ subscribe_now: !this.state.subscribe_now });
                      this.handleSubscriptionTokenChange(
                        this.state.usdtAddress
                      );
                      this.handleCheckIfAlreadyApproved();
                    }}
                  >
                    Subscribe now
                  </div>
                </div>
              </>
            ) : (
              <>
                 <div className="premiumbanner">
                  <div className="d-flex align-items-center justify-content-between">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 5,
                      }}
                    >
                      <h3 className="subscr-title">Welcome premium user</h3>
                      <p className="subscr-subtitle">
                      *When you unsubscribe the DYP will be unlocked and sent to your wallet
                      </p>
                      {/* <p className="subscr-note">
                        *When you unsubscribe the DYP will be unlocked and sent to
                        your wallet
                      </p> */}
                    </div>
                    {/* <div>
                      <div className="d-flex gap-2">
                        <img src="/assets/img/usdt.svg"></img>
                        <h3 className="subscr-price">75 USDT</h3>
                      </div>
                      <p className="subscr-note">*Exclusive offer</p>
                    </div> */}
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div
                    style={{
                      color: "#4FAD93",
                      fontSize: "14px",
                      fontWeight: "500",
                      lineHeight: "20px",
                    }}
                  >
                    Active <br></br> Premium plan
                  </div>
                  <div
                    className="btn outline-btn px-5"
                    type=""
                    onClick={this.handleUnsubscribe}
                  >
                    Unsubscribe
                  </div>
                </div>
              </>
            )}
              </div>
            </div>
          </div>
        </div>
        {this.state.subscribe_now === true ? 
        <div className="row mt-4 justify-content-end">
        <div className="col-6">
          <div className="subscribe-container p-3 position-relative">
          <div className="purplediv" style={{ background: '#8E97CD' }}></div>
           <div className="d-flex justify-content-between align-items-center">
           <div className="d-flex align-items-center gap-2">
              <img src={coinStackIcon} alt="coin stack" />
              <h6 className="free-plan-title">DYP Tools Premium Subscription</h6>
            </div>
            <img src={require(`./assets/clearFieldIcon.svg`).default} height={28} width={28} className="cursor-pointer" onClick={() => this.setState({subscribe_now: false})}  alt="close subscription"/>
           </div>
           <div className="d-flex mt-4 align-items-end justify-content-between w-100">
            <div className="d-flex flex-column gap-3 " style={{width: '40%'}}>
            <span className="token-amount-placeholder">Token Amount</span>
            <div
                className="input-container px-0"
                style={{ width: "100%" }}
              >
          <input
                  type="number"
                  disabled
                  min={1}
                  max={365}
                  id="token_amount"
                  name="token_amount"
                  placeholder=" "
                  className="text-input"
                  value={this.state.formattedPrice}
                  style={{ width: "100%" }}
                />
                <label
                  htmlFor="token_amount"
                  className="label"
                  onClick={() => focusInput("token_amount")}
                >
                  Subscription Token Amount
                </label>
                </div>
            </div>
            <div className="d-flex flex-column align-items-end justify-content-end">
              <span className="token-balance-placeholder">USDT Balance</span>
              <h6 className="account-token-amount"> {getFormattedNumber(
                            this.state.tokenBalance / 10 ** tokenDecimals,
                            6
                          )}</h6>
            </div>
           </div>
           <hr className="form-divider my-4" />
           <div className="d-flex justify-content-between align-items-center">
            <div className="subscription-token-wrapper  p-2 d-flex align-items-center justify-content-between " style={{width: '40%'}}>
                <span className="token-amount-placeholder">Subscription token:</span>
                <div className="d-flex align-items-center gap-2">
                <img src="/assets/img/usdt.svg" height={24} width={24} alt="usdt"/>
                <span className="usdt-text">USDT</span>
                </div>
            </div>
            <button className="btn success-button px-4" onClick={(e) => this.handleApprove(e)}>Subscribe</button>
           </div>
          </div>
        </div>
    </div>
    :
    <></>
        }
        {/* <form onSubmit={this.handleSubscribe}>     
          <div>
            {!this.props.appState.isPremium ? (
              <table className="w-100">
                <tr
                  className="tablerow"
                  style={{ position: "relative", top: "-10px" }}
                >
                  <th className="tableheader"></th>
                  <th className="tableheader freetext">
                    <img
                      src={this.props.theme === "theme-dark" ? FreeWhite : Free}
                      alt=""
                    />{" "}
                    Free
                  </th>
                  <th className="tableheader premiumtext">
                    <img src={Premium} alt="" /> Premium
                  </th>
                </tr>
                {benefits.length > 0 &&
                  benefits.map((item, key) => {
                    return (
                      <>
                        <tr key={key} className="tablerow">
                          <td className="tabledata">{item.title}</td>
                          <td className="tabledata">
                            <img
                              src={item.free === "yes" ? Check : Cross}
                              alt=""
                              className="itemdataimg"
                            />{" "}
                          </td>
                          <td className="tabledata">
                            <img
                              src={item.premium === "yes" ? Check : Cross}
                              alt=""
                            />
                          </td>
                        </tr>
                      </>
                    );
                  })}
              </table>
            ) : (
              <>
                <table className="w-100">
                  <tr
                    className="tablerow"
                    style={{ position: "relative", top: "-10px" }}
                  >
                    <th className="tableheader"></th>
                    <th className="tableheader freetext">
                      <img
                        src={
                          this.props.theme === "theme-dark" ? FreeWhite : Free
                        }
                        alt=""
                      />{" "}
                      Free
                    </th>
                    <th className="tableheader premiumtext">
                      <img src={Premium} alt="" /> Premium
                    </th>
                  </tr>
                  {benefits.length > 0 &&
                    benefits.slice(0, 1).map((item, key) => {
                      return (
                        <>
                          <tr key={key} className="tablerow">
                            <td className="tabledata" style={{ width: "79%" }}>
                              {item.title}
                            </td>
                            <td className="tabledata">
                              <img
                                src={item.free === "yes" ? Check : Cross}
                                alt=""
                              />{" "}
                            </td>
                            <td className="tabledata">
                              <img
                                src={item.premium === "yes" ? Check : Cross}
                                alt=""
                              />
                            </td>
                          </tr>
                        </>
                      );
                    })}
                </table>

                <Collapsible
                  trigger={this.state.triggerText}
                  onClose={() => {
                    this.setState({ triggerText: "See more V" });
                  }}
                  onOpen={() => {
                    this.setState({ triggerText: "See less Ʌ" });
                  }}
                >
                  <table className="w-100">
                    {benefits.length > 0 &&
                      benefits.slice(1, benefits.length).map((item, key) => {
                        return (
                          <>
                            <tr key={key} className="tablerow">
                              <td
                                className="tabledata"
                                style={{ width: "77%" }}
                              >
                                {item.title}
                              </td>
                              <td className="tabledata">
                                <img
                                  src={item.free === "yes" ? Check : Cross}
                                  alt=""
                                />
                              </td>
                              <td className="tabledata">
                                <img
                                  src={item.premium === "yes" ? Check : Cross}
                                  alt=""
                                />
                              </td>
                            </tr>
                          </>
                        );
                      })}
                  </table>
                </Collapsible>
              </>
            )}

           
          </div>
          {!this.props.appState.isPremium ? (   
            this.state.subscribe_now === true ? (
              <>
                <div className="mt-4 ml-0">
                  <div className="row m-0" style={{ gap: 100 }}>
                    <div
                      className="form-group"
                      style={{ maxWidth: 490, width: "100%" }}
                    >
                      <p>Select Subscription Token</p>
                      <div className="row m-0" style={{ gap: 10 }}>
                        {Object.keys(
                          this.props.networkId === 1
                            ? window.config.subscriptioneth_tokens
                            : window.config.subscription_tokens
                        ).map((t, i) => (
                          <span className="radio-wrapper" key={t}>
                            <input
                              type="radio"
                              value={t}
                              name={"tokensymbol"}
                              checked={
                                t == this.state.selectedSubscriptionToken
                              }
                              disabled={!this.props.appState.isConnected}
                              onChange={
                                (e) => {
                                  this.handleSubscriptionTokenChange(
                                    e.target.value
                                  );
                                  this.handleCheckIfAlreadyApproved();
                                console.log(e.target.value);

                                }

                              }
                            />
                            {this.props.networkId === 1
                              ? window.config.subscriptioneth_tokens[t]?.symbol
                              : window.config.subscription_tokens[t]?.symbol}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="form-group">
                      <div>
                        <p>Token Amount</p>
                        <span className="subscription-subtitle">
                          Subcription token amount
                        </span>
                        <div
                          className="align-items-center row m-0"
                          style={{ gap: 40 }}
                        >
                          <input
                            style={{ width: "266px", height: 42 }}
                            disabled
                            onChange={(e) => {
                              let amount = new window.BigNumber(e.target.value);
                              amount = amount.times(1e18).toFixed(0);
                              this.setState({ amount });
                            }}
                            value={this.state.formattedPrice}
                            type="number"
                            placeholder="Subscription Token Amount"
                            className="form-control"
                          />
                          <div className="d-flex flex-column">
                            <span className="balance-placeholder">
                              Balance:
                            </span>
                            <span className="balance-text">
                              {getFormattedNumber(
                                this.state.tokenBalance / 10 ** tokenDecimals,
                                6
                              )}
                            </span>
                          </div>
                        </div>
                        <br />
                      </div>
                    </div>
                  </div>
                  <div className="row m-0" style={{ gap: 30 }}>
                    <button
                      disabled={!this.props.appState.isConnected}
                      onClick={this.handleApprove}
                      className="btn v1"
                      style={{
                        background:
                          this.state.lockActive === false
                            ? "linear-gradient(51.32deg, #E30613 -12.3%, #FA4A33 50.14%)"
                            : "#C4C4C4",
                        width: 230,
                        pointerEvents:
                          this.state.lockActive === false ? "auto" : "none",
                      }}
                      type="button"
                    >
                      {this.state.loadspinner === true ? (
                        <>
                          <div
                            className="spinner-border "
                            role="status"
                            style={{ height: "1.5rem", width: "1.5rem" }}
                          ></div>
                        </>
                      ) : (
                        "APPROVE"
                      )}
                    </button>
                    <button
                      disabled={!this.props.appState.isConnected}
                      className="btn v1 ml-0"
                      type="submit"
                      style={{
                        background:
                          this.state.lockActive === false
                            ? "#C4C4C4"
                            : "linear-gradient(51.32deg, #E30613 -12.3%, #FA4A33 50.14%)",
                        width: 230,
                        pointerEvents:
                          this.state.lockActive === false ? "none" : "auto",
                      }}
                    >
                      {this.state.loadspinnerSub === true ? (
                        <>
                          <div
                            className="spinner-border "
                            role="status"
                            style={{ height: "1.5rem", width: "1.5rem" }}
                          ></div>
                        </>
                      ) : (
                        "SUBSCRIBE"
                      )}
                    </button>
                  </div>
                  {this.state.status !== "" && (
                    <div className="status-wrapper">
                      <p style={{ color: "#E30613" }}>
                        <img src={Error} alt="" /> {this.state.status}
                      </p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <></>
            )
          ) : (
            <>
              <div>
              <p>
                <i className="fas fa-check-circle"></i> Premium Member 
              </p>
              <p>
                DYP Locked in Subscription:{" "}
                {getFormattedNumber(
                  this.props.appState.subscribedPlatformTokenAmount / 1e18,
                  6
                )}{" "}
                DYP
              </p>
              
            </div>
              <div className="premiumbanner2">
                <div className="row m-0 justify-content-between">
                  <div
                    style={{
                      maxWidth: 335,
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                    }}
                  >
                    <h3 className="subscr-title">Welcome Premium User</h3>
                    <p className="subscr-subtitle">
                      When you unsubscribe the DYP will be unlocked and sent to
                      your wallet
                    </p>
                  </div>
                  <div>
                    <button
                      disabled={!this.props.appState.isConnected}
                      onClick={this.handleUnsubscribe}
                      className="savebtn w-auto mt-2 v1"
                      type="button"
                      style={{ padding: "10px 20px" }}
                    >
                      Unsubscribe
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </form> */}

        {/* <h4 className="d-block mb-5 mt-5" id="my-fav">
          My Earnings
        </h4>
        <div
          className="row p-0 m-0"
          style={{
            gap: 10,
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
          }}
        ></div> */}

        <div className="mycawsCollection position-relative mb-5">
          <div className="d-flex gap-2 justify-content-between align-items-center">
            <div className="col-2">
              <h6 className="mycawscollection-title">My Caws Collection</h6>
            </div>
            <div className="cawscontaier">
              {mycaws.length > 0 &&
                this.props.coinbase !== null &&
                mycaws.slice(0, this.state.viewall === false ? 4 : mycaws.length).map((item, id) => {
                  return (
                    <NftCawCard
                      key={id}
                      nft={item}
                      action={() => {}}
                      modalId="#newNftStake"
                      coinbase={this.props.coinbase}
                    />
                  );
                })}
             
            </div>
            <button className="outline-btn" style={{ height: "fit-content", display: this.state.viewall === false && mycaws.length>4 ? 'block' : 'none' }} onClick={()=>{this.setState({viewall: true})}}>
              View all
            </button>
          </div>
        </div>

<TierLevels display={'none'} infoDisplay={'flex'}/>
        <h4 className="d-block mb-5 mt-5" id="my-fav">
          My favourites
        </h4>
        <div
          className="row p-0 m-0"
          style={{
            gap: 10,
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
          }}
        >
          {this.state.favorites.map((lock, index) => {
            return (
              <NavLink
                key={index}
                className="p-0"
                to={`/pair-explorer/${lock.id}`}
              >
                <div style={{ position: "relative", width: "300px" }}>
                  <div
                    className="d-flex avax"
                    style={{
                      border: "2px solid #565891",
                      borderRadius: "12px",
                    }}
                  >

<div
                      className="d-flex justify-content-center align-items-center"
                      style={{
                        position: "absolute",
                        top: "-17px",
                        left: "50%",
                        width: "106px",
                        height: "34px",
                        transform: "translateX(-50%)",
                        borderRadius: "50px",
                        background:
                          "linear-gradient(93.99deg, #4ED5CD 0%, #524FD8 100%)",
                        gap: "5px",
                      }}
                    >
                      <img src={require("../../assets/wavax.svg").default} alt='' style={{height: 20, width: 20}}></img>
                      <div style={{ color: "#F7F7FC" }}>Avalanche</div>
                    </div>

                    <div className="pair-locks-wrapper">
                      <div className="row-wrapper">
                        <span className="left-info-text">ID</span>
                        <span className="right-info-text">{index + 1}</span>
                      </div>
                      <div className="row-wrapper">
                        <span className="left-info-text">Pair Address</span>
                        <span className="right-info-text">
                          ...{lock.id.slice(35)}
                        </span>
                      </div>
                      <div className="row-wrapper">
                        <span className="left-info-text">Tokens</span>
                        <span className="right-info-text">
                          {lock.token0.symbol}/{lock.token1.symbol}
                        </span>
                      </div>
                      <div className="row-wrapper">
                        <span className="left-info-text">Total liquidity</span>
                        <span className="right-info-text">
                          {getFormattedNumber(lock.reserveUSD, 2)}
                        </span>
                      </div>
                      <div className="row-wrapper">
                        <span className="left-info-text">
                          Pooled {lock.token0.symbol}
                        </span>
                        <span className="right-info-text">
                          {getFormattedNumber(lock.reserve0, 2)}
                        </span>
                      </div>
                      <div className="row-wrapper">
                        <span className="left-info-text">
                          Pooled {lock.token1.symbol}
                        </span>
                        <span className="right-info-text">
                          {getFormattedNumber(lock.reserve1, 2)}
                        </span>
                      </div>
                      <div className="row-wrapper">
                        <span className="left-info-text">LP Holders</span>
                        <span className="right-info-text">
                          {lock.liquidityProviderCount}
                        </span>
                      </div>
                      <div className="row-wrapper">
                        <span className="left-info-text">
                          Pair transactions:
                        </span>
                        <span className="right-info-text">{lock.txCount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </NavLink>
            );
          })}
          {this.state.favoritesETH.map((lock, index) => {
            return (
              <NavLink
                key={index}
                className="p-0"
                to={`/pair-explorer/${lock.id}`}
                onClick={() => {
                  this.props.handleSwitchNetwork(1);
                }}
              >
                <div style={{ position: "relative", width: "300px" }}>
                  <div
                    className="d-flex"
                    style={{
                      border: "2px solid #565891",
                      borderRadius: "12px",
                    }}
                  >
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{
                        position: "absolute",
                        top: "-17px",
                        left: "50%",
                        width: "106px",
                        height: "34px",
                        transform: "translateX(-50%)",
                        borderRadius: "50px",
                        background:
                          "linear-gradient(93.99deg, #4ED5CD 0%, #524FD8 100%)",
                        gap: "5px",
                      }}
                    >
                      <img src="/assets/img/ethereum.svg"></img>
                      <div style={{ color: "#F7F7FC" }}>Ethereum</div>
                    </div>
                    <div className="pair-locks-wrapper">
                      <div className="row-wrapper">
                        <span className="left-info-text">ID</span>
                        <span className="right-info-text">{index + 1}</span>
                      </div>
                      <div className="row-wrapper">
                        <span className="left-info-text">Pair Address</span>
                        <span className="right-info-text">
                          ...{lock.id.slice(35)}
                        </span>
                      </div>
                      <div className="row-wrapper">
                        <span className="left-info-text">Tokens</span>
                        <span className="right-info-text">
                          {lock.token0.symbol}/{lock.token1.symbol}
                        </span>
                      </div>
                      <div className="row-wrapper">
                        <span className="left-info-text">Total liquidity</span>
                        <span className="right-info-text">
                          {getFormattedNumber(lock.reserveUSD, 2)}
                        </span>
                      </div>
                      <div className="row-wrapper">
                        <span className="left-info-text">
                          Pooled {lock.token0.symbol}
                        </span>
                        <span className="right-info-text">
                          {getFormattedNumber(lock.reserve0, 2)}
                        </span>
                      </div>
                      <div className="row-wrapper">
                        <span className="left-info-text">
                          Pooled {lock.token1.symbol}
                        </span>
                        <span className="right-info-text">
                          {getFormattedNumber(lock.reserve1, 2)}
                        </span>
                      </div>
                      <div className="row-wrapper">
                        <span className="left-info-text">LP Holders</span>
                        <span className="right-info-text">
                          {lock.liquidityProviderCount}
                        </span>
                      </div>
                      <div className="row-wrapper">
                        <span className="left-info-text">
                          Pair transactions:
                        </span>
                        <span className="right-info-text">{lock.txCount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </NavLink>
            );
          })}
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="locker container-lg">
        <div>
          <div className="mb-4">{this.GetSubscriptionForm()}</div>
        </div>
      </div>
    );
  }
}

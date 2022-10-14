import React from "react";
import Web3 from "web3";
import getFormattedNumber from "../../functions/get-formatted-number";
import { NavLink } from "react-router-dom";
import Error from "../../assets/error.svg";
import Placeholder from "../../assets/person.svg";
import { benefits } from "./benefits";
import Check from "./check.svg";
import Cross from "./cross.svg";
import Free from "./free.svg";
import Premium from "./premium.svg";
import FreeWhite from "./free-white.svg";
import Collapsible from "react-collapsible";

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
      formattedPrice: "",
      favorites: [],
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
      triggerText: "See more V",
      networkId: "1",
    };
  }

  checkNetworkId() {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "net_version" })
        .then((data) => {
          this.setState({
            networkId: data,
          });

          this.fetchfavData();
        })
        .catch(console.error);
    } else {
      this.fetchfavData();
      this.setState({
        networkId: "1",
      });
    }
  }

  fetchfavData() {
    if (this.state.networkId === "1") {
      window
        .getFavoritesETH()
        .then((favorites) => this.setState({ favorites }))
        .catch(console.error);

      this.setState({
        selectedSubscriptionToken: Object.keys(
          window.config.subscriptioneth_tokens
        )[0],
      });
    }

    if (this.state.networkId === "43114") {
      window
        .getFavorites()
        .then((favorites) => this.setState({ favorites }))
        .catch(console.error);

      this.setState({
        selectedSubscriptionToken: Object.keys(
          window.config.subscription_tokens
        )[0],
      });
    }
  }

  checkConnection() {
    const logout = localStorage.getItem("logout");
    if (logout !== "true") {
      if (window.ethereum) {
        window.ethereum
          .request({ method: "eth_accounts" })
          .then((data) => {
            this.setState({
              coinbase: data.length === 0 ? undefined : data[0],
            });
            this.fetchAvatar().then();
          })
          .catch(console.error);
      } else {
        this.setState({
          networkId: "1",
        });
      }
    } else {
      this.setState({
        coinbase: undefined,
      });
      this.setState({ image: Placeholder });
    }
  }

  componentDidMount() {

    this.handleCheckIfAlreadyApproved();
    window.scrollTo(0, 0);
    this.checkConnection();
    this.checkNetworkId();
    if (window.isConnectedOneTime) {
      this.onComponentMount();
    } else {
      window.addOneTimeWalletConnectionListener(this.onComponentMount);
    }
  }
  componentWillUnmount() {
    window.removeOneTimeWalletConnectionListener(this.onComponentMount);
  }

  onComponentMount = async () => {
    this.setState({ coinbase: await window.getCoinbase() });
    this.handleSubscriptionTokenChange(this.state.selectedSubscriptionToken);
    this.checkNetworkId();

    // this.fetchAvatar().then();
    this.checkConnection();
  };

  handleSubscriptionTokenChange = async (tokenAddress) => {
    let tokenDecimals =
      this.state.networkId === "1"
        ? window.config.subscriptioneth_tokens[tokenAddress]?.decimals
        : window.config.subscription_tokens[tokenAddress]?.decimals;
    this.setState({
      selectedSubscriptionToken: tokenAddress,
      tokenBalance: "",
      formattedPrice: "",
      price: "",
    });
    let price =
      this.state.networkId === "1"
        ? await window.getEstimatedTokenSubscriptionAmountETH(tokenAddress)
        : await window.getEstimatedTokenSubscriptionAmount(tokenAddress);
    price = new BigNumber(price).times(1.1).toFixed(0);

    let formattedPrice = getFormattedNumber(
      price / 10 ** tokenDecimals,
      tokenDecimals
    );
    let tokenBalance = await window.getTokenHolderBalance(
      tokenAddress,
      this.state.coinbase
    );
    this.setState({ price, formattedPrice, tokenBalance });
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
        this.state.networkId === "1"
          ? window.config.subscriptioneth_address
          : window.config.subscriptioneth_address,
        this.state.price
      )
      .send()
      .then(() => {
        this.setState({ lockActive: true });
        this.setState({ loadspinner: false });
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

    if (this.state.coinbase) {
      if (this.state.networkId === "1") {
        const result = await subscribeTokencontract.methods
          .allowance(this.state.coinbase, ethsubscribeAddress)
          .call()
          .then();
      
          if(result != 0) {
            this.setState({ lockActive: true });
            this.setState({ loadspinner: false });
          }

          else if(result == 0) {
            this.setState({ lockActive: false });
            this.setState({ loadspinner: false });
          }
          
      } else {
        const result = await subscribeTokencontract.methods
          .allowance(this.state.coinbase, avaxsubscribeAddress)
          .call()
          .then();

          if(result != 0) {
            this.setState({ lockActive: true });
            this.setState({ loadspinner: false });
          }

          else if(result == 0) {
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
      key: this.state.networkId === "1" ? "SUBSCRIPTIONETH" : "SUBSCRIPTION",
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
      key: this.state.networkId === "1" ? "SUBSCRIPTIONETH" : "SUBSCRIPTION",
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
    let coinbase = await window.getCoinbase();
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
      `https://api-image.dyp.finance/api/v1/avatar/${this.state.coinbase}`
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
      `https://api-image.dyp.finance/api/v1/avatar/${this.state.coinbase}/delete`
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
      this.state.networkId === "1"
        ? window.config.subscriptioneth_tokens[
            this.state.selectedSubscriptionToken
          ]?.decimals
        : window.config.subscription_tokens[
            this.state.selectedSubscriptionToken
          ]?.decimals;
// this.handleCheckIfAlreadyApproved()
    return (
      <div>
        <h4 className="d-block mb-3">Subscribe to DYP Tools Premium</h4>
        <form onSubmit={this.handleSubscribe}>
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

            {!this.props.appState.isPremium ? (
              <div className="premiumbanner">
                <div className="row m-0 justify-content-between">
                  <div
                    style={{
                      maxWidth: 335,
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
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
                    <h3 className="subscr-price">75 USD</h3>
                    <p className="subscr-note">*Exclusive offer</p>
                    <div
                      className="subscribebtn w-auto mt-2"
                      type=""
                      onClick={() => {this.setState({ subscribe_now: true }); this.handleSubscriptionTokenChange(this.state.selectedSubscriptionToken);  this.handleCheckIfAlreadyApproved()}}
                    >
                      Subscribe now
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <></>
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
                          this.state.networkId === "1"
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
                                (e) =>
                                 { this.handleSubscriptionTokenChange(e.target.value);
                                  this.handleCheckIfAlreadyApproved()
                                }
                                  
                                // console.log(e.target)
                              }
                            />
                            {this.state.networkId === "1"
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
                        this.state.lockActive === false ? "linear-gradient(51.32deg, #E30613 -12.3%, #FA4A33 50.14%)" : "#C4C4C4",
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
              {/* <div>
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
              
            </div> */}
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
          <div className={this.state.coinbase ? "mt-3 mb-3" : "d-none"}>
            <h4 className="d-block mb-3 mt-5"> Avatar profile</h4>

            <div className={this.state.coinbase ? "inputfile-wrapper" : ""}>
              <img
                src={this.state.image}
                alt="your image"
                className="avatarimg"
                style={{
                  border:
                    this.state.image === Placeholder
                      ? "none"
                      : "3px solid #E30613",
                }}
              />
              <input
                type="file"
                id="group_image"
                onChange={this.onImageChange}
              />
              {this.state.showSavebtn === true ? (
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
              )}
            </div>
          </div>
        </form>

        <h4 className="d-block mb-3 mt-5" id="my-fav">
          My favorites
        </h4>
        <div className="row m-0" style={{ gap: 30 }}>
          {this.state.favorites.map((lock, index) => {
            return (
              <NavLink
                key={index}
                className="l-clr-purple"
                to={`/pair-explorer/${lock.id}`}
              >
                <div style={{ position: "relative", width: "260px" }}>
                  <div
                    className="d-flex table-wrapper"
                    style={{
                      background:
                        "linear-gradient(30.97deg, #E30613 18.87%, #FC4F36 90.15%)",
                    }}
                  >
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
      <div className="locker">
        <div className="table-title px-3">
          <h2 style={{ display: "block", color: `var(--preloader-clr)` }}>
            Account &amp; Premium Subscription
          </h2>

          <p>Get DYP Tools Premium Subscription</p>
        </div>
        <div className="l-table-wrapper-div p-4">
          <div className="mb-4">{this.GetSubscriptionForm()}</div>
        </div>
      </div>
    );
  }
}

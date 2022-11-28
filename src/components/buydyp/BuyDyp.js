import React, { useState } from "react";
import "./buydyp.css";
import VendorCard from "./VendorCard";
import Slider from "react-slick";
import VideoCard from "./VideoCard";

const BuyDyp = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
    dotsClass: "button__bar",
  };

  const buyDypItems = [
    {
      title: "Coinbase",
      logo: "coinbase.png",
      link: "https://pro.coinbase.com/trade/DYP-USD",
      totalvids: "1 video",
      videos: [
        {
          link: "https://youtu.be/mjUUqNy-zW8",
          image: "coinbase.png",
          title: "How to buy DeFi Yield Protocol (DYP) on Coinbase",
          walletName: "Coinbase",
          thumbnail: "coinbase.png",
        },
      ],
    },
    {
      title: "Huobi",
      logo: "huobi.png",
      link: "https://www.huobi.com/en-us/exchange/dyp_usdt/",
      totalvids: "0 videos",
      videos: "",
    },
    {
      title: "KuCoin",
      logo: "kucoin.png",
      link: "https://www.kucoin.com/trade/DYP-USDT",
      totalvids: "1 video",
      videos: [
        {
          link: "https://www.youtube.com/watch?v=BIuy1A-_-dU",
          image: "kucoin.png",
          title: "How to buy DeFi Yield Protocol (DYP) on KuCoin",
          walletName: "KuCoin",
          thumbnail: "kucoin.png",
        },
      ],
    },
    {
      title: "Gate.io",
      logo: "gateio.png",
      link: "https://www.gate.io/zh/trade/DYP_USDT",
      totalvids: "1 video",
      videos: [
        {
          link: "https://www.youtube.com/watch?v=arVFXf5hESE",
          image: "gate.png",
          title: "How to buy DeFi Yield Protocol (DYP) on Gate.io",
          walletName: "Gate.io",
          thumbnail: "gate.png",
        },
      ],
    },
    {
      title: "MEXC",
      logo: "mexc.png",
      link: "https://www.mexc.com/exchange/DYP_USDT",
      totalvids: "0 videos",
      videos: "",
      id: "collapsefive",
    },
    {
      title: "Uniswap V2",
      logo: "uniswap.png",
      link: "https://app.uniswap.org/#/swap?use=V2&inputCurrency=0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17",
      totalvids: "8 videos",
      videos: [
        {
          link: "https://www.youtube.com/watch?v=yBzIPecqKY8",
          image: "metamask.png",
          title: "How to set up MetaMask for DeFi Yield Protocol (DYP)",
          walletName: "Metamask",
          thumbnail: "uni1.png",
        },
        {
          link: "https://www.youtube.com/watch?v=XsmZ9xW_nps",
          image: "metamask.png",
          title:
            "How to buy DeFi Yield Protocol (DYP) on Uniswap V2 using MetaMask",
          walletName: "Metamask",
          thumbnail: "uni2.png",
        },
        {
          link: "https://www.youtube.com/watch?v=amM9wOGNVpg",
          image: "trustwallet.png",
          walletName: "Trust wallet",
          title: "How to set up Trust Wallet for DeFi Yield Protocol (DYP)",
          thumbnail: "trust1.png",
        },
        {
          link: "https://www.youtube.com/watch?v=AxWb2TxiQHw",
          walletName: "Trust wallet",
          image: "trustwallet.png",
          title:
            "How to buy DeFi Yield Protocol (DYP) on Uniswap V2 using Trust Wallet",
          thumbnail: "trust2.png",
        },
        {
          link: "https://www.youtube.com/watch?v=-kE6mM6d9ek",
          image: "coin98.png",
          walletName: "Coin98",
          title:
            "How to set up Coin98 Wallet (Desktop) for DeFi Yield Protocol (DYP)",
          thumbnail: "coin1.png",
        },
        {
          link: "https://www.youtube.com/watch?v=Dkt7JCbKHv4",
          image: "coin98.png",
          walletName: "Coin98",
          title:
            "How to buy DeFi Yield Protocol (DYP) on Ethereum Network using the Coin98 Wallet",
          thumbnail: "coin2.png",
        },
        {
          link: "https://www.youtube.com/watch?v=lTD8DAsxmtY",
          image: "safepal.png",
          walletName: "SafePal",
          title: "How to set up SafePal for DeFi Yield Protocol",
          thumbnail: "safe1.png",
        },
        {
          link: "https://www.youtube.com/watch?v=h-oLMDhVvbg",
          image: "safepal.png",
          walletName: "SafePal",
          title:
            "How to buy DeFi Yield Protocol (DYP) on Uniswap V2 using SafePal",
          thumbnail: "safe2.png",
        },
      ],
    },
    {
      title: "PancakeSwap V2",
      logo: "pancake.png",

      link: "https://pancakeswap.finance/swap?inputCurrencty=BNB&outputCurrency=0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17",
      totalvids: "4 videos",
      videos: [
        {
          link: "https://www.youtube.com/watch?v=yBzIPecqKY8",
          image: "metamask.png",
          title: "How to set up MetaMask for DeFi Yield Protocol",
          walletName: "Metamask",
          thumbnail: "uni1.png",
        },
        {
          link: "https://www.youtube.com/watch?v=sLHWYgNEbq8",
          image: "metamask.png",
          walletName: "Metamask",
          title:
            "How to buy DeFi Yield Protocol (DYP) on Pancakeswap V2 using MetaMask",
          thumbnail: "panc1.png",
        },
        {
          link: "https://www.youtube.com/watch?v=amM9wOGNVpg",
          image: "trustwallet.png",
          walletName: "Trust wallet",
          title: "How to set up Trust Wallet for DeFi Yield Protocol (DYP)",
          thumbnail: "trust1.png",
        },
        {
          link: "https://www.youtube.com/watch?v=Z8X3ythoZbg",
          image: "trustwallet.png",
          walletName: "Trust wallet",
          title:
            "How to buy DeFi Yield Protocol (DYP) on Pancakeswap V2 using Trust Wallet",
          thumbnail: "panc2.png",
        },
      ],
    },
    {
      title: "Pangolin",
      logo: "pangolin.png",
      link: "https://app.pangolin.exchange/#/swap?&outputCurrency=0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17",
      totalvids: "4 videos",
      videos: [
        {
          link: "https://www.youtube.com/watch?v=yBzIPecqKY8",
          image: "metamask.png",
          walletName: "Metamask",
          title: "How to set up MetaMask for DeFi Yield Protocol (DYP)",
          thumbnail: "uni1.png",
        },
        {
          link: "https://www.youtube.com/watch?v=T6qYvErqD-M",
          image: "metamask.png",
          walletName: "Metamask",
          title:
            "How to buy DeFi Yield Protocol (DYP) on the Pangolin exchange using MetaMask",
          thumbnail: "pan1.png",
        },
        {
          link: "https://www.youtube.com/watch?v=-kE6mM6d9ek",
          image: "coin98.png",
          walletName: "Coin98",
          title:
            "How to set up Coin98 Wallet (Desktop) for DeFi Yield Protocol (DYP)",
          thumbnail: "coin1.png",
        },
        {
          link: "https://www.youtube.com/watch?v=FmrgSuCo_nk",
          image: "coin98.png",
          walletName: "Coin98",
          title:
            "How to buy DeFi Yield Protocol (DYP) on the Avalanche Network using the Coin98 Wallet",
          thumbnail: "pan2.png",
        },
      ],
    },
    {
      title: "Coin98",
      logo: "coin98.png",
      link: "",
      totalvids: "3 videos",
      videos: [
        {
          link: "https://www.youtube.com/watch?v=SvUaexmtgnU",
          image: "uniswap.png",
          walletName: "UniSwap",
          title:
            "How to buy DeFi Yield Protocol (DYP) on Ethereum using the Coin98 Wallet App",
          thumbnail: "coineth.png",
        },
        {
          link: "https://www.youtube.com/watch?v=7jf8HGOrdBM",
          image: "pangolin.png",
          walletName: "Pangolin",
          title:
            "How to buy DeFi Yield Protocol (DYP) on the Avalanche Network using the Coin98 Mobile Wallet App",
          thumbnail: "coinbsc.png",
        },
        {
          link: "https://www.youtube.com/watch?v=8xaXadlb_Iw",
          image: "pancake.png",
          walletName: "PancakeSwap",
          title:
            "How to buy DeFi Yield Protocol (DYP) on the Binance Smart Chain using the Coin98 Mobile Wallet App",
          thumbnail: "coinavax.png",
        },
      ],
    },
    {
      title: "1inch",
      logo: "oneinch.png",
      link: "https://app.1inch.io/#/1/swap/DYP/ETH",
      totalvids: "6 videos",
      videos: [
        {
          link: "https://www.youtube.com/watch?v=yBzIPecqKY8",
          image: "metamask.png",
          walletName: "Metamask",
          title: "How to set up MetaMask for DeFi Yield Protocol (DYP)",
          thumbnail: "uni1.png",
        },
        {
          link: "https://www.youtube.com/watch?v=IE5danKYD-c",
          image: "metamask.png",
          walletName: "Metamask",
          title: "How to buy DeFi Yield Protocol (DYP) on 1Inch using MetaMask",
          thumbnail: "inch1.png",
        },
        {
          link: "https://www.youtube.com/watch?v=amM9wOGNVpg",
          image: "trustwallet.png",
          walletName: "Trust wallet",
          title: "How to set up Trust Wallet for DeFi Yield Protocol (DYP)",
          thumbnail: "trust1.png",
        },
        {
          link: "https://www.youtube.com/watch?v=UtcP4cWkXwg",
          image: "trustwallet.png",
          walletName: "Trust wallet",
          title:
            "How to buy DeFi Yield Protocol (DYP) on 1Inch using Trust Wallet",
          thumbnail: "inch2.png",
        },
        {
          link: "https://www.youtube.com/watch?v=lTD8DAsxmtY",
          image: "safepal.png",
          walletName: "SafePal",
          title: "How to set up SafePal for DeFi Yield Protocol",
          thumbnail: "safe1.png",
        },
        {
          link: "https://www.youtube.com/watch?v=nUvFG00QqS0",
          image: "safepal.png",
          walletName: "SafePal",
          title: "How to buy DeFi Yield Protocol (DYP) on 1Inch using SafePal",
          thumbnail: "inch3.png",
        },
      ],
    },
    {
      title: "KyberDMM",
      logo: "kyber.png",
      link: "https://dmm.exchange/#/swap?outputCurrency=0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17&networkId=43114",
      totalvids: "1 video",
      videos: [
        {
          link: "https://www.youtube.com/watch?v=olhIziGMs0Y",
          image: "metamask.png",
          walletName: "Metamask",
          title:
            "How to buy DeFi Yield Protocol (DYP) on KyberDMM using MetaMask",
          thumbnail: "kyberdmm.png",
        },
      ],
    },
    {
      title: "Poloniex",
      logo: "poloniex.png",
      link: "https://poloniex.com/spot/BTC_USDT",
      totalvids: "0 videos",
      videos: "",
    },
  ];

  const [videoList, setVideoList] = useState(buyDypItems[0].videos);
  const [activeVideo, setActiveVideo] = useState(videoList[0]);
  const [activeVendor, setActiveVendor] = useState(0);

  return (
    <div className="container-lg px-0">
      <div className="d-flex flex-column gap-2">
        <h6 className="buydyp-title">Buy DYP</h6>
        <p className="buydyp-content w-50">
          At Dypius, we want to make it easy for you to purchase our token. We
          have a variety of centralized and decentralized exchanges that you can
          use to do so.
        </p>
      </div>
      <h6 className="mt-5 buydyp-title">Exchanges to purchase DYP</h6>
      <div className="row mt-3 px-0 w-100">
        <div className="col-5">
          <div className="d-grid vendor-container">
            {/* <div className="vendor-card p-3">
                    <div className="d-flex align-items-start justify-content-between">
                        <div className="vendor-image-wrapper">
                            <img src={require('./assets/coinbase.png').default} alt="" />
                        </div>
                        <span className="video-amount">1 video</span>
                    </div>
                    <h6 className="vendor-title mt-2">Coinbase</h6>
                    <hr className="form-divider my-2" style={{height: '2px'}} />
                    <div className="d-flex align-items-center justify-content-between">
                        <span className="tutorial-text">View video tutorials</span>
                        <img src={require('../newsCard/assets/filledArrow.svg').default} alt="" />
                    </div>
                </div> */}
            {buyDypItems.map((vendor, index) => (
              <VendorCard
                key={index}
                logo={vendor.logo}
                videoAmount={vendor.totalvids}
                title={vendor.title}
                onSelect={() => {
                    setVideoList(vendor.videos)
                    setActiveVendor(index)
                    setActiveVideo(vendor.videos[0])
                }}
                active={activeVendor === index ? true : false}
              />
            ))}
          </div>
        </div>
        <div className="col-7">
          <div className="vendor-card p-3 position-relative">
            <div className="purplediv"></div>
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-2">
                <div className="selected-image-wrapper">
                  <img
                    src={require("./assets/coinbase.png").default}
                    height={32}
                    width={32}
                    alt=""
                  />
                </div>
                <h6 className="vendor-title">Coinbase videos</h6>
              </div>
              <button className="btn filledbtn px-5">Buy DYP</button>
            </div>
            <hr className="form-divider my-3" />
            <iframe
              src={activeVideo?.link}
              style={{ height: "375px", width: "100%" }}
              frameborder="0"
            ></iframe>
            <div className="d-flex align-items center justify-content-between">
              <h6 className="playlist-title mt-3">Video playlist</h6>
            </div>
            <div className="mt-2">
              <Slider {...settings}>
                {videoList.length > 0 &&  videoList?.map((video, index) => (
                    <VideoCard key={index} title={video.title} />
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyDyp;

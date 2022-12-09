import React from 'react'
import useWindowSize from '../../functions/useWindowSize'

const Footer = () => {

  const windowSize = useWindowSize();

  return (
    <div className="footer container-fluid d-flex justify-content-center justify-content-lg-start">
    <div className="row w-100">
    <div className="col-1"></div>
    <div className={`${windowSize.width < 786 ? 'col-12' : windowSize.width < 1490 ? 'col-11' : 'col-10'}`}>
    <div className="py-4 flex-column flex-lg-row px-0 container-lg d-flex justify-content-between gap-3 align-items-start align-items-lg-center">
      <div className="footer-logo flex-column flex-xxl-row">
        <a target={"_blank"} href="https://lorenadev.dyp.finance/">
          <img src="/assets/img/logo-footer.svg" alt="Dypius"></img>
        </a>
        <a target={"_blank"} href="https://lorenadev.dyp.finance/#metaverse">
          <img src="/assets/img/metaverse.svg" alt="METAVERSE"></img>
        </a>
      </div>
      <div className="social-and-links d-flex align-items-center justify-content-center gap-3">
      <div className="social-profile">
        <ul>
          <li>
            <a target={"_blank"} href="https://twitter.com/dypfinance">
              <img src="/assets/img/Social/twitter.svg" alt="Twitter"></img>
            </a>
          </li>
          <li>
            <a target={"_blank"} href="https://t.me/dypfinance">
              <img src="/assets/img/Social/telegram.svg" alt="Telegram"></img>
            </a>
          </li>
          <li>
            <a target={"_blank"} href="https://discord.com/invite/dypcaws">
              <img src="/assets/img/Social/discord.svg" alt="Discord"></img>
            </a>
          </li>
          <li>
            <a target={"_blank"} href="https://www.instagram.com/dyp.finance/">
              <img src="/assets/img/Social/instagram.svg" style={{height: 23, width: 23}} alt="Instagram"></img>
            </a>
          </li>
          <li>
            <a target={"_blank"} href="https://dypfinance.medium.com/">
              <img src="/assets/img/Social/medium.svg" alt="Medium"></img>
            </a>
          </li>
          <li>
            <a
              target={"_blank"}
              href="https://www.youtube.com/c/DeFiYieldProtocol/featured"
            >
              <img src="/assets/img/Social/youtube.svg" alt="Youtube"></img>
            </a>
          </li>
          <li>
            <a
              target={"_blank"}
              href="https://www.linkedin.com/company/defi-yield-protocol"
            >
              <img src="/assets/img/Social/linkedin.svg" alt="Linkedin"></img>
            </a>
          </li>
          <li>
            <a target={"_blank"} href="https://github.com/dypfinance">
              <img src="/assets/img/Social/github.svg" alt="Github"></img>
            </a>
          </li>
          <li>
            <a target={"_blank"} href="mailto:contact@dyp.finance">
              <img src="/assets/img/Social/email.svg" alt="Mail"></img>
            </a>
          </li>
          <li>
            <a
              target={"_blank"}
              href="https://www.coingecko.com/en/coins/defi-yield-protocol"
            >
              <img src="/assets/img/coingecko-logo.svg" alt="Coingecko" style={{width: 24, height: 24}}></img>
            </a>
          </li>
          <li>
            <a
              target={"_blank"}
              href="https://coinmarketcap.com/currencies/defi-yield-protocol/"
            >
              <img
                src="/assets/img/coinmarketcap.svg"
                alt="Coinmarketcap"
                 style={{width: 24, height: 24}}
              ></img>
            </a>
          </li>
        </ul>
      </div>
      <div className="footer-menu">
        <ul>
          <li>
            <a
              target={"_blank"}
              href="https://etherscan.io/address/0x961C8c0B1aaD0c0b10a51FeF6a867E3091BCef17#code"
            >
              Token Contract
            </a>
          </li>
          <li>
            <a
              target={"_blank"}
              href="https://lorenadev.dyp.finance/about#security"
            >
              Security
            </a>
          </li>
          <li>
            <a 
              target={"_blank"}
              href="https://lorenadev.dyp.finance/disclaimer"
            >
              Disclaimer
            </a>
          </li>
          <li>
            <a
              target={"_blank"}
              href="https://lorenadev.dyp.finance/about#contactus"
            >
             Support
            </a>
          </li>
        </ul>
      </div>
      </div>
    </div>
    </div>
    <div className="col-1"></div>
    </div>
  </div>
  )
}

export default Footer
import React, { useState } from "react";
import "./launchpadform.css";
import formIcon from "../assets/formIcon.svg";
import uploadLogo from "../assets/uploadLogo.svg";
import launchpadIndicator from "../assets/launchpadIndicator.svg";
import websiteIcon from '../assets/websiteIcon.svg'
import twitterIcon from '../assets/twitterIcon.svg'
import telegramIcon from '../assets/telegramIcon.svg'
import mediumIcon from '../assets/mediumIcon.svg'
import discordIcon from '../assets/discordIcon.svg'
const LaunchpadForm = () => {

    const projectStatusItems = [
        {
            value: 'Initial idea',
            label: 'Initial idea'
        },
        {
            value: 'Early development',
            label: 'Early development'
        },
        {
            value: 'Late stage of development',
            label: 'Late stage of development'
        },
        {
            value: 'Ready to launch',
            label: 'Ready to launch'
        },
        {
            value: 'Already launched',
            label: 'Already launched'
        },
    ]

    const blockchainLaunchItems = [
        {
            value: 'Ethereum',
            label: 'Ethereum',
            icon: 'ethIcon.svg'
        },
        {
            value: 'BNB chain',
            label: 'BNB Chain',
            icon: 'bnbIcon.svg'
        },
        {
            value: 'Avalanche',
            label: 'Avalanche',
            icon: 'avaxIcon.svg'
        },
    ]

    const [formItems, setFormItems] = useState({
        project_logo: '',
        project_name: '',
        ticker_symbol: '',
        name: '',
        email_address: '',
        project_description: '',
        project_status: '',
        team: '',
        blockchain_launch: '',
        raised_funds: '',
        funds_amount: '',
        ido_capital: '',
        funding_description: '',
        website: '',
        twitter: '',
        telegram_user: '',
        telegram_channel: '',
        medium: '',
        discord: '',
        additional_description: ''
        })

        const [dropdownTitles, setDropdownTitles] = useState({
            project_status: 'Project status*',
            team: 'Team*',
            blockchain_launch: 'Blockchain launch*',
            raised_funds: 'Have you raised funds'
        })

        const [image, setImage] = useState()

        const convert2base64 = e => {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                setImage(reader.result)
                console.log(image);
            };
            reader.readAsDataURL(file)
        }

        const [blockChainIcon, setBlockChainIcon] = useState(null)


        const focusInput = (inputName) => {
            document.getElementById(inputName).focus()
        }

  return (
    <div className="container-lg px-0">
      <div className="d-flex flex-column gap-3" style={{ width: "65%" }}>
        <h6 className="launchpad-hero-title">Launchpad Form</h6>
        <p className="launchpad-hero-desc">
          This form is for project owners to submit their projects for us to
          review as a potential IDO (Initial DEX Offering). DO NOT submit this
          form if you are looking to participate in an IDO.
        </p>
      </div>
      <div className="form-container p-3 position-relative mt-4">
        <div className="purplediv" style={{ background: "#8E97CD" }}></div>
        <div className="d-flex align-items-center gap-2 mt-1">
          <img src={formIcon} alt="form icon" />
          <h6
            style={{
              fontWeight: "500",
              fontSize: "20px",
              lineHeight: "30px",
              color: "#f7f7fc",
            }}
          >
            Submit form
          </h6>
        </div>
        <form>
          <div className="row align-items-center justify-content-between first-form mt-5">
            <div className="col-1 d-flex flex-column gap-3">
              <div className="form-title">Project logo</div>
              <div className="upload-container d-flex justify-content-center align-items-center p-4 position-relative">
              <input type="file" id="file-upload" onChange={e => convert2base64(e)} />
              {/* {image  && <img src={image} alt="" />} */}
                <img src={uploadLogo} alt="" />
              </div>
            </div>
            <div className="col-10 d-flex flex-column gap-3">
              <div className="form-title">Project details</div>
              <div className="d-flex align-items-center gap-4">
                <div className="d-grid form-grid w-100">
                  <div
                    className="input-container px-0"
                    style={{ width: "100%" }}
                  >
                    <input
                      type="text"
                      id="project_name"
                      name="project_name"
                      placeholder=" "
                      className="text-input"
                      style={{ width: "100%" }}
                      value={formItems.project_name}
                      onChange={(e) => setFormItems({...formItems, project_name: e.target.value})}
                    />
                    <label htmlFor="usd" className="label" onClick={() => focusInput('project_name')}>
                      Project name<span className="required-star">*</span>
                    </label>
                  </div>
                  <div
                    className="input-container px-0"
                    style={{ width: "100%" }}
                  >
                    <input
                      type="text"
                      id="ticker_symbol"
                      name="ticker_symbol"
                      placeholder=" "
                      className="text-input"
                      style={{ width: "100%" }}
                      value={formItems.ticker_symbol}
                      onChange={(e) => setFormItems({...formItems, ticker_symbol: e.target.value})}

                    />
                    <label htmlFor="usd" className="label" onClick={() => focusInput('ticker_symbol')}>
                      Ticker symbol<span className="required-star">*</span>
                    </label>
                  </div>{" "}
                  <div
                    className="input-container px-0"
                    style={{ width: "100%" }}
                  >
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder=" "
                      className="text-input"
                      style={{ width: "100%" }}
                      value={formItems.name}
                      onChange={(e) => setFormItems({...formItems, name: e.target.value})}

                    />
                    <label htmlFor="usd" className="label" onClick={() => focusInput('name')}>
                      Name
                    </label>
                  </div>
                  <div
                    className="input-container px-0"
                    style={{ width: "100%" }}
                  >
                    <input
                      type="text"
                      min={1}
                      max={365}
                      id="email_address"
                      name="email_address"
                      placeholder=" "
                      className="text-input"
                      style={{ width: "100%" }}
                      value={formItems.email_address}
                      onChange={(e) => setFormItems({...formItems, name: e.target.value})}
                      
                    />
                    <label htmlFor="usd" className="label" onClick={() => focusInput('email_address')}>
                      Email address<span className="required-star">*</span>
                    </label>
                  </div>
                </div>
                <div className="input-container px-0" style={{ width: "100%" }}>
                  <textarea
                    type="text"
                    id="project_description"
                    name="project_description"
                    placeholder=" "
                    className="text-input"
                    style={{ width: "100%" }}
                    rows="6"
                    value={formItems.project_description}
                    onChange={(e) => setFormItems({...formItems, project_description: e.target.value})}

                  />
                  <label htmlFor="usd" className="label" onClick={() => focusInput('project_description')}>
                    About the project
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <span className="image-tip mt-3">
              *Logo dimensions must be 250px x 250px and max 150kb - jpeg, png.
            </span>
          </div>
          <hr className="form-divider my-4" />
          <div className="row align-items-center">
            <h6
              className="my-3"
              style={{
                fontWeight: "500",
                fontSize: "20px",
                lineHeight: "30px",
                color: "#f7f7fc",
              }}
            >
              Funding details
            </h6>
            <div className="funding-grid d-grid col-7">
              <div class="dropdown">
                <button
                  class="btn launchpad-dropdown d-flex justify-content-between align-items-center dropdown-toggle w-100"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {dropdownTitles.project_status}
                  <img src={launchpadIndicator} alt="" />
                </button>
                <ul class="dropdown-menu w-100">
                  {projectStatusItems.map((item, index) => (
                    <li key={index} className="dropdown-item" onClick={() => {setDropdownTitles({...dropdownTitles, project_status: item.label}); setFormItems({...formItems, project_status: item.value})}}>
                    {item.label}
                </li>
                  ))}
                </ul>
              </div>
              <div class="dropdown">
                <button
                  class="btn launchpad-dropdown d-flex justify-content-between align-items-center dropdown-toggle w-100"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {dropdownTitles.team}
                  <img src={launchpadIndicator} alt="" />
                </button>
                <ul class="dropdown-menu w-100">
                  <li className="dropdown-item" onClick={() => {setDropdownTitles({...dropdownTitles, team: "Public"}); setFormItems({...formItems, team: "Public"})}}>
                      Public
                  </li>
                  <li className="dropdown-item" onClick={() => {setDropdownTitles({...dropdownTitles, team: "Anonymous"}); setFormItems({...formItems, team: "Anonymous"})}}>
                      Anonymous
                  </li>
                </ul>
              </div>
              <div class="dropdown">
                <button
                  class="btn launchpad-dropdown d-flex justify-content-between align-items-center dropdown-toggle w-100"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <div className="d-flex align-items-center gap-2">
                  {blockChainIcon !== null && <img src={require(`../assets/${blockChainIcon}`).default}  alt=""/>}
                  {dropdownTitles.blockchain_launch}
                  </div>
                  <img src={launchpadIndicator} alt="" />
                </button>
                <ul class="dropdown-menu w-100">
                {blockchainLaunchItems.map((item) => (
                     <li className="dropdown-item d-flex align-items-center gap-2" onClick={() => {setDropdownTitles({...dropdownTitles, blockchain_launch: item.label}); setFormItems({...formItems, blockchain_launch: item.label}); setBlockChainIcon(item.icon)}}>
                     <img src={require(`../assets/${item.icon}`).default} alt="" />
                     {item.label}
                 </li>
                ))}
                </ul>
              </div>
              <div class="dropdown">
                <button
                  class="btn launchpad-dropdown d-flex justify-content-between align-items-center dropdown-toggle w-100"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {dropdownTitles.raised_funds}
                  <img src={launchpadIndicator} alt="" />
                </button>
                <ul class="dropdown-menu w-100">
                  <li className="dropdown-item" onClick={() => {setDropdownTitles({...dropdownTitles, raised_funds: "Yes"}); setFormItems({...formItems, raised_funds: "Yes"})}}>
                      Yes
                  </li>
                  <li className="dropdown-item" onClick={() => {setDropdownTitles({...dropdownTitles, raised_funds: "No"}); setFormItems({...formItems, raised_funds: "No"})}}>
                      No
                  </li>
                  
                </ul>
              </div>
              <div className="input-container px-0" style={{ width: "100%" }}>
                <input
                  type="text"
                  id="funds_amount"
                  name="funds_amount"
                  placeholder=" "
                  className="text-input"
                  style={{ width: "100%" }}
                  value={formItems.funds_amount}
                  onChange={(e) => setFormItems({...formItems, funds_amount: e.target.value})}

                />
                <label htmlFor="usd" className="label" onClick={() => focusInput('funds_amount')}>
                  Raised funds amount (USD)
                </label>
              </div>
              <div className="input-container px-0" style={{ width: "100%" }}>
                <input
                  type="text"
                  id="ido_capital"
                  name="ido_capital"
                  placeholder=" "
                  className="text-input"
                  style={{ width: "100%" }}
                  value={formItems.ido_capital}
                  onChange={(e) => setFormItems({...formItems, ido_capital: e.target.value})}
                />
                <label htmlFor="usd" className="label" onClick={() => focusInput('ido_capital')}>
                  Desired IDO capital (USD)<span className="required-star">*</span>
                </label>
              </div>
            </div>
            <div className="input-container col-5">
              <textarea
                type="text"
                id="funding_description"
                name="funding_description"
                placeholder=" "
                className="text-input"
                style={{ width: "100%" }}
                rows="6"
                value={formItems.funding_description}
                onChange={(e) => setFormItems({...formItems, funding_description: e.target.value})}

              />
              <label htmlFor="usd" className="label" style={{ left: "20px" }}  onClick={() => focusInput('funding_description')}>
                Describe token use case
              </label>
            </div>
          </div>
          <hr className="form-divider my-4" />
        <div className="row align-items-center">
            <div className="d-flex flex-column gap-3 mb-3">
            <h6
              style={{
                fontWeight: "500",
                fontSize: "20px",
                lineHeight: "30px",
                color: "#f7f7fc",
              }}
            >
              Additional Information
            </h6>
            <span className="form-title">Social media</span>
            </div>
            <div className="col-7 form-grid d-grid">
            <div
                    className="input-container px-0"
                    style={{ width: "100%" }}
                  >
                    <img src={websiteIcon} alt="" className="input-icon" />
                    <input
                      type="text"
                      id="website"
                      name="website"
                      placeholder=" "
                      className="text-input"
                      style={{ width: "100%", paddingLeft: '30px', paddingLeft: '30px' }}
                      value={formItems.website}
                      onChange={(e) => setFormItems({...formItems, website: e.target.value})}
                    />
                    <label htmlFor="usd" className="label" style={{left: '30px'}} onClick={() => focusInput("website")}>
                      Website<span className="required-star">*</span>
                    </label>
                  </div>
                  <div
                    className="input-container px-0"
                    style={{ width: "100%" }}
                  >
                    <img src={twitterIcon} alt="" className="input-icon" />

                    <input
                      type="text"
                      id="twitter"
                      name="twitter"
                      placeholder=" "
                      className="text-input"
                      style={{ width: "100%", paddingLeft: '30px' }}
                      value={formItems.twitter}
                      onChange={(e) => setFormItems({...formItems, twitter: e.target.value})}                      
                    />
                    <label htmlFor="usd" className="label" style={{left: '30px'}} onClick={() => focusInput("twitter")}>
                      Twitter<span className="required-star">*</span>
                    </label>
                  </div>
                  <div
                    className="input-container px-0"
                    style={{ width: "100%" }}
                  >
                    <img src={telegramIcon} alt="" className="input-icon" />

                    <input
                      type="text"
                      id="telegram_user"
                      name="telegram_user"
                      placeholder=" "
                      className="text-input"
                      style={{ width: "100%", paddingLeft: '30px' }}
                      value={formItems.telegram_user}
                      onChange={(e) => setFormItems({...formItems, telegram_user: e.target.value})}                      

                    />
                    <label htmlFor="usd" className="label" style={{left: '30px'}} onClick={() => focusInput("telegram_user")}>
                      Telegram username<span className="required-star">*</span>
                    </label>
                  </div>
                  <div
                    className="input-container px-0"
                    style={{ width: "100%" }}
                  >
                    <img src={telegramIcon} alt="" className="input-icon" />

                    <input
                      type="text"
                      id="telegram_channel"
                      name="telegram_channel"
                      placeholder=" "
                      className="text-input"
                      style={{ width: "100%", paddingLeft: '30px' }}
                      value={formItems.telegram_channel}
                      onChange={(e) => setFormItems({...formItems, telegram_channel: e.target.value})}                      
                    />
                    <label htmlFor="usd" className="label" style={{left: '30px'}} onClick={() => focusInput("telegram_channel")}>
                    Telegram official channel<span className="required-star">*</span>
                    </label>
                  </div>
                  <div
                    className="input-container px-0"
                    style={{ width: "100%" }}
                  >
                    <img src={mediumIcon} alt="" className="input-icon" />

                    <input
                      type="text"
                      id="medium"
                      name="medium"
                      placeholder=" "
                      className="text-input"
                      style={{ width: "100%", paddingLeft: '30px' }}
                      value={formItems.medium}
                      onChange={(e) => setFormItems({...formItems, medium: e.target.value})}                      
                    />
                    <label htmlFor="usd" className="label" style={{left: '30px'}} onClick={() => focusInput("medium")}>
                      Medium
                    </label>
                  </div>
                  <div
                    className="input-container px-0"
                    style={{ width: "100%" }}
                  >
                    <img src={discordIcon} alt="" className="input-icon" />
                    <input
                      type="text"
                      id="Discord"
                      name="Discord"
                      placeholder=" "
                      className="text-input"
                      style={{ width: "100%", paddingLeft: '30px' }}
                      value={formItems.discord}
                      onChange={(e) => setFormItems({...formItems, discord: e.target.value})}                      
                    />
                    <label htmlFor="usd" className="label" style={{left: '30px'}} onClick={() => focusInput("discord")}>
                      Discord
                    </label>
                  </div>
            </div>
            <div className="input-container col-5">
              <textarea
                type="text"
                id="additional_description"
                name="additional_description"
                placeholder=" "
                className="text-input"
                style={{ width: "100%" }}
                rows="10"
                value={formItems.additional_description}
                onChange={(e) => setFormItems({...formItems, additional_description: e.target.value})}                      

              />
              <label htmlFor="usd" className="label" style={{ left: "20px" }} onClick={() => focusInput("additional_description")}>
                Additional information
              </label>
            </div>
        </div>
        </form>
      </div>
    </div>
  );
};

export default LaunchpadForm;

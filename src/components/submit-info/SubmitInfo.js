import React, { useState, useEffect } from "react";
import validateInfo from "./validateinfo";
import axios from "axios";

const SubmitInfo = () => {
  const initialState = {
    project_name: "",
    email: "",
    ticker: "",
    contract_address: "",
    about: "",
    audit_info: "",
    audit_link: "",
    website_link: "",
    twitter: "",
    logo_link: "",
    coinmarket: "",
    telegram: "",
    coingecko: "",
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors(validateInfo(values));

    if (Object.keys(errors).length === 0) {
      const data = {
        project_name: values.project_name,
        email: values.email,
        logo_link: values.logo_link,
        ticker: values.ticker,
        contract_address: values.contract_address,
        about: values.about,
        audit_info: values.audit_info,
        audit_link: values.audit_link,
        website_link: values.website_link,
        twitter: values.twitter,
        coinmarket: values.coinmarket,
        telegram: values.telegram,
        coingecko: values.coingecko,
      };

      if (
        values.project_name !== "" &&
        values.ticker !== "" &&
        errors.project_name === "" &&
        errors.email === "" &&
        errors.ticker === "" &&
        errors.contract_address === "" &&
        errors.about === "" &&
        errors.audit_info === "" &&
        errors.audit_link === "" &&
        errors.website_link === "" &&
        errors.twitter === "" &&
        errors.coinmarket === "" &&
        errors.telegram === "" &&
        errors.coingecko === "" 
      ) {
        const send = await axios
          .post("https://api-mail.dyp.finance/api/submit_form", data)
          .then(function (result) {
            return result.data;
          })
          .catch(function (error) {
            console.error(error);
          });

        if (send.status === 1) {
          alert("Your information has been submitted.");
          setValues({ ...initialState });
        } else {
          alert("Something goes to wrong.");
        }
      }
    }
  };

  return (
    <div>
      <div className="row px-3 table-title">
        <div>
          <h2 style={{ display: "block", color: "var(--preloader-clr)" }}>
            Submit form
          </h2>
          <p className="d-block">
            Use this form to submit information about your project to DYP Tools
          </p>
        </div>
      </div>
      <div className="px-3 table-title" style={{ paddingBottom: "6rem" }}>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            margin: "2rem",
          }}
        >
          <div style={{ borderBottom: "1px solid #D5D7E6" }}>
            <h5>Your details</h5>
            <div className="row mt-3 mb-4">
              <div className="col-lg-4 single-cell">
                <div className="input-wrapper">
                  <span className="required-text">Project name</span>
                  <input
                    type="text"
                    className="inputfield"
                    name="project_name"
                    id="project_name"
                    value={values.project_name}
                    onChange={handleChange}
                    placeholder="Project name"
                  />
                  {errors.project_name && (
                    <span className="errormessage">{errors.project_name}</span>
                  )}
                </div>
                {/* <div className="input-wrapper">
                  <span className="required-text">Nr. of NFT to created</span>
                  <input
                    type="text"
                    className="inputfield"
                    name="nft_number"
                    id="nft_number"
                    value={values.nft_number}
                    onChange={handleChange}
                    placeholder="Nft number"
                  />
                  {errors.nft_number && (
                    <span className="errormessage">{errors.nft_number}</span>
                  )}
                </div> */}
                <div className="input-wrapper">
                  <span className="required-text">Email</span>
                  <input
                    type="email"
                    className="inputfield"
                    name="email"
                    id="email"
                    value={values.email}
                    onChange={handleChange}
                    placeholder="Email"
                  />
                  {errors.email && (
                    <span className="errormessage">{errors.email}</span>
                  )}
                </div>
              </div>
              <div className="col-lg-4 single-cell">
                <div className="input-wrapper">
                  <span className="required-text">Ticker symbol</span>
                  <input
                    type="text"
                    className="inputfield"
                    name="ticker"
                    id="ticker"
                    value={values.ticker}
                    onChange={handleChange}
                    placeholder="Ticker"
                  />
                  {errors.ticker && (
                    <span className="errormessage">{errors.ticker}</span>
                  )}
                </div>
                <div className="input-wrapper">
                  <span className="required-text">
                    Uniswap pair contract list
                  </span>
                  <input
                    type="text"
                    className="inputfield"
                    name="contract_address"
                    id="contract_address"
                    value={values.contract_address}
                    onChange={handleChange}
                    placeholder="For multiple addresses, separate them by comma ','"
                  />
                  {errors.contract_address && (
                    <span className="errormessage">
                      {errors.contract_address}
                    </span>
                  )}
                </div>
              </div>
              <div className="col-lg-4">
                <div className="input-wrapper">
                  <span className="required-text">About the project</span>

                  <textarea
                    className="inputfield"
                    style={{
                      height: "auto",
                      paddingTop: 10,
                      paddingBottom: 10,
                    }}
                    id="inputAddress"
                    placeholder="Enter project description and include information about the project's liquidity, team profiles, smart contract security efforts, project mission etc."
                    name="about"
                    rows="8"
                    cols="2"
                    onChange={handleChange}
                    value={values.about}
                  />
                  {errors.about && (
                    <span className="errormessage">{errors.about}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div style={{ borderBottom: "1px solid #D5D7E6" }}>
            <h5>Smart contract details</h5>
            <div className="row mt-3 mb-4">
              <div className="col-lg-4 single-cell">
                <div className="input-wrapper">
                  <span className="required-text">
                    Smart contract audit information
                  </span>
                  <input
                    type="text"
                    className="inputfield"
                    name="audit_info"
                    id="audit_info"
                    value={values.audit_info}
                    onChange={handleChange}
                    placeholder="Smart contract audit information"
                  />
                  {errors.audit_info && (
                    <span className="errormessage">{errors.audit_info}</span>
                  )}
                </div>
              </div>
              <div className="col-lg-4 single-cell">
                <div className="input-wrapper">
                  <span className="required-text">Smart contract audit</span>
                  <input
                    type="text"
                    className="inputfield"
                    name="audit_link"
                    id="audit_link"
                    value={values.audit_link}
                    onChange={handleChange}
                    placeholder="URL"
                  />
                  {errors.audit_link && (
                    <span className="errormessage">{errors.audit_link}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div>
            <h5>Additional links</h5>
            <div className="row mt-3 mb-4">
              <div className="col-lg-4 single-cell">
                <div className="input-wrapper">
                  <span className="required-text">Website</span>
                  <input
                    type="text"
                    className="inputfield"
                    name="website_link"
                    id="website_link"
                    value={values.website_link}
                    onChange={handleChange}
                    placeholder="URL"
                  />
                  {errors.website_link && (
                    <span className="errormessage">{errors.website_link}</span>
                  )}
                </div>
                <div className="input-wrapper">
                  <span className="required-text">Transparent logo image</span>
                  <input
                    type="text"
                    className="inputfield"
                    name="logo_link"
                    id="logo_link"
                    value={values.logo_link}
                    onChange={handleChange}
                    placeholder="URL"
                  />
                  {errors.logo_link && (
                    <span className="errormessage">{errors.logo_link}</span>
                  )}
                </div>
              </div>
              <div className="col-lg-4 single-cell">
                <div className="input-wrapper">
                  <span className="required-text">CoinMarketCap</span>
                  <input
                    type="text"
                    className="inputfield"
                    name="coinmarket"
                    id="coinmarket"
                    value={values.coinmarket}
                    onChange={handleChange}
                    placeholder="URL"
                  />
                  {errors.coinmarket && (
                    <span className="errormessage">{errors.coinmarket}</span>
                  )}
                </div>
                <div className="input-wrapper">
                  <span className="required-text">Telegram</span>
                  <input
                    type="text"
                    className="inputfield"
                    name="telegram"
                    id="telegram"
                    value={values.telegram}
                    onChange={handleChange}
                    placeholder="URL"
                  />
                  {errors.telegram && (
                    <span className="errormessage">{errors.telegram}</span>
                  )}
                </div>
              </div>
              <div className="col-lg-4 single-cell">
                <div className="input-wrapper">
                  <span className="required-text">CoinGecko</span>
                  <input
                    type="text"
                    className="inputfield"
                    name="coingecko"
                    id="coingecko"
                    value={values.coingecko}
                    onChange={handleChange}
                    placeholder="URL"
                  />
                  {errors.coingecko && (
                    <span className="errormessage">{errors.coingecko}</span>
                  )}
                </div>
                <div className="input-wrapper">
                  <span className="required-text">Twitter </span>
                  <input
                    type="text"
                    className="inputfield"
                    name="twitter"
                    id="twitter"
                    value={values.twitter}
                    onChange={handleChange}
                    placeholder="URL"
                  />
                  {errors.twitter && (
                    <span className="errormessage">{errors.twitter}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3 buttons-wrapper">
            <div className="col-lg-4 single-cell">
              <div className="submitbtn" onClick={handleSubmit}>
                <span className="submit-text">Submit</span>
              </div>
            </div>
            <div className="col-lg-4 single-cell">
              <div
                className="clearbtn"
                onClick={() => {
                  setValues({ ...initialState });
                }}
              >
                <span className="clear-text">Clear form</span>
              </div>
            </div>
          </div>
        </form>{" "}
      </div>
    </div>
  );
};

export default SubmitInfo;

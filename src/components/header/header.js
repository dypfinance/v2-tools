import "./header.css";
import React, { useEffect, useState } from "react";
import coin from "./assets/coins.svg";
import useWindowSize from "../../functions/useWindowSize";
import toolsLogo from "../../assets/sidebarIcons/toolsLogo.svg";


const Header = ({
  toggleMobileSidebar,
  toggleTheme,
  theme,
  showModal,
  show,
  hideModal,
}) => {
  const [username, setUsername] = useState();
  const windowSize = useWindowSize();



  const fetchUsername = async () => {
    setUsername("Dypian");
  };
  const welcomeTypes = ["Good morning", "Good afternoon", "Good evening"];
  const [welcomeText, setwelcomeText] = useState("");
  const hour = new Date().getHours();

  const setGreeting = () => {
    if (hour < 12) setwelcomeText(welcomeTypes[0]);
    else if (hour < 18) setwelcomeText(welcomeTypes[1]);
    else setwelcomeText(welcomeTypes[2]);
  };

  useEffect(() => {
    setGreeting();
  }, [hour]);


  useEffect(() => {
    fetchUsername();
  });

  return (
    <>
      <header className="header-wrap" style={{ zIndex: 5 }}>
        <div className="container-fluid d-flex justify-content-center justify-content-lg-start">
          <div className="row w-100">
            <div className="col-1"></div>
            <div
              className={`${
                windowSize.width < 786
                  ? "col-12"
                  : windowSize.width < 1490
                  ? "col-11"
                  : "col-10"
              }`}
            >
              <div
                className="container-lg px-0 d-flex justify-content-between gap-3 align-items-center w-100"
                // style={{ maxWidth: "calc(100% - 215px)"}}
              >
                {/* marginLeft: "240px" */}
                <div className="d-none d-lg-flex flex-column gap-2 text-start">
                  <h4
                    className="text-white"
                    style={{ fontSize: "23px", fontWeight: "600" }}
                  >
                    {welcomeText}, {username}
                  </h4>
                  <span className="text-white headerdesc">
                    Discover the latest trends, breaking news, and gain access
                    to powerful dApps.
                  </span>
                </div>
                <a href="https://app.dypius.com/">
                  <img src={toolsLogo} className="d-flex d-lg-none" alt="" />
                </a>
                <div className="d-flex m-0 justify-content-between gap-3 align-items-center">
                  <a className="buydyp-btn btn" href="https://app.dypius.com/buydyp">
                    <img src={coin} alt="" />
                    <span className="buy-dyp-text">Buy DYP</span>
                  </a>
                
                </div>
              </div>
            </div>
            <div className="col-1"></div>
          </div>
        </div>
      </header>

     
    </>
  );
};

export default Header;

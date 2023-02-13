import React from "react";
import GoogleAnalyticsReporter from "./functions/analytics";
import Sidebar from "./components/sidebar/sidebar";
import Header from "./components/header/header";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import Footer from "./components/Footer/footer";
import Swap from "./components/swap/Swap";
import MobileMenu from "./components/sidebar/MobileMenu";
import ScrollToTop from "./functions/ScrollToTop";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: "theme-dark",
      isMinimized: false && window.innerWidth >= 992,
      isOpenInMobile: false,
      windowWidth: 0,
      windowHeight: 0,
      show: false,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
    let toBeAdded = {
      "theme-dark": "theme-dark",
    };
    let { theme } = this.state;
    document.body.classList.add(toBeAdded[theme]);
    // this.subscriptionInterval = setInterval(this.refreshSubscription, 5e3);
  }


  componentWillUnmount() {
    // clearInterval(this.subscriptionInterval);
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    });
  }

  toggleTheme = () => {
    let toBeAdded = {
      "theme-dark": "theme-white",
      "theme-white": "theme-dark",
    };
    let { theme } = this.state;
    document.body.classList.add(toBeAdded[theme]);
    document.body.classList.remove(theme);
    this.setState({ theme: toBeAdded[theme] });
  };


  toggleMinimizeSidebar = () => {
    const f = () => window.dispatchEvent(new Event("resize"));
    this.setState({ isMinimized: !this.state.isMinimized }, () => f());
    f();
    let newInterval = setInterval(f, 16);
    setTimeout(() => clearInterval(newInterval), 1000);
  };

  toggleMobileSidebar = () => {
    this.setState({ isOpenInMobile: !this.state.isOpenInMobile });
  };

  render() {
    document.addEventListener("touchstart", { passive: true }); 
    return (
      <div
        className={`page_wrapper ${this.state.isMinimized ? "minimize" : ""}`}
      >
        {/* <img src={navRadius} className="nav-radius" alt="" /> */}

        <Route component={GoogleAnalyticsReporter} />

        <div className="body_overlay"></div>
        <Header
          coinbase={this.state.coinbase}
          theme={this.state.theme}
          toggleMobileSidebar={this.toggleMobileSidebar}
          isOpenInMobile={this.state.isOpenInMobile}
          logout={this.logout}
          showModal={this.showModal}
          hideModal={this.hideModal}
          show={this.state.show}
        />
        <div className="content-wrapper container-fluid d-flex justify-content-center justify-content-lg-start">
          <div className="row w-100">
            <div className="col-1">
              <Sidebar
                appState={this.state}
                theme={this.state.theme}
                toggleMobileSidebar={this.toggleMobileSidebar}
                isOpenInMobile={this.state.isOpenInMobile}
                showModal={this.showModal}
                hideModal={this.hideModal}
                show={this.state.show}
              />
            </div>
            <div
              className={`${this.state.windowWidth < 786 ?'col-12 px-1' : this.state.windowWidth < 1490 ? 'col-11' : 'col-10'}`}
            >
              <div className="right-content pr-0 my-4 my-lg-5">
                <ScrollToTop />
                <Switch>
                <Route
                    exact
                    path="/"
                    component={Swap}
                  />
                </Switch>
              </div>
            </div>
            <div className="col-1"></div>
          </div>
          <MobileMenu />
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;

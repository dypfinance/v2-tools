import React from "react";
import moment from "moment";
import DataTable, { createTheme } from "react-data-table-component";
import CircularProgress from "@material-ui/core/CircularProgress";
import { NavLink } from "react-router-dom";

import getFormattedNumber from "../../functions/get-formatted-number";

const Circular = () => (
  // we need to add some padding to circular progress to keep it from activating our scrollbar
  <div style={{ padding: "60px" }}>
    <CircularProgress color="inherit" size={75} />
  </div>
);

createTheme("solarized", {
  text: {
    primary: "#FFFFFF",
    secondary: "rgba(255, 255, 255, 0.7)",
    disabled: "rgba(0,0,0,.12)",
  },
  background: {
    default: "transparent",
  },
  context: {
    background: "transparent" || "#E91E63",
    text: "#FFFFFF",
  },
  divider: {
    default: "rgba(81, 81, 81, 1)",
  },
  button: {
    default: "#FFFFFF",
    focus: "rgba(255, 255, 255, .54)",
    hover: "rgba(255, 255, 255, .12)",
    disabled: "rgba(255, 255, 255, .18)",
  },
  sortFocus: {
    default: "rgba(255, 255, 255, .54)",
  },
  selected: {
    default: "rgba(0, 0, 0, .7)",
    text: "#FFFFFF",
  },
  highlightOnHover: {
    default: "rgba(0, 0, 0, .7)",
    text: "#FFFFFF",
  },
  striped: {
    default: "rgba(0, 0, 0, .87)",
    text: "#FFFFFF",
  },
});

export default class Farms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ethPrice: "...",
      gasPrice: "...",
      farms: [],
      filteredFarms: [],
      isLoading: true,
      filteredByName: "",
    };
  }

  async componentDidMount() {
    // this.fetchTransactions()
    await this.fetchFarms();
  }

  async componentDidUpdate(prevProps) {
    if(prevProps.networkId != this.props.networkId){
      this.setState({
        isLoading: true,
        ethPrice: "...",
        farms: [],
        filteredFarms: [],
      });
      await this.fetchFarms().then();
    }
  }

  fetchFarms = async () => {
    try {
      let network = this.props.networkId
      let farms = await window.$.get(
        network == 1
          ? `${window.config.farm_api}/api/farm-info/eth/`
          : `${window.config.farm_api}/api/farm-info-avax/`
      );
      farms = farms.farmInfo;
      //console.log({ farms })
      this.setState({ farms, filteredFarms: farms });
      return { farms };
    } finally {
      this.setState({ isLoading: false });
    }
  };

  // filterByTokenId = (tokenId) => {
  //     if (!tokenId) {
  //         this.setState({filteredByTokenId: '', filteredTransactions: JSON.parse(JSON.stringify(this.state.processedTransactions))})
  //         return
  //     }
  //     let filteredTransactions = JSON.parse(JSON.stringify(this.state.processedTransactions))
  //     filteredTransactions = filteredTransactions.filter(txn => txn.tokenId == tokenId)
  //     this.setState({filteredTransactions, filteredByTokenId: tokenId})
  // }

  // filterByTxnType = (txnType) => {
  //     if (!txnType) {
  //         this.setState({ filteredByTxnType: '', filteredTransactions: JSON.parse(JSON.stringify(this.state.processedTransactions)) })
  //         return
  //     }
  //     let filteredTransactions = JSON.parse(JSON.stringify(this.state.processedTransactions))
  //     filteredTransactions = filteredTransactions.filter(txn => txn.type == txnType)
  //     this.setState({ filteredTransactions, filteredByTxnType: txnType })
  // }

  filterByName = (name) => {
    if (!name) {
      this.setState({
        filteredByName: "",
        filteredFarms: JSON.parse(JSON.stringify(this.state.farms)),
      });
      return;
    }
    let filteredFarms = JSON.parse(JSON.stringify(this.state.farms));
    filteredFarms = filteredFarms.filter(
      (farm) =>
        String(farm.pool_name).toLowerCase().startsWith(name.toLowerCase()) ||
        String(farm.pair_name).toLowerCase().startsWith(name.toLowerCase())
    );
    this.setState({ filteredFarms, filteredByName: name });
  };

  GetDataTable = () => {
    const columns = [
      {
        name: " ",
        selector: "link_logo",
        maxWidth: "80px",
        minWidth: "80px",
        right: true,
        cell: (row, i) => (
          <div>
            {/*i+1*/}{" "}
            <img
              src={row.link_logo}
              height="40"
              width="40"
              style={{ objectFit: "cover" }}
            />
          </div>
        ),
      },
      {
        name: "Pool",
        selector: "pair_name",
        sortable: true,
        cell: (row) => (
          <a
            className="l-clr-purple"
            target="_blank"
            rel="noopener noreferrer"
            href={row.link_pair}
          >
            {" "}
            {row.pair_name}{" "}
          </a>
        ),
      },
      {
        name: "Project",
        selector: "pool_name",
        sortable: true,
      },
      {
        name: "TVL",
        selector: "tvl_usd",
        sortable: true,
        cell: (row) => <div> ${getFormattedNumber(row.tvl_usd)} </div>,
      },
      {
        name: "APY",
        selector: "apy_percent",
        sortable: true,
        cell: (row) => <div> {getFormattedNumber(row.apy_percent)}% </div>,
      },
      {
        name: "Confidence",
        selector: "confidence",
        sortable: false,
      },
    ];
    return (
      <DataTable
        progressComponent={<Circular />}
        compact={true}
        keyField="id"
        theme={this.props.theme == "theme-dark" ? "solarized" : "light"}
        persistTableHead={false}
        progressPending={this.state.isLoading}
        fixedHeader={true}
        pagination={true}
        paginationPerPage={50}
        paginationRowsPerPageOptions={[50, 100, 250, 500]}
        columns={columns}
        data={this.state.filteredFarms}
      />
    );
  };

  render() {
    return (
      <div>
        <div className="row px-3">
          <div className="col-md-6">
            {/* <h2 style={{display: 'block', color: `var(--preloader-clr)`}}>Yields</h2>
                        <p className='d-block' style={{fontSize: '11px'}}>
                            This list does not imply endorsement by DeFi Yield Protocol.
                            There might be Smart Contract risk and IL risk. Please Do Your Own Research
                            before investing on any project.
                        </p> */}
          </div>
          <div className="col-md-6">
            {/* <div className="search-box">
              <form id="searchform">
                <input
                  value={this.state.filteredByName}
                  onChange={(e) => {
                    this.setState({ filteredByName: e.target.value });
                    this.filterByName(e.target.value);
                  }}
                  type="text"
                  id="search-bar"
                  style={{ paddingBottom: "3px" }}
                  autoComplete="off"
                  placeholder="Filter by Name"
                  className="l-border-black"
                />
                <button type="submit" id="submit">
                  <img src="/assets/img/search-2.png" alt="Image" />
                </button>
              </form>
            </div> */}
          </div>
        </div>
        <div className="table-box">
          {/* <div className="table-title">
            <h4>Yields Rankings</h4>
          </div> */}
          <div className="l-table-wrapper-div">{this.GetDataTable()}</div>
          {/* <div className="page-nav">
                        <ul>
                            <li><a href="#"><img src="assets/img/arrow-left.png" alt="Image" /></a></li>
                            <li><span>Page 1 of 20</span></li>
                            <li><a href="#"><img src="assets/img/arro-right.png" alt="Image" /></a></li>
                        </ul>
                    </div> */}
        </div>
      </div>
    );
  }
}

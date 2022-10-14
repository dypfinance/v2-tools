import React from "react";
import moment from "moment";
import DataTable, { createTheme } from "react-data-table-component";
import CircularProgress from "@material-ui/core/CircularProgress";
import { NavLink } from "react-router-dom";

import getProcessedSwaps from "../../functions/get-processed-swaps";
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

export default class BigSwapExplorer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ethPrice: "...",
            gasPrice: "...",
            swaps: [],
            filteredSwaps: [],
            isLoading: true,
            filteredByTokenId: "",
            filteredByTxnType: "", // 'burn' | 'mint' | ''
        };
    }

    async componentDidMount() {
        // this.fetchTransactions()
        // this.checkNetworkId();
        await this.fetchSwaps().then();
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.networkId != this.props.networkId) {
            this.setState({
                isLoading: true,
                ethPrice: "...",
                swaps: [],
                filteredSwaps: [],
            });
            await this.fetchSwaps().then();
        }
    }

    fetchSwaps = async () => {
        try {
            let network
            this.props.networkId == 1 ? network = 'ethereum' : network = 'avalanche'
            let {swaps, ethPrice} = await getProcessedSwaps(null, true, network);
            console.log({swaps, ethPrice});
            this.setState({swaps, ethPrice, filteredSwaps: swaps});
            return {swaps, ethPrice};
        } finally {
            this.setState({isLoading: false});
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

    filterByTokenSymbol = (tokenSymbol) => {
        if (!tokenSymbol) {
            this.setState({
                filteredByTokenSymbol: "",
                filteredSwaps: JSON.parse(JSON.stringify(this.state.swaps)),
            });
            return;
        }
        let filteredSwaps = JSON.parse(JSON.stringify(this.state.swaps));
        filteredSwaps = filteredSwaps.filter(
            (txn) =>
                String(txn.pair.token0.symbol)
                    .toLowerCase()
                    .startsWith(tokenSymbol.toLowerCase()) ||
                String(txn.pair.token1.symbol)
                    .toLowerCase()
                    .startsWith(tokenSymbol.toLowerCase())
        );
        this.setState({filteredSwaps, filteredByTokenSymbol: tokenSymbol});
    };

    GetDataTable = () => {
        const columns = [
            {
                name: "Pair",
                selector: "pair_symbols",
                sortable: true,
                // minWidth: '145px',
                cell: (txn) => (
                    <NavLink
                        className="l-clr-purple"
                        to={`/pair-explorer/${txn.pair.id}`}
                        style={{
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                        }}
                        title={txn.pair_symbols}
                    >
                        {txn.pair_symbols}
                    </NavLink>
                ),
            },

            {
                name: "Date",
                selector: "timestamp",
                sortable: true,
                minWidth: "145px",
                cell: (txn) => (
                    <td
                        style={{ whiteSpace: "nowrap" }}
                        title={new Date(txn.timestamp * 1e3)}
                    >
                        {moment(txn.timestamp * 1e3).format("YYYY-MM-DD HH:mm")}
                    </td>
                ),
            },
            {
                name: "Type",
                selector: "type",
                sortable: true,
                maxWidth: "80px",
                minWidth: "80px",
                textAlign: "right",
                cell: (txn) => (
                    <span className={`l-clr-${txn.type == "sell" ? "red" : "purple"}`}>
            {" "}
                        {txn.type}{" "}
          </span>
                ),
            },
            {
                name: "Amount USD",
                selector: "amountUSD",
                sortable: true,
                format: (txn) => `$${getFormattedNumber(txn.amountUSD, 2)}`,
            },
            // {
            //     name: `Price ${this.state.pair?.token1.symbol || 'token1'}`,
            //     selector: 'token1PerToken0',
            //     sortable: true,
            //     format: txn => `${getFormattedNumber(txn.token1PerToken0, 6)} ${this.state.pair?.token1.symbol}`
            // },
            {
                name: `Amount ${this.state.pair?.token0.symbol || "token0"}`,
                selector: "amount0",
                sortable: true,
                format: (txn) =>
                    `${getFormattedNumber(txn.amount0, 2)} ${txn.pair?.token0.symbol}`,
            },
            {
                name: `Amount ${this.state.pair?.token1.symbol || "token1"}`,
                selector: "amount1",
                sortable: true,
                format: (txn) =>
                    `${getFormattedNumber(txn.amount1, 2)} ${txn.pair?.token1.symbol}`,
            },

            {
                name: "Maker",
                selector: "maker",
                sortable: false,
                cell: (txn) => (
                    <a
                        className="l-clr-purple"
                        target="_blank"
                        rel="noopener noreferrer"
                        href={
                            this.props.networkId === 1
                                ? `https://etherscan.io/address/${txn.maker}`
                                : `https://cchain.explorer.avax.network/address/${txn.maker}`
                        }
                    >
                        ...{txn.maker?.slice(34)}
                    </a>
                ),
            },
            {
                name: "Others",
                // minWidth: '165px',
                cell: (txn) => (
                    <div className="l-table-actions">
                        {/* <a onClick={e => {
                            e.preventDefault()
                            this.filterByTokenId(this.state.filteredByTokenId == '' ? txn.tokenId : '')
                        }} title="Filter by token" href="#"><i style={{ fontSize: '18px', position: 'relative', top: '5px', color: this.state.filteredByTokenId == txn.tokenId ? 'red' : 'inherit' }} className={`fas fa-${this.state.filteredByTokenId == txn.tokenId ? 'times' : 'filter'}`}></i></a> */}
                        {/* <a rel='noopener noreferrer' target="_blank" title="Buy at Uniswap" href={`https://app.uniswap.org/#/swap?outputCurrency=${txn.tokenId}`}><img src="/images/uniswap-logo-home.png" width="18" alt="" /></a> */}
                        <a
                            rel="noopener noreferrer"
                            target="_blank"
                            title={txn.id.split("-")[0]}
                            href={
                                this.props.networkId === 1
                                    ? `https://etherscan.io/tx/${txn.id.split("-")[0]}`
                                    : `https://cchain.explorer.avax.network/tx/${
                                        txn.id.split("-")[0]
                                    }`
                            }
                        >
                            <img
                                className="icon-bg-white-rounded"
                                src={
                                    this.props.networkId === 1
                                        ? "/images/etherscan.png"
                                        : "/images/cchain.png"
                                }
                                width="18"
                                alt=""
                            />
                        </a>
                        {/* <a rel='noopener noreferrer' target="_blank" title="Blocked Liquidity" href={`https://www.unicrypt.network/pair/${txn.pairId}`}><img className='icon-bg-white-rounded' src="/images/unicrypt_v3.svg" width="18" alt="" /></a> */}
                        <NavLink title={txn.pair.id} to={`/pair-explorer/${txn.pair.id}`}>
                            <i
                                style={{ fontSize: "20px", position: "relative", top: "5px" }}
                                className="far fa-compass"
                            ></i>
                        </NavLink>
                    </div>
                ),
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
                data={this.state.filteredSwaps}
            />
        );
    };

    render() {
        return (
            <div>
                {/* <div className="row px-3">
          <div className="col-md-6">
            <h2 style={{ display: "block", color: `var(--preloader-clr)` }}>
              Big Swap Explorer
            </h2>
            <p className="d-block">
              Search for Big Swaps on Pangolin with useful information.
            </p>
          </div>
          <div className="col-md-6">
            <div className="search-box">
              <form id="searchform">
                <input
                  value={this.state.filteredByTokenSymbol}
                  onChange={(e) => {
                    this.setState({ filteredByTokenSymbol: e.target.value });
                    this.filterByTokenSymbol(e.target.value);
                  }}
                  type="text"
                  id="search-bar"
                  style={{ paddingBottom: "3px" }}
                  autoComplete="off"
                  placeholder="Filter by Token"
                  className="l-border-black"
                />
                <button type="submit" id="submit">
                  <img src="/assets/img/search-2.png" alt="Image" />
                </button>
              </form>
            </div>
          </div>
        </div> */}
                <div className="table-box">
                    {/* <div className="table-title">
            <h4>Latest Big Swaps</h4>
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

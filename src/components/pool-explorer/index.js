import React from "react";
import moment from "moment";
import DataTable, {createTheme} from "react-data-table-component";
import CircularProgress from "@material-ui/core/CircularProgress";
import {NavLink} from "react-router-dom";
import getProcessedTransactions from "../../functions/get-processed-transactions";
// import {getProcessedTransactionsETH} from "../../functions/get-processed-transactions";
import getFormattedNumber from "../../functions/get-formatted-number";

import BigSwapExplorer from "../big-swap-explorer";
import TopTokens from "../top-tokens";
import Farms from "../farms";

const Circular = () => (
    // we need to add some padding to circular progress to keep it from activating our scrollbar
    <div style={{padding: "60px"}}>
        <CircularProgress color="inherit" size={75}/>
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

export default class PoolExplorer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ethPrice: "...",
            gasPrice: "...",
            processedTransactions: [],
            filteredTransactions: [],
            isLoading: true,
            screen: "pool",
            filteredByTokenId: "",
            filteredByTxnType: "", // 'burn' | 'mint' | ''
        };
    }

    componentDidMount() {
        this.fetchTransactions();
        window.scrollTo(0, 0)
    }

    async componentDidUpdate(prevProps) {
        if(prevProps.networkId != this.props.networkId){
            this.setState({
                isLoading: true,
                ethPrice: "...",
                processedTransactions: [],
                filteredTransactions: []
            });
            await window.wait(1000);
            await this.fetchTransactions().then();
        }
    }

    fetchTransactions = async () => {

        try {

            let network
            this.props.networkId == 1 ? network = 'ethereum' : network = 'avalanche'
            let transactions = await getProcessedTransactions(network);

            // TODO: Filter this to last 4 hour transactions once synced
            let filteredTransactions = transactions.transactions
                .filter(txn => txn.timestamp*1e3 >= Date.now() - 4 * 60 * 60 * 1000)
            this.setState({
                processedTransactions: filteredTransactions,
                filteredTransactions: filteredTransactions,
                ethPrice: transactions.ethPrice,
            });
        } catch (e) {
            console.log(e)
        }
        this.setState({isLoading: false});
    };

    filterByTokenId = (tokenId) => {
        if (!tokenId) {
            this.setState({
                filteredByTokenId: "",
                filteredTransactions: JSON.parse(
                    JSON.stringify(this.state.processedTransactions)
                ),
            });
            return;
        }
        let filteredTransactions = JSON.parse(
            JSON.stringify(this.state.processedTransactions)
        );
        filteredTransactions = filteredTransactions.filter(
            (txn) => txn.tokenId == tokenId
        );
        this.setState({filteredTransactions, filteredByTokenId: tokenId});
    };

    filterByTxnType = (txnType) => {
        if (!txnType) {
            this.setState({
                filteredByTxnType: "",
                filteredTransactions: JSON.parse(
                    JSON.stringify(this.state.processedTransactions)
                ),
            });
            return;
        }
        let filteredTransactions = JSON.parse(
            JSON.stringify(this.state.processedTransactions)
        );
        filteredTransactions = filteredTransactions.filter(
            (txn) => txn.type == txnType
        );
        this.setState({filteredTransactions, filteredByTxnType: txnType});
    };

    filterByTokenSymbol = (tokenSymbol) => {
        if (!tokenSymbol) {
            this.setState({
                filteredByTokenSymbol: "",
                filteredTransactions: JSON.parse(
                    JSON.stringify(this.state.processedTransactions)
                ),
            });
            return;
        }
        let filteredTransactions = JSON.parse(
            JSON.stringify(this.state.processedTransactions)
        );
        filteredTransactions = filteredTransactions.filter((txn) =>
            String(txn.tokenSymbol)
                .toLowerCase()
                .startsWith(tokenSymbol.toLowerCase())
        );
        this.setState({filteredTransactions, filteredByTokenSymbol: tokenSymbol});
    };

    GetDataTable = () => {
        let now = Date.now();

        const columns = [
            {
                name: "Token",
                selector: "tokenSymbol",
                sortable: true,
                cell: (txn) => (
                    <a
                        rel="noopener noreferrer"
                        target="_blank"
                        href={
                            this.props.networkId === 1
                                ? `https://etherscan.io/address/${txn.tokenId}`
                                : `https://cchain.explorer.avax.network/address/${txn.tokenId}`
                        }
                    >
                        {txn.tokenSymbol}
                    </a>
                ),
            },
            {
                name: "Time",
                selector: "timestamp",
                sortable: true,
                cell: (txn) => (
                    <td title={new Date(txn.timestamp * 1e3)}>
                        {moment.duration(txn.timestamp * 1e3 - now).humanize(true)}
                    </td>
                ),
            },
            {
                name: "Actions",
                minWidth: "165px",
                cell: (txn) => (
                    <div className="l-table-actions">
                        <a
                            onClick={(e) => {
                                e.preventDefault();
                                this.filterByTokenId(
                                    this.state.filteredByTokenId == "" ? txn.tokenId : ""
                                );
                            }}
                            title="Filter by token"
                            href="#"
                        >
                            <i
                                style={{
                                    fontSize: "18px",
                                    position: "relative",
                                    top: "5px",
                                    color:
                                        this.state.filteredByTokenId == txn.tokenId
                                            ? "red"
                                            : "inherit",
                                }}
                                className={`fas fa-${
                                    this.state.filteredByTokenId == txn.tokenId
                                        ? "times"
                                        : "filter"
                                }`}
                            ></i>
                        </a>
                        <a
                            rel="noopener noreferrer"
                            target="_blank"
                            title={
                                this.props.networkId === 1
                                    ? "Buy at Uniswap"
                                    : "Buy at Pangolin"
                            }
                            href={
                                this.props.networkId === 1
                                    ? `https://app.uniswap.org/#/swap?outputCurrency=${txn.tokenId}`
                                    : `https://app.pangolin.exchange/#/swap?outputCurrency=${txn.tokenId}`
                            }
                        >
                            <img
                                src={
                                    this.props.networkId === 1
                                        ? "/images/uniswap-logo-home.png"
                                        : "/images/pangolin.png"
                                }
                                width="18"
                                alt=""
                            />
                        </a>
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
                        {/* <a rel='noopener noreferrer' target="_blank" title="Blocked Liquidity" href={`https://www.unicrypt.network/amm/uni/pair/${txn.pairId}`}><img className='icon-bg-white-rounded' src="/images/unicrypt_v3.svg" width="18" alt="" /></a> */}
                        <NavLink title="DYP Locker" to={`/locker/${txn.pairId}`}>
                            <i
                                style={{
                                    color: "var(--preloader-clr)",
                                    fontSize: "20px",
                                    position: "relative",
                                    top: "5px",
                                }}
                                className="fas fa-lock"
                            />
                        </NavLink>
                        <NavLink title="Pair Explorer" to={`/pair-explorer/${txn.pairId}`} onClick={() => {
                            window.location.replace(`/pair-explorer/${txn.pairId}`)
                        }}>
                            <i
                                style={{
                                    fontSize: "20px",
                                    position: "relative",
                                    top: "5px",
                                }}
                                className="far fa-compass"
                            ></i>
                        </NavLink>
                    </div>
                ),
            },
            {
                name: "Type",
                selector: "type",
                sortable: true,
                cell: (txn) => (
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={
                            this.props.networkId === 1
                                ? `https://v2.info.uniswap.org/pair/${txn.pairId}`
                                : `https://cchain.explorer.avax.network/address/${txn.pairId}`
                        }
                    >
            <span
                className={`badge badge-${
                    txn.type == "burn" ? "danger" : "light"
                } p-2`}
            >
              {txn.type == "burn" ? "REMOVE" : "ADD"}
            </span>
                    </a>
                ),
            },
            {
                name: "Token Price USD",
                selector: "tokenPerEth",
                sortable: true,
                format: (txn) =>
                    `$${getFormattedNumber(txn.tokenPerEth * this.state.ethPrice, 1)}`,
            },
            {
                name: "Total Value",
                selector: "amountUSD",
                sortable: true,
                format: (txn) => `$${getFormattedNumber(txn.amountUSD, 2)}`,
            },
            {
                name: "Token Amount",
                selector: "tokenAmount",
                sortable: true,
                format: (txn) =>
                    `${getFormattedNumber(txn.tokenAmount, 4)} ${txn.tokenSymbol}`,
            },
            {
                name: this.props.networkId === 1 ? "ETH Amount" : "AVAX Amount",
                selector: "ethAmount",
                sortable: true,
                format: (txn) =>
                    this.props.networkId === 1
                        ? `${getFormattedNumber(txn.ethAmount, 4)} ETH`
                        : `${getFormattedNumber(txn.ethAmount, 4)} AVAX`,
            },
            {
                name: "Created on",
                selector: "pairCreationTimestamp",
                sortable: true,
                cell: (txn) => (
                    <div title={new Date(txn.pairCreationTimestamp * 1e3)}>
                        {moment
                            .duration(txn.pairCreationTimestamp * 1e3 - now)
                            .humanize(true)}
                    </div>
                ),
            },
        ];
        return (
            <DataTable
                progressComponent={<Circular/>}
                compact={true}
                keyField="key"
                theme={this.props.theme == "theme-white" ? "light" : "solarized"}
                persistTableHead={false}
                progressPending={this.state.isLoading}
                fixedHeader={true}
                pagination={true}
                paginationPerPage={50}
                paginationRowsPerPageOptions={[50, 100, 250, 500]}
                columns={columns}
                data={this.state.filteredTransactions}
            />
        );
    };

    render() {
        return (
            <div>
                <div className="row px-3 table-title poolexp-wrapper">
                    <div className="col-md-6 pl-0">
                        {this.state.screen === "pool" ? (
                            <>
                                <h2 style={{display: "block", color: `var(--preloader-clr)`}}>
                                    Explorer
                                </h2>
                                <p className="d-block">
                                    Search for new pools, add or remove liquidity in a pair.
                                </p>
                            </>
                        ) : this.state.screen === "swap" ? (
                            <>
                                <h2 style={{display: "block", color: `var(--preloader-clr)`}}>
                                    Big Swap Explorer
                                </h2>
                                <p className="d-block">
                                    {this.props.networkId === 1
                                        ? " Search for Big Swaps on Uniswap with useful information"
                                        : " Search for Big Swaps on Pangolin with useful information"}
                                </p>
                            </>
                        ) : this.state.screen === "tokens" ? (
                            <>
                                <h2 style={{display: "block", color: `var(--preloader-clr)`}}>
                                    Top Tokens
                                </h2>
                                <p className="d-block">
                                    {this.props.networkId === 1
                                        ? "List of Uniswap Top Tokens"
                                        : "List of Pangolin Top Tokens"}
                                </p>
                            </>
                        ) : (
                            <>
                                <h2 style={{display: "block", color: `var(--preloader-clr)`}}>
                                    Yields
                                </h2>
                                <p className="d-block" style={{fontSize: "11px"}}>
                                    This list does not imply endorsement by DeFi Yield Protocol.
                                    There might be Smart Contract risk and IL risk.<br/> <b>Please conduct your
                                    own research before investing on any project!</b>
                                </p>
                            </>
                        )}

                        <div className="screens-container">
                            <div
                                style={{
                                    borderBottom:
                                        this.state.screen === "pool" ? "3px solid #E30613" : "none",
                                    paddingBottom: 8,
                                    fontWeight: this.state.screen === "pool" ? 500 : 300,
                                    fontSize: this.state.screen === "pool" ? 14 : 12,
                                }}
                                onClick={() => {
                                    this.setState({screen: "pool"});
                                }}
                            >
                                <span>Pool Explorer</span>
                            </div>
                            <div
                                style={{
                                    borderBottom:
                                        this.state.screen === "swap" ? "3px solid #E30613" : "none",
                                    paddingBottom: 8,
                                    fontWeight: this.state.screen === "swap" ? 500 : 300,
                                    fontSize: this.state.screen === "swap" ? 14 : 12,
                                }}
                                onClick={() => {
                                    this.setState({screen: "swap"});
                                }}
                            >
                                <span>Big Swap</span>
                            </div>
                            <div
                                style={{
                                    borderBottom:
                                        this.state.screen === "tokens"
                                            ? "3px solid #E30613"
                                            : "none",
                                    paddingBottom: 8,
                                    fontWeight: this.state.screen === "tokens" ? 500 : 300,
                                    fontSize: this.state.screen === "tokens" ? 14 : 12,
                                }}
                                onClick={() => {
                                    this.setState({screen: "tokens"});
                                }}
                            >
                                <span>Top Tokens</span>
                            </div>
                            <div
                                style={{
                                    borderBottom:
                                        this.state.screen === "yields"
                                            ? "3px solid #E30613"
                                            : "none",
                                    paddingBottom: 8,
                                    fontWeight: this.state.screen === "yields" ? 500 : 300,
                                    fontSize: this.state.screen === "yields" ? 14 : 12,
                                }}
                                onClick={() => {
                                    this.setState({screen: "yields"});
                                }}
                            >
                                <span>Yields</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 p-0">
                        <div className="search-box">
                            <form id="searchform">
                                <input
                                    value={this.state.filteredByTokenSymbol}
                                    onChange={(e) => {
                                        this.setState({filteredByTokenSymbol: e.target.value});
                                        this.filterByTokenSymbol(e.target.value);
                                    }}
                                    type="text"
                                    id="search-bar"
                                    style={{paddingBottom: "10px"}}
                                    autoComplete="off"
                                    placeholder="Filter by Token"
                                    className="l-border-black"
                                />
                                <button type="submit" id="submit">
                                    <img src="/assets/img/search-2.png" alt="Image"/>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="table-box">
                    <div className="table-title">
                        {this.state.screen === "pool" ? (
                            <h4>
                                {this.props.networkId === 1
                                    ? "Uniswap Pools Activity"
                                    : "Pangolin Pools Activity"}
                            </h4>
                        ) : this.state.screen === "swap" ? (
                            <h4>Latest Big Swaps</h4>
                        ) : this.state.screen === "tokens" ? (
                            <h4>
                                {this.props.networkId === 1
                                    ? "Uniswap Top Tokens"
                                    : "Pangolin Top Tokens"}
                            </h4>
                        ) : (
                            <h4>Yields Rankings</h4>
                        )}
                    </div>
                    {this.state.screen === "pool" ? (
                        <div className="l-table-wrapper-div">{this.GetDataTable()}</div>
                    ) : this.state.screen === "swap" ? (
                        <BigSwapExplorer
                            theme={this.props.theme}
                            networkId={this.props.networkId}
                        />
                    ) : this.state.screen === "tokens" ? (
                        <TopTokens
                            theme={this.props.theme}
                            networkId={this.props.networkId}
                        />
                    ) : (
                        <Farms
                            handleConnection={this.props.handleConnection}
                            isConnected={this.props.isConnected}
                            appState={this.props.state}
                            theme={this.props.theme}
                            networkId={this.props.networkId}
                            // {...props}
                        />
                    )}
                    {/* <div className="l-table-wrapper-div">{this.GetDataTable()}</div> */}
                </div>
            </div>
        );
    }
}

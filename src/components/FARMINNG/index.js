import React from "react";

import initStakingNew from "./staking-new-front";
import StakingStats from "./components/staking-stats";
import StakingStatsNew from "./components/staking-stats-new";
import ReferralStats from "./components/referral-stats";
import FullStakingStats from "./components/full-staking-stats";

import WalletConnectProvider from "@walletconnect/web3-provider";

const eth_address = "ETH";


const { rebase_factors } = window;

//Farming New
const StakingNew1 = initStakingNew({
    token: window.token_new,
    staking: window.farming_new_1,
    constant: window.constant_staking_new5,
    liquidity: eth_address,
    lp_symbol: "USD",
    reward: "30,000",
    lock: "3 Days",
    rebase_factor: rebase_factors[0],
    expiration_time: "14 December 2022",
    fee: 0.3,
});

const StakingNew2 = initStakingNew({
    token: window.token_new,
    staking: window.farming_new_2,
    constant: window.constant_staking_new6,
    liquidity: eth_address,
    lp_symbol: "USD",
    reward: "30,000",
    lock: "3 Days",
    rebase_factor: rebase_factors[0],
    expiration_time: "14 December 2022",
    fee: 0.3,
});
const StakingNew3 = initStakingNew({
    token: window.token_new,
    staking: window.farming_new_3,
    constant: window.constant_staking_new7,
    liquidity: eth_address,
    lp_symbol: "USD",
    reward: "30,000",
    lock: "3 Days",
    rebase_factor: rebase_factors[0],
    expiration_time: "14 December 2022",
    fee: 0.4,
});
const StakingNew4 = initStakingNew({
    token: window.token_new,
    staking: window.farming_new_4,
    constant: window.constant_staking_new8,
    liquidity: eth_address,
    lp_symbol: "USD",
    reward: "30,000",
    lock: "3 Days",
    rebase_factor: rebase_factors[0],
    expiration_time: "14 December 2022",
    fee: 0.8,
});
const StakingNew5 = initStakingNew({
    token: window.token_new,
    staking: window.farming_new_5,
    constant: window.constant_staking_new9,
    liquidity: eth_address,
    lp_symbol: "USD",
    reward: "30,000",
    lock: "3 Days",
    rebase_factor: rebase_factors[0],
    expiration_time: "14 December 2022",
    fee: 1.2,
});

let { BigNumber, LP_IDs, LP_IDs_V2 } = window;

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            is_wallet_connected: false,
            the_graph_result: JSON.parse(JSON.stringify(window.the_graph_result)),
            the_graph_result_ETH_V2: JSON.parse(
                JSON.stringify(window.the_graph_result_eth_v2)
            ),
            referrer: "",
            darkTheme: false,
            show: false,
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };

    componentDidMount() {
        this.tvl().then();
    }

    tvl = async () => {
        try {
            let the_graph_result_ETH_V2 = await window.get_the_graph_eth_v2();
            this.setState({
                the_graph_result_ETH_V2: JSON.parse(
                    JSON.stringify(the_graph_result_ETH_V2)
                ),
            });
        } catch (e) {
            // window.alertify.error("Cannot fetch TVL");
            console.error("TVL ETH V2 error: " + e);
        }

        try {
            let the_graph_result = await window.refresh_the_graph_result();
            this.setState({
                the_graph_result: JSON.parse(JSON.stringify(the_graph_result)),
            });
        } catch (e) {
            // window.alertify.error("Cannot fetch TVL");
            console.error("Cannot fetch TVL: " + e);
        }
    };

    toggleTheme = () => {
        let darkTheme = !this.state.darkTheme;
        document.body.classList[darkTheme ? "add" : "remove"]("dark");
        this.setState({ darkTheme });
    };

    getCombinedTvlUsd = () => {
        let tvl = 0;
        if (!this.state.the_graph_result.lp_data) return 0;

        let lp_ids = Object.keys(this.state.the_graph_result.lp_data);
        for (let id of lp_ids) {
            tvl += this.state.the_graph_result.lp_data[id].tvl_usd * 1 || 0;
        }

        return tvl;
    };

    getTvlFarming = () => {
        let tvl = 0;
        if (!this.state.the_graph_result.lp_data) return 0;

        tvl = window.TVL_FARMING_POOLS;

        return tvl;
    };

    getCombinedStakers = async () => {
        let stakers = 0;
        if (!this.state.the_graph_result.lp_data) return 0;
        let lp_ids = Object.keys(this.state.the_graph_result.lp_data);
        for (let id of lp_ids) {
            stakers += this.state.the_graph_result.lp_data[id].stakers_num * 1 || 0;
        }
        return stakers;
    };

    handleConnection = async () => {
        this.hideModal();
        try {
            let is_wallet_connected = await window.connectWallet(undefined, false);
            let referrer = window.param("r");

            if (is_wallet_connected) {
                if (referrer) {
                    referrer = String(referrer).trim().toLowerCase();
                }
                if (!window.web3.utils.isAddress(referrer)) {
                    referrer = window.config.ZERO_ADDRESS;
                }
            }
            this.setState({
                is_wallet_connected,
                coinbase: await window.web3.eth.getCoinbase(),
                referrer,
            });

            window.wait(2000);

            try {
                let the_graph_result_ETH_V2 = await window.get_the_graph_eth_v2();
                this.setState({
                    the_graph_result_ETH_V2: JSON.parse(
                        JSON.stringify(the_graph_result_ETH_V2)
                    ),
                });
            } catch (e) {
                // window.alertify.error("Cannot fetch TVL");
                console.error("TVL ETH V2 error: " + e);
            }

            try {
                let the_graph_result = await window.refresh_the_graph_result();
                this.setState({
                    the_graph_result: JSON.parse(JSON.stringify(the_graph_result)),
                });
            } catch (e) {
                // window.alertify.error("Cannot fetch TVL");
                console.error("Cannot fetch TVL: " + e);
            }
        } catch (e) {
            window.alertify.error(String(e));
        }
    };

    handleConnectionWalletConnect = async () => {
        try {
            let provider = new WalletConnectProvider({
                rpc: {
                    1: "https://mainnet.infura.io/v3/94608dc6ddba490697ec4f9b723b586e",
                },
            });

            let is_wallet_connected = await window.connectWallet(provider, true);
            //await setupnetwork()
            let referrer = window.param("r");

            if (is_wallet_connected) {
                if (referrer) {
                    referrer = String(referrer).trim().toLowerCase();
                }
                if (!window.web3.utils.isAddress(referrer)) {
                    referrer = window.config.ZERO_ADDRESS;
                }
            }
            this.setState({
                is_wallet_connected,
                coinbase: await window.web3.eth.getCoinbase(),
                referrer,
            });

            try {
                let the_graph_result_ETH_V2 = await window.get_the_graph_eth_v2();
                this.setState({
                    the_graph_result_ETH_V2: JSON.parse(
                        JSON.stringify(the_graph_result_ETH_V2)
                    ),
                });
            } catch (e) {
                // window.alertify.error("Cannot fetch TVL");
                console.error("TVL ETH V2 error: " + e);
            }

            try {
                let the_graph_result = await window.refresh_the_graph_result();
                this.setState({
                    the_graph_result: JSON.parse(JSON.stringify(the_graph_result)),
                });
            } catch (e) {
                // window.alertify.error("Cannot fetch TVL");
                console.error("Cannot fetch TVL: " + e);
            }
        } catch (e) {
            window.alertify.error(String(e));
        }
    };

    render() {
        return (
            <div className="App App-header" style={{ overflowX: "hidden" }}>
                <div style={{ minHeight: "550px" }} className="App-container">

                    <StakingStats
                        is_wallet_connected={this.state.is_wallet_connected}
                        handleConnection={this.handleConnection}
                        handleConnectionWalletConnect={
                            this.handleConnectionWalletConnect
                        }
                        the_graph_result={this.state.the_graph_result}
                        {...props}
                    />



                    <StakingNew5
                        is_wallet_connected={this.state.is_wallet_connected}
                        handleConnection={this.handleConnection}
                        handleConnectionWalletConnect={
                            this.handleConnectionWalletConnect
                        }
                        the_graph_result={this.state.the_graph_result_ETH_V2}
                        lp_id={LP_IDs_V2.weth[4]}
                        {...props}
                    />


                    {/*  
              <ReferralStats
                is_wallet_connected={this.state.is_wallet_connected}
                handleConnection={this.handleConnection}
                handleConnectionWalletConnect={
                  this.handleConnectionWalletConnect
                }
                staking_list={[
                  {
                    staking: window.constant_staking_30,
                    name: "Constant Staking 30",
                  },
                  {
                    staking: window.constant_staking_60,
                    name: "Constant Staking 60",
                  },
                  {
                    staking: window.constant_staking_90,
                    name: "Constant Staking 90",
                  },
                  {
                    staking: window.constant_staking_120,
                    name: "Constant Staking 120",
                  },
                ]}
                the_graph_result={this.state.the_graph_result}
                {...props}
              /> */}


                    {/*Farming New*/}

                    <StakingNew1
                        is_wallet_connected={this.state.is_wallet_connected}
                        handleConnection={this.handleConnection}
                        handleConnectionWalletConnect={
                            this.handleConnectionWalletConnect
                        }
                        the_graph_result={this.state.the_graph_result_ETH_V2}
                        lp_id={LP_IDs_V2.weth[0]}
                        {...props}
                    />


                    <StakingNew2
                        is_wallet_connected={this.state.is_wallet_connected}
                        handleConnection={this.handleConnection}
                        handleConnectionWalletConnect={
                            this.handleConnectionWalletConnect
                        }
                        the_graph_result={this.state.the_graph_result_ETH_V2}
                        lp_id={LP_IDs_V2.weth[1]}
                        {...props}
                    />


                    <StakingNew3
                        is_wallet_connected={this.state.is_wallet_connected}
                        handleConnection={this.handleConnection}
                        handleConnectionWalletConnect={
                            this.handleConnectionWalletConnect
                        }
                        the_graph_result={this.state.the_graph_result_ETH_V2}
                        lp_id={LP_IDs_V2.weth[2]}
                        {...props}
                    />


                    <StakingNew4
                        is_wallet_connected={this.state.is_wallet_connected}
                        handleConnection={this.handleConnection}
                        handleConnectionWalletConnect={
                            this.handleConnectionWalletConnect
                        }
                        the_graph_result={this.state.the_graph_result_ETH_V2}
                        lp_id={LP_IDs_V2.weth[3]}
                        {...props}
                    />


                    <StakingNew5
                        is_wallet_connected={this.state.is_wallet_connected}
                        handleConnection={this.handleConnection}
                        handleConnectionWalletConnect={
                            this.handleConnectionWalletConnect
                        }
                        the_graph_result={this.state.the_graph_result_ETH_V2}
                        lp_id={LP_IDs_V2.weth[4]}
                        {...props}
                    />



                    <StakingStatsNew
                        is_wallet_connected={this.state.is_wallet_connected}
                        handleConnection={this.handleConnection}
                        handleConnectionWalletConnect={
                            this.handleConnectionWalletConnect
                        }
                        the_graph_result={this.state.the_graph_result_ETH_V2}
                        {...props}
                    />

                </div>
            </div>
        );
    }
}

export default Test 

const BigNumber = window.BigNumber;
window.IS_CONNECTED = false
window.WALLET_TYPE = ''
window.the_graph_result = {}
const TOKEN_ADDRESS = "0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17"

const TOKENS_DISBURSED_PER_YEAR = [
	360_000,
	540_000,
	900_000,
	1_200_000,

	360_000,
	540_000,
	900_000,
	1_200_000,

	360_000,
	540_000,
	900_000,
	1_200_000,

	360_000,
	540_000,
	900_000,
	1_200_000,
]


const LP_IDs =
	{
		"eth": [
			"0xba7872534a6c9097d805d8bee97e030f4e372e54-0xa7d6f5fa9b0be0e98b3b40e6ac884e53f2f9460e",
			"0xba7872534a6c9097d805d8bee97e030f4e372e54-0x0b0a544ae6131801522e3ac1fbac6d311094c94c",
			"0xba7872534a6c9097d805d8bee97e030f4e372e54-0x16caad63bdfc3ec4a2850336b28efe17e802b896",
			"0xba7872534a6c9097d805d8bee97e030f4e372e54-0x512ff8739d39e55d75d80046921e7de20c3e9bff",
		],
		"wbtc": [
			"0x44b77e9ce8a20160290fcbaa44196744f354c1b7-0xef71de5cb40f7985feb92aa49d8e3e84063af3bb",
			"0x44b77e9ce8a20160290fcbaa44196744f354c1b7-0x8b0e324eede360cab670a6ad12940736d74f701e",
			"0x44b77e9ce8a20160290fcbaa44196744f354c1b7-0x78e2da2eda6df49bae46e3b51528baf5c106e654",
			"0x44b77e9ce8a20160290fcbaa44196744f354c1b7-0x350f3fe979bfad4766298713c83b387c2d2d7a7a",
		],
		"usdt": [
			"0x76911e11fddb742d75b83c9e1f611f48f19234e4-0x4a76fc15d3fbf3855127ec5da8aaf02de7ca06b3",
			"0x76911e11fddb742d75b83c9e1f611f48f19234e4-0xf4abc60a08b546fa879508f4261eb4400b55099d",
			"0x76911e11fddb742d75b83c9e1f611f48f19234e4-0x13f421aa823f7d90730812a33f8cac8656e47dfa",
			"0x76911e11fddb742d75b83c9e1f611f48f19234e4-0x86690bbe7a9683a8bad4812c2e816fd17bc9715c",
		],
		"usdc": [
			"0xabd9c284116b2e757e3d4f6e36c5050aead24e0c-0x2b5d7a865a3888836d15d69dccbad682663dcdbb",
			"0xabd9c284116b2e757e3d4f6e36c5050aead24e0c-0xa52250f98293c17c894d58cf4f78c925dc8955d0",
			"0xabd9c284116b2e757e3d4f6e36c5050aead24e0c-0x924becc8f4059987e4bc4b741b7c354ff52c25e4",
			"0xabd9c284116b2e757e3d4f6e36c5050aead24e0c-0xbe528593781988974d83c2655cba4c45fc75c033",
		]
}

const LP_ID_LIST = Object.keys(LP_IDs).map(key => LP_IDs[key]).flat()
const TOKENS_DISBURSED_PER_YEAR_BY_LP_ID = {}
LP_ID_LIST.forEach((lp_id, i) => TOKENS_DISBURSED_PER_YEAR_BY_LP_ID[lp_id] = TOKENS_DISBURSED_PER_YEAR[i])
const VAULT_ADDRESSES_LIST = LP_ID_LIST.map(id => id.split('-')[1])

window.LP_ID_LIST = LP_ID_LIST


// ALL THE ADDRESSES IN CONFIG MUST BE LOWERCASE
window.config = {
  weth_address: "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7", // LOWERCASE! avax
  weth2_address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", // ethereum
  // WBNB !! weth_address: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c', // LOWERCASE!

  infura_endpoint:
        "https://mainnet.infura.io/v3/94608dc6ddba490697ec4f9b723b586e",
    bsc_endpoint: "https://bsc-dataseed.binance.org/",
    avax_endpoint: "https://api.avax.network/ext/bc/C/rpc",


  platform_token_address: "0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17",
  locker_address: "0x4c695f6198cd4e56efcbf750d0b8961d28885f57",
  lockereth_address: "0x0c5d9AA95329517918AA7b82BfDa25d60446E1ac",

  subscription_address: "0xba4b2bab726f645677681ddc74b29543d10b28af",
  subscriptioneth_address: "0x943023d8e0f591C08a0E2B922452a7Dc37173C9b",
  ZERO_ADDRESS: "0x0000000000000000000000000000000000000000",
  MAX_LOCKS_TO_LOAD_PER_CALL: 10,
  pangolin_router_address: "0xE54Ca86531e17Ef3616d22Ca28b0D458b6C89106",
  pancakeswap_router_address: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
  uniswap_router_address: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",

  BUSD_address: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
  USDCe_address: "0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664",
  USDC_address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",

  reward_token_idyp_address: "0xbd100d061e120b2c67a24453cf6368e63f1be056",

  api_baseurl: "https://app-tools-avax.dyp.finance",
  apieth_baseurl: "https://app-tools.dyp.finance",
  subgraph_url:
    "https://graphiql-avax.dyp.finance/subgraphs/name/dasconnor/pangolin-dex",
  subgrapheth_url:
    "https://graphiql.dyp.finance/subgraphs/name/davekaj/uniswap",
  subgraphGraphEth: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
  subgraphGraphAvax: "https://api.thegraph.com/subgraphs/name/dasconnor/pangolin-dex",
  indexing_status_endpoint: "https://graph-node-avax.dyp.finance/graphql",
  indexing_status_endpointeth: "https://graph-node.dyp.finance/graphql",

  farm_api: "https://farm-info.dyp.finance",

  metamask_message: "I want to login, let me in!",
  metamask_message2: "I want to login to DYP TOOLS, let me in!",
  metamask_admin_account: "0x471ad9812b2537ffc66eba4d474cc55c32dec4f8",

  submission_form_link: "https://forms.gle/SFX1DyUh8TcNeysz6",

  // lowercase base tokens on uniswap
  // order matters!
  base_tokens: [
    "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7", // wavax
    "0xd586e7f844cea2f87f50152665bcbc2c279d8d70", //dai.e
    "0xc7198437980c041c805a1edcba50c1ce5db95118", //usdt.e
  ],

  baseEth_tokens: [
    "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", // usdc
    "0xdac17f958d2ee523a2206206994597c13d831ec7", // usdt
    "0x6b175474e89094c44da98b954eedeac495271d0f", // dai
    "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", // weth
    "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599", // wbtc
  ],

  // add supported subscription tokens here, lowercase
  // THESE TOKENS MUST HAVE BEEN ALREADY ADDED TO SMART CONTRACT!
  subscription_tokens: {
    "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7": {
      symbol: "WAVAX",
      decimals: 18,
    },
    "0x60781c2586d68229fde47564546784ab3faca982": {
      symbol: "PNG",
      decimals: 18,
    },
    "0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab": {
      symbol: "WETH.e",
      decimals: 18,
    },
    "0xc7198437980c041c805a1edcba50c1ce5db95118": {
      symbol: "USDT.e",
      decimals: 6,
    },
    "0xd586e7f844cea2f87f50152665bcbc2c279d8d70": {
      symbol: "DAI.e",
      decimals: 18,
    },
  },

  // add supported subscription tokens here, lowercase
  // THESE TOKENS MUST HAVE BEEN ALREADY ADDED TO SMART CONTRACT!
  subscriptioneth_tokens: {
    "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2": {
      symbol: "WETH",
      decimals: 18,
    },
    "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599": {
      symbol: "WBTC",
      decimals: 8,
    },
    "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": {
      symbol: "USDC",
      decimals: 6,
    },
    "0xdac17f958d2ee523a2206206994597c13d831ec7": {
      symbol: "USDT",
      decimals: 6,
    },
    "0x6b175474e89094c44da98b954eedeac495271d0f": {
      symbol: "DAI",
      decimals: 18,
    },
  },

  automated_trust_scores: {
    perfect_scoring: {
      // minimum numbers for 100% scores
      tx_no: 2000,
      lp_holder_no: 250,
      daily_volume_usd: 10000,
      liquidity_usd: 50000,
    },
    weights: {
      // sum of all weights must be 1, 1 = 100%
      tx_no: 0.1,
      lp_holder_no: 0.2,
      daily_volume_usd: 0.2,
      liquidity_usd: 0.2,
      information: 0.3,
    },
    display_order: [
      "information",
      "liquidity_usd",
      "daily_volume_usd",
      "lp_holder_no",
      "tx_no",
    ],
    display_names: {
      information: "Information",
      liquidity_usd: "Liquidity",
      daily_volume_usd: "Daily Volume",
      lp_holder_no: "LP Holders",
      tx_no: "Transactions",
    },
  },
};

window.infuraWeb3 = new Web3(window.config.infura_endpoint);
window.bscWeb3 = new Web3(window.config.bsc_endpoint);
window.avaxWeb3 = new Web3(window.config.avax_endpoint);
window.reward_token = new TOKEN("REWARD_TOKEN")
// window.config_eth = {
// 	weth_address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // LOWERCASE!
// 	platform_token_address: '0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17',
// 	locker_address: '0x0c5d9AA95329517918AA7b82BfDa25d60446E1ac',
//
// 	subscription_address: '0x943023d8e0f591C08a0E2B922452a7Dc37173C9b',
// 	ZERO_ADDRESS: '0x0000000000000000000000000000000000000000',
// 	MAX_LOCKS_TO_LOAD_PER_CALL: 10,
//
// 	api_baseurl: 'https://app-tools.dyp.finance',
// 	subgraph_url: 'https://graphiql.dyp.finance/subgraphs/name/davekaj/uniswap',
// 	indexing_status_endpoint: 'https://graph-node.dyp.finance/graphql',
// 	farm_api: 'https://farm-info.dyp.finance',
//
// 	metamask_message: "I want to login, let me in!",
// 	metamask_admin_account: "0x471AD9812B2537Ffc66EbA4d474cC55c32DEc4F8",
//
// 	submission_form_link: 'https://docs.google.com/forms/d/e/1FAIpQLSdstsJBKnWuxCt9uqd2saC7AaRVSpuPtPdoTRmqdzpSdk14HA/viewform?usp=pp_url',
//
// 	// lowercase base tokens on uniswap
// 	// order matters!
// 	base_tokens: [
// 		'0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', // usdc
// 		'0xdac17f958d2ee523a2206206994597c13d831ec7', // usdt
// 		'0x6b175474e89094c44da98b954eedeac495271d0f', // dai
// 		'0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // weth
// 		'0x2260fac5e5542a773aa44fbcfedf7c193bc2c599' // wbtc
// 	],
//
// 	// add supported subscription tokens here, lowercase
// 	// THESE TOKENS MUST HAVE BEEN ALREADY ADDED TO SMART CONTRACT!
// 	subscription_tokens: {
// 		'0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2': {
// 			symbol: 'WETH', decimals: 18
// 		},
// 		'0x2260fac5e5542a773aa44fbcfedf7c193bc2c599': {
// 			symbol: 'WBTC', decimals: 8
// 		},
// 		'0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48': {
// 			symbol: 'USDC', decimals: 6
// 		},
// 		'0xdac17f958d2ee523a2206206994597c13d831ec7': {
// 			symbol: 'USDT', decimals: 6
// 		},
// 		'0x6b175474e89094c44da98b954eedeac495271d0f': {
// 			symbol: 'DAI', decimals: 18
// 		}
// 	},
//
// 	automated_trust_scores: {
// 		perfect_scoring: { // minimum numbers for 100% scores
// 			tx_no: 2000,
// 			lp_holder_no: 250,
// 			daily_volume_usd: 10000,
// 			liquidity_usd: 1000000
// 		},
// 		weights: { // sum of all weights must be 1, 1 = 100%
// 			tx_no: .1,
// 			lp_holder_no: .2,
// 			daily_volume_usd: .2,
// 			liquidity_usd: .2,
// 			information: .3
// 		},
// 		display_order: [
// 			"information",
// 			"liquidity_usd",
// 			"daily_volume_usd",
// 			"lp_holder_no",
// 			"tx_no",
// 		],
// 		display_names: {
// 			"information": "Information",
// 			"liquidity_usd": "Liquidity (Pool)",
// 			"daily_volume_usd": "Daily Volume USD",
// 			"lp_holder_no": "LP Holders",
// 			"tx_no": "Transactions",
// 		}
// 	}
// }

// lowercase coingecko IDs by contract address for basetokens
window.tokenCG = {
  "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984": "uniswap",
  "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": "usd-coin",
};

//window.UNISWAP_PAIR_ABI = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount0Out","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1Out","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Swap","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint112","name":"reserve0","type":"uint112"},{"indexed":false,"internalType":"uint112","name":"reserve1","type":"uint112"}],"name":"Sync","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MINIMUM_LIQUIDITY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"burn","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint112","name":"_reserve0","type":"uint112"},{"internalType":"uint112","name":"_reserve1","type":"uint112"},{"internalType":"uint32","name":"_blockTimestampLast","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_token0","type":"address"},{"internalType":"address","name":"_token1","type":"address"}],"name":"initialize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"kLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"mint","outputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"price0CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"price1CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"skim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount0Out","type":"uint256"},{"internalType":"uint256","name":"amount1Out","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"swap","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"sync","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]
//window.LOCKER_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"unlockTimestamp","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"platformTokensLocked","type":"uint256"},{"indexed":false,"internalType":"bool","name":"claimed","type":"bool"}],"name":"Locked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"unlockTimestamp","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"platformTokensLocked","type":"uint256"},{"indexed":false,"internalType":"bool","name":"claimed","type":"bool"}],"name":"Unlocked","type":"event"},{"inputs":[],"name":"MAX_LOCK_DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MINIMUM_BASETOKEN_PERCENT_ETH_X_100","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ONE_HUNDRED_X_100","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PLATFORM_TOKEN","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SLIPPAGE_TOLERANCE_X_100","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"baseToken","type":"address"}],"name":"addBaseToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimEther","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"claimExtraTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"lockId","type":"uint256"}],"name":"claimUnlocked","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"pair","type":"address"},{"internalType":"address","name":"baseToken","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"unlockTimestamp","type":"uint256"}],"name":"createLock","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"startIndex","type":"uint256"},{"internalType":"uint256","name":"endIndex","type":"uint256"}],"name":"getActiveLockIds","outputs":[{"internalType":"uint256[]","name":"result","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"startIndex","type":"uint256"},{"internalType":"uint256","name":"endIndex","type":"uint256"}],"name":"getActiveLockIdsByRecipient","outputs":[{"internalType":"uint256[]","name":"result","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"startIndex","type":"uint256"},{"internalType":"uint256","name":"endIndex","type":"uint256"}],"name":"getActiveLockIdsByToken","outputs":[{"internalType":"uint256[]","name":"result","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getActiveLockIdsLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"}],"name":"getActiveLockIdsLengthByRecipient","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"getActiveLockIdsLengthByToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"startIndex","type":"uint256"},{"internalType":"uint256","name":"endIndex","type":"uint256"}],"name":"getBaseTokens","outputs":[{"internalType":"address[]","name":"result","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBaseTokensLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"startIndex","type":"uint256"},{"internalType":"uint256","name":"endIndex","type":"uint256"}],"name":"getInactiveLockIds","outputs":[{"internalType":"uint256[]","name":"result","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"startIndex","type":"uint256"},{"internalType":"uint256","name":"endIndex","type":"uint256"}],"name":"getInactiveLockIdsByRecipient","outputs":[{"internalType":"uint256[]","name":"result","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"startIndex","type":"uint256"},{"internalType":"uint256","name":"endIndex","type":"uint256"}],"name":"getInactiveLockIdsByToken","outputs":[{"internalType":"uint256[]","name":"result","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getInactiveLockIdsLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"}],"name":"getInactiveLockIdsLengthByRecipient","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"getInactiveLockIdsLengthByToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getLockById","outputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"unlockTimestamp","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"bool","name":"claimed","type":"bool"},{"internalType":"uint256","name":"platformTokensLocked","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"startIndex","type":"uint256"},{"internalType":"uint256","name":"endIndex","type":"uint256"}],"name":"getLockedTokens","outputs":[{"internalType":"address[]","name":"tokens","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getLockedTokensLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"ids","type":"uint256[]"}],"name":"getLocksByIds","outputs":[{"internalType":"uint256[]","name":"_ids","type":"uint256[]"},{"internalType":"address[]","name":"tokens","type":"address[]"},{"internalType":"uint256[]","name":"unlockTimestamps","type":"uint256[]"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"},{"internalType":"address[]","name":"recipients","type":"address[]"},{"internalType":"bool[]","name":"claimeds","type":"bool[]"},{"internalType":"uint256[]","name":"platformTokensLockeds","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"pair","type":"address"},{"internalType":"address","name":"baseToken","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"getMinLockCreationFeeInWei","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"tokens","type":"address[]"}],"name":"getTokensBalances","outputs":[{"internalType":"uint256[]","name":"balances","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"locks","outputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"unlockTimestamp","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"bool","name":"claimed","type":"bool"},{"internalType":"uint256","name":"platformTokensLocked","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"locksLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"baseToken","type":"address"}],"name":"removeBaseToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"tokenBalances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"uniswapRouterV2","outputs":[{"internalType":"contract IUniswapV2Router02","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}]

window.ERC20_ABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_from",
        type: "address",
      },
      { indexed: true, internalType: "address", name: "_to", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "acceptOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_owner", type: "address" },
      { internalType: "address", name: "_spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "remaining", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_spender", type: "address" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "success", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "balance", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address payable", name: "_newOwner", type: "address" },
    ],
    name: "changeOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_to", type: "address" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "success", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_from", type: "address" },
      { internalType: "address", name: "_to", type: "address" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "success", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  { stateMutability: "payable", type: "receive" },
];

window.UNISWAP_PAIR_ABI = [
  {
    type: "constructor",
    stateMutability: "nonpayable",
    payable: false,
    inputs: [],
  },
  {
    type: "event",
    name: "Approval",
    inputs: [
      {
        type: "address",
        name: "owner",
        internalType: "address",
        indexed: true,
      },
      {
        type: "address",
        name: "spender",
        internalType: "address",
        indexed: true,
      },
      {
        type: "uint256",
        name: "value",
        internalType: "uint256",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Burn",
    inputs: [
      {
        type: "address",
        name: "sender",
        internalType: "address",
        indexed: true,
      },
      {
        type: "uint256",
        name: "amount0",
        internalType: "uint256",
        indexed: false,
      },
      {
        type: "uint256",
        name: "amount1",
        internalType: "uint256",
        indexed: false,
      },
      { type: "address", name: "to", internalType: "address", indexed: true },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Mint",
    inputs: [
      {
        type: "address",
        name: "sender",
        internalType: "address",
        indexed: true,
      },
      {
        type: "uint256",
        name: "amount0",
        internalType: "uint256",
        indexed: false,
      },
      {
        type: "uint256",
        name: "amount1",
        internalType: "uint256",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Swap",
    inputs: [
      {
        type: "address",
        name: "sender",
        internalType: "address",
        indexed: true,
      },
      {
        type: "uint256",
        name: "amount0In",
        internalType: "uint256",
        indexed: false,
      },
      {
        type: "uint256",
        name: "amount1In",
        internalType: "uint256",
        indexed: false,
      },
      {
        type: "uint256",
        name: "amount0Out",
        internalType: "uint256",
        indexed: false,
      },
      {
        type: "uint256",
        name: "amount1Out",
        internalType: "uint256",
        indexed: false,
      },
      { type: "address", name: "to", internalType: "address", indexed: true },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Sync",
    inputs: [
      {
        type: "uint112",
        name: "reserve0",
        internalType: "uint112",
        indexed: false,
      },
      {
        type: "uint112",
        name: "reserve1",
        internalType: "uint112",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Transfer",
    inputs: [
      { type: "address", name: "from", internalType: "address", indexed: true },
      { type: "address", name: "to", internalType: "address", indexed: true },
      {
        type: "uint256",
        name: "value",
        internalType: "uint256",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "function",
    stateMutability: "view",
    payable: false,
    outputs: [{ type: "bytes32", name: "", internalType: "bytes32" }],
    name: "DOMAIN_SEPARATOR",
    inputs: [],
    constant: true,
  },
  {
    type: "function",
    stateMutability: "view",
    payable: false,
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "MINIMUM_LIQUIDITY",
    inputs: [],
    constant: true,
  },
  {
    type: "function",
    stateMutability: "view",
    payable: false,
    outputs: [{ type: "bytes32", name: "", internalType: "bytes32" }],
    name: "PERMIT_TYPEHASH",
    inputs: [],
    constant: true,
  },
  {
    type: "function",
    stateMutability: "view",
    payable: false,
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "allowance",
    inputs: [
      { type: "address", name: "", internalType: "address" },
      { type: "address", name: "", internalType: "address" },
    ],
    constant: true,
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    payable: false,
    outputs: [{ type: "bool", name: "", internalType: "bool" }],
    name: "approve",
    inputs: [
      { type: "address", name: "spender", internalType: "address" },
      { type: "uint256", name: "value", internalType: "uint256" },
    ],
    constant: false,
  },
  {
    type: "function",
    stateMutability: "view",
    payable: false,
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "balanceOf",
    inputs: [{ type: "address", name: "", internalType: "address" }],
    constant: true,
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    payable: false,
    outputs: [
      { type: "uint256", name: "amount0", internalType: "uint256" },
      { type: "uint256", name: "amount1", internalType: "uint256" },
    ],
    name: "burn",
    inputs: [{ type: "address", name: "to", internalType: "address" }],
    constant: false,
  },
  {
    type: "function",
    stateMutability: "view",
    payable: false,
    outputs: [{ type: "uint8", name: "", internalType: "uint8" }],
    name: "decimals",
    inputs: [],
    constant: true,
  },
  {
    type: "function",
    stateMutability: "view",
    payable: false,
    outputs: [{ type: "address", name: "", internalType: "address" }],
    name: "factory",
    inputs: [],
    constant: true,
  },
  {
    type: "function",
    stateMutability: "view",
    payable: false,
    outputs: [
      { type: "uint112", name: "_reserve0", internalType: "uint112" },
      { type: "uint112", name: "_reserve1", internalType: "uint112" },
      { type: "uint32", name: "_blockTimestampLast", internalType: "uint32" },
    ],
    name: "getReserves",
    inputs: [],
    constant: true,
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    payable: false,
    outputs: [],
    name: "initialize",
    inputs: [
      { type: "address", name: "_token0", internalType: "address" },
      { type: "address", name: "_token1", internalType: "address" },
    ],
    constant: false,
  },
  {
    type: "function",
    stateMutability: "view",
    payable: false,
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "kLast",
    inputs: [],
    constant: true,
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    payable: false,
    outputs: [{ type: "uint256", name: "liquidity", internalType: "uint256" }],
    name: "mint",
    inputs: [{ type: "address", name: "to", internalType: "address" }],
    constant: false,
  },
  {
    type: "function",
    stateMutability: "view",
    payable: false,
    outputs: [{ type: "string", name: "", internalType: "string" }],
    name: "name",
    inputs: [],
    constant: true,
  },
  {
    type: "function",
    stateMutability: "view",
    payable: false,
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "nonces",
    inputs: [{ type: "address", name: "", internalType: "address" }],
    constant: true,
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    payable: false,
    outputs: [],
    name: "permit",
    inputs: [
      { type: "address", name: "owner", internalType: "address" },
      { type: "address", name: "spender", internalType: "address" },
      { type: "uint256", name: "value", internalType: "uint256" },
      { type: "uint256", name: "deadline", internalType: "uint256" },
      { type: "uint8", name: "v", internalType: "uint8" },
      { type: "bytes32", name: "r", internalType: "bytes32" },
      { type: "bytes32", name: "s", internalType: "bytes32" },
    ],
    constant: false,
  },
  {
    type: "function",
    stateMutability: "view",
    payable: false,
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "price0CumulativeLast",
    inputs: [],
    constant: true,
  },
  {
    type: "function",
    stateMutability: "view",
    payable: false,
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "price1CumulativeLast",
    inputs: [],
    constant: true,
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    payable: false,
    outputs: [],
    name: "skim",
    inputs: [{ type: "address", name: "to", internalType: "address" }],
    constant: false,
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    payable: false,
    outputs: [],
    name: "swap",
    inputs: [
      { type: "uint256", name: "amount0Out", internalType: "uint256" },
      { type: "uint256", name: "amount1Out", internalType: "uint256" },
      { type: "address", name: "to", internalType: "address" },
      { type: "bytes", name: "data", internalType: "bytes" },
    ],
    constant: false,
  },
  {
    type: "function",
    stateMutability: "view",
    payable: false,
    outputs: [{ type: "string", name: "", internalType: "string" }],
    name: "symbol",
    inputs: [],
    constant: true,
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    payable: false,
    outputs: [],
    name: "sync",
    inputs: [],
    constant: false,
  },
  {
    type: "function",
    stateMutability: "view",
    payable: false,
    outputs: [{ type: "address", name: "", internalType: "address" }],
    name: "token0",
    inputs: [],
    constant: true,
  },
  {
    type: "function",
    stateMutability: "view",
    payable: false,
    outputs: [{ type: "address", name: "", internalType: "address" }],
    name: "token1",
    inputs: [],
    constant: true,
  },
  {
    type: "function",
    stateMutability: "view",
    payable: false,
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "totalSupply",
    inputs: [],
    constant: true,
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    payable: false,
    outputs: [{ type: "bool", name: "", internalType: "bool" }],
    name: "transfer",
    inputs: [
      { type: "address", name: "to", internalType: "address" },
      { type: "uint256", name: "value", internalType: "uint256" },
    ],
    constant: false,
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    payable: false,
    outputs: [{ type: "bool", name: "", internalType: "bool" }],
    name: "transferFrom",
    inputs: [
      { type: "address", name: "from", internalType: "address" },
      { type: "address", name: "to", internalType: "address" },
      { type: "uint256", name: "value", internalType: "uint256" },
    ],
    constant: false,
  },
];

window.UNISWAP_PAIRETH_ABI = [
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount0",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount1",
        type: "uint256",
      },
      { indexed: true, internalType: "address", name: "to", type: "address" },
    ],
    name: "Burn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount0",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount1",
        type: "uint256",
      },
    ],
    name: "Mint",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount0In",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount1In",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount0Out",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount1Out",
        type: "uint256",
      },
      { indexed: true, internalType: "address", name: "to", type: "address" },
    ],
    name: "Swap",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint112",
        name: "reserve0",
        type: "uint112",
      },
      {
        indexed: false,
        internalType: "uint112",
        name: "reserve1",
        type: "uint112",
      },
    ],
    name: "Sync",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    constant: true,
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "MINIMUM_LIQUIDITY",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "PERMIT_TYPEHASH",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ internalType: "address", name: "to", type: "address" }],
    name: "burn",
    outputs: [
      { internalType: "uint256", name: "amount0", type: "uint256" },
      { internalType: "uint256", name: "amount1", type: "uint256" },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "factory",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getReserves",
    outputs: [
      { internalType: "uint112", name: "_reserve0", type: "uint112" },
      { internalType: "uint112", name: "_reserve1", type: "uint112" },
      { internalType: "uint32", name: "_blockTimestampLast", type: "uint32" },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "_token0", type: "address" },
      { internalType: "address", name: "_token1", type: "address" },
    ],
    name: "initialize",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "kLast",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ internalType: "address", name: "to", type: "address" }],
    name: "mint",
    outputs: [{ internalType: "uint256", name: "liquidity", type: "uint256" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "nonces",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" },
    ],
    name: "permit",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "price0CumulativeLast",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "price1CumulativeLast",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ internalType: "address", name: "to", type: "address" }],
    name: "skim",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "uint256", name: "amount0Out", type: "uint256" },
      { internalType: "uint256", name: "amount1Out", type: "uint256" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "bytes", name: "data", type: "bytes" },
    ],
    name: "swap",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "sync",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "token0",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "token1",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.LOCKER_ABI = [
  { type: "constructor", stateMutability: "nonpayable", inputs: [] },
  {
    type: "event",
    name: "Locked",
    inputs: [
      { type: "uint256", name: "id", internalType: "uint256", indexed: true },
      {
        type: "address",
        name: "token",
        internalType: "address",
        indexed: true,
      },
      {
        type: "address",
        name: "recipient",
        internalType: "address",
        indexed: true,
      },
      {
        type: "uint256",
        name: "amount",
        internalType: "uint256",
        indexed: false,
      },
      {
        type: "uint256",
        name: "unlockTimestamp",
        internalType: "uint256",
        indexed: false,
      },
      {
        type: "uint256",
        name: "platformTokensLocked",
        internalType: "uint256",
        indexed: false,
      },
      { type: "bool", name: "claimed", internalType: "bool", indexed: false },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        type: "address",
        name: "previousOwner",
        internalType: "address",
        indexed: true,
      },
      {
        type: "address",
        name: "newOwner",
        internalType: "address",
        indexed: true,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Unlocked",
    inputs: [
      { type: "uint256", name: "id", internalType: "uint256", indexed: true },
      {
        type: "address",
        name: "token",
        internalType: "address",
        indexed: true,
      },
      {
        type: "address",
        name: "recipient",
        internalType: "address",
        indexed: true,
      },
      {
        type: "uint256",
        name: "amount",
        internalType: "uint256",
        indexed: false,
      },
      {
        type: "uint256",
        name: "unlockTimestamp",
        internalType: "uint256",
        indexed: false,
      },
      {
        type: "uint256",
        name: "platformTokensLocked",
        internalType: "uint256",
        indexed: false,
      },
      { type: "bool", name: "claimed", internalType: "bool", indexed: false },
    ],
    anonymous: false,
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "MAX_LOCK_DURATION",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "MINIMUM_BASETOKEN_PERCENT_ETH_X_100",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "ONE_HUNDRED_X_100",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "address", name: "", internalType: "address" }],
    name: "PLATFORM_TOKEN",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "SLIPPAGE_TOLERANCE_X_100",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "addBaseToken",
    inputs: [{ type: "address", name: "baseToken", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "claimEther",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "claimExtraTokens",
    inputs: [{ type: "address", name: "token", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "claimUnlocked",
    inputs: [{ type: "uint256", name: "lockId", internalType: "uint256" }],
  },
  {
    type: "function",
    stateMutability: "payable",
    outputs: [],
    name: "createLock",
    inputs: [
      { type: "address", name: "pair", internalType: "address" },
      { type: "address", name: "baseToken", internalType: "address" },
      { type: "uint256", name: "amount", internalType: "uint256" },
      { type: "uint256", name: "unlockTimestamp", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256[]", name: "result", internalType: "uint256[]" }],
    name: "getActiveLockIds",
    inputs: [
      { type: "uint256", name: "startIndex", internalType: "uint256" },
      { type: "uint256", name: "endIndex", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256[]", name: "result", internalType: "uint256[]" }],
    name: "getActiveLockIdsByRecipient",
    inputs: [
      { type: "address", name: "recipient", internalType: "address" },
      { type: "uint256", name: "startIndex", internalType: "uint256" },
      { type: "uint256", name: "endIndex", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256[]", name: "result", internalType: "uint256[]" }],
    name: "getActiveLockIdsByToken",
    inputs: [
      { type: "address", name: "token", internalType: "address" },
      { type: "uint256", name: "startIndex", internalType: "uint256" },
      { type: "uint256", name: "endIndex", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "getActiveLockIdsLength",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "getActiveLockIdsLengthByRecipient",
    inputs: [{ type: "address", name: "recipient", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "getActiveLockIdsLengthByToken",
    inputs: [{ type: "address", name: "token", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "address[]", name: "result", internalType: "address[]" }],
    name: "getBaseTokens",
    inputs: [
      { type: "uint256", name: "startIndex", internalType: "uint256" },
      { type: "uint256", name: "endIndex", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "getBaseTokensLength",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256[]", name: "result", internalType: "uint256[]" }],
    name: "getInactiveLockIds",
    inputs: [
      { type: "uint256", name: "startIndex", internalType: "uint256" },
      { type: "uint256", name: "endIndex", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256[]", name: "result", internalType: "uint256[]" }],
    name: "getInactiveLockIdsByRecipient",
    inputs: [
      { type: "address", name: "recipient", internalType: "address" },
      { type: "uint256", name: "startIndex", internalType: "uint256" },
      { type: "uint256", name: "endIndex", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256[]", name: "result", internalType: "uint256[]" }],
    name: "getInactiveLockIdsByToken",
    inputs: [
      { type: "address", name: "token", internalType: "address" },
      { type: "uint256", name: "startIndex", internalType: "uint256" },
      { type: "uint256", name: "endIndex", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "getInactiveLockIdsLength",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "getInactiveLockIdsLengthByRecipient",
    inputs: [{ type: "address", name: "recipient", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "getInactiveLockIdsLengthByToken",
    inputs: [{ type: "address", name: "token", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      { type: "address", name: "token", internalType: "address" },
      { type: "uint256", name: "unlockTimestamp", internalType: "uint256" },
      { type: "uint256", name: "amount", internalType: "uint256" },
      { type: "address", name: "recipient", internalType: "address" },
      { type: "bool", name: "claimed", internalType: "bool" },
      {
        type: "uint256",
        name: "platformTokensLocked",
        internalType: "uint256",
      },
    ],
    name: "getLockById",
    inputs: [{ type: "uint256", name: "id", internalType: "uint256" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "address[]", name: "tokens", internalType: "address[]" }],
    name: "getLockedTokens",
    inputs: [
      { type: "uint256", name: "startIndex", internalType: "uint256" },
      { type: "uint256", name: "endIndex", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "getLockedTokensLength",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      { type: "uint256[]", name: "_ids", internalType: "uint256[]" },
      { type: "address[]", name: "tokens", internalType: "address[]" },
      {
        type: "uint256[]",
        name: "unlockTimestamps",
        internalType: "uint256[]",
      },
      { type: "uint256[]", name: "amounts", internalType: "uint256[]" },
      { type: "address[]", name: "recipients", internalType: "address[]" },
      { type: "bool[]", name: "claimeds", internalType: "bool[]" },
      {
        type: "uint256[]",
        name: "platformTokensLockeds",
        internalType: "uint256[]",
      },
    ],
    name: "getLocksByIds",
    inputs: [{ type: "uint256[]", name: "ids", internalType: "uint256[]" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "getMinLockCreationFeeInWei",
    inputs: [
      { type: "address", name: "pair", internalType: "address" },
      { type: "address", name: "baseToken", internalType: "address" },
      { type: "uint256", name: "amount", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      { type: "uint256[]", name: "balances", internalType: "uint256[]" },
    ],
    name: "getTokensBalances",
    inputs: [{ type: "address[]", name: "tokens", internalType: "address[]" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      { type: "address", name: "token", internalType: "address" },
      { type: "uint256", name: "unlockTimestamp", internalType: "uint256" },
      { type: "uint256", name: "amount", internalType: "uint256" },
      { type: "address", name: "recipient", internalType: "address" },
      { type: "bool", name: "claimed", internalType: "bool" },
      {
        type: "uint256",
        name: "platformTokensLocked",
        internalType: "uint256",
      },
    ],
    name: "locks",
    inputs: [{ type: "uint256", name: "", internalType: "uint256" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "locksLength",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "address", name: "", internalType: "address" }],
    name: "owner",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      { type: "address", name: "", internalType: "contract IPangolinRouter02" },
    ],
    name: "pangolinRouter",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "removeBaseToken",
    inputs: [{ type: "address", name: "baseToken", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "renounceOwnership",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "tokenBalances",
    inputs: [{ type: "address", name: "", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "transferOwnership",
    inputs: [{ type: "address", name: "newOwner", internalType: "address" }],
  },
  { type: "receive", stateMutability: "payable" },
];

window.LOCKERETH_ABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "id", type: "uint256" },
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "unlockTimestamp",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "platformTokensLocked",
        type: "uint256",
      },
      { indexed: false, internalType: "bool", name: "claimed", type: "bool" },
    ],
    name: "Locked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "id", type: "uint256" },
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "unlockTimestamp",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "platformTokensLocked",
        type: "uint256",
      },
      { indexed: false, internalType: "bool", name: "claimed", type: "bool" },
    ],
    name: "Unlocked",
    type: "event",
  },
  {
    inputs: [],
    name: "MAX_LOCK_DURATION",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MINIMUM_BASETOKEN_PERCENT_ETH_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ONE_HUNDRED_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PLATFORM_TOKEN",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SLIPPAGE_TOLERANCE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "baseToken", type: "address" }],
    name: "addBaseToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "claimEther",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "token", type: "address" }],
    name: "claimExtraTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "lockId", type: "uint256" }],
    name: "claimUnlocked",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "pair", type: "address" },
      { internalType: "address", name: "baseToken", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "uint256", name: "unlockTimestamp", type: "uint256" },
    ],
    name: "createLock",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "startIndex", type: "uint256" },
      { internalType: "uint256", name: "endIndex", type: "uint256" },
    ],
    name: "getActiveLockIds",
    outputs: [{ internalType: "uint256[]", name: "result", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "startIndex", type: "uint256" },
      { internalType: "uint256", name: "endIndex", type: "uint256" },
    ],
    name: "getActiveLockIdsByRecipient",
    outputs: [{ internalType: "uint256[]", name: "result", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "startIndex", type: "uint256" },
      { internalType: "uint256", name: "endIndex", type: "uint256" },
    ],
    name: "getActiveLockIdsByToken",
    outputs: [{ internalType: "uint256[]", name: "result", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getActiveLockIdsLength",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "recipient", type: "address" }],
    name: "getActiveLockIdsLengthByRecipient",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "token", type: "address" }],
    name: "getActiveLockIdsLengthByToken",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "startIndex", type: "uint256" },
      { internalType: "uint256", name: "endIndex", type: "uint256" },
    ],
    name: "getBaseTokens",
    outputs: [{ internalType: "address[]", name: "result", type: "address[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBaseTokensLength",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "startIndex", type: "uint256" },
      { internalType: "uint256", name: "endIndex", type: "uint256" },
    ],
    name: "getInactiveLockIds",
    outputs: [{ internalType: "uint256[]", name: "result", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "startIndex", type: "uint256" },
      { internalType: "uint256", name: "endIndex", type: "uint256" },
    ],
    name: "getInactiveLockIdsByRecipient",
    outputs: [{ internalType: "uint256[]", name: "result", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "startIndex", type: "uint256" },
      { internalType: "uint256", name: "endIndex", type: "uint256" },
    ],
    name: "getInactiveLockIdsByToken",
    outputs: [{ internalType: "uint256[]", name: "result", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getInactiveLockIdsLength",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "recipient", type: "address" }],
    name: "getInactiveLockIdsLengthByRecipient",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "token", type: "address" }],
    name: "getInactiveLockIdsLengthByToken",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "id", type: "uint256" }],
    name: "getLockById",
    outputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "unlockTimestamp", type: "uint256" },
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "bool", name: "claimed", type: "bool" },
      {
        internalType: "uint256",
        name: "platformTokensLocked",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "startIndex", type: "uint256" },
      { internalType: "uint256", name: "endIndex", type: "uint256" },
    ],
    name: "getLockedTokens",
    outputs: [{ internalType: "address[]", name: "tokens", type: "address[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getLockedTokensLength",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256[]", name: "ids", type: "uint256[]" }],
    name: "getLocksByIds",
    outputs: [
      { internalType: "uint256[]", name: "_ids", type: "uint256[]" },
      { internalType: "address[]", name: "tokens", type: "address[]" },
      {
        internalType: "uint256[]",
        name: "unlockTimestamps",
        type: "uint256[]",
      },
      { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
      { internalType: "address[]", name: "recipients", type: "address[]" },
      { internalType: "bool[]", name: "claimeds", type: "bool[]" },
      {
        internalType: "uint256[]",
        name: "platformTokensLockeds",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "pair", type: "address" },
      { internalType: "address", name: "baseToken", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "getMinLockCreationFeeInWei",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address[]", name: "tokens", type: "address[]" }],
    name: "getTokensBalances",
    outputs: [
      { internalType: "uint256[]", name: "balances", type: "uint256[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "locks",
    outputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "unlockTimestamp", type: "uint256" },
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "bool", name: "claimed", type: "bool" },
      {
        internalType: "uint256",
        name: "platformTokensLocked",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "locksLength",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "baseToken", type: "address" }],
    name: "removeBaseToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "tokenBalances",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "uniswapRouterV2",
    outputs: [
      {
        internalType: "contract IUniswapV2Router02",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  { stateMutability: "payable", type: "receive" },
];

window.SUBSCRIPTION_ABI = [
  { type: "constructor", stateMutability: "nonpayable", inputs: [] },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        type: "address",
        name: "previousOwner",
        internalType: "address",
        indexed: true,
      },
      {
        type: "address",
        name: "newOwner",
        internalType: "address",
        indexed: true,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Subscribe",
    inputs: [
      {
        type: "address",
        name: "account",
        internalType: "address",
        indexed: true,
      },
      {
        type: "uint256",
        name: "platformTokenAmount",
        internalType: "uint256",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "SubscriptionFeeSet",
    inputs: [
      {
        type: "uint256",
        name: "amountDai",
        internalType: "uint256",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "SupportedTokenAdded",
    inputs: [
      {
        type: "address",
        name: "tokenAddress",
        internalType: "address",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "SupportedTokenRemoved",
    inputs: [
      {
        type: "address",
        name: "tokenAddress",
        internalType: "address",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Unsubscribe",
    inputs: [
      {
        type: "address",
        name: "account",
        internalType: "address",
        indexed: true,
      },
      {
        type: "uint256",
        name: "platformTokenAmount",
        internalType: "uint256",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "ONE_HUNDRED_X_100",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "SLIPPAGE_TOLERANCE_X_100",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "address", name: "", internalType: "address" }],
    name: "TRUSTED_DAI_ADDRESS",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "address", name: "", internalType: "address" }],
    name: "TRUSTED_PLATFORM_TOKEN_ADDRESS",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "addSupportedToken",
    inputs: [
      { type: "address", name: "tokenAddress", internalType: "address" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "getEstimatedTokenSubscriptionAmount",
    inputs: [
      { type: "address", name: "tokenAddress", internalType: "address" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "bool", name: "", internalType: "bool" }],
    name: "isTokenSupported",
    inputs: [{ type: "address", name: "", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "address", name: "", internalType: "address" }],
    name: "owner",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "removeSupportedToken",
    inputs: [
      { type: "address", name: "tokenAddress", internalType: "address" },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "renounceOwnership",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "setSubscriptionFee",
    inputs: [
      {
        type: "uint256",
        name: "newSubscriptionFeeInDai",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "subscribe",
    inputs: [
      { type: "address", name: "tokenAddress", internalType: "address" },
      { type: "uint256", name: "amount", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "subscriptionFeeInDai",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "subscriptionPlatformTokenAmount",
    inputs: [{ type: "address", name: "", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "transferOwnership",
    inputs: [{ type: "address", name: "newOwner", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      { type: "address", name: "", internalType: "contract IUniswapV2Router" },
    ],
    name: "uniswapRouterV2",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "unsubscribe",
    inputs: [],
  },
];
window.SUBSCRIPTIONETH_ABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "platformTokenAmount",
        type: "uint256",
      },
    ],
    name: "Subscribe",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amountDai",
        type: "uint256",
      },
    ],
    name: "SubscriptionFeeSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "SupportedTokenAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "SupportedTokenRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "platformTokenAmount",
        type: "uint256",
      },
    ],
    name: "Unsubscribe",
    type: "event",
  },
  {
    inputs: [],
    name: "ONE_HUNDRED_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SLIPPAGE_TOLERANCE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_DAI_ADDRESS",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_PLATFORM_TOKEN_ADDRESS",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
    ],
    name: "addSupportedToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
    ],
    name: "getEstimatedTokenSubscriptionAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "isTokenSupported",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
    ],
    name: "removeSupportedToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newSubscriptionFeeInDai",
        type: "uint256",
      },
    ],
    name: "setSubscriptionFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "subscribe",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "subscriptionFeeInDai",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "subscriptionPlatformTokenAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "uniswapRouterV2",
    outputs: [
      { internalType: "contract IUniswapV2Router", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "unsubscribe",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.PANGOLIN_ROUTER_ABI = [
  {
      type: "constructor",
      stateMutability: "nonpayable",
      inputs: [
          {type: "address", name: "_factory", internalType: "address"},
          {type: "address", name: "_WAVAX", internalType: "address"},
      ],
  },
  {
      type: "function",
      stateMutability: "view",
      outputs: [{type: "address", name: "", internalType: "address"}],
      name: "WAVAX",
      inputs: [],
  },
  {
      type: "function",
      stateMutability: "nonpayable",
      outputs: [
          {type: "uint256", name: "amountA", internalType: "uint256"},
          {type: "uint256", name: "amountB", internalType: "uint256"},
          {type: "uint256", name: "liquidity", internalType: "uint256"},
      ],
      name: "addLiquidity",
      inputs: [
          {type: "address", name: "tokenA", internalType: "address"},
          {type: "address", name: "tokenB", internalType: "address"},
          {type: "uint256", name: "amountADesired", internalType: "uint256"},
          {type: "uint256", name: "amountBDesired", internalType: "uint256"},
          {type: "uint256", name: "amountAMin", internalType: "uint256"},
          {type: "uint256", name: "amountBMin", internalType: "uint256"},
          {type: "address", name: "to", internalType: "address"},
          {type: "uint256", name: "deadline", internalType: "uint256"},
      ],
  },
  {
      type: "function",
      stateMutability: "payable",
      outputs: [
          {type: "uint256", name: "amountToken", internalType: "uint256"},
          {type: "uint256", name: "amountAVAX", internalType: "uint256"},
          {type: "uint256", name: "liquidity", internalType: "uint256"},
      ],
      name: "addLiquidityAVAX",
      inputs: [
          {type: "address", name: "token", internalType: "address"},
          {type: "uint256", name: "amountTokenDesired", internalType: "uint256"},
          {type: "uint256", name: "amountTokenMin", internalType: "uint256"},
          {type: "uint256", name: "amountAVAXMin", internalType: "uint256"},
          {type: "address", name: "to", internalType: "address"},
          {type: "uint256", name: "deadline", internalType: "uint256"},
      ],
  },
  {
      type: "function",
      stateMutability: "view",
      outputs: [{type: "address", name: "", internalType: "address"}],
      name: "factory",
      inputs: [],
  },
  {
      type: "function",
      stateMutability: "pure",
      outputs: [{type: "uint256", name: "amountIn", internalType: "uint256"}],
      name: "getAmountIn",
      inputs: [
          {type: "uint256", name: "amountOut", internalType: "uint256"},
          {type: "uint256", name: "reserveIn", internalType: "uint256"},
          {type: "uint256", name: "reserveOut", internalType: "uint256"},
      ],
  },
  {
      type: "function",
      stateMutability: "pure",
      outputs: [{type: "uint256", name: "amountOut", internalType: "uint256"}],
      name: "getAmountOut",
      inputs: [
          {type: "uint256", name: "amountIn", internalType: "uint256"},
          {type: "uint256", name: "reserveIn", internalType: "uint256"},
          {type: "uint256", name: "reserveOut", internalType: "uint256"},
      ],
  },
  {
      type: "function",
      stateMutability: "view",
      outputs: [
          {type: "uint256[]", name: "amounts", internalType: "uint256[]"},
      ],
      name: "getAmountsIn",
      inputs: [
          {type: "uint256", name: "amountOut", internalType: "uint256"},
          {type: "address[]", name: "path", internalType: "address[]"},
      ],
  },
  {
      type: "function",
      stateMutability: "view",
      outputs: [
          {type: "uint256[]", name: "amounts", internalType: "uint256[]"},
      ],
      name: "getAmountsOut",
      inputs: [
          {type: "uint256", name: "amountIn", internalType: "uint256"},
          {type: "address[]", name: "path", internalType: "address[]"},
      ],
  },
  {
      type: "function",
      stateMutability: "pure",
      outputs: [{type: "uint256", name: "amountB", internalType: "uint256"}],
      name: "quote",
      inputs: [
          {type: "uint256", name: "amountA", internalType: "uint256"},
          {type: "uint256", name: "reserveA", internalType: "uint256"},
          {type: "uint256", name: "reserveB", internalType: "uint256"},
      ],
  },
  {
      type: "function",
      stateMutability: "nonpayable",
      outputs: [
          {type: "uint256", name: "amountA", internalType: "uint256"},
          {type: "uint256", name: "amountB", internalType: "uint256"},
      ],
      name: "removeLiquidity",
      inputs: [
          {type: "address", name: "tokenA", internalType: "address"},
          {type: "address", name: "tokenB", internalType: "address"},
          {type: "uint256", name: "liquidity", internalType: "uint256"},
          {type: "uint256", name: "amountAMin", internalType: "uint256"},
          {type: "uint256", name: "amountBMin", internalType: "uint256"},
          {type: "address", name: "to", internalType: "address"},
          {type: "uint256", name: "deadline", internalType: "uint256"},
      ],
  },
  {
      type: "function",
      stateMutability: "nonpayable",
      outputs: [
          {type: "uint256", name: "amountToken", internalType: "uint256"},
          {type: "uint256", name: "amountAVAX", internalType: "uint256"},
      ],
      name: "removeLiquidityAVAX",
      inputs: [
          {type: "address", name: "token", internalType: "address"},
          {type: "uint256", name: "liquidity", internalType: "uint256"},
          {type: "uint256", name: "amountTokenMin", internalType: "uint256"},
          {type: "uint256", name: "amountAVAXMin", internalType: "uint256"},
          {type: "address", name: "to", internalType: "address"},
          {type: "uint256", name: "deadline", internalType: "uint256"},
      ],
  },
  {
      type: "function",
      stateMutability: "nonpayable",
      outputs: [{type: "uint256", name: "amountAVAX", internalType: "uint256"}],
      name: "removeLiquidityAVAXSupportingFeeOnTransferTokens",
      inputs: [
          {type: "address", name: "token", internalType: "address"},
          {type: "uint256", name: "liquidity", internalType: "uint256"},
          {type: "uint256", name: "amountTokenMin", internalType: "uint256"},
          {type: "uint256", name: "amountAVAXMin", internalType: "uint256"},
          {type: "address", name: "to", internalType: "address"},
          {type: "uint256", name: "deadline", internalType: "uint256"},
      ],
  },
  {
      type: "function",
      stateMutability: "nonpayable",
      outputs: [
          {type: "uint256", name: "amountToken", internalType: "uint256"},
          {type: "uint256", name: "amountAVAX", internalType: "uint256"},
      ],
      name: "removeLiquidityAVAXWithPermit",
      inputs: [
          {type: "address", name: "token", internalType: "address"},
          {type: "uint256", name: "liquidity", internalType: "uint256"},
          {type: "uint256", name: "amountTokenMin", internalType: "uint256"},
          {type: "uint256", name: "amountAVAXMin", internalType: "uint256"},
          {type: "address", name: "to", internalType: "address"},
          {type: "uint256", name: "deadline", internalType: "uint256"},
          {type: "bool", name: "approveMax", internalType: "bool"},
          {type: "uint8", name: "v", internalType: "uint8"},
          {type: "bytes32", name: "r", internalType: "bytes32"},
          {type: "bytes32", name: "s", internalType: "bytes32"},
      ],
  },
  {
      type: "function",
      stateMutability: "nonpayable",
      outputs: [{type: "uint256", name: "amountAVAX", internalType: "uint256"}],
      name: "removeLiquidityAVAXWithPermitSupportingFeeOnTransferTokens",
      inputs: [
          {type: "address", name: "token", internalType: "address"},
          {type: "uint256", name: "liquidity", internalType: "uint256"},
          {type: "uint256", name: "amountTokenMin", internalType: "uint256"},
          {type: "uint256", name: "amountAVAXMin", internalType: "uint256"},
          {type: "address", name: "to", internalType: "address"},
          {type: "uint256", name: "deadline", internalType: "uint256"},
          {type: "bool", name: "approveMax", internalType: "bool"},
          {type: "uint8", name: "v", internalType: "uint8"},
          {type: "bytes32", name: "r", internalType: "bytes32"},
          {type: "bytes32", name: "s", internalType: "bytes32"},
      ],
  },
  {
      type: "function",
      stateMutability: "nonpayable",
      outputs: [
          {type: "uint256", name: "amountA", internalType: "uint256"},
          {type: "uint256", name: "amountB", internalType: "uint256"},
      ],
      name: "removeLiquidityWithPermit",
      inputs: [
          {type: "address", name: "tokenA", internalType: "address"},
          {type: "address", name: "tokenB", internalType: "address"},
          {type: "uint256", name: "liquidity", internalType: "uint256"},
          {type: "uint256", name: "amountAMin", internalType: "uint256"},
          {type: "uint256", name: "amountBMin", internalType: "uint256"},
          {type: "address", name: "to", internalType: "address"},
          {type: "uint256", name: "deadline", internalType: "uint256"},
          {type: "bool", name: "approveMax", internalType: "bool"},
          {type: "uint8", name: "v", internalType: "uint8"},
          {type: "bytes32", name: "r", internalType: "bytes32"},
          {type: "bytes32", name: "s", internalType: "bytes32"},
      ],
  },
  {
      type: "function",
      stateMutability: "payable",
      outputs: [
          {type: "uint256[]", name: "amounts", internalType: "uint256[]"},
      ],
      name: "swapAVAXForExactTokens",
      inputs: [
          {type: "uint256", name: "amountOut", internalType: "uint256"},
          {type: "address[]", name: "path", internalType: "address[]"},
          {type: "address", name: "to", internalType: "address"},
          {type: "uint256", name: "deadline", internalType: "uint256"},
      ],
  },
  {
      type: "function",
      stateMutability: "payable",
      outputs: [
          {type: "uint256[]", name: "amounts", internalType: "uint256[]"},
      ],
      name: "swapExactAVAXForTokens",
      inputs: [
          {type: "uint256", name: "amountOutMin", internalType: "uint256"},
          {type: "address[]", name: "path", internalType: "address[]"},
          {type: "address", name: "to", internalType: "address"},
          {type: "uint256", name: "deadline", internalType: "uint256"},
      ],
  },
  {
      type: "function",
      stateMutability: "payable",
      outputs: [],
      name: "swapExactAVAXForTokensSupportingFeeOnTransferTokens",
      inputs: [
          {type: "uint256", name: "amountOutMin", internalType: "uint256"},
          {type: "address[]", name: "path", internalType: "address[]"},
          {type: "address", name: "to", internalType: "address"},
          {type: "uint256", name: "deadline", internalType: "uint256"},
      ],
  },
  {
      type: "function",
      stateMutability: "nonpayable",
      outputs: [
          {type: "uint256[]", name: "amounts", internalType: "uint256[]"},
      ],
      name: "swapExactTokensForAVAX",
      inputs: [
          {type: "uint256", name: "amountIn", internalType: "uint256"},
          {type: "uint256", name: "amountOutMin", internalType: "uint256"},
          {type: "address[]", name: "path", internalType: "address[]"},
          {type: "address", name: "to", internalType: "address"},
          {type: "uint256", name: "deadline", internalType: "uint256"},
      ],
  },
  {
      type: "function",
      stateMutability: "nonpayable",
      outputs: [],
      name: "swapExactTokensForAVAXSupportingFeeOnTransferTokens",
      inputs: [
          {type: "uint256", name: "amountIn", internalType: "uint256"},
          {type: "uint256", name: "amountOutMin", internalType: "uint256"},
          {type: "address[]", name: "path", internalType: "address[]"},
          {type: "address", name: "to", internalType: "address"},
          {type: "uint256", name: "deadline", internalType: "uint256"},
      ],
  },
  {
      type: "function",
      stateMutability: "nonpayable",
      outputs: [
          {type: "uint256[]", name: "amounts", internalType: "uint256[]"},
      ],
      name: "swapExactTokensForTokens",
      inputs: [
          {type: "uint256", name: "amountIn", internalType: "uint256"},
          {type: "uint256", name: "amountOutMin", internalType: "uint256"},
          {type: "address[]", name: "path", internalType: "address[]"},
          {type: "address", name: "to", internalType: "address"},
          {type: "uint256", name: "deadline", internalType: "uint256"},
      ],
  },
  {
      type: "function",
      stateMutability: "nonpayable",
      outputs: [],
      name: "swapExactTokensForTokensSupportingFeeOnTransferTokens",
      inputs: [
          {type: "uint256", name: "amountIn", internalType: "uint256"},
          {type: "uint256", name: "amountOutMin", internalType: "uint256"},
          {type: "address[]", name: "path", internalType: "address[]"},
          {type: "address", name: "to", internalType: "address"},
          {type: "uint256", name: "deadline", internalType: "uint256"},
      ],
  },
  {
      type: "function",
      stateMutability: "nonpayable",
      outputs: [
          {type: "uint256[]", name: "amounts", internalType: "uint256[]"},
      ],
      name: "swapTokensForExactAVAX",
      inputs: [
          {type: "uint256", name: "amountOut", internalType: "uint256"},
          {type: "uint256", name: "amountInMax", internalType: "uint256"},
          {type: "address[]", name: "path", internalType: "address[]"},
          {type: "address", name: "to", internalType: "address"},
          {type: "uint256", name: "deadline", internalType: "uint256"},
      ],
  },
  {
      type: "function",
      stateMutability: "nonpayable",
      outputs: [
          {type: "uint256[]", name: "amounts", internalType: "uint256[]"},
      ],
      name: "swapTokensForExactTokens",
      inputs: [
          {type: "uint256", name: "amountOut", internalType: "uint256"},
          {type: "uint256", name: "amountInMax", internalType: "uint256"},
          {type: "address[]", name: "path", internalType: "address[]"},
          {type: "address", name: "to", internalType: "address"},
          {type: "uint256", name: "deadline", internalType: "uint256"},
      ],
  },
  {type: "receive", stateMutability: "payable"},
];


window.UNISWAP_ROUTER_ABI = [
  {
      inputs: [
          {internalType: "address", name: "_factory", type: "address"},
          {internalType: "address", name: "_WETH", type: "address"},
      ],
      stateMutability: "nonpayable",
      type: "constructor",
  },
  {
      inputs: [],
      name: "WETH",
      outputs: [{internalType: "address", name: "", type: "address"}],
      stateMutability: "view",
      type: "function",
  },
  {
      inputs: [
          {internalType: "address", name: "tokenA", type: "address"},
          {internalType: "address", name: "tokenB", type: "address"},
          {internalType: "uint256", name: "amountADesired", type: "uint256"},
          {internalType: "uint256", name: "amountBDesired", type: "uint256"},
          {internalType: "uint256", name: "amountAMin", type: "uint256"},
          {internalType: "uint256", name: "amountBMin", type: "uint256"},
          {internalType: "address", name: "to", type: "address"},
          {internalType: "uint256", name: "deadline", type: "uint256"},
      ],
      name: "addLiquidity",
      outputs: [
          {internalType: "uint256", name: "amountA", type: "uint256"},
          {internalType: "uint256", name: "amountB", type: "uint256"},
          {internalType: "uint256", name: "liquidity", type: "uint256"},
      ],
      stateMutability: "nonpayable",
      type: "function",
  },
  {
      inputs: [
          {internalType: "address", name: "token", type: "address"},
          {internalType: "uint256", name: "amountTokenDesired", type: "uint256"},
          {internalType: "uint256", name: "amountTokenMin", type: "uint256"},
          {internalType: "uint256", name: "amountETHMin", type: "uint256"},
          {internalType: "address", name: "to", type: "address"},
          {internalType: "uint256", name: "deadline", type: "uint256"},
      ],
      name: "addLiquidityETH",
      outputs: [
          {internalType: "uint256", name: "amountToken", type: "uint256"},
          {internalType: "uint256", name: "amountETH", type: "uint256"},
          {internalType: "uint256", name: "liquidity", type: "uint256"},
      ],
      stateMutability: "payable",
      type: "function",
  },
  {
      inputs: [],
      name: "factory",
      outputs: [{internalType: "address", name: "", type: "address"}],
      stateMutability: "view",
      type: "function",
  },
  {
      inputs: [
          {internalType: "uint256", name: "amountOut", type: "uint256"},
          {internalType: "uint256", name: "reserveIn", type: "uint256"},
          {internalType: "uint256", name: "reserveOut", type: "uint256"},
      ],
      name: "getAmountIn",
      outputs: [{internalType: "uint256", name: "amountIn", type: "uint256"}],
      stateMutability: "pure",
      type: "function",
  },
  {
      inputs: [
          {internalType: "uint256", name: "amountIn", type: "uint256"},
          {internalType: "uint256", name: "reserveIn", type: "uint256"},
          {internalType: "uint256", name: "reserveOut", type: "uint256"},
      ],
      name: "getAmountOut",
      outputs: [{internalType: "uint256", name: "amountOut", type: "uint256"}],
      stateMutability: "pure",
      type: "function",
  },
  {
      inputs: [
          {internalType: "uint256", name: "amountOut", type: "uint256"},
          {internalType: "address[]", name: "path", type: "address[]"},
      ],
      name: "getAmountsIn",
      outputs: [
          {internalType: "uint256[]", name: "amounts", type: "uint256[]"},
      ],
      stateMutability: "view",
      type: "function",
  },
  {
      inputs: [
          {internalType: "uint256", name: "amountIn", type: "uint256"},
          {internalType: "address[]", name: "path", type: "address[]"},
      ],
      name: "getAmountsOut",
      outputs: [
          {internalType: "uint256[]", name: "amounts", type: "uint256[]"},
      ],
      stateMutability: "view",
      type: "function",
  },
  {
      inputs: [
          {internalType: "uint256", name: "amountA", type: "uint256"},
          {internalType: "uint256", name: "reserveA", type: "uint256"},
          {internalType: "uint256", name: "reserveB", type: "uint256"},
      ],
      name: "quote",
      outputs: [{internalType: "uint256", name: "amountB", type: "uint256"}],
      stateMutability: "pure",
      type: "function",
  },
  {
      inputs: [
          {internalType: "address", name: "tokenA", type: "address"},
          {internalType: "address", name: "tokenB", type: "address"},
          {internalType: "uint256", name: "liquidity", type: "uint256"},
          {internalType: "uint256", name: "amountAMin", type: "uint256"},
          {internalType: "uint256", name: "amountBMin", type: "uint256"},
          {internalType: "address", name: "to", type: "address"},
          {internalType: "uint256", name: "deadline", type: "uint256"},
      ],
      name: "removeLiquidity",
      outputs: [
          {internalType: "uint256", name: "amountA", type: "uint256"},
          {internalType: "uint256", name: "amountB", type: "uint256"},
      ],
      stateMutability: "nonpayable",
      type: "function",
  },
  {
      inputs: [
          {internalType: "address", name: "token", type: "address"},
          {internalType: "uint256", name: "liquidity", type: "uint256"},
          {internalType: "uint256", name: "amountTokenMin", type: "uint256"},
          {internalType: "uint256", name: "amountETHMin", type: "uint256"},
          {internalType: "address", name: "to", type: "address"},
          {internalType: "uint256", name: "deadline", type: "uint256"},
      ],
      name: "removeLiquidityETH",
      outputs: [
          {internalType: "uint256", name: "amountToken", type: "uint256"},
          {internalType: "uint256", name: "amountETH", type: "uint256"},
      ],
      stateMutability: "nonpayable",
      type: "function",
  },
  {
      inputs: [
          {internalType: "address", name: "token", type: "address"},
          {internalType: "uint256", name: "liquidity", type: "uint256"},
          {internalType: "uint256", name: "amountTokenMin", type: "uint256"},
          {internalType: "uint256", name: "amountETHMin", type: "uint256"},
          {internalType: "address", name: "to", type: "address"},
          {internalType: "uint256", name: "deadline", type: "uint256"},
      ],
      name: "removeLiquidityETHSupportingFeeOnTransferTokens",
      outputs: [{internalType: "uint256", name: "amountETH", type: "uint256"}],
      stateMutability: "nonpayable",
      type: "function",
  },
  {
      inputs: [
          {internalType: "address", name: "token", type: "address"},
          {internalType: "uint256", name: "liquidity", type: "uint256"},
          {internalType: "uint256", name: "amountTokenMin", type: "uint256"},
          {internalType: "uint256", name: "amountETHMin", type: "uint256"},
          {internalType: "address", name: "to", type: "address"},
          {internalType: "uint256", name: "deadline", type: "uint256"},
          {internalType: "bool", name: "approveMax", type: "bool"},
          {internalType: "uint8", name: "v", type: "uint8"},
          {internalType: "bytes32", name: "r", type: "bytes32"},
          {internalType: "bytes32", name: "s", type: "bytes32"},
      ],
      name: "removeLiquidityETHWithPermit",
      outputs: [
          {internalType: "uint256", name: "amountToken", type: "uint256"},
          {internalType: "uint256", name: "amountETH", type: "uint256"},
      ],
      stateMutability: "nonpayable",
      type: "function",
  },
  {
      inputs: [
          {internalType: "address", name: "token", type: "address"},
          {internalType: "uint256", name: "liquidity", type: "uint256"},
          {internalType: "uint256", name: "amountTokenMin", type: "uint256"},
          {internalType: "uint256", name: "amountETHMin", type: "uint256"},
          {internalType: "address", name: "to", type: "address"},
          {internalType: "uint256", name: "deadline", type: "uint256"},
          {internalType: "bool", name: "approveMax", type: "bool"},
          {internalType: "uint8", name: "v", type: "uint8"},
          {internalType: "bytes32", name: "r", type: "bytes32"},
          {internalType: "bytes32", name: "s", type: "bytes32"},
      ],
      name: "removeLiquidityETHWithPermitSupportingFeeOnTransferTokens",
      outputs: [{internalType: "uint256", name: "amountETH", type: "uint256"}],
      stateMutability: "nonpayable",
      type: "function",
  },
  {
      inputs: [
          {internalType: "address", name: "tokenA", type: "address"},
          {internalType: "address", name: "tokenB", type: "address"},
          {internalType: "uint256", name: "liquidity", type: "uint256"},
          {internalType: "uint256", name: "amountAMin", type: "uint256"},
          {internalType: "uint256", name: "amountBMin", type: "uint256"},
          {internalType: "address", name: "to", type: "address"},
          {internalType: "uint256", name: "deadline", type: "uint256"},
          {internalType: "bool", name: "approveMax", type: "bool"},
          {internalType: "uint8", name: "v", type: "uint8"},
          {internalType: "bytes32", name: "r", type: "bytes32"},
          {internalType: "bytes32", name: "s", type: "bytes32"},
      ],
      name: "removeLiquidityWithPermit",
      outputs: [
          {internalType: "uint256", name: "amountA", type: "uint256"},
          {internalType: "uint256", name: "amountB", type: "uint256"},
      ],
      stateMutability: "nonpayable",
      type: "function",
  },
  {
      inputs: [
          {internalType: "uint256", name: "amountOut", type: "uint256"},
          {internalType: "address[]", name: "path", type: "address[]"},
          {internalType: "address", name: "to", type: "address"},
          {internalType: "uint256", name: "deadline", type: "uint256"},
      ],
      name: "swapETHForExactTokens",
      outputs: [
          {internalType: "uint256[]", name: "amounts", type: "uint256[]"},
      ],
      stateMutability: "payable",
      type: "function",
  },
  {
      inputs: [
          {internalType: "uint256", name: "amountOutMin", type: "uint256"},
          {internalType: "address[]", name: "path", type: "address[]"},
          {internalType: "address", name: "to", type: "address"},
          {internalType: "uint256", name: "deadline", type: "uint256"},
      ],
      name: "swapExactETHForTokens",
      outputs: [
          {internalType: "uint256[]", name: "amounts", type: "uint256[]"},
      ],
      stateMutability: "payable",
      type: "function",
  },
  {
      inputs: [
          {internalType: "uint256", name: "amountOutMin", type: "uint256"},
          {internalType: "address[]", name: "path", type: "address[]"},
          {internalType: "address", name: "to", type: "address"},
          {internalType: "uint256", name: "deadline", type: "uint256"},
      ],
      name: "swapExactETHForTokensSupportingFeeOnTransferTokens",
      outputs: [],
      stateMutability: "payable",
      type: "function",
  },
  {
      inputs: [
          {internalType: "uint256", name: "amountIn", type: "uint256"},
          {internalType: "uint256", name: "amountOutMin", type: "uint256"},
          {internalType: "address[]", name: "path", type: "address[]"},
          {internalType: "address", name: "to", type: "address"},
          {internalType: "uint256", name: "deadline", type: "uint256"},
      ],
      name: "swapExactTokensForETH",
      outputs: [
          {internalType: "uint256[]", name: "amounts", type: "uint256[]"},
      ],
      stateMutability: "nonpayable",
      type: "function",
  },
  {
      inputs: [
          {internalType: "uint256", name: "amountIn", type: "uint256"},
          {internalType: "uint256", name: "amountOutMin", type: "uint256"},
          {internalType: "address[]", name: "path", type: "address[]"},
          {internalType: "address", name: "to", type: "address"},
          {internalType: "uint256", name: "deadline", type: "uint256"},
      ],
      name: "swapExactTokensForETHSupportingFeeOnTransferTokens",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
  },
  {
      inputs: [
          {internalType: "uint256", name: "amountIn", type: "uint256"},
          {internalType: "uint256", name: "amountOutMin", type: "uint256"},
          {internalType: "address[]", name: "path", type: "address[]"},
          {internalType: "address", name: "to", type: "address"},
          {internalType: "uint256", name: "deadline", type: "uint256"},
      ],
      name: "swapExactTokensForTokens",
      outputs: [
          {internalType: "uint256[]", name: "amounts", type: "uint256[]"},
      ],
      stateMutability: "nonpayable",
      type: "function",
  },
  {
      inputs: [
          {internalType: "uint256", name: "amountIn", type: "uint256"},
          {internalType: "uint256", name: "amountOutMin", type: "uint256"},
          {internalType: "address[]", name: "path", type: "address[]"},
          {internalType: "address", name: "to", type: "address"},
          {internalType: "uint256", name: "deadline", type: "uint256"},
      ],
      name: "swapExactTokensForTokensSupportingFeeOnTransferTokens",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
  },
  {
      inputs: [
          {internalType: "uint256", name: "amountOut", type: "uint256"},
          {internalType: "uint256", name: "amountInMax", type: "uint256"},
          {internalType: "address[]", name: "path", type: "address[]"},
          {internalType: "address", name: "to", type: "address"},
          {internalType: "uint256", name: "deadline", type: "uint256"},
      ],
      name: "swapTokensForExactETH",
      outputs: [
          {internalType: "uint256[]", name: "amounts", type: "uint256[]"},
      ],
      stateMutability: "nonpayable",
      type: "function",
  },
  {
      inputs: [
          {internalType: "uint256", name: "amountOut", type: "uint256"},
          {internalType: "uint256", name: "amountInMax", type: "uint256"},
          {internalType: "address[]", name: "path", type: "address[]"},
          {internalType: "address", name: "to", type: "address"},
          {internalType: "uint256", name: "deadline", type: "uint256"},
      ],
      name: "swapTokensForExactTokens",
      outputs: [
          {internalType: "uint256[]", name: "amounts", type: "uint256[]"},
      ],
      stateMutability: "nonpayable",
      type: "function",
  },
  {stateMutability: "payable", type: "receive"},
];

window.PANCAKESWAP_ROUTER_ABI = [
  {
      inputs: [
          {internalType: "address", name: "_factory", type: "address"},
          {internalType: "address", name: "_WETH", type: "address"},
      ],
      stateMutability: "nonpayable",
      type: "constructor",
  },
  {
      inputs: [],
      name: "WETH",
      outputs: [{internalType: "address", name: "", type: "address"}],
      stateMutability: "view",
      type: "function",
  },
  {
      inputs: [
          {internalType: "address", name: "tokenA", type: "address"},
          {internalType: "address", name: "tokenB", type: "address"},
          {internalType: "uint256", name: "amountADesired", type: "uint256"},
          {internalType: "uint256", name: "amountBDesired", type: "uint256"},
          {internalType: "uint256", name: "amountAMin", type: "uint256"},
          {internalType: "uint256", name: "amountBMin", type: "uint256"},
          {internalType: "address", name: "to", type: "address"},
          {internalType: "uint256", name: "deadline", type: "uint256"},
      ],
      name: "addLiquidity",
      outputs: [
          {internalType: "uint256", name: "amountA", type: "uint256"},
          {internalType: "uint256", name: "amountB", type: "uint256"},
          {internalType: "uint256", name: "liquidity", type: "uint256"},
      ],
      stateMutability: "nonpayable",
      type: "function",
  },
  {
      inputs: [
          {internalType: "address", name: "token", type: "address"},
          {internalType: "uint256", name: "amountTokenDesired", type: "uint256"},
          {internalType: "uint256", name: "amountTokenMin", type: "uint256"},
          {internalType: "uint256", name: "amountETHMin", type: "uint256"},
          {internalType: "address", name: "to", type: "address"},
          {internalType: "uint256", name: "deadline", type: "uint256"},
      ],
      name: "addLiquidityETH",
      outputs: [
          {internalType: "uint256", name: "amountToken", type: "uint256"},
          {internalType: "uint256", name: "amountETH", type: "uint256"},
          {internalType: "uint256", name: "liquidity", type: "uint256"},
      ],
      stateMutability: "payable",
      type: "function",
  },
  {
      inputs: [],
      name: "factory",
      outputs: [{internalType: "address", name: "", type: "address"}],
      stateMutability: "view",
      type: "function",
  },
  {
      inputs: [
          {internalType: "uint256", name: "amountOut", type: "uint256"},
          {internalType: "uint256", name: "reserveIn", type: "uint256"},
          {internalType: "uint256", name: "reserveOut", type: "uint256"},
      ],
      name: "getAmountIn",
      outputs: [{internalType: "uint256", name: "amountIn", type: "uint256"}],
      stateMutability: "pure",
      type: "function",
  },
  {
      inputs: [
          {internalType: "uint256", name: "amountIn", type: "uint256"},
          {internalType: "uint256", name: "reserveIn", type: "uint256"},
          {internalType: "uint256", name: "reserveOut", type: "uint256"},
      ],
      name: "getAmountOut",
      outputs: [{internalType: "uint256", name: "amountOut", type: "uint256"}],
      stateMutability: "pure",
      type: "function",
  },
  {
      inputs: [
          {internalType: "uint256", name: "amountOut", type: "uint256"},
          {internalType: "address[]", name: "path", type: "address[]"},
      ],
      name: "getAmountsIn",
      outputs: [
          {internalType: "uint256[]", name: "amounts", type: "uint256[]"},
      ],
      stateMutability: "view",
      type: "function",
  },
  {
      inputs: [
          {internalType: "uint256", name: "amountIn", type: "uint256"},
          {internalType: "address[]", name: "path", type: "address[]"},
      ],
      name: "getAmountsOut",
      outputs: [
          {internalType: "uint256[]", name: "amounts", type: "uint256[]"},
      ],
      stateMutability: "view",
      type: "function",
  },
  {
      inputs: [
          {internalType: "uint256", name: "amountA", type: "uint256"},
          {internalType: "uint256", name: "reserveA", type: "uint256"},
          {internalType: "uint256", name: "reserveB", type: "uint256"},
      ],
      name: "quote",
      outputs: [{internalType: "uint256", name: "amountB", type: "uint256"}],
      stateMutability: "pure",
      type: "function",
  },
  {
      inputs: [
          {internalType: "address", name: "tokenA", type: "address"},
          {internalType: "address", name: "tokenB", type: "address"},
          {internalType: "uint256", name: "liquidity", type: "uint256"},
          {internalType: "uint256", name: "amountAMin", type: "uint256"},
          {internalType: "uint256", name: "amountBMin", type: "uint256"},
          {internalType: "address", name: "to", type: "address"},
          {internalType: "uint256", name: "deadline", type: "uint256"},
      ],
      name: "removeLiquidity",
      outputs: [
          {internalType: "uint256", name: "amountA", type: "uint256"},
          {internalType: "uint256", name: "amountB", type: "uint256"},
      ],
      stateMutability: "nonpayable",
      type: "function",
  },
  {
      inputs: [
          {internalType: "address", name: "token", type: "address"},
          {internalType: "uint256", name: "liquidity", type: "uint256"},
          {internalType: "uint256", name: "amountTokenMin", type: "uint256"},
          {internalType: "uint256", name: "amountETHMin", type: "uint256"},
          {internalType: "address", name: "to", type: "address"},
          {internalType: "uint256", name: "deadline", type: "uint256"},
      ],
      name: "removeLiquidityETH",
      outputs: [
          {internalType: "uint256", name: "amountToken", type: "uint256"},
          {internalType: "uint256", name: "amountETH", type: "uint256"},
      ],
      stateMutability: "nonpayable",
      type: "function",
  },
  {
      inputs: [
          {internalType: "address", name: "token", type: "address"},
          {internalType: "uint256", name: "liquidity", type: "uint256"},
          {internalType: "uint256", name: "amountTokenMin", type: "uint256"},
          {internalType: "uint256", name: "amountETHMin", type: "uint256"},
          {internalType: "address", name: "to", type: "address"},
          {internalType: "uint256", name: "deadline", type: "uint256"},
      ],
      name: "removeLiquidityETHSupportingFeeOnTransferTokens",
      outputs: [{internalType: "uint256", name: "amountETH", type: "uint256"}],
      stateMutability: "nonpayable",
      type: "function",
  },
  {
      inputs: [
          {internalType: "address", name: "token", type: "address"},
          {internalType: "uint256", name: "liquidity", type: "uint256"},
          {internalType: "uint256", name: "amountTokenMin", type: "uint256"},
          {internalType: "uint256", name: "amountETHMin", type: "uint256"},
          {internalType: "address", name: "to", type: "address"},
          {internalType: "uint256", name: "deadline", type: "uint256"},
          {internalType: "bool", name: "approveMax", type: "bool"},
          {internalType: "uint8", name: "v", type: "uint8"},
          {internalType: "bytes32", name: "r", type: "bytes32"},
          {internalType: "bytes32", name: "s", type: "bytes32"},
      ],
      name: "removeLiquidityETHWithPermit",
      outputs: [
          {internalType: "uint256", name: "amountToken", type: "uint256"},
          {internalType: "uint256", name: "amountETH", type: "uint256"},
      ],
      stateMutability: "nonpayable",
      type: "function",
  },
  {
      inputs: [
          {internalType: "address", name: "token", type: "address"},
          {internalType: "uint256", name: "liquidity", type: "uint256"},
          {internalType: "uint256", name: "amountTokenMin", type: "uint256"},
          {internalType: "uint256", name: "amountETHMin", type: "uint256"},
          {internalType: "address", name: "to", type: "address"},
          {internalType: "uint256", name: "deadline", type: "uint256"},
          {internalType: "bool", name: "approveMax", type: "bool"},
          {internalType: "uint8", name: "v", type: "uint8"},
          {internalType: "bytes32", name: "r", type: "bytes32"},
          {internalType: "bytes32", name: "s", type: "bytes32"},
      ],
      name: "removeLiquidityETHWithPermitSupportingFeeOnTransferTokens",
      outputs: [{internalType: "uint256", name: "amountETH", type: "uint256"}],
      stateMutability: "nonpayable",
      type: "function",
  },
  {
      inputs: [
          {internalType: "address", name: "tokenA", type: "address"},
          {internalType: "address", name: "tokenB", type: "address"},
          {internalType: "uint256", name: "liquidity", type: "uint256"},
          {internalType: "uint256", name: "amountAMin", type: "uint256"},
          {internalType: "uint256", name: "amountBMin", type: "uint256"},
          {internalType: "address", name: "to", type: "address"},
          {internalType: "uint256", name: "deadline", type: "uint256"},
          {internalType: "bool", name: "approveMax", type: "bool"},
          {internalType: "uint8", name: "v", type: "uint8"},
          {internalType: "bytes32", name: "r", type: "bytes32"},
          {internalType: "bytes32", name: "s", type: "bytes32"},
      ],
      name: "removeLiquidityWithPermit",
      outputs: [
          {internalType: "uint256", name: "amountA", type: "uint256"},
          {internalType: "uint256", name: "amountB", type: "uint256"},
      ],
      stateMutability: "nonpayable",
      type: "function",
  },
  {
      inputs: [
          {internalType: "uint256", name: "amountOut", type: "uint256"},
          {internalType: "address[]", name: "path", type: "address[]"},
          {internalType: "address", name: "to", type: "address"},
          {internalType: "uint256", name: "deadline", type: "uint256"},
      ],
      name: "swapETHForExactTokens",
      outputs: [
          {internalType: "uint256[]", name: "amounts", type: "uint256[]"},
      ],
      stateMutability: "payable",
      type: "function",
  },
  {
      inputs: [
          {internalType: "uint256", name: "amountOutMin", type: "uint256"},
          {internalType: "address[]", name: "path", type: "address[]"},
          {internalType: "address", name: "to", type: "address"},
          {internalType: "uint256", name: "deadline", type: "uint256"},
      ],
      name: "swapExactETHForTokens",
      outputs: [
          {internalType: "uint256[]", name: "amounts", type: "uint256[]"},
      ],
      stateMutability: "payable",
      type: "function",
  },
  {
      inputs: [
          {internalType: "uint256", name: "amountOutMin", type: "uint256"},
          {internalType: "address[]", name: "path", type: "address[]"},
          {internalType: "address", name: "to", type: "address"},
          {internalType: "uint256", name: "deadline", type: "uint256"},
      ],
      name: "swapExactETHForTokensSupportingFeeOnTransferTokens",
      outputs: [],
      stateMutability: "payable",
      type: "function",
  },
  {
      inputs: [
          {internalType: "uint256", name: "amountIn", type: "uint256"},
          {internalType: "uint256", name: "amountOutMin", type: "uint256"},
          {internalType: "address[]", name: "path", type: "address[]"},
          {internalType: "address", name: "to", type: "address"},
          {internalType: "uint256", name: "deadline", type: "uint256"},
      ],
      name: "swapExactTokensForETH",
      outputs: [
          {internalType: "uint256[]", name: "amounts", type: "uint256[]"},
      ],
      stateMutability: "nonpayable",
      type: "function",
  },
  {
      inputs: [
          {internalType: "uint256", name: "amountIn", type: "uint256"},
          {internalType: "uint256", name: "amountOutMin", type: "uint256"},
          {internalType: "address[]", name: "path", type: "address[]"},
          {internalType: "address", name: "to", type: "address"},
          {internalType: "uint256", name: "deadline", type: "uint256"},
      ],
      name: "swapExactTokensForETHSupportingFeeOnTransferTokens",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
  },
  {
      inputs: [
          {internalType: "uint256", name: "amountIn", type: "uint256"},
          {internalType: "uint256", name: "amountOutMin", type: "uint256"},
          {internalType: "address[]", name: "path", type: "address[]"},
          {internalType: "address", name: "to", type: "address"},
          {internalType: "uint256", name: "deadline", type: "uint256"},
      ],
      name: "swapExactTokensForTokens",
      outputs: [
          {internalType: "uint256[]", name: "amounts", type: "uint256[]"},
      ],
      stateMutability: "nonpayable",
      type: "function",
  },
  {
      inputs: [
          {internalType: "uint256", name: "amountIn", type: "uint256"},
          {internalType: "uint256", name: "amountOutMin", type: "uint256"},
          {internalType: "address[]", name: "path", type: "address[]"},
          {internalType: "address", name: "to", type: "address"},
          {internalType: "uint256", name: "deadline", type: "uint256"},
      ],
      name: "swapExactTokensForTokensSupportingFeeOnTransferTokens",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
  },
  {
      inputs: [
          {internalType: "uint256", name: "amountOut", type: "uint256"},
          {internalType: "uint256", name: "amountInMax", type: "uint256"},
          {internalType: "address[]", name: "path", type: "address[]"},
          {internalType: "address", name: "to", type: "address"},
          {internalType: "uint256", name: "deadline", type: "uint256"},
      ],
      name: "swapTokensForExactETH",
      outputs: [
          {internalType: "uint256[]", name: "amounts", type: "uint256[]"},
      ],
      stateMutability: "nonpayable",
      type: "function",
  },
  {
      inputs: [
          {internalType: "uint256", name: "amountOut", type: "uint256"},
          {internalType: "uint256", name: "amountInMax", type: "uint256"},
          {internalType: "address[]", name: "path", type: "address[]"},
          {internalType: "address", name: "to", type: "address"},
          {internalType: "uint256", name: "deadline", type: "uint256"},
      ],
      name: "swapTokensForExactTokens",
      outputs: [
          {internalType: "uint256[]", name: "amounts", type: "uint256[]"},
      ],
      stateMutability: "nonpayable",
      type: "function",
  },
  {stateMutability: "payable", type: "receive"},
];


window.rebase_factors = [
	1e0,
	1e0,
	1e0,
	1e0,
	1e4,
	1e4,
	1e4,
	1e4,
	1e4,
	1e4,
	1e4,
	1e4,
	1e4,
	1e4,
	1e4,
	1e4,
]





/* Farming New */
window.token_new = new TOKEN("TOKEN_NEW")
window.farming_new_1 = new STAKING("FARMING_NEW_1")

window.farming_new_2 = new STAKING("FARMING_NEW_2")

window.farming_new_3 = new STAKING("FARMING_NEW_3")

window.farming_new_4 = new STAKING("FARMING_NEW_4")

window.farming_new_5 = new STAKING("FARMING_NEW_5")


window.isConnectedOneTime = false;
window.oneTimeConnectionEvents = [];
function addOneTimeWalletConnectionListener(fn) {
  oneTimeConnectionEvents.push(fn);
  console.log({ oneTimeConnectionEvents });
}
function removeOneTimeWalletConnectionListener(fn) {
  oneTimeConnectionEvents = oneTimeConnectionEvents.filter((e) => e != fn);
  console.log({ oneTimeConnectionEvents });
}

// function to connect metamask
async function connectWallet() {
  function onConnect() {
    if (!isConnectedOneTime) {
      window.isConnectedOneTime = true;
      window.oneTimeConnectionEvents.forEach((fn) => fn());
    }
  }
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    try {
      await window.ethereum?.enable();
      console.log("Connected!");
      if ( window.ethereum.isCoin98 )
				{window.WALLET_TYPE = 'coin98'}
			if ( window.ethereum.isMetaMask )
			{	window.WALLET_TYPE = 'metamask'}
      let coinbase_address = await window.ethereum?.request({
        method: "eth_accounts",
      });
      window.coinbase_address = coinbase_address.pop();
      onConnect();
      return true;
    } catch (e) {
      console.error(e);
      throw new Error("User denied wallet connection!");
    }
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
    console.log("connected to old web3");
    onConnect();
    return true;
  } else {
    throw new Error("No web3 detected!");
  }
}

function param(name) {
  var f = new RegExp("\\b" + name + "=([^&]+)").exec(document.location.search);
  if (f) return decodeURIComponent(f[1].replace(/\+/g, " "));
}

window.cached_contracts = Object.create(null);

function getCoinbase() {
  if ( window.WALLET_TYPE == 'coin98' ) {
		return window.coinbase_address.toLowerCase()
	}
	else{
		return window.web3.eth?.getCoinbase()
	}
}

async function getContract({ key, address = null, ABI = null }) {
  ABI = ABI || window[key + "_ABI"];
  // alert(ABI)
  address = address || window.config[key.toLowerCase() + "_address"];

  if (!window.cached_contracts[key + "-" + address.toLowerCase()]) {
    window.web3 = new Web3(window.ethereum)
    window.cached_contracts[key + "-" + address?.toLowerCase()] =
      new window.web3.eth.Contract(ABI, address, {
        from: await getCoinbase(),
      });
  }
  return window.cached_contracts[key + "-" + address.toLowerCase()];
}

function wait(ms) {
  console.log("Waiting " + ms + "ms");
  return new Promise((r) =>
    setTimeout(() => {
      r(true);
      console.log("Wait over!");
    }, ms)
  );
}

function getPrice(coingecko_id = "ethereum", vs_currency = "usd") {
  return new Promise((resolve, reject) => {
    window.$.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coingecko_id}&vs_currencies=${vs_currency}`
    )
      .then((result) => {
        resolve(result[coingecko_id][vs_currency]);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

async function getActiveLockIdsLengthByRecipient(recipient) {
  let lockerContract = await getContract({ key: "LOCKER" });
  return await lockerContract.methods
    .getActiveLockIdsLengthByRecipient(recipient)
    .call();
}

async function getActiveLockIdsLengthByRecipientETH(recipient) {
  let lockerContract = await getContract({ key: "LOCKERETH" });
  return await lockerContract.methods
    .getActiveLockIdsLengthByRecipient(recipient)
    .call();
}

async function getActiveLockIdsLengthByToken(tokenAddress) {
  let lockerContract = await getContract({ key: "LOCKER" });
  return await lockerContract.methods
    .getActiveLockIdsLengthByToken(tokenAddress)
    .call();
}

async function getActiveLockIdsLengthByTokenETH(tokenAddress) {
  let lockerContract = await getContract({ key: "LOCKERETH" });
  return await lockerContract.methods
    .getActiveLockIdsLengthByToken(tokenAddress)
    .call();
}

async function getActiveLocksByToken(tokenAddress, startIndex, endIndex) {
  let lockerContract = await getContract({ key: "LOCKER" });
  let lockIds = await lockerContract.methods
    .getActiveLockIdsByToken(tokenAddress, startIndex, endIndex)
    .call();
  let locks = await lockerContract.methods.getLocksByIds(lockIds).call();
  return processedLocks(locks);
}

async function refreshBalance() {

	//await wait(10000)
	let coinbase;
	try {
		if (!window.IS_CONNECTED) throw new Error("Wallet Not Connected!")
		coinbase = await getCoinbase()
	} catch (e) {
		console.warn(e)
	}

	let reward_token = window.reward_token
	//console.log('coinbase' + coinbase)

	let _tvl30 = await reward_token.balanceOf('0x7fc2174670d672ad7f666af0704c2d961ef32c73')
	_tvl30 = _tvl30 / 1e18

	let _tvl60 = await reward_token.balanceOf('0x036e336ea3ac2e255124cf775c4fdab94b2c42e4')
	_tvl60 = _tvl60 / 1e18

	let _tvl90 = await reward_token.balanceOf('0x0a32749d95217b7ee50127e24711c97849b70c6a')
	_tvl90 = _tvl90 / 1e18

	let _tvl120 = await reward_token.balanceOf('0x82df1450efd6b504ee069f5e4548f2d5cb229880')
	_tvl120 = _tvl120 / 1e18 + 0.1

	let _buyback = await reward_token.balanceOf('0xe5262f38bf13410a79149cb40429f8dc5e830542')
	_buyback = _buyback /1e18

	// console.log({_buyback})

	let [usdPerToken] = await Promise.all([window.getPrice('defi-yield-protocol')])
	let valueee = (_tvl30 + _tvl60 + _tvl90 + _tvl120 + _buyback) * usdPerToken
	//console.log('usdper '+valueee)
	return valueee

}


async function get_usd_values_with_apy_and_tvl(...arguments) {
	return (await get_apy_and_tvl(await get_usd_values(...arguments)))
}

async function refresh_the_graph_result() {
	let result = await get_usd_values_with_apy_and_tvl({token_contract_addresses: [TOKEN_ADDRESS], lp_ids: LP_ID_LIST})
	window.the_graph_result = result
	window.TVL_FARMING_POOLS = await refreshBalance()
	return result
}


window.get_usd_values = get_usd_values
window.get_token_balances = get_token_balances
window.get_apy_and_tvl = get_apy_and_tvl
window.get_number_of_stakers = get_number_of_stakers
window.refresh_the_graph_result = refresh_the_graph_result

async function getActiveLocksByTokenETH(tokenAddress, startIndex, endIndex) {
  let lockerContract = await getContract({ key: "LOCKERETH" });
  let lockIds = await lockerContract.methods
    .getActiveLockIdsByToken(tokenAddress, startIndex, endIndex)
    .call();
  let locks = await lockerContract.methods.getLocksByIds(lockIds).call();
  return processedLocks(locks);
}

async function getActiveLocksByRecipient(recipient, startIndex, endIndex) {
  let lockerContract = await getContract({ key: "LOCKER" });
  let lockIds = await lockerContract.methods
    .getActiveLockIdsByRecipient(recipient, startIndex, endIndex)
    .call();
  let locks = await lockerContract.methods.getLocksByIds(lockIds).call();
  return processedLocks(locks);
}

async function getActiveLocksByRecipientETH(recipient, startIndex, endIndex) {
  let lockerContract = await getContract({ key: "LOCKERETH" });
  let lockIds = await lockerContract.methods
    .getActiveLockIdsByRecipient(recipient, startIndex, endIndex)
    .call();
  let locks = await lockerContract.methods.getLocksByIds(lockIds).call();
  return processedLocks(locks);
}

async function getMinLockCreationFeeInWei(pair, baseToken, amount) {
  let lockerContract = await getContract({ key: "LOCKER" });
  return await lockerContract.methods
    .getMinLockCreationFeeInWei(pair, baseToken, amount)
    .call();
}
async function getPairTokensInfo(pair, network) {
  let pairContract = await getContract({
    key: "PAIR",
    address: pair,
    ABI: network === 1
        ? UNISWAP_PAIRETH_ABI
        : UNISWAP_PAIR_ABI
  });
  let [token0_address, token1_address] = await Promise.all([
    pairContract.methods.token0().call(),
    pairContract.methods.token1().call(),
  ]);
  let token0 = await getContract({ address: token0_address, ABI: ERC20_ABI });
  let token1 = await getContract({ address: token1_address, ABI: ERC20_ABI });
  let [name0, symbol0, decimals0, name1, symbol1, decimals1] =
    await Promise.all([
      token0.methods.name().call(),
      token0.methods.symbol().call(),
      token0.methods.decimals().call(),
      token1.methods.name().call(),
      token1.methods.symbol().call(),
      token1.methods.decimals().call(),
    ]);
  return {
    token0: {
      address: token0_address.toLowerCase(),
      name: name0,
      symbol: symbol0,
      decimals: decimals0,
      contract: token0,
    },
    token1: {
      address: token1_address.toLowerCase(),
      name: name1,
      symbol: symbol1,
      decimals: decimals1,
      contract: token1,
    },
  };
}
async function getBaseTokens() {
  let lockerContract = await getContract({ key: "LOCKER" });
  let baseTokensLength = await lockerContract.methods
    .getBaseTokensLength()
    .call();
  let baseTokens = await lockerContract.methods
    .getBaseTokens(0, baseTokensLength)
    .call();
  console.log({ baseTokens });
  return baseTokens.map((t) => t.toLowerCase());
}

async function getBaseTokensETH() {
  let lockerContract = await getContract({ key: "LOCKERETH" });
  let baseTokensLength = await lockerContract.methods
    .getBaseTokensLength()
    .call();
  let baseTokens = await lockerContract.methods
    .getBaseTokens(0, baseTokensLength)
    .call();
  console.log({ baseTokens });
  return baseTokens.map((t) => t.toLowerCase());
}

async function claimUnlocked(lockId) {
  let lockerContract = await getContract({ key: "LOCKER" });
  return await lockerContract.methods.claimUnlocked(lockId).send();
}

async function claimUnlockedETH(lockId) {
  let lockerContract = await getContract({ key: "LOCKERETH" });
  return await lockerContract.methods.claimUnlocked(lockId).send();
}

async function getLockedAmount(pair) {
  let lockerContract = await getContract({ key: "LOCKER" });
  return await lockerContract.methods.tokenBalances(pair).call();
}

async function getLockedAmountETH(pair) {
  let lockerContract = await getContract({ key: "LOCKERETH" });
  return await lockerContract.methods.tokenBalances(pair).call();
}

async function getTokenHolderBalance(token, holder) {
  let tokenContract = await getContract({ address: token, ABI: ERC20_ABI });
  return await tokenContract.methods.balanceOf(holder).call();
}
async function getTokenTotalSupply(token) {
  let tokenContract = await getContract({ address: token, ABI: ERC20_ABI });
  return await tokenContract.methods.totalSupply().call();
}
async function approveToken(token, spender, amount) {
  let tokenContract = await getContract({ address: token, ABI: ERC20_ABI });
  return await tokenContract.methods.approve(spender, amount).send();
}
async function createLock(pair, baseToken, amount, unlockTimestamp) {
  let lockerContract = await getContract({ key: "LOCKER" });

  let estimatedValue = await getMinLockCreationFeeInWei(
    pair,
    baseToken,
    amount
  );
  estimatedValue = new BigNumber(estimatedValue).times(1.1).toFixed(0);

  return await lockerContract.methods
    .createLock(pair, baseToken, amount, unlockTimestamp)
    .send({ value: estimatedValue, from: await getCoinbase() });
}

function processedLocks(locks) {
  return locks._ids.map((id, i) => ({
    id,
    token: locks.tokens[i],
    unlockTimestamp: locks.unlockTimestamps[i],
    amount: locks.amounts[i],
    recipient: locks.recipients[i],
    claimed: locks.claimeds[i],
    platformTokensLocked: locks.platformTokensLockeds[i],
  }));
}

async function createLockETH(pair, baseToken, amount, unlockTimestamp) {
  let lockerContract = await getContract({ key: "LOCKERETH" });

  let estimatedValue = await getMinLockCreationFeeInWei(
    pair,
    baseToken,
    amount
  );
  estimatedValue = new BigNumber(estimatedValue).times(1.1).toFixed(0);

  return await lockerContract.methods
    .createLock(pair, baseToken, amount, unlockTimestamp)
    .send({ value: estimatedValue, from: await getCoinbase() });
}

function processedLocks(locks) {
  return locks._ids.map((id, i) => ({
    id,
    token: locks.tokens[i],
    unlockTimestamp: locks.unlockTimestamps[i],
    amount: locks.amounts[i],
    recipient: locks.recipients[i],
    claimed: locks.claimeds[i],
    platformTokensLocked: locks.platformTokensLockeds[i],
  }));
}

// ======================== subscription contract functions ================================

async function subscriptionPlatformTokenAmount(account) {
  if (account) {
    let subscriptionContract = await getContract({ key: "SUBSCRIPTION" });
    return await subscriptionContract.methods
      .subscriptionPlatformTokenAmount(account)
      .call()
      .then();
  }
}

async function subscriptionPlatformTokenAmountETH(account) {
  if (account) {
    let subscriptionContract = await getContract({ key: "SUBSCRIPTIONETH" });
    return await subscriptionContract.methods
      .subscriptionPlatformTokenAmount(account)
      .call()
      .then();
  }
}

async function subscribe(tokenAddress, amount) {
  let subscriptionContract = await getContract({ key: "SUBSCRIPTION" });
  return await subscriptionContract.methods
    .subscribe(tokenAddress, amount)
    .send({ from: await getCoinbase() });
}

async function unsubscribe() {
  let subscriptionContract = await getContract({ key: "SUBSCRIPTION" });
  return await subscriptionContract.methods
    .unsubscribe()
    .send({ from: await getCoinbase() });
}

async function getEstimatedTokenSubscriptionAmount(tokenAddress) {
  let subscriptionContract = await getContract({ key: "SUBSCRIPTION" });
  return await subscriptionContract.methods
    .getEstimatedTokenSubscriptionAmount(tokenAddress)
    .call();
}

async function getEstimatedTokenSubscriptionAmountETH(tokenAddress) {
  let subscriptionContract = await getContract({ key: "SUBSCRIPTIONETH" });
  return await subscriptionContract.methods
    .getEstimatedTokenSubscriptionAmount(tokenAddress)
    .call();
}

// ===================== end subscription contract functions ================================

// ========= favorites functions ==========

async function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites") || `[]`);
}
async function isFavorite(pairId) {
  let favorites = await getFavorites();
  return favorites.some((f) => {
    if (f.id == pairId) {
      return true;
    }
    return false;
  });
}
async function toggleFavorite(pair) {
  if (!pair) return false;
  let favorites = await getFavorites();
  let foundIndex;
  if (
    favorites.some((f, i) => {
      if (f.id == pair.id) {
        foundIndex = i;
        return true;
      }
      return false;
    })
  ) {
    favorites.splice(foundIndex, 1);
  } else {
    favorites.push(pair);
  }
  localStorage.setItem("favorites", JSON.stringify(favorites, null, 4));
}





async function getPangolinRouterContract(
  address = window.config.pangolin_router_address
) {
  return new window.avaxWeb3.eth.Contract(window.PANGOLIN_ROUTER_ABI, address, {
      from: undefined,
  });
}


async function getPancakeswapRouterContract(
  address = window.config.pancakeswap_router_address
) {
  return new window.bscWeb3.eth.Contract(
      window.PANCAKESWAP_ROUTER_ABI,
      address,
      {from: undefined}
  );
}

async function getUniswapRouterContract(
  address = window.config.uniswap_router_address,
  abi = window.UNISWAP_ROUTER_ABI
) {
  return new window.infuraWeb3.eth.Contract(abi, address, {from: undefined});
}


async function getPriceiDYP() {
  let amount = new BigNumber(1000000000000000000).toFixed(0);
  let router = await window.getPancakeswapRouterContract();
  let WETH = await router.methods.WETH().call();
  let platformTokenAddress = window.config.BUSD_address;
  let rewardTokenAddress = window.config.reward_token_idyp_address;
  let path = [
      ...new Set(
          [rewardTokenAddress, WETH, platformTokenAddress].map((a) =>
              a.toLowerCase()
          )
      ),
  ];
  let _amountOutMin = await router.methods.getAmountsOut(amount, path).call();
  _amountOutMin = _amountOutMin[_amountOutMin.length - 1];
  _amountOutMin = new BigNumber(_amountOutMin).div(1e18).toFixed(18);
  return _amountOutMin;
}

window.getPriceiDYP = getPriceiDYP;

async function getPriceiDYPAvax() {
  let amount = new BigNumber(1000000000000000000).toFixed(0);
  let router = await window.getPangolinRouterContract();
  let WETH = await router.methods.WAVAX().call();
  let platformTokenAddress = window.config.USDCe_address;
  let rewardTokenAddress = window.config.reward_token_idyp_address;
  let path = [
      ...new Set(
          [rewardTokenAddress, WETH, platformTokenAddress].map((a) =>
              a.toLowerCase()
          )
      ),
  ];
  let _amountOutMin = await router.methods.getAmountsOut(amount, path).call();
  _amountOutMin = _amountOutMin[_amountOutMin.length - 1];
  _amountOutMin = new BigNumber(_amountOutMin).div(1e6).toFixed(18);
  return _amountOutMin;
}

window.getPriceiDYPAvax = getPriceiDYPAvax;

async function getPriceiDYPEth() {
  let amount = new BigNumber(1000000000000000000).toFixed(0);
  let router = await window.getUniswapRouterContract();
  let WETH = await router.methods.WETH().call();
  let platformTokenAddress = window.config.USDC_address;
  let rewardTokenAddress = window.config.reward_token_idyp_address;
  let path = [
      ...new Set(
          [rewardTokenAddress, WETH, platformTokenAddress].map((a) =>
              a.toLowerCase()
          )
      ),
  ];
  let _amountOutMin = await router.methods.getAmountsOut(amount, path).call();
  _amountOutMin = _amountOutMin[_amountOutMin.length - 1];
  _amountOutMin = new BigNumber(_amountOutMin).div(1e6).toFixed(18);
  return _amountOutMin;
}

window.getPriceiDYPEth = getPriceiDYPEth;


async function getFavoritesETH() {
  return JSON.parse(localStorage.getItem("favoritesETH") || `[]`);
}
async function isFavoriteETH(pairId) {
  let favorites = await getFavoritesETH();
  return favorites.some((f) => {
    if (f.id == pairId) {
      return true;
    }
    return false;
  });
}
async function toggleFavoriteETH(pair) {
  if (!pair) return false;
  let favorites = await getFavoritesETH();
  let foundIndex;
  if (
    favorites.some((f, i) => {
      if (f.id == pair.id) {
        foundIndex = i;
        return true;
      }
      return false;
    })
  ) {
    favorites.splice(foundIndex, 1);
  } else {
    favorites.push(pair);
  }
  localStorage.setItem("favoritesETH", JSON.stringify(favorites, null, 4));
}
// ======= end favorites functions ========

// -----------------
async function getMainToken(pair, network) {
  let mainToken = pair.token0 || {};

  if (network === 1) {
    for (let token of window.config.baseEth_tokens) {
      if (mainToken.id == token) {
        mainToken = pair.token1;
        mainToken.__number = 1;
        mainToken.__base_number = 0;
        break;
      } else if (pair.token1.id == token) {
        mainToken = pair.token0;
        mainToken.__number = 0;
        mainToken.__base_number = 1;
        break;
      }
    }
    return mainToken;
  }

  if (network === 43114) {
    for (let token of window.config.base_tokens) {
      if (mainToken.id == token) {
        mainToken = pair.token1;
        mainToken.__number = 1;
        mainToken.__base_number = 0;
        break;
      } else if (pair.token1.id == token) {
        mainToken = pair.token0;
        mainToken.__number = 0;
        mainToken.__base_number = 1;
        break;
      }
    }
    return mainToken;
  }
}
// ------------------

// helper functions for csv json and file reading
// ref: http://stackoverflow.com/a/1293163/2343
// This will parse a delimited string into an array of
// arrays. The default delimiter is the comma, but this
// can be overriden in the second argument.
function CSVToArray(strData, strDelimiter) {
  // Check to see if the delimiter is defined. If not,
  // then default to comma.
  strDelimiter = strDelimiter || ",";

  // Create a regular expression to parse the CSV values.
  var objPattern = new RegExp(
    // Delimiters.
    "(\\" +
      strDelimiter +
      "|\\r?\\n|\\r|^)" +
      // Quoted fields.
      '(?:"([^"]*(?:""[^"]*)*)"|' +
      // Standard fields.
      '([^"\\' +
      strDelimiter +
      "\\r\\n]*))",
    "gi"
  );

  // Create an array to hold our data. Give the array
  // a default empty first row.
  var arrData = [[]];

  // Create an array to hold our individual pattern
  // matching groups.
  var arrMatches = null;

  // Keep looping over the regular expression matches
  // until we can no longer find a match.
  while ((arrMatches = objPattern.exec(strData))) {
    // Get the delimiter that was found.
    var strMatchedDelimiter = arrMatches[1];

    // Check to see if the given delimiter has a length
    // (is not the start of string) and if it matches
    // field delimiter. If id does not, then we know
    // that this delimiter is a row delimiter.
    if (strMatchedDelimiter.length && strMatchedDelimiter !== strDelimiter) {
      // Since we have reached a new row of data,
      // add an empty row to our data array.
      arrData.push([]);
    }

    var strMatchedValue;

    // Now that we have our delimiter out of the way,
    // let's check to see which kind of value we
    // captured (quoted or unquoted).
    if (arrMatches[2]) {
      // We found a quoted value. When we capture
      // this value, unescape any double quotes.
      strMatchedValue = arrMatches[2].replace(new RegExp('""', "g"), '"');
    } else {
      // We found a non-quoted value.
      strMatchedValue = arrMatches[3];
    }

    // Now that we have our value string, let's add
    // it to the data array.
    arrData[arrData.length - 1].push(strMatchedValue);
  }

  // Return the parsed data.
  return arrData;
}

function csvToJSON(csv) {
  csv = csv.trim();
  let arr = CSVToArray(csv);
  return arr.slice(1).map((a) => {
    let res = {};
    arr[0].forEach((field, i) => (res[field] = a[i]));
    return res;
  });
}

function readAsText(file) {
  return new Promise((resolve) => {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      resolve(reader.result);
    });
    reader.readAsText(file);
  });
}

window.sign = async function (msg, account) {
  let signature = await window.web3.eth.personal.sign(msg, account);
  return signature;
};

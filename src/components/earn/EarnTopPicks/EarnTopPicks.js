import React, { useEffect, useState } from "react";
import TopPoolsCard from "../../top-pools-card/TopPoolsCard";
import TopPoolsListCard from "../../top-pools-card/TopPoolsListCard";
import noPoolsIcon from '../../../assets/earnAssets/noPoolsIcon.svg'

import axios from "axios";
import getFormattedNumber from "../../../functions/getFormattedNumber2";

import initStakingNew from "../../FARMINNG/staking-new-front";

const EarnTopPicks = ({topList, listType, coinbase, the_graph_result, lp_id, isConnected}) => {


  const stake = [
    {
      icon: 'dyplogo.svg',
      top_pick: true,
      tokenName: "DYP",
      apy: '1.08',
      tvl_usd: '48543.20',
      lockTime: 'No lock',
    },
    {
      icon: 'dyplogo.svg',
      top_pick: false,
      tokenName: "AVAX",
      apy: '1.08',
      tvl_usd: '48543.20',
      lockTime: 'No lock',
    },
    {
      icon: 'dyplogo.svg',
      top_pick: true,
      tokenName: "BSC",
      apy: '1.08',
      tvl_usd: '48543.20',
      lockTime: 'No lock',
    },

  ];
  const buyback = [
    {
      top_pick: true,
      tokenName: "DYP",
      apy: '1.08',
      tvl_usd: '48543.20',
      lockTime: 'No lock',
    },
    {
      top_pick: false,
      tokenName: "AVAX",
      apy: '1.08',
      tvl_usd: '48543.20',
      lockTime: 'No lock',
    },
    {
      top_pick: false,
      tokenName: "BSC",
      apy: '1.08',
      tvl_usd: '48543.20',
      lockTime: 'No lock',
    },
  ];
 
  const farming = [
    {
      top_pick: false,
      tokenName: "DYP",
      apr: '1.08%',
      tvl: '$48,543.20',
      lockTime: 'No lock',
    },
    {
      top_pick: false,
      tokenName: "AVAX",
      apr: '1.08%',
      tvl: '$48,543.20',
      lockTime: 'No lock',
    },
    {
      top_pick: false,
      tokenName: "BSC",
      apr: '1.08%',
      tvl: '$48,543.20',
      lockTime: 'No lock',
    },
    {
      top_pick: false,
      tokenName: "BSC",
      apr: '1.08%',
      tvl: '$48,543.20',
      lockTime: 'No lock',
    },
    {
      top_pick: false,
      tokenName: "BSC",
      apr: '1.08%',
      tvl: '$48,543.20',
      lockTime: 'No lock',
    },
  ];


  const vault = [
    {
      icon: "ethereum.svg",
      tokenName: "ETH",
      apy: "3 - 13",
      tvl_usd: ``,
      lockTime: "No lock",
      top_pick: true,
      new_badge: false,
      link: "https://vault.dyp.finance/vault-weth",
    },
    {
      icon: "wbtc.svg",
      tokenName: "WBTC",
      apy: "3 - 13",
      tvl_usd: ``,
      lockTime: "No lock",
      link: "https://vault.dyp.finance/vault-wbtc",
    },
    {
      icon: "usdc.svg",
      tokenName: "USDC",
      apy: "8 - 22",
      tvl_usd: ``,
      lockTime: "No lock",
      new_badge: false,
      top_pick: false,
      link: "https://vault.dyp.finance/vault-usdc",
    },
    {
      icon: "usdt.svg",
      tokenName: "USDT",
      apy: "9 - 23",
      tvl_usd: ``,
      lockTime: "No lock",
      new_badge: false,
      top_pick: false,
      link: "https://vault.dyp.finance/vault-usdt",
    },
    {
      icon: "dai.svg",
      tokenName: "DAI",
      apy: "8 - 21",
      tvl_usd: ``,
      lockTime: "No lock",
      new_badge: false,
      top_pick: false,
      link: "https://vault.dyp.finance/vault-dai",
    },
  ];


  const [farming, setFarming] = useState([])
  const [showDetails, setShowDetails] = useState(false);
  const [topPools, setTopPools] = useState(stake);
  const [listing, setListing] = useState(listType);

  const fetchEthFarming = async() => {
   
    await axios.get('https://api.dyp.finance/api/the_graph_eth_v2').then((res) => {
     let temparray = Object.entries(res.data.the_graph_eth_v2.lp_data)
     let slicedArray = []
     temparray.map((item) => {
      slicedArray.push(item[1])
     })
     setFarming(slicedArray)
     
     
    }).catch(err => console.error(err))
  }
  const fetchBscFarming = async() => {
    await axios.get('https://api.dyp.finance/api/the_graph_bsc_v2').then((res) => {
      let temparray = Object.entries(res.data.the_graph_bsc_v2.lp_data)
      let slicedArray = []
      temparray.map((item) => {
       slicedArray.push(item[1])
      })
      setFarming(slicedArray)
    }).catch(err => console.error(err))
  }
  const fetchAvaxFarming = async() => {
    await axios.get('https://api.dyp.finance/api/the_graph_avax_v2').then((res) => {
      let temparray = Object.entries(res.data.the_graph_avax_v2.lp_data)
      let slicedArray = []
      temparray.map((item) => {
       slicedArray.push(item[1])
      })
      setFarming(slicedArray)
    }).catch(err => console.error(err))
  }



  const [activeCard, setActiveCard] = useState();
  const [cardIndex, setcardIndex] = useState();

  const eth_address = "ETH";
  const { rebase_factors } = window;

  const stakeArray = [
    window.farming_new_1,
    window.farming_new_2,
    window.farming_new_3,
    window.farming_new_4,
    window.farming_new_5,
  ];
  const constantArray = [
    window.constant_staking_new5,
    window.constant_staking_new6,
    window.constant_staking_new7,
    window.constant_staking_new8,
    window.constant_staking_new9,
  ];
  const feeArray = [0.3, 0.3, 0.4, 0.8, 1.2];

  const StakingNew1 = initStakingNew({
    token: window.token_new,
    // staking: window.farming_new_1,
    staking: stakeArray[cardIndex],

    constant: constantArray[cardIndex],
    liquidity: eth_address,
    lp_symbol: "USD",
    reward: "30,000",
    lock: "3 Days",
    rebase_factor: rebase_factors[0],
    expiration_time: "14 December 2022",
    fee: feeArray[cardIndex],
  });


  useEffect(() => {
    if(topList === 'Staking'){
      setTopPools(stake)
    }else if(topList === 'Buyback'){
      setTopPools(buyback)
    
    }else if(topList === 'Vault'){
      setTopPools(vault)
    
    }else if(topList === 'Farming'){
      setTopPools(farming)
    }

    if(chain === 'eth'){
    fetchEthFarming()
    }else if(chain === 'bnb'){
      fetchBscFarming()
    }else if(chain === 'avax'){
      fetchAvaxFarming();
    }

    setListing(listType)
  }, [topList, listType, chain])
  

  return (
    
    topPools.length > 0 ?
    <div className={`row ${listing === 'list' ? 'w-100' : null} justify-content-center gap-4`}>
    {listing === 'table' ? 
    <div>
    <div className="top-picks-container">
    {topPools.map((pool, index) => (
       <TopPoolsCard
       key={index}
       top_pick={pool.top_pick}
       tokenName={pool.tokenName}
       apr={pool.apy + '%'}
       tvl={'$' + getFormattedNumber(pool.tvl_usd)}
       lockTime={pool.lockTime ? pool.lockTime : 'No Lock'}
       tokenLogo={pool.icon}
       onShowDetailsClick={() => {
        setActiveCard(topPools[index]);
        setcardIndex(index);
      }}
      onHideDetailsClick={() => {
        setActiveCard(null);
      }}
       cardType={topList}
     />
     ))}
    </div>

    {activeCard && topList === 'Farming' && (
                <StakingNew1
                  is_wallet_connected={isConnected}
                  coinbase={coinbase}
                  the_graph_result={the_graph_result}
                  lp_id={lp_id[cardIndex]}
                />
              )}

    </div>
   :
   <div className="list-pools-container px-0">
   {topPools.map((pool, index) => (
     <TopPoolsListCard
     key={index}
     top_pick={pool.top_pick}
     tokenName={pool.tokenName}
     apr={pool.apy + '%'}

     tvl={'$' + getFormattedNumber(pool.tvl_usd)}
     lockTime={pool.lockTime ? pool.lockTime : 'No Lock'}
     cardType={topList}
     tokenLogo={pool.icon}
     onDetailsClick={() => {
       setShowDetails(!showDetails);
     }}
     showDetails={showDetails} />
   ))}
  </div>
}
    </div>
   :
  <>
   <div className="no-pools-container d-flex flex-column justify-content-center align-items-center  w-100 p-4">
   <div className="col-6 d-flex flex-column justify-content-center align-items-center gap-2">
   <img src={noPoolsIcon} alt="" />
    <p className="text-center" style={{color: '#F7F7FC', fontSize: '11px', fontWeight: '400'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id massa ipsum. Donec quis neque pellentesque, fermentum elit ut, ornare nulla. In s</p>
   </div>
   </div> 
   <div className="no-pools-container d-flex flex-column justify-content-center align-items-center  w-100 p-4">
   <div className="col-6 d-flex flex-column justify-content-center align-items-center gap-2">
    <div className="list-pools-container d-flex flex-column gap-3 p-4">
      <h5 className="text-white">Start Staking</h5>
      <button className="btn filledbtn w-100">Connect Wallet</button>
    </div>
   </div>
   </div> 
  </>
  
  );
};

export default EarnTopPicks;

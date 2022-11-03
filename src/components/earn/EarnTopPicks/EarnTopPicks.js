import React, { useEffect, useState } from "react";
import TopPoolsCard from "../../top-pools-card/TopPoolsCard";
import TopPoolsListCard from "../../top-pools-card/TopPoolsListCard";
import noPoolsIcon from '../../../assets/earnAssets/noPoolsIcon.svg'
import initStakingNew from "../../FARMINNG/staking-new-front";

const EarnTopPicks = ({topList, listType, coinbase, the_graph_result, lp_id, isConnected}) => {
  const stake = [
    {
      icon: 'dyplogo.svg',
      top_pick: true,
      tokenName: "DYP",
      apr: '1.08%',
      tvl: '$48,543.20',
      lockTime: 'No lock',
    },
    {
      icon: 'dyplogo.svg',
      top_pick: false,
      tokenName: "AVAX",
      apr: '1.08%',
      tvl: '$48,543.20',
      lockTime: 'No lock',
    },
    {
      icon: 'dyplogo.svg',
      top_pick: true,
      tokenName: "BSC",
      apr: '1.08%',
      tvl: '$48,543.20',
      lockTime: 'No lock',
    },

  ];
  const buyback = [
    {
      top_pick: true,
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
      apr: "3% - 13%",
      tvl: ``,
      lockTime: "No lock",
      top_pick: true,
      new_badge: false,
      link: "https://vault.dyp.finance/vault-weth",
    },
    {
      icon: "wbtc.svg",
      tokenName: "WBTC",
      apr: "3% - 13%",
      tvl: ``,
      lockTime: "No lock",
      link: "https://vault.dyp.finance/vault-wbtc",
    },
    {
      icon: "usdc.svg",
      tokenName: "USDC",
      apr: "8% - 22%",
      tvl: ``,
      lockTime: "No lock",
      new_badge: false,
      top_pick: false,
      link: "https://vault.dyp.finance/vault-usdc",
    },
    {
      icon: "usdt.svg",
      tokenName: "USDT",
      apr: "9% - 23%",
      tvl: ``,
      lockTime: "No lock",
      new_badge: false,
      top_pick: false,
      link: "https://vault.dyp.finance/vault-usdt",
    },
    {
      icon: "dai.svg",
      tokenName: "DAI",
      apr: "8% - 21%",
      tvl: ``,
      lockTime: "No lock",
      new_badge: false,
      top_pick: false,
      link: "https://vault.dyp.finance/vault-dai",
    },
  ];


  
  const [showDetails, setShowDetails] = useState(false);
  const [topPools, setTopPools] = useState(stake);
  const [listing, setListing] = useState(listType)


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

    setListing(listType)
  }, [topList, listType])
  

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
       apr={pool.apr}
       tvl={pool.tvl}
       lockTime={pool.lockTime}
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
     apr={pool.apr}
     tvl={pool.tvl}
     lockTime={pool.lockTime}
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

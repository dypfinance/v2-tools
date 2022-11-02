import React, { useEffect, useState } from "react";
import TopPoolsCard from "../../top-pools-card/TopPoolsCard";
import TopPoolsListCard from "../../top-pools-card/TopPoolsListCard";
import noPoolsIcon from '../../../assets/earnAssets/noPoolsIcon.svg'

const EarnTopPicks = ({topList, listType}) => {
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
    // {
    //   top_pick: false,
    //   tokenName: "DYP",
    //   apr: '1.08%',
    //   tvl: '$48,543.20',
    //   lockTime: 'No lock',
    // },
    // {
    //   top_pick: false,
    //   tokenName: "AVAX",
    //   apr: '1.08%',
    //   tvl: '$48,543.20',
    //   lockTime: 'No lock',
    // },
    // {
    //   top_pick: false,
    //   tokenName: "BSC",
    //   apr: '1.08%',
    //   tvl: '$48,543.20',
    //   lockTime: 'No lock',
    // },
    // {
    //   top_pick: false,
    //   tokenName: "BSC",
    //   apr: '1.08%',
    //   tvl: '$48,543.20',
    //   lockTime: 'No lock',
    // },
    // {
    //   top_pick: false,
    //   tokenName: "BSC",
    //   apr: '1.08%',
    //   tvl: '$48,543.20',
    //   lockTime: 'No lock',
    // },
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
       onDetailsClick={() => {
         setShowDetails(!showDetails);
       }}
       cardType={topList}
       showDetails={showDetails}
     />
     ))}
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

import React, { useEffect, useState } from "react";
import TopPoolsCard from "../../top-pools-card/TopPoolsCard";
import dypLogo from '../../top-pools-card/assets/dyplogo.svg'
import greenArrow from '../../top-pools-card/assets/greenarrow.svg'
import orangeArrow from '../../top-pools-card/assets/orangearrow.svg'
import TopPoolsDetails from "../../top-pools-card/TopPoolsDetails";
import TopPoolsListCard from "../../top-pools-card/TopPoolsListCard";

const EarnTopPicks = ({topList, listType}) => {
  const stake = [
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
  const vault = [
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
      top_pick: true,
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
    
    <div className={`row ${listing === 'list' ? 'w-100' : null} justify-content-center gap-4`}>
    
    {listing === 'table' ? 
     <div className="top-picks-container">
     {topPools.map((pool) => (
        <TopPoolsCard
        top_pick={pool.top_pick}
        tokenName={pool.tokenName}
        apr={pool.apr}
        tvl={pool.tvl}
        lockTime={pool.lockTime}
        onDetailsClick={() => {
          setShowDetails(!showDetails);
        }}
        showDetails={showDetails}
      />
      ))}
     </div>
    :
    <div className="list-pools-container px-0">
    {topPools.map((pool) => (
      <TopPoolsListCard
      top_pick={pool.top_pick}
      tokenName={pool.tokenName}
      apr={pool.apr}
      tvl={pool.tvl}
      lockTime={pool.lockTime}
      onDetailsClick={() => {
        setShowDetails(!showDetails);
      }}
      showDetails={showDetails} />
    ))}
   </div>
    }
    </div>
  );
};

export default EarnTopPicks;

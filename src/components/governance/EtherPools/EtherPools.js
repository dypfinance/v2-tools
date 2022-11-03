import React from 'react'
import EtherPoolsCard from '../EtherPoolsCard/EtherPoolsCard'

const EtherPools = () => {
  return (
   <>
    <div className="ether-pools-wrapper w-100 d-grid mt-5">
            <EtherPoolsCard />
            <EtherPoolsCard />
            <EtherPoolsCard />
            <EtherPoolsCard />
            <EtherPoolsCard />
            <EtherPoolsCard />
    </div>
    <div className="mt-5">
    <button className="btn load-more-button">Load More</button>
    
    </div>
   </>

  )
}

export default EtherPools
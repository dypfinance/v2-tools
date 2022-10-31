import React, { useState } from 'react'
import TopPoolsCard from '../../top-pools-card/TopPoolsCard'

const EarnTopPicks = () => {

  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="row">
        <div className="top-picks-container">
        <TopPoolsCard
        top_pick={true}
        tokenName="DYP"
        apr={"1.09%"}
        tvl={"$48,382.30"}
        lockTime={"No lock"}
        onDetailsClick={() => {
          setShowDetails(!showDetails);
        }}
        showDetails={showDetails}
      />
        <TopPoolsCard
        top_pick={false}
        tokenName="DYP"
        apr={"1.09%"}
        tvl={"$48,382.30"}
        lockTime={"No lock"}
        onDetailsClick={() => {
          setShowDetails(!showDetails);
        }}
        showDetails={showDetails}
      />
        <TopPoolsCard
        top_pick={false}
        tokenName="DYP"
        apr={"1.09%"}
        tvl={"$48,382.30"}
        lockTime={"No lock"}
        onDetailsClick={() => {
          setShowDetails(!showDetails);
        }}
        showDetails={showDetails}
      />
        <TopPoolsCard
        top_pick={false}
        tokenName="DYP"
        apr={"1.09%"}
        tvl={"$48,382.30"}
        lockTime={"No lock"}
        onDetailsClick={() => {
          setShowDetails(!showDetails);
        }}
        showDetails={showDetails}
      />
        <TopPoolsCard
        top_pick={false}
        tokenName="DYP"
        apr={"1.09%"}
        tvl={"$48,382.30"}
        lockTime={"No lock"}
        onDetailsClick={() => {
          setShowDetails(!showDetails);
        }}
        showDetails={showDetails}
      />
        <TopPoolsCard
        top_pick={false}
        tokenName="DYP"
        apr={"1.09%"}
        tvl={"$48,382.30"}
        lockTime={"No lock"}
        onDetailsClick={() => {
          setShowDetails(!showDetails);
        }}
        showDetails={showDetails}
      />
        <TopPoolsCard
        top_pick={false}
        tokenName="DYP"
        apr={"1.09%"}
        tvl={"$48,382.30"}
        lockTime={"No lock"}
        onDetailsClick={() => {
          setShowDetails(!showDetails);
        }}
        showDetails={showDetails}
      />
        <TopPoolsCard
        top_pick={false}
        tokenName="DYP"
        apr={"1.09%"}
        tvl={"$48,382.30"}
        lockTime={"No lock"}
        onDetailsClick={() => {
          setShowDetails(!showDetails);
        }}
        showDetails={showDetails}
      />
        <TopPoolsCard
        top_pick={false}
        tokenName="DYP"
        apr={"1.09%"}
        tvl={"$48,382.30"}
        lockTime={"No lock"}
        onDetailsClick={() => {
          setShowDetails(!showDetails);
        }}
        showDetails={showDetails}
      />
        </div>
    </div>
  )
}

export default EarnTopPicks
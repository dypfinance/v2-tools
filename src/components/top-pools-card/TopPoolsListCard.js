import React, { useState } from 'react'
import dypLogo from './assets/dyplogo.svg'
import greenArrow from './assets/greenarrow.svg'
import orangeArrow from './assets/orangearrow.svg'
import TopPoolsDetails from './TopPoolsDetails'
import topPick from './assets/toppick.svg'

const TopPoolsListCard = ({
  tokenLogo,
  cardId,
  tokenName,
  apr,
  lockTime,
  tvl,
  // onDetailsClick,
  top_pick,
  // showDetails,
}) => {

  const [showDetails, setShowDetails] = useState(false);



  return (
    <> <div className="col-12 d-flex flex-row align-items-center justify-content-between list-pool-card mx-0">
    <div className="d-flex align-items-center gap-2" style={{width: '100px'}}>
      <img src={dypLogo} alt="" />
      <h5 className="text-white" style={{fontSize: '25px', fontWeight: '600'}}>{tokenName}</h5>
    </div>
    <div className="d-flex align-items-baseline gap-2">
      <h5 className="text-white" style={{fontSize: '25px', fontWeight: '600'}}>{apr}</h5>
      <p className="text-white" style={{fontSize: '17px', fontWeight: '600'}}>APR</p>
    </div>
    <div className="d-flex flex-column gap-2">
      <span style={{fontSize: '10px', fontWeight: '400', color: '#7a81b4'}}>Total Value Locked</span>
      <h5 style={{fontSize: '19px', fontWeight: '500', color: '#C0CBF7'}}>{tvl}</h5>
    </div>
    <div className="d-flex flex-column gap-2">
      <span style={{fontSize: '10px', fontWeight: '400', color: '#7a81b4'}}>Lock Time</span>
      <h5 style={{fontSize: '17px', fontWeight: '300', color: '#C0CBF7'}}>{lockTime}</h5>
    </div>
    <div className="d-flex justify-content-end" style={{width: '170px'}}>
    {top_pick &&
    <img src={topPick} alt="" />
    }
    <h6
          className="details-text gap-1 d-flex align-items-center cursor-pointer justify-content-end"
          style={{ color: showDetails === false ? "#75CAC2" : "#F8845B", width: '100px' }}
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails === false ? "Details" : "Close"}
          <img src={showDetails === false ? greenArrow : orangeArrow} />
        </h6>
    </div>
 </div>
 {showDetails && <TopPoolsDetails/>}</>
  )
}

export default TopPoolsListCard
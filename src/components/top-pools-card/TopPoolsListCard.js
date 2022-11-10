import React, { useEffect, useState } from 'react'
import dypLogo from './assets/dyplogo.svg'
import greenArrow from './assets/greenarrow.svg'
import orangeArrow from './assets/orangearrow.svg'
import TopPoolsDetails from './TopPoolsDetails'
import topPick from './assets/toppick.svg'
import './top-pools.css'

const TopPoolsListCard = ({
  tokenLogo,
  cardId,
  tokenName,
  apr,
  lockTime,
  tvl,
  onShowDetailsClick,
  onHideDetailsClick,
  top_pick,
  cardType,
  chain

  // showDetails,
}) => {


  const ethCoins = ["ethereum", "wbtc", "usdc", "usdt"];
  const bscCoins = ["bsc", "btcb", "ethereum", "busd", "pancakeswap", "idypius" ]
  const avaxCoins = ["avax", "ethereum", "wbtc", "usdt", "usdc", "dai", "idypius", "pangolin", "benqi", "xava", "link"]
  

  const [showDetails, setShowDetails] = useState(false);
  const [coins, setCoins] = useState(ethCoins);


  const handleDetails = () => {
    if(showDetails === false) {
      setShowDetails(true);
      onShowDetailsClick()
    }

    else if(showDetails === true) {
      setShowDetails(false);
      onHideDetailsClick()
    }
  }


  useEffect(() => {
    if(chain === 'eth'){
      setCoins(ethCoins)
    }else if(chain === 'bnb'){
      setCoins(bscCoins)
    }else if(chain === 'avax'){
      setCoins(avaxCoins)
    }
  }, [chain])
  


  return (
    <> <div className="col-12 d-flex flex-row align-items-center justify-content-between list-pool-card mx-0 cursor-pointer" onClick={() => handleDetails()}>
    <div className={`d-flex align-items-center ${cardType === 'Farming' || cardType === 'Buyback' ? null : 'gap-2'}`} style={{width: '100px'}}>
      {cardType === 'Farming' || cardType === 'Buyback' ?
      coins.length > 0 && coins.slice(0,5).map((coin, index) => (
        <img key={index} src={require(`./assets/${coin}.svg`).default} alt="" className="pool-coins" />
      ))
      :
      tokenLogo !== undefined &&
      <>
      <img src={require(`./assets/${tokenLogo}`).default} alt="" />
      <h5 className="text-white" style={{fontSize: '25px', fontWeight: '600'}}>{tokenName}</h5>
      </>
      
    }
      
    </div>
    <div className="d-flex align-items-baseline gap-2">
      <h5 className="text-white" style={{fontSize: '25px', fontWeight: '600'}}>{apr}</h5>
      <p className="text-white" style={{fontSize: '17px', fontWeight: '600'}}>APR</p>
    </div>
    {cardType !== 'Vault' &&
     <div className="d-flex flex-column gap-2">
     <span style={{fontSize: '10px', fontWeight: '400', color: '#7a81b4'}}>Total Value Locked</span>
     <h5 style={{fontSize: '19px', fontWeight: '500', color: '#C0CBF7'}}>{tvl}</h5>
   </div>
    }
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
 {/* {showDetails && <TopPoolsDetails/>} */}
 </>
  )
}

export default TopPoolsListCard
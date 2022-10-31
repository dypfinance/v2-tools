import React, { useState } from 'react'
import ethStake from '../../../assets/earnAssets/ethStake.svg'
import bnbStake from '../../../assets/earnAssets/bnbStake.svg'
import avaxStake from '../../../assets/earnAssets/avaxStake.svg'
import ethStakeActive from '../../../assets/earnAssets/ethStakeActive.svg'
import bnbStakeActive from '../../../assets/earnAssets/bnbStakeActive.svg'
import avaxStakeActive from '../../../assets/earnAssets/avaxStakeActive.svg'

const EarnContent = () => {

    const [stake, setStake] = useState("eth")

    const options = [
        'Staking',
        'Buyback',
        'Vault',
        'Farming'
    ]

  return (
    <div className="row justify-content-center">
        <div className="d-flex gap-3 justify-content-center p-5">
            {options.map((option, index) => (
            <div className="earn-option" key={index}>
                {option}
            </div>

            ))}
            
        </div>
        <div className="col-6">
            <p className="text-center" style={{color: '#7A81B4', fontSize: '13px', fontWeight: '400'}}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut ipsum quis ligula commodo sollicitudin ut dictum augue. Curabitur massa justo
            </p>
        </div>
        <hr />
        <div className="d-flex gap-3 justify-content-center p-5">
            <div className={`stake-item d-flex align-items-center gap-2 ${stake === "eth" ? 'stake-item-active': null}`} onClick={() => setStake('eth')}>
                <img src={stake === "eth" ? ethStakeActive : ethStake} alt="" />
                <div className="d-flex flex-column">
                    <p className='text-white' style={{fontSize: '11px', fontWeight: '300'}} >ETH Stake</p>
                    <p style={{fontSize: '11px' , fontWeight: '500', color: '#C0CBF7'}}>25% APR</p>
                </div>
            </div>
            <div className={`stake-item d-flex align-items-center gap-2 ${stake === "bnb" ? 'stake-item-active': null}`} onClick={() => setStake('bnb')}>
                <img src={stake === "bnb" ? bnbStakeActive : bnbStake} alt="" />
                <div className="d-flex flex-column">
                    <p className='text-white' style={{fontSize: '11px', fontWeight: '300'}} >BSC Stake</p>
                    <p style={{fontSize: '11px' , fontWeight: '500', color: '#C0CBF7'}}>25% APR</p>
                </div>
            </div>
            <div className={`stake-item d-flex align-items-center gap-2 ${stake === "avax" ? 'stake-item-active': null}`} onClick={() => setStake('avax')}>
                <img src={stake === "avax" ? avaxStakeActive : avaxStake} alt="" />
                <div className="d-flex flex-column">
                    <p className='text-white' style={{fontSize: '11px', fontWeight: '300'}} >AVAX Stake</p>
                    <p style={{fontSize: '11px' , fontWeight: '500', color: '#C0CBF7'}}>25% APR</p>
                </div>
            </div>
        </div>
    </div> 
  )
}

export default EarnContent
import React from 'react'
// import { SwapWidget, nereusTheme } from '@nitucr/1inch-widget';

const Swap = () => {

  const SupportedChainId = 
  {
    MAINNET: 1,
    BINANCE: 56,
    AVALANCHE: 43114,
    ARBITRUM_ONE: 42161,
    FANTOM: 250,
    POLYGON: 137,
  }

const defaultTypedValue = {
  [SupportedChainId.MAINNET]: '1000000000000000000',
  [SupportedChainId.BINANCE]: '1000000000000000000',
  [SupportedChainId.AVALANCHE]: '1000000000000000000',
  [SupportedChainId.ARBITRUM_ONE]: '1000000000000000000',
  [SupportedChainId.FANTOM]: '1000000000000000000',
  [SupportedChainId.POLYGON]: '1000000000000000000',

}


const defaultOutputTokenAddress =
{
  [SupportedChainId.MAINNET]: '0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17',
  [SupportedChainId.BINANCE]: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
  [SupportedChainId.AVALANCHE]: '0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17',
  [SupportedChainId.ARBITRUM_ONE]: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
  [SupportedChainId.POLYGON]: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
  [SupportedChainId.FANTOM]: '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83',
}

const defaultJsonRpcEndpoint = {
  [SupportedChainId.MAINNET]: 'https://cloudflare-eth.com',
  [SupportedChainId.ARBITRUM_ONE]: 'https://arb1.arbitrum.io/rpc',
  [SupportedChainId.POLYGON]: 'https://polygon-rpc.com/',
  [SupportedChainId.FANTOM]: 'https://rpc.ftm.tools',
  [SupportedChainId.BINANCE]: 'https://bsc-dataseed1.ninicoin.io',
  [SupportedChainId.AVALANCHE]: 'https://api.avax.network/ext/bc/C/rpc',
}
const referrerOptions = {
  [SupportedChainId.MAINNET]: {
    referrerAddress: '0x634Ce32Ce9484A9Aee578ddc16E45418ccD7Bf9d',
    fee: '0.05',
  },
  [SupportedChainId.FANTOM]: {
    referrerAddress: '0x634Ce32Ce9484A9Aee578ddc16E45418ccD7Bf9d',
    fee: '0.05',
  },
  [SupportedChainId.POLYGON]: {
    referrerAddress: '0x634Ce32Ce9484A9Aee578ddc16E45418ccD7Bf9d',
    fee: '0.05',
  },
  [SupportedChainId.BINANCE]: {
    referrerAddress: '0x634Ce32Ce9484A9Aee578ddc16E45418ccD7Bf9d',
    fee: '0.05',
  },
  [SupportedChainId.AVALANCHE]: {
    referrerAddress: '0x634Ce32Ce9484A9Aee578ddc16E45418ccD7Bf9d',
    fee: '0.05',
  },
  [SupportedChainId.ARBITRUM_ONE]: {
    referrerAddress: '0x634Ce32Ce9484A9Aee578ddc16E45418ccD7Bf9d',
    fee: '0.05',
  },
  
}


  return (
    <div className="container-lg d-flex justify-content-center" style={{minHeight: '100vh'}}>
            <iframe src="https://swap.dyp.finance/"
              className='swap-iframe'
                    width="400px"
                    height="537px"
                    id=""
                    overflow={"hidden"}
                    styles={{pointerEvents: "all"}}
                    display="block"
                    position="relative"/>
        </div>
  )
}

export default Swap
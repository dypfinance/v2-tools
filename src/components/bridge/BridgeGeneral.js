import React from "react";
import initBridgebsc from "./bridge-bsc";
import initBridge from "./bridge";
import BridgeFAQ from "./BridgeFAQ";

const Bridge = ({networkId,isConnected}) => {
  const Bridgebsc = initBridgebsc({
    bridgeETH: window.bridge_bsceth,
    bridgeBSC: window.bridge_bscbsc,
    tokenETH: window.token_dyp_bsceth,
    tokenBSC: window.token_dyp_bscbsc,
  });

  const Bridgeavax = initBridge({
    bridgeETH: window.bridge_eth,
    bridgeBSC: window.bridge_bsc,
    tokenETH: window.token_dyp_eth,
    tokenBSC: window.token_dyp_bsc,
  });

  return (
    <div>
      <Bridgeavax isConnected={isConnected} networkId={networkId}/>
      
      <BridgeFAQ />
    </div>
  );
};

export default Bridge;

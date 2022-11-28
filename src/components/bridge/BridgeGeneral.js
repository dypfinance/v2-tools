import React, { useState, useEffect } from "react";
import initBridge from "./bridge";
import BridgeFAQ from "./BridgeFAQ";

const Bridge = ({ networkId, isConnected, handleConnection }) => {
  const [destinationChain, setDestinationChain] = useState(
    networkId === 1 ? "bnb" : "eth"
  );

  const [sourceBridge, setSourceBridge] = useState(window.bridge_eth);
  const [destinationBridge, setDestinationBridge] = useState(
    window.bridge_bsceth
  );
  const [sourceToken, setSourceToken] = useState(window.token_dyp_eth);
  const [destinationToken, setDestinationToken] = useState(
    window.token_dyp_bsceth
  );

  useEffect(() => {
    if (networkId === 1) {
      if (destinationChain === "avax") {
        setSourceBridge(window.bridge_eth);
        setDestinationBridge(window.bridge_bsc);
        setSourceToken(window.token_dyp_eth);
        setDestinationToken(window.token_dyp_bsc);
      } else if (destinationChain === "bnb") {
        setSourceBridge(window.bridge_bsceth);
        setDestinationBridge(window.bridge_bscbsc);
        setSourceToken(window.token_dyp_bsceth);
        setDestinationToken(window.token_dyp_bscbsc);
      }
    } else if (networkId === 56) {
      setDestinationChain("eth");
      setSourceBridge(window.bridge_bsceth);
      setDestinationBridge(window.bridge_bscbsc);
      setSourceToken(window.token_dyp_bsceth);
      setDestinationToken(window.token_dyp_bscbsc);
    } else if (networkId === 43114) {
      setDestinationChain("eth");
      setSourceBridge(window.bridge_eth);
      setDestinationBridge(window.bridge_bsc);
      setSourceToken(window.token_dyp_eth);
      setDestinationToken(window.token_dyp_bsc);
    }
  }, [destinationChain, networkId]);

  const BridgeModal = initBridge({
    bridgeETH: sourceBridge,
    bridgeBSC: destinationBridge,
    tokenETH: sourceToken,
    tokenBSC: destinationToken,
  });

  return (
    <div className="container-lg">
      <BridgeModal
        isConnected={isConnected}
        networkId={networkId}
        handleConnection={handleConnection}
        destinationChain={destinationChain}
        onSelectChain={(value) => {
          setDestinationChain(value);
        }}
      />

      <BridgeFAQ />
    </div>
  );
};

export default Bridge;

import React, { useState, useEffect } from "react";
import initBridge from "./bridge";
import BridgeFAQ from "./BridgeFAQ";
import initBridgeidyp from "./bridge-idyp";
import dyp from "./assets/dyp.svg";
import idyp from "./assets/idyp.svg";
import "./bridge.css";
import { useLocation } from "react-router-dom";
import { handleSwitchNetworkhook } from "../../functions/hooks";


const Bridge = ({ networkId, isConnected, handleConnection, coinbase, handleSwitchNetwork }) => {
  const [destinationChain, setDestinationChain] = useState(
    networkId === 1 ? "bnb" : "eth"
  );

  const [sourceChain, setSourceChain] = useState(networkId === 1 ? "eth" : networkId === 56 ? 'bnb' : "avax");
  const [sourceChainiDyp, setSourceChainiDyp] = useState("eth");


  const [sourceBridge, setSourceBridge] = useState(window.bridge_eth);
  const [destinationBridge, setDestinationBridge] = useState(
    window.bridge_bsceth
  );
  const [sourceToken, setSourceToken] = useState(window.token_dyp_eth);
  const [destinationToken, setDestinationToken] = useState(
    window.token_dyp_bsceth
  );

  const [destinationChainiDyp, setDestinationChainiDyp] = useState(
    networkId === 1 ? "bnb" : "eth"
  );

  const [sourceBridgeiDyp, setSourceBridgeiDyp] = useState(
    window.bridge_idypeth
  );
  const [destinationBridgeiDyp, setDestinationBridgeiDyp] = useState(
    window.bridge_idypbsceth
  );
  const [sourceTokeniDyp, setSourceTokeniDyp] = useState(window.token_idyp_eth);
  const [destinationTokeniDyp, setDestinationTokeniDyp] = useState(
    window.token_idyp_bsceth
  );

  const routeData = useLocation();
  const [faqSection, setFaqSection] = useState(routeData.state?.section);



 const handleSourceChain = async(chainText) =>{
   if(chainText === 'eth') {
     await handleSwitchNetworkhook('0x1').then(()=>{
      handleSwitchNetwork('1')
      setSourceChain(chainText);
     }).catch((e)=>{
       console.log(e)
     })
   }

   if(chainText === 'bnb') {
    await handleSwitchNetworkhook("0x38").then(()=>{
       handleSwitchNetwork('56')
      setSourceChain(chainText);

    }).catch((e)=>{
      console.log(e)
    })
  }

  if(chainText === 'avax') {
    await handleSwitchNetworkhook("0xa86a").then(()=>{
       handleSwitchNetwork('43114')
      setSourceChain(chainText);
    }).catch((e)=>{
      console.log(e)
    })
  }

 }



 const handleSourceChainiDyp = async(chainText) =>{
  if(chainText === 'eth') {
    await handleSwitchNetworkhook('0x1').then(()=>{
     handleSwitchNetwork('1')
     setSourceChainiDyp(chainText);
    }).catch((e)=>{
      console.log(e)
    })
  }

  if(chainText === 'bnb') {
   await handleSwitchNetworkhook("0x38").then(()=>{
      handleSwitchNetwork('56')
      // setSourceChainiDyp(chainText);

   }).catch((e)=>{
     console.log(e)
   })
 }

 if(chainText === 'avax') {
   await handleSwitchNetworkhook("0xa86a").then(()=>{
      handleSwitchNetwork('43114')
      // setSourceChainiDyp(chainText);
   }).catch((e)=>{
     console.log(e)
   })
 }

}

 
  useEffect(() => {
    if (sourceChain === 'eth') {
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
    } else if (sourceChain === 'bnb') {
      setDestinationChain("eth");
      setSourceBridge(window.bridge_bsceth);
      setDestinationBridge(window.bridge_bscbsc);
      setSourceToken(window.token_dyp_bsceth);
      setDestinationToken(window.token_dyp_bscbsc);
    } else if (sourceChain === 'avax') {
      setDestinationChain("eth");
      setSourceBridge(window.bridge_eth);
      setDestinationBridge(window.bridge_bsc);
      setSourceToken(window.token_dyp_eth);
      setDestinationToken(window.token_dyp_bsc);
    }
  }, [destinationChain, sourceChain]);

  useEffect(() => {
    if (sourceChainiDyp === 'eth') {
      if (destinationChainiDyp === "avax") {
        setSourceBridgeiDyp(window.bridge_idypeth);
        setDestinationBridgeiDyp(window.bridge_idypbsc);
        setSourceTokeniDyp(window.token_idyp_eth);
        setDestinationTokeniDyp(window.token_idyp_bsc);
      } else if (destinationChainiDyp === "bnb") {
        setSourceBridgeiDyp(window.bridge_idypbsceth);
        setDestinationBridgeiDyp(window.bridge_idypbscbsc);
        setSourceTokeniDyp(window.token_idyp_bsceth);
        setDestinationTokeniDyp(window.token_idyp_bscbsc);
      }
    } else if (sourceChainiDyp === 'bnb') {
      setDestinationChainiDyp("eth");
      setSourceBridgeiDyp(window.bridge_idypbsceth);
      setDestinationBridgeiDyp(window.bridge_idypbscbsc);
      setSourceTokeniDyp(window.token_idyp_bsceth);
      setDestinationTokeniDyp(window.token_idyp_bscbsc);
    } else if (sourceChainiDyp === 'avax') {
      setDestinationChainiDyp("eth");
      setSourceBridgeiDyp(window.bridge_idypeth);
      setDestinationBridgeiDyp(window.bridge_idypbsc);
      setSourceTokeniDyp(window.token_idyp_eth);
      setDestinationTokeniDyp(window.token_idyp_bsc);
    }

    if (faqSection === "earnFaq") {
      setTimeout(() => {
        window.scrollTo(0, 1500);
        setFaqSection("none");
      }, 500);
    }
  }, [destinationChainiDyp, sourceChainiDyp]);

  const BridgeModal = initBridge({
    bridgeETH: sourceBridge,
    bridgeBSC: destinationBridge,
    tokenETH: sourceToken,
    tokenBSC: destinationToken,
  });

  const BridgeiDYPModal = initBridgeidyp({
    bridgeETH: sourceBridgeiDyp,
    bridgeBSC: destinationBridgeiDyp,
    tokenETH: sourceTokeniDyp,
    tokenBSC: destinationTokeniDyp,
  });

  return (
    <div className="container-lg">
      <div className="col-12 col-lg-5 d-flex flex-column justify-content-center gap-3 mb-4">
        <h3 className="text-white">Dypius Bridge</h3>
        <p className="text-white">
          Send tokens from Ethereum to BNB and Avalanche chains with ease.
          <br /> Every transaction is instant and secure.
        </p>
      </div>
      <div>
        <h3 className="text-white mb-4">
          <img src={dyp} alt="" /> DYP Bridge
        </h3>
        <BridgeModal
          isConnected={isConnected}
          networkId={networkId}
          handleConnection={handleConnection}
          destinationChain={destinationChain}
          onSelectChain={(value) => {
            setDestinationChain(value);
          }}
          onSelectSourceChain={(value) => {
            handleSourceChain(value)
          }}
          coinbase={coinbase}
          sourceChain={sourceChain}

        />
      </div>
      <div className="bigseparator mt-5 mb-5 col-6 col-xxl-5"></div>
      <div>
        <h3 className="text-white mb-4">
          <img src={idyp} alt="" /> iDYP Bridge
        </h3>

        <BridgeiDYPModal
          isConnected={isConnected}
          networkId={networkId}
          handleConnection={handleConnection}
          destinationChain={destinationChainiDyp}
          onSelectChain={(value) => {
            setDestinationChainiDyp(value);
          }}
          onSelectSourceChain={(value) => {
            handleSourceChainiDyp(value);
          }}
          sourceChain={sourceChainiDyp}
          coinbase={coinbase}
        />
      </div>
      <BridgeFAQ faqIndex={routeData.state ? routeData.state.faqIndex : -1} />
    </div>
  );
};

export default Bridge;

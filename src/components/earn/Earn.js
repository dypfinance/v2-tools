import React, { useEffect, useRef, useState } from "react";
import "./earn.css";
import EarnContent from "./EarnContent/EarnContent";
import EarnFaq from "./EarnFaq/EarnFaq";
import EarnHero from "./EarnHero/EarnHero";
import calculatorIcon from "../../assets/earnAssets/calculator.svg";
import Calculator from "../calculator/Calculator";
const Earn = ({
  coinbase,
  the_graph_result,
  lp_id,
  isConnected,
  network,
  handleConnection,
  the_graph_resultavax,
}) => {
  const [showCalculator, setShowCalculator] = useState(false);

  const html = document.querySelector("html");

  useEffect(() => {
    if (showCalculator === true) {
      html.classList.add("hidescroll");
    } else {
      html.classList.remove("hidescroll");
    }
  }, [showCalculator]);

  return (
    <div className="container-lg earn-wrapper d-flex flex-column justify-content-center align-items-center py-3 position-relative">
      <EarnHero />
      <EarnContent
        coinbase={coinbase}
        the_graph_result={the_graph_result}
        lp_id={lp_id}
        isConnected={isConnected}
        chainId={network}
        handleConnection={handleConnection}
        the_graph_resultavax={the_graph_resultavax}
      />
      <div
        className="calculator-btn d-flex justify-content-center align-items-center gap-2 text-white"
        onClick={() => setShowCalculator(true)}
      >
        <img src={calculatorIcon} alt="" style={{ width: 30, height: 30 }} />{" "}
        Calculator
      </div>
      {showCalculator && (
        <Calculator
          earnClass="earn-calculator"
          onClose={() => setShowCalculator(false)}
        />
      )}
    </div>
  );
};

export default Earn;

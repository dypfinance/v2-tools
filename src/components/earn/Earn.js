import React from "react";
import './earn.css'
import EarnContent from "./EarnContent/EarnContent";
import EarnFaq from "./EarnFaq/EarnFaq";
import EarnHero from "./EarnHero/EarnHero";
import EarnTopPicks from "./EarnTopPicks/EarnTopPicks";

const Earn = () => {
  return (
    <div className="container-lg earn-wrapper d-flex flex-column justify-content-center align-items-center py-3">
      <EarnHero />
      <EarnContent />
      <EarnFaq />
    </div>
  );
};

export default Earn;

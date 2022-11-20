import React from "react";
import "./launchpad.css";
import whiteArrow from './assets/whiteArrow.svg'
import BenefitsCard from "./BenefitsCard";

const Benefits = () => {

  const benefits = [
    {
      icon: 'benefitsAudit',
      title: 'Smart contract audits by a top-tier auditor'
    },
    {
      icon: 'benefitsCustomer',
      title: 'Know your customer (KYC) of the project team'
    },
    {
      icon: 'benefitsLocker',
      title: 'Liquidity locked utilizing DYP Locker'
    },
    {
      icon: 'benefitsContract',
      title: 'Team tokens locked on vesting contracts'
    }
  ]

  return (
    <div className="row px-3 mt-5">
      <div className="col-6 d-flex flex-column launch-project justify-content-end align-items-end p-4 gap-5">
        <h6 className="launch-project-title w-50">
          Launch your project with Dypius now!
        </h6>
        <button className="btn success-button d-flex align-items-center gap-2" style={{fontWeight: '500', fontSize: '12px', lineHeight: '18px'}}>
          Apply Now
          <img src={whiteArrow} alt="" />
        </button>
      </div>
      <div className="col-6 benefits px-4">
        <div className="d-flex align-items-center justify-content-end">
          <h6 className="launchpad-hero-title">Benefits</h6>
        </div>
        <div className="benefits-card-container mt-5">
        {benefits.map((item) => (
          <BenefitsCard title={item.title} icon={item.icon} />
        ))}
        </div>
      </div>
    </div>
  );
};

export default Benefits;

import React, { useEffect, useState } from "react";
import metamaskVideo from '../../../assets/earnAssets/metamaskVideo.png'
import stakeVideo from '../../../assets/earnAssets/stakeVideo.png'
import playButton from '../../../assets/earnAssets/playButton.svg'
import axios from "axios";
import DisabledButton from "../../disabledButton/DisabledButton";
import SuccessButton from "../../universalButton/UniversalButton";
import UniversalButton from "../../universalButton/UniversalButton";

const EarnFaq = ({faqTypes}) => {

  const categories = [
    
    {
      id: "63481594d7e11d6f1849f730",
      title: "Stake",
      icon: "stake"
    },
    {
      id: "63488547062d4b709c4a250b",
      title: "Buyback",
      icon: "buyback"
    },
    {
      id: "634885c5062d4b709c4a250f",
      title: "Vault",
      icon: "vault"
    },
    {
      id: "6348811e062d4b709c4a24f9",
      title: "Farming",
      icon: "farm"
    },
   
   
  ]

  const [faqItems, setFaqItems] = useState([])
  const [faqTitle, setFaqTitle] = useState('')

  const fetchFaq = async(category) => {
    await axios.get(`https://news-manage.dyp.finance/api/faqs/${category.id}`).then((res) => {
      setFaqItems(res.data)
      setFaqTitle(category.title)
    }).catch((err) => console.error(err)) 
  }

  useEffect(() => {
    if(faqTypes === 'Staking'){
      fetchFaq(categories[0])
    }else if(faqTypes === 'Buyback'){
      fetchFaq(categories[1])
    }else if(faqTypes === 'Vault'){
      fetchFaq(categories[2])
    }else{
      fetchFaq(categories[3])
    }
  }, [faqTypes])
  


  return (
    <div className="row w-100 my-5 py-3 px-1 m-3 faq-container">
      <div className="col-7">
        <h3 className="mb-3" style={{color: '#f7f7fc'}}>{faqTitle} FAQs</h3>
        <div className="accordion" id="accordionExample">
         {faqItems.map((faqItem) => (
           <div className="accordion-item">
           <h2 className="accordion-header" id="headingOne">
             <button
               className="accordion-button collapsed"
               type="button"
               data-bs-toggle="collapse"
               data-bs-target={`#${faqItem.collapse}`}
               aria-expanded="true"
               aria-controls={faqItem.collapse}
             >
              {faqItem.title}
             </button>
           </h2>
           <div
             id={faqItem.collapse}
             className="accordion-collapse collapse"
             aria-labelledby={faqItem.heading}
             data-bs-parent="#accordionExample"
           >
             <div className="accordion-body" dangerouslySetInnerHTML={{ __html: faqItem.content}}>
             </div>
           </div>
         </div>
         ))}
        </div>
      </div>
      <div className="col-5">
      <h3 className="mb-3" style={{color: '#f7f7fc'}}>Video guide</h3>
       <div className="video-container">
       <div className="video-item">
        <div className="video-wrapper position-relative">
            <img src={metamaskVideo} alt="" className="video" />
            <img src={playButton} alt="" className="play-button" />
        </div>
        <p style={{color: '#7a81b4', fontSize: '13px'}}>How to set up</p>
        <h5 style={{color: '#C0CBF7', fontSize: '17px'}}>DYP for Metamask</h5>
        </div>
        <div className="video-item">
        <div className="video-wrapper position-relative">
            <img src={stakeVideo} alt="" className="video" />
            <img src={playButton} alt="" className="play-button" />
        </div>
        <p style={{color: '#7a81b4', fontSize: '13px'}}>How to stake</p>
        <h5 style={{color: '#C0CBF7', fontSize: '17px'}}>DYP for Stake</h5>
        </div>
       </div>
      </div> 
    </div>
  );
};

export default EarnFaq;

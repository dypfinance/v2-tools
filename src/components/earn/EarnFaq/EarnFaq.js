import React from "react";
import metamaskVideo from '../../../assets/earnAssets/metamaskVideo.png'
import stakeVideo from '../../../assets/earnAssets/stakeVideo.png'
import playButton from '../../../assets/earnAssets/playButton.svg'

const EarnFaq = () => {
  return (
    <div className="row w-100 my-5 py-3 px-1 m-3 faq-container">
      <div className="col-7">
        <h3 className="mb-3" style={{color: '#c6c6d0'}}>Earn FAQ</h3>
        <div class="accordion" id="accordionExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Accordion Item #1
              </button>
            </h2>
            <div
              id="collapseOne"
              class="accordion-collapse collapse"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                <strong>This is the first item's accordion body.</strong> It is
                shown by default, until the collapse plugin adds the appropriate
                classes that we use to style each element. These classes control
                the overall appearance, as well as the showing and hiding via
                CSS transitions. You can modify any of this with custom CSS or
                overriding our default variables. It's also worth noting that
                just about any HTML can go within the{" "}
                <code>.accordion-body</code>, though the transition does limit
                overflow.
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                Accordion Item #2
              </button>
            </h2>
            <div
              id="collapseTwo"
              class="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                <strong>This is the second item's accordion body.</strong> It is
                hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions. You can modify any of this with
                custom CSS or overriding our default variables. It's also worth
                noting that just about any HTML can go within the{" "}
                <code>.accordion-body</code>, though the transition does limit
                overflow.
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                Accordion Item #3
              </button>
            </h2>
            <div
              id="collapseThree"
              class="accordion-collapse collapse"
              aria-labelledby="headingThree"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                <strong>This is the third item's accordion body.</strong> It is
                hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions. You can modify any of this with
                custom CSS or overriding our default variables. It's also worth
                noting that just about any HTML can go within the{" "}
                <code>.accordion-body</code>, though the transition does limit
                overflow.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-5">
      <h3 className="mb-3" style={{color: '#c6c6d0'}}>Video guide</h3>
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

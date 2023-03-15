import React, { useEffect } from 'react'
import { CommonTopNav } from '../../../components/layout/Header';
import "../../../assets/styles/digigold/digigold-gift.css"

const Gift = ({ setIsCommonTopNav }) => {
    useEffect(() => {
        setIsCommonTopNav(false);
    
      return () => {
        setIsCommonTopNav(true)
      }
    }, [])
    
  return (
    <>
     <CommonTopNav />
   
    <section class="section-align buy-sell-form">
    <div class="container">

        <div class="digital-gold-section-head">
            <h1 class="section-head-title">
                THE BEST <span>GIFT</span> FOR YOUR LOVED ONES
            </h1> 
        </div>

        <div class="row">
            <div class="col-lg-12">

               {/* <div class="col-lg-7 mx-auto digigold-logintext">
                <p class="digigold-logintext-title">You are not login</p>
                <button href="#" class="digigold-logintext-btn btn-primery">Register now</button>
              </div>  */}

                <div class="my-vault-wrapper">
                  <div class="col-lg-7 mx-auto my-vault-outer">

                    <div class="my-vault-badge-wrapper">
                      <span class="my-vault-badge">My Vault</span>
                    </div>
                    <div class="my-vault-inner">

                      <div class="vault-value">
                        <p class="vault-value-text">Gold Grams</p>
                        <p class="vault-value-count">0.0000 Grams</p>
                      </div>
                      <div class="vertical-separator"></div>
                      <div class="vault-value">
                        <p class="vault-value-text">Silver Grams</p>
                        <p class="vault-value-count">0.0000 Grams</p>
                      </div>

                    </div>

                  </div>
                </div>

                <div class="buy-sell-form-outer">
                    <div class="current-rate-outer">
                        <div class="current-rate">
                            <span class="current-rate-title">GOLD</span>
                            <span class="current-rate-amt"> &#x20B9; 2,552.60 / gm</span>
                        </div>
                        <div class="digi-icon d-none d-md-block">
                            <img src="images/digigold-images/digi-icon.svg" />
                        </div>
                        <div class="vertical-separator d-md-none d-sm-block"></div>
                        <div class="current-rate">
                            <span class="current-rate-title">SILVER</span>
                            <span class="current-rate-amt"> &#x20B9; 70.60 / gm</span>
                        </div>
                    </div>

                 {/* <div class="buy-sell-option">
                        <a class="option-active" href="#">Buy</a>
                        <a href="#">Sell</a>
                    </div>  */}

                    

                    <div class="buy-sell-tab-outer">
                        <form class="buy-sell-tab-inner">

                            
                                <div class="gift-recipient-outer">
                                    <div class="gift-recipient-input-wrapper">
                                        <div class="input">
                                            <input id="grams" name="Grams" type="text" placeholder="&nbsp" autocomplete="off"/>
                                            <label for="grams">Enter the Recipient’s Mobile Number</label>
                                        </div>
                                    </div>
                                </div>
                            

                            <ul class="nav nav-pills tab-pills-wrapper">
                                <li class="nav-item tab-pills">
                                  <a class="nav-link active tab-pills-link" data-toggle="pill" href="#goldrate" role="tab" aria-controls="pills-gold" aria-selected="true">GOLD 24k 999</a>
                                </li>
                                <li class="nav-item tab-pills">
                                  <a class="nav-link tab-pills-link" data-toggle="pill" href="#silverrate" role="tab" aria-controls="pills-silver" aria-selected="false">SILVER 24k 999</a>
                                </li>
                              </ul>
                              <div class="tab-content mt-3">
                                <div class="tab-pane fade show active" id="goldrate" role="tabpanel" aria-labelledby="gold-tab">
                                    <div class="col-lg-12">

                                      <div class="row align-items-center">
                                        <div class="input-wrapper">
                                          <div class="input">
                                              <input id="grams" name="Grams" type="text" placeholder="&nbsp" autocomplete="off"/>
                                              <label for="grams">Quantity ( in gm)*</label>
                                          </div>
                                        </div>
                                        <div class="exchange-arrow-outer text-center">
                                            <span class="exchange-arrow"> <img src="images/digigold-images/two-arrows.svg" /> </span>
                                        </div>
                                        <div class="input-wrapper">
                                            <div class="input">
                                                <input id="amount" name="Amount" type="text" placeholder="&nbsp" autocomplete="off"/>
                                                <label for="amount">Amount (₹)*</label>
                                            </div>
                                        </div>
                                      </div> 

                                      <div class="buy-btn">
                                        <button type="button" class="btn-primery quick-buy" id="digigold-otp" data-toggle="modal" data-target="#digigoldotpform">Send Gift</button>
                                      </div>

                                    </div>
                                </div>
                                <div class="tab-pane fade" id="silverrate" role="tabpanel" aria-labelledby="silver-tab">
                                  <div class="col-lg-12">

                                    <div class="row align-items-center">
                                      <div class="input-wrapper">
                                        <div class="input">
                                            <input id="grams" name="Grams" type="text" placeholder="&nbsp" autocomplete="off"/>
                                            <label for="grams">Quantity ( in gm)*</label>
                                        </div>
                                      </div>
                                      <div class="exchange-arrow-outer text-center">
                                          <span class="exchange-arrow"> <img src="images/digigold-images/two-arrows.svg" /> </span>
                                      </div>
                                      <div class="input-wrapper">
                                          <div class="input">
                                              <input id="amount" name="Amount" type="text" placeholder="&nbsp" autocomplete="off"/>
                                              <label for="amount">Amount (₹)*</label>
                                          </div>
                                      </div>
                                    </div>

                                    <div class="buy-btn">
                                      <button class="btn-primery quick-buy" >Send Gift</button>
                                    </div>

                                  </div>
                                </div>
                            </div> 

                        </form>
                    </div>

                </div>
            </div>
        </div>
    </div>

</section>
</>
  )
}

export default Gift
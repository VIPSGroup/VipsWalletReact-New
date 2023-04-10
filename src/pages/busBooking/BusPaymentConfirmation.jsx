import React from 'react'

const BusPaymentConfirmation = () => {
  return (
    <section class="bus-booking-section">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-8">
          <div class="bus-list-card-wrapper">
              
            <div class="bus-list-card-outer box-shadow-1">
              <div class="bus-list-card-inner">
                <div class="col-lg-9 col-md-12 col-sm-12 bus-info-card-outer">
                  <div class="bus-card-info-left">
                    <div class="bus-info-wrapper">
                      <p class="bus-name-info"> Prasanna Purple Grand </p>
                      <div class="bus-seat-info-wrapper">
                        <p class="bus-type-info">A/C Sleeper (2+1)</p>
                        
                      </div>
                      <div class="d-block d-sm-none">
                        <div class="bus-travel-time-sm">
                          <span>21:01</span> 
                          <hr class="dashline"/>
                          <p class="bus-travel-time mb-0">14h:59m</p>
                          <hr class="dashline"/>
                          <span>09:46</span>
                        </div>
                      </div>
                    </div>
                  </div>
    
                  <div class="bus-status-wrapper">
                    <div class="bus-time-status-info">
  
                      <div>
                          <p class="d-block d-sm-none mb-1">Boarding Point</p>
                          <p class="bus-time-info">21:01 Pune</p>
                          <p class="text-gray">Fri, 17 February</p>
                          <p>Moshi Toll Naka</p>
                      </div>
  
                      <div class="dropdown-divider w-100 d-block d-sm-none"></div>
                      
                      <div class="arrow-dashline-outer">
                        <div class="arrow-dashline">
                          <span class="arrow-circle"></span>
                          <hr class="dashline"/>
                          <img src="../images/bus-booking/bus-icon.svg" />
                        </div>
                        <p class="bus-travel-time">14h:59m</p>
                      </div>
                      
                      <div>
                          <p class="d-block d-sm-none mb-1">Drop Point</p>
                          <p class="bus-time-info">09:46 Yavatmal</p>
                          <p class="text-gray">Sat, 18 February</p>
                          <p>Byeco Point</p>
                      </div>
                      
                    </div>
                    
                  </div>
                </div>
  
                <div class="dropdown-divider w-100 d-block d-sm-none"></div>
  
                <div class="col-lg-3 col-md-12 col-sm-12 bus-price-info-outer">
                  <p class="bus-selected-seats mb-0"> 4 Seats Selected</p>
                  <button class="select-bus-seat-btn">View Details</button>
                </div>
              </div>
  
              <div class="col-lg-12">
                  <div class="show-traveller-info">
                      <div>
                          <p class="bus-name-info mb-2">Primary Contact :</p>
                          <p><i class="fa-solid fa-phone"></i> +91 7057739852</p>
                          <p><i class="fa-solid fa-envelope"></i> misssuppriyamorade@gmail.com</p>
                      </div>
  
                      <div class="dropdown-divider w-100"></div>
  
                      <div class="">
                          <p class="bus-name-info mb-2">Traveller Information :</p>
                          <div class="col-lg-12">
                              <div class="row traveler-info">
                                  <div class="col-lg-4 col-sm-4">
                                      <p>Ms Supriya Morade</p>
                                  </div>
                                  <div class="col-lg-4 col-sm-4 text-sm-center text-left">
                                      <p>Age: 26 | Female</p>
                                  </div>
                                  <div class="col-lg-4 col-sm-4 text-left text-sm-right">
                                      <p>Seat: 22L</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
            </div> 
          </div>

  
          <div class="bus-payment-card-wrapper box-shadow-1">
              <div class="row">
                  <div class="col-md-12 bus-payment-content-head">
                    <h3 class="bus-payment-content-title"> Get Discount with Recharge </h3>
                  </div>
              </div>
              <div class="bus-paymet-info-outer">
                  <div class="bus-payment-discount">
                      <form>
                          <div class="bus-paymet-discount-info mb-4">
                              <div class="col-lg-8 col-sm-8 p-0">
                                  <label>
                                      <input type="radio" name="radio-button" value="css" />
                                      <span> <img src="../images/services/mob-payment-discount.png" class="img-fluid bus-payment-discount-img" /> Shopping Point (65044.62) </span>
                                  </label>
  
                              </div>
                              <div class="col-lg-4 col-sm-4 p-0">
                                  <p class="bus-paymet-discount-amt"> &#x20B9; 5.00 </p>
                              </div>
                          </div>
  
                          <div class="bus-paymet-discount-info">
                              <div class="col-lg-8 col-sm-8 p-0">
                                  <label>
                                      <input type="radio" name="radio-button" value="no" />
                                      <span> <img src="../images/services/mob-payment-discount.png" class="img-fluid bus-payment-discount-img" /> Prime Point (5044.62) </span>
                                  </label>
  
                              </div>
                              <div class="col-lg-4 col-sm-4 p-0">
                                  <p class="bus-paymet-Prime-amt"> &#x20B9; 0.00 </p>
                              </div>
                          </div> 
  
                      </form>
                  </div>
              </div> 
          </div>
  
          <div class="bus-payment-card-wrapper box-shadow-1">
              <div class="row">
                  <div class="col-md-12 bus-payment-content-head">
                    <h3 class="bus-payment-content-title"> Debit From  </h3>
                  </div>
              </div>
              <div class="bus-paymet-info-outer">
                  <div class="bus-payment-discount">
                      <form>
                          <div class="bus-paymet-discount-info mb-4">
                              <div class="col-lg-8 col-sm-8 p-0">  
                                  <div class="custom-control custom-checkbox checkStyle">
                                      <input type="checkbox" class="custom-control-input" id="vips-wallet"/>
                                      <label class="custom-control-label" for="vips-wallet">
                                          <img src="../images/logos/vips-logo-small.png" class="img-fluid bus-payment-debit-vips-img" /> VIPS Wallet (₹ 5,72,93,773.35)
                                      </label>
                                  </div>
                              </div>
                              <div class="col-lg-4 col-sm-4 p-0">
                                  <p class="bus-paymet-discount-amt"> &#x20B9; 99.00 </p>
                              </div>
                          </div>
  
                          <div class="bus-paymet-discount-info">
                              <div class="col-lg-8 col-sm-8 p-0"> 
                                  <div class="custom-control custom-checkbox checkStyle">
                                      <input type="checkbox" class="custom-control-input" id="payu-card"/>
                                      <label class="custom-control-label" for="payu-card"> 
                                          <img src="../images/logos/payu-logo.png" class="img-fluid bus-payment-debit-payu-img" /> Payu (card / UPI)
                                      </label>
                                  </div> 
                              </div>
                              <div class="col-lg-4 col-sm-4 p-0">
                                  <p class="bus-paymet-Prime-amt"> &#x20B9; 0.00 </p>
                              </div>
                          </div> 
  
                      </form>
                  </div>
              </div> 
          </div>
        </div>
        <div class="col-lg-4">
          <div class="bus-paysummery-wrapper box-shadow-1">
  
            <div class="bus-paysummery-head ">
              <p class="bus-paysummery-title"> Fare Summary </p>
              <button class="bus-paysummery-info">View Details</button>
            </div>
  
            <div class="bus-paysummery-box">
              <div class="row mb-3">
                  <div class="col-7 col-xs-4">
                    <span class="bus-paysummery-text"> Base Fare (1 Traveler) </span>
                  </div>
                  <div class="col-5 col-xs-4 text-right">
                    <span class="bus-paysummery-amt"> &#x20B9; 1,410.00 </span>
                  </div>
              </div>
  
              <div class="row mb-3">
                  <div class="col-7 col-xs-4">
                    <span class="bus-paysummery-text"> Shopping Point (0.0%) </span>
                  </div>
                  <div class="col-5 col-xs-4 text-right">
                    <span class="bus-paysummery-amt"> +&#x20B9; 0.00 </span>
                  </div>
              </div>
  
              <div class="dropdown-divider"></div>
  
              <div class="show-details-summery">
                  <div class="row mb-3">
                      <div class="col-7 col-xs-4">
                        <span class="bus-paysummery-text"> Total Tax Fare </span>
                      </div>
                      <div class="col-5 col-xs-4 text-right">
                        <span class="bus-paysummery-amt"> +&#x20B9; 0.00 </span>
                      </div>
                  </div>
  
                  <div class="row mb-3">
                      <div class="col-7 col-xs-4">
                        <span class="bus-paysummery-text"> Total CGST </span>
                      </div>
                      <div class="col-5 col-xs-4 text-right">
                        <span class="bus-paysummery-amt"> +&#x20B9; 0.00 </span>
                      </div>
                  </div>
  
                  <div class="row mb-3">
                      <div class="col-7 col-xs-4">
                        <span class="bus-paysummery-text"> Total SGST </span>
                      </div>
                      <div class="col-5 col-xs-4 text-right">
                        <span class="bus-paysummery-amt"> +&#x20B9; 0.00 </span>
                      </div>
                  </div>
  
                  <div class="row mb-3">
                      <div class="col-7 col-xs-4">
                        <span class="bus-paysummery-text"> Total IGST </span>
                      </div>
                      <div class="col-5 col-xs-4 text-right">
                        <span class="bus-paysummery-amt"> +&#x20B9; 0.00 </span>
                      </div>
                  </div>
              </div>
  
              <div class="row mt-3">
                  <div class="col-7 col-xs-4">
                    <span class="total-amt"> Total Amount </span>
                  </div>
                  <div class="col-5 col-xs-4 text-right">
                    <span class="total-amt"> &#x20B9; 1,410.00 </span>
                  </div>
              </div>
  
            </div>
  
            <div class="col-md-12"> 
              <div class="bus-payment-btn">
                  <button href="#" class="btn-primery"> Confirm Payment </button>
              </div> 
          </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default BusPaymentConfirmation
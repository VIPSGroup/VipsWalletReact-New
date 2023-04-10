import React from 'react'
import "../../assets/styles/bus/bus-review-itinerary.css";
import "../../assets/styles/bus/bus-flow-comman.css";
import { useNavigate } from 'react-router-dom';

const Review_Itinerary = () => {
 const navigate= useNavigate()
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
                <button class="select-bus-seat-btn">Modify Search</button>
              </div>
            </div>
            
          </div>
          
        </div>
        <div class="bg-card-wrapper box-shadow-1">
            <div class="col-xl-12">
                <div class="card-title-info">
                    <p class="card-main-title">Enter Contact Details</p>
                </div>
                <div class="row bus-form-elements">
                    <div class="col-xl-6">
                        <div class="bus-form-mobile-input">
                            <div class="form-group input-group input-field"> 
                                <span class="input-group-prepend">
                                    <div class="input-group-text">+91</div>
                                </span>
                                <input id="user-mobile" class="mobile-input" type="text" placeholder="&nbsp;" autocomplete="off" />
                                <label for="user-mobile"> Phone </label>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-6">
                        <div class="input-field"> 
                            <input id="emailid" type="email" placeholder="&nbsp;" autocomplete="off" />
                            <label for="emailid">Email ID</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-card-wrapper box-shadow-1">
            <div class="col-xl-12">
                <div class="card-title-info">
                    <p class="card-main-title">Enter Travelers Details </p>
                    <p class="card-sub-title">Please make sure you enter the Name as per your Govt. photo id</p>
                </div>
                <div class="row ">
                    
                  <div class="col-xl-12">
                    <div class="accordion" >
                      <div class="accordion-group-tab">
                          <p class="collapsed accordian-tab-title"  data-toggle="collapse" data-target="#collapse-1" aria-expanded="true" aria-controls="collapse-1">
                              Saved Passenger (2)<i class="fa arrow-expand" aria-hidden="true"></i>
                          </p>
                        <div id="collapse-1" class="collapse">
                          <div class="passenger-detail-wrapper">

                            <div class="passenger-detail">
                              <div class="select-radio-btn rdio-primary"> 
                                <input name="radio" value="1" id="radio1" type="radio"/>
                                <label for="radio1" class="passenger-detail-label"> 
                                  <p class="passenger-name">Ms. Supriya Morade</p> <p>26 | Female</p>
                                </label>
                              </div>
                              <div class="passenger-remove">
                                <button class="passenger-remove-btn"> <i class="fa-sharp fa-regular fa-circle-xmark"></i> </button>
                              </div>
                            </div>

                            <div class="passenger-detail">
                              <div class="select-radio-btn rdio-primary"> 
                                <input name="radio" value="1" id="radio1" type="radio"/>
                                <label for="radio1" class="passenger-detail-label"> 
                                  <p class="passenger-name">Ms. Supriya Morade</p> <p>26 | Female</p>
                                </label>
                              </div>
                              <div class="passenger-remove">
                                <button class="passenger-remove-btn"> <i class="fa-sharp fa-regular fa-circle-xmark"></i> </button>
                              </div>
                            </div>

                          </div>
                          
                        </div>
                      </div>

                      <div class="accordion-group-tab">
                        <p class="collapsed accordian-tab-title"  data-toggle="collapse" data-target="#collapse-2" aria-expanded="true" aria-controls="collapse-2">
                          Seat No: 10L<i class="fa arrow-expand" aria-hidden="true"></i>
                        </p>
                        <div id="collapse-2" class="collapse"  >
                          <div class="passenger-detail-wrapper">

                            <div class="gender-info">
                              <div class="select-radio-btn rdio-primary"> 
                                <input name="radio" value="1" id="radio1" type="radio"/>
                                <label for="radio1" class="passenger-detail-label"> 
                                  Male
                                </label>
                              </div>

                              <div class="select-radio-btn rdio-primary"> 
                                <input name="radio" value="1" id="radio1" type="radio"/>
                                <label for="radio1" class="passenger-detail-label"> 
                                  Female
                                </label>
                              </div>
                            </div>

                            <div class="row bus-form-elements seat-info-form">
                              <div class="col-lg-3">
                                <div class="input-field "> 
                                  <input id="firstname" type="email" placeholder="&nbsp;" autocomplete="off" />
                                  <label for="firstname">First Name</label>
                                </div>
                              </div>
                              <div class="col-lg-3">
                                <div class="input-field "> 
                                  <input id="lastname" type="email" placeholder="&nbsp;" autocomplete="off" />
                                  <label for="lastname">Last name</label>
                                </div>
                              </div>
                              <div class="col-lg-3">
                                <div class="input-field "> 
                                  <input id="age" type="email" placeholder="&nbsp;" autocomplete="off" />
                                  <label for="age">Age ( In Year)</label>
                                </div>
                              </div>
                              <div class="col-lg-3 seat-info-save">
                                <button class="btn-cta "> Save </button>
                              </div>
                            </div>
                            

                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                    
                </div>
            </div>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="bus-paysummery-wrapper box-shadow-1">

          <div class="bus-paysummery-head ">
            <p class="bus-paysummery-title"> Fare Summary </p>
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
            <div class="bus-payment-btn" onClick={()=>{navigate("/bus/confirm")}}>
                <button href="#" class="btn-primery"> Continue & Pay </button>
            </div> 
        </div>

        </div>
      </div>

    </div>
  </div>
</section>
  )
}

export default Review_Itinerary
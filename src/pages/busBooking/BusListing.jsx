import React, { useEffect, useState } from "react";
import "../../assets/styles/bus/bus-listing-page.css";
import {
  BusList,
  BusListingForm,
  SelectionPoint,
} from "../../components/busBooking";
import { useNavigate } from "react-router-dom";

const BusListing = ({ setIsFooter }) => {
  const [mobileScreen, setMobileScreen] = useState();
  const [showBusList, setShowBusList] = useState(true);
const navigate= useNavigate()
  const resize = () => {
    if (window.innerWidth < 912) {
      setMobileScreen(true);
    } else {
      setMobileScreen(false);
    }
  };
  useEffect(() => {
    if (!mobileScreen) {
      resize();
    }
    window.addEventListener("resize", resize);
    if (mobileScreen) {
      setIsFooter(false);
    } else {
      setIsFooter(true);
    }

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [mobileScreen]);

  return (
    <>
      <BusListingForm />
      {mobileScreen ? 
        <>
        {showBusList
        ?<BusList setShowBusList={setShowBusList} />
      :<SelectionPoint/>}
          
          {/*  */}
        </>
       : <>
       <section class="inpage-section-align bus-booking-list dp-resp-view">
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-3">
        <div class="bus-listing-left-sidebar box-shadow-1">

          <div class="bus-filter-head filter-box-separator">
            <p class="filter-head-title"> Filters </p>
            <button class="reset-filter-btn">Reset All</button>
          </div>

          <div class="bus-type-filter filter-box-separator">
            <div class="bus-type-filter-head">
              <p class="bus-type-filter-title">Bus Type</p>
              <button class="bus-type-filter-reset">Reset</button>
            </div>
            <div class="bus-type-filter-list">
              <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="ac-filter"/>
                <label class="custom-control-label" for="ac-filter"> AC </label>
              </div>
              <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="nonac-filter"/>
                <label class="custom-control-label" for="nonac-filter"> Non Ac </label>
              </div>
              <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="sleeper-filter"/>
                <label class="custom-control-label" for="sleeper-filter"> Sleeper </label>
              </div>
              <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="seater-filter"/>
                <label class="custom-control-label" for="seater-filter"> Seater </label>
              </div>
            </div>
          </div>

          <div class="bus-type-filter filter-box-separator">
            <div class="bus-type-filter-head">
              <p class="bus-type-filter-title">Boarding Points</p>
              <button class="bus-type-filter-reset">Reset</button>

              <div class="search-point">
                <div class="input-group">
                  <input type="text" class="form-control" placeholder="Enter/Search boarding point"/>
                  <div class="input-group-append">
                    <button class="btn " type="button">
                      <i class="fa fa-search"></i>
                    </button>
                  </div>
                </div>
              </div>

            </div>
            <div class="bus-type-filter-list">
              <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="boarding-p1"/>
                <label class="custom-control-label" for="boarding-p1"> Nigdi </label>
              </div>
              <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="boarding-p2"/>
                <label class="custom-control-label" for="boarding-p2"> Birla Hospital </label>
              </div>
              <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="boarding-p3"/>
                <label class="custom-control-label" for="boarding-p3"> Sangamwadi </label>
              </div>
              <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="boarding-p4"/>
                <label class="custom-control-label" for="boarding-p4"> New Sangavi </label>
              </div>
              <button class="reset-filter-btn"> + Show all boarding points </button>
            </div>
          </div>

          <div class="bus-type-filter filter-box-separator">
            <div class="bus-type-filter-head">
              <p class="bus-type-filter-title">Droping Points</p>
              <button class="bus-type-filter-reset">Reset</button>

              <div class="search-point">
                <div class="input-group">
                  <input type="text" class="form-control" placeholder="Enter/Search boarding point"/>
                  <div class="input-group-append">
                    <button class="btn " type="button">
                      <i class="fa fa-search"></i>
                    </button>
                  </div>
                </div>
              </div>

            </div>
            <div class="bus-type-filter-list">
              <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="droping-p1"/>
                <label class="custom-control-label" for="droping-p1"> Nigdi </label>
              </div>
              <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="droping-p2"/>
                <label class="custom-control-label" for="droping-p2"> Birla Hospital </label>
              </div>
              <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="droping-p3"/>
                <label class="custom-control-label" for="droping-p3"> Sangamwadi </label>
              </div>
              <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="droping-p4"/>
                <label class="custom-control-label" for="droping-p4"> New Sangavi </label>
              </div>
              <button class="reset-filter-btn"> + Show all boarding points </button>
            </div>
          </div>

          <div class="bus-type-filter filter-box-separator">
            <div class="bus-type-filter-head">
              <p class="bus-type-filter-title">Departure from Pune</p>
              <button class="bus-type-filter-reset">Reset</button>
            </div>
            <div class="bus-time-filter-box">

              <button class="time-filter-btn">
                <img src="../images/bus-booking/sunrise.svg" alt="sunrise"/>  
                <p>Morning</p>
                <p class="filter-time"> 6AM - 12PM</p>
              </button>
              <button class="time-filter-btn">
                <img src="../images/bus-booking/sun.svg" alt="sun"/>  
                <p>Afternoon</p>
                <p class="filter-time"> 12PM - 6PM</p>
              </button>
              <button class="time-filter-btn">
                <img src="../images/bus-booking/evening-sun.svg" alt="evening-sun"/>  
                <p>Evening</p>
                <p class="filter-time"> 6AM - 12PM</p>
              </button>
              <button class="time-filter-btn">
                <img src="../images/bus-booking/moon.svg" alt="moon" />  
                <p>Night</p>
                <p class="filter-time"> 12PM - 6AM</p>
              </button>
              
            </div>
          </div>

        </div>
      </div>
      <div class="col-lg-9">
        <div class="bus-listing-right-outer">

          <div class="bus-sort-outer shadow-light">
            <span class="sort-dark"> Sort by: </span>
            <span> Price </span>
            <span> Duration </span>
            <span> Departure </span>
            <span> Arrival </span>
          </div>

          <div class="bus-info-outer box-shadow-1">
            <div class="bus-info-inner">
              <div class="col-xl-10 col-sm-9 bus-info-left-outer">
                <div class="bus-info-left">
                  <div class="bus-info">
                    <p class="bus-name"> Biffco Enterprises Ltd. </p>
                    <div class="bus-seat-info">
                      <p class="bus-type">A/C Sleeper (2+1)</p>
                      <p> <img src="../images/bus-booking/seat-icon.svg" alt="seat"/> 30 Seats Left</p>
                    </div>
                  </div>
                  <p class="bus-tracking"> <i class="fas fa-location"></i> Live Tracking</p>
                </div>
  
                <div class="bus-status">
                  <div class="bus-time-status">
                    <p class="bus-time">18:30</p>
                    <div class="arrow-dashline-outer">
                      <div class="arrow-dashline">
                        <span class="arrow-circle"></span>
                        <hr class="dashline"/>
                        <img src="../images/bus-booking/bus-icon.svg" alt="bus"/>
                      </div>
                      <p class="bus-travel-time">14:59m</p>
                    </div>
                    
  
                    <p class="bus-time">18:30 <span class="sup">+1day</span> </p>
                    
                  </div>
                  <a class="bus-cancel-policy">Cancellation Policy</a>
                </div>
              </div>
              <div class="col-xl-2 col-sm-3 bus-info-right-outer">
                <p class="bus-ticket-amt"> &#x20B9; 2,552.00</p>
                <button class="select-seat-btn btn-cta">Select Seat</button>
              </div>
            </div>
            
          </div>
          <div class="bus-info-outer box-shadow-1">
            <div class="bus-info-inner">
              <div class="col-xl-10 col-sm-9 bus-info-left-outer">
                <div class="bus-info-left">
                  <div class="bus-info">
                    <p class="bus-name"> Biffco Enterprises Ltd. </p>
                    <div class="bus-seat-info">
                      <p class="bus-type">A/C Sleeper (2+1)</p>
                      <p> <img src="../images/bus-booking/seat-icon.svg" alt="seat"/> 30 Seats Left</p>
                    </div>
                  </div>
                  <p class="bus-tracking"> <i class="fas fa-location"></i> Live Tracking</p>
                </div>
  
                <div class="bus-status">
                  <div class="bus-time-status">
                    <p class="bus-time">18:30</p>
                    <div class="arrow-dashline-outer">
                      <div class="arrow-dashline">
                        <span class="arrow-circle"></span>
                        <hr class="dashline"/>
                        <img src="../images/bus-booking/bus-icon.svg" />
                      </div>
                      <p class="bus-travel-time">14:59m</p>
                    </div>
                    
  
                    <p class="bus-time">18:30 <span class="sup">+1day</span> </p>
                    
                  </div>
                  <a class="bus-cancel-policy">Cancellation Policy</a>
                </div>
              </div>
              <div class="col-xl-2 col-sm-3 bus-info-right-outer">
                <p class="bus-ticket-amt"> &#x20B9; 2,552.00</p>
                <button class="select-seat-btn btn-cta">Hide Seat</button>
              </div>
            </div>

            <div class="bus-seat-details-outer">

              <div class="bus-seat-details">
                <div class="col-xl-6 col-md-12">
  
                  <div class="select-point-outetr">
  
                    <div class="bus-bording-point shadow-light">
  
                      <div class="select-point-head">
                        <p class="select-point-title">Select Boarding Point</p>
                      </div>
                      <div class="select-boarding-point">
                        <div class="select-point rdio-primary"> 
                          <input name="radio" value="1" id="radio1" type="radio"/>
                          <label for="radio1"> 
                            <p>07:41 PM Fri, 17 February</p> <p>Sangamwadi</p> <p class="gray-text">Sangamwadi parking no.1 maharashtra travels</p> 
                          </label>
                        </div>
                        <div class="select-point rdio-primary">
                          <input name="radio" value="2" id="radio2" type="radio"/>
                          <label for="radio2">
                            <p>04:41 PM Fri, 17 February</p> <p>Yerwada</p> <p>Yerwada - near hdfc bank</p> 
                          </label>
                        </div>
                        <div class="select-point rdio-primary">
                          <input name="radio" value="3" id="radio3" type="radio" checked/>
                          <label for="radio3">
                            <p>04:41 PM Fri, 17 February</p> <p>Yerwada</p> <p>Yerwada - near hdfc bank</p> 
                          </label>
                        </div>
                        <div class="select-point rdio-primary">
                          <input name="radio" value="4" id="radio4" type="radio" />
                          <label for="radio4">
                            <p>04:41 PM Fri, 17 February</p> <p>Yerwada</p> <p>Yerwada - near hdfc bank</p> 
                          </label>
                        </div>
                        <div class="select-point rdio-primary">
                          <input name="radio" value="5" id="radio5" type="radio" />
                          <label for="radio5">
                            <p>04:41 PM Fri, 17 February</p> <p>Yerwada</p> <p>Yerwada - near hdfc bank</p> 
                          </label>
                        </div>
                        <div class="select-point rdio-primary">
                          <input name="radio" value="6" id="radio6" type="radio" />
                          <label for="radio6">
                            <p>04:41 PM Fri, 17 February</p> <p>Yerwada</p> <p>Yerwada - near hdfc bank</p> 
                          </label>
                        </div>
                        <div class="select-point rdio-primary">
                          <input name="radio" value="7" id="radio7" type="radio" />
                          <label for="radio7">
                            <p>04:41 PM Fri, 17 February</p> <p>Yerwada</p> <p>Yerwada - near hdfc bank</p> 
                          </label>
                        </div>
                      </div>
    
                    </div>
    
                    <div class="bus-dropping-point shadow-light">
                      
                      <div class="select-point-head">
                        <p class="select-point-title">Select Dropping Point</p>
                      </div>
                      <div class="select-boarding-point">
                        <div class="select-point rdio-primary"> 
                          <input name="radio" value="8" id="radio8" type="radio"/>
                          <label for="radio8"> 
                            <p>07:41 PM Fri, 17 February</p> <p>Sangamwadi</p> <p class="gray-text">Sangamwadi parking no.1 maharashtra travels</p> 
                          </label>
                        </div>
                        <div class="select-point rdio-primary">
                          <input name="radio" value="9" id="radio9" type="radio" checked/>
                          <label for="radio9">
                            <p>04:41 PM Fri, 17 February</p> <p>Yerwada</p> <p>Yerwada - near hdfc bank</p> 
                          </label>
                        </div>
                        <div class="select-point rdio-primary">
                          <input name="radio" value="10" id="radio10" type="radio" />
                          <label for="radio10">
                            <p>04:41 PM Fri, 17 February</p> <p>Yerwada</p> <p>Yerwada - near hdfc bank</p> 
                          </label>
                        </div>
                        <div class="select-point rdio-primary">
                          <input name="radio" value="11" id="radio11" type="radio"/>
                          <label for="radio11">
                            <p>04:41 PM Fri, 17 February</p> <p>Yerwada</p> <p>Yerwada - near hdfc bank</p> 
                          </label>
                        </div>
                        <div class="select-point rdio-primary">
                          <input name="radio" value="12" id="radio12" type="radio"/>
                          <label for="radio12">
                            <p>04:41 PM Fri, 17 February</p> <p>Yerwada</p> <p>Yerwada - near hdfc bank</p> 
                          </label>
                        </div>
                        <div class="select-point rdio-primary">
                          <input name="radio" value="13" id="radio13" type="radio"/>
                          <label for="radio13">
                            <p>04:41 PM Fri, 17 February</p> <p>Yerwada</p> <p>Yerwada - near hdfc bank</p> 
                          </label>
                        </div>
                        <div class="select-point rdio-primary">
                          <input name="radio" value="14" id="radio14" type="radio"/>
                          <label for="radio14">
                            <p>04:41 PM Fri, 17 February</p> <p>Yerwada</p> <p>Yerwada - near hdfc bank</p> 
                          </label>
                        </div>
                      </div>
  
                    </div>
  
                  </div>
  
                </div>
  
                <div class="col-xl-6 col-md-12">
                  
                  <div class="select-seat-status">
                    <span><img src="../images/bus-booking/available-seat.svg" alt="available-seat"/> Available Seat</span>
                    <span><img src="../images/bus-booking/selected-seat.svg" alt="selected-seat"/> Selected Seat</span>
                    <span><img src="../images/bus-booking/booked-seat.svg" alt="booked-seat"/> Booked Seat</span>
                    <span><img src="../images/bus-booking/reserved-ladies.svg" alt="reserved-ladies"/> Reserved for Seat</span>
                    <span><img src="../images/bus-booking/booked-ladies.svg" alt="booked-ladies"/> Booked by Seat</span>
                    <span><img src="../images/bus-booking/blocked-seat.svg" alt="blocked-seat"/> Blocked Seat</span>
                  </div>
  
                  <div class="seat-view-outer">
  
                    <div class="upper-deck shadow-dark">
                      <div class="seat-row-post">
                        <p>Upper deck</p>
                      </div>
                      <div class="seat-view-inner">
                        <div class="seats-row">
                          <button class="seat-horizontal"> <img src="../images/bus-booking/available-seat-horizontal.svg" alt="seat"/> </button>
                          <button class="seat-horizontal"> <img src="../images/bus-booking/selected-seat-horizontal.svg" alt="seat"/> </button>
                          <button class="seat-horizontal"> <img src="../images/bus-booking/booked-seat-horizontal.svg" alt="seat"/> </button>
                          <button class="seat-horizontal"> <img src="../images/bus-booking/booked-ladies-seat-horizontal.svg" alt="seat"/> </button>
                          <button class="seat-horizontal"> <img src="../images/bus-booking/reserved-ladies-seat-horizontal.svg" alt="seat"/> </button>
                        </div>
                        <div class="seats-row">
                          <button class="seat-horizontal"> <img src="../images/bus-booking/available-seat-horizontal.svg" alt="seat"/> </button>
                          <button class="seat-horizontal"> <img src="../images/bus-booking/selected-seat-horizontal.svg" alt="seat"/> </button>
                          <button class="seat-horizontal"> <img src="../images/bus-booking/booked-seat-horizontal.svg" alt="seat"/> </button>
                          <button class="seat-horizontal"> <img src="../images/bus-booking/booked-ladies-seat-horizontal.svg" alt="seat"/> </button>
                          <button class="seat-horizontal"> <img src="../images/bus-booking/reserved-ladies-seat-horizontal.svg" alt="seat"/> </button>
                        </div>
  
                        <div class="seats-row seats-row-spacing">
                          <button class="seat-horizontal"> <img src="../images/bus-booking/available-seat-horizontal.svg" alt="seat"/> </button>
                          <button class="seat-horizontal"> <img src="../images/bus-booking/selected-seat-horizontal.svg" alt="seat"/> </button>
                          <button class="seat-horizontal"> <img src="../images/bus-booking/booked-seat-horizontal.svg" alt="seat"/> </button>
                          <button class="seat-horizontal"> <img src="../images/bus-booking/booked-ladies-seat-horizontal.svg" alt="seat"/> </button>
                          <button class="seat-horizontal"> <img src="../images/bus-booking/reserved-ladies-seat-horizontal.svg" alt="seat"/> </button>
                        </div>
                      </div>
                    </div>
  
                    <div class="lower-deck shadow-dark">
                      <div class="seat-row-post">
                        <img src="../images/bus-booking/steering-wheel.svg" alt="steering-wheel"/>
                        <p>Lower deck</p>
                      </div>
                      <div class="seat-view-inner">
                        <div class="seats-row">
                          <button class="seat-horizontal"> <img src="../images/bus-booking/available-seat-horizontal.svg" alt="seat"/> </button>
                          <button class="seat-horizontal"> <img src="../images/bus-booking/selected-seat-horizontal.svg" alt="seat"/> </button>
                          <button class="seat-horizontal"> <img src="../images/bus-booking/booked-seat-horizontal.svg" alt="seat"/> </button>
                          <button class="seat-horizontal"> <img src="../images/bus-booking/booked-ladies-seat-horizontal.svg" alt="seat"/> </button>
                          <button class="seat-horizontal"> <img src="../images/bus-booking/reserved-ladies-seat-horizontal.svg" alt="seat"/> </button>
                        </div>
                        <div class="seats-row">
                          <button class="seat-horizontal"> <img src="../images/bus-booking/available-seat-horizontal.svg" alt="seat"/> </button>
                          <button class="seat-horizontal"> <img src="../images/bus-booking/selected-seat-horizontal.svg" alt="seat"/> </button>
                          <button class="seat-horizontal"> <img src="../images/bus-booking/booked-seat-horizontal.svg" alt="seat"/> </button>
                          <button class="seat-horizontal"> <img src="../images/bus-booking/booked-ladies-seat-horizontal.svg" alt="seat"/> </button>
                          <button class="seat-horizontal"> <img src="../images/bus-booking/reserved-ladies-seat-horizontal.svg"alt="seat" /> </button>
                        </div>
  
                        <div class="seats-row seats-row-spacing">
                          <button class="seat-horizontal"> <img src="../images/bus-booking/available-seat-horizontal.svg" alt="seat"/> </button>
                          <button class="seat-horizontal"> <img src="../images/bus-booking/selected-seat-horizontal.svg" alt="seat"/> </button>
                          <button class="seat-horizontal"> <img src="../images/bus-booking/booked-seat-horizontal.svg" alt="seat"/> </button>
                          <button class="seat-horizontal"> <img src="../images/bus-booking/booked-ladies-seat-horizontal.svg" alt="seat"/> </button>
                          <button class="seat-horizontal"> <img src="../images/bus-booking/reserved-ladies-seat-horizontal.svg" alt="seat"/> </button>
                        </div>
                      </div>
                    </div>
  
                  </div>
  
                </div>
                
              </div>

              <div class="seat-select-details">
                <div class="seat-book-status">
                  <p class="seat-book-status-title">Seats Selected</p>
                  <p class="seat-book-status-subtitle">No seats selected yet</p>
                </div>
                <div class="fare-details">
                  <p class="fare-details-amt">&#x20B9; 2,552.00</p>
                  <a href="#" class="fare-details-text">Fare Details</a>
                </div>
                <div class="seat-book-btn">
                  <button class="book-seat btn-primery" onClick={()=>{navigate("/review-itinerary")}}>Book Seats</button>
                </div>
              </div>

            </div>

          </div>
          <div class="bus-info-outer box-shadow-1">
            <div class="bus-info-inner">
              <div class="col-xl-10 col-sm-9 bus-info-left-outer">
                <div class="bus-info-left">
                  <div class="bus-info">
                    <p class="bus-name"> Biffco Enterprises Ltd. </p>
                    <div class="bus-seat-info">
                      <p class="bus-type">A/C Sleeper (2+1)</p>
                      <p> <img src="../images/bus-booking/seat-icon.svg" alt="seat"/> 30 Seats Left</p>
                    </div>
                  </div>
                  <p class="bus-tracking"> <i class="fas fa-location"></i> Live Tracking</p>
                </div>
  
                <div class="bus-status">
                  <div class="bus-time-status">
                    <p class="bus-time">18:30</p>
                    <div class="arrow-dashline-outer">
                      <div class="arrow-dashline">
                        <span class="arrow-circle"></span>
                        <hr class="dashline"/>
                        <img src="../images/bus-booking/bus-icon.svg" alt="bus"/>
                      </div>
                      <p class="bus-travel-time">14:59m</p>
                    </div>
                    
                    <p class="bus-time">18:30 <span class="sup">+1day</span> </p>
                    
                  </div>
                  <a class="bus-cancel-policy">Cancellation Policy</a>
                </div>
              </div>
              <div class="col-xl-2 col-sm-3 bus-info-right-outer">
                <p class="bus-ticket-amt"> &#x20B9; 2,552.00</p>
                <button class="select-seat-btn btn-cta">Hide Seat</button>
              </div>
            </div>
            <div class="bus-seat-details-outer">

              <div class="bus-seat-details">
                <div class="col-xl-6 col-md-12">
  
                  <div class="select-point-outetr">
  
                    <div class="bus-bording-point shadow-light">
  
                      <div class="select-point-head">
                        <p class="select-point-title">Select Boarding Point</p>
                      </div>
                      <div class="select-boarding-point">
                        <div class="select-point rdio-primary"> 
                          <input name="radio" value="1" id="radio1" type="radio"/>
                          <label for="radio1"> 
                            <p>07:41 PM Fri, 17 February</p> <p>Sangamwadi</p> <p class="gray-text">Sangamwadi parking no.1 maharashtra travels</p> 
                          </label>
                        </div>
                        <div class="select-point rdio-primary">
                          <input name="radio" value="2" id="radio2" type="radio"/>
                          <label for="radio2">
                            <p>04:41 PM Fri, 17 February</p> <p>Yerwada</p> <p>Yerwada - near hdfc bank</p> 
                          </label>
                        </div>
                        <div class="select-point rdio-primary">
                          <input name="radio" value="3" id="radio3" type="radio" checked/>
                          <label for="radio3">
                            <p>04:41 PM Fri, 17 February</p> <p>Yerwada</p> <p>Yerwada - near hdfc bank</p> 
                          </label>
                        </div>
                        <div class="select-point rdio-primary">
                          <input name="radio" value="4" id="radio4" type="radio" />
                          <label for="radio4">
                            <p>04:41 PM Fri, 17 February</p> <p>Yerwada</p> <p>Yerwada - near hdfc bank</p> 
                          </label>
                        </div>
                        <div class="select-point rdio-primary">
                          <input name="radio" value="5" id="radio5" type="radio" />
                          <label for="radio5">
                            <p>04:41 PM Fri, 17 February</p> <p>Yerwada</p> <p>Yerwada - near hdfc bank</p> 
                          </label>
                        </div>
                        <div class="select-point rdio-primary">
                          <input name="radio" value="6" id="radio6" type="radio" />
                          <label for="radio6">
                            <p>04:41 PM Fri, 17 February</p> <p>Yerwada</p> <p>Yerwada - near hdfc bank</p> 
                          </label>
                        </div>
                        <div class="select-point rdio-primary">
                          <input name="radio" value="7" id="radio7" type="radio" />
                          <label for="radio7">
                            <p>04:41 PM Fri, 17 February</p> <p>Yerwada</p> <p>Yerwada - near hdfc bank</p> 
                          </label>
                        </div>
                      </div>
    
                    </div>
    
                    <div class="bus-dropping-point shadow-light">
                      
                      <div class="select-point-head">
                        <p class="select-point-title">Select Dropping Point</p>
                      </div>
                      <div class="select-boarding-point">
                        <div class="select-point rdio-primary"> 
                          <input name="radio" value="8" id="radio8" type="radio"/>
                          <label for="radio8"> 
                            <p>07:41 PM Fri, 17 February</p> <p>Sangamwadi</p> <p class="gray-text">Sangamwadi parking no.1 maharashtra travels</p> 
                          </label>
                        </div>
                        <div class="select-point rdio-primary">
                          <input name="radio" value="9" id="radio9" type="radio" checked/>
                          <label for="radio9">
                            <p>04:41 PM Fri, 17 February</p> <p>Yerwada</p> <p>Yerwada - near hdfc bank</p> 
                          </label>
                        </div>
                        <div class="select-point rdio-primary">
                          <input name="radio" value="10" id="radio10" type="radio" />
                          <label for="radio10">
                            <p>04:41 PM Fri, 17 February</p> <p>Yerwada</p> <p>Yerwada - near hdfc bank</p> 
                          </label>
                        </div>
                        <div class="select-point rdio-primary">
                          <input name="radio" value="11" id="radio11" type="radio"/>
                          <label for="radio11">
                            <p>04:41 PM Fri, 17 February</p> <p>Yerwada</p> <p>Yerwada - near hdfc bank</p> 
                          </label>
                        </div>
                        <div class="select-point rdio-primary">
                          <input name="radio" value="12" id="radio12" type="radio"/>
                          <label for="radio12">
                            <p>04:41 PM Fri, 17 February</p> <p>Yerwada</p> <p>Yerwada - near hdfc bank</p> 
                          </label>
                        </div>
                        <div class="select-point rdio-primary">
                          <input name="radio" value="13" id="radio13" type="radio"/>
                          <label for="radio13">
                            <p>04:41 PM Fri, 17 February</p> <p>Yerwada</p> <p>Yerwada - near hdfc bank</p> 
                          </label>
                        </div>
                        <div class="select-point rdio-primary">
                          <input name="radio" value="14" id="radio14" type="radio"/>
                          <label for="radio14">
                            <p>04:41 PM Fri, 17 February</p> <p>Yerwada</p> <p>Yerwada - near hdfc bank</p> 
                          </label>
                        </div>
                      </div>
  
                    </div>
  
                  </div>
  
                </div>
  
                <div class="col-xl-6 col-md-12">
                  
                  <div class="select-seat-status">
                    <span><img src="../images/bus-booking/available-seat.svg" alt="available-seat"/> Available Seat</span>
                    <span><img src="../images/bus-booking/selected-seat.svg" alt="selected-seat"/> Selected Seat</span>
                    <span><img src="../images/bus-booking/booked-seat.svg" alt="booked-seat"/> Booked Seat</span>
                    <span><img src="../images/bus-booking/reserved-ladies.svg" alt="reserved-ladies"/> Reserved for Seat</span>
                    <span><img src="../images/bus-booking/booked-ladies.svg" alt="booked-ladies"/> Booked by Seat</span>
                    <span><img src="../images/bus-booking/blocked-seat.svg" alt="blocked-seat"/> Blocked Seat</span>
                  </div>
  
                  <div class="seat-view-outer">
                    
                    <div class="siting-view shadow-dark">

                      <div class="seat-row-post">
                        <img src="../images/bus-booking/steering-wheel.svg" alt=""/>
                      </div>
                      
                      <div class="seat-view-inner">
                        <div class="siting-seats-row">

                          <button class="seat-siting"> <img src="../images/bus-booking/booking-available-seat.svg" alt=""/> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-selected-seat.svg" alt=""/> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-booked-seat.svg" alt=""/> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-reserved-ladies-seat.svg" alt=""/> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-booked-ladies-seat.svg" alt=""/> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-reserved-ladies-seat.svg" alt=""/> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-booked-seat.svg" alt=""/> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-reserved-ladies-seat.svg" alt=""/> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-booked-ladies-seat.svg" alt=""/> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-blocked-seat.svg" alt=""/> </button>
                        </div>
                        <div class="siting-seats-row">
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-available-seat.svg" alt=""/> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-selected-seat.svg" alt=""/> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-booked-seat.svg" alt=""/> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-reserved-ladies-seat.svg" alt=""/> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-booked-ladies-seat.svg" alt=""/> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-reserved-ladies-seat.svg" alt=""/> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-booked-seat.svg" alt=""/> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-reserved-ladies-seat.svg" alt=""/> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-booked-ladies-seat.svg" alt=""/> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-booked-ladies-seat.svg" alt=""/> </button>
                        </div>
                        <div class="siting-seats-row justify-content-end">
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-selected-seat.svg" alt=""/> </button>
                        </div>
                        <div class="siting-seats-row">
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-available-seat.svg" alt=""/> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-selected-seat.svg" alt=""/> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-booked-seat.svg" alt=""/> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-reserved-ladies-seat.svg" alt=""/> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-booked-ladies-seat.svg" alt=""/> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-blocked-seat.svg" alt=""/> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-booked-seat.svg" alt=""/> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-reserved-ladies-seat.svg" alt=""/> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-booked-ladies-seat.svg" alt=""/> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-available-seat.svg" alt=""/> </button>
                        </div>
                        <div class="siting-seats-row">
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-available-seat.svg" alt=""/> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-selected-seat.svg" alt=""/> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-booked-seat.svg" alt=""/> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-reserved-ladies-seat.svg" alt=""/> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-booked-ladies-seat.svg" alt=""/> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-reserved-ladies-seat.svg" alt=""/> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-booked-seat.svg" alt=""/> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-reserved-ladies-seat.svg" alt=""/> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-booked-ladies-seat.svg" alt=""/> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-available-seat.svg" alt=""/> </button>
                        </div>
                      </div>
                    </div>
  
                  </div>
  
                </div>

              </div>

              <div class="seat-select-details">
                <div class="seat-book-status">
                  <p class="seat-book-status-title">Seats Selected</p>
                  <p class="seat-book-status-subtitle">No seats selected yet</p>
                </div>
                <div class="fare-details">
                  <p class="fare-details-amt">&#x20B9; 2,552.00</p>
                  <a href="#" class="fare-details-text">Fare Details</a>
                </div>
                <div class="seat-book-btn">
                  <button class="book-seat btn-primery" onClick={()=>{navigate("/review-itinerary")}}>Book Seats</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>
       </>}
    </>
  );
};

export default BusListing;

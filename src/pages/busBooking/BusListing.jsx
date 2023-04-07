import React from 'react';
import "../../assets/styles/bus/bus-listing-page.css"
// import "../../assets/styles/bus/bus-booking-home.css"

const BusListing = () => {
  return (
    <>
    <section class="bus-listing-form">
    <div class="container-fluid">

        <div class="">

            <div class="booking-form-horizontal">
                <form class="horizontal-booking-form">

                    <div class="col-lg-7 inside-wrap">
                      <div class="col-lg-5 from">
                        
                        <div class="dropdown select-option">
                          <button class="select-type" type="button" data-toggle="dropdown" aria-expanded="false">
                            Travelling From
                          </button>
                          <div class="dropdown-menu">
                            <a class="dropdown-item" href="#">Maharashtra</a>
                            <a class="dropdown-item" href="#">Karmataka</a>
                            <a class="dropdown-item" href="#">Gujrat</a>
                            <a class="dropdown-item" href="#">Maharashtra</a>
                            <a class="dropdown-item" href="#">Karmataka</a>
                            <a class="dropdown-item" href="#">Gujrat</a>
                            <a class="dropdown-item" href="#">Maharashtra</a>
                            <a class="dropdown-item" href="#">Karmataka</a>
                            <a class="dropdown-item" href="#">Gujrat</a>
                          </div>
                        </div>
                        
                      </div>

                      <div class="rotate-btn">
                        <figure>
                          <img src="images/bus-booking/swipe-horizontal-icon.svg"/>
                        </figure>
                      </div>

                      <div class="col-lg-5 to">
    
                        <div class="dropdown select-option">
                          <button class="select-type" type="button" data-toggle="dropdown" aria-expanded="false">
                            Travelling To
                          </button>
                          <div class="dropdown-menu">
                            <a class="dropdown-item" href="#">Maharashtra</a>
                            <a class="dropdown-item" href="#">Karmataka</a>
                            <a class="dropdown-item" href="#">Gujrat</a>
                            <a class="dropdown-item" href="#">Maharashtra</a>
                            <a class="dropdown-item" href="#">Karmataka</a>
                            <a class="dropdown-item" href="#">Gujrat</a>
                            <a class="dropdown-item" href="#">Maharashtra</a>
                            <a class="dropdown-item" href="#">Karmataka</a>
                            <a class="dropdown-item" href="#">Gujrat</a>
                          </div>
                        </div>
    
                      </div>
                    </div>
    
                    <div class="col-lg-5 horizontal-booking-form-right">
                        <div class="col-lg-7">
                            <div class="input-field"> 
                                <input data-date-format="dd/mm/yyyy" id="datepicker"/>
                                <label>Departure Date</label>
                            </div>
                        </div>
              
                        <div class="col-lg-5 ">
                            <div class="search-bus-btn">
                              <button class="btn-primery"> Modify Search </button>
                            </div> 
                        </div>
                    </div>
    
                </form>
            </div>

        </div>

    </div>

</section>
<section class="inpage-section-align bus-booking-list">
  <div class="container-fluid">
    <div class="row">
      
       {/* bus listing left section start  */}
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
                <img src="images/bus-booking/sunrise.svg" />  
                <p>Morning</p>
                <p class="filter-time"> 6AM - 12PM</p>
              </button>
              <button class="time-filter-btn">
                <img src="images/bus-booking/sun.svg" />  
                <p>Afternoon</p>
                <p class="filter-time"> 12PM - 6PM</p>
              </button>
              <button class="time-filter-btn">
                <img src="images/bus-booking/evening-sun.svg" />  
                <p>Evening</p>
                <p class="filter-time"> 6AM - 12PM</p>
              </button>
              <button class="time-filter-btn">
                <img src="images/bus-booking/moon.svg" />  
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
              <div class="col-lg-10 bus-info-left-outer">
                <div class="bus-info-left">
                  <div class="bus-info">
                    <p class="bus-name"> Biffco Enterprises Ltd. </p>
                    <div class="bus-seat-info">
                      <p class="bus-type">A/C Sleeper (2+1)</p>
                      <p> <img src="images/bus-booking/seat-icon.svg" /> 30 Seats Left</p>
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
                        <img src="images/bus-booking/bus-icon.svg" />
                      </div>
                      <p class="bus-travel-time">14:59m</p>
                    </div>
                    
  
                    <p class="bus-time">18:30 <span class="sup">+1day</span> </p>
                    
                  </div>
                  <a class="bus-cancel-policy">Cancellation Policy</a>
                </div>
              </div>
              <div class="col-lg-2 bus-info-right-outer">
                <p class="bus-ticket-amt"> &#x20B9; 2,552.00</p>
                <button class="select-seat-btn btn-cta">Select Seat</button>
              </div>
            </div>
            
          </div>
          <div class="bus-info-outer box-shadow-1">
            <div class="bus-info-inner">
              <div class="col-lg-10 bus-info-left-outer">
                <div class="bus-info-left">
                  <div class="bus-info">
                    <p class="bus-name"> Biffco Enterprises Ltd. </p>
                    <div class="bus-seat-info">
                      <p class="bus-type">A/C Sleeper (2+1)</p>
                      <p> <img src="images/bus-booking/seat-icon.svg" /> 30 Seats Left</p>
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
                        <img src="images/bus-booking/bus-icon.svg" />
                      </div>
                      <p class="bus-travel-time">14:59m</p>
                    </div>
                    
  
                    <p class="bus-time">18:30 <span class="sup">+1day</span> </p>
                    
                  </div>
                  <a class="bus-cancel-policy">Cancellation Policy</a>
                </div>
              </div>
              <div class="col-lg-2 bus-info-right-outer">
                <p class="bus-ticket-amt"> &#x20B9; 2,552.00</p>
                <button class="select-seat-btn btn-cta">Hide Seat</button>
              </div>
            </div>

            <div class="bus-seat-details-outer">

              <div class="bus-seat-details">
                <div class="col-lg-6">
  
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
  
                <div class="col-lg-6">
                  
                  <div class="select-seat-status">
                    <span><img src="images/bus-booking/available-seat.svg" /> Available Seat</span>
                    <span><img src="images/bus-booking/selected-seat.svg" /> Selected Seat</span>
                    <span><img src="images/bus-booking/booked-seat.svg" /> Booked Seat</span>
                    <span><img src="images/bus-booking/reserved-ladies.svg" /> Reserved for Seat</span>
                    <span><img src="images/bus-booking/booked-ladies.svg" /> Booked by Seat</span>
                    <span><img src="images/bus-booking/blocked-seat.svg" /> Blocked Seat</span>
                  </div>
  
                  <div class="seat-view-outer">
  
                    <div class="upper-deck shadow-dark">
                      <div class="seat-row-post">
                        <p>Upper deck</p>
                      </div>
                      <div class="seat-view-inner">
                        <div class="seats-row">
                          <button class="available-seat-horizontal">  </button>
                          <button class="selected-seat-horizontal">  </button>
                          <button class="reserved-ladies-seat-horizontal">  </button>
                          <button class="booked-seat-horizontal">  </button>
                          <button class="booked-ladies-seat-horizontal">  </button>
                        </div>
                        <div class="seats-row">
                          <button class="available-seat-horizontal">  </button>
                          <button class="selected-seat-horizontal">  </button>
                          <button class="reserved-ladies-seat-horizontal">  </button>
                          <button class="booked-seat-horizontal">  </button>
                          <button class="booked-ladies-seat-horizontal">  </button>
                        </div>
  
                        <div class="seats-row seats-row-spacing">
                          <button class="available-seat-horizontal">  </button>
                          <button class="selected-seat-horizontal">  </button>
                          <button class="reserved-ladies-seat-horizontal">  </button>
                          <button class="booked-seat-horizontal">  </button>
                          <button class="booked-ladies-seat-horizontal">  </button>
                        </div>
                      </div>
                    </div>
  
                    <div class="lower-deck shadow-dark">
                      <div class="seat-row-post">
                        <img src="images/bus-booking/steering-wheel.svg" />
                        <p>Lower deck</p>
                      </div>
                      <div class="seat-view-inner">
                        <div class="seats-row">
                          <button class="available-seat-horizontal">  </button>
                          <button class="selected-seat-horizontal">  </button>
                          <button class="reserved-ladies-seat-horizontal">  </button>
                          <button class="booked-seat-horizontal">  </button>
                          <button class="booked-ladies-seat-horizontal">  </button>
                        </div>
                        <div class="seats-row">
                          <button class="available-seat-horizontal">  </button>
                          <button class="selected-seat-horizontal">  </button>
                          <button class="reserved-ladies-seat-horizontal">  </button>
                          <button class="booked-seat-horizontal">  </button>
                          <button class="booked-ladies-seat-horizontal">  </button>
                        </div>
  
                        <div class="seats-row seats-row-spacing">
                          <button class="available-seat-horizontal">  </button>
                          <button class="selected-seat-horizontal">  </button>
                          <button class="reserved-ladies-seat-horizontal">  </button>
                          <button class="booked-seat-horizontal">  </button>
                          <button class="booked-ladies-seat-horizontal">  </button>
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
                  <button class="book-seat btn-primery">Book Seats</button>
                </div>
              </div>
            </div>

          </div>
          <div class="bus-info-outer box-shadow-1">
            <div class="bus-info-inner">
              <div class="col-lg-10 bus-info-left-outer">
                <div class="bus-info-left">
                  <div class="bus-info">
                    <p class="bus-name"> Biffco Enterprises Ltd. </p>
                    <div class="bus-seat-info">
                      <p class="bus-type">A/C Sleeper (2+1)</p>
                      <p> <img src="images/bus-booking/seat-icon.svg" /> 30 Seats Left</p>
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
                        <img src="images/bus-booking/bus-icon.svg" />
                      </div>
                      <p class="bus-travel-time">14:59m</p>
                    </div>
                    
  
                    <p class="bus-time">18:30 <span class="sup">+1day</span> </p>
                    
                  </div>
                  <a class="bus-cancel-policy">Cancellation Policy</a>
                </div>
              </div>
              <div class="col-lg-2 bus-info-right-outer">
                <p class="bus-ticket-amt"> &#x20B9; 2,552.00</p>
                <button class="select-seat-btn btn-cta">Hide Seat</button>
              </div>
            </div>

            <div class="bus-seat-details-outer">

              <div class="bus-seat-details">
                <div class="col-lg-6">
  
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
  
                <div class="col-lg-6">
                  
                  <div class="select-seat-status">
                    <span><img src="images/bus-booking/available-seat.svg" /> Available Seat</span>
                    <span><img src="images/bus-booking/selected-seat.svg" /> Selected Seat</span>
                    <span><img src="images/bus-booking/booked-seat.svg" /> Booked Seat</span>
                    <span><img src="images/bus-booking/reserved-ladies.svg" /> Reserved for Seat</span>
                    <span><img src="images/bus-booking/booked-ladies.svg" /> Booked by Seat</span>
                    <span><img src="images/bus-booking/blocked-seat.svg" /> Blocked Seat</span>
                  </div>
  
                  <div class="seat-view-outer">
  
                    <div class="siting-view shadow-dark">
                      
                      <div class="seat-view-inner">
                        <div class="siting-seats-row">
                          <button class="available-seat-siting">  </button>
                          <button class="available-seat-siting">  </button>
                          <button class="available-seat-siting">  </button>
                          <button class="reserved-ladies-seat-siting">  </button>
                          <button class="available-seat-siting">  </button>
                          <button class="available-seat-siting">  </button>
                          <button class="booked-seat-siting">  </button>
                          <button class="reserved-ladies-seat-siting">  </button>
                          <button class="booked-ladies-seat-siting">  </button>
                          <button class="blocked-seat-siting">  </button>
                        </div>
                        <div class="siting-seats-row">
                          <button class="available-seat-siting">  </button>
                          <button class="available-seat-siting">  </button>
                          <button class="available-seat-siting">  </button>
                          <button class="reserved-ladies-seat-siting">  </button>
                          <button class="available-seat-siting">  </button>
                          <button class="available-seat-siting">  </button>
                          <button class="booked-seat-siting">  </button>
                          <button class="reserved-ladies-seat-siting">  </button>
                          <button class="booked-ladies-seat-siting">  </button>
                          <button class="blocked-seat-siting">  </button>
                        </div>
                        <div class="siting-seats-row justify-content-end">
                          <button class="available-seat-siting">  </button>
                        </div>
                        <div class="siting-seats-row">
                          <button class="available-seat-siting">  </button>
                          <button class="available-seat-siting">  </button>
                          <button class="available-seat-siting">  </button>
                          <button class="reserved-ladies-seat-siting">  </button>
                          <button class="available-seat-siting">  </button>
                          <button class="available-seat-siting">  </button>
                          <button class="booked-seat-siting">  </button>
                          <button class="reserved-ladies-seat-siting">  </button>
                          <button class="booked-ladies-seat-siting">  </button>
                          <button class="blocked-seat-siting">  </button>
                        </div>
                        <div class="siting-seats-row">
                          <button class="available-seat-siting">  </button>
                          <button class="available-seat-siting">  </button>
                          <button class="available-seat-siting">  </button>
                          <button class="reserved-ladies-seat-siting">  </button>
                          <button class="available-seat-siting">  </button>
                          <button class="available-seat-siting">  </button>
                          <button class="booked-seat-siting">  </button>
                          <button class="reserved-ladies-seat-siting">  </button>
                          <button class="booked-ladies-seat-siting">  </button>
                          <button class="blocked-seat-siting">  </button>
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
                  <button class="book-seat btn-primery">Book Seats</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </>
  )
}

export default BusListing
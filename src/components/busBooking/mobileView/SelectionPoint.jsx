import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SelectionPoint = () => {
    const [locationValue, setLocationValue] = useState("Boarding Point")
const navigate= useNavigate()
    const boardingPointSection=(value)=>(
        <div class="col-sm-12">
        <div class="bus-bording-point">
            <div class="select-point-head">
              <p class="select-point-title">Select {value}</p>
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
      </div>
    )
    const selectSeatSection=()=>{
return <>
<div class="col-lg-12">
                  
                  <div class="select-seat-status">
                    <span><img src="../images/bus-booking/available-seat.svg" /> Available Seat</span>
                    <span><img src="../images/bus-booking/selected-seat.svg" /> Selected Seat</span>
                    <span><img src="../images/bus-booking/booked-seat.svg" /> Booked Seat</span>
                    <span><img src="../images/bus-booking/reserved-ladies.svg" /> Reserved for Seat</span>
                    <span><img src="../images/bus-booking/booked-ladies.svg" /> Booked by Seat</span>
                    <span><img src="../images/bus-booking/blocked-seat.svg" /> Blocked Seat</span>
                  </div>
          
                  <div class="seat-view-outer">
          
                    <div class="col-sm-6 lower-deck shadow-dark">
                      <div class="seat-row-post">
                        <p>Lower deck</p>
                        <img src="../images/bus-booking/steering-wheel-mob.svg" />
                      </div>
                      <div class="seat-view-inner">
                        <div class="seats-row">
                          <button class="seat-horizontal seat-horizontal-spacing"> <img src="../images/bus-booking/available-seat-vertical.svg" /> </button>
                          <button class="seat-horizontal"> <img src="../images/bus-booking/booked-ladies-seat-vertical.svg" /> </button>
                          <button class="seat-horizontal"> <img src="../images/bus-booking/booked-seat-vertical.svg" /> </button>
                        </div>
                        <div class="seats-row">
                          <button class="seat-horizontal seat-horizontal-spacing"> <img src="../images/bus-booking/available-seat-vertical.svg" /> </button>
                          <button class="seat-horizontal"> <img src="../images/bus-booking/selected-seat-vertical.svg" /> </button>
                          <button class="seat-horizontal"> <img src="../images/bus-booking/booked-seat-vertical.svg" /> </button>
                        </div>
          
                        <div class="seats-row">
                          <button class="seat-horizontal seat-horizontal-spacing"> <img src="../images/bus-booking/booked-ladies-seat-vertical.svg" /> </button>
                          <button class="seat-horizontal"> <img src="../images/bus-booking/selected-seat-vertical.svg" /> </button>
                          <button class="seat-horizontal"> <img src="../images/bus-booking/booked-ladies-seat-vertical.svg" /> </button>
                        </div>
          
                        <div class="seats-row">
                          <button class="seat-horizontal seat-horizontal-spacing"> <img src="../images/bus-booking/available-seat-vertical.svg" /> </button>
                          <button class="seat-horizontal"> <img src="../images/bus-booking/selected-seat-vertical.svg" /> </button>
                          <button class="seat-horizontal"> <img src="../images/bus-booking/reserved-ladies-seat-vertical.svg" /> </button>
                        </div>
          
                        <div class="seats-row">
                          <button class="seat-horizontal seat-horizontal-spacing"> <img src="../images/bus-booking/available-seat-vertical.svg" /> </button>
                          <button class="seat-horizontal"> <img src="../images/bus-booking/selected-seat-vertical.svg" /> </button>
                          <button class="seat-horizontal"> <img src="../images/bus-booking/booked-seat-vertical.svg" /> </button>
                        </div>
          
                      </div>
                    </div>
          
                    <div class="col-sm-6 upper-deck shadow-dark">
                      <div class="seat-row-post">
                        <p>Upper deck</p>
                      </div>
                      <div class="seat-view-inner">
                        <div class="seats-row">
                          <button class="seat-horizontal seat-horizontal-spacing"> <img src="../images/bus-booking/available-seat-vertical.svg" /> </button>
                          <button class="seat-horizontal"> <img src="../images/bus-booking/selected-seat-vertical.svg" /> </button>
                          <button class="seat-horizontal"> <img src="../images/bus-booking/booked-seat-vertical.svg" /> </button>
                        </div>
                        <div class="seats-row">
                          <button class="seat-horizontal seat-horizontal-spacing"> <img src="../images/bus-booking/available-seat-vertical.svg" /> </button>
                          <button class="seat-horizontal"> <img src="../images/bus-booking/selected-seat-vertical.svg" /> </button>
                          <button class="seat-horizontal"> <img src="../images/bus-booking/booked-seat-vertical.svg" /> </button>
                        </div>
          
                        <div class="seats-row seats-row-spacing">
                          <button class="seat-horizontal seat-horizontal-spacing"> <img src="../images/bus-booking/available-seat-vertical.svg" /> </button>
                          <button class="seat-horizontal"> <img src="../images/bus-booking/booked-ladies-seat-vertical.svg" /> </button>
                          <button class="seat-horizontal"> <img src="../images/bus-booking/booked-seat-vertical.svg" /> </button>
                        </div>
          
                        <div class="seats-row seats-row-spacing">
                          <button class="seat-horizontal seat-horizontal-spacing"> <img src="../images/bus-booking/booked-ladies-seat-vertical.svg" /> </button>
                          <button class="seat-horizontal"> <img src="../images/bus-booking/selected-seat-vertical.svg" /> </button>
                          <button class="seat-horizontal"> <img src="../images/bus-booking/reserved-ladies-seat-vertical.svg" /> </button>
                        </div>
          
                        <div class="seats-row seats-row-spacing">
                          <button class="seat-horizontal seat-horizontal-spacing"> <img src="../images/bus-booking/available-seat-vertical.svg" /> </button>
                          <button class="seat-horizontal"> <img src="../images/bus-booking/selected-seat-vertical.svg" /> </button>
                          <button class="seat-horizontal"> <img src="../images/bus-booking/booked-seat-vertical.svg" /> </button>
                        </div>
          
                      </div>
                    </div>
          
                  </div>
          
                </div>
                <div class="col-lg-12">
                  
                  <div class="select-seat-status mt-4">
                    <span><img src="../images/bus-booking/available-seat.svg" /> Available Seat</span>
                    <span><img src="../images/bus-booking/selected-seat.svg" /> Selected Seat</span>
                    <span><img src="../images/bus-booking/booked-seat.svg" /> Booked Seat</span>
                    <span><img src="../images/bus-booking/reserved-ladies.svg" /> Reserved for Seat</span>
                    <span><img src="../images/bus-booking/booked-ladies.svg" /> Booked by Seat</span>
                    <span><img src="../images/bus-booking/blocked-seat.svg" /> Blocked Seat</span>
                  </div>
          
                  <div class="seat-view-outer">
                    
                    <div class="siting-view shadow-dark">
          
                      <div class="seat-row-post mr-4">
                        <img src="../images/bus-booking/steering-wheel.svg" />
                      </div>
                      
                      <div class="seat-view-inner">
                        <div class="siting-seats-row">
          
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-available-seat.svg" /> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-selected-seat.svg" /> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-booked-seat.svg" /> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-reserved-ladies-seat.svg" /> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-booked-ladies-seat.svg" /> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-reserved-ladies-seat.svg" /> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-booked-seat.svg" /> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-reserved-ladies-seat.svg" /> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-booked-ladies-seat.svg" /> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-blocked-seat.svg" /> </button>
                        </div>
                        <div class="siting-seats-row">
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-available-seat.svg" /> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-selected-seat.svg" /> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-booked-seat.svg" /> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-reserved-ladies-seat.svg" /> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-booked-ladies-seat.svg" /> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-reserved-ladies-seat.svg" /> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-booked-seat.svg" /> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-reserved-ladies-seat.svg" /> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-booked-ladies-seat.svg" /> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-booked-ladies-seat.svg" /> </button>
                        </div>
                        <div class="siting-seats-row justify-content-end">
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-selected-seat.svg" /> </button>
                        </div>
                        <div class="siting-seats-row">
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-available-seat.svg" /> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-selected-seat.svg" /> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-booked-seat.svg" /> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-reserved-ladies-seat.svg" /> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-booked-ladies-seat.svg" /> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-blocked-seat.svg" /> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-booked-seat.svg" /> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-reserved-ladies-seat.svg" /> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-booked-ladies-seat.svg" /> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-available-seat.svg" /> </button>
                        </div>
                        <div class="siting-seats-row">
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-available-seat.svg" /> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-selected-seat.svg" /> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-booked-seat.svg" /> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-reserved-ladies-seat.svg" /> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-booked-ladies-seat.svg" /> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-reserved-ladies-seat.svg" /> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-booked-seat.svg" /> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-reserved-ladies-seat.svg" /> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-booked-ladies-seat.svg" /> </button>
                          <button class="seat-siting"> <img src="../images/bus-booking/booking-available-seat.svg" /> </button>
                        </div>
                      </div>
                    </div>
          
                  </div>
          
                </div>
                <div class="mb-price-wrapper">
        <div class="d-flex align-items-center mb-price-inner">

          <div class="col-sm-4">
            <p class="seat-price">&#x20B9; 2,815</p>
            <p class="seat-count">For 1 Seat</p>
          </div>
    
          <div class="col-sm-4">
            <a class="fare-link">Fare Details</a>
          </div>
    
          <div class="col-sm-4" onClick={()=>{navigate("/review-itinerary")}}>
            <button class="btn btn-primery">Next <i class="fa-solid fa-arrow-right"></i></button>
          </div>

        </div>
      </div>
</>
    }
  return (
    <section class="inpage-section-align bus-booking-list w-100 d-xl-none mb-resp-view">
    <div class="container-fluid">
      <div class="row"> 
          <div class="col-sm-12">
              <div class="select-bus-location">
                  <button className={locationValue==="Boarding Point" ? "active-point" :"inactive-point"} onClick={()=>{setLocationValue("Boarding Point")}}>Boarding Point</button>
                  <button className={locationValue==="Dropping Point" ? "active-point" :"inactive-point"} onClick={()=>{setLocationValue("Dropping Point")}}>Dropping Point</button>
                  <button className={locationValue==="Select Seat" ? "active-point" :"inactive-point"} onClick={()=>{setLocationValue("Select Seat")}}>Select Seat</button>
              </div>
          </div>
          
       {
        locationValue==="Select Seat" 
        ? selectSeatSection()
        :  boardingPointSection(locationValue)
         }
      </div>
    </div>
  </section>
  )
}

export default SelectionPoint
import React from 'react'
import "../../assets/styles/bus/bus-listing-page.css"

const BusListingForm = () => {
  return (
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
  )
}

export default BusListingForm
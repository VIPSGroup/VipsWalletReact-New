import React from "react"
import { Link } from "react-router-dom"
//import "../../assets/styles/core/homeTopNav.css"

const HomeTopNavServicebar=()=>{

    const section=()=>(
        <>
            {/* {<!-- new header bottom start -->} */}
<div class="section header-bottom">
  <div class="container-fluid">

     
              <div class="bottom-header-outer">
                  
                  <div class="top-serv-box">
                  <Link to="/services/mobileRecharge">
                        <div class="top-serv-box-icon">
                          <img src="images/services/recharge.svg" class="img-fluid top-serv-icon" />
                        </div>
                        <span class="top-serv-box-title">Recharge</span> 
                      </Link>
                  </div>

                  <div class="top-serv-box">
                  <Link to="/services/dth">
                        <div class="top-serv-box-icon">
                          <img src="images/services/dth.svg" class="img-fluid top-serv-icon" />
                        </div>
                          <span class="top-serv-box-title">DTH</span> 
                      </Link>
                  </div>

                  <div class="top-serv-box">
                  <Link to="/services/fastag">
                        <div class="top-serv-box-icon">
                          <img src="images/services/fastag.svg" class="img-fluid top-serv-icon" />
                        </div>
                          <span class="top-serv-box-title">Fastag</span> 
                      </Link>
                  </div>

                  <div class="top-serv-box">
                  <Link to="/services/electricity">
                        <div class="top-serv-box-icon">
                          <img src="images/services/electricity.svg" class="img-fluid top-serv-icon" />
                        </div>
                          <span class="top-serv-box-title">Electricity</span> 
                      </Link>
                  </div>

                  <div class="top-serv-box">
                  <Link to="/services/digitalCable">
                        <div class="top-serv-box-icon">
                          <img src="images/services/digital-cable.svg" class="img-fluid top-serv-icon" />
                        </div>
                          <span class="top-serv-box-title">Digital Cable</span> 
                      </Link>
                  </div>

                  <div class="top-serv-box">
                  <Link to="/services/landline">
                        <div class="top-serv-box-icon">
                          <img src="images/services/landline.svg" class="img-fluid top-serv-icon" />
                        </div>
                          <span class="top-serv-box-title">LandLine</span> 
                      </Link>
                  </div>

                  <div class="top-serv-box">
                  <Link to="/services/gas">
                        <div class="top-serv-box-icon">
                          <img src="images/services/piped-gas.svg" class="img-fluid top-serv-icon" />
                        </div>
                          <span class="top-serv-box-title">Gas</span> 
                      </Link>
                  </div>

                  <div class="top-serv-box">
                      <Link to="/services/lpggas"> 
                        <div class="top-serv-box-icon">
                          <img src="images/services/lpg-gas.svg" class="img-fluid top-serv-icon" />
                        </div>
                          <span class="top-serv-box-title">LPG Gas</span> 
                      </Link>
                  </div>


                  <div class="top-serv-box">
                    <div class="">
                      <Link class="" to="/services">
                        <div class="top-serv-box-icon">
                          <img src="images/services/three-dot.svg" class="img-fluid top-serv-icon" />
                        </div>
                        <span class="top-serv-box-title">View More</span> 
                      </Link>
      
                    </div>
                  </div>

                  

              </div>

          
     
  </div>
  
</div>
{/* {<!-- new header bottom end -->} */}
        </>
    )

    return(
        <>
          {section()}
        </>
    )
}

export default HomeTopNavServicebar
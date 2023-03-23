import React, { useEffect } from 'react'
import "../../assets/styles/contactUs.css"
import { Link } from "react-router-dom";
import { ThemeButton } from '../../components/common';

const ContactUs = ({setIsBottomTopNav}) => {
  useEffect(()=>{
    setIsBottomTopNav(true)
    return ()=>{setIsBottomTopNav(false)}
},[])
  return (
    <>
      {/* {<!-- contact top banner start -->} */}
<section class="contact-banner">

<div class="contact-top-banner">
<img class="contact-top-hero-image" src="/images/contact-banner.jpg" alt="contact with VIPS Wallet"/>
<div class="contact-top-banner_content">
    <h1 class="contact-top-banner-title">Contact Us</h1>
</div>
</div>

</section>
{/* {<!-- contact top banner end -->} */}


{/* {<!-- Contact Form start -->} */}
<section class="contact-section">

<div class="container">
  
  <div>
    <h1 class="section-title">Get in touch</h1>
  </div>

  <div class="row">
    <div class="col-xl-6 col-lg-8 col-md-12 col-sm-12">
    
      <form class="contactform">

        <div class="row">

            <div class="col-xl-6 col-md-6 col-sm-6">
                <div class="input-field"> 
                    <input id="user-name" type="text" placeholder="&nbsp;" autocomplete="off" />
                    <label for="user-name">Name</label>
                </div>
            </div>
        
            <div class="col-xl-6 col-md-6 col-sm-6">
                <div class="input-field"> 
                    <input id="user-phone" type="text" placeholder="&nbsp;" autocomplete="off" />
                    <label for="user-phone">Phone</label>
                </div>
            </div>
        
            <div class="col-xl-6 col-md-6 col-sm-6">
                <div class="input-field"> 
                    <input id="user-email" type="text" placeholder="&nbsp;" autocomplete="off" />
                    <label for="user-email">Email Id</label>
                </div>
            </div>

            <div class="col-xl-6 col-md-6 col-sm-6">
                <div class="dropdown select-option">
                <button class="dropdown-toggle select-toggle select-type" type="button" data-toggle="dropdown" aria-expanded="false">
                    City
                </button>
                </div>
            </div>

            <div class="col-lg-12">  
                <div class="send-msg-btn mt-4">
                    {/* <button class="btn-primery"> Send Message </button> */}
                    <ThemeButton value={"Send Message"}/>
                </div> 
            </div>

        </div>
      </form>

    </div>

    <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 contact-detail-outer">
      <div class="contact-detail">

        <ul class="contact-ul">
          <li>
            <i class="fa fa-location-dot"></i>
            <div class="details-content">
              <p class="title-p"> Address </p>
              <p>Office No. 401 & 402, Amber Plaza,
               S.No 12 & S.No 11/5,
               Ambegaon Budruk, Pune, Maharashtra 411046</p>
            </div>
          </li>

          <li>
            <i class="fa-solid fa-envelope"></i> 
            <div class="details-content">
              <p class="title-p"> Email Id </p> 
              <p><Link to="mailto: support@vipswallet.com"> support@vipswallet.com </Link> </p>
            </div>
          </li>

          <li>
            <i class="fa fa-phone"></i> 
            <div class="details-content"> 
              <p class="title-p">Phone Number </p>
              <p>+91922098098</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

  </div>

</div>

</section>
{/* {<!-- Contact Form end -->} */}


<section class="map-section">
<div class="container">
<div class="contact-map">
<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3784.509362761153!2d73.835984!3d18.460573!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x7a1f63a79a6b597b!2sVIPS%20Wallet%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1670933212270!5m2!1sen!2sin" width="100%" style={{border:"0"}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="mapframe"></iframe>
</div>
</div>
</section>
  </>
  )
}

export default ContactUs
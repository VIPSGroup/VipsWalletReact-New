import "../../assets/styles/prime/primeIndex.css";
import "../../assets/styles/styles.css";
import ReactGA from "react-ga";
import { googleAnalytics } from "../../constants";
import { useEffect } from "react";
import { Link } from "react-router-dom";
ReactGA.initialize(googleAnalytics);

const PrimeIndex = ({ setIsBottomTopNav }) => {
  useEffect(() => {
    setIsBottomTopNav(true);
    return () => {
      setIsBottomTopNav(false);
    };
  }, []);
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);
  const primeSection = () => (
    <>
      {/* <!-- prime member top banner start --> */}
      <section class="prime-member-banner">
        <div class="prime-member-top-banner">
          <img
            class="prime-member-top-hero-image"
            src="/images/primePage/prime-member-top-banner.png"
            alt="Imagen del banner"
          />
          <div class="prime-member-top-banner_content">
            <div class="vips-prime-member-logo">
              <img src="/images/VipslogoMain.png" alt="VIPS Wallet" />
            </div>
            <h1 class="prime-member-top-banner-title">
              Join The VIPS Prime Membership at just ₹ 1995
            </h1>
            <p class="prime-member-top-banner-subtitle">
              Get The Best Prime Discount With Services & 1995 shopping points
            </p>
            <Link
              to="/prime/confirm"
              class="btn btn-primery prime-member-top-banner-button"
            >
              {" "}
              Buy Now{" "}
            </Link>
          </div>
        </div>
      </section>
      {/** <!-- prime member top banner end -->*/}
      {/** <!-- prime member promo banner start --> */}
      <section class="section-align prime-member-promo">
        <div class="container">
          <div class="row">
            <div class="prime-member-promo-div">
              <div class="container">
                <div class="row">
                  <div class="col-md-6 col-lg-6">
                    <div class="prime-member-promo-div-image">
                      <img
                        src="/images/primePage/Prime-01.svg"
                        class="img-fluid "
                      />
                    </div>
                  </div>
                  <div class="col-md-6 col-lg-6 prime-member-promo-div-content">
                    <h1 class="prime-member-promo-div-title">
                      {" "}
                      VIPS Prime Membership Benefits{" "}
                    </h1>

                    <ul class="prime-member-benefit">
                      <li>
                        <p class="prime-member-benefit-title"> Earn daily </p>
                        {/* <p class="prime-member-benefit-subtitle"> Rs. 7/- till upto Rs. 1995/- </p> */}
                        <p class="prime-member-benefit-p">
                          {" "}
                          Get up to Rs. 1995; receive Rs.7 on a daily basis.{" "}
                        </p>
                      </li>
                      <li>
                        <p class="prime-member-benefit-title">
                          {" "}
                          Shopping points and Prime points{" "}
                        </p>
                        {/* <p class="prime-member-benefit-subtitle"> (1 Shopping point / Prime Points = 1 Rupee) </p> */}
                        <p class="prime-member-benefit-p">
                          {" "}
                          By buying Prime membership, users will get 1995
                          shopping points and 100 prime points.{" "}
                        </p>
                      </li>
                    </ul>

                    <div class="prime-member-promo-btn">
                      <Link to="/prime/confirm" class="btn btn-primery">
                        {" "}
                        Buy Now{" "}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/** <!-- prime member promo banner start --> */}

      {/** <!-- CHECK OUT YOUR PRIME MEMBERSHIP start --> */}
      <section class="check-prime-member">
        <div class="container">
          <div class="container">
            <div class="prime-member-section-head">
              <h1 class="prime-member-section-head-title">
                Check out what is included with your Prime Membership
              </h1>
            </div>
          </div>

          <div class="row">
            <div class="check-prime-member-outer">
              <div class="container">
                <div class="check-prime-member-box-1">
                  <div class="col-md-6 col-lg-6">
                    <div class="check-prime-member-box-left-img">
                      <img
                        src="/images/primePage/online-shopping.jpg"
                        class="img-fluid "
                      />
                    </div>
                  </div>
                  <div class="col-md-6 col-lg-6 ">
                    <div class="check-prime-member-right-cont">
                      <h3 class="check-prime-member-box-title">
                        {" "}
                        Online Shopping{" "}
                      </h3>
                      <p class="check-prime-member-box-title-p">
                        {" "}
                        - 10% cashback on every order and additional discount up
                        to 25% by using prime points.{" "}
                      </p>
                    </div>
                  </div>
                </div>

                <div class="check-prime-member-box-2">
                  <div class="col-md-6 col-lg-6 ">
                    <div class="check-prime-member-left-cont">
                      <h3 class="check-prime-member-box-title">
                        {" "}
                        Prepaid Mobile Recharge{" "}
                      </h3>
                      <p class="check-prime-member-box-title-p">
                        {" "}
                        - Instant 2% cashback on every mobile recharge and
                        additional discount up to 25% by using prime points.{" "}
                      </p>
                    </div>
                  </div>
                  <div class="col-md-6 col-lg-6">
                    <div class="check-prime-member-box-right-img">
                      <img
                        src="/images/primePage/mobile-recharge.jpg"
                        class="img-fluid "
                      />
                    </div>
                  </div>
                </div>

                <div class="check-prime-member-box-1">
                  <div class="col-md-6 col-lg-6">
                    <div class="check-prime-member-box-left-img">
                      <img
                        src="/images/primePage/DTH-Recharge.jpg"
                        class="img-fluid "
                      />
                    </div>
                  </div>
                  <div class="col-md-6 col-lg-6 ">
                    <div class="check-prime-member-right-cont">
                      <h3 class="check-prime-member-box-title">
                        {" "}
                        DTH Recharge{" "}
                      </h3>
                      <p class="check-prime-member-box-title-p">
                        {" "}
                        - 2 % instant cashback on every DTH recharge and
                        additional discount up to 25% by using prime points.{" "}
                      </p>
                    </div>
                  </div>
                </div>

                <div class="check-prime-member-box-2">
                  <div class="col-md-6 col-lg-6 ">
                    <div class="check-prime-member-right-cont">
                      <h3 class="check-prime-member-box-title">
                        {" "}
                        Bus Booking{" "}
                      </h3>
                      <p class="check-prime-member-box-title-p">
                        {" "}
                        - Get 2 % instant cashback on every bus booking and get
                        additional 25% discount by using prime points.{" "}
                      </p>
                    </div>
                  </div>
                  <div class="col-md-6 col-lg-6">
                    <div class="check-prime-member-box-right-img">
                      <img
                        src="/images/primePage/Bus-booking.jpg"
                        class="img-fluid "
                      />
                    </div>
                  </div>
                </div>

                <div class="check-prime-member-box-1">
                  <div class="col-md-6 col-lg-6">
                    <div class="check-prime-member-box-left-img">
                      <img
                        src="/images/primePage/flight-booking.jpg"
                        class="img-fluid "
                      />
                    </div>
                  </div>
                  <div class="col-md-6 col-lg-6 ">
                    <div class="check-prime-member-right-cont">
                      <h3 class="check-prime-member-box-title">
                        {" "}
                        Flight booking
                      </h3>
                      <p class="check-prime-member-box-title-p">
                        {" "}
                        - Instant cashback upto Rs.5000 on every flight booking
                        and get additional discount up to 25% by using prime
                        points.{" "}
                      </p>
                    </div>
                  </div>
                </div>

                {/* <div class="check-prime-member-box-2"> 
                        <div class="col-md-6 col-lg-6 ">
                            <div class="check-prime-member-right-cont">
                                <h3 class="check-prime-member-box-title"> Hotel Booking </h3>
                                <p class="check-prime-member-box-title-p"> - 6% VIPS Wallet credits on Booking Amount - 40k+ Hotels in India & 430K+ Hotels worldwide </p>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-6">
                            <div class="check-prime-member-box-right-img"> 
                                <img src="/images/primePage/hotel-booking.jpg" class="img-fluid " /> 
                            </div>
                        </div>
                    </div> */}

                {/* <div class="check-prime-member-box-1">
                        <div class="col-md-6 col-lg-6">
                            <div class="check-prime-member-box-left-img"> 
                                <img src="/images/primePage/flight-booking.jpg" class="img-fluid " /> 
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-6 ">
                            <div class="check-prime-member-right-cont">
                                <h3 class="check-prime-member-box-title"> Flight Booking </h3>
                                <p class="check-prime-member-box-title-p"> - 2% VIPS Wallet credits on Booking Amount - 10k+ routes & 850+ Airlines domestic & worldwide </p>
                            </div>
                        </div>
                    </div> */}

                {/* <div class="check-prime-member-box-2"> 
                        <div class="col-md-6 col-lg-6 ">
                            <div class="check-prime-member-right-cont">
                                <h3 class="check-prime-member-box-title"> Discounts for Lifetime </h3>
                                <p class="check-prime-member-box-title-p"> - Get flat assured discount by using VIPS Wallet smart card - Dont search for coupon before your every purchase </p>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-6">
                            <div class="check-prime-member-box-right-img"> 
                                <img src="/images/primePage/lifetime-discount.png" class="img-fluid " /> 
                            </div>
                        </div>
                    </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/** <!-- CHECK OUT YOUR PRIME MEMBERSHIP end --> */}
    </>
  );
  return (
    <>
      {primeSection()}
    </>
  );
};

export default PrimeIndex;

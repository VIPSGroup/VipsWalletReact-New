import React, { useState } from 'react'
import Footer from '../../components/layout/Footer/Footer';
import "../../assets/styles/services/serviceIndex.css";
import "../../assets/styles/styles.css";
import { Link } from "react-router-dom";
import { MuiSnackBar } from '../../components/common';

const Services = () => {
  const [isSnackBar, setIsSnackBar] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const section = () => (
    <>
      {/*<!-- service promo banner start -->*/}
      <section class="service-page-section-align services-promo-banner">
        <div class="container">
          <div class="row">
            <div class="service-promo-banner">
              <div class="container">
                <div class="row">
                  <div class="col-sm-7 col-md-7 col-xl-7 service-promo-banner-content">
                    <h1 class="service-promo-banner-title">
                      {" "}
                      Online payments just got{" "}
                      <span> Easier, Hassle-free </span> and{" "}
                      <span> Effortless! </span>{" "}
                    </h1>

                    <p class="service-promo-banner-p">
                      With VIPS Wallet, you can complete and process your online
                      payments, from bills to loan repayment and more. Your
                      painless e-payments solution is here! VIPS Wallet
                      application available on Google Play store and App Store.
                    </p>

                    <div class="services-promo-app-btn">
                      {/* { <!-- <Link to="#" class="btn btn-primery"> Download App </Link> -->} */}

                      <Link
                        to="https://play.google.com/store/apps/details?id=com.vipswallet.shopping&hl=en_IN&gl=US&pli=1"
                        class="btn mr-2 playstore-download"
                        target="_blank"
                      >
                        <img
                          src="/images/home/Google-Play-download.svg"
                          alt="VIPS App Download"
                          class="img-fluid"
                        />
                      </Link>
                      <Link
                        to="https://apps.apple.com/us/app/vips-wallet/id1577945678"
                        class="btn appstore-download"
                        target="_blank"
                      >
                        <img
                          src="/images/home/App-Store-download.svg"
                          alt="VIPS App Download"
                          class="img-fluid"
                        />
                      </Link>
                    </div>
                  </div>
                  <div class="col-sm-5 col-md-5 col-xl-5">
                    <div class="service-promo-banner-image">
                      <img
                        src="/images/services/service-promo-app.svg"
                        class="img-fluid "
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* {<!-- service promo banner end --> */}

      {/* {<!-- -- Recharge & Pay Bills on Vipswallet start -- -->} */}
      <section class="service-page-section-align recharge-pay-bills">
        <div class="container">
          <div class="container">
            <div class="section-head">
              <h1 class="section-head-title">
                <span>Recharge</span> & Pay Bills
              </h1>
              <p class="section-head-subtitle">
                Ease the transaction and payments hassle with tech that's
                convenient to use.
              </p>
            </div>
          </div>

          {/* {<!-- <div class="row"> -->} */}

          <div class="services-box-outer">
            <div class="services-box-inner">
              <Link to="/services/mobileRecharge" class="services-div-outer">
                <div class="services-div-box">
                  <div class="services-page-icon">
                    <img
                      src="/images/services/recharge.svg"
                      alt="VIPS Services"
                      class="img-fluid service-icon"
                    />
                  </div>

                  <div class="service-title">
                    <h3>Recharge</h3>
                  </div>
                </div>
              </Link>
            </div>

            <div class="services-box-inner">
              <Link to="/services/dth" class="services-div-outer">
                <div class="services-div-box">
                  <div class="services-page-icon">
                    <img
                      src="/images/services/dth.svg"
                      alt="VIPS Services"
                      class="img-fluid service-icon"
                    />
                  </div>

                  <div class="service-title">
                    <h3>DTH</h3>
                  </div>
                </div>
              </Link>
            </div>

            <div class="services-box-inner">
              <Link to="/services/fastag" class="services-div-outer">
                <div class="services-div-box">
                  <div class="services-page-icon">
                    <img
                      src="/images/services/fastag.svg"
                      alt="VIPS Services"
                      class="img-fluid service-icon"
                    />
                  </div>

                  <div class="service-title">
                    <h3>Fastag</h3>
                  </div>
                </div>
              </Link>
            </div>

            <div class="services-box-inner">
              <Link to="/services/digitalCable" class="services-div-outer">
                <div class="services-div-box">
                  <div class="services-page-icon">
                    <img
                      src="/images/services/digital-cable.svg"
                      alt="VIPS Services"
                      class="img-fluid service-icon"
                    />
                  </div>

                  <div class="service-title">
                    <h3>Digital Cable</h3>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* {<!-- </div> -->
  } */}
        </div>
      </section>
      {/* {<!-- -- Recharge & Pay Bills on Vipswallet end -- -->} */}

      {/* {<!-- -- Pay Bills of Utilities on Vipswallet start -- -->} */}
      <section class="service-page-section-align recharge-pay-bills">
        <div class="container">
          <div class="container">
            <div class="section-head">
              <h1 class="section-head-title">
                <span>Pay Bills of Utilities</span>
              </h1>
              <p class="section-head-subtitle">
                Your all basic necessity bills can be taken care of using VIPS
                Wallet.
              </p>
            </div>
          </div>

          <div class="row">
            <div class="services-box-outer">
              <div class="services-box-inner">
                <Link to="/services/electricity" class="services-div-outer">
                  <div class="services-div-box">
                    <div class="services-page-icon">
                      <img
                        src="/images/services/electricity.svg"
                        alt="VIPS Services"
                        class="img-fluid service-icon"
                      />
                    </div>

                    <div class="service-title">
                      <h3>Electricity</h3>
                    </div>
                  </div>
                </Link>
              </div>

              <div class="services-box-inner">
                <Link to="/services/BroadBand" class="services-div-outer">
                  <div class="services-div-box">
                    <div class="services-page-icon">
                      <img
                        src="/images/services/broadBand.svg"
                        alt="VIPS Services"
                        class="img-fluid service-icon"
                      />
                    </div>

                    <div class="service-title">
                      <h3>Broadband</h3>
                    </div>
                  </div>
                </Link>
              </div>

              <div class="services-box-inner">
                <Link to="/services/gas" class="services-div-outer">
                  <div class="services-div-box">
                    <div class="services-page-icon">
                      <img
                        src="/images/services/piped-gas.svg"
                        alt="VIPS Services"
                        class="img-fluid service-icon"
                      />
                    </div>

                    <div class="service-title">
                      <h3>Gas</h3>
                    </div>
                  </div>
                </Link>
              </div>

              <div class="services-box-inner">
                <Link to="/services/lpggas" class="services-div-outer">
                  <div class="services-div-box">
                    <div class="services-page-icon">
                      <img
                        src="/images/services/lpg-gas.svg"
                        alt="VIPS Services"
                        class="img-fluid service-icon"
                      />
                    </div>

                    <div class="service-title">
                      <h3>LPG Gas</h3>
                    </div>
                  </div>
                </Link>
              </div>

              <div class="services-box-inner">
                <Link to="/services/insurancepremium" class="services-div-outer">
                  <div class="services-div-box">
                    <div class="services-page-icon">
                      <img
                        src="/images/services/insurence-primium.svg"
                        alt="VIPS Services"
                        class="img-fluid service-icon"
                      />
                    </div>

                    <div class="service-title">
                      <h3>Insurance Premium</h3>
                    </div>
                  </div>
                </Link>
              </div>

              <div class="services-box-inner">
                <Link to="/services/landline" class="services-div-outer">
                  <div class="services-div-box">
                    <div class="services-page-icon">
                      <img
                        src="/images/services/landline.svg"
                        alt="VIPS Services"
                        class="img-fluid service-icon"
                      />
                    </div>

                    <div class="service-title">
                      <h3>Landline</h3>
                    </div>
                  </div>
                </Link>
              </div>

              <div class="services-box-inner">
                <Link to="/services/water" class="services-div-outer">
                  <div class="services-div-box">
                    <div class="services-page-icon">
                      <img
                        src="/images/services/water.svg"
                        alt="VIPS Services"
                        class="img-fluid service-icon"
                      />
                    </div>

                    <div class="service-title">
                      <h3>Water</h3>
                    </div>
                  </div>
                </Link>
              </div>

              <div class="services-box-inner">
                <Link
                  to="/services"
                  class="services-div-outer"
                  onClick={()=>{
                    setIsSnackBar(true)
                    setErrorMsg("Service will be coming soon..")
                  }}
                >
                  <div class="services-div-box">
                    <div class="services-page-icon">
                      <img
                        src="/images/services/insurence-primium.svg"
                        alt="VIPS Services"
                        class="img-fluid service-icon"
                      />
                    </div>

                    <div class="service-title">
                      <h3>Buy Insurance</h3>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* {<!-- -- Pay Bills of Utilities on Vipswallet end -- -->} */}

      {/* {<!-- -- Financial Services & Taxes on Vipswallet start -- -->} */}
      <section class="service-page-section-align recharge-pay-bills">
        <div class="container">
          <div class="container">
            <div class="section-head">
              <h1 class="section-head-title">
                <span>Financial Services & Taxes</span>
              </h1>
              <p class="section-head-subtitle">
                Either it be loan repayment, tax or any other financial bill,
                VIPS Wallet can help you with easy transactions for it.
              </p>
            </div>
          </div>

          <div class="row">
            <div class="services-box-outer">
              <div class="services-box-inner">
                <Link to="/services/loanrepayment" class="services-div-outer">
                  <div class="services-div-box">
                    <div class="services-page-icon">
                      <img
                        src="/images/services/loan-payment.svg"
                        alt="VIPS Services"
                        class="img-fluid service-icon"
                      />
                    </div>

                    <div class="service-title">
                      <h3>Loan Repayment</h3>
                    </div>
                  </div>
                </Link>
              </div>

              <div class="services-box-inner">
                <Link to="/services/creditcard" class="services-div-outer">
                  <div class="services-div-box">
                    <div class="services-page-icon">
                      <img
                        src="/images/services/credit-card.svg"
                        alt="VIPS Services"
                        class="img-fluid service-icon"
                      />
                    </div>

                    <div class="service-title">
                      <h3>Credit Card</h3>
                    </div>
                  </div>
                </Link>
              </div>

              <div class="services-box-inner">
                <Link to="/services/housingsociety" class="services-div-outer">
                  <div class="services-div-box">
                    <div class="services-page-icon">
                      <img
                        src="/images/services/housing.svg"
                        alt="VIPS Services"
                        class="img-fluid service-icon"
                      />
                    </div>

                    <div class="service-title">
                      <h3>Housing Society</h3>
                    </div>
                  </div>
                </Link>
              </div>

              <div class="services-box-inner">
                <Link to="/services/hospitalbills" class="services-div-outer">
                  <div class="services-div-box">
                    <div class="services-page-icon">
                      <img
                        src="/images/services/hospital-bils.svg"
                        alt="VIPS Services"
                        class="img-fluid service-icon"
                      />
                    </div>

                    <div class="service-title">
                      <h3>Hospital Bills</h3>
                    </div>
                  </div>
                </Link>
              </div>

              <div class="services-box-inner">
                <Link to="/services/subscriptionfees" class="services-div-outer">
                  <div class="services-div-box">
                    <div class="services-page-icon">
                      <img
                        src="/images/services/subscriptions.svg"
                        alt="VIPS Services"
                        class="img-fluid service-icon"
                      />
                    </div>

                    <div class="service-title">
                      <h3>Subscription Fees</h3>
                    </div>
                  </div>
                </Link>
              </div>

              <div class="services-box-inner">
                <Link to="/services/clubassociation" class="services-div-outer">
                  <div class="services-div-box">
                    <div class="services-page-icon">
                      <img
                        src="/images/services/club-association.svg"
                        alt="VIPS Services"
                        class="img-fluid service-icon"
                      />
                    </div>

                    <div class="service-title">
                      <h3>Club & Association</h3>
                    </div>
                  </div>
                </Link>
              </div>

              <div class="services-box-inner">
                <Link to="/services/municipaltax" class="services-div-outer">
                  <div class="services-div-box">
                    <div class="services-page-icon">
                      <img
                        src="/images/services/municipal-tax.svg"
                        alt="VIPS Services"
                        class="img-fluid service-icon"
                      />
                    </div>

                    <div class="service-title">
                      <h3>Municipal Tax</h3>
                    </div>
                  </div>
                </Link>
              </div>

              <div class="services-box-inner">
                <Link
                  to="/services/municipalservices"
                  class="services-div-outer"
                >
                  <div class="services-div-box">
                    <div class="services-page-icon">
                      <img
                        src="/images/services/muncipal-service.svg"
                        alt="VIPS Services"
                        class="img-fluid service-icon"
                      />
                    </div>

                    <div class="service-title">
                      <h3>Municipal Service</h3>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );

  return (
    <>
    {section()}
    <MuiSnackBar
                    open={isSnackBar}
                    setOpen={setIsSnackBar}
                    errorMsg={errorMsg}
                    setErrorMsg={setErrorMsg}
                  />
  </>
  )
}

export default Services
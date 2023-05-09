import React from "react";
import { Link } from "react-router-dom";

import "../../assets/styles/home/paymentApp.css";
import "../../assets/styles/styles.css";
import { appStoreUrl, playStoreUrl } from "../../constant/Constants";

const PaymentApp = () => {
  return (
    <>
      <section class="section-align payment-app mb-0">
        <div class="container">
          <div class="row">
            <div class="payment-app-banner">
              <div class="container">
                <div class="row">
                  <div class="col-md-6 col-lg-5 payment-app-banner-content">
                    <h2 class="payment-app-banner-title">
                      India's Most - Loved Payment App
                    </h2>

                    <p class="payment-app-banner-p">
                      VIPS Wallet application is available on Google Play Store
                      and App Store. Download now for a trouble-free shopping
                      experience. .
                    </p>

                    <div class="row">
                      <Link to={playStoreUrl} target="_blank" class="btn mr-2">
                        <img
                          src="/images/home/Google-Play-download.svg"
                          alt="VIPS App Download"
                          class="img-fluid"
                        />
                      </Link>
                      <Link to={appStoreUrl} target="_blank" class="btn">
                        <img
                          src="/images/home/App-Store-download.svg"
                          alt="VIPS App Download"
                          class="img-fluid"
                        />
                      </Link>
                    </div>
                  </div>
                  <div class="col-md-6 col-lg-7">
                    <div class="banner-phone-image">
                      {" "}
                      <img src="/images/home/mobile-app.png" alt="" />{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PaymentApp;

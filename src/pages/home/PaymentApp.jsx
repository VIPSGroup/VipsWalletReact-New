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
                      1M+ Downloads on Google Play Store
                    </p>
                    <p class="payment-app-banner-p">
                      VIPS Wallet is one of the best-rated applications, with
                      more than 1 million downloads on the Google Play Store.
                      <br />
                      <br />
                      If you want to experience online shopping heaven,
                      inclusive of instant and best offers and cashback on every
                      recharge, download the VIPS Wallet application now.
                      Available on both Google Play Store and App Store.
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

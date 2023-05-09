import React from "react";
import { useState, useEffect } from "react";
import ReactGA from "react-ga";
import "../../assets/styles/onlineStores.css";
import { googleAnalytics } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { getAffiliate } from "../../redux/slices/onlineStoreSlice";
// import { LatestLoading } from "../../components/common/Loading";
import { Loading, ThemeButton } from "../../components/common";
import { LatestLoading } from "../../components/common/Loading";
import DynamicMeta from "../../components/SEO/DynamicMeta";
ReactGA.initialize(googleAnalytics);

const OnlineStores = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.onlineStoreSlice);
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
    dispatch(getAffiliate());
  }, []);

  const section = () => (
    <>
      <section class="online-store">
        <div class="container">
          <div class="section-head">
            <h1 class="section-head-title mb-3">
              <span>Online</span> Stores
            </h1>
            <p class="section-head-subtitle">
              Shop your favourite products from our connected online stores.
            </p>
          </div>
        </div>

        <div class="container">
          <div class="row inpage-online-store-row">
            {data ? (
              data.Data.map((a, i) => (
                <div class="inpage-online-stores-div">
                  <button
                    class="online-stores-box-button"
                    id="onlinestoretermsmodal"
                    data-toggle="modal"
                    data-target="#onlinestoreterms"
                  >
                    <div class="online-stores-box-icon">
                      <img
                        src={`http://shopadmin.vipswallet.com` + a.Logo}
                        alt="VIPS Services"
                        class="img-fluid online-stores-icon"
                        onClick={(e) => window.open(a.Url, "_blank")}
                      />
                    </div>

                    <div class="online-stores-title">
                      <h3>{a.Name}</h3>
                    </div>
                  </button>
                </div>
              ))
            ) : (
              <LatestLoading />
              // <Loading/>
            )}
          </div>
        </div>
      </section>
    </>
  );

  const popup = () => (
    <>
      <div
        class="modal fade online-store-modal"
        id="onlinestoreterms"
        tabindex="-1"
        role="dialog"
        aria-labelledby="onlinestoreterms"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-dialog-centered modal-dialog-scrollable"
          role="document"
        >
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title titleMain" id="exampleModalLabel">
                Affiliate Terms & Conditions
              </h5>
              <button
                type="button"
                class="close online-store-modal-close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">
                  {" "}
                  <i class="fa-sharp fa-solid fa-xmark"></i>{" "}
                </span>
              </button>
            </div>

            <div class="modal-body">
              <section class="">
                <div class="online-stores-terms">
                  <p>Just one step away to Earn Upto 10% Cash Back Offer</p>
                  <ul class="online-stores-terms-ul">
                    <li>
                      To get up to 10% Cashback, Visit the Best Shopping Website
                      in India - VIPS Wallet.com the one-stop for all Payment
                      Solutions
                    </li>

                    <li>
                      To get up to 10% Cashback you must complete your purchase
                      in the same Session on the VIPS Wallet.
                    </li>

                    <li>
                      Don't close the website while shopping. If you do, then
                      open VIPS Wallet and start a new session.
                    </li>

                    <li>
                      You will not get cashback if you pay for your order using
                      retailers' credits, gift cards, or vouchers.
                    </li>

                    <li>
                      Make sure your shopping cart is empty when you click on
                      the Store from the VIPS Wallet. If you add products before
                      you click from the VIPS Wallet, your purchase won't be
                      tracked.
                    </li>

                    <li>
                      Don't click on other links of other websites or pop-up Ads
                      while searching and shopping on VIPS Wallet
                    </li>

                    <li>
                      Do not visit any other price comparison, coupon, or deal
                      site before placing your order. Else your Cashback/Reward
                      will not be tracked.
                    </li>

                    <li>
                      Don't open multiple tabs of a website. Make sure the
                      website is opened only via VIPS Wallet. If you want to
                      shop more after checking out the first time, you must go
                      back to VIPS Wallet and click back through to the website
                      again.
                    </li>

                    <li>
                      Make sure that the Ad-Blocking plug-in and programs are
                      not enabled.
                    </li>

                    <li>
                      Cashback/Reward is not payable if you return any part of
                      your order. Even if you exchange any part of your order,
                      Cashback/Reward will be cancelled.
                    </li>

                    <li>
                      Your cashback will process once the Vendor approves the
                      purchase and pays the commission to VIPS Wallet.
                    </li>

                    <li>
                      Gold and Silver coins are not covered under the
                      Cashback/Reward.
                    </li>

                    <li>How to Claim Cashback</li>

                    <li>
                      Once you purchase a product in the same session, you need
                      to send the order details along with your registered VIPS
                      Wallet mobile number to VIPs Shopping Care.
                    </li>

                    <li>
                      You will find VIPs Shopping care in the Support Section of
                      VIPS Wallet application.
                    </li>

                    <li>
                      You can send order details in form of Image, PDF file,
                      etc.
                    </li>

                    <li>
                      Once we receive your details, We will update your Cashback
                      status as "Pending" within the 48 hours of the working
                      time in your VIPS Wallet application.
                    </li>

                    <li>
                      You can check your cashback status in VIPS Wallet
                      application Passbook Cashback.
                    </li>

                    <li>
                      Cashback will be credited automatically once 60 days hold
                      time ends and status will then change to "Success".
                    </li>
                  </ul>
                </div>
              </section>
            </div>

            <div class="modal-footer">
              <div class="online-store-btn">
                {/* <button href="#" class="btn-primery">
                  {" "}
                  Continue{" "}
                </button> */}
                <ThemeButton value={"Continue"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <DynamicMeta
        title={"Online Stores - VIPS Wallet"}
        canonical={"https://vipswallet.com/online-stores"}
      />
      {section()}
      {/* {popup()} */}
      {/* <Footer /> */}
    </>
  );
};

export default OnlineStores;

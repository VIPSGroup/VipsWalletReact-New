import React from "react";
import "../../../assets/styles/digigold/digigold-myorder.css";
import "../../../assets/styles/digigold/gold-home.css";
import "../../../assets/styles/digigold/digigold-delivery-product-details.css";
import { useNavigate } from "react-router-dom";

const DeliveryOrderDetails = () => {
  const navigate = useNavigate();
  // console.log("""first""")
  return (
    <>
      <section class="section-align buy-sell-form">
        <div class="container-fluid">
          <div class="digital-gold-section-head">
            <h1 class="section-head-title">My Order</h1>
          </div>

          <div class="col-lg-10 m-auto digigold-delivery-order-wrapper">
            <div class="col-lg-12 delivery-reorder-btn">
              <button class="">Reorder</button>
            </div>

            <div class="row digigold-delivery-details">
              <div class="col-lg-3 col-md-6 col-sm-6 delivery-details-box">
                <p class="delivery-order-details-title">Shipping Address</p>
                <p class="delivery-order-details-name">Supriya Morade</p>
                <p class="delivery-order-details-normaltext">
                  Manchar, Moradewadi Mumbai City Maharashtra 410503{" "}
                </p>
              </div>
              <div class="col-lg-3 col-md-6 col-sm-6 delivery-details-box">
                <p class="delivery-order-details-title">Billing Address</p>
                <p class="delivery-order-details-name">Supriya Morade</p>
                <p class="delivery-order-details-normaltext">
                  Manchar, Moradewadi Mumbai City Maharashtra 410503{" "}
                </p>
              </div>
              <div class="col-lg-3 col-md-6 col-sm-6 delivery-details-box">
                <div>
                  <p class="delivery-order-details-title">Order Status</p>
                  <p class="delivery-order-details-normaltext">Pending</p>
                </div>
                <div>
                  <p class="delivery-order-details-title">Shipping Method</p>
                  <p class="delivery-order-details-normaltext">-</p>
                </div>
                <div>
                  <p class="delivery-order-details-title">Tracking Number</p>
                  <p class="delivery-order-details-normaltext">-</p>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 col-sm-6 delivery-details-box">
                <div>
                  <p class="delivery-order-details-title">Order ID</p>
                  <p class="delivery-order-details-normaltext text-break">
                    OD277016770445323950160924
                  </p>
                </div>
                <div>
                  <p class="delivery-order-details-title">Payment Method</p>
                  <p class="delivery-order-details-normaltext">WALLET</p>
                </div>
                <div>
                  <p class="delivery-order-details-title">Order Date</p>
                  <p class="delivery-order-details-normaltext">22/02/2023</p>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-sm-12 col-md-12 col-lg-8">
                <div class="digigold-delivery-order-cart">
                  <div class="digigold-delivery-column-labels">
                    <label class="digigold-cart-delivery-details">
                      Product Name
                    </label>
                    <label class="digigold-cart-delivery-quantity">
                      Quantity
                    </label>
                    <label class="digigold-cart-delivery-price">
                      Total Amount
                    </label>
                  </div>

                  <div class="digigold-delivery-cart-product">
                    <div class="digigold-cart-delivery-details">
                      <div class="digigold-cart-delivery-image">
                        <img alt="" src="digigold-images/digi-gold-coin.svg" />
                      </div>
                      <div class="digigold-cart-delivery-title">
                        <p class="digigold-cart-delivery-name">
                          Augmont 1Gm Gold Coin (999 Purity)
                        </p>
                        <p class="digigold-cart-delivery-description">
                          SKU : AU999GC01G
                        </p>
                      </div>
                    </div>

                    <div class="digigold-cart-delivery-quantity">
                      <span class="d-inline-block d-md-none">Quantity: </span>
                      <span>1</span>
                    </div>

                    <div class="digigold-cart-delivery-price">
                      <span>&#x20B9; 705.60</span>
                    </div>
                  </div>

                  <div class="">
                    <div class="digigold-cart-payment-confirm-btn">
                      <button
                        onClick={() => navigate("/digigold-orders")}
                        class="btn-primery"
                      >
                        {" "}
                        Back to My Orders{" "}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-sm-12 col-md-12 col-lg-4">
                <div class="digigold-delivery-cart-right">
                  <div class="digigold-delivery-cart-payment-outer">
                    <div class="row">
                      <div class="col-md-12">
                        <h3 class="digigold-delivery-cart-payment-head">
                          {" "}
                          Order Summary{" "}
                        </h3>
                      </div>
                    </div>

                    <div class="col-md-12 p-0">
                      <div class="digigold-delivery-cart-payment-summery">
                        <div class="row ">
                          <div class="col-7 col-xs-4">
                            <span class="digigold-cart-summery-dark-text">
                              {" "}
                              Total Payable :{" "}
                            </span>
                          </div>
                          <div class="col-5 col-xs-4 text-right">
                            <span class="digigold-cart-summery-dark-text">
                              {" "}
                              &#x20B9; 705.60{" "}
                            </span>
                          </div>
                        </div>
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
  );
};

export default DeliveryOrderDetails;

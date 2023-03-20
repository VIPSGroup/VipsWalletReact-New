import React from "react";
import '../../../assets/styles/digigold/digigold-shopping-cart.css'

const DigiDeliveryCart = () => {
  return (
    <>
      <section class="section-align buy-sell-form">
        <div class="container-fluid">
          <div class="digigold-work-section-head delivery-section-head">
            <h1 class="section-head-title py-2">Shopping Cart</h1>
          </div>

          {/* <!-- product details start --> */}
          <div class="col-lg-10 m-auto digigold-shopping-cart-wrapper">
            <div class="row">
              <div class="col-sm-12 col-md-12 col-lg-8">
                <div class="digigold-shopping-cart">
                  <div>
                    <p class="digigold-shopping-note">
                      Augmont 10Gm Silver Coin (999 Purity) has been added to
                      your shopping cart.
                    </p>
                  </div>

                  <div class="digigold-cart-column-labels">
                    <label class="digigold-cart-product-details">
                      Product Name
                    </label>
                    <label class="digigold-cart-product-weight">
                      Weight (gms)
                    </label>
                    <label class="digigold-cart-product-quantity">
                      Quantity
                    </label>
                    <label class="digigold-cart-product-price">
                      Total Amount
                    </label>
                  </div>

                  <div class="digigold-cart-product">
                    <div class="digigold-cart-product-details">
                      <div class="digigold-cart-product-image">
                        <img alt="" src="digigold-images/digi-gold-coin.svg" />
                      </div>
                      <div class="digigold-cart-product-title">
                        <p class="digigold-cart-product-name">
                          Augmont 1Gm Gold Coin (999 Purity)
                        </p>
                        <p class="digigold-cart-product-description">
                          SKU : AU999GC01G
                        </p>
                      </div>
                    </div>

                    <div class="digigold-cart-product-weight">
                      {/* <!-- <p class="d-md-none d-sm-block">Weight (gms)</p> --> */}
                      <span>10 gms</span>
                    </div>

                    <div class="digigold-cart-product-quantity">
                      <div class="digigold-cart-product-choose-quantity">
                        <div class="value-button decrease-sign" id="decrease">
                          {" "}
                          <i class="fa-solid fa-minus"></i>{" "}
                        </div>
                        <input
                          type="number"
                          class="quantity-number"
                          id="number"
                          value="1"
                        />
                        <div class="value-button increase-sign" id="increase">
                          {" "}
                          <i class="fa-solid fa-plus"></i>{" "}
                        </div>
                      </div>
                    </div>

                    <div class="digigold-cart-product-price">
                      <div class="digigold-cart-product-price-inner">
                        <span>&#x20B9; 705.60</span>
                        <span>
                          <i
                            class="fa fa-trash digigold-cart-remove"
                            aria-hidden="true"
                          ></i>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div class="digigold-cart-product">
                    <div class="digigold-cart-product-details">
                      <div class="digigold-cart-product-image">
                        <img alt="" src="digigold-images/digi-gold-coin.svg" />
                      </div>
                      <div class="digigold-cart-product-title">
                        <p class="digigold-cart-product-name">
                          Augmont 1Gm Gold Coin (999 Purity)
                        </p>
                        <p class="digigold-cart-product-description">
                          SKU : AU999GC01G
                        </p>
                      </div>
                    </div>

                    <div class="digigold-cart-product-weight">
                      {/* <!-- <p class="d-md-none d-sm-block">Weight (gms)</p> --> */}
                      <span>10 gms</span>
                    </div>

                    <div class="digigold-cart-product-quantity">
                      <div class="digigold-cart-product-choose-quantity">
                        <div class="value-button decrease-sign" id="decrease">
                          {" "}
                          <i class="fa-solid fa-minus"></i>{" "}
                        </div>
                        <input
                          type="number"
                          class="quantity-number"
                          id="number"
                          value="1"
                        />
                        <div class="value-button increase-sign" id="increase">
                          {" "}
                          <i class="fa-solid fa-plus"></i>{" "}
                        </div>
                      </div>
                    </div>

                    <div class="digigold-cart-product-price">
                      <div class="digigold-cart-product-price-inner">
                        <span>&#x20B9; 705.60</span>
                        <span>
                          <i
                            class="fa fa-trash digigold-cart-remove"
                            aria-hidden="true"
                          ></i>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div class="digigold-cart-tatal-wrapper">
                    <div class="digigold-cart-total-title">
                      {/* <!-- <div class="digigold-cart-product-title"> -->
                              <p class="digigold-cart-total-name">Total</p>
                          <!-- </div> --> */}
                    </div>

                    <div class="digigold-cart-total-weight">
                      <span>10 gms</span>
                    </div>

                    <div class="digigold-cart-total-quantity d-none d-md-block">
                      <span>1</span>
                    </div>

                    <div class="digigold-cart-total-price">
                      <span>&#x20B9; 705.60</span>
                    </div>
                  </div>

                  <div class="">
                    <div class="digigold-cart-payment-confirm-btn">
                      <button href="#" class="btn-primery">
                        {" "}
                        Proceed To Checkout{" "}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-sm-12 col-md-12 col-lg-4">
                <div class="digigold-cart-right">
                  <div class="digigold-cart-payment-outer box-shadow-1">
                    <div class="row">
                      <div class="col-md-12">
                        <h3 class="digigold-cart-payment-head">
                          {" "}
                          Order Summary{" "}
                        </h3>
                      </div>
                    </div>

                    <div class="col-md-12 p-0">
                      <div class="digigold-cart-payment-summery">
                        <div class="row mb-3">
                          <div class="col-7 col-xs-4">
                            <span> Delivery Fee : </span>
                          </div>
                          <div class="col-5 col-xs-4 text-right">
                            <span class=""> &#x20B9; 705.60 </span>
                          </div>
                        </div>

                        <div class="dropdown-divider"></div>

                        <div class="row mt-3">
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

export default DigiDeliveryCart;

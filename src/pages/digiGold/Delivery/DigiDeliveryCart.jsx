import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../../assets/styles/digigold/digigold-shopping-cart.css";
import { calculateTotalPrice } from "../../../constants";
import {
  addItem,
  deleteItem,
  removeItem,
} from "../../../redux/slices/digiGold/DeliverySlice";

const DigiDeliveryCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.DeliverySlice);

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
                  {/* <div>
                    <p class="digigold-shopping-note">
                      Augmont 10Gm Silver Coin (999 Purity) has been added to
                      your shopping cart.
                    </p>
                  </div> */}

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

                  {items?.map((e, i) => {
                    return (
                      <div class="digigold-cart-product">
                        <div class="digigold-cart-product-details">
                          <div class="digigold-cart-product-image">
                            <img alt="" src={e.productImages} />
                          </div>
                          <div class="digigold-cart-product-title">
                            <p class="digigold-cart-product-name">{e.name}</p>
                            <p class="digigold-cart-product-description">
                              SKU : {e.sku}
                            </p>
                          </div>
                        </div>

                        <div class="digigold-cart-product-weight">
                          {/* <!-- <p class="d-md-none d-sm-block">Weight (gms)</p> --> */}
                          <span>{e.productWeight} gms</span>
                        </div>

                        <div class="digigold-cart-product-quantity">
                          <div class="digigold-cart-product-choose-quantity">
                            <div
                              onClick={() => {
                                if (e.quantity > 1) {
                                  dispatch(removeItem(e));
                                }
                              }}
                              class="value-button decrease-sign"
                              id="decrease"
                            >
                              {" "}
                              <i class="fa-solid fa-minus"></i>{" "}
                            </div>
                            <h2
                              style={{
                                fontSize: 20,
                                alignSelf: "center",
                                paddingRight: 12,
                                paddingLeft: 12,
                                paddingTop: 5,
                              }}
                            >
                              {e.quantity}
                            </h2>
                            <div
                              onClick={() => dispatch(addItem(e))}
                              class="value-button increase-sign"
                              id="increase"
                            >
                              {" "}
                              <i class="fa-solid fa-plus"></i>{" "}
                            </div>
                          </div>
                        </div>

                        <div class="digigold-cart-product-price">
                          <div class="digigold-cart-product-price-inner">
                            <span>&#x20B9; {e.quantity * e.basePrice}</span>
                            <span
                              style={{ cursor: "pointer" }}
                              onClick={() => dispatch(deleteItem(e))}
                            >
                              <i
                                class="fa fa-trash digigold-cart-remove"
                                aria-hidden="true"
                              ></i>
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <div class="digigold-cart-tatal-wrapper">
                    <div class="digigold-cart-total-title">
                      {/* <!-- <div class="digigold-cart-product-title"> -->
                              <p class="digigold-cart-total-name">Total</p>
                          <!-- </div> --> */}
                    </div>

                    <div class="digigold-cart-total-weight">
                      <span>
                        {calculateTotalPrice(items, "productWeight")} gms
                      </span>
                    </div>

                    <div class="digigold-cart-total-quantity d-none d-md-block">
                      <span>{calculateTotalPrice(items, "productWeight")}</span>
                    </div>

                    <div class="digigold-cart-total-price">
                      <span>
                        &#x20B9; {calculateTotalPrice(items, "basePrice")}
                      </span>
                    </div>
                  </div>

                  <div class="">
                    <div class="digigold-cart-payment-confirm-btn">
                      <button
                        onClick={() => navigate("/vipsgold-checkout")}
                        class="btn-primery"
                      >
                        Proceed To Checkout
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
                            <span class=""> &#x20B9; 00 </span>
                          </div>
                        </div>

                        <div class="dropdown-divider"></div>

                        <div class="row mt-3">
                          <div class="col-7 col-xs-4">
                            <span class="digigold-cart-summery-dark-text">
                              Total Payable :
                            </span>
                          </div>
                          <div class="col-5 col-xs-4 text-right">
                            <span class="digigold-cart-summery-dark-text">
                              &#x20B9; {calculateTotalPrice(items, "basePrice")}
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

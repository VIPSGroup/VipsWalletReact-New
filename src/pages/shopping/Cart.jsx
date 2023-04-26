import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import "../../assets/styles/shopping/cart.css";

// import { MuiSnackBar } from "../../components/common/snackbars";
import ReactGA from "react-ga";
import { googleAnalytics } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { MuiSnackBar, ThemeButton } from "../../components/common";
import { removeCart } from "../../redux/slices/shopping/cartSlice";

ReactGA.initialize(googleAnalytics);

const Cart = ({ setIsHomeTopNav }) => {
  const [cartProducts, setCartProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [dummy, setDummy] = useState(0);
  const [isSnackBar, setIsSnackBar] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  let navigate = useNavigate();
 const dispatch= useDispatch()
 const { cartCount } = useSelector((state) => state.cartSlice);
  const { loggedInUser } = useSelector(
    (state) => state.loginSlice.loggetInWithOTP
  );
  const clickRemove = (id) => {
dispatch(removeCart(id))
    const allCart = JSON.parse(localStorage.getItem("cart"))
    const filteredCart= allCart.filter(item=>item.product.Id!==id)
    setCartProducts(filteredCart);
    localStorage.setItem("cart", JSON.stringify(filteredCart));
    let price=0
    filteredCart.map((d, i) => {
      price = price + d.qty * d.product.SalePrice;
    })
    setTotalAmount(price)
  };

  const handleQuantityChange = (e, i, curretQty) => {
    e.preventDefault();
    const cartData = cartProducts;
    var qty = cartData[i].qty;

    if (qty < curretQty) {
      cartData[i].qty += 1;
      setCartProducts(cartData);
      localStorage.setItem("cart", JSON.stringify(cartData));
      setDummy(!dummy);
    } else {
      setIsSnackBar(true);
      setErrorMsg("Sorry you can't add more item");
    }
  };

  const handleQuantityDecrease = (e, i, curretQty) => {
    e.preventDefault();
    const cartData = cartProducts;
    var qty = cartData[i].qty;
    if (qty > 1) {
      cartData[i].qty -= 1;
      setCartProducts(cartData);
      localStorage.setItem("cart", JSON.stringify(cartData));
      setDummy(!dummy);
    }
  };

  useEffect(() => {
    setIsHomeTopNav(false);
    ReactGA.pageview(window.location.pathname);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart"));
    data && setCartProducts(data);
    var price = 0;

    if (data) {
      data.map((d, i) => {
        price = price + d.qty * d.product.SalePrice;
      });
    }

    setTotalAmount(price);
  }, [dummy]);

  const cartSection = () => (
    <section class="inpage-section-align">
      <div class="container">
        <div class="cart-top-nav">
          <div class="">
            <div class="payment-head">
              <Link class="" to="/">
                <img
                  src="/images/VipsLogoMain.png"
                  alt="VIPS Logo"
                  class="img-fluid payment-head-logo"
                />
              </Link>
            </div>

            <div class="col-md-12 go-back">
              <Link
                onClick={() => {
                  navigate(-1);
                }}
              >
                <i class="fa-solid fa-arrow-left"> </i>Go back{" "}
              </Link>
            </div>
          </div>

          <div class="order-tracking-wrapper">
            <div class="order-tracking-outer">
              <div class="order-tracking order-tracking-cart completed">
                <span class=""> Cart </span>
              </div>
              <div class="order-tracking order-tracking-address ">
                <span class=""> Address </span>
              </div>
              <div class="order-tracking order-tracking-payment">
                <span class=""> Payment </span>
              </div>
            </div>
          </div>
        </div>

        {/* <div class="container">
          <div class="col-12">
            
          </div>
        </div> */}

        <div class="row">
          {/* { <!-- shopping-cart start --> } */}
          <div class="col-sm-12 col-md-12 col-lg-8">
            <div class="shopping-cart-left">
              <div class="shopping-cart-box-outer">
                {/* {<!-- product card 1 start -->} */}
                {cartProducts.length < 1 ? (
                  <div class="offset-lg-5 text-center cart-no-data empty-cart">
                    <h3 class="nodata-title mb-4">Cart is Empty</h3>
                    <img src="/images/empty_cart.svg" />
                  </div>
                ) : (
                  cartProducts &&
                  cartProducts.map((pro, i) => (
                    <div class="shopping-cart-product-card box-shadow-1">
                      <div class="shopping-cart-product-outer">
                        <div class="col-lg-10 shopping-cart-product-info p-0">
                          <div>
                            <img
                              src={`http://shopadmin.vipswallet.com/${pro.product.ImageThumbURL1}`}
                              class="shopping-cart-product-img"
                            />
                          </div>
                          <div class="product-info-inner">
                            <p class="shopping-cart-product-name">
                              {" "}
                              {pro.product.Name}
                            </p>
                            <p class="shopping-cart-product-amt">
                              <span class="">
                                {" "}
                                ₹{" "}
                                {pro.product.SalePrice &&
                                  pro.product.SalePrice.toLocaleString()}
                              </span>
                              {pro.product.CostPrice!==0 && <>
                                <span class="cut">
                                {" "}
                                ₹{" "}
                                {pro.product.RetailPrice &&
                                  pro.product.RetailPrice.toLocaleString()}
                              </span>
                              <span class="product-discount">
                                {" "}
                                ({pro.product.CostPrice}% Off){" "}
                              </span>
                              </>}
                              
                            </p>
                            <p class="shopping-cart-product-color">
                              Color : <span> {pro.selectedColor} </span>{" "}
                            </p>
                            <p class="shopping-cart-product-color">
                              Size : <span> {pro.selectedSize} </span>{" "}
                            </p>
                            <div class="product-details-choose-quantity">
                              <div
                                onClick={(e) =>
                                  handleQuantityDecrease(
                                    e,
                                    i,
                                    pro.product.Quantity
                                  )
                                }
                                class="value-button decrease-sign"
                                id="decrease"
                              >
                                {" "}
                                <i class="fa-solid fa-minus"></i>{" "}
                              </div>
                              <input
                                type="number"
                                class="quantity-number"
                                id="number"
                                value={pro.qty}
                              />
                              <div
                                onClick={(e) =>
                                  handleQuantityChange(
                                    e,
                                    i,
                                    pro.product.Quantity
                                  )
                                }
                                class="value-button increase-sign"
                                id="increase"
                              >
                                {" "}
                                <i class="fa-solid fa-plus"></i>{" "}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="shopping-cart-product-btns">
                          <div class="shopping-cart-remove-product-btn">
                            <button
                              type="button"
                              onClick={()=>clickRemove(pro.product.Id)}
                              name="remove"
                              class="btn btn-cta"
                              value={i}
                            >
                              {" "}
                              <i class="fa fa-trash fa-danger"></i>{" "}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {cartProducts.length >= 1 && (
            <div class="col-sm-12 col-md-12 col-lg-4 ">
              {/* <div class="shopping-cart-right"> */}
                <div class="for-sticky">
                  <div class="shopping-cart-payment-outer box-shadow-1">
                    <div class="row">
                      <div class="col-md-12">
                        <h3 class="shopping-cart-payment-head">
                          {" "}
                          Order Summary{" "}
                        </h3>
                      </div>
                    </div>

                    <div class="col-md-12 p-0">
                      <div class="shopping-cart-payment-summery">
                        <div class="row mb-3">
                          <div class="col-7 col-xs-4">
                            <span> Price : </span>
                          </div>
                          <div class="col-5 col-xs-4 text-right">
                            <span class="shopping-cart-payment-summery-amt">
                              {" "}
                              &#x20B9;{" "}
                              {totalAmount && totalAmount.toLocaleString()}{" "}
                            </span>
                          </div>
                        </div>
                        <div class="dropdown-divider"></div>

                        <div class="row mt-3">
                          <div class="col-7 col-xs-4">
                            <span> Total Amount : </span>
                          </div>
                          <div class="col-5 col-xs-4 text-right">
                            <span class="shopping-cart-payment-summery-amt">
                              {" "}
                              &#x20B9;{" "}
                              {totalAmount && totalAmount.toLocaleString()}{" "}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div class="col-md-12">
                        <div class="shopping-cart-payment-confirm-btn">
                          {/* <button
                            onClick={(e) => {
                              e.preventDefault();
                              if (totalAmount > 0) {
                                if (loggedInUser) {
                                  navigate("/shopping/address", {
                                    state: {
                                      products: cartProducts,
                                      totalAmount: totalAmount,
                                    },
                                  });
                                } else {
                                  navigate("/login");
                                }
                              }
                            }}
                            class="btn-primery"
                            disabled={cartProducts.length < 1 ? true : false}
                          >
                            {" "}
                            Place Order{" "}
                          </button> */}
                          <ThemeButton onClick={(e) => {
                              e.preventDefault();
                              if (totalAmount > 0) {
                                if (loggedInUser) {
                                  navigate("/shopping/address", {
                                    state: {
                                      products: cartProducts,
                                      totalAmount: totalAmount,
                                    },
                                  });
                                } else {
                                  navigate("/login");
                                }
                              }
                            }} disabled={cartProducts.length < 1 ? true : false} value={"Place Order"}/>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div class="shopping-cart-payment-outer box-shadow-1 mt-3">
                  <div class="row">
                    <div class="col-md-12">
                      <h3 class="shopping-cart-payment-head">
                        {" "}
                        Return / Refund Policy{" "}
                      </h3>
                    </div>
                  </div> */}

                  {/* <div class="col-md-12 p-0">
                    <div class="shopping-cart-refund-policy">
                      <p>
                        {" "}
                        In case of return, we ensure quick refunds. Full amount
                        will be refunded excluding Convenience Fee
                      </p>
                      <Link to="#">Read Policy</Link>
                    </div>
                  </div> */}
                  {/* </div> */}
                </div>
              {/* </div> */}
            </div>
          )}

          <MuiSnackBar
            open={isSnackBar}
            setOpen={setIsSnackBar}
            successMsg={successMsg}
            errorMsg={errorMsg}
            setSuccess={setSuccessMsg}
            setError={setErrorMsg}
          />
        </div>
      </div>
    </section>
  );

  return <div>{cartSection()}</div>;
};

export default Cart;

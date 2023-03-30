import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import "../../assets/styles/shopping/cart.css";
import { getDouble, googleAnalytics, appType } from "../../constants";
import ReactGA from "react-ga";
import { useDispatch, useSelector } from "react-redux";
import LoadingBar from "../../components/common/Loading";
import { getWalletBalance } from "../../redux/slices/payment/walletSlice";
import { placeOrder } from "../../apiData/shopping/shopping";
import { MuiSnackBar, ThemeButton } from "../../components/common";

ReactGA.initialize(googleAnalytics);

const ShoppingCheckout = () => {
  const dispatch = useDispatch();
  const [selectedDiscount, setSelectedDiscount] = useState("");
  const [amount, setAmount] = useState("");
  const [finalAmount, setFinalAmount] = useState();
  const [isSnackBar, setIsSnackBar] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [balance, setBalance] = useState("");
  const [shoppingPoints, setShoppingPoints] = useState("");
  const [primePoints, setPrimePoints] = useState("");
  const [shoppingDiscount, setShoppingDiscount] = useState("");
  const [primeDiscount, setPrimeDiscount] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("wallet");
  const [payuAmt, setPayuAmt] = useState("0");
  const [walletAmt, setWalletAmt] = useState("");
  const [shippingCharges, setShippingCharges] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");

  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  let navigate = useNavigate();
  const propsProductsData = location.state;
  const { loggedInUser } = useSelector(
    (state) => state.loginSlice.loggetInWithOTP
  );
  const { data } = useSelector((state) => state.walletSlice.walletBalance);
  const { data: orderData } = useSelector(
    (state) => state.orderSlice.orderPlace );

  const handleClose = () => {
    setShowModal(false);
  };

  const handlePaymentMethod = (e) => {
    if (balance < amount) {
      if (selectedPaymentMethod == "both" && e.target.value == "wallet") {
        setSelectedPaymentMethod("payu");
        setPayuAmt(amount);
        setWalletAmt(0);
      } else if (
        selectedPaymentMethod != "both" &&
        e.target.value == "wallet"
      ) {
        setSelectedPaymentMethod("both");
        setWalletAmt(balance);
        setPayuAmt(amount - balance);
      }
    } else {
      if (e.target.value == "wallet") {
        setSelectedPaymentMethod(e.target.value);
        setWalletAmt(amount);
        setPayuAmt(0);
      } else if (e.target.value == "payu") {
        setSelectedPaymentMethod(e.target.value);
        setPayuAmt(amount);
        setWalletAmt(0);
      }
    }
  };

  const manageInitialPaymentMethod = (balance, amount) => {
    if (balance >= amount) {
      setSelectedPaymentMethod("wallet");
    } else if (balance < amount) {
      setSelectedPaymentMethod("both");
    }
  };

  const clickConfirmPayment = (e) => {
    e.preventDefault();

    setLoading(true);
    const orderDetailsArray = [];
    var chargesIndex = 3;

    if (propsProductsData.address.State.includes("Maharashtra")) {
      chargesIndex = 3;
    } else {
      chargesIndex = 4;
    }

    propsProductsData &&
      propsProductsData.products.map((p, i) => {
        const orderObj = {
          color: p.selectedColor,
          price: p.product.SalePrice,
          productId: p.product.Id,
          productName: p.product.Name,
          quantity: p.qty,
          shippingCharge: p.charges[chargesIndex].Amount,
          shoppingAmount: p.product.ShoppingAmt,
          shoppingPer: p.product.ShoppingPoint,
          size: p.selectedSize,
          totalAmount: p.SalePrice,
        };
        orderDetailsArray.push(orderObj);
      });

    var subTotal = 0;
    var totalAmount = 0;
    var totalShoppingPoint = 0;
    var PointType = "";
    if (selectedDiscount === "shoppingPoint") {
      subTotal = amount - shoppingDiscount;
      totalAmount = amount - shoppingDiscount + shippingCharges;
      totalShoppingPoint = shoppingDiscount;
      PointType = "SHOPPING";
    } else if (selectedDiscount === "primePoint") {
      subTotal = amount - primeDiscount;
      totalAmount = amount - primeDiscount + shippingCharges;
      totalShoppingPoint = primeDiscount;
      PointType = "PRIME";
    }

    const paymentObj = {
      cGSTAmount: "0.0",
      discount: "0.0",
      iGSTAmount: "0.0",
      iPAddress: "12345",
      isShopping: "true",
      orderdetail: orderDetailsArray,
      password: loggedInUser.TRXNPassword,
      paymentMode: "WALLET",
      quantity: propsProductsData.products.length,
      sGSTAmount: "0.0",
      shippingAddressId: propsProductsData.address.Id,
      shippingCharge: shippingCharges,
      subTotal: subTotal,
      totalAmount: totalAmount,
      totalShoppingPoint: totalShoppingPoint,
      username: loggedInUser.Mobile,
      PointType: PointType,
      AppType: appType,
    };

    placeOrder(paymentObj).then((response) => {
      if (response.ResponseStatus === 1) {
        setLoading(false);
        setShowModal(true);
        setErrorMsg('');
        setIsSnackBar(true)
        setSuccessMsg(response.Remarks)
      } else if(response.ResponseStatus === 0){
        setLoading(false);
        setSuccessMsg("")
        setIsSnackBar(true)
        setErrorMsg(response.Remarks);
      }
    });
  };

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
    const username = loggedInUser && loggedInUser.UserName;
    const password = loggedInUser && loggedInUser.TRXNPassword;
    const propsProductsData = location.state;
    setSelectedDiscount("shoppingPoint");
    // const fetchWalletBalance = async () => {
    //   await dispatch(getWalletBalance({ userName, password }));
    // };
    // fetchWalletBalance();
    if(loggedInUser){
      if(data?.Data?.length!==0 || !data){
        dispatch(getWalletBalance({username,password}))
      }
    }
  }, [dispatch]);
  useEffect(() => {
    if (data.Data) {
      setBalance(data.Data.Balance);
      setShoppingPoints(data.Data.Shoppingpoints);
      setPrimePoints(data.Data.PrimePoints);

      var price = 0;
      var sDiscount = 0;
      var pDiscount = 0;
      var shippingCost = 0;

      propsProductsData.products.map((d, i) => {
        price = price + d.qty * d.product.SalePrice;

        sDiscount =
          sDiscount + (d.product.ShoppingPoint / 100) * d.product.SalePrice;
        pDiscount =
          pDiscount + (d.product.PrimePoints / 100) * d.product.SalePrice;

        if (propsProductsData.address.State.includes("Maharashtra")) {
          shippingCost = shippingCost + d.charges[3].Amount;
        } else {
          shippingCost = shippingCost + d.charges[4].Amount;
        }
        setShippingCharges(shippingCost);
      });
      setAmount(price);
      manageInitialPaymentMethod(data.Data.Balance, price);

      if (sDiscount <= data.Data.Shoppingpoints) {
        setShoppingDiscount(sDiscount.toFixed(2));
        const amt = parseInt(price) - parseInt(sDiscount);

        setFinalAmount(amt);
      } else {
        setShoppingDiscount(data.Data.Shoppingpoints);
        setFinalAmount(price - data.Data.Shoppingpoints);
      }

      if (pDiscount <= data.Data.PrimePoints) {
        setPrimeDiscount(pDiscount);
        setFinalAmount(price - pDiscount);
      } else {
        setPrimeDiscount(data.Data.PrimePoints);
        setFinalAmount(price - data.Data.PrimePoints);
      }
    }else if(data.ResponseStatus==0){
        setSuccessMsg("")
       setIsSnackBar(true)
       setErrorMsg( data.Remarks)
       }
  }, [data.Data]);

  const checkoutSection = () => (
    <div>
      <section class="inpage-section-align shopping-cart-payment">
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
                <div class="order-tracking order-tracking-cart">
                  <Link class=""> Cart </Link>
                </div>
                <div class="order-tracking order-tracking-address">
                  <Link class=""> Address </Link>
                </div>
                <div class="order-tracking order-tracking-payment completed">
                  <Link class=""> Payment </Link>
                </div>
              </div>
            </div>
          </div>

          {/* <div class="container">
            <div class="col-12">
              
            </div>
          </div> */}

          <div class="row">
            {/* {<!-- shopping Payment confirmation start --> } */}

            <div class="col-sm-12 col-md-12 col-lg-8">
              <div class="shopping-payment-left">
                <div class="shopping-payment-content">
                  <div class="shopping-payment-card box-shadow-1">
                    <div class="row">
                      <div class="col-md-12 shopping-payment-content-head">
                        <h3 class="shopping-payment-content-title">
                          {" "}
                          Get Discount with Order{" "}
                        </h3>
                      </div>
                    </div>
                    <div class="shopping-paymet-info-outer">
                      <div class="shopping-payment-discount">
                        <form>
                          <div class="shopping-paymet-discount-info mb-4">
                            <div class="col-lg-8 p-0">
                              <label>
                                <input
                                  onChange={(e) => {
                                    setSelectedDiscount(e.target.value);
                                    setFinalAmount(amount - shoppingDiscount);
                                  }}
                                  type="radio"
                                  name="radio-button"
                                  value="shoppingPoint"
                                  checked={
                                    selectedDiscount == "shoppingPoint"
                                      ? true
                                      : false
                                  }
                                />
                                <span>
                                  {" "}
                                  <img
                                    src="/images/services/mob-payment-discount.png"
                                    class="img-fluid shopping-payment-discount-img"
                                  />{" "}
                                  Shopping Points ({shoppingPoints}){" "}
                                </span>
                              </label>
                            </div>
                          </div>

                          <div class="shopping-paymet-discount-info">
                            <div class="col-lg-8 p-0">
                              <label>
                                <input
                                  onChange={(e) => {
                                    setSelectedDiscount(e.target.value);
                                    setFinalAmount(amount - primeDiscount);
                                  }}
                                  type="radio"
                                  name="radio-button"
                                  value="primePoint"
                                  checked={
                                    selectedDiscount == "primePoint"
                                      ? true
                                      : false
                                  }
                                />
                                <span>
                                  {" "}
                                  <img
                                    src="/images/services/mob-payment-discount.png"
                                    class="img-fluid shopping-payment-discount-img"
                                  />{" "}
                                  Prime Points ({primePoints}){" "}
                                </span>
                              </label>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div class="shopping-payment-card box-shadow-1">
                    <div class="row">
                      <div class="col-md-12 shopping-payment-content-head">
                        <h3 class="shopping-payment-content-title">
                          Debit From
                        </h3>
                      </div>
                    </div>
                    <div class="shopping-paymet-info-outer">
                      <div class="shopping-payment-discount">
                        <form>
                          <div class="payment-confirmation-discount-info ">
                            <div class="col-lg-8 p-0">
                              <div class="custom-control custom-checkbox ">
                                <input
                                  onChange={handlePaymentMethod}
                                  class="custom-control-input"
                                  id="vips-wallet"
                                  type="checkbox"
                                  name="radio-button"
                                  value="wallet"
                                  checked="true"
                                />
                                <label
                                  class="custom-control-label"
                                  for="vips-wallet"
                                >
                                  <img
                                    src="/images/logos/vips-logo-small.png"
                                    class="img-fluid shopping-payment-debit-vips"
                                  />{" "}
                                  VIPS Wallet (₹ {balance})
                                </label>
                              </div>
                            </div>
                            <div class="col-lg-4 p-0">
                              <p class="mob-paymet-discount-amt ml-auto">
                                {" "}
                                &#x20B9; {amount}{" "}
                              </p>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-sm-12 col-md-12 col-lg-4 p-0">
              <div class="shopping-payment-right">
                <div class="shopping-payment-right-sticky box-shadow-1">
                  <div class="row">
                    <div class="col-md-12 shopping-payment-content-head">
                      <h3 class="shopping-payment-content-title">
                        {" "}
                        Order Summary{" "}
                      </h3>
                    </div>
                  </div>

                  <div class="col-md-12 p-0">
                    <div class="shopping-payment-summery">
                      <div class="row mb-3">
                        <div class="col-7 col-xs-4">
                          <span> Amount : </span>
                        </div>
                        <div class="col-5 col-xs-4 text-right">
                          <span class="shopping-payment-summery-amt">
                            {" "}
                            &#x20B9; {parseFloat(amount).toLocaleString()}{" "}
                          </span>
                        </div>
                      </div>

                      {selectedDiscount == "shoppingPoint" ? (
                        <div class="row mb-3">
                          <div class="col-7 col-xs-4">
                            <span> Shopping Points : </span>
                          </div>
                          <div class="col-5 col-xs-4 text-right">
                            <span class="shopping-payment-summery-amt">
                              {" "}
                              -&#x20B9;{" "}
                              {/* {JSON.stringify(shoppingDiscount)} */}
                              {parseFloat(
                                shoppingDiscount
                              ).toLocaleString()}{" "}
                            </span>
                          </div>
                        </div>
                      ) : null}

                      {selectedDiscount == "primePoint" ? (
                        <div class="row mb-3">
                          <div class="col-7 col-xs-4">
                            <span> Prime Points : </span>
                          </div>
                          <div class="col-5 col-xs-4 text-right">
                            <span class="mobile-payment-summery-amt">
                              {" "}
                              -&#x20B9; {primeDiscount}{" "}
                            </span>
                          </div>
                        </div>
                      ) : null}

                      <div class="row mb-3">
                        <div class="col-7 col-xs-4">
                          <span> Shipping Cost : </span>
                        </div>
                        <div class="col-5 col-xs-4 text-right">
                          <span class="shopping-payment-summery-amt">
                            {" "}
                            &#x20B9; {shippingCharges}{" "}
                          </span>
                        </div>
                      </div>
                      <div class="row mb-3">
                        <div class="col-7 col-xs-4">
                          <span> Total Discount : </span>
                        </div>
                        <div class="col-5 col-xs-4 text-right">
                          <span class="shopping-payment-summery-amt total-discount-text">
                            {" "}
                            &#x20B9;{" "}
                            {selectedDiscount == "shoppingPoint"
                              ? parseFloat(shoppingDiscount)
                              : parseFloat(primeDiscount)}{" "}
                          </span>
                        </div>
                      </div>

                      <div class="dropdown-divider"></div>
                      <div class="row mt-3">
                        <div class="col-7 col-xs-4">
                          <span> Total Amount : </span>
                        </div>
                        <div class="col-5 col-xs-4 text-right">
                          {selectedDiscount == "shoppingPoint" ? (
                            <span class="mobile-payment-summery-amt">
                              {" "}
                              &#x20B9;{" "}
                              {parseFloat(
                                getDouble(
                                  amount - shoppingDiscount + shippingCharges
                                )
                              ).toLocaleString()}
                            </span>
                          ) : (
                            <span class="mobile-payment-summery-amt">
                              {" "}
                              &#x20B9;{" "}
                              {getDouble(
                                amount - primeDiscount + shippingCharges
                              )}{" "}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    {amount > balance ? (
                      <div className="alert alert-danger d-block mt-4">
                        Wallet Balance less than the Amount.{" "}
                        <Link
                          to="/addMoney/options"
                          className="text-decoration-none text-primery"
                          style={{ textDecoration: "none" }}
                        >
                          Add Money
                        </Link>
                      </div>
                    ) : null}

                    <div class="col-md-12">
                      <div class="shopping-payment-confirm-btn">
                        {/* <button
                          onClick={!loading && clickConfirmPayment}
                          class="btn-primery"
                          id="ordersuccessmmodal"
                          data-toggle="modal"
                          data-target="#ordersuccess"
                          // disabled={amount>balance?true:false}
                        >
                          {loading ? <LoadingBar /> : "Confirm Payment"}
                        </button> */}
                        <ThemeButton onClick={clickConfirmPayment} loading={loading} value={"Confirm Payment"}/>
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
                  </div>

                  <div class="col-md-12 p-0">
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
            </div>

            {/* { <!-- shopping Payment confirmation end -->} */}
          </div>
        </div>
      </section>
    </div>
  );

  const modalContent = () => (
    <div>
      <div class="modal-content">
        <button
          onClick={handleClose}
          type="button"
          class="close order-confirm-success-modal-close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">
            {" "}
            <i class="fa-sharp fa-solid fa-xmark"></i>{" "}
          </span>
        </button>

        {/* {<!-- modal body start -->} */}

        <div class="order-confirm-success-modal-body">
          <div class="col-md-12">
            {/* { <!-- success animation start -->} */}
            <div class="order-confirm-seccess-box">
              <div class="order-confirm-success-inner success-animation">
                {/* { <!-- <img src="images/recharge-success.svg" class="img-fluid order-confirm-success-img" />  -->} */}

                {/* {<script src="pay-animations/success-animation.js"></script>
                              <lottie-player src="pay-animations/success-popup-animation.json" background="transparent"  speed="1" class="success" autoplay></lottie-player>} */}

                <img
                  src="/images/shopping/shopping-success.svg"
                  class="mb-4"
                ></img>

                <p class="order-confirm-success-msg">
                  {" "}
                  Your order has been received{" "}
                </p>
                <p class="order-confirm-success-text">
                  Thank you for your purchase!
                </p>

                <p>
                  You will receive an order confirmation email with details of
                  your order.
                </p>
              </div>
            </div>
          </div>

          <div class="order-confirm-success-btn">
            <Link type="button" to="/shopping" class="btn-primery">
              {" "}
              Continue Shopping{" "}
            </Link>
          </div>
        </div>

        {/* {<!-- modal body end -->} */}
      </div>
    </div>
  );

  const SuccessModal = () => (
    <div>
      <Modal
        show={showModal}
        onHide={handleClose}
        centered
        keyboard={false}
        className="modal fade order-confirm-success-modal"
        id="exampleModal"
        data-backdrop="false"
      >
        {modalContent()}
      </Modal>
    </div>
  );

  return (
    <div>
      {checkoutSection()}
      {SuccessModal()}
      <MuiSnackBar
              open={isSnackBar}
              setOpen={setIsSnackBar}
              successMsg={successMsg}
              errorMsg={errorMsg}
              setSuccess={setSuccessMsg}
              setError={setErrorMsg}
            />
    </div>
  );
};

export default ShoppingCheckout;

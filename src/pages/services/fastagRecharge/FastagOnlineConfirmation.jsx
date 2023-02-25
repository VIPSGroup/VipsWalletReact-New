import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getWalletBalance } from "../../../apiData/user/userDetails";
import { getServiceDiscounts } from "../../../apiData/services/core";
import { ThreeDots } from "react-loader-spinner";
import { fastagOnlineConfirmation } from "../../../apiData/services/fastag";

import {
  fastagServiceId,
  getRandomNumber,
  getTodayDate,
} from "../../../constants";
import { getDouble, googleAnalytics } from "../../../constants";
import ReactGA from "react-ga";
import { useSelector } from "react-redux";
ReactGA.initialize(googleAnalytics);

const FastagOnlineConfirmation = () => {
  const location = useLocation();
  const props = location.state;
  var amt = props.amount;
  var inputFields = props.inputFieldsData;
  const [balance, setBalance] = useState("");
  const [shoppingPoints, setShoppingPoints] = useState("");
  const [primePoints, setPrimePoints] = useState("");
  const [discountObj, setDiscountObj] = useState({});
  const [shoppingDiscount, setShoppingDiscount] = useState("");
  const [primeDiscount, setPrimeDiscount] = useState("");
  const [selectedDiscount, setSelectedDiscount] = useState("shoppingPoint");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("wallet");
  const [payuAmt, setPayuAmt] = useState("0");
  const [walletAmt, setWalletAmt] = useState("");
  const [finalAmount, setFinalAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [isSnackBar, setIsSnackBar] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  let navigate = useNavigate();
  const { loggedInUser } = useSelector(
    state => state.loginSlice.loggetInWithOTP
  );
  const handleClickConfirm = (e) => {
    e.preventDefault();

    setLoading(true);
    var dType = "";
    if (selectedDiscount == "shoppingPoint") {
      dType = "SHOPPING";
    } else if (selectedDiscount == "primePoint") {
      dType = "PRIME";
    }

    const paymentRefId = getRandomNumber();

    fastagOnlineConfirmation(
      loggedInUser.Mobile,
      loggedInUser.TRXNPassword,
      amt,
      inputFields,
      paymentRefId,
      props.billData.TransactionId,
      props.operatorId,
      props.number,
      dType
    ).then((response) => {
      setLoading(false);

      if (response.ResponseStatus === 1) {
        if (response.Data != null) {
          var data = response.Data;
          var time = getTodayDate();
          navigate("/services/success", {
            state: {
              amount: data.BillAmount,
              status: response.Status,
              mobileNo: inputFields[0].fieldValue,
              operator: props.operator,
              circle: "",
              date: time,
              transactionId: data.TransactionId,
            },
          });
        } else {
          setIsSnackBar(true);
          setErrorMsg(response.Data.ResponseMessage);
        }
      } else {
        setIsSnackBar(true);
        setErrorMsg(
          response.Data ? response.Data.ResponseMessage : response.Remarks
        );
      }
    });
  };

  const handlePaymentMethod = (e) => {
    if (balance < amt) {
      if (selectedPaymentMethod == "both" && e.target.value == "wallet") {
        setSelectedPaymentMethod("payu");
        setPayuAmt(amt);
        setWalletAmt(0);
      } else if (
        selectedPaymentMethod != "both" &&
        e.target.value == "wallet"
      ) {
        setSelectedPaymentMethod("both");
        setWalletAmt(balance);
        setPayuAmt(amt - balance);
      }
    } else {
      if (e.target.value == "wallet") {
        setSelectedPaymentMethod(e.target.value);
        setWalletAmt(amt);
        setPayuAmt(0);
      } else if (e.target.value == "payu") {
        setSelectedPaymentMethod(e.target.value);
        setPayuAmt(amt);
        setWalletAmt(0);
      }
    }
  };

  const manageInitialPaymentMethod = (balance) => {
    if (balance >= amt) {
      setSelectedPaymentMethod("wallet");
    } else if (balance < amt) {
      setSelectedPaymentMethod("both");
    }
  };

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
    setLoading(false);
    const userName = loggedInUser && loggedInUser.UserName;
    const password = loggedInUser && loggedInUser.TRXNPassword;
    let balanceVal = "";
    loggedInUser &&
      getWalletBalance({ userName, password }).then((response) => {
        setBalance(response.Data.Balance);
        balanceVal = response.Data.Balance;
        setShoppingPoints(response.Data.Shoppingpoints);
        setPrimePoints(response.Data.PrimePoints);

        manageInitialPaymentMethod(response.Data.Balance);

        getServiceDiscounts().then((res) => {
          var result = res.Data.filter((r) => r.Id == fastagServiceId);

          setDiscountObj(result[0]);
          const sDiscount = (result[0].ShoppingPer / 100) * amt;

          if (sDiscount <= response.Data.Shoppingpoints) {
            setShoppingDiscount(getDouble(sDiscount));
            const amt = parseInt(amt) - parseInt(sDiscount);

            setFinalAmount(amt);
          } else {
            setShoppingDiscount(response.Data.Shoppingpoints);
            setFinalAmount(amt - response.Data.Shoppingpoints);
          }
          const pDiscount = (result[0].PrimePointPer / 100) * amt;
          if (pDiscount <= response.Data.PrimePoints) {
            setPrimeDiscount(getDouble(pDiscount));
            setFinalAmount(amt - pDiscount);
          } else {
            setPrimeDiscount(response.Data.PrimePoints);
            setFinalAmount(amt - response.Data.PrimePoints);
          }
        });
      });
  }, []);

  const confirmSection = () => (
    <>
      <section class="section-align mobile-payment-confirmation">
        <div class="container">
          <div class="payment-head-outer">
            <div class="payment-head">
              {/* <Link class="" to="#">
              <img src="/images/VipsLogoMain.png" alt="VIPS Logo" class="img-fluid payment-head-logo" />
            </Link> */}
              <div class="go-back">
                <Link to="/services/fastag">
                  <i class="fa-solid fa-arrow-left"> </i>Go back{" "}
                </Link>
              </div>
            </div>
            <h1 class="payment-head-title">Payment Confirmation</h1>
          </div>

          {/* <div class="container">
            <div class="section-head">
              <h1 class="section-head-title">Payment Confirmation</h1>
            </div>
          </div> */}

          <div class="row">
            {/** <!-- Payment confirmation start -->*/}
            <div class="col-sm-12 col-md-12 col-lg-8">
              <div class="mobile-payment-left">
                <div class="mobile-payment-content">
                  <div class="mobile-payment-card shadow-light">
                    <div class="row">
                      <div class="col-md-12 mobile-payment-content-head">
                        <h3 class="mobile-payment-content-title">
                          {" "}
                          Order Summary{" "}
                        </h3>
                      </div>
                    </div>
                    <div class="mob-paymet-info-outer">
                      <div class="mob-paymet-recharge-info">
                        {props.billData.CustomerParamsDetails.map((b, i) => (
                          <p class="mob-paymet-recharge-text">
                            {b.Name} : <label>{b.Value} </label>{" "}
                          </p>
                        ))}
                        <p class="ml-auto"> {props.operator}</p>
                      </div>
                      <div class="mob-paymet-recharge-info">
                        <p class="mob-paymet-recharge-text">
                          Price : <label> &#x20B9; {amt} </label>{" "}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="mobile-payment-card shadow-light">
                    <div class="row">
                      <div class="col-md-12 mobile-payment-content-head">
                        <h3 class="mobile-payment-content-title">
                          {" "}
                          Get Discount with Recharge{" "}
                        </h3>
                      </div>
                    </div>
                    <div class="mob-paymet-info-outer">
                      <div class="mob-payment-discount">
                        <form>
                          <div class="mob-paymet-discount-info mb-4">
                            <label>
                              <input
                                onChange={(e) => {
                                  setSelectedDiscount(e.target.value);
                                  setFinalAmount(amt - shoppingDiscount);
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
                                  class="img-fluid mob-payment-discount-img"
                                />{" "}
                                Shopping Points ({shoppingPoints}){" "}
                              </span>
                            </label>
                            {/*<p class="mob-paymet-discount-amt ml-auto"> &#x20B9; {shoppingDiscount} </p>*/}
                          </div>

                          <div class="mob-paymet-discount-info">
                            <label>
                              <input
                                onChange={(e) => {
                                  setSelectedDiscount(e.target.value);
                                  setFinalAmount(amt - primeDiscount);
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
                                  class="img-fluid mob-payment-discount-img"
                                />{" "}
                                Prime Points ({primePoints}){" "}
                              </span>
                            </label>
                            {/** <p class="mob-paymet-Prime-amt ml-auto"> &#x20B9; {primeDiscount}</p> */}
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div class="mobile-payment-card shadow-light">
                    <div class="row">
                      <div class="col-md-12 mobile-payment-content-head">
                        <h3 class="mobile-payment-content-title">
                          {" "}
                          Debit From{" "}
                        </h3>
                      </div>
                    </div>
                    <div class="mob-paymet-info-outer">
                      <div class="mob-payment-discount">
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
                                    class="img-fluid payment-confirmation-debit-vips"
                                  />{" "}
                                  VIPS Wallet (₹ {balance})
                                </label>
                              </div>
                            </div>
                            <div class="col-lg-4 p-0">
                              <p class="mob-paymet-discount-amt ml-auto">
                                {" "}
                                &#x20B9; {amt}{" "}
                              </p>
                            </div>
                          </div>
                        </form>

                        {/* {selectedPaymentMethod=="both"?(
                                                <form>
                                            <div class="payment-confirmation-discount-info mb-4">
                                                <div class="col-lg-8 p-0">  
                                                    <div class="custom-control custom-checkbox ">
                                                    <input onChange={handlePaymentMethod} class="custom-control-input" id="vips-wallet" type="checkbox" name="radio-button" value="wallet" checked={selectedPaymentMethod=="wallet" || selectedPaymentMethod=="both" ?true:false} />
                                                        <label class="custom-control-label" for="vips-wallet"> 
                                                            <img src="/images/logos/vips-logo-small.png" class="img-fluid payment-confirmation-debit-vips" /> VIPS Wallet (₹ {balance})
                                                        </label>
                                                    </div> 
                                                </div>
                                                <div class="col-lg-4 p-0">
                                                <p class="mob-paymet-discount-amt ml-auto"> &#x20B9; {balance} </p>
                                                </div>
                                            </div>

                                            <div class="payment-confirmation-discount-info">
                                                <div class="col-lg-8 p-0"> 
                                                    <div class="custom-control custom-checkbox ">
                                                    <input onChange={handlePaymentMethod} class="custom-control-input" id="payu-card" type="checkbox" name="radio-button" value="payu" checked={selectedPaymentMethod=="payu" || selectedPaymentMethod=="both" ?true:false} />
                                                     <label class="custom-control-label" for="payu-card"> 
                                                            <img src="/images/logos/payu-logo.png" class="img-fluid payment-confirmation-debit-payu" /> Payu (card / UPI)
                                                        </label>
                                                    </div> 
                                                </div>
                                                <div class="col-lg-4 p-0">
                                                <p class="mob-paymet-Prime-amt ml-auto"> &#x20B9; {amt-balance}</p>
                                                </div>
                                            </div> 

                                        </form>
                                            ):null}

                                            {selectedPaymentMethod=="wallet"?(
                                                <form>
                                            <div class="payment-confirmation-discount-info mb-4">
                                                <div class="col-lg-8 p-0">  
                                                    <div class="custom-control custom-checkbox ">
                                                    <input onChange={handlePaymentMethod}  class="custom-control-input" id="vips-wallet" type="checkbox" name="radio-button" value="wallet" checked={selectedPaymentMethod=="wallet" || selectedPaymentMethod=="both" ?true:false} />
                                                        <label class="custom-control-label" for="vips-wallet"> 
                                                            <img src="/images/logos/vips-logo-small.png" class="img-fluid payment-confirmation-debit-vips" /> VIPS Wallet (₹ {balance})
                                                        </label>
                                                    </div> 
                                                </div>
                                                <div class="col-lg-4 p-0">
                                                <p class="mob-paymet-discount-amt ml-auto"> &#x20B9; {amt} </p>
                                                </div>
                                            </div>

                                            <div class="payment-confirmation-discount-info">
                                                <div class="col-lg-8 p-0"> 
                                                    <div class="custom-control custom-checkbox ">
                                                    <input onChange={handlePaymentMethod}  class="custom-control-input" id="payu-card" type="checkbox" name="radio-button" value="payu" checked={selectedPaymentMethod=="payu" || selectedPaymentMethod=="both" ?true:false} />  
                                                     <label class="custom-control-label" for="payu-card"> 
                                                            <img src="/images/logos/payu-logo.png" class="img-fluid payment-confirmation-debit-payu" /> Payu (card / UPI)
                                                        </label>
                                                    </div> 
                                                </div>
                                                <div class="col-lg-4 p-0">
                                                <p class="mob-paymet-Prime-amt ml-auto"> &#x20B9; 0.0</p>
                                                </div>
                                            </div> 

                                        </form>
                                            ):null}




                                        {selectedPaymentMethod=="payu"?(
                                                <form>
                                            <div class="payment-confirmation-discount-info mb-4">
                                                <div class="col-lg-8 p-0">  
                                                    <div class="custom-control custom-checkbox ">
                                                    <input onChange={handlePaymentMethod}  class="custom-control-input" id="vips-wallet" type="checkbox" name="radio-button" value="wallet" checked={selectedPaymentMethod=="wallet" || selectedPaymentMethod=="both" ?true:false} />
                                                        <label class="custom-control-label" for="vips-wallet"> 
                                                            <img src="/images/logos/vips-logo-small.png" class="img-fluid payment-confirmation-debit-vips" /> VIPS Wallet (₹ {balance})
                                                        </label>
                                                    </div> 
                                                </div>
                                                <div class="col-lg-4 p-0">
                                                <p class="mob-paymet-discount-amt ml-auto"> &#x20B9; 0.0 </p>
                                                </div>
                                            </div>

                                            <div class="payment-confirmation-discount-info">
                                                <div class="col-lg-8 p-0"> 
                                                    <div class="custom-control custom-checkbox ">
                                                    <input onChange={handlePaymentMethod} class="custom-control-input" id="payu-card" type="checkbox" name="radio-button" value="payu" checked={selectedPaymentMethod=="payu" || selectedPaymentMethod=="both" ?true:false} />
                                                     <label class="custom-control-label" for="payu-card"> 
                                                            <img src="/images/logos/payu-logo.png" class="img-fluid payment-confirmation-debit-payu" /> Payu (card / UPI)
                                                        </label>
                                                    </div> 
                                                </div>
                                                <div class="col-lg-4 p-0">
                                                <p class="mob-paymet-Prime-amt ml-auto"> &#x20B9; {amt}</p>
                                                </div>
                                            </div> 

                                        </form>
                                            ):null} */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-sm-12 col-md-12 col-lg-4">
              <div class="mobile-payment-right">
                <div class="mobile-payment-right-sticky box-shadow-1">
                  <div class="row">
                    <div class="col-md-12 mobile-payment-content-head">
                      <h3 class="mobile-payment-content-title">
                        {" "}
                        Order Summary{" "}
                      </h3>
                    </div>
                  </div>

                  <div class="col-md-12 p-0">
                    <div class="mobile-payment-summery">
                      <div class="row mb-3">
                        <div class="col-8 col-xs-4">
                          <span> Amount : </span>
                        </div>
                        <div class="col-4 col-xs-4 text-right">
                          <span class="mobile-payment-summery-amt">
                            {" "}
                            &#x20B9; {amt}{" "}
                          </span>
                        </div>
                      </div>

                      {selectedDiscount == "shoppingPoint" ? (
                        <div class="row mb-3">
                          <div class="col-8 col-xs-4">
                            <span>
                              {" "}
                              Shopping Points ({discountObj.ShoppingPer} %) :{" "}
                            </span>
                          </div>
                          <div class="col-4 col-xs-4 text-right">
                            <span class="mobile-payment-summery-amt">
                              {" "}
                              -&#x20B9; {shoppingDiscount}{" "}
                            </span>
                          </div>
                        </div>
                      ) : null}

                      {selectedDiscount == "primePoint" ? (
                        <div class="row mb-3">
                          <div class="col-8 col-xs-4">
                            <span>
                              {" "}
                              Prime Points ({discountObj.PrimePointPer} %) :{" "}
                            </span>
                          </div>
                          <div class="col-4 col-xs-4 text-right">
                            <span class="mobile-payment-summery-amt">
                              {" "}
                              -&#x20B9; {primeDiscount}{" "}
                            </span>
                          </div>
                        </div>
                      ) : null}

                      <div class="dropdown-divider"></div>

                      <div class="row mt-3">
                        <div class="col-8 col-xs-4">
                          <span> Total Amount : </span>
                        </div>
                        <div class="col-4 col-xs-4 text-right">
                          {selectedDiscount == "shoppingPoint" ? (
                            <span class="mobile-payment-summery-amt">
                              {" "}
                              &#x20B9; {amt - shoppingDiscount}{" "}
                            </span>
                          ) : (
                            <span class="mobile-payment-summery-amt">
                              {" "}
                              &#x20B9; {amt - primeDiscount}{" "}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div class="col-md-12">
                      <div class="mobile-payment-confirm-btn">
                        <button
                          onClick={!loading && handleClickConfirm}
                          type="button"
                          class="btn-primery"
                        >
                          {loading ? (
                            <div className="d-inline-block mx-auto p-2">
                              <ThreeDots
                                height="20"
                                width="40"
                                radius="7"
                                color="#fff"
                                ariaLabel="three-dots-loading"
                                wrapperStyle={{}}
                                wrapperClassName=""
                                visible={true}
                              />
                            </div>
                          ) : (
                            "Confirm Payment"
                          )}{" "}
                        </button>
                      </div>
                      {showError()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <MuiSnackBar
              open={isSnackBar}
              setOpen={setIsSnackBar}
              successMsg={successMsg}
              errorMsg={errorMsg}
              setSuccess={setSuccessMsg}
              setError={setErrorMsg}
            /> */}
          </div>
        </div>
      </section>
    </>
  );

  const showError = () => (
    <div className="mt-3">
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
  return (
    <div className="color-body">{confirmSection()}</div>
  )
}

export default FastagOnlineConfirmation
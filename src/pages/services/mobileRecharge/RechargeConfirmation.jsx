import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

import "../../../assets/styles/services/mobileRecharge/recharge.css";
import "../../../assets/styles/prime/primeConfirmation.css";
import { mobileServiceId } from "../../../constants";

import { postpaidServiceId } from "../../../constants";
import { googleAnalytics } from "../../../constants";
import ReactGA from "react-ga";
import { useDispatch, useSelector } from "react-redux";
import {finalRecharge, getServiceDiscounts} from "../../../redux/slices/services/commonSlice";
import { MuiSnackBar, ThemeButton } from "../../../components/common";
import { getWalletBalance } from "../../../redux/slices/payment/walletSlice";

ReactGA.initialize(googleAnalytics);

const RechargeConfirmation = ({ setIsCommonTopNav }) => {
  const { loggedInUser } = useSelector(
    (state) => state.loginSlice.loggetInWithOTP
  );
  const location = useLocation();
  const props = location.state;
  var amt = "";
  if (props?.plan) {
    amt = props?.plan.rs || props?.plan.amount;
  } else {
    amt = props?.amount;
  }
  const [selectedDiscount, setSelectedDiscount] = useState("SHOPPING");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("wallet");
  const [payuAmt, setPayuAmt] = useState("0");
  // const [walletAmt, setWalletAmt] = useState("");
  // const [finalAmount, setFinalAmount] = useState("");
  // const [loading, setLoading] = useState(false);
  const [isSnackBar, setIsSnackBar] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [serviceId, setServiceId] = useState("");

  const [showSuccess, setShowSuccess] = useState(false);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.walletSlice.walletBalance);
  const { discount } = useSelector((state) => state.commonSlice.serviceDiscount);
  const { rechargeData ,loading} = useSelector((state) => state.commonSlice.finalRecharge);
  const handleClickConfirm = (e) => {
    setShowSuccess(true);
    e.preventDefault();
    dispatch(
      finalRecharge({
        rechargeType: "Mobile",
        userName: loggedInUser.UserName,
        password: loggedInUser.TRXNPassword,
        amount: amt,
        number: props?.number,
        operatorId: props?.operatorId,
        circleId: props?.circleId,
        pointType: selectedDiscount,
        operator: props?.operator,
        circle: props?.circle,
      })
    );
  };
  useEffect(() => {
    setIsCommonTopNav(false);
    ReactGA.pageview(window.location.pathname);
    const username = loggedInUser && loggedInUser.UserName;
    const password = loggedInUser && loggedInUser.TRXNPassword;
    if (loggedInUser) {
      if (data?.Data?.length !== 0 || !data) {
        dispatch(getWalletBalance({ username, password }));
      }
    };
    return () => {
      setShowSuccess(false);
      setIsCommonTopNav(true)
    };
  }, []);
  useEffect(() => {
    if (data.Data) {
      manageInitialPaymentMethod(data?.Data?.Balance);
      const serviceId =
        props?.circleId === 0 ? postpaidServiceId : mobileServiceId;
      setServiceId(serviceId);
      dispatch(getServiceDiscounts({ amt, discountType: selectedDiscount }));
    }
    if (rechargeData && showSuccess) {
      if (rechargeData.ResponseStatus == 1) {
        const resp = rechargeData.Data;

        const str = resp && resp.split(";");
        const status = str[0].split("=")[1];

        const amount = str[3].split("=")[1] || amt;
        const mobileNumber = str[2].split("=")[1];
        const time = str[1].split("=")[1] || "--";
        const txId = str.length > 6 ? str[6].split("=")[1] : "--";

        navigate("/services/status", {
          state: {
            amount: amount,
            status: status,
            mobileNo: props?.number,
            operator: props?.operator,
            circle: props?.circle,
            date: time,
            transactionId: txId,
            type: "Mobile",
          },
        });

        if (rechargeData.Status.includes("Failure")) {
          navigate("/services/status", {
            state: {
              amount: props?.amount,
              status: "Failure",
              mobileNo: props?.number,
              operator: props?.operator,
              circle: props?.circle,
              date: "--",
              transactionId: "--",
              type: "Mobile",
            },
          });
        }
      } else if (rechargeData.ResponseCode== 0 || rechargeData.ResponseStatus == 0) {
        setIsSnackBar(true);
        setErrorMsg(rechargeData.Remarks);
      }
    }
  }, [data.Data, selectedDiscount, rechargeData]);

  const handlePaymentMethod = (e) => {
    if (data?.Data?.Balance < amt) {
      if (selectedPaymentMethod == "both" && e.target.value == "wallet") {
        setSelectedPaymentMethod("payu");
        setPayuAmt(amt);
        // setWalletAmt(0);
      } else if (
        selectedPaymentMethod != "both" &&
        e.target.value == "wallet"
      ) {
        setSelectedPaymentMethod("both");
        // setWalletAmt(data.Data.Balance);
        setPayuAmt(amt - data?.Data?.Balance);
      }
    } else {
      if (e.target.value == "wallet") {
        setSelectedPaymentMethod(e.target.value);
        // setWalletAmt(amt);
        setPayuAmt(0);
      } else if (e.target.value == "payu") {
        setSelectedPaymentMethod(e.target.value);
        setPayuAmt(amt);
        // setWalletAmt(0);
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
  const confirmSection = () => (
    <div>
      <section class="section-align mobile-payment-confirmation">
        <div class="container">
          <div class="payment-head-outer">
            <div class="payment-head">
              <div class="go-back">
                <Link to="/services/mobileRecharge" onClick={()=>{location.state=null}}>
                  <i class="fa-solid fa-arrow-left"> </i>Go back{" "}
                </Link>
              </div>
            </div>
            <h1 class="payment-head-title">Payment Confirmation</h1>
          </div>
          <div class="row">
            {/** <!-- Payment confirmation start -->*/}
            <div class="col-sm-12 col-md-12 col-lg-8">
              <div class="mobile-payment-left">
                <div class="mobile-payment-content">
                  <div class="mobile-payment-card box-shadow-1">
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
                        <p class="paymet-recharge-mobno">
                          {" "}
                          +91 {props?.number}{" "}
                        </p>
                        <p class="mob-paymet-recharge-operator">
                          {" "}
                          {props?.operator} | {props?.circle}{" "}
                        </p>
                      </div>
                      <div class="mob-paymet-recharge-info">
                        <p class="mob-paymet-recharge-text">
                          Amount : <label> &#x20B9; {amt} </label>{" "}
                        </p>
                        <p class="mob-paymet-recharge-text ml-auto ">
                          Validity :{" "}
                          <label> {props?.plan && props?.plan.validity} </label>{" "}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="mobile-payment-card box-shadow-1">
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
                            <div className="col-lg-12 p-0">
                              <label>
                                <input
                                  onChange={(e) => {
                                    setSelectedDiscount(e.target.value);
                                  }}
                                  type="radio"
                                  name="radio-button"
                                  value="SHOPPING"
                                  checked={
                                    selectedDiscount == "SHOPPING"
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
                                  Shopping Points ({data?.Data?.Shoppingpoints}){" "}
                                </span>
                              </label>
                            </div>

                            {/* <p class="mob-paymet-discount-amt ml-auto"> &#x20B9; {discount?.shoppingDiscount} </p> */}
                          </div>

                          <div class="mob-paymet-discount-info">
                            <div className="col-lg-12 p-0">
                              <label>
                                <input
                                  onChange={(e) => {
                                    setSelectedDiscount(e.target.value);
                                    // setFinalAmount(amt - primeDiscount);
                                  }}
                                  type="radio"
                                  name="radio-button"
                                  value="PRIME"
                                  checked={
                                    selectedDiscount == "PRIME" ? true : false
                                  }
                                />
                                <span>
                                  {" "}
                                  <img
                                    src="/images/services/mob-payment-discount.png"
                                    class="img-fluid mob-payment-discount-img"
                                  />{" "}
                                  Prime Points ({data?.Data?.PrimePoints}){" "}
                                </span>
                              </label>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div class="mobile-payment-card box-shadow-1">
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
                                  VIPS Wallet (₹ {data?.Data?.Balance})
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

                      {selectedDiscount === "SHOPPING" ? (
                        <div class="row mb-3">
                          <div class="col-8 col-xs-4">
                            <span>
                              {" "}
                              Shopping Points (
                              {discount?.discountData?.ShoppingPer} %) :{" "}
                            </span>
                          </div>
                          <div class="col-4 col-xs-4 text-right">
                            <span class="mobile-payment-summery-amt">
                              {" "}
                              -&#x20B9; {discount?.shoppingDiscount}{" "}
                            </span>
                          </div>
                        </div>
                      ) : null}
                      {selectedDiscount === "PRIME" ? (
                        <div class="row mb-3">
                          <div class="col-8 col-xs-4">
                            <span>
                              {" "}
                              Prime Points (
                              {discount?.discountData?.PrimePointPer} %) :{" "}
                            </span>
                          </div>
                          <div class="col-4 col-xs-4 text-right">
                            <span class="mobile-payment-summery-amt">
                              {" "}
                              -&#x20B9; {discount.primePointDiscount}{" "}
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
                          <span class="mobile-payment-summery-amt">
                            {" "}
                            &#x20B9; {discount?.finalAmount}{" "}
                          </span>
                        </div>
                      </div>
                    </div>
                    {amt > data?.Data?.Balance ? (
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
                      <div class="mobile-payment-confirm-btn">
                        {/* <button
                          onClick={ handleClickConfirm}
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
                        </button> */}
                        <ThemeButton loading={loading} onClick={handleClickConfirm} value={"Confirm Payment"}/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
    </div>
  );
  return <div className="color-body">{confirmSection()}</div>;
};

export default RechargeConfirmation;

import React, { useState, useEffect } from "react";

import OTPInput, { ResendOTP } from "otp-input-react";
import { ThreeDots } from "react-loader-spinner";
import Modal from "react-bootstrap/Modal";

import { getReceiverDetail, validateReference } from "../../apiData/authentication/signup";

import "../../assets/styles/addMoney/addMoney.css";
import "../../assets/styles/styles.css";

import { MdArrowBack } from "react-icons/md";
import ReactGA from "react-ga";
import { googleAnalytics } from "../../constants";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingBar from "../../components/common/Loading";
import {
  sendMoney,
  sendMoneyOtp,
} from "../../redux/slices/payment/walletSlice";
import { MuiSnackBar, ThemeButton } from "../../components/common";
ReactGA.initialize(googleAnalytics);

const SendMoney = () => {
  const [recieverNo, setRecieverNo] = useState('');
  const [show, setShow] = useState(false);
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState("");
  const [formCount, setFormCount] = useState(1);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [referName, setReferName] = useState("");

  const [isSnackBar, setIsSnackBar] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSuccessClose = () => {
    setShow(false);
    setOtp("");
    setOtpError("");
    setReferName("");
    setRecieverNo("");
    setAmount("");
    setFormCount(1);
  };

  const handleClose = () => {
    setShow(false);
    setOtp("");
    setOtpError("");
  };
  const { loggedInUser } = useSelector(
    (state) => state.loginSlice.loggetInWithOTP
  );
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);

  const handleShow = () => setShow(true);

  const renderButton2 = (buttonProps) => {
    return (
      <div className="resendotp col-12 mx-auto pt-3">
        <p {...buttonProps} className="col-12 d-block">
          {buttonProps.remainingTime !== 0 ? (
            <p>
              {" "}
              Please wait for{" "}
              <span style={{ color: "#CA3060" }}>
                {" "}
                {`${buttonProps.remainingTime} sec`}
              </span>
            </p>
          ) : (
            <p>
              Dont Receive the OTP ?{" "}
              <Link>
                {" "}
                <span style={{ color: "#CA3060" }}>Resend OTP</span>
              </Link>
            </p>
          )}
        </p>
      </div>
    );
  };
  const renderTime2 = () => React.Fragment;

  const handleRecieverNo = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setError("");
    if (e.target.value.length === 10) {
      getReceiverDetail({password:loggedInUser.TRXNPassword, username:loggedInUser.UserName,currentUsername:value}).then(response=>{
        if (response.ResponseStatus == 1) {
              setReferName(response.Data[0].FName+" "+response.Data[0].LName);
            } else if (response.ResponseStatus == 0) {
              setError(response.Remarks);
            }
      })
    } else if (e.target.value.length != 10 && e.target.value.length > 0) {
      setReferName("");
      setError("It should be 10 digit valid Mobile No.");
    }
    setRecieverNo(value);
    setFormCount(1);
  };
  const handleAmount = (e) => {
    setFormCount(1);
    const re = /^[0-9\b]+$/;

    if (e.target.value === "" || re.test(e.target.value)) {
      setAmount(e.target.value);
    }
    setError("");
  };

  const handleOtp = (e) => {
    setOtp(e.target.value);
  };

  const clickSendOtp = (e) => {
    e.preventDefault();
    setLoading(true);
    if (recieverNo.length == 10) {
      if (referName) {
        if (amount) {
          sendMoneyOtp(
            loggedInUser.Mobile,
            loggedInUser.TRXNPassword,
            recieverNo,
            amount
          ).then((response) => {
            if (response.ResponseStatus == 2) {
              setFormCount(2);
              handleShow();
              setLoading(false);
            } else {
              setError(response.Remarks);
              setLoading(false);
            }
          });
        } else {
          setError("Enter Valid Amount");
          setLoading(false);
        }
      } else {
        setError("Entered Number is not registred with VIPS Wallet");
        setLoading(false);
      }
    } else {
      setError("Enter valid 10 digit no.");
      setLoading(false);
    }
  };

  const clickSendMoney = (e) => {
    e.preventDefault();
    setLoading(true);
    sendMoney(
      loggedInUser.Mobile,
      loggedInUser.TRXNPassword,
      recieverNo,
      amount,
      otp
    ).then((response) => {
      if (response.ResponseStatus == 1) {
        setLoading(false);
        setIsSnackBar(true);
        setSuccessMessage(response.Remarks);
        handleSuccessClose();
      } else {
        setOtpError(response.Remarks);
        setLoading(false);
      }
    });
  };

  const displayError = () => (
    <div class="">
      {error && (
        <div className="alert alert-danger col-xl-5 col-lg-6 col-md-8 col-sm-12 mx-auto">
          {error}
        </div>
      )}
    </div>
  );

  const displayOtpError = () => (
    <div>
      {otpError && <div className="alert alert-danger">{otpError}</div>}
    </div>
  );

  const otpForm = () => (
    <>
      <section class="loginPage mbTopSpace">
        <div class="row ">
          <div class="col-12 col-lg-12 align-self-center">
            <div class="otpForm-outer">
              <div class="row">
                <div class="col-lg-12">
                  <div class="otp-titleMain formText text-center">
                    {/* {<img src="/images/VipsLogoMain.png" alt="VIPS Logo" />} */}
                    {/* {<h2>OTP Verification</h2>} */}
                    {displayOtpError()}
                    <div class="otp-send-to">
                      <p>
                        Enter the OTP sent to
                        <label for=""> &nbsp; +91 {loggedInUser.Mobile}</label>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* { <div>{displayLoginError()}</div>} */}

              <div className="formStyle">
                <form>
                  <div className="row">
                    <div className="col-lg-12  mx-auto p-0">
                      <div className="otpform-in">
                        <div
                          id="otp"
                          className="row row-flex justify-content-center mt-1"
                        >
                          <OTPInput
                            className="text-dark"
                            value={otp}
                            onChange={setOtp}
                            autoFocus
                            OTPLength={6}
                            otpType="number"
                            disabled={false}
                          />

                          <ResendOTP
                            renderButton={renderButton2}
                            renderTime={renderTime2}
                          />
                          <div class="col-lg-12">
                            <div class="otp-btnCol btnTopSpace">
                              <button
                                type="button"
                                class="btn otp-btn"
                                disabled={otp.length == 6 ? false : true}
                                onClick={!loading && clickSendMoney}
                              >
                                {loading ? (
                                  <LoadingBar />
                                ) : (
                                  "Verify & Send Money"
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );

  const sendMoneyUI = () => (
    <>
      <section class="inpage-section-align inset-shadow-top-light addmoney ">
        <div class="container">
          <div class="container">
            <div class="section-head">
              <h1 class="section-head-title">Send Money</h1>
            </div>
          </div>

          {displayError()}
          <div class="container">
            <div class="row">
              <div class="col-xl-5 col-lg-6 col-md-8 col-sm-12 send-money-outer box-shadow-1 border-0 mx-auto">
                <div class="send-money-card">
                  <div class="send-money-body">
                    <form class="send-money-amt">
                      <label>Enter Receivers Username </label>
                      <div class="form-group input-group">
                        <span class="input-group-prepend">
                          <div class="input-group-text">+91</div>
                        </span>
                        <input
                          onChange={handleRecieverNo}
                          value={recieverNo}
                          type="tel"
                          autocomplete="on"
                          autofocus="true"
                          maxLength={10}
                          minLength={10}
                        />
                      </div>
                      {referName && (
                        <div
                          className="text-left mb-3"
                          style={{ color: "#CA3060" }}
                        >
                          {referName}
                        </div>
                      )}

                      <label>Enter Amount</label>
                      <div class="form-group input-group">
                        <span class="input-group-prepend">
                          <div class="input-group-text">&#x20B9;</div>
                        </span>
                        <input
                          className="input-amt"
                          onChange={handleAmount}
                          value={amount > 0 ? amount : ""}
                          type="text"
                          autocomplete="off"
                          minLength={1}
                          maxLength={10}
                        />
                      </div>
                    </form>
                  </div>

                  {formCount == 2 ? (
                    <Modal
                      show={show}
                      onHide={handleClose}
                      centered
                      keyboard={false}
                      className="modal fade add-money-modal"
                      id="exampleModal"
                      backdrop="static"
                      data-backdrop="false"
                    >
                      <button
                        onClick={handleClose}
                        type="button"
                        class="close login-close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>

                      {otpForm()}
                    </Modal>
                  ) : null}

                  <div class="send-money-body">
                    <div class="col-md-12">
                      <div class="send-money-btn">
                        <ThemeButton onClick={clickSendOtp} value={"Continue"} loading={loading}/>
                        {/* <button
                          type="button"
                          onClick={!loading && clickSendOtp}
                          href="#"
                          class="btn-primery"
                        >
                          {" "}
                          {loading ? <LoadingBar /> : "Continue"}{" "}
                        </button> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <MuiSnackBar
            open={isSnackBar}
            setOpen={setIsSnackBar}
            successMsg={successMessage}
            errorMsg={errorMsg}
          />
        </div>
      </section>
    </>
  );

  return (
    <div className="color-body">
      {sendMoneyUI()}
      {/* <Footer /> */}
    </div>
  );
};

export default SendMoney;

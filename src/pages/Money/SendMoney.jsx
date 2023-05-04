import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";

import {
  getReceiverDetail,
} from "../../apiData/authentication/signup";

import "../../assets/styles/addMoney/addMoney.css";
import "../../assets/styles/styles.css";
import ReactGA from "react-ga";
import { googleAnalytics } from "../../constants";
import { useSelector } from "react-redux";
import {
  sendMoney,
  sendMoneyOtp,
} from "../../redux/slices/payment/walletSlice";
import { MuiSnackBar, ThemeButton } from "../../components/common";
import Otp from "../../components/forms/Otp";
import { Link } from "react-router-dom";
ReactGA.initialize(googleAnalytics);

const SendMoney = () => {
  const [recieverNo, setRecieverNo] = useState("");
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
  const resendOtp = (e) => {
    e.preventDefault();
    setLoading(true);
    setOtpError("");
    setOtp("");
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
  };
  const { loggedInUser } = useSelector(
    (state) => state.loginSlice.loggetInWithOTP
  );
  const { data } = useSelector((state) => state.walletSlice.walletBalance);
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
    console.log(data);
  }, []);

  const handleShow = () => setShow(true);

  const handleRecieverNo = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setError("");
    if (e.target.value.length === 10) {
      getReceiverDetail({
        password: loggedInUser.TRXNPassword,
        username: loggedInUser.UserName,
        currentUsername: value,
      }).then((response) => {
        if (response.ResponseStatus == 1) {
          setReferName(response.Data[0].FName + " " + response.Data[0].LName);
        } else if (response.ResponseStatus == 0) {
          setError(response.Remarks);
        }
      });
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
        setIsSnackBar(true);
        setErrorMsg(response.Remarks);
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
                      <Otp
                        otp={otp}
                        setOtp={setOtp}
                        mobileno={loggedInUser.Mobile}
                        onArrowBack={handleClose}
                        handleClick={clickSendMoney}
                        loading={loading}
                        resendOtp={resendOtp}
                        setFormCount={setFormCount}
                      />
                    </Modal>
                  ) : null}

                  <div class="send-money-body">
                    <div class="col-md-12">
                      <div class="send-money-btn">
                        <ThemeButton
                          onClick={clickSendOtp}
                          value={"Continue"}
                          loading={loading}
                        />
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

  return <div className="color-body">{sendMoneyUI()}</div>;
};

export default SendMoney;

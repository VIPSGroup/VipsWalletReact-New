import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import OTPInput, { ResendOTP } from "otp-input-react";
import "../../assets/styles/styles.css";
import "../../assets/styles/addMoney/addMoney.css";

import { MdArrowBack } from "react-icons/md";

import { useSelector } from "react-redux";
import LoadingBar from "../common/Loading";
import {
  finstockAdd,
  finstockGenerateOtp,
} from "../../redux/slices/payment/paymentSlice";
import { ThemeButton } from "../common";

const FinstockModal = ({ setSnackbarShow, setSuccessMsg }) => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [coins, setCoins] = useState("");
  const [otp, setOtp] = useState("");
  const [taxId, setTaxId] = useState("");
  const [formCount, setFormCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [successRemark, setSuccessRemark] = useState("");
  const { loggedInUser } = useSelector(
    (state) => state.loginSlice.loggetInWithOTP
  );
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
    setEmail("");
    setCoins("");
    setError("");
    setEmailError("");
    setOtpError("");
    setFormCount(1);
    setOtp("");
  };

  const clickGetOtp = (e) => {
    e.preventDefault();
    setLoading(true);

    if (coins >= 50) {
      finstockGenerateOtp(
        loggedInUser.Mobile,
        loggedInUser.TRXNPassword,
        email,
        coins
      ).then((response) => {
        if (response.ResponseStatus == 1) {
          setFormCount(2);
          setLoading(false);
          setError("");
          setTaxId(response.Data.vipstxid);
        } else {
          setError(response.Remarks);
          setLoading(false);
        }
      });
    } else {
      setLoading(false);
      setError("Minimum 50 VIPS Token required.");
    }
  };

  const clickAdd = (e) => {
    e.preventDefault();
    setLoading(true);
    finstockAdd(
      loggedInUser.Mobile,
      loggedInUser.TRXNPassword,
      email,
      coins,
      otp,
      taxId
    ).then((response) => {
      if (response.ResponseStatus == 1) {
        setLoading(false);
        setSnackbarShow(true);
        setSuccessMsg(response.Remarks);
        handleClose();
      } else {
        setOtpError(response.Remarks);
        setLoading(false);
      }
    });
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setFormCount(1);

    e.target.value
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
      ? setEmailError("")
      : setEmailError("Enter Valid Email Id");
  };

  const handleCoin = (e) => {
    setFormCount(1);
    const re = /^[0-9\b]+$/;

    if (e.target.value === "" || re.test(e.target.value)) {
      setCoins(e.target.value);
    }
    setError("");
  };

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
              Not received OTP?{" "}
              <a>
                <span style={{ color: "#CA3060" }}>Resend OTP</span>
              </a>
            </p>
          )}
        </p>
      </div>
    );
  };
  const renderTime2 = () => React.Fragment;

  const displayError = () => {
    if (emailError) {
      return errorDiv(emailError);
    } else if (error) {
      return errorDiv(error);
    } else if (otpError) {
      return errorDiv(otpError);
    }
  };

  const errorDiv = (message) => (
    <div>
      <div className="alert alert-danger">{message}</div>
    </div>
  );

  const displaySuccess = () => (
    <div>
      {success && <div className="alert alert-info">{successRemark}</div>}
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
                  <div class="col-lg-12">
                    <div class="titleMain formText text-center">
                      <img
                        src="/images/logos/vips-tokan-logo.png"
                        alt="VIPS Logo"
                      />
                      <h2>VIPS Token</h2>
                    </div>

                    {displayError()}
                    {displaySuccess()}
                    <div class="otp-send-to">
                      <p>
                        Enter the OTP sent to
                        <label for=""> &nbsp; {email}</label>
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
                                onClick={!loading && clickAdd}
                              >
                                {loading ? (
                                  <LoadingBar />
                                ) : (
                                  "Verify & Add Money"
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

  const ModalContent = () => (
    <>
      <section class="loginPage mbTopSpace">
        <div class="align-self-center">
          <div class="add-money-modal-form">
            <div class="row">
              <div class="col-lg-12">
                <div class="titleMain formText text-center">
                  <img
                    src="/images/logos/vips-tokan-logo.png"
                    alt="VIPS Logo"
                  />
                  <h2>VIPS Token</h2>
                </div>
              </div>
            </div>
            {displayError()}
            {displaySuccess()}
            <div class="formStyle">
              <form class="addmoney-popup-form">
                <div class="input-field">
                  <input
                    onChange={handleEmail}
                    value={email}
                    id="email"
                    type="email"
                    placeholder="&nbsp;"
                    autocomplete="off"
                  />
                  <label for="email">Enter Email ID</label>
                </div>

                <div class="input-field">
                  <input
                    onChange={handleCoin}
                    value={coins > 0 ? coins : ""}
                    id="vips-tokan"
                    type="text"
                    placeholder="&nbsp;"
                    autocomplete="off"
                    minLength={1}
                    maxLength={7}
                  />
                  <label for="vips-tokan">VIPS Token</label>
                </div>

                <div class="limit-note">
                  <a href="#">
                    Note: The minimum withdrawal limit is 50 VIPS Tokens.
                  </a>
                </div>

                <div class="col-lg-12">
                  {formCount == 1 ? (
                    <div class="add-money-btn mt-4">
                      {/* {<button onClick={clickGetOtp} href="#" class="btn-primery "> Get OTP </button>} */}
                      {/* <button
                        type="button"
                        class="btn btn-primery "
                        onClick={!loading && clickGetOtp}
                      >
                        {loading ? <LoadingBar /> : "Get OTP"}
                      </button> */}
                      <ThemeButton value={"Get OTP"} loading={loading} onClick={clickGetOtp}/>
                    </div>
                  ) : null}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );

  return (
    <>
      <div class="add-money-btn">
        {/* <a
          onClick={handleShow}
          type="button"
          class="btn-primery"
          style={{ textDecoration: "none" }}
        >
          {" "}
          Add Money{" "}
        </a> */}
        <ThemeButton onClick={handleShow} value={"Add Money"}/>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        centered
        keyboard={false}
        className="modal fade add-money-modal"
        id="exampleModal"
        data-backdrop="false"
      >
        {formCount == 1 ? (
          <button
            onClick={handleClose}
            type="button"
            class="close add-money-modal-close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
            {/* <IoCloseOutline/> */}
          </button>
        ) : (
          <button
            className="close add-money-modal-close mt-3"
            onClick={() => {
              setFormCount(1);
              setOtpError("");
              setSuccessRemark("");
              setOtp("");
            }}
          >
            <MdArrowBack />
          </button>
        )}
        {formCount == 1 ? ModalContent() : otpForm()}
      </Modal>
    </>
  );
};

export default FinstockModal;

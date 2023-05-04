import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OTPInput, { ResendOTP } from "otp-input-react";
import { MuiSnackBar, ThemeButton } from "../common";
import { MdArrowBack } from "react-icons/md";

const Otp = ({
  mobileno,
  otp,
  setOtp,
  setFormCount,
  handleClick,
  resendOtp,
  loading,
  onArrowBack,
  isLogin = false,
}) => {
  const [isSnackBar, setIsSnackBar] = useState(false);
  const [showSuccessMessage, setsuccessMessage] = useState("");
  const [showErrorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { loggedInUser, toggle } = useSelector(
    (state) => state.loginSlice.loggetInWithOTP
  );
  useEffect(() => {
    if (loggedInUser === false && toggle) {
      if (!loggedInUser.Id) {
        setIsSnackBar(true);
        setErrorMessage("Invalid OTP");
        setsuccessMessage("");
      }
    }
    if (loggedInUser?.Id && isLogin) {
      // setToggle(false);
      setFormCount(1);
      setErrorMessage("");
      setIsSnackBar(true);
      setsuccessMessage("Login Successful");
      navigate("/");
    }
  }, [loggedInUser, toggle]);

  const renderTime2 = () => React.Fragment;
  const renderButton2 = (buttonProps) => {
    return (
      <div className="resendotp col-12 mx-auto pt-3">
        <p className="col-12 d-block">
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
              <a {...buttonProps}>
                <span
                  style={{ color: "#CA3060", cursor: "pointer" }}
                  onClick={resendOtp}
                >
                  {" "}
                  Resend OTP
                </span>
              </a>
            </p>
          )}
        </p>
      </div>
    );
  };
  return (
    <>
      <button className="close otp-close mt-3" onClick={onArrowBack}>
        <MdArrowBack />
      </button>
      <section class="loginPage mbTopSpace">
        <div class="row ">
          <div class="col-lg-6 otpBgCol order-lg-last d-none d-lg-block">
            <div class="row no-gutters1 align-items-center">
              <div class="col-12">
                <div class="otpLogoCol"></div>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-6 align-self-center">
            <div class="otpForm-outer">
              <div class="row">
                <div class="col-lg-12">
                  <div class="otp-titleMain formText text-center">
                    <img src="/images/VipsLogoMain.png" alt="VIPS Logo" />
                    <h2>OTP Verification</h2>
                    <div class="otp-send-to">
                      <p>
                        Enter the OTP sent to
                        <label for="">
                          {" "}
                          &nbsp; +91 {mobileno}
                          {/* {isUserExist && isUserExist[1]} */}
                        </label>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

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
                            autocomplete="off"
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
                              <ThemeButton
                                disabled={otp.length == 6 ? false : true}
                                onClick={handleClick}
                                loading={loading}
                                value={"Verify & Proceed"}
                              />
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
      <MuiSnackBar
        open={isSnackBar}
        setOpen={setIsSnackBar}
        successMsg={showSuccessMessage}
        errorMsg={showErrorMessage}
        setSuccess={setsuccessMessage}
        setError={setErrorMessage}
      />
    </>
  );
};

export default Otp;

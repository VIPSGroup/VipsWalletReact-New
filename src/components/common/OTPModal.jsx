import React from "react";
import OTPInput, { ResendOTP } from "otp-input-react";
import { Button, Form, Input, Modal, Spin } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const OTPModal = ({
  step,
  route,
  setOtp,
  Otp,
  handleClick,
  load,
  resendOtp,
  handleClose,
}) => {
  const navigate = useNavigate();
  const { logData, loading: digiLogLoading } = useSelector(
    (state) => state.registerDigiSlice.login
  );
  const { loggedInUser, loading: logLoading } = useSelector(
    (state) => state.loginSlice.loggetInWithOTP
  );

  const renderTime2 = () => React.Fragment;
  // OTP Resend Logic
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
                <span style={{ color: "#CA3060" }} onClick={resendOtp}>
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
      <Modal
        footer={[]}
        maskClosable={false}
        centered
        onCancel={handleClose}
        open={step === 1}
      >
        <div class="align-self-center">
          <div class="digigoldotpForm-outer">
            <div class="row">
              <div class="col-lg-12">
                <div className="digigoldotp-titleMain formText text-center">
                  <h2>OTP Verification</h2>
                </div>
                <div class="otp-send-to">
                  <p>
                    Enter the OTP sent to{" "}
                    {logData.Data
                      ? logData?.Data?.MobileNumber
                      : loggedInUser?.UserName}
                    <label for=""></label>
                  </p>
                </div>
              </div>
            </div>

            <div className="formStyle">
              <div
                id="otp"
                className="row row-flex justify-content-center mt-1"
              >
                <div className="">
                  <OTPInput
                    value={Otp}
                    className="text-dark Ordersummery-otp-input"
                    onChange={(e) => setOtp(e)}
                    autoFocus
                    OTPLength={6}
                    otpType="number"
                    disabled={false}
                  />
                  <ResendOTP
                    renderButton={renderButton2}
                    renderTime={renderTime2}
                  />
                </div>
                <div class="col-lg-12">
                  <div class="otp-btnCol btnTopSpace">
                    <Button
                      htmlType="submit"
                      disabled={Otp?.length !== 6}
                      loading={load}
                      type="primary"
                      size="large"
                      onClick={handleClick}
                    >
                      Verify & Proceed
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default OTPModal;

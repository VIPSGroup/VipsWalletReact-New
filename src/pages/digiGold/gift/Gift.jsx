import React, { useEffect, useState } from "react";
import "../../../assets/styles/digigold/digigold-gift.css";
import "../../../index.css";
import OTPInput, { ResendOTP } from "otp-input-react";
import { Button, Form, Input, Modal, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import MyVault, { CurrentRateSection } from "../MyVault";
import { useDispatch, useSelector } from "react-redux";
import {
  HandleAmounthange,
  HandleGramChange,
  digitPrecision,
  formatter,
  handleKeyDown,
  handleMobileKeyPress,
  parser,
} from "../../../constants";
import { fetchGoldSilverRates } from "../../../redux/slices/digiGold/digiGoldSlice";
import { DigiGiftSend } from "../../../redux/slices/digiGold/gift/DigiGiftSlice";
import QuickService from "../../../components/digiGold/QuickService";
import { MuiSnackBar } from "../../../components/common";
import { modalOpen } from "../../../redux/slices/digiGold/digiGoldSlice";
import { HowItWorks } from "../DigiGoldHome";
import UserNotExist from "../../../components/digiGold/UserNotExist";
import DigiGoldSignup from "../DigiGoldSignup";

const Gift = ({ setIsCommonTopNav }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [step, setStep] = useState("");
  const [isSnackBar, setIsSnackBar] = useState(false);
  const [load, setLoad] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [amount, setAmount] = useState("");
  const [isGold, setIsGold] = useState(0); //0 for Gold 1 for Silver
  const [grams, setGrams] = useState("");
  const [active, setActive] = useState(1);
  const [isDigiLogin, setIsDigiLogin] = useState("");

  const [err, setErr] = useState("");
  const [Otp, setOtp] = useState("");
  const [modal, setModal] = useState(false);
  const [response, setResponse] = useState();
  const [formvalue, setFormValue] = useState({
    valueinAmt: "",
    valueinGm: "",
    // valType: "",
    username: "",
    password: "",
    metalType: "",
    type: "",
    receiverUserName: "",
  });
  const { rateData, loading } = useSelector(
    (state) => state.digiGoldSlice.rates
  );
  const { logData, loading: digiLogLoading } = useSelector(
    (state) => state.registerDigiSlice.login
  );
  const { loggedInUser, loading: logLoading } = useSelector(
    (state) => state.loginSlice.loggetInWithOTP
  );

  const handleClose = () => {
    setModal(false);
    navigate("/vipsgold-gift");
    setOtp("");
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    const gGram = parseFloat(logData?.Data?.GoldGrams);
    const sGram = parseFloat(logData?.Data?.SilverGrams);
    setAmount(value);
    if (isGold === 0) {
      const totalAmount = digitPrecision(value, "amount");

      const quantity = digitPrecision(
        totalAmount / rateData.Data?.result.data.rates.gSell,
        "quantity"
      );
      setFormValue({
        ...formvalue,
        metalType: "gold",
        valueinGm: quantity,
      });
      setGrams(quantity);
      const gram = parseFloat(quantity);

      if (logData.Data) {
        if (gram > (isGold === 0 ? gGram?.toFixed(4) : sGram?.toFixed(4))) {
          const roundedNum = Math.round(gGram * 10000) / 10000;
          const gGramStr = roundedNum.toFixed(4);
          const gGramResult = parseFloat(gGramStr);
          const sGramRounded = Math.round(sGram * 10000) / 10000;
          const sGramStr = sGramRounded.toFixed(4);
          const sGramResult = parseFloat(sGramStr);
          if (0 < (isGold === 0 ? gGram?.toFixed(4) : sGram?.toFixed(4))) {
            setErr(
              ` You can gift up to ${
                isGold === 0 ? gGramResult : sGramResult
              } gm ${isGold === 0 ? "Gold" : "Silver"} of total  ${
                isGold === 0 ? gGramResult : sGramResult
              } gm `
            );
          } else {
            setErr(
              `You do not have a enough ${
                isGold === 0 ? "Gold" : "Silver"
              } to Gift `
            );
          }
        } else {
          setErr("");
        }
      }
    } else {
      const totalAmount = digitPrecision(value, "amount");

      const quantity = digitPrecision(
        totalAmount / rateData.Data?.result.data.rates.sSell,
        "quantity"
      );
      setFormValue({
        ...formvalue,
        metalType: "silver",
        valueinGm: quantity,
      });
      setGrams(quantity);
      const gram = parseFloat(quantity);

      if (logData.Data) {
        if (gram > (isGold === 0 ? gGram?.toFixed(4) : sGram?.toFixed(4))) {
          const roundedNum = Math.round(gGram * 10000) / 10000;
          const gGramStr = roundedNum.toFixed(4);
          const gGramResult = parseFloat(gGramStr);
          const sGramRounded = Math.round(sGram * 10000) / 10000;
          const sGramStr = sGramRounded.toFixed(4);
          const sGramResult = parseFloat(sGramStr);
          if (0 < (isGold === 0 ? gGram?.toFixed(4) : sGram?.toFixed(4))) {
            setErr(
              ` You can gift up to ${
                isGold === 0 ? gGramResult : sGramResult
              } gm ${isGold === 0 ? "Gold" : "Silver"} of total  ${
                isGold === 0 ? gGramResult : sGramResult
              } gm `
            );
          } else {
            setErr(
              `You do not have a enough ${
                isGold === 0 ? "Gold" : "Silver"
              } to Gift `
            );
          }
        } else {
          setErr("");
        }
      }
    }
  };

  const handleGramsChange = (e) => {
    let value =
      e.target.value.split(".").length !== 2
        ? e.target.value
        : e.target.value.split(".")[0] +
          "." +
          e.target.value.split(".")[1].substring(0, 4);
    const quantity = digitPrecision(value, "quantity");
    setGrams(quantity);
    const gram = parseFloat(value);
    const gGram = parseFloat(logData?.Data?.GoldGrams);
    const sGram = parseFloat(logData?.Data?.SilverGrams);
    // if (logData.Data) {
    //   if (gram > (isGold === 0 ? gGram : sGram)) {
    //     const roundedNum = Math.round(gGram * 10000) / 10000;
    //     const gGramStr = roundedNum.toFixed(4);
    //     const gGramResult = parseFloat(gGramStr);
    //     const sGramRounded = Math.round(sGram * 10000) / 10000;
    //     const sGramStr = sGramRounded.toFixed(4);
    //     const sGramResult = parseFloat(sGramStr);
    //     setErr(
    //       ` You can gift up to ${isGold === 0 ? gGramResult : sGramResult} gm ${
    //         isGold === 0 ? "Gold" : "Silver"
    //       } of total  ${isGold === 0 ? gGramResult : sGramResult} gm `
    //     );
    //   } else {
    //     setErr("");
    //   }
    // }
    if (logData.Data) {
      if (gram > (isGold === 0 ? gGram?.toFixed(4) : sGram?.toFixed(4))) {
        const roundedNum = Math.round(gGram * 10000) / 10000;
        const gGramStr = roundedNum.toFixed(4);
        const gGramResult = parseFloat(gGramStr);
        const sGramRounded = Math.round(sGram * 10000) / 10000;
        const sGramStr = sGramRounded.toFixed(4);
        const sGramResult = parseFloat(sGramStr);
        if (0 < (isGold === 0 ? gGram?.toFixed(4) : sGram?.toFixed(4))) {
          setErr(
            ` You can gif up to ${
              isGold === 0 ? gGramResult : sGramResult
            } gm ${isGold === 0 ? "Gold" : "Silver"} of total  ${
              isGold === 0 ? gGramResult : sGramResult
            } gm `
          );
        } else {
          setErr(
            `You do not have a enough ${
              isGold === 0 ? "Gold" : "Silver"
            } to Gift `
          );
        }
      } else {
        setErr("");
      }
    }

    const TotalAmount =
      (isGold === 0 && rateData.Data?.result?.data?.rates?.gSell * value) ||
      (isGold === 1 && rateData.Data?.result?.data?.rates?.sSell * value);
    setFormValue({
      ...formvalue,
      valueinGm: value,
      valueinAmt: TotalAmount,
      valType: "quantity",
      metalType: isGold === 0 ? "gold" : "silver",
    });
    const totalRound = Math.round(TotalAmount * 10000) / 10000;
    const strTotal = totalRound.toFixed(2);
    const totalResult = parseFloat(strTotal);
    setAmount((totalResult === "0.00" ? 0 : totalResult) || "");
    if (totalResult === 0) {
      setErr("");
    }
    // setAmount(totalResult);
  };

  const renderTime2 = () => React.Fragment;
  // OTP Resend Logic
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
                <span
                  style={{ color: "#CA3060" }}
                  onClick={handleResendGiftOTPSubmit}
                >
                  Resend OTP
                </span>
              </a>
            </p>
          )}
        </p>
      </div>
    );
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(fetchGoldSilverRates()); // Dispatch your action here
    }, 60000); // Set the interval to 1 minute (60,000 milliseconds)

    dispatch(fetchGoldSilverRates()); // Dispatch the action immediately on mount

    return () => clearInterval(intervalId); // Clear the interval on unmount
  }, [dispatch]);
  const handleFinish = async () => {
    const senderUsername = loggedInUser.UserName;
    const Password = loggedInUser.TRXNPassword;
    const otp = Otp;

    if (logData.Data && !err) {
      setLoad(true);
      const res = await DigiGiftSend({
        senderUsername,
        Password,
        otp,
        formvalue,
      });
      if (res.ResponseStatus === 2) {
        setLoad(false);
        setIsSnackBar(true);
        setErrorMsg("");
        setSuccessMsg(res.Remarks);
        setStep(1);
      }
      if (res.ResponseStatus === 1) {
        if (res.Data.statusCode === 200) {
          setLoad(false);
          setStep(0);
          setResponse(res.Data);
          setModal(true);
        } else {
          setLoad(false);
          setIsSnackBar(true);
          setErrorMsg("Something Went Wrong");
          setSuccessMsg("");
        }
      }
      if (res.ResponseStatus === 0) {
        if (res.Data?.statusCode === 412) {
          setLoad(false);
          setIsSnackBar(true);
          setErrorMsg(res.Data.message);
          setSuccessMsg("");
        } else {
          setLoad(false);
          setIsSnackBar(true);
          setErrorMsg(res.Remarks);
          setSuccessMsg("");
        }
      }
    } else {
      if (loggedInUser) {
        dispatch(modalOpen());
      } else {
        navigate("/login");
      }
    }
  };
  const handleResendGiftOTPSubmit = async () => {
    setOtp("");
    const senderUsername = loggedInUser.UserName;
    const Password = loggedInUser.TRXNPassword;

    const res = await DigiGiftSend({
      senderUsername,
      Password,
      formvalue,
    });
    if (res.ResponseStatus === 2) {
      setIsSnackBar(true);
      setErrorMsg("");
      setSuccessMsg(res.Remarks);
      setStep(1);
    }
  };
  useEffect(() => {
    HandleGramChange({
      setAmount,
      setGrams,
      rateData,
      active,
      logData,
      setErr,
      // setValueType,
      grams,
      isGold,
      // valueType,
      setFormValue,
      formvalue,
    });
  }, [rateData]);
  return (
    <>
      {/* <CommonTopNav /> */}

      <section class="section-align buy-sell-form">
        <div class="container">
          <div class="digital-gold-section-head">
            <h1 class="section-head-title">
              THE BEST <span>GIFT</span> FOR YOUR LOVED ONES
            </h1>
          </div>

          <div class="row">
            <div class="col-lg-12">
              <MyVault setStep={setStep} />
              <Spin spinning={load}>
                <div class="buy-sell-form-outer">
                  {/* <div class="current-rate-outer">
                    <div class="current-rate">
                      <span class="current-rate-title mb-3">GOLD</span>
                      <span class="current-rate-amt">
                        &#x20B9;{" "}
                        {!loading && rateData
                          ? rateData?.Data?.result?.data?.rates?.gSell
                          : "Loading..."}{" "}
                        / gm
                      </span>
                    </div>
                    <div class="digi-icon d-none d-md-block">
                      <img src="/images/digigold-images/digi-icon.svg" alt="" />
                    </div>
                    <div className="vertical-separator d-md-none d-sm-block"></div>
                    <div class="current-rate">
                      <span class="current-rate-title mb-3">SILVER</span>
                      <span class="current-rate-amt">
                        {" "}
                        &#x20B9;{" "}
                        {!loading && rateData
                          ? rateData?.Data?.result?.data?.rates?.sSell
                          : "Loading..."}{" "}
                        / gm
                      </span>
                    </div>
                  </div> */}
                  <CurrentRateSection />

                  <div class="buy-sell-tab-outer">
                    <Form
                      fields={[
                        {
                          name: "grams",
                          value: grams,
                        },
                        {
                          name: "amount",
                          value: amount,
                        },
                      ]}
                      onFinish={handleFinish}
                      class="buy-sell-tab-inner"
                    >
                      <div class="gift-recipient-outer">
                        <div class="gift-recipient-input-wrapper">
                          {/* <div class="input"> */}
                          <Form.Item
                            // hasFeedback
                            name="mobileNumber"
                            rules={[
                              {
                                required: true,
                                message: "Mobile number is required",
                              },
                              {
                                pattern: /^\d{10}$/,
                                message: "Mobile number is not valid",
                              },
                            ]}
                          >
                            <Input
                              onKeyPress={handleMobileKeyPress}
                              value={formvalue.receiverUserName}
                              onChange={(e) =>
                                setFormValue({
                                  ...formvalue,
                                  receiverUserName: e.target.value,
                                })
                              }
                              maxLength={10}
                              // addonBefore={"+91"}
                              size="large"
                              placeholder="Enter Mobile Number"
                            />
                            {/* <label htmlFor="">
                                {" "}
                                Enter the Recipient's Mobile Number
                              </label> */}
                          </Form.Item>
                          {/* </div> */}
                        </div>
                      </div>

                      <div class="buy-sell-tab-outer">
                        {/* <!-- tab content start --> */}
                        <div className="buy-sell-tab-inner">
                          <ul class="nav nav-pills tab-pills-wrapper">
                            <li
                              style={{ cursor: "pointer" }}
                              class="nav-item tab-pills"
                            >
                              <a
                                onClick={() => {
                                  setIsGold(0);
                                  setAmount("");
                                  setGrams("");
                                  setErr("");
                                }}
                                class="nav-link active tab-pills-link"
                                data-toggle="pill"
                                href="#goldrate"
                                role="tab"
                                aria-controls="pills-gold"
                                aria-selected="true"
                              >
                                GOLD 24k 999
                              </a>
                            </li>
                            <li
                              style={{ cursor: "pointer" }}
                              class="nav-item tab-pills"
                            >
                              <a
                                onClick={() => {
                                  setIsGold(1);
                                  setAmount("");
                                  setGrams("");
                                  setErr("");
                                }}
                                class="nav-link tab-pills-link"
                                data-toggle="pill"
                                href="#silverrate"
                                role="tab"
                                aria-controls="pills-silver"
                                aria-selected="false"
                              >
                                SILVER 24k 999
                              </a>
                            </li>
                          </ul>
                          <div class="tab-content mt-3">
                            <div
                              class="tab-pane fade show active"
                              id="goldrate"
                              role="tabpanel"
                              aria-labelledby="gold-tab"
                            >
                              <div class="col-lg-12">
                                <div
                                  style={{ justifyContent: "center" }}
                                  class="row align-items-center"
                                >
                                  <div class="input-wrapper">
                                    {/* <div className="input"> */}
                                    <Form.Item
                                      className="mb-0 disabled-input"
                                      name={"grams"}
                                      rules={
                                        [
                                          // {
                                          //   required: true,
                                          //   // message: "Please Enter Grams",
                                          // },
                                        ]
                                      }
                                    >
                                      <Input
                                        formatter={formatter}
                                        // onKeyDown={handleKeyDown2}
                                        className="mb-0 disabled-input"
                                        onWheel={(e) => e.target.blur()}
                                        parser={parser}
                                        min={0.0001}
                                        precision={4}
                                        required
                                        // addonBefore="Grams"
                                        value={grams}
                                        type="number"
                                        name="grams"
                                        onChange={handleGramsChange}
                                        placeholder="Enter Grams"
                                        size="large"
                                        // step={0.0001}
                                        step={"any"}
                                        // style={{ padding: 15 }}
                                      />
                                      {/* <label htmlFor="Enter Grams">
                                          Enter Grams
                                        </label> */}
                                    </Form.Item>
                                    {/* </div> */}
                                  </div>
                                  <div class="exchange-arrow-outer text-center">
                                    <span class="exchange-arrow ">
                                      {" "}
                                      <img
                                        alt=""
                                        // style={{
                                        //   width: 40,
                                        //   marginLeft: 10,
                                        //   marginRight: 10,
                                        // }}
                                        src="/images/digigold-images/two-arrows.svg"
                                      />{" "}
                                    </span>
                                  </div>
                                  <div class="input-wrapper">
                                    {/* <div className="input"> */}
                                    <Form.Item
                                      name="amount"
                                      className="mb-0 disabled-input"
                                      rules={
                                        [
                                          // {
                                          //   required: true,
                                          //   message: "Please Enter Amount",
                                          // },
                                        ]
                                      }
                                    >
                                      <Input
                                        onKeyDown={handleKeyDown}
                                        min={1}
                                        required
                                        onWheel={(e) => e.target.blur()}
                                        value={amount}
                                        maxLength={8}
                                        max={180000}
                                        // addonBefore="Rs."
                                        type="number"
                                        name="amount"
                                        onChange={handleAmountChange}
                                        // disabled={active === 0 ? false : true}
                                        placeholder="Enter Amount"
                                        size="large"
                                        step={"any"}
                                        className="mb-0 disabled-input"
                                        // style={{
                                        //   backgroundColor:
                                        //     active !== 0 && "#80808052",
                                        // }}
                                      />
                                      {/* <label htmlFor="Enter Amount">
                                          Enter Amount
                                        </label> */}
                                    </Form.Item>
                                    {/* </div> */}
                                  </div>
                                </div>

                                <div class="buy-btn">
                                  <button
                                    disabled={err}
                                    htmlType="submit"
                                    size="large"
                                    type="primary"
                                    class={`${
                                      (amount < 1 && (amount || grams)) || err
                                        ? "btn-disable quick-buy"
                                        : "btn-primery quick-buy"
                                    } `}
                                  >
                                    Send Gift
                                  </button>
                                  <p style={{ color: "red", marginTop: 20 }}>
                                    {amount < 1 && (amount || grams)
                                      ? "Minimum Amount Rs.1"
                                      : null}
                                  </p>
                                  <p style={{ color: "red", marginTop: 20 }}>
                                    {err}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <!-- tab content end --> */}
                      </div>
                    </Form>
                  </div>
                </div>
              </Spin>
            </div>
          </div>
        </div>
      </section>
      <UserNotExist />
      <Modal
        footer={[]}
        maskClosable={false}
        centered
        onCancel={() => {
          // localStorage.removeItem("valueType");
          setOtp("");
          navigate("/vipsgold-gift");
          setStep(0);
        }}
        open={step === 1 && true}
      >
        {step === 1 && (
          <div class="align-self-center">
            <div class="digigoldotpForm-outer">
              <div class="row">
                <div class="col-lg-12">
                  <div className="digigoldotp-titleMain formText text-center">
                    <h2>OTP Verification</h2>
                  </div>
                  <div class="otp-send-to">
                    <p>
                      Enter the OTP sent to {logData.Data.MobileNumber}
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
                        disabled={Otp.length !== 6}
                        loading={load}
                        type="primary"
                        size="large"
                        onClick={handleFinish}
                      >
                        Verify & Proceed
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
      <Modal
        footer={[]}
        onCancel={handleClose}
        centered
        maskClosable={false}
        open={modal}
      >
        <div class="digigold-order-success text-center">
          <img
            alt=""
            src="/images/digigold-images/check-green.svg"
            class="img img-fluid check-green-img"
          />
          <p class="digigold-success-title mt-3 ">Thank You!</p>
          <p class="success-note">
            {`Successfully transferred ${response?.result?.data?.quantity?.toFixed(
              4
            )} grams of ${response?.result?.data?.metalType} `}
          </p>
          <div class="digigold-success-btn">
            <button
              onClick={() => {
                navigate("/vipsgold-orders");
              }}
              class="btn btn-primery"
            >
              Go to my Orders
            </button>
          </div>
        </div>
      </Modal>
      <DigiGoldSignup
        setIsDigiLogin={setIsDigiLogin}
        setStep={setStep}
        step={step}
      />
      <QuickService />
      {HowItWorks()}
      <MuiSnackBar
        open={isSnackBar}
        setOpen={setIsSnackBar}
        successMsg={successMsg}
        errorMsg={errorMsg}
        setSuccess={setSuccessMsg}
        setError={setErrorMsg}
      />
    </>
  );
};

export default Gift;

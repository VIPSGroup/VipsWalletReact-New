import { Form, Input, Spin } from "antd";
import React, { memo, useEffect, useState } from "react";
import "../../index.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import "../../assets/styles/digigold/gold-home.css";
import {
  CheckSellMetalStatus,
  fetchGoldSilverRates,
  modalOpen,
} from "../../redux/slices/digiGold/digiGoldSlice";
import { loginDigiGold } from "../../redux/slices/digiGold/registerDigiSlice";
import DigiGoldSignup from "./DigiGoldSignup";
import {
  HandleAmounthange,
  HandleGramChange,
  digitPrecision,
  formatter,
  handleKeyDown,
  handleKeyDown2,
  handleMobileKeyPress,
  parser,
} from "../../constants";
import { MuiSnackBar } from "../../components/common";
import MyVault, { CurrentRateSection } from "./MyVault";
import QuickService from "../../components/digiGold/QuickService";
import UserNotExist from "../../components/digiGold/UserNotExist";
import { DigiGiftSend } from "../../redux/slices/digiGold/gift/DigiGiftSlice";
import OTPModal from "../../components/common/OTPModal";
import SuccessModal from "../../components/digiGold/SuccessModal";

export const HowItWorks = () => {
  return (
    <>
      <section class="digi-gold-section-wrapper digital-gold-services">
        <div class="container-fluid">
          <div class="digital-gold-section-head">
            <h1 class="section-head-title">How It works</h1>
          </div>

          <div class="digigold-work-box-outer">
            {howItWorkArr.map((e) => {
              return (
                <div
                  style={{ cursor: "pointer" }}
                  class="digigold-work-box-inner"
                >
                  <div class="digigold-work-div-outer">
                    <div class="digigold-work-div-box">
                      <div class="digigold-work-icon">
                        <img
                          src={`images/digigold-images/${e.img}`}
                          alt="VIPS Gold Silver Services"
                          class="img-fluid digigold-work-img"
                        />
                      </div>

                      <div class="digigold-work-title">
                        <h3>{e.title}</h3>
                      </div>
                      <p class="digigold-work-description">{e.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};
const DigiGoldHome = ({
  setActive,
  active,
  setGrams,
  grams,
  setAmount,
  amount,
  setStep,
  step,
  setErr,
  err,
  setReceiverUserName,
  receiverUserName,
}) => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDigiLogin, setIsDigiLogin] = useState("");
  const [isSnackBar, setIsSnackBar] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isGold, setIsGold] = useState(0); //0 for Gold 1 for Silver
  const [load, setLoad] = useState(false);
  const [Otp, setOtp] = useState("");
  const [modal, setModal] = useState(false);
  const [response, setResponse] = useState();
  const { isServiceEnable, ServiceEnableLoading } = useSelector(
    (state) => state.coreSlice
  );
  const [valueType, setValueType] = useState({
    valueinAmt: "",
    valueinGm: "",
    valType: "",
    username: "",
    password: "",
    metalType: "",
    type: "",
    // receiverUserName: "",
  });
  const { logData, loading: digiLogLoading } = useSelector(
    (state) => state.registerDigiSlice.login
  );
  const { loggedInUser, loading: logLoading } = useSelector(
    (state) => state.loginSlice.loggetInWithOTP
  );
  const { rateData, loading } = useSelector(
    (state) => state.digiGoldSlice.rates
  );
  const handleClick = async () => {
    const senderUsername = loggedInUser?.UserName;
    const Password = loggedInUser?.TRXNPassword;
    const otp = Otp;
    valueType.uniqueId = loggedInUser?.Id;
    valueType.username = loggedInUser?.UserName;
    valueType.password = loggedInUser?.TRXNPassword;
    valueType.type =
      (parseFloat(active) === 0 && "buy") ||
      (parseFloat(active) === 1 && "sell") ||
      (parseFloat(active) === 2 && "gift");
    if (parseFloat(active) === 2) {
      if (!amount && !grams) {
        setErr("Please Enter Amount or Grams");
      } else {
        if (logData.Data && !err) {
          setLoad(true);
          const res = await DigiGiftSend({
            senderUsername,
            Password,
            otp,
            valueType,
            receiverUserName,
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
          if (loggedInUser && !err) {
            dispatch(modalOpen());
          } else {
            if (!err) {
              navigate("/login");
            }
          }
        }
      }
    } else {
      if (!amount && !grams) {
        setErr("Please Enter Amount or Grams");
      } else {
        if (!loggedInUser) {
          navigate("/login");
        } else {
          if (
            rateData.ResponseStatus !== 0 &&
            !loading &&
            !err &&
            logData.ResponseStatus !== 0
          ) {
            if (parseFloat(active) === 1) {
              const metalType = valueType.metalType;
              const quantity = valueType.valueinGm;
              const res = await dispatch(
                CheckSellMetalStatus({
                  senderUsername,
                  Password,
                  metalType,
                  quantity,
                })
              );
              if (res.payload.ResponseStatus === 1) {
                navigate("/vipsgold-order-summary", { state: valueType });
                localStorage.setItem("valueType", JSON.stringify(valueType));
                setAmount("");
                setGrams("");
              } else {
                setErr(res.payload.Remarks);
              }
            } else {
              navigate("/vipsgold-order-summary", { state: valueType });
              localStorage.setItem("valueType", JSON.stringify(valueType));
              setAmount("");
              setGrams("");
            }

            // navigate("/vipsgold-order-summary", { state: valueType });
          } else if (rateData.ResponseStatus === 0) {
            setErrorMsg(rateData.Remarks);
            setSuccessMsg("");
            setIsSnackBar(true);
          } else if (logData.ResponseStatus === 0) {
            dispatch(modalOpen());
            setStep(0);
          }
          if (logData.ResponseStatus === 3) {
            setErrorMsg(logData.Remarks);
            setSuccessMsg("");
            setIsSnackBar(true);
          }
        }
      }
    }
  };
  useEffect(() => {
    if (
      loggedInUser &&
      isServiceEnable.ResponseStatus === 1 &&
      isServiceEnable.Data.IsServiceEnabled === true
    ) {
      const username = loggedInUser.UserName;
      const password = loggedInUser.TRXNPassword;
      dispatch(loginDigiGold({ username, password }));
    }
  }, [dispatch]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(fetchGoldSilverRates()); // Dispatch your action here
    }, 60000); // Set the interval to 1 minute (60,000 milliseconds)

    dispatch(fetchGoldSilverRates()); // Dispatch the action immediately on mount

    return () => clearInterval(intervalId); // Clear the interval on unmount
  }, [dispatch]);
  const handleAmountChange = (e) => {
    const gGram = parseFloat(logData?.Data?.GoldGrams);
    const sGram = parseFloat(logData?.Data?.SilverGrams);
    const taxRate =
      parseFloat(rateData.Data.result.data.taxes[0].taxPerc) +
      parseFloat(rateData.Data.result.data.taxes[1].taxPerc);
    setAmount(e.target.value);
    const inclTaxAmount = digitPrecision(e.target.value, "amount");
    const GoldBuyRate = rateData.Data.result.data.rates.gBuy;
    const SilverBuyRate = rateData.Data.result.data.rates.sBuy;
    const TaxInc =
      (parseFloat(isGold === 0 ? GoldBuyRate : SilverBuyRate) * taxRate) /
        parseFloat(100) +
      parseFloat(isGold === 0 ? GoldBuyRate : SilverBuyRate);

    const inclTaxRate = digitPrecision(TaxInc, "amount");
    const qty = inclTaxAmount / inclTaxRate;
    const quantity = digitPrecision(
      parseFloat(active) === 2
        ? inclTaxAmount /
            (isGold === 0
              ? rateData.Data?.result.data.rates.gSell
              : rateData.Data?.result.data.rates.sSell)
        : qty,
      "quantity"
    );
    setValueType({
      ...valueType,
      valueinAmt: parseFloat(e.target.value),
      valueinGm: parseFloat(quantity),
      // e.target.value / (isGold === 0 ? GoldBuyRate : SilverBuyRate),
      valType: "amount",
      metalType: isGold === 0 ? "gold" : "silver",
    });
    setGrams(quantity ? quantity : "");
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
          if (parseFloat(active) !== 0) {
            if (parseFloat(e.target.value) >= 1) {
              // setErr(
              //   ` You can gift up to ${
              //     isGold === 0 ? gGramResult : sGramResult
              //   } gm ${isGold === 0 ? "Gold" : "Silver"} of total  ${
              //     isGold === 0 ? gGramResult : sGramResult
              //   } gm `
              // );
              setErr(
                `You Don't have a Sufficient ${
                  isGold === 0 ? "Gold" : "Silver"
                } to Gift `
              );
            }
          }
        } else {
          if (parseFloat(active) !== 0) {
            if (parseFloat(e.target.value) >= 1) {
              setErr(
                `You do not have a enough ${
                  isGold === 0 ? "Gold" : "Silver"
                } to Gift `
              );
            }
          }
        }
      } else {
        setErr("");
      }
    } else {
      if (quantity) {
        setErr("");
      }
    }
    if (quantity === 0) {
      setErr("");
    }
  };
  const handleGramsChange = (e) => {
    let value =
      e.target.value.indexOf(".") === -1
        ? e.target.value.slice(0, 4).replace(/[^\d]/g, "")
        : e.target.value
            .split(".")
            .map((part, index) =>
              index === 0
                ? part.replace(/[^\d]/g, "")
                : part.slice(0, 4).replace(/[^\d]/g, "")
            )
            .join(".");

    if (e.target.value.length > value.length) {
      e.target.value = value;
    }
    const quantity = digitPrecision(value, "quantity");
    setGrams(value);
    const gram = parseFloat(quantity);
    const gGram = parseFloat(logData?.Data?.GoldGrams);
    const sGram = parseFloat(logData?.Data?.SilverGrams);

    const GoldBuyRates = rateData.Data?.result?.data?.rates?.gBuy;
    const SilverBuyRates = rateData.Data?.result?.data?.rates?.sBuy;
    const GoldSellRates = rateData.Data?.result?.data?.rates?.gSell;
    const SilverSellRates = rateData.Data?.result?.data?.rates?.sSell;
    const TotalAmount =
      (parseFloat(active) === 0 && isGold === 0 && GoldBuyRates * quantity) ||
      (parseFloat(active) === 0 && isGold === 1 && SilverBuyRates * quantity) ||
      (parseFloat(active) === 1 && isGold === 0 && GoldSellRates * quantity) ||
      (parseFloat(active) === 1 &&
        isGold === 1 &&
        SilverSellRates * quantity) ||
      (parseFloat(active) === 2 && isGold === 0 && GoldSellRates * quantity) ||
      (parseFloat(active) === 2 && isGold === 1 && SilverSellRates * quantity);
    setValueType({
      ...valueType,
      valueinGm: parseFloat(quantity),
      valueinAmt: parseFloat(TotalAmount),
      valType: "quantity",
      metalType: isGold === 0 ? "gold" : "silver",
    });
    const totalRound = Math.round(TotalAmount * 10000) / 10000;
    const strTotal = totalRound.toFixed(2);
    const totalResult = parseFloat(strTotal);
    if (logData.Data) {
      if (
        (parseFloat(active) === 1 || parseFloat(active) === 2) &&
        gram > (isGold === 0 ? gGram?.toFixed(4) : sGram?.toFixed(4))
      ) {
        const roundedNum = Math.round(gGram * 10000) / 10000;
        const gGramStr = roundedNum.toFixed(4);
        const gGramResult = parseFloat(gGramStr);
        const sGramRounded = Math.round(sGram * 10000) / 10000;
        const sGramStr = sGramRounded.toFixed(4);
        const sGramResult = parseFloat(sGramStr);
        if (0 < (isGold === 0 ? gGram?.toFixed(4) : sGram?.toFixed(4))) {
          // console.log(totalResult, "totalResult");
          if (totalResult >= 1) {
            // setErr(
            //   ` You can ${parseFloat(active) === 1 ? "Sell" : "Gift"} up to ${
            //     isGold === 0 ? gGramResult : sGramResult
            //   } gm ${isGold === 0 ? "Gold" : "Silver"} of total  ${
            //     isGold === 0 ? gGramResult : sGramResult
            //   } gm `
            // );
            setErr(
              `You Don't have a Sufficient ${
                isGold === 0 ? "Gold" : "Silver"
              } to ${parseFloat(active) === 1 ? "Sell" : "Gift"}`
            );
          }
        } else {
          console.log(totalResult, "totalResult");
          if (totalResult >= 1) {
            setErr(
              `You do not have a enough ${
                isGold === 0 ? "Gold" : "Silver"
              } to ${parseFloat(active) === 1 ? "Sell" : "Gift"} `
            );
          }
        }
      } else {
        setErr("");
      }
    } else {
      if (value !== 0) {
        setErr("");
      }
    }
    setAmount((totalResult === "0.00" ? 0 : totalResult) || "");
    if (totalResult === 0) {
      setErr("");
    }
  };
  useEffect(() => {
    if (state) {
      setActive(state);
    }
  }, []);
  useEffect(() => {
    if (valueType.valType === "quantity") {
      HandleGramChange({
        setAmount,
        setGrams,
        rateData,
        active,
        logData,
        setErr,
        setValueType,
        grams,
        isGold,
        valueType,
      });
    } else if (valueType.valType === "amount") {
      HandleAmounthange({
        rateData,
        setAmount,
        isGold,
        setValueType,
        valueType,
        setGrams,
        setErr,
        amount,
        active,
      });
    }
  }, [rateData]);
  const handleBlur = (e) => {
    const input = e.target;
    const position = input.value.indexOf(".");
    input.setSelectionRange(
      position === -1 ? input.value.length : position,
      position === -1 ? input.value.length : position + 1
    );
  };
  useEffect(() => {
    setGrams("");
    setAmount("");
  }, []);
  const handleCloseGiftSuccess = () => {
    setModal(false);
    navigate("/vipsgold");
    setOtp("");
  };
  const handleResendGiftOTPSubmit = async () => {
    setOtp("");
    const senderUsername = loggedInUser.UserName;
    const Password = loggedInUser.TRXNPassword;

    const res = await DigiGiftSend({
      senderUsername,
      Password,
      valueType,
    });
    if (res.ResponseStatus === 2) {
      setIsSnackBar(true);
      setErrorMsg("");
      setSuccessMsg(res.Remarks);
      setStep(1);
    }
  };

  const handleCloseForGiftModal = () => {
    setOtp("");
    navigate("/vipsgold");
    setStep("");
  };

  return (
    <>
      <div className="">
        <Spin
          size="large"
          spinning={loading || logLoading || digiLogLoading || load}
        >
          <section class="digi-gold-section-wrapper  buy-sell-form">
            <div class="container">
              <div class="digital-gold-section-head">
                <h1 class="section-head-title">
                  BUY <span>GOLD</span> & <span>SILVER</span> AT BEST PRICES
                </h1>
              </div>

              <div class="row">
                <div class="col-lg-12">
                  <MyVault setStep={setStep} />
                  <div class="buy-sell-form-outer">
                    <CurrentRateSection active={active} />

                    <div class="buy-sell-option">
                      <div
                        onClick={() => {
                          setActive(0);
                          setAmount("");
                          setGrams("");
                          setErr("");
                          setReceiverUserName("");
                        }}
                        style={{ cursor: "pointer" }}
                        class={parseFloat(active) === 0 && "option-active"}
                      >
                        <h2> Buy</h2>
                      </div>
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setActive(1);
                          setAmount("");
                          setGrams("");
                          setErr("");
                          setReceiverUserName("");
                        }}
                        class={parseFloat(active) === 1 && "option-active"}
                      >
                        <h2>Sell</h2>
                      </div>
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          // navigate("/vipsgold-gift");
                          setActive(2);
                          setAmount("");
                          setGrams("");
                          setErr("");
                          setReceiverUserName("");
                        }}
                        class={parseFloat(active) === 2 && "option-active"}
                      >
                        <h2>Gift</h2>
                      </div>
                    </div>

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
                          {
                            name: "mobileNumber",
                            value: receiverUserName,
                          },
                        ]}
                        onFinish={handleClick}
                        className="buy-sell-tab-inner"
                      >
                        {/* Yaha Se Start hai Reciepent Mobile Number */}

                        {active === 2 && (
                          <div class="gift-recipient-outer">
                            <div class="">
                              <Form.Item
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
                                  value={receiverUserName}
                                  onChange={(e) =>
                                    setReceiverUserName(e.target.value)
                                  }
                                  maxLength={10}
                                  size="large"
                                  placeholder="Enter Mobile Number"
                                />
                              </Form.Item>
                            </div>
                          </div>
                        )}

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
                                  <Form.Item className="mb-0" name={"grams"}>
                                    <Input
                                      id="grams"
                                      formatter={formatter}
                                      onKeyDown={handleKeyDown2}
                                      onBlur={handleBlur}
                                      className="mb-0 disabled-input"
                                      onWheel={(e) => e.target.blur()}
                                      parser={parser}
                                      min={0.0001}
                                      precision={4}
                                      value={grams}
                                      type="text"
                                      name="grams"
                                      onChange={handleGramsChange}
                                      placeholder="Enter Grams"
                                      size="large"
                                      step={"any"}
                                    />
                                  </Form.Item>
                                </div>
                                <div class="exchange-arrow-outer text-center">
                                  <span class="exchange-arrow ">
                                    <img
                                      alt=""
                                      src="/images/digigold-images/two-arrows.svg"
                                    />
                                  </span>
                                </div>
                                <div class="input-wrapper">
                                  <Form.Item name="amount" className="mb-0 ">
                                    <Input
                                      id="amount"
                                      onKeyDown={handleKeyDown}
                                      min={1}
                                      onWheel={(e) => e.target.blur()}
                                      value={amount}
                                      maxLength={8}
                                      max={180000}
                                      type="number"
                                      name="amount"
                                      onChange={handleAmountChange}
                                      disabled={
                                        parseFloat(active) === 1 ? true : false
                                      }
                                      placeholder="Enter Amount"
                                      size="large"
                                      step={"any"}
                                      className="mb-0 disabled-input"
                                      style={{
                                        backgroundColor:
                                          parseFloat(active) === 1 &&
                                          "rgb(211 211 211 / 23%)",
                                      }}
                                    />
                                  </Form.Item>
                                </div>
                              </div>

                              <div class="buy-btn">
                                <button
                                  disabled={
                                    (amount < 1 && (amount || grams)) || err
                                  }
                                  htmlType="submit"
                                  size="large"
                                  type="primary"
                                  class={`${
                                    (amount < 1 && (amount || grams)) || err
                                      ? "btn-disable quick-buy"
                                      : "btn-primery quick-buy"
                                  } `}
                                >
                                  {(parseFloat(active) === 0 && "Quick Buy") ||
                                    (parseFloat(active) === 1 &&
                                      "Quick Sell") ||
                                    (parseFloat(active) === 2 && "Send Gift")}
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
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Spin>

        <QuickService
          setActive={setActive}
          setAmount={setAmount}
          setGrams={setGrams}
          setErr={setErr}
          setReceiverUserName={setReceiverUserName}
        />
        {HowItWorks(setActive)}
        <DigiGoldSignup
          setIsDigiLogin={setIsDigiLogin}
          setStep={setStep}
          step={step}
        />
      </div>
      {logData.Data && (
        <OTPModal
          load={load}
          step={step}
          setStep={setStep}
          setOtp={setOtp}
          Otp={Otp}
          handleClick={handleClick}
          resendOtp={handleResendGiftOTPSubmit}
          handleClose={handleCloseForGiftModal}
        />
      )}
      <SuccessModal
        modal={modal}
        response={response}
        route={"/vipsgold-orders"}
        handleCloseGiftSuccess={handleCloseGiftSuccess}
      />
      <UserNotExist />
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

export const quickServiceArr = [
  {
    img: "buy-icon.svg",
    title: "BUY",
    buy: "0",
    route: "/vipsgold",
  },
  {
    img: "sell-icon.svg",
    title: "SELL",
    buy: 1,
    route: "/vipsgold",
  },
  // {
  //   img: "sip-icon.svg",
  //   title: "SIP",
  // },
  // {
  //   img: "delivery-icon.svg",
  //   title: "DELIVERY",
  //   route: "/vipsgold-delivery",
  // },
  {
    img: "gold_gift_icon.svg",
    title: "Gift",
    buy: 2,

    route: "/vipsgold",
  },
  // {
  //   img: "my-orders-icon.svg",
  //   title: "MY ORDER",
  // },
];
export const howItWorkArr = [
  {
    img: "open-an-account.svg",
    title: "Open An Account",
    desc: "Buy Gold/Silver at the best market prices",
  },
  {
    img: "buy-sell.svg",
    title: "Buy / Sell Small",
    desc: "Buy/Sell for as low as ₹ 1",
  },
  {
    img: "secured-vault.svg",
    title: "Secured Vault",
    desc: "Free storage and insurance, verified by an independent trustee",
  },
  {
    img: "request-delivery.svg",
    title: "Request Delivery",
    desc: "In the form of Gold/Silver coins",
  },
  {
    img: "doorstep-delivery.svg",
    title: "Doorstep Delivery",
    desc: "The requested article will be delivered to your doorsteps",
  },
];
export default memo(DigiGoldHome);

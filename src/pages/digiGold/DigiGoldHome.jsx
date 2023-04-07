import { Form, Input, Spin } from "antd";
import React, { memo, useEffect, useState } from "react";
import "../../index.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import "../../assets/styles/digigold/gold-home.css";
import {
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
  parser,
} from "../../constants";
import { MuiSnackBar } from "../../components/common";
import MyVault, { CurrentRateSection } from "./MyVault";
import QuickService from "../../components/digiGold/QuickService";
import UserNotExist from "../../components/digiGold/UserNotExist";

export const HowItWorks = () => {
  return (
    <>
      {/* <!-- -- How it work section start -- --> */}
      <section class="digi-gold-section-wrapper digital-gold-services">
        <div class="container-fluid">
          <div class="digital-gold-section-head">
            <h1 class="section-head-title">How It works</h1>
          </div>
          {/* <!-- <div class="row"> --> */}

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

          {/* <!-- </div> --> */}
        </div>
      </section>
      {/* <!-- How it work section end --> */}
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
}) => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDigiLogin, setIsDigiLogin] = useState("");
  const [isSnackBar, setIsSnackBar] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  // const [amount, setAmount] = useState("");
  const [isGold, setIsGold] = useState(0); //0 for Gold 1 for Silver
  // const [grams, setGrams] = useState("");
  const [err, setErr] = useState("");
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
  });
  const [step, setStep] = useState("");
  const { logData, loading: digiLogLoading } = useSelector(
    (state) => state.registerDigiSlice.login
  );
  const { loggedInUser, loading: logLoading } = useSelector(
    (state) => state.loginSlice.loggetInWithOTP
  );
  const { rateData, loading } = useSelector(
    (state) => state.digiGoldSlice.rates
  );
  const handleClick = () => {
    valueType.uniqueId = loggedInUser?.Id;
    valueType.username = loggedInUser?.UserName;
    valueType.password = loggedInUser?.TRXNPassword;
    valueType.type = parseFloat(active) === 0 ? "buy" : "sell";
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
          navigate("/vipsgold-order-summary", { state: valueType });
          localStorage.setItem("valueType", JSON.stringify(valueType));
          setAmount("");
          setGrams("");

          navigate("/vipsgold-order-summary", { state: valueType });
        } else if (rateData.ResponseStatus === 0) {
          setErrorMsg(rateData.Remarks);
          setSuccessMsg("");
          setIsSnackBar(true);
        } else if (logData.ResponseStatus === 0) {
          dispatch(modalOpen());
        }
        if (logData.ResponseStatus === 3) {
          setErrorMsg(logData.Remarks);
          setSuccessMsg("");
          setIsSnackBar(true);
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
    const quantity = digitPrecision(qty, "quantity");
    console.log(quantity);
    setValueType({
      ...valueType,
      valueinAmt: e.target.value,
      valueinGm: e.target.value / (isGold === 0 ? GoldBuyRate : SilverBuyRate),
      valType: "amount",
      metalType: isGold === 0 ? "gold" : "silver",
    });
    setGrams(quantity);
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
    if (logData.Data) {
      if (
        parseFloat(active) === 1 &&
        gram > (isGold === 0 ? gGram?.toFixed(4) : sGram?.toFixed(4))
      ) {
        const roundedNum = Math.round(gGram * 10000) / 10000;
        const gGramStr = roundedNum.toFixed(4);
        const gGramResult = parseFloat(gGramStr);
        const sGramRounded = Math.round(sGram * 10000) / 10000;
        const sGramStr = sGramRounded.toFixed(4);
        const sGramResult = parseFloat(sGramStr);
        if (0 < (isGold === 0 ? gGram?.toFixed(4) : sGram?.toFixed(4))) {
          setErr(
            ` You can sell up to ${
              isGold === 0 ? gGramResult : sGramResult
            } gm ${isGold === 0 ? "Gold" : "Silver"} of total  ${
              isGold === 0 ? gGramResult : sGramResult
            } gm `
          );
        } else {
          setErr(
            `You do not have a enough ${
              isGold === 0 ? "Gold" : "Silver"
            } to Sell `
          );
        }
      } else {
        setErr("");
      }
    }
    const GoldBuyRates = rateData.Data?.result?.data?.rates?.gBuy;
    const SilverBuyRates = rateData.Data?.result?.data?.rates?.sBuy;
    const GoldSellRates = rateData.Data?.result?.data?.rates?.gSell;
    const SilverSellRates = rateData.Data?.result?.data?.rates?.sSell;
    const TotalAmount =
      (parseFloat(active) === 0 && isGold === 0 && GoldBuyRates * quantity) ||
      (parseFloat(active) === 0 && isGold === 1 && SilverBuyRates * quantity) ||
      (parseFloat(active) === 1 && isGold === 0 && GoldSellRates * quantity) ||
      (parseFloat(active) === 1 && isGold === 1 && SilverSellRates * quantity);
    setValueType({
      ...valueType,
      valueinGm: quantity,
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
      });
    }
  }, [rateData]);

  const handleBlur = (e) => {
    // Set the position of the cursor
    const input = e.target;
    const position = input.value.indexOf(".");
    input.setSelectionRange(
      position === -1 ? input.value.length : position,
      position === -1 ? input.value.length : position + 1
    );
  };

  return (
    <>
      <div className="">
        <Spin size="large" spinning={loading || logLoading || digiLogLoading}>
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
                        }}
                        class={parseFloat(active) === 1 && "option-active"}
                      >
                        <h2>Sell</h2>
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
                        ]}
                        onFinish={handleClick}
                        className="buy-sell-tab-inner"
                      >
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
                                      // pattern="/^\d{1,3}(?:\.\d{0,4})?$/"
                                      // addonBefore="Grams"
                                      value={grams}
                                      type="number"
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
                                    {" "}
                                    <img
                                      alt=""
                                      src="/images/digigold-images/two-arrows.svg"
                                    />{" "}
                                  </span>
                                </div>
                                <div class="input-wrapper">
                                  <Form.Item name="amount" className="mb-0">
                                    <Input
                                      id="amount"
                                      onKeyDown={handleKeyDown}
                                      min={1}
                                      onWheel={(e) => e.target.blur()}
                                      value={amount}
                                      maxLength={8}
                                      max={180000}
                                      // addonBefore="Rs."
                                      type="number"
                                      name="amount"
                                      onChange={handleAmountChange}
                                      disabled={
                                        parseFloat(active) === 0 ? false : true
                                      }
                                      placeholder="Enter Amount"
                                      size="large"
                                      step={"any"}
                                      className="mb-0 disabled-input"
                                      style={{
                                        backgroundColor:
                                          parseFloat(active) !== 0 &&
                                          "#80808000",
                                      }}
                                    />
                                  </Form.Item>
                                </div>
                              </div>

                              <div class="buy-btn">
                                <button
                                  // disabled={amount < 1}
                                  htmlType="submit"
                                  size="large"
                                  type="primary"
                                  class={`${
                                    (amount < 1 && (amount || grams)) || err
                                      ? "btn-disable quick-buy"
                                      : "btn-primery quick-buy"
                                  } `}
                                >
                                  {parseFloat(active) === 0
                                    ? "Quick Buy"
                                    : "Quick Sell"}
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
        />
        {HowItWorks(setActive)}
        <DigiGoldSignup
          setIsDigiLogin={setIsDigiLogin}
          setStep={setStep}
          step={step}
        />
      </div>
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
            }

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
  {
    img: "delivery-icon.svg",
    title: "DELIVERY",
    route: "/vipsgold-delivery",
  },
  {
    img: "buy-icon.svg",
    title: "Gift",
    route: "/vipsgold-gift",
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
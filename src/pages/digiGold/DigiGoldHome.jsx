import { Button, Form, Input, InputNumber, Spin } from "antd";
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
import { getWalletBalance } from "../../redux/slices/payment/walletSlice";
import DigiGoldSignup from "./DigiGoldSignup";
import {
  digitPrecision,
  formatter,
  handleKeyDown,
  parser,
} from "../../constants";
import { MuiSnackBar } from "../../components/common";
import MyVault from "./MyVault";
import QuickService from "../../components/digiGold/QuickService";

export const HowItWorks = () => {
  return (
    <>
      {/* <!-- -- How it work section start -- --> */}
      <section class="digi-gold-section-wrapper digital-gold-services">
        <div class="container">
          <div class="digital-gold-section-head">
            <h1 class="section-head-title">How It works</h1>
          </div>
          {/* <!-- <div class="row"> --> */}

          <div class="digigold-work-box-outer">
            {howItWorkArr.map((e) => {
              return (
                <div class="digigold-work-box-inner">
                  <a href="#" class="digigold-work-div-outer">
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
                  </a>
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
const DigiGoldHome = ({ setActive, active }) => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDigiLogin, setIsDigiLogin] = useState("");
  const [isSnackBar, setIsSnackBar] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [amount, setAmount] = useState("");
  const [isGold, setIsGold] = useState(0); //0 for Gold 1 for Silver
  const [grams, setGrams] = useState("");
  const [err, setErr] = useState("");

  const [valueType, setValueType] = useState({
    valueinAmt: "",
    valueinGm: "",
    valType: "",
    username: "",
    password: "",
    metalType: "",
    type: "",
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

  const handleClick = () => {
    valueType.uniqueId = loggedInUser?.Id;
    valueType.username = loggedInUser?.UserName;
    valueType.password = loggedInUser?.TRXNPassword;
    valueType.type = active === 0 ? "buy" : "sell";
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
    if (loggedInUser) {
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
    const TaxInc =
      (parseFloat(
        isGold === 0
          ? rateData.Data.result.data.rates.gBuy
          : rateData.Data.result.data.rates.sBuy
      ) *
        taxRate) /
        parseFloat(100) +
      parseFloat(
        isGold === 0
          ? rateData.Data.result.data.rates.gBuy
          : rateData.Data.result.data.rates.sBuy
      );

    const inclTaxRate = digitPrecision(TaxInc, "amount");
    const qty = inclTaxAmount / inclTaxRate;
    const quantity = digitPrecision(qty, "quantity");
    setValueType({
      ...valueType,
      valueinAmt: e.target.value,
      valueinGm:
        e.target.value /
        (isGold === 0
          ? rateData.Data?.result?.data?.rates?.gBuy
          : rateData.Data?.result?.data?.rates?.sBuy),
      valType: "amount",
      metalType: isGold === 0 ? "gold" : "silver",
    });
    const gbuy = parseFloat(rateData.Data?.result?.data?.rates?.gBuy || 0);
    const gGST = parseFloat(rateData.Data?.result?.data?.rates?.gBuyGst || 0);
    const sbuy = parseFloat(rateData.Data?.result?.data?.rates?.sBuy || 0);
    const sGST = parseFloat(rateData.Data?.result?.data?.rates?.sBuyGst || 0);
    const gwithGST = gbuy + gGST;
    const swithGst = sbuy + sGST;
    const finalGrams = e.target.value / (isGold === 0 ? gwithGST : swithGst);

    const roundedNum = Math.round(finalGrams * 10000) / 10000;
    const str = roundedNum.toFixed(4);
    const ResultGrams = parseFloat(str);
    setGrams(quantity);
    setErr("");
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
    if (logData.Data) {
      if (active === 1 && gram > (isGold === 0 ? gGram : sGram)) {
        const roundedNum = Math.round(gGram * 10000) / 10000;
        const gGramStr = roundedNum.toFixed(4);
        const gGramResult = parseFloat(gGramStr);
        const sGramRounded = Math.round(sGram * 10000) / 10000;
        const sGramStr = sGramRounded.toFixed(4);
        const sGramResult = parseFloat(sGramStr);
        console.log(gram > gGram, "gram");
        // console.log(gGramResult, "gGramResult")
        setErr(
          ` You can sell up to ${isGold === 0 ? gGramResult : sGramResult} gm ${
            isGold === 0 ? "Gold" : "Silver"
          } of total  ${isGold === 0 ? gGramResult : sGramResult} gm `
        );
      } else {
        setErr("");
      }
    }

    const TotalAmount =
      (active === 0 &&
        isGold === 0 &&
        rateData.Data?.result?.data?.rates?.gBuy * value) ||
      (active === 0 &&
        isGold === 1 &&
        rateData.Data?.result?.data?.rates?.sBuy * value) ||
      (active === 1 &&
        isGold === 0 &&
        rateData.Data?.result?.data?.rates?.gSell * value) ||
      (active === 1 &&
        isGold === 1 &&
        rateData.Data?.result?.data?.rates?.sSell * value);
    setValueType({
      ...valueType,
      valueinGm: value,
      valueinAmt: TotalAmount,
      valType: "quantity",
      metalType: isGold === 0 ? "gold" : "silver",
    });
    const totalRound = Math.round(TotalAmount * 10000) / 10000;
    const strTotal = totalRound.toFixed(2);
    const totalResult = parseFloat(strTotal);
    // console.log(totalResult, "total Result")
    console.log(totalRound, "result");
    setAmount(totalResult || "");
    setErr("");
  };
  useEffect(() => {
    if (state) {
      setActive(state);
    }
  }, []);

  const regex = /^[0-9]*\.?[0-9]+$/;

  return (
    <>
      {/* <CommonTopNav setActive={setActive} /> */}
      <div className="">
        {/* <!-- body section start Now --> */}
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
                  {/* {loggedInUser && !logData?.Data && (
                    <div class="col-lg-7 mx-auto digigold-logintext">
                      <p class="digigold-logintext-title mt-2">
                        You are not Register on VIPS Gold
                      </p>
                      <button
                        onClick={() => dispatch(modalOpen())}
                        class="digigold-logintext-btn mt-2 btn-primery"
                      >
                        Register now
                      </button>
                    </div>
                  )}
                  {loggedInUser && logData?.Data && (
                    <div class="my-vault-wrapper">
                      <div class="col-lg-7 mx-auto">
                        <div class="my-vault-badge-wrapper">
                          <span class="my-vault-badge">My Vault</span>
                        </div>
                        <div class="my-vault-inner">
                          <div class="vault-value">
                            <p class="vault-value-text">Gold Grams</p>
                            <p class="vault-value-count mt-3">
                              {" "}
                              {logData.Data && !loading
                                ? logData.Data.GoldGrams?.toFixed(4)
                                : "0.0000"}{" "}
                              Grams
                            </p>
                          </div>
                          <div class="vertical-separator"></div>
                          <div class="vault-value">
                            <p class="vault-value-text">Silver Grams</p>
                            <p class="vault-value-count mt-3">
                              {" "}
                              {logData.Data && !loading
                                ? logData.Data.SilverGrams?.toFixed(4)
                                : "0.0000"}{" "}
                              Grams
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )} */}
                  <MyVault />

                  <div class="buy-sell-form-outer">
                    <div class="current-rate-outer">
                      <div class="current-rate">
                        <span class="current-rate-title mb-3">GOLD</span>
                        <span class="current-rate-amt">
                          &#x20B9;{" "}
                          {!loading && rateData
                            ? active === 0
                              ? rateData.Data?.result?.data?.rates?.gBuy
                              : rateData?.Data?.result?.data?.rates?.gSell
                            : "Loading..."}
                          / gm
                        </span>
                      </div>
                      <div class="digi-icon d-none d-md-block">
                        <img
                          src="/images/digigold-images/digi-icon.svg"
                          alt=""
                        />
                      </div>
                      <div className="vertical-separator d-md-none d-sm-block"></div>
                      <div class="current-rate">
                        <span class="current-rate-title mb-3">SILVER</span>
                        <span class="current-rate-amt">
                          {" "}
                          &#x20B9;{" "}
                          {!loading && rateData
                            ? active === 0
                              ? rateData?.Data?.result?.data?.rates?.sBuy
                              : rateData?.Data?.result?.data?.rates?.sSell
                            : "Loading..."}{" "}
                          / gm
                        </span>
                      </div>
                    </div>

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
                      {/* <!-- tab content start --> */}
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
                                  <Form.Item
                                    // hasFeedback
                                    className="mb-0"
                                    name={"grams"}
                                    // rules={[
                                    //   {
                                    //     required: true,
                                    //     message: "Please Enter Grams",
                                    //   },
                                    // ]}
                                  >
                                    <Input
                                      formatter={formatter}
                                      // onKeyDown={handleKeyDown2}
                                      className="mb-0 disabled-input"
                                      onWheel={(e) => e.target.blur()}
                                      parser={parser}
                                      min={0.0001}
                                      precision={4}
                                      // required
                                      addonBefore="Grams"
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
                                    // hasFeedback
                                    name="amount"
                                    className="mb-0"
                                    // rules={[
                                    //   {
                                    //     required: true,
                                    //     message: "Please Enter Amount",
                                    //   },
                                    // ]}
                                  >
                                    <Input
                                      onKeyDown={handleKeyDown}
                                      min={1}
                                      // required
                                      onWheel={(e) => e.target.blur()}
                                      value={amount}
                                      maxLength={8}
                                      max={180000}
                                      addonBefore="Rs."
                                      type="number"
                                      name="amount"
                                      onChange={handleAmountChange}
                                      disabled={active === 0 ? false : true}
                                      placeholder="Enter Amount"
                                      size="large"
                                      step={"any"}
                                      className="mb-0 disabled-input"
                                      style={{
                                        backgroundColor:
                                          active !== 0 && "#80808000",
                                      }}
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
                                  // disabled={amount < 1}
                                  htmlType="submit"
                                  size="large"
                                  type="primary"
                                  class={`${
                                    amount < 1 && (amount || grams)
                                      ? "btn-disable quick-buy"
                                      : "btn-primery quick-buy"
                                  } `}
                                >
                                  {active === 0 ? "Quick Buy" : "Quick Sell"}
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
                      {/* <!-- tab content end --> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Spin>

        {/* <section class="digi-gold-section-wrapper digital-gold-services">
          <div class="container">
            <div class="digigold-service-box-outer">
              {quickServiceArr.map((e) => {
                return (
                  <div class="digigold-service-box-inner">
                    <div class="digigold-service-div-outer">
                      <div class="digigold-service-div-box">
                        <div
                          onClick={() => {
                            setActive(e.buy);
                            window.scroll({ top: 0, behavior: "smooth" });
                          }}
                          class="digigold-service-icon"
                        >
                          <img
                            src={`images/digigold-images/${e.img}`}
                            alt="VIPS Gold Silver Services"
                            class="img-fluid digigold-service-img"
                          />
                        </div>

                        <div class="digigold-service-title">
                          <h3>{e.title}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section> */}
        <QuickService setActive={setActive} />
        {HowItWorks(setActive)}
        <DigiGoldSignup setIsDigiLogin={setIsDigiLogin} />
      </div>
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
    desc: " Buy Gold/Silver at the best market prices",
  },
  {
    img: "buy-sell.svg",
    title: "Buy / Sell Small",
    desc: "Buy Gold/Silver at the best market prices",
  },
  {
    img: "secured-vault.svg",
    title: "Secured Vault",
    desc: "Buy Gold/Silver at the best market prices",
  },
  {
    img: "request-delivery.svg",
    title: "Request Delivery",
    desc: "Buy Gold/Silver at the best market prices",
  },
  {
    img: "doorstep-delivery.svg",
    title: "Doorstep Delivery",
    desc: "Buy Gold/Silver at the best market prices",
  },
];

export default memo(DigiGoldHome);

import { Button, Form, Input, InputNumber } from "antd";
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/digigold/gold-home.css";
import {
  fetchGoldSilverRates,
  modalOpen,
} from "../../redux/slices/digiGold/digiGoldSlice";
import { loginDigiGold } from "../../redux/slices/digiGold/registerDigiSlice";
import { getWalletBalance } from "../../redux/slices/payment/walletSlice";
import DigiGoldSignup from "./DigiGoldSignup";

export const QuickService = () => {
  return (
    <>
      {/* <!-- -- digital gold services start -- --> */}
      <section class="section-align digital-gold-services">
        <div class="container">
          <div class="digigold-service-box-outer">
            {quickServiceArr.map((e) => {
              return (
                <div class="digigold-service-box-inner">
                  <div class="digigold-service-div-outer">
                    <div class="digigold-service-div-box">
                      <div class="digigold-service-icon">
                        <img
                          src={`/images/digigold-images/${e.img}`}
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
      </section>
      {/* <!-- digital gold services end --> */}
    </>
  );
};
export const HowItWorks = () => {
  return (
    <>
      {/* <!-- -- How it work section start -- --> */}
      <section class="section-align digital-gold-services">
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

const DigiGoldHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDigiLogin, setIsDigiLogin] = useState("");
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
  const [active, setActive] = useState(0); // 0 for Buy & 1 for Sell
  const { logData } = useSelector((state) => state.registerDigiSlice.login);
  const { loggedInUser } = useSelector(
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
    // valueType.taxes = rateData?.Data?.result?.data?.taxes;
    if (!loggedInUser) {
      navigate("/login");
    } else {
      if (rateData.ResponseStatus !== 0 && !loading && !err) {
        navigate("/digigold-order-summary", { state: valueType });
      } else {
        alert(`${err ? err : "Something Went Wrong"}`);
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
    dispatch(fetchGoldSilverRates());
  }, []);
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    setValueType({
      ...valueType,
      valueinAmt: e.target.value,
      valueinGm:
        e.target.value /
        (isGold === 0
          ? rateData.Data?.result?.data?.rates?.gBuy
          : rateData.Data?.result?.data?.rates?.sBuy),
      valType: "Amount",
      metalType: isGold === 0 ? "gold" : "silver",
    });
    const gbuy = parseFloat(rateData.Data?.result?.data?.rates?.gBuy || 0);
    const gGST = parseFloat(rateData.Data?.result?.data?.rates?.gBuyGst || 0);
    const sbuy = parseFloat(rateData.Data?.result?.data?.rates?.sBuy || 0);
    const sGST = parseFloat(rateData.Data?.result?.data?.rates?.sBuyGst || 0);
    const gwithGST = gbuy + gGST;
    const swithGst = sbuy + sGST;
    setGrams(e.target.value / (isGold === 0 ? gwithGST : swithGst));
  };
  const handleGramsChange = (e) => {
    setGrams(e.target.value);
    const gram = parseFloat(e.target.value);
    const gGram = parseFloat(logData?.Data?.GoldGrams);
    const sGram = parseFloat(logData?.Data?.SilverGrams);
    // console.log(gram > (isGold === 0 ? gGram : sGram), "hjgfdf")
    if (logData.Data) {
      if (active === 1 && gram > (isGold === 0 ? gGram : sGram)) {
        setErr(
          ` You can sell up to ${
            isGold === 0 ? gGram?.toFixed(4) : sGram?.toFixed(4)
          } gm ${isGold === 0 ? "Gold" : "Silver"} of total  ${
            isGold === 0 ? gGram?.toFixed(4) : sGram?.toFixed(4)
          } gm `
        );
      } else {
        setErr("");
      }
    }
console.log(err, "err")
    const TotalAmount =
      (active === 0 &&
        isGold === 0 &&
        rateData.Data?.result?.data?.rates?.gBuy * e.target.value) ||
      (active === 0 &&
        isGold === 1 &&
        rateData.Data?.result?.data?.rates?.sBuy * e.target.value) ||
      (active === 1 &&
        isGold === 0 &&
        rateData.Data?.result?.data?.rates?.gSell * e.target.value) ||
      (active === 1 &&
        isGold === 1 &&
        rateData.Data?.result?.data?.rates?.sSell * e.target.value);
    setValueType({
      ...valueType,
      valueinGm: e.target.value,
      valueinAmt: TotalAmount,
      valType: "Grams",
      metalType: isGold === 0 ? "gold" : "silver",
    });
    console.log(TotalAmount, "TotalAmount");
    setAmount(TotalAmount);
  };

  return (
    <>
      <div className="">
        {/* <!-- body section start --> */}

        <section class="section-align buy-sell-form">
          <div class="container">
            <div class="digital-gold-section-head">
              <h1 class="section-head-title">
                BUY <span>GOLD</span> & <span>SILVER</span> AT BEST PRICES
              </h1>
            </div>

            <div class="row">
              <div class="col-lg-12">
                {loggedInUser && !logData?.Data && (
                  <div class="col-lg-7 mx-auto digigold-logintext">
                    <p class="digigold-logintext-title mt-2">
                      You are not Register on DigiGold
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
                )}

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
                    <div class="digi-icon">
                      <img src="/images/digigold-images/digi-icon.svg" alt="" />
                    </div>
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
                      onClick={() => setActive(0)}
                      style={{ cursor: "pointer" }}
                      class={active === 0 && "option-active"}
                    >
                      <h2> Buy</h2>
                    </div>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => setActive(1)}
                      class={active === 1 && "option-active"}
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
                      class="buy-sell-tab-inner"
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
                              class="row mt-4 align-items-center"
                            >
                              <div class="input-wrapper">
                                <Form.Item
                                  name={"grams"}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please Enter Grams",
                                    },
                                  ]}
                                >
                                  <Input
                                    min={0}
                                    addonBefore="Grams"
                                    value={grams}
                                    type="number"
                                    name="grams"
                                    onChange={handleGramsChange}
                                    placeholder="Enter Grams"
                                    size="large"
                                    step={"any"}
                                    style={{ padding: 15 }}
                                  />
                                </Form.Item>
                                {/* <div class="input">
                                  <input
                                    id="grams"
                                    name="Grams"
                                    type="text"
                                    placeholder="&nbsp"
                                  />
                                  <label for="grams">Grams</label>
                                </div> */}
                              </div>
                              <div class="exchange-arrow-outer mb-4 text-center">
                                <span class="exchange-arrow ">
                                  {" "}
                                  <img
                                    alt=""
                                    style={{
                                      width: 40,
                                      marginLeft: 10,
                                      marginRight: 10,
                                    }}
                                    src="/images/digigold-images/two-arrows.svg"
                                  />{" "}
                                </span>
                              </div>
                              <div class="input-wrapper">
                                {/* <div class="input">
                                  <input
                                    id="amount"
                                    name="Amount"
                                    type="text"
                                    placeholder="&nbsp"
                                  />
                                  <label for="amount">Amount</label>
                                </div> */}
                                <Form.Item
                                  name="amount"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please Enter Amount",
                                    },
                                  ]}
                                >
                                  <Input
                                    min={1}
                                    value={amount}
                                    max={180000}
                                    addonBefore="Rs."
                                    type="number"
                                    name="amount"
                                    onChange={handleAmountChange}
                                    disabled={active === 0 ? false : true}
                                    placeholder="Enter Amount"
                                    size="large"
                                    step={"any"}
                                    style={{ padding: 15 }}
                                  />
                                </Form.Item>
                              </div>
                            </div>

                            <div class="buy-btn">
                              <Button
                                htmlType="submit"
                                size="large"
                                style={{
                                  backgroundColor: "#CA3060",
                                  height: 50,
                                  width: 150,
                                  fontWeight: "500",
                                }}
                                type="primary"
                                class="btn-primery quick-buy"
                              >
                                {active === 0 ? "Quick Buy" : "Quick Sell"}
                              </Button>
                              <p style={{ color: "red", marginTop: 20 }}>
                                {err}
                              </p>
                            </div>
                          </div>
                        </div>
                        {/* <div
                          class="tab-pane fade"
                          id="silverrate"
                          role="tabpanel"
                          aria-labelledby="silver-tab"
                        >
                          <div class="col-lg-12">
                            <div class="row align-items-center">
                              <div class="input-wrapper">
                                <div class="input">
                                  <input
                                    id="grams"
                                    name="Grams"
                                    type="text"
                                    placeholder="&nbsp"
                                  />
                                  <label for="grams">Grams</label>
                                </div>
                              </div>
                              <div class="exchange-arrow-outer text-center">
                                <span class="exchange-arrow">
                                  <img
                                    src="/images/digigold-images/two-arrows.svg"
                                    alt=""
                                  />
                                </span>
                              </div>
                              <div class="input-wrapper">
                                <div class="input">
                                  <input
                                    id="amount"
                                    name="Amount"
                                    type="text"
                                    placeholder="&nbsp"
                                  />
                                  <label for="amount">Amount</label>
                                </div>
                              </div>
                            </div>

                            <div class="buy-btn">
                              <button class="btn-primery quick-buy">
                                Quick Buy
                              </button>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </Form>
                    {/* <!-- tab content end --> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- body section end --> */}
        {QuickService()}
        {HowItWorks()}
        <DigiGoldSignup setIsDigiLogin={setIsDigiLogin} />
      </div>
    </>
  );
};

export const quickServiceArr = [
  {
    img: "buy-icon.svg",
    title: "BUY",
  },
  {
    img: "sell-icon.svg",
    title: "SELL",
  },
  {
    img: "sip-icon.svg",
    title: "SIP",
  },
  {
    img: "delivery-icon.svg",
    title: "DELIVERY",
  },
  {
    img: "my-orders-icon.svg",
    title: "MY ORDER",
  },
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

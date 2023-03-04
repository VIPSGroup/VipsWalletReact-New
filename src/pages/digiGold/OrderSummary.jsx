import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchGoldSilverRates } from "../../redux/slices/digiGold/digiGoldSlice";

const OrderSummary = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [goldRate, setGoldRate] = useState("");
  const [silverRate, setsilverRate] = useState("");
  const [goldGram, setGoldGram] = useState("");
  const [silverGram, setSilverGram] = useState("");
  console.log(state, "jj");
  const [counter, setCounter] = useState(300); // 5 minutes in seconds
  const [bye, setBuy] = useState(true); //default Buy , then Sell,
  const [totalAmount, setTotalAmount] = useState("");
  const [tax, setTax] = useState("");
  const { rateData, loading } = useSelector(
    (state) => state.digiGoldSlice.rates
  );
  useEffect(() => {
    const timer =
      counter > 0 &&
      setInterval(() => {
        setCounter(counter - 1);
      }, 1000);

    return () => clearInterval(timer);
  }, [counter]);
  useEffect(() => {
    if (counter === 0) {
      const fetchRates = async () => {
        const res = await dispatch(fetchGoldSilverRates());
        console.log(res, "res hai");
        setGoldRate(
          state.metalType === "gold" &&
            res.payload?.Data?.result?.data?.rates?.gBuy * state.valueinGm
        );
        setsilverRate(
          state.metalType === "silver" &&
            res.payload?.Data?.result?.data?.rates?.sBuy * state.valueinGm
        );
        if (state.valType === "Grams") {
          if (state.metalType === "gold") {
            setGoldGram(
              state.valueinAmt / res.payload.Data.result.data.rates.gBuy
            );
          } else {
            setSilverGram(
              state.valueinAmt / res.payload.Data.result.data.rates.sBuy
            );
          }
        } else {
          if (state.metalType === "gold") {
            setGoldRate(
              state.valueinAmt / res.payload.Data.result.data.rates.gBuy
            );
          } else {
            setsilverRate(
              state.valueinAmt / res.payload.Data.result.data.rates.sBuy
            );
          }
        }
      };
      setCounter(300);
      fetchRates();
    }
  }, [counter]);
  //   Counter Time Format
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };
  console.log(goldRate, "goldgram");
  return (
    <>
      <div className="">
        <section class="section-align buy-sell-form">
          <div class="container">
            <div class="digital-gold-section-head">
              <h1 class="section-head-title">Order Summary</h1>
            </div>

            <div class="row">
              <div class="col-lg-12">
                <div class="my-vault-wrapper">
                  <div class="col-lg-7 mx-auto">
                    <div class="my-vault-badge-wrapper">
                      <span class="my-vault-badge">My Vault</span>
                    </div>
                    <div class="my-vault-inner">
                      <div class="vault-value">
                        <p class="vault-value-text">Gold Grams</p>
                        <p class="vault-value-count mt-3">0.0000 Grams</p>
                      </div>
                      <div class="vertical-separator"></div>
                      <div class="vault-value">
                        <p class="vault-value-text">Silver Grams</p>
                        <p class="vault-value-count mt-3">0.0000 Grams</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="buy-sell-form-outer">
                  <div class="current-rate-outer">
                    <div class="current-rate">
                      <span class="current-rate-title mb-3">GOLD</span>
                      <span class="current-rate-amt">
                        &#x20B9;{" "}
                        {!loading && rateData
                          ? bye
                            ? rateData.Data?.result?.data?.rates?.gBuy
                            : rateData.Data.result?.data?.rates?.gSell
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
                          ? bye
                            ? rateData.Data.result.data.rates.sBuy
                            : rateData.Data.result.data.rates.sSell
                          : "Loading..."}{" "}
                        / gm
                      </span>
                    </div>
                  </div>

                  <div class="digigold-order-summery">
                    <div class="row digigold-insert-value">
                      <div class="col-lg-12 mt-5 mb-5">
                        <p class="digigold-insert-title">
                          This prices will be valid for :{" "}
                          <span>{formatTime(counter)}</span>{" "}
                        </p>
                      </div>
                      <div class="col-lg-3">
                        <p class="digigold-insert-darktext">Quantity (gms)</p>
                        <p class="digigold-insert-amt">
                          {/* &#x20B9;{" "} */}
                          {state.metalType === "gold"
                            ? goldRate && state.valType !== "Grams"
                              ? goldRate
                              : state?.valueinGm
                            : silverRate && state.valType !== "Grams"
                            ? silverRate
                            : state?.valueinGm}{" "}
                          Grams
                        </p>
                      </div>
                      <div class="col-lg-3">
                        <p class="digigold-insert-darktext">Amount</p>
                        <p class="digigold-insert-amt">
                          &#x20B9;{" "}
                          {state.metalType === "gold"
                            ? goldRate && state.valType !== "Amount"
                              ? goldRate
                              : state?.valueinAmt
                            : silverRate && state.valType !== "Amount"
                            ? silverRate
                            : state?.valueinAmt}
                        </p>
                      </div>
                      <div class="col-lg-3">
                        <p class="digigold-insert-darktext">Tax</p>
                        <p class="digigold-insert-amt">&#x20B9; 0.03</p>
                      </div>
                      <div class="col-lg-3">
                        <p class="digigold-insert-darktext">Total Payable</p>
                        <p class="digigold-insert-amt">&#x20B9; 1.00</p>
                      </div>
                    </div>

                    <div class="row digigold-payble-value">
                      <div class="col-lg-12">
                        <p class="digigold-payble-darktest">Amount Payable</p>
                        <p class="digigold-payble-amt"> &#x20B9; 1.00</p>
                      </div>
                    </div>

                    <div class="digigold-payment-method">
                      <p class="digigold-payment-title"> Payment method </p>

                      <div class="digigold-payment-discount  box-shadow-1">
                        <p class="digigold-paymethod-title">Debit From </p>
                        <div class="digigold-paymet-discount-info mb-4">
                          <div class="col-lg-8 p-0">
                            <div class="custom-control custom-checkbox checkStyle">
                              <input
                                type="checkbox"
                                class="custom-control-input"
                                id="vips-wallet"
                              />
                              <label
                                class="custom-control-label"
                                for="vips-wallet"
                              >
                                <img
                                  alt=""
                                  src="/images/digigold-images/mob-payment-discount.png"
                                  class="img-fluid digigold-payment-discount-img"
                                />{" "}
                                Shopping Point (65044.62)
                              </label>
                            </div>
                          </div>
                          <div class="col-lg-4 p-0">
                            <p class="digigold-paymet-discount-amt">
                              {" "}
                              &#x20B9; 5.00{" "}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* <!-- <div class="digigold-paymet-info-outer"> --> */}
                      <div class="digigold-payment-discount box-shadow-1">
                        <p class="digigold-paymethod-title">Debit From </p>
                        <div class="digigold-paymet-discount-info mb-4">
                          <div class="col-lg-8 p-0">
                            <div class="custom-control custom-checkbox checkStyle">
                              <input
                                type="checkbox"
                                class="custom-control-input"
                                id="vips-wallet"
                              />
                              <label
                                class="custom-control-label"
                                for="vips-wallet"
                              >
                                <img
                                  alt=""
                                  src="/images/digigold-images/vips-logo-small.png"
                                  class="img-fluid digigold-payment-debit-vips"
                                />{" "}
                                VIPS Wallet (₹ 5,72,93,773.35)
                              </label>
                            </div>
                          </div>
                          <div class="col-lg-4 p-0">
                            <p class="digigold-paymet-discount-amt">
                              {" "}
                              &#x20B9; 99.00{" "}
                            </p>
                          </div>
                        </div>

                        <div class="digigold-paymet-discount-info">
                          <div class="col-lg-8 p-0">
                            <div class="custom-control custom-checkbox checkStyle">
                              <input
                                type="checkbox"
                                class="custom-control-input"
                                id="payu-card"
                              />
                              <label
                                class="custom-control-label"
                                for="payu-card"
                              >
                                <img
                                  alt=""
                                  src="/images/digigold-images/payu-logo.png"
                                  class="img-fluid digigold-payment-debit-payu"
                                />{" "}
                                Payu (card / UPI)
                              </label>
                            </div>
                          </div>
                          <div class="col-lg-4 p-0">
                            <p class="digigold-paymet-Prime-amt">
                              {" "}
                              &#x20B9; 0.00{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* <!-- </div>  --> */}
                    </div>

                    <div class="digigold-order-proceed">
                      <button class="btn btn-primery"> Proceed to Pay</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default OrderSummary;

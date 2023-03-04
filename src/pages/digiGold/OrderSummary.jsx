import { message, Modal, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LatestLoading } from "../../components/common/Loading";
import {
  BuyDigiGold,
  fetchGoldSilverRates,
} from "../../redux/slices/digiGold/digiGoldSlice";
import { loginDigiGold } from "../../redux/slices/digiGold/registerDigiSlice";
import { getWalletBalance } from "../../redux/slices/payment/walletSlice";
import "../../assets/styles/digigold/sell-order-summery.css";

const OrderSummary = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [totalAmount, setTotalAmount] = useState("");
  const [lockprice, setLockPrice] = useState();
  const [load, setLoad] = useState(false);
  const [response, setResponse] = useState();
  const [tax, setTax] = useState("");
  const [modal, setModal] = useState(false);
  const [currentRate, setCurrentRate] = useState("");
  const [currentGram, setCurrentGram] = useState("");
  const [blockId, setBlockId] = useState("");
  const [counter, setCounter] = useState(300); // 5 minutes in seconds
  const [bye, setBuy] = useState(true); //default Buy , then Sell,
  const { rateData, loading } = useSelector(
    (state) => state.digiGoldSlice.rates
  );
  const { logData } = useSelector((state) => state.registerDigiSlice.login);
  const { data, loading: walletLoad } = useSelector(
    (state) => state.walletSlice.walletBalance
  );
  useEffect(() => {
    if (counter === 0 || counter === 300) {
      const fetchRates = async () => {
        const res = await dispatch(fetchGoldSilverRates());
        console.log(res, "res");
        if (state.metalType === "gold") {
          setLockPrice(res.payload.Data.result.data.rates.gBuy);
          if (state.valType === "Grams") {
            setCurrentRate(
              parseFloat(
                state.valueinGm * res.payload.Data.result.data.rates.gBuy
              )
            );
            setCurrentGram(parseFloat(state.valueinGm));
            setBlockId(res.payload.Data.result.data.blockId);
            setTax(
              parseFloat(
                ((state.valueinGm * res.payload.Data.result.data.rates.gBuy) /
                  100) *
                  3
              )
            );
            setTotalAmount(
              parseFloat(
                ((state.valueinGm * res.payload.Data.result.data.rates.gBuy) /
                  100) *
                  3 +
                  state.valueinGm * res.payload.Data.result.data.rates.gBuy
              )
            );
          } else {
            const gBuy = parseFloat(res.payload.Data.result.data.rates.gBuy);
            const gBuyGst = parseFloat(
              res.payload.Data.result.data.rates.gBuyGst
            );
            setCurrentGram(parseFloat(state.valueinAmt / (gBuy + gBuyGst)));
            setBlockId(res.payload.Data.result.data.blockId);
            const ggram = parseFloat(state.valueinAmt / (gBuy + gBuyGst));
            const Gprice = parseFloat(res.payload.Data.result.data.rates.gBuy);
            const ActualPrice = ggram * Gprice;
            setCurrentRate(parseFloat(ActualPrice));
            const taxesprice = parseFloat(state.valueinAmt) - ActualPrice;
            setTax(parseFloat(taxesprice));
          }
        } else {
          setLockPrice(res.payload.Data.result.data.rates.sBuy);
          if (state.valType === "Grams") {
            setCurrentRate(
              parseFloat(
                state.valueinGm * res.payload.Data.result.data.rates.sBuy
              )
            );
            setCurrentGram(parseFloat(state.valueinGm));
            setBlockId(res.payload.Data.result.data.blockId);
            setTax(
              parseFloat(
                ((state.valueinGm * res.payload.Data.result.data.rates.sBuy) /
                  100) *
                  3
              )
            );
            setTotalAmount(
              parseFloat(
                ((state.valueinGm * res.payload.Data.result.data.rates.sBuy) /
                  100) *
                  3 +
                  state.valueinGm * res.payload.Data.result.data.rates.sBuy
              )
            );
          } else {
            const sBuy = parseFloat(res.payload.Data.result.data.rates.sBuy);
            const sBuyGst = parseFloat(
              res.payload.Data.result.data.rates.sBuyGst
            );
            setCurrentGram(parseFloat(state.valueinAmt / (sBuy + sBuyGst)));

            setBlockId(res.payload.Data.result.data.blockId);
            const Sgram = parseFloat(state.valueinAmt / (sBuy + sBuyGst));
            const Cprice = parseFloat(res.payload.Data.result.data.rates.sBuy);
            const ActualPrice = Sgram * Cprice;

            setCurrentRate(parseFloat(ActualPrice));
            const taxesprice = parseFloat(state.valueinAmt) - ActualPrice;
            setTax(parseFloat(taxesprice));
          }
        }
      };
      setCounter(300);
      fetchRates();
    }
  }, [counter]);
  useEffect(() => {
    const timer =
      counter > 0 &&
      setInterval(() => {
        setCounter(counter - 1);
      }, 1000);

    return () => clearInterval(timer);
  }, [counter]);
  useEffect(() => {
    // if (counter === 0) {
    //   notification.success({
    //     message: "Price is Update",
    //     placement: "bottomRight",
    //     duration: 4,
    //     type: "info",
    //     // icon : false
    //     closeIcon: false,
    //     icon: false,
    //   });
    //   const fetchRates = async () => {
    //     const res = await dispatch(fetchGoldSilverRates());
    //     setGoldRate(
    //       state.metalType === "gold" &&
    //         res.payload?.Data?.result?.data?.rates?.gBuy * state.valueinGm
    //     );
    //     setsilverRate(
    //       state.metalType === "silver" &&
    //         res.payload?.Data?.result?.data?.rates?.sBuy * state.valueinGm
    //     );
    //     if (state.valType === "Grams") {
    //       if (state.metalType === "gold") {
    //         setGoldGram(
    //           state.valueinAmt / res.payload.Data.result.data.rates.gBuy
    //         );
    //       } else {
    //         setSilverGram(
    //           state.valueinAmt / res.payload.Data.result.data.rates.sBuy
    //         );
    //       }
    //     } else {
    //       if (state.metalType === "gold") {
    //         setGoldRate(
    //           state.valueinAmt / res.payload.Data.result.data.rates.gBuy
    //         );
    //       } else {
    //         setsilverRate(
    //           state.valueinAmt / res.payload.Data.result.data.rates.sBuy
    //         );
    //       }
    //     }
    //   };
    //   setCounter(30);
    //   fetchRates();
    // }
  }, [counter]);
  useEffect(() => {
    const username = state?.username;
    const password = state?.password;
    dispatch(loginDigiGold({ username, password }));
    dispatch(getWalletBalance({ username, password }));
  }, [load]);
  const handleClose = () => {
    setModal(false);
    navigate("/digigold");
  };
  //   Counter Time Format
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };
  const handleSubmit = async () => {
    setLoad(true);
    const username = state.username;
    const password = state.password;
    const lockPrice = lockprice;
    const metalType = state.metalType;
    const quantity = currentGram;
    const blockid = blockId;
    const amount = totalAmount ? totalAmount : state.valueinAmt;
    const type = state.valType;
    const res = await BuyDigiGold({
      username,
      password,
      lockPrice,
      metalType,
      quantity,
      blockid,
      amount,
      type,
    });
    if (res.ResponseStatus === 1) {
      dispatch(loginDigiGold);
      setResponse(res.Data.message);
      setLoad(false);
      setModal(true);
    }
  };

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
                        <p class="vault-value-count mt-3">
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
                          {logData.Data && !loading
                            ? logData.Data.SilverGrams?.toFixed(4)
                            : "0.0000"}{" "}
                          Grams
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {!load ? (
                  <div class="buy-sell-form-outer">
                    <div class="current-rate-outer">
                      <div class="current-rate">
                        <span class="current-rate-title mb-3">GOLD</span>
                        <span class="current-rate-amt">
                          &#x20B9;{" "}
                          {!loading && rateData
                            ? bye
                              ? rateData?.Data?.result?.data?.rates?.gBuy
                              : rateData?.Data.result?.data?.rates?.gSell
                            : "Loading..."}
                          / gm
                        </span>
                      </div>
                      <div class="digi-icon">
                        <img
                          src="/images/digigold-images/digi-icon.svg"
                          alt=""
                        />
                      </div>
                      <div class="current-rate">
                        <span class="current-rate-title mb-3">SILVER</span>
                        <span class="current-rate-amt">
                          {" "}
                          &#x20B9;{" "}
                          {!loading && rateData
                            ? bye
                              ? rateData?.Data?.result?.data?.rates?.sBuy
                              : rateData?.Data?.result?.data?.rates?.sSell
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
                            {/* {state.metalType === "gold"
                            ? goldRate && state.valType !== "Grams"
                              ? goldRate
                              : state?.valueinGm
                            : silverRate && state.valType !== "Grams"
                            ? silverRate
                            : state?.valueinGm}{" "} */}
                            {currentGram && currentGram?.toFixed(4)} Grams
                          </p>
                        </div>
                        <div class="col-lg-3">
                          <p class="digigold-insert-darktext">Amount</p>
                          <p class="digigold-insert-amt">
                            &#x20B9;{" "}
                            {/* {state.metalType === "gold"
                            ? goldRate && state.valType !== "Amount"
                              ? goldRate
                              : state?.valueinAmt
                            : silverRate && state.valType !== "Amount"
                            ? silverRate
                            : state?.valueinAmt} */}
                            {currentRate && currentRate.toFixed(2)}
                          </p>
                        </div>
                        <div class="col-lg-3">
                          <p class="digigold-insert-darktext">Tax</p>
                          <p class="digigold-insert-amt">
                            &#x20B9; {tax && tax.toFixed(2)}
                          </p>
                        </div>
                        <div class="col-lg-3">
                          <p class="digigold-insert-darktext">Total Payable</p>
                          <p class="digigold-insert-amt">
                            &#x20B9;{" "}
                            {totalAmount
                              ? totalAmount.toFixed(2)
                              : state?.valueinAmt}
                          </p>
                        </div>
                      </div>

                      <div class="row digigold-payble-value">
                        <div class="col-lg-12">
                          <p class="digigold-payble-darktest">Amount Payable</p>
                          <p class="digigold-payble-amt">
                            {" "}
                            &#x20B9;{" "}
                            {totalAmount
                              ? totalAmount.toFixed(2)
                              : state?.valueinAmt}
                          </p>
                        </div>
                      </div>

                      <div class="digigold-payment-method">
                        <p class="digigold-payment-title"> Payment method </p>

                        {/* <div class="digigold-payment-discount  box-shadow-1">
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
                      </div> */}

                        {/* <!-- <div class="digigold-paymet-info-outer"> --> */}
                        <div class="digigold-payment-discount box-shadow-1">
                          <p class="digigold-paymethod-title">Debit From </p>
                          <div class="digigold-paymet-discount-info mb-4">
                            <div class="col-lg-8 p-0">
                              <div class="custom-control custom-checkbox checkStyle">
                                <input
                                  type="checkbox"
                                  checked
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
                                  VIPS Wallet ( &#x20B9;{" "}
                                  {data.Data && !walletLoad
                                    ? data.Data.Balance
                                    : "Loading..."}
                                  )
                                </label>
                                {/* {data.Data &&
                                  !walletLoad &&
                                  data.Data.Balance < totalAmount && (
                                   
                                  )} */}

                                {data.Data &&
                                  !walletLoad &&
                                  (data.Data.Balance < totalAmount
                                    ? totalAmount
                                    : state?.valueinAmt) && (
                                    <Link
                                      to={"/addMoney/options"}
                                      style={{
                                        backgroundColor: "blue ",
                                        color: "white",
                                        marginLeft: 20,
                                        fontSize: 15,
                                        padding: 3,
                                        borderRadius: 5,
                                        outline: "none",
                                        textDecoration: "none",
                                        cursor: "pointer",
                                      }}
                                    >
                                      Add Money
                                    </Link>
                                  )}
                              </div>
                            </div>
                            <div class="col-lg-4 p-0">
                              <p class="digigold-paymet-discount-amt">
                                {" "}
                                &#x20B9;{" "}
                                {totalAmount
                                  ? totalAmount.toFixed(2)
                                  : state?.valueinAmt}{" "}
                              </p>
                            </div>
                          </div>

                          {/* <div class="digigold-paymet-discount-info">
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
                        </div> */}
                        </div>
                        {/* <!-- </div>  --> */}
                      </div>
                      {/* Digi Gold Bank Details */}
                      <div class="digigold-bank-details">
                        <p class="digigold-payment-title">
                          {" "}
                          Bank Account Details{" "}
                        </p>

                        <div class="container">
                          <div class="row">
                            <div class="col-lg-6 col-md-6">
                              <div class="floating-input-wrapper">
                                <select
                                  class="floating-select-wraper"
                                  onclick="this.setAttribute('value', this.value);"
                                  onchange="this.setAttribute('value', this.value);"
                                  value=""
                                >
                                  <option value=""></option>
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                </select>
                                <label class="floating-label-name">
                                  Bank Name *{" "}
                                </label>
                              </div>
                            </div>

                            <div class="col-lg-6 col-md-6">
                              <div class="floating-input-wrapper">
                                <input
                                  class="floating-input-box"
                                  type="text"
                                  placeholder=" "
                                />
                                <label class="floating-label-name">
                                  Bank Account Number *
                                </label>
                              </div>
                            </div>

                            <div class="col-lg-6 col-md-6">
                              <div class="floating-input-wrapper">
                                <input
                                  class="floating-input-box"
                                  type="text"
                                  placeholder=" "
                                />
                                <label class="floating-label-name">
                                  Account Holder Name *
                                </label>
                              </div>
                            </div>

                            <div class="col-lg-6 col-md-6">
                              <div class="floating-input-wrapper">
                                <input
                                  class="floating-input-box"
                                  type="text"
                                  placeholder=" "
                                />
                                <label class="floating-label-name">
                                  IFSC Code *
                                </label>
                              </div>
                            </div>
                          </div>

                          <div class="row justify-content-center">
                            <div class="col-lg-7 user-bank-details shadow-light">
                              <div class="row">
                                <div class="col-9 col-md-9">
                                  <span class="text-gray">Bank Name :</span>
                                  <span>UNION BANK OF INDIA</span>
                                </div>
                                <div class="col-3 col-md-3 px-0 px-md-3 text-right">
                                  <button class="edit-bank-details">
                                    {" "}
                                    <img src="/images/digigold-images/edit-icon.svg" />{" "}
                                    Edit{" "}
                                  </button>
                                </div>
                              </div>

                              <div class="row">
                                <div class="col-12">
                                  <span class="text-gray">
                                    Bank Account Number :
                                  </span>
                                  <span>525332465552595</span>
                                </div>
                              </div>

                              <div class="row">
                                <div class="col-12">
                                  <span class="text-gray">IFSC Code :</span>
                                  <span>UBIN0555002</span>
                                </div>
                              </div>

                              <div class="row">
                                <div class="col-12">
                                  <span class="text-gray">
                                    Account Holder Name :
                                  </span>
                                  <span>Supriya Morade</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="digigold-order-proceed">
                        <button onClick={handleSubmit} class="btn btn-primery">
                          {" "}
                          Proceed to Pay
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <LatestLoading />
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
      <Modal
        footer={[<button></button>]}
        onCancel={handleClose}
        centered
        maskClosable={false}
        open={modal}
      >
        {/* <div class="buy-sell-form-outer"> */}
        <div class="digigold-order-success text-center">
          <img
            src="/images/digigold-images/check-green.svg"
            class="img img-fluid check-green-img"
          />
          <p
            style={{ fontWeight: "700", fontSize: 20 }}
            class="digigold-success-title mt-3 "
          >
            CONGRATULATIONS!
          </p>
          <p class="success-note">{response}</p>
          <div class="digigold-success-btn">
            {/* <button class="btn btn-gray">View Details</button> */}
            <button class="btn btn-primery">Go to my Orders</button>
          </div>
          <p class="success-note mb-5 mt-4">
            Note: Gold/ Silver once purchased can be sold after 48 hours
          </p>
        </div>
        {/* </div> */}
      </Modal>
    </>
  );
};

export default OrderSummary;

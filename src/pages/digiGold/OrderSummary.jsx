import { Button, Col, Form, Input, Modal, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { LatestLoading } from "../../components/common/Loading";

import {
  BuyDigiGold,
  fetchGoldSilverRates,
  GetUserBankList,
  SellDigiGold,
  UpdateBankAccountDetails,
  UserbankAccountCreate,
} from "../../redux/slices/digiGold/digiGoldSlice";
import { loginDigiGold } from "../../redux/slices/digiGold/registerDigiSlice";
import { getWalletBalance } from "../../redux/slices/payment/walletSlice";
import "../../assets/styles/digigold/sell-order-summery.css";
import OTPInput, { ResendOTP } from "otp-input-react";
import { FaHashtag, FaUser } from "react-icons/fa";

import {
  handleKeyPressForName,
  handleMobileKeyPress,
} from "../../constant/Constants";
import { CommonTopNav } from "../../components/layout/Header";
import { MuiSnackBar } from "../../components/common";
import MyVault from "./MyVault";

const OrderSummary = ({ setIsCommonTopNav }) => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();

  const [totalAmount, setTotalAmount] = useState("");
  const [step, setStep] = useState(0);
  const [editAddress, setEditAddress] = useState(false);
  const [lockprice, setLockPrice] = useState();
  const [load, setLoad] = useState(false);
  const [response, setResponse] = useState();
  const [isSnackBar, setIsSnackBar] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [tax, setTax] = useState("");
  const [modal, setModal] = useState(false);
  const [currentRate, setCurrentRate] = useState("");
  const [currentGram, setCurrentGram] = useState("");
  const [blockId, setBlockId] = useState("");
  const [counter, setCounter] = useState(300); // 5 minutes in seconds
  const [walletShow, setWalletShow] = useState(false);
  const [otp, setOtp] = useState("");
  const [formValue, setFormValue] = useState({
    accountNumber: "",
    accountName: "",
    ifscCode: "",
  });
  const { rateData, loading } = useSelector(
    (state) => state.digiGoldSlice.rates
  );
  const { list, loading: listLoad } = useSelector(
    (state) => state.digiGoldSlice.bankList
  );
  const { logData, loading: digiLogLoading } = useSelector(
    (state) => state.registerDigiSlice.login
  );
  const { data, loading: walletLoad } = useSelector(
    (state) => state.walletSlice.walletBalance
  );

  function getFixedDecimalNumber(input, precision) {
    if (input.toString().split(".").pop().length > precision) {
      return parseFloat(
        input
          .toString()
          .substring(0, input.toString().indexOf(".") + precision + 1)
      );
    } else {
      return input;
    }
  }
  // Amount Round
  function digitPrecision(data, type) {
    if (type === "amount") {
      const amt = parseFloat(data);
      return amt.toFixed(2);
    } else if (type === "quantity") {
      console.log(data, "data");
      return getFixedDecimalNumber(data, 4);
    } else {
      return data;
    }
  }
  // Complete Login is this UseEffect
  useEffect(() => {
    if (counter === 0 || counter === 300) {
      const fetchRates = async () => {
        const res = await dispatch(fetchGoldSilverRates());

        const taxRate =
          parseFloat(res.payload.Data.result.data.taxes[0].taxPerc) +
          parseFloat(res.payload.Data.result.data.taxes[1].taxPerc);

        if (state?.type === "buy") {
          if (state?.metalType === "gold") {
            setLockPrice(res.payload.Data.result.data.rates.gBuy);
            setBlockId(res.payload.Data.result.data.blockId);
            if (state?.valType === "quantity") {
              const quantity = digitPrecision(state?.valueinGm, "quantity");
              const excTaxAmount =
                quantity * res.payload.Data.result.data.rates.gBuy;
              const exclTaxRate = digitPrecision(excTaxAmount, "amount");
              const TaxTotal = (exclTaxRate * taxRate) / 100;
              const totalTax = digitPrecision(TaxTotal, "amount");

              const TotalAmount =
                parseFloat(exclTaxRate) + parseFloat(totalTax);
              const inclTaxAmount = digitPrecision(TotalAmount, "amount");
              setCurrentGram(quantity);
              setTax(totalTax);
              setCurrentRate(exclTaxRate);
              setTotalAmount(inclTaxAmount);
            } else {
              const amount = state?.valueinAmt;
              const inclTaxAmount = digitPrecision(amount, "amount");
              const TaxTotal = (inclTaxAmount * taxRate) / (100 + taxRate);
              const totalTax = digitPrecision(TaxTotal, "amount");
              const exclTaxAmount = digitPrecision(
                inclTaxAmount - totalTax,
                "amount"
              );
              const TaxInc =
                (parseFloat(res.payload.Data.result.data.rates.gBuy) *
                  taxRate) /
                  parseFloat(100) +
                parseFloat(res.payload.Data.result.data.rates.gBuy);

              const inclTaxRate = digitPrecision(TaxInc, "amount");
              const qty = inclTaxAmount / inclTaxRate;
              const quantity = digitPrecision(qty, "quantity");
              setCurrentGram(quantity);
              setTotalAmount(inclTaxAmount);
              setCurrentRate(exclTaxAmount);
              setTax(totalTax);
            }
          } else {
            setBlockId(res.payload.Data.result.data.blockId);
            setLockPrice(res.payload.Data.result.data.rates.sBuy);
            if (state?.valType === "quantity") {
              const quantity = digitPrecision(state?.valueinGm, "quantity");
              const excTaxAmount =
                quantity * res.payload.Data.result.data.rates.sBuy;
              const exclTaxRate = digitPrecision(excTaxAmount, "amount");
              console.log(exclTaxRate, "exclTaxRate");
              const TaxTotal = (exclTaxRate * taxRate) / 100;
              const totalTax = digitPrecision(TaxTotal, "amount");

              const TotalAmount =
                parseFloat(exclTaxRate) + parseFloat(totalTax);
              const inclTaxAmount = digitPrecision(TotalAmount, "amount");

              setCurrentGram(quantity);
              setTax(totalTax);
              setCurrentRate(exclTaxRate);
              setTotalAmount(inclTaxAmount);
            } else {
              const amount = state?.valueinAmt;
              const inclTaxAmount = digitPrecision(amount, "amount");
              const TaxTotal = (inclTaxAmount * taxRate) / (100 + taxRate);
              const totalTax = digitPrecision(TaxTotal, "amount");
              const exclTaxAmount = digitPrecision(
                inclTaxAmount - totalTax,
                "amount"
              );
              const TaxInc =
                (parseFloat(res.payload.Data.result.data.rates.sBuy) *
                  taxRate) /
                  parseFloat(100) +
                parseFloat(res.payload.Data.result.data.rates.sBuy);

              const inclTaxRate = digitPrecision(TaxInc, "amount");
              const qty = inclTaxAmount / inclTaxRate;
              const quantity = digitPrecision(qty, "quantity");
              setCurrentGram(quantity);
              setTotalAmount(inclTaxAmount);
              setCurrentRate(exclTaxAmount);
              setTax(totalTax);
            }
          }
        } else {
          if (state?.metalType === "gold") {
            setBlockId(res.payload.Data.result.data.blockId);
            setLockPrice(res?.payload?.Data?.result?.data?.rates?.gSell);
            if (state.valType === "quantity") {
              const quantity = digitPrecision(state?.valueinGm, "quantity");
              const totalAmount = digitPrecision(
                quantity * res?.payload?.Data?.result?.data?.rates?.gSell,
                "amount"
              );
              setBlockId(res.payload.Data.result.data.blockId);
              setCurrentRate(totalAmount);
              setCurrentGram(quantity);
              setTotalAmount(totalAmount);
            }
          } else {
            setBlockId(res.payload.Data.result.data.blockId);
            setLockPrice(res?.payload?.Data?.result?.data?.rates?.sSell);
            if (state.valType === "quantity") {
              const quantity = digitPrecision(state?.valueinGm, "quantity");
              const totalAmount = digitPrecision(
                quantity * res?.payload?.Data?.result?.data?.rates?.sSell,
                "amount"
              );
              setBlockId(res.payload.Data.result.data.blockId);
              setCurrentRate(totalAmount);
              setCurrentGram(quantity);
              setTotalAmount(totalAmount);
            }
          }
        }
      };
      setCounter(300);
      fetchRates();
    }
    const timer =
      counter > 0 &&
      state?.type === "buy" &&
      setInterval(() => {
        setCounter(counter - 1);
      }, 1000);

    return () => clearInterval(timer);
  }, [counter]);

  // Counter Logic
  // Login & GetWalletBalance Logic
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
  // Get User Bank Details logic
  useEffect(() => {
    const username = state?.username;
    const password = state?.password;
    dispatch(GetUserBankList({ username, password }));
  }, [state]);
  // If Wallet Balance is Lower Than Total Amount Logic
  useEffect(() => {
    const Balance = !walletLoad && data?.Data?.Balance;
    const Total = totalAmount ? totalAmount : state?.valueinAmt;
    if (parseFloat(Balance) < parseFloat(Total)) {
      setWalletShow(true);
    } else {
      setWalletShow(false);
    }
  }, [data]);
  //   Counter Time Format
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };
  const handleSubmit = async () => {
    const username = state.username;
    const password = state.password;
    const lockPrice = lockprice;
    const metalType = state.metalType;
    const roundedCurrent = Math.round(currentGram * 10000) / 10000;
    const str = roundedCurrent.toFixed(4);
    const result = parseFloat(str);
    const quantity = result;
    const blockid = blockId;
    const amount = totalAmount ? totalAmount : state.valueinAmt;
    const type = state.valType;
    if (!walletShow) {
      setLoad(true);
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
        if (res.Data.statusCode === 200) {
          dispatch(loginDigiGold);
          setResponse(res.Data.message);
          setLoad(false);
          setModal(true);
        }
      } else if (res.ResponseStatus === 0) {
        setLoad(false);
        for (const key in res.Data.errors) {
          for (const iterator of res.Data.errors[key]) {
            setIsSnackBar(true);
            setErrorMsg(iterator.message);
            setSuccessMsg("");
          }
        }
      }
    }
  };
  // Gold & Silver Sell Logic
  const handleSellSubmit = async () => {
    const username = state.username;
    const password = state.password;
    const lockPrice = lockprice;
    const metalType = state.metalType;
    const quantity = currentGram;
    const blockid = blockId;
    const userBankId = list.Data && list.Data.result[0].userBankId;
    const accountName = list.Data && list.Data.result[0].accountName;
    const accountNumber = list.Data && list.Data.result[0].accountNumber;
    const ifscCode = list.Data && list.Data.result[0].ifscCode;
    const OTP = otp;

    const res = await SellDigiGold({
      username,
      password,
      lockPrice,
      metalType,
      quantity,
      blockid,
      userBankId,
      accountName,
      accountNumber,
      ifscCode,
      OTP,
    });
    if (res.ResponseStatus === 2) {
      setStep(1);
    }
    if (res.ResponseStatus === 1) {
      if (res.Data.statusCode === 200) {
        setStep(0);
        setResponse(
          `Successfully Sold ${quantity} grams of ${metalType} @ ${lockPrice}`
        );
        setModal(true);
      } else {
        setIsSnackBar(true);
        setErrorMsg("Something Went Wrong");
        setSuccessMsg("");
      }
    }
    if (res.ResponseStatus === 0) {
      setIsSnackBar(true);
      setErrorMsg(res.Data.message);
      setSuccessMsg("");
    }
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
                <span style={{ color: "#CA3060" }} onClick={handleSellSubmit}>
                  Resend OTP
                </span>
              </a>
            </p>
          )}
        </p>
      </div>
    );
  };
  // Bank Details Add Logic
  const handleAddbankDetails = async () => {
    const username = state.username;
    const password = state.password;
    const accountNumber = formValue.accountNumber;
    const accountName = formValue.accountName;
    const ifscCode = formValue.ifscCode;
    const user_bank_id = list.Data?.result[0]?.userBankId;
    if (editAddress) {
      const res = await UpdateBankAccountDetails({
        username,
        password,
        accountNumber,
        accountName,
        ifscCode,
        user_bank_id,
      });
      if (
        res.ResponseStatus === 1 &&
        (res.Data?.statusCode === 200 || res.Data?.statusCode === 201)
      ) {
        setEditAddress(false);
        dispatch(GetUserBankList({ username, password }));
        // window.location.reload();
      } else if (
        res.ResponseStatus === 0 ||
        (res.ResponseStatus === 1 && res.Data?.statusCode === 422)
      ) {
        setErrorMsg(res.Remarks);
        setSuccessMsg("");
        setIsSnackBar(true);
      }
    } else {
      const res = await UserbankAccountCreate({
        username,
        password,
        accountNumber,
        accountName,
        ifscCode,
      });
      if (res.ResponseStatus === 1) {
        dispatch(GetUserBankList({ username, password }));
        // window.location.reload();
      }
    }
  };
  // Bank Details Update Logic
  const updateBankDetails = () => {
    formValue.accountName = list.Data.result[0].accountName;
    formValue.accountNumber = list.Data.result[0].accountNumber;
    formValue.ifscCode = list.Data.result[0].ifscCode;
    setEditAddress(true);
  };

  window.onpopstate = function (event) {
    localStorage.removeItem("valueType");
  };
  return localStorage.getItem("valueType") ? (
    <>
      {/* <CommonTopNav /> */}
      <div className="">
        <section class="digi-gold-section-wrapper buy-sell-form">
          <div class="container">
            <div class="digital-gold-section-head">
              <h1 class="section-head-title">Order Summary</h1>
            </div>
            <Spin
              spinning={loading || listLoad || digiLogLoading || walletLoad}
            >
              <div class="row">
                <div class="col-lg-12">
                  {/* <div class="my-vault-wrapper">
                    <div class="col-lg-7 mx-auto">
                      <div class="my-vault-badge-wrapper">
                        <span class="my-vault-badge">My Vault</span>
                      </div>
                      <div class="my-vault-inner">
                        <div class="vault-value">
                          <p class="vault-value-text">Gold Grams</p>
                          <p class="vault-value-count mt-3">
                            {logData?.Data && !loading
                              ? logData?.Data?.GoldGrams?.toFixed(4)
                              : "0.0000"}{" "}
                            Grams
                          </p>
                        </div>
                        <div class="vertical-separator"></div>
                        <div class="vault-value">
                          <p class="vault-value-text">Silver Grams</p>
                          <p class="vault-value-count mt-3">
                            {logData?.Data && !loading
                              ? logData?.Data?.SilverGrams?.toFixed(4)
                              : "0.0000"}{" "}
                            Grams
                          </p>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  <MyVault />
                  {/* {!load ? ( */}
                  <Spin
                    spinning={load || list.ResponseStatus === 0}
                    style={{ color: "#ca3060" }}
                  >
                    <div class="buy-sell-form-outer">
                      <div class="current-rate-outer">
                        <div class="current-rate">
                          <span class="current-rate-title mb-3">GOLD</span>
                          <span class="current-rate-amt">
                            &#x20B9;{" "}
                            {!loading && rateData
                              ? state?.type === "buy"
                                ? rateData?.Data?.result?.data?.rates?.gBuy
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
                        <div class="vertical-separator d-md-none d-sm-block"></div>
                        <div class="current-rate">
                          <span class="current-rate-title mb-3">SILVER</span>
                          <span class="current-rate-amt">
                            {" "}
                            &#x20B9;{" "}
                            {!loading && rateData
                              ? state?.type === "buy"
                                ? rateData?.Data?.result?.data?.rates?.sBuy
                                : rateData?.Data?.result?.data?.rates?.sSell
                              : "Loading..."}{" "}
                            / gm
                          </span>
                        </div>
                      </div>
                      {/* <Spin spinning={listLoad}> */}
                      <div class="digigold-order-summery">
                        <div class="row digigold-insert-value">
                          {state?.type === "buy" && (
                            <div class="col-lg-12">
                              <p class="digigold-insert-title">
                                This prices will be valid for :{" "}
                                <span>{formatTime(counter)}</span>{" "}
                              </p>
                            </div>
                          )}
                          <div
                            class={`${
                              state?.type === "buy"
                                ? "col-lg-3 col-sm-6"
                                : "col-lg-4 col-sm-4"
                            } `}
                          >
                            <p class="digigold-insert-darktext">
                              Quantity (gms)
                            </p>
                            <p class="digigold-insert-amt">
                              {currentGram && currentGram} Grams
                            </p>
                          </div>
                          <div
                            class={`${
                              state?.type === "buy"
                                ? "col-lg-2 col-sm-6"
                                : "col-lg-4 col-sm-4"
                            } `}
                          >
                            <p class="digigold-insert-darktext">Rate</p>
                            <p class="digigold-insert-amt">
                              &#x20B9;{" "}
                              {/* {state.metalType === "gold"
                            ? goldRate && state.valType !== "Amount"
                              ? goldRate
                              : state?.valueinAmt
                            : silverRate && state.valType !== "Amount"
                            ? silverRate
                            : state?.valueinAmt} */}
                              {!loading && rateData
                                ? state?.type === "buy"
                                  ? rateData?.Data?.result?.data?.rates?.sBuy
                                  : rateData?.Data?.result?.data?.rates?.sSell
                                : "Loading..."}
                            </p>
                          </div>
                          <div
                            class={`${
                              state?.type === "buy"
                                ? "col-lg-2 col-sm-6"
                                : "col-lg-4 col-sm-4"
                            } `}
                          >
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
                              {currentRate && currentRate}
                            </p>
                          </div>
                          {state?.type === "buy" && (
                            <div
                              class={`${
                                state?.type === "buy"
                                  ? "col-lg-2 col-sm-6"
                                  : "col-lg-4 col-sm-4"
                              } `}
                            >
                              <p class="digigold-insert-darktext">Tax</p>
                              <p class="digigold-insert-amt">
                                &#x20B9; {tax && tax}
                              </p>
                            </div>
                          )}
                          <div
                            class={`${
                              state?.type === "buy" ? "col-lg-3" : "col-lg-4"
                            } `}
                          >
                            <p class="digigold-insert-darktext">
                              Total{" "}
                              {state?.type === "buy" ? "Payable" : "Receivable"}
                            </p>
                            <p class="digigold-insert-amt">
                              &#x20B9;{" "}
                              {totalAmount
                                ? totalAmount
                                : state?.valueinAmt}
                            </p>
                          </div>
                        </div>

                        <div class="row digigold-payble-value">
                          <div class="col-lg-12">
                            <p class="digigold-payble-darktest">
                              Amount{" "}
                              {state?.type === "buy" ? "Payable" : "Receivable"}
                            </p>
                            <p class="digigold-payble-amt">
                              {" "}
                              &#x20B9;{" "}
                              {totalAmount
                                ? totalAmount
                                : state?.valueinAmt}
                            </p>
                          </div>
                        </div>
                        {state?.type === "buy" && (
                          <div class="digigold-payment-method">
                            <p class="digigold-payment-title">
                              {" "}
                              Payment method{" "}
                            </p>

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
                              <p class="digigold-paymethod-title">
                                Debit From{" "}
                              </p>
                              <div class="digigold-paymet-discount-info">
                                <div class="col-lg-8 p-0">
                                  <div class="custom-control custom-checkbox">
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

                                    {walletShow && (
                                      <Link
                                        className="digigold-addmoney"
                                        to={"/addMoney/options"}
                                        // style={{
                                        //   backgroundColor: "blue ",
                                        //   color: "white",
                                        //   marginLeft: 20,
                                        //   fontSize: 15,
                                        //   padding: 3,
                                        //   borderRadius: 5,
                                        //   outline: "none",
                                        //   textDecoration: "none",
                                        //   cursor: "pointer",
                                        // }}
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
                                      ? totalAmount
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
                        )}
                        {/* Digi Gold Bank Details */}
                        {state?.type === "sell" && (
                          <div class="digigold-bank-details">
                            <p class="digigold-payment-title">
                              {" "}
                              Bank Account Details{" "}
                            </p>
                            {!listLoad ? (
                              <div class="container">
                                {list?.Data?.result?.length === 0 ||
                                editAddress ? (
                                  // // <div class="row">
                                  //   {/* <div class="col-lg-6 col-md-6">
                                  //     <div class="floating-input-wrapper">
                                  //       <select
                                  //         class="floating-select-wraper"
                                  //         onclick="this.setAttribute('value', this.value);"
                                  //         onchange="this.setAttribute('value', this.value);"
                                  //         value=""
                                  //       >
                                  //         <option value=""></option>
                                  //         <option value="1">1</option>
                                  //         <option value="2">2</option>
                                  //         <option value="3">3</option>
                                  //         <option value="4">4</option>
                                  //         <option value="5">5</option>
                                  //       </select>
                                  //       <label class="floating-label-name">
                                  //         Bank Name *{" "}
                                  //       </label>
                                  //     </div>
                                  //   </div> */}
                                  <Form
                                  className="buy-sell-tab-inner"
                                    onFinish={handleAddbankDetails}
                                    fields={[
                                      {
                                        name: "accountNumber",
                                        value: formValue.accountNumber,
                                      },
                                      {
                                        name: "accountName",
                                        value: formValue.accountName,
                                      },
                                      {
                                        name: "ifscCode",
                                        value: formValue.ifscCode,
                                      },
                                    ]}
                                  >
                                    <Row
                                    // className="align-items-center"
                                      gutter={20}
                                      // style={{
                                      //   marginTop: 10,
                                      //   marginBottom: 20,
                                      // }}
                                    >
                                      <Col
                                        span={7}
                                        xs={{ span: 24 }}
                                        sm={{ span: 12 }}
                                        md={{ span: 7 }}
                                      >
                                        <div class="input-wrapper w-100">
                                  <div className="input">
                                        <Form.Item
                                        // className="mb-0 "
                                          name={"accountNumber"}
                                          // hasFeedback
                                          rules={[
                                            {
                                              validator: (_, value) => {
                                                const accRegex =
                                                  /^[0-9]{9,18}$/;
                                                if (
                                                  !value ||
                                                  value.match(accRegex)
                                                ) {
                                                  return Promise.resolve();
                                                }
                                                return Promise.reject(
                                                  "Invalid Account Number"
                                                );
                                              },
                                            },
                                            {
                                              required: true,
                                              message:
                                                "Account Number is Required",
                                            },
                                          ]}
                                        >
                                          <Input
                                            required
                                            onKeyPress={handleMobileKeyPress}
                                            size="large"
                                            maxLength={18}
                                            // addonBefore={<FaHashtag />}
                                            placeholder="Enter Account Number"
                                            value={formValue.accountNumber}
                                            onChange={(e) =>
                                              setFormValue({
                                                ...formValue,
                                                accountNumber: e.target.value,
                                              })
                                            }
                                          />
                                          <label htmlFor="enter-grams"> Enter Grams </label>
                                        </Form.Item>
                                        </div>
                                        </div>
                                      </Col>
                                      <Col
                                        span={7}
                                        xs={{ span: 24 }}
                                        sm={{ span: 12 }}
                                        md={{ span: 7 }}
                                      >
                                        <div class="input-wrapper w-100">
                                  <div className="input">
                                        <Form.Item
                                        // className="mb-0"
                                          onKeyPress={handleKeyPressForName}
                                          name={"accountName"}
                                          // hasFeedback
                                          rules={[
                                            {
                                              required: true,
                                              message:
                                                "Holder Name is Required",
                                            },
                                          ]}
                                        >
                                          <Input
                                            required
                                            size="large"
                                            // addonBefore={<FaUser />}
                                            placeholder="Account Holder Name"
                                            value={formValue.accountName}
                                            onChange={(e) =>
                                              setFormValue({
                                                ...formValue,
                                                accountName: e.target.value,
                                              })
                                            }
                                          />
                                          <label htmlFor=""> Account Holder Name </label>
                                        </Form.Item>
                                        </div>
                                        </div>
                                      </Col>

                                      <Col
                                        span={7}
                                        xs={{ span: 24 }}
                                        sm={{ span: 12 }}
                                        md={{ span: 7 }}
                                      >
                                        <div class="input-wrapper w-100">
                                  <div className="input">
                                        <Form.Item
                                        // className="mb-0"
                                          name={"ifscCode"}
                                          // hasFeedback
                                          rules={[
                                            {
                                              validator: (_, value) => {
                                                const regex =
                                                  /^[A-Z]{4}[0][A-Z0-9]{6}$/;
                                                if (
                                                  !value ||
                                                  regex.test(value)
                                                ) {
                                                  return Promise.resolve();
                                                }
                                                return Promise.reject(
                                                  "Please enter a valid IFSC code"
                                                );
                                              },
                                            },
                                            {
                                              required: true,
                                              message: "Ifsc Code is Required",
                                            },
                                          ]}
                                        >
                                          <Input
                                            size="large"
                                            pattern="[A-Za-z0-9 ]+"
                                            maxLength={11}
                                            // addonBefore={<FaHashtag />}
                                            placeholder="Enter IFSC Code"
                                            value={formValue.ifscCode}
                                            onChange={(e) =>
                                              setFormValue({
                                                ...formValue,
                                                ifscCode: e.target.value,
                                              })
                                            }
                                          />
                                          <label htmlFor=""> Enter IFSC Code </label>
                                        </Form.Item>
                                        </div>
                                        </div>
                                      </Col>

                                      <Col
                                        span={3}
                                        sm={{ span: 12 }}
                                        md={{ span: 3 }}
                                      >
                                        <Button htmlType="submit" size="large">
                                          Submit
                                        </Button>
                                      </Col>

                                      {/* <div class="col-lg-6 col-md-6">
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
                                </div> */}

                                      {/* <div class="col-lg-6 col-md-6">
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
                                </div> */}
                                    </Row>
                                  </Form>
                                ) : (
                                  // </div>
                                  <div class="row justify-content-center">
                                    <div class="col-lg-7 col-md-8 user-bank-details shadow-light">
                                      <div class="row">
                                        <div class="col-9 col-md-9">
                                          {/* <span class="text-gray">
                                            Bank Name :{" "}
                                          </span>
                                          <span>UNION BANK OF INDIA</span> */}
                                        </div>
                                        {/* <div class="col-3 col-md-3 px-0 px-md-3 text-right">
                                          <button
                                            onClick={updateBankDetails}
                                            class="edit-bank-details"
                                          >
                                            {" "}
                                            <img src="/images/digigold-images/edit-icon.svg" />{" "}
                                            Edit{" "}
                                          </button>
                                        </div> */}
                                      </div>

                                      <div class="row">
                                        <div class="col-9 col-md-9">
                                          <span class="text-gray">
                                            Bank Account Number :{" "}
                                          </span>
                                          <span>
                                            {list.Data?.result
                                              ? list.Data?.result[0]
                                                  ?.accountNumber
                                              : "Loading..."}
                                          </span>
                                        </div>
                                        <div class="col-3 col-md-3 px-0 px-md-3 text-right">
                                          <button
                                            onClick={updateBankDetails}
                                            class="edit-bank-details"
                                          >
                                            {" "}
                                            <img src="/images/digigold-images/edit-icon.svg" />{" "}
                                            Edit{" "}
                                          </button>
                                        </div>
                                      </div>

                                      <div class="row">
                                        <div class="col-12">
                                          <span class="text-gray">
                                            IFSC Code :{" "}
                                          </span>
                                          <span>
                                            {list.Data?.result
                                              ? list.Data?.result[0]?.ifscCode
                                              : "Loading..."}
                                          </span>
                                        </div>
                                      </div>

                                      <div class="row">
                                        <div class="col-12">
                                          <span class="text-gray">
                                            Account Holder Name :{" "}
                                          </span>
                                          <span>
                                            {list.Data?.result
                                              ? list.Data?.result[0]
                                                  ?.accountName
                                              : "Loading..."}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <LatestLoading />
                            )}
                          </div>
                        )}
                        <div class="order-proceed-btn">
                          <button
                            disabled={editAddress}
                            style={{ marginTop: 10 }}
                            onClick={
                              state?.type === "buy"
                                ? () => handleSubmit()
                                : () => handleSellSubmit()
                            }
                            class="btn btn-primery"
                          >
                            {" "}
                            {state?.type === "buy"
                              ? "Proceed to Pay"
                              : "Proceed to Sell"}
                          </button>
                          {state?.type === "buy" && walletShow && (
                            <div>
                              <h2
                                style={{
                                  fontSize: 12,
                                  color: "red",
                                  marginTop: 20,
                                }}
                              >
                                {"Wallet Balance is Low, Please Add Money"}
                              </h2>
                            </div>
                          )}
                        </div>
                      </div>
                      {/* </Spin> */}
                    </div>
                  </Spin>
                  {/* ) : (
                  <LatestLoading />
                )} */}
                </div>
              </div>
            </Spin>
          </div>
        </section>
      </div>

      <Modal
        footer={[]}
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
            // style={{ fontWeight: "700", fontSize: 20 }}
            class="digigold-success-title mt-3 "
          >
            CONGRATULATIONS!
          </p>
          <p class="success-note">{response}</p>
          <div class="digigold-success-btn">
            {/* <button class="btn btn-gray">View Details</button> */}
            <button
              onClick={() => navigate("/digigold-orders")}
              class="btn btn-primery"
            >
              Go to my Orders
            </button>
          </div>
          {state?.type === "buy" && (
            <p class="success-note mb-2 mt-4">
              Note: Gold/ Silver once purchased can be sold after 48 hours
            </p>
          )}
        </div>
        {/* </div> */}
      </Modal>
      <Modal
        footer={[]}
        maskClosable={false}
        centered
        onCancel={() => navigate("/digigold")}
        open={step === 1 && true}
      >
        {step === 1 && (
          <div class="align-self-center">
            <div class="digigoldotpForm-outer">
              <div class="row">
                <div class="col-lg-12">
                  {/* <div style={{ justifyContent: "center" }} class=""> */}
                  <div className="digigoldotp-titleMain formText text-center">
                    <h2>OTP Verification</h2>
                  </div>
                  <div class="otp-send-to">
                    <p>
                      Enter the OTP sent to
                      <label for="">
                         &nbsp; +91 {logData?.Data.MobileNumber}
                        
                         {console.log(logData, "lllol")}
                      </label>
                    </p>
                  </div>
                  {/* </div> */}
                </div>
              </div>

              <div className="formStyle">
                {/* <Otp
                  userName={formValue.mobileNumber}
                  password={loggedInUser.TRXNPassword}
                /> */}
                <div
                  id="otp"
                  className="row row-flex justify-content-center mt-1"
                >
                  <div className="">
                    <OTPInput
                      value={otp}
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
                        loading={loading}
                        type="primary"
                        size="large"
                        // class="btn otp-btn btn-primery modal-loading-btn"
                        // id="addmoneymodal"
                        // disabled={formValue.otp.length == 6 ? false : true}
                        onClick={
                          handleSellSubmit
                          // () => {
                          //   // !loading &&
                          //   dispatch(loginWithOtp({ userName, password, ip, otp }));
                          //   setToggle(true);
                          //   setTimeout(() => {
                          //     setToggle(false);
                          //   }, 4000);
                          // }
                        }
                      >
                        Verify & Proceed
                        {/* {loading ? (
                                       <LoadingBar class="" />
                                     ) : (
                                       "Verify & Proceed"
                                     )} */}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
      <MuiSnackBar
        open={isSnackBar}
        setOpen={setIsSnackBar}
        successMsg={successMsg}
        errorMsg={errorMsg}
        setSuccess={setSuccessMsg}
        setError={setErrorMsg}
      />
    </>
  ) : (
    <Navigate to={"/digigold"} />
  );
};

export default OrderSummary;

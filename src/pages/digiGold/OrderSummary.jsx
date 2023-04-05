import { Button, Col, Form, Input, Modal, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  BuyDigiGold,
  CheckIfscCode,
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
import { LatestLoading } from "../../components/common/Loading.jsx";
// import {
//   digitPrecision,
//   handleKeyPressForName,
//   handleMobileKeyPress,
// } from "../../constants";
import CommonTopNav from "../../components/layout/Header/CommonTopNav";
import { MuiSnackBar } from "../../components/common";
import MyVault from "./MyVault";
import {
  handleKeyPressForName,
  handleMobileKeyPress,
} from "../../constant/Constants";
import { digitPrecision, namePattern } from "../../constants";

const OrderSummary = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const [sellLoad, setSellLoad] = useState(false);
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
  const { Verified } = useSelector((state) => state.digiGoldSlice.ifsc);
  // Grams Crop
  console.log(Verified, "Verified");
  // VIPS Username & Password
  const username = state?.username;
  const password = state?.password;

  // Gold & Silver Buy & Sell
  const GoldBuyRates = rateData?.Data?.result?.data?.rates?.gBuy;
  const GoldSellRates = rateData?.Data?.result?.data?.rates?.gSell;
  const SilverBuyRates = rateData?.Data?.result?.data?.rates?.sBuy;
  const SilverSellRates = rateData?.Data?.result?.data?.rates?.sSell;

  // Complete Login is this UseEffect
  useEffect(() => {
    if (counter === 0 || counter === 300) {
      const fetchRates = async () => {
        const res = await dispatch(fetchGoldSilverRates());
        const blockId = res.payload.Data.result.data.blockId;
        const taxRate =
          parseFloat(res.payload.Data.result.data.taxes[0].taxPerc) +
          parseFloat(res.payload.Data.result.data.taxes[1].taxPerc);

        if (state?.type === "buy") {
          if (state?.metalType === "gold") {
            const GoldBuyRates = res.payload.Data.result.data.rates.gBuy;
            setLockPrice(GoldBuyRates);
            setBlockId(blockId);
            if (state?.valType === "quantity") {
              const quantity = digitPrecision(state?.valueinGm, "quantity");
              const excTaxAmount = quantity * GoldBuyRates;
              const exclTaxRate = digitPrecision(excTaxAmount, "amount");
              const TaxTotal = (exclTaxRate * taxRate) / 100;
              const totalTax = digitPrecision(TaxTotal, "amount");

              const TotalAmount =
                parseFloat(exclTaxRate) + parseFloat(totalTax);
              const inclTaxAmount = digitPrecision(TotalAmount, "amount");
              const newQty = quantity.toString().includes(".")
                ? quantity
                : parseFloat(quantity).toFixed(4);

              setCurrentGram(newQty);
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
                (parseFloat(GoldBuyRates) * taxRate) / parseFloat(100) +
                parseFloat(GoldBuyRates);

              const inclTaxRate = digitPrecision(TaxInc, "amount");
              const qty = inclTaxAmount / inclTaxRate;
              const quantity = digitPrecision(qty, "quantity");

              setCurrentGram(quantity.toFixed(4));
              setTotalAmount(inclTaxAmount);
              setCurrentRate(exclTaxAmount);
              setTax(totalTax);
            }
          } else {
            const SilverBuyRates = res.payload.Data.result.data.rates.sBuy;
            setBlockId(blockId);
            setLockPrice(SilverBuyRates);
            if (state?.valType === "quantity") {
              const quantity = digitPrecision(state?.valueinGm, "quantity");
              const excTaxAmount = quantity * SilverBuyRates;
              const exclTaxRate = digitPrecision(excTaxAmount, "amount");
              console.log(exclTaxRate, "exclTaxRate");
              const TaxTotal = (exclTaxRate * taxRate) / 100;
              const totalTax = digitPrecision(TaxTotal, "amount");

              const TotalAmount =
                parseFloat(exclTaxRate) + parseFloat(totalTax);
              const inclTaxAmount = digitPrecision(TotalAmount, "amount");
              const newQty = quantity.toString().includes(".")
                ? quantity
                : parseFloat(quantity).toFixed(4);
              setCurrentGram(newQty);
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
                (parseFloat(SilverBuyRates) * taxRate) / parseFloat(100) +
                parseFloat(SilverBuyRates);
              const inclTaxRate = digitPrecision(TaxInc, "amount");
              const qty = inclTaxAmount / inclTaxRate;
              const quantity = digitPrecision(qty, "quantity");
              // const newQty = quantity.toString().includes(".")
              //   ? quantity.toFixed(4)
              //   : quantity;
              // console.log(newQty, "ye New hai");
              setCurrentGram(quantity.toFixed(4));
              setTotalAmount(inclTaxAmount);
              setCurrentRate(exclTaxAmount);
              setTax(totalTax);
            }
          }
        } else {
          const GoldSellRates = res?.payload?.Data?.result?.data?.rates?.gSell;
          if (state?.metalType === "gold") {
            setBlockId(blockId);
            setLockPrice(GoldSellRates);
            if (state.valType === "quantity") {
              const quantity = digitPrecision(state?.valueinGm, "quantity");
              const totalAmount = digitPrecision(
                quantity * GoldSellRates,
                "amount"
              );
              setBlockId(blockId);
              setCurrentRate(totalAmount);
              setCurrentGram(quantity);
              setTotalAmount(totalAmount);
            }
          } else {
            const SilverSellRates =
              res?.payload?.Data?.result?.data?.rates?.sSell;
            setBlockId(blockId);
            setLockPrice(SilverSellRates);
            if (state.valType === "quantity") {
              const quantity = digitPrecision(state?.valueinGm, "quantity");
              const totalAmount = digitPrecision(
                quantity * SilverSellRates,
                "amount"
              );
              setBlockId(blockId);
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
    // const username = state?.username;
    // const password = state?.password;
    dispatch(loginDigiGold({ username, password }));
    dispatch(getWalletBalance({ username, password }));
  }, [load]);
  const handleClose = () => {
    setModal(false);
    navigate("/vipsgold");
  };
  // Get User Bank Details logic
  useEffect(() => {
    // const username = state?.username;
    // const password = state?.password;
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
  // Gold & Silver Buy Logic
  const handleSubmit = async () => {
    // const username = state.username;
    // const password = state.password;
    const lockPrice = lockprice;
    const metalType = state.metalType;
    // const roundedCurrent = Math.round(currentGram * 10000) / 10000;
    // const str = roundedCurrent.toFixed(4);
    // const result = parseFloat(currentGram);
    const quantity = currentGram;
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
    setSellLoad(true);
    // const username = state.username;
    // const password = state.password;
    const lockPrice = lockprice;
    const metalType = state.metalType;
    const quantity = currentGram;
    const blockid = blockId;
    const userBankId = list.Data && list.Data.result[0]?.userBankId;
    const accountName = list.Data && list.Data.result[0]?.accountName;
    const accountNumber = list.Data && list.Data.result[0]?.accountNumber;
    const ifscCode = list.Data && list.Data.result[0]?.ifscCode;
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
      setSellLoad(false);
      setIsSnackBar(true);
      setErrorMsg("");
      setSuccessMsg(res.Remarks);
      setStep(1);
    }
    if (res.ResponseStatus === 1) {
      if (res.Data.statusCode === 200) {
        setSellLoad(false);
        setStep(0);
        setResponse(
          `Successfully Sold ${quantity} grams of ${metalType} @ ${lockPrice}`
        );
        setModal(true);
      } else {
        setSellLoad(false);
        setIsSnackBar(true);
        setErrorMsg("Something Went Wrong");
        setSuccessMsg("");
      }
    }
    if (res.ResponseStatus === 0) {
      setSellLoad(false);
      setIsSnackBar(true);
      setErrorMsg(res.Remarks);
      setSuccessMsg("");
    }
  };

  const handleResendSellOTPSubmit = async () => {
    setOtp("");
    // const username = state.username;
    // const password = state.password;
    const lockPrice = lockprice;
    const metalType = state.metalType;
    const quantity = currentGram;
    const blockid = blockId;
    const userBankId = list.Data && list.Data.result[0].userBankId;
    const accountName = list.Data && list.Data.result[0].accountName;
    const accountNumber = list.Data && list.Data.result[0].accountNumber;
    const ifscCode = list.Data && list.Data.result[0].ifscCode;

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
    });
    if (res.ResponseStatus === 2) {
      setIsSnackBar(true);
      setErrorMsg("");
      setSuccessMsg(res.Remarks);
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
      setErrorMsg(res.Remarks);
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
                <span
                  style={{ color: "#CA3060" }}
                  onClick={handleResendSellOTPSubmit}
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
  // Bank Details Add Logic
  const handleAddbankDetails = async () => {
    // const username = state.username;
    // const password = state.password;
    const accountNumber = formValue.accountNumber;
    const accountName = formValue.accountName;
    const ifscCode = formValue.ifscCode;
    const user_bank_id = list.Data?.result[0]?.userBankId;
    if (editAddress) {
      if (Verified !== 0) {
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
        } else if (
          res.ResponseStatus === 0 ||
          (res.ResponseStatus === 1 && res.Data?.statusCode === 422)
        ) {
          setErrorMsg(res.Remarks);
          setSuccessMsg("");
          setIsSnackBar(true);
        }
      } else {
        setErrorMsg("Please Enter Valid IFSC");
        setSuccessMsg("");
        setIsSnackBar(true);
      }
    } else {
      if (Verified !== 0) {
        const res = await UserbankAccountCreate({
          username,
          password,
          accountNumber,
          accountName,
          ifscCode,
        });
        if (res.ResponseStatus === 1) {
          dispatch(GetUserBankList({ username, password }));
        }
      } else {
        setErrorMsg("Please Enter Valid IFSC");
        setSuccessMsg("");
        setIsSnackBar(true);
      }
    }
  };

  useEffect(() => {
    if (formValue.ifscCode.length === 11) {
      const ifsc = formValue.ifscCode;
      dispatch(CheckIfscCode({ ifsc }));
    }
  }, [formValue.ifscCode]);
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
      <div className="">
        <section class="digi-gold-section-wrapper buy-sell-form">
          <div class="container">
            <div class="digital-gold-section-head">
              <h1 class="section-head-title">Order Summary</h1>
            </div>
            <Spin
              spinning={
                loading || listLoad || digiLogLoading || walletLoad || sellLoad
              }
            >
              <div class="row">
                <div class="col-lg-12">
                  <MyVault />
                  {/* {!load ? ( */}
                  <Spin spinning={load || list.ResponseStatus === 0}>
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
                              : "Loading..."}{" "}
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
                                ? SilverBuyRates
                                : SilverSellRates
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
                                This price will be valid for :{" "}
                                <span>{formatTime(counter)}</span>{" "}
                              </p>
                            </div>
                          )}
                          <div
                            class={`${
                              state?.type === "buy"
                                ? "col-lg-2 col-sm-6"
                                : "col-lg-3 col-sm-4"
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
                                : "col-lg-3 col-sm-4"
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
                                  ? state?.metalType === "gold"
                                    ? GoldBuyRates
                                    : SilverBuyRates
                                  : state?.metalType === "gold"
                                  ? GoldSellRates
                                  : SilverSellRates
                                : "Loading..."}
                            </p>
                          </div>
                          <div
                            class={`${
                              state?.type === "buy"
                                ? "col-lg-3 col-sm-6"
                                : "col-lg-3 col-sm-4"
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
                                  : "col-lg-3  col-sm-4"
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
                              state?.type === "buy" ? "col-lg-3" : "col-lg-3"
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
                                        src="../images/logos/vips-logo-small.png"
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
                                  <Form
                                    // className="buy-sell-tab-inner"
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
                                          {/* <label htmlFor="enter-grams"> Enter Grams </label> */}
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
                                            {
                                              pattern: namePattern,
                                              message:
                                                "Please enter a valid full name!",
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
                                          {/* <label htmlFor=""> Account Holder Name </label> */}
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
                                          <label
                                            style={{
                                              fontSize: 12,
                                              marginLeft: 10,
                                            }}
                                            htmlFor=""
                                          >
                                            {formValue.ifscCode.length === 11 &&
                                              (Verified
                                                ? Verified
                                                : "Please Enter Valid IFSC")}
                                          </label>
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
                                    </Row>
                                  </Form>
                                ) : (
                                  <div class="row justify-content-center">
                                    <div class="col-lg-7 col-md-8 user-bank-details shadow-light">
                                      <div class="row">
                                        <div class="col-9 col-md-9"></div>
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
                            // disabled={editAddress ? }
                            style={{ marginTop: 10 }}
                            onClick={
                              state?.type === "buy"
                                ? () => handleSubmit()
                                : editAddress
                                ? () => {
                                    setIsSnackBar(true);
                                    setErrorMsg("Please Submit Bank Details");
                                    setSuccessMsg("");
                                  }
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
                    </div>
                  </Spin>
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
        <div class="digigold-order-success text-center">
          <img
            alt=""
            src="/images/digigold-images/check-green.svg"
            class="img img-fluid check-green-img"
          />
          <p class="digigold-success-title mt-3 ">CONGRATULATIONS!</p>
          <p class="success-note">{response}</p>
          <div class="digigold-success-btn">
            <button
              onClick={() => {
                localStorage.removeItem("valueType");
                navigate("/vipsgold-orders");
              }}
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
      </Modal>
      <Modal
        footer={[]}
        maskClosable={false}
        centered
        onCancel={() => {
          localStorage.removeItem("valueType");
          navigate("/vipsgold");
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
                        disabled={otp.length !== 6}
                        loading={loading || sellLoad}
                        type="primary"
                        size="large"
                        onClick={handleSellSubmit}
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
    <Navigate to={"/vipsgold"} />
  );
};

export default OrderSummary;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { checkGABBalance, addMoneyFromGAB } from "../../apiData/payments";
import "../../assets/styles/addMoney/addMoney.css";
import "../../assets/styles/styles.css";
import { useDispatch, useSelector } from "react-redux";
import AddMoneyButton from "../../components/buttons/AddMoneyButton";
import { Loading, MuiSnackBar, ThemeButton } from "../../components/common";
import { globalConfiguration } from "../../redux/slices/payment/paymentSlice";

const AddAmount = () => {
  const [amount, setAmount] = useState(0);
  const [GABBalance, setGABBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isSnackBar, setIsSnackBar] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [status, setStatus] = useState(false);
  const [chargesPer, setChargesPer] = useState(0);
  const { loggedInUser } = useSelector(
    (state) => state.loginSlice.loggetInWithOTP
  );
  const { data } = useSelector((state) => state.paymentSlice.configBySubKey);
  const dispatch = useDispatch();
  let { option } = useParams();
  useEffect(() => {
    if (data) {
      if (data.ResponseStatus === 1) {
        setStatus(data.Data.Status);
        if (data.Data.Status) {
          setChargesPer(data.Data.Value);
        }
      }
    }
  }, [data]);
  const clickAddFromGAB = (e) => {
    e.preventDefault();
    setLoading(true);
    if (amount && amount > 0) {
      addMoneyFromGAB(
        loggedInUser.Mobile,
        loggedInUser.TRXNPassword,
        amount
      ).then((response) => {
        if (response.ResponseStatus == 1) {
          setLoading(false);
          setIsSnackBar(true);
          setSuccessMsg(response.Remarks);
          setAmount(0);
        } else {
          setLoading(false);
          setIsSnackBar(true);
          setErrorMsg(response.Remarks);
        }
      });
    } else {
      setIsSnackBar(true);
      setLoading(false);
      setErrorMsg("Please enter valid amount");
    }
  };
  const amountWithFee = () => {
    return parseInt(amount) + getFee();
  };
  useEffect(() => {
    checkGABBalance(loggedInUser.Mobile, loggedInUser.TRXNPassword).then(
      (response) => {
        setGABBalance(response.Data);
      }
    );
    if (option === "CC") {
      dispatch(globalConfiguration("CreditCard"));
    }
  }, []);

  const onChange = (e) => {
    const re = /^[0-9\b]+$/;

    if (e.target.value === "" || re.test(e.target.value)) {
      setAmount(e.target.value);
    }
  };
  const getFee = () => {
    return (amount * chargesPer) / 100;
  };
  return (
    <div className="color-body">
      <section class="inpage-section-align inset-shadow-top-light addmoney">
        <div class="container">
          <div class="container">
            <div class="section-head">
              <h1 class="section-head-title">Enter Amount</h1>
            </div>
          </div>

          <div class="container">
            <div class="row">
              <div class="col-xl-5 col-lg-6 col-md-8 col-sm-12 add-money-outer box-shadow-1 border-0 mx-auto">
                <div class="add-money-card">
                  {option === "GAB" ? (
                    <div class="add-money-body">
                      <span class="add-money-title">
                        {" "}
                        Affiliate Balance : (&#x20B9; {GABBalance}){" "}
                      </span>
                    </div>
                  ) : null}

                  <div class="add-money-body">
                    <form class="add-money-amt">
                      <div class="form-group input-group">
                        <span class="input-group-prepend">
                          <div class="input-group-text">&#x20B9;</div>
                        </span>
                        <input
                          onChange={onChange}
                          value={amount > 0 ? amount : ""}
                          minLength={1}
                          maxLength={
                            option === "Payu" || option === "CC" ? 4 : 7
                          }
                          required
                          type="text"
                          autoComplete="off"
                          autoFocus="true"
                        />
                      </div>

                      <div class="col-md-12 p-0">
                        <div class="add-balance-btn">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setAmount(
                                parseInt(amount ? amount : 0) +
                                  parseInt(e.target.value)
                              );
                            }}
                            class="btn-cta"
                            value="1000"
                          >
                            {" "}
                            + 1000{" "}
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setAmount(
                                parseInt(amount ? amount : 0) +
                                  parseInt(e.target.value)
                              );
                            }}
                            class="btn-cta"
                            value="800"
                          >
                            {" "}
                            + 800
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setAmount(
                                parseInt(amount ? amount : 0) +
                                  parseInt(e.target.value)
                              );
                            }}
                            class="btn-cta"
                            value="500"
                          >
                            {" "}
                            + 500{" "}
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setAmount(
                                parseInt(amount ? amount : 0) +
                                  parseInt(e.target.value)
                              );
                            }}
                            class="btn-cta"
                            value="100"
                          >
                            {" "}
                            + 100{" "}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>

                  <div class="dropdown-divider"></div>
                  {option === "CC" && status && (
                    <div class="convenience-outer">
                      <p>Convenience Fee </p>
                      {/* <button class="convenience-info"> <GoInfo/> </button>  */}
                      <p>&#x20B9; {getFee()}</p>
                    </div>
                  )}

                  {option === "Payu" || option === "CC" ? (
                    <AddMoneyButton
                      amount={amountWithFee()}
                      setIsSnackBar={setIsSnackBar}
                      setErrorMsg={setErrorMsg}
                      isCreditCardEnable={option !== "Payu"}
                      chargesAmount={getFee()}
                    />
                  ) : (
                    <div class="add-money-body">
                      <div class="col-md-12">
                        <div class="add-money-btn">
                          {/* <button
                            onClick={!loading && clickAddFromGAB}
                            href="#"
                            class="btn-primery"
                            id="addmoneymodal"
                            data-toggle="modal"
                            data-target="#addmoneyform"
                          >
                            {loading ? <Loading /> : "Add Money"}
                          </button> */}
                          <ThemeButton
                            onClick={clickAddFromGAB}
                            value={"Add Money"}
                            loading={loading}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <MuiSnackBar
                  open={isSnackBar}
                  setOpen={setIsSnackBar}
                  successMsg={successMsg}
                  errorMsg={errorMsg}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddAmount;

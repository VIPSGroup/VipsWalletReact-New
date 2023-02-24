<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import CommonTopNav from "../../../components/home/CommonTopNav";
import Footer from "../../../components/home/Footer";

import { getRechargeHistory } from "../../../apiData/services/mobileRecharge";
import { fetchBill } from "../../../apiData/services/electricity";
import {
  getFastagOperators,
  getInputFieldsByOperator,
} from "../../../apiData/services/fastag";

import "../../../assets/styles/services/mobileRecharge/recharge.css";

import { MuiSnackBar } from "../../../components/common/snackbars";

import LoadingBar from "../../../components/common/loading";
import ErrorText from "../../../components/common/ErrorText";
import RecentHistory from "../../../components/services/RecentHistory";
import { operartorsUrl } from "../../../constants";
import { fastagServiceId, googleAnalytics } from "../../../constants";
import ReactGA from "react-ga";
import { useSelector } from "react-redux";
ReactGA.initialize(googleAnalytics);

const FastagFront = ({ props }) => {
  const [operatorsList, setOperatorList] = useState([]);
  const [mobileNo, setMobileNo] = useState("");
  const [selectedOperator, setSelectedOperator] = useState("");
  const [selectedOperatorId, setSelectedOperatorId] = useState("");
  const [opImgUrl, setOpImgUrl] = useState("");
  const [showBill, setShowBill] = useState(false);
  const [billFetchData, setBillFetchData] = useState({});
  const [operatorPaymentMode, setOperatorPaymentMode] = useState("");
  const [billFetchError, setBillFetchError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSnackBar, setIsSnackBar] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [billAmount, setBillAmount] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  const [inputFields, setInputFields] = useState([]);

  let navigate = useNavigate();
  const { loggedInUser } = useSelector((state) => state.login);

  const callInputFields = (ourCode) => {
    getInputFieldsByOperator(ourCode).then((response) => {
      const data = response.Data.Response;
      const arr = [];
      data &&
        data.map((d, i) => {
          let newfield = { fieldName: d.name, fieldValue: "" };
          arr.push({
            fieldName: d.name,
            fieldValue: "",
            regex: d.Regex,
            validate: false,
          });
        });
      setInputFields(arr);
    });
  };

  const handleAllFieldInput = (e, index) => {
    setBillFetchError("");
    setShowBill(false);
    let data = [...inputFields];
    let value = e.target.value.toUpperCase();

    data[index].fieldValue = value;

    const regex = RegExp(
      data[index].regex ? data[index].regex : "^[A-Z0-9]{7,10}$"
    );
    if (!value.match(regex)) {
      inputFields[index].validate = false;
    } else {
      inputFields[index].validate = true;
    }

    setInputFields(data);
  };

  const handleOperatorSelection = (e, o) => {
    setShowBill(false);
    setSelectedOperator(o.OperatorName);
    setOpImgUrl(o.Image);
    setSelectedOperatorId(o.OurCode);
    setInputFields([]);
    if (o.PaymentMode == 1 || o.PaymentMode == 3) {
      callInputFields(o.OurCode);
    }

    setOperatorPaymentMode(o.PaymentMode);
  };

  const clickFetchBill = (e) => {
    e.preventDefault();
    setBillFetchError("");
    if (selectedOperator) {
      if (mobileNo && mobileNo.length === 10) {
        let validateBBPSField = inputFields.filter((o) => o.validate === false);
        if (validateBBPSField.length !== 0) {
          setIsSnackBar(true);
          setErrorMsg(`Please enter valid ${validateBBPSField[0].fieldName} `);
        } else {
          setLoading(true);
          const obj = inputFields.reduce(
            (arr, curr) => ({ ...arr, [curr.fieldName]: curr.fieldValue }),
            {}
          );
          obj.MobileNumber = mobileNo;
          obj.OperatorCode = selectedOperatorId;
          obj.Ip = "123";

          const jsonData = JSON.stringify(obj);

          fetchBill(obj, loggedInUser.Mobile, loggedInUser.TRXNPassword).then(
            (response) => {
              if (response.Data.ResponseMessage == "Successful") {
                setShowBill(true);
                setBillFetchData(response.Data);
                setBillAmount(parseFloat(response.Data.BillAmount));
                setLoading(false);
              } else {
                setBillFetchError(response.Data.ResponseMessage);
                setLoading(false);
              }
            }
          );
        }
      } else {
        setIsSnackBar(true);
        setErrorMsg("Enter Valid Mobile Number");
      }
    } else {
      setIsSnackBar(true);
      setErrorMsg("Please  Select Operator");
    }
  };
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
    getFastagOperators().then((response) => {
      response && setOperatorList(sortOperator(response.Data));
    });
  }, [props]);

  const handleMobileNo = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setMobileNo(value);
    setBillFetchError("");
  };

  const handleAmount = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setBillAmount(value);
  };

  const sortOperator = (operators) => {
    let sortedOperators = operators.sort((a, b) =>
      a.OperatorName > b.OperatorName ? 1 : -1
    );
    return sortedOperators;
  };

  const onClickContinue = (e) => {
    if (billAmount && billAmount > 0) {
      navigate(`/services/fastag/online/confirm`, {
        state: {
          billData: billFetchData,
          number: mobileNo,
          operator: selectedOperator,
          operatorId: selectedOperatorId,
          amount: billAmount,
          inputFieldsData: inputFields,
        },
      });
    } else {
      setIsSnackBar(true);
      setErrorMsg("Please enter valid amount");
    }
  };

  const showBillFetchError = () => (
    <div className="mt-3">
      {billFetchError && (
        <div className="alert alert-danger">{billFetchError}</div>
      )}
    </div>
  );

  const fetchBillSection = () => (
    <div>
      <div class="row">
        <div class="col-lg-12 electricity-bill-field p-0">
          <div class="accordion" id="electricitybilldetails">
            <div class="item">
              <div class="item-header" id="headingOne">
                <div class="accordion-title">
                  <button
                    class="btn btn-link"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Consumer Details
                    <i class="fa fa-angle-down"></i>
                  </button>
                </div>
              </div>
              <div
                id="collapseOne"
                class="collapse show"
                aria-labelledby="headingOne"
                data-parent="#electricitybilldetails"
              >
                <div class="accordion-content">
                  <div class="row flex-position">
                    <div class="col-sm-6">
                      <label class="accordion-content-left-text"> Name:</label>
                    </div>
                    <div class="col-sm-6 accordion-content-text">
                      <label class="accordion-content-right-text">
                        {billFetchData.CustomerName}{" "}
                      </label>
                    </div>
                  </div>

                  {billFetchData.CustomerParamsDetails &&
                    billFetchData.CustomerParamsDetails.map((data, i) => (
                      <div class="row flex-position">
                        <div class="col-sm-6">
                          <label class="accordion-content-left-text">
                            {" "}
                            {data.Name} :
                          </label>
                        </div>
                        <div class="col-sm-6 accordion-content-text">
                          <label class="accordion-content-right-text">
                            {data.Value}
                          </label>
                        </div>
                      </div>
                    ))}

                  <div class="row flex-position">
                    <div class="col-sm-6">
                      <label class="accordion-content-left-text">
                        {" "}
                        Bill Date :
                      </label>
                    </div>
                    <div class="col-sm-6 accordion-content-text">
                      <label class="accordion-content-right-text">
                        {billFetchData.BillDate}
                      </label>
                    </div>
                  </div>

                  <div class="row flex-position">
                    <div class="col-sm-6">
                      <label class="accordion-content-left-text">
                        {" "}
                        Bill Due Date :
                      </label>
                    </div>
                    <div class="col-sm-6 accordion-content-text">
                      <label class="accordion-content-right-text">
                        {billFetchData.BillDueDate}
                      </label>
                    </div>
                  </div>

                  {billFetchData.AdditionalDetails &&
                    billFetchData.AdditionalDetails.map((data, i) => (
                      <div class="row flex-position">
                        <div class="col-sm-6">
                          <label class="accordion-content-left-text">
                            {" "}
                            {data.Name} :
                          </label>
                        </div>
                        <div class="col-sm-6 accordion-content-text">
                          <label class="accordion-content-right-text">
                            {data.Value}
                          </label>
                        </div>
                      </div>
                    ))}

                  {billFetchData.BillDetails &&
                    billFetchData.BillDetails.map((data, i) => (
                      <div class="row flex-position">
                        <div class="col-sm-6">
                          <label class="accordion-content-left-text">
                            {" "}
                            {data.Name} :
                          </label>
                        </div>
                        <div class="col-sm-6 accordion-content-text">
                          <label class="accordion-content-right-text">
                            &#x20B9; {data.Value}
                          </label>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12 electricity-bill-field p-0">
          <div class="input-field">
            <input
              onChange={handleAmount}
              id="referral-mobile"
              value={billAmount > 0 ? billAmount : ""}
              type="text"
              placeholder="&nbsp;"
              autoComplete="off"
              maxLength={7}
              minLength={1}
              required
            />
            <label for="referral-mobile"> Amount </label>
          </div>
        </div>
      </div>
    </div>
  );

  const rechargeSection = () => (
    <div>
      <section class="services-section-align mobile-recharge">
        <div class="container">
          <div class="row">
            {/*<!-- mobile recharge start --> */}

            <div class="col-sm-12 col-md-12 col-lg-5 mobile-recharge-left">
              {/* {<div class="mobile-recharge-left">} */}
              <div class="mob-left-sticky box-shadow-1">
                <div class="row">
                  <div class="col-md-12 mobile-recharge-content-head">
                    <h3 class="mobile-recharge-title"> Pay Fastag Bill </h3>
                  </div>
                </div>

                <form>
                  <div class="col-md-12">
                    <div class="row">
                      <div class="col-lg-12 p-0">
                        <div class="dropdown select-option ">
                          <button
                            className={
                              "dropdown-toggle select-toggle select-type" +
                              (selectedOperator ? "Active" : "")
                            }
                            value={selectedOperator}
                            type="button"
                            data-toggle="dropdown"
                            aria-expanded="false"
                          >
                            {selectedOperator ? selectedOperator : "Operator"}
                          </button>
                          <div class="dropdown-menu">
                            {operatorsList &&
                              operatorsList.map((o, i) => (
                                <Link
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setSelectedOperator(o.OperatorName);
                                    setBillFetchError("");
                                    setInputFields([]);
                                    callInputFields(o.OurCode);
                                    setShowBill(false);
                                    handleOperatorSelection(e, o);
                                  }}
                                  type="button"
                                  class="dropdown-item"
                                >
                                  {o.OperatorName}
                                </Link>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {operatorPaymentMode === 2 ? (
                      <div>
                        <div class="row">
                          <div class="col-lg-12 mobile-recharge-field p-0">
                            <div class="input-field">
                              <input
                                onChange={(e) => {}}
                                placeholder="&nbsp;"
                                id="vehicleNo"
                                type="text"
                                required
                                style={{ textTransform: "uppercase" }}
                              />
                              <label for="vehicleNo">Vehicle No</label>
                            </div>
                          </div>
                        </div>

                        <div class="row">
                          <div class="col-lg-12 mobile-recharge-field p-0">
                            <div class="input-field">
                              <input
                                onChange={handleAmount}
                                id="referral-mobile"
                                value={billAmount > 0 ? billAmount : ""}
                                type="text"
                                placeholder="&nbsp;"
                                autocomplete="off"
                                maxLength={7}
                              />
                              <label for="fastagAmount"> Amount </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}

                    {inputFields.map((input, i) => (
                      <div class="row">
                        <div class="col-lg-12 mobile-recharge-field p-0">
                          <div class="input-field">
                            <input
                              onChange={(e) => {
                                handleAllFieldInput(e, i);
                              }}
                              name={input.fieldName}
                              placeholder="&nbsp;"
                              id="referral-mobile"
                              type="text"
                              required
                              style={{ textTransform: "uppercase" }}
                            />
                            <label for="referral-mobile">
                              {input.fieldName}
                            </label>
                          </div>
                          {!inputFields[i].validate ? (
                            <ErrorText
                              error={`Please enter valid ${inputFields[i].fieldName}`}
                            />
                          ) : null}
                        </div>
                      </div>
                    ))}

                    <div class="row">
                      <div class="col-lg-12 electricity-bill-field p-0">
                        <div class="form-group input-group input-field">
                          <span class="input-group-prepend">
                            <div class="input-group-text">+91</div>
                          </span>
                          <input
                            onChange={handleMobileNo}
                            value={mobileNo}
                            id="electricity-bill-user"
                            class="mobile-input"
                            type="tel"
                            placeholder="&nbsp;"
                            autoComplete="off"
                            minLength={10}
                            maxLength={10}
                          />
                          <label for="electricity-bill-user">
                            {" "}
                            Mobile Number{" "}
                          </label>
                        </div>
                      </div>
                    </div>

                    {showBill && fetchBillSection()}

                    {showBillFetchError()}

                    <div class="col-md-12">
                      {!showBill && (
                        <div class="mobile-recharge-btn">
                          <button
                            onClick={!loading && clickFetchBill}
                            class="btn-primery"
                            id="addmoneymodal"
                          >
                            {loading ? <LoadingBar /> : `Fetch Bill`}
                          </button>
                        </div>
                      )}

                      {showBill && (
                        <div class="mobile-recharge-btn">
                          {/* <button onClick={(e)=>{navigate("/services/fastag/online/confirm",{state:{billData:billFetchData,number:mobileNo,operator:selectedOperator,operatorId:selectedOperatorId}})}} class="btn-primery" id="addmoneymodal" disabled={mobileNo?false:true}> Next </button> */}
                          <button
                            onClick={onClickContinue}
                            class="btn-primery"
                            id="addmoneymodal"
                          >
                            {" "}
                            Continue{" "}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </form>
              </div>
              {/* { </div>} */}
            </div>

            <div class="col-sm-12 col-md-12 col-lg-7 mobile-recharge-right-outer">
              <RecentHistory type="FastTag" serviceId={fastagServiceId} />
            </div>

            {/* <MuiSnackBar
              open={isSnackBar}
              setOpen={setIsSnackBar}
              successMsg={successMsg}
              errorMsg={errorMsg}
              setSuccess={setSuccessMsg}
              setError={setErrorMsg}
            /> */}
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <div className="color-body">
      {rechargeSection()}
      <Footer />
    </div>
  );
};

export default FastagFront;
=======
import React from 'react'

const FastagFront = () => {
  return (
    <div>FastagFront</div>
  )
}

export default FastagFront
>>>>>>> ed09810ff29c7919987aade63b7c45f08e55702a

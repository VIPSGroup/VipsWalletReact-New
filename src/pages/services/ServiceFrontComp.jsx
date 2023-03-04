import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getServiceId, operartorsUrl, googleAnalytics } from "../../constants";
import "../../assets/styles/services/mobileRecharge/recharge.css";

import ErrorText from "../../components/common/ErrorText";
import RecentHistory from "../../components/services/RecentHistory";
import ReactGA from "react-ga";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../../components/common";
import { getOperatorsByServiceId } from "../../redux/slices/services/servicesSlice";
import { fetchBill, getInputFieldsByOperator } from "../../redux/slices/services/fastagSlice";
// import { Loading } from "../../components/common";
ReactGA.initialize(googleAnalytics);

const ServiceFrontComp = ({ props, title, serviceId, serviceName }) => {
  // const [operatorsList, setOperatorList] = useState([]);

  const [mobileNo, setMobileNo] = useState("");
  const [selectedOperator, setSelectedOperator] = useState("");
  const [selectedOperatorId, setSelectedOperatorId] = useState("");
  const [isSnackBar, setIsSnackBar] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [billAmount, setBillAmount] = useState(0);
  const [inputFields, setInputFields] = useState([]);

  const [showBill, setShowBill] = useState(false);
  const [billFetchData, setBillFetchData] = useState({});
  const [billFetchError, setBillFetchError] = useState("");
  // const [loading, setLoading] = useState(false);
  const [opImgUrl, setOpImgUrl] = useState("");

 const dispatch= useDispatch()
  let navigate = useNavigate();
  const { loggedInUser } = useSelector(
    (state) => state.loginSlice.loggetInWithOTP
  );
  const { operatorsList } = useSelector(state => state.servicesSlice.operators );
  const { operatorData } = useSelector(state => state.fastagSlice.inputFieldOperator );
  const { billData ,loading} = useSelector(state => state.fastagSlice.getBill );
  const callInputFields = (ourCode) => {
    dispatch(getInputFieldsByOperator(ourCode))
  };

  const handleAllFieldInput = (e, index) => {
    setBillFetchError("");
    setShowBill(false);
    let data = [...inputFields];
    data[index].fieldValue = e.target.value;
    const regex = RegExp(data[index].regex);
    if (!e.target.value.match(regex)) {
      inputFields[index].validate = false;
    } else {
      inputFields[index].validate = true;
    }

    setInputFields(data);
  };

  const clickFetchBill = (e) => {
    e.preventDefault();

    if (selectedOperator) {
      if (mobileNo && mobileNo.length === 10) {
        let validateBBPSField = inputFields.filter((o) => o.validate === false);

        if (validateBBPSField.length !== 0) {
          setIsSnackBar(true);
          setErrorMsg(`Please enter valid ${validateBBPSField[0].fieldName} `);
        } else {
          // setLoading(true);
          const obj = inputFields.reduce(
            (arr, curr) => ({ ...arr, [curr.fieldName]: curr.fieldValue }),
            {}
          );
          obj.MobileNumber = mobileNo;
          obj.OperatorCode = selectedOperatorId;
          obj.Ip = "123";
dispatch(fetchBill({obj,username:loggedInUser.Mobile,password: loggedInUser.TRXNPassword}))
        }
      } else {
        setErrorMsg("Please enter valid mobile number");
        setIsSnackBar(true);
      }
    } else {
      setErrorMsg("Please select operator");
      setIsSnackBar(true);
    }
  };
  useEffect(() => {

    console.log("USeEffect");
    if(billData.ResponseMessage==="Successful"){
      setShowBill(true);
                    setBillFetchData(billData);
                    setBillAmount(parseFloat(billData.BillAmount));
    }else{
      setBillFetchError(billData.ResponseMessage);
    }
  }, [billData])
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
dispatch(getOperatorsByServiceId(serviceId))
  }, [props]);
  useEffect(() => {
    const arr = []
    if(operatorData){
      operatorData.map((d, i) => {
        
        arr.push({
          fieldName: d.name,
          fieldValue: "",
          regex: d.Regex,
          validate: false,
        })
      });
    }
    setInputFields(arr);
  }, [operatorData])
  

  const handleMobileNo = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setMobileNo(value);
  };

  const showBillFetchError = () => (
    <div className="mt-3">
      {billFetchError && (
        <div className="alert alert-danger">{billFetchError}</div>
      )}
    </div>
  );

  const sortOperator = (operators) => {
    let sortedOperators = operators.sort((a, b) =>
      a.OperatorName.toLowerCase() > b.OperatorName.toLowerCase() ? 1 : -1
    );
    return sortedOperators;
  };

  const handleAmount = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setIsSnackBar(false);
    setBillAmount(value);
  };

  const onClick = (e) => {
    e.preventDefault();
    if (billAmount && billAmount > 0) {
      navigate(`/services/common/${serviceName}/confirm`, {
        state: {
          billData: billFetchData,
          number: mobileNo,
          operator: selectedOperator,
          operatorId: selectedOperatorId,
          amount: billAmount,
          inputFieldsData: inputFields,
          serviceId: serviceId,
        },
      });
    } else {
      setIsSnackBar(true);
      setErrorMsg("Please enter valid amount");
    }
  };

  const fetchBillSection = () => (
    <>
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
            <label for="referral-mobile"> Amount </label>
          </div>
        </div>
      </div>
    </>
  );

  const rechargeSection = () => (
    <>
      <section class="services-section-align mobile-recharge">
        <div class="container">
          <div class="row">
            {/*<!-- mobile recharge start --> */}

            <div class="col-sm-12 col-md-12 col-lg-5 mobile-recharge-left">
              {/* { <div class="mobile-recharge-left">} */}
              <div class="mob-left-sticky box-shadow-1">
                <div class="row">
                  <div class="col-md-12 mobile-recharge-content-head">
                    <h3 class="mobile-recharge-title"> Pay {title} Bill </h3>
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
                            <span class="dropdown-text-limit">
                              {" "}
                              {selectedOperator
                                ? selectedOperator
                                : "Operator"}{" "}
                            </span>
                          </button>
                          <div class="dropdown-menu">
                            {operatorsList &&
                              operatorsList.map((o, i) => (
                                <Link
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setSelectedOperator(o.OperatorName);
                                    setOpImgUrl(o.Image);
                                    setSelectedOperatorId(o.OurCode);
                                    setInputFields([]);
                                    callInputFields(o.OurCode);
                                    setShowBill(false);
                                    setBillFetchError("");
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
                            minLength={10}
                            maxLength={10}
                            id="electricity-bill-user"
                            class="mobile-input"
                            type="text"
                            placeholder="&nbsp;"
                            autocomplete="off"
                          />
                          <label for="electricity-bill-user">
                            {" "}
                            Mobile Number{" "}
                          </label>
                        </div>
                      </div>
                    </div>

                    {/*
                                        <div class="row">
                                            <div class="col-lg-12 mobile-recharge-field p-0">
                                                <div class="input-field">
                                                    <input id="referral-mobile" type="text" placeholder="&nbsp;" autocomplete="off" />
                                                    <label for="referral-mobile"> Operator </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-lg-12 mobile-recharge-field p-0">
                                                <div class="input-field">
                                                    <input id="referral-mobile" type="text" placeholder="&nbsp;" autocomplete="off" />
                                                    <label for="referral-mobile"> Circle </label>
                                                </div>
                                            </div>
                                        </div>
                                        */}

                    {showBill && fetchBillSection()}

                    {showBillFetchError()}

                    <div class="col-md-12">
                      {!showBill && (
                        <div class="mobile-recharge-btn">
                          <button
                            onClick={!loading && clickFetchBill}
                            class="btn-primery service-loading-btn"
                            id="addmoneymodal"
                          >
                            {loading ? (
                              
                              <Loading />
                              
                            ) : (
                              `Fetch Bill`
                            )}
                          </button>
                        </div>
                      )}

                      {showBill && (
                        <div class="mobile-recharge-btn">
                          <button
                            onClick={onClick}
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
              {/* {</div>} */}
            </div>

            <div class="col-sm-12 col-md-12 col-lg-7 mobile-recharge-right-outer">
              <RecentHistory serviceId={serviceId} />
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
    </>
  );

  return <>{rechargeSection()}</>;
};

export default ServiceFrontComp;

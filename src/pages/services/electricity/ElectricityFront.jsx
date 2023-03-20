import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../assets/styles/services/electricity/electricity.css";
import {
  jharkandOpCode,
  operartorsUrl,
  torrentOpCode,
} from "../../../constants";
import ErrorText from "../../../components/common/ErrorText";
import RecentHistory from "../../../components/services/RecentHistory";
import { electricityServiceId, googleAnalytics } from "../../../constants";
import ReactGA from "react-ga";
import { useDispatch, useSelector } from "react-redux";
import { Loading, MuiSnackBar, ThemeButton } from "../../../components/common";
import { fetchBill, getInputFieldsByOperator } from "../../../redux/slices/services/fastagSlice";
import { getElectricityOperators, getSubdivisionData } from "../../../redux/slices/services/electricitySlice";
ReactGA.initialize(googleAnalytics);

const ElectricityFront = ({ props }) => {
  // const [operatorsList, setOperatorList] = useState([]);
  const [mobileNo, setMobileNo] = useState("");
  const [selectedOperator, setSelectedOperator] = useState("");
  const [selectedOperatorId, setSelectedOperatorId] = useState("");
  const [opImgUrl, setOpImgUrl] = useState("");
  const [showBill, setShowBill] = useState(false);
  const [billFetchData, setBillFetchData] = useState({});
  const [operatorPaymentMode, setOperatorPaymentMode] = useState("");
  const [billFetchError, setBillFetchError] = useState("");
  const [loading, setLoading] = useState(false);
  const [regexPattern, setRegexPattern] = useState("");
  const [isSnackBar, setIsSnackBar] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [billAmount, setBillAmount] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [subdivision, setSubdivision] = useState();
  const [selectSubdivision, setSelectSubdivision] = useState();
  const [subdivisionCode, setSubdivisionCode] = useState();
  const [city, setSelectCity] = useState();
  const [isClick, setIsClick] = useState(false)
  let citys = ["Agra", "Ahmedabad", "Bhiwandi", "SMK", "Surat"];
  const [inputFields, setInputFields] = useState([]);

 const dispatch= useDispatch()
  let navigate = useNavigate();
  const { loggedInUser } = useSelector(
    (state) => state.loginSlice.loggetInWithOTP
  );
  const { operatorsList } = useSelector(state => state.electricitySlice.electricityOperators );
  const { billData ,billLoading} = useSelector(state => state.fastagSlice.getBill );
  const { operatorData } = useSelector(state => state.fastagSlice.inputFieldOperator );
  const { subDivisionData } = useSelector(state => state.electricitySlice.getSubdivisionData );
  const getTodaysDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    const formatedToday = mm + "/" + dd + "/" + yyyy;

    return formatedToday;
  };

  const callInputFields = (ourCode) => {
    // setIsClick(true)
    dispatch(getInputFieldsByOperator(ourCode))

      if (ourCode === jharkandOpCode) {
        getSubdivision(ourCode);
      } else if (ourCode === torrentOpCode) {
        setSelectCity(citys[0]);
      }
  };

  const handleAllFieldInput = (e, index) => {
    setBillFetchError("");
    setShowBill(false);
    let data = [...inputFields];

    data[index].fieldValue = e.target.value.toUpperCase();

    const regex = RegExp(data[index].regex);
    if (!e.target.value.match(regex)) {
      inputFields[index].validate = false;
    } else {
      inputFields[index].validate = true;
    }
setIsClick(true)
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
    if (selectedOperatorId === jharkandOpCode) {
      inputFields[1].fieldValue = subdivisionCode;
      inputFields[1].validate = true;
    } else if (selectedOperatorId === torrentOpCode) {
      inputFields[1].fieldValue = city;
      inputFields[1].validate = true;
    }

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
dispatch(fetchBill({obj,username:loggedInUser.Mobile,password:loggedInUser.TRXNPassword}))
        }
      } else {
        setIsSnackBar(true);
        setErrorMsg("Enter Valid Mobile Number");
      }
    } else {
      setIsSnackBar(true);
      setErrorMsg("Please Select Operator");
    }
  };
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
    if(operatorData.length===0){
      console.log(operatorData);
      dispatch(getElectricityOperators())
    }
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
    setIsClick(true)
    setInputFields(arr);

    // return ()=>{setIsClick(false)}
  }, [props,operatorData]);
  useEffect(() => {
    if(billData.ResponseMessage==="Successful"){
      setShowBill(true);
                    setBillFetchData(billData);
                    setBillAmount(parseFloat(billData.BillAmount));
    }else{
      setBillFetchError(billData.ResponseMessage);
    }
  }, [billData])
  useEffect(() => {
    if(subDivisionData){
      setSubdivision(sortSubdivision(subDivisionData));
      setSelectSubdivision( subDivisionData[36]?.Name);
      setSubdivisionCode( subDivisionData[36]?.SubDivisionCode);
  }
  }, [subDivisionData])
  
  const getSubdivision = (ourCode) => {
    dispatch(getSubdivisionData(ourCode))
  };

  const handleMobileNo = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setMobileNo(value);
    setBillFetchError("");
  };

  const handleAmount = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setIsSnackBar(false);
    setBillAmount(value);
  };

  const sortSubdivision = (subdivision) => {
    let _sortSubdivision = subdivision.slice().sort((a, b) =>
      a.Name > b.Name ? 1 : -1
    );
    return _sortSubdivision;
  };

  const onClickContinue = (e) => {
    if (billAmount && billAmount > 0) {
      navigate(`/services/electricity/confirm`, {
        state: {
          billData: billFetchData,
          number: mobileNo,
          operator: selectedOperator,
          operatorId: selectedOperatorId,
          amount: billAmount,
          inputFieldsData: inputFields,
          paymentMode: operatorPaymentMode,
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

  //Jharkand Operator View
  const jharkandOperatorFields = () => {
    return (
      <>
        <div class="row">
          <div class="col-lg-12 mobile-recharge-field p-0">
            <div class="input-field">
              <input
                onChange={(e) => {
                  handleAllFieldInput(e, 0);
                }}
                name={inputFields[0]?.fieldName}
                placeholder="&nbsp;"
                id="referral-mobile"
                type="text"
                required
              />
              <label for="referral-mobile">{inputFields[0]?.fieldName}</label>
            </div>
            {!inputFields[0]?.validate ? (
              <ErrorText
                error={`Please enter valid ${inputFields[0]?.fieldName}`}
              />
            ) : null}
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12 p-0">
            <div class="dropdown select-option ">
              <button
                className={
                  "dropdown-toggle select-toggle select-type" +
                  (selectSubdivision ? "Active" : "")
                }
                value={selectSubdivision}
                type="button"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                <span class="dropdown-text-limit">
                  {" "}
                  {selectSubdivision
                    ? selectSubdivision
                    : "Select Subdivision"}{" "}
                </span>
              </button>
              <div class="dropdown-menu">
                {subdivision &&
                  subdivision.map((o, i) => (
                    <Link
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectSubdivision(o.Name);
                        setSubdivisionCode(o.SubDivisionCode);
                        setBillFetchError("");
                        setShowBill(false);
                      }}
                      type="button"
                      class="dropdown-item"
                    >
                      {o.Name}
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  //torrent Operator Fields view
  const torrentOperatorFields = () => {
    return (
      <>
        <div class="row">
          <div class="col-lg-12 mobile-recharge-field p-0">
            <div class="input-field">
              <input
                onChange={(e) => {
                  handleAllFieldInput(e, 0);
                }}
                name={inputFields[0].fieldName}
                placeholder="&nbsp;"
                id="referral-mobile"
                type="text"
                required
              />
              <label for="referral-mobile">{inputFields[0].fieldName}</label>
            </div>
            {!inputFields[0].validate ? (
              <ErrorText
                error={`Please enter valid ${inputFields[0].fieldName}`}
              />
            ) : null}
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12 p-0">
            <div class="dropdown select-option ">
              <button
                className={
                  "dropdown-toggle select-toggle select-type" +
                  (city ? "Active" : "")
                }
                value={city}
                type="button"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                {city ? city : "Select City"}
              </button>
              <div class="dropdown-menu">
                {citys &&
                  citys.map((o, i) => (
                    <Link
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectCity(o);
                        setBillFetchError("");
                        setShowBill(false);
                      }}
                      type="button"
                      class="dropdown-item"
                    >
                      {o}
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

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
      {amountField()}
    </div>
  );

  const amountField = () => (
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
            readOnly={operatorPaymentMode !== 2}
          />
          <label for="referral-mobile"> Amount </label>
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
                    <h3 class="mobile-recharge-title">
                      {" "}
                      Pay Electricity Bill{" "}
                    </h3>
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
                            // onClick={()=>{setIsClick(true)}}
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
                                    setBillFetchError("");
                                    setInputFields([]);
                                    callInputFields(o.OurCode);
                                    setShowBill(false);
                                    handleOperatorSelection(e, o);
                                    setSelectSubdivision(null);
                                    setSelectCity(null);
                                    setBillAmount(null);
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
                    {selectSubdivision
                      ? jharkandOperatorFields()
                      : city
                      ? torrentOperatorFields()
                      : selectedOperator && inputFields.map((input, i) => (
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
                                <label
                                  for="referral-mobile"
                                  class="input-text-limite"
                                >
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

                    {operatorPaymentMode === 2 && amountField()}

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

                    {showBill && mobileNo && fetchBillSection()}

                    {mobileNo.length===10 && showBillFetchError()}

                    <div class="col-md-12">
                      {!showBill && operatorPaymentMode !== 2 && (
                        <div class="mobile-recharge-btn">
                          {/* <button
                            onClick={!loading && clickFetchBill}
                            class="btn-primery"
                            id="addmoneymodal"
                          >
                            {billLoading ? <Loading /> : `Fetch Bill`}
                          </button> */}
                          <ThemeButton onClick={clickFetchBill} loading={billLoading} value={"Fetch Bill"}/>
                        </div>
                      )}
                      {operatorPaymentMode === 2 || showBill ? (
                        <div class="mobile-recharge-btn">
                          {/* <button
                            onClick={onClickContinue}
                            class="btn-primery"
                            id="addmoneymodal"
                          >
                            {" "}
                            Continue{" "}
                          </button> */}
                          <ThemeButton onClick={onClickContinue} value={"Continue"}/>
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                </form>
              </div>
              {/* { </div>} */}
            </div>

            <div class="col-sm-12 col-md-12 col-lg-7 mobile-recharge-right-outer">
              <RecentHistory serviceId={electricityServiceId} />
            </div>

            <MuiSnackBar
              open={isSnackBar}
              setOpen={setIsSnackBar}
              successMsg={successMsg}
              errorMsg={errorMsg}
              setSuccess={setSuccessMsg}
              setError={setErrorMsg}
            />
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <div className="color-body">
      {rechargeSection()}
    </div>
  );
};

export default ElectricityFront;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../assets/styles/services/mobileRecharge/recharge.css";
import {
  operartorsUrl,
  mobileServiceId,
  postpaidServiceId,
} from "../../../constants";
import { googleAnalytics } from "../../../constants";
import ReactGA from "react-ga";
import { useDispatch, useSelector } from "react-redux";
import {
  BillAvenueBrowsePlan,
  RecentHistory,
} from "../../../components/services";
import BrowsePlans from "./BrowsePlans";
import { getActiveApi, getCircleAndOperatorByNumber, getRechargeCircleList } from "../../../redux/slices/services/rechargeSlice";
import { getOperators } from "../../../redux/slices/services/commonSlice";
import { MuiSnackBar, ThemeButton } from "../../../components/common";

ReactGA.initialize(googleAnalytics);

const Recharge = ({ props }) => {
  const [rechargeType, setRechargeType] = useState("Prepaid");
  const [mobileNo, setMobileNo] = useState("");
  const [selectedOperator, setSelectedOperator] = useState("");
  const [selectedOperatorId, setSelectedOperatorId] = useState("");
  const [selectedCircle, setSelectedCircle] = useState("");
  const [selectedCircleId, setSelectedCircleId] = useState("");
  const [sectionCount, setSectionCount] = useState(1);
  const [opImgUrl, setOpImgUrl] = useState("");
  const [postpaidAmount, setPostpaidAmount] = useState("");
  const [isSnackBar, setIsSnackBar] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  let navigate = useNavigate();
 const dispatch= useDispatch()
  const { loggedInUser } = useSelector(state => state.loginSlice.loggetInWithOTP);
  const { browseApi } = useSelector( state => state.rechargeSlice.browsePlan );
  const { operatorsList } = useSelector(state => state.commonSlice.operators );
  const { rechargeCircleList } = useSelector(state => state.rechargeSlice.rechargeCircle
  );
  const { circleAndOperator } = useSelector(state => state.rechargeSlice.circleAndOperatorByNumber
  );
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

  const clickNext = (e) => {
    e.preventDefault();
    let mobileNumberRegex = RegExp("^[6-9][0-9]{9}$");
    if (mobileNo.length === 10 && mobileNo.match(mobileNumberRegex)) {
      if (selectedOperator) {
        if (selectedCircle) {
          setSectionCount(2);
        } else {
          setIsSnackBar(true);
          setErrorMsg("Select Circle");
        }
      } else {
        setIsSnackBar(true);
        setErrorMsg("Select Operator");
      }
    } else {
      setIsSnackBar(true);
      setErrorMsg("Enter valid Mobile Number");
    }
  };

  useEffect(() => {
    if(loggedInUser){
      ReactGA.pageview(window.location.pathname);
      dispatch(getActiveApi())
      dispatch(getRechargeCircleList())
      getOperatorsApi(mobileServiceId);
  
       if(circleAndOperator && circleAndOperator[0]){
       setSelectedCircle(circleAndOperator[0].Circle);
          setSelectedOperator(circleAndOperator[0].OperatorName.split("-")[0]);
          setSelectedOperatorId(
            circleAndOperator[0].OperatorId === 151
              ? "JIO"
              : circleAndOperator[0].OperatorId
          );
          setSelectedCircleId(circleAndOperator[0].CircleId);
  
          operatorsList.forEach((o, i) => {
            if (o.OperatorName == circleAndOperator[0].OperatorName) {
              setOpImgUrl(o.Image);
            }
          });
        }
    }else{
      navigate("/login")
    }
  
  }, [props,circleAndOperator]);

  const getOperatorsApi = (serviceId) => {
    dispatch(getOperators(serviceId))
  };

  const handleMobileNo = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setMobileNo(value);
    setIsSnackBar(false);
    if (e.target.value.length === 10) {
      if (rechargeType === "Prepaid") {
        dispatch(getCircleAndOperatorByNumber(e.target.value))
      }
    }
  };
  const handleAmount = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setIsSnackBar(false);
    setPostpaidAmount(value);
  };

  const onPostPaid = (e) => {
    e.preventDefault();
    let mobileNumberRegex = RegExp("^[6-9][0-9]{9}$");
    if (mobileNo.length === 10 && mobileNo.match(mobileNumberRegex)) {
      if (selectedOperator) {
        if (postpaidAmount && postpaidAmount > 0) {
          navigate("/services/mobilerecharge/confirm", {
            state: {
              number: mobileNo,
              operator: selectedOperator,
              circle: selectedCircle,
              operatorId: selectedOperatorId,
              circleId: 0,
              amount: postpaidAmount,
            },
          });
        } else {
          setIsSnackBar(true);
          setErrorMsg("Enter Valid Amount");
        }
      } else {
        setIsSnackBar(true);
        setErrorMsg("Select Operator");
      }
    } else {
      setIsSnackBar(true);
      setErrorMsg("Enter valid Mobile Number");
    }
  };

  const rechargeSection = () => (
    <>
      <section class="services-section-align mobile-recharge">
        <div class="container">
          <div class="row">
            {/*<!-- mobile recharge start --> */}

            <div class="col-sm-12 col-md-12 col-lg-4 mobile-recharge-left">
              {/* {<div class="mobile-recharge-left">} */}
              <div class="mob-left-sticky box-shadow-1">
                <div class="row">
                  <div class="col-md-12 mobile-recharge-content-head">
                    <h3 class="mobile-recharge-title">
                      {" "}
                      Recharge Mobile Recharge{" "}
                    </h3>
                  </div>
                </div>
                <form>
                  <div class="col-md-12">
                    <div class="row">
                      <div class="select-recharge-mode">
                        <label>
                          <input
                            onChange={(e) => {
                              setRechargeType(e.target.value);
                              // setOperatorList([]);
                              getOperatorsApi(mobileServiceId);
                              setSelectedOperator("");
                              setSelectedCircle("");
                              setSelectedCircleId(0);
                            }}
                            type="radio"
                            name="radio-button"
                            value="Prepaid"
                            checked={rechargeType == "Prepaid" ? true : false}
                          />
                          <span> Prepaid </span>
                        </label>
                        <label class="right-button">
                          <input
                            onChange={(e) => {
                              setRechargeType(e.target.value);
                              // setOperatorList([]);
                              setSelectedOperator("");
                              getOperatorsApi(postpaidServiceId);
                              setSelectedCircle("");
                              setSelectedCircleId(0);
                            }}
                            type="radio"
                            name="radio-button"
                            value="Postpaid"
                            checked={rechargeType == "Postpaid" ? true : false}
                          />
                          <span> Postpaid </span>
                        </label>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-lg-12 mobile-recharge-field p-0">
                        <div class="form-group input-group input-field">
                          <span class="input-group-prepend">
                            <div class="input-group-text">+91</div>
                          </span>
                          <input
                            onChange={handleMobileNo}
                            value={mobileNo}
                            id="mobile-recharge-user"
                            class="mobile-input"
                            type="text"
                            placeholder="&nbsp;"
                            autocomplete="off"
                            maxLength={10}
                            minLength={10}
                          />
                          <label for="mobile-recharge-user">
                            {" "}
                            Mobile Number{" "}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-12 p-0">
                        <div class="dropdown select-option ">
                          <button
                            className={
                              "dropdown-toggle select-toggle select-type" +
                              (selectedOperator && mobileNo.length===10 ? "Active" : "")
                            }
                            value={selectedOperator}
                            type="button"
                            data-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <span class="dropdown-text-limit">
                              {" "}
                              {selectedOperator && mobileNo.length===10
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
                                    setIsSnackBar(false);
                                    setSelectedOperator(o.OperatorName);
                                    setOpImgUrl(o.Image);
                                    setSelectedOperatorId(o.Id);
                                  }}
                                  type="button"
                                  className={"dropdown-item"}
                                >
                                  {o.OperatorName}
                                </Link>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {rechargeType == "Prepaid" ? (
                      <div class="row">
                        <div class="col-lg-12 p-0">
                          <div class="dropdown select-option ">
                            <button
                              className={
                                "dropdown-toggle select-toggle select-type" +
                                (selectedCircle && mobileNo.length===10 ? "Active" : "")
                              }
                              type="button"
                              data-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <span class="dropdown-text-limit">
                                {" "}
                                {selectedCircle && mobileNo.length===10
                                  ? selectedCircle
                                  : "Circle"}{" "}
                              </span>
                            </button>
                            <div class="dropdown-menu">
                              {rechargeCircleList &&
                                rechargeCircleList.map((c, i) => (
                                  <Link
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setIsSnackBar(false);
                                      setSelectedCircle(c.CIRCLE);
                                      setSelectedCircleId(c.ID);
                                    }}
                                    type="button"
                                    class="dropdown-item"
                                  >
                                    {c.CIRCLE}
                                  </Link>
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}
                    {rechargeType == "Postpaid" ? (
                      <div class="row">
                        <div class="col-lg-12 mobile-recharge-field p-0">
                          <div class="input-field">
                            <input
                              onChange={handleAmount}
                              id="referral-mobile"
                              value={postpaidAmount > 0 ? postpaidAmount : ""}
                              type="text"
                              placeholder="&nbsp;"
                              autocomplete="off"
                              maxLength={7}
                            />
                            <label for="referral-mobile"> Amount </label>
                          </div>
                        </div>
                      </div>
                    ) : null}

                    <div class="col-md-12">
                      {rechargeType == "Prepaid" ? (
                        <div class="mobile-recharge-btn">
                          <ThemeButton onClick={clickNext} value={"Continue"}/>
                          {/* <button
                            onClick={clickNext}
                            class="btn-primery"
                            id="addmoneymodal"
                          >
                            {" "}
                            Continue{" "}
                          </button> */}
                        </div>
                      ) : (
                        <div class="mobile-recharge-btn">
                          <ThemeButton onClick={onPostPaid} value={"Continue"}/>
                          {/* <button
                            onClick={onPostPaid}
                            class="btn-primery"
                            id="addmoneymodal"
                          >
                            {" "}
                            Continue{" "}
                          </button> */}
                        </div>
                      )}
                    </div>
                  </div>
                </form>
              </div>
              {/* {</div>} */}
            </div>

            <div class="col-sm-12 col-md-12 col-lg-8 mobile-recharge-right-outer">
              <RecentHistory
                serviceId={mobileServiceId}
                setMobileNo={setMobileNo}
                type={"Mobile"}
              />
            </div>
{/* {isSnackBar && <SnackBar errorMsg={errorMsg} />} */}
            <MuiSnackBar
              open={isSnackBar}
              setOpen={setIsSnackBar}
              // successMsg={successMsg}
              // setSuccess={setSuccessMsg}
              errorMsg={errorMsg}
              setError={setErrorMsg}
            />
          </div>
        </div>
      </section>
    </>
  );
  return (
    <div className="color-body">
      {browseApi.Id == 10 ? (
        sectionCount === 1 ? (
          rechargeSection()
        ) : (
          <BrowsePlans
            number={mobileNo}
            imgurl={opImgUrl}
            operator={selectedOperator}
            circle={selectedCircle}
            activeApiId={browseApi.Id}
            operatorId={selectedOperatorId}
            circleId={selectedCircleId}
            setSection={setSectionCount}
          />
        )
      ) : null}
      {browseApi.Id == 9 ? (
        sectionCount === 1 ? (
          rechargeSection()
        ) : (
          <BillAvenueBrowsePlan
            number={mobileNo}
            imgurl={opImgUrl}
            operator={selectedOperator}
            circle={selectedCircle}
            activeApiId={browseApi.Id}
            operatorId={selectedOperatorId}
            circleId={selectedCircleId}
            setSection={setSectionCount}
          />
        )
      ) : null}
      {/* {browseApi.Id == 10 &&  <BrowsePlans
            number={mobileNo}
            imgurl={opImgUrl}
            operator={selectedOperator}
            circle={selectedCircle}
            activeApiId={browseApi.Id}
            operatorId={selectedOperatorId}
            circleId={selectedCircleId}
            setSection={setSectionCount}
          />} */}
      
    </div>
  );
};

export default Recharge;

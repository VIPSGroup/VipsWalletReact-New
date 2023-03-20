import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../assets/styles/services/mobileRecharge/recharge.css";
import RecentHistory from "../../../components/services/RecentHistory";

import {
  dthServiceId,
  mobileServiceId,
  googleAnalytics,
} from "../../../constants";
import ReactGA from "react-ga";
import { useDispatch, useSelector } from "react-redux";
import { getOperators } from "../../../redux/slices/services/commonSlice";
import { MuiSnackBar, ThemeButton } from "../../../components/common";

ReactGA.initialize(googleAnalytics);
const DthFront = ({ props }) => {
  const [mobileNo, setMobileNo] = useState("");
  const [selectedOperator, setSelectedOperator] = useState("");
  const [selectedOperatorId, setSelectedOperatorId] = useState("");
  const [selectedCircle, setSelectedCircle] = useState("");
  const [selectedCircleId, setSelectedCircleId] = useState("");
  const [opImgUrl, setOpImgUrl] = useState("");
  const [amount, setamount] = useState("");
  const [isSnackBar, setIsSnackBar] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  let navigate = useNavigate();
  const { operatorsList } = useSelector(state => state.commonSlice.operators );
const dispatch= useDispatch()
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
    dispatch(getOperators(dthServiceId))
  }, [props]);

  const handleMobileNo = (e) => {
    const re = /^[0-9\b]+$/;
    setIsSnackBar(false);
    if (e.target.value === "" || re.test(e.target.value)) {
      setMobileNo(e.target.value);
    }
  };
  const handleAmount = (e) => {
    const re = /^[0-9\b]+$/;
    setIsSnackBar(false);
    if (e.target.value === "" || re.test(e.target.value)) {
      setamount(e.target.value);
    }
  };

  const onNext = (e) => {
    e.preventDefault();
    if (mobileNo) {
      if (selectedOperator) {
        if (amount && amount > 0) {
          navigate("/services/dth/confirm", {
            state: {
              number: mobileNo,
              operator: selectedOperator,
              circle: selectedCircle,
              operatorId: selectedOperatorId,
              circleId: selectedCircleId,
              amount: amount,
              // operator:selectedOperator.operator
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
      setErrorMsg("Enter valid DTH Number");
    }
  };

  const rechargeSection = () => (
    <div>
      <section class="services-section-align mobile-recharge">
        <div class="container">
          <div class="row">
            {/*<!-- mobile recharge start --> */}

            <div class="col-sm-12 col-md-12 col-lg-4 mobile-recharge-left">
              {/* {<div class="">} */}
              <div class="mob-left-sticky box-shadow-1">
                <div class="row">
                  <div class="col-md-12 mobile-recharge-content-head">
                    <h3 class="mobile-recharge-title">
                      {" "}
                      Recharge or Pay DTH Bill{" "}
                    </h3>
                  </div>
                </div>
                <form>
                  <div class="col-md-12">
                    <div class="row">
                      <div class="col-lg-12 mobile-recharge-field p-0">
                        <div class="input-field">
                          <input
                            onChange={handleMobileNo}
                            id="referral-mobile"
                            value={mobileNo}
                            type="text"
                            placeholder="&nbsp;"
                            autocomplete="off"
                            maxLength={12}
                          />
                          <label for="referral-mobile"> DTH Number </label>
                        </div>
                      </div>
                    </div>

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
                                    setIsSnackBar(false);
                                    setSelectedOperator(o.OperatorName);
                                    setOpImgUrl(o.Image);
                                    setSelectedOperatorId(o.OurCode);
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

                    <div class="row">
                      <div class="col-lg-12 mobile-recharge-field p-0">
                        <div class="input-field">
                          <input
                            onChange={handleAmount}
                            id="dth-bill-amt"
                            value={amount > 0 ? amount : ""}
                            type="text"
                            placeholder="&nbsp;"
                            autocomplete="off"
                            minLength={1}
                            maxLength={6}
                          />
                          <label for="dth-bill-amt"> Amount </label>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-12">
                      <div class="mobile-recharge-btn">
                        {/* <button
                          onClick={onNext}
                          class="btn-primery"
                          id="addmoneymodal"
                        >
                          {" "}
                          Continue{" "}
                        </button> */}
                        <ThemeButton onClick={onNext} value={"Continue"}/>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              {/* {</div>} */}
            </div>

            <div class="col-sm-12 col-md-12 col-lg-8 mobile-recharge-right-outer">
              <RecentHistory
                serviceId={"1"}
                fetchServiceId={mobileServiceId}
                setMobileNo={setMobileNo}
                type={"dth"}
              />
            </div>
{/* {isSnackBar && <SnackBar errorMsg={errorMsg}/>} */}
            <MuiSnackBar
              open={isSnackBar}
              setOpen={setIsSnackBar}
              // successMsg={successMsg}
              errorMsg={errorMsg}
              setError={setErrorMsg}
              // setSuccess={setSuccessMsg}
            />
          </div>
        </div>
      </section>
    </div>
  );
  return <div className="color-body">{rechargeSection()}</div>;
};
export default DthFront;

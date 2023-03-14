import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { useEffect } from "react";

import "../../assets/styles/services/serviceSuccess.css";
import "../../assets/styles/styles.css";
import { needHelpUrl, googleAnalytics } from "../../constants";
import ReactGA from "react-ga";
import { useSelector } from "react-redux";
import { ThemeButton } from "../../components/common";
ReactGA.initialize(googleAnalytics);

const ServiceSuccess = () => {
  let navigate = useNavigate();
  const location = useLocation();
//  const history = useHistory()
  const props = location.state;
 console.log(props);
// const { rechargeData } = useSelector(state => state.commonSlice.finalRecharge);
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
    // return null
//     if(props==null){
// console.warn("null ahe");
//     }
  }, []);
  return (
    <div className="color-body">
    <section class="section-align recharge-success">
      <div class="container">
        <div class="container">
          <div class="section-head">
            <h1 class="section-head-title">
              <a class="" href="/">
                <img
                  src="/images/VipslogoMain.png"
                  alt="VIPS Logo"
                  class="img-fluid payment-head-logo"
                />
              </a>
            </h1>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-xl-6 col-lg-6 col-md-8 col-sm-12 recharge-success-outer box-shadow-1 border-0 mx-auto">
              <div class="recharge-success-card">
                <div class="recharge-success-body">
                  {/** <!-- success animation start --> */}
                  <div class="col-md-12">
                    {props?.status.includes("Success") ||
                    props?.status.includes("Reversal") ? (
                      <div class="recharge-seccess-box">
                        <div class="recharge-success-inner success-animation">
                          <svg
                            viewBox="0 0 26 26"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g
                              stroke="currentColor"
                              stroke-width="2"
                              fill="none"
                              fill-rule="evenodd"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <path
                                class="circle"
                                d="M13 1C6.372583 1 1 6.372583 1 13s5.372583 12 12 12 12-5.372583 12-12S19.627417 1 13 1z"
                              />
                              <path
                                class="tick"
                                d="M6.5 13.5L10 17 l8.808621-8.308621"
                              />
                            </g>
                          </svg>

                          <p class="recharge-success-amt">
                            {" "}
                            &#x20B9; {props?.amount}
                          </p>
                          <br />
                          <p class="recharge-success-msg"> {props?.status} </p>
                        </div>
                      </div>
                    ) : null}

                    {/** <!-- success animation end --> */}

                    {/** <!-- warning animation start --> */}
                    {props?.status.includes("Recharge under process") ||
                    props?.status.includes("Pending") ? (
                      <div class="recharge-seccess-box">
                        <div class="recharge-success-inner warning-animation">
                          <div class="svg-box">
                            <svg class="circular yellow-stroke">
                              <circle
                                class="path"
                                cx="75"
                                cy="75"
                                fill="none"
                                stroke-width="5"
                                stroke-miterlimit="10"
                                r="38"
                              ></circle>
                            </svg>
                            <svg class="alert-sign yellow-stroke">
                              <g transform="matrix(1,0,0,1,-615.516,-257.346)">
                                <g transform="matrix(0.56541,-0.56541,0.56541,0.56541,93.7153,475.69)">
                                  <path
                                    class="line"
                                    d="M634.087,300.805L673.361,261.53"
                                    fill="none"
                                  ></path>
                                </g>
                                <g transform="matrix(2.27612,-2.46519e-32,0,2.27612,-792.339,-420.97)">
                                  <circle
                                    class="dot"
                                    cx="621.52"
                                    cy="316.126"
                                    r="1.318"
                                  ></circle>
                                </g>
                              </g>
                            </svg>
                          </div>
                          <p class="recharge-success-amt">
                            {" "}
                            ₹ {props?.amount}
                          </p>
                          <p class="recharge-success-msg"> {props?.status} </p>
                        </div>
                      </div>
                    ) : null}
                    {/**
                     *
                     */}
                    {/** <!-- warning animation end -->*/}
                    {/** <!-- faild animation start --> */}

                    {props?.status.includes("Failure") ||
                    props?.status.includes("Failed") ? (
                      <div class="recharge-seccess-box">
                        <div class="recharge-success-inner faild-animation">
                          <div class="svg-box">
                            <svg class="circular red-stroke">
                              <circle
                                class="path"
                                cx="75"
                                cy="75"
                                r="38"
                                fill="none"
                                stroke-width="5"
                                stroke-miterlimit="10"
                              />
                            </svg>
                            <svg class="cross red-stroke">
                              <g transform="matrix(0.79961,8.65821e-32,8.39584e-32,0.79961,-502.652,-204.518)">
                                <path
                                  class="first-line"
                                  d="M634.087,300.805L673.361,261.53"
                                  fill="none"
                                />
                              </g>
                              <g transform="matrix(-1.28587e-16,-0.79961,0.79961,-1.28587e-16,-204.752,543.031)">
                                <path
                                  class="second-line"
                                  d="M634.087,300.805L673.361,261.53"
                                />
                              </g>
                            </svg>
                          </div>
                          <p class="recharge-success-amt">
                            {" "}
                            &#x20B9; {props?.amount}
                          </p>
                          <p class="recharge-success-msg"> {props?.status} </p>
                        </div>
                      </div>
                    ) : null}
                    {/**
                     *
                     * <!--  -->
                     */}
                    {/** <!-- faild animation end --> */}
                  </div>

                  <div class="row">
                    <div class="col-md-12 recharge-success-content-head">
                      <h3 class="recharge-success-content-title">
                        {" "}
                        Order Summary{" "}
                      </h3>
                    </div>
                  </div>
                  <div class="recharge-success-summery">
                    <div class="row mb-3">
                      <div class="col-12 col-xs-12">
                        <span>
                          {" "}
                          {props?.type === "Mobile"
                            ? "Mobile Number"
                            : "Number"}{" "}
                          :{" "}
                        </span>
                        <span class="recharge-success-right-text">
                          {" "}
                          {props?.type === "Mobile" ? "+91" : ""}{" "}
                          {props?.mobileNo}{" "}
                        </span>
                      </div>
                    </div>

                    <div class="row mb-3">
                      <div class="col-12 col-xs-12">
                        <span> Operator : </span>
                        <span class="recharge-success-right-text">
                          {" "}
                          {props?.operator}{" "}
                          {props?.circle ? `| ${props?.circle}` : ""}{" "}
                        </span>
                      </div>
                    </div>

                    <div class="row mb-3">
                      <div class="col-12 col-xs-12">
                        <span> Paid On : </span>
                        <span class="recharge-success-right-text">
                          {" "}
                          {props?.date}{" "}
                        </span>
                      </div>
                    </div>

                    <div class="row mb-3">
                      <div class="col-12 col-xs-12">
                        <span> Transaction Id : </span>
                        <span class="recharge-success-right-text">
                          {" "}
                          {props?.transactionId}{" "}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div class="recharge-success-help text-center mb-4">
                    <a href={needHelpUrl} target="_blank">
                      {" "}
                      Need help?{" "}
                    </a>
                  </div>

                  <div class="recharge-success-btn">
                    <ThemeButton onClick={() => {navigate("/")}} value={"Done"}/>
                    {/* <button onClick={() => navigate("/")} class="btn-primery">
                      {" "}
                      Done{" "}
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  );
};

export default ServiceSuccess;

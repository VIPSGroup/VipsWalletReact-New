import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import Modal from "react-bootstrap/Modal";
import "../../assets/styles/authentication/signupModal.css";
import { MdArrowBack } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import SelectField from "./SelectField";
import { Loading, MuiSnackBar, ThemeButton } from "../common";
import {
  getStateCity,
  signUpUser,
  signUpWithOtp,
  validateReference,
} from "../../redux/slices/profile/signUpSlice";
import { resetState } from "../../redux/slices/profile/loginSlice";
import Otp from "./Otp";
import { Spin } from "antd";

const SignUpForm = ({ setIsSignIn }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isUserExist } = useSelector((state) => state.loginSlice.checkUser);
  const { validateNo } = useSelector(
    (state) => state.signUpSlice.validateNumber
  );
  const { response, loading } = useSelector(
    (state) => state.signUpSlice.signUpOtp
  );
  const { newUser, otploading } = useSelector(
    (state) => state.signUpSlice.signUp
  );
  const [getData, setGetData] = useState({});
  const [show, setShow] = useState(true);
  const [signupFormCount, setSignupFormCount] = useState(1);
  const [otp, setOtp] = useState("");
  const [pincode, setPincode] = useState("");
  const [errorMsg, setErrorMsg] = useState();
  const [successMsg, setSuccessMsg] = useState();
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [refError, setRefError] = useState("");
  const [isSnackBar, setIsSnackBar] = useState(false);
  const [refId, setRefId] = useState("");
  const [isClass, setIsClass] = useState(true);
  const [userDetails, setUserDetails] = useState({});
  const [ip, setIp] = useState("");
  const signUpFormik = useFormik({
    initialValues: {
      fName: "",
      lName: "",
      emailId: "",
      refId: "",
      password: "",
      pincode: "",
      termsCheck: false,
    },
    validationSchema: yup.object({
      fName: yup
        .string()
        .required("Please Enter Your First Name")
        .matches(/^[a-zA-Z\.\s]{3,20}$/, "Please Enter Valid First Name"),
      lName: yup
        .string()
        .required("Please Enter Your Last Name")
        .matches(/^[a-zA-Z\.\s]{3,20}$/, "Please Enter Valid Last Name"),
      emailId: yup
        .string()
        .email("Please Enter Valid Email")
        .required("Please Enter Your email"),
      refId: yup
        .string()
        .matches(
          /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/,
          "Please Enter Valid Number"
        ),
      password: yup
        .string()
        .min(8)
        .max(16)
        .required("Please Enter Password")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),
      pincode: yup.string().required("Please Enter Pincode"),
    }),
    onSubmit: (values, { resetForm }) => {
      if (getData.stateName != "" && getData.cityName != "") {
        if (signUpFormik.values.termsCheck) {
          setIsSnackBar(false);
          // setErrorMsg("")
          if (!refError) {
            setUserDetails({
              ...values,
              cityId: getData.cityId,
              stateId: getData.stateId,
              RefId: refId,
              pincodeId:getData.pincodeId,
              Ip: ip,
              userName: isUserExist && isUserExist[1],
            });
            dispatch(
              signUpWithOtp({
                userName: isUserExist && isUserExist[1],
                emailId: signUpFormik.values.emailId,
              })
            );
            setSignupFormCount(2);
          }
        } else {
          setSuccessMsg("");
          setIsSnackBar(true);
          setErrorMsg("You must accept the terms and conditions");
        }
      }
    },
  });
 
  useEffect(() => {
    if (isUserExist && isUserExist[1]) {
    } else {
      navigate("/login");
    }
    if (signUpFormik.values.refId.length === 10) {
      setRefId(signUpFormik.values.refId);
      dispatch(validateReference(signUpFormik.values.refId));
    }

    if (!ip) {
      fetch("https://api.ipify.org?format=json")
        .then((response) => response.json())
        .then((user) => {
          setIp(user.ip);
        });
    }

    if (response?.ResponseStatus == 1) {
      setErrorMsg("");
      setIsSnackBar(true);
      setSuccessMsg(response.Remarks);
      setTimeout(() => {
        setIsSnackBar(false);
      }, 2000);
    } else if (response?.ResponseStatus == 0) {
      setSuccessMsg("");
      setIsSnackBar(true);
      setErrorMsg(response.Remarks);
    }
    if (newUser?.ResponseStatus == 1 && otp.length === 6) {
      navigate("/");
      setErrorMsg("");
      setIsSnackBar(true);
      setSuccessMsg("user Registered Successfully");
      window.location.reload();
    } else if (newUser?.ResponseStatus == 0 && otp.length === 6) {
      setSuccessMsg("");
      setIsSnackBar(true);
      setErrorMsg(newUser.Remarks);
    }
  }, [
    signUpFormik.values.refId,
    newUser,
    response,
    signUpFormik.values.password,
    signUpFormik.values.pincode,
  ]);
 const onArrowBack=(e)=>{
  e.preventDefault();
        setSignupFormCount(1);
        setOtp("");
 }
  const handlePincode = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setPincode(value);
    if (e.target.value.length === 6) {
      signUpFormik.values.pincode = e.target.value;
      getStateCity(e.target.value).then((response) => {
        if (response?.ResponseStatus == 1) {
          setGetData({
            ...getData,
            stateName: response.Data[0].StateName,
            cityName: response.Data[0].CityName,
            cityId: response.Data[0].CityId,
            stateId: response.Data[0].StateId,
            pincodeId: response.Data[0].PincodeId,
            stateError: false,
            cityError: false,
          });
        } else if (response?.ResponseStatus == 0) {
          setGetData({
            ...getData,
            stateName: "",
            stateId: "",
            stateError: false,
            cityId: "",
            cityName: "",
            cityError: false,
          });
        }
      });
    }
    // dispatch(getStateCity(e.target.value))

    if (e.target.value.length == 0) {
      setGetData({
        ...getData,
        cityId: "",
        stateId: "",
        cityName: "",
        stateName: "",
      });
    }
  };
  const resendOtp=(e)=>{
    e.preventDefault()
    setOtp("");
    setSignupFormCount(2)
    dispatch(
      signUpWithOtp({
        userName: isUserExist && isUserExist[1],
        emailId: signUpFormik.values.emailId,
      })
    );
  }
  const clickVerifySignupOtp = (e) => {
    e.preventDefault();
    dispatch(signUpUser({ ...userDetails, Otp: otp }));
  };
  return (
    <>
      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
        centered
        keyboard={false}
        className={
          signupFormCount === 1
            ? "modal fade signup-modal"
            : "modal fade otp-modal"
        }
        id="exampleModal"
        onExit={() => setShow(false)}
      >
        {response?.ResponseStatus == 1 && signupFormCount == 2 ? (
 <Spin spinning={loading}>
   <Otp otp={otp} setOtp={setOtp} setFormCount={setSignupFormCount} onArrowBack={onArrowBack} mobileno={isUserExist && isUserExist[1]} handleClick={clickVerifySignupOtp} loading={otploading} resendOtp={resendOtp}/>
 </Spin>

        ) : (
          <>
            <button
              class="close signup-close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                setIsSignIn(true);
                dispatch(resetState());
              }}
            >
              <MdArrowBack />
            </button>
            <section class="loginPage mbTopSpace">
              <div class="row no-gutters1">
                <div class="col-lg-4 signupBgCol order-lg-last d-none d-lg-block">
                  <div class="row no-gutters1 align-items-center">
                    <div class="col-12">
                      <div class="signupLogoCol"></div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-8 align-self-center">
                  <div class="signupForm-outer">
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="titleMain formText text-center">
                          <img src="/images/VipsLogoMain.png" alt="VIPS Logo" />
                          <h2>Sign up to get Started</h2>
                        </div>
                      </div>
                    </div>
                    <div class="formStyle">
                      <form
                        class=" signup-form"
                        onSubmit={signUpFormik.handleSubmit}
                      >
                        <div class="row">
                          <div class="col-lg-6">
                            <div class="input-field">
                              <input
                                type="text"
                                name="fName"
                                value={signUpFormik.values.fName}
                                className={
                                  signUpFormik.errors.fName &&
                                  signUpFormik.touched.fName
                                    ? " is-invalid"
                                    : ""
                                }
                                autocomplete="off"
                                onChange={signUpFormik.handleChange}
                                onBlur={signUpFormik.handleBlur}
                                autoFocus={true}
                                id="enter-first-name"
                                placeholder="&nbsp;"
                              />
                              <label for="enter-first-name" class="label-name">
                                <span class="content-name">
                                  Enter First Name
                                </span>
                              </label>
                              <div className="invalid-feedback text-danger">
                                {signUpFormik.errors.fName}
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-6">
                            <div class="input-field">
                              <input
                                type="text"
                                name="lName"
                                value={signUpFormik.values.lName}
                                className={
                                  signUpFormik.errors.lName &&
                                  signUpFormik.touched.lName
                                    ? " is-invalid"
                                    : ""
                                }
                                onChange={signUpFormik.handleChange}
                                onBlur={signUpFormik.handleBlur}
                                id="enter-last-name"
                                placeholder="&nbsp;"
                                autocomplete="off"
                              />
                              <label for="enter-last-name" class="label-name">
                                <span class="content-name">
                                  Enter Last Name
                                </span>
                              </label>
                              <div className="invalid-feedback text-danger">
                                {signUpFormik.errors.lName}
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-6">
                            <div class="input-field">
                              <input
                                type="email"
                                name="emailId"
                                value={signUpFormik.values.emailId}
                                className={
                                  signUpFormik.errors.emailId &&
                                  signUpFormik.touched.emailId
                                    ? "is-invalid"
                                    : ""
                                }
                                onChange={signUpFormik.handleChange}
                                onBlur={signUpFormik.handleBlur}
                                id="enter-emailid"
                                placeholder="&nbsp;"
                                autocomplete="off"
                              />
                              <label for="enter-emailid" class="label-name">
                                <span class="content-name">Enter Email ID</span>
                              </label>
                              <div className="invalid-feedback text-danger">
                                {signUpFormik.errors.emailId}
                              </div>
                            </div>
                          </div>

                          <div class="col-lg-6">
                            <div class="input-field">
                              <input
                                type="text"
                                value={isUserExist && isUserExist[1]}
                                name="userName"
                                id="enter-number"
                                placeholder="&nbsp;"
                                readOnly="readonly"
                              />
                              <label
                                for="enter-number"
                                class="label-name signup-readonly-label"
                              >
                                <span class="signup-readonly-content-name">
                                  Enter Mobile Number
                                </span>
                              </label>
                            </div>
                          </div>
                          <div class="col-lg-6 optional-field">
                            <div class="input-field">
                              <input
                                name="refId"
                                className={
                                  signUpFormik.errors.refId ||
                                  signUpFormik.touched.refId
                                    ? "is-invalid"
                                    : ""
                                }
                                value={signUpFormik.values.refId}
                                onChange={signUpFormik.handleChange}
                                id="referral-mobile"
                                type="tel"
                                placeholder="&nbsp;"
                                maxlength="10"
                                autocomplete="off"
                              />

                              <label for="referral-mobile">
                                <span class="content-name">
                                  {" "}
                                  Referral Mobile (optional){" "}
                                </span>{" "}
                              </label>
                              <div className="invalid-feedback text-danger">
                                {signUpFormik.errors.refId}
                              </div>
                            </div>
                            {signUpFormik.values.refId.length == 10 &&
                              (validateNo?.ResponseStatus == 1 ? (
                                <div
                                  className=" text-left"
                                  style={{ color: "#CA3060" }}
                                >
                                  {" "}
                                  {validateNo?.Remarks}
                                </div>
                              ) : (
                                <div
                                  className=" text-left"
                                  style={{ color: "#CA3060" }}
                                >
                                  {" "}
                                  {validateNo?.Remarks}{" "}
                                </div>
                              ))}
                          </div>
                          <div class="col-lg-6 ">
                            <div class="input-field">
                              <i
                                type={showSignupPassword ? "text" : "password"}
                                id="togglePassword"
                                onClick={() => {
                                  setShowSignupPassword(!showSignupPassword);
                                }}
                              >
                                {showSignupPassword ? (
                                  <BsFillEyeFill />
                                ) : (
                                  <BsFillEyeSlashFill />
                                )}{" "}
                              </i>
                              <input
                                type={showSignupPassword ? "text" : "password"}
                                name="password"
                                value={signUpFormik.values.password}
                                className={
                                  signUpFormik.errors.password &&
                                  signUpFormik.touched.password
                                    ? "is-invalid"
                                    : ""
                                }
                                onChange={signUpFormik.handleChange}
                                onBlur={signUpFormik.handleBlur}
                                id="create_password"
                                placeholder="&nbsp;"
                                autocomplete="off"
                              />
                              <label for="create_password" class="label-name">
                                <span class="content-name">
                                  Create a Password
                                </span>
                              </label>
                              <div className="invalid-feedback text-danger">
                                {signUpFormik.errors.password}
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-6 ">
                            <div class="input-field">
                              <input
                                type="tel"
                                name="pincode"
                                value={pincode}
                                id="user-pincode"
                                placeholder="&nbsp;"
                                maxLength="6"
                                minLength="6"
                                className={
                                  signUpFormik.errors.pincode &&
                                  signUpFormik.touched.pincode
                                    ? "is-invalid"
                                    : ""
                                }
                                autocomplete="off"
                                onChange={handlePincode}
                              />
                              <label for="user-pincode" class="label-name">
                                <span class="content-name">Enter Pincode</span>
                              </label>
                              <div className="invalid-feedback text-danger">
                                {signUpFormik.errors.pincode}
                              </div>
                            </div>
                          </div>
                          <SelectField
                            pincode={signUpFormik.values.pincode}
                            getData={getData}
                            setGetData={setGetData}
                            isClass={isClass}
                          />

                          <div class="col-lg-12 ">
                            <div class="custom-control custom-checkbox checkStyle ">
                              <input
                                type="checkbox"
                                name="termsCheck"
                                class="custom-control-input "
                                id="customCheck1"
                                checked={signUpFormik.values.termsCheck}
                                onChange={signUpFormik.handleChange}
                              />
                              <label
                                class="custom-control-label "
                                for="customCheck1"
                              >
                                {" "}
                                By clicking signup you agree to{" "}
                                <Link to="/termscondition" target="_blank">
                                  Terms & Conditions
                                </Link>{" "}
                              </label>
                            </div>
                          </div>

                          <div class="col-lg-12">
                            <div class="signup-btnCol btnTopSpace">
                              <ThemeButton
                                loading={loading}
                                onClick={() => {
                                  if (!getData.stateName) {
                                    if (!getData.cityName) {
                                      setGetData({
                                        ...getData,
                                        stateError: true,
                                        cityError: true,
                                      });
                                    } else {
                                      setGetData({
                                        ...getData,
                                        stateError: true,
                                        cityError: false,
                                      });
                                    }
                                  }
                                }}
                                value={"SIGNUP"}
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </Modal>
      {newUser?.ResponseStatus == 1 && navigate("/")}
      <MuiSnackBar
        open={isSnackBar}
        setOpen={setIsSnackBar}
        errorMsg={errorMsg}
        setError={setErrorMsg}
        successMsg={successMsg}
        setSuccess={setSuccessMsg}
      />
    </>
  );
};

export default SignUpForm;

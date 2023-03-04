import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import Otp from "./Otp";
import {
  checkUserExist,
  forgotPassword,
  loginUser,
} from "../../redux/slices/loginSlice";
import { Loading } from "../common";
import "../../assets/styles/authentication/loginModal.css";
import "../../assets/styles/authentication/loginOtp.css";
import "../../assets/styles/authentication/signupModal.css";

const SignInForm = () => {
  const [otp, setOtp] = useState("");
  const [isSnackBar, setIsSnackBar] = useState(false);
  const [formCount, setFormCount] = useState(1);
  const [show, setShow] = useState(true);
  const [showSuccessMessage, setsuccessMessage] = useState("");
  const [showErrorMessage, setErrorMessage] = useState("");
  const [showSignUp, setShowSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordUserName, setForgotPasswordUsername] = useState("");
  const [ip, setIp] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, forgotPass } = useSelector(
    (state) => state.loginSlice.loggetInWithOTP
  );
  const { loggedInUser } = useSelector(
    (state) => state.loginSlice.loggetInWithOTP
  );
  const { isUserExist } = useSelector((state) => state.loginSlice.checkUser);
  const { response } = useSelector((state) => state.loginSlice.loginUser);

  const loginUsernameFormik = useFormik({
    initialValues: {
      username: isUserExist && isUserExist ? isUserExist[1] : "",
    },
    validationSchema: yup.object({
      username: yup
        .string()
        .min(10)
        .max(10)
        .required("Please Enter Your Mobile Number"),
    }),
    onSubmit: (values, { resetForm }) => {
      clickLogin();
    },
  });
  const loginPasswordFormik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: yup.object({
      password: yup
        .string()
        .min(8)
        .max(16)
        .required("Please Enter Password"),
    }),
    onSubmit: (values, { resetForm }) => {
      clickLogin();
    },
  });
  useEffect(() => {
    // if (
    //   isUserExist &&
    //   isUserExist[0]?.ResponseStatus === 0 &&
    //   isUserExist[0]?.ErrorCode === "Ex402" &&
    //   showSignUp
    // ) {
    //   console.log("login");
    //   navigate("/signup");
    // }

    if (forgotPass?.ResponseStatus === 0 && forgotPasswordUserName) {
      setIsSnackBar(true);
      setErrorMessage(forgotPass.Remarks);
      setsuccessMessage("");
    } else if (response?.ErrorCode === "Ex401") {
      setIsSnackBar(true);
      setErrorMessage(response?.Remarks);
      setsuccessMessage("");
    }
    if (forgotPass?.ResponseStatus === 1 && forgotPasswordUserName) {
      setFormCount(1);
      setIsSnackBar(true);
      setsuccessMessage(forgotPass.Remarks);
      setErrorMessage("");
    }

    if (response?.ResponseStatus === 2) {
      setFormCount(2);
      setIsSnackBar(true);
      setsuccessMessage(response.Remarks);
      setErrorMessage("");
    }

    if (!ip) {
      fetch("https://api.ipify.org?format=json")
        .then((response) => response.json())
        .then((user) => {
          setIp(user.ip);
        });
    }
    if (loggedInUser?.Id) {
      navigate("/");
      setFormCount(1);
      setIsSnackBar(true);
      setsuccessMessage("Login Successful");
      setErrorMessage("");
    }
    if (response?.ResponseStatus === 0) {
      setIsSnackBar(true);
      setErrorMessage("Invalid OTP");
      setsuccessMessage("");
    }
    if (response?.ResponseStatus === 1) {
      setIsSnackBar(true);
      setsuccessMessage("Success");
      // setsuccessMessage("")
    }
    return () => {
      // loginUsernameFormik.values.username=''
      setTimeout(() => {
        setShowSignUp(false);
      }, 1000);
    };
  }, [response, isUserExist, forgotPass, loginUsernameFormik.values.username]);

  const onForgotPassword = (e) => {
    e.preventDefault();
    setFormCount(3);
  };
  const handleClose = () => {
    setShow(false);
    setFormCount(1);
    loginUsernameFormik.values.username = "";
  };
  const handleModalClose = () => {
    handleClose();
    navigate("/");
    loginUsernameFormik.values.username = "";
  };
  const onForgotPasswordSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword({ userName: forgotPasswordUserName }));
  };
  const clickLogin = (e) => {
    if (
      loginUsernameFormik.values.username &&
      loginUsernameFormik.values.username.length == 10
    ) {
      dispatch(
        checkUserExist({ username: loginUsernameFormik.values.username })
      );

      if (
        isUserExist &&
        isUserExist[0]?.ResponseStatus === 1 &&
        loginPasswordFormik.values.password
      ) {
        dispatch(
          loginUser({
            userName: loginUsernameFormik.values.username,
            password: loginPasswordFormik.values.password,
            ip,
          })
        );
      }
    }
  };
  return (
    <>
      <>
        <Modal
          show={show}
          onHide={() => {
            setShow(false);
            navigate("/");
          }}
          centered
          keyboard={false}
          className="modal fade login-modal"
          id="exampleModal"
          data-backdrop="false"
        >
          {formCount === 1 ? (
            <button
              onClick={handleModalClose}
              type="button"
              class="close login-close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          ) : (
            <button className="close login-close mt-3">
              <MdArrowBack />
            </button>
          )}

          {formCount === 3 ? (
            <>
              <button
                onClick={() => setFormCount(1)}
                className="close login-close mt-3"
              >
                <MdArrowBack />
              </button>
              <section className="loginPage mbTopSpace">
                <div className="row no-gutters1">
                  <div className="col-lg-6 loginBgCol order-lg-last d-none d-lg-block">
                    <div className="row no-gutters1 align-items-center">
                      <div className="col-12">
                        <div className="loginLogoCol"></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 align-self-center">
                    <div className="loginForm">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="titleMain formText text-center">
                            <img
                              src="/images/VipsLogoMain.png"
                              alt="VIPS Logo"
                            />
                            <h2>Enter registered mobile number</h2>
                          </div>
                        </div>
                      </div>
                      <div className="formStyle">
                        <form class="signup-form">
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="input-field">
                                <input
                                  onChange={(e) => {
                                    setForgotPasswordUsername(e.target.value);
                                  }}
                                  type="tel"
                                  name="email"
                                  maxlength="10"
                                  value={forgotPasswordUserName}
                                  pattern=".{8,10}"
                                  required
                                  id="enter-Mno"
                                  placeholder="&nbsp;"
                                  autocomplete="off"
                                  autoFocus
                                />
                                <label for="enter-Mno" className="label-name">
                                  <span className="content-name">
                                    Enter Mobile Number
                                  </span>
                                </label>
                              </div>
                            </div>

                            <div className="col-lg-12">
                              <div className="login-btnCol btnTopSpace">
                                <button
                                  onClick={!loading && onForgotPasswordSubmit}
                                  class="btn-primery"
                                  id="addmoneymodal"
                                >
                                  {loading ? <Loading /> : "SUBMIT"}
                                </button>
                              </div>
                            </div>
                            <div className="col-lg-12 mt-4"></div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </>
          ) : formCount === 1 ? (
            <>
              <button
                onClick={handleModalClose}
                type="button"
                class="close login-close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <section className="loginPage mbTopSpace">
                <div className="row no-gutters1">
                  <div className="col-lg-6 loginBgCol order-lg-last d-none d-lg-block">
                    <div className="row no-gutters1 align-items-center">
                      <div className="col-12">
                        <div className="loginLogoCol"></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 align-self-center">
                    <div className="loginForm">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="titleMain formText text-center">
                            <img
                              src="/images/VipsLogoMain.png"
                              alt="VIPS Logo"
                            />
                            <h2>Sign in to Continue</h2>
                          </div>
                        </div>
                      </div>
                      <div className="formStyle">
                        {/* { response?.ErrorCode=="Ex401" && <div className='alert alert-danger '>{response?.Remarks} </div>} */}
                        <form
                          onSubmit={loginUsernameFormik.handleSubmit}
                          class="signup-form"
                        >
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="input-field">
                                <input
                                  // onChange={handleUserName}
                                  type="tel"
                                  name="username"
                                  maxlength="10"
                                  value={loginUsernameFormik.values.username}
                                  className={
                                    loginUsernameFormik.errors.username &&
                                    loginUsernameFormik.touched.username
                                      ? " is-invalid"
                                      : ""
                                  }
                                  onChange={loginUsernameFormik.handleChange}
                                  onBlur={loginUsernameFormik.handleBlur}
                                  // pattern=".{8,10}"
                                  id="login-username"
                                  placeholder="&nbsp;"
                                  autocomplete="off"
                                  autoFocus
                                />
                                <label
                                  for="login-username"
                                  className="label-name"
                                >
                                  <span className="content-name">
                                    Enter Mobile Number
                                  </span>
                                </label>
                                <div className="invalid-feedback text-danger">
                                  {loginUsernameFormik.errors.username}
                                </div>
                              </div>
                            </div>
                            {isUserExist &&
                              isUserExist[0]?.ResponseStatus === 1 && (
                                <div className="col-lg-12">
                                  <div className="input-field">
                                    <i
                                      id="togglePassword"
                                      onClick={() =>
                                        setShowPassword(!showPassword)
                                      }
                                    >
                                      {showPassword ? (
                                        <BsFillEyeFill />
                                      ) : (
                                        <BsFillEyeSlashFill />
                                      )}{" "}
                                    </i>
                                    <input
                                      // onChange={handlePassword}
                                      type={showPassword ? "text" : "password"}
                                      value={
                                        loginPasswordFormik.values.password
                                      }
                                      className={
                                        loginPasswordFormik.errors.password
                                          ? " is-invalid"
                                          : ""
                                      }
                                      onChange={
                                        loginPasswordFormik.handleChange
                                      }
                                      onBlur={loginPasswordFormik.handleBlur}
                                      name="password"
                                      id="id_password"
                                      placeholder="&nbsp;"
                                      autocomplete="off"
                                    />
                                    <label
                                      for="id_password"
                                      className="label-name"
                                    >
                                      <span className="content-name">
                                        Password
                                      </span>
                                    </label>
                                    <div className="invalid-feedback text-danger">
                                      {loginPasswordFormik.errors.password}
                                    </div>
                                  </div>
                                </div>
                              )}
                            <div className="col-lg-12">
                              <div className="forgotPassword text-right">
                                <a
                                  href="javascript:void(0)"
                                  onClick={onForgotPassword}
                                >
                                  {" "}
                                  Forgot Password?{" "}
                                </a>
                              </div>
                            </div>

                            <div className="col-lg-12">
                              <div className="login-btnCol btnTopSpace">
                                <button
                                  type="submit"
                                  // onClick={!loading && clickLogin}
                                  class="btn-primery modal-loading-btn"
                                  id="addmoneymodal"
                                  onClick={() => {
                                    !loginPasswordFormik.values.password &&
                                      setShowSignUp(true);
                                  }}
                                >
                                  {loading ? <Loading /> : "SIGN IN"}
                                </button>
                              </div>
                            </div>
                            <div className="col-lg-12 mt-4"></div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </>
          ) : (
            <>
              <button
                onClick={() => setFormCount(1)}
                className="close login-close mt-3"
              >
                <MdArrowBack />
              </button>
              <section class="loginPage mbTopSpace">
                <div class="row ">
                  <div class="col-lg-6 otpBgCol order-lg-last d-none d-lg-block">
                    <div class="row no-gutters1 align-items-center">
                      <div class="col-12">
                        <div class="otpLogoCol"></div>
                      </div>
                    </div>
                  </div>

                  <div class="col-12 col-lg-6 align-self-center">
                    <div class="otpForm-outer">
                      <div class="row">
                        <div class="col-lg-12">
                          <div class="otp-titleMain formText text-center">
                            <img
                              src="/images/VipsLogoMain.png"
                              alt="VIPS Logo"
                            />
                            <h2>OTP Verification</h2>
                            <div class="otp-send-to">
                              <p>
                                Enter the OTP sent to
                                <label for="">
                                  {" "}
                                  &nbsp; +91{" "}
                                  {loginUsernameFormik.values.username}
                                </label>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="formStyle">
                        <Otp
                          userName={loginUsernameFormik.values.username}
                          password={loginPasswordFormik.values.password}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}
        </Modal>
        {/* <MuiSnackBar
        open={isSnackBar}
        setOpen={setIsSnackBar}
        successMsg={showSuccessMessage}
        errorMsg={showErrorMessage}
        setSuccess={setsuccessMessage}
        setError={setErrorMessage}
      /> */}
      </>
    </>
  );
};

export default SignInForm;

import { Button, Checkbox, Form, Input, Select } from "antd";
import Modal from "antd/es/modal/Modal";
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../assets/styles/digigold/digi-gold-signin.css";
import { modalClose } from "../../redux/slices/digiGold/digiGoldSlice";
import "../../assets/styles/authentication/loginModal.css";
import "../../assets/styles/authentication/loginOtp.css";
import OTPInput, { ResendOTP } from "otp-input-react";
import { Link, useNavigate } from "react-router-dom";
import {
  getCityList,
  getStateList,
  loginDigiGold,
  registerDigiGold,
} from "../../redux/slices/digiGold/registerDigiSlice";
import { MuiSnackBar } from "../../components/common";
import {
  handleKeyPressForName,
  handleMobileKeyPress,
  namePattern,
} from "../../constants";

const DigiGoldSignup = ({ setIsDigiLogin, step, setStep }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSnackBar, setIsSnackBar] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  // const [step, setStep] = useState(0);
  // const [stateList, setStateList] = useState([]);
  const { modalBool } = useSelector((state) => state.digiGoldSlice.modal);
  const { loading, data } = useSelector(
    (state) => state.registerDigiSlice.register
  );
  const { logData, loading: digiLogLoad } = useSelector(
    (state) => state.registerDigiSlice.login
  );
  const { stateList } = useSelector(
    (state) => state.registerDigiSlice.stateData
  );
  const { cityList } = useSelector((state) => state.registerDigiSlice.cityData);
  const { loggedInUser } = useSelector(
    (state) => state.loginSlice.loggetInWithOTP
  );

  const [formValue, setFormValue] = useState({
    mobileNumber: "",
    Name: "",
    userCityId: "",
    userStateId: "",
    otp: "",
  });
  const handleClose = () => {
    setStep(0);
    dispatch(modalClose());
    setFormValue({
      mobileNumber: "",
      Name: "",
      otp: "",
    });
  };
  // const handleKeyPress = (event) => {
  //   const charCode = event.which ? event.which : event.keyCode;
  //   if (charCode !== 8 && !/^[a-zA-Z ]+$/.test(String.fromCharCode(charCode))) {
  //     event.preventDefault();
  //   }
  // };

  const handleSubmit = async () => {
    const emailId = loggedInUser.Emailid;
    const password = loggedInUser.TRXNPassword;
    const username = loggedInUser.UserName;
    const res = await dispatch(
      registerDigiGold({ formValue, emailId, password, username })
    );
    if (res.payload.ResponseStatus === 2) {
      if (step === 0) {
        setStep(step + 1);
      }
    } else if (res.payload.ResponseStatus === 1) {
      if (
        res.payload.Data.statusCode === 200 ||
        res.payload.Data.statusCode === 201
      ) {
        setSuccessMsg(res.payload.Data.message);
        setErrorMsg("");
        setIsSnackBar(true);
        handleClose();
      } else {
        for (const key in res.payload.Data.errors) {
          for (const iterator of res.payload.Data.errors[key]) {
            setErrorMsg(iterator.message);
            setSuccessMsg("");
            setIsSnackBar(true);
          }
        }
      }
    } else if (
      res.payload.ResponseStatus === 0 &&
      (res.payload.Data?.statusCode !== 200 ||
        res.payload.Data?.statusCode !== 201)
    ) {
      setErrorMsg(res.payload.Remarks || "Something Went Wrong");
      setSuccessMsg("");
      setIsSnackBar(true);
    } else if (res.payload.ResponseStatus === 0 && !res.payload.Data) {
      setErrorMsg(res.payload.Remarks);
      setSuccessMsg("");
      setIsSnackBar(true);
    }
  };
  const renderTime2 = () => React.Fragment;
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
                <span style={{ color: "#CA3060" }} onClick={handleSubmit}>
                  Resend OTP
                </span>
              </a>
            </p>
          )}
        </p>
      </div>
    );
  };
  // Digi Login Modal
  useEffect(() => {
    if (loggedInUser) {
      const username = loggedInUser?.UserName;
      const password = loggedInUser?.TRXNPassword;
      dispatch(loginDigiGold({ username, password }));
    }
    if (logData?.ResponseStatus === 1) {
      localStorage.setItem("digiUser", JSON.stringify(logData?.Data));
      setIsDigiLogin(logData?.Data);
    }
  }, [step]);

  useEffect(() => {
    dispatch(getStateList());
    if (formValue.userStateId) {
      dispatch(getCityList(formValue.userStateId));
    }
  }, [formValue.userStateId]);
  // Digi Register Modal
  useEffect(() => {
    if (data.ResponseStatus === 1) {
      if (data.Data.ResponseStatus === 1) {
        localStorage.setItem(
          "digiUser",
          JSON.stringify(data?.Data?.result?.data)
        );
        // window.location.reload();
        dispatch(modalClose());
        setSuccessMsg("Login SuccessFully");
        setErrorMsg("");
        setIsSnackBar(true);
      } else {
        setErrorMsg(data.Remarks);
        setSuccessMsg("");
        setIsSnackBar(true);
      }
    }
    if (JSON.parse(localStorage.getItem("digiUser"))) {
      setIsDigiLogin(JSON.parse(localStorage.getItem("digiUser")));
    }
    setErrorMsg("");
    setIsSnackBar(false);
  }, [data]);
  return (
    <>
      <Modal
        footer={[]}
        onCancel={handleClose}
        centered
        maskClosable={false}
        open={modalBool}
      >
        {step === 0 && (
          <div className="digi-gold-loginForm">
            <div class="row">
              <div class="col-lg-12">
                <div class="titleMain formText text-center">
                  <h2>Sign In</h2>
                  <p>Enter Mobile Number To Sign In</p>
                </div>
              </div>
            </div>
            <div class="">
              <Form
                autoComplete="off"
                autoCapitalize="off"
                onFinish={handleSubmit}
                fields={[
                  { name: "mobileNumber", value: formValue.mobileNumber },
                  { name: "Name", value: formValue.Name },
                  { name: "userCityId", value: formValue.userCityId },
                  { name: "userStateId", value: formValue.userStateId },
                ]}
                class="gold-signin-form"
              >
                <div class="row">
                  <div className="col-lg-12">
                    <Form.Item
                      hasFeedback
                      name="mobileNumber"
                      rules={[
                        {
                          required: true,
                          message: "Mobile number is required",
                        },
                        {
                          pattern: /^\d{10}$/,
                          message: "Mobile number is not valid",
                        },
                      ]}
                    >
                      <Input
                        onKeyPress={handleMobileKeyPress}
                        onChange={(e) =>
                          setFormValue({
                            ...formValue,
                            mobileNumber: e.target.value,
                          })
                        }
                        maxLength={10}
                        addonBefore={"+91"}
                        size="large"
                        placeholder="Enter Mobile Number"
                      />
                    </Form.Item>
                  </div>
                  <div className="col-lg-12">
                    <Form.Item
                      hasFeedback
                      name="Name"
                      rules={[
                        { required: true, message: "Full name is required" },
                        {
                          pattern: "[A-Za-zs]+",
                          message: "Name is not valid",
                        },
                        {
                          pattern: namePattern,
                          message: "Please enter a valid full name!",
                        },
                      ]}
                    >
                      <Input
                        onKeyPress={handleKeyPressForName}
                        onChange={(e) =>
                          setFormValue({
                            ...formValue,
                            Name: e.target.value,
                          })
                        }
                        size="large"
                        placeholder="Enter Full Name"
                      />
                    </Form.Item>
                  </div>

                  <div className="col-lg-12">
                    <Form.Item
                      hasFeedback
                      name="userStateId"
                      rules={[{ required: true, message: "State is required" }]}
                    >
                      <Select
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                        onChange={(e) =>
                          setFormValue({
                            ...formValue,
                            userStateId: e,
                            // userCityName: "Select City",
                            userCityId: "Select City",
                          })
                        }
                        size="large"
                        placeholder="Select State"
                      >
                        {stateList?.Data &&
                          stateList?.Data?.result?.data?.map((e) => {
                            return (
                              <Select.Option key={e.id} value={e.id}>
                                {e.name}
                              </Select.Option>
                            );
                          })}
                      </Select>
                    </Form.Item>
                  </div>
                  <div className="col-lg-12">
                    <Form.Item
                      hasFeedback
                      name="userCityId"
                      rules={[{ required: true, message: "City is required" }]}
                    >
                      <Select
                        value={formValue.userCityId}
                        onChange={(e) =>
                          setFormValue({
                            ...formValue,
                            userCityId: e,
                          })
                        }
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                        size="large"
                        placeholder="Select City"
                      >
                        {cityList.Data &&
                          cityList.Data.result.data.map((e) => {
                            return (
                              <Select.Option key={e.id} value={e.id}>
                                {e.name}
                              </Select.Option>
                            );
                          })}
                      </Select>
                    </Form.Item>
                  </div>

                  <div class="col-lg-12">
                    <Form.Item
                      name="terms"
                      valuePropName="checked"
                      rules={[
                        {
                          validator: (_, value) =>
                            value
                              ? Promise.resolve()
                              : Promise.reject(
                                  new Error("Please Accept Terms & Conditions")
                                ),
                        },
                      ]}
                    >
                      <Checkbox className="check-term-Style">
                        I Agree to the{" "}
                        <Link to="/vipsgold-termscondtion" target="_blank">
                          Terms & Conditions
                        </Link>
                      </Checkbox>
                    </Form.Item>
                    {/* </div> */}
                  </div>

                  <div class="col-lg-12">
                    <div class="login-btnCol btnTopSpace">
                      <Button
                        loading={loading}
                        htmlType="submit"
                        type="primary"
                        class="btn btn-primery login-btn"
                      >
                        Send OTP
                      </Button>
                    </div>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        )}
        {/* <!-- otp popup start --> */}
        {step === 1 && (
          <div class="align-self-center">
            {/* <div class="otpForm-outer"> */}
            <div class="digigoldotpForm-outer">
              <div class="row">
                <div class="col-lg-12">
                  <div className="digigoldotp-titleMain formText text-center">
                    <h2>OTP Verification</h2>
                  </div>
                  <div class="otp-send-to">
                    <p>
                      Enter the OTP sent to
                      <label for="">&nbsp; +91 {formValue.mobileNumber}</label>
                    </p>
                  </div>
                </div>
              </div>

              <div className="formStyle">
                {/* <Otp
                  userName={formValue.mobileNumber}
                  password={loggedInUser.TRXNPassword}
                /> */}
                <div
                  id="otp"
                  className="row row-flex justify-content-center mt-1"
                >
                  <div className="">
                    <OTPInput
                      value={formValue.otp}
                      className="text-dark"
                      onChange={(e) => setFormValue({ ...formValue, otp: e })}
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
                        loading={loading}
                        type="primary"
                        size="large"
                        // class="btn otp-btn btn-primery modal-loading-btn"
                        // id="addmoneymodal"
                        disabled={formValue.otp.length == 6 ? false : true}
                        onClick={
                          handleSubmit
                          // () => {
                          //   // !loading &&
                          //   dispatch(loginWithOtp({ userName, password, ip, otp }));
                          //   setToggle(true);
                          //   setTimeout(() => {
                          //     setToggle(false);
                          //   }, 4000);
                          // }
                        }
                      >
                        Verify & Proceed
                        {/* {loading ? (
                                       <LoadingBar class="" />
                                     ) : (
                                       "Verify & Proceed"
                                     )} */}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* </div> */}
          </div>
        )}
        {/* <!-- otp popup end --> */}
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
  );
};

export default memo(DigiGoldSignup);

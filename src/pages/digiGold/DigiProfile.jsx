import { Button, DatePicker, Form, Input, Select } from "antd";
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../assets/styles/digigold/digi-gold-profile.css";
import { MuiSnackBar } from "../../components/common";
import { LatestLoading } from "../../components/common/Loading.jsx";
import {
  FirstNamePattern,
  handleKeyPressForName,
  namePattern,
} from "../../constants";
import {
  getCityList,
  getStateList,
  loginDigiGold,
} from "../../redux/slices/digiGold/registerDigiSlice";
import { UpdateUser } from "../../redux/slices/digiGold/userProfileSlice";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
const DigiProfile = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [isSnackBar, setIsSnackBar] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { loggedInUser } = useSelector(
    (state) => state.loginSlice.loggetInWithOTP
  );
  const { logData, loading } = useSelector(
    (state) => state.registerDigiSlice.login
  );
  const { stateList } = useSelector(
    (state) => state.registerDigiSlice.stateData
  );
  const { cityList } = useSelector((state) => state.registerDigiSlice.cityData);
  const { data, loading: updateLoading } = useSelector(
    (state) => state.userProfileSlice.update
  );

  const [formValue, setFormValue] = useState({
    mobileNumber: "",
    userStateId: "",
    userStateName: "",
    userCityId: "",
    userCityName: "",
    Name: "",
    emailId: "",
    userPincode: "",
    dateOfBirth: "",
    nomineeName: "",
    nomineeDateOfBirth: "",
    nomineeRelation: "",
    gender: "",
  });
  useEffect(() => {
    const username = loggedInUser.UserName;
    const password = loggedInUser.TRXNPassword;
    dispatch(loginDigiGold({ username, password }));
  }, [dispatch]);
  useEffect(() => {
    dispatch(getStateList());
    if (formValue.userStateId) {
      dispatch(getCityList(formValue.userStateId));
    }
  }, [formValue.userStateId]);

  useEffect(() => {
    formValue.Name = logData?.Data?.Name;
    formValue.mobileNumber = logData?.Data?.MobileNumber;
    formValue.emailId = logData?.Data?.UserEmail || "";
    formValue.userCityId = logData?.Data?.CityId || "";
    formValue.userStateId = logData?.Data?.StateId || "";
    formValue.userStateName = logData?.Data?.StateName || "";
    formValue.userCityName = logData?.Data?.CityName || "";
    formValue.dateOfBirth = logData?.Data?.DateOfBirth || "";
    formValue.nomineeName = logData?.Data?.Nominee || "";
    formValue.nomineeDateOfBirth = logData?.Data?.NomineeDateOfBirth || "";
    formValue.nomineeRelation = logData?.Data?.NomineeRelation || "";
    // formValue.gender = logData?.Data?.gender || "";
  }, [logData]);
  const handleSubmit = async () => {
    const username = loggedInUser.UserName;
    const password = loggedInUser.TRXNPassword;
    if (formValue.userCityId === "Select City") {
      setSuccessMsg("");
      setErrorMsg("Please Select City");
      setIsSnackBar(true);
    } else {
      const res = await dispatch(UpdateUser({ formValue, username, password }));
      if (res.payload.ResponseStatus === 1 && res.payload.ErrorCode === 200) {
        setSuccessMsg(res.payload.Remarks);
        setErrorMsg("");
        setIsSnackBar(true);
      } else if (
        res.payload.ResponseStatus === 1 &&
        res.payload.Data.statusCode !== 200
      ) {
        let obj = res.payload.Data.errors;
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            const errorArr = obj[key];
            errorArr.forEach((errorObj) => {
              setErrorMsg(errorObj.message);
              setIsSnackBar(true);
              setSuccessMsg("");
            });
          }
        }
      } else {
        setSuccessMsg("");
        setErrorMsg(res.payload.Remarks);
        setIsSnackBar(true);
      }
    }
  };

  // console.log(formValue.dateOfBirth.$d, "formValud");
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
  return (
    <>
      {/* <CommonTopNav /> */}
      <section class="digi-gold-section-wrapper buy-sell-form">
        <div class="container">
          <div class="digital-gold-section-head">
            <h1 class="section-head-title">MY PROFILE</h1>
          </div>

          <div class="row">
            <div class="col-lg-12">
              {logData?.Data && !loading ? (
                <div class="buy-sell-form-outer">
                  <div class="digigold-profile-wrapper">
                    <Form
                      form={form}
                      autoComplete="off"
                      onFinish={handleSubmit}
                      fields={[
                        {
                          name: "Name",
                          value: formValue.Name,
                        },
                        {
                          name: "mobileNumber",
                          value: formValue.mobileNumber,
                        },
                        {
                          name: "userStateId",
                          value: formValue.userStateId,
                        },
                        {
                          name: "emailId",
                          value: formValue.emailId,
                        },
                        {
                          name: "userCityId",
                          value: formValue.userCityId,
                        },

                        {
                          name: "dateOfBirth",
                          value: formValue.dateOfBirth
                            ? dayjs(formValue.dateOfBirth)
                            : null,
                        },
                        {
                          name: "nomineeName",
                          value: formValue.nomineeName,
                        },
                        {
                          name: "nomineeDateOfBirth",
                          value: formValue.nomineeDateOfBirth
                            ? dayjs(formValue.nomineeDateOfBirth)
                            : null,
                        },
                        {
                          name: "nomineeRelation",
                          value: formValue.nomineeRelation,
                        },
                        // {
                        //   name: "gender",
                        //   value: formValue.gender,
                        // },
                      ]}
                    >
                      <div class="container">
                        <div class="row">

                          <div class="col-lg-6 col-md-6">
                            <Form.Item name={"Name"}>
                              <Input
                                disabled
                                size="large"
                                placeholder="Full Name"
                              />
                            </Form.Item>
                          </div>

                          <div class="col-lg-6 col-md-6">
                            <Form.Item name={"mobileNumber"}>
                              <Input
                                value={formValue.mobileNumber}
                                disabled
                                size="large"
                                placeholder="Mobile Number"
                              />
                            </Form.Item>
                          </div>

                          <div class="col-lg-6 col-md-6">
                          <div className="input-wrapper w-100">
                              <div className="input">
                            <Form.Item
                              rules={[
                                {
                                  type: "email",
                                  message: "Please Enter Valid Email",
                                },
                                {
                                  required: true,
                                  message: "Email is Required",
                                },
                              ]}
                              name={"emailId"}
                            >
                              <Input
                                required
                                value={formValue.emailId}
                                onChange={(e) =>
                                  setFormValue({
                                    ...formValue,
                                    emailId: e.target.value,
                                  })
                                }
                                size="large"
                                placeholder="Email Id"
                              />
                            </Form.Item>
                          </div>
                          <div class="col-lg-6 col-md-6">
                            <Form.Item name={"dateOfBirth"}>
                              <DatePicker
                                style={{ width: "100%" }}
                                size="large"
                                disabledDate={(current) => {
                                  // Disable dates that are less than 18 years ago
                                  const today = new Date();
                                  const diffInMs = Math.abs(today - current);
                                  const age = Math.floor(
                                    diffInMs / (1000 * 60 * 60 * 24 * 365)
                                  );
                                  return age < 18;
                                }}
                                clearIcon={false}
                                onChange={(date, dateString) => {
                                  if (date === null || date === undefined) {
                                    setFormValue({
                                      ...formValue,
                                      dateOfBirth: undefined, // or set a default value like new Date()
                                    });
                                  } else {
                                    setFormValue({
                                      ...formValue,
                                      dateOfBirth: date,
                                    });
                                  }
                                }}
                                placeholder="Select User DOB"
                                value={formValue.dateOfBirth}
                                format={dateFormatList[0]}
                                mode="date"
                              />
                              <label htmlFor="">DOB</label>
                            </Form.Item>
                              </div>
                              </div>
                          </div>

                          <div class="col-lg-6 col-md-6">
                            <Form.Item
                              hasFeedback
                              name="userStateId"
                              rules={[
                                {
                                  required: true,
                                  message: "State is required",
                                },
                              ]}
                            >
                              <Select
                                value={logData.StateName}
                                showSearch
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                  option.children
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0
                                }
                                onChange={(e) => {
                                  setFormValue({
                                    ...formValue,
                                    userStateId: e,
                                    userStateName:
                                      stateList?.Data?.result?.data?.find(
                                        (a) => a.id === e
                                      ).name,
                                    userCityName: "Select City",
                                    userCityId: "Select City",
                                  });
                                }}
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

                          <div class="col-lg-6 col-md-6">
                            <Form.Item
                              hasFeedback
                              name="userCityId"
                              rules={[
                                {
                                  required: true,
                                  message: "City is required",
                                },
                              ]}
                            >
                              <Select
                                value={logData.CityName}
                                onChange={(e) =>
                                  setFormValue({
                                    ...formValue,
                                    userCityId: e,
                                    userCityName:
                                      cityList.Data.result.data?.find(
                                        (a) => a.id === e
                                      ).name,
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
                          {/* <div class="col-lg-6 col-md-6">
                            <Form.Item hasFeedback name="userPincode">
                              <Input
                                maxLength={6}
                                value={formValue.userPincode}
                                onChange={(e) =>
                                  setFormValue({
                                    ...formValue,
                                    userPincode: e.target.value,
                                  })
                                }
                                size="large"
                                placeholder="Pincode"
                              />
                            </Form.Item>
                          </div> */}
                          {/* <div class="col-lg-6 col-md-6">
                            <Form.Item hasFeedback name="gender">
                              <Select
                                size="large"
                                placeholder="Select Gender"
                                value={formValue.gender}
                                onChange={(e) =>
                                  setFormValue({
                                    ...formValue,
                                    gender: e,
                                  })
                                }
                              >
                                <Select.Option value="Male">Male</Select.Option>
                                <Select.Option value="Female">
                                  Female
                                </Select.Option>
                              </Select>
                            </Form.Item>
                          </div> */}
                          <div class="col-lg-6 col-md-6">
                            <Form.Item
                              hasFeedback
                              name="nomineeName"
                              rules={[
                                {
                                  required:
                                    formValue.nomineeRelation ||
                                    formValue.nomineeDateOfBirth,
                                  message: "This Field is Required ",
                                },
                                {
                                  min: 3,
                                  message: "Min 3 Character Required",
                                },
                              ]}
                            >
                              <Input
                                onKeyPress={handleKeyPressForName}
                                value={formValue.nomineeName}
                                onChange={(e) =>
                                  setFormValue({
                                    ...formValue,
                                    nomineeName: e.target.value,
                                  })
                                }
                                size="large"
                                placeholder="Nominee Name"
                              />
                            </Form.Item>
                          </div>

                          <div class="col-lg-6 col-md-6">
                          <div className="input-wrapper w-100">
                              <div className="input">
                            <Form.Item
                              
                              rules={[
                                // {
                                //   type: "date",
                                // },
                                {
                                  required:
                                    formValue.nomineeName ||
                                    formValue.nomineeRelation,
                                  message: "This Field is Required ",
                                },
                              ]}
                              name="nomineeDateOfBirth"
                            >
                              {/* <Input
                                max="2999-12-31"
                                type="date"
                                value={formValue.nomineeDateOfBirth}
                                onChange={(e) =>
                                  setFormValue({
                                    ...formValue,
                                    nomineeDateOfBirth: e.target.value,
                                  })
                                }
                                size="large"
                                placeholder="Nominee DOB"
                              /> */}
                              <DatePicker
                                style={{ width: "100%" }}
                                size="large"
                                disabledDate={(current) => {
                                  // Disable dates that are less than 18 years ago
                                  const today = new Date();
                                  const diffInMs = Math.abs(today - current);
                                  const age = Math.floor(
                                    diffInMs / (1000 * 60 * 60 * 24 * 365)
                                  );
                                  return age < 18;
                                }}
                                clearIcon={false}
                                onChange={(date, dateString) => {
                                  if (date === null || date === undefined) {
                                    setFormValue({
                                      ...formValue,
                                      nomineeDateOfBirth: undefined, // or set a default value like new Date()
                                    });
                                  } else {
                                    setFormValue({
                                      ...formValue,
                                      nomineeDateOfBirth: date,
                                    });
                                  }
                                }}
                                placeholder="Select Nominee DOB"
                                value={formValue.nomineeDateOfBirth}
                                format={dateFormatList[0]}
                                mode="date"
                              />
                              <label htmlFor="">Nominee DOB</label>
                            </Form.Item>
                            </div>
                            </div>
                          </div>

                          <div class="col-lg-6 col-md-6">
                          <div className="input-wrapper w-100">
                              <div className="input">
                            <Form.Item
                              
                              name="nomineeRelation"
                              rules={[
                                {
                                  required:
                                    formValue.nomineeName ||
                                    formValue.nomineeDateOfBirth,
                                  message: "This Field is Required ",
                                },
                                {
                                  min: 3,
                                  message: "Min 3 Character Required",
                                },
                              ]}
                            >
                              <Input
                                // onKeyPress={handleKeyPress}
                                onKeyPress={handleKeyPressForName}
                                value={formValue.nomineeRelation}
                                onChange={(e) =>
                                  setFormValue({
                                    ...formValue,
                                    nomineeRelation: e.target.value,
                                  })
                                }
                                size="large"
                                placeholder="Nominee Relation"
                              />
                              <label htmlFor="">Nominee Relation</label>
                            </Form.Item>
                                </div>
                                </div>
                          </div>

                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginBottom: 50,
                          marginTop: 30,
                        }}
                      >
                        <Button
                          loading={updateLoading}
                          htmlType="submit"
                          size="large"
                          style={{ backgroundColor: "#CA3060", color: "white" }}
                          class="btn-primary"
                        >
                          {" "}
                          Update{" "}
                        </Button>
                      </div>
                    </Form>
                  </div>
                </div>
              ) : (
                <LatestLoading />
              )}
            </div>
          </div>
        </div>
      </section>
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

export default memo(DigiProfile);

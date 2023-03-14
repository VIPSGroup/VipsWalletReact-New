import { Button, DatePicker, Form, Input, Select } from "antd";
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../assets/styles/digigold/digi-gold-profile.css";
import { MuiSnackBar } from "../../components/common";
import { LatestLoading } from "../../components/common/Loading";
import { CommonTopNav } from "../../components/layout/Header";
import {
  getCityList,
  getStateList,
  loginDigiGold,
} from "../../redux/slices/digiGold/registerDigiSlice";
import { UpdateUser } from "../../redux/slices/digiGold/userProfileSlice";

const DigiProfile = ({ setIsCommonTopNav }) => {
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
    userCityId: "",
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
    setIsCommonTopNav(false);
    const username = loggedInUser.UserName;
    const password = loggedInUser.TRXNPassword;
    dispatch(loginDigiGold({ username, password }));
    return () => {
      setIsCommonTopNav(true)
    };
  }, [dispatch]);
  useEffect(() => {
    dispatch(getStateList());
    if (formValue.userStateId) {
      dispatch(getCityList(formValue.userStateId));
    }
  }, [formValue.userStateId]);
  const handleKeyPress = (event) => {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode !== 8 && !/^[a-zA-Z ]+$/.test(String.fromCharCode(charCode))) {
      event.preventDefault();
    }
  };
  useEffect(() => {
    formValue.Name = logData?.Data?.Name;
    formValue.mobileNumber = logData?.Data?.MobileNumber;
    formValue.emailId = logData?.Data?.UserEmail || "";
    formValue.userCityId = logData?.Data?.CityId || "";
    formValue.userStateId = logData?.Data?.StateId || "";
    // formValue.userPincode = logData?.Data?.Pincode || "";
    formValue.dateOfBirth = logData?.Data?.DateOfBirth || "";
    formValue.nomineeName = logData?.Data?.Nominee || "";
    formValue.nomineeDateOfBirth = logData?.Data?.NomineeDateOfBirth || "";
    formValue.nomineeRelation = logData?.Data?.NomineeRelation || "";
    // formValue.gender = logData?.Data?.gender || "";
  }, [logData]);
  const handleSubmit = async () => {
    const username = loggedInUser.UserName;
    const password = loggedInUser.TRXNPassword;
    const res = await dispatch(UpdateUser({ formValue, username, password }));
    if (res.payload.ResponseStatus === 1 && res.payload.ErrorCode === 200) {
      setSuccessMsg(res.payload.Remarks);
      setErrorMsg("");
      setIsSnackBar(true);
    } else {
      setSuccessMsg("");
      setErrorMsg(res.payload.Remarks);
      setIsSnackBar(true);
    }
  };

  const [date, setDate] = useState();
  console.log(formValue, "aa rhi hai");
  return (
    <>
      <CommonTopNav />
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
                          value: formValue.dateOfBirth,
                        },
                        {
                          name: "nomineeName",
                          value: formValue.nomineeName,
                        },
                        {
                          name: "nomineeDateOfBirth",
                          value: formValue.nomineeDateOfBirth,
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
                            <Form.Item
                              rules={[
                                {
                                  type: "date",
                                },
                              ]}
                              name={"dateOfBirth"}
                            >
                              <Input
                                max="2999-12-31"
                                addonBefore="DOB"
                                type="date"
                                value={formValue.dateOfBirth}
                                onChange={(e) =>
                                  setFormValue({
                                    ...formValue,
                                    dateOfBirth: e.target.value,
                                  })
                                }
                                size="large"
                                placeholder="Date of Birth"
                              />
                            </Form.Item>
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
                                onChange={(e) =>
                                  setFormValue({
                                    ...formValue,
                                    userStateId: e,
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
                              ]}
                            >
                              <Input
                                onKeyPress={handleKeyPress}
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
                            <Form.Item
                              hasFeedback
                              rules={[
                                {
                                  type: "date",
                                },
                                {
                                  required:
                                    formValue.nomineeName ||
                                    formValue.nomineeRelation,
                                  message: "This Field is Required ",
                                },
                              ]}
                              name="nomineeDateOfBirth"
                            >
                              <Input
                                max="2999-12-31"
                                addonBefore="Nominee DOB"
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
                              />
                            </Form.Item>
                          </div>
                          <div class="col-lg-6 col-md-6">
                            <Form.Item
                              hasFeedback
                              name="nomineeRelation"
                              rules={[
                                {
                                  required:
                                    formValue.nomineeName ||
                                    formValue.nomineeDateOfBirth,
                                  message: "This Field is Required ",
                                },
                              ]}
                            >
                              <Input
                                onKeyPress={handleKeyPress}
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
                            </Form.Item>
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

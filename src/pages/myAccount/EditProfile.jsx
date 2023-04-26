import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Loading, MuiSnackBar, ThemeButton } from "../../components/common";
import { SelectField } from "../../components/forms";
import { getStateCity } from "../../redux/slices/profile/signUpSlice";
import {
  getProfileDetails,
  updateProfile,
} from "../../redux/slices/profile/profileSlice";

const EditProfile = () => {
  const [userDetails, setUserDetails] = useState({});
  const [getData, setGetData] = useState({});
  const [isClass, setIsClass] = useState(true);
  const [error, setError] = useState("");
  const [panNo, setPanNo] = useState("");
  const [aadharNo, setAadharNo] = useState("");
  const [alternateNumber, setAlternateNumber] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [address, setAddress] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [cityCode, setCityCode] = useState("");
  const [pinCodeId, setPinCodeId] = useState("");
  const [lastUpdateAltMobile, setLastUpdateAltMobile] = useState();
  const [isSnackBar, setIsSnackBar] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { loggedInUser } = useSelector(
    (state) => state.loginSlice.loggetInWithOTP
  );
  const { allStateCityList } = useSelector(
    (state) => state.signUpSlice.stateList
  );
  const formik = useFormik({
    initialValues: {
      // AlternateMobile: "",
      PanCard: "",
      AadharNo: "",
      Pincode: "",
      PerAddress: "",
    },
    validationSchema: yup.object({
      // AlternateMobile: yup
      //   .string()
        // .optional()
        // .min(10)
        // .max(10),
        // ,
        // .matches(
        //   /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/,
        //   "Please Enter Valid Number"
        // )
      PanCard: yup
        .string()
        .required("Please Enter Your Pan Number")
        .matches(/^([A-Z]){5}([0-9]){4}([A-Z]){1}$/, "Enter valid Pan No"),
      AadharNo: yup
        .string()
        .min(12)
        .max(12)
        .required("Please Enter Your Aadhar Number"),
      Pincode: yup.string().min(6).max(6).required("Please Enter PinCode"),
      PerAddress: yup.string().required("Please Enter Your Address"),
    }),
    onSubmit: (values, { resetForm }) => {
      if (pinCode.length == 6) {
        if(!error){
        setLoading(true);
        const userData =alternateNumber=='' || alternateNumber == null 
        ? { username: userDetails.UserName,
          password: loggedInUser.TRXNPassword,
          FName: userDetails.FName,
          LName: userDetails.LName,
          Mobile: userDetails.Mobile,
          EmailId: userDetails.EmailId,
          Pancard: values.PanCard,
          Address: values.PerAddress,
          AadharNo: values.AadharNo,
          Pincode:
            getData && getData.pincodeId != "" ? getData.pincodeId : pinCodeId,
          StateId: getData ? getData.stateId : stateCode,
          CityId: getData ? getData.cityId : cityCode,
          // AlternateMobile: null,
        }
        : { username: userDetails.UserName,
          password: loggedInUser.TRXNPassword,
          FName: userDetails.FName,
          LName: userDetails.LName,
          Mobile: userDetails.Mobile,
          EmailId: userDetails.EmailId,
          Pancard: values.PanCard,
          Address: values.PerAddress,
          AadharNo: values.AadharNo,
          Pincode:
            getData && getData.pincodeId != "" ? getData.pincodeId : pinCodeId,
          StateId: getData ? getData.stateId : stateCode,
          CityId: getData ? getData.cityId : cityCode,
          AlternateMobile: alternateNumber,
        };
        
          updateProfile(userData).then((response) => {
            if (response.ResponseStatus == 1) {
              setIsSnackBar(true);
              setSuccessMsg(response.Remarks);
            } else {
              setIsSnackBar(true);
            }
            setLoading(false);
          });
        }
       
      }
    },
  });

  useEffect(() => {
    if (!userDetails.Id) {
      getProfileDetails({
        username: loggedInUser.Mobile,
        password: loggedInUser.TRXNPassword,
      }).then((response) => {
        const data = response.Data[0];
        setUserDetails(response.Data[0]);
        setPanNo(data.PanCard);
        setAadharNo(data.AadharNo);
        setPinCode(data.Pincode);
        setAddress(data.PerAddress);
        setStateCode(data.StateId);
        setCityCode(data.CityId);
        setGetData({
          ...getData,
          stateId: data.StateId,
          cityId: data.CityId,
          pincodeId: data.PincodeId,
        });
        setAlternateNumber(data.AlternateMobile);
        setLastUpdateAltMobile(data.LastUpdatedAltMobileEmail);
        formik.values.Pincode = data.Pincode;
        formik.values.AlternateMobile = data.AlternateMobile;
        formik.values.PanCard = data.PanCard;
        formik.values.PerAddress = data.PerAddress;
        formik.values.AadharNo = data.AadharNo;
      });
    }
    if (allStateCityList) {
      let selectedState = allStateCityList?.Data?.find(
        (item) => item.Id === getData.stateId
      );
      let selectedCity = selectedState?.Citys.find(
        (item) => item.Id === getData.cityId
      );
      if (
        getData.stateName != selectedState?.StateName &&
        getData.cityName != selectedCity?.CityName
      ) {
        setGetData({
          ...getData,
          stateName: selectedState?.StateName,
          cityName: selectedCity?.CityName,
        });
      }
    }
  }, [pinCode]);

  useEffect(() => {
    if (formik.values.Pincode.length === 6) {
      getStateCity(formik.values.Pincode).then(response=>{
        if (response?.ResponseStatus === 1) {
          setGetData({
            ...getData,
            stateName: response.Data[0].StateName,
            stateId: response.Data[0].StateId,
            stateError: false,
            cityId: response.Data[0].CityId,
            cityName: response.Data[0].CityName,
            cityError: false,
            pincodeId: response.Data[0].PincodeId,
          });
        } else if (response?.ResponseStatus === 0) {
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
      })
    }else{
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
 
  }, [formik.values.Pincode])
  
  const editProfileSection = () => (
    <>
      <div class="my-account-right">
        <div class="my-account-content shadow-light">
          <div class="my-account-content-inner">
            {/* <div class="row"> */}
            <div class="col-md-12 my-account-head">
              <h3 class="my-account-title">Edit Details</h3>
            </div>
            {/* </div> */}

            <div class="row">
              <div class="col-md-12">
                <div class="formStyle">
                  <form
                    class="edit-profile-form"
                    onSubmit={!loading ? formik.handleSubmit : undefined}
                  >
                    <div class="row">
                      <div class="col-md-6 edit-profile-dis-field">
                        <div class="input-field">
                          <input
                            id="user-firstname"
                            type="text"
                            placeholder="&nbsp;"
                            value={userDetails.FName}
                            readonly="true"
                            autocomplete="off"
                          />
                          <label for="user-firstname">First Name *</label>
                        </div>
                      </div>

                      <div class="col-md-6 edit-profile-dis-field">
                        <div class="input-field">
                          <input
                            id="user-lastname"
                            type="text"
                            placeholder="&nbsp;"
                            value={userDetails.LName}
                            readonly="true"
                            autocomplete="off"
                          />
                          <label for="user-lastname">Last Name *</label>
                        </div>
                      </div>

                      <div class="col-md-6 edit-profile-dis-field">
                        <div class="input-field">
                          <input
                            id="user-email"
                            type="text"
                            placeholder="&nbsp;"
                            value={userDetails.EmailId}
                            readonly="true"
                            autocomplete="off"
                          />
                          <label for="user-email">Email ID *</label>
                        </div>
                      </div>

                      <div class="col-md-6">
                        <div class="input-field">
                          <input
                            name="AlternateMobile"
                            className={ error && "is-invalid" }
                            onChange={e=>{
                              const regex=/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/
                              setAlternateNumber(e.target.value)
                              if(!regex.test(e.target.value)){
                                setError("Please Enter Valid Mobile Number")
                              }else{
                                  setError("")
                                }
                              }
                              }
                            id="user-alternate-number"
                            placeholder="&nbsp;"
                            type="number"
                            value={alternateNumber}
                            autocomplete="off"
                            maxLength={10}
                            minLength={10}
                            readOnly={lastUpdateAltMobile && true}
                          />
                          <label for="user-alternate-number">
                            Alternate Number
                          </label>
                          <div className="invalid-feedback text-danger">{error}</div>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-6">
                        <div class="input-field">
                          <input
                            name="PanCard"
                            onChange={
                              formik.handleChange
                            }
                            onBlur={formik.handleBlur}
                            className={
                              formik.errors.PanCard && formik.touched.PanCard
                                ? " is-invalid"
                                : ""
                            }
                            id="user-pan-number"
                            type="text"
                            placeholder="&nbsp;"
                            value={
                              formik.values.PanCard != "null"
                                ? formik.values.PanCard
                                : ""
                            }
                            autocomplete="off"
                            // required
                          />
                          <label for="user-pan-number">Pan Number *</label>
                          <div className="invalid-feedback text-danger">
                            {formik.errors.PanCard}
                          </div>
                        </div>
                      </div>

                      <div class="col-md-6">
                        <div class="input-field">
                          <input
                            name="AadharNo"
                            type="number"
                            id="user-adhar-number"
                            placeholder="&nbsp;"
                            value={
                              formik.values.AadharNo != "null"
                                ? formik.values.AadharNo
                                : ""
                            }
                            onChange={
                              formik.handleChange
                            }
                            onBlur={formik.handleBlur}
                            className={
                              formik.errors.AadharNo && formik.touched.AadharNo
                                ? " is-invalid"
                                : ""
                            }
                            autocomplete="off"
                            maxLength={12}
                            minLength={12}
                            // required
                          />
                          <label for="user-adhar-number">
                            Aadhar Card Number *
                          </label>
                          <div className="invalid-feedback text-danger">
                            {formik.errors.AadharNo}
                          </div>
                        </div>
                      </div>

                      <div class="col-md-6">
                        <div class="input-field">
                          <input
                            name="Pincode"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={
                              formik.errors.Pincode && formik.touched.Pincode
                                ? " is-invalid"
                                : ""
                            }
                            id="user-pincode"
                            type="text"
                            placeholder="&nbsp;"
                            value={
                              formik.values.Pincode != "null"
                                ? formik.values.Pincode
                                : ""
                            }
                            autocomplete="off"
                            maxLength={6}
                            minLength={6}
                          />
                          <label for="user-pincode">Pincode *</label>
                          <div className="invalid-feedback text-danger">
                            {formik.errors.Pincode}
                          </div>
                        </div>
                      </div>

                      <div class="col-md-6">
                        <div class="input-field">
                          <input
                            name="PerAddress"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={
                              formik.errors.PerAddress &&
                              formik.touched.PerAddress ? " is-invalid" : ""}
                            id="user-address"
                            type="text"
                            placeholder="&nbsp;"
                            value={
                              formik.values.PerAddress != "null"
                                ? formik.values.PerAddress
                                : ""
                            }
                            autocomplete="off"
                          />
                          <label for="user-address">Address *</label>
                          <div className="invalid-feedback text-danger">
                            {formik.errors.PerAddress}
                          </div>
                        </div>
                      </div>
                      <SelectField
                        pincode={formik.values.Pincode}
                        setGetData={setGetData}
                        getData={getData}
                        isClass={isClass}
                      />
                      <div class="col-lg-12">
                        <div class="save-profile-btn text-center mt-4">
                          {/* <button type="submit" class="btn-primery">
                            {loading ? <Loading /> : "Save Profile"}
                          </button> */}
                          <ThemeButton loading={loading} value={"Save Profile"}/>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <MuiSnackBar
              open={isSnackBar}
              setOpen={setIsSnackBar}
              successMsg={successMsg}
              // errorMsg={errorMsg}
              setSuccess={setSuccessMsg}
              // setError={setErrorMsg}
            />
          </div>
        </div>
      </div>
    </>
  );

  return <>{editProfileSection()}</>;
};

export default EditProfile;

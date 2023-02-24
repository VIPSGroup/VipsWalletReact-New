import React, { useState, useEffect } from "react";
import { getProfileDetails, editProfile } from "../../apiData/user/profile";
import {
  listStateAndCity,
  getCityState,
} from "../../apiData/authentication/signup";
import { updateProfile } from "../../apiData/myProfile/profile";
// import { MuiSnackBar } from "../common/snackbars";
import LoadingBar from "../common/loading";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import SelectField from "../shopping/SelectField";
import { getUserDetails } from "../../redux/Actions/SignupAction";
import { getStateCity } from "../../redux/Actions/CommonActions";

const EditProfile = () => {
  const [userDetails, setUserDetails] = useState({});
  const [getData, setGetData] = useState({});
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
  const { loggedInUser } = useSelector((state) => state.login);
  const { stateCityList, stateCityByPincode } = useSelector(
    (state) => state.common
  );
  const { userProfile } = useSelector((state) => state.signup);
  const formik = useFormik({
    initialValues: {
      AlternateMobile: "",
      PanCard: "",
      AadharNo: "",
      Pincode: "",
      PerAddress: "",
    },
    validationSchema: yup.object({
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
        setLoading(true);
        console.log(getData);
        const userData = {
          username: userDetails.UserName,
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
          AlternateMobile: values.AlternateMobile,
        };
        updateProfile(userData).then((response) => {
          console.warn(response);
          if (response.ResponseStatus == 1) {
            setIsSnackBar(true);
            setSuccessMsg(response.Remarks);
          } else {
            setIsSnackBar(true);
          }
          setLoading(false);
        });
      } else {
        setIsSnackBar(true);
      }
    },
  });

  useEffect(() => {
    if (formik.values.Pincode == pinCode) {
      // dispatch(getUserDetails)

      getProfileDetails(loggedInUser.Mobile, loggedInUser.TRXNPassword).then(
        (response) => {
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

          if (stateCityList) {
            let selectedState = stateCityList.Data.find(
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
        }
      );
    }

    if (formik.values.Pincode.length == 6) {
      console.warn(formik.values.Pincode);
      dispatch(getStateCity(formik.values.Pincode));

      //     getCityState(formik.values.Pincode).then((response) => {
      //       if (response.ResponseStatus == 1) {
      // setGetData({...getData,stateName:response.Data[0].StateName,stateId:response.Data[0].StateId,stateError:false,cityId:response.Data[0].CityId,cityName:response.Data[0].CityName,cityError:false,pincodeId:response.Data[0].PincodeId})
      //       } else {
      //         setGetData({stateName:'',stateId:'',stateError:false,cityId:'',cityName:'',cityError:false})
      //       }
      //     });
    }

    if (formik.values.Pincode.length === 6) {
      if (stateCityByPincode?.ResponseStatus === 1) {
        console.warn(stateCityByPincode.Data[0]);
        setGetData({
          ...getData,
          stateName: stateCityByPincode.Data[0].StateName,
          stateId: stateCityByPincode.Data[0].StateId,
          stateError: false,
          cityId: stateCityByPincode.Data[0].CityId,
          cityName: stateCityByPincode.Data[0].CityName,
          cityError: false,
          pincodeId: stateCityByPincode.Data[0].PincodeId,
        });
      } else if (stateCityByPincode?.ResponseStatus === 0) {
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
    }
  }, [pinCode, formik.values.Pincode]);

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
                    // onSubmit={!loading && clickSave}
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
                            onChange={
                              formik.handleChange
                              // handlerAlternateNumber
                            }
                            id="user-alternate-number"
                            placeholder="&nbsp;"
                            value={
                              formik.values.AlternateMobile != "null"
                                ? formik.values.AlternateMobile
                                : ""
                            }
                            autocomplete="off"
                            maxLength={10}
                            minLength={10}
                            // required
                            readOnly={lastUpdateAltMobile && true}
                          />
                          <label for="user-alternate-number">
                            Alternate Number
                          </label>
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
                              // handlePanChange
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
                            id="user-adhar-number"
                            placeholder="&nbsp;"
                            value={
                              formik.values.AadharNo != "null"
                                ? formik.values.AadharNo
                                : ""
                            }
                            onChange={
                              formik.handleChange
                              // handleAadharChange
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
                            // onChange={ handlePincodeChange  }
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
                            // required
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
                            // onChange={handleAddressChange}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={
                              formik.errors.PerAddress &&
                              formik.touched.PerAddress
                                ? " is-invalid"
                                : ""
                            }
                            id="user-address"
                            type="text"
                            placeholder="&nbsp;"
                            value={
                              formik.values.PerAddress != "null"
                                ? formik.values.PerAddress
                                : ""
                            }
                            autocomplete="off"
                            // required
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
                      />

                      <div class="col-lg-12">
                        <div class="save-profile-btn text-center mt-4">
                          <button type="submit" class="btn-primery">
                            {loading ? <LoadingBar /> : "Save Profile"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {/* <MuiSnackBar
              open={isSnackBar}
              setOpen={setIsSnackBar}
              successMsg={successMsg}
              // errorMsg={errorMsg}
              setSuccess={setSuccessMsg}
              // setError={setErrorMsg}
            /> */}
          </div>
        </div>
      </div>
    </>
  );

  return <>{editProfileSection()}</>;
};

export default EditProfile;

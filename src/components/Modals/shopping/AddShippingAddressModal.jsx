import { useFormik } from "formik";
import * as yup from "yup";
import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getStateCity } from "../../../redux/slices/profile/signUpSlice";
import { SelectField } from "../../forms";
import { addAddress } from "../../../redux/slices/pincodeSlice";
import { MuiSnackBar, ThemeButton } from "../../common";

const AddShippingAddressModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSnackBar, setIsSnackBar] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [getData, setGetData] = useState({});
  const { loggedInUser } = useSelector(
    (state) => state.loginSlice.loggetInWithOTP
  );
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      mobileno: "",
      addressType: "HOME",
      address: "",
      pincode: "",
      landmark: "",
    },
    validationSchema: yup.object({
      pincode: yup.string().required("Please Enter Pincode").matches(/^\d{6}$/,"Please Enter Valid Pincode"),
      fname: yup.string().required("Please Enter First Name").matches( /^[a-zA-Z\.\s]{3,20}$/,"Please Enter Valid First Name"),
      lname: yup.string().required("Please Enter Last Name").matches(/^[a-zA-Z\.\s]{3,20}$/,"Please Enter Valid Last Name"),
      mobileno: yup.string().min(10,"Please Enter Valid Mobile Number").max(10,"Please Enter Valid Mobile Number").matches(/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/ ,"Please Enter Valid Mobile Number").required("Please Enter Mobile Number"),
      addressType: yup.string().required("Please Enter addressType"),
      address: yup.string().required("Please Enter address") .matches(/.{20,}/,"Address must be at least 20 characters"),
      landmark: yup.string().required("Please Enter landmark"),
    }),

    onSubmit: (values, { resetForm }) => {
      if (!getData.stateError && !getData.cityError) {
        setLoading(true)
        addAddress(
          values,
          loggedInUser.Mobile,
          loggedInUser.TRXNPassword,
          getData.stateName,
          getData.cityName
        ).then((response) => {
          if (response.ResponseStatus == 1) {
            setErrorMsg("")
            setIsSnackBar(true);
            setSuccessMsg(response.Remarks);
            // window.location.reload();
          } else {
            setSuccessMsg("")
            setIsSnackBar(true);
            setErrorMsg(response.Remarks);
          }
          setLoading(false);
        });
      }
    },
  });
  const handleClose = () => {
    setShowModal(false);
    setLoading(false);
  };

  useEffect(() => {
    if (formik.values.pincode.toString().length == 6) {
      getStateCity(formik.values.pincode).then(response=>{
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
    } else {
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
  }, [formik.values.pincode]);

  const modalContent = () => (
    <>
      <div class="modal-header">
        <h5 class="modal-title titleMain" id="exampleModalLabel">
          Add New Address
        </h5>
        <button
          onClick={() => handleClose()}
          type="button"
          class="close shopping-address-modal-close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">
            {" "}
            <i class="fa-sharp fa-solid fa-xmark"></i>{" "}
          </span>
        </button>
      </div>
      <div class="modal-body">
        <section class="">
          <div class="align-self-center">
            <div class="shopping-address-modal-form">
              <div class="row">
                <div class="col-lg-12"></div>
              </div>
              <div class="formStyle">
                <form
                  class="shopping-address-popup-form"
                  onSubmit={!loading && formik.handleSubmit}
                >
                  <div class="input-field">
                    <input
                      name="pincode"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={
                        formik.errors.pincode && formik.touched.pincode
                          ? " is-invalid"
                          : ""
                      }
                      value={formik.values.pincode}
                      id="pincode"
                      type="number"
                      placeholder="&nbsp;"
                      autoComplete="off"
                      minLength={6}
                      maxLength={6}
                    />
                    <label for="pincode"> Pincode </label>
                    <div className="invalid-feedback text-danger">
                      {formik.errors.pincode}
                    </div>
                  </div>

                  <div class="input-field">
                    <input
                      name="fname"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={
                        formik.errors.fname && formik.touched.fname
                          ? " is-invalid"
                          : ""
                      }
                      value={formik.values.fname}
                      id="first-name"
                      type="text"
                      placeholder="&nbsp;"
                      autoComplete="off"
                    />
                    <label for="first-name">First Name</label>
                    <div className="invalid-feedback text-danger">
                      {formik.errors.fname}
                    </div>
                  </div>

                  <div class="input-field">
                    <input
                      name="lname"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={
                        formik.errors.lname && formik.touched.lname
                          ? " is-invalid"
                          : ""
                      }
                      value={formik.values.lname}
                      id="last-name"
                      type="text"
                      placeholder="&nbsp;"
                      autoComplete="off"
                    />
                    <label for="last-name">Last Name</label>
                    <div className="invalid-feedback text-danger">
                      {formik.errors.lname}
                    </div>
                  </div>

                  <div class="shopping-address-field">
                    <div class="form-group input-group input-field">
                      <span class="input-group-prepend">
                        <div class="input-group-text">+91</div>
                      </span>
                      <input
                        id="user-mobile"
                        name="mobileno"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={
                          formik.errors.mobileno && formik.touched.mobileno
                            ? "mobile-input is-invalid w-100"
                            : "mobile-input"
                        }
                        value={formik.values.mobileno}
                        // class="mobile-input"
                        type="text"
                        placeholder="&nbsp;"
                        autoComplete="off"
                        maxLength="10"
                        minLength="10"
                      />
                      <label for="user-mobile"> Mobile Number </label>
                      <div className="invalid-feedback text-danger w-100">
                        {formik.errors.mobileno}
                      </div>
                    </div>
                  </div>

                  <div class="textarea-field">
                    <textarea
                      name="address"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={
                        formik.errors.address && formik.touched.address
                          ? " is-invalid"
                          : ""
                      }
                      value={formik.values.address}
                      id="address"
                      rows="2"
                      placeholder="&nbsp;"
                    ></textarea>
                    <label for="address">Address</label>
                    <div className="invalid-feedback text-danger">
                      {formik.errors.address}
                    </div>
                  </div>

                  <div class="input-field">
                    <input
                      name="landmark"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={
                        formik.errors.landmark && formik.touched.landmark
                          ? " is-invalid"
                          : ""
                      }
                      value={formik.values.landmark}
                      id="landmark"
                      type="text"
                      placeholder="&nbsp;"
                      autoComplete="off"
                    />
                    <label for="landmark">Landmark</label>
                    <div className="invalid-feedback text-danger">
                      {formik.errors.landmark}
                    </div>
                  </div>

                  {/* <div class="shopping-address-select"> */}
                    <SelectField
                      pincode={formik.values.pincode}
                      setGetData={setGetData}
                      getData={getData} isClass={false}
                    />
                  {/* </div> */}

                  <div class="shopping-address-select"></div>

                  <div className="mt-3">
                    <p class="select-address-type-title"> Address Type </p>
                    <div class="select-address-type">
                      <label>
                        <input
                          onChange={formik.handleChange}
                          type="radio"
                          name="addressType"
                          value="HOME"
                          checked={formik.values.addressType === "HOME"}
                        />
                        <span> Home </span>
                      </label>
                      <label class="">
                        <input
                          onChange={formik.handleChange}
                          type="radio"
                          name="addressType"
                          value="OFFICE"
                          checked={formik.values.addressType === "OFFICE"}
                        />
                        <span> Office </span>
                      </label>
                      <label class="">
                        <input
                          onChange={formik.handleChange}
                          type="radio"
                          name="addressType"
                          value="OTHER"
                          checked={formik.values.addressType === "OTHER"}
                        />
                        <span> Other </span>
                      </label>
                    </div>
                  </div>
                  <MuiSnackBar
                    open={isSnackBar}
                    setOpen={setIsSnackBar}
                    successMsg={successMsg}
                    errorMsg={errorMsg}
                    setSuccess={setSuccessMsg}
                    setErrorMsg={setErrorMsg}
                  />

                  <div class="modal-footer">
                    <div class="shopping-address-btn">
                      <ThemeButton onClick={() => {
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
                        }} value={"Save Address"} loading={loading}/>
                      {/* <button
                        type="submit"
                        class="btn-primery"
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
                      >
                        {" "}
                        Save Address{" "}
                      </button> */}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );

  const AddAddressModal = () => (
    <>
      <Modal
        show={showModal}
        scrollable={true}
        onHide={handleClose}
        centered
        keyboard={false}
        className="modal fade shopping-address-modal"
        id="exampleModal"
        data-backdrop="false"
      >
        {modalContent()}
      </Modal>
    </>
  );

  return (
    <>
      <button
        class=""
        onClick={() => {
          setShowModal(true);
        }}
        type="button"
      >
        {" "}
        + Add New Address{" "}
      </button>
      {AddAddressModal()}
    </>
  );
};

export default AddShippingAddressModal;

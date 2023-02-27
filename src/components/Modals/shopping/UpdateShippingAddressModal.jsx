import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as yup from "yup";

import { useSelector } from "react-redux";
import { updateAddress } from "../../../apiData/shopping/address";
import { getStateCity } from "../../../redux/slices/signUpSlice";
import { SelectField } from "../../forms";

const UpdateShippingAddressModal = ({ addressProp }) => {
  const [showModal, setShowModal] = useState(false);
  const [pincode, setPincode] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [getData, setGetData] = useState({});
  const { loggedInUser } = useSelector(
    (state) => state.loginSlice.loggetInWithOTP
  );
  const { stateCityList } = useSelector((state) => state.signUpSlice.stateList);
  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      mobileno: "",
      addressType: "",
      address: "",
      pincode: "",
      landmark: "",
    },
    validationSchema: yup.object({
      pincode: yup.string().min(6).max(6).required("Please Enter Pincode"),
      fname: yup.string().required("Please Enter first name"),
      lname: yup.string().required("Please Enter last name"),
      mobileno: yup.string().min(10).max(10).required("Please Enter mobileno"),
      addressType: yup.string().required("Please Enter addressType"),
      address: yup.string().required("Please Enter address"),
      landmark: yup.string().required("Please Enter landmark"),
    }),

    onSubmit: (values, { resetForm }) => {
      updateAddress(
        { ...values, addressId: addressProp.Id },
        loggedInUser.Mobile,
        loggedInUser.TRXNPassword,
        getData.stateName,
        getData.cityName
      ).then((response) => {
        if (response.ResponseStatus == 1) {
          setSuccess(true);
          window.location.reload();
        } else {
          setError("Something Went Wrong. Please Try again.");
        }
        setLoading(false);
      });
    },
  });

  const handleClose = () => {
    setShowModal(false);
    setLoading(false);
  };
  useEffect(() => {
    setPincode(addressProp.ZipPostal);
    setGetData({
      ...getData,
      stateName: addressProp.State,
      cityName: addressProp.City,
      stateError: false,
      cityError: false,
      pincodeId: addressProp.ZipPostal,
    });
    if (formik.values.pincode == "" && formik.values.pincode == pincode) {
      setGetData({
        ...getData,
        stateName: addressProp.State,
        cityName: addressProp.City,
      });
      formik.values.fname = addressProp.FirstName;
      formik.values.lname = addressProp.LastName;
      formik.values.mobileno = addressProp.Phone;
      formik.values.addressType = addressProp.AddressType;
      formik.values.address = addressProp.Address1;
      formik.values.landmark = addressProp.Landmark;
      formik.values.pincode = addressProp.ZipPostal;
    }
    if (stateCityList) {
      console.log(stateCityList);
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

    if (
      formik.values.pincode.length == 6 &&
      formik.values.pincode != addressProp.ZipPostal
    ) {
      getStateCity(formik.values.pincode).then((response) => {
        if (response.ResponseStatus == 1) {
          if (
            getData.stateName == "" ||
            getData.stateName != response.Data[0].StateName
          ) {
            setGetData({
              stateName: response.Data[0].StateName,
              stateId: response.Data[0].StateId,
              stateError: false,
              cityId: response.Data[0].CityId,
              cityName: response.Data[0].CityName,
              cityError: false,
              pincodeId: response.Data[0].PincodeId,
            });
          }
        } else {
          setGetData({
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
  }, [formik.values.pincode]);

  const modalContent = () => (
    <>
      <div class="modal-header">
        <h5 class="modal-title titleMain" id="exampleModalLabel">
          Update Address
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

      {showError()}

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
                      type="text"
                      placeholder="&nbsp;"
                      autocomplete="off"
                      minLength={6}
                      maxLength={6}
                    />
                    <label htmlFor="pincode"> Pincode </label>
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
                      autocomplete="off"
                    />
                    <label htmlFor="first-name">First Name</label>
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
                      autocomplete="off"
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
                            ? " is-invalid mobile-input"
                            : "mobile-input"
                        }
                        value={formik.values.mobileno}
                        type="number"
                        placeholder="&nbsp;"
                        autocomplete="off"
                        maxLength="10"
                        minLength="10"
                      />
                      <label htmlFor="user-mobile"> Mobile Number </label>
                      <div className="invalid-feedback text-danger">
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
                          ? " is-invalid mobile-input"
                          : "mobile-input"
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
                          ? " is-invalid mobile-input"
                          : "mobile-input"
                      }
                      value={formik.values.landmark}
                      id="landmark"
                      type="text"
                      placeholder="&nbsp;"
                      autocomplete="off"
                    />
                    <label htmlFor="landmark">Landmark</label>
                    <div className="invalid-feedback text-danger">
                      {formik.errors.landmark}
                    </div>
                  </div>

                  <div class="shopping-address-select">
                    <SelectField
                      pincode={formik.values.pincode}
                      setGetData={setGetData}
                      getData={getData}
                    />
                  </div>

                  <div>
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

                  <div class="modal-footer">
                    <div class="shopping-address-btn">
                      <button type="submit" class="btn-primery ">
                        {" "}
                        Save Address{" "}
                      </button>
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

  const showError = () => (
    <>{error && <div className="alert alert-danger">{error}</div>}</>
  );

  return (
    <>
      <button
        onClick={() => {
          setShowModal(true);
        }}
        type="button"
        class="btn btn-cta"
      >
        {" "}
        <i class="far fa-edit"></i>{" "}
      </button>

      {AddAddressModal()}
    </>
  );
};

export default UpdateShippingAddressModal;

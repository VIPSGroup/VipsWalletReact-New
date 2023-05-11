import { Button, Form, Input, Modal, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../../assets/styles/digigold/digigold-shopping-cart.css";
import {
  calculateTotalPrice,
  handleKeyPressForName,
  handleMobileKeyPress,
  namePattern,
} from "../../../constants";
import {
  checkDigiPinCode,
  clearCart,
  createDigiAddress,
  deleteDigiAddress,
  deliveryPlaceOrder,
  getDigiAddressList,
  removePinData,
} from "../../../redux/slices/digiGold/delivery/DeliverySlice";
import { getWalletBalance } from "../../../redux/slices/payment/walletSlice";
import OTPModal from "../../../components/common/OTPModal";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { MuiSnackBar } from "../../../components/common";

const { Item } = Form;
const DeliveryCheckout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSnackBar, setIsSnackBar] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { items } = useSelector((state) => state.DeliverySlice);
  const [selectAdd, setSelectAdd] = useState();
  const { pinCode, pinLoading } = useSelector(
    (state) => state.DeliverySlice.pinCodeCheck
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [otp, setOtp] = useState();
  const [step, setStep] = useState();
  const [formData, setFormdata] = useState({
    name: "",
    mobileNumber: "",
    email: "",
    address: "",
    pincode: "",
  });
  const { address, addLoading } = useSelector(
    (state) => state.DeliverySlice.addressList
  );
  const { AddRes, AddLoading } = useSelector(
    (state) => state.DeliverySlice.createAdd
  );
  const { AddDelete, AddDelLoading } = useSelector(
    (state) => state.DeliverySlice.deleteAdd
  );
  const { response, placeLoader } = useSelector(
    (state) => state.DeliverySlice.placeOrder
  );
  const { data: WalletData, loading: walletLoad } = useSelector(
    (state) => state.walletSlice.walletBalance
  );
  const { loggedInUser } = useSelector(
    (state) => state.loginSlice.loggetInWithOTP
  );
  const Username = loggedInUser.UserName;
  const Password = loggedInUser.TRXNPassword;
  useEffect(() => {
    dispatch(getDigiAddressList({ Username, Password }));
    setFormdata({ ...formData, mobileNumber: loggedInUser.Mobile });

    dispatch(getWalletBalance({ username: Username, password: Password }));
  }, []);
  useEffect(() => {
    setSelectAdd(address.Data?.result[0]);
  }, [address]);
  const handleAddressAdd = async () => {
    const name = formData.name;
    const mobileNumber = formData.mobileNumber;
    const email = formData.email;
    const address = formData.address;
    const pincode = formData.pincode;
    const res = await dispatch(
      createDigiAddress({
        Username,
        Password,
        name,
        mobileNumber,
        email,
        address,
        pincode,
      })
    );
    if (
      res.payload.ResponseStatus === 1 &&
      res.payload.Data.statusCode === 200
    ) {
      setModalOpen(false);
      setFormdata({
        name: "",
        email: "",
        address: "",
        mobileNumber: "",
        pincode: "",
      });
      setIsSnackBar(true);
      setSuccessMsg(res.payload.Remarks);
      dispatch(getDigiAddressList({ Username, Password }));
    } else {
      setIsSnackBar(true);
      setErrorMsg(res.payload.Remarks);
    }
  };
  useEffect(() => {
    if (formData.pincode.length === 6) {
      const pincode = formData.pincode;
      dispatch(checkDigiPinCode({ pincode }));
    } else if (formData.pincode.length < 6) {
      dispatch(removePinData());
    }
  }, [formData.pincode]);

  const clickDeleteAddress = async (id) => {
    const Useraddressid = id;
    const res = await dispatch(
      deleteDigiAddress({ Username, Password, Useraddressid })
    );
    if (
      res.payload.ResponseStatus === 1 &&
      res.payload.Data.statusCode === 200
    ) {
      dispatch(getDigiAddressList({ Username, Password }));
      setIsSnackBar(true);
      setSuccessMsg("Address Delete Successfully");
    } else {
      setIsSnackBar(true);
      setErrorMsg(res.payload.Remarks);
    }
  };

  const handlePlaceOrder = async () => {
    const Data = {
      Username: Username,
      Password: Password,
      Useraddressid: selectAdd.userAddressId,
      shippingCharges: calculateTotalPrice(items, "basePrice"),
      address: selectAdd.address,
      otp: otp,
      items: items,
    };
    const res = await dispatch(deliveryPlaceOrder({ Data }));
    if (res.payload.ResponseStatus === 2 && res.payload.ErrorCode === 200) {
      setStep(1);
      setIsSnackBar(true);
      setSuccessMsg(res.payload.Remarks);
    } else {
      setIsSnackBar(true);
      setErrorMsg(res.payload.Remarks);
    }
    if (
      res.payload.ResponseStatus === 1 &&
      res.payload?.Data?.statusCode === 200
    ) {
      setStep(2);
      dispatch(clearCart());
    } else {
      setIsSnackBar(true);
      setErrorMsg(res.payload.Remarks);
    }
    if (res.payload.ResponseStatus === 0) {
      setIsSnackBar(true);
      setErrorMsg(res.payload.Remarks);
    }
  };
  const resendOtp = () => {
    const Data = {
      Username: Username,
      Password: Password,
      Useraddressid: selectAdd.userAddressId,
      shippingCharges: calculateTotalPrice(items, "basePrice"),
      address: selectAdd.address,
      otp: "",
      items: items,
    };
    dispatch(deliveryPlaceOrder({ Data }));
  };

  const handleClose = () => {
    setStep("");
    setOtp("");
  };
  useEffect(() => {
    return () => {
      window.history.replaceState({}, state);
    };
  }, []);
  return state ? (
    <>
      <section class="section-align buy-sell-form">
        <div class="container-fluid">
          <div class="digigold-work-section-head delivery-section-head">
            <h1 class="section-head-title py-2">VIPS Gold Checkout</h1>
          </div>

          <div class="col-lg-10 m-auto digigold-shopping-cart-wrapper">
            <div class="row">
              <div class="col-sm-12 col-md-12 col-lg-8">
                <div class="digigold-shopping-cart">
                  <div
                    class="accordion digigold-accordion"
                    id="checkout-accordion"
                  >
                    <Spin spinning={addLoading || AddDelLoading || walletLoad}>
                      <div style={{ marginBottom: 20 }} class="box-shadow-1">
                        <div class="shopping-cart-left">
                          <div class="shopping-cart-box-outer shopping-cart-address-bg ">
                            <div class="d-flex justify-content-between">
                              <p class="shopping-cart-address-title">
                                {address?.Data?.result?.length === 0
                                  ? "You don't have a Address."
                                  : "Select Delivery Address"}
                              </p>
                              {address?.Data?.result.length < 3 && (
                                <Button
                                  onClick={() => {
                                    setModalOpen(true);
                                    setFormdata({
                                      ...formData,
                                      mobileNumber: loggedInUser.Mobile,
                                    });
                                  }}
                                  style={{ marginRight: 16 }}
                                >
                                  Add Address
                                </Button>
                              )}
                            </div>

                            <div class="shopping-cart-address-card">
                              <p class="shopping-cart-address-card-title">
                                {" "}
                                Default Address{" "}
                              </p>
                              {address?.Data?.result?.map((e) => {
                                return (
                                  <div class="shopping-cart-address-outer ">
                                    <div class="col-sm-10 col-md-10 col-lg-10 shopping-cart-address-info p-0">
                                      <div>
                                        <label>
                                          <input
                                            onChange={() => setSelectAdd(e)}
                                            type="radio"
                                            name="radio-button"
                                            value={selectAdd}
                                            checked={
                                              selectAdd?.userAddressId ===
                                              e?.userAddressId
                                            }
                                          />
                                          <span></span>
                                        </label>
                                      </div>
                                      <div class="address-info-inner">
                                        <p class="shopping-cart-user-name">
                                          {e.name}
                                          {/* <span class="location-badge">
                                            {" "}
                                            Home
                                          </span>{" "} */}
                                        </p>
                                        <p class="shopping-cart-user-address">
                                          {`${e.address}, ${e.pincode}`}
                                        </p>
                                        <p class="shopping-cart-user-mobno">
                                          Mobile : +91 7723970629
                                        </p>
                                      </div>
                                    </div>

                                    <div class="shopping-cart-address-btns">
                                      <div class="shopping-cart-remove-address p-0">
                                        <button
                                          onClick={() =>
                                            clickDeleteAddress(e.userAddressId)
                                          }
                                          // value={lastShippingAddress.Id}
                                          class=" remove-address-btn"
                                        >
                                          {" "}
                                          <i class="fa-sharp fa-solid fa-xmark"></i>{" "}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Spin>
                    <div class="card">
                      <div class="card-header" id="checkouthead3">
                        <a
                          href="#"
                          class="btn btn-header-link collapsed"
                          data-toggle="collapse"
                          data-target="#checkout-box3"
                          aria-expanded="true"
                          aria-controls="checkout-box3"
                        >
                          3. Payment Information
                        </a>
                      </div>

                      <div
                        id="checkout-box3"
                        // class="collapse"
                        aria-labelledby="checkouthead3"
                        data-parent="#checkout-accordion"
                      >
                        <div class="card-body">
                          <div class="">
                            <div class="digigold-paymet-discount-info mb-4">
                              <div class="col-lg-8 col-sm-8 p-0">
                                <div class="custom-control custom-checkbox ">
                                  <input
                                    type="checkbox"
                                    checked
                                    class="custom-control-input"
                                    id="vips-wallet"
                                  />
                                  <label
                                    class="custom-control-label"
                                    for="vips-wallet"
                                  >
                                    <img
                                      src="images/digigold-images/vips-logo-small.png"
                                      class="img-fluid digigold-payment-debit-vips"
                                    />{" "}
                                    VIPS Wallet (₹{" "}
                                    {parseFloat(
                                      WalletData?.Data?.Balance
                                    )?.toLocaleString()}
                                    ){" "}
                                    {/* {`${parseFloat(WalletData?.Data?.Balance)} < ${parseFloat}`} */}
                                  </label>
                                </div>
                              </div>
                              <div class="col-lg-4 col-sm-4 p-0">
                                <p class="digigold-paymet-discount-amt">
                                  {" "}
                                  &#x20B9;{" "}
                                  {calculateTotalPrice(items, "basePrice")}
                                </p>
                              </div>
                            </div>

                            {/* <div class="digigold-paymet-discount-info">
                              <div class="col-lg-8 col-sm-8 p-0">
                                <div class="custom-control custom-checkbox ">
                                  <input
                                    type="checkbox"
                                    class="custom-control-input"
                                    id="payu-card"
                                  />
                                  <label
                                    class="custom-control-label"
                                    for="payu-card"
                                  >
                                    <img
                                      src="images/digigold-images/payu-logo.png"
                                      class="img-fluid digigold-payment-debit-payu"
                                    />{" "}
                                    Payu (card / UPI)
                                  </label>
                                </div>
                              </div>
                              <div class="col-lg-4 col-sm-4 p-0">
                                <p class="digigold-paymet-discount-amt">
                                  {" "}
                                  &#x20B9;
                                  {calculateTotalPrice(items, "basePrice")}
                                </p>
                              </div>
                            </div> */}
                          </div>

                          <div class="row digigold-checkout-process justify-content-end">
                            <div class="digigold-checkout-btn mt-4">
                              <Button
                                loading={step !== 1 && placeLoader}
                                type="primary"
                                onClick={handlePlaceOrder}
                                class="btn btn-primery"
                              >
                                Pay Now
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-sm-12 col-md-12 col-lg-4">
                <div class="digigold-cart-right">
                  <div class="digigold-cart-payment-outer box-shadow-1">
                    <div class="col-md-12 p-0">
                      <div class="digigold-cart-payment-summery">
                        {items.map((e) => {
                          return (
                            <div class="row flex-nowrap p-2">
                              <div class="mr-2">
                                <span>
                                  {" "}
                                  <img
                                    src={e.productImages[0].url}
                                    class="img img-fluid digigold-checkout-coin-img"
                                  />{" "}
                                </span>
                              </div>
                              <div class="">
                                <p class="digigold-cart-summery-title mb-1">
                                  {e.name}
                                </p>
                                <p class="mb-0">SKU : {e.sku}</p>
                              </div>
                            </div>
                          );
                        })}

                        <div class="dropdown-divider"></div>

                        <div class="row mt-3">
                          <div class="col-7 col-xs-4">
                            <span class="digigold-cart-summery-dark-text">
                              {" "}
                              Total Payable :{" "}
                            </span>
                          </div>
                          <div class="col-5 col-xs-4 text-right">
                            <span class="digigold-cart-summery-dark-text">
                              {" "}
                              &#x20B9; {calculateTotalPrice(items, "basePrice")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <OTPModal
          Otp={otp}
          setOtp={setOtp}
          step={step}
          handleClose={handleClose}
          load={placeLoader}
          handleClick={handlePlaceOrder}
          resendOtp={resendOtp}
        />
      </section>
      <Modal
        onCancel={() => {
          setModalOpen(false);
          setFormdata({
            name: "",
            email: "",
            address: "",
            pincode: "",
          });
          dispatch(removePinData());
        }}
        footer={[]}
        width={500}
        open={modalOpen}
      >
        <h5>Add Address</h5>
        <Form
          onFinish={handleAddressAdd}
          fields={[
            {
              name: "name",
              value: formData.name,
            },
            {
              name: "mobileNumber",
              value: formData.mobileNumber,
            },
            {
              name: "email",
              value: formData.email,
            },
            {
              name: "address",
              value: formData.address,
            },
            {
              name: "pincode",
              value: formData.pincode,
            },
          ]}
          style={{ marginTop: 20 }}
        >
          <Item
            onKeyPress={handleKeyPressForName}
            name="name"
            rules={[
              { required: true, message: "Please enter your name!" },
              {
                pattern: namePattern,
                message: "Please Enter Valid Full Name",
              },
            ]}
          >
            <Input
              onChange={(e) =>
                setFormdata({ ...formData, name: e.target.value })
              }
              value={formData.name}
              placeholder="Enter Your Name"
            />
          </Item>
          <Item
            name="mobileNumber"
            rules={[
              { required: true, message: "Please enter your mobile number!" },
              {
                pattern: /^[0-9]{10}$/,
                message: "Please enter a valid mobile number!",
              },
            ]}
          >
            <Input
              onKeyPress={handleMobileKeyPress}
              maxLength={10}
              onChange={(e) =>
                setFormdata({ ...formData, mobileNumber: e.target.value })
              }
              value={formData.mobileNumber}
              placeholder="Enter Mobile Number"
            />
          </Item>
          <Item
            name="email"
            rules={[
              // { required: true, message: "Please enter your email address!" },
              { type: "email", message: "Please enter a valid email address!" },
            ]}
          >
            <Input
              onChange={(e) =>
                setFormdata({ ...formData, email: e.target.value })
              }
              value={formData.email}
              placeholder="Enter Email Address"
            />
          </Item>
          <Item
            name="address"
            rules={[{ required: true, message: "Please enter your address!" }]}
          >
            <Input.TextArea
              onChange={(e) =>
                setFormdata({ ...formData, address: e.target.value })
              }
              value={formData.address}
              placeholder="Enter Address"
            />
          </Item>
          <Spin spinning={pinLoading}>
            <Item
              name="pincode"
              rules={[
                { required: true, message: "Please enter your pincode!" },
                {
                  pattern: /^[0-9]{6}$/,
                  message: "Please enter a valid pincode!",
                },
              ]}
            >
              <Input
                maxLength={6}
                onChange={(e) =>
                  setFormdata({ ...formData, pincode: e.target.value })
                }
                value={formData.pincode}
                placeholder="Enter Pincode"
              />
              {pinCode[0]?.Status === "Success"
                ? pinCode[0]?.PostOffice?.map((e) => {
                    return (
                      <span style={{ marginRight: 10, fontSize: 12 }}>
                        {e.Name},
                      </span>
                    );
                  })
                : pinCode[0]?.Message}
            </Item>
          </Spin>
          <Item>
            <Button loading={AddLoading} htmlType="submit" type="primary">
              Submit
            </Button>
          </Item>
        </Form>
      </Modal>
      <Modal
        footer={[]}
        width={500}
        open={step === 2}
        onCancel={() => {
          setStep("");
          navigate("/vipsgold-delivery");
        }}
      >
        <div class="order-confirm-success-modal-body">
          <div class="col-md-12">
            {/* { <!-- success animation start -->} */}
            <div class="order-confirm-seccess-box">
              <div class="order-confirm-success-inner success-animation">
                {/* { <!-- <img src="images/recharge-success.svg" class="img-fluid order-confirm-success-img" />  -->} */}

                {/* {<script src="pay-animations/success-animation.js"></script>
                              <lottie-player src="pay-animations/success-popup-animation.json" background="transparent"  speed="1" class="success" autoplay></lottie-player>} */}

                <img
                  src="/images/shopping/shopping-success.svg"
                  class="mb-4"
                  alt="Success"
                />

                <p class="order-confirm-success-msg">
                  Your order has been received
                </p>
                <p class="order-confirm-success-text">
                  Thank you for your purchase!
                </p>

                <p>
                  You will receive an order confirmation email with details of
                  your order.
                </p>
              </div>
            </div>
          </div>

          <div class="order-confirm-success-btn">
            <Link type="button" to="/vipsgold-orders" class="btn-primery">
              Go to My Orders
            </Link>
          </div>
        </div>
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
  ) : (
    <Navigate to={"/vipsgold-delivery"} />
  );
};

export default DeliveryCheckout;
